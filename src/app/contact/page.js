import Link from 'next/link';
import { TelegramIcon, WhatsAppIcon, LinkedInIcon, InstagramIcon } from '@/components/SocialIcons';

export const metadata = {
  title: {
    absolute: 'Contact Student Support and Community | LifeTrack Pro',
  },
  description: 'Contact LifeTrack Pro: reach our student support team for mobile app feedback, timetable suggestions, bug reports and partnerships. Reach out to us today.',
  alternates: {
    canonical: 'https://lifetrackpro.in/contact',
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
    title: 'Contact Student Support and Community | LifeTrack Pro',
    description: 'Contact LifeTrack Pro: reach our student support team for mobile app feedback, timetable suggestions, bug reports and partnerships. Reach out to us today.',
    url: 'https://lifetrackpro.in/contact',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Contact LifeTrack Pro Student Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Student Support and Community | LifeTrack Pro',
    description: 'Contact LifeTrack Pro: reach our student support team for mobile app feedback, timetable suggestions, bug reports and partnerships. Reach out to us today.',
    images: ['https://lifetrackpro.in/og/og-default.png'],
    creator: '@LifeTrackPro',
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://lifetrackpro.in/contact#webpage",
        "url": "https://lifetrackpro.in/contact",
        "name": "Contact LifeTrack Pro | Student Support & Feedback",
        "description": "Contact LifeTrack Pro. Official support email support@lifetrackpro.in, partnership inquiries, bug reports & community channels.",
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
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://lifetrackpro.in/contact" }
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
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Contact</span>
          </nav>

          <div className="section-eyebrow">Get In Touch</div>
          <h1 className="subpage-h1">Contact LifeTrack Pro Support &amp; Community</h1>

          <p className="subpage-lead">
            Have questions about our study tools, need technical support with Android background synchronization, or want to suggest improvements to our SM-2 algorithm? Our core engineering and academic support team is here to assist you.
          </p>

          {/* Contact Channels Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '16px', margin: '24px 0' }}>
            {/* Channel 1: Student Support */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Technical &amp; App Support
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                Student Help Desk
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5, margin: '0 0 12px' }}>
                For questions regarding mobile app syncing, timer widget background lock-screen persistence, or bug reports.
              </p>
              <a href="mailto:support@lifetrackpro.in" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
                support@lifetrackpro.in →
              </a>
            </div>

            {/* Channel 2: Feedback & Curriculum */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#047857', textTransform: 'uppercase', marginBottom: '4px' }}>
                Curriculum &amp; Features
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                Feedback &amp; Feature Requests
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5, margin: '0 0 12px' }}>
                Suggest new timetable presets, syllabus chapter breakdowns, or exam simulation cadences.
              </p>
              <a href="mailto:feedback@lifetrackpro.in" style={{ fontSize: '13px', fontWeight: 700, color: '#047857', textDecoration: 'none' }}>
                feedback@lifetrackpro.in →
              </a>
            </div>

            {/* Channel 3: Institutional & Partnerships */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#92400E', textTransform: 'uppercase', marginBottom: '4px' }}>
                Educators &amp; Institutions
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: 750, color: '#0F172A', margin: '0 0 6px' }}>
                Partnerships &amp; Media
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5, margin: '0 0 12px' }}>
                Coaching institutes, educational mentors, and researchers looking to partner or integrate LifeTrack Pro tools.
              </p>
              <a href="mailto:partners@lifetrackpro.in" style={{ fontSize: '13px', fontWeight: 700, color: '#92400E', textDecoration: 'none' }}>
                partners@lifetrackpro.in →
              </a>
            </div>
          </div>

          {/* Social Communities */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">Join the Student Study Community</h2>
            <p className="content-card-p">
              Connect with fellow JEE, NEET, and UPSC aspirants in our silent focus communities across India:
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '14px' }}>
              <a href="https://t.me/lifetrackpro" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '10px', textDecoration: 'none', color: '#0F172A', fontWeight: 650, fontSize: '12.5px' }}>
                <TelegramIcon size={16} />
                <span>Official Telegram Channel</span>
              </a>
              <a href="https://chat.whatsapp.com/B8uwXjT9R665ahqcXVsZdk" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '10px', textDecoration: 'none', color: '#0F172A', fontWeight: 650, fontSize: '12.5px' }}>
                <WhatsAppIcon size={16} />
                <span>WhatsApp Community Group</span>
              </a>
              <a href="https://www.linkedin.com/company/lifetrackpro" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '10px', textDecoration: 'none', color: '#0F172A', fontWeight: 650, fontSize: '12.5px' }}>
                <LinkedInIcon size={16} />
                <span>LinkedIn Company Page</span>
              </a>
              <a href="https://www.instagram.com/lifetrackpro/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '10px', textDecoration: 'none', color: '#0F172A', fontWeight: 650, fontSize: '12.5px' }}>
                <InstagramIcon size={16} />
                <span>Instagram @lifetrackpro</span>
              </a>
            </div>
          </div>

          {/* Support Response Notice */}
          <div className="content-card reveal reveal-delay-1" style={{ background: 'var(--bg-cream)' }}>
            <h2 className="content-card-h2" style={{ fontSize: '14.5px', color: '#0F172A' }}>
              Support Response Notice
            </h2>
            <p className="content-card-p" style={{ fontSize: '12px' }}>
              We monitor all inquiries at official domain addresses (<code style={{ background: '#FFFFFF', padding: '2px 6px', borderRadius: '4px' }}>@lifetrackpro.in</code>). {/* TODO: Add official response SLA */} For account-related inquiries, please include your registered Google Play email address in the message subject.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
