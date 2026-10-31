import { NextResponse } from 'next/server';
import { 
  verifySessionToken, 
  getAdminCookieName, 
  verifyCsrfOrigin 
} from './lib/auth';

/**
 * Server-Side Route Guard (Next.js 16 Proxy Convention)
 * Enforces session-based authentication and route protection at the network boundary.
 */
export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET_KEY;
  const cookieName = getAdminCookieName();
  const sessionCookie = request.cookies.get(cookieName)?.value;

  // 1. Check existing session validity
  const validSession = sessionSecret ? verifySessionToken(sessionCookie, sessionSecret) : null;

  // 2. Legacy Route Redirects (for backwards compatibility)
  if (pathname === '/admin' || pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/basecamp', request.url));
  }
  if (pathname.startsWith('/secret-admin-portal')) {
    return NextResponse.redirect(new URL('/basecamp/overview', request.url));
  }

  // 3. Handle /basecamp Login Gate
  if (pathname === '/basecamp') {
    // If admin is already authenticated, redirect them directly to the operations console
    if (validSession) {
      const portalUrl = new URL('/basecamp/overview', request.url);
      return NextResponse.redirect(portalUrl);
    }
    return NextResponse.next();
  }

  // 4. Intercept protected administrative paths — strictly require valid, signed admin session
  if (
    pathname.startsWith('/basecamp/overview') ||
    pathname.startsWith('/api/admin')
  ) {
    const isAuthorized = Boolean(validSession);

    if (!isAuthorized) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[PROXY GUARD] Access denied to ${pathname}. Cookie "${cookieName}": ${sessionCookie ? 'PRESENT' : 'MISSING'}.`);
      }
      // For API requests, return JSON 401 Unauthorized
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized: Administrative authentication required.' },
          { status: 401 }
        );
      }

      // For browser navigation, redirect to /basecamp with sanitized returnTo
      const loginUrl = new URL('/basecamp', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 5. Enforce CSRF Origin verification for state-changing API mutations
    if (pathname.startsWith('/api/admin')) {
      const method = request.method?.toUpperCase();
      if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
        if (!verifyCsrfOrigin(request)) {
          return NextResponse.json(
            { error: 'Forbidden: Cross-site request rejected (CSRF protection).' },
            { status: 403 }
          );
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/basecamp',
    '/basecamp/:path*',
    '/admin',
    '/admin/:path*',
    '/secret-admin-portal',
    '/secret-admin-portal/:path*',
    '/api/admin/:path*',
  ],
};
