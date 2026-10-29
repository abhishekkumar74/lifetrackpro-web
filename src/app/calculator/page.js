import RoiCalculator from '@/components/RoiCalculator';
import Link from 'next/link';

export const metadata = {
  title: 'Interactive Study Time & Memory Retention Calculator',
  description: 'Calculate how many hours of productive focus time and flashcard concepts LifeTrack Pro reclaims for you every month compared to juggling 5 separate apps.',
  keywords: ['study time calculator', 'pomodoro focus calculator', 'spaced repetition retention calculator', 'study efficiency tool']
};

export default function CalculatorPage() {
  return (
    <div className="container" style={{ padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <div className="section-eyebrow">🧮 Productivity Science</div>
        <h1 className="section-h2">Calculate Your Reclaimed Focus Hours</h1>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          Juggling separate apps for timers, flashcards, and notes creates an unseen 18% cognitive overhead. Adjust the sliders below to see your reclaimed study capacity.
        </p>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <RoiCalculator />

        <div style={{ marginTop: '50px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
            How Are These Numbers Calculated?
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '14px' }}>
            Studies in human-computer interaction from UC Irvine indicate that switching tasks or apps takes an average of 23 minutes and 15 seconds to return to the original deep focus state.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.7' }}>
            By consolidating your focus timer, spaced repetition flashcard queue, and habit streaks inside LifeTrack Pro, you reclaim over 30+ hours every month—enough time to solve 1,200+ additional practice questions before your exam.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/" className="btn-main">
            <span>📱</span> Back to Home &amp; App Simulator
          </Link>
        </div>
      </div>
    </div>
  );
}
