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

      <article className="container subpage-container">
        <div>
          <div className="section-eyebrow">🎧 Multiplayer Focus</div>
          <h1 className="subpage-h1">Live Study Rooms: Social Accountability That Actually Works</h1>
          
          <p className="subpage-lead">
            Studying in isolation leads to endless phone scrolling. LifeTrack Pro’s live study rooms bring the disciplined energy of an IIT library directly to your desk.
          </p>

          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Quiet, Respectful, Zero-Distraction Virtual Rooms
            </h2>
            <p className="content-card-p">
              Unlike chaotic Discord servers or WhatsApp groups that invite casual chatting, LifeTrack Pro study rooms are built solely for silent, synchronized focus blocks.
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>Synchronized Pomodoro Clocks:</strong> Everyone starts and finishes 50-minute blocks together, followed by synchronized 10-minute stretch breaks.</li>
              <li>✓ <strong>Subject &amp; Exam Rooms:</strong> Join specialized rooms for JEE Physics, NEET Biology, UPSC Answer Writing, or Late-Night Lo-Fi Grind.</li>
              <li>✓ <strong>Multiplayer Presence:</strong> See peer focus times and streak rings in real-time without intrusive video feeds.</li>
              <li>✓ <strong>Super Admin Moderation:</strong> Strict moderation prevents spam and ensures an encouraging, disciplined learning environment.</li>
            </ul>
          </div>

          <div className="content-card-faq reveal reveal-delay-1">
            <h3 className="content-card-faq-h3">
              How do study rooms stop procrastination?
            </h3>
            <p className="content-card-p" style={{ marginBottom: 0 }}>
              Psychologists refer to this as the 'Hawthorne Effect'—people exert higher effort when they know they are studying in a shared space. Seeing 40 other students deeply focused on physics problems keeps you accountable.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
