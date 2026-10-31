import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Official Data Protection & Privacy Governance',
  description: 'Read the official LifeTrack Pro Privacy Policy. Learn how we handle account credentials, encrypted journal vaults, Supabase cloud sync, user deletion rights, and data security.',
  keywords: [
    'lifetrack pro privacy policy',
    'student data privacy',
    'lifetrack pro account deletion',
    'com.lifetrackpro.app privacy',
    'supabase data security',
    'study app privacy'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/privacy',
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
    title: 'Privacy Policy | LifeTrack Pro',
    description: 'Official LifeTrack Pro Privacy Policy. Transparent data practices, Supabase encryption, user rights, and account deletion policies.',
    url: 'https://lifetrackpro.in/privacy',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Official Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | LifeTrack Pro',
    description: 'Transparent data practices, encrypted local vaults, and full account deletion rights.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/privacy#webpage",
        "url": "https://lifetrackpro.in/privacy",
        "name": "LifeTrack Pro Privacy Policy",
        "description": "Official privacy and data governance policy for LifeTrack Pro (com.lifetrackpro.app).",
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
          { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://lifetrackpro.in/privacy" }
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
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</span>
          </nav>

          <div className="section-eyebrow">Official Legal Policy</div>
          <h1 className="subpage-h1">Privacy Policy</h1>

          {/* Official Document Metadata Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 18px',
            fontSize: '12px',
            color: 'var(--text-2)',
            padding: '12px 14px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '18px'
          }}>
            <div><strong>App Name:</strong> LifeTrack Pro</div>
            <div><strong>Package ID:</strong> <code style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', background: 'var(--bg-cream)', padding: '2px 6px', borderRadius: '4px' }}>com.lifetrackpro.app</code></div>
            <div><strong>Developer:</strong> Abhishek Kumar</div>
            <div><strong>Last Updated:</strong> October 18, 2026</div>
          </div>

          <p className="subpage-lead">
            Welcome to <strong>LifeTrack Pro</strong>. We respect your privacy and are committed to protecting your personal data. This Privacy Policy describes how LifeTrack Pro (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and safeguards your information when you use our mobile application available on the <a href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Google Play Store</a>.
          </p>

          {/* Core Promise Highlight Card */}
          <div style={{
            background: 'var(--primary-soft)',
            borderLeft: '4px solid var(--primary)',
            padding: '14px 18px',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '20px'
          }}>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-1)', lineHeight: '1.5' }}>
              <strong>Core Promise:</strong> We do not sell your personal information. Your private notes, journal reflections, and focus session logs are encrypted and never shared with third-party advertisers for data brokerage.
            </p>
          </div>

          {/* Section 1: Information We Collect */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">1. Information We Collect</h2>
            <p className="content-card-p">
              We collect only the information necessary to provide you with core productivity, habit tracking, and focus timer features:
            </p>
            <ul className="content-card-list">
              <li>• <strong>Account Credentials:</strong> When you register or sign in, we collect your email address and profile username. Account authentication is handled securely via Supabase Auth.</li>
              <li>• <strong>Study &amp; Focus Activity:</strong> Focus session durations, accuracy ratings, subject tags, timestamps, and earned XP points to calculate your productivity statistics and streaks.</li>
              <li>• <strong>Personal Vault &amp; Journal Entries:</strong> Diary entries, gratitude reflections, and mood check-ins created in the Secret Journal Vault. This content is encrypted and protected with a local 4-digit PIN.</li>
              <li>• <strong>Syllabus &amp; Task Data:</strong> Chapters, study topics, checklist items, and scheduled routine blocks that you choose to track.</li>
              <li>• <strong>Diagnostic &amp; Device Information:</strong> Technical details such as device model, OS version, battery state (for live timer background sync), and anonymous crash telemetry via Sentry to resolve bugs.</li>
              <li>• <strong>Advertising Identifier:</strong> Google Mobile Ads (AdMob) may collect the device&apos;s Google Advertising ID (AAID) strictly to serve voluntary rewarded video ads requested by the user.</li>
            </ul>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">2. How We Use Your Information</h2>
            <p className="content-card-p">
              We use the collected information for the following legitimate business purposes:
            </p>
            <ul className="content-card-list">
              <li>• To authenticate your account and securely sync your study data across devices.</li>
              <li>• To generate personal productivity charts, weekly consistency heatmaps, and achievement badges.</li>
              <li>• To deliver optional local reminders, streak protection alerts, and study notifications.</li>
              <li>• To credit bonus XP and streak shields when you voluntarily choose to watch a rewarded ad.</li>
              <li>• To diagnose crashes and improve the performance and reliability of the app.</li>
            </ul>
          </div>

          {/* Section 3: Third-Party Service Providers */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">3. Third-Party Service Providers</h2>
            <p className="content-card-p">
              To provide high-quality cloud synchronization, crash reporting, and ad delivery, LifeTrack Pro integrates trusted third-party services. Each provider operates under strict privacy safeguards:
            </p>
            <ul className="content-card-list">
              <li>
                • <strong>Supabase:</strong> Cloud database, authentication, and encrypted data storage. (<a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Supabase Privacy Policy</a>)
              </li>
              <li>
                • <strong>Google AdMob &amp; Google Play Services:</strong> Delivers opt-in rewarded ads and app distribution. (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Google Privacy Policy</a>)
              </li>
              <li>
                • <strong>Sentry:</strong> Real-time crash reporting and stability diagnostics. (<a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Sentry Privacy Policy</a>)
              </li>
              <li>
                • <strong>PostHog:</strong> Privacy-friendly, anonymous feature usage analytics to understand user adoption. (<a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>PostHog Privacy Policy</a>)
              </li>
            </ul>
          </div>

          {/* Section 4: Data Storage and Security */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">4. Data Storage and Security</h2>
            <p className="content-card-p">
              We implement industry-standard administrative, technical, and physical security measures:
            </p>
            <ul className="content-card-list">
              <li>• All communication between the LifeTrack Pro app and backend servers is encrypted in transit using <strong>Transport Layer Security (TLS 1.3 / HTTPS)</strong>.</li>
              <li>• Database records are protected with <strong>Row Level Security (RLS)</strong>, ensuring that only authenticated owners can read or write their own data.</li>
              <li>• Your Secret Journal Vault is additionally safeguarded on your device with your personal 4-digit PIN lock.</li>
            </ul>
          </div>

          {/* Section 5: Account & Data Deletion */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">5. Account &amp; Data Deletion (User Rights)</h2>
            <p className="content-card-p">
              You have full ownership of your data and can request complete, permanent deletion at any time:
            </p>
            <ul className="content-card-list">
              <li>
                • <strong>In-App Deletion:</strong> You can delete your account instantly from within the app by navigating to: <em>Profile &rarr; Account Settings &rarr; Danger Zone &rarr; Schedule Account Deletion</em>.
              </li>
              <li>
                • <strong>Manual Web / Email Request:</strong> If you cannot access the app, you can submit an account deletion request by emailing <a href="mailto:abhishekkumar86448@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>abhishekkumar86448@gmail.com</a> with the subject line <em>&quot;Account Deletion Request&quot;</em>. Please provide your registered account email. All your personal data, journal vaults, study sessions, and history will be permanently erased from our servers within 30 days.
              </li>
            </ul>
          </div>

          {/* Section 6: Children's Privacy */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">6. Children&apos;s Privacy (COPPA &amp; GDPR-K Compliance)</h2>
            <p className="content-card-p">
              LifeTrack Pro is designed for high school and university students, working professionals, and lifelong learners. The app is <strong>not directed to children under the age of 13</strong>. We do not knowingly collect personal identifiable information from children under 13. If you believe a child has provided us with personal information, please contact us immediately, and we will promptly delete such records.
            </p>
          </div>

          {/* Section 7: Changes to This Privacy Policy */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">7. Changes to This Privacy Policy</h2>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              We may update this Privacy Policy from time to time to reflect improvements or regulatory requirements. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of LifeTrack Pro after updates implies acceptance of the revised policy.
            </p>
          </div>

          {/* Section 8: Contact Us */}
          <div className="content-card reveal" style={{ background: 'var(--bg-cream)', border: '1px solid var(--border-mid)' }}>
            <h2 className="content-card-h2">8. Contact Us</h2>
            <p className="content-card-p">
              If you have any questions, feedback, or concerns regarding this Privacy Policy or your data privacy rights, please contact:
            </p>
            <div style={{ fontSize: '12.5px', color: 'var(--text-1)', lineHeight: '1.7', marginTop: '8px' }}>
              <div><strong>Developer:</strong> Abhishek Kumar</div>
              <div><strong>App Name:</strong> LifeTrack Pro (<code style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', background: '#FFFFFF', padding: '1px 5px', borderRadius: '4px' }}>com.lifetrackpro.app</code>)</div>
              <div><strong>Support &amp; Privacy Email:</strong> <a href="mailto:abhishekkumar86448@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>abhishekkumar86448@gmail.com</a></div>
              <div><strong>Location:</strong> India</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '24px' }}>
            <Link href="/" className="btn-main">
              Return to Home
            </Link>
            <Link href="/terms" className="btn-glass">
              View Terms of Service
            </Link>
            <Link href="/features" className="btn-glass">
              Explore All Features
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
