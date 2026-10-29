import Link from 'next/link';

export const metadata = {
  title: 'NEET Study Tracker, Flashcards & Pomodoro Routine | LifeTrack Pro',
  description: 'Master NEET UG & PG biology active recall, Organic Chemistry reactions with SM-2 spaced repetition, and 12-hour Pomodoro study routines in LifeTrack Pro.',
  keywords: ['NEET study tracker', 'NEET revision app', 'NEET biology flashcards', 'NEET organic chemistry spaced repetition', 'NEET 2026 timetable app'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/exams/neet',
  },
  openGraph: {
    title: 'NEET Study Tracker, Flashcards & Pomodoro Routine',
    description: 'The proven study OS for NEET toppers. Retain NCERT facts, master 3,000+ biology cards, and log 10+ hours daily.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/exams/neet',
  }
};

export default function NeetExamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhishekkumar74.github.io/lifetrackpro-web/exams/neet#webpage",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web/exams/neet",
        "name": "NEET Study Tracker, Flashcards & Pomodoro Routine",
        "description": "Comprehensive NEET preparation system with active recall and habit tracking."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhishekkumar74.github.io/lifetrackpro-web" },
          { "@type": "ListItem", "position": 2, "name": "Target Exams", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features" },
          { "@type": "ListItem", "position": 3, "name": "NEET Exam Tracker", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/exams/neet" }
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
          <div className="section-eyebrow">🧬 Medical Aspirants</div>
          <h1 className="section-h2">The All-in-One Study OS For NEET UG &amp; PG Aspirants</h1>
          
          <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '32px' }}>
            Cracking NEET requires committing thousands of NCERT facts, morphology tables, and chemical reactions to long-term memory. LifeTrack Pro unites daily Pomodoro focus blocks with active recall algorithms.
          </p>

          <div className="reveal" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '28px', marginBottom: '28px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '14px' }}>
              How NEET Toppers Use LifeTrack Pro Daily
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--text-2)' }}>
              <li>✓ <strong>Morning Active Recall Queue:</strong> Review 50-80 high-yield Biology cards (Morphology, Genetics, Plant Physiology) right after waking up.</li>
              <li>✓ <strong>Physics MCQ Sprint Blocks:</strong> 50-minute Pomodoro timer blocks with ambient 432Hz focus soundscapes.</li>
              <li>✓ <strong>Organic Chemistry Reactions Deck:</strong> SM-2 spaced repetition auto-schedules mechanism reviews so you never forget name reactions.</li>
              <li>✓ <strong>Live NEET Study Rooms:</strong> Study silently alongside AIIMS and GMC aspirants across India every evening.</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-main">
              <span>📱</span> Download Android App Free
            </Link>
            <Link href="/calculator" className="btn-glass">
              🧮 Calculate Reclaimed Study Hours →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
