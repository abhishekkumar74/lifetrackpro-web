import Link from 'next/link';

export const metadata = {
  title: 'UPSC Civil Services Study Planner, Answer Writing Timer & Streaks | LifeTrack Pro',
  description: 'Track 8+ hours of daily UPSC GS & Optional study, time 15-minute daily Mains answer writing blocks, and master current affairs with SM-2 spaced repetition.',
  keywords: ['UPSC study planner app', 'UPSC daily answer writing timer', 'UPSC prelims revision tracker', 'UPSC civil services tracker app', 'IAS exam study tracker'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/exams/upsc',
  },
  openGraph: {
    title: 'UPSC Civil Services Study Planner & Answer Writing OS',
    description: 'Structure 1,000+ hours of GS, CSAT & Optional preparation with disciplined daily Pomodoro blocks and active recall.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/exams/upsc',
  }
};

export default function UpscExamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhishekkumar74.github.io/lifetrackpro-web/exams/upsc#webpage",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web/exams/upsc",
        "name": "UPSC Civil Services Study Planner & Answer Writing OS",
        "description": "Comprehensive civil services preparation tracking with timed answer writing and current affairs recall."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhishekkumar74.github.io/lifetrackpro-web" },
          { "@type": "ListItem", "position": 2, "name": "Target Exams", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features" },
          { "@type": "ListItem", "position": 3, "name": "UPSC Civil Services Tracker", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/exams/upsc" }
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
          <div className="section-eyebrow">🏛️ Civil Services Aspirants</div>
          <h1 className="subpage-h1">The Daily Discipline OS For UPSC CSE Prelims &amp; Mains</h1>
          
          <p className="subpage-lead">
            The UPSC syllabus is a marathon that breaks undisciplined schedules. LifeTrack Pro organizes your 10 to 12-hour daily study routine across Static GS, Current Affairs, and timed answer writing.
          </p>

          <div className="content-card reveal">
            <h2 className="content-card-h2">
              How Serious UPSC Aspirants Study with LifeTrack Pro
            </h2>
            <ul className="content-card-list">
              <li>✓ <strong>Daily Mains Answer Writing Timer:</strong> Time strict 7-minute (10-marker) and 11-minute (15-marker) answer drafts with zero distractions.</li>
              <li>✓ <strong>Polity, History &amp; Environment Spaced Repetition:</strong> Master Constitutional Articles, Supreme Court cases, and National Parks with SM-2 flashcards.</li>
              <li>✓ <strong>Target Goal Countdown:</strong> Watch your 500-day countdown ring advance toward the Prelims exam date.</li>
              <li>✓ <strong>UPSC Silent Study Rooms:</strong> Study alongside dedicated civil services aspirants across Old Rajinder Nagar and Mukherjee Nagar.</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-main">
              <span>📱</span> Get Started Free
            </Link>
            <Link href="/features" className="btn-glass">
              ← Explore All Features
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
