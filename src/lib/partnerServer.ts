import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { CollabLinkRecord, PartnerConversionRecord, PartnerDashboardData } from '@/types/collab';

/**
 * Generates an unguessable 32-character random partner token.
 */
export function generateRandomPartnerToken(): string {
  return crypto.randomUUID().replace(/-/g, '');
}

/**
 * Computes a secure, deterministic 24-character partner token fallback
 * for existing or unmigrated database records.
 */
export function getDeterministicPartnerToken(id: string, slug: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET_KEY || 'lifetrack-partner-secret-key';
  return crypto.createHmac('sha256', secret).update(`${id}:${slug.toLowerCase().trim()}`).digest('hex').slice(0, 24);
}

/**
 * Masks user email, username, or UUID to protect student PII on public partner dashboards.
 * e.g. "abhishekkumar@gmail.com" -> "ab***@gmail.com"
 * e.g. "104" or null -> "User #104"
 */
export function maskUserIdentifier(identifier?: string | null, index?: number): string {
  if (!identifier || identifier.trim() === '' || identifier === 'Not provided') {
    return `User #${(index ?? 0) + 101}`;
  }
  const clean = identifier.trim();
  if (clean.includes('@')) {
    const [local, domain] = clean.split('@');
    if (local.length <= 2) {
      return `${local.charAt(0)}***@${domain}`;
    }
    return `${local.slice(0, 2)}***@${domain}`;
  }
  if (clean.length > 8) {
    return `${clean.slice(0, 3)}****${clean.slice(-3)}`;
  }
  return `User #${(index ?? 0) + 101}`;
}

export interface PartnerAuthResult {
  success: boolean;
  status: number;
  error?: string;
  link?: CollabLinkRecord;
  data?: PartnerDashboardData;
}

/**
 * Fetches and verifies partner data for public read-only stats dashboard.
 * Requires matching partner token.
 */
export async function getPartnerDashboardData(
  slug: string,
  providedToken?: string | null
): Promise<PartnerAuthResult> {
  if (!slug) {
    return { success: false, status: 400, error: 'Partner slug is required.' };
  }

  const cleanSlug = slug.trim().toLowerCase();
  const supabase = getSupabaseAdmin();

  // 1. Fetch collab link record
  const { data, error } = await supabase
    .from('collab_links')
    .select('*')
    .ilike('slug', cleanSlug)
    .maybeSingle();

  if (error || !data) {
    return { success: false, status: 404, error: 'Partner campaign link not found.' };
  }

  const link = data as CollabLinkRecord;

  // 2. Resolve expected partner token
  const expectedToken = (link.partner_token && link.partner_token.trim().length > 0)
    ? link.partner_token.trim()
    : getDeterministicPartnerToken(link.id, link.slug);

  // 3. Strict security check: Token must be provided and must match
  if (!providedToken || providedToken.trim() !== expectedToken) {
    return {
      success: false,
      status: 401,
      error: 'Unauthorized: Invalid or missing partner security token.',
    };
  }

  // 4. Fetch real-time conversions filtered by referred_by = slug
  const conversions: PartnerConversionRecord[] = [];

  // A. Supabase auth.users check
  try {
    const { data: authData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (authData?.users) {
      authData.users.forEach((u, idx) => {
        const meta = u.user_metadata || {};
        const ref = (meta.referred_by || meta.referrer || meta.collab_partner || '').toString().toLowerCase().trim();
        const utmCamp = (meta.utm_campaign || '').toString().toLowerCase().trim();

        if (ref === cleanSlug || (link.campaign && utmCamp === link.campaign.toLowerCase().trim())) {
          conversions.push({
            id: u.id,
            maskedIdentifier: maskUserIdentifier(u.email || meta.email || u.id, idx),
            status: 'signed_up',
            campaign: link.campaign,
            timestamp: u.created_at,
          });
        }
      });
    }
  } catch (err) {
    console.warn('[Partner Dashboard Auth Fetch Warning]:', err instanceof Error ? err.message : err);
  }

  // B. Supabase profiles table check (if referred_by column exists)
  try {
    const { data: profileRows } = await supabase
      .from('profiles')
      .select('id, name, created_at, referred_by')
      .eq('referred_by', cleanSlug);

    if (profileRows && profileRows.length > 0) {
      profileRows.forEach((p, idx) => {
        if (!conversions.some((c) => c.id === p.id)) {
          conversions.push({
            id: p.id,
            maskedIdentifier: maskUserIdentifier(p.name || p.id, idx),
            status: 'signed_up',
            campaign: link.campaign,
            timestamp: p.created_at,
          });
        }
      });
    }
  } catch {
    // Graceful fallback if referred_by column is not on profiles
  }

  // C. PostHog Query API check (if POSTHOG_PERSONAL_API_KEY is configured)
  const posthogPersonalKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const posthogProjectId = process.env.POSTHOG_PROJECT_ID;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

  if (posthogPersonalKey && posthogProjectId) {
    try {
      const queryPayload = {
        query: {
          kind: 'HogQLQuery',
          query: `SELECT distinct_id, event, timestamp, properties.referred_by FROM events WHERE properties.referred_by = '${cleanSlug}' ORDER BY timestamp DESC LIMIT 100`,
        },
      };

      const phRes = await fetch(`${posthogHost}/api/projects/${posthogProjectId}/query/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${posthogPersonalKey}`,
        },
        body: JSON.stringify(queryPayload),
        signal: AbortSignal.timeout(3000),
      });

      if (phRes.ok) {
        const phData = await phRes.json();
        const results = phData?.results || [];
        results.forEach((row: [string, string, string, string], idx: number) => {
          const [distinctId, eventName, timestamp] = row;
          if (!conversions.some((c) => c.id === distinctId)) {
            conversions.push({
              id: distinctId,
              maskedIdentifier: maskUserIdentifier(distinctId, idx),
              status: eventName === 'user_signed_up' ? 'signed_up' : 'installed',
              campaign: link.campaign,
              timestamp,
            });
          }
        });
      }
    } catch (phErr) {
      console.warn('[Partner PostHog Fetch Warning]:', phErr instanceof Error ? phErr.message : phErr);
    }
  }

  // 5. Compute key performance metrics
  const clicksCount = Number(link.clicks_count) || 0;
  const conversionsCount = conversions.length;
  const conversionRate = clicksCount > 0
    ? `${((conversionsCount / clicksCount) * 100).toFixed(1)}%`
    : '0.0%';

  // Sort conversions descending by date
  conversions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return {
    success: true,
    status: 200,
    link,
    data: {
      partnerName: link.name,
      slug: link.slug,
      platform: link.platform,
      campaign: link.campaign,
      isActive: link.is_active,
      clicksCount,
      conversionsCount,
      conversionRate,
      conversions,
      lastUpdated: new Date().toISOString(),
    },
  };
}
