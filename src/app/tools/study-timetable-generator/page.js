import Link from 'next/link';
import AiStudyPlanner from '@/components/tools/AiStudyPlanner';
import { 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  CalculatorIcon, 
  SparklesIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

export const metadata = {
  title: 'Free Study Timetable Generator for Students | AI Subject & Exam Planner',
  description: 'Free study timetable generator for students. Plan subjects, schedule chapters, prioritize weak topics, and build revision timetables for JEE, NEET, UPSC, GATE, and semester exams.',
  keywords: [
    'study timetable generator',
    'study timetable for students',
    'study schedule maker',
    'exam preparation timetable',
    'jee study timetable',
    'neet study timetable',
    'subject wise study planner',
    'weekly study planner',
    'adaptive study timetable',
    'lifetrack pro study planner'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/tools/study-timetable-generator',
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
    title: 'Free Study Timetable Generator for Students | LifeTrack Pro',
    description: 'Intelligently allocate your daily study hours across subjects, chapters, and revision cycles. Prioritizes weak topics, schedules active recall (SM-2), and timed PYQ drills.',
    url: 'https://lifetrackpro.in/tools/study-timetable-generator',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Free Online Study Timetable Generator for Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Study Timetable Generator for Students | LifeTrack Pro',
    description: 'Plan subjects, complete chapters, schedule revision and stay on track for your target exam.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function StudyTimetableGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#softwareapplication",
        "name": "LifeTrack Pro Study Timetable Generator",
        "operatingSystem": "Android, Web",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/tools/study-timetable-generator",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "138"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/tools/study-timetable-generator#webpage",
        "url": "https://lifetrackpro.in/tools/study-timetable-generator",
        "name": "Free Study Timetable Generator for Students",
        "description": "Interactive study timetable maker to allocate daily focus hours across subjects, chapters, active recall (SM-2), timed PYQ drills, and mock tests for JEE, NEET, UPSC, and college exams.",
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
          { "@type": "ListItem", "position": 3, "name": "Study Timetable Generator", "item": "https://lifetrackpro.in/tools/study-timetable-generator" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does a Study Timetable differ from a Daily Routine?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Daily Routine manages your complete 24-hour lifestyle: wake-up times, sleep hygiene, school/coaching schedules, meals, exercise, and leisure, creating available study windows. The Study Timetable Generator operates exclusively inside those study windows: it maps specific subjects (Physics, Chemistry, Math, GS), chapters, weak-topic weighting, timed PYQs, and SM-2 active recall."
            }
          },
          {
            "@type": "Question",
            "name": "How does the AI prioritize weak subjects in my study timetable?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When you mark a subject as Weak, the algorithm applies a 1.4x priority multiplier and places it in your earliest peak cognitive window. This ensures high-difficulty concept comprehension happens when mental alertness and willpower are at their maximum."
            }
          },
          {
            "@type": "Question",
            "name": "Can I import study hours directly from my Daily Routine?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! In Step 2, click 'Import from Daily Routine Planner' to instantly pull available study blocks created in our Daily Routine tool. Your sleep, meal breaks, and coaching commitments remain 100% protected while academic topics are assigned to open focus windows."
            }
          },
          {
            "@type": "Question",
            "name": "Can I export my study timetable to Google Calendar or Apple Calendar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Clicking 'Export to iCal (.ics)' downloads a standard calendar file that imports directly into Google Calendar, Apple Calendar, Outlook, and Notion Calendar with pre-configured session notifications."
            }
          },
          {
            "@type": "Question",
            "name": "What should I do when I miss a scheduled study block?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LifeTrack Pro includes Adaptive Rescheduling: instead of feeling guilty and discarding the whole plan, click 'Find Free Slot' on any missed block to automatically locate an open review buffer later in the day."
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

      <article className="daily-routine-page-container">
        <div className="daily-routine-header-block">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/tools" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Tools</Link>
            <span>/</span>
            <span style={{ color: '#5B5CF0', fontWeight: 650 }}>Study Timetable Generator</span>
          </nav>

          <div className="section-eyebrow" style={{ display: 'inline-block', marginBottom: '8px' }}>Free Online Academic Preparation Tool</div>
          <h1 className="subpage-h1" style={{ fontSize: 'clamp(20px, 3.2vw, 32px)', fontWeight: 800, color: '#172033', letterSpacing: '-0.5px', marginBottom: '12px', lineHeight: 1.25, wordBreak: 'break-word' }}>
            Free Study Timetable Generator for Students
          </h1>
          
          <p className="subpage-lead" style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.6, maxWidth: '880px', marginBottom: '24px' }}>
            Plan subjects, complete chapters, schedule revision and stay on track for your target exam. Prioritizes weak topics, active recall (SM-2), timed PYQ drills, and mock tests.
          </p>
        </div>

        {/* Interactive AI Study Planner Workspace (2-Column Architecture) */}
        <AiStudyPlanner />

        {/* ── EDUCATIONAL & STRATEGY SECTIONS ── */}
        <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Methodology: How the AI Planner Works */}
            <div className="planner-card">
              <h2 className="planner-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>
                The 4 Pillars of High-Scoring Academic Study Timetables
              </h2>
              <p className="planner-card-subtitle" style={{ fontSize: '14px', marginBottom: '16px' }}>
                Traditional study schedules fail because they treat all study hours equally. A top-tier academic timetable relies on cognitive science principles to maximize syllabus retention and exam problem velocity:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--planner-border)' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--planner-indigo)', display: 'block', marginBottom: '4px' }}>
                    1. Weighted Subject Interleaving
                  </strong>
                  <p style={{ fontSize: '12.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Studying a single subject all day leads to diminishing cognitive returns after 90 minutes. Interleaving problem-solving (Math/Physics) with conceptual theory (Chemistry/Biology) keeps neural pathways fresh.
                  </p>
                </div>

                <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--planner-border)' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--rose)', display: 'block', marginBottom: '4px' }}>
                    2. Weak Subject Frontloading
                  </strong>
                  <p style={{ fontSize: '12.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Willpower is highest early in your study day. Our engine places weak subjects into morning peak cognitive slots, ensuring challenging topics receive your best analytical focus.
                  </p>
                </div>

                <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--planner-border)' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--sky)', display: 'block', marginBottom: '4px' }}>
                    3. Timed PYQ Sprints
                  </strong>
                  <p style={{ fontSize: '12.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Passive reading creates the illusion of competence. Timed previous-year question drills force active retrieval and train speed under exam-like pressure.
                  </p>
                </div>

                <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--planner-border)' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--emerald)', display: 'block', marginBottom: '4px' }}>
                    4. SM-2 Spaced Retrieval
                  </strong>
                  <p style={{ fontSize: '12.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Every study cycle concludes with active recall review. Reviewing key formulas and exceptions before sleep transfers daytime working memory into long-term neocortex storage.
                  </p>
                </div>
              </div>
            </div>

            {/* Exam Specific Advice */}
            <div className="planner-card">
              <h2 className="planner-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>
                Recommended Academic Cadence by Examination
              </h2>
              <p className="planner-card-subtitle" style={{ fontSize: '14px', marginBottom: '16px' }}>
                Different competitive examinations require distinct cognitive time-blocking:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid var(--planner-border)' }}>
                  <strong style={{ fontSize: '14px', color: '#2563EB', display: 'block', marginBottom: '6px' }}>IIT JEE &amp; GATE Engineering</strong>
                  <p style={{ fontSize: '13px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    Use <strong>90-minute blocks</strong>. Multi-step numericals in Rotational Dynamics or Integral Calculus require 15 minutes just to establish mental context. Short 25m sprints interrupt analytical flow.
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid var(--planner-border)' }}>
                  <strong style={{ fontSize: '14px', color: '#059669', display: 'block', marginBottom: '6px' }}>NEET UG Medical Preparation</strong>
                  <p style={{ fontSize: '13px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    Combine <strong>50/10 Pomodoro bursts</strong> for NCERT Biology memorization with dedicated 75-minute Physics numerical sprints and evening flashcard formula drills.
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid var(--planner-border)' }}>
                  <strong style={{ fontSize: '14px', color: '#D97706', display: 'block', marginBottom: '6px' }}>UPSC Civil Services</strong>
                  <p style={{ fontSize: '13px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    Reserve morning slots for editorial synthesis and static GS core. Allocate afternoon hours to Optional subjects and reserve 45 minutes daily for strict timed Mains answer writing.
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid var(--planner-border)' }}>
                  <strong style={{ fontSize: '14px', color: '#7C3AED', display: 'block', marginBottom: '6px' }}>College Semester &amp; Placements</strong>
                  <p style={{ fontSize: '13px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    Balance 50-minute DSA coding problem sprints with core engineering coursework (OS, DBMS, Networks) and weekend project building.
                  </p>
                </div>
              </div>
            </div>

            {/* Seamless 2-Way Tool Integration Section */}
            <div className="planner-card" style={{ background: '#F0F9FF', borderColor: '#BAE6FD' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>🔗</span>
                <h2 className="planner-card-title" style={{ fontSize: '18px', color: '#0369A1', margin: 0 }}>
                  How to Integrate Your Daily Routine with This Study Timetable
                </h2>
              </div>
              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6, margin: '0 0 14px' }}>
                For the best results, use our two planners as complementary partners:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E0F2FE' }}>
                  <strong style={{ fontSize: '13px', color: '#0284C7', display: 'block', marginBottom: '4px' }}>
                    Step 1: Set Lifestyle in Daily Routine Generator
                  </strong>
                  <span style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.45, display: 'block' }}>
                    Lock in your wake-up time, 7.5h sleep, school/coaching hours, and meals in the <Link href="/tools/daily-routine-generator" style={{ color: '#0284C7', fontWeight: 650 }}>Daily Routine Generator →</Link>
                  </span>
                </div>
                <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E0F2FE' }}>
                  <strong style={{ fontSize: '13px', color: '#0284C7', display: 'block', marginBottom: '4px' }}>
                    Step 2: Import &amp; Map Academic Subjects
                  </strong>
                  <span style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.45, display: 'block' }}>
                    Open this Study Timetable Generator and click &quot;Import from Daily Routine&quot; to automatically map subjects into those exact focus windows!
                  </span>
                </div>
              </div>
            </div>

            {/* Connected Study Features */}
            <div className="planner-card">
              <h2 className="planner-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>
                Execute Your Timetable with LifeTrack Pro Apps
              </h2>
              <p className="planner-card-subtitle" style={{ fontSize: '14px', marginBottom: '16px' }}>
                A timetable is only as powerful as your daily execution. Connect your schedule directly to specialized tools in the LifeTrack Pro ecosystem:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <Link href="/features/pomodoro-timer" style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid var(--planner-border)', height: '100%', transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--planner-indigo)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                      <TimerIcon size={16} /> 50/10 Pomodoro Timer
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      Execute scheduled study blocks with 432Hz alpha frequencies, brown noise, and rain soundscapes.
                    </p>
                  </div>
                </Link>

                <Link href="/features/habit-tracker" style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid var(--planner-border)', height: '100%', transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--amber)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                      <HabitFlameIcon size={16} /> Habit Streak Shields
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      Protect consistency badges with emergency streak freeze shields on mock exam days.
                    </p>
                  </div>
                </Link>

                <Link href="/features/spaced-repetition" style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid var(--planner-border)', height: '100%', transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                      <CardsIcon size={16} /> SM-2 Formula Cards
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      Review formulas and definitions right before the forgetting curve takes effect.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Explore More Free Online Study Tools */}
            <div className="planner-card">
              <h2 className="planner-card-title" style={{ fontSize: '20px', marginBottom: '8px' }}>
                Explore More Free Online Study Tools
              </h2>
              <p className="planner-card-subtitle" style={{ fontSize: '14px', marginBottom: '16px' }}>
                Complementary academic calculators to optimize your daily preparation:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <Link href="/tools/daily-routine-generator" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--emerald)', display: 'block', marginBottom: '4px' }}>Daily Routine Generator →</strong>
                    <p style={{ fontSize: '12px', color: 'var(--planner-text-secondary)', margin: 0 }}>24-hour lifestyle and sleep schedule builder for students.</p>
                  </div>
                </Link>

                <Link href="/tools/study-hours-calculator" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--sky)', display: 'block', marginBottom: '4px' }}>Study Hours Calculator →</strong>
                    <p style={{ fontSize: '12px', color: 'var(--planner-text-secondary)', margin: 0 }}>Calculate daily hours needed to complete your syllabus.</p>
                  </div>
                </Link>

                <Link href="/tools/focus-time-calculator" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--rose)', display: 'block', marginBottom: '4px' }}>Focus Time Calculator →</strong>
                    <p style={{ fontSize: '12px', color: 'var(--planner-text-secondary)', margin: 0 }}>Measure true deep work hours vs distraction residue.</p>
                  </div>
                </Link>

                <Link href="/tools/weekly-study-planner" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--planner-indigo)', display: 'block', marginBottom: '4px' }}>Weekly Study Planner →</strong>
                    <p style={{ fontSize: '12px', color: 'var(--planner-text-secondary)', margin: 0 }}>Balance subjects across a structured 7-day template.</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="planner-card">
              <h2 className="planner-card-title" style={{ fontSize: '20px', marginBottom: '16px' }}>
                Frequently Asked Questions About Study Timetables
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 750, color: 'var(--planner-text-primary)', margin: '0 0 6px' }}>
                    How does a Study Timetable differ from a Daily Routine?
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    A Daily Routine manages your complete 24-hour lifestyle: wake-up times, sleep hygiene, school/coaching schedules, meals, exercise, and leisure, creating available study windows. The Study Timetable Generator operates exclusively inside those study windows: it maps specific subjects (Physics, Chemistry, Math, GS), chapters, weak-topic weighting, timed PYQs, and SM-2 active recall.
                  </p>
                </div>

                <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 750, color: 'var(--planner-text-primary)', margin: '0 0 6px' }}>
                    How does the AI prioritize weak subjects in my study timetable?
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    When you mark a subject as Weak, the algorithm applies a 1.4x priority multiplier and places it in your earliest peak cognitive window. This ensures high-difficulty concept comprehension happens when mental alertness and willpower are at their maximum.
                  </p>
                </div>

                <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 750, color: 'var(--planner-text-primary)', margin: '0 0 6px' }}>
                    Can I import study hours directly from my Daily Routine?
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    Yes! In Step 2, click &apos;Import from Daily Routine Planner&apos; to instantly pull available study blocks created in our Daily Routine tool. Your sleep, meal breaks, and coaching commitments remain 100% protected while academic topics are assigned to open focus windows.
                  </p>
                </div>

                <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 750, color: 'var(--planner-text-primary)', margin: '0 0 6px' }}>
                    Can I export my study timetable to Google Calendar or Apple Calendar?
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    Yes! Clicking &apos;Export to iCal (.ics)&apos; instantly downloads a standard calendar file that imports directly into Google Calendar, Apple Calendar, Outlook, and Notion Calendar with pre-configured session notifications.
                  </p>
                </div>

                <div style={{ padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 750, color: 'var(--planner-text-primary)', margin: '0 0 6px' }}>
                    What should I do when I miss a scheduled study block?
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--planner-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    LifeTrack Pro features Adaptive Rescheduling: instead of feeling guilty and abandoning your schedule, click &apos;Find Free Slot&apos; on any missed session to automatically locate an open review buffer later in your evening.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
              <a 
                href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="planner-btn-primary" 
                style={{ height: '46px', padding: '0 20px', fontSize: '14px', background: '#4F46E5' }}
              >
                <PlayStoreIcon size={16} />
                <span>Get LifeTrack Pro Free on Play Store</span>
              </a>
              <Link href="/tools" className="planner-btn-secondary" style={{ height: '46px', padding: '0 18px', fontSize: '14px' }}>
                <SparklesIcon size={16} />
                <span>Explore All Tools</span>
              </Link>
              <Link href="/calculator" className="planner-btn-secondary" style={{ height: '46px', padding: '0 18px', fontSize: '14px' }}>
                <CalculatorIcon size={16} />
                <span>Calculate Reclaimed Focus Hours</span>
              </Link>
            </div>
          </div>
      </article>
    </>
  );
}
