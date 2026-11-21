import Link from 'next/link';

export const metadata = {
  title: {
    absolute: 'About Our Evidence-Based Study OS | LifeTrack Pro',
  },
  description: 'Learn about LifeTrack Pro: an evidence-based study operating system for Indian students preparing for JEE, NEET and UPSC. Read our cognitive methodology.',
  alternates: {
    canonical: 'https://lifetrackpro.in/about',
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
    title: 'About Our Evidence-Based Study OS | LifeTrack Pro',
    description: 'Learn about LifeTrack Pro: an evidence-based study operating system for Indian students preparing for JEE, NEET and UPSC. Read our cognitive methodology.',
    url: 'https://lifetrackpro.in/about',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'About LifeTrack Pro Study Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Our Evidence-Based Study OS | LifeTrack Pro',
    description: 'Learn about LifeTrack Pro: an evidence-based study operating system for Indian students preparing for JEE, NEET and UPSC. Read our cognitive methodology.',
    images: ['https://lifetrackpro.in/og/og-default.png'],
    creator: '@LifeTrackPro',
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://lifetrackpro.in/about#webpage",
        "url": "https://lifetrackpro.in/about",
        "name": "About LifeTrack Pro | Evidence-Based Study Operating System",
        "description": "Learn about LifeTrack Pro: an evidence-based study operating system for Indian students preparing for JEE, NEET & UPSC. Editorial review & cognitive methodology.",
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
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://lifetrackpro.in/about" }
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
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>About</span>
          </nav>

          <div className="section-eyebrow">Our Mission &amp; Editorial Standards</div>
          <h1 className="subpage-h1">About LifeTrack Pro &amp; Our Evidence-Based Learning Mission</h1>

          <p className="subpage-lead">
            LifeTrack Pro was engineered to solve a pervasive crisis in student productivity: tool fragmentation. Competitive examination aspirants preparing for IIT JEE, NEET UG, and UPSC Civil Services frequently bounce between four to six disparate apps—one for focus timing, another for Anki flashcards, another for habit tracking, and another for group study. Every app switch incurs attention residue and cognitive friction. LifeTrack Pro unites these four essential pillars into a distraction-free, local-first academic operating system.
          </p>

          {/* Section 1: The Four Pillars */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">The Four Pillars of the LifeTrack Pro OS</h2>
            <p className="content-card-p">
              Every feature in our platform is derived from established cognitive psychology and behavioral design principles:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: '#BE123C', display: 'block', marginBottom: '4px' }}>
                  1. Deep Work Focus Engine
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                  Calibrated Pomodoro cadences (25/5, 50/10, and 90-minute blocks) paired with ambient acoustic masking (alpha tones, rain, library hum) running efficiently on device lock-screens.
                </p>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: '#047857', display: 'block', marginBottom: '4px' }}>
                  2. SM-2 Active Recall Flashcards
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                  Mathematical review intervals (1 day, 6 days, 15 days, 38 days, 95 days) that intercept memory decay right before forgetting occurs, turning passive reading into permanent exam recall.
                </p>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: '#92400E', display: 'block', marginBottom: '4px' }}>
                  3. Habit Streaks with Freeze Shields
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                  Loss aversion streak tracking reinforced with emergency freeze tokens. Missing a single scheduled day due to travel or rest does not destroy months of accumulated momentum.
                </p>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ fontSize: '13px', color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                  4. Silent Virtual Study Rooms
                </strong>
                <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                  Camera-free, microphone-free body doubling. Students experience the quiet social accountability of a premier university library without video fatigue or privacy concerns.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: E-E-A-T & Editorial Verification Standards */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">E-E-A-T &amp; Editorial Methodology Standards</h2>
            <p className="content-card-p">
              We believe students deserve scientifically substantiated guidance, not viral productivity myths. Our curriculum roadmaps, timetable algorithms, and cognitive calculators are built on the following evidentiary foundations:
            </p>
            <ul className="content-card-list">
              <li>• <strong>Attention Residue Research:</strong> Grounded in the foundational research of Dr. Sophie Leroy (University of Washington) and Dr. Gloria Mark (University of California, Irvine) on cognitive context-switching penalties.</li>
              <li>• <strong>Spaced Retrieval Algorithms:</strong> Implemented following Piotr Woźniak&apos;s SuperMemo SM-2 mathematical model with adaptive Ease Factors.</li>
              <li>• <strong>Curriculum Alignment:</strong> Timetable templates, PYQ sprint blocks, and formula priority matrices are aligned with latest National Testing Agency (NTA) syllabi for JEE/NEET and Union Public Service Commission (UPSC) examination frameworks.</li>
              {/* TODO: Add verified academic reviewer / peer verification credentials or remove if unverified */}
            </ul>
          </div>

          {/* Section 3: Contact & Editorial Inquiries */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">Editorial Review &amp; Academic Inquiries</h2>
            <p className="content-card-p">
              We welcome corrections, empirical studies, and academic suggestions from educators, researchers, and student mentors:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', marginTop: '10px' }}>
              <div><strong>Editorial &amp; Research:</strong> <a href="mailto:editorial@lifetrackpro.in" style={{ color: 'var(--primary)', fontWeight: 650 }}>editorial@lifetrackpro.in</a></div>
              <div><strong>General Inquiries:</strong> <a href="mailto:contact@lifetrackpro.in" style={{ color: 'var(--primary)', fontWeight: 650 }}>contact@lifetrackpro.in</a></div>
              <div><strong>Student Support:</strong> <a href="mailto:support@lifetrackpro.in" style={{ color: 'var(--primary)', fontWeight: 650 }}>support@lifetrackpro.in</a></div>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-3)', marginTop: '14px', marginBottom: 0 }}>
              LifeTrack Pro is operated under official domain <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>lifetrackpro.in</Link>. All user correspondence is handled through our official support channels. {/* TODO: Add official response SLA */}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
