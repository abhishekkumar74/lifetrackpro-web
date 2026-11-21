import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { WhatsAppIcon } from '@/components/SocialIcons';

export const metadata = {
  title: {
    absolute: 'Student FAQ & App Study Guide | LifeTrack Pro',
  },
  description: 'Get answers in our LifeTrack Pro FAQ: Pomodoro timer settings, SM-2 spaced repetition algorithm, habit freeze shields & silent study rooms. Read the guide.',
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
    title: 'Student FAQ & App Study Guide | LifeTrack Pro',
    description: 'Get answers in our LifeTrack Pro FAQ: Pomodoro timer settings, SM-2 spaced repetition algorithm, habit freeze shields & silent study rooms. Read the guide.',
    url: 'https://lifetrackpro.in/faq',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro Knowledge Base and FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student FAQ & App Study Guide | LifeTrack Pro',
    description: 'Get answers in our LifeTrack Pro FAQ: Pomodoro timer settings, SM-2 spaced repetition algorithm, habit freeze shields & silent study rooms. Read the guide.',
    images: ['https://lifetrackpro.in/og/og-default.png'],
    creator: '@LifeTrackPro',
  },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "@id": "https://lifetrackpro.in/#app",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/faq",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/faq#webpage",
        "url": "https://lifetrackpro.in/faq",
        "name": "LifeTrack Pro FAQ & Study Guide",
        "description": "Comprehensive knowledge base answering student questions regarding Pomodoro timers, SM-2 spaced repetition algorithms, habit streak freeze shields, and study rooms.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "url": "https://lifetrackpro.in",
          "name": "LifeTrack Pro"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in" },
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

      <article className="container" style={{ padding: '40px 20px' }}>
        <div>
          {/* Visual Semantic Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>FAQ</span>
          </nav>

          <div className="reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
            <div className="section-eyebrow">Productivity Knowledge Base &amp; FAQ</div>
            <h1 className="section-h2" style={{ marginBottom: '14px' }}>
              Frequently Asked Questions About LifeTrack Pro
            </h1>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Browse our official LifeTrack Pro FAQ knowledge base. Get answers on setting up your study routine, mastering active recall with SM-2 spaced repetition, sustaining habits with streak freeze shields, and focusing in silent virtual study rooms.
            </p>
          </div>

          {/* Interactive Search & Filter Accordion */}
          <section aria-label="Frequently Asked Questions Accordion" style={{ maxWidth: '880px', margin: '0 auto' }}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#BE123C', fontWeight: 700, fontSize: '13px' }}>
                      <TimerIcon size={16} />
                      <CardTitle as="h3" style={{ fontSize: '13px', color: '#BE123C', margin: 0 }}>Pomodoro Timer</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Soundscapes</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Configurable 25/5 and 50/10 focus cadences with ambient soundscapes and distraction-free UI.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/features/pomodoro-timer" style={{ fontSize: '11px', fontWeight: 700, color: '#BE123C', textDecoration: 'none' }}>
                    Explore Timer →
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: 700, fontSize: '13px' }}>
                      <CardsIcon size={16} />
                      <CardTitle as="h3" style={{ fontSize: '13px', color: '#047857', margin: 0 }}>SM-2 Flashcards</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>SuperMemo</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Active recall algorithm scheduling card reviews right before memory decay occurs.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/features/spaced-repetition" style={{ fontSize: '11px', fontWeight: 700, color: '#047857', textDecoration: 'none' }}>
                    Explore Flashcards →
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400E', fontWeight: 700, fontSize: '13px' }}>
                      <HabitFlameIcon size={16} />
                      <CardTitle as="h3" style={{ fontSize: '13px', color: '#92400E', margin: 0 }}>Habit Streak Shields</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Shields</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Loss-aversion streak tracking protected by earned freeze shields for missed days.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/features/habit-tracker" style={{ fontSize: '11px', fontWeight: 700, color: '#92400E', textDecoration: 'none' }}>
                    Explore Habits →
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0369A1', fontWeight: 700, fontSize: '13px' }}>
                      <HeadphonesIcon size={16} />
                      <CardTitle as="h3" style={{ fontSize: '13px', color: '#0369A1', margin: 0 }}>Silent Study Rooms</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Multiplayer</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Camera-free virtual body doubling with synchronized Pomodoro blocks and ambient audio.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/features/study-rooms" style={{ fontSize: '11px', fontWeight: 700, color: '#0369A1', textDecoration: 'none' }}>
                    Explore Rooms →
                  </Link>
                </CardFooter>
              </Card>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '18px 20px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '13.5px' }}>
                      <TargetIcon size={16} />
                      <CardTitle as="h3" style={{ fontSize: '13.5px', color: 'var(--primary)', margin: 0 }}>IIT JEE Study Routine</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Engineering</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5 }}>
                    Structure 90-minute numerical sprints for Mechanics, Calculus, and Organic Chemistry, and test formula recall.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
                  <Link href="/exams/jee" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '11.5px', textDecoration: 'none' }}>
                    Explore IIT JEE Planner →
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '18px 20px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', fontWeight: 700, fontSize: '13.5px' }}>
                      <CardsIcon size={16} />
                      <CardTitle as="h3" style={{ fontSize: '13.5px', color: '#047857', margin: 0 }}>NEET Medical Timetable</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Medical</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5 }}>
                    Master NCERT Biology line-by-line active recall and review reaction mechanisms with automated SM-2 intervals.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
                  <Link href="/exams/neet" style={{ color: '#047857', fontWeight: 700, fontSize: '11.5px', textDecoration: 'none' }}>
                    Explore NEET Routine →
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '18px 20px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400E', fontWeight: 700, fontSize: '13.5px' }}>
                      <TimerIcon size={16} />
                      <CardTitle as="h3" style={{ fontSize: '13.5px', color: '#92400E', margin: 0 }}>UPSC Civil Services Hub</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Civil Services</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5 }}>
                    Structure 8-hour daily preparation across GS Papers 1–4, schedule timed Mains answer writing sprints, and retain Constitutional articles.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
                  <Link href="/exams/upsc" style={{ color: '#92400E', fontWeight: 700, fontSize: '11.5px', textDecoration: 'none' }}>
                    Explore UPSC Focus Hub →
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="faq-bottom-cta-card">
            <a 
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="tools-cta-primary-btn"
              aria-label="Get LifeTrack Pro on Play Store - Android Study App"
            >
              <PlayStoreIcon size={18} />
              <span>Get LifeTrack Pro on Play Store</span>
              <span className="tools-cta-arrow" aria-hidden="true">→</span>
            </a>
            <div className="tools-cta-secondary-grid">
              <Link href="/features" className="tools-cta-secondary-btn" aria-label="Explore All Features">
                <SparklesIcon size={16} />
                <span>Explore All Features</span>
              </Link>
              <Link href="/calculator" className="tools-cta-secondary-btn" aria-label="Focus ROI Calculator">
                <CalculatorIcon size={16} />
                <span>Focus ROI Calculator</span>
              </Link>
            </div>
            <a 
              href="https://chat.whatsapp.com/B8uwXjT9R665ahqcXVsZdk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="faq-cta-whatsapp-btn"
              aria-label="Ask on WhatsApp Community"
            >
              <WhatsAppIcon size={17} style={{ color: '#16A34A' }} />
              <span>Ask on WhatsApp Community</span>
              <span className="faq-cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
