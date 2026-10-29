import Link from 'next/link';

export const metadata = {
  title: 'SM-2 Spaced Repetition Flashcards & Active Recall Engine',
  description: 'LifeTrack Pro SM-2 spaced repetition algorithm flashcards. Boost memory retention for NEET, JEE, UPSC, and medical school exams with active recall.',
  keywords: ['spaced repetition app', 'anki alternative', 'sm2 algorithm flashcards', 'active recall app', 'medical flashcards app']
};

export default function SpacedRepetitionPage() {
  return (
    <article className="container" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-eyebrow">🧠 Active Recall Science</div>
        <h1 className="section-h2">SM-2 Spaced Repetition: Retain 92% Of Everything You Learn</h1>
        
        <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '40px' }}>
          Passive re-reading is the biggest illusion of learning. LifeTrack Pro implements the renowned SuperMemo SM-2 algorithm to schedule card reviews right before memory decay occurs.
        </p>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '36px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            The Modern Alternative to Legacy Flashcard Apps
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '20px' }}>
            Traditional flashcard programs like Anki have steep learning curves, clunky 2006 desktop interfaces, and offer no habit tracking or Pomodoro integration. LifeTrack Pro unites algorithm precision with high-speed mobile UX.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-2)' }}>
            <li>✓ <strong>Algorithmic Interval Scheduling:</strong> Cards rated 'Again', 'Hard', 'Good', or 'Easy' automatically calibrate their next appearance from hours to months.</li>
            <li>✓ <strong>Pre-Built High-Yield Decks:</strong> Instant access to NEET Organic Chemistry name reactions, JEE Physics formulas, and UPSC polity outlines.</li>
            <li>✓ <strong>Integrated with Daily Streaks:</strong> Completing your daily flashcard queue automatically credits your habit streak counter.</li>
            <li>✓ <strong>Offline Study Support:</strong> Review cards on the bus, train, or library without needing active internet connection.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/features" className="btn-main">
            <span>✨</span> Explore All Features
          </Link>
          <Link href="/calculator" className="btn-glass">
            🧮 Calculate Your Retention Boost →
          </Link>
        </div>
      </div>
    </article>
  );
}
