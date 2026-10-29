import Link from 'next/link';

export const metadata = {
  title: 'Live 24/7 Virtual Study Rooms with Multiplayer Focus & Accountability',
  description: 'Join live multiplayer virtual study rooms with aspirants across India. Synchronized Pomodoro sessions, binaural beats, and quiet social accountability.',
  keywords: ['virtual study rooms', 'study with me online', 'multiplayer focus room', 'study group app', 'live pomodoro room'],
  alternates: {
    canonical: 'https://abhishekkumar74.github.io/lifetrackpro-web/features/study-rooms',
  },
  openGraph: {
    title: 'Live 24/7 Virtual Study Rooms with Multiplayer Focus',
    description: 'Study alongside serious peer groups in silent, synchronized virtual study rooms with 432Hz binaural audio.',
    url: 'https://abhishekkumar74.github.io/lifetrackpro-web/features/study-rooms',
  }
};

export default function StudyRoomsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhishekkumar74.github.io/lifetrackpro-web/features/study-rooms#webpage",
        "url": "https://abhishekkumar74.github.io/lifetrackpro-web/features/study-rooms",
        "name": "Live 24/7 Virtual Study Rooms with Multiplayer Focus",
        "description": "Silent synchronized multiplayer study rooms with ambient soundscapes."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhishekkumar74.github.io/lifetrackpro-web" },
          { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features" },
          { "@type": "ListItem", "position": 3, "name": "Study Rooms", "item": "https://abhishekkumar74.github.io/lifetrackpro-web/features/study-rooms" }
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

      <article className="container" style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className="section-eyebrow">🎧 Multiplayer Focus</div>
          <h1 className="section-h2">Live Study Rooms: Social Accountability That Actually Works</h1>
          
          <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '32px' }}>
            Studying in isolation leads to endless phone scrolling. LifeTrack Pro’s live study rooms bring the disciplined energy of an IIT library directly to your desk.
          </p>

          <div className="reveal" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '28px', marginBottom: '32px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '14px' }}>
              Quiet, Respectful, Zero-Distraction Virtual Rooms
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.65', marginBottom: '18px' }}>
              Unlike chaotic Discord servers or WhatsApp groups that invite casual chatting, LifeTrack Pro study rooms are built solely for silent, synchronized focus blocks.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--text-2)' }}>
              <li>✓ <strong>Synchronized Pomodoro Clocks:</strong> Everyone starts and finishes 50-minute blocks together, followed by synchronized 10-minute stretch breaks.</li>
              <li>✓ <strong>Subject &amp; Exam Rooms:</strong> Join specialized rooms for JEE Physics, NEET Biology, UPSC Answer Writing, or Late-Night Lo-Fi Grind.</li>
              <li>✓ <strong>Multiplayer Presence:</strong> See peer focus times and streak rings in real-time without intrusive video feeds.</li>
              <li>✓ <strong>Super Admin Moderation:</strong> Strict moderation prevents spam and ensures an encouraging, disciplined learning environment.</li>
            </ul>
          </div>

          <div className="reveal reveal-delay-1" style={{ background: 'var(--bg-cream)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '10px' }}>
              How do study rooms stop procrastination?
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.6' }}>
              Psychologists refer to this as the 'Hawthorne Effect'—people exert higher effort when they know they are studying in a shared space. Seeing 40 other students deeply focused on physics problems keeps you accountable.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-main">
              <span>🎧</span> View Live Rooms on Home
            </Link>
            <Link href="/features" className="btn-glass">
              ← Back to All Features
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
