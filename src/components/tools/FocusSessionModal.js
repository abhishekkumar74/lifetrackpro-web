'use client';
import { useState, useEffect } from 'react';
import { CloseIcon, TimerIcon } from '@/components/Icons';

const FOCUS_SOUNDS = [
  { id: 'rain', name: 'Gentle Rainfall', note: 'White noise acoustic mask' },
  { id: 'binaural', name: '432Hz Alpha Waves', note: 'Prefrontal flow state' },
  { id: 'cafe', name: 'Library Ambience', note: 'Mild focused presence' },
  { id: 'silent', name: 'Pure Silence', note: 'Zero auditory stimulation' },
];

export default function FocusSessionModal({
  isOpen,
  onClose,
  session,
  onComplete,
}) {
  const [secondsLeft, setSecondsLeft] = useState(50 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSound, setSelectedSound] = useState('rain');

  useEffect(() => {
    if (session) {
      setSecondsLeft((session.duration || 50) * 60);
      setIsRunning(false);
    }
  }, [session]);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onComplete && session) onComplete(session.id);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, onComplete, session]);

  if (!isOpen || !session) return null;

  const totalSeconds = (session.duration || 50) * 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeDisplay = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const handleFinish = () => {
    setIsRunning(false);
    if (onComplete && session) {
      onComplete(session.id);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="focus-modal-title"
      className="planner-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="planner-modal-window" style={{ maxWidth: '480px', textAlign: 'center' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', padding: '6px', background: 'var(--planner-indigo-light)', color: 'var(--planner-indigo)', borderRadius: '8px' }}>
              <TimerIcon size={18} />
            </span>
            <div style={{ textAlign: 'left' }}>
              <h3 id="focus-modal-title" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--planner-text-primary)', margin: 0 }}>
                Live Focus Sprint
              </h3>
              <span style={{ fontSize: '12.5px', color: 'var(--planner-text-secondary)' }}>
                {session.subject} • {session.duration}m Deep Work
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--planner-text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
            }}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Big Circular Timer Display */}
        <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle
              cx="110"
              cy="110"
              r="94"
              stroke="#E2E8F0"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="110"
              cy="110"
              r="94"
              stroke="var(--planner-indigo)"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 94}
              strokeDashoffset={2 * Math.PI * 94 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>

          <div style={{ zIndex: 2, textAlign: 'center' }}>
            <div style={{ fontSize: '42px', fontWeight: 850, fontFamily: 'var(--font-mono)', color: 'var(--planner-text-primary)', letterSpacing: '-1px' }}>
              {timeDisplay}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--planner-indigo)', marginTop: '2px' }}>
              {isRunning ? 'FOCUSING' : secondsLeft === 0 ? 'COMPLETED' : 'PAUSED'}
            </div>
          </div>
        </div>

        {/* Ambient Soundscape Selection */}
        <div style={{ marginBottom: '22px', textAlign: 'left' }}>
          <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--planner-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
            Ambient Soundscape
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {FOCUS_SOUNDS.map(snd => (
              <button
                key={snd.id}
                type="button"
                onClick={() => setSelectedSound(snd.id)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: `1.5px solid ${selectedSound === snd.id ? 'var(--planner-indigo)' : 'var(--planner-border)'}`,
                  background: selectedSound === snd.id ? 'var(--planner-indigo-light)' : '#F8FAFC',
                  color: selectedSound === snd.id ? 'var(--planner-indigo)' : 'var(--planner-text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700 }}>{snd.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--planner-text-secondary)' }}>{snd.note}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Controls */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="planner-btn-primary"
            style={{ height: '46px', padding: '0 24px', fontSize: '14.5px', flex: 1 }}
          >
            {isRunning ? '⏸ Pause Timer' : '▶ Start Focus Sprint'}
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="planner-btn-secondary"
            style={{ height: '46px', padding: '0 18px', fontSize: '13.5px' }}
          >
            ✓ Mark Done
          </button>
        </div>
      </div>
    </div>
  );
}
