import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  HeadphonesIcon, 
  TargetIcon, 
  ChartIcon,
  CalculatorIcon,
  HelpCircleIcon
} from '@/components/Icons';

export const metadata = {
  title: {
    absolute: 'Student Productivity Tools and Features | LifeTrack Pro',
  },
  description: 'Explore science-backed student productivity tools: 50/10 Pomodoro timer, SM-2 spaced repetition, habit streak shields and live study rooms. Try them free now.',
  alternates: {
    canonical: 'https://lifetrackpro.in/features',
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
    title: 'Student Productivity Tools and Features | LifeTrack Pro',
    description: 'Explore science-backed student productivity tools: 50/10 Pomodoro timer, SM-2 spaced repetition, habit streak shields and live study rooms. Try them free now.',
    url: 'https://lifetrackpro.in/features',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-features.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro Science-Backed Student Productivity Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Productivity Tools and Features | LifeTrack Pro',
    description: 'Explore science-backed student productivity tools: 50/10 Pomodoro timer, SM-2 spaced repetition, habit streak shields and live study rooms. Try them free now.',
    images: ['https://lifetrackpro.in/og/og-features.png'],
    creator: '@LifeTrackPro',
  },
};

export default function FeaturesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#softwareapplication",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/features",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/features#webpage",
        "url": "https://lifetrackpro.in/features",
        "name": "Student Productivity Tools & Features",
        "description": "Comprehensive feature ecosystem for student productivity: Pomodoro focus timer, SM-2 spaced repetition, daily habit streaks, and live study rooms.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "name": "LifeTrack Pro",
          "url": "https://lifetrackpro.in"
        },
        "hasPart": [
          {
            "@type": "WebPage",
            "name": "Smart Pomodoro Focus Timer",
            "url": "https://lifetrackpro.in/features/pomodoro-timer",
            "description": "Custom Pomodoro focus timer with binaural audio soundscapes."
          },
          {
            "@type": "WebPage",
            "name": "SM-2 Spaced Repetition Flashcards",
            "url": "https://lifetrackpro.in/features/spaced-repetition",
            "description": "Active recall flashcards powered by the SuperMemo SM-2 algorithm."
          },
          {
            "@type": "WebPage",
            "name": "Habit Streak Tracker & Shields",
            "url": "https://lifetrackpro.in/features/habit-tracker",
            "description": "Daily habit streaks with automated streak freeze shield protection."
          },
          {
            "@type": "WebPage",
            "name": "24/7 Virtual Study Rooms",
            "url": "https://lifetrackpro.in/features/study-rooms",
            "description": "Silent multiplayer focus rooms with synchronous Pomodoro intervals."
          },
          {
            "@type": "WebPage",
            "name": "Study Time & Retention ROI Calculator",
            "url": "https://lifetrackpro.in/calculator",
            "description": "Interactive study time savings and active recall retention calculator."
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://lifetrackpro.in/features#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://lifetrackpro.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Features",
            "item": "https://lifetrackpro.in/features"
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

      <div className="container" style={{ padding: '40px 20px' }}>
        {/* Visual Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '16px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Features</span>
        </nav>

        <div className="reveal" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
          <div className="section-eyebrow">Product Ecosystem</div>
          <h1 className="section-h2" style={{ marginBottom: '14px' }}>
            Science-Backed Student Productivity Tools
          </h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Explore dedicated student productivity tools designed to eliminate app fragmentation. LifeTrack Pro unites scientific deep work timers, SM-2 spaced repetition, and silent study accountability in one unified system.
          </p>
        </div>

        <div className="features-grid" style={{ marginTop: '0' }}>
          {/* Card 1: Pomodoro Focus Timer */}
          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '20px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div className="feat-icon-box" style={{ margin: 0 }}><TimerIcon size={18} style={{ color: 'var(--primary)' }} /></div>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>25/5 &amp; 50/10</Badge>
              </div>
              <CardTitle as="h2" style={{ fontSize: '16px', margin: '0 0 6px' }}>Smart Pomodoro Focus Timer</CardTitle>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                Custom work and break intervals (25/5 or 50/10) with ambient audio soundscapes (alpha tones, lo-fi, café, rain). Tracks focus sessions in the background even with your phone screen locked.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '12px 20px 16px' }}>
              <Link href="/features/pomodoro-timer" className="feat-link" style={{ margin: 0 }} aria-label="Explore Focus Timer - Smart Pomodoro Technique">
                Explore Focus Timer →
              </Link>
            </CardFooter>
          </Card>

          {/* Card 2: SM-2 Spaced Repetition */}
          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '20px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div className="feat-icon-box" style={{ margin: 0 }}><CardsIcon size={18} style={{ color: 'var(--emerald)' }} /></div>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>SuperMemo SM-2</Badge>
              </div>
              <CardTitle as="h2" style={{ fontSize: '16px', margin: '0 0 6px' }}>SM-2 Spaced Repetition Flashcards</CardTitle>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                Active recall flashcard engine powered by the scientific SuperMemo SM-2 algorithm. Automatically schedules card reviews right before memory decay to lock in formulas and key concepts.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '12px 20px 16px' }}>
              <Link href="/features/spaced-repetition" className="feat-link" style={{ margin: 0 }} aria-label="Explore Spaced Repetition - SM-2 Flashcards">
                Explore Spaced Repetition →
              </Link>
            </CardFooter>
          </Card>

          {/* Card 3: Habit Streak Shields */}
          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '20px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div className="feat-icon-box" style={{ margin: 0 }}><HabitFlameIcon size={18} style={{ color: 'var(--amber)' }} /></div>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Freeze Shields</Badge>
              </div>
              <CardTitle as="h2" style={{ fontSize: '16px', margin: '0 0 6px' }}>Habit Streak Shields &amp; Routines</CardTitle>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                Build non-negotiable daily study habits with automated streak freeze shields. Protect your long-term consistency when unexpected illness or travel interrupts your study schedule.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '12px 20px 16px' }}>
              <Link href="/features/habit-tracker" className="feat-link" style={{ margin: 0 }} aria-label="Explore Habit Tracker - Habit Streaks">
                Explore Habit Tracker →
              </Link>
            </CardFooter>
          </Card>

          {/* Card 4: Virtual Study Rooms */}
          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '20px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div className="feat-icon-box" style={{ margin: 0 }}><HeadphonesIcon size={18} style={{ color: 'var(--rose)' }} /></div>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Multiplayer 24/7</Badge>
              </div>
              <CardTitle as="h2" style={{ fontSize: '16px', margin: '0 0 6px' }}>Live 24/7 Virtual Study Rooms</CardTitle>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                Join silent multiplayer focus rooms with real-time peer presence and synchronous Pomodoro cycles. Study alongside thousands of dedicated competitive exam aspirants across India.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '12px 20px 16px' }}>
              <Link href="/features/study-rooms" className="feat-link" style={{ margin: 0 }} aria-label="Explore Live Study Rooms - Virtual Focus Rooms">
                Explore Live Study Rooms →
              </Link>
            </CardFooter>
          </Card>

          {/* Card 5: Target Exam Syllabi */}
          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '20px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div className="feat-icon-box" style={{ margin: 0 }}><TargetIcon size={18} style={{ color: '#9333EA' }} /></div>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>JEE • NEET • UPSC</Badge>
              </div>
              <CardTitle as="h2" style={{ fontSize: '16px', margin: '0 0 6px' }}>Target Exam Syllabus Planners</CardTitle>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                Set exam milestone dates for IIT JEE, NEET UG, and UPSC CSE. Animated syllabus completion rings and daily chapter quotas keep your preparation on track for exam day.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100" style={{ padding: '12px 20px 16px' }}>
              <Link href="/exams/jee" className="feat-link" style={{ margin: 0 }} aria-label="Explore Exam Planners - Target Exam Syllabi">
                Explore Exam Planners →
              </Link>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '11px' }}>
                <Link href="/exams/neet" style={{ color: 'var(--text-2)', fontWeight: 600, textDecoration: 'none', background: '#F1F5F9', padding: '2px 7px', borderRadius: '4px' }}>NEET</Link>
                <Link href="/exams/jee" style={{ color: 'var(--text-2)', fontWeight: 600, textDecoration: 'none', background: '#F1F5F9', padding: '2px 7px', borderRadius: '4px' }}>JEE</Link>
                <Link href="/exams/upsc" style={{ color: 'var(--text-2)', fontWeight: 600, textDecoration: 'none', background: '#F1F5F9', padding: '2px 7px', borderRadius: '4px' }}>UPSC</Link>
              </div>
            </CardFooter>
          </Card>

          {/* Card 6: Productivity Analytics & ROI */}
          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '20px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div className="feat-icon-box" style={{ margin: 0 }}><ChartIcon size={18} style={{ color: 'var(--sky)' }} /></div>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Heatmap Metrics</Badge>
              </div>
              <CardTitle as="h2" style={{ fontSize: '16px', margin: '0 0 6px' }}>Productivity Analytics &amp; ROI</CardTitle>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                Visualize your daily consistency with GitHub-style study heatmaps and subject distribution charts. Measure your annual focus hour gains and memory retention improvement.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '12px 20px 16px' }}>
              <Link href="/calculator" className="feat-link" style={{ margin: 0 }} aria-label="Calculate Study ROI - Productivity Analytics">
                Calculate Study ROI →
              </Link>
            </CardFooter>
          </Card>

          {/* Card 7: Free Online Study Tools */}
          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '20px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div className="feat-icon-box" style={{ margin: 0 }}><CalculatorIcon size={18} style={{ color: 'var(--primary)' }} /></div>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Free Web Tools</Badge>
              </div>
              <CardTitle as="h2" style={{ fontSize: '16px', margin: '0 0 6px' }}>Free Online Study Tools &amp; Schedulers</CardTitle>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                Instant web utilities: study timetable generator, 24-hour daily routine builder, study hours calculator, focus time meter &amp; weekly 7-day schedule maker. 100% free with no login required.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100" style={{ padding: '12px 20px 16px' }}>
              <Link href="/tools" className="feat-link" style={{ margin: 0 }} aria-label="Explore All Free Tools - Online Study Schedulers">
                Explore All Free Tools →
              </Link>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '11px' }}>
                <Link href="/tools/study-timetable-generator" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', background: '#F1F5F9', padding: '2px 7px', borderRadius: '4px' }}>Timetable</Link>
                <Link href="/tools/daily-routine-generator" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', background: '#F1F5F9', padding: '2px 7px', borderRadius: '4px' }}>Routine</Link>
                <Link href="/tools/study-hours-calculator" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', background: '#F1F5F9', padding: '2px 7px', borderRadius: '4px' }}>Hours</Link>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Contextual Section: Calculator and FAQ Deep Links */}
        <Card className="features-roi-banner">
          <div className="cta-banner-content">
            <div style={{ maxWidth: '640px', minWidth: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px' }} aria-hidden="true">📊</span>
                <Badge variant="secondary" style={{ backgroundColor: 'rgba(238, 242, 255, 0.9)', color: '#4338CA', borderColor: '#E0E7FF', fontSize: '10.5px' }}>
                  STUDY ROI ENGINE
                </Badge>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 850, color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                Measure Your Daily Focus &amp; Retention Gains
              </h2>
              <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Use our interactive study calculator to model how structured Pomodoro blocks and SM-2 spaced repetition save up to 450+ hours of wasted revision annually.
              </p>
            </div>

            <div className="features-cta-button-group">
              <Link 
                href="/calculator" 
                className="features-cta-btn-primary"
                aria-label="Launch ROI Calculator - Focus Recovery"
              >
                <ChartIcon size={16} />
                <span>Launch ROI Calculator</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </Link>

              <div className="features-cta-subgroup">
                <Link 
                  href="/tools" 
                  className="features-cta-btn-secondary"
                  aria-label="Free Study Tools - Browse Online Schedulers"
                >
                  <CalculatorIcon size={15} />
                  <span>Free Tools</span>
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
      </div>
    </>
  );
}
