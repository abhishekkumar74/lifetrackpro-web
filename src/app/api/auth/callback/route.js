import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { 
  createSessionToken, 
  getAdminCookieName, 
  getCookieOptions, 
  isAuthorizedAdminEmail, 
  sanitizeRedirectUrl 
} from '@/lib/auth';
import { recordAdminAudit } from '@/lib/auditLog';
import { normalizeClientIp } from '@/lib/rateLimit';

/**
 * GET /api/auth/callback
 * Handles OAuth code exchange for Supabase Google authentication.
 * Enforces strict administrator authorization before granting session access.
 */
export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/basecamp/overview';
  const errorParam = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = normalizeClientIp(forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');

  // Handle provider cancellation or denial
  if (errorParam || errorDescription) {
    console.warn('[GOOGLE OAUTH ERROR]', errorParam, errorDescription);
    const loginUrl = new URL('/basecamp', request.url);
    loginUrl.searchParams.set('error', 'google_access_denied');
    return NextResponse.redirect(loginUrl);
  }

  if (!code) {
    const loginUrl = new URL('/basecamp', request.url);
    loginUrl.searchParams.set('error', 'missing_auth_code');
    return NextResponse.redirect(loginUrl);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    console.error('[AUTH CALLBACK ERROR] Supabase URL or Anon Key is missing');
    const loginUrl = new URL('/basecamp', request.url);
    loginUrl.searchParams.set('error', 'auth_not_configured');
    return NextResponse.redirect(loginUrl);
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Handled safely in Server Route
        }
      },
    },
  });

  try {
    // 1. Exchange authorization code for Supabase user session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data?.user) {
      console.error('[CODE EXCHANGE ERROR]', error?.message || error);
      const loginUrl = new URL('/basecamp', request.url);
      loginUrl.searchParams.set('error', 'session_exchange_failed');
      return NextResponse.redirect(loginUrl);
    }

    const authenticatedEmail = data.user.email?.trim().toLowerCase();

    // 2. Strict Authorization Gate: verify user is an authorized administrator
    if (!authenticatedEmail || !isAuthorizedAdminEmail(authenticatedEmail)) {
      console.warn(`[SECURITY ALERT] Unauthorized Google account attempt: ${authenticatedEmail}`);
      // Clean up Supabase session so an unprivileged user does not retain an active Supabase auth token
      await supabase.auth.signOut().catch(() => {});

      const loginUrl = new URL('/basecamp', request.url);
      loginUrl.searchParams.set('error', 'unauthorized_email');
      loginUrl.searchParams.set('email', authenticatedEmail || 'unknown');
      return NextResponse.redirect(loginUrl);
    }

    // 3. User is authorized! Issue cryptographic admin session cookie
    const sessionSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET_KEY;
    if (!sessionSecret) {
      console.error('[SECURITY ERROR] ADMIN_SESSION_SECRET is missing');
      const loginUrl = new URL('/basecamp', request.url);
      loginUrl.searchParams.set('error', 'auth_not_configured');
      return NextResponse.redirect(loginUrl);
    }

    const sessionToken = createSessionToken(
      {
        email: authenticatedEmail,
        role: 'admin',
        provider: 'google',
        provider_id: data.user.id,
      },
      sessionSecret
    );

    const cookieOptions = getCookieOptions();
    const cookieName = getAdminCookieName();

    // 4. Attach session token to cookieStore (Next.js server-side async store)
    try {
      cookieStore.set(cookieName, sessionToken, cookieOptions);
    } catch (cookieErr) {
      console.warn('[COOKIE STORE SET WARN]', cookieErr?.message);
    }

    const safeRedirect = sanitizeRedirectUrl(next, '/basecamp/overview');
    const redirectUrl = new URL(safeRedirect, request.url);

    // 5. Construct 303 See Other redirect response so browser transitions cleanly via GET
    const redirectResponse = NextResponse.redirect(redirectUrl, 303);

    // 6. Explicitly attach session cookie to redirect response headers
    redirectResponse.cookies.set(cookieName, sessionToken, cookieOptions);

    // Synchronize any Supabase session cookies created during code exchange
    try {
      cookieStore.getAll().forEach((c) => {
        redirectResponse.cookies.set(c.name, c.value);
      });
    } catch {
      // safe fallback
    }

    // Strictly prevent intermediary proxies or browser from caching OAuth callback redirect
    redirectResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    redirectResponse.headers.set('Pragma', 'no-cache');

    // 7. Record Audit Trail
    recordAdminAudit({
      adminEmail: authenticatedEmail,
      action: 'ADMIN_LOGIN_GOOGLE',
      targetType: 'auth',
      targetId: data.user.id || 'google_oauth',
      details: {
        method: 'google_oauth',
        email: authenticatedEmail,
        loginTime: new Date().toISOString(),
      },
      ipAddress: clientIp,
    }).catch(() => {});

    return redirectResponse;
  } catch (err) {
    console.error('[CALLBACK UNCAUGHT ERROR]', err);
    const loginUrl = new URL('/basecamp', request.url);
    loginUrl.searchParams.set('error', 'session_exchange_failed');
    return NextResponse.redirect(loginUrl);
  }
}
