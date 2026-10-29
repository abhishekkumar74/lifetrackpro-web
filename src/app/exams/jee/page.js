import Link from 'next/link';

export const metadata = {
  title: 'JEE Main & Advanced Study Tracker, Formulas & Pomodoro | LifeTrack Pro',
  description: 'Master JEE Main & Advanced problem solving with 50-minute deep work blocks, Physics formula flashcards with SM-2 spaced repetition, and study streaks.',
  keywords: ['JEE study tracker', 'JEE main study app', 'JEE advanced pomodoro app', 'JEE physics formula flashcards', 'IIT JEE revision planner'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/exams/jee',
  },
  openGraph: {
    title: 'JEE Main & Advanced Study Tracker & Revision OS',
    description: 'Solve 100+ tough MCQs daily with deep Pomodoro focus blocks and spaced repetition physics formulas.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/exams/jee',
  }
};

export default function JeeExamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhishekkumar74.github.io/lifetrackpro-web/exams/jee#webpage",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web/exams/jee",
        "name": "JEE Main & Advanced Study Tracker & Revision OS",
        "description": "Comprehensive IIT JEE preparation tracking with Pomodoro blocks and formula recall."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhishekkumar74.github.io/lifetrackpro-web" },
          { "@type": "ListItem", "position": 2, "name": "Target Exams", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features" },
          { "@type": "ListItem", "position": 3, "name": "JEE Main & Advanced Tracker", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/exams/jee" }
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
          <div className="section-eyebrow">🚀 Engineering Aspirants</div>
          <h1 className="subpage-h1">The Precision Study OS For JEE Main &amp; Advanced 2025/2026</h1>
          
          <p className="subpage-lead">
            JEE Advanced rewards deep analytical stamina and lightning-fast formula recall. LifeTrack Pro structures your day into focused problem-solving blocks while insulating your streak from burnout.
          </p>

          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Built For Serious IIT JEE Aspirants
            </h2>
            <ul className="content-card-list">
              <li>✓ <strong>Calculus &amp; Mechanics Formula Recall:</strong> Daily spaced repetition reviews ensure complex derivations remain fresh under pressure.</li>
              <li>✓ <strong>90-Minute Exam Simulation Blocks:</strong> Calibrate your biological clock to JEE exam timing (9 AM to 12 PM and 2:30 PM to 5:30 PM).</li>
              <li>✓ <strong>Daily Non-Negotiable Streaks:</strong> Track 'Solve 30 Tough Physics Problems' and 'Review Mock Test Mistakes'.</li>
              <li>✓ <strong>IIT Delhi &amp; Bombay Study Rooms:</strong> Study alongside top rankers in synchronous, silent live focus lounges.</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-main">
              <span>📱</span> Try Free on Android
            </Link>
            <Link href="/features" className="btn-glass">
              ← View All Superpowers
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
