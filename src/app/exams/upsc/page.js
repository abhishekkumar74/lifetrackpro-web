import Link from 'next/link';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { 
  TimerIcon, 
  CardsIcon, 
  CalculatorIcon, 
  SparklesIcon,
  TargetIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import dynamic from 'next/dynamic';

const InteractiveUpscTimer = dynamic(() => import('@/components/InteractiveUpscTimer'), {
  loading: () => <div style={{ minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '13px' }}>Loading UPSC Answer Writing Simulator...</div>,
});

const UPSC_FAQS = [
  {
    question: "Why is timing daily Mains answer writing critical for UPSC CSE?",
    answer: "In UPSC Mains General Studies papers (GS 1 to 4), candidates must complete 20 subjective questions within 180 minutes. This leaves roughly 7 minutes for each 10-marker (150 words) and 11 minutes for each 15-marker (250 words). Without disciplined time management during daily practice, candidates risk leaving high-scoring questions unattempted."
  },
  {
    question: "How does spaced repetition assist in UPSC Prelims and Mains preparation?",
    answer: "The UPSC syllabus requires retaining dense factual information, including Constitutional Articles, statutory provisions, landmark Supreme Court cases, international treaties, and environmental conventions. LifeTrack Pro's SM-2 spaced repetition schedules review right before memory decay occurs, ensuring high-accuracy recall without endless textbook re-reading."
  },
  {
    question: "Does LifeTrack Pro provide study materials or act as a productivity tool?",
    answer: "LifeTrack Pro is a specialized study productivity and time-management operating system. It provides focus timers, answer writing stopwatches, flashcard recall algorithms, habit trackers, and virtual study rooms to help aspirants execute their preparation with consistency."
  },
  {
    question: "Can I use the timer and flashcards offline without internet access?",
    answer: "Yes. LifeTrack Pro uses an offline-first architecture. Timers, custom flashcards, and daily habit logs run locally on your device without requiring an active internet connection."
  }
];

export const metadata = {
  title: {
    absolute: 'UPSC Answer Writing Timer & Study App | LifeTrack Pro',
  },
  description: 'Master GS Mains speed with a UPSC answer writing timer for 7 and 11-minute answers. Track syllabus coverage and review Polity flashcards. Try it free now.',
  alternates: {
    canonical: 'https://lifetrackpro.in/exams/upsc',
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
    title: 'UPSC Answer Writing Timer & Study App | LifeTrack Pro',
    description: 'Master GS Mains speed with a UPSC answer writing timer for 7 and 11-minute answers. Track syllabus coverage and review Polity flashcards. Try it free now.',
    url: 'https://lifetrackpro.in/exams/upsc',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-exams.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro UPSC CSE Study Planner and Mains Answer Writing Timer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPSC Answer Writing Timer & Study App | LifeTrack Pro',
    description: 'Master GS Mains speed with a UPSC answer writing timer for 7 and 11-minute answers. Track syllabus coverage and review Polity flashcards. Try it free now.',
    images: ['https://lifetrackpro.in/og/og-exams.png'],
    creator: '@LifeTrackPro',
  },
};

export default function UpscExamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "@id": "https://lifetrackpro.in/#app",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/exams/upsc",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/exams/upsc#webpage",
        "url": "https://lifetrackpro.in/exams/upsc",
        "name": "UPSC Study Planner & Mains Timer",
        "description": "Productivity operating system for UPSC Civil Services Examination aspirants featuring Mains answer writing timers, SM-2 flashcard recall, and habit tracking.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "url": "https://lifetrackpro.in",
          "name": "LifeTrack Pro"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://lifetrackpro.in/exams/upsc#breadcrumbs",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in" },
          { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://lifetrackpro.in/features" },
          { "@type": "ListItem", "position": 3, "name": "UPSC CSE Prep", "item": "https://lifetrackpro.in/exams/upsc" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": UPSC_FAQS.map((faq) => ({
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
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>UPSC CSE Prep</span>
          </nav>

          <div className="section-eyebrow">Civil Services Examination OS</div>
          <h1 className="subpage-h1">UPSC Answer Writing Timer &amp; Mains Prep System</h1>
          
          <p className="subpage-lead">
            A strict upsc answer writing timer is essential to master the GS Mains 180-minute writing challenge. LifeTrack Pro provides the specialized productivity tools needed to practice 7 and 11-minute daily answer writing, retain constitutional articles, and sustain long study hours.
          </p>

          {/* Interactive UPSC Answer Writing Stopwatch */}
          <InteractiveUpscTimer />

          {/* The Answer Writing Challenge */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              The Mains Challenge: Writing 20 Answers in 180 Minutes
            </h2>
            <p className="content-card-p">
              Knowledge alone is not sufficient to clear UPSC Mains. Each General Studies paper (GS 1, GS 2, GS 3, and GS 4) presents 20 questions that must be addressed within a strict 3-hour window. This arithmetic requires disciplined pacing:
            </p>
            <ul className="content-card-list">
              <li>• <strong>10-Marker Questions (~150 words):</strong> Maximum <strong>7 minutes</strong> per answer. Requires 60 seconds to deconstruct the prompt directives, followed by 5–6 concise analytical points and a structured conclusion.</li>
              <li>• <strong>15-Marker Questions (~250 words):</strong> Maximum <strong>11 minutes</strong> per answer. Demands multi-dimensional subheadings, data points, schematic diagrams, and constitutional or policy citations.</li>
              <li>• <strong>Ethics Case Studies (GS 4):</strong> Maximum <strong>15 minutes</strong> per case study. Involves identifying stakeholders, delineating ethical dilemmas, evaluating options, and proposing an actionable solution.</li>
            </ul>
            <p className="content-card-p" style={{ marginTop: '10px' }}>
              Practicing daily with strict countdown boundaries trains your cognitive speed, preventing the common trap of spending 15 minutes on early questions and leaving subsequent questions incomplete.
            </p>
          </div>

          {/* Core Tools for UPSC Prep */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              How LifeTrack Pro Supports UPSC Preparation
            </h2>
            <p className="content-card-p">
              LifeTrack Pro brings scientific study techniques directly into your daily preparation routine:
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>Dedicated Mains Answer Writing Timer:</strong> Practice 10-markers, 15-markers, and Ethics cases with instant visual pacing indicators.</li>
              <li>✓ <strong>SM-2 Spaced Repetition for Prelims &amp; Mains:</strong> Retain high-yield Constitutional Articles, landmark Supreme Court cases, Ramsar wetlands, and historical timelines using automated review schedules on our <Link href="/features/spaced-repetition" style={{ color: 'var(--primary)', fontWeight: 600 }}>spaced repetition engine</Link>.</li>
              <li>✓ <strong>Deep Work Pomodoro Intervals:</strong> Power through 8 to 10 hours of daily General Studies reading and Optional subjects with custom 50/10 focus blocks on our <Link href="/features/pomodoro-timer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Pomodoro timer</Link>.</li>
              <li>✓ <strong>Habit Streak Shields:</strong> Maintain unbroken daily study habits across long preparation months, protected by automated streak freeze shields on our <Link href="/features/habit-tracker" style={{ color: 'var(--primary)', fontWeight: 600 }}>habit tracker</Link>.</li>
              <li>✓ <strong>Virtual Study Rooms:</strong> Study alongside dedicated civil services aspirants across India in silent <Link href="/features/study-rooms" style={{ color: 'var(--primary)', fontWeight: 600 }}>24/7 virtual study rooms</Link> that recreate reading-room accountability.</li>
            </ul>
          </div>

          {/* Time Management Comparison */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">Preparation Strategy: Unstructured vs. LifeTrack Pro OS</h2>
            <div className="table-responsive-wrapper">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', marginTop: '12px' }} aria-label="UPSC Preparation Strategy Comparison">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-mid)', textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px', color: 'var(--text-1)' }}>Preparation Dimension</th>
                    <th style={{ padding: '8px 12px', color: 'var(--text-3)' }}>Unstructured Routine</th>
                    <th style={{ padding: '8px 12px', color: 'var(--primary)', fontWeight: 750 }}>LifeTrack Pro OS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Mains Answer Practice</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-3)' }}>Untimed writing; takes 20+ mins per answer</td>
                    <td style={{ padding: '10px 12px', color: 'var(--primary)', fontWeight: 600 }}>Strict 7m &amp; 11m stopwatches</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Fact &amp; Article Retention</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-3)' }}>Passive re-reading; forgotten in weeks</td>
                    <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 600 }}>SM-2 spaced review before forgetting</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Daily Focus Consistency</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-3)' }}>Frequent interruptions &amp; phone checks</td>
                    <td style={{ padding: '10px 12px', color: 'var(--primary)', fontWeight: 600 }}>50/10 Pomodoro blocks with ambient audio</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Accountability &amp; Discipline</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-3)' }}>Isolated preparation leading to demotivation</td>
                    <td style={{ padding: '10px 12px', color: 'var(--primary)', fontWeight: 600 }}>Multiplayer study rooms &amp; streak shields</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Data Safety &amp; Offline Use</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-3)' }}>Dependent on continuous internet connectivity</td>
                    <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 600 }}>100% offline local data storage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Connected Ecosystem & Other Exams */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Connected Productivity Ecosystem
            </h2>
            <p className="content-card-p">
              Explore other specialized study tools and preparation pathways built into LifeTrack Pro:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <Link href="/features/pomodoro-timer" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TimerIcon size={15} /> Pomodoro Timer
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Execute distraction-free 50/10 study blocks for General Studies and Optional subjects.
                  </p>
                </div>
              </Link>

              <Link href="/features/spaced-repetition" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CardsIcon size={15} /> Spaced Repetition
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Retain Constitutional Articles, case laws, and environmental treaties permanently.
                  </p>
                </div>
              </Link>

              <Link href="/calculator" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sky)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CalculatorIcon size={15} /> Study ROI Calculator
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Estimate hours saved annually through structured active recall and deep work blocks.
                  </p>
                </div>
              </Link>

              <Link href="/exams/jee" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9333EA', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TargetIcon size={15} /> IIT JEE Study Planner
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Explore our formula recall and numerical problem-solving system for engineering aspirants.
                  </p>
                </div>
              </Link>

              <Link href="/exams/neet" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TargetIcon size={15} /> NEET Biology Planner
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    See our NCERT line-by-line active recall framework designed for medical aspirants.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <section className="reveal reveal-delay-1" aria-label="Frequently Asked Questions">
            <FaqAccordion
              title="Frequently Asked Questions About UPSC CSE Preparation"
              items={UPSC_FAQS}
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
              <Link href="/calculator" className="tools-cta-secondary-btn" aria-label="Calculate Focus Hours">
                <CalculatorIcon size={16} />
                <span>Calculate Focus Hours</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
