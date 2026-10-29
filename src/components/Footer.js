import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link href="/" className="brand-wrap" style={{ marginBottom: '14px' }}>
              <Image 
                src="/icon.png" 
                alt="LifeTrack Pro" 
                width={32} 
                height={32} 
                className="brand-icon-img"
              />
              <div className="brand-title">
                LifeTrack <span style={{ color: 'var(--primary-light)' }}>Pro</span>
              </div>
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: '1.6', marginBottom: '20px' }}>
              The all-in-one productivity Life OS combining Pomodoro focus sessions, spaced repetition flashcards, habit tracking, and live study rooms.
            </p>
            <div style={{ fontSize: '12px', color: 'var(--cyan)' }}>
              🟢 Google SEO Indexed &amp; Multi-Page Architecture
            </div>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Core Features</h4>
              <ul>
                <li><Link href="/features/pomodoro-timer">Pomodoro Timer</Link></li>
                <li><Link href="/features/spaced-repetition">SM-2 Spaced Repetition</Link></li>
                <li><Link href="/features/habit-tracker">Habit Streaks</Link></li>
                <li><Link href="/features/study-rooms">Live Study Rooms</Link></li>
                <li><Link href="/calculator">Focus ROI Calculator</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Target Aspirants</h4>
              <ul>
                <li><Link href="/exams/neet">NEET UG &amp; PG Routine</Link></li>
                <li><Link href="/exams/jee">JEE Main &amp; Advanced</Link></li>
                <li><Link href="/exams/upsc">UPSC Civil Services</Link></li>
                <li><Link href="/features">Tech &amp; Coding Placements</Link></li>
                <li><Link href="/faq">Common Questions</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Control &amp; Crawlers</h4>
              <ul>
                <li><Link href="/admin" style={{ color: 'var(--primary-light)', fontWeight: 700 }}>🛡️ Super Admin Panel</Link></li>
                <li><Link href="/sitemap.xml" target="_blank">XML Sitemap</Link></li>
                <li><Link href="/robots.txt" target="_blank">Robots.txt</Link></li>
                <li><Link href="/faq">FAQ Documentation</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 LifeTrack Pro. All rights reserved. Crafted for serious students.</div>
          <div>
            <Link href="/admin" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
