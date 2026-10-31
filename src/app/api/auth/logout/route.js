import { NextResponse } from 'next/server';
import { getAdminCookieName, getCookieOptions, verifyCsrfOrigin } from '@/lib/auth';

/**
 * POST /api/auth/logout
 * Strictly invalidates the admin session cookie.
 * Requires POST method and verifies same-origin request to prevent logout CSRF.
 */
export async function POST(request) {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { error: 'Forbidden: Cross-site logout request rejected.' },
      { status: 403 }
    );
  }

  const response = NextResponse.json({ success: true, redirectUrl: '/basecamp' });

  // Invalidate session cookie immediately
  response.cookies.set(getAdminCookieName(), '', {
    ...getCookieOptions(),
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}

/**
 * Reject GET requests with 405 Method Not Allowed to eliminate Logout CSRF via <img> tags or links.
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed: Session destruction requires a POST request.' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
