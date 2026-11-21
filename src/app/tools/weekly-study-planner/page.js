import Link from 'next/link';
import WeeklyStudyPlanner from '@/components/tools/WeeklyStudyPlanner';
import RelatedAppFeatures from '@/components/tools/RelatedAppFeatures';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

const WEEKLY_PLANNER_FAQS = [
  {
    question: "How should I structure my study week across multiple subjects?",
    answer: "The most balanced approach pairs two complementary subjects each day (such as an analytical subject like Physics with a conceptual subject like Biology or Inorganic Chemistry). This prevents cognitive saturation in any single topic."
  },
  {
    question: "Should Sunday be used for studying or resting?",
    answer: "For serious competitive aspirants, Sunday is ideally split into a 3-hour morning full-length mock test followed by deep error analysis, leaving the evening for mental decompression, family time, and resetting dopamine."
  },
  {
    question: "How do streak freeze shields help during weekly planning?",
    answer: "When unexpected illness or emergencies interrupt one day of your study week, LifeTrack Pro streak freeze shields automatically absorb the missed checklist, keeping your multi-week habit streak badge intact without resetting to zero."
  }
];

export const metadata = {
  title: {
    absolute: 'Weekly Study Planner and 7-Day Schedule | LifeTrack Pro',
  },
  description: 'Plan your 7-day revision with our free weekly study planner. Distribute study shifts, schedule mock exams and track weekly targets for exams. Plan your week.',
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
    title: 'Weekly Study Planner and 7-Day Schedule | LifeTrack Pro',
    description: 'Plan your 7-day revision with our free weekly study planner. Distribute study shifts, schedule mock exams and track weekly targets for exams. Plan your week.',
    url: 'https://lifetrackpro.in/tools/weekly-study-planner',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-tools.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro Free Weekly Study Planner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekly Study Planner and 7-Day Schedule | LifeTrack Pro',
    description: 'Plan your 7-day revision with our free weekly study planner. Distribute study shifts, schedule mock exams and track weekly targets for exams. Plan your week.',
    images: ['https://lifetrackpro.in/og/og-tools.png'],
    creator: '@LifeTrackPro',
  },
};

export default function WeeklyStudyPlannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://lifetrackpro.in/tools/weekly-study-planner#webapp",
        "name": "LifeTrack Pro Weekly Study Planner",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/tools/weekly-study-planner",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
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
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://lifetrackpro.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "Weekly Study Planner", "item": "https://lifetrackpro.in/tools/weekly-study-planner" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": WEEKLY_PLANNER_FAQS.map((faq) => ({
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
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/tools" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Tools</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Weekly Planner</span>
          </nav>

          <div className="section-eyebrow">Free Online Study Tool</div>
          <h1 className="subpage-h1">Weekly Study Planner for Students</h1>
          
          <p className="subpage-lead">
            Use our free weekly study planner to distribute study hours evenly across 7 days. Balance multiple subjects, prevent single-subject fatigue, and incorporate dedicated Sunday mock tests and backlog clearance windows.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>🗓️</div>
                  <CardTitle style={{ fontSize: '13.5px', color: 'var(--primary)', margin: 0 }}>Study Timetable Generator</CardTitle>
                  <CardDescription style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Build hour-by-hour scheduled revision timetables.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/tools/study-timetable-generator" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
                    Open Tool →
                  </Link>
                  <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Timetable</Badge>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>⏰</div>
                  <CardTitle style={{ fontSize: '13.5px', color: 'var(--emerald)', margin: 0 }}>Daily Routine Generator</CardTitle>
                  <CardDescription style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0', lineHeight: 1.45 }}>
                    24-hour circadian schedule builder for students.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/tools/daily-routine-generator" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--emerald)', textDecoration: 'none' }}>
                    Open Tool →
                  </Link>
                  <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Circadian</Badge>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>📊</div>
                  <CardTitle style={{ fontSize: '13.5px', color: 'var(--sky)', margin: 0 }}>Study Hours Calculator</CardTitle>
                  <CardDescription style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Calculate daily study hours needed for your syllabus.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/tools/study-hours-calculator" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--sky)', textDecoration: 'none' }}>
                    Open Tool →
                  </Link>
                  <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Syllabus</Badge>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }} aria-hidden="true">🧠</div>
                  <CardTitle style={{ fontSize: '13.5px', color: 'var(--rose)', margin: 0 }}>Focus Time Calculator</CardTitle>
                  <CardDescription style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Measure true deep work hours vs distraction residue.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/tools/focus-time-calculator" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rose)', textDecoration: 'none' }}>
                    Open Tool →
                  </Link>
                  <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Attention</Badge>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <section className="reveal reveal-delay-1" aria-label="Frequently Asked Questions">
            <FaqAccordion
              title="Frequently Asked Questions About Weekly Study Planning"
              items={WEEKLY_PLANNER_FAQS}
            />
          </section>

          {/* Bottom CTAs */}
          <div className="subpage-bottom-cta-card">
            <a 
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="tools-cta-primary-btn"
              aria-label="Get LifeTrack Pro Free on Play Store - Android Study App"
            >
              <PlayStoreIcon size={18} />
              <span>Get LifeTrack Pro Free on Play Store</span>
              <span className="tools-cta-arrow" aria-hidden="true">→</span>
            </a>
            <div className="tools-cta-secondary-grid">
              <Link href="/tools" className="tools-cta-secondary-btn" aria-label="Explore All Tools">
                <SparklesIcon size={16} />
                <span>Explore All Tools</span>
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