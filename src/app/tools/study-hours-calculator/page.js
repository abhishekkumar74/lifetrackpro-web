import Link from 'next/link';
import StudyHoursCalculator from '@/components/tools/StudyHoursCalculator';
import RelatedAppFeatures from '@/components/tools/RelatedAppFeatures';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import { IconActivity } from '@/components/tools/calculator/CalculatorIcons';

export const metadata = {
  title: 'Study Hours Calculator – Calculate Hours to Finish Syllabus',
  description: 'Calculate daily study hours needed to complete your syllabus before exams. Estimate revision time, total workload and preparation feasibility.',
  keywords: [
    'study hours calculator',
    'how many hours should i study',
    'syllabus completion calculator',
    'daily study hours calculator',
    'exam preparation time calculator',
    'study time calculator for students',
    'jee study hours calculator',
    'neet revision hours calculator',
    'upsc syllabus completion time',
    'lifetrack pro hours calculator'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/tools/study-hours-calculator',
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
    title: 'Study Hours Calculator – Calculate Hours to Finish Syllabus | LifeTrack Pro',
    description: 'Calculate daily study hours needed to complete your syllabus before exams. Estimate revision time, total workload and preparation feasibility.',
    url: 'https://lifetrackpro.in/tools/study-hours-calculator',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Academic Workload & Study Hours Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Hours Calculator – Calculate Hours to Finish Syllabus',
    description: 'Calculate daily study hours needed to complete your syllabus before exams. Estimate revision time, total workload and preparation feasibility.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function StudyHoursCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#softwareapplication",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/tools/study-hours-calculator",
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
        "@id": "https://lifetrackpro.in/tools/study-hours-calculator#webpage",
        "url": "https://lifetrackpro.in/tools/study-hours-calculator",
        "name": "Study Hours Calculator: How Many Hours Do You Need to Finish Your Syllabus?",
        "description": "Calculate daily study hours needed to complete your syllabus before exams. Estimate revision time, total workload and preparation feasibility.",
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
          { "@type": "ListItem", "position": 3, "name": "Study Hours Calculator", "item": "https://lifetrackpro.in/tools/study-hours-calculator" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does this study hours calculator calculate daily study time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator sums primary learning hours (remaining chapters × learning speed), multi-cycle revision hours (35% decay per cycle), practice problem-solving, full mock simulations and analysis, plus a 10% safety buffer. It then divides this total workload across actual available calendar study days before your examination."
            }
          },
          {
            "@type": "Question",
            "name": "Why is revision calculated at 35% of initial learning time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Based on Hermann Ebbinghaus's forgetting curve research, neuro-consolidation allows subsequent reviews to be substantially faster than the initial conceptual pass. The first revision cycle requires ~35% of the original learning investment, while subsequent cycles require ~25%."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between Study Hours Calculator, Daily Routine Generator, and Study Timetable Generator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Study Hours Calculator computes total academic workload and mathematical feasibility. The Daily Routine Generator structures today's 24-hour circadian lifestyle (sleep, meals, classes). The Study Timetable Generator maps chapters and PYQ targets onto a date-by-date calendar roadmap until exam day."
            }
          },
          {
            "@type": "Question",
            "name": "How many hours should I study daily for competitive exams like JEE, NEET, or UPSC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Top competitive aspirants typically maintain 6 to 9 hours of distraction-free daily study. Beyond 8 to 9 hours, cognitive fatigue reduces retention. If your workload calculation demands >10 daily hours, apply the 80/20 Pareto principle to prune low-yield topics."
            }
          },
          {
            "@type": "Question",
            "name": "What should I do if my feasibility status is 'Not Feasible' or 'Tight'?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "First, reduce weekly rest days slightly or advance your daily study commitment by 1-2 hours. If still not feasible, prune low-weightage chapters (Pareto 80/20 analysis) and reduce revision cycles to high-yield flashcard drills instead of full re-reads."
            }
          },
          {
            "@type": "Question",
            "name": "Does the calculator account for weekly rest days and unexpected delays?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can configure 5, 6, or 7 study days per week. The engine also applies a configurable 10% unexpected delay buffer to absorb illness, coaching test fatigue, and school assignments without derailing your exam date."
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

      <article className="study-hours-page-container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#64748B', marginBottom: '14px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/tools" style={{ color: '#64748B', textDecoration: 'none' }}>Tools</Link>
          <span>/</span>
          <span style={{ color: '#5B5CF0', fontWeight: 650 }}>Study Hours Calculator</span>
        </nav>

        {/* Hero Section */}
        <header className="study-hours-hero">
          <div className="study-hours-eyebrow">
            <IconActivity size={13} color="#5B5CF0" />
            <span>ACADEMIC WORKLOAD &amp; FEASIBILITY OS</span>
          </div>

          <h1 className="study-hours-hero-title">
            Study Hours Calculator
          </h1>

          <p className="study-hours-hero-desc">
            Calculate how many hours you need to complete your syllabus, revise effectively and prepare before your exam.
          </p>
        </header>

        {/* ── INTERACTIVE WORKLOAD CALCULATOR WIDGET ── */}
        <StudyHoursCalculator />

        {/* ── EDUCATIONAL SEO CONTENT SECTION ── */}
        <section style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }} aria-label="Study Workload Educational Guides">
          {/* Guide 1: Mathematical Formula */}
          <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
              How to Calculate Study Hours for Exam Preparation
            </h2>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: '0 0 14px' }}>
              Most students plan their academic year using wishful thinking rather than arithmetic. When a preparation plan fails, it is rarely due to lack of willpower—it is usually because the total volume of learning, revision, problem solving, and mock exams was mathematically impossible to complete within the available calendar hours.
            </p>

            <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: '12.5px', color: '#1E293B', marginBottom: '14px', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 750, color: '#5B5CF0', marginBottom: '4px' }}>Total Academic Preparation Workload Formula:</div>
              <code>Total Hours = (Remaining Chapters × Avg Learning Speed) + Revision Workload + Practice Hours + Mock Test &amp; Analysis Time + Safety Buffer (10%)</code>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748B' }}>
                Required Daily Hours = Total Workload Hours ÷ Net Available Study Days
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              For instance, if a student has <strong>60 remaining chapters</strong> requiring an average of <strong>5 hours</strong> each, the primary learning workload is <strong>300 hours</strong>. With 1 full revision cycle (35% decay rule = 105 hours) and a 10% safety buffer, the total preparation demand reaches approximately <strong>445.5 hours</strong>. If 96 actual study days remain before the examination date, the student must maintain <strong>4.64 distraction-free study hours every single study day</strong>.
            </p>
          </div>

          {/* Guide 2: The 35% Forgetting Curve Rule */}
          <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
              The 35% Forgetting Curve: Why Revision Takes Less Time Than Learning
            </h2>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: '0 0 12px' }}>
              A common mathematical mistake students make is allocating the same number of hours to revision as initial learning. According to Hermann Ebbinghaus&apos;s forgetting curve and modern cognitive neuroscience research, memory traces consolidate when retrieved actively:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', margin: '14px 0' }}>
              <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '11px', fontWeight: 750, color: '#5B5CF0', textTransform: 'uppercase' }}>Cycle 1: Initial Learning</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '4px 0 2px' }}>100% Investment</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>First conceptual exposure, derivations, note compilation, and textbook reading.</div>
              </div>

              <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '11px', fontWeight: 750, color: '#16A34A', textTransform: 'uppercase' }}>Cycle 2: First Revision</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '4px 0 2px' }}>30% – 35% of Base Time</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Active recall flashcards, formula sheets, high-yield summary notes, and weak areas.</div>
              </div>

              <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '11px', fontWeight: 750, color: '#0D9488', textTransform: 'uppercase' }}>Cycle 3: Second Revision</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '4px 0 2px' }}>20% – 25% of Base Time</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Rapid interleaved problem solving, error log reviews, and speed formula sheets.</div>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              LifeTrack Pro&apos;s calculation engine models this decay curve automatically. Rather than doubling your workload for every revision cycle, it calculates real cognitive consolidation time so you can complete 2x or 3x revision passes without burning out.
            </p>
          </div>

          {/* Guide 3: Daily Study Hour Benchmarks by Examination */}
          <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
              How Many Hours to Study Daily: Competitive Examination Benchmarks
            </h2>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: '0 0 14px' }}>
              How much time should a student truly invest every day? The answer depends heavily on your student lifestyle category and target competitive examination:
            </p>

            <div className="study-hours-table-wrap">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F1F5F9', borderBottom: '2px solid #CBD5E1' }}>
                    <th style={{ padding: '10px 12px', fontWeight: 750, color: '#334155' }}>Examination / Target</th>
                    <th style={{ padding: '10px 12px', fontWeight: 750, color: '#334155' }}>Recommended Daily Hours</th>
                    <th style={{ padding: '10px 12px', fontWeight: 750, color: '#334155' }}>Weekly Rest Pattern</th>
                    <th style={{ padding: '10px 12px', fontWeight: 750, color: '#334155' }}>Critical Focus Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>IIT JEE (Main &amp; Advanced)</td>
                    <td style={{ padding: '10px 12px', color: '#5B5CF0', fontWeight: 750 }}>6.5 – 8.5 Hours</td>
                    <td style={{ padding: '10px 12px', color: '#64748B' }}>6 Days / Week (1 Buffer Day)</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>Timed PYQ problem solving + Error remediation</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#FAFAFC' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>NEET Medical UG</td>
                    <td style={{ padding: '10px 12px', color: '#16A34A', fontWeight: 750 }}>7.0 – 9.0 Hours</td>
                    <td style={{ padding: '10px 12px', color: '#64748B' }}>6.5 Days / Week</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>NCERT line-by-line active recall + Biology flashcards</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>UPSC Civil Services</td>
                    <td style={{ padding: '10px 12px', color: '#D97706', fontWeight: 750 }}>6.0 – 8.0 Hours</td>
                    <td style={{ padding: '10px 12px', color: '#64748B' }}>6 Days / Week</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>Daily editorial synthesis + Mains answer structuring</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#FAFAFC' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>College / University Semester</td>
                    <td style={{ padding: '10px 12px', color: '#0D9488', fontWeight: 750 }}>3.5 – 5.0 Hours</td>
                    <td style={{ padding: '10px 12px', color: '#64748B' }}>5 Days / Week (2 Weekend Days)</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>Mid-term assignments + Interleaved lab practice</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>Working Professional / Self-Learner</td>
                    <td style={{ padding: '10px 12px', color: '#6366F1', fontWeight: 750 }}>2.5 – 4.0 Hours</td>
                    <td style={{ padding: '10px 12px', color: '#64748B' }}>5 Days (Heavy Weekend Blocks)</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>Early-morning deep sprints before office hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '14px', padding: '12px 14px', background: '#FFFBEB', borderRadius: '8px', border: '1px solid #FDE68A', fontSize: '12px', color: '#92400E', lineHeight: 1.55 }}>
              ⚠️ <strong>Cognitive Saturation Limit:</strong> Human focused cognitive bandwidth has an upper bound. Studying beyond 9 to 10 hours daily invariably produces diminishing returns, sleep fragmentation, and severe memory interference. Prioritize focus intensity over raw clock time.
            </div>
          </div>

          {/* Guide 4: Handling Study Workload Deficits (Pareto 80/20) */}
          <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
              What to Do If Your Plan Is &quot;Not Feasible&quot; or Shows a Deficit
            </h2>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, margin: '0 0 14px' }}>
              If the calculator indicates that you require 12 or 14 daily study hours—or shows a red deficit badge—do not despair or attempt an unsustainable 15-hour marathon. Instead, execute one of the following strategic recalibrations:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A', marginBottom: '4px' }}>
                  1. Pareto 80/20 Syllabus Pruning
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.55 }}>
                  In every national examination, approximately 20% of high-yield chapters produce 80% of scoring questions. Cut low-yield fringe topics entirely and reallocate your hours to master high-weightage chapters.
                </div>
              </div>

              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A', marginBottom: '4px' }}>
                  2. Convert Passive Reading into Active Recall
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.55 }}>
                  Re-reading textbooks takes hours with low retention. Replace full chapter re-reads with active flashcards and high-speed PYQ drills to reduce revision hours by over 50%.
                </div>
              </div>

              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A', marginBottom: '4px' }}>
                  3. Adjust Study Days Per Week
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.55 }}>
                  If you currently study 5 days a week, shifting to 6 study days unlocks 20% more net preparation capacity before your examination without increasing daily hours.
                </div>
              </div>

              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A', marginBottom: '4px' }}>
                  4. Run What-If Simulations
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.55 }}>
                  Use the calculator&apos;s What-If Simulator above to test different daily study paces (3h, 4h, 5h, 6h, 8h) and determine exactly when your syllabus will finish at each intensity.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 10: STRATEGIC COMPACT APP PROMOTION BANNER ── */}
        <section
          className="study-hours-promo-card"
          aria-label="LifeTrack Pro Mobile Companion"
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 750, color: '#5B5CF0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              <span>🚀</span>
              <span>LIFETRACK PRO MOBILE COMPANION</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 850, color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              Turn Your Study Targets Into Daily Progress
            </h2>
            <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, lineHeight: 1.55 }}>
              Use LifeTrack Pro to track focus sessions, habits and learning progress. Log deep Pomodoro sprints, maintain active recall streaks, and eliminate daily study distractions on Android.
            </p>
          </div>

          <div style={{ flexShrink: 0 }}>
            <a
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
              target="_blank"
              rel="noopener noreferrer"
              className="study-hours-promo-btn"
            >
              <PlayStoreIcon size={16} />
              <span>Explore LifeTrack Pro App →</span>
            </a>
          </div>
        </section>

        {/* ── RELATED APP FEATURES INTEGRATION ── */}
        <RelatedAppFeatures
          source="study_hours_calculator"
          title="Turn Calculated Hours Into Actionable Execution"
          subtitle="Connect your calculated academic targets to LifeTrack Pro's daily productivity suite:"
        />

        {/* ── SIBLING TOOLS ECOSYSTEM ── */}
        <section style={{ margin: '36px 0', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }} aria-label="Connected LifeTrack Pro Tools">
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
            Explore More Free Online Study Tools
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px', lineHeight: 1.55 }}>
            LifeTrack Pro provides 3 distinct academic planning tools designed to work together seamlessly:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px' }}>
            <Link href="/tools/daily-routine-generator" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box', transition: 'all 0.15s ease' }}>
                <div style={{ fontSize: '18px', marginBottom: '6px' }}>⏰</div>
                <strong style={{ fontSize: '13.5px', color: '#0D9488', display: 'block', marginBottom: '4px' }}>Daily Routine Generator →</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                  Manages today&apos;s complete 24-hour circadian lifestyle, sleep, school, meals, and focus sprints.
                </p>
              </div>
            </Link>

            <Link href="/tools/study-timetable-generator" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box', transition: 'all 0.15s ease' }}>
                <div style={{ fontSize: '18px', marginBottom: '6px' }}>🗓️</div>
                <strong style={{ fontSize: '13.5px', color: '#5B5CF0', display: 'block', marginBottom: '4px' }}>Study Timetable Generator →</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                  Creates a date-by-date academic roadmap with PYQ targets and Sunday full-length mock tests until exam day.
                </p>
              </div>
            </Link>

            <Link href="/tools/focus-time-calculator" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box', transition: 'all 0.15s ease' }}>
                <div style={{ fontSize: '18px', marginBottom: '6px' }}>🧠</div>
                <strong style={{ fontSize: '13.5px', color: '#E11D48', display: 'block', marginBottom: '4px' }}>Focus Time Calculator →</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                  Measures true deep work capacity versus distraction residue, task-switching friction, and study fatigue.
                </p>
              </div>
            </Link>

            <Link href="/tools/weekly-study-planner" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', height: '100%', boxSizing: 'border-box', transition: 'all 0.15s ease' }}>
                <div style={{ fontSize: '18px', marginBottom: '6px' }}>📋</div>
                <strong style={{ fontSize: '13.5px', color: '#D97706', display: 'block', marginBottom: '4px' }}>Weekly Study Planner →</strong>
                <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                  Balances subjects across a structured 7-day recurring template with built-in catch-up buffers.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) SECTION ── */}
        <section style={{ margin: '36px 0 20px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }} aria-label="Frequently Asked Questions">
          <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px', letterSpacing: '-0.3px' }}>
            Frequently Asked Questions About Study Hours Planning
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                How does this study hours calculator calculate daily study time?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                The calculator sums primary learning hours (remaining chapters × learning speed), multi-cycle revision hours (35% decay per cycle), practice problem-solving, full mock simulations and analysis, plus a 10% safety buffer. It then divides this total workload across actual available calendar study days before your examination.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                Why is revision calculated at 35% of initial learning time?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Based on Hermann Ebbinghaus&apos;s forgetting curve research, neuro-consolidation allows subsequent reviews to be substantially faster than the initial conceptual pass. The first revision cycle requires ~35% of the original learning investment, while subsequent cycles require ~25%.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                What is the difference between Study Hours Calculator, Daily Routine Generator, and Study Timetable Generator?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                The Study Hours Calculator computes total academic workload and mathematical feasibility. The Daily Routine Generator structures today&apos;s 24-hour circadian lifestyle (sleep, meals, classes). The Study Timetable Generator maps chapters and PYQ targets onto a date-by-date calendar roadmap until exam day.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                How many hours should I study daily for competitive exams like JEE, NEET, or UPSC?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Top competitive aspirants typically maintain 6 to 9 hours of distraction-free daily study. Beyond 8 to 9 hours, cognitive fatigue reduces retention. If your workload calculation demands &gt;10 daily hours, apply the 80/20 Pareto principle to prune low-yield topics.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                What should I do if my feasibility status is &quot;Not Feasible&quot; or &quot;Tight&quot;?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                First, reduce weekly rest days slightly or advance your daily study commitment by 1-2 hours. If still not feasible, prune low-weightage chapters (Pareto 80/20 analysis) and reduce revision cycles to high-yield flashcard drills instead of full re-reads.
              </p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                Does the calculator account for weekly rest days and unexpected delays?
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Yes. You can configure 5, 6, or 7 study days per week. The engine also applies a configurable 10% unexpected delay buffer to absorb illness, coaching test fatigue, and school assignments without derailing your exam date.
              </p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
