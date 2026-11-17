import { NextRequest, NextResponse, after } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { buildPlayStoreDestinationUrl } from '@/lib/collabUtils';
import { PostHogCollabEventProperties, CollabLinkRecord } from '@/types/collab';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const DEFAULT_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.lifetrackpro.app';
const CACHE_TTL_MS = 60_000; // 60 seconds TTL

type CollabLinkCacheRecord = Pick<
  CollabLinkRecord,
  'id' | 'slug' | 'name' | 'platform' | 'campaign' | 'destination_type' | 'is_active' | 'clicks_count'
>;

interface CachedLink {
  data: CollabLinkCacheRecord;
  expiresAt: number;
}

// In-memory cache for active collab links to eliminate repeated Supabase queries
const linkCache = new Map<string, CachedLink>();

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * Edge-compatible Server-side PostHog Event Dispatcher
 * Dispatches attribution analytics asynchronously in the background.
 */
async function capturePostHogServerEvent(
  distinctId: string,
  event: string,
  properties: PostHogCollabEventProperties
): Promise<void> {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.POSTHOG_KEY;
  if (!posthogKey) return;

  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

  try {
    await fetch(`${posthogHost}/capture/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: posthogKey,
        event,
        distinct_id: distinctId,
        properties: {
          ...properties,
          $lib: 'lifetrack-edge-server-collab',
        },
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch (err) {
    console.warn('[PostHog Edge Dispatch Warning]:', err instanceof Error ? err.message : err);
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug: rawSlug } = await context.params;

  if (!rawSlug) {
    return NextResponse.redirect(DEFAULT_PLAY_STORE_URL, 302);
  }

  const slug = rawSlug.trim().toLowerCase();
  const searchParams = request.nextUrl.searchParams;
  const now = Date.now();

  try {
    const supabase = getSupabaseAdmin();

    // 1. Check in-memory cache for an active record
    const cached = linkCache.get(slug);
    let link: CollabLinkCacheRecord | null =
      cached && cached.expiresAt > now && cached.data.is_active ? cached.data : null;

    // 2. On cache miss or expired entry, fetch from Supabase
    if (!link) {
      const { data, error } = await supabase
        .from('collab_links')
        .select('id, slug, name, platform, campaign, destination_type, is_active, clicks_count')
        .ilike('slug', slug)
        .maybeSingle();

      // If link not found or inactive, purge old cached entry (if any) and redirect to default Play Store
      if (error || !data || !data.is_active) {
        if (cached) linkCache.delete(slug);
        return NextResponse.redirect(DEFAULT_PLAY_STORE_URL, 302);
      }

      link = data as CollabLinkCacheRecord;

      // Only cache records where is_active === true
      linkCache.set(slug, {
        data: link,
        expiresAt: now + CACHE_TTL_MS,
      });
    }

    // 3. Extract UTM parameters or fallback to link record defaults
    const utmSource = searchParams.get('utm_source') || link.platform || 'other';
    const utmCampaign = searchParams.get('utm_campaign') || link.campaign || 'collab';
    const referredBy = searchParams.get('referred_by') || link.slug;

    // 4. Prepare exact destination URL with double-encoded referrer (locked to https://play.google.com/...)
    const destinationUrl = buildPlayStoreDestinationUrl(utmSource, utmCampaign, link.slug);

    // 5. Prepare PostHog event properties
    const eventProperties: PostHogCollabEventProperties = {
      collab_partner: link.slug,
      partner_name: link.name,
      utm_source: utmSource,
      utm_campaign: utmCampaign,
      referred_by: referredBy,
      destination: link.destination_type || 'play_store',
      referrer_url: request.headers.get('referer') || undefined,
      user_agent: request.headers.get('user-agent') || undefined,
    };

    const anonDistinctId = `usr_${slug}_${link.id || 'visit'}`;
    const linkSlug = link.slug;
    const linkId = link.id;
    const fallbackCount = link.clicks_count || 0;

    // 6. CRITICAL FOR SPEED: Non-blocking background task running on EVERY request (cache hit or miss)
    after(async () => {
      await Promise.allSettled([
        // Atomic click increment in Supabase
        (async () => {
          try {
            await supabase.rpc('increment_collab_click', { link_slug: linkSlug });
          } catch {
            await supabase
              .from('collab_links')
              .update({ clicks_count: fallbackCount + 1 })
              .eq('id', linkId);
          }
        })(),
        // PostHog event dispatch
        capturePostHogServerEvent(anonDistinctId, 'collab_link_landed', eventProperties),
      ]);
    });

    // 7. Instant 302 redirect with no-cache headers
    const response = NextResponse.redirect(destinationUrl, 302);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;
  } catch (err) {
    console.error('[Collab Edge Redirect Error]:', err);
    return NextResponse.redirect(DEFAULT_PLAY_STORE_URL, 302);
  }
}
