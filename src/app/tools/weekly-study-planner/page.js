import Link from 'next/link';
import WeeklyStudyPlanner from '@/components/tools/WeeklyStudyPlanner';
import RelatedAppFeatures from '@/components/tools/RelatedAppFeatures';
import { 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

export const metadata = {
  title: 'Weekly Study Planner & 7-Day Schedule',
  description: 'Free weekly study planner for students. Distribute study hours across 7 days, balance multiple subjects & schedule Sunday mock test error analysis. Free.',
  keywords: [
    'weekly study planner online',
    '7 day study schedule maker',
    'weekly revision planner free',
    'student weekly timetable planner',
    'jee weekly study plan',
    'neet weekly revision timetable',
    'upsc weekly schedule maker',
    'weekly study goals template',
    'lifetrack pro weekly planner'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/tools/weekly-study-planner',
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
    title: 'Weekly Study Planner & 7-Day Schedule | LifeTrack Pro',
    description: 'Free online weekly study planner. Balance multiple subjects across a structured 7-day schedule with dedicated mock test and error analysis slots.',
    url: 'https://lifetrackpro.in/tools/weekly-study-planner',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Free Weekly Study Planner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekly Study Planner & 7-Day Schedule | LifeTrack Pro',
    description: 'Plan and balance your 7-day study week across multiple subjects with automated daily quotas.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function WeeklyStudyPlannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#softwareapplication",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/tools/weekly-study-planner",
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
        "@id": "https://lifetrackpro.in/tools/weekly-study-planner#webpage",
        "url": "https://lifetrackpro.in/tools/weekly-study-planner",
        "name": "Weekly Study Planner & 7-Day Schedule",
        "description": "Interactive weekly study planner to balance multiple subjects, schedule Pomodoro blocks, and track 7-day completion checklists.",
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
          { "@type": "ListItem", "position": 3, "name": "Weekly Study Planner", "item": "https://lifetrackpro.in/tools/weekly-study-planner" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How should I structure my study week across multiple subjects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The most balanced approach pairs two complementary subjects each day (such as an analytical subject like Physics with a conceptual subject like Biology or Inorganic Chemistry). This prevents cognitive saturation in any single topic."
            }
          },
          {
            "@type": "Question",
            "name": "Should Sunday be used for studying or resting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For serious competitive aspirants, Sunday is ideally split into a 3-hour morning full-length mock test followed by deep error analysis, leaving the evening for mental decompression, family time, and resetting dopamine."
            }
          },
          {
            "@type": "Question",
            "name": "How do streak freeze shields help during weekly planning?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When unexpected illness or emergencies interrupt one day of your study week, LifeTrack Pro streak freeze shields automatically absorb the missed checklist, keeping your multi-week habit streak badge intact without resetting to zero."
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
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/tools" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Tools</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Weekly Planner</span>
          </nav>

          <div className="section-eyebrow">Free Online Study Tool</div>
          <h1 className="subpage-h1">Weekly Study Planner: Free 7-Day Schedule &amp; Revision Maker</h1>
          
          <p className="subpage-lead">
            Distribute your weekly study hours evenly across 7 days. Balance multiple subjects, prevent single-subject fatigue, and incorporate dedicated Sunday mock tests and backlog clearance windows.
          </p>

          {/* Interactive Weekly Planner Widget */}
          <WeeklyStudyPlanner />

          {/* Multi-subject balancing guide */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              The 3-Subject Interleaving Principle
            </h2>
            <p className="content-card-p">
              Studying a single subject for an entire week (termed &quot;blocked practice&quot;) gives a false sense of rapid mastery. However, cognitive research shows that interleaving related subjects improves long-term discrimination and conceptual flexibility during exams.
            </p>
            <p className="content-card-p">
              Guidelines for an airtight 7-day study week:
            </p>
            <ul className="content-card-list">
              <li>• <strong>Rotate Analytical vs Conceptual:</strong> Alternate between formula-heavy problem solving (Maths, Physics numericals) and verbal/factual recall (Inorganic Chemistry, Biology, Constitutional Articles).</li>
              <li>• <strong>Reserve Friday for Backlog Clearance:</strong> Expect 15% of your weekly targets to slip. Allocating Friday afternoon specifically to catch up prevents small delays from snowballing into overwhelming stress.</li>
              <li>• <strong>Saturday Full-Deck SM-2 Sweep:</strong> Dedicate Saturday evening to reviewing your accumulated <Link href="/features/spaced-repetition" style={{ color: 'var(--primary)', fontWeight: 600 }}>flashcard queues</Link> across all three subjects before Sunday mock tests.</li>
            </ul>
          </div>

          {/* STRATEGIC APP CTA PLACEMENT 3: Related LifeTrack Pro Features Section */}
          <RelatedAppFeatures
            source="weekly_study_planner"
            title="Track Your 7-Day Consistency with LifeTrack Pro"
            subtitle="Connect your weekly plan to daily habit tracking, focus timers, and progress analytics:"
          />

          {/* Sibling Tools */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Explore More Free Online Study Tools
            </h2>
            <p className="content-card-p">
              Use our other planning tools to build an actionable daily timetable from your weekly plan:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '12px' }}>
              <Link href="/tools/study-timetable-generator" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '10px 12px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ fontSize: '12.5px', color: 'var(--primary)' }}>Study Timetable Generator →</strong>
                  <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0' }}>Build hour-by-hour scheduled revision timetables.</p>
                </div>
              </Link>

              <Link href="/tools/daily-routine-generator" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '10px 12px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ fontSize: '12.5px', color: 'var(--emerald)' }}>Daily Routine Generator →</strong>
                  <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0' }}>24-hour circadian schedule builder for students.</p>
                </div>
              </Link>

              <Link href="/tools/study-hours-calculator" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '10px 12px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ fontSize: '12.5px', color: 'var(--sky)' }}>Study Hours Calculator →</strong>
                  <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0' }}>Calculate daily study hours needed for your syllabus.</p>
                </div>
              </Link>

              <Link href="/tools/focus-time-calculator" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '10px 12px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ fontSize: '12.5px', color: 'var(--rose)' }}>Focus Time Calculator →</strong>
                  <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0' }}>Measure true deep work hours vs distraction residue.</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Frequently Asked Questions About Weekly Study Planning
            </h2>

            <div className="content-card-faq" style={{ marginTop: '14px' }}>
              <h3 className="content-card-faq-h3">
                How should I structure my study week across multiple subjects?
              </h3>
              <p className="content-card-p" style={{ marginBottom: 0 }}>
                The most balanced approach pairs two complementary subjects each day (such as an analytical subject like Physics with a conceptual subject like Biology or Inorganic Chemistry). This prevents cognitive saturation in any single topic.
              </p>
            </div>

            <div className="content-card-faq">
              <h3 className="content-card-faq-h3">
                Should Sunday be used for studying or resting?
              </h3>
              <p className="content-card-p" style={{ marginBottom: 0 }}>
                For serious competitive aspirants, Sunday is ideally split into a 3-hour morning full-length mock test followed by deep error analysis, leaving the evening for mental decompression, family time, and resetting dopamine.
              </p>
            </div>

            <div className="content-card-faq">
              <h3 className="content-card-faq-h3">
                How do streak freeze shields help during weekly planning?
              </h3>
              <p className="content-card-p" style={{ marginBottom: 0 }}>
                When unexpected illness or emergencies interrupt one day of your study week, LifeTrack Pro streak freeze shields automatically absorb the missed checklist, keeping your multi-week habit streak badge intact without resetting to zero.
              </p>
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
              <span>Get LifeTrack Pro Free on Play Store</span>
            </a>
            <Link href="/tools" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon size={16} />
              <span>Explore All Tools</span>
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