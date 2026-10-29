import Image from 'next/image';
import Link from 'next/link';
import PhoneSimulator from '@/components/PhoneSimulator';
import RoiCalculator from '@/components/RoiCalculator';

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android, Web, iOS (Upcoming)",
        "applicationCategory": "ProductivityApplication",
        "description": "LifeTrack Pro combines Pomodoro focus timer, SM-2 spaced repetition flashcards, daily habit streaks, and live study rooms.",
        "image": "https://abhishekkumar74.github.io/lifetrackpro-web/play_store_feature_graphic.png",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "12840",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Organization",
        "name": "LifeTrack Pro",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web",
        "logo": "https://abhishekkumar74.github.io/lifetrackpro-web/icon.png"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO SECTION ── */}
      <section className="hero">
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-status-pill">
            <span className="status-dot-pulse"></span>
            <span>🟢 3,420+ students studying right now</span>
          </div>

          <h1 className="hero-h1">
            Your Complete Study &amp; Life OS.<br />
            <span className="gradient-accent">Fully Focused. Zero Chaos.</span>
          </h1>

          <p className="hero-subtitle">
            One unified app combining <strong>Pomodoro focus sessions</strong>, <strong>SM-2 spaced repetition flashcards</strong>, <strong>daily habit streaks</strong>, and <strong>live multiplayer study rooms</strong>. Stop juggling 5 fragmented apps.
          </p>

          <div className="hero-cta-group">
            <a href="#simulator" className="btn-main">
              <span>📱</span> Try Interactive Simulator
            </a>
            <Link href="/features" className="btn-glass">
              <span>✨</span> Explore All Features →
            </Link>
          </div>

          {/* User's Authentic Play Store Feature Graphic */}
          <div className="feature-graphic-wrapper">
            <Image 
              src="/play_store_feature_graphic.png" 
              alt="LifeTrack Pro App Interface Showcase - Play Store"
              width={1024}
              height={500}
              className="feature-graphic-img"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── LIVE ACHIEVEMENT TICKER ── */}
      <div className="marquee-container">
        <div className="marquee-content">
          <div className="marquee-item"><span className="marquee-pill">🔥 STREAK</span> <strong>Aryan S. (JEE 2025)</strong> just reached a 45-day unbroken streak!</div>
          <div className="marquee-item"><span className="marquee-pill">🃏 FLASHCARDS</span> <strong>Priya M. (NEET)</strong> completed 84 Organic Chemistry recall cards</div>
          <div className="marquee-item"><span className="marquee-pill">🎧 STUDY ROOM</span> <strong>IIT Delhi Lo-Fi Room</strong> has 48 concurrent students studying</div>
          <div className="marquee-item"><span className="marquee-pill">⏱️ POMODORO</span> <strong>Rohan K.</strong> logged 4 hours of deep work block</div>
          <div className="marquee-item"><span className="marquee-pill">🎯 GOAL REACHED</span> <strong>Ananya T.</strong> crossed 500 hours target for UPSC Prelims!</div>
          {/* Loop duplicates */}
          <div className="marquee-item"><span className="marquee-pill">🔥 STREAK</span> <strong>Aryan S. (JEE 2025)</strong> just reached a 45-day unbroken streak!</div>
          <div className="marquee-item"><span className="marquee-pill">🃏 FLASHCARDS</span> <strong>Priya M. (NEET)</strong> completed 84 Organic Chemistry recall cards</div>
        </div>
      </div>

      {/* ── INTERACTIVE 3D PHONE SIMULATOR ── */}
      <section className="mockup-wrapper" id="simulator">
        <PhoneSimulator />
      </section>

      {/* ── THE PROBLEM: 5 APPS VS 1 APP ── */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
            <div className="section-eyebrow">The Real Problem</div>
            <h2 className="section-h2">5 Separate Apps.<br />Zero Actual Retention.</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Switching between Forest for timing, Anki for flashcards, Habitica for streaks, and WhatsApp for study rooms drains your cognitive focus.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'rgba(255,83,118,0.03)', border: '1px solid rgba(255,83,118,0.15)', borderRadius: 'var(--radius-lg)', padding: '30px' }}>
              <h3 style={{ color: 'var(--coral)', fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
                ❌ The Fragmented App Mess
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-2)' }}>
                <li>• <strong>Cognitive Exhaustion:</strong> Tabbing across 5 different tools destroys study flow.</li>
                <li>• <strong>Disconnected Data:</strong> Your focus timer doesn't link to your exam countdown or daily goals.</li>
                <li>• <strong>Ugly 2006 Interfaces:</strong> Dated UI makes active recall feel like a painful chore.</li>
                <li>• <strong>No Social Accountability:</strong> Studying alone makes it easy to quit at midnight.</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(108,92,231,0.08)', border: '1px solid var(--primary-light)', borderRadius: 'var(--radius-lg)', padding: '30px', boxShadow: '0 0 40px rgba(108,92,231,0.12)' }}>
              <h3 style={{ color: 'var(--cyan)', fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
                ⚡ The LifeTrack Pro Solution
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-2)' }}>
                <li>• <strong>Unified Life OS:</strong> Timer, spaced repetition, habit tracking, and study rooms together.</li>
                <li>• <strong>Scientific Retention:</strong> SM-2 active recall auto-calculates revision schedules.</li>
                <li>• <strong>Modern Obsidian Aesthetics:</strong> Designed for modern mobile and web workflows.</li>
                <li>• <strong>Real-Time Community:</strong> Study alongside thousands of serious aspirants nationwide.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 SUPERPOWERS GRID (WITH SEPARATE SEO PAGES LINKS) ── */}
      <section>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <div className="section-eyebrow">Engineered For Mastery</div>
            <h2 className="section-h2">One App. Six Superpowers.</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Every feature has been custom-crafted for high performers, competitive exam aspirants, and lifelong learners.
            </p>
          </div>

          <div className="features-grid">
            <div className="feat-card" style={{ '--feat-color': '#6C5CE7', '--feat-bg': 'rgba(108,92,231,0.12)' }}>
              <div className="feat-icon-box">⏱️</div>
              <h3 className="feat-title">Smart Focus Timer</h3>
              <p className="feat-desc">Customizable Pomodoro blocks with ambient soundscapes (rain, café, 432Hz). Keeps ticking even on locked screen.</p>
              <Link href="/features/pomodoro-timer" className="feat-link">
                Learn about Pomodoro Engine →
              </Link>
            </div>

            <div className="feat-card" style={{ '--feat-color': '#00F5D4', '--feat-bg': 'rgba(0,245,212,0.12)' }}>
              <div className="feat-icon-box">🃏</div>
              <h3 className="feat-title">SM-2 Spaced Repetition</h3>
              <p className="feat-desc">The scientific active recall algorithm. Automatically schedules reviews right before you forget.</p>
              <Link href="/features/spaced-repetition" className="feat-link">
                Learn about SM-2 Recall →
              </Link>
            </div>

            <div className="feat-card" style={{ '--feat-color': '#FFB703', '--feat-bg': 'rgba(255,183,3,0.12)' }}>
              <div className="feat-icon-box">🔥</div>
              <h3 className="feat-title">Habit Streak Shields</h3>
              <p className="feat-desc">Build non-negotiable daily habits with flame streak rings and emergency freeze shields.</p>
              <Link href="/features/habit-tracker" className="feat-link">
                Learn about Habit Streaks →
              </Link>
            </div>

            <div className="feat-card" style={{ '--feat-color': '#FF5376', '--feat-bg': 'rgba(255,83,118,0.12)' }}>
              <div className="feat-icon-box">🎧</div>
              <h3 className="feat-title">Live 24/7 Study Rooms</h3>
              <p className="feat-desc">Hop into synchronized study rooms with friends and study groups across India.</p>
              <Link href="/features/study-rooms" className="feat-link">
                Learn about Live Rooms →
              </Link>
            </div>

            <div className="feat-card" style={{ '--feat-color': '#A855F7', '--feat-bg': 'rgba(168,85,247,0.12)' }}>
              <div className="feat-icon-box">🎯</div>
              <h3 className="feat-title">Target Goal Countdowns</h3>
              <p className="feat-desc">Set your exam target (JEE, NEET, UPSC, Coding Interview) and watch animated progress rings fill up.</p>
              <Link href="/features" className="feat-link">
                Explore Goal Engine →
              </Link>
            </div>

            <div className="feat-card" style={{ '--feat-color': '#4D96FF', '--feat-bg': 'rgba(77,150,255,0.12)' }}>
              <div className="feat-icon-box">📊</div>
              <h3 className="feat-title">Productivity Heatmaps</h3>
              <p className="feat-desc">GitHub-style study heatmaps, subject distribution pie charts, and weekly momentum reports.</p>
              <Link href="/features" className="feat-link">
                Explore Analytics →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE FOCUS ROI CALCULATOR PREVIEW ── */}
      <section style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
            <div className="section-eyebrow">Interactive Calculator</div>
            <h2 className="section-h2">Calculate Reclaimed Focus Time.</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Drag the sliders below to see how many study hours LifeTrack Pro saves you each month.
            </p>
          </div>

          <RoiCalculator />
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER (NO PRICING SECTION) ── */}
      <section>
        <div className="container">
          <div className="cta-box">
            <h2 className="section-h2" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Start Your Streak.<br />
              <span className="gradient-accent">Master Your Exams.</span>
            </h2>
            <p className="section-desc" style={{ margin: '0 auto 30px' }}>
              Join thousands of dedicated aspirants who replaced 5 scattered apps with LifeTrack Pro.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/calculator" className="btn-main">
                <span>🧮</span> Calculate Your Study Hours
              </Link>
              <Link href="/admin" className="btn-glass">
                <span>🛡️</span> Open Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
