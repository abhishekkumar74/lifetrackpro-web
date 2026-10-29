import Link from 'next/link';

export const metadata = {
  title: 'Pomodoro Focus Timer with Ambient Soundscapes & Background Audio',
  description: 'LifeTrack Pro smart Pomodoro focus timer with binaural 432Hz audio, rain, café, and lo-fi soundscapes. Ticks seamlessly on locked screens to master long study sessions.',
  keywords: ['pomodoro timer online', 'study timer for students', 'binaural beats study timer', 'pomodoro app android', 'deep work timer']
};

export default function PomodoroTimerPage() {
  return (
    <article className="container" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-eyebrow">⏱️ Feature Deep Dive</div>
        <h1 className="section-h2">Smart Focus Timer: Enter The Deep Work State On Command</h1>
        
        <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '40px' }}>
          Random intervals and phone notifications destroy study momentum. LifeTrack Pro’s Pomodoro engine is engineered to induce flow state rapidly through sound science and interval precision.
        </p>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '36px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Why Standard Timers Fail Serious Students
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '20px' }}>
            Most smartphone timers stop the moment your phone goes to sleep, or lack ambient acoustic masking. When studying in noisy hostels, libraries, or shared flats, background chatter breaks focus every 8 minutes.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-2)' }}>
            <li>✓ <strong>Background Audio Persistence:</strong> Ambient rain, café chatter, and lo-fi soundscapes keep playing even when your phone locks.</li>
            <li>✓ <strong>Scientifically Calibrated 432Hz &amp; Alpha Waves:</strong> Reduce cognitive fatigue during heavy problem-solving blocks.</li>
            <li>✓ <strong>Custom Focus Cadences:</strong> Choose standard 25/5, the deep-work 50/10 block, or the marathon 90-minute ultradian rhythm.</li>
            <li>✓ <strong>Zero Intrusive Ads:</strong> No pop-ups or full-screen advertisements ever interrupt your focus session.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-main">
            <span>📱</span> Try Interactive Demo on Home
          </Link>
          <Link href="/features" className="btn-glass">
            ← Back to All Features
          </Link>
        </div>
      </div>
    </article>
  );
}
