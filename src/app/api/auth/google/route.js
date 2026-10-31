import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { 
  createSessionToken, 
  getAdminCookieName, 
  getCookieOptions, 
  isAuthorizedAdminEmail, 
  sanitizeRedirectUrl,
  verifyCsrfOrigin
} from '@/lib/auth';
import { checkDualRateLimit, normalizeClientIp } from '@/lib/rateLimit';
import { recordAdminAudit } from '@/lib/auditLog';

/**
 * GET /api/auth/google
 * Initiates the Supabase Google OAuth redirect flow with SSR PKCE cookie persistence.
 */
export async function GET(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = normalizeClientIp(forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');

  // Rate limit check
  const rateLimit = checkDualRateLimit(clientIp);
  if (!rateLimit.allowed) {
    const loginUrl = new URL('/basecamp', request.url);
    loginUrl.searchParams.set('error', 'rate_limited');
    return NextResponse.redirect(loginUrl);
  }

  const { searchParams } = new URL(request.url);
  const returnTo = sanitizeRedirectUrl(searchParams.get('returnTo'), '/basecamp/overview');

  const origin = new URL(request.url).origin;
  const callbackUrl = new URL('/api/auth/callback', origin);
  callbackUrl.searchParams.set('next', returnTo);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    console.error('[GOOGLE AUTH ERROR] Supabase URL or Anon Key is missing');
    const loginUrl = new URL('/basecamp', request.url);
    loginUrl.searchParams.set('error', 'auth_not_configured');
    return NextResponse.redirect(loginUrl);
  }

  const cookieStore = await cookies();
  const cookiesToSetOnResponse = [];

  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach((c) => {
          cookieStore.set(c.name, c.value, c.options);
          cookiesToSetOnResponse.push(c);
        });
      },
    },
  });

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl.toString(),
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });

    if (error || !data?.url) {
      console.error('[GOOGLE OAUTH INIT ERROR]', error?.message || error);
      const loginUrl = new URL('/basecamp', request.url);
      loginUrl.searchParams.set('error', 'oauth_init_failed');
      return NextResponse.redirect(loginUrl);
    }

    // Redirect user to Google OAuth authorization page, ensuring PKCE cookies are attached
    const response = NextResponse.redirect(data.url);
    cookiesToSetOnResponse.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });

    return response;
  } catch (err) {
    console.error('[GOOGLE AUTH UNCAUGHT ERROR]', err);
    const loginUrl = new URL('/basecamp', request.url);
    loginUrl.searchParams.set('error', 'oauth_init_failed');
    return NextResponse.redirect(loginUrl);
  }
}

/**
 * POST /api/auth/google
 * Verifies a Google ID Token credential (e.g. from Google One Tap or GIS Client).
 */
export async function POST(request) {
  // CSRF Defense-in-depth
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden: Invalid request origin.' }, { status: 403 });
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = normalizeClientIp(forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');

  // Rate limit check
  const rateLimit = checkDualRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Too many login attempts. Please wait ${rateLimit.retryAfterSeconds} seconds.` },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
  }

  const { credential, returnTo } = body || {};

  if (!credential || typeof credential !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid Google credential token.' }, { status: 400 });
  }

  try {
    // Verify the Google ID Token via Google's tokeninfo API
    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
    );

    if (!googleRes.ok) {
      return NextResponse.json(
        { error: 'Google ID token verification failed. Please try again.' },
        { status: 401 }
      );
    }

    const tokenInfo = await googleRes.json();

    // Verify token audience against configured Google Client ID if provisioned
    const expectedClientId = process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    if (expectedClientId && tokenInfo.aud !== expectedClientId) {
      console.warn(`[SECURITY ALERT] Token audience mismatch: ${tokenInfo.aud} vs ${expectedClientId}`);
      return NextResponse.json({ error: 'Invalid Google token audience.' }, { status: 401 });
    }

    // Verify email verified flag
    if (tokenInfo.email_verified !== 'true' && tokenInfo.email_verified !== true) {
      return NextResponse.json({ error: 'Google account email is not verified.' }, { status: 401 });
    }

    const email = tokenInfo.email?.trim().toLowerCase();

    // Verify admin authorization
    if (!isAuthorizedAdminEmail(email)) {
      console.warn(`[SECURITY ALERT] Unauthorized Google ID token login attempt: ${email}`);
      return NextResponse.json(
        { error: `Access Denied: Google account (${email}) is not authorized as an administrator.` },
        { status: 403 }
      );
    }

    const sessionSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET_KEY;
    if (!sessionSecret) {
      return NextResponse.json(
        { error: 'Admin authentication service is not configured in environment.' },
        { status: 503 }
      );
    }

    // Issue cryptographic admin session token
    const sessionToken = createSessionToken(
      {
        email,
        role: 'admin',
        provider: 'google_id_token',
        sub: tokenInfo.sub,
      },
      sessionSecret
    );

    const safeRedirect = sanitizeRedirectUrl(returnTo, '/basecamp/overview');

    const response = NextResponse.json({
      success: true,
      email,
      redirectUrl: safeRedirect,
    });

    // Set secure HttpOnly cookie
    response.cookies.set(getAdminCookieName(), sessionToken, getCookieOptions());

    // Record audit log entry
    recordAdminAudit({
      adminEmail: email,
      action: 'ADMIN_LOGIN_GOOGLE',
      targetType: 'auth',
      targetId: tokenInfo.sub || 'google_token',
      details: { method: 'google_id_token', email },
      ipAddress: clientIp,
    }).catch(() => {});

    return response;
  } catch (err) {
    console.error('[GOOGLE ID TOKEN VERIFICATION ERROR]', err);
    return NextResponse.json({ error: 'Internal server error verifying Google token.' }, { status: 500 });
  }
}
