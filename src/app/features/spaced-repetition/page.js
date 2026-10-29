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

      <article className="container subpage-container">
        <div>
          <div className="section-eyebrow">🧠 Active Recall Science</div>
          <h1 className="subpage-h1">SM-2 Spaced Repetition: Retain 92% Of Everything You Learn</h1>
          
          <p className="subpage-lead">
            Passive re-reading is the biggest illusion of learning. LifeTrack Pro implements the renowned SuperMemo SM-2 algorithm to schedule card reviews right before memory decay occurs.
          </p>

          <div className="content-card reveal">
            <h2 className="content-card-h2">
              The Modern Alternative to Legacy Flashcard Apps
            </h2>
            <p className="content-card-p">
              Traditional flashcard programs like Anki have steep learning curves, clunky 2006 desktop interfaces, and offer no habit tracking or Pomodoro integration. LifeTrack Pro unites algorithm precision with high-speed mobile UX.
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>Algorithmic Interval Scheduling:</strong> Cards rated 'Again', 'Hard', 'Good', or 'Easy' automatically calibrate their next appearance from hours to months.</li>
              <li>✓ <strong>Pre-Built High-Yield Decks:</strong> Instant access to NEET Organic Chemistry name reactions, JEE Physics formulas, and UPSC polity outlines.</li>
              <li>✓ <strong>Integrated with Daily Streaks:</strong> Completing your daily flashcard queue automatically credits your habit streak counter.</li>
              <li>✓ <strong>Offline Study Support:</strong> Review cards on the bus, train, or library without needing active internet connection.</li>
            </ul>
          </div>

          <div className="content-card-faq reveal reveal-delay-1">
            <h3 className="content-card-faq-h3">
              How does the SM-2 algorithm prevent the Ebbinghaus forgetting curve?
            </h3>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              Without spaced review, 70% of new information is forgotten within 24 hours. The SM-2 algorithm calculates your personal ease factor and presents questions at expanding mathematical intervals (1 day, 3 days, 7 days, 16 days, 35 days), converting short-term memory into permanent recall.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
