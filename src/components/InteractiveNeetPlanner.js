'use client';
import { useState } from 'react';

export default function InteractiveNeetPlanner() {
  const [ncertChapters, setNcertChapters] = useState([
    { name: 'Molecular Basis of Inheritance', subject: 'Biology', cards: 54, done: true, marks: '16-20 marks' },
    { name: 'Principles of Inheritance & Variation', subject: 'Biology', cards: 48, done: true, marks: '16 marks' },
    { name: 'Human Physiology (Endocrine & Neural)', subject: 'Biology', cards: 62, done: false, marks: '24 marks' },
    { name: 'Morphology & Anatomy of Plants', subject: 'Biology', cards: 38, done: true, marks: '12 marks' },
    { name: 'Organic Chemistry Named Reactions', subject: 'Chemistry', cards: 45, done: false, marks: '20 marks' },
    { name: 'Ray Optics & Modern Physics Formulas', subject: 'Physics', cards: 32, done: false, marks: '24 marks' },
  ]);

  const [activeTab, setActiveTab] = useState('ncert');

  const toggleChapter = (index) => {
    setNcertChapters((prev) =>
      prev.map((c, i) => (i === index ? { ...c, done: !c.done } : c))
    );
  };

  const completedCards = ncertChapters
    .filter((c) => c.done)
    .reduce((sum, c) => sum + c.cards, 0);

  const totalCards = ncertChapters.reduce((sum, c) => sum + c.cards, 0);

  return (
    <div className="interactive-widget-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '26px 22px', boxShadow: 'var(--shadow-md)', margin: '26px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--text-1)' }}>
            NEET NCERT Active Recall &amp; Timetable Engine
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>
            {completedCards} of {totalCards} high-yield NCERT flashcards mastered today
          </div>
        </div>

        <div style={{ display: 'flex', background: 'var(--bg-cream)', borderRadius: '100px', padding: '3px', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setActiveTab('ncert')}
            style={{
              background: activeTab === 'ncert' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'ncert' ? 'var(--emerald)' : 'var(--text-2)',
              border: 'none',
              borderRadius: '100px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: activeTab === 'ncert' ? 750 : 500,
              cursor: 'pointer',
              boxShadow: activeTab === 'ncert' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            NCERT Flashcard Deck
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            style={{
              background: activeTab === 'schedule' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'schedule' ? 'var(--emerald)' : 'var(--text-2)',
              border: 'none',
              borderRadius: '100px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: activeTab === 'schedule' ? 750 : 500,
              cursor: 'pointer',
              boxShadow: activeTab === 'schedule' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            12-Hour Topper Timetable
          </button>
        </div>
      </div>

      {activeTab === 'ncert' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {ncertChapters.map((chap, idx) => (
            <div
              key={chap.name}
              onClick={() => toggleChapter(idx)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                borderRadius: 'var(--radius-xs)',
                background: chap.done ? 'rgba(5,150,105,0.06)' : 'var(--bg-warm)',
                border: `1.5px solid ${chap.done ? 'rgba(5,150,105,0.3)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    border: `1.5px solid ${chap.done ? 'var(--emerald)' : 'var(--border-mid)'}`,
                    background: chap.done ? 'var(--emerald)' : '#FFFFFF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 800,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {chap.done ? '✓' : ''}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 650, color: 'var(--text-1)' }}>
                    {chap.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-3)' }}>
                    {chap.subject} • {chap.cards} SM-2 cards
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--emerald)', background: 'rgba(5,150,105,0.1)', padding: '2px 8px', borderRadius: '100px' }}>
                  {chap.marks}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { time: '06:00 - 08:00 AM', title: 'Biology Active Recall Queue', desc: '50-80 NCERT flashcards before breakfast using SM-2' },
            { time: '09:00 - 01:00 PM', title: 'Physics Numerical Problem Sprint', desc: '4 x 50-minute Pomodoro blocks with 432Hz binaural beats' },
            { time: '02:30 - 05:30 PM', title: 'Chemistry Reactions & Physical Chemistry', desc: '3 x 50-minute blocks (GOC mechanisms & thermodynamics)' },
            { time: '07:00 - 10:00 PM', title: 'Live Study Room & Mock Error Analysis', desc: 'Study alongside AIIMS aspirants in silent virtual study room' },
          ].map((block, i) => (
            <div key={i} style={{ padding: '12px 14px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 750, color: 'var(--emerald)', textTransform: 'uppercase' }}>{block.time}</span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-1)', marginTop: '2px' }}>{block.title}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-3)' }}>{block.desc}</div>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 700 }}>Active</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '16px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', padding: '12px 14px', border: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--text-2)', lineHeight: '1.5' }}>
        <strong>The 360/360 Biology Rule:</strong> Over 85% of NEET questions test line-by-line NCERT memory. LifeTrack Pro extracts every diagram label and scientific example into daily active recall queues.
      </div>
    </div>
  );
}
