'use client';
import { useState, useEffect } from 'react';

export default function PhoneSimulator() {
  const [activeTab, setActiveTab] = useState('timer');
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, name: "Wake up at 6:00 AM", streak: 24, done: true },
    { id: 2, name: "Solve 50 MCQs Daily", streak: 12, done: false },
    { id: 3, name: "30 Min Spaced Repetition", streak: 19, done: false }
  ]);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const ringOffset = 440 * (1 - secondsLeft / (25 * 60));

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  const handleGrade = (grade) => {
    setCardFlipped(false);
    alert(`SM-2 Algorithm: Recorded rating "${grade}". Optimal review interval scheduled.`);
  };

  return (
    <div className="phone-container">
      <div className="phone-body">
        <div className="dynamic-island">
          <div className="di-camera"></div>
          <div className="di-indicator"></div>
        </div>

        <div className="phone-screen">
          <div className="ps-bar">
            <span>9:41</span>
            <span>5G 􀛨 100%</span>
          </div>

          <div className="sim-nav-switcher">
            <button
              className={`sim-tab-btn ${activeTab === 'timer' ? 'active' : ''}`}
              onClick={() => setActiveTab('timer')}
            >
              Timer
            </button>
            <button
              className={`sim-tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
              onClick={() => setActiveTab('cards')}
            >
              Cards
            </button>
            <button
              className={`sim-tab-btn ${activeTab === 'habits' ? 'active' : ''}`}
              onClick={() => setActiveTab('habits')}
            >
              Habits
            </button>
            <button
              className={`sim-tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms
            </button>
          </div>

          {/* TAB 1: TIMER */}
          {activeTab === 'timer' && (
            <div className="sim-view active">
              <div className="timer-circle-wrap">
                <svg className="timer-svg" viewBox="0 0 160 160">
                  <circle className="timer-track" cx="80" cy="80" r="70"></circle>
                  <circle
                    className="timer-progress"
                    cx="80"
                    cy="80"
                    r="70"
                    style={{ strokeDashoffset: ringOffset }}
                  ></circle>
                </svg>
                <div className="timer-text-content">
                  <div className="timer-clock">{timeFormatted}</div>
                  <div className="timer-tag">{timerRunning ? 'Focusing' : 'Pomodoro'}</div>
                </div>
              </div>

              <div className="timer-controls">
                <button
                  className="timer-btn primary"
                  onClick={() => setTimerRunning(!timerRunning)}
                >
                  {timerRunning ? 'Pause' : 'Start Focus'}
                </button>
                <button
                  className="timer-btn"
                  onClick={() => { setTimerRunning(false); setSecondsLeft(25 * 60); }}
                >
                  Reset
                </button>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-3)', textAlign: 'center', marginTop: '10px' }}>
                Binaural Ambient Soundscapes
              </div>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '4px' }}>
                <span style={{ fontSize: '10px', background: 'rgba(37, 99, 235, 0.25)', padding: '3px 10px', borderRadius: '100px', color: '#93C5FD', border: '1px solid #3B82F6', fontWeight: 600 }}>
                  Rainfall
                </span>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: '100px', color: '#94A3B8' }}>
                  Café Ambient
                </span>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: '100px', color: '#94A3B8' }}>
                  432Hz Lo-Fi
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: FLASHCARDS */}
          {activeTab === 'cards' && (
            <div className="sim-view active">
              <div style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', justifyContent: 'space-between' }}>
                <span>Deck: Physics NEET / JEE</span>
                <span style={{ color: '#60A5FA', fontWeight: 650 }}>Card 3 of 28</span>
              </div>

              <div className="flashcard-3d-box" onClick={() => setCardFlipped(!cardFlipped)}>
                <div className={`flashcard-inner ${cardFlipped ? 'flipped' : ''}`}>
                  <div className="flashcard-front">
                    <div className="fc-deck-badge" style={{ color: '#60A5FA' }}>Question (Click to flip)</div>
                    <div className="fc-question">State the Second Law of Thermodynamics (Clausius Statement)</div>
                    <div style={{ fontSize: '10px', color: '#94A3B8', textAlign: 'center' }}>Tap to reveal answer</div>
                  </div>
                  <div className="flashcard-back">
                    <div className="fc-deck-badge" style={{ color: '#60A5FA' }}>Answer</div>
                    <div className="fc-question" style={{ fontSize: '12px', fontWeight: 500 }}>
                      &quot;Heat cannot spontaneously flow from a colder body to a warmer body without external work.&quot;
                    </div>
                    <div style={{ fontSize: '10px', color: '#94A3B8', textAlign: 'center' }}>Tap to flip back</div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '10px', color: '#94A3B8', textAlign: 'center' }}>Rate Recall Difficulty:</div>
              <div className="fc-grade-btns">
                <button className="grade-btn grade-again" onClick={() => handleGrade('Again')}>Again</button>
                <button className="grade-btn grade-hard" onClick={() => handleGrade('Hard')}>Hard</button>
                <button className="grade-btn grade-good" onClick={() => handleGrade('Good')}>Good</button>
                <button className="grade-btn grade-easy" onClick={() => handleGrade('Easy')}>Easy</button>
              </div>
            </div>
          )}

          {/* TAB 3: HABITS */}
          {activeTab === 'habits' && (
            <div className="sim-view active">
              <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Daily Consistency Routine:</div>
              {habits.map((h) => (
                <div
                  key={h.id}
                  className={`habit-item ${h.done ? 'completed' : ''}`}
                  onClick={() => toggleHabit(h.id)}
                >
                  <div className="habit-left">
                    <div className="habit-check-box">{h.done ? '✓' : ''}</div>
                    <span className="habit-name">{h.name}</span>
                  </div>
                  <div className="habit-streak" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: 'var(--amber)', fontWeight: 800 }}>★</span> {h.streak}d
                  </div>
                </div>
              ))}
              <div style={{ background: 'rgba(217,119,6,0.12)', border: '1px solid rgba(217,119,6,0.3)', borderRadius: '10px', padding: '8px 12px', fontSize: '11px', color: '#F59E0B', marginTop: 'auto' }}>
                1 streak freeze shield remaining this week
              </div>
            </div>
          )}

          {/* TAB 4: ROOMS */}
          {activeTab === 'rooms' && (
            <div className="sim-view active">
              <div style={{ background: 'rgba(37, 99, 235, 0.16)', border: '1px solid rgba(59, 130, 246, 0.35)', borderRadius: '12px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>JEE Physics Marathon</span>
                  <span style={{ background: '#EF4444', color: 'white', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '100px' }}>LIVE</span>
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>42 students studying together</div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: '#fff' }}>A</div>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, marginLeft: '-6px', color: '#fff' }}>P</div>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, marginLeft: '-6px', color: '#fff' }}>+40</div>
                </div>
                <div style={{ fontSize: '11px', color: '#60A5FA', fontWeight: 550 }}>
                  Binaural 432Hz Soundscape Active
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
