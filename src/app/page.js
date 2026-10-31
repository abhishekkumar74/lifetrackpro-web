import Link from 'next/link';
import { HeroDownloadCta, BottomDownloadCta } from '@/components/HeroDownloadCta';
import HeroDualPhones from '@/components/HeroDualPhones';
import AppleScrollText from '@/components/AppleScrollText';
import CinematicScrollShowcase from '@/components/CinematicScrollShowcase';
import InteractiveExamShowcase from '@/components/InteractiveExamShowcase';

export const metadata = {
  title: 'LifeTrack Pro — All-in-One Study OS | Pomodoro, Flashcards & Habit Tracker',
  description: 'LifeTrack Pro unifies a smart Pomodoro focus timer with ambient soundscapes, SM-2 spaced repetition flashcards, habit streaks with freeze shields, and live study rooms.',
  keywords: [
    'lifetrack pro',
    'study os',
    'all in one study app',
    'pomodoro focus timer',
    'spaced repetition flashcards',
    'sm2 algorithm app',
    'anki alternative india',
    'study habit tracker',
    'streak freeze shield',
    'live virtual study rooms',
    'jee study tracker',
    'neet biology flashcards',
    'upsc answer writing timer',
    'deep work app'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/',
  },
  openGraph: {
    title: 'LifeTrack Pro — All-in-One Study OS | Focus, Flashcards & Habits',
    description: 'Stop juggling 5 fragmented apps. Smart Pomodoro timer, SM-2 flashcard spaced repetition, habit streaks & silent live study rooms in one unified interface.',
    url: 'https://lifetrackpro.in/',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro application interface displaying Pomodoro focus timer, SM-2 flashcard review queue, and habit streak tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeTrack Pro — Complete Study & Life OS',
    description: 'Smart Pomodoro focus timer, SM-2 spaced repetition, habit streak shields, and 24/7 virtual study rooms.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://lifetrackpro.in/#website",
        "url": "https://lifetrackpro.in/",
        "name": "LifeTrack Pro",
        "description": "Unified Study & Life OS combining Pomodoro focus timer, SM-2 spaced repetition flashcards, habit streaks, and live study rooms.",
        "inLanguage": "en-US"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#app",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android, Web",
        "applicationCategory": "ProductivityApplication",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "description": "All-in-one productivity Life OS combining Pomodoro focus timer with ambient soundscapes, SM-2 active recall flashcards, daily habit streaks with freeze shields, and live study rooms.",
        "image": "https://lifetrackpro.in/play_store_feature_graphic.png",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "featureList": [
          "Smart Pomodoro Focus Timer with 432Hz Binaural Soundscapes",
          "SM-2 Spaced Repetition Flashcards & Active Recall Algorithm",
          "Daily Habit Streaks with Protective Streak Freeze Shields",
          "24/7 Silent Multiplayer Virtual Study Rooms",
          "Specialized Exam Trackers for JEE, NEET, and UPSC Aspirants"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://lifetrackpro.in/#organization",
        "name": "LifeTrack Pro",
        "url": "https://lifetrackpro.in/",
        "logo": "https://lifetrackpro.in/icon.png",
        "sameAs": [
          "https://chat.whatsapp.com/B8uwXjT9R665ahqcXVsZdk",
          "https://t.me/lifetrackpro",
          "https://www.instagram.com/lifetrackpro/",
          "https://www.linkedin.com/company/lifetrackpro"
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

      {/* ── HERO SECTION ── */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-h1 hero-fade-in hero-fade-in-delay-1">
            <span className="hero-phrase">Your Goals.</span>{' '}
            <span className="hero-phrase">Your Focus.</span>{' '}
            <span className="gradient-accent hero-phrase hero-phrase-accent">Your Growth.</span>
          </h1>

          <p className="hero-subtitle hero-fade-in hero-fade-in-delay-2">
            One system to help you study smarter, build better habits, and make progress every day.
          </p>

          {/* Interactive Hero Download CTA opening DownloadModal */}
          <HeroDownloadCta />

          {/* Interactive Dual Phone Showcase with hover swap and slight extra tilt */}
          <HeroDualPhones />

          {/* ── METHODOLOGY & CAPABILITY MARQUEE TICKER (UNIFIED SEAMLESS FLOW) ── */}
          <div className="marquee-box-wrapper" aria-label="LifeTrack Pro Core Capabilities">
            <div className="marquee-container">
              <div className="marquee-content">
                <div className="marquee-item"><span className="marquee-pill">SM-2 RECALL</span> Biology &amp; Organic Chemistry Expanding Revision Schedules</div>
                <div className="marquee-item"><span className="marquee-pill">DEEP WORK</span> 50/10 Pomodoro Cadence with 432Hz Soundscapes</div>
                <div className="marquee-item"><span className="marquee-pill">HABIT SHIELD</span> Emergency Streak Freeze Tokens for Rest Days</div>
                <div className="marquee-item"><span className="marquee-pill">EXAM FOCUS</span> 90-Minute JEE &amp; 7-Min UPSC Mains Writing Blocks</div>
                <div className="marquee-item"><span className="marquee-pill">STUDY ROOMS</span> Camera-Free Silent Multiplayer Accountability</div>
                <div className="marquee-item"><span className="marquee-pill">OFFLINE FIRST</span> 100% Local Storage with Zero Data Mining</div>
                <div className="marquee-item"><span className="marquee-pill">SM-2 RECALL</span> Biology &amp; Organic Chemistry Expanding Revision Schedules</div>
                <div className="marquee-item"><span className="marquee-pill">DEEP WORK</span> 50/10 Pomodoro Cadence with 432Hz Soundscapes</div>
                <div className="marquee-item"><span className="marquee-pill">HABIT SHIELD</span> Emergency Streak Freeze Tokens for Rest Days</div>
                <div className="marquee-item"><span className="marquee-pill">EXAM FOCUS</span> 90-Minute JEE &amp; 7-Min UPSC Mains Writing Blocks</div>
                <div className="marquee-item"><span className="marquee-pill">STUDY ROOMS</span> Camera-Free Silent Multiplayer Accountability</div>
                <div className="marquee-item"><span className="marquee-pill">OFFLINE FIRST</span> 100% Local Storage with Zero Data Mining</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CINEMATIC PRODUCT SHOWCASE (STICKY REAL APP SCREENS & INTERACTIVE SIMULATOR) ── */}
      <CinematicScrollShowcase />

      {/* ── APPLE-STYLE SCROLL ILLUMINATED MANIFESTO & KEY METRICS ── */}
      <AppleScrollText />

      {/* ── TAILORED PREPARATION SYSTEMS (INTERACTIVE EXAM SHOWCASE) ── */}
      <InteractiveExamShowcase />

      {/* ── INTEGRATED STUDY TOOLS CLOUD (MATCHES REFERENCE DESIGN) ── */}
      <section className="tools-cloud-section" aria-label="Integrated Study Tools and Frameworks">
        <div className="container">
          <div className="tools-cloud-canvas">
            {/* Soft Ambient Dot Mesh (Matches Reference) */}
            <div className="tools-cloud-dot-mesh" aria-hidden="true" />

            {/* Header Content */}
            <div className="reveal tools-cloud-header">
              <div className="tools-cloud-pill-badge">Works where you study</div>
              <h2 className="tools-cloud-title">All your study tools, unified in one OS.</h2>
              <p className="tools-cloud-desc">
                LifeTrack Pro connects the tools you need to focus, revise, and build discipline — so nothing falls through the cracks.
              </p>
            </div>

            {/* Floating Staggered Pill Badges (Matches Reference Cloud) */}
            <div className="tools-cloud-pills-wrap reveal reveal-delay-1" role="list">
              <Link href="/features/pomodoro-timer" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">⏱️</span>
                <span className="tool-pill-text">Pomodoro Timer</span>
              </Link>

              <Link href="/features/spaced-repetition" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">📇</span>
                <span className="tool-pill-text">SM-2 Flashcards</span>
              </Link>

              <Link href="/features/habit-tracker" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🔥</span>
                <span className="tool-pill-text">Habit Streaks</span>
              </Link>

              <Link href="/features/study-rooms" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🎧</span>
                <span className="tool-pill-text">Live Study Rooms</span>
              </Link>

              <Link href="/exams/jee" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🎯</span>
                <span className="tool-pill-text">JEE Main &amp; Adv</span>
              </Link>

              <Link href="/exams/neet" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🧬</span>
                <span className="tool-pill-text">NEET Medical</span>
              </Link>

              <Link href="/exams/upsc" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">⚖️</span>
                <span className="tool-pill-text">UPSC Answer Timer</span>
              </Link>

              <Link href="/calculator" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🧮</span>
                <span className="tool-pill-text">Focus Calculator</span>
              </Link>

              <Link href="/features" className="tool-pill-badge tool-pill-more" role="listitem">
                <span className="tool-pill-text">20+ More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER (NO PRICING SECTION) ── */}
      <section>
        <div className="container">
          <div className="cta-box reveal">
            <h2 className="cta-h2">
              Build Unbreakable Daily Discipline.<br />
              <span className="cta-gradient-accent">Master Your Syllabus Without Burnout.</span>
            </h2>
            <p className="cta-desc">
              Replace scattered timers, flashcard tools, and habit apps with one disciplined Life OS.
            </p>

            {/* Bottom download CTA button that opens DownloadModal */}
            <BottomDownloadCta />
          </div>
        </div>
      </section>
    </>
  );
}
