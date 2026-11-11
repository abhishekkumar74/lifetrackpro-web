import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { buildPlayStoreDestinationUrl } from '@/lib/collabUtils';
import { CollabRedirectClient } from './CollabRedirectClient';
import { CollabLinkRecord, PostHogCollabEventProperties } from '@/types/collab';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Join LifeTrack Pro | ${slug}`,
    description: 'Track your study hours, build streaks, and crush your competitive exams with LifeTrack Pro.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Server-side PostHog Event Dispatcher
 * Guarantees event delivery independent of client browsers/ad-blockers.
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
          $lib: 'lifetrack-nextjs-server',
        },
      }),
      // Short timeout so page render is never delayed
      signal: AbortSignal.timeout(1500),
    });
  } catch (err) {
    console.warn('[PostHog Server Dispatch Warning]:', err instanceof Error ? err.message : err);
  }
}

export default async function CollabLandingPage({ params, searchParams }: PageProps) {
  const { slug: rawSlug } = await params;
  const resolvedSearchParams = await searchParams;

  if (!rawSlug) {
    return notFound();
  }

  const slug = rawSlug.trim().toLowerCase();
  const supabase = getSupabaseAdmin();

  // 1. Fetch link details
  const { data, error } = await supabase
    .from('collab_links')
    .select('*')
    .ilike('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0F19',
          color: '#F8FAFC',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '420px',
            background: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '36px 24px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>
            Link Not Found or Inactive
          </h1>
          <p style={{ fontSize: '14px', color: '#94A3B8', margin: '0 0 24px' }}>
            This partner link is expired or does not exist. You can still download LifeTrack Pro directly from the Google Play Store.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
            style={{
              display: 'inline-block',
              width: '100%',
              padding: '12px 20px',
              background: '#2563EB',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: '12px',
              textDecoration: 'none',
            }}
          >
            Download LifeTrack Pro
          </a>
        </div>
      </div>
    );
  }

  const link = data as CollabLinkRecord;

  if (!link.is_active) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0F19',
          color: '#F8FAFC',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '420px',
            background: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '36px 24px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>
            Campaign Concluded
          </h1>
          <p style={{ fontSize: '14px', color: '#94A3B8', margin: '0 0 24px' }}>
            This collaborative campaign link has been paused. You can still get LifeTrack Pro on Google Play.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
            style={{
              display: 'inline-block',
              width: '100%',
              padding: '12px 20px',
              background: '#2563EB',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: '12px',
              textDecoration: 'none',
            }}
          >
            Go to Play Store
          </a>
        </div>
      </div>
    );
  }

  // 2. Safe Atomic Increment of click count in DB
  try {
    await supabase.rpc('increment_collab_click', { link_slug: link.slug });
  } catch {
    // Fallback direct update if RPC is not created yet
    await supabase
      .from('collab_links')
      .update({ clicks_count: (link.clicks_count || 0) + 1 })
      .eq('id', link.id);
  }

  // 3. Prepare PostHog event properties
  const eventProperties: PostHogCollabEventProperties = {
    collab_partner: link.slug,
    partner_name: link.name,
    utm_source: (resolvedSearchParams?.utm_source as string) || link.platform,
    utm_campaign: (resolvedSearchParams?.utm_campaign as string) || link.campaign,
    referred_by: (resolvedSearchParams?.referred_by as string) || link.slug,
    destination: link.destination_type || 'play_store',
  };

  // 4. Server-Side PostHog Dispatch
  const anonDistinctId = `usr_${slug}_${link.id || 'visit'}`;
  await capturePostHogServerEvent(anonDistinctId, 'collab_link_landed', eventProperties);

  // 5. Build Google Play redirect destination URL
  const destinationUrl = buildPlayStoreDestinationUrl(
    eventProperties.utm_source,
    eventProperties.utm_campaign,
    link.slug
  );

  return (
    <CollabRedirectClient
      destinationUrl={destinationUrl}
      partnerName={link.name}
      eventPayload={eventProperties}
      posthogApiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
      posthogHost={process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'}
    />
  );
}
