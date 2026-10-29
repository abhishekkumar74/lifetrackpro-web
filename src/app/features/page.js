import Link from 'next/link';

export const metadata = {
  title: 'All Features — Focus Timer, Spaced Repetition & Study Rooms',
  description: 'Explore LifeTrack Pro superpowers: custom Pomodoro timer, scientific SM-2 spaced repetition, habit streak shields, and 24/7 multiplayer live study rooms.',
  keywords: ['study app features', 'pomodoro focus timer', 'spaced repetition algorithm', 'habit tracking app', 'live study rooms']
};

export default function FeaturesPage() {
  return (
    <div className="container" style={{ padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
        <div className="section-eyebrow">Product Ecosystem</div>
        <h1 className="section-h2">Everything You Need To Build Unstoppable Momentum</h1>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          Stop letting fragmented tools slow you down. Explore our core features engineered specifically for students, engineers, and competitive exam toppers.
        </p>
      </div>

      <div className="features-grid" style={{ marginTop: '0' }}>
        <div className="feat-card" style={{ '--feat-color': '#6C5CE7', '--feat-bg': 'rgba(108,92,231,0.12)' }}>
          <div className="feat-icon-box">⏱️</div>
          <h2 className="feat-title">Smart Focus Timer</h2>
          <p className="feat-desc">
            Custom Pomodoro sessions with binaural audio frequencies (432Hz, lo-fi, café, and rain). Works in the background when your screen locks.
          </p>
          <Link href="/features/pomodoro-timer" className="feat-link">
            Explore Pomodoro Timer →
          </Link>
        </div>

        <div className="feat-card" style={{ '--feat-color': '#00F5D4', '--feat-bg': 'rgba(0,245,212,0.12)' }}>
          <div className="feat-icon-box">🃏</div>
          <h2 className="feat-title">SM-2 Spaced Repetition</h2>
          <p className="feat-desc">
            The world-standard memory algorithm used by top med students. Schedules card reviews right before memory decay occurs.
          </p>
          <Link href="/features/spaced-repetition" className="feat-link">
            Explore Spaced Repetition →
          </Link>
        </div>

        <div className="feat-card" style={{ '--feat-color': '#FFB703', '--feat-bg': 'rgba(255,183,3,0.12)' }}>
          <div className="feat-icon-box">🔥</div>
          <h2 className="feat-title">Habit Streak Shields</h2>
          <p className="feat-desc">
            Non-negotiable daily habit streaks with streak freeze protection shields so an illness or emergency won't erase months of discipline.
          </p>
          <Link href="/features/habit-tracker" className="feat-link">
            Explore Habit Tracker →
          </Link>
        </div>

        <div className="feat-card" style={{ '--feat-color': '#FF5376', '--feat-bg': 'rgba(255,83,118,0.12)' }}>
          <div className="feat-icon-box">🎧</div>
          <h2 className="feat-title">Live 24/7 Study Rooms</h2>
          <p className="feat-desc">
            Study alongside thousands of aspirants across India in virtual study rooms with synchronous Pomodoro intervals and ambient audio.
          </p>
          <Link href="/features/study-rooms" className="feat-link">
            Explore Live Study Rooms →
          </Link>
        </div>

        <div className="feat-card" style={{ '--feat-color': '#A855F7', '--feat-bg': 'rgba(168,85,247,0.12)' }}>
          <div className="feat-icon-box">🎯</div>
          <h2 className="feat-title">Target Exam Progress Ring</h2>
          <p className="feat-desc">
            Set your target date for JEE, NEET, UPSC, or Coding Placements. Visual animated progress rings fill up as you complete your daily syllabus quotas.
          </p>
          <Link href="/calculator" className="feat-link">
            Calculate Exam Schedule →
          </Link>
        </div>

        <div className="feat-card" style={{ '--feat-color': '#4D96FF', '--feat-bg': 'rgba(77,150,255,0.12)' }}>
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
  );
}
