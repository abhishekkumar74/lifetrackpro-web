import Link from 'next/link';

export const metadata = {
  title: 'SM-2 Spaced Repetition Flashcards & Active Recall App',
  description: 'LifeTrack Pro SM-2 spaced repetition algorithm flashcards. Boost memory retention for NEET, JEE, UPSC, and medical school exams with scientific active recall.',
  keywords: ['spaced repetition app', 'anki alternative', 'sm2 algorithm flashcards', 'active recall app', 'medical flashcards app'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/features/spaced-repetition',
  },
  openGraph: {
    title: 'SM-2 Spaced Repetition Flashcards & Active Recall App',
    description: 'Master 1,200+ formulas, chemical reactions, and anatomy concepts using the proven SM-2 spaced repetition algorithm.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/features/spaced-repetition',
  }
};

export default function SpacedRepetitionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhishekkumar74.github.io/lifetrackpro-web/features/spaced-repetition#webpage",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web/features/spaced-repetition",
        "name": "SM-2 Spaced Repetition Flashcards & Active Recall App",
        "description": "Scientific memory retention with the SuperMemo SM-2 algorithm."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhishekkumar74.github.io/lifetrackpro-web" },
          { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features" },
          { "@type": "ListItem", "position": 3, "name": "Spaced Repetition", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features/spaced-repetition" }
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
          <div className="section-eyebrow">🧠 Active Recall Science</div>
          <h1 className="section-h2">SM-2 Spaced Repetition: Retain 92% Of Everything You Learn</h1>
          
          <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '32px' }}>
            Passive re-reading is the biggest illusion of learning. LifeTrack Pro implements the renowned SuperMemo SM-2 algorithm to schedule card reviews right before memory decay occurs.
          </p>

          <div className="reveal" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '28px', marginBottom: '32px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '14px' }}>
              The Modern Alternative to Legacy Flashcard Apps
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '18px' }}>
              Traditional flashcard programs like Anki have steep learning curves, clunky 2006 desktop interfaces, and offer no habit tracking or Pomodoro integration. LifeTrack Pro unites algorithm precision with high-speed mobile UX.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--text-2)' }}>
              <li>✓ <strong>Algorithmic Interval Scheduling:</strong> Cards rated 'Again', 'Hard', 'Good', or 'Easy' automatically calibrate their next appearance from hours to months.</li>
              <li>✓ <strong>Pre-Built High-Yield Decks:</strong> Instant access to NEET Organic Chemistry name reactions, JEE Physics formulas, and UPSC polity outlines.</li>
              <li>✓ <strong>Integrated with Daily Streaks:</strong> Completing your daily flashcard queue automatically credits your habit streak counter.</li>
              <li>✓ <strong>Offline Study Support:</strong> Review cards on the bus, train, or library without needing active internet connection.</li>
            </ul>
          </div>

          <div className="reveal reveal-delay-1" style={{ background: 'var(--bg-cream)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '10px' }}>
              How does the SM-2 algorithm prevent the Ebbinghaus forgetting curve?
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.6' }}>
              Without spaced review, 70% of new information is forgotten within 24 hours. The SM-2 algorithm calculates your personal ease factor and presents questions at expanding mathematical intervals (1 day, 3 days, 7 days, 16 days, 35 days), converting short-term memory into permanent recall.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-main">
              <span>📱</span> Test 3D Flip Card on Home
            </Link>
            <Link href="/calculator" className="btn-glass">
              🧮 Calculate Retention Boost →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
