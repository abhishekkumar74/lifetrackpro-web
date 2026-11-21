import { NextResponse } from 'next/server';
import { createSessionToken, getAdminCookieName, getCookieOptions } from '@/lib/auth';

/**
 * GET /api/auth/dev-session
 * Local development only: Issues signed session cookie for fast local verification.
 * Strictly blocked in production environments.
 */
export async function GET(request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  const sessionSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@lifetrackpro.in';

  const sessionToken = createSessionToken(
    {
      email: adminEmail,
      role: 'admin',
      authMethod: 'local-dev',
    },
    sessionSecret
  );

  const redirectUrl = new URL('/basecamp/overview', request.url);
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(getAdminCookieName(), sessionToken, getCookieOptions());
  return response;
}
