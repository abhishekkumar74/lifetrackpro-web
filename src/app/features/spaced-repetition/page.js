import Link from 'next/link';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { 
  TimerIcon, 
  HabitFlameIcon, 
  HeadphonesIcon, 
  CalculatorIcon, 
  SparklesIcon,
  TargetIcon 
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import dynamic from 'next/dynamic';

const InteractiveSpacedRepetition = dynamic(() => import('@/components/InteractiveSpacedRepetition'), {
  loading: () => <div style={{ minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '13px' }}>Loading SM-2 Flashcard Simulator...</div>,
});

const SPACED_REPETITION_FAQS = [
  {
    question: "How does the SM-2 spaced repetition algorithm calculate review dates?",
    answer: "The SuperMemo SM-2 algorithm tracks two variables for each card: Repetition number (n) and Ease Factor (EF, default 2.50). For a successful recall, the next interval expands mathematically: Day 1, then Day 6, then previous interval multiplied by the Ease Factor (e.g. 15 days, 38 days, 95 days). If you fail a card (Again), the interval resets to 10 minutes to eliminate memory gaps."
  },
  {
    question: "Why is active recall with flashcards superior to passive re-reading and highlighting?",
    answer: "Passive re-reading creates an illusion of competence called recognition memory. Active recall forces the brain to reconstruct memory traces through neural retrieval pathways, triggering long-term potentiation (LTP) in the hippocampus and making facts durable under high-stress exam conditions."
  },
  {
    question: "How does LifeTrack Pro prevent flashcard review overwhelm?",
    answer: "Instead of confronting a daunting library of thousands of cards, LifeTrack Pro calculates expanding intervals so that only 40 to 60 cards are due on any single day, making consistent daily revision achievable in 15 to 20 minutes."
  },
  {
    question: "Does the flashcard review feature work offline without internet?",
    answer: "Yes. LifeTrack Pro is built with an offline-first local database. Your deck decks, rating histories, and review intervals are stored locally on your device, allowing seamless revision during commutes or in low-connectivity libraries."
  }
];

export const metadata = {
  title: {
    absolute: 'Spaced Repetition Flashcards App | LifeTrack Pro',
  },
  description: 'Master active recall with our spaced repetition flashcards app. Uses the SM-2 algorithm to schedule formula and concept reviews before you forget. Try it free.',
  alternates: {
    canonical: 'https://lifetrackpro.in/features/spaced-repetition',
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
    title: 'Spaced Repetition Flashcards App | LifeTrack Pro',
    description: 'Master active recall with our spaced repetition flashcards app. Uses the SM-2 algorithm to schedule formula and concept reviews before you forget. Try it free.',
    url: 'https://lifetrackpro.in/features/spaced-repetition',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-features.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro SM-2 Spaced Repetition Flashcards App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spaced Repetition Flashcards App | LifeTrack Pro',
    description: 'Master active recall with our spaced repetition flashcards app. Uses the SM-2 algorithm to schedule formula and concept reviews before you forget. Try it free.',
    images: ['https://lifetrackpro.in/og/og-features.png'],
    creator: '@LifeTrackPro',
  },
};

export default function SpacedRepetitionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/features/spaced-repetition#webpage",
        "url": "https://lifetrackpro.in/features/spaced-repetition",
        "name": "Spaced Repetition Flashcards & Active Recall | LifeTrack Pro",
        "description": "Scientific SuperMemo SM-2 algorithm for permanent memory retention in competitive examinations.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "url": "https://lifetrackpro.in",
          "name": "LifeTrack Pro"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://lifetrackpro.in/features/spaced-repetition#breadcrumbs",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in" },
          { "@type": "ListItem", "position": 2, "name": "Features Hub", "item": "https://lifetrackpro.in/features" },
          { "@type": "ListItem", "position": 3, "name": "Spaced Repetition", "item": "https://lifetrackpro.in/features/spaced-repetition" }
        ]
      },
      {
        "@type": "MobileApplication",
        "@id": "https://lifetrackpro.in/#app",
        "name": "LifeTrack Pro",
        "operatingSystem": "Android",
        "applicationCategory": "ProductivityApplication",
        "installUrl": "https://play.google.com/store/apps/details?id=com.lifetrackpro.app",
        "description": "Scientific SM-2 spaced repetition flashcard algorithm and active recall engine for permanent long-term memory retention.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": SPACED_REPETITION_FAQS.map((faq) => ({
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

      <article className="container subpage-container">
        <div>
          {/* Visual Semantic Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/features" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Features</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Spaced Repetition</span>
          </nav>

          <div className="section-eyebrow">Memory Science &amp; Active Recall Engine</div>
          <h1 className="subpage-h1">SM-2 Spaced Repetition Flashcards App</h1>
          
          <p className="subpage-lead">
            A science-backed spaced repetition flashcards app helps eliminate the illusion of competence from passive re-reading. LifeTrack Pro&apos;s SM-2 based spaced repetition engine calculates mathematically optimal review intervals, intercepting memory decay right before forgetting happens to build permanent exam recall.
          </p>

          {/* Interactive SM-2 Flashcard Simulator */}
          <InteractiveSpacedRepetition />

          {/* Educational Science Section */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              The Science of Active Recall: Beating the Ebbinghaus Forgetting Curve
            </h2>
            <p className="content-card-p">
              In 1885, cognitive psychologist Hermann Ebbinghaus proved that without deliberate spaced retrieval, the human brain forgets over <strong>50% of newly learned facts within 1 hour</strong> and more than <strong>70% within 24 hours</strong>. When students repeatedly highlight or re-read textbooks, they practice recognition rather than retrieval—leaving memories vulnerable to rapid decay.
            </p>
            <p className="content-card-p">
              Spaced repetition solves this biological vulnerability. By testing yourself right when retrieval probability drops to approximately 85–90%, your brain exerts the cognitive effort necessary to stimulate <em>long-term potentiation (LTP)</em>, transferring volatile facts into durable semantic storage.
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>Optimal Intercept Timing:</strong> Reviews are triggered at expanding mathematical intervals right before memory decay occurs.</li>
              <li>✓ <strong>Active Retrieval Consolidation:</strong> Forcing mental recall strengthens neural pathways far more effectively than passive reading.</li>
              <li>✓ <strong>Due Queue Management:</strong> Never face an overwhelming backlog. LifeTrack Pro presents only the specific cards due for review today.</li>
              <li>✓ <strong>Offline-First Architecture:</strong> Review cards on the metro, bus, or in poor hostel Wi-Fi without loading spinners or data consumption.</li>
            </ul>
          </div>

          {/* SM-2 Mechanics Section */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              How the SM-2 Spaced Repetition Algorithm Works in LifeTrack Pro
            </h2>
            <p className="content-card-p">
              Originally formulated by Dr. Piotr Woźniak, the SuperMemo SM-2 algorithm personalizes review spacing for every individual card based on four distinct feedback ratings:
            </p>
            <div style={{ background: 'var(--bg-cream)', padding: '16px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--primary)', fontWeight: 700, marginBottom: '6px' }}>
                Mathematical Interval Formula: I(n) = I(n-1) × EF
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                Where <code>I(n)</code> is the next review interval in days, <code>I(1) = 1 day</code>, <code>I(2) = 6 days</code>, and <code>EF</code> is the card&apos;s personal Ease Factor (initialized at 2.50).
              </p>
            </div>

            <ul className="content-card-list">
              <li>• <strong>Again (Rating 1):</strong> Total memory lapse. The card is scheduled for an immediate 10-minute re-test and the interval resets to zero, ensuring no knowledge gaps reach exam day.</li>
              <li>• <strong>Hard (Rating 2):</strong> Successful retrieval after hesitation or strain. The interval expands cautiously and the Ease Factor is adjusted downward by 0.15.</li>
              <li>• <strong>Good (Rating 3):</strong> Prompt, confident retrieval. The standard interval multiplier is applied, scaling the review schedule smoothly forward.</li>
              <li>• <strong>Easy (Rating 4):</strong> Instant, effortless mastery. The interval takes an immediate multi-day leap and the Ease Factor increases by 0.10, deferring the card so you focus on tougher material.</li>
            </ul>
          </div>

          {/* Review Interval Progression Table */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">SM-2 Expanding Interval Schedule &amp; Memory Retention Curve</h2>
            <p className="content-card-p">
              Observe how spaced retrieval transforms a fleeting initial impression into permanent semantic memory over five review cycles:
            </p>
            <div className="table-responsive-wrapper">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', marginTop: '12px' }} aria-label="SM-2 Expanding Interval Schedule">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-mid)', textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px', color: 'var(--text-1)' }}>Review Stage</th>
                    <th style={{ padding: '8px 12px', color: 'var(--text-1)' }}>Interval Timing</th>
                    <th style={{ padding: '8px 12px', color: 'var(--emerald)', fontWeight: 750 }}>Target Retention</th>
                    <th style={{ padding: '8px 12px', color: 'var(--text-3)' }}>Neural Consolidation State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Initial Encoding</td>
                    <td style={{ padding: '10px 12px' }}>Day 0 (Immediate)</td>
                    <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>100%</td>
                    <td style={{ padding: '10px 12px' }}>Fragile Working Memory</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>1st Scheduled Review</td>
                    <td style={{ padding: '10px 12px' }}>Day 1 (+24 hours)</td>
                    <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>92%</td>
                    <td style={{ padding: '10px 12px' }}>Synaptic Receptor Strengthening</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>2nd Scheduled Review</td>
                    <td style={{ padding: '10px 12px' }}>Day 6 (+5 days)</td>
                    <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>95%</td>
                    <td style={{ padding: '10px 12px' }}>Early Hippocampal Storage</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>3rd Scheduled Review</td>
                    <td style={{ padding: '10px 12px' }}>Day 16 (+10 days)</td>
                    <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>97%</td>
                    <td style={{ padding: '10px 12px' }}>Long-Term Potentiation (LTP)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Mastered Concept</td>
                    <td style={{ padding: '10px 12px' }}>Day 35+ (+19 days)</td>
                    <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>99%</td>
                    <td style={{ padding: '10px 12px' }}>Permanent Semantic Neocortex Memory</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Exam Applications Section */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              High-Yield Flashcard Revision for JEE, NEET &amp; UPSC Aspirants
            </h2>
            <p className="content-card-p">
              Spaced repetition delivers the highest return on investment for subjects requiring exact factual precision under time constraints:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <Link href="/exams/neet" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TargetIcon size={15} /> NEET Biology Recall
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Master NCERT botanical definitions, morphological traits, genetics ratios, and human physiology enzymes with 100% fidelity.
                  </p>
                </div>
              </Link>

              <Link href="/exams/jee" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TargetIcon size={15} /> IIT JEE Formulas
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Lock in electromagnetism relations, organic reaction reagents, thermodynamics laws, and integral calculus standard forms.
                  </p>
                </div>
              </Link>

              <Link href="/exams/upsc" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9333EA', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TargetIcon size={15} /> UPSC Articles &amp; Acts
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>
                    Retain Constitutional articles, constitutional amendments, environmental protocols, and landmark Supreme Court cases.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Connected Life OS Ecosystem */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Part of Your Complete LifeTrack Pro Study OS
            </h2>
            <p className="content-card-p">
              Spaced repetition works best when integrated into your daily workflow. Inside <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>LifeTrack Pro</Link>, card reviews connect directly with your other study tools:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
              <Link href="/features/pomodoro-timer" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TimerIcon size={15} /> Pomodoro Timer
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Launch a focused 25-minute Pomodoro sprint dedicated solely to clearing today&apos;s due flashcards.
                  </p>
                </div>
              </Link>

              <Link href="/features/habit-tracker" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <HabitFlameIcon size={15} /> Habit Streak Shields
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Daily completed reviews automatically advance your study habit rings with streak freeze shield protection.
                  </p>
                </div>
              </Link>

              <Link href="/features/study-rooms" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <HeadphonesIcon size={15} /> 24/7 Study Rooms
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Review flashcard queues in silent multiplayer study rooms alongside thousands of dedicated aspirants.
                  </p>
                </div>
              </Link>

              <Link href="/calculator" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sky)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CalculatorIcon size={15} /> Retention ROI Calculator
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Calculate how many hundreds of hours you save by substituting passive re-reading with active recall.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <section className="reveal reveal-delay-1" aria-label="Frequently Asked Questions">
            <FaqAccordion
              title="Frequently Asked Questions About Spaced Repetition & Flashcards"
              items={SPACED_REPETITION_FAQS}
            />
          </section>

          {/* Bottom Action Buttons */}
          <div className="subpage-bottom-cta-card">
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
              <Link href="/features" className="tools-cta-secondary-btn" aria-label="Back to All Features">
                <SparklesIcon size={16} />
                <span>Back to All Features</span>
              </Link>
              <Link href="/calculator" className="tools-cta-secondary-btn" aria-label="Calculate Retention ROI">
                <CalculatorIcon size={16} />
                <span>Calculate Retention ROI</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
