import Link from 'next/link';

export const metadata = {
  title: 'Live 24/7 Virtual Study Rooms & Multiplayer Social Accountability',
  description: 'Join live multiplayer virtual study rooms with aspirants across India. Synchronized Pomodoro sessions, binaural beats, and quiet social accountability.',
  keywords: ['virtual study rooms', 'study with me online', 'multiplayer focus room', 'study group app', 'live pomodoro room']
};

export default function StudyRoomsPage() {
  return (
    <article className="container" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-eyebrow">🎧 Multiplayer Focus</div>
        <h1 className="section-h2">Live Study Rooms: Social Accountability That Actually Works</h1>
        
        <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '40px' }}>
          Studying in isolation leads to endless phone scrolling. LifeTrack Pro’s live study rooms bring the disciplined energy of an IIT library directly to your desk.
        </p>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '36px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Quiet, Respectful, Zero-Distraction Virtual Rooms
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '20px' }}>
            Unlike chaotic Discord servers or WhatsApp groups that invite casual chatting, LifeTrack Pro study rooms are built solely for silent, synchronized focus blocks.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-2)' }}>
            <li>✓ <strong>Synchronized Pomodoro Clocks:</strong> Everyone starts and finishes 50-minute blocks together, followed by synchronized 10-minute stretch breaks.</li>
            <li>✓ <strong>Subject &amp; Exam Rooms:</strong> Join specialized rooms for JEE Physics, NEET Biology, UPSC Answer Writing, or Late-Night Lo-Fi Grind.</li>
            <li>✓ <strong>Multiplayer Presence:</strong> See peer focus times and streak rings in real-time without intrusive video feeds.</li>
            <li>✓ <strong>Super Admin Moderation:</strong> Strict moderation prevents spam and ensures an encouraging, disciplined learning environment.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/features" className="btn-main">
            <span>✨</span> Explore All Features
          </Link>
          <Link href="/faq" className="btn-glass">
            Got Questions? Read FAQ →
          </Link>
        </div>
      </div>
    </article>
  );
}
