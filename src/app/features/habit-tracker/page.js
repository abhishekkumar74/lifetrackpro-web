import Link from 'next/link';

export const metadata = {
  title: 'Daily Study Habit Tracker with Streak Freeze Shields',
  description: 'Build unbreakable daily study habits with visual flame streaks, milestone badges, and freeze protection tokens with LifeTrack Pro.',
  keywords: ['study habit tracker', 'daily streak app', 'consistency habit tracker', 'student habit tracker', 'habit streak shield'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/features/habit-tracker',
  },
  openGraph: {
    title: 'Daily Study Habit Tracker with Streak Freeze Shields',
    description: 'Gamify your daily non-negotiable study habits with burning flame counters and emergency freeze tokens.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/features/habit-tracker',
  }
};

export default function HabitTrackerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhishekkumar74.github.io/lifetrackpro-web/features/habit-tracker#webpage",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web/features/habit-tracker",
        "name": "Daily Study Habit Tracker with Streak Freeze Shields",
        "description": "Atomic habit consistency engine built for competitive exam students."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhishekkumar74.github.io/lifetrackpro-web" },
          { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features" },
          { "@type": "ListItem", "position": 3, "name": "Habit Tracker", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features/habit-tracker" }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container" style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className="section-eyebrow">🔥 Consistency Science</div>
          <h1 className="section-h2">Habit Streaks: Consistency Is The Ultimate Competitive Advantage</h1>
          
          <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '32px' }}>
            Exam rankers aren’t smarter than you—they are simply more consistent. LifeTrack Pro gamifies daily discipline so giving up at 11 PM feels impossible.
          </p>

          <div className="reveal" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '28px', marginBottom: '32px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '14px' }}>
              Built For Non-Negotiable Daily Routines
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '18px' }}>
              A sudden fever or travel day shouldn't wipe away a 45-day study streak. LifeTrack Pro gives you earned freeze tokens to protect your momentum during genuine life emergencies.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--text-2)' }}>
              <li>✓ <strong>Visual Flame Counter:</strong> A burning fire icon that compounds visually every day you hit your non-negotiables.</li>
              <li>✓ <strong>Streak Freeze Tokens:</strong> Earn protection tokens by maintaining 14-day streaks; automatically activates if an emergency strikes.</li>
              <li>✓ <strong>Micro-Habits to Major Milestones:</strong> Track daily wake-up times, 50 MCQ quotas, revision blocks, and exercise.</li>
              <li>✓ <strong>Direct Sync With Pomodoro:</strong> No manual checkmarks needed when timer sessions complete automatically.</li>
            </ul>
          </div>

          <div className="reveal reveal-delay-1" style={{ background: 'var(--bg-cream)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '10px' }}>
              Why do habit streaks work so well for student psychology?
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.6' }}>
              Behavioral economists call this 'loss aversion'. When you have an unbroken 30-day streak burning in your LifeTrack Pro widget, the emotional friction of skipping today’s study session far outweighs short-term laziness.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-main">
              <span>🔥</span> Try Habit Streaks on Home
            </Link>
            <Link href="/features" className="btn-glass">
              ← Back to All Features
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
