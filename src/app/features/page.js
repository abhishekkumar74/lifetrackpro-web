import Link from 'next/link';

export const metadata = {
  title: 'All Features — Focus Timer, Spaced Repetition & Study Rooms | LifeTrack Pro',
  description: 'Explore LifeTrack Pro superpowers: custom Pomodoro timer, scientific SM-2 spaced repetition, habit streak shields, and 24/7 multiplayer live study rooms.',
  keywords: ['study app features', 'pomodoro focus timer', 'spaced repetition algorithm', 'habit tracking app', 'live study rooms'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/features',
  },
  openGraph: {
    title: 'All Features — Focus Timer, Spaced Repetition & Study Rooms',
    description: 'Explore the 6 core superpowers engineered for high-performance students.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/features',
  }
};

export default function FeaturesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhishekkumar74.github.io/lifetrackpro-web/features#webpage",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web/features",
        "name": "LifeTrack Pro Features Hub",
        "description": "Comprehensive feature suite for Pomodoro focus, spaced repetition, and habit consistency."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhishekkumar74.github.io/lifetrackpro-web" },
          { "@type": "ListItem", "position": 2, "name": "Features Hub", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features" }
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
        <div className="reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
          <div className="section-eyebrow">Product Ecosystem</div>
          <h1 className="section-h2">Everything You Need To Build Unstoppable Momentum</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Stop letting fragmented tools slow you down. Explore our core features engineered specifically for students, engineers, and competitive exam toppers.
          </p>
        </div>

        <div className="features-grid" style={{ marginTop: '0' }}>
          <div className="feat-card reveal" style={{ '--feat-bg': 'rgba(91,78,228,0.08)' }}>
            <div className="feat-icon-box">⏱️</div>
            <h2 className="feat-title">Smart Focus Timer</h2>
            <p className="feat-desc">
              Custom Pomodoro sessions with binaural audio frequencies (432Hz, lo-fi, café, and rain). Works in the background when your screen locks.
            </p>
            <Link href="/features/pomodoro-timer" className="feat-link">
              Explore Pomodoro Timer →
            </Link>
          </div>

          <div className="feat-card reveal reveal-delay-1" style={{ '--feat-bg': 'rgba(5,150,105,0.08)' }}>
            <div className="feat-icon-box">🃏</div>
            <h2 className="feat-title">SM-2 Spaced Repetition</h2>
            <p className="feat-desc">
              The world-standard memory algorithm used by top med students. Schedules card reviews right before memory decay occurs.
            </p>
            <Link href="/features/spaced-repetition" className="feat-link">
              Explore Spaced Repetition →
            </Link>
          </div>

          <div className="feat-card reveal reveal-delay-2" style={{ '--feat-bg': 'rgba(217,119,6,0.08)' }}>
            <div className="feat-icon-box">🔥</div>
            <h2 className="feat-title">Habit Streak Shields</h2>
            <p className="feat-desc">
              Non-negotiable daily habit streaks with streak freeze protection shields so an illness or emergency won't erase months of discipline.
            </p>
            <Link href="/features/habit-tracker" className="feat-link">
              Explore Habit Tracker →
            </Link>
          </div>

          <div className="feat-card reveal" style={{ '--feat-bg': 'rgba(225,29,72,0.08)' }}>
            <div className="feat-icon-box">🎧</div>
            <h2 className="feat-title">Live 24/7 Study Rooms</h2>
            <p className="feat-desc">
              Study alongside thousands of aspirants across India in virtual study rooms with synchronous Pomodoro intervals and ambient audio.
            </p>
            <Link href="/features/study-rooms" className="feat-link">
              Explore Live Study Rooms →
            </Link>
          </div>

          <div className="feat-card reveal reveal-delay-1" style={{ '--feat-bg': 'rgba(147,51,234,0.08)' }}>
            <div className="feat-icon-box">🎯</div>
            <h2 className="feat-title">Target Exam Progress Ring</h2>
            <p className="feat-desc">
              Set your target date for JEE, NEET, UPSC, or Coding Placements. Visual animated progress rings fill up as you complete your daily syllabus quotas.
            </p>
            <Link href="/calculator" className="feat-link">
              Calculate Exam Schedule →
            </Link>
          </div>

          <div className="feat-card reveal reveal-delay-2" style={{ '--feat-bg': 'rgba(2,132,199,0.08)' }}>
            <div className="feat-icon-box">📊</div>
            <h2 className="feat-title">Deep Productivity Analytics</h2>
            <p className="feat-desc">
              GitHub-style contribution heatmaps, subject distribution charts, and weekly focus reports to inspect your learning velocity.
            </p>
            <Link href="/calculator" className="feat-link">
              View Analytics Demo →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
