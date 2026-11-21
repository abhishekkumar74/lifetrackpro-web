import Link from 'next/link';
import FocusRoiCalculator from '@/components/tools/FocusRoiCalculator';
import RelatedAppFeatures from '@/components/tools/RelatedAppFeatures';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SparklesIcon, HelpCircleIcon } from '@/components/Icons';

const CALCULATOR_FAQS = [
  {
    question: 'What is the difference between Study Efficiency Calculator, Study Hours Calculator, and Daily Routine Generator?',
    answer: "The Study Efficiency Calculator measures study time lost to distractions and computes potential recoverable focus hours. The Study Hours Calculator computes total syllabus completion hours and preparation feasibility before exam day. The Daily Routine Generator structures today's 24-hour circadian schedule (sleep, meals, classes, and focus sprints)."
  },
  {
    question: 'What is Attention Residue and why does refocus lag matter?',
    answer: "Research by Dr. Gloria Mark at UC Irvine shows that when an interruption occurs, attention does not immediately shift back to the primary task. A portion of cognitive bandwidth remains stuck on the distraction ('attention residue'). Even a brief 2-minute phone notification can trigger 5 to 15 minutes of suboptimal resumption lag."
  },
  {
    question: 'How does this calculator estimate recoverable monthly focus time?',
    answer: 'The engine sums direct interruption minutes plus cognitive refocus lag for each occurrence. It then multiplies this total daily loss by your avoidable interruption percentage and expands it across your net monthly study days.'
  },
  {
    question: 'Why is 6 hours of high-efficiency study better than 10 hours of fragmented study?',
    answer: 'Frequent context switching exhausts the prefrontal cortex and prevents deep conceptual encoding. Six hours of uninterrupted Pomodoro focus yields significantly higher active recall retention and problem-solving speed than 10 hours broken up by constant notification checks and tab switching.'
  },
  {
    question: 'Can I save and export my focus calculation report?',
    answer: 'Yes. You can save multiple calculation scenarios to your browser, copy a structured plain-text audit to your clipboard, or export a high-resolution A4 portrait PDF report with zero login required.'
  }
];

export const metadata = {
  title: {
    absolute: 'Study Distraction & Focus ROI Calculator | LifeTrack Pro',
  },
  description: 'Use our free study distraction calculator to measure focus lost to phone interruptions & attention residue. Discover recoverable study hours before exams.',
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
    title: 'Study Distraction & Focus ROI Calculator | LifeTrack Pro',
    description: 'Use our free study distraction calculator to measure focus lost to phone interruptions & attention residue. Discover recoverable study hours before exams.',
    url: 'https://lifetrackpro.in/calculator',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-tools.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro Study Distraction and Focus Time ROI Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Distraction & Focus ROI Calculator | LifeTrack Pro',
    description: 'Use our free study distraction calculator to measure focus lost to phone interruptions & attention residue. Discover recoverable study hours before exams.',
    images: ['https://lifetrackpro.in/og/og-tools.png'],
    creator: '@LifeTrackPro',
  },
};

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://lifetrackpro.in/calculator#webapp",
        "name": "LifeTrack Pro Study Distraction & Focus ROI Calculator",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/calculator",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/calculator#webpage",
        "url": "https://lifetrackpro.in/calculator",
        "name": "Study Distraction & Focus ROI Calculator | LifeTrack Pro",
        "description": "Calculate study time lost to distractions, notification pings, and cognitive focus recovery lag. Discover how much productive study time you can recover before exams.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "name": "LifeTrack Pro",
          "url": "https://lifetrackpro.in"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://lifetrackpro.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "Study Distraction Calculator", "item": "https://lifetrackpro.in/calculator" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": CALCULATOR_FAQS.map((faq) => ({
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

      <article className="focus-roi-page-container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#64748B', marginBottom: '14px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/tools" style={{ color: '#64748B', textDecoration: 'none' }}>Tools</Link>
          <span>/</span>
          <span style={{ color: '#5B5CF0', fontWeight: 650 }}>Study Distraction Calculator</span>
        </nav>

        {/* Hero Section */}
        <header className="focus-roi-hero" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 32px' }}>
          <div className="focus-roi-eyebrow">
            <span aria-hidden="true">⏱️</span>
            <span>ATTENTION AUDIT &amp; FOCUS TIME ROI</span>
          </div>

          <h1 className="focus-roi-hero-title">
            Study Distraction &amp; Focus Recovery Calculator
          </h1>

          <p className="focus-roi-hero-desc" style={{ margin: '0 auto' }}>
            Use our free study distraction calculator to measure study hours lost to phone interruptions, notification pings, and cognitive refocus lag. Discover how much productive deep work you can recover before exam day.
          </p>
        </header>

        {/* ── INTERACTIVE FOCUS ROI CALCULATOR WIDGET ── */}
        <FocusRoiCalculator />

        {/* ── EDUCATIONAL GUIDES SECTION ── */}
        <section style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }} aria-label="Study Efficiency Educational Guides">
          {/* Guide 1: Direct Distraction vs Attention Residue */}
          <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
              The Hidden Anatomy of Study Distractions: Direct Loss vs. Attention Residue
            </h2>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: '0 0 14px' }}>
              Most students underestimate how much time they waste because they only count the seconds their eyes were actually looking at their phone. In reality, a distraction has two distinct cognitive cost stages:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3.5">
              <div style={{ padding: '16px', background: '#FFFBEB', borderRadius: '10px', border: '1px solid #FDE68A' }}>
                <div style={{ fontSize: '11px', fontWeight: 750, color: '#92400E', textTransform: 'uppercase' }}>Stage 1: Direct Distraction</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '4px 0 2px' }}>The Off-Task Event</div>
                <div style={{ fontSize: '12px', color: '#92400E', lineHeight: 1.5 }}>
                  The 2 to 5 minutes spent answering a message, scrolling an Instagram reel, or checking a sports score. While visible, this is only the tip of the cognitive iceberg.
                </div>
              </div>

              <div style={{ padding: '16px', background: '#FEF2F2', borderRadius: '10px', border: '1px solid #FECACA' }}>
                <div style={{ fontSize: '11px', fontWeight: 750, color: '#B91C1C', textTransform: 'uppercase' }}>Stage 2: Focus Recovery Lag</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '4px 0 2px' }}>Attention Residue (3–10 mins)</div>
                <div style={{ fontSize: '12px', color: '#991B1B', lineHeight: 1.5 }}>
                  Coined by Dr. Sophie Leroy and validated by UC Irvine research, attention residue describes the mental lag required for your brain to reconstruct its prior analytical context and re-enter flow.
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              If a student experiences 15 notifications per day, they do not just lose 30 minutes of messaging time—they lose up to <strong>100+ minutes of cognitive capacity</strong> when focus recovery lag is factored in.
            </p>
          </div>

          {/* Guide 2: The Three Academic Pillars of High Efficiency */}
          <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
              How Competitive Aspirants Achieve 85%+ Study Efficiency
            </h2>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: '0 0 14px' }}>
              Aspirants who crack national examinations like IIT JEE, NEET UG, and UPSC CSE rarely rely on willpower alone. Instead, they engineer low-friction study environments using three proven frameworks:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '13px', color: '#4338CA', display: 'block', marginBottom: '4px' }}>1. Physical Distance Shield</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Simply turning your smartphone face down still demands cognitive inhibition. Placing the device in an adjacent room eliminates visual temptation and reduces subconscious checking urge by 70%.
                </p>
              </div>

              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '13px', color: '#047857', display: 'block', marginBottom: '4px' }}>2. 50/10 Ultradian Sprints</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Continuous work degrades analytical retention after 50 minutes. Use 50-minute deep blocks paired with 10-minute active recovery breaks (water, stretching, natural light) to reset neuro-fatigue.
                </p>
              </div>

              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '13px', color: '#7E22CE', display: 'block', marginBottom: '4px' }}>3. Unified Study Environment</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Switching between disparate timer apps, note apps, and flashcard tools creates task fragmentation. LifeTrack Pro consolidates your timer, active recall, and daily streaks in a single distraction-free ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── STRATEGIC COMPACT APP PROMOTION BANNER ── */}
        <Card className="features-roi-banner" aria-label="LifeTrack Pro Focus Companion">
          <div className="cta-banner-content">
            <div style={{ maxWidth: '640px', minWidth: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px' }} aria-hidden="true">🚀</span>
                <Badge variant="secondary" style={{ backgroundColor: 'rgba(238, 242, 255, 0.9)', color: '#4338CA', borderColor: '#E0E7FF', fontSize: '10.5px' }}>
                  LIFETRACK PRO FOCUS OS
                </Badge>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 850, color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                Eliminate App Distractions &amp; Recover Your Deep Study Time
              </h2>
              <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, lineHeight: 1.55 }}>
                LifeTrack Pro unifies Pomodoro timers, SM-2 flashcard queues, and habit streak shields with freeze protection. Keep your focus intact with acoustic ambient soundscapes and zero advertising.
              </p>
            </div>

            <div className="features-cta-button-group">
              <a
                href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
                target="_blank"
                rel="noopener noreferrer"
                className="features-cta-btn-primary"
                aria-label="Explore LifeTrack Pro on Play Store - Android Study App"
              >
                <PlayStoreIcon size={16} />
                <span>Explore LifeTrack Pro on Play Store</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </a>

              <div className="features-cta-subgroup">
                <Link 
                  href="/features" 
                  className="features-cta-btn-secondary"
                  aria-label="Explore All Features"
                >
                  <SparklesIcon size={15} />
                  <span>Explore Features</span>
                </Link>
                <Link 
                  href="/faq" 
                  className="features-cta-btn-secondary"
                  aria-label="Explore FAQs - Frequently Asked Questions"
                >
                  <HelpCircleIcon size={15} />
                  <span>Explore FAQs</span>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* ── RELATED APP FEATURES INTEGRATION ── */}
        <RelatedAppFeatures
          source="focus_roi_calculator"
          title="Turn Recovered Study Hours Into Academic Progress"
          subtitle="LifeTrack Pro features designed to protect your focus and eliminate interruption lag:"
        />

        {/* ── SIBLING TOOLS ECOSYSTEM ── */}
        <section style={{ margin: '36px 0' }} aria-label="Connected LifeTrack Pro Tools">
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
              Explore More Free Online Study Tools
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.55 }}>
              Each LifeTrack Pro planning tool addresses a distinct stage of your academic workflow:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
              <CardHeader style={{ padding: '16px 18px 10px' }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>⏰</div>
                <CardTitle as="h3" style={{ fontSize: '14px', color: '#0F766E', margin: 0 }}>
                  Daily Routine Generator
                </CardTitle>
                <CardDescription style={{ fontSize: '11.5px', color: '#64748B', margin: '6px 0 0', lineHeight: 1.5 }}>
                  Builds today&apos;s complete 24-hour circadian schedule, sleep, school, meals, and focus sprints.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                <Link href="/tools/daily-routine-generator" style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F766E', textDecoration: 'none' }}>
                  Open Generator →
                </Link>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Circadian</Badge>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
              <CardHeader style={{ padding: '16px 18px 10px' }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>🗓️</div>
                <CardTitle as="h3" style={{ fontSize: '14px', color: '#4338CA', margin: 0 }}>
                  Study Timetable Generator
                </CardTitle>
                <CardDescription style={{ fontSize: '11.5px', color: '#64748B', margin: '6px 0 0', lineHeight: 1.5 }}>
                  Creates a date-by-date syllabus completion roadmap with PYQ targets and weekly full mocks.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                <Link href="/tools/study-timetable-generator" style={{ fontSize: '11.5px', fontWeight: 700, color: '#4338CA', textDecoration: 'none' }}>
                  Open Generator →
                </Link>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Timetable</Badge>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
              <CardHeader style={{ padding: '16px 18px 10px' }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>📊</div>
                <CardTitle as="h3" style={{ fontSize: '14px', color: '#92400E', margin: 0 }}>
                  Study Hours Calculator
                </CardTitle>
                <CardDescription style={{ fontSize: '11.5px', color: '#64748B', margin: '6px 0 0', lineHeight: 1.5 }}>
                  Computes exact syllabus chapters, 35% revision decay, and daily pace feasibility before exam date.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                <Link href="/tools/study-hours-calculator" style={{ fontSize: '11.5px', fontWeight: 700, color: '#92400E', textDecoration: 'none' }}>
                  Open Calculator →
                </Link>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Syllabus</Badge>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
              <CardHeader style={{ padding: '16px 18px 10px' }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>📋</div>
                <CardTitle as="h3" style={{ fontSize: '14px', color: '#4338CA', margin: 0 }}>
                  Weekly Study Planner
                </CardTitle>
                <CardDescription style={{ fontSize: '11.5px', color: '#64748B', margin: '6px 0 0', lineHeight: 1.5 }}>
                  Distributes subjects across a balanced 7-day recurring template with catch-up buffers.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                <Link href="/tools/weekly-study-planner" style={{ fontSize: '11.5px', fontWeight: 700, color: '#4338CA', textDecoration: 'none' }}>
                  Open Planner →
                </Link>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>7-Day Matrix</Badge>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) SECTION ── */}
        <section style={{ margin: '36px 0 20px' }} aria-label="Frequently Asked Questions">
          <FaqAccordion
            title="Frequently Asked Questions About Study Efficiency & Distraction Recovery"
            items={CALCULATOR_FAQS}
          />
        </section>
      </article>
    </>
  );
}
