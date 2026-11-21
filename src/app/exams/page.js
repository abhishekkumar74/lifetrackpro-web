import Link from 'next/link';
import { TimerIcon, CardsIcon, HabitFlameIcon, HeadphonesIcon, ChevronRightIcon, CalculatorIcon, SparklesIcon } from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FaqAccordion from '@/components/FaqAccordion';

const EXAMS_FAQS = [
  {
    question: "Which competitive examinations does LifeTrack Pro support?",
    answer: "LifeTrack Pro provides specialized study frameworks for IIT JEE (Main & Advanced), NEET UG & PG, and UPSC Civil Services (CSE). The underlying productivity tools—including SM-2 spaced repetition flashcards, 50/10 Pomodoro timers, habit streak shields, and daily routine builders—adapt seamlessly to any rigorous competitive examination."
  },
  {
    question: "How do exam-specific Pomodoro timers differ from standard 25-minute timers?",
    answer: "Standard 25-minute timers prematurely break concentration during deep analytical work. LifeTrack Pro provides calibrated 50-minute blocks for NEET numericals and 90-minute blocks for IIT JEE advanced problem solving, conditioning your cognitive stamina to match actual 3-hour examination shifts."
  },
  {
    question: "Can I use LifeTrack Pro tools for college semesters and state PSCs?",
    answer: "Yes. In addition to national entrance exams, our Study Timetable Generator and Daily Routine Generator support college semester schedules, technical placement preparation (DSA and core engineering subjects), and state public service commission examinations."
  }
];

export const metadata = {
  title: {
    absolute: 'Competitive Exam Study Planners | LifeTrack Pro',
  },
  description: 'Explore competitive exam study planners for IIT JEE, NEET UG and UPSC CSE. Access Pomodoro timers, SM-2 flashcards and daily revision timetables. Plan today.',
  alternates: {
    canonical: 'https://lifetrackpro.in/exams',
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
    title: 'Competitive Exam Study Planners | LifeTrack Pro',
    description: 'Explore competitive exam study planners for IIT JEE, NEET UG and UPSC CSE. Access Pomodoro timers, SM-2 flashcards and daily revision timetables. Plan today.',
    url: 'https://lifetrackpro.in/exams',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-exams.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro Competitive Exam Study Planners Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Competitive Exam Study Planners | LifeTrack Pro',
    description: 'Explore competitive exam study planners for IIT JEE, NEET UG and UPSC CSE. Access Pomodoro timers, SM-2 flashcards and daily revision timetables. Plan today.',
    images: ['https://lifetrackpro.in/og/og-exams.png'],
    creator: '@LifeTrackPro',
  },
};

export default function ExamsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#softwareapplication",
        "name": "LifeTrack Pro - Competitive Exam Study Platform",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/exams",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/exams#webpage",
        "url": "https://lifetrackpro.in/exams",
        "name": "Competitive Exam Study Planners & Timetables | LifeTrack Pro",
        "description": "Explore competitive exam study planners for IIT JEE, NEET UG & UPSC CSE. Specialized Pomodoro focus timers, SM-2 formula flashcards & daily revision timetables.",
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
          { "@type": "ListItem", "position": 2, "name": "Exams", "item": "https://lifetrackpro.in/exams" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": EXAMS_FAQS.map((faq) => ({
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

  const examTracks = [
    {
      title: 'IIT JEE Study Planner & Formula Recall',
      slug: '/exams/jee',
      badge: 'Engineering Entrance',
      badgeColor: '#2563EB',
      desc: 'Calibrated for JEE Main and Advanced aspirants. Master multi-concept physics numericals, calculus derivations, and formula retention with 90-minute exam simulation blocks and SM-2 flashcard queues.',
      cta: 'Explore JEE Planner →',
      stats: '90m Focus Blocks • SM-2 Formulas • Streak Shields',
    },
    {
      title: 'NEET Study Tracker & NCERT Flashcards',
      slug: '/exams/neet',
      badge: 'Medical Entrance',
      badgeColor: '#059669',
      desc: 'Engineered for NEET UG medical aspirants aiming for 360/360 in Biology. Pair line-by-line NCERT active recall flashcards with 50-minute Physics problem-solving sprints and 12-hour daily timetable architecture.',
      cta: 'Explore NEET Tracker →',
      stats: 'NCERT Flashcards • 50/10 Sprints • Biology Recall',
    },
    {
      title: 'UPSC Study Planner & Mains Timer',
      slug: '/exams/upsc',
      badge: 'Civil Services Examination',
      badgeColor: '#D97706',
      desc: 'Built for Civil Services aspirants tackling Prelims and Mains. Features strict 7-minute (10-marker) and 11-minute (15-marker) answer writing countdown stopwatches, Constitutional Articles recall, and daily current affairs streaks.',
      cta: 'Explore UPSC OS →',
      stats: '7m & 11m Stopwatches • Articles Recall • GS Roadmaps',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container" style={{ padding: '40px 20px' }}>
        <div>
          {/* Visual Semantic Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Exams</span>
          </nav>

          <div className="reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
            <div className="section-eyebrow">Academic Preparation Systems</div>
            <h1 className="section-h2" style={{ marginBottom: '14px' }}>
              Competitive Exam Study Planners &amp; Timetables
            </h1>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              High-stakes competitive exam study planners designed specifically for Indian students. Whether solving complex calculus derivations for IIT JEE, retaining thousands of NCERT biology definitions for NEET UG, or pacing daily answer writing for UPSC Mains, LifeTrack Pro delivers purpose-built study operating systems.
            </p>
          </div>

          {/* Exam Cards Grid */}
          <div className="features-grid" style={{ marginTop: '0', marginBottom: '36px' }}>
            {examTracks.map((exam, i) => (
              <Card key={i} className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0 h-full">
                <CardHeader style={{ padding: '20px 20px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <Badge variant="secondary" style={{ fontSize: '10px', color: exam.badgeColor, backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                      {exam.badge}
                    </Badge>
                  </div>
                  <CardTitle as="h2" style={{ fontSize: '16px', margin: '0 0 6px', color: '#0F172A' }}>
                    {exam.title}
                  </CardTitle>
                  <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                    {exam.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent style={{ padding: '0 20px 12px' }}>
                  <div style={{ fontSize: '10.5px', fontWeight: 650, color: 'var(--primary)', background: 'var(--primary-soft)', padding: '6px 10px', borderRadius: '6px' }}>
                    {exam.stats}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '12px 20px 16px' }}>
                  <Link href={exam.slug} style={{ fontSize: '12px', fontWeight: 750, color: 'var(--primary)', textDecoration: 'none' }}>
                    {exam.cta}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Connected Preparation Tools */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Integrated Study Utilities for Exam Candidates
            </h2>
            <p className="content-card-p">
              Every competitive exam strategy requires accurate time estimation and structured daily discipline. Pair your exam syllabus with our free interactive study utilities:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              <Link href="/tools/study-timetable-generator" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--primary)', marginBottom: '4px' }}>
                    Timetable Generator
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Hour-by-hour scheduled revision timetables with active recall slots.
                  </p>
                </div>
              </Link>
              <Link href="/tools/daily-routine-generator" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--emerald)', marginBottom: '4px' }}>
                    Daily Routine Maker
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Circadian 24-hour schedule matched to your biological alertness peaks.
                  </p>
                </div>
              </Link>
              <Link href="/tools/study-hours-calculator" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--sky)', marginBottom: '4px' }}>
                    Study Hours Calculator
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Calculate required daily study hours to finish your remaining syllabus.
                  </p>
                </div>
              </Link>
              <Link href="/calculator" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#9333EA', marginBottom: '4px' }}>
                    Distraction Calculator
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Measure time lost to phone notifications and calculate recoverable focus ROI.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* E-E-A-T Editorial Standards Callout */}
          <div className="content-card reveal reveal-delay-1" style={{ borderLeft: '3px solid var(--primary)' }}>
            <h2 className="content-card-h2" style={{ fontSize: '15px' }}>
              Evidence-Based Exam Methodology &amp; Review Standards
            </h2>
            <p className="content-card-p" style={{ fontSize: '12px' }}>
              All LifeTrack Pro exam routines, timer cadences, and memory algorithms are formulated using peer-reviewed cognitive psychology principles (such as Sophie Leroy&apos;s attention residue research, Dr. Gloria Mark&apos;s interruption recovery data, and the SuperMemo SM-2 interval algorithm). Exam-specific templates are continuously refined with feedback from successful aspirants and competitive educators. Learn more on our <Link href="/about" style={{ color: 'var(--primary)', fontWeight: 650 }}>About Page</Link>.
            </p>
          </div>

          {/* Frequently Asked Questions */}
          <div className="content-card reveal" style={{ marginTop: '32px' }}>
            <h2 className="content-card-h2">Frequently Asked Questions: Competitive Exam Preparation</h2>
            <div style={{ marginTop: '16px' }}>
              <FaqAccordion items={EXAMS_FAQS} />
            </div>
          </div>

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
              <Link href="/tools" className="tools-cta-secondary-btn" aria-label="Explore Free Tools">
                <TimerIcon size={16} />
                <span>Explore Free Tools</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
