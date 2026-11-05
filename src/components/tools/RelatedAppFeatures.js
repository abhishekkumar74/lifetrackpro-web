'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { TimerIcon, HabitFlameIcon, TargetIcon, ChartIcon } from '@/components/Icons';
import { buildPlayStoreUrl, trackAppConversionEvent } from '@/lib/conversionTracking';

/**
 * RelatedAppFeatures — Strategic App Promotion Section
 * Natural Location 3: Introducing 4 core LifeTrack Pro features near page bottom:
 * - Focus Timer
 * - Habit Tracker
 * - Goal Tracking
 * - Daily Progress Analytics
 */
export default function RelatedAppFeatures({
  source = 'study_timetable_tool',
  title = 'Execute Your Routine with LifeTrack Pro Features',
  subtitle = 'Transform your schedule into automatic daily consistency. LifeTrack Pro connects your planned timetable with dedicated academic execution tools:',
}) {
  const sectionRef = useRef(null);
  const hasTrackedImpression = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || hasTrackedImpression.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasTrackedImpression.current) {
          hasTrackedImpression.current = true;
          trackAppConversionEvent({
            event: 'cta_impression',
            placement: 'related_features',
            label: 'Related LifeTrack Pro Features Section',
            source,
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [source]);

  const handleFeatureClick = (featureName) => {
    trackAppConversionEvent({
      event: 'cta_click',
      placement: 'related_features',
      label: `Feature: ${featureName}`,
      source,
    });
  };

  const playStoreBase = buildPlayStoreUrl({
    source,
    medium: 'web_features_grid',
    campaign: 'routine_conversion',
    placement: 'related_features',
  });

  const features = [
    {
      id: 'focus-timer',
      name: 'Focus Timer',
      color: '#5B5CF0',
      icon: <TimerIcon size={16} />,
      badge: '50/10 Pomodoro',
      description: 'Execute planned study blocks with binaural soundscapes, strict timer intervals, and screen lock focus mode.',
      href: '/features/pomodoro-timer',
      actionText: 'Explore Focus Timer →',
    },
    {
      id: 'habit-tracker',
      name: 'Habit Tracker',
      color: 'var(--amber)',
      icon: <HabitFlameIcon size={16} />,
      badge: 'Streak Shields',
      description: 'Build daily study consistency with streak freeze shields on mock exam days and visual discipline heatmaps.',
      href: '/features/habit-tracker',
      actionText: 'Explore Habit Tracker →',
    },
    {
      id: 'goal-tracking',
      name: 'Goal Tracking',
      color: 'var(--emerald)',
      icon: <TargetIcon size={16} />,
      badge: 'Syllabus Quotas',
      description: 'Break high-stakes exam ranks into weekly chapter milestones, daily numerical quotas, and revision queues.',
      href: '/features',
      actionText: 'Explore Goal Tracking →',
    },
    {
      id: 'daily-analytics',
      name: 'Daily Progress Analytics',
      color: 'var(--sky)',
      icon: <ChartIcon size={16} />,
      badge: 'Circadian Trends',
      description: 'Monitor true deep work vs recovery hours, track subject balance distributions, and eliminate cognitive burnout.',
      href: '/calculator',
      actionText: 'Explore Analytics →',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="content-card reveal"
      data-cta-placement="related_features"
      style={{ marginTop: '28px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
        <h2 className="content-card-h2" style={{ margin: 0 }}>
          {title}
        </h2>
        <a
          href={playStoreBase}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleFeatureClick('All In One App')}
          style={{
            fontSize: '11.5px',
            color: '#5B5CF0',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>All included in LifeTrack Pro App →</span>
        </a>
      </div>

      <p className="content-card-p" style={{ marginBottom: '16px' }}>
        {subtitle}
      </p>

      {/* 4-Feature Responsive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
          gap: '12px',
        }}
      >
        {features.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'var(--bg-cream)',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'border-color 0.15s ease, transform 0.15s ease',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: item.color, fontWeight: 750, fontSize: '13px' }}>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                <span
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '100px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    color: item.color,
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {item.badge}
                </span>
              </div>

              <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', fontSize: '11px' }}>
              <Link
                href={item.href}
                onClick={() => handleFeatureClick(item.name)}
                style={{
                  color: item.color,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {item.actionText}
              </Link>

              <a
                href={playStoreBase}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleFeatureClick(`${item.name} Play Store`)}
                title={`Get ${item.name} on Android`}
                style={{
                  color: 'var(--text-3)',
                  textDecoration: 'none',
                  fontSize: '10.5px',
                }}
              >
                App Feature ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
