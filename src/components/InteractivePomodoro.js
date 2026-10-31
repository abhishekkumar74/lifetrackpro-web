'use client';
import { useState, useEffect } from 'react';
import { TimerIcon } from './Icons';

export default function InteractivePomodoro() {
  const modes = [
    { id: 'standard', name: '25m Focus', minutes: 25, label: 'Standard Focus' },
    { id: 'deep', name: '50m Deep Sprint', minutes: 50, label: 'Deep Work Block' },
    { id: 'short', name: '5m Short Break', minutes: 5, label: 'Recovery Break' },
    { id: 'long', name: '15m Long Break', minutes: 15, label: 'Recharge Break' },
  ];

  const soundscapes = [
    { id: 'rain', name: 'Gentle Rainfall', freq: 'Masks hostel chatter' },
    { id: 'binaural', name: '432Hz Alpha Waves', freq: 'Prefrontal flow state' },
    { id: 'cafe', name: 'Ambient Library Café', freq: 'Hawthorne focus effect' },
    { id: 'lofi', name: 'Chill Lo-Fi Beats', freq: 'Zero-distraction rhythm' },
  ];

  const [activeMode, setActiveMode] = useState(modes[0]);
  const [secondsLeft, setSecondsLeft] = useState(modes[0].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(1);
  const [activeSound, setActiveSound] = useState(soundscapes[0].id);
  const [soundPlaying, setSoundPlaying] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setCompletedSessions((c) => c + 1);
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
  const totalSeconds = activeMode.minutes * 60;
  const progressPercent = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="interactive-widget-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '28px 24px', boxShadow: 'var(--shadow-md)', margin: '28px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TimerIcon size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--text-1)' }}>Live Pomodoro Engine Simulator</div>
            <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Session {completedSessions} of 4 • {activeMode.label}</div>
          </div>
        </div>

        <div style={{ display: 'flex', background: 'var(--bg-cream)', borderRadius: '100px', padding: '3px', border: '1px solid var(--border-subtle)' }}>
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => selectMode(m)}
              style={{
                background: activeMode.id === m.id ? '#FFFFFF' : 'transparent',
                color: activeMode.id === m.id ? 'var(--primary)' : 'var(--text-2)',
                border: 'none',
                borderRadius: '100px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: activeMode.id === m.id ? 700 : 500,
                cursor: 'pointer',
                boxShadow: activeMode.id === m.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', alignItems: 'center' }}>
        {/* Timer Display */}
        <div style={{ textAlign: 'center', padding: '20px 16px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 16px' }}>
            <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--border-mid)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="8"
                strokeDasharray="326.7"
                strokeDashoffset={326.7 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
                {timeFormatted}
              </div>
              <span style={{ fontSize: '10.5px', color: isRunning ? 'var(--emerald)' : 'var(--text-3)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {isRunning ? 'Flow Active' : 'Ready'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="btn-main"
              style={{ padding: '8px 22px', fontSize: '13px' }}
            >
              {isRunning ? 'Pause Timer' : 'Start Focus'}
            </button>
            <button
              onClick={resetTimer}
              className="btn-glass"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Soundscape Selector */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Binaural Soundscape Masking</span>
            <button
              onClick={() => setSoundPlaying(!soundPlaying)}
              style={{
                background: soundPlaying ? 'rgba(5,150,105,0.12)' : 'var(--bg-cream)',
                color: soundPlaying ? 'var(--emerald)' : 'var(--text-3)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '100px',
                padding: '2px 8px',
                fontSize: '10px',
                fontWeight: 650,
                cursor: 'pointer'
              }}
            >
              {soundPlaying ? 'Stream Playing' : 'Stream Muted'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {soundscapes.map((s) => (
              <div
                key={s.id}
                onClick={() => { setActiveSound(s.id); setSoundPlaying(true); }}
                style={{
                  background: activeSound === s.id ? 'var(--primary-soft)' : 'var(--bg-warm)',
                  border: `1.5px solid ${activeSound === s.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-xs)',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 700, color: activeSound === s.id ? 'var(--primary)' : 'var(--text-1)' }}>
                  {s.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-3)', marginTop: '2px' }}>
                  {s.freq}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '14px', background: 'rgba(91,78,228,0.06)', border: '1px solid rgba(91,78,228,0.2)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', fontSize: '11px', color: 'var(--text-2)', lineHeight: '1.5' }}>
            <strong>Study OS Integration:</strong> In the Android app, this timer runs via a persistent foreground service with locked-screen widgets and auto-pausing when your study session ends.
          </div>
        </div>
      </div>
    </div>
  );
}
