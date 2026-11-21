'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { TimerIcon, HabitFlameIcon, CardsIcon, HeadphonesIcon } from '@/components/Icons';
import { buildPlayStoreUrl, trackAppConversionEvent } from '@/lib/conversionTracking';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      color: '#4338CA',
      icon: <TimerIcon size={16} />,
      badge: '50/10 Pomodoro',
      description: 'Execute planned study blocks with ambient soundscapes, strict timer intervals, and screen lock focus mode.',
      href: '/features/pomodoro-timer',
      actionText: 'Explore Focus Timer →',
    },
    {
      id: 'habit-tracker',
      name: 'Habit Tracker',
      color: '#92400E',
      icon: <HabitFlameIcon size={16} />,
      badge: 'Streak Shields',
      description: 'Build daily study consistency with streak freeze shields on mock exam days and visual discipline heatmaps.',
      href: '/features/habit-tracker',
      actionText: 'Explore Habit Tracker →',
    },
    {
      id: 'spaced-repetition',
      name: 'SM-2 Flashcards',
      color: '#047857',
      icon: <CardsIcon size={16} />,
      badge: 'Active Recall',
      description: 'Master high-yield formulas, reaction mechanisms, and NCERT biology definitions with expanding review intervals.',
      href: '/features/spaced-repetition',
      actionText: 'Explore Flashcards →',
    },
    {
      id: 'study-rooms',
      name: 'Virtual Study Rooms',
      color: '#BE123C',
      icon: <HeadphonesIcon size={16} />,
      badge: 'Silent Focus',
      description: 'Join camera-free 24/7 focus rooms. Practice body doubling alongside focused peers with zero video distractions.',
      href: '/features/study-rooms',
      actionText: 'Explore Study Rooms →',
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
      <div className="related-features-grid">
        {features.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0"
          >
            <CardHeader style={{ padding: '16px 18px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '7px', color: item.color, fontWeight: 750, fontSize: '13px', margin: 0 }}>
                  {item.icon}
                  <span>{item.name}</span>
                </CardTitle>
                <Badge variant="secondary" style={{ fontSize: '10px', color: item.color, backgroundColor: 'rgba(241, 245, 249, 0.9)' }}>
                  {item.badge}
                </Badge>
              </div>
              <CardDescription style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                {item.description}
              </CardDescription>
            </CardHeader>

            <CardContent style={{ padding: 0 }} />

            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
              <Link
                href={item.href}
                onClick={() => handleFeatureClick(item.name)}
                style={{
                  color: item.color,
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '11px',
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
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
