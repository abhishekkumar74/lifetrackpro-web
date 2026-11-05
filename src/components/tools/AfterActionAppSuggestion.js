'use client';
import { useEffect, useRef } from 'react';
import { buildPlayStoreUrl, trackAppConversionEvent } from '@/lib/conversionTracking';

/**
 * AfterActionAppSuggestion — Subtle App Suggestion After Routine Actions
 * Natural Location 2: Triggered smoothly after Copy Routine or Save PDF actions
 *
 * Example: "Want to track your daily progress automatically? Try LifeTrack Pro."
 */
export default function AfterActionAppSuggestion({
  action = 'copy', // 'copy' | 'pdf' | 'save'
  source = 'study_timetable_tool',
  onDismiss,
}) {
  const placement = action === 'pdf' ? 'after_pdf_action' : 'after_copy_action';
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      trackAppConversionEvent({
        event: 'cta_impression',
        placement,
        label: 'Want to track your daily progress automatically? Try LifeTrack Pro.',
        source,
      });
    }

    // Auto-dismiss smoothly after 10 seconds to maintain clean interface
    const timer = setTimeout(() => {
      if (typeof onDismiss === 'function') onDismiss();
    }, 10000);

    return () => clearTimeout(timer);
  }, [placement, source, onDismiss]);

  const handleCtaClick = () => {
    trackAppConversionEvent({
      event: 'cta_click',
      placement,
      label: 'Want to track your daily progress automatically? Try LifeTrack Pro.',
      source,
    });
  };

  const storeUrl = buildPlayStoreUrl({
    source,
    medium: 'web_cta',
    campaign: 'routine_conversion',
    placement,
  });

  return (
    <div
      role="status"
      aria-live="polite"
      data-cta-placement={placement}
      style={{
        background: 'rgba(91, 92, 240, 0.07)',
        border: '1px solid rgba(91, 92, 240, 0.25)',
        borderRadius: '10px',
        padding: '9px 14px',
        marginTop: '10px',
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',
        animation: 'fadeIn 0.2s ease-in-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 auto' }}>
        <span style={{ fontSize: '14px', lineHeight: 1 }}>📱</span>
        <span style={{ fontSize: '12px', color: 'var(--text-1)', fontWeight: 600 }}>
          {action === 'pdf' ? 'PDF exported! ' : 'Routine copied! '}
          Want to track your daily progress automatically?{' '}
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            style={{
              color: '#5B5CF0',
              fontWeight: 750,
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            Try LifeTrack Pro →
          </a>
        </span>
      </div>

      {typeof onDismiss === 'function' && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss app suggestion"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-3)',
            fontSize: '13px',
            lineHeight: 1,
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-3)'; }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
