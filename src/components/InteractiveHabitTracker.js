'use client';
import { useState } from 'react';
import { HabitFlameIcon } from './Icons';

export default function InteractiveHabitTracker() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Wake up at 6:00 AM', streak: 28, completedToday: true, category: 'Discipline' },
    { id: 2, name: 'Solve 50 Hard MCQs', streak: 14, completedToday: false, category: 'Academics' },
    { id: 3, name: 'Review Due Flashcards Queue', streak: 35, completedToday: true, category: 'Recall' },
    { id: 4, name: '90-Min Deep Focus Block', streak: 21, completedToday: false, category: 'Focus' },
  ]);

  const [freezeShieldActive, setFreezeShieldActive] = useState(false);
  const [freezeTokens, setFreezeTokens] = useState(2);

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const nextState = !h.completedToday;
          return {
            ...h,
            completedToday: nextState,
            streak: nextState ? h.streak + 1 : h.streak - 1,
          };
        }
        return h;
      })
    );
  };

  const toggleFreezeShield = () => {
    if (!freezeShieldActive && freezeTokens > 0) {
      setFreezeShieldActive(true);
      setFreezeTokens((t) => t - 1);
    } else if (freezeShieldActive) {
      setFreezeShieldActive(false);
      setFreezeTokens((t) => t + 1);
    }
  };

  const completedCount = habits.filter((h) => h.completedToday).length;
  const progressPercent = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="interactive-widget-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '28px 24px', boxShadow: 'var(--shadow-md)', margin: '28px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', background: 'rgba(217,119,6,0.1)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HabitFlameIcon size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--text-1)' }}>Daily Habit Streak &amp; Freeze Engine</div>
            <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>{completedCount} of {habits.length} routines completed today ({progressPercent}%)</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={toggleFreezeShield}
            style={{
              background: freezeShieldActive ? 'rgba(91,78,228,0.12)' : 'var(--bg-cream)',
              color: freezeShieldActive ? 'var(--primary)' : 'var(--text-2)',
              border: `1.5px solid ${freezeShieldActive ? 'var(--primary)' : 'var(--border-subtle)'}`,
              borderRadius: '100px',
              padding: '5px 12px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{freezeShieldActive ? 'Shield Armed' : 'Arm Freeze Shield'}</span>
            <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.06)', padding: '1px 6px', borderRadius: '100px' }}>
              {freezeTokens} left
            </span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '6px', background: 'var(--bg-warm)', borderRadius: '100px', overflow: 'hidden', marginBottom: '20px', border: '1px solid var(--border-subtle)' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${progressPercent}%`, 
            background: progressPercent === 100 ? 'var(--emerald)' : 'var(--primary)', 
            transition: 'width 0.3s ease' 
          }} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
        {/* Habit List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {habits.map((h) => (
            <div
              key={h.id}
              onClick={() => toggleHabit(h.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                borderRadius: 'var(--radius-xs)',
                background: h.completedToday ? 'rgba(5,150,105,0.06)' : 'var(--bg-warm)',
                border: `1.5px solid ${h.completedToday ? 'rgba(5,150,105,0.3)' : 'var(--border-subtle)'}`,
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
                    border: `1.5px solid ${h.completedToday ? 'var(--emerald)' : 'var(--border-mid)'}`,
                    background: h.completedToday ? 'var(--emerald)' : '#FFFFFF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 800,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {h.completedToday ? '✓' : ''}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 650, color: h.completedToday ? 'var(--text-1)' : 'var(--text-2)', textDecoration: h.completedToday ? 'line-through' : 'none' }}>
                    {h.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-3)' }}>
                    {h.category}
                  </div>
                </div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 750, color: 'var(--amber)', background: 'rgba(217,119,6,0.1)', padding: '3px 8px', borderRadius: '100px' }}>
                <span style={{ fontSize: '11px' }}>★</span>
                <span>{h.streak}d streak</span>
              </div>
            </div>
          ))}
        </div>

        {/* Shield Explanation & Weekly Habit Rhythm */}
        <div style={{ background: 'var(--bg-warm)', borderRadius: 'var(--radius-md)', padding: '16px 18px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 750, color: 'var(--text-1)', marginBottom: '8px' }}>
            Weekly Habit Momentum
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 0', padding: '10px', background: '#FFFFFF', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
              const isPast = idx < 4;
              const isToday = idx === 4;
              return (
                <div key={day} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '9.5px', color: 'var(--text-3)', marginBottom: '4px' }}>{day}</div>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isPast ? 'var(--emerald)' : isToday ? (completedCount > 0 ? 'var(--primary)' : 'var(--amber)') : 'var(--bg-cream)',
                      color: isPast || (isToday && completedCount > 0) ? '#FFFFFF' : 'var(--text-3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 700,
                      margin: '0 auto'
                    }}
                  >
                    {isPast ? '✓' : isToday ? completedCount : '•'}
                  </div>
                </div>
              );
            })}
          </div>

          {freezeShieldActive && (
            <div style={{ background: 'rgba(91,78,228,0.08)', border: '1px solid rgba(91,78,228,0.3)', borderRadius: 'var(--radius-xs)', padding: '10px 12px', fontSize: '11.5px', color: 'var(--primary)', marginBottom: '10px', lineHeight: '1.45' }}>
              <strong>Shield Armed:</strong> If you miss today due to travel, illness, or emergency, your 28-day streak will be preserved automatically.
            </div>
          )}

          <div style={{ fontSize: '11px', color: 'var(--text-2)', lineHeight: '1.5' }}>
            <strong>Psychological Rule:</strong> Never miss twice. One missed day is an accident; two missed days is the start of a destructive new habit. LifeTrack Pro streak shields protect your consistency identity.
          </div>
        </div>
      </div>
    </div>
  );
}
