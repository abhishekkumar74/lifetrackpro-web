import Link from 'next/link';
import { CollabLinkManager } from '@/components/admin/CollabLinkManager';

export const metadata = {
  title: 'Collab & Campaign Tracking — Basecamp Admin',
  robots: { index: false, follow: false },
};

export default function BasecampCollabPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0B0F19', padding: '24px 16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          href="/basecamp/overview"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#94A3B8',
            fontSize: '13px',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          ← Back to Basecamp Overview
        </Link>

        <span style={{ fontSize: '12px', color: '#64748B' }}>
          LifeTrack Pro Attribution Portal
        </span>
      </div>

      <CollabLinkManager />
    </div>
  );
}
