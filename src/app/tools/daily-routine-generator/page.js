import Link from 'next/link';
import DailyRoutineGenerator from '@/components/tools/DailyRoutineGenerator';
import RelatedAppFeatures from '@/components/tools/RelatedAppFeatures';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  CalculatorIcon, 
  SparklesIcon,
  TargetIcon,
  ChartIcon
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

const DAILY_ROUTINE_FAQS = [
  {
    question: "What is the best daily routine for competitive exam aspirants (JEE / NEET / UPSC)?",
    answer: "The most effective daily routine for competitive aspirants balances 7 to 9 hours of high-cognitive deep work with 7.5 to 8 hours of restorative sleep. It frontloads difficult numerical problems or complex theory into the morning peak alertness window (6:30 AM to 11:30 AM), schedules timed practice drills and answer writing in the late afternoon, and reserves the final 45 minutes of the evening for active recall flashcards."
  },
  {
    question: "How many hours should school and college students study daily?",
    answer: "For school students with 6 hours of daytime classes, 3.5 to 4.5 hours of focused self-study is optimal to complete homework, revise concepts, and avoid burnout. For college students, 4 to 5 hours of evening self-study balances semester coursework with technical placement prep (DSA, system design, or core projects)."
  },
  {
    question: "How does this 24-hour daily routine planner prevent study burnout?",
    answer: "Our planner applies constraint-satisfaction scheduling: it first locks your non-negotiable sleep (7 to 8 hours), meal breaks, and fixed school/college commitments. It then distributes study blocks with mandatory 10 to 15-minute cognitive recovery buffers to eliminate attentional residue and mental fatigue."
  },
  {
    question: "Can I edit, save, and print my generated daily routine?",
    answer: "Yes. Every activity in the generated timetable can be edited, shifted, or marked complete. You can save multiple routine versions directly in your browser's local storage, copy the formatted schedule text to your clipboard, or print a clean PDF version for your study desk."
  },
  {
    question: "What should I do if I miss a scheduled study block?",
    answer: "Instead of feeling guilty and abandoning your entire routine, use our intelligent rescheduling feature (⚡ button) to automatically identify an open evening buffer or low-priority wind-down slot to recover your missed focus session without disturbing meal or sleep hours."
  }
];

export const metadata = {
  title: {
    absolute: 'Daily Routine Generator for Students | LifeTrack Pro',
  },
  description: 'Create a 24-hour schedule with our daily routine generator for students. Balance wake-up times, classes, deep study sprints & sleep. Build your routine now.',
  alternates: {
    canonical: 'https://lifetrackpro.in/tools/daily-routine-generator',
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
    title: 'Daily Routine Generator for Students | LifeTrack Pro',
    description: 'Create a 24-hour schedule with our daily routine generator for students. Balance wake-up times, classes, deep study sprints & sleep. Build your routine now.',
    url: 'https://lifetrackpro.in/tools/daily-routine-generator',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-tools.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro Daily Routine Generator for Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Routine Generator for Students | LifeTrack Pro',
    description: 'Create a 24-hour schedule with our daily routine generator for students. Balance wake-up times, classes, deep study sprints & sleep. Build your routine now.',
    images: ['https://lifetrackpro.in/og/og-tools.png'],
    creator: '@LifeTrackPro',
  },
};

export default function DailyRoutineGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://lifetrackpro.in/tools/daily-routine-generator#webapp",
        "name": "LifeTrack Pro Daily Routine Generator",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/tools/daily-routine-generator",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/tools/daily-routine-generator#webpage",
        "url": "https://lifetrackpro.in/tools/daily-routine-generator",
        "name": "Daily Routine Generator for Students | 24-Hour Study Schedule Planner",
        "description": "Interactive daily study routine planner to generate constraint-aware 24-hour schedules with circadian energy matching, fixed class protection, active recovery, and restorative sleep.",
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
          { "@type": "ListItem", "position": 3, "name": "Daily Routine Generator", "item": "https://lifetrackpro.in/tools/daily-routine-generator" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": DAILY_ROUTINE_FAQS.map((faq) => ({
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

      <article className="daily-routine-page-container">
        <div className="daily-routine-header-block">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/tools" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Tools</Link>
            <span>/</span>
            <span style={{ color: 'var(--emerald)', fontWeight: 650 }}>Daily Routine Generator</span>
          </nav>

          <div className="section-eyebrow" style={{ display: 'inline-block', marginBottom: '8px' }}>Free Online Lifestyle &amp; Schedule Tool</div>
          <h1 className="subpage-h1" style={{ fontSize: 'clamp(20px, 3.2vw, 32px)', fontWeight: 800, color: '#172033', letterSpacing: '-0.5px', marginBottom: '12px', lineHeight: 1.25, wordBreak: 'break-word' }}>
            Daily Routine Generator for Students
          </h1>
          
          <p className="subpage-lead" style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.6, maxWidth: '880px', marginBottom: '24px' }}>
            Our free daily routine generator for students helps you build a balanced, realistic 24-hour daily schedule tailored to your wake-up time, sleep hours, classes, and personal commitments. Organizes healthy morning and night routines, meal buffers, and available study windows so you stay consistent without burnout.
          </p>
        </div>

          {/* Interactive Generator & Planner Widget (Immediately Accessible Above the Fold) */}
          <DailyRoutineGenerator />

          {/* Section 1: How to Create a Daily Routine for Students */}
          <section className="content-card reveal" style={{ marginTop: '28px' }}>
            <h2 className="content-card-h2">
              How to Create a Daily Routine for Students (That You Can Actually Stick To)
            </h2>
            <p className="content-card-p">
              The primary reason 85% of student daily schedules fail within the first week is <strong>optimism bias</strong>: students assume they will study at 100% velocity for 12 hours straight without bathroom breaks, meal transitions, or energy drops. When reality inevitably interrupts the schedule, guilt sets in and the entire routine is abandoned.
            </p>
            <p className="content-card-p">
              To construct a daily study routine that survives real life, academic psychologists recommend adhering to four core scheduling rules:
            </p>
            <ul className="content-card-list">
              <li>
                • <strong>Protect the Sleep Window First:</strong> Never treat sleep as leftover time. Lock in 7 to 8 hours of uninterrupted rest before scheduling a single study block. During non-REM and REM sleep cycles, your brain’s hippocampus replays daytime memory traces and transfers them into the long-term neocortex.
              </li>
              <li>
                • <strong>Slot Energy-Intensive Subjects During Morning Alertness Peaks:</strong> Willpower is a finite metabolic resource. Tackle your most demanding subject (such as Physics multi-concept derivations, Organic reaction mechanisms, or Calculus problem sets) during your morning cortisol peak (between 6:30 AM and 11:30 AM), never late at night when cognitive stamina is drained.
              </li>
              <li>
                • <strong>Enforce Mandatory 10–15 Minute Working Memory Buffers:</strong> Never schedule back-to-back deep sessions. Working continuously beyond 90 minutes causes <em>attention residue</em>, where thoughts from the previous topic contaminate working memory for the next topic.
              </li>
              <li>
                • <strong>End Each Day with an Active Recall Sweep:</strong> Reserve the final 30 to 45 minutes before bedtime for flashcards or formula recall using our <Link href="/features/spaced-repetition" style={{ color: 'var(--primary)', fontWeight: 600 }}>SM-2 spaced repetition system</Link> to permanently consolidate daytime learning.
              </li>
            </ul>
          </section>

          {/* Section 2: Best Daily Routine for JEE and NEET Aspirants */}
          <section className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Best Daily Routine for JEE and NEET Aspirants
            </h2>
            <p className="content-card-p">
              Competitive national examinations like IIT JEE and NEET UG demand intensive problem-solving endurance and rapid conceptual recall under timed exam conditions. High-scoring toppers do not study 16 hours a day; they execute 7 to 9 hours of ultra-focused deep work divided into three distinct biological phases:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: '#2563EB', display: 'block', marginBottom: '6px' }}>
                  Phase 1: Morning Deep Sprints (6:30 AM – 12:30 PM)
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                  Two 90-minute deep work blocks dedicated to high-weightage topics (Physics Mechanics/Electrodynamics or Chemistry Physical/Organic). Zero notifications, zero music with lyrics, and maximum pen-to-paper numerical problem solving.
                </p>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: '#059669', display: 'block', marginBottom: '6px' }}>
                  Phase 2: Afternoon Timed MCQ Drills (3:00 PM – 6:00 PM)
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                  {/* TODO: Verify exact JEE Main shift timings with latest NTA information bulletin */}
                  Timed 45-to-60 question past year question (PYQ) sprints matching official JEE Main (NTA) afternoon shift timings (3:00 PM – 6:00 PM). Trains your circadian rhythm to remain razor sharp during the afternoon post-lunch dip.
                </p>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: '#D97706', display: 'block', marginBottom: '6px' }}>
                  Phase 3: Evening Error Logging &amp; Recall (6:30 PM – 10:00 PM)
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                  Detailed analysis of questions answered incorrectly during afternoon drills. Updating revision notebooks, reviewing tricky biology NCERT diagrams, and performing rapid formula flashcard sweeps before bed.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Daily Routine for College Students */}
          <section className="content-card reveal">
            <h2 className="content-card-h2">
              Daily Routine for College Students
            </h2>
            <p className="content-card-p">
              College and university students face a unique challenge: irregular lecture schedules, lab practicals, semester assignments, and tech placement preparation (Data Structures &amp; Algorithms, web development, and mock interviews).
            </p>
            <p className="content-card-p">
              To balance high GPA requirements with career-defining placement skills:
            </p>
            <ul className="content-card-list">
              <li>
                • <strong>Early Morning Pre-Lecture Sprints (6:30 AM – 8:00 AM):</strong> Execute one 90-minute coding sprint (solving 2 LeetCode problems or working on core architecture) before campus emails, WhatsApp groups, and morning classes begin.
              </li>
              <li>
                • <strong>Use In-Between Lecture Gaps for Micro-Tasks:</strong> Review lecture slides, finish lab record write-ups, or read technical articles during 30 to 45-minute gaps between college lectures instead of endless social media doomscrolling.
              </li>
              <li>
                • <strong>Dedicated Evening Project Block (6:30 PM – 8:30 PM):</strong> Reserve late afternoon and early evening for semester coursework, core engineering subjects (OS, DBMS, Computer Networks), and active team project contributions.
              </li>
              <li>
                • <strong>Screen-Free Wind-Down:</strong> End your day by 11:30 PM to ensure at least 7 hours of sleep. Blue light from computer monitors suppresses melatonin production, impairing problem-solving creativity for the next morning.
              </li>
            </ul>
          </section>

          {/* Section 4: How to Balance Study, Sleep and Personal Life */}
          <section className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              How to Balance Study, Sleep, and Personal Life (The 8-8-8 Rule)
            </h2>
            <p className="content-card-p">
              The foundation of sustainable high performance is the classic <strong>8-8-8 circadian framework</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3.5">
              <div style={{ padding: '14px', background: 'rgba(91, 92, 240, 0.05)', borderRadius: '10px', border: '1px solid rgba(91, 92, 240, 0.2)' }}>
                <strong style={{ fontSize: '13px', color: '#5B5CF0', display: 'block', marginBottom: '4px' }}>8 Hours of Deep Work &amp; Study</strong>
                <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                  High-focus, distraction-free study blocks separated by structured 10-minute active recovery breaks.
                </p>
              </div>

              <div style={{ padding: '14px', background: 'rgba(5, 150, 105, 0.05)', borderRadius: '10px', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
                <strong style={{ fontSize: '13px', color: 'var(--emerald)', display: 'block', marginBottom: '4px' }}>8 Hours of Restorative Sleep</strong>
                <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                  Non-negotiable sleep to consolidate episodic memory into semantic memory and prevent cognitive decline.
                </p>
              </div>

              <div style={{ padding: '14px', background: 'rgba(217, 119, 6, 0.05)', borderRadius: '10px', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
                <strong style={{ fontSize: '13px', color: 'var(--amber)', display: 'block', marginBottom: '4px' }}>8 Hours of Life &amp; Recovery</strong>
                <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                  Three nutritious meals, 45 minutes of physical exercise, family conversations, commute, and mental decompression.
                </p>
              </div>
            </div>
            <p className="content-card-p" style={{ marginTop: '14px' }}>
              Sacrificing your 8 hours of sleep or exercise to temporarily boost study time to 12 or 14 hours creates a compound <em>sleep debt</em>. Within 5 days, cognitive processing speed drops to levels equivalent to staying awake for 24 hours straight.
            </p>
          </section>

          {/* Section 5: How Many Hours Should Students Study? */}
          <section className="content-card reveal">
            <h2 className="content-card-h2">
              How Many Hours Should Students Study Daily?
            </h2>
            <p className="content-card-p">
              The ideal number of daily study hours depends directly on whether you attend classes or are preparing full-time:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
              <div style={{ padding: '12px 14px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 750, color: 'var(--primary)' }}>School Students (Classes 8 AM – 2 PM)</div>
                <div style={{ fontSize: '14px', fontWeight: 850, color: '#0F172A', margin: '4px 0' }}>3.5 to 4.5 Hours / Day</div>
                <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.4 }}>Sufficient for homework, NCERT revision, and weekly test preparation without evening exhaustion.</p>
              </div>

              <div style={{ padding: '12px 14px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 750, color: 'var(--sky)' }}>College Students (Lectures + Labs)</div>
                <div style={{ fontSize: '14px', fontWeight: 850, color: '#0F172A', margin: '4px 0' }}>4 to 5.5 Hours / Day</div>
                <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.4 }}>Balances semester GPA with DSA coding practice and portfolio projects.</p>
              </div>

              <div style={{ padding: '12px 14px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 750, color: 'var(--emerald)' }}>Full-Time Aspirants (JEE / NEET / UPSC)</div>
                <div style={{ fontSize: '14px', fontWeight: 850, color: '#0F172A', margin: '4px 0' }}>7 to 9 Hours / Day</div>
                <p style={{ fontSize: '11px', color: 'var(--text-2)', margin: 0, lineHeight: 1.4 }}>The biological sweet spot for high-retention deep work. Studying over 10 hours yields diminishing marginal returns.</p>
              </div>
            </div>
          </section>

          {/* Section 6: Tips for Maintaining a Consistent Routine */}
          <section className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Tips for Maintaining a Consistent Routine Every Day
            </h2>
            <ul className="content-card-list">
              <li>
                • <strong>Practice Habit Stacking:</strong> Anchor new study habits to existing reliable rituals. For example: <em>&quot;Immediately after pouring my morning water, I will sit down and open my physics formula notebook for 20 minutes.&quot;</em>
              </li>
              <li>
                • <strong>Eliminate Starting Friction the Night Before:</strong> Before going to sleep, clear your desk of everything except the exact textbook, notebook, and pen you need for your first morning session. Removing early-morning decision fatigue protects prefrontal focus reserves.
              </li>
              <li>
                • <strong>Protect Streaks with Streak Shields:</strong> If an unforeseen family emergency, illness, or travel interrupts your schedule, arm a <Link href="/features/habit-tracker" style={{ color: 'var(--primary)', fontWeight: 600 }}>Habit Streak Freeze Shield</Link> in LifeTrack Pro so your multi-week momentum remains unbroken.
              </li>
              <li>
                • <strong>Avoid the All-or-Nothing Trap:</strong> If you miss your morning 90-minute session, never tell yourself <em>&quot;today is ruined, I will start fresh on Monday.&quot;</em> Simply use our intelligent rescheduling button to capture a 45-minute afternoon slot and win the rest of the day.
              </li>
            </ul>
          </section>

          {/* Section 7: Strategic App Promotion — 4 Connected LifeTrack Pro Features */}
          <RelatedAppFeatures
            source="daily_routine_generator"
            title="Reinforce Your Daily Routine with LifeTrack Pro Features"
            subtitle="Transform your daily schedule from an aspirational outline into an automatic daily habit with our connected tools:"
          />

          {/* Section 8: Explore Complementary Free Online Study Tools */}
          <section className="content-card reveal">
            <h2 className="content-card-h2">
              Explore More Free Online Study Tools
            </h2>
            <p className="content-card-p">
              Pair your daily routine with our complementary academic calculators and schedule builders:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>🗓️</div>
                  <CardTitle style={{ fontSize: '13.5px', color: 'var(--primary)', margin: 0 }}>Study Timetable Generator</CardTitle>
                  <CardDescription style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Smart hour-by-hour scheduled revision timetables.
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
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>📊</div>
                  <CardTitle style={{ fontSize: '13.5px', color: 'var(--sky)', margin: 0 }}>Study Hours Calculator</CardTitle>
                  <CardDescription style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Calculate daily study hours needed to complete syllabus.
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
                    Measure true deep work focus hours vs attention residue.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/tools/focus-time-calculator" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rose)', textDecoration: 'none' }}>
                    Open Tool →
                  </Link>
                  <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Attention</Badge>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>📋</div>
                  <CardTitle style={{ fontSize: '13.5px', color: 'var(--emerald)', margin: 0 }}>Weekly Study Planner</CardTitle>
                  <CardDescription style={{ fontSize: '11px', color: 'var(--text-2)', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Balance subjects across a structured 7-day template.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/tools/weekly-study-planner" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--emerald)', textDecoration: 'none' }}>
                    Open Tool →
                  </Link>
                  <Badge variant="secondary" style={{ fontSize: '9.5px' }}>7-Day Plan</Badge>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Section 9: Frequently Asked Questions */}
          <section className="reveal reveal-delay-1" aria-label="Frequently Asked Questions">
            <FaqAccordion
              title="Frequently Asked Questions About Student Daily Routines"
              items={DAILY_ROUTINE_FAQS}
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
      </article>
    </>
  );
}
