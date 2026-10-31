import Link from 'next/link';
import { 
  TimerIcon, 
  CardsIcon, 
  HeadphonesIcon, 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import InteractiveHabitTracker from '@/components/InteractiveHabitTracker';

export const metadata = {
  title: 'Daily Student Habit Tracker & Streak Freeze Shields',
  description: 'Track daily non-negotiable study routines, build 100+ day streaks, and protect your momentum with streak freeze shields. Engineered for serious students.',
  keywords: [
    'student habit tracker',
    'study streak app',
    'streak freeze shield app',
    'daily study routine tracker',
    'habit tracker for jee neet upsc',
    'loss aversion habit tracker',
    'daily revision tracker',
    'student consistency app',
    'lifetrack pro habit streak'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/features/habit-tracker',
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
    title: 'Daily Student Habit Tracker & Streak Freeze Shields | LifeTrack Pro',
    description: 'Build unbreakable daily study momentum. Track daily non-negotiables with streak freeze shields so illness or rest days never reset your hard-earned discipline.',
    url: 'https://lifetrackpro.in/features/habit-tracker',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Student Habit Tracker & Streak Freeze Shields',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Habit Tracker & Streak Freeze Shields | LifeTrack Pro',
    description: 'Track daily non-negotiables with protective streak freeze shields. Never reset to Day 0 when life happens.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function HabitTrackerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/features/habit-tracker#webpage",
        "url": "https://lifetrackpro.in/features/habit-tracker",
        "name": "Daily Student Habit Tracker with Streak Freeze Shields",
        "description": "Student habit tracker combining daily checklists, loss aversion streak mechanics, and protective freeze tokens.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "url": "https://lifetrackpro.in/",
          "name": "LifeTrack Pro"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in/" },
          { "@type": "ListItem", "position": 2, "name": "Features Hub", "item": "https://lifetrackpro.in/features" },
          { "@type": "ListItem", "position": 3, "name": "Habit Tracker", "item": "https://lifetrackpro.in/features/habit-tracker" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the streak freeze shield work in LifeTrack Pro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every user earns up to 2 streak freeze shields per month through consistent study. If you get sick, travel, or have an essential rest day after a grueling mock test, arming the freeze shield automatically absorbs the missed day, keeping your hard-earned streak count and momentum badge fully intact."
            }
          },
          {
            "@type": "Question",
            "name": "Why do habit streaks work so well for competitive exam preparation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Behavioral economics demonstrates that humans experience loss aversion twice as intensely as equivalent gain. When an unbroken 30-day streak is burning on your device widget, the psychological friction of skipping a study day far outweighs short-term procrastination."
            }
          },
          {
            "@type": "Question",
            "name": "How do I choose the right daily non-negotiable study habits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Keep your non-negotiables to 3-5 high-leverage actions rather than 20 vague resolutions. Top rankers track precise micro-anchors such as: Solve 40 MCQs, Clear due flashcard queue, Complete one 50-minute Pomodoro block, and Review mock errors."
            }
          },
          {
            "@type": "Question",
            "name": "Does the habit tracker require an active internet connection?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. LifeTrack Pro operates on an offline-first architecture. All habit logs, streak calculations, and completion percentages are stored locally on your device with zero cloud latency."
            }
          },
          {
            "@type": "Question",
            "name": "How does habit tracking connect with Pomodoro timers and flashcards?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Inside LifeTrack Pro, your habit routines integrate directly with the other study modules. Completing your scheduled Pomodoro focus blocks or clearing your SM-2 flashcard review queue directly marks corresponding daily habit anchors as done."
            }
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

      <article className="container subpage-container">
        <div>
          {/* Visual Semantic Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/features" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Features</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Habit Tracker</span>
          </nav>

          <div className="section-eyebrow">Consistency &amp; Routine Engine</div>
          <h1 className="subpage-h1">Daily Student Habit Tracker with Streak Freeze Shields</h1>
          
          <p className="subpage-lead">
            Academic breakthroughs are never the result of sporadic all-nighters. They are built on small, non-negotiable daily habits repeated without fail. LifeTrack Pro combines identity-based habit loops with protective freeze shields so life emergencies never erase your hard-won momentum.
          </p>

          {/* Interactive Habit Tracker Simulator Widget */}
          <InteractiveHabitTracker />

          {/* How The Streak System Works */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              How the Habit Streak &amp; Freeze Shield System Works
            </h2>
            <p className="content-card-p">
              Traditional habit tracker apps operate on punitive, all-or-nothing rules: miss one day due to sudden fever, travel, or post-exam rest, and your 60-day streak is wiped back to zero. This triggers the psychological &apos;what-the-hell effect&apos;, causing students to abandon their routines entirely.
            </p>
            <p className="content-card-p">
              LifeTrack Pro re-engineers habit tracking for real human life:
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>Daily Non-Negotiable Checklists:</strong> Define 3 to 5 clear daily anchors categorized into Academics, Recall, Focus, and Discipline.</li>
              <li>✓ <strong>Loss Aversion Streak Rings:</strong> Every completed day increments your active streak flame. Watching your streak number climb creates healthy psychological resistance against procrastination.</li>
              <li>✓ <strong>Protective Streak Freeze Shields:</strong> Earn up to 2 freeze shields monthly through consistent effort. When an emergency strikes, your armed shield absorbs the missed day without resetting your streak count.</li>
              <li>✓ <strong>Visual Weekly Momentum Grid:</strong> Inspect your consistency rhythm across the full week at a glance to spot patterns in your energy and discipline.</li>
              <li>✓ <strong>100% Offline-First Persistence:</strong> Mark habits completed anywhere—in basements, libraries, or during daily transit—with instant local database updates.</li>
            </ul>
          </div>

          {/* Behavioral Science of Student Consistency */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              The Behavioral Science of Student Consistency
            </h2>
            <p className="content-card-p">
              The difference between clearing top competitive exams and falling short rarely comes down to raw talent. It comes down to who can execute on days when motivation is low. LifeTrack Pro implements 4 proven behavioral principles:
            </p>
            <ul className="content-card-list">
              <li>• <strong>Habit Stacking &amp; Anchoring:</strong> Pair a high-friction task (such as &apos;Solve 30 Tough Physics Problems&apos;) directly after an automatic anchor (such as &apos;First morning coffee&apos; or &apos;Finishing lecture class&apos;).</li>
              <li>• <strong>Loss Aversion Psychology:</strong> Behavioral economists have proven that humans feel the pain of losing a reward twice as intensely as gaining it. An unbroken 30-day streak creates positive friction that makes quitting feel unacceptable.</li>
              <li>• <strong>The &apos;Never Miss Twice&apos; Rule:</strong> Missing one day is an anomaly; missing two consecutive days is the start of an unintended new habit. Freeze shields bridge the gap so you return to your routine the very next morning.</li>
              <li>• <strong>Identity-Based Habits:</strong> Rather than setting vague goals like &apos;Study hard&apos;, daily checklists establish an identity: &apos;I am the type of student who never skips daily recall.&apos;</li>
            </ul>
          </div>

          {/* Exam-Specific Routines */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Non-Negotiable Routines for India&apos;s Toughest Competitive Exams
            </h2>
            <p className="content-card-p">
              Top rankers use LifeTrack Pro to anchor distinct daily rituals calibrated to their target exam:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '12px' }}>
              <Link href="/exams/jee" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    IIT JEE Main &amp; Advanced
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Anchor daily 50-MCQ problem sprints, formula recall, and timed 90-minute simulation blocks.
                  </p>
                </div>
              </Link>

              <Link href="/exams/neet" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    NEET UG &amp; PG Routine
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Maintain unbroken daily streaks for NCERT line-by-line Biology recall and Organic reaction mechanisms.
                  </p>
                </div>
              </Link>

              <Link href="/exams/upsc" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--amber)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    UPSC Civil Services (CSE)
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Time daily 7-min and 11-min GS Mains answers, newspaper editorial reviews, and CSAT practice.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Connected Life OS Ecosystem */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Seamless Integration with the LifeTrack Pro Study OS
            </h2>
            <p className="content-card-p">
              In <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>LifeTrack Pro</Link>, your habits connect natively with your other productivity tools so you never have to juggle separate apps:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '12px' }}>
              <Link href="/features/pomodoro-timer" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TimerIcon size={15} /> Pomodoro Timer
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Launch 25/5 or 50/10 focus sprints that automatically mark your daily focus habits as complete.
                  </p>
                </div>
              </Link>

              <Link href="/features/spaced-repetition" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CardsIcon size={15} /> SM-2 Flashcards
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Clear due flashcard queues to lock in daily active recall before memory decay occurs.
                  </p>
                </div>
              </Link>

              <Link href="/features/study-rooms" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <HeadphonesIcon size={15} /> 24/7 Study Rooms
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Study quietly alongside focused peers across India to stay accountable to your daily routines.
                  </p>
                </div>
              </Link>

              <Link href="/calculator" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sky)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CalculatorIcon size={15} /> Focus ROI Calculator
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    See how many hours of deep work consistent habit routines save you every month.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick FAQ blocks for Google SERP Snippets */}
          <div className="content-card-faq reveal reveal-delay-1">
            <h3 className="content-card-faq-h3">
              How does the streak freeze shield work in LifeTrack Pro?
            </h3>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              Every user earns up to 2 streak freeze shields per month through consistent study. If you get sick, travel, or have an essential rest day after a grueling mock test, arming the freeze shield automatically absorbs the missed day, keeping your hard-earned streak count and momentum badge fully intact.
            </p>
          </div>

          <div className="content-card-faq reveal reveal-delay-1">
            <h3 className="content-card-faq-h3">
              Why do habit streaks work so well for competitive exam aspirants?
            </h3>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              Behavioral economics demonstrates that humans experience loss aversion twice as intensely as equivalent gain. When an unbroken 30-day streak is burning on your device widget, the psychological friction of skipping a study day far outweighs short-term procrastination.
            </p>
          </div>

          <div className="content-card-faq reveal reveal-delay-1">
            <h3 className="content-card-faq-h3">
              Does the habit tracker require an active internet connection?
            </h3>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              No. LifeTrack Pro operates on an offline-first architecture. All habit logs, streak calculations, and completion percentages are stored locally on your device with zero cloud latency.
            </p>
          </div>

          {/* Bottom CTAs */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '24px' }}>
            <a 
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-main" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <PlayStoreIcon size={16} />
              <span>Get LifeTrack Pro on Play Store</span>
            </a>
            <Link href="/features" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon size={16} />
              <span>Explore All Features</span>
            </Link>
            <Link href="/calculator" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <CalculatorIcon size={16} />
              <span>Calculate Reclaimed Focus Hours</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
