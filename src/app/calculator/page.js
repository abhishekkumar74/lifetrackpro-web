import Link from 'next/link';
import RoiCalculator from '@/components/RoiCalculator';
import { 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  HeadphonesIcon, 
  SparklesIcon, 
  TargetIcon, 
  HelpCircleIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

export const metadata = {
  title: 'Study Time & Learning Efficiency Calculator',
  description: 'Calculate your monthly study hours, eliminate app-switching fatigue, and estimate extra practice MCQs and flashcards mastered with LifeTrack Pro.',
  keywords: [
    'study time calculator',
    'study planning calculator',
    'revision schedule calculator',
    'learning efficiency calculator',
    'study hours calculator',
    'pomodoro study planner',
    'jee study hours calculator',
    'neet revision time calculator',
    'upsc daily study planner',
    'student productivity calculator',
    'lifetrack pro calculator'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/calculator',
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
    title: 'Study Time & Learning Efficiency Calculator | LifeTrack Pro',
    description: 'Calculate your monthly study hours, eliminate app-switching friction, and project extra practice MCQs and flashcards mastered.',
    url: 'https://lifetrackpro.in/calculator',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Study Time and Learning Efficiency Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Time & Learning Efficiency Calculator | LifeTrack Pro',
    description: 'Calculate your monthly study hours, eliminate app-switching friction, and project extra practice MCQs and flashcards mastered.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/calculator#webpage",
        "url": "https://lifetrackpro.in/calculator",
        "name": "Study Time & Learning Efficiency Calculator | LifeTrack Pro",
        "description": "Interactive study time calculator to project monthly focus hours, eliminate context-switching overhead, and optimize revision schedules for competitive exams.",
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
          { "@type": "ListItem", "position": 2, "name": "Study Time Calculator", "item": "https://lifetrackpro.in/calculator" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does this study time and learning efficiency calculator measure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator measures your total monthly study hours based on your daily study goal and weekly study days. It then quantifies the focus time lost to context-switching across multiple fragmented apps (estimated at 18% based on HCI research) and projects how much deep study time, exam practice questions, and flashcard concepts you reclaim by unifying your routine."
            }
          },
          {
            "@type": "Question",
            "name": "How does the calculator calculate reclaimed study hours?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "First, it computes your monthly baseline: Daily Study Hours × Study Days Per Week × 4.3 weeks per month. Next, it applies an 18% efficiency factor representing the cognitive overhead and task-switching friction eliminated when your Pomodoro timer, flashcards, and habits reside in a single focused Study OS."
            }
          },
          {
            "@type": "Question",
            "name": "How are extra practice MCQs and mastered cards estimated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator estimates extra MCQs at 25 practice questions per reclaimed focus hour. Concepts and flashcards mastered are tailored by exam preset: NEET Medical (65 cards/hr for NCERT biology), IIT JEE (45 cards/hr for formulas and derivations), UPSC (40 cards/hr for articles and data points), and University/Tech (30 cards/hr for coding coursework)."
            }
          },
          {
            "@type": "Question",
            "name": "How many hours should I study daily for exams like JEE, NEET, and UPSC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Competitive exam benchmarks typically recommend 8 to 9 hours of structured, distraction-free study per day across 6 to 7 days per week. However, learning efficiency and active recall matter more than raw seat time; 6 hours of deep Pomodoro focus routinely outperforms 10 hours of passive, distracted reading."
            }
          },
          {
            "@type": "Question",
            "name": "Why is context-switching between separate apps harmful to revision schedules?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Human-computer interaction studies from UC Irvine show that returning to original deep focus after a digital task switch takes an average of 23 minutes. Switching between a separate timer app, note app, flashcard app, and chat groups fractures attention and creates constant micro-distractions that degrade retention."
            }
          },
          {
            "@type": "Question",
            "name": "Is the LifeTrack Pro study calculator free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, this interactive study time and efficiency calculator is 100% free with no login or account required. You can adjust presets and sliders anytime to plan and evaluate your revision schedule."
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
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Study Time Calculator</span>
          </nav>

          <div className="section-eyebrow">Study Planning &amp; Productivity Science</div>
          <h1 className="subpage-h1">Study Time &amp; Learning Efficiency Calculator for Students</h1>
          
          <p className="subpage-lead">
            Measuring raw seat time often gives a misleading impression of academic progress. Between scattered apps, notification breaks, and context-switching overhead, students lose up to 18% of productive study capacity. Use this interactive study planning calculator to calculate your monthly study hours, quantify reclaimed deep focus, and optimize your revision schedule.
          </p>

          {/* Interactive ROI Calculator Widget */}
          <section aria-label="Interactive Study Time and Efficiency Calculator">
            <RoiCalculator />
          </section>

          {/* How the Calculations Work Section */}
          <div className="content-card reveal" style={{ marginTop: '24px' }}>
            <h2 className="content-card-h2">
              How Does This Study Calculator Work?
            </h2>
            <p className="content-card-p">
              The calculator provides a data-driven projection of your study routine based on your daily targets, weekly frequency, and specific exam requirements. Here is how each calculation is derived from the interactive inputs:
            </p>
            <ul className="content-card-list">
              <li>
                ✓ <strong>Monthly Study Baseline:</strong> Calculated as <code>Daily Study Hours × Study Days Per Week × 4.3 Weeks/Month</code>. This represents your intended gross study volume over an average calendar month.
              </li>
              <li>
                ✓ <strong>Reclaimed Focus Time (18% Efficiency Factor):</strong> Grounded in human-computer interaction research (such as UC Irvine studies on task fragmentation), which indicates that students lose ~18% of their cognitive capacity switching between disparate single-purpose apps. Unifying your focus timer, spaced repetition cards, and habit streaks inside LifeTrack Pro eliminates this friction.
              </li>
              <li>
                ✓ <strong>Concepts &amp; Flashcards Mastered:</strong> Calculated by multiplying your reclaimed focus hours by the active exam preset&apos;s learning ratio:
                <ul style={{ marginTop: '6px', paddingLeft: '18px', listStyleType: 'disc' }}>
                  <li><strong>NEET Medical:</strong> 65 concepts/hr (NCERT Biology keywords, anatomical diagrams, organic reaction pathways).</li>
                  <li><strong>IIT JEE Prep:</strong> 45 concepts/hr (Physics derivations, Calculus formulas, coordinate geometry identities).</li>
                  <li><strong>UPSC Civil Services:</strong> 40 concepts/hr (Constitutional articles, landmark judgements, economic indicators).</li>
                  <li><strong>University / Tech:</strong> 30 concepts/hr (Algorithm patterns, syntax, system design concepts).</li>
                </ul>
              </li>
              <li>
                ✓ <strong>Extra Practice MCQs Solved:</strong> Estimated at <code>25 practice questions per reclaimed hour</code>. This mirrors standard competitive exam review conditions where 60 minutes of uninterrupted focus allows solving, checking, and analyzing 25 challenging multiple-choice questions.
              </li>
            </ul>
          </div>

          {/* The Science of Study Planning and Learning Efficiency */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              The Science of Study Planning: Why Deliberate Practice Outweighs Seat Time
            </h2>
            <p className="content-card-p">
              Top rankers in competitive examinations do not succeed merely by logging 14-hour marathon days; they succeed by maximizing <em>learning efficiency</em> and protecting uninterrupted flow state. Cognitive psychology research highlights three fundamental pillars of effective revision planning:
            </p>
            <ul className="content-card-list">
              <li>
                • <strong>Structured Time Chunking:</strong> Continuous analytical effort causes prefrontal cortex decision fatigue after 50 minutes. Using structured cadences—like the <Link href="/features/pomodoro-timer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Pomodoro Focus Timer</Link> with 25/5 or 50/10 intervals—maintains high cognitive acuity across long days.
              </li>
              <li>
                • <strong>Active Recall Over Passive Re-reading:</strong> Re-reading highlighted notes creates an &apos;illusion of competence.&apos; Reviewing concepts with the <Link href="/features/spaced-repetition" style={{ color: 'var(--primary)', fontWeight: 600 }}>SM-2 Spaced Repetition Algorithm</Link> forces synaptic retrieval right before forgetting occurs, locking facts into permanent long-term memory.
              </li>
              <li>
                • <strong>Loss Aversion &amp; Habit Momentum:</strong> Inconsistency is the primary cause of exam anxiety. Protecting non-negotiable daily revision with <Link href="/features/habit-tracker" style={{ color: 'var(--primary)', fontWeight: 600 }}>Daily Habit Streak Shields</Link> ensures that unexpected emergencies or rest days do not derail weeks of discipline.
              </li>
            </ul>
          </div>

          {/* Exam-Specific Study Planning & Revision Schedules */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Exam-Specific Study Planning &amp; Revision Schedules
            </h2>
            <p className="content-card-p">
              Different competitive exams demand distinctly tailored study routines. Explore dedicated frameworks built for your target examination:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginTop: '14px' }}>
              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <TargetIcon size={16} />
                  <span>IIT JEE Study Routine</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: '10px' }}>
                  Plan 90-minute numerical problem-solving blocks, track Physics HC Verma and Calculus formula flashcards, and simulate real exam conditions.
                </p>
                <Link href="/exams/jee" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>
                  View IIT JEE Study Tracker →
                </Link>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <CardsIcon size={16} />
                  <span>NEET Medical Timetable</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: '10px' }}>
                  Optimize daily NCERT Biology line-by-line active recall, review Organic Chemistry reaction mechanisms, and track high-yield botanical flashcards.
                </p>
                <Link href="/exams/neet" style={{ color: 'var(--emerald)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>
                  View NEET Routine Planner →
                </Link>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--amber)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <TimerIcon size={16} />
                  <span>UPSC Civil Services Schedule</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: '10px' }}>
                  Structure 8-hour daily preparation across GS Papers 1–4, schedule timed Mains answer writing sprints, and retain Constitutional articles.
                </p>
                <Link href="/exams/upsc" style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>
                  View UPSC Focus Hub →
                </Link>
              </div>
            </div>
          </div>

          {/* Integrated Study OS Section */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Unify Your Entire Learning Workflow Inside LifeTrack Pro
            </h2>
            <p className="content-card-p">
              The hours you calculate above are reclaimed by replacing scattered apps with a unified Study OS designed specifically for high-stakes academic preparation:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '12px' }}>
              <Link href="/features/pomodoro-timer" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TimerIcon size={15} /> Pomodoro Timer
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Customizable 25/5 and 50/10 focus intervals with acoustic soundscapes and zero ads.
                  </p>
                </div>
              </Link>

              <Link href="/features/spaced-repetition" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CardsIcon size={15} /> SM-2 Flashcards
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Automated active recall queues scheduled scientifically before forgetting occurs.
                  </p>
                </div>
              </Link>

              <Link href="/features/habit-tracker" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <HabitFlameIcon size={15} /> Habit Streak Shields
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Protect daily study consistency with loss-aversion streak freeze shields.
                  </p>
                </div>
              </Link>

              <Link href="/features/study-rooms" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sky)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <HeadphonesIcon size={15} /> Silent Study Rooms
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Experience quiet body doubling and synchronized Pomodoro intervals without video fatigue.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Frequently Asked Questions About Study Time Calculation &amp; Planning
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  What does this study time and learning efficiency calculator measure?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  The calculator measures your total monthly study hours based on your daily study goal and weekly study days. It then quantifies the focus time lost to context-switching across multiple fragmented apps (estimated at 18% based on HCI research) and projects how much deep study time, exam practice questions, and flashcard concepts you reclaim by unifying your routine.
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  How does the calculator calculate reclaimed study hours?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  First, it computes your monthly baseline: <code>Daily Study Hours × Study Days Per Week × 4.3 weeks per month</code>. Next, it applies an 18% efficiency factor representing the cognitive overhead and task-switching friction eliminated when your Pomodoro timer, flashcards, and habits reside in a single focused Study OS.
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  How are extra practice MCQs and mastered cards estimated?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  The calculator estimates extra MCQs at 25 practice questions per reclaimed focus hour. Concepts and flashcards mastered are tailored by exam preset: NEET Medical (65 cards/hr for NCERT biology), IIT JEE (45 cards/hr for formulas and derivations), UPSC (40 cards/hr for articles and data points), and University/Tech (30 cards/hr for coding coursework).
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  How many hours should I study daily for exams like JEE, NEET, and UPSC?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  Competitive exam benchmarks typically recommend 8 to 9 hours of structured, distraction-free study per day across 6 to 7 days per week. However, learning efficiency and active recall matter more than raw seat time; 6 hours of deep Pomodoro focus routinely outperforms 10 hours of passive, distracted reading.
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  Why is context-switching between separate apps harmful to revision schedules?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  Human-computer interaction studies from UC Irvine show that returning to original deep focus after a digital task switch takes an average of 23 minutes. Switching between a separate timer app, note app, flashcard app, and chat groups fractures attention and creates constant micro-distractions that degrade retention.
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  Is the LifeTrack Pro study calculator free to use?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  Yes, this interactive study time and efficiency calculator is 100% free with no login or account required. You can adjust presets and sliders anytime to plan and evaluate your revision schedule.
                </p>
              </div>
            </div>
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
            <Link href="/features/pomodoro-timer" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <TimerIcon size={16} />
              <span>Try Pomodoro Focus Timer</span>
            </Link>
            <Link href="/faq" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircleIcon size={16} />
              <span>Student FAQ</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
