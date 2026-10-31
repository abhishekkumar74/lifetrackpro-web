import { NextResponse } from 'next/server';
import { 
  createSessionToken, 
  getAdminCookieName, 
  getCookieOptions, 
  isAuthorizedAdminEmail, 
  sanitizeRedirectUrl,
  verifyCsrfOrigin 
} from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';
import { normalizeClientIp } from '@/lib/rateLimit';

/**
 * POST /api/auth/session
 * Accepts verified Supabase client-side session (e.g. from hash fragment or mobile web client),
 * re-verifies user identity with Supabase Admin, verifies administrator authorization,
 * and issues the signed HttpOnly admin_session cookie.
 */
export async function POST(request) {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden: Invalid request origin.' }, { status: 403 });
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = normalizeClientIp(forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
  }

  const { email, sub, returnTo } = body || {};

  if (!email || !sub || typeof email !== 'string' || typeof sub !== 'string') {
    return NextResponse.json({ error: 'Email and sub identifier are required.' }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Strict administrator email authorization gate
  if (!isAuthorizedAdminEmail(normalizedEmail)) {
    console.warn(`[SECURITY ALERT] Unauthorized Google session attempt: ${normalizedEmail}`);
    return NextResponse.json(
      { error: `Access Denied: Google account (${normalizedEmail}) is not authorized as an administrator.` },
      { status: 403 }
    );
  }

  try {
    // Re-verify the user against Supabase Auth service-role client
    const supabaseAdmin = getSupabaseAdmin();
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(sub);

    if (userError || !userData?.user) {
      console.warn('[SESSION RE-VERIFY ERROR]', userError?.message);
      return NextResponse.json({ error: 'Failed to verify user session with identity provider.' }, { status: 401 });
    }

    if (userData.user.email?.toLowerCase() !== normalizedEmail) {
      console.warn('[SECURITY ALERT] Email mismatch between client claim and Supabase record');
      return NextResponse.json({ error: 'Identity verification failed: email mismatch.' }, { status: 401 });
    }

    const sessionSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET_KEY;
    if (!sessionSecret) {
      return NextResponse.json({ error: 'Admin authentication service is not configured.' }, { status: 503 });
    }

    // Issue cryptographic admin session token
    const sessionToken = createSessionToken(
      {
        email: normalizedEmail,
        role: 'admin',
        provider: 'google_session',
        provider_id: sub,
      },
      sessionSecret
    );

    const safeRedirect = sanitizeRedirectUrl(returnTo, '/basecamp/overview');
    const response = NextResponse.json({
      success: true,
      email: normalizedEmail,
      redirectUrl: safeRedirect,
    });

    // Set secure HttpOnly cookie
    response.cookies.set(getAdminCookieName(), sessionToken, getCookieOptions());

    recordAdminAudit({
      adminEmail: normalizedEmail,
      action: 'ADMIN_LOGIN_GOOGLE',
      targetType: 'auth',
      targetId: sub,
      details: { method: 'google_client_session', email: normalizedEmail },
      ipAddress: clientIp,
    }).catch(() => {});

    return response;
  } catch (err) {
    console.error('[AUTH SESSION ERROR]', err);
    return NextResponse.json({ error: 'Server error processing session.' }, { status: 500 });
  }
}
