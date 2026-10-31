import { NextResponse } from 'next/server';
import { 
  verifyPassword, 
  createSessionToken, 
  getAdminCookieName, 
  getCookieOptions, 
  timingSafeEqualStrings, 
  sanitizeRedirectUrl,
  verifyCsrfOrigin
} from '@/lib/auth';
import { 
  checkDualRateLimit, 
  recordFailedDualAttempt, 
  resetDualRateLimit,
  normalizeClientIp 
} from '@/lib/rateLimit';

export async function POST(request) {
  // CSRF Defense-in-depth: Verify origin for state-changing authentication request
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden: Invalid request origin.' }, { status: 403 });
  }

  // 1. Extract and normalize Client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const rawIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
  const clientIp = normalizeClientIp(rawIp);

  // 2. Initial rate limit check on IP
  const initialLimit = checkDualRateLimit(clientIp);
  if (!initialLimit.allowed) {
    return NextResponse.json(
      { 
        error: `Too many failed login attempts. Please wait ${initialLimit.retryAfterSeconds} seconds before trying again.` 
      },
      { 
        status: 429,
        headers: {
          'Retry-After': String(initialLimit.retryAfterSeconds || 900),
        }
      }
    );
  }

  // 3. Parse and Validate Request Payload
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
  }

  const { email, password, returnTo } = body || {};

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  // 4. Secondary dual-key rate limit check on target account email
  const dualLimit = checkDualRateLimit(clientIp, email);
  if (!dualLimit.allowed) {
    return NextResponse.json(
      { 
        error: `Too many failed login attempts. Please wait ${dualLimit.retryAfterSeconds} seconds before trying again.` 
      },
      { 
        status: 429,
        headers: {
          'Retry-After': String(dualLimit.retryAfterSeconds || 900),
        }
      }
    );
  }

  // 5. Inspect Server Environment Configuration
  const adminEmail = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const passwordSalt = process.env.ADMIN_PASSWORD_SALT;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET_KEY;

  if (!adminEmail || !passwordHash || !passwordSalt || !sessionSecret) {
    console.error('[SECURITY ALERT] Admin credentials or session secret not provisioned in environment.');
    return NextResponse.json(
      { error: 'Admin authentication service is not configured. Please provision server credentials in .env.local.' },
      { status: 503 }
    );
  }

  // 6. Verify Credentials in Constant Time
  const isEmailMatch = timingSafeEqualStrings(email.trim().toLowerCase(), adminEmail.toLowerCase());
  const isPasswordMatch = isEmailMatch && verifyPassword(password, passwordHash, passwordSalt);

  if (!isEmailMatch || !isPasswordMatch) {
    recordFailedDualAttempt(clientIp, email);
    // Generic failure message — never expose whether email or password was the mismatched field
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  // 7. Reset Dual Rate Limiter & Issue Cryptographic Session Token
  resetDualRateLimit(clientIp, email);

  const sessionToken = createSessionToken(
    { 
      email: adminEmail, 
      role: 'admin',
    }, 
    sessionSecret
  );

  const safeRedirect = sanitizeRedirectUrl(returnTo, '/basecamp/overview');

  const response = NextResponse.json({ 
    success: true, 
    redirectUrl: safeRedirect 
  });

  // 8. Attach Secure, HttpOnly Session Cookie
  response.cookies.set(getAdminCookieName(), sessionToken, getCookieOptions());

  return response;
}
