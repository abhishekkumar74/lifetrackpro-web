import Link from 'next/link';

export const metadata = {
  title: 'Daily Habit Streaks & Consistency Shields for Serious Students',
  description: 'Build unbreakable daily study habits with visual flame streaks, milestone badges, and freeze protection tokens with LifeTrack Pro.',
  keywords: ['study habit tracker', 'daily streak app', 'consistency habit tracker', 'student habit tracker', 'habit streak shield']
};

export default function HabitTrackerPage() {
  return (
    <article className="container" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-eyebrow">🔥 Consistency Science</div>
        <h1 className="section-h2">Habit Streaks: Consistency Is The Ultimate Competitive Advantage</h1>
        
        <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '40px' }}>
          Exam rankers aren’t smarter than you—they are simply more consistent. LifeTrack Pro gamifies daily discipline so giving up at 11 PM feels impossible.
        </p>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '36px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Built For Non-Negotiable Daily Routines
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '20px' }}>
            A sudden fever or travel day shouldn't wipe away a 45-day study streak. LifeTrack Pro gives you earned freeze tokens to protect your momentum during genuine life emergencies.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-2)' }}>
            <li>✓ <strong>Visual Flame Counter:</strong> A burning fire icon that compounds visually every day you hit your non-negotiables.</li>
            <li>✓ <strong>Streak Freeze Tokens:</strong> Earn protection tokens by maintaining 14-day streaks; automatically activates if an emergency strikes.</li>
            <li>✓ <strong>Micro-Habits to Major Milestones:</strong> Track daily wake-up times, 50 MCQ quotas, revision blocks, and exercise.</li>
            <li>✓ <strong>Direct Sync With Pomodoro:</strong> No manual checkmarks needed when timer sessions complete automatically.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/features" className="btn-main">
            <span>✨</span> Explore All Features
          </Link>
          <Link href="/" className="btn-glass">
            Try Habit Demo on Home →
          </Link>
        </div>
      </div>
    </article>
  );
}
