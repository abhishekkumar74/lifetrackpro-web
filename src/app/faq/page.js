import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  title: 'LifeTrack Pro FAQ & Study Guide',
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
    title: 'LifeTrack Pro FAQ & Study Guide | LifeTrack Pro',
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
    title: 'LifeTrack Pro FAQ & Study Guide | LifeTrack Pro',
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
        "@type": "SoftwareApplication",
        "@id": "https://lifetrackpro.in/#softwareapplication",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": "https://lifetrackpro.in/faq",
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
        "@id": "https://lifetrackpro.in/faq#webpage",
        "url": "https://lifetrackpro.in/faq",
        "name": "LifeTrack Pro FAQ & Study Guide",
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose)', fontWeight: 700, fontSize: '13px' }}>
                      <TimerIcon size={16} />
                      <CardTitle style={{ fontSize: '13px', color: 'var(--rose)', margin: 0 }}>Pomodoro Timer</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Binaural</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Configurable 25/5 and 50/10 focus cadences with 432Hz binaural audio and zero ads.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/features/pomodoro-timer" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rose)', textDecoration: 'none' }}>
                    Explore Timer →
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)', fontWeight: 700, fontSize: '13px' }}>
                      <CardsIcon size={16} />
                      <CardTitle style={{ fontSize: '13px', color: 'var(--emerald)', margin: 0 }}>SM-2 Flashcards</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>SuperMemo</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Active recall algorithm scheduling card reviews right before memory decay occurs.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/features/spaced-repetition" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--emerald)', textDecoration: 'none' }}>
                    Explore Flashcards →
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber)', fontWeight: 700, fontSize: '13px' }}>
                      <HabitFlameIcon size={16} />
                      <CardTitle style={{ fontSize: '13px', color: 'var(--amber)', margin: 0 }}>Habit Streak Shields</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Shields</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Loss-aversion streak tracking protected by earned freeze shields for missed days.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/features/habit-tracker" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber)', textDecoration: 'none' }}>
                    Explore Habits →
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '16px 18px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sky)', fontWeight: 700, fontSize: '13px' }}>
                      <HeadphonesIcon size={16} />
                      <CardTitle style={{ fontSize: '13px', color: 'var(--sky)', margin: 0 }}>Silent Study Rooms</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Multiplayer</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Camera-free virtual body doubling with synchronized Pomodoro blocks and ambient audio.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 18px 14px' }}>
                  <Link href="/features/study-rooms" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--sky)', textDecoration: 'none' }}>
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
                      <CardTitle style={{ fontSize: '13.5px', color: 'var(--primary)', margin: 0 }}>IIT JEE Study Routine</CardTitle>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald)', fontWeight: 700, fontSize: '13.5px' }}>
                      <CardsIcon size={16} />
                      <CardTitle style={{ fontSize: '13.5px', color: 'var(--emerald)', margin: 0 }}>NEET Medical Timetable</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Medical</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5 }}>
                    Master NCERT Biology line-by-line active recall and review reaction mechanisms with automated SM-2 intervals.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
                  <Link href="/exams/neet" style={{ color: 'var(--emerald)', fontWeight: 700, fontSize: '11.5px', textDecoration: 'none' }}>
                    Explore NEET Routine →
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md min-w-0">
                <CardHeader style={{ padding: '18px 20px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--amber)', fontWeight: 700, fontSize: '13.5px' }}>
                      <TimerIcon size={16} />
                      <CardTitle style={{ fontSize: '13.5px', color: 'var(--amber)', margin: 0 }}>UPSC Civil Services Hub</CardTitle>
                    </div>
                    <Badge variant="secondary" style={{ fontSize: '9.5px' }}>Civil Services</Badge>
                  </div>
                  <CardDescription style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5 }}>
                    Structure 8-hour daily preparation across GS Papers 1–4, schedule timed Mains answer writing sprints, and retain Constitutional articles.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100" style={{ padding: '10px 20px 14px' }}>
                  <Link href="/exams/upsc" style={{ color: 'var(--amber)', fontWeight: 700, fontSize: '11.5px', textDecoration: 'none' }}>
                    Explore UPSC Focus Hub →
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Bottom CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
            <Button asChild className="ui-button-brand min-h-[44px] px-5 rounded-xl shadow-sm">
              <a 
                href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <PlayStoreIcon size={16} />
                <span>Get LifeTrack Pro on Play Store</span>
              </a>
            </Button>
            <Button asChild variant="outline" className="ui-button-outline min-h-[44px] px-5 rounded-xl">
              <Link href="/features" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <SparklesIcon size={16} />
                <span>Explore All Features</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="ui-button-secondary min-h-[44px] px-5 rounded-xl">
              <Link href="/calculator" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <CalculatorIcon size={16} />
                <span>Focus ROI Calculator</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" className="ui-button-ghost min-h-[44px] px-5 rounded-xl">
              <a 
                href="https://chat.whatsapp.com/B8uwXjT9R665ahqcXVsZdk" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ textDecoration: 'none' }}
              >
                Ask on WhatsApp Community
              </a>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
