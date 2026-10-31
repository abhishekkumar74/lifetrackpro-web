import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import { ALL_FAQS } from '@/data/faqs';
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
  title: 'Frequently Asked Questions (FAQ) & Knowledge Base',
  description: 'Find answers about LifeTrack Pro Pomodoro timer, SM-2 flashcard spaced repetition algorithm, habit streaks with freeze shields, and silent study rooms.',
  keywords: [
    'lifetrack pro faq',
    'pomodoro timer questions',
    'spaced repetition flashcard guide',
    'study habit streak tracker',
    'silent virtual study rooms',
    'sm-2 algorithm for students',
    'offline study app',
    'study productivity faq',
    'jee neet upsc study app help',
    'anki alternative questions'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/faq',
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
    title: 'Frequently Asked Questions (FAQ) & Knowledge Base | LifeTrack Pro',
    description: 'Find answers about focus timers, spaced repetition algorithms, habit streak shields, and silent virtual study rooms.',
    url: 'https://lifetrackpro.in/faq',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Knowledge Base and FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions (FAQ) & Knowledge Base | LifeTrack Pro',
    description: 'Find answers about focus timers, spaced repetition algorithms, habit streak shields, and silent virtual study rooms.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/faq#webpage",
        "url": "https://lifetrackpro.in/faq",
        "name": "Frequently Asked Questions (FAQ) & Knowledge Base | LifeTrack Pro",
        "description": "Comprehensive knowledge base answering student questions regarding Pomodoro timers, SM-2 spaced repetition algorithms, habit streak freeze shields, and study rooms.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "url": "https://lifetrackpro.in/",
          "name": "LifeTrack Pro"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in/" },
          { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://lifetrackpro.in/faq" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": ALL_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
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
          {/* Visual Semantic Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>FAQ</span>
          </nav>

          <div className="section-eyebrow">Productivity Knowledge Base &amp; FAQ</div>
          <h1 className="subpage-h1">Frequently Asked Questions About LifeTrack Pro &amp; Study Productivity</h1>
          
          <p className="subpage-lead">
            Everything you need to know about setting up your study routine, mastering active recall with SM-2 spaced repetition, sustaining habits with streak freeze shields, and focusing in silent virtual study rooms.
          </p>

          {/* Interactive Search & Filter Accordion */}
          <section aria-label="Frequently Asked Questions Accordion" style={{ marginTop: '20px' }}>
            <FaqAccordion />
          </section>

          {/* Core Features & Methodology Section */}
          <div className="content-card reveal" style={{ marginTop: '32px' }}>
            <h2 className="content-card-h2">
              Explore Core Features &amp; Learning Methodology
            </h2>
            <p className="content-card-p">
              LifeTrack Pro unifies the four critical pillars of academic productivity. Dive deeper into the science and mechanics behind each tool:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '14px' }}>
              <Link href="/features/pomodoro-timer" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TimerIcon size={15} /> Pomodoro Timer
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Configurable 25/5 and 50/10 focus cadences with 432Hz binaural audio and zero ads.
                  </p>
                </div>
              </Link>

              <Link href="/features/spaced-repetition" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CardsIcon size={15} /> SM-2 Flashcards
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Active recall algorithm scheduling card reviews right before memory decay occurs.
                  </p>
                </div>
              </Link>

              <Link href="/features/habit-tracker" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <HabitFlameIcon size={15} /> Habit Streak Shields
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Loss-aversion streak tracking protected by earned freeze shields for missed days.
                  </p>
                </div>
              </Link>

              <Link href="/features/study-rooms" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sky)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <HeadphonesIcon size={15} /> Silent Study Rooms
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Camera-free virtual body doubling with synchronized Pomodoro blocks and ambient audio.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Exam-Specific Study Planning Guides */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Exam-Specific Study Planning &amp; Structured Routines
            </h2>
            <p className="content-card-p">
              Whether you are preparing for medical, engineering, or civil services competitive examinations, see how LifeTrack Pro structures your daily study schedule:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginTop: '14px' }}>
              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <TargetIcon size={16} />
                  <span>IIT JEE Study Routine</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: '10px' }}>
                  Structure 90-minute numerical sprints for Mechanics, Calculus, and Organic Chemistry, and test formula recall.
                </p>
                <Link href="/exams/jee" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>
                  Explore IIT JEE Planner →
                </Link>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <CardsIcon size={16} />
                  <span>NEET Medical Timetable</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: '10px' }}>
                  Master NCERT Biology line-by-line active recall and review reaction mechanisms with automated SM-2 intervals.
                </p>
                <Link href="/exams/neet" style={{ color: 'var(--emerald)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>
                  Explore NEET Routine →
                </Link>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--amber)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <TimerIcon size={16} />
                  <span>UPSC Civil Services Hub</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: '10px' }}>
                  Structure 8-hour daily preparation across GS Papers 1–4, schedule timed Mains answer writing sprints, and retain Constitutional articles.
                </p>
                <Link href="/exams/upsc" style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>
                  Explore UPSC Focus Hub →
                </Link>
              </div>
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
              <span>Get LifeTrack Pro on Play Store</span>
            </a>
            <Link href="/features" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon size={16} />
              <span>Explore All Features</span>
            </Link>
            <Link href="/calculator" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <CalculatorIcon size={16} />
              <span>Focus ROI Calculator</span>
            </Link>
            <a 
              href="https://chat.whatsapp.com/B8uwXjT9R665ahqcXVsZdk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-glass"
            >
              Ask on WhatsApp Community
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
