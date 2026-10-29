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

      <article className="container" style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className="section-eyebrow">⏱️ Feature Deep Dive</div>
          <h1 className="section-h2">Smart Focus Timer: Enter The Deep Work State On Command</h1>
          
          <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '32px' }}>
            Random intervals and phone notifications destroy study momentum. LifeTrack Pro’s Pomodoro engine is engineered to induce flow state rapidly through sound science and interval precision.
          </p>

          <div className="reveal" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '28px', marginBottom: '32px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '14px' }}>
              Why Standard Timers Fail Serious Students
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '18px' }}>
              Most smartphone timers stop the moment your phone goes to sleep, or lack ambient acoustic masking. When studying in noisy hostels, libraries, or shared flats, background chatter breaks focus every 8 minutes.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--text-2)' }}>
              <li>✓ <strong>Background Audio Persistence:</strong> Ambient rain, café chatter, and lo-fi soundscapes keep playing even when your phone locks.</li>
              <li>✓ <strong>Scientifically Calibrated 432Hz &amp; Alpha Waves:</strong> Reduce cognitive fatigue during heavy problem-solving blocks.</li>
              <li>✓ <strong>Custom Focus Cadences:</strong> Choose standard 25/5, the deep-work 50/10 block, or the marathon 90-minute ultradian rhythm.</li>
              <li>✓ <strong>Zero Intrusive Ads:</strong> No pop-ups or full-screen advertisements ever interrupt your focus session.</li>
            </ul>
          </div>

          {/* Quick FAQ block for Google SERP */}
          <div className="reveal reveal-delay-1" style={{ background: 'var(--bg-cream)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '10px' }}>
              How does the Pomodoro technique boost exam scores?
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.6' }}>
              The human prefrontal cortex depletes glucose after 45-50 minutes of intense analytical thinking. By mandating 5 to 10-minute active recovery breaks, LifeTrack Pro prevents study burnout and maintains peak mental acuity for 8+ hours.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
