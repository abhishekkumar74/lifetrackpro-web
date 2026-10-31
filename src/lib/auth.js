import crypto from 'node:crypto';

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

/**
 * Get cookie name appropriate for environment.
 * In production over HTTPS, use __Host- prefix for strongest origin isolation.
 */
export function getAdminCookieName() {
  return 'ltp_admin_session';
}

/**
 * Standard cookie configuration flags.
 */
export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60, // 8 hours in seconds
  };
}

/**
 * Timing-safe string comparison.
 */
export function timingSafeEqualStrings(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Cryptographic scrypt password hashing.
 */
export function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

/**
 * Verify plaintext password against stored scrypt hash in constant time.
 */
export function verifyPassword(password, storedHash, salt) {
  if (!password || !storedHash || !salt) return false;
  try {
    const computedHash = hashPassword(password, salt);
    return timingSafeEqualStrings(computedHash, storedHash);
  } catch {
    return false;
  }
}

/**
 * Create a signed, tamper-proof session token.
 */
export function createSessionToken(data, secret) {
  if (!secret) throw new Error('SESSION_SECRET is required to create session tokens.');
  
  const payload = {
    ...data,
    iat: Date.now(),
    exp: Date.now() + SESSION_DURATION_MS,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify a signed session token in constant time and ensure it has not expired.
 */
export function verifySessionToken(token, secret) {
  if (!token || typeof token !== 'string' || !secret) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payloadB64)
      .digest('base64url');

    if (!timingSafeEqualStrings(signature, expectedSignature)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));

    // Check expiration timestamp
    if (!payload.exp || typeof payload.exp !== 'number' || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Validate a redirect URL to prevent open redirect vulnerabilities.
 * Only allows relative paths on the same origin.
 */
export function sanitizeRedirectUrl(url, defaultFallback = '/basecamp/overview') {
  if (!url || typeof url !== 'string') return defaultFallback;
  const trimmed = url.trim();
  // Must start with a single slash, not double slash (//evil.com) and no protocol
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.includes('://')) {
    return trimmed;
  }
  return defaultFallback;
}

/**
 * Strict Session Authenticator for all Browser-Facing Admin Endpoints and Mutations.
 * Strictly requires and validates the signed, non-expired HttpOnly session cookie.
 * Does NOT accept static Bearer headers or client-side tokens.
 */
export function verifyAdminSession(request) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET_KEY;
  if (!sessionSecret) return null;

  const cookieName = getAdminCookieName();
  const sessionCookie = request.cookies?.get?.(cookieName)?.value || request.cookies?.get?.('ltp_admin_session')?.value || request.cookies?.get?.('__Host-ltp_admin_session')?.value;
  if (!sessionCookie) return null;

  return verifySessionToken(sessionCookie, sessionSecret);
}

/**
 * Validates a standard UUID string format.
 */
export function isValidUUID(id) {
  if (!id || typeof id !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id.trim());
}

/**
 * Sanitizes search query input for PostgREST query builders.
 * Strips PostgREST filter delimiter characters and bounds string length.
 */
export function sanitizeSearchQuery(query) {
  if (!query || typeof query !== 'string') return '';
  return query.replace(/[(),."'\\]/g, '').trim().slice(0, 100);
}

/**
 * Validates Origin/Referer header against Host header for state-changing requests.
 * Defense-in-depth against Cross-Site Request Forgery (CSRF).
 */
export function verifyCsrfOrigin(request) {
  const method = request.method?.toUpperCase();
  // Safe idempotent methods do not mutate state
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return true;

  const host = request.headers.get('host');
  const origin = request.headers.get('origin');

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      return originHost === host;
    } catch {
      return false;
    }
  }

  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      return refererHost === host;
    } catch {
      return false;
    }
  }

  // Non-browser requests without origin or referer (e.g. server-to-server or test runners)
  // are allowed if session authentication is verified.
  return true;
}

/**
 * Standardized session verifier.
 */
export function verifyAdminRequest(request) {
  return verifyAdminSession(request);
}

/**
 * Validates whether an email address belongs to an authorized administrator.
 * Compares against primary ADMIN_EMAIL and any entries in ADMIN_ALLOWED_EMAILS in constant time.
 */
export function isAuthorizedAdminEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const normalized = email.trim().toLowerCase();

  const primaryAdmin = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  if (primaryAdmin && timingSafeEqualStrings(normalized, primaryAdmin)) {
    return true;
  }

  const allowedList = (process.env.ADMIN_ALLOWED_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

  for (const allowed of allowedList) {
    if (timingSafeEqualStrings(normalized, allowed)) {
      return true;
    }
  }

  return false;
}

