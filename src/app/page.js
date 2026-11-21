import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeroDownloadCta, BottomDownloadCta } from '@/components/HeroDownloadCta';
import HeroDualPhones from '@/components/HeroDualPhones';
import AppleScrollText from '@/components/AppleScrollText';

const CinematicScrollShowcase = dynamic(() => import('@/components/CinematicScrollShowcase'), {
  loading: () => <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '13px' }}>Loading Interactive Preview...</div>,
});
const InteractiveExamShowcase = dynamic(() => import('@/components/InteractiveExamShowcase'), {
  loading: () => <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '13px' }}>Loading Exam Pathways...</div>,
});

export const metadata = {
  title: {
    absolute: 'All-in-One Study OS and Focus App | LifeTrack Pro',
  },
  description: 'LifeTrack Pro is the student study OS uniting Pomodoro focus, SM-2 flashcards, habit streaks and silent study rooms. Start building deep exam focus for free.',
  alternates: {
    canonical: 'https://lifetrackpro.in',
  },
  openGraph: {
    title: 'All-in-One Study OS and Focus App | LifeTrack Pro',
    description: 'LifeTrack Pro is the student study OS uniting Pomodoro focus, SM-2 flashcards, habit streaks and silent study rooms. Start building deep exam focus for free.',
    url: 'https://lifetrackpro.in',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro - All-in-One Study OS and Productivity App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All-in-One Study OS and Focus App | LifeTrack Pro',
    description: 'LifeTrack Pro is the student study OS uniting Pomodoro focus, SM-2 flashcards, habit streaks and silent study rooms. Start building deep exam focus for free.',
    images: ['https://lifetrackpro.in/og/og-default.png'],
    creator: '@LifeTrackPro',
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "@id": "https://lifetrackpro.in/#app",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "ProductivityApplication",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "description": "All-in-one productivity Life OS combining Pomodoro focus timer with ambient soundscapes, SM-2 active recall flashcards, daily habit streaks with freeze shields, and live study rooms.",
        "image": "https://lifetrackpro.in/og/og-default.png",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "featureList": [
          "Smart Pomodoro Focus Timer with Ambient Soundscapes",
          "SM-2 Based Spaced Repetition Flashcards & Active Recall",
          "Daily Habit Streaks with Protective Streak Freeze Shields",
          "24/7 Silent Multiplayer Virtual Study Rooms",
          "Specialized Exam Trackers for JEE, NEET, and UPSC Aspirants"
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

      {/* ── HERO SECTION ── */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-h1 hero-fade-in hero-fade-in-delay-1">
            <span className="hero-phrase">The All-in-One Study App.</span>{' '}
            <span className="hero-phrase">Smart Focus.</span>{' '}
            <span className="gradient-accent hero-phrase hero-phrase-accent">Effortless Consistency.</span>
          </h1>

          <p className="hero-subtitle hero-fade-in hero-fade-in-delay-2">
            The all in one study app designed for Indian students. Pomodoro focus timers, SM-2 flashcards, habit streak shields, and 24/7 silent study rooms in one distraction-free interface.
          </p>

          {/* Interactive Hero Download CTA opening DownloadModal */}
          <HeroDownloadCta />

          {/* Interactive Dual Phone Showcase with hover swap and slight extra tilt */}
          <HeroDualPhones />

          {/* ── METHODOLOGY & CAPABILITY MARQUEE TICKER (UNIFIED SEAMLESS FLOW) ── */}
          <div className="marquee-box-wrapper" aria-label="LifeTrack Pro Core Capabilities">
            <div className="marquee-container">
              <div className="marquee-content">
                <div className="marquee-item"><span className="marquee-pill">SM-2 RECALL</span> Biology &amp; Organic Chemistry Expanding Revision Schedules</div>
                <div className="marquee-item"><span className="marquee-pill">DEEP WORK</span> 50/10 Pomodoro Cadence with Ambient Soundscapes</div>
                <div className="marquee-item"><span className="marquee-pill">HABIT SHIELD</span> Emergency Streak Freeze Tokens for Rest Days</div>
                <div className="marquee-item"><span className="marquee-pill">EXAM FOCUS</span> 90-Minute JEE &amp; 7-Min UPSC Mains Writing Blocks</div>
                <div className="marquee-item"><span className="marquee-pill">STUDY ROOMS</span> Camera-Free Silent Multiplayer Accountability</div>
                <div className="marquee-item"><span className="marquee-pill">OFFLINE FIRST</span> Offline-Capable Focus with Secure Cloud Sync</div>
                <div className="marquee-item" aria-hidden="true"><span className="marquee-pill">SM-2 RECALL</span> Biology &amp; Organic Chemistry Expanding Revision Schedules</div>
                <div className="marquee-item" aria-hidden="true"><span className="marquee-pill">DEEP WORK</span> 50/10 Pomodoro Cadence with Ambient Soundscapes</div>
                <div className="marquee-item" aria-hidden="true"><span className="marquee-pill">HABIT SHIELD</span> Emergency Streak Freeze Tokens for Rest Days</div>
                <div className="marquee-item" aria-hidden="true"><span className="marquee-pill">EXAM FOCUS</span> 90-Minute JEE &amp; 7-Min UPSC Mains Writing Blocks</div>
                <div className="marquee-item" aria-hidden="true"><span className="marquee-pill">STUDY ROOMS</span> Camera-Free Silent Multiplayer Accountability</div>
                <div className="marquee-item" aria-hidden="true"><span className="marquee-pill">OFFLINE FIRST</span> Offline-Capable Focus with Secure Cloud Sync</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CINEMATIC PRODUCT SHOWCASE (STICKY REAL APP SCREENS & INTERACTIVE SIMULATOR) ── */}
      <CinematicScrollShowcase />

      {/* ── APPLE-STYLE SCROLL ILLUMINATED MANIFESTO & KEY METRICS ── */}
      <AppleScrollText />

      {/* ── TAILORED PREPARATION SYSTEMS (INTERACTIVE EXAM SHOWCASE) ── */}
      <InteractiveExamShowcase />

      {/* ── FREE ONLINE STUDY TOOLS & SCHEDULERS ── */}
      <section className="container" style={{ padding: '60px 20px 20px' }} aria-label="Free Online Study Tools">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 32px' }}>
          <div className="section-eyebrow">Free Web Utilities • No Sign-Up</div>
          <h2 className="section-h2" style={{ marginBottom: '12px' }}>
            Free Online Study Tools &amp; Schedulers
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Instant interactive planning utilities for students: generate daily timetables, calculate study hours needed for your syllabus, and measure deep focus time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '18px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <CardTitle style={{ fontSize: '14px', fontWeight: 750, color: 'var(--primary)', margin: 0 }}>
                  Study Timetable Generator
                </CardTitle>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Interactive</Badge>
              </div>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                Build hour-by-hour revision timetables for JEE, NEET, UPSC &amp; College with 50/10 Pomodoro blocks.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
              <Link href="/tools/study-timetable-generator" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
                Generate Timetable →
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '18px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <CardTitle style={{ fontSize: '14px', fontWeight: 750, color: 'var(--emerald)', margin: 0 }}>
                  Daily Routine Generator
                </CardTitle>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Circadian</Badge>
              </div>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                24-hour daily schedule planner matched to your natural biological energy peaks and rest dips.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
              <Link href="/tools/daily-routine-generator" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--emerald)', textDecoration: 'none' }}>
                Build Daily Routine →
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '18px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <CardTitle style={{ fontSize: '14px', fontWeight: 750, color: 'var(--sky)', margin: 0 }}>
                  Study Hours Calculator
                </CardTitle>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Calculator</Badge>
              </div>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                Calculate daily hours required to finish your syllabus chapters and multiple revision cycles.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
              <Link href="/tools/study-hours-calculator" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--sky)', textDecoration: 'none' }}>
                Calculate Study Hours →
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '18px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <CardTitle style={{ fontSize: '14px', fontWeight: 750, color: 'var(--rose)', margin: 0 }}>
                  Focus Time Calculator
                </CardTitle>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>Attention</Badge>
              </div>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                Quantify net deep work hours versus time lost to phone notifications and attention residue.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
              <Link href="/tools/focus-time-calculator" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--rose)', textDecoration: 'none' }}>
                Calculate Net Focus →
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '18px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <CardTitle style={{ fontSize: '14px', fontWeight: 750, color: 'var(--amber)', margin: 0 }}>
                  Weekly Study Planner
                </CardTitle>
                <Badge variant="secondary" style={{ fontSize: '10px' }}>7-Day Plan</Badge>
              </div>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                Balance multiple subjects across a 7-day template with Sunday mock tests and backlog clearance.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
              <Link href="/tools/weekly-study-planner" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--amber)', textDecoration: 'none' }}>
                Plan Your Week →
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col justify-between rounded-2xl border-indigo-100 bg-gradient-to-br from-indigo-50/60 via-white to-slate-50/80 shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
            <CardHeader style={{ padding: '18px 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <CardTitle style={{ fontSize: '14px', fontWeight: 750, color: 'var(--primary)', margin: 0 }}>
                  All Free Study Tools
                </CardTitle>
                <Badge variant="secondary" style={{ fontSize: '10px', backgroundColor: 'rgba(238, 242, 255, 0.9)', color: '#4338CA' }}>Complete Hub</Badge>
              </div>
              <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                Access the complete hub of free student productivity and exam timetable utilities for competitive aspirants.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
              <Link href="/tools" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
                Explore All Free Tools →
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ── INTEGRATED STUDY TOOLS CLOUD (MATCHES REFERENCE DESIGN) ── */}
      <section className="tools-cloud-section" aria-label="Integrated Study Tools and Frameworks">
        <div className="container">
          <div className="tools-cloud-canvas">
            {/* Soft Ambient Dot Mesh (Matches Reference) */}
            <div className="tools-cloud-dot-mesh" aria-hidden="true" />

            {/* Header Content */}
            <div className="reveal tools-cloud-header">
              <div className="tools-cloud-pill-badge">Works where you study</div>
              <h2 className="tools-cloud-title">All your study tools, unified in one OS.</h2>
              <p className="tools-cloud-desc">
                LifeTrack Pro connects the tools you need to focus, revise, and build discipline — so nothing falls through the cracks.
              </p>
            </div>

            {/* Floating Staggered Pill Badges (Matches Reference Cloud) */}
            <div className="tools-cloud-pills-wrap reveal reveal-delay-1" role="list">
              <Link href="/features/pomodoro-timer" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">⏱️</span>
                <span className="tool-pill-text">Pomodoro Timer</span>
              </Link>

              <Link href="/features/spaced-repetition" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">📇</span>
                <span className="tool-pill-text">SM-2 Flashcards</span>
              </Link>

              <Link href="/features/habit-tracker" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🔥</span>
                <span className="tool-pill-text">Habit Streaks</span>
              </Link>

              <Link href="/features/study-rooms" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🎧</span>
                <span className="tool-pill-text">Live Study Rooms</span>
              </Link>

              <Link href="/exams/jee" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🎯</span>
                <span className="tool-pill-text">JEE Main &amp; Adv</span>
              </Link>

              <Link href="/exams/neet" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🧬</span>
                <span className="tool-pill-text">NEET Medical</span>
              </Link>

              <Link href="/exams/upsc" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">⚖️</span>
                <span className="tool-pill-text">UPSC Answer Timer</span>
              </Link>

              <Link href="/calculator" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🧮</span>
                <span className="tool-pill-text">Focus Calculator</span>
              </Link>

              <Link href="/tools" className="tool-pill-badge" role="listitem">
                <span className="tool-pill-emoji" aria-hidden="true">🛠️</span>
                <span className="tool-pill-text">Free Study Tools</span>
              </Link>

              <Link href="/features" className="tool-pill-badge tool-pill-more" role="listitem">
                <span className="tool-pill-text">20+ More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER (NO PRICING SECTION) ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box reveal">
            <div className="cta-top-badge">
              <span className="cta-top-badge-dot" aria-hidden="true"></span>
              <span>100% FREE LIFE OS • NO SUBSCRIPTION</span>
            </div>
            <h2 className="cta-h2">
              Build Unbreakable Daily Discipline.<br />
              <span className="cta-gradient-accent">Master Your Syllabus Without Burnout.</span>
            </h2>
            <p className="cta-desc">
              Replace scattered timers, flashcard tools, and habit apps with one disciplined Life OS.
            </p>

            {/* Bottom download CTA button that opens DownloadModal */}
            <BottomDownloadCta />
          </div>
        </div>
      </section>
    </>
  );
}
