'use client';
import { useState, useEffect } from 'react';

export default function InteractiveUpscTimer() {
  const modes = [
    { id: '10m', name: '10-Marker (7 mins)', minutes: 7, words: '150 words', target: 'Introduction (1m) + 6 Points + Conclusion' },
    { id: '15m', name: '15-Marker (11 mins)', minutes: 11, words: '250 words', target: 'Context (1.5m) + Dimensions (GS1-4) + Way Forward' },
    { id: 'ethics', name: 'Ethics Case (15 mins)', minutes: 15, words: '300 words', target: 'Stakeholders + Ethical Dilemmas + Action Matrix' },
  ];

  const [activeMode, setActiveMode] = useState(modes[0]);
  const [secondsLeft, setSecondsLeft] = useState(modes[0].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [answersPracticed, setAnswersPracticed] = useState(3);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setAnswersPracticed((a) => a + 1);
            return activeMode.minutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, activeMode]);

  const selectMode = (m) => {
    setActiveMode(m);
    setSecondsLeft(m.minutes * 60);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(activeMode.minutes * 60);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="interactive-widget-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '26px 22px', boxShadow: 'var(--shadow-md)', margin: '26px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--text-1)' }}>
            UPSC Mains Daily Answer Writing Stopwatch
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>
            Strict time boundary simulator • {answersPracticed} answers written this week
          </div>
        </div>

        <div style={{ display: 'flex', background: 'var(--bg-cream)', borderRadius: '100px', padding: '3px', border: '1px solid var(--border-subtle)' }}>
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => selectMode(m)}
              style={{
                background: activeMode.id === m.id ? '#FFFFFF' : 'transparent',
                color: activeMode.id === m.id ? 'var(--amber)' : 'var(--text-2)',
                border: 'none',
                borderRadius: '100px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: activeMode.id === m.id ? 750 : 500,
                cursor: 'pointer',
                boxShadow: activeMode.id === m.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', alignItems: 'center' }}>
        {/* Stopwatch Display */}
        <div style={{ textAlign: 'center', padding: '18px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', fontWeight: 700 }}>
            {activeMode.name} • Target {activeMode.words}
          </div>
          <div style={{ fontSize: '40px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-1)', letterSpacing: '-0.02em', margin: '6px 0 14px' }}>
            {timeFormatted}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="btn-main"
              style={{ padding: '8px 20px', fontSize: '13px' }}
            >
              {isRunning ? 'Pause Writing' : 'Start Writing Block'}
            </button>
            <button
              onClick={resetTimer}
              className="btn-glass"
              style={{ padding: '8px 14px', fontSize: '13px' }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Answer Writing Structure Framework */}
        <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-xs)', padding: '16px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '12px', fontWeight: 750, color: 'var(--text-1)', marginBottom: '8px' }}>
            High-Scoring Mains Answer Blueprint:
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-2)', lineHeight: '1.5' }}>
            {activeMode.target}
          </div>

          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', padding: '6px 10px', background: 'var(--bg-warm)', borderRadius: '6px' }}>
              <span>Phase 1 (1st min):</span>
              <strong style={{ color: 'var(--primary)' }}>Deconstruct Directives (Critically Analyze, Discuss)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', padding: '6px 10px', background: 'var(--bg-warm)', borderRadius: '6px' }}>
              <span>Phase 2 (Middle):</span>
              <strong style={{ color: 'var(--emerald)' }}>Sub-headings, Data &amp; Schematic Diagrams</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', padding: '6px 10px', background: 'var(--bg-warm)', borderRadius: '6px' }}>
              <span>Phase 3 (Final min):</span>
              <strong style={{ color: 'var(--amber)' }}>SDG / NITI Aayog / Supreme Court Citations</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
