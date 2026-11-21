import Link from 'next/link';

export const metadata = {
  title: {
    absolute: 'Terms of Service and Usage Policy | LifeTrack Pro',
  },
  description: 'Review the LifeTrack Pro terms of service: educational license, acceptable usage rules, cloud synchronization guidelines and fair student access policies.',
  alternates: {
    canonical: 'https://lifetrackpro.in/terms',
  },
  openGraph: {
    title: 'Terms of Service and Usage Policy | LifeTrack Pro',
    description: 'Review the LifeTrack Pro terms of service: educational license, acceptable usage rules, cloud synchronization guidelines and fair student access policies.',
    url: 'https://lifetrackpro.in/terms',
    siteName: 'LifeTrack Pro',
    type: 'article',
    locale: 'en_IN',
    images: [{ url: 'https://lifetrackpro.in/og/og-default.png', width: 1200, height: 630, alt: 'LifeTrack Pro Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service and Usage Policy | LifeTrack Pro',
    description: 'Review the LifeTrack Pro terms of service: educational license, acceptable usage rules, cloud synchronization guidelines and fair student access policies.',
    images: ['https://lifetrackpro.in/og/og-default.png'],
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/terms#webpage",
        "url": "https://lifetrackpro.in/terms",
        "name": "LifeTrack Pro Terms of Service",
        "description": "LifeTrack Pro terms of use and student guidelines.",
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
          { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://lifetrackpro.in/terms" }
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

      <article className="container subpage-container">
        <div>
          {/* Visual Semantic Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms of Service</span>
          </nav>

          <div className="section-eyebrow">Fair Usage &amp; Ethics</div>
          <h1 className="subpage-h1">LifeTrack Pro Terms of Service</h1>
          <p className="subpage-lead">
            Last Updated: October 30, 2026. Welcome to the official <strong>LifeTrack Pro terms of service</strong>. By downloading or accessing our web platform and Android application, you agree to these fair usage terms.
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
            <h2 className="content-card-h2">5. Updates, Governing Law &amp; Contact</h2>
            <p className="content-card-p">
              We may revise these Terms occasionally to reflect new product features or statutory legal requirements (including India&apos;s Digital Personal Data Protection Act 2023). Continued use of LifeTrack Pro after changes constitutes acceptance.
            </p>
            <p className="content-card-p">
              {/* TODO: Specify official city / state jurisdiction for dispute resolution */}
              These Terms shall be governed by and construed in accordance with the laws of India, subject to the jurisdiction of the competent courts in India.
            </p>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              Questions, formal notices, and legal inquiries can be directed to <a href="mailto:support@lifetrackpro.in" style={{ color: 'var(--primary)', fontWeight: 600 }}>support@lifetrackpro.in</a> or <a href="mailto:grievance@lifetrackpro.in" style={{ color: 'var(--primary)', fontWeight: 600 }}>grievance@lifetrackpro.in</a>.
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
