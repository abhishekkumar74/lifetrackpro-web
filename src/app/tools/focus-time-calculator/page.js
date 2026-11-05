import Link from 'next/link';
import FocusTimeCalculator from '@/components/tools/FocusTimeCalculator';
import RelatedAppFeatures from '@/components/tools/RelatedAppFeatures';
import { 
  TimerIcon, 
  CardsIcon, 
  HeadphonesIcon, 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

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
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is 'attention residue' in study productivity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Attention residue is a cognitive phenomenon discovered by Dr. Sophie Leroy. When you switch from study to checking a phone notification, a portion of your cognitive working memory remains stuck on the distraction for up to 20 minutes, reducing problem-solving speed and comprehension."
            }
          },
          {
            "@type": "Question",
            "name": "How many hours of true deep work can a student sustain daily?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Scientific research indicates that elite performers sustain roughly 4 to 6 hours of true high-cognitive deep work daily. Beyond 6 hours, cognitive returns drop sharply unless interspersed with structured active recovery breaks."
            }
          },
          {
            "@type": "Question",
            "name": "Why is a 50/10 Pomodoro cadence better than 25/5 for competitive exams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "25-minute Pomodoro cycles are often too short for complex multi-step physics, math, or legal synthesis problems. 50-minute blocks provide enough uninterrupted runway to enter psychological 'flow state' while the 10-minute break ensures neural recovery."
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

              <Link href="/tools/weekly-study-planner" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '10px 12px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ fontSize: '12.5px', color: 'var(--amber)' }}>Weekly Study Planner →</strong>
                  <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0' }}>Balance subjects across a structured 7-day template.</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Frequently Asked Questions About Deep Focus Time
            </h2>

            <div className="content-card-faq" style={{ marginTop: '14px' }}>
              <h3 className="content-card-faq-h3">
                What is &apos;attention residue&apos; in study productivity?
              </h3>
              <p className="content-card-p" style={{ marginBottom: 0 }}>
                Attention residue is a cognitive phenomenon discovered by Dr. Sophie Leroy. When you switch from study to checking a phone notification, a portion of your cognitive working memory remains stuck on the distraction for up to 20 minutes, reducing problem-solving speed and comprehension.
              </p>
            </div>

            <div className="content-card-faq">
              <h3 className="content-card-faq-h3">
                How many hours of true deep work can a student sustain daily?
              </h3>
              <p className="content-card-p" style={{ marginBottom: 0 }}>
                Scientific research indicates that elite performers sustain roughly 4 to 6 hours of true high-cognitive deep work daily. Beyond 6 hours, cognitive returns drop sharply unless interspersed with structured active recovery breaks.
              </p>
            </div>

            <div className="content-card-faq">
              <h3 className="content-card-faq-h3">
                Why is a 50/10 Pomodoro cadence better than 25/5 for competitive exams?
              </h3>
              <p className="content-card-p" style={{ marginBottom: 0 }}>
                25-minute Pomodoro cycles are often too short for complex multi-step physics, math, or legal synthesis problems. 50-minute blocks provide enough uninterrupted runway to enter psychological &apos;flow state&apos; while the 10-minute break ensures neural recovery.
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