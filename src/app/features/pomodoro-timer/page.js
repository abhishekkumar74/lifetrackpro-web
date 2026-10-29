import Link from 'next/link';

export const metadata = {
  title: 'Pomodoro Focus Timer for Students with Ambient Soundscapes',
  description: 'LifeTrack Pro smart Pomodoro focus timer with binaural 432Hz audio, rain, café, and lo-fi soundscapes. Ticks seamlessly on locked screens to master long study sessions.',
  keywords: ['pomodoro timer online', 'study timer for students', 'binaural beats study timer', 'pomodoro app android', 'deep work timer'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/features/pomodoro-timer',
  },
  openGraph: {
    title: 'Pomodoro Focus Timer for Students with Ambient Soundscapes',
    description: 'Custom Pomodoro blocks with binaural 432Hz audio and screen-lock persistence. Master 4+ hours of deep work daily.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/features/pomodoro-timer',
  }
};

export default function PomodoroTimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhishekkumar74.github.io/lifetrackpro-web/features/pomodoro-timer#webpage",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web/features/pomodoro-timer",
        "name": "Pomodoro Focus Timer for Students with Ambient Soundscapes",
        "description": "Smart Pomodoro focus timer with binaural soundscapes and lockscreen widget support."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhishekkumar74.github.io/lifetrackpro-web" },
          { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features" },
          { "@type": "ListItem", "position": 3, "name": "Pomodoro Timer", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features/pomodoro-timer" }
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
          <div className="section-eyebrow">⏱️ Feature Deep Dive</div>
          <h1 className="subpage-h1">Smart Focus Timer: Enter The Deep Work State On Command</h1>
          
          <p className="subpage-lead">
            Random intervals and phone notifications destroy study momentum. LifeTrack Pro’s Pomodoro engine is engineered to induce flow state rapidly through sound science and interval precision.
          </p>

          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Why Standard Timers Fail Serious Students
            </h2>
            <p className="content-card-p">
              Most smartphone timers stop the moment your phone goes to sleep, or lack ambient acoustic masking. When studying in noisy hostels, libraries, or shared flats, background chatter breaks focus every 8 minutes.
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>Background Audio Persistence:</strong> Ambient rain, café chatter, and lo-fi soundscapes keep playing even when your phone locks.</li>
              <li>✓ <strong>Scientifically Calibrated 432Hz &amp; Alpha Waves:</strong> Reduce cognitive fatigue during heavy problem-solving blocks.</li>
              <li>✓ <strong>Custom Focus Cadences:</strong> Choose standard 25/5, the deep-work 50/10 block, or the marathon 90-minute ultradian rhythm.</li>
              <li>✓ <strong>Zero Intrusive Ads:</strong> No pop-ups or full-screen advertisements ever interrupt your focus session.</li>
            </ul>
          </div>

          {/* Quick FAQ block for Google SERP */}
          <div className="content-card-faq reveal reveal-delay-1">
            <h3 className="content-card-faq-h3">
              How does the Pomodoro technique boost exam scores?
            </h3>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              The human prefrontal cortex depletes glucose after 45-50 minutes of intense analytical thinking. By mandating 5 to 10-minute active recovery breaks, LifeTrack Pro prevents study burnout and maintains peak mental acuity for 8+ hours.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-main">
              <span>📱</span> Try Interactive Demo on Home
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
