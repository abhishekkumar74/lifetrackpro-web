'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PartnerDashboardData, CollabPlatform } from '@/types/collab';

const PLATFORM_INFO: Record<CollabPlatform, { label: string; icon: string; bg: string; color: string; border: string }> = {
  youtube: { label: 'YouTube', icon: '▶️', bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  instagram: { label: 'Instagram', icon: '📸', bg: '#FDF2F8', color: '#DB2777', border: '#FBCFE8' },
  telegram: { label: 'Telegram', icon: '✈️', bg: '#F0F9FF', color: '#0284C7', border: '#BAE6FD' },
  campus: { label: 'Campus Ambassador', icon: '🎓', bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
  other: { label: 'Partner Channel', icon: '🌐', bg: '#F8FAFC', color: '#475569', border: '#E2E8F0' },
};

interface PartnerDashboardViewProps {
  initialData: PartnerDashboardData;
}

export function PartnerDashboardView({ initialData }: PartnerDashboardViewProps) {
  const [data, setData] = useState<PartnerDashboardData>(initialData);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const platformMeta = PLATFORM_INFO[data.platform] || PLATFORM_INFO.other;

  // Filter conversions by search term
  const filteredConversions = useMemo(() => {
    if (!searchTerm.trim()) return data.conversions;
    const term = searchTerm.toLowerCase();
    return data.conversions.filter(
      (c) =>
        c.maskedIdentifier.toLowerCase().includes(term) ||
        c.status.toLowerCase().includes(term) ||
        c.campaign.toLowerCase().includes(term) ||
        new Date(c.timestamp).toLocaleString().toLowerCase().includes(term)
    );
  }, [data.conversions, searchTerm]);

  // Export to CSV / Excel
  const handleExportCsv = () => {
    setIsExporting(true);
    try {
      const headers = ['Index', 'Masked Identifier', 'Attribution Status', 'Campaign', 'Date & Time (UTC)', 'Timestamp ISO'];
      const rows = data.conversions.map((c, idx) => [
        `#${idx + 1}`,
        `"${c.maskedIdentifier}"`,
        `"${c.status === 'signed_up' ? 'Signed Up' : 'Installed'}"`,
        `"${c.campaign}"`,
        `"${new Date(c.timestamp).toUTCString()}"`,
        `"${c.timestamp}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `lifetrackpro-partner-${data.slug}-stats.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export CSV:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const shareUrl = `https://lifetrackpro.in/c/${data.slug}?utm_source=${data.platform}&utm_campaign=${data.campaign}&referred_by=${data.slug}`;

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#0F172A', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Navigation Bar */}
      <header
        style={{
          background: '#0B0F19',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
                  LifeTrack Pro
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '2px 7px',
                    borderRadius: '100px',
                    background: 'rgba(37, 99, 235, 0.2)',
                    color: '#60A5FA',
                    border: '1px solid rgba(96, 165, 250, 0.3)',
                    letterSpacing: '0.5px',
                  }}
                >
                  Partner Portal
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                Real-Time Attribution &amp; Live Stats Dashboard
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                color: '#64748B',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#10B981' }} />
              <span>Live Synced</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 20px 60px' }}>
        {/* Partner Header Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: '#FFFFFF',
            boxShadow: '0 8px 30px rgba(15, 23, 42, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: '12px',
                    background: platformMeta.bg,
                    color: platformMeta.color,
                    border: `1px solid ${platformMeta.border}`,
                  }}
                >
                  <span>{platformMeta.icon}</span>
                  <span>{platformMeta.label}</span>
                </span>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: '12px',
                    background: data.isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.2)',
                    color: data.isActive ? '#34D399' : '#94A3B8',
                    border: data.isActive ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(148, 163, 184, 0.3)',
                  }}
                >
                  {data.isActive ? '● Active Campaign' : '○ Paused'}
                </span>
              </div>

              <h1 style={{ fontSize: '26px', fontWeight: 850, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
                {data.partnerName}
              </h1>

              <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                Campaign identifier: <code style={{ color: '#60A5FA', fontFamily: 'monospace' }}>{data.campaign}</code> &bull; Referral slug: <code style={{ color: '#A78BFA', fontFamily: 'monospace' }}>/c/{data.slug}</code>
              </p>
            </div>

            {/* Quick Share Link Box */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '12px 16px',
                maxWidth: '420px',
                width: '100%',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 650, color: '#94A3B8', marginBottom: '6px' }}>
                Your Assigned Student Referral Link:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  style={{
                    flex: 1,
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '7px 10px',
                    fontSize: '11px',
                    color: '#E2E8F0',
                    fontFamily: 'monospace',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={copyShareUrl}
                  style={{
                    background: copiedLink ? '#10B981' : '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {copiedLink ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {/* Card 1: Link Clicks */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '22px 24px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Link Clicks
              </span>
              <span style={{ fontSize: '18px', padding: '6px', borderRadius: '10px', background: '#EFF6FF', color: '#2563EB' }}>
                👆
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 850, color: '#1E3A8A', letterSpacing: '-0.5px' }}>
              {data.clicksCount.toLocaleString()}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '6px' }}>
              Unique verified clicks via <code style={{ color: '#2563EB', fontFamily: 'monospace' }}>/c/{data.slug}</code>
            </div>
          </div>

          {/* Card 2: App Installs / Registrations */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '22px 24px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total App Conversions
              </span>
              <span style={{ fontSize: '18px', padding: '6px', borderRadius: '10px', background: '#ECFDF5', color: '#059669' }}>
                📲
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 850, color: '#065F46', letterSpacing: '-0.5px' }}>
              {data.conversionsCount.toLocaleString()}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '6px' }}>
              Students registered after installing on Play Store
            </div>
          </div>

          {/* Card 3: Conversion Rate */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '22px 24px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Conversion Rate
              </span>
              <span style={{ fontSize: '18px', padding: '6px', borderRadius: '10px', background: '#FAF5FF', color: '#7E22CE' }}>
                ⚡
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 850, color: '#581C87', letterSpacing: '-0.5px' }}>
              {data.conversionRate}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '6px' }}>
              Ratio of landed visitors converting to app users
            </div>
          </div>
        </div>

        {/* Conversions Table Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
            overflow: 'hidden',
          }}
        >
          {/* Table Header Bar */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
                Recent Attributed Conversions
              </h2>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Real-time attribution log filtered by <code style={{ fontFamily: 'monospace', color: '#2563EB' }}>referred_by = {data.slug}</code>
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Search / Filter input */}
              <input
                type="text"
                placeholder="Search user or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '12px',
                  color: '#0F172A',
                  outline: 'none',
                  minWidth: '200px',
                }}
              />

              {/* Download CSV / Excel Button */}
              <button
                type="button"
                onClick={handleExportCsv}
                disabled={data.conversions.length === 0 || isExporting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  background: data.conversions.length === 0 ? '#F1F5F9' : '#059669',
                  color: data.conversions.length === 0 ? '#94A3B8' : '#FFFFFF',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: data.conversions.length === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: data.conversions.length === 0 ? 'none' : '0 2px 6px rgba(5, 150, 105, 0.25)',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>📥</span>
                <span>{isExporting ? 'Generating...' : 'Download CSV (Excel)'}</span>
              </button>
            </div>
          </div>

          {/* Conversions Table Content */}
          {filteredConversions.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '42px', marginBottom: '12px' }}>📊</div>
              <h3 style={{ fontSize: '16px', fontWeight: 750, color: '#1E293B', margin: '0 0 6px' }}>
                {searchTerm ? 'No matching conversions found' : 'No conversions tracked yet'}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '440px', margin: '0 auto', lineHeight: 1.55 }}>
                {searchTerm
                  ? 'Try clearing your search query to see all recorded conversions.'
                  : `Your link has received ${data.clicksCount} clicks so far. As students install LifeTrack Pro from the Play Store and complete registration, their records will appear here in real-time.`}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '12px 18px', width: '60px' }}>#</th>
                    <th style={{ padding: '12px 18px' }}>User Identifier (PII Protected)</th>
                    <th style={{ padding: '12px 18px' }}>Attribution Status</th>
                    <th style={{ padding: '12px 18px' }}>Campaign</th>
                    <th style={{ padding: '12px 18px', textAlign: 'right' }}>Date &amp; Time (UTC)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConversions.map((conv, idx) => (
                    <tr
                      key={conv.id || idx}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '14px 18px', color: '#94A3B8', fontFamily: 'monospace' }}>
                        #{idx + 1}
                      </td>

                      <td style={{ padding: '14px 18px', fontWeight: 650, color: '#0F172A', fontFamily: 'monospace' }}>
                        {conv.maskedIdentifier}
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 9px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: conv.status === 'signed_up' ? '#ECFDF5' : '#EFF6FF',
                            color: conv.status === 'signed_up' ? '#059669' : '#1D4ED8',
                            border: conv.status === 'signed_up' ? '1px solid #A7F3D0' : '1px solid #BFDBFE',
                          }}
                        >
                          <span>{conv.status === 'signed_up' ? '✓' : '📲'}</span>
                          <span>{conv.status === 'signed_up' ? 'Signed Up' : 'Installed'}</span>
                        </span>
                      </td>

                      <td style={{ padding: '14px 18px', fontFamily: 'monospace', color: '#475569' }}>
                        {conv.campaign}
                      </td>

                      <td style={{ padding: '14px 18px', textAlign: 'right', color: '#64748B', fontFamily: 'monospace', fontSize: '11.5px' }}>
                        {new Date(conv.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div style={{ marginTop: '36px', textAlign: 'center', fontSize: '12px', color: '#94A3B8' }}>
          LifeTrack Pro Attribution &amp; Conversion Engine &bull; Questions regarding payouts or campaign analytics? Contact <a href="mailto:admin@lifetrackpro.in" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>admin@lifetrackpro.in</a>
        </div>
      </main>
    </div>
  );
}

export default PartnerDashboardView;
