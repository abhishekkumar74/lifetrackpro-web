import Link from 'next/link';
import { 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import InteractiveJeePlanner from '@/components/InteractiveJeePlanner';

export const metadata = {
  title: 'IIT JEE Study Planner, Formula Recall & Pomodoro Routine',
  description: 'Master JEE Main & Advanced problem solving with LifeTrack Pro. Use 50-minute and 90-minute Pomodoro blocks, SM-2 formula flashcards, and daily habit streaks.',
  keywords: [
    'JEE study tracker',
    'JEE main study planner',
    'JEE advanced pomodoro timer',
    'JEE physics formula flashcards',
    'IIT JEE revision schedule',
    'math formula recall app',
    'jee mock error tracker',
    'lifetrack pro jee'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/exams/jee',
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
    title: 'IIT JEE Study Planner, Formula Recall & Pomodoro Routine | LifeTrack Pro',
    description: 'Plan your daily JEE Main & Advanced preparation with LifeTrack Pro: 90-minute exam simulation blocks, SM-2 formula flashcards, and habit streak shields.',
    url: 'https://lifetrackpro.in/exams/jee',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro IIT JEE Study Planner and Formula Recall System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IIT JEE Study Planner & Formula Recall | LifeTrack Pro',
    description: 'Structure your daily JEE Main & Advanced revision with 90-minute simulation blocks and SM-2 formula recall.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function JeeExamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/exams/jee#webpage",
        "url": "https://lifetrackpro.in/exams/jee",
        "name": "IIT JEE Study Planner, Formula Recall & Pomodoro Routine",
        "description": "Comprehensive IIT JEE study and revision planner integrating 90-minute exam simulation blocks, SM-2 formula flashcards, and habit streaks.",
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
          { "@type": "ListItem", "position": 3, "name": "JEE Study Planner", "item": "https://lifetrackpro.in/exams/jee" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does SM-2 spaced repetition help with JEE formulas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "JEE Physics and Mathematics require instant recall of complex derivations, coordinate geometry identities, and calculus limits. The SM-2 algorithm dynamically calculates review intervals, showing tricky formulas right before you forget them, ensuring lightning-fast recall during exam conditions."
            }
          },
          {
            "@type": "Question",
            "name": "Why are 90-minute focus blocks recommended for JEE Advanced?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "JEE Advanced problems frequently blend multiple concepts (such as rotational dynamics combined with electromagnetic induction). Solving multi-step numericals requires 15 minutes simply to build working context. A 90-minute ultradian sprint allows uninterrupted depth, matching official exam session stamina."
            }
          },
          {
            "@type": "Question",
            "name": "How do streak freeze shields protect consistency during mock test weeks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "On days when you complete a grueling 6-hour full-length mock test, completing regular daily checklists can feel overwhelming. Arming a streak freeze shield absorbs the rest day and keeps your multi-week consistency streak badge active."
            }
          },
          {
            "@type": "Question",
            "name": "Does LifeTrack Pro work offline in hostels or coaching libraries?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. LifeTrack Pro is built offline-first. All flashcard reviews, Pomodoro timer sessions, and habit checks are logged locally on your smartphone with zero internet lag."
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
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>JEE Study Planner</span>
          </nav>

          <div className="section-eyebrow">Engineering Aspirants &amp; Problem Solving</div>
          <h1 className="subpage-h1">IIT JEE Study Planner: Master Complex Problem Solving &amp; Formula Recall</h1>
          
          <p className="subpage-lead">
            Clearing JEE Main and Advanced requires exceptional mathematical stamina and immediate formula recall under pressure. LifeTrack Pro replaces fragmented study tools with a disciplined, unified system built for rigorous problem solving.
          </p>

          {/* Interactive JEE Syllabus & Formula Tracker */}
          <InteractiveJeePlanner />

          {/* How LifeTrack Pro Supports JEE Preparation */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              How LifeTrack Pro Supports Daily JEE Main &amp; Advanced Preparation
            </h2>
            <p className="content-card-p">
              Success in JEE requires balancing deep concept building with rapid numerical accuracy across Physics, Chemistry, and Mathematics:
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>SM-2 Formula Spaced Recall:</strong> Keep complex calculus derivations, conic section equations, and organic named reaction mechanisms fresh using <Link href="/features/spaced-repetition" style={{ color: 'var(--primary)', fontWeight: 600 }}>SM-2 spaced repetition flashcards</Link>.</li>
              <li>✓ <strong>50 &amp; 90-Minute Focus Blocks:</strong> Solve multi-step numericals without distraction using the <Link href="/features/pomodoro-timer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Pomodoro Focus Timer</Link> with 432Hz alpha frequencies and rain soundscapes.</li>
              <li>✓ <strong>Daily Non-Negotiable Streaks:</strong> Track habits like &apos;Solve 40 Advanced MCQs&apos; and &apos;Analyze Mock Mistakes&apos; with <Link href="/features/habit-tracker" style={{ color: 'var(--primary)', fontWeight: 600 }}>Streak Freeze Shields</Link> protecting your streak badge.</li>
              <li>✓ <strong>Silent Focus Lounges:</strong> Study alongside fellow engineering aspirants in camera-free, distraction-free <Link href="/features/study-rooms" style={{ color: 'var(--primary)', fontWeight: 600 }}>24/7 Virtual Study Rooms</Link>.</li>
              <li>✓ <strong>100% Offline Capability:</strong> Solve problem sheets and review formulas anywhere without mobile data or Wi-Fi dependencies.</li>
            </ul>
          </div>

          {/* Tackling Multi-Concept Problems */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Tackling Multi-Concept Problems with Calibrated Focus Blocks
            </h2>
            <p className="content-card-p">
              Standard 25-minute study intervals are often too brief for JEE Advanced problems. When a question merges electromagnetic induction with rotational kinematics, students require 10 to 15 minutes simply to construct the mental model.
            </p>
            <p className="content-card-p">
              LifeTrack Pro allows you to select 50-minute deep sprints or full 90-minute simulation blocks. This conditions your biological clock to the official 3-hour NTA exam shifts (9:00 AM – 12:00 PM and 2:30 PM – 5:30 PM) so mental stamina peaks when it matters most.
            </p>
          </div>

          {/* SM-2 Formula Retention Protocol */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              The SM-2 Formula Retention Protocol for Physics &amp; Mathematics
            </h2>
            <p className="content-card-p">
              Students often lose marks in JEE not because they cannot solve the problem, but because they hesitate or misremember a specific trigonometric identity or physical constant.
            </p>
            <p className="content-card-p">
              Instead of passive page turning, LifeTrack Pro prompts you to actively recall formulas right before the forgetting curve sets in. Easy formulas graduate to multi-week review intervals, while tricky reaction pathways and coordinate geometry formulas appear daily until completely internalized.
            </p>
          </div>

          {/* Other Exam Frameworks (Internal Linking) */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Explore Other Competitive Exam Study Systems
            </h2>
            <p className="content-card-p">
              LifeTrack Pro also provides dedicated frameworks tailored for other competitive examinations:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '12px' }}>
              <Link href="/exams/neet" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    NEET UG &amp; PG Routine
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    NCERT line-by-line Biology flashcard recall, Organic reaction decks, and 50-minute Physics sprints.
                  </p>
                </div>
              </Link>

              <Link href="/exams/upsc" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--amber)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    UPSC Civil Services (CSE)
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Strict 7-min and 11-min Mains answer writing stopwatches, Constitutional Articles recall, and Prelims countdowns.
                  </p>
                </div>
              </Link>

              <Link href="/calculator" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sky)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CalculatorIcon size={15} /> Focus ROI Calculator
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Calculate how many hours of deep work you reclaim every month with LifeTrack Pro.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick FAQ blocks for Google SERP Snippets */}
          <div className="content-card-faq reveal reveal-delay-1">
            <h3 className="content-card-faq-h3">
              How does SM-2 spaced repetition help with JEE formulas?
            </h3>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              JEE Physics and Mathematics require instant recall of complex derivations, coordinate geometry identities, and calculus limits. The SM-2 algorithm dynamically calculates review intervals, showing tricky formulas right before you forget them, ensuring lightning-fast recall during exam conditions.
            </p>
          </div>

          <div className="content-card-faq reveal reveal-delay-1">
            <h3 className="content-card-faq-h3">
              Why are 90-minute focus blocks recommended for JEE Advanced?
            </h3>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              JEE Advanced problems frequently blend multiple concepts (such as rotational dynamics combined with electromagnetic induction). Solving multi-step numericals requires 15 minutes simply to build working context. A 90-minute ultradian sprint allows uninterrupted depth, matching official exam session stamina.
            </p>
          </div>

          <div className="content-card-faq reveal reveal-delay-1">
            <h3 className="content-card-faq-h3">
              How do streak freeze shields protect consistency during mock test weeks?
            </h3>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              On days when you complete a grueling 6-hour full-length mock test, completing regular daily checklists can feel overwhelming. Arming a streak freeze shield absorbs the rest day and keeps your multi-week consistency streak badge active.
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
