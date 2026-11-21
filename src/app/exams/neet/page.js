import Link from 'next/link';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import dynamic from 'next/dynamic';

const InteractiveNeetPlanner = dynamic(() => import('@/components/InteractiveNeetPlanner'), {
  loading: () => <div style={{ minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '13px' }}>Loading NEET Planner Simulator...</div>,
});

const NEET_FAQS = [
  {
    question: "How does SM-2 spaced repetition help with NCERT Biology revision?",
    answer: "NEET Biology requires memorizing thousands of factual details, examples, and diagram labels. The SM-2 algorithm calculates personalized review intervals based on how easily you recall each card. Difficult concepts appear frequently, while mastered topics graduate to multi-week intervals, preventing memory decay before exam day."
  },
  {
    question: "What is the best Pomodoro study block duration for NEET Physics problems?",
    answer: "A 50-minute focus block followed by a 10-minute break is generally optimal for NEET Physics. Multi-step numerical problems in Mechanics, Thermodynamics, and Electrodynamics require 10 to 15 minutes of context loading in working memory, making 50-minute sprints far more effective than 25-minute intervals."
  },
  {
    question: "How do streak freeze shields help during intense NEET test series?",
    answer: "During full-syllabus mock test days or unexpected illness, students often struggle to complete standard daily checklists. A streak freeze shield automatically preserves your hard-earned consistency streak without resetting your progress badge to zero."
  },
  {
    question: "Can I use LifeTrack Pro offline during hostel or coaching hours?",
    answer: "Yes. LifeTrack Pro is built with an offline-first architecture. Your daily habit checklists, flashcard queues, and Pomodoro logs are stored securely on your local device without requiring an active internet connection."
  }
];

export const metadata = {
  title: {
    absolute: 'NEET Study Timetable & NCERT Flashcards | LifeTrack Pro',
  },
  description: 'Master NCERT Biology line-by-line with a NEET study timetable. Schedule 50-minute Physics sprints, active recall decks & habit streaks. Plan your prep free.',
  alternates: {
    canonical: 'https://lifetrackpro.in/exams/neet',
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
    title: 'NEET Study Timetable & NCERT Flashcards | LifeTrack Pro',
    description: 'Master NCERT Biology line-by-line with a NEET study timetable. Schedule 50-minute Physics sprints, active recall decks & habit streaks. Plan your prep free.',
    url: 'https://lifetrackpro.in/exams/neet',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-exams.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro NEET Study Timetable and NCERT Revision System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Study Timetable & NCERT Flashcards | LifeTrack Pro',
    description: 'Master NCERT Biology line-by-line with a NEET study timetable. Schedule 50-minute Physics sprints, active recall decks & habit streaks. Plan your prep free.',
    images: ['https://lifetrackpro.in/og/og-exams.png'],
    creator: '@LifeTrackPro',
  },
};

export default function NeetExamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "@id": "https://lifetrackpro.in/#app",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/exams/neet",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/exams/neet#webpage",
        "url": "https://lifetrackpro.in/exams/neet",
        "name": "NEET Study Tracker & NCERT Flashcards",
        "description": "Comprehensive NEET study and revision planner combining SM-2 spaced repetition flashcards, 50-minute deep work blocks, and habit streaks.",
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
          { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://lifetrackpro.in/features" },
          { "@type": "ListItem", "position": 3, "name": "NEET Study Tracker", "item": "https://lifetrackpro.in/exams/neet" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": NEET_FAQS.map((faq) => ({
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
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>NEET Prep Tracker</span>
          </nav>

          <div className="section-eyebrow">Medical Aspirants &amp; NCERT Mastery</div>
          <h1 className="subpage-h1">NEET Study Timetable &amp; NCERT Revision System</h1>
          
          <p className="subpage-lead">
            Master your syllabus with a structured NEET study timetable. With over two million candidates competing for medical seats, success in NEET requires systematic consistency rather than unfocused cramming. LifeTrack Pro unifies active recall flashcards, timed problem-solving blocks, and daily habit streaks into a single disciplined routine.
          </p>

          {/* Interactive NEET Timetable & NCERT Tracker */}
          <InteractiveNeetPlanner />

          {/* How LifeTrack Pro Powers NEET Preparation */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              How LifeTrack Pro Powers Your Daily NEET Preparation
            </h2>
            <p className="content-card-p">
              The vast majority of NEET Biology questions test precise NCERT details, while Physics and Physical Chemistry demand rapid numerical accuracy. LifeTrack Pro organizes your daily prep through four interconnected pillars:
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>Morning NCERT Active Recall:</strong> Review high-yield Biology concepts (Morphology, Genetics, Biotechnology, Plant Physiology) with <Link href="/features/spaced-repetition" style={{ color: 'var(--primary)', fontWeight: 600 }}>SM-2 spaced repetition flashcards</Link> that schedule reviews right before memory decay.</li>
              <li>✓ <strong>50-Minute Numerical Sprints:</strong> Solve 40 to 50 Physics and Physical Chemistry MCQs in distraction-free intervals using the <Link href="/features/pomodoro-timer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Pomodoro Focus Timer</Link> with ambient soundscapes.</li>
              <li>✓ <strong>Non-Negotiable Habit Streaks:</strong> Track daily commitments like &apos;Review Mock Errors&apos; and &apos;Daily Organic Reactions&apos; with <Link href="/features/habit-tracker" style={{ color: 'var(--primary)', fontWeight: 600 }}>Streak Freeze Shields</Link> protecting your consistency badge.</li>
              <li>✓ <strong>Silent Peer Accountability:</strong> Study alongside fellow aspirants in camera-free, distraction-free <Link href="/features/study-rooms" style={{ color: 'var(--primary)', fontWeight: 600 }}>24/7 Virtual Study Rooms</Link>.</li>
              <li>✓ <strong>Offline-First Architecture:</strong> Review cards and time sprints without needing active Wi-Fi in classrooms or library basements.</li>
            </ul>
          </div>

          {/* Overcoming the Revision Trap */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Overcoming the NEET Revision Trap with Active Recall
            </h2>
            <p className="content-card-p">
              Rereading textbook chapters multiple times creates an illusion of competence—it feels easy because the text is familiar, but retrieval strength remains low during actual exam conditions.
            </p>
            <p className="content-card-p">
              Active recall forces your brain to retrieve answers from memory. When paired with the expanding intervals of the SM-2 based algorithm (1 day, 6 days, 15 days, 38 days, 95 days), factual retention across Botany, Zoology, and Chemistry becomes durable and test-ready.
            </p>
          </div>

          {/* Daily Routine Architecture */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Structuring Your Daily NEET Study Blocks: 50/10 Focus &amp; Evening Recall
            </h2>
            <p className="content-card-p">
              High-performing aspirants structure their days into dedicated energy-matched blocks:
            </p>
            <ul className="content-card-list">
              <li>• <strong>Slot 1 (Morning Alertness):</strong> Biology NCERT line-by-line active recall queue to capitalize on fresh cognitive reserves.</li>
              <li>• <strong>Slot 2 (High Analytical Energy):</strong> Physics numerical problem sprint—four 50-minute Pomodoro blocks with 10-minute active recovery breaks.</li>
              <li>• <strong>Slot 3 (Afternoon Chemistry):</strong> Organic reaction mechanisms, inorganic memory cards, and physical chemistry problem practice.</li>
              <li>• <strong>Slot 4 (Evening Mock Review):</strong> Analyzing incorrect answers and logging difficult concepts into your personal flashcard deck.</li>
            </ul>
          </div>

          {/* Other Exam Frameworks (Internal Linking) */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Explore Other Competitive Exam Study Systems
            </h2>
            <p className="content-card-p">
              LifeTrack Pro also provides specialized study frameworks for other competitive national exams:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
              <Link href="/exams/jee" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    IIT JEE Main &amp; Advanced
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    90-minute exam simulation blocks, Physics and Mathematics formula flashcard queues, and ranker focus lounges.
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

          {/* Frequently Asked Questions */}
          <section className="reveal reveal-delay-1" aria-label="Frequently Asked Questions">
            <FaqAccordion
              title="Frequently Asked Questions About NEET Preparation"
              items={NEET_FAQS}
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
