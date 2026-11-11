'use client';

import React, { useState, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import {
  CollabLinkRecord,
  CollabPlatform,
  CollabDestinationType,
  CreateCollabLinkInput,
  CollabLinksListResponse,
  CollabLinkApiResponse,
} from '@/types/collab';
import { slugify, isValidSlug, buildCollabShareUrl } from '@/lib/collabUtils';

const PLATFORM_CONFIG: Record<CollabPlatform, { label: string; icon: string; bg: string; color: string; border: string }> = {
  youtube: { label: 'YouTube', icon: '▶️', bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  instagram: { label: 'Instagram', icon: '📸', bg: '#FDF2F8', color: '#DB2777', border: '#FBCFE8' },
  telegram: { label: 'Telegram', icon: '✈️', bg: '#F0F9FF', color: '#0284C7', border: '#BAE6FD' },
  campus: { label: 'Campus Ambassador', icon: '🎓', bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
  other: { label: 'Other / Custom', icon: '🌐', bg: '#F8FAFC', color: '#475569', border: '#E2E8F0' },
};

const PLATFORMS: CollabPlatform[] = ['youtube', 'instagram', 'telegram', 'campus', 'other'];

export function CollabLinkManager() {
  // Form state
  const [partnerName, setPartnerName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState<boolean>(false);
  const [platform, setPlatform] = useState<CollabPlatform>('youtube');
  const [campaign, setCampaign] = useState<string>('');
  const [isCampaignManuallyEdited, setIsCampaignManuallyEdited] = useState<boolean>(false);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [destinationType] = useState<CollabDestinationType>('play_store');

  // Async state
  const [links, setLinks] = useState<CollabLinkRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pendingMigration, setPendingMigration] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Fetch all existing links
  const fetchLinks = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/admin/collab-links');
      const data = (await res.json()) as CollabLinksListResponse & { pendingMigration?: boolean };
      if (res.ok && data.success) {
        setLinks(data.links || []);
        setPendingMigration(Boolean(data.pendingMigration));
      } else {
        if (data.pendingMigration || data.error?.includes('schema cache')) {
          setPendingMigration(true);
        } else {
          setErrorMessage(data.error || 'Failed to load collab links');
        }
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Network error loading links');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const initialLoad = async () => {
      try {
        const res = await fetch('/api/admin/collab-links');
        const data = (await res.json()) as CollabLinksListResponse & { pendingMigration?: boolean };
        if (!ignore) {
          if (res.ok && data.success) {
            setLinks(data.links || []);
            setPendingMigration(Boolean(data.pendingMigration));
          } else {
            if (data.pendingMigration || data.error?.includes('schema cache')) {
              setPendingMigration(true);
            } else {
              setErrorMessage(data.error || 'Failed to load collab links');
            }
          }
        }
      } catch (err) {
        if (!ignore) {
          setErrorMessage(err instanceof Error ? err.message : 'Network error loading links');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };
    initialLoad();
    return () => {
      ignore = true;
    };
  }, []);

  // Handle partner name change with auto-slug
  const handlePartnerNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setPartnerName(val);
    if (!isSlugManuallyEdited) {
      const suggestedSlug = slugify(val);
      setSlug(suggestedSlug);
      if (!isCampaignManuallyEdited) {
        setCampaign(suggestedSlug ? `collab_${suggestedSlug}` : '');
      }
    }
  };

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsSlugManuallyEdited(true);
    const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setSlug(sanitized);
    if (!isCampaignManuallyEdited) {
      setCampaign(sanitized ? `collab_${sanitized}` : '');
    }
  };

  // Live URL preview
  const livePreviewUrl = useMemo(() => {
    if (!slug) return 'https://lifetrackpro.in/c/{slug}?utm_source={platform}&utm_campaign={campaign}&referred_by={slug}';
    return buildCollabShareUrl(
      slug,
      platform,
      campaign || `collab_${slug}`
    );
  }, [slug, platform, campaign]);

  // Validation
  const slugValidation = useMemo<{ isValid: boolean; message: string }>(() => {
    if (!slug) return { isValid: false, message: 'Slug is required' };
    if (slug.length < 2) return { isValid: false, message: 'Slug must be at least 2 characters' };
    if (slug.length > 80) return { isValid: false, message: 'Slug must be 80 characters or fewer' };
    if (!isValidSlug(slug)) {
      return {
        isValid: false,
        message: 'Only lowercase letters, numbers, and single hyphens are allowed.',
      };
    }
    return { isValid: true, message: 'Valid slug' };
  }, [slug]);

  // Toast feedback
  const showToast = (msg: string): void => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const copyToClipboard = async (text: string, label: string = 'Link', targetSlug?: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      if (targetSlug) setCopiedSlug(targetSlug);
      showToast(`✓ ${label} copied to clipboard!`);
      setTimeout(() => {
        if (targetSlug) setCopiedSlug(null);
      }, 2000);
    } catch {
      showToast('⚠️ Could not auto-copy. Please copy manually.');
    }
  };

  // Create Link submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(null);

    if (!partnerName.trim()) {
      setErrorMessage('Please enter a Creator / Partner Name.');
      return;
    }

    if (!slugValidation.isValid) {
      setErrorMessage(slugValidation.message);
      return;
    }

    setIsSubmitting(true);
    const payload: CreateCollabLinkInput = {
      name: partnerName.trim(),
      slug: slug.trim(),
      platform,
      campaign: campaign.trim() || `collab_${slug.trim()}`,
      customNotes: customNotes.trim() || undefined,
      destinationType,
    };

    try {
      const res = await fetch('/api/admin/collab-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as CollabLinkApiResponse;

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to create collab link');
        return;
      }

      if (data.data) {
        setLinks((prev) => [data.data as CollabLinkRecord, ...prev]);
        showToast(`🎉 Link created for ${data.data.name}!`);

        // Reset form
        setPartnerName('');
        setSlug('');
        setIsSlugManuallyEdited(false);
        setCampaign('');
        setIsCampaignManuallyEdited(false);
        setCustomNotes('');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Network error creating link');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle link active/inactive
  const handleToggleActive = async (link: CollabLinkRecord): Promise<void> => {
    const newStatus = !link.is_active;
    try {
      const res = await fetch(`/api/admin/collab-links/${link.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      });

      const data = (await res.json()) as CollabLinkApiResponse;
      if (res.ok && data.success && data.data) {
        setLinks((prev) =>
          prev.map((item) => (item.id === link.id ? (data.data as CollabLinkRecord) : item))
        );
        showToast(`Link ${newStatus ? 'activated' : 'paused'}.`);
      } else {
        showToast(`Error: ${data.error || 'Failed to update status'}`);
      }
    } catch (err) {
      showToast(`Error: ${err instanceof Error ? err.message : 'Network failure'}`);
    }
  };

  // Filtered links
  const filteredLinks = useMemo(() => {
    if (!searchFilter.trim()) return links;
    const q = searchFilter.toLowerCase();
    return links.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.slug.toLowerCase().includes(q) ||
        l.campaign.toLowerCase().includes(q) ||
        l.platform.toLowerCase().includes(q)
    );
  }, [links, searchFilter]);

  const totalClicks = useMemo(() => {
    return links.reduce((acc, curr) => acc + (curr.clicks_count || 0), 0);
  }, [links]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Toast Notification */}
      {successToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#059669',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
        >
          {successToast}
        </div>
      )}

      {/* Pending Migration Banner */}
      {pendingMigration && (
        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            background: '#FFFBEB',
            border: '1px solid #FCD34D',
            color: '#92400E',
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>⚡</span>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#B45309' }}>
                Database Table Setup Required in Supabase
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const sql = `-- Migration: Collab & Campaign Links Table\nDO $$\nBEGIN\n  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'collab_platform') THEN\n    CREATE TYPE collab_platform AS ENUM ('youtube', 'instagram', 'telegram', 'campus', 'other');\n  END IF;\n  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'collab_destination_type') THEN\n    CREATE TYPE collab_destination_type AS ENUM ('play_store', 'website', 'custom');\n  END IF;\nEND $$;\n\nCREATE TABLE IF NOT EXISTS public.collab_links (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  name VARCHAR(255) NOT NULL,\n  slug VARCHAR(100) NOT NULL UNIQUE,\n  platform collab_platform NOT NULL DEFAULT 'other',\n  campaign VARCHAR(100) NOT NULL,\n  custom_notes TEXT,\n  destination_type collab_destination_type NOT NULL DEFAULT 'play_store',\n  is_active BOOLEAN NOT NULL DEFAULT true,\n  clicks_count INTEGER NOT NULL DEFAULT 0,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())\n);\n\nCREATE OR REPLACE FUNCTION public.increment_collab_click(link_slug TEXT)\nRETURNS SETOF public.collab_links AS $$\nBEGIN\n  RETURN QUERY\n  UPDATE public.collab_links\n  SET clicks_count = clicks_count + 1,\n      updated_at = timezone('utc'::text, now())\n  WHERE slug = link_slug AND is_active = true\n  RETURNING *;\nEND;\n$$ LANGUAGE plpgsql SECURITY DEFINER;\n\nCREATE UNIQUE INDEX IF NOT EXISTS idx_collab_links_slug_lower ON public.collab_links (lower(slug));\nCREATE INDEX IF NOT EXISTS idx_collab_links_platform ON public.collab_links (platform);\nCREATE INDEX IF NOT EXISTS idx_collab_links_campaign ON public.collab_links (campaign);\nCREATE INDEX IF NOT EXISTS idx_collab_links_is_active ON public.collab_links (is_active);\n\nALTER TABLE public.collab_links ENABLE ROW LEVEL SECURITY;\n\nDROP POLICY IF EXISTS \"Public can view active collab links\" ON public.collab_links;\nCREATE POLICY \"Public can view active collab links\" ON public.collab_links FOR SELECT TO anon, authenticated USING (is_active = true);\n\nDROP POLICY IF EXISTS \"Service role has full management access\" ON public.collab_links;\nCREATE POLICY \"Service role has full management access\" ON public.collab_links FOR ALL TO service_role USING (true) WITH CHECK (true);`;
                copyToClipboard(sql, 'SQL Migration Script');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: '#D97706',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              📋 Copy 1-Click SQL Script
            </button>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.5, margin: '0 0 8px 0', color: '#78350F' }}>
            Table <code>public.collab_links</code> does not exist in Supabase yet. To fix this:
          </p>
          <ol style={{ fontSize: '12px', lineHeight: 1.6, margin: '0 0 10px 18px', padding: 0, color: '#92400E' }}>
            <li>Click <strong>Copy 1-Click SQL Script</strong> above.</li>
            <li>Open your <strong>Supabase Dashboard → SQL Editor → New Query</strong>.</li>
            <li>Paste and click <strong>Run</strong>.</li>
            <li>Then click the <strong>Refresh</strong> button here!</li>
          </ol>
        </div>
      )}
      <div className="admin-metric-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Total Collab Links
            </span>
            <span style={{ fontSize: '18px' }}>🔗</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginTop: '10px' }}>
            {links.length}
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, marginTop: '4px' }}>
            {links.filter(l => l.is_active).length} Active Campaigns
          </div>
        </div>

        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Total Landed Clicks
            </span>
            <span style={{ fontSize: '18px' }}>📈</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#2563EB', marginTop: '10px' }}>
            {totalClicks}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, marginTop: '4px' }}>
            Tracked in PostHog & Database
          </div>
        </div>

        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Attribution Destination
            </span>
            <span style={{ fontSize: '18px' }}>📲</span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginTop: '14px' }}>
            Google Play Store
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, marginTop: '4px' }}>
            Encoded UTM install referrer
          </div>
        </div>
      </div>

      {/* Creator Link Generator Card */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Generate Collab & Campaign Link
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
              Create branded partner links for YouTube influencers, Instagram creators, and campus ambassadors with automated PostHog attribution.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchLinks}
            className="admin-btn admin-btn-secondary"
            style={{ fontSize: '12px', padding: '6px 12px' }}
          >
            ↻ Refresh
          </button>
        </div>

        {errorMessage && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              color: '#DC2626',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '18px',
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {/* Creator / Partner Name */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                Creator / Partner Name <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Rohit JEE or Alakh Pandey"
                value={partnerName}
                onChange={handlePartnerNameChange}
                required
                className="admin-input"
                style={{ width: '100%' }}
              />
            </div>

            {/* Platform Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                Platform <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as CollabPlatform)}
                className="admin-select"
                style={{ width: '100%' }}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {PLATFORM_CONFIG[p].icon} {PLATFORM_CONFIG[p].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Slug */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#475569', margin: 0 }}>
                  Custom Slug <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <span style={{ fontSize: '11px', color: slugValidation.isValid ? '#059669' : '#94A3B8' }}>
                  {slug ? slugValidation.message : 'Auto-generated'}
                </span>
              </div>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '10px', fontSize: '12px', color: '#94A3B8', fontFamily: 'monospace' }}>
                  /c/
                </span>
                <input
                  type="text"
                  placeholder="rohit-jee"
                  value={slug}
                  onChange={handleSlugChange}
                  required
                  className="admin-input"
                  style={{
                    width: '100%',
                    paddingLeft: '34px',
                    fontFamily: 'monospace',
                    borderColor: slug && !slugValidation.isValid ? '#EF4444' : undefined,
                  }}
                />
              </div>
            </div>

            {/* Campaign Name */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                Campaign Name (UTM) <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="collab_rohit_jee"
                value={campaign}
                onChange={(e) => {
                  setIsCampaignManuallyEdited(true);
                  setCampaign(e.target.value);
                }}
                required
                className="admin-input"
                style={{ width: '100%', fontFamily: 'monospace' }}
              />
            </div>
          </div>

          {/* Custom Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
              Internal Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. YouTube community post sponsor, agreed ₹5,000 for 100 conversions"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="admin-input"
              style={{ width: '100%' }}
            />
          </div>

          {/* Live Preview Box */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#2563EB', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB' }}></span>
                Live Generated Share URL
              </span>
              {slug && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(livePreviewUrl, 'Preview URL')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563EB',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  📋 Copy Preview
                </button>
              )}
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '10px 12px', fontFamily: 'monospace', fontSize: '12px', color: '#1E293B', wordBreak: 'break-all' }}>
              {livePreviewUrl}
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button
              type="button"
              disabled={!slug || !slugValidation.isValid}
              onClick={() => copyToClipboard(livePreviewUrl, 'Collab Link')}
              className="admin-btn admin-btn-secondary"
            >
              Copy Link
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !slug || !slugValidation.isValid}
              className="admin-btn admin-btn-primary"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)' }}
            >
              {isSubmitting ? 'Creating Link...' : '⚡ Create & Publish Link'}
            </button>
          </div>
        </form>
      </div>

      {/* Active Links Table Card */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Active Collab & Campaign Links
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
              Real-time click counts and direct share controls for every creator.
            </p>
          </div>

          <div style={{ width: '240px' }}>
            <input
              type="text"
              placeholder="Search creator or slug..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="admin-input"
              style={{ width: '100%', fontSize: '12px', padding: '6px 10px' }}
            />
          </div>
        </div>

        {isLoading ? (
          <div style={{ padding: '36px 0', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
            Loading campaign links...
          </div>
        ) : filteredLinks.length === 0 ? (
          <div style={{ padding: '40px 16px', textAlign: 'center', border: '1px dashed #CBD5E1', borderRadius: '10px', color: '#64748B' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔗</div>
            <p style={{ fontWeight: 600, fontSize: '14px', margin: 0 }}>No Collab Links Found</p>
            <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
              {searchFilter ? 'No links match your search filter' : 'Create your first creator campaign above'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '10px 14px' }}>Partner / Creator</th>
                  <th style={{ padding: '10px 14px' }}>Slug & Platform</th>
                  <th style={{ padding: '10px 14px' }}>Campaign</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Clicks</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLinks.map((item) => {
                  const fullUrl = buildCollabShareUrl(item.slug, item.platform, item.campaign);
                  const isCopied = copiedSlug === item.slug;
                  const platformConfig = PLATFORM_CONFIG[item.platform] || PLATFORM_CONFIG.other;

                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0F172A' }}>
                        <div>{item.name}</div>
                        {item.custom_notes && (
                          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 400, marginTop: '2px' }}>
                            {item.custom_notes}
                          </div>
                        )}
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontFamily: 'monospace', color: '#2563EB', fontWeight: 600 }}>
                          /c/{item.slug}
                        </div>
                        <div style={{ marginTop: '4px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              background: platformConfig.bg,
                              color: platformConfig.color,
                              border: `1px solid ${platformConfig.border}`,
                            }}
                          >
                            <span>{platformConfig.icon}</span>
                            <span>{platformConfig.label}</span>
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#475569' }}>
                        {item.campaign}
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 10px',
                            borderRadius: '8px',
                            background: '#EFF6FF',
                            color: '#1D4ED8',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            border: '1px solid #BFDBFE',
                          }}
                        >
                          {item.clicks_count}
                        </span>
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleActive(item)}
                          style={{
                            border: 'none',
                            cursor: 'pointer',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: item.is_active ? '#ECFDF5' : '#F1F5F9',
                            color: item.is_active ? '#059669' : '#64748B',
                          }}
                        >
                          {item.is_active ? '● Active' : '○ Paused'}
                        </button>
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(fullUrl, `${item.name}'s Link`, item.slug)}
                          className="admin-btn admin-btn-secondary"
                          style={{
                            fontSize: '11px',
                            padding: '5px 10px',
                            background: isCopied ? '#059669' : undefined,
                            color: isCopied ? '#FFFFFF' : undefined,
                            borderColor: isCopied ? '#059669' : undefined,
                          }}
                        >
                          {isCopied ? '✓ Copied' : '📋 Copy Link'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CollabLinkManager;
