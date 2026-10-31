/**
 * In-memory sliding window rate limiter for admin authentication attempts.
 * 
 * ARCHITECTURE NOTICE & SERVERLESS LIMITATIONS:
 * This rate limiter operates in-memory on the active Node.js server instance.
 * In a multi-instance or serverless edge deployment, rate-limiting state is maintained
 * per instance rather than globally across all instances. For globally synchronized
 * distributed rate-limiting, an external store (e.g., Upstash Redis) would be required.
 * Within a single instance or container, this provides effective brute-force throttling.
 */

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

// Map of key -> { attempts: number, firstAttemptTime: number, blockedUntil: number }
const attemptsStore = new Map();

// Periodic cleanup every 10 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of attemptsStore.entries()) {
      if (now - record.firstAttemptTime > WINDOW_MS && now > (record.blockedUntil || 0)) {
        attemptsStore.delete(key);
      }
    }
  }, 10 * 60 * 1000).unref?.();
}

/**
 * Normalizes and validates client IP format to prevent arbitrary string injection.
 */
export function normalizeClientIp(rawIp) {
  if (!rawIp || typeof rawIp !== 'string') return '127.0.0.1';
  const trimmed = rawIp.trim();
  // Basic IPv4 or IPv6 pattern
  const isIpv4 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(trimmed);
  const isIpv6 = /^[0-9a-fA-F:]+$/.test(trimmed);
  return (isIpv4 || isIpv6) ? trimmed : 'untrusted-client';
}

/**
 * Check if a key (IP or account identifier) is rate-limited.
 */
function checkKeyLimit(key) {
  const now = Date.now();
  const record = attemptsStore.get(key);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // If blocked, check if block period has expired
  if (record.blockedUntil && now < record.blockedUntil) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds,
    };
  }

  // If the sliding window has expired, reset
  if (now - record.firstAttemptTime > WINDOW_MS) {
    attemptsStore.delete(key);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - record.attempts);
  return {
    allowed: record.attempts < MAX_ATTEMPTS,
    remainingAttempts: remaining,
  };
}

/**
 * Record a failed attempt for a key.
 */
function recordKeyFailedAttempt(key) {
  const now = Date.now();
  const record = attemptsStore.get(key);

  if (!record || now - record.firstAttemptTime > WINDOW_MS) {
    attemptsStore.set(key, {
      attempts: 1,
      firstAttemptTime: now,
      blockedUntil: null,
    });
    return;
  }

  record.attempts += 1;
  if (record.attempts >= MAX_ATTEMPTS) {
    record.blockedUntil = now + WINDOW_MS; // Block for 15 minutes
  }
}

/**
 * Standard IP-based rate limit check (backwards compatible).
 */
export function checkLoginRateLimit(ip) {
  const normalized = normalizeClientIp(ip);
  return checkKeyLimit(`ip:${normalized}`);
}

export function recordFailedLoginAttempt(ip) {
  const normalized = normalizeClientIp(ip);
  recordKeyFailedAttempt(`ip:${normalized}`);
}

export function resetLoginRateLimit(ip) {
  const normalized = normalizeClientIp(ip);
  attemptsStore.delete(`ip:${normalized}`);
}

/**
 * Dual-key rate limit check: throttles both by client IP and target account email.
 * Prevents attackers from cycling IP addresses to brute force an administrator account.
 */
export function checkDualRateLimit(ip, accountEmail) {
  const ipCheck = checkLoginRateLimit(ip);
  if (!ipCheck.allowed) return ipCheck;

  if (accountEmail && typeof accountEmail === 'string') {
    const emailKey = `email:${accountEmail.trim().toLowerCase()}`;
    const emailCheck = checkKeyLimit(emailKey);
    if (!emailCheck.allowed) return emailCheck;
  }

  return ipCheck;
}

export function recordFailedDualAttempt(ip, accountEmail) {
  recordFailedLoginAttempt(ip);
  if (accountEmail && typeof accountEmail === 'string') {
    recordKeyFailedAttempt(`email:${accountEmail.trim().toLowerCase()}`);
  }
}

export function resetDualRateLimit(ip, accountEmail) {
  resetLoginRateLimit(ip);
  if (accountEmail && typeof accountEmail === 'string') {
    attemptsStore.delete(`email:${accountEmail.trim().toLowerCase()}`);
  }
}
