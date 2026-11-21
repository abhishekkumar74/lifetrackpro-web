'use client';
import { useState, useEffect } from 'react';
import { HeadphonesIcon } from './Icons';

export default function InteractiveStudyRooms() {
  const rooms = [
    {
      id: 'jee',
      title: 'IIT JEE Physics Marathon',
      badge: 'JEE Main & Adv',
      badgeColor: '#2563EB',
      cadence: '50/10 Pomodoro',
      soundscape: 'Focus Alpha Tones',
      topic: 'Rotational Motion & Electrodynamics Practice'
    },
    {
      id: 'neet',
      title: 'NEET Biology Rapid Recall',
      badge: 'Medical AIIMS',
      badgeColor: '#059669',
      cadence: '50/10 Pomodoro',
      soundscape: 'Gentle Rain Stream',
      topic: 'NCERT Class 12 Genetics & Biotechnology'
    },
    {
      id: 'upsc',
      title: 'UPSC Mains Answer Sprint',
      badge: 'Civil Services',
      badgeColor: '#D97706',
      cadence: '25/5 Sprint',
      soundscape: 'Café White Noise',
      topic: 'GS Paper 2 Polity & Governance 15-Markers'
    },
    {
      id: 'lofi',
      title: 'Late Night Focus Grind',
      badge: 'Universal Focus',
      badgeColor: '#1D4ED8',
      cadence: '50/10 Pomodoro',
      soundscape: 'Chill Lo-Fi Beats',
      topic: 'Silent Deep Work & Problem Solving'
    }
  ];

  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [secondsLeft, setSecondsLeft] = useState(38 * 60 + 24);
  const [audioStreamActive, setAudioStreamActive] = useState(true);

  useEffect(() => {
    let interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 50 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="interactive-widget-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '28px 24px', boxShadow: 'var(--shadow-md)', margin: '28px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', background: 'rgba(225,29,72,0.1)', color: 'var(--rose)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeadphonesIcon size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--text-1)' }}>Virtual Study Room Simulator</div>
            <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Demo preview of camera-free multiplayer focus rooms</div>
          </div>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(37,99,235,0.08)', padding: '4px 10px', borderRadius: '100px', color: 'var(--primary)', fontSize: '11px', fontWeight: 750 }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
          DEMO PREVIEW
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '20px', alignItems: 'stretch' }}>
        {/* Room Selection Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%', justifyContent: 'space-between' }}>
          {rooms.map((r) => (
            <div
              key={r.id}
              role="button"
              tabIndex={0}
              aria-label={`Select ${r.title}`}
              onClick={() => setActiveRoom(r)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveRoom(r);
                }
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                borderRadius: 'var(--radius-xs)',
                background: activeRoom.id === r.id ? 'var(--primary-soft)' : 'var(--bg-warm)',
                border: `1.5px solid ${activeRoom.id === r.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '9.5px', fontWeight: 750, color: r.badgeColor, background: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                    {r.badge}
                  </span>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-3)' }}>{r.soundscape}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-1)' }}>
                  {r.title}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-3)', marginTop: '2px' }}>
                  Focus: {r.topic}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-2)' }}>
                  {r.cadence}
                </span>
                <span style={{ display: 'block', fontSize: '10px', color: 'var(--primary)', fontWeight: 600 }}>
                  {activeRoom.id === r.id ? 'Active' : 'Preview →'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Active Room Simulator Screen */}
        <div style={{ background: 'var(--bg-warm)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-subtle)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 750, color: 'var(--text-1)' }}>
                {activeRoom.title}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>
                Synchronized 50/10 Pomodoro Block
              </div>
            </div>
            <button
              onClick={() => setAudioStreamActive(!audioStreamActive)}
              style={{
                background: audioStreamActive ? 'rgba(5,150,105,0.1)' : 'var(--bg-cream)',
                color: audioStreamActive ? 'var(--emerald)' : 'var(--text-3)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '100px',
                padding: '3px 10px',
                fontSize: '10.5px',
                fontWeight: 650,
                cursor: 'pointer'
              }}
            >
              {audioStreamActive ? 'Ambient Soundscape On' : 'Soundscape Muted'}
            </button>
          </div>

          <div style={{ textAlign: 'center', padding: '16px', background: '#FFFFFF', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', margin: '12px 0' }}>
            <div style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-1)' }}>
              {timeFormatted}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 650, marginTop: '2px' }}>
              Deep Focus Session in Progress
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-2)', marginBottom: '10px' }}>
            <strong>Room Focus Guidelines (Camera-Free):</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { rule: '100% Silent Environment', desc: 'No open microphones or side chatter. Pure task immersion.' },
              { rule: 'Synchronized Interval Timer', desc: '50-minute study blocks + 10-minute rest chimes.' },
              { rule: 'Zero Video Fatigue', desc: 'No webcams required. Protects student privacy and mobile data.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', padding: '8px 10px', background: '#FFFFFF', borderRadius: '6px', border: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontWeight: 650, color: 'var(--text-1)' }}>✓ {item.rule}</span>
                <span style={{ color: 'var(--text-3)', fontSize: '10.5px' }}>{item.desc}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '12px', fontSize: '10.5px', color: 'var(--text-3)', lineHeight: '1.45' }}>
            <strong>Zero Video Fatigue:</strong> No webcams or audio mics required. Silent multiplayer accountability eliminates self-consciousness while boosting sustained effort.
          </div>
        </div>
      </div>
    </div>
  );
}
