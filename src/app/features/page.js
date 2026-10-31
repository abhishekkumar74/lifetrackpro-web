import Link from 'next/link';
import { 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  HeadphonesIcon, 
  TargetIcon, 
  ChartIcon,
  CalculatorIcon 
} from '@/components/Icons';

export const metadata = {
  title: 'All-in-One Study Features — Pomodoro, Flashcards & Habits',
  description: 'Explore LifeTrack Pro study features: customizable Pomodoro focus timer, SM-2 spaced repetition flashcards, habit streak shields, and 24/7 virtual study rooms.',
  keywords: [
    'study app features',
    'pomodoro focus timer',
    'spaced repetition flashcards',
    'sm-2 algorithm app',
    'habit tracker for students',
    'virtual study rooms online',
    'study time calculator',
    'competitive exam study planner',
    'deep work study app'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/features',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'All-in-One Study Features — Pomodoro, Flashcards & Habits | LifeTrack Pro',
    description: 'Explore LifeTrack Pro study features: customizable Pomodoro focus timer, SM-2 spaced repetition flashcards, habit streak shields, and 24/7 virtual study rooms.',
    url: 'https://lifetrackpro.in/features',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Study Features Suite — Focus Timer, Flashcards and Habit Tracking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All-in-One Study Features — Pomodoro, Flashcards & Habits | LifeTrack Pro',
    description: 'Explore LifeTrack Pro study features: customizable Pomodoro focus timer, SM-2 spaced repetition flashcards, habit streak shields, and 24/7 virtual study rooms.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function FeaturesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/features#webpage",
        "url": "https://lifetrackpro.in/features",
        "name": "LifeTrack Pro Features Hub — Focus Timer, Flashcards & Habit Tracker",
        "description": "Comprehensive feature ecosystem for student productivity: Pomodoro focus timer, SM-2 spaced repetition, daily habit streaks, and live study rooms.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "name": "LifeTrack Pro",
          "url": "https://lifetrackpro.in"
        },
        "hasPart": [
          {
            "@type": "WebPage",
            "name": "Smart Pomodoro Focus Timer",
            "url": "https://lifetrackpro.in/features/pomodoro-timer",
            "description": "Custom Pomodoro focus timer with binaural audio soundscapes."
          },
          {
            "@type": "WebPage",
            "name": "SM-2 Spaced Repetition Flashcards",
            "url": "https://lifetrackpro.in/features/spaced-repetition",
            "description": "Active recall flashcards powered by the SuperMemo SM-2 algorithm."
          },
          {
            "@type": "WebPage",
            "name": "Habit Streak Tracker & Shields",
            "url": "https://lifetrackpro.in/features/habit-tracker",
            "description": "Daily habit streaks with automated streak freeze shield protection."
          },
          {
            "@type": "WebPage",
            "name": "24/7 Virtual Study Rooms",
            "url": "https://lifetrackpro.in/features/study-rooms",
            "description": "Silent multiplayer focus rooms with synchronous Pomodoro intervals."
          },
          {
            "@type": "WebPage",
            "name": "Study Time & Retention ROI Calculator",
            "url": "https://lifetrackpro.in/calculator",
            "description": "Interactive study time savings and active recall retention calculator."
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://lifetrackpro.in/features#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://lifetrackpro.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Features",
            "item": "https://lifetrackpro.in/features"
          }
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

      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
          <div className="section-eyebrow">Product Ecosystem</div>
          <h1 className="section-h2" style={{ marginBottom: '14px' }}>
            All-in-One Study &amp; Productivity Features
          </h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Stop juggling disconnected timer, flashcard, and habit apps. LifeTrack Pro unites scientific deep work systems, SM-2 spaced repetition, and multiplayer study accountability in one distraction-free platform.
          </p>
        </div>

        <div className="features-grid" style={{ marginTop: '0' }}>
          {/* Card 1: Pomodoro Focus Timer */}
          <div className="feat-card reveal" style={{ '--feat-bg': 'rgba(91,78,228,0.08)' }}>
            <div className="feat-icon-box"><TimerIcon size={18} style={{ color: 'var(--primary)' }} /></div>
            <h2 className="feat-title">Smart Pomodoro Focus Timer</h2>
            <p className="feat-desc">
              Custom work and break intervals (25/5 or 50/10) with binaural audio soundscapes (432Hz, lo-fi, café, rain). Tracks focus sessions in the background even with your phone screen locked.
            </p>
            <Link href="/features/pomodoro-timer" className="feat-link" aria-label="Explore Smart Pomodoro Focus Timer">
              Explore Focus Timer →
            </Link>
          </div>

          {/* Card 2: SM-2 Spaced Repetition */}
          <div className="feat-card reveal reveal-delay-1" style={{ '--feat-bg': 'rgba(5,150,105,0.08)' }}>
            <div className="feat-icon-box"><CardsIcon size={18} style={{ color: 'var(--emerald)' }} /></div>
            <h2 className="feat-title">SM-2 Spaced Repetition Flashcards</h2>
            <p className="feat-desc">
              Active recall flashcard engine powered by the scientific SuperMemo SM-2 algorithm. Automatically schedules card reviews right before memory decay to lock in formulas and key concepts.
            </p>
            <Link href="/features/spaced-repetition" className="feat-link" aria-label="Explore SM-2 Spaced Repetition Flashcards">
              Explore Spaced Repetition →
            </Link>
          </div>

          {/* Card 3: Habit Streak Shields */}
          <div className="feat-card reveal reveal-delay-2" style={{ '--feat-bg': 'rgba(217,119,6,0.08)' }}>
            <div className="feat-icon-box"><HabitFlameIcon size={18} style={{ color: 'var(--amber)' }} /></div>
            <h2 className="feat-title">Habit Streak Shields &amp; Routines</h2>
            <p className="feat-desc">
              Build non-negotiable daily study habits with automated streak freeze shields. Protect your long-term consistency when unexpected illness or travel interrupts your study schedule.
            </p>
            <Link href="/features/habit-tracker" className="feat-link" aria-label="Explore Daily Habit Tracker and Streak Shields">
              Explore Habit Tracker →
            </Link>
          </div>

          {/* Card 4: Virtual Study Rooms */}
          <div className="feat-card reveal" style={{ '--feat-bg': 'rgba(225,29,72,0.08)' }}>
            <div className="feat-icon-box"><HeadphonesIcon size={18} style={{ color: 'var(--rose)' }} /></div>
            <h2 className="feat-title">Live 24/7 Virtual Study Rooms</h2>
            <p className="feat-desc">
              Join silent multiplayer focus rooms with real-time peer presence and synchronous Pomodoro cycles. Study alongside thousands of dedicated competitive exam aspirants across India.
            </p>
            <Link href="/features/study-rooms" className="feat-link" aria-label="Explore Live 24/7 Virtual Study Rooms">
              Explore Live Study Rooms →
            </Link>
          </div>

          {/* Card 5: Target Exam Syllabi */}
          <div className="feat-card reveal reveal-delay-1" style={{ '--feat-bg': 'rgba(147,51,234,0.08)' }}>
            <div className="feat-icon-box"><TargetIcon size={18} style={{ color: '#9333EA' }} /></div>
            <h2 className="feat-title">Target Exam Syllabus Planners</h2>
            <p className="feat-desc">
              Set exam milestone dates for IIT JEE, NEET UG, and UPSC CSE. Animated syllabus completion rings and daily chapter quotas keep your preparation on track for exam day.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <Link href="/exams/jee" className="feat-link" style={{ marginTop: 0 }} aria-label="Explore Target Exam Syllabus Planners">
                Explore Exam Planners →
              </Link>
              <span style={{ display: 'flex', gap: '6px', fontSize: '10.5px' }}>
                <Link href="/exams/neet" style={{ color: 'var(--text-3)', textDecoration: 'underline' }}>NEET</Link>
                <Link href="/exams/jee" style={{ color: 'var(--text-3)', textDecoration: 'underline' }}>JEE</Link>
                <Link href="/exams/upsc" style={{ color: 'var(--text-3)', textDecoration: 'underline' }}>UPSC</Link>
              </span>
            </div>
          </div>

          {/* Card 6: Productivity Analytics & ROI */}
          <div className="feat-card reveal reveal-delay-2" style={{ '--feat-bg': 'rgba(2,132,199,0.08)' }}>
            <div className="feat-icon-box"><ChartIcon size={18} style={{ color: 'var(--sky)' }} /></div>
            <h2 className="feat-title">Productivity Analytics &amp; ROI</h2>
            <p className="feat-desc">
              Visualize your daily consistency with GitHub-style study heatmaps and subject distribution charts. Measure your annual focus hour gains and memory retention improvement.
            </p>
            <Link href="/calculator" className="feat-link" aria-label="Try Interactive Study ROI Calculator">
              Calculate Study ROI →
            </Link>
          </div>
        </div>

        {/* Contextual Section: Calculator and FAQ Deep Links */}
        <div className="reveal reveal-delay-2" style={{ 
          marginTop: '28px', 
          padding: '22px 20px', 
          background: '#FFFFFF', 
          borderRadius: '14px', 
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '4px' }}>
              Measure Your Daily Focus &amp; Retention Gains
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, maxWidth: '540px', lineHeight: 1.5 }}>
              Use our interactive study calculator to model how structured Pomodoro blocks and SM-2 spaced repetition save up to 450+ hours of wasted revision annually.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/calculator" className="btn-main" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} aria-label="Open Interactive Study ROI Calculator">
              <CalculatorIcon size={15} /> Launch ROI Calculator
            </Link>
            <Link href="/faq" className="btn-secondary" aria-label="Browse Frequently Asked Questions">
              Explore FAQs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
