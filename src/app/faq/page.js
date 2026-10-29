import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) & Knowledge Base | LifeTrack Pro',
  description: 'Everything you need to know about LifeTrack Pro Pomodoro timer, SM-2 flashcard spaced repetition algorithm, habit streaks, data privacy, and Android installation.',
  keywords: ['lifetrack pro faq', 'how to use lifetrack pro', 'spaced repetition guide', 'pomodoro app questions'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) & Knowledge Base',
    description: 'Find answers about focus timers, spaced repetition algorithms, and study rooms.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/faq',
  }
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is LifeTrack Pro free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The core functionality including the Pomodoro focus timer, active flashcards, daily habit streaks, and exam target progress is free forever with zero intrusive ads."
        }
      },
      {
        "@type": "Question",
        "name": "How does LifeTrack Pro compare to Anki and Forest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anki is purely flashcards with an outdated desktop interface, and Forest is only a basic timer. LifeTrack Pro combines the proven SM-2 spaced repetition algorithm, custom focus timer with binaural audio, daily habit streaks, and live multiplayer study rooms into one modern interface."
        }
      },
      {
        "@type": "Question",
        "name": "Which platforms is LifeTrack Pro available on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LifeTrack Pro is currently live on Android via Google Play / APK and as a responsive Web App. The native iOS version for iPhone and iPad is currently in active testing."
        }
      },
      {
        "@type": "Question",
        "name": "Is my study data secure and private?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All data is encrypted and stored securely using Supabase with row-level security. We never sell or share your study routines or personal metrics."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
          <div className="section-eyebrow">Frequently Asked Questions</div>
          <h1 className="section-h2">Questions Answered. Clear &amp; Simple.</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Got questions about how LifeTrack Pro helps you study smarter? Find quick answers below.
          </p>
        </div>

        <div className="reveal reveal-delay-1">
          <FaqAccordion />
        </div>

        <div className="reveal reveal-delay-2" style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'var(--text-3)', fontSize: '13.5px', marginBottom: '14px' }}>
            Still have a question? Want to suggest a feature?
          </p>
          <Link href="/" className="btn-main">
            <span>📱</span> Back to Home &amp; Download App
          </Link>
        </div>
      </div>
    </>
  );
}
