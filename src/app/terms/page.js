import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — Transparent Student Guidelines',
  description: 'LifeTrack Pro Terms of Service. Clear, ethical software terms, fair usage guidelines, and free educational access commitments.',
  keywords: ['lifetrack pro terms', 'terms of service', 'study app terms of use'],
  alternates: {
    canonical: 'https://lifetrackpro.in/terms',
  },
  openGraph: {
    title: 'Terms of Service | LifeTrack Pro',
    description: 'Clear, ethical terms of service and community guidelines for students using LifeTrack Pro.',
    url: 'https://lifetrackpro.in/terms',
    siteName: 'LifeTrack Pro',
    images: [{ url: 'https://lifetrackpro.in/play_store_feature_graphic.png', width: 1024, height: 500, alt: 'LifeTrack Pro Terms of Service' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | LifeTrack Pro',
    description: 'Clear, ethical terms of service and community guidelines for students using LifeTrack Pro.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LifeTrack Pro Terms of Service",
    "url": "https://lifetrackpro.in/terms",
    "description": "LifeTrack Pro terms of use and student guidelines.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in" },
        { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://lifetrackpro.in/terms" }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container subpage-container">
        <div>
          <div className="section-eyebrow">Fair Usage &amp; Ethics</div>
          <h1 className="subpage-h1">Terms of Service</h1>
          <p className="subpage-lead">
            Last Updated: October 30, 2026. Welcome to LifeTrack Pro. By downloading or accessing our web platform and Android application, you agree to these fair usage terms.
          </p>

          <div className="content-card reveal">
            <h2 className="content-card-h2">1. Educational License &amp; Free Usage</h2>
            <p className="content-card-p">
              LifeTrack Pro grants you a personal, non-exclusive, non-transferable revocable license to utilize our Pomodoro timers, spaced repetition algorithms, habit streaks, and live study rooms for personal educational advancement and productivity management.
            </p>
          </div>

          <div className="content-card reveal">
            <h2 className="content-card-h2">2. Respectful Community Conduct in Study Rooms</h2>
            <p className="content-card-p">
              Our 24/7 virtual study rooms exist to maintain an inspiring, distraction-free environment for competitive exam aspirants across India and globally. Users agree to:
            </p>
            <ul className="content-card-list">
              <li>✓ Refrain from spamming, advertising commercial courses, or sharing unsolicited links in room chats.</li>
              <li>✓ Maintain respect, courtesy, and constructive encouragement toward fellow students.</li>
              <li>✓ Never impersonate other students, educators, or LifeTrack Pro administrators.</li>
            </ul>
          </div>

          <div className="content-card reveal">
            <h2 className="content-card-h2">3. Intellectual Property</h2>
            <p className="content-card-p">
              The LifeTrack Pro application interface, custom illustrations, branding, and proprietary algorithms are protected by copyright and intellectual property laws. You may not reverse-engineer, decompile, or create unauthorized derivatives of the software without prior written consent.
            </p>
          </div>

          <div className="content-card reveal">
            <h2 className="content-card-h2">4. Disclaimers &amp; Limitation of Liability</h2>
            <p className="content-card-p">
              LifeTrack Pro is provided on an &apos;as-is&apos; and &apos;as-available&apos; basis. While we strive for 99.9% uptime and bulletproof local persistence, we are not liable for any incidental data interruptions, device clock variations, or exam outcome guarantees.
            </p>
          </div>

          <div className="content-card reveal">
            <h2 className="content-card-h2">5. Updates &amp; Contact</h2>
            <p className="content-card-p">
              We may revise these Terms occasionally to reflect new product features or legal compliance requirements. Questions can be directed to <strong>support@lifetrackpro.app</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '24px' }}>
            <Link href="/" className="btn-main">
              Return to Home
            </Link>
            <Link href="/privacy" className="btn-glass">
              View Privacy Policy
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
