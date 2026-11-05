'use client';
import { useEffect, useRef } from 'react';
import { buildPlayStoreUrl, trackAppConversionEvent } from '@/lib/conversionTracking';

/**
 * AppPromotionCard — Strategic App Promotion Card
 * Natural Location 1: Below Generated Routine / Timetable
 *
 * Implements non-intrusive conversion recommendation using official brand #5B5CF0,
 * high-res approved app artwork, and privacy-respecting conversion tracking.
 */
export default function AppPromotionCard({
  source = 'study_timetable_tool',
  placement = 'below_generated_routine',
  style = {},
}) {
  const cardRef = useRef(null);
  const hasTrackedImpression = useRef(false);

  // Conversion Measurement: App CTA impression tracking
  useEffect(() => {
    if (!cardRef.current || hasTrackedImpression.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasTrackedImpression.current) {
          hasTrackedImpression.current = true;
          trackAppConversionEvent({
            event: 'cta_impression',
            placement,
            label: 'Ready to follow your routine?',
            source,
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [placement, source]);

  // Conversion Measurement: App CTA click tracking (mobile vs desktop captured automatically)
  const handleCtaClick = () => {
    trackAppConversionEvent({
      event: 'cta_click',
      placement,
      label: 'Explore LifeTrack Pro App →',
      source,
    });
  };

  const playStoreUrl = buildPlayStoreUrl({
    source,
    medium: 'web_cta',
    campaign: 'routine_conversion',
    placement,
  });

  return (
    <aside
      ref={cardRef}
      aria-label="LifeTrack Pro Mobile App Recommendation"
      data-cta-placement={placement}
      style={{
        background: 'linear-gradient(135deg, rgba(91, 92, 240, 0.04) 0%, rgba(91, 92, 240, 0.01) 100%)',
        border: '1px solid rgba(91, 92, 240, 0.2)',
        borderRadius: '16px',
        padding: '20px 22px',
        marginTop: '16px',
        marginBottom: '8px',
        boxShadow: '0 4px 20px -6px rgba(91, 92, 240, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Decorative accent element */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91, 92, 240, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Left: Text Content & Value Proposition */}
      <div style={{ flex: '1 1 280px', minWidth: '240px', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 9px', borderRadius: '100px', background: 'rgba(91, 92, 240, 0.08)', border: '1px solid rgba(91, 92, 240, 0.22)', marginBottom: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5B5CF0', display: 'inline-block' }} />
          <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#5B5CF0', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            Mobile Companion App
          </span>
        </div>

        <h3
          style={{
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--text-1)',
            margin: '0 0 6px 0',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          Ready to follow your routine?
        </h3>

        <p
          style={{
            fontSize: '12.5px',
            color: 'var(--text-2)',
            margin: '0 0 14px 0',
            lineHeight: 1.5,
            maxWidth: '520px',
          }}
        >
          Take your daily plan with you. Track habits, complete focus sessions and monitor your progress with LifeTrack Pro.
        </p>

        {/* Clean, Non-Aggressive CTA Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#5B5CF0',
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '9px',
              fontSize: '12.5px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(91, 92, 240, 0.25)',
              transition: 'background 0.15s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#4D4EE0';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#5B5CF0';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Explore LifeTrack Pro App →</span>
          </a>

          <span style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 500 }}>
            Free on Google Play • No account required
          </span>
        </div>
      </div>
    </aside>
  );
}
