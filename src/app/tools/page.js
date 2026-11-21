import Link from 'next/link';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

const TOOLS_FAQS = [
  {
    question: "Are these study tools free to use?",
    answer: "Yes, all LifeTrack Pro web tools—including the Study Timetable Generator, Daily Routine Planner, and Study Hours Calculator—are 100% free with no login or registration required."
  },
  {
    question: "Can I save or export my generated study timetable?",
    answer: "Yes, every tool includes an instant one-click 'Copy to Clipboard' feature so you can paste your daily timetable or routine into your notes, calendar, or print it out."
  },
  {
    question: "How does LifeTrack Pro help beyond web tools?",
    answer: "The free LifeTrack Pro Android mobile app provides an offline-first execution environment: 50/10 Pomodoro timers with ambient soundscapes, SM-2 spaced repetition flashcards, habit streak freeze shields, and 24/7 virtual study rooms."
  }
];

export const metadata = {
  title: {
    absolute: 'Free Study Tools Online & Planners | LifeTrack Pro',
  },
  description: 'Access free study tools online: timetable generator, daily routine maker, study hours calculator, focus timer & 7-day planner. No sign-up needed. Plan now.',
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
    title: 'Free Study Tools Online & Planners | LifeTrack Pro',
    description: 'Access free study tools online: timetable generator, daily routine maker, study hours calculator, focus timer & 7-day planner. No sign-up needed. Plan now.',
    url: 'https://lifetrackpro.in/tools',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-tools.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro Free Online Study Tools Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Study Tools Online & Planners | LifeTrack Pro',
    description: 'Access free study tools online: timetable generator, daily routine maker, study hours calculator, focus timer & 7-day planner. No sign-up needed. Plan now.',
    images: ['https://lifetrackpro.in/og/og-tools.png'],
    creator: '@LifeTrackPro',
  },
};

export default function ToolsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://lifetrackpro.in/tools#webapp",
        "name": "LifeTrack Pro Free Study Tools Suite",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/tools",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
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
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://lifetrackpro.in/tools" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": TOOLS_FAQS.map((faq) => ({
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

      <article className="container" style={{ padding: '40px 20px' }}>
        <div>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Tools</span>
          </nav>

          <div className="reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
            <div className="section-eyebrow">Academic Productivity Suite</div>
            <h1 className="section-h2" style={{ marginBottom: '14px' }}>
              Free Study Tools Online &amp; Academic Planners
            </h1>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Access free study tools online to eliminate exam anxiety with scientific study planning. Use our free interactive timetable generators, daily routine makers, and focus calculators to build a bulletproof study schedule.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="features-grid" style={{ marginTop: '0' }}>
            {toolsList.map((tool) => (
              <Card
                key={tool.slug}
                className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0 h-full"
              >
                <CardHeader style={{ padding: '20px 20px 10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div className="feat-icon-box" style={{ margin: 0 }}>{tool.icon}</div>
                    <Badge variant="secondary" style={{ fontSize: '10px' }}>
                      {tool.badge}
                    </Badge>
                  </div>
                  <CardTitle as="h2" style={{ fontSize: '16px', margin: '0 0 6px' }}>{tool.title}</CardTitle>
                  <CardDescription style={{ fontSize: '12.5px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                    {tool.desc}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '12px 20px 16px' }}>
                  <Link href={tool.slug} className="feat-link" style={{ margin: 0 }} aria-label={`Open ${tool.title}`}>
                    {tool.cta}
                  </Link>
                  <Badge variant="outline" style={{ fontSize: '9.5px', color: '#64748B' }}>
                    Free Utility
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Why Scientific Study Planning Works */}
          <div className="content-card reveal" style={{ marginTop: '40px', padding: '26px 28px', borderRadius: 'var(--radius-lg, 16px)', border: '1.5px solid var(--border-subtle)' }}>
            <h2 className="content-card-h2" style={{ fontSize: '17px', marginBottom: '12px' }}>
              Why Scientific Study Planning Beats Chaotic Cramming
            </h2>
            <p className="content-card-p" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '14px' }}>
              Most students fail to stick to their study schedules not because of weak willpower, but because they design unrealistic timetables. Traditional schedules pack 12 hours of uninterrupted reading without accounting for cognitive fatigue, circadian energy drops, or memory decay.
            </p>
            <p className="content-card-p" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '14px' }}>
              LifeTrack Pro study tools are engineered around three cognitive principles:
            </p>
            <ul className="content-card-list" style={{ fontSize: '13px', gap: '10px' }}>
              <li>✓ <strong>Ultradian Focus Rhythm:</strong> Concentrating in 50-minute or 90-minute sprints matches natural human neural stamina, followed by short 10-minute active recovery breaks.</li>
              <li>✓ <strong>SM-2 Active Recall Scheduling:</strong> Reviewing difficult formulas and concepts right before the forgetting curve sets in converts short-term cramming into permanent memory.</li>
              <li>✓ <strong>Habit Streak Protection:</strong> Structuring non-negotiable daily habits with streak freeze shields ensures that one bad day doesn&apos;t destroy weeks of study momentum.</li>
            </ul>
          </div>

          {/* Dedicated Exam Preparation Frameworks */}
          <div className="content-card reveal reveal-delay-1" style={{ marginTop: '24px', padding: '26px 28px', borderRadius: 'var(--radius-lg, 16px)', border: '1.5px solid var(--border-subtle)' }}>
            <h2 className="content-card-h2" style={{ fontSize: '17px', marginBottom: '8px' }}>
              Tailored Frameworks for Major Competitive Exams
            </h2>
            <p className="content-card-p" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Preparing for a specific national competitive examination? Explore our dedicated exam blueprints:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3.5">
              <Link href="/exams/jee" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '16px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '13.5px', marginBottom: '6px' }}>
                    IIT JEE Main &amp; Advanced
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                    90-minute problem solving simulation blocks, Physics formula decks, and mock error tracking.
                  </p>
                </div>
              </Link>

              <Link href="/exams/neet" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '16px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ color: 'var(--emerald)', fontWeight: 700, fontSize: '13.5px', marginBottom: '6px' }}>
                    NEET Medical (UG &amp; PG)
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                    NCERT Biology line-by-line active recall flashcards and 50-minute Physics problem sprints.
                  </p>
                </div>
              </Link>

              <Link href="/exams/upsc" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '16px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ color: 'var(--amber)', fontWeight: 700, fontSize: '13.5px', marginBottom: '6px' }}>
                    UPSC Civil Services (CSE)
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                    Strict 7-min (10-marker) &amp; 11-min (15-marker) Mains answer writing stopwatches and Polity recall.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <section className="reveal reveal-delay-1" aria-label="Frequently Asked Questions" style={{ marginTop: '36px' }}>
            <FaqAccordion
              title="Frequently Asked Questions About Online Study Tools"
              items={TOOLS_FAQS}
            />
          </section>

          {/* Bottom CTAs */}
          <div className="tools-bottom-cta-card">
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