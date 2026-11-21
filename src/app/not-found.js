import Link from 'next/link';
import { HomeIcon, SparklesIcon, TimerIcon, CardsIcon, HabitFlameIcon, HeadphonesIcon, CalculatorIcon } from '@/components/Icons';

export const metadata = {
  title: {
    absolute: '404 - Page Not Found | LifeTrack Pro',
  },
  description: 'The requested study page or tool was not found. Browse our Pomodoro timers, SM-2 flashcards, habit trackers, and free online study schedulers.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="container subpage-container" style={{ padding: '60px 20px 80px', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="section-eyebrow">404 Error • Page Not Found</div>
        <h1 className="subpage-h1" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
          Looks like this study path moved
        </h1>
        <p className="subpage-lead" style={{ maxWidth: '580px', margin: '0 auto 28px' }}>
          The page or resource you are looking for doesn&apos;t exist or has been relocated. Explore our core features, free academic tools, or exam preparation planners below.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          <Link href="/" className="btn-main" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <HomeIcon size={16} /> Return to Homepage
          </Link>
          <Link href="/tools" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <CalculatorIcon size={16} /> Free Online Tools
          </Link>
          <Link href="/features" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <SparklesIcon size={16} /> Explore All Features
          </Link>
        </div>
      </div>

      {/* Main Section Navigation Directory */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {/* Core Features */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TimerIcon size={18} style={{ color: 'var(--primary)' }} /> Core Study Features
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
            <li><Link href="/features/pomodoro-timer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Pomodoro Timer for Students →</Link></li>
            <li><Link href="/features/spaced-repetition" style={{ color: 'var(--primary)', textDecoration: 'none' }}>SM-2 Spaced Repetition Flashcards →</Link></li>
            <li><Link href="/features/habit-tracker" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Student Habit Tracker &amp; Streaks →</Link></li>
            <li><Link href="/features/study-rooms" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Silent Virtual Study Rooms →</Link></li>
            <li><Link href="/features" style={{ color: '#64748B', textDecoration: 'none' }}>View All Features Overview →</Link></li>
          </ul>
        </div>

        {/* Free Online Study Tools */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalculatorIcon size={18} style={{ color: '#6366F1' }} /> Free Academic Tools
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
            <li><Link href="/tools/study-timetable-generator" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Study Timetable Generator →</Link></li>
            <li><Link href="/tools/daily-routine-generator" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Daily Routine Generator for Students →</Link></li>
            <li><Link href="/tools/study-hours-calculator" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Study Hours Calculator →</Link></li>
            <li><Link href="/tools/focus-time-calculator" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Focus Time Calculator →</Link></li>
            <li><Link href="/tools/weekly-study-planner" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Weekly Study Planner →</Link></li>
          </ul>
        </div>

        {/* Exam Planners & Help */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CardsIcon size={18} style={{ color: '#059669' }} /> Exam Systems &amp; Guides
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
            <li><Link href="/exams/jee" style={{ color: 'var(--primary)', textDecoration: 'none' }}>IIT JEE Study Planner →</Link></li>
            <li><Link href="/exams/neet" style={{ color: 'var(--primary)', textDecoration: 'none' }}>NEET Study Timetable →</Link></li>
            <li><Link href="/exams/upsc" style={{ color: 'var(--primary)', textDecoration: 'none' }}>UPSC Answer Writing Timer →</Link></li>
            <li><Link href="/calculator" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Study Distraction &amp; Focus ROI Calculator →</Link></li>
            <li><Link href="/faq" style={{ color: '#64748B', textDecoration: 'none' }}>Frequently Asked Questions →</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
