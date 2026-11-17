import { Metadata } from 'next';
import Link from 'next/link';
import { getPartnerDashboardData } from '@/lib/partnerServer';
import { PartnerDashboardView } from '@/components/partner/PartnerDashboardView';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const token = typeof resolvedSearchParams?.token === 'string' ? resolvedSearchParams.token : null;

  const result = await getPartnerDashboardData(slug, token);
  if (!result.success || !result.data) {
    return {
      title: 'Partner Dashboard | LifeTrack Pro',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${result.data.partnerName} — Live Partner Attribution Stats | LifeTrack Pro`,
    description: `Real-time campaign analytics, link clicks, and student conversions for ${result.data.partnerName}.`,
    robots: { index: false, follow: false },
  };
}

export default async function PartnerDashboardPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const token = typeof resolvedSearchParams?.token === 'string' ? resolvedSearchParams.token : null;

  const result = await getPartnerDashboardData(slug, token);

  // If link not found or token invalid, render secure unauthorized barrier
  if (!result.success || !result.data) {
    const isNotFound = result.status === 404;

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
            maxWidth: '460px',
            width: '100%',
            background: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '40px 28px',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 20px',
              borderRadius: '16px',
              background: isNotFound ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              border: isNotFound ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
            }}
          >
            {isNotFound ? '🔍' : '🔒'}
          </div>

          <h1 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 10px', color: '#FFFFFF' }}>
            {isNotFound ? 'Campaign Not Found' : 'Private Partner Dashboard'}
          </h1>

          <p style={{ fontSize: '13.5px', color: '#94A3B8', margin: '0 0 24px', lineHeight: 1.6 }}>
            {isNotFound
              ? `No partner link exists for "${slug}". Please check the spelling or ask your campaign manager.`
              : 'Access to this live partner attribution dashboard is protected and requires an authentic partner security token in the link.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                width: '100%',
                padding: '12px 20px',
                background: '#2563EB',
                color: '#FFFFFF',
                fontWeight: 650,
                fontSize: '13.5px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
              }}
            >
              Return to LifeTrack Pro Home
            </Link>

            <a
              href="mailto:admin@lifetrackpro.in?subject=Partner%20Dashboard%20Access%20Request"
              style={{
                display: 'inline-block',
                width: '100%',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#CBD5E1',
                fontWeight: 600,
                fontSize: '13px',
                borderRadius: '12px',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              Contact Campaign Administrator
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <PartnerDashboardView initialData={result.data} />;
}
