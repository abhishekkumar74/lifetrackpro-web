import Link from 'next/link';
import FocusTimeCalculator from '@/components/tools/FocusTimeCalculator';
import RelatedAppFeatures from '@/components/tools/RelatedAppFeatures';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TimerIcon, 
  CardsIcon, 
  HeadphonesIcon, 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

const FOCUS_TIME_FAQS = [
  {
    question: "What is 'attention residue' in study productivity?",
    answer: "Attention residue is a cognitive phenomenon discovered by Dr. Sophie Leroy. When you switch from study to checking a phone notification, a portion of your cognitive working memory remains stuck on the distraction for up to 20 minutes, reducing problem-solving speed and comprehension."
  },
  {
    question: "How many hours of true deep work can a student sustain daily?",
    answer: "Scientific research indicates that elite performers sustain roughly 4 to 6 hours of true high-cognitive deep work daily. Beyond 6 hours, cognitive returns drop sharply unless interspersed with structured active recovery breaks."
  },
  {
    question: "Why is a 50/10 Pomodoro cadence better than 25/5 for competitive exams?",
    answer: "25-minute Pomodoro cycles are often too short for complex multi-step physics, math, or legal synthesis problems. 50-minute blocks provide enough uninterrupted runway to enter psychological 'flow state' while the 10-minute break ensures neural recovery."
  }
];

export const metadata = {
  title: 'Focus Time Calculator: Deep Work & Pomodoro',
  description: 'Free focus time calculator. Measure net deep work focus hours versus attention residue lost to distractions, and find your optimal 50/10 Pomodoro blocks. Free.',
  keywords: [
    'focus time calculator',
    'deep work calculator',
    'study efficiency calculator',
    'pomodoro block calculator',
    'attention residue calculator',
    'net study focus calculator',
    'how much deep work per day',
    'lifetrack pro focus calculator'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/tools/focus-time-calculator',
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
    title: 'Focus Time Calculator: Deep Work & Pomodoro | LifeTrack Pro',
    description: 'Measure your net deep work focus hours versus attention residue lost to phone distractions. Find your optimal 50/10 Pomodoro cadence.',
    url: 'https://lifetrackpro.in/tools/focus-time-calculator',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Free Focus Time Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Time Calculator: Deep Work & Pomodoro | LifeTrack Pro',
    description: 'Calculate your net deep work focus hours and determine your optimal Pomodoro blocks.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function FocusTimeCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#softwareapplication",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/tools/focus-time-calculator",
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
        "@id": "https://lifetrackpro.in/tools/focus-time-calculator#webpage",
        "url": "https://lifetrackpro.in/tools/focus-time-calculator",
        "name": "Focus Time Calculator: Deep Work & Pomodoro",
        "description": "Interactive focus time calculator to measure net deep study hours versus time lost to attention residue and notifications.",
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
          { "@type": "ListItem", "position": 3, "name": "Focus Time Calculator", "item": "https://lifetrackpro.in/tools/focus-time-calculator" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": FOCUS_TIME_FAQS.map((faq) => ({
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
            <span style={{ color: 'var(--rose)', fontWeight: 600 }}>Focus Time Calculator</span>
          </nav>

          <div className="section-eyebrow">Free Online Study Tool</div>
          <h1 className="subpage-h1">Focus Time Calculator: Measure Net Deep Work &amp; Pomodoro Sprints</h1>
          
          <p className="subpage-lead">
            Sitting at a desk for 8 hours does not equal 8 hours of learning. Calculate your true net deep focus hours, quantify time lost to attention residue, and determine your optimal Pomodoro interval structure.
          </p>

          {/* Calculator Widget */}
          <FocusTimeCalculator />

          {/* Attention Residue Science */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              The Hidden Tax of &quot;Quick Phone Checks&quot;
            </h2>
            <p className="content-card-p">
              Students often believe that glancing at a notification or replying to a quick chat message only wastes 30 seconds. In reality, modern cognitive psychology reveals that interruptions carry a massive &quot;attention residue&quot; penalty:
            </p>
            <ul className="content-card-list">
              <li>• <strong>Context Switching Friction:</strong> Every time you shift attention from studying electrostatics to checking social media, your brain must unload the working memory mental model. Re-loading that context takes an average of 15 to 20 minutes.</li>
              <li>• <strong>Superficial Reading Syndrome:</strong> Under frequent interruptions, students unconsciously switch to shallow processing—skimming textbook pages without encoding deep logical connections.</li>
              <li>• <strong>Binaural Soundscape Shielding:</strong> Playing continuous 432Hz alpha wave audio or rain soundscapes creates an acoustic barrier that protects against environmental background noise, as integrated in our <Link href="/features/pomodoro-timer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Pomodoro focus timer</Link>.</li>
            </ul>
          </div>

          {/* STRATEGIC APP CTA PLACEMENT 3: Related LifeTrack Pro Features Section */}
          <RelatedAppFeatures
            source="focus_time_calculator"
            title="Maximize Your Deep Work with LifeTrack Pro Features"
            subtitle="Eliminate attention residue and multi-tool switching with purpose-built deep work tools in LifeTrack Pro:"
          />

          {/* Sibling Tools */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Explore More Free Online Study Tools
            </h2>
            <p className="content-card-p">
              Use our other tools to structure your focus hours into actionable schedules:
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
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>📋</div>
                  <CardTitle style={{ fontSize: '13.5px', color: 'var(--amber)', margin: 0 }}>Weekly Study Planner</CardTitle>
                  <CardDescription style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Balance subjects across a structured 7-day template.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/tools/weekly-study-planner" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber)', textDecoration: 'none' }}>
                    Open Tool →
                  </Link>
                  <Badge variant="secondary" style={{ fontSize: '9.5px' }}>7-Day Matrix</Badge>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <section className="reveal reveal-delay-1" aria-label="Frequently Asked Questions">
            <FaqAccordion
              title="Frequently Asked Questions About Deep Focus Time"
              items={FOCUS_TIME_FAQS}
            />
          </section>

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