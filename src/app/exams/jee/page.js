import Link from 'next/link';
import dynamic from 'next/dynamic';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

const InteractiveJeePlanner = dynamic(() => import('@/components/InteractiveJeePlanner'), {
  loading: () => <div style={{ minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '13px' }}>Loading JEE Planner Simulator...</div>,
});

const JEE_FAQS = [
  {
    question: "How does SM-2 spaced repetition help with JEE formulas?",
    answer: "JEE Physics and Mathematics require instant recall of complex derivations, coordinate geometry identities, and calculus limits. The SM-2 algorithm dynamically calculates review intervals, showing tricky formulas right before you forget them, ensuring lightning-fast recall during exam conditions."
  },
  {
    question: "Why are 90-minute focus blocks recommended for JEE Advanced?",
    answer: "JEE Advanced problems frequently blend multiple concepts (such as rotational dynamics combined with electromagnetic induction). Solving multi-step numericals requires 15 minutes simply to build working context. A 90-minute ultradian sprint allows uninterrupted depth, matching official exam session stamina."
  },
  {
    question: "How do streak freeze shields protect consistency during mock test weeks?",
    answer: "On days when you complete a grueling 6-hour full-length mock test, completing regular daily checklists can feel overwhelming. Arming a streak freeze shield absorbs the rest day and keeps your multi-week consistency streak badge active."
  },
  {
    question: "Does LifeTrack Pro work offline in hostels or coaching libraries?",
    answer: "Yes. LifeTrack Pro is built offline-first. All flashcard reviews, Pomodoro timer sessions, and habit checks are logged locally on your smartphone with zero internet lag."
  }
];

export const metadata = {
  title: {
    absolute: 'IIT JEE Study Planner & Formula Recall | LifeTrack Pro',
  },
  description: 'Structure your preparation with a dedicated JEE study planner. Combine 90-minute exam blocks, SM-2 formula flashcards & daily streaks. Start planning today.',
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
    title: 'IIT JEE Study Planner & Formula Recall | LifeTrack Pro',
    description: 'Structure your preparation with a dedicated JEE study planner. Combine 90-minute exam blocks, SM-2 formula flashcards & daily streaks. Start planning today.',
    url: 'https://lifetrackpro.in/exams/jee',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-exams.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro IIT JEE Study Planner and Formula Recall System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IIT JEE Study Planner & Formula Recall | LifeTrack Pro',
    description: 'Structure your preparation with a dedicated JEE study planner. Combine 90-minute exam blocks, SM-2 formula flashcards & daily streaks. Start planning today.',
    images: ['https://lifetrackpro.in/og/og-exams.png'],
    creator: '@LifeTrackPro',
  },
};

export default function JeeExamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "@id": "https://lifetrackpro.in/#app",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/exams/jee",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/exams/jee#webpage",
        "url": "https://lifetrackpro.in/exams/jee",
        "name": "IIT JEE Study Planner & Formula Recall",
        "description": "Comprehensive IIT JEE study and revision planner integrating 90-minute exam simulation blocks, SM-2 formula flashcards, and habit streaks.",
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
          { "@type": "ListItem", "position": 3, "name": "JEE Study Planner", "item": "https://lifetrackpro.in/exams/jee" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": JEE_FAQS.map((faq) => ({
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
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>JEE Study Planner</span>
          </nav>

          <div className="section-eyebrow">Engineering Aspirants &amp; Problem Solving</div>
          <h1 className="subpage-h1">IIT JEE Study Planner &amp; Formula Revision System</h1>
          
          <p className="subpage-lead">
            Structure your engineering preparation with a dedicated JEE study planner. Clearing JEE Main and Advanced requires exceptional mathematical stamina and immediate formula recall under pressure. LifeTrack Pro replaces fragmented study tools with a disciplined, unified system built for rigorous problem solving.
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
              <li>✓ <strong>50 &amp; 90-Minute Focus Blocks:</strong> Solve multi-step numericals without distraction using the <Link href="/features/pomodoro-timer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Pomodoro Focus Timer</Link> with focus soundscapes and rain ambient audio.</li>
              <li>✓ <strong>Daily Non-Negotiable Streaks:</strong> Track habits like &apos;Solve 40 Advanced MCQs&apos; and &apos;Analyze Mock Mistakes&apos; with <Link href="/features/habit-tracker" style={{ color: 'var(--primary)', fontWeight: 600 }}>Streak Freeze Shields</Link> protecting your streak badge.</li>
              <li>✓ <strong>Silent Focus Lounges:</strong> Study alongside fellow engineering aspirants in camera-free, distraction-free <Link href="/features/study-rooms" style={{ color: 'var(--primary)', fontWeight: 600 }}>24/7 Virtual Study Rooms</Link>.</li>
              <li>✓ <strong>Offline-First Reliability:</strong> Solve problem sheets and review formulas anywhere with local-first storage and automatic cloud backup.</li>
            </ul>
          </div>

          {/* Tackling Multi-Concept Problems */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Tackling Multi-Concept Problems with Calibrated Focus Blocks
            </h2>
            <p className="content-card-p">
              Standard 25-minute study intervals are often too brief for rigorous engineering problem solving. When complex numericals merge rotational dynamics with electromagnetic induction, students require 10 to 15 minutes simply to construct the mental model.
            </p>
            <p className="content-card-p">
              {/* TODO: Verify exact JEE Main shift timings with latest NTA information bulletin */}
              <strong>JEE Main (NTA Shifts):</strong> LifeTrack Pro conditions your biological clock to the official 3-hour NTA exam shifts (Shift 1: 9:00 AM – 12:00 PM and Shift 2: 3:00 PM – 6:00 PM) with calibrated 90-minute simulation blocks so mental stamina peaks during actual testing windows.
            </p>
            <p className="content-card-p">
              {/* TODO-verify: Confirm exact JEE Advanced 2026 Paper 1 and Paper 2 shift schedule with organizing IIT information brochure */}
              <strong>JEE Advanced (IIT Schedule):</strong> For JEE Advanced aspirants, simulate Paper 1 and Paper 2 shift schedules as per the organizing IIT brochure to build exam endurance without cognitive burnout.
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
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

          {/* Frequently Asked Questions */}
          <section className="reveal reveal-delay-1" aria-label="Frequently Asked Questions">
            <FaqAccordion
              title="Frequently Asked Questions About IIT JEE Preparation"
              items={JEE_FAQS}
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
