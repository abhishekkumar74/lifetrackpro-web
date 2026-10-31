'use client';
import { useState } from 'react';

export default function InteractiveJeePlanner() {
  const subjects = {
    physics: {
      name: 'Physics',
      chapters: [
        { name: 'Rotational Motion & Inertia', weight: 'High (8-12 marks)', formulaCount: 28, reviewed: true },
        { name: 'Current Electricity & Magnetism', weight: 'High (12-16 marks)', formulaCount: 35, reviewed: true },
        { name: 'Thermodynamics & Kinetic Theory', weight: 'High (8-12 marks)', formulaCount: 22, reviewed: false },
        { name: 'Modern Physics & Dual Nature', weight: 'Very High (16-20 marks)', formulaCount: 19, reviewed: true },
        { name: 'Optics (Wave & Ray)', weight: 'Medium (8 marks)', formulaCount: 26, reviewed: false },
      ]
    },
    chemistry: {
      name: 'Chemistry',
      chapters: [
        { name: 'Coordination Compounds', weight: 'High (8-12 marks)', formulaCount: 18, reviewed: true },
        { name: 'Organic Reaction Mechanisms (GOC)', weight: 'Very High (16-24 marks)', formulaCount: 42, reviewed: false },
        { name: 'Chemical Bonding & Molecular Structure', weight: 'High (8-12 marks)', formulaCount: 20, reviewed: true },
        { name: 'Electrochemistry & Solutions', weight: 'High (8-12 marks)', formulaCount: 25, reviewed: false },
        { name: 'P-Block & D-Block Elements', weight: 'High (12 marks)', formulaCount: 30, reviewed: true },
      ]
    },
    maths: {
      name: 'Mathematics',
      chapters: [
        { name: 'Differential Calculus & Maxima-Minima', weight: 'Very High (16-20 marks)', formulaCount: 32, reviewed: true },
        { name: 'Definite Integration & Area under Curve', weight: 'High (12-16 marks)', formulaCount: 28, reviewed: false },
        { name: 'Vectors & 3D Geometry', weight: 'Very High (16-20 marks)', formulaCount: 24, reviewed: true },
        { name: 'Matrices & Determinants', weight: 'High (8-12 marks)', formulaCount: 16, reviewed: true },
        { name: 'Conic Sections (Parabola, Ellipse, Hyperbola)', weight: 'High (12 marks)', formulaCount: 34, reviewed: false },
      ]
    }
  };

  const [activeSub, setActiveSub] = useState('physics');
  const [data, setData] = useState(subjects);

  const toggleChapter = (subKey, idx) => {
    setData((prev) => {
      const next = { ...prev };
      next[subKey].chapters[idx].reviewed = !next[subKey].chapters[idx].reviewed;
      return { ...next };
    });
  };

  const currentChapters = data[activeSub].chapters;
  const reviewedCount = currentChapters.filter((c) => c.reviewed).length;
  const totalFormulas = currentChapters.reduce((sum, c) => sum + c.formulaCount, 0);

  return (
    <div className="interactive-widget-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '26px 22px', boxShadow: 'var(--shadow-md)', margin: '26px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--text-1)' }}>
            JEE Main &amp; Advanced High-Yield Syllabus Tracker
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>
            {reviewedCount} of {currentChapters.length} priority chapters reviewed • {totalFormulas} formula flashcards
          </div>
        </div>

        <div style={{ display: 'flex', background: 'var(--bg-cream)', borderRadius: '100px', padding: '3px', border: '1px solid var(--border-subtle)' }}>
          {Object.keys(subjects).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSub(key)}
              style={{
                background: activeSub === key ? '#FFFFFF' : 'transparent',
                color: activeSub === key ? 'var(--primary)' : 'var(--text-2)',
                border: 'none',
                borderRadius: '100px',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: activeSub === key ? 750 : 500,
                cursor: 'pointer',
                boxShadow: activeSub === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {subjects[key].name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {currentChapters.map((chap, idx) => (
          <div
            key={chap.name}
            onClick={() => toggleChapter(activeSub, idx)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 14px',
              borderRadius: 'var(--radius-xs)',
              background: chap.reviewed ? 'rgba(5,150,105,0.06)' : 'var(--bg-warm)',
              border: `1.5px solid ${chap.reviewed ? 'rgba(5,150,105,0.3)' : 'var(--border-subtle)'}`,
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
                  border: `1.5px solid ${chap.reviewed ? 'var(--emerald)' : 'var(--border-mid)'}`,
                  background: chap.reviewed ? 'var(--emerald)' : '#FFFFFF',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 800,
                  transition: 'all 0.15s ease'
                }}
              >
                {chap.reviewed ? '✓' : ''}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 650, color: 'var(--text-1)' }}>
                  {chap.name}
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-3)' }}>
                  {chap.formulaCount} SM-2 Formula Cards
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-soft)', padding: '2px 8px', borderRadius: '100px' }}>
                {chap.weight}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '16px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', padding: '12px 14px', border: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--text-2)', lineHeight: '1.5' }}>
        <strong>Biological Clock Calibration:</strong> Top rankers schedule two strict 3-hour Pomodoro simulation blocks at 9:00 AM - 12:00 PM and 2:30 PM - 5:30 PM to align neural alertness with official NTA exam shifts.
      </div>
    </div>
  );
}
