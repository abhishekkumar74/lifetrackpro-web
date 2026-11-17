import { NextRequest, NextResponse, after } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { buildPlayStoreDestinationUrl } from '@/lib/collabUtils';
import { PostHogCollabEventProperties } from '@/types/collab';

export const dynamic = 'force-dynamic';

const DEFAULT_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.lifetrackpro.app';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * Server-side PostHog Event Dispatcher
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
          $lib: 'lifetrack-nextjs-server-collab',
        },
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch (err) {
    console.warn('[PostHog Server Dispatch Warning]:', err instanceof Error ? err.message : err);
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug: rawSlug } = await context.params;

  if (!rawSlug) {
    return NextResponse.redirect(DEFAULT_PLAY_STORE_URL, 302);
  }

  const slug = rawSlug.trim().toLowerCase();
  const searchParams = request.nextUrl.searchParams;

  try {
    const supabase = getSupabaseAdmin();

    // Fetch ONLY required columns from collab_links
    const { data: link, error } = await supabase
      .from('collab_links')
      .select('id, slug, name, platform, campaign, destination_type, is_active, clicks_count')
      .ilike('slug', slug)
      .maybeSingle();

    // If link not found or inactive, redirect immediately to default Play Store page
    if (error || !link || !link.is_active) {
      return NextResponse.redirect(DEFAULT_PLAY_STORE_URL, 302);
    }

    // Extract UTM parameters or fallback to link record defaults
    const utmSource = searchParams.get('utm_source') || link.platform || 'other';
    const utmCampaign = searchParams.get('utm_campaign') || link.campaign || 'collab';
    const referredBy = searchParams.get('referred_by') || link.slug;

    // Prepare exact destination URL with double-encoded referrer
    const destinationUrl = buildPlayStoreDestinationUrl(utmSource, utmCampaign, link.slug);

    // Prepare PostHog event properties
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

    // CRITICAL FOR SUB-200ms SPEED:
    // Execute click-counting & PostHog dispatch in the background AFTER the HTTP response is sent.
    after(async () => {
      await Promise.allSettled([
        // 1. Atomic click increment in Supabase
        (async () => {
          try {
            await supabase.rpc('increment_collab_click', { link_slug: link.slug });
          } catch {
            await supabase
              .from('collab_links')
              .update({ clicks_count: (link.clicks_count || 0) + 1 })
              .eq('id', link.id);
          }
        })(),
        // 2. PostHog single dispatch
        capturePostHogServerEvent(anonDistinctId, 'collab_link_landed', eventProperties),
      ]);
    });

    // Return instant 302 redirect with no-cache headers
    const response = NextResponse.redirect(destinationUrl, 302);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;
  } catch (err) {
    console.error('[Collab Redirect Error]:', err);
    return NextResponse.redirect(DEFAULT_PLAY_STORE_URL, 302);
  }
}
