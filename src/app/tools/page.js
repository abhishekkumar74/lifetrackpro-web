import Link from 'next/link';
import { 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  HeadphonesIcon, 
  CalculatorIcon, 
  SparklesIcon, 
  TargetIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

export const metadata = {
  title: 'Free Online Study Tools & Planners',
  description: 'Free online study tools for students. Study timetable generator, daily routine maker, study hours calculator, deep focus time planner & weekly schedule maker.',
  keywords: [
    'free study tools',
    'study timetable generator',
    'daily routine generator for students',
    'study hours calculator',
    'focus time calculator',
    'weekly study planner online',
    'student schedule maker',
    'exam revision tools free',
    'lifetrack pro tools'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/tools',
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
    title: 'Free Online Study Tools & Planners | LifeTrack Pro',
    description: 'Free online study tools for students: timetable generator, daily routine planner, study hours calculator, focus time meter & weekly schedule builder.',
    url: 'https://lifetrackpro.in/tools',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Free Online Study Tools Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Study Tools & Planners | LifeTrack Pro',
    description: 'Plan your studies with free online timetable generators, study hours calculators, and deep focus time estimators.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function ToolsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#softwareapplication",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/tools",
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
        "@id": "https://lifetrackpro.in/tools#webpage",
        "url": "https://lifetrackpro.in/tools",
        "name": "Free Online Study Tools & Planners",
        "description": "Collection of free online academic productivity tools: study timetable generator, daily routine builder, study hours calculator, and focus time planner.",
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
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://lifetrackpro.in/tools" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are these study tools free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all LifeTrack Pro web tools—including the Study Timetable Generator, Daily Routine Planner, and Study Hours Calculator—are 100% free with no login or registration required."
            }
          },
          {
            "@type": "Question",
            "name": "Can I save or export my generated study timetable?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, every tool includes an instant one-click 'Copy to Clipboard' feature so you can paste your daily timetable or routine into your notes, calendar, or print it out."
            }
          },
          {
            "@type": "Question",
            "name": "How does LifeTrack Pro help beyond web tools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The free LifeTrack Pro Android mobile app provides an offline-first execution environment: 50/10 Pomodoro timers with 432Hz soundscapes, SM-2 spaced repetition flashcards, habit streak freeze shields, and 24/7 virtual study rooms."
            }
          }
        ]
      }
    ]
  };

  const toolsList = [
    {
      title: 'Study Timetable Generator',
      slug: '/tools/study-timetable-generator',
      badge: 'Interactive Maker',
      desc: 'Build hour-by-hour scheduled revision timetables for IIT JEE, NEET UG, UPSC CSE, or College with active recall slots and 50/10 Pomodoro sprints.',
      cta: 'Generate Timetable →',
      icon: <TimerIcon size={20} style={{ color: 'var(--primary)' }} />,
      bg: 'rgba(37, 99, 235, 0.08)'
    },
    {
      title: 'Daily Routine Generator',
      slug: '/tools/daily-routine-generator',
      badge: 'Circadian Planner',
      desc: 'Generate a 24-hour daily schedule matched to your circadian biological alertness peaks. Supports full-time self-study, school, and college students.',
      cta: 'Build Daily Routine →',
      icon: <HabitFlameIcon size={20} style={{ color: 'var(--emerald)' }} />,
      bg: 'rgba(5, 150, 105, 0.08)'
    },
    {
      title: 'Study Hours Calculator',
      slug: '/tools/study-hours-calculator',
      badge: 'Syllabus Planner',
      desc: 'Calculate the exact daily study hours needed to complete remaining chapters, past papers, and 2x or 3x revision cycles before exam day.',
      cta: 'Calculate Study Hours →',
      icon: <CalculatorIcon size={20} style={{ color: 'var(--sky)' }} />,
      bg: 'rgba(2, 132, 199, 0.08)'
    },
    {
      title: 'Focus Time Calculator',
      slug: '/tools/focus-time-calculator',
      badge: 'Attention Metric',
      desc: 'Measure your net deep work focus hours versus time silently lost to notification distractions and attention residue from phone interruptions.',
      cta: 'Calculate Net Focus →',
      icon: <HeadphonesIcon size={20} style={{ color: 'var(--rose)' }} />,
      bg: 'rgba(225, 29, 72, 0.08)'
    },
    {
      title: 'Weekly Study Planner',
      slug: '/tools/weekly-study-planner',
      badge: '7-Day Blueprint',
      desc: 'Organize your entire week across multiple subjects. Balance weekday problem sprints, backlog clearance, and Sunday mock test error analysis.',
      cta: 'Plan Your Week →',
      icon: <CardsIcon size={20} style={{ color: 'var(--amber)' }} />,
      bg: 'rgba(217, 119, 6, 0.08)'
    },
    {
      title: 'Study Time & Learning ROI Calculator',
      slug: '/calculator',
      badge: 'Efficiency Model',
      desc: 'Estimate the annual study hours saved by eliminating app distraction fatigue and replacing fragmented tools with LifeTrack Pro unified OS.',
      cta: 'Calculate ROI Hours →',
      icon: <TargetIcon size={20} style={{ color: '#9333EA' }} />,
      bg: 'rgba(147, 51, 234, 0.08)'
    }
  ];

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
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Tools</span>
          </nav>

          <div className="section-eyebrow">Academic Productivity Suite</div>
          <h1 className="subpage-h1">Free Online Study Tools &amp; Productivity Planners</h1>
          
          <p className="subpage-lead">
            Eliminate exam anxiety with scientific study planning. Use our free interactive timetable generators, daily routine makers, and focus calculators to build a bulletproof study schedule.
          </p>

          {/* Tools Grid */}
          <div className="features-grid" style={{ marginTop: '24px' }}>
            {toolsList.map((tool) => (
              <div 
                key={tool.slug} 
                className="feat-card reveal" 
                style={{ '--feat-bg': tool.bg }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div className="feat-icon-box">{tool.icon}</div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px', background: 'var(--bg-cream)', color: 'var(--text-2)', border: '1px solid var(--border-subtle)' }}>
                    {tool.badge}
                  </span>
                </div>
                <h2 className="feat-title" style={{ fontSize: '16px' }}>{tool.title}</h2>
                <p className="feat-desc">{tool.desc}</p>
                <Link href={tool.slug} className="feat-link" aria-label={`Open ${tool.title}`}>
                  {tool.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Why Scientific Study Planning Works */}
          <div className="content-card reveal" style={{ marginTop: '32px' }}>
            <h2 className="content-card-h2">
              Why Scientific Study Planning Beats Chaotic Cramming
            </h2>
            <p className="content-card-p">
              Most students fail to stick to their study schedules not because of weak willpower, but because they design unrealistic timetables. Traditional schedules pack 12 hours of uninterrupted reading without accounting for cognitive fatigue, circadian energy drops, or memory decay.
            </p>
            <p className="content-card-p">
              LifeTrack Pro study tools are engineered around three cognitive principles:
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>Ultradian Focus Rhythm:</strong> Concentrating in 50-minute or 90-minute sprints matches natural human neural stamina, followed by short 10-minute active recovery breaks.</li>
              <li>✓ <strong>SM-2 Active Recall Scheduling:</strong> Reviewing difficult formulas and concepts right before the forgetting curve sets in converts short-term cramming into permanent memory.</li>
              <li>✓ <strong>Habit Streak Protection:</strong> Structuring non-negotiable daily habits with streak freeze shields ensures that one bad day doesn&apos;t destroy weeks of study momentum.</li>
            </ul>
          </div>

          {/* Dedicated Exam Preparation Frameworks */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Tailored Frameworks for Major Competitive Exams
            </h2>
            <p className="content-card-p">
              Preparing for a specific national competitive examination? Explore our dedicated exam blueprints:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '14px' }}>
              <Link href="/exams/jee" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    IIT JEE Main &amp; Advanced
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    90-minute problem solving simulation blocks, Physics formula decks, and mock error tracking.
                  </p>
                </div>
              </Link>

              <Link href="/exams/neet" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    NEET Medical (UG &amp; PG)
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    NCERT Biology line-by-line active recall flashcards and 50-minute Physics problem sprints.
                  </p>
                </div>
              </Link>

              <Link href="/exams/upsc" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--amber)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    UPSC Civil Services (CSE)
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Strict 7-min (10-marker) &amp; 11-min (15-marker) Mains answer writing stopwatches and Polity recall.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Frequently Asked Questions About Online Study Tools
            </h2>

            <div className="content-card-faq" style={{ marginTop: '14px' }}>
              <h3 className="content-card-faq-h3">
                Are these study tools free to use?
              </h3>
              <p className="content-card-p" style={{ marginBottom: 0 }}>
                Yes, all LifeTrack Pro web tools—including the Study Timetable Generator, Daily Routine Planner, and Study Hours Calculator—are 100% free with no login or registration required.
              </p>
            </div>

            <div className="content-card-faq">
              <h3 className="content-card-faq-h3">
                Can I save or export my generated study timetable?
              </h3>
              <p className="content-card-p" style={{ marginBottom: 0 }}>
                Yes, every tool includes an instant one-click &apos;Copy to Clipboard&apos; feature so you can paste your daily timetable or routine into your notes, calendar, or print it out.
              </p>
            </div>

            <div className="content-card-faq">
              <h3 className="content-card-faq-h3">
                How does LifeTrack Pro help beyond web tools?
              </h3>
              <p className="content-card-p" style={{ marginBottom: 0 }}>
                The free LifeTrack Pro Android mobile app provides an offline-first execution environment: 50/10 Pomodoro timers with 432Hz soundscapes, SM-2 spaced repetition flashcards, habit streak freeze shields, and 24/7 virtual study rooms.
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
            <Link href="/features" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon size={16} />
              <span>Explore All Features</span>
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