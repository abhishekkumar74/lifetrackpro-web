import Link from 'next/link';
import FocusRoiCalculator from '@/components/tools/FocusRoiCalculator';
import RelatedAppFeatures from '@/components/tools/RelatedAppFeatures';
import PlayStoreIcon from '@/components/PlayStoreIcon';

export const metadata = {
  title: 'Study Efficiency & Focus Time ROI Calculator – LifeTrack Pro',
  description: 'Calculate study time lost to distractions, notification pings, and cognitive focus recovery lag. Discover how much productive study time you can recover before exams.',
  keywords: [
    'study efficiency calculator',
    'focus time calculator',
    'study time lost to distractions',
    'attention residue calculator',
    'pomodoro study roi',
    'interruption recovery time',
    'daily study efficiency',
    'reclaim focus hours',
    'exam focus roi',
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
    title: 'Study Efficiency & Focus Time ROI Calculator | LifeTrack Pro',
    description: 'Calculate study time lost to distractions, notification pings, and cognitive focus recovery lag. Discover how much productive study time you can recover before exams.',
    url: 'https://lifetrackpro.in/calculator',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Study Efficiency and Focus Time ROI Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Efficiency & Focus Time ROI Calculator | LifeTrack Pro',
    description: 'Calculate study time lost to distractions, notification pings, and cognitive focus recovery lag. Discover how much productive study time you can recover before exams.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#softwareapplication",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/calculator",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "120"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/calculator#webpage",
        "url": "https://lifetrackpro.in/calculator",
        "name": "Study Efficiency & Focus Time ROI Calculator | LifeTrack Pro",
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
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in/" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://lifetrackpro.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "Study Efficiency Calculator", "item": "https://lifetrackpro.in/calculator" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between Study Efficiency Calculator, Study Hours Calculator, and Daily Routine Generator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Study Efficiency Calculator measures study time lost to distractions and computes potential recoverable focus hours. The Study Hours Calculator computes total syllabus completion hours and preparation feasibility before exam day. The Daily Routine Generator structures today's 24-hour circadian schedule (sleep, meals, classes, and focus sprints)."
            }
          },
          {
            "@type": "Question",
            "name": "What is Attention Residue and why does refocus lag matter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Research by Dr. Gloria Mark at UC Irvine shows that when an interruption occurs, attention does not immediately shift back to the primary task. A portion of cognitive bandwidth remains stuck on the distraction ('attention residue'). Even a brief 2-minute phone notification can trigger 5 to 15 minutes of suboptimal resumption lag."
            }
          },
          {
            "@type": "Question",
            "name": "How does this calculator estimate recoverable monthly focus time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The engine sums direct interruption minutes plus cognitive refocus lag for each occurrence. It then multiplies this total daily loss by your avoidable interruption percentage and expands it across your net monthly study days."
            }
          },
          {
            "@type": "Question",
            "name": "Why is 6 hours of high-efficiency study better than 10 hours of fragmented study?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Frequent context switching exhausts the prefrontal cortex and prevents deep conceptual encoding. Six hours of uninterrupted Pomodoro focus yields significantly higher active recall retention and problem-solving speed than 10 hours broken up by constant notification checks and tab switching."
            }
          },
          {
            "@type": "Question",
            "name": "Can I save and export my focus calculation report?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can save multiple calculation scenarios to your browser, copy a structured plain-text audit to your clipboard, or export a high-resolution A4 portrait PDF report with zero login required."
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

      <article className="focus-roi-page-container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#64748B', marginBottom: '14px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/tools" style={{ color: '#64748B', textDecoration: 'none' }}>Tools</Link>
          <span>/</span>
          <span style={{ color: '#5B5CF0', fontWeight: 650 }}>Study Efficiency Calculator</span>
        </nav>

        {/* Hero Section */}
        <header className="focus-roi-hero">
          <div className="focus-roi-eyebrow">
            <span>⏱️</span>
            <span>ATTENTION AUDIT &amp; FOCUS TIME ROI</span>
          </div>

          <h1 className="focus-roi-hero-title">
            Study Efficiency &amp; Focus Time ROI Calculator
          </h1>

          <p className="focus-roi-hero-desc">
            Calculate how much study time you potentially lose through distractions, phone alerts, and focus recovery lag. Discover how much productive deep work you can recover before your exam.
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', margin: '14px 0' }}>
              <div style={{ padding: '16px', background: '#FFFBEB', borderRadius: '10px', border: '1px solid #FDE68A' }}>
                <div style={{ fontSize: '11px', fontWeight: 750, color: '#D97706', textTransform: 'uppercase' }}>Stage 1: Direct Distraction</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '4px 0 2px' }}>The Off-Task Event</div>
                <div style={{ fontSize: '12px', color: '#92400E', lineHeight: 1.5 }}>
                  The 2 to 5 minutes spent answering a message, scrolling an Instagram reel, or checking a sports score. While visible, this is only the tip of the cognitive iceberg.
                </div>
              </div>

              <div style={{ padding: '16px', background: '#FEF2F2', borderRadius: '10px', border: '1px solid #FECACA' }}>
                <div style={{ fontSize: '11px', fontWeight: 750, color: '#DC2626', textTransform: 'uppercase' }}>Stage 2: Focus Recovery Lag</div>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '13px', color: '#5B5CF0', display: 'block', marginBottom: '4px' }}>1. Physical Distance Shield</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Simply turning your smartphone face down still demands cognitive inhibition. Placing the device in an adjacent room eliminates visual temptation and reduces subconscious checking urge by 70%.
                </p>
              </div>

              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '13px', color: '#10B981', display: 'block', marginBottom: '4px' }}>2. 50/10 Ultradian Sprints</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Continuous work degrades analytical retention after 50 minutes. Use 50-minute deep blocks paired with 10-minute active recovery breaks (water, stretching, natural light) to reset neuro-fatigue.
                </p>
              </div>

              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <strong style={{ fontSize: '13px', color: '#9333EA', display: 'block', marginBottom: '4px' }}>3. Unified Study Environment</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Switching between disparate timer apps, note apps, and flashcard tools creates task fragmentation. LifeTrack Pro consolidates your timer, active recall, and daily streaks in a single distraction-free ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── STRATEGIC COMPACT APP PROMOTION BANNER ── */}
        <section className="focus-roi-promo-card" aria-label="LifeTrack Pro Focus Companion">
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 750, color: '#5B5CF0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              <span>🚀</span>
              <span>LIFETRACK PRO FOCUS OS</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 850, color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              Eliminate App Distractions &amp; Recover Your Deep Study Time
            </h2>
            <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, lineHeight: 1.55 }}>
              LifeTrack Pro unifies Pomodoro timers, SM-2 flashcard queues, and habit streak shields with freeze protection. Keep your focus intact with acoustic ambient soundscapes and zero advertising.
            </p>
          </div>

          <div style={{ flexShrink: 0 }}>
            <a
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-roi-promo-btn"
            >
              <PlayStoreIcon size={16} />
              <span>Explore LifeTrack Pro on Play Store →</span>
            </a>
          </div>
        </section>

        {/* ── RELATED APP FEATURES INTEGRATION ── */}
        <RelatedAppFeatures
          source="focus_roi_calculator"
          title="Turn Recovered Study Hours Into Academic Progress"
          subtitle="LifeTrack Pro features designed to protect your focus and eliminate interruption lag:"
        />

        {/* ── SIBLING TOOLS ECOSYSTEM ── */}
        <section style={{ margin: '36px 0', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }} aria-label="Connected LifeTrack Pro Tools">
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
            Explore More Free Online Study Tools
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px', lineHeight: 1.55 }}>
            Each LifeTrack Pro planning tool addresses a distinct stage of your academic workflow:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px' }}>
            <Link href="/tools/daily-routine-generator" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ fontSize: '18px', marginBottom: '6px' }}>⏰</div>
                <strong style={{ fontSize: '13.5px', color: '#0D9488', display: 'block', marginBottom: '4px' }}>Daily Routine Generator →</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                  Builds today&apos;s complete 24-hour circadian schedule, sleep, school, meals, and focus sprints.
                </p>
              </div>
            </Link>

            <Link href="/tools/study-timetable-generator" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ fontSize: '18px', marginBottom: '6px' }}>🗓️</div>
                <strong style={{ fontSize: '13.5px', color: '#5B5CF0', display: 'block', marginBottom: '4px' }}>Study Timetable Generator →</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                  Creates a date-by-date syllabus completion roadmap with PYQ targets and weekly full mocks.
                </p>
              </div>
            </Link>

            <Link href="/tools/study-hours-calculator" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ fontSize: '18px', marginBottom: '6px' }}>📊</div>
                <strong style={{ fontSize: '13.5px', color: '#D97706', display: 'block', marginBottom: '4px' }}>Study Hours Calculator →</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                  Computes exact syllabus chapters, 35% revision decay, and daily pace feasibility before exam date.
                </p>
              </div>
            </Link>

            <Link href="/tools/weekly-study-planner" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ fontSize: '18px', marginBottom: '6px' }}>📋</div>
                <strong style={{ fontSize: '13.5px', color: '#6366F1', display: 'block', marginBottom: '4px' }}>Weekly Study Planner →</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                  Distributes subjects across a balanced 7-day recurring template with catch-up buffers.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) SECTION ── */}
        <section style={{ margin: '36px 0 20px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }} aria-label="Frequently Asked Questions">
          <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px', letterSpacing: '-0.3px' }}>
            Frequently Asked Questions About Study Efficiency &amp; Distraction Recovery
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                What is the difference between Study Efficiency Calculator, Study Hours Calculator, and Daily Routine Generator?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                The Study Efficiency Calculator measures study time lost to distractions and computes potential recoverable focus hours. The Study Hours Calculator computes total syllabus completion hours and preparation feasibility before exam day. The Daily Routine Generator structures today&apos;s 24-hour circadian schedule (sleep, meals, classes, and focus sprints).
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                What is Attention Residue and why does refocus lag matter?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Research by Dr. Gloria Mark at UC Irvine shows that when an interruption occurs, attention does not immediately shift back to the primary task. A portion of cognitive bandwidth remains stuck on the distraction (&apos;attention residue&apos;). Even a brief 2-minute phone notification can trigger 5 to 15 minutes of suboptimal resumption lag.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                How does this calculator estimate recoverable monthly focus time?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                The engine sums direct interruption minutes plus cognitive refocus lag for each occurrence. It then multiplies this total daily loss by your avoidable interruption percentage and expands it across your net monthly study days.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                Why is 6 hours of high-efficiency study better than 10 hours of fragmented study?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Frequent context switching exhausts the prefrontal cortex and prevents deep conceptual encoding. Six hours of uninterrupted Pomodoro focus yields significantly higher active recall retention and problem-solving speed than 10 hours broken up by constant notification checks and tab switching.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                Can I save and export my focus calculation report?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Yes. You can save multiple calculation scenarios to your browser, copy a structured plain-text audit to your clipboard, or export a high-resolution A4 portrait PDF report with zero login required.
              </p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
