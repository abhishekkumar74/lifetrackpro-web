import Link from 'next/link';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { 
  TimerIcon, 
  CardsIcon, 
  HeadphonesIcon, 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import dynamic from 'next/dynamic';

const InteractiveHabitTracker = dynamic(() => import('@/components/InteractiveHabitTracker'), {
  loading: () => <div style={{ minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '13px' }}>Loading Habit Tracker Simulator...</div>,
});

const HABIT_TRACKER_FAQS = [
  {
    question: "How does the streak freeze shield work in LifeTrack Pro?",
    answer: "Every user earns up to 2 streak freeze shields per month through consistent study. If you get sick, travel, or have an essential rest day after a grueling mock test, arming the freeze shield automatically absorbs the missed day, keeping your hard-earned streak count and momentum badge fully intact."
  },
  {
    question: "Why do habit streaks work so well for competitive exam preparation?",
    answer: "Behavioral economics demonstrates that humans experience loss aversion twice as intensely as equivalent gain. When an unbroken 30-day streak is burning on your device widget, the psychological friction of skipping a study day far outweighs short-term procrastination."
  },
  {
    question: "How do I choose the right daily non-negotiable study habits?",
    answer: "Keep your non-negotiables to 3-5 high-leverage actions rather than 20 vague resolutions. Top rankers track precise micro-anchors such as: Solve 40 MCQs, Clear due flashcard queue, Complete one 50-minute Pomodoro block, and Review mock errors."
  },
  {
    question: "Does the habit tracker require an active internet connection?",
    answer: "No. LifeTrack Pro operates on an offline-first architecture. All habit logs, streak calculations, and completion percentages are stored locally on your device with zero cloud latency."
  },
  {
    question: "How does habit tracking connect with Pomodoro timers and flashcards?",
    answer: "Inside LifeTrack Pro, your habit routines integrate directly with the other study modules. Completing your scheduled Pomodoro focus blocks or clearing your SM-2 flashcard review queue directly marks corresponding daily habit anchors as done."
  }
];

export const metadata = {
  title: {
    absolute: 'Student Habit Tracker & Streak Shield | LifeTrack Pro',
  },
  description: 'Build consistency with a student habit tracker streak system featuring emergency freeze shields for exam days and rest periods. Track your habits for free.',
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
    title: 'Student Habit Tracker & Streak Shield | LifeTrack Pro',
    description: 'Build consistency with a student habit tracker streak system featuring emergency freeze shields for exam days and rest periods. Track your habits for free.',
    url: 'https://lifetrackpro.in/features/habit-tracker',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-features.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro Student Habit Tracker and Streak Freeze Shields',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Habit Tracker & Streak Shield | LifeTrack Pro',
    description: 'Build consistency with a student habit tracker streak system featuring emergency freeze shields for exam days and rest periods. Track your habits for free.',
    images: ['https://lifetrackpro.in/og/og-features.png'],
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
        "name": "Student Habit Tracker & Streak Freeze Shields | LifeTrack Pro",
        "description": "Student habit tracker combining daily checklists, loss aversion streak mechanics, and protective freeze tokens.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "url": "https://lifetrackpro.in",
          "name": "LifeTrack Pro"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in" },
          { "@type": "ListItem", "position": 2, "name": "Features Hub", "item": "https://lifetrackpro.in/features" },
          { "@type": "ListItem", "position": 3, "name": "Habit Tracker", "item": "https://lifetrackpro.in/features/habit-tracker" }
        ]
      },
      {
        "@type": "MobileApplication",
        "@id": "https://lifetrackpro.in/#app",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "ProductivityApplication",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "description": "Daily student habit tracker with loss aversion streak flames and protective streak freeze shields.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": HABIT_TRACKER_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
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
          <h1 className="subpage-h1">Student Habit Tracker with Streak Freeze Shields</h1>
          
          <p className="subpage-lead">
            Building an unbreakable student habit tracker streak is the true secret to academic consistency. Breakthroughs are built on small, non-negotiable daily habits repeated without fail. LifeTrack Pro combines identity-based habit loops with protective freeze shields so life emergencies never erase your hard-won momentum.
          </p>

          {/* Interactive Habit Tracker Simulator Widget */}
          <InteractiveHabitTracker />

          {/* How The Streak System Works */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              How Habit Streaks &amp; Streak Freeze Shields Work in LifeTrack Pro
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
              The Behavioral Psychology of Student Consistency &amp; Streaks
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
              Daily Study Habits for Competitive Exam Aspirants (JEE, NEET, UPSC)
            </h2>
            <p className="content-card-p">
              Top rankers use LifeTrack Pro to anchor distinct daily rituals calibrated to their target exam:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
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
              Part of Your Complete LifeTrack Pro Study OS
            </h2>
            <p className="content-card-p">
              In <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>LifeTrack Pro</Link>, your habits connect natively with your other productivity tools so you never have to juggle separate apps:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
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

          {/* Frequently Asked Questions */}
          <section className="reveal reveal-delay-1" aria-label="Frequently Asked Questions">
            <FaqAccordion
              title="Frequently Asked Questions About Study Habit Tracking"
              items={HABIT_TRACKER_FAQS}
            />
          </section>

          {/* Bottom CTAs */}
          <div className="subpage-bottom-cta-card">
            <a 
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="tools-cta-primary-btn"
              aria-label="Get LifeTrack Pro on Play Store - Android Study App"
            >
              <PlayStoreIcon size={18} />
              <span>Get LifeTrack Pro on Play Store</span>
              <span className="tools-cta-arrow" aria-hidden="true">→</span>
            </a>
            <div className="tools-cta-secondary-grid">
              <Link href="/features" className="tools-cta-secondary-btn" aria-label="Explore All Features">
                <SparklesIcon size={16} />
                <span>Explore All Features</span>
              </Link>
              <Link href="/calculator" className="tools-cta-secondary-btn" aria-label="Calculate Reclaimed Focus Hours">
                <CalculatorIcon size={16} />
                <span>Calculate Reclaimed Focus Hours</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
