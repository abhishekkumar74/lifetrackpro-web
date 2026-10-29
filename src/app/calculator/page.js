import RoiCalculator from '@/components/RoiCalculator';
import Link from 'next/link';

export const metadata = {
  title: 'Interactive Study Time & Retention ROI Calculator | LifeTrack Pro',
  description: 'Calculate how many hours of productive focus time and flashcard concepts LifeTrack Pro reclaims for you every month compared to juggling 5 separate apps.',
  keywords: ['study time calculator', 'pomodoro focus calculator', 'spaced repetition retention calculator', 'study efficiency tool'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/calculator',
  },
  openGraph: {
    title: 'Interactive Study Time & Retention ROI Calculator',
    description: 'Calculate your reclaimed focus hours and concept retention with LifeTrack Pro.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/calculator',
  }
};

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhishekkumar74.github.io/lifetrackpro-web/calculator#webpage",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web/calculator",
        "name": "Interactive Study Time & Retention ROI Calculator",
        "description": "Calculates reclaimed study hours and flashcard retention boost."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhishekkumar74.github.io/lifetrackpro-web" },
          { "@type": "ListItem", "position": 2, "name": "ROI Calculator", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/calculator" }
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

      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
          <div className="section-eyebrow">🧮 Productivity Science</div>
          <h1 className="section-h2">Calculate Your Reclaimed Focus Hours</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Juggling separate apps for timers, flashcards, and notes creates an unseen 18% cognitive overhead. Adjust the sliders below to see your reclaimed study capacity.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="reveal">
            <RoiCalculator />
          </div>

          <div className="reveal reveal-delay-1" style={{ marginTop: '36px', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '10px' }}>
              How Are These Numbers Calculated?
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '12px' }}>
              Studies in human-computer interaction from UC Irvine indicate that switching tasks or apps takes an average of 23 minutes and 15 seconds to return to the original deep focus state.
            </p>
            <p style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.65' }}>
              By consolidating your focus timer, spaced repetition flashcard queue, and habit streaks inside LifeTrack Pro, you reclaim over 30+ hours every month—enough time to solve 1,200+ additional practice questions before your exam.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href="/" className="btn-main">
              <span>📱</span> Back to Home &amp; App Simulator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
