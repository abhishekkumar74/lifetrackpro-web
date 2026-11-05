'use client';
import { useState } from 'react';
import AppPromotionCard from './AppPromotionCard';
import AfterActionAppSuggestion from './AfterActionAppSuggestion';

export default function WeeklyStudyPlanner() {
  const [weeklyGoal, setWeeklyGoal] = useState(42);
  const [sundayMode, setSundayMode] = useState('mock'); // 'mock', 'revision', 'rest'
  const [sub1, setSub1] = useState('Physics / Analytical Core');
  const [sub2, setSub2] = useState('Chemistry / Theoretical');
  const [sub3, setSub3] = useState('Mathematics / Biology');
  const [copied, setCopied] = useState(false);
  const [actionSuggestion, setActionSuggestion] = useState(null);
  const [completedDays, setCompletedDays] = useState({});

  // Calculation
  const studyDaysCount = sundayMode === 'rest' ? 6 : 7;
  const weekdayHours = Math.round(weeklyGoal / studyDaysCount);

  const days = [
    { day: 'Monday', focus: `${sub1} Problem Sprints + ${sub2} Concepts`, hours: weekdayHours, pomodoros: Math.round((weekdayHours * 60) / 60) },
    { day: 'Tuesday', focus: `${sub2} Revision + ${sub3} Advanced Numerical Practice`, hours: weekdayHours, pomodoros: Math.round((weekdayHours * 60) / 60) },
    { day: 'Wednesday', focus: `${sub1} Hard Problems + ${sub3} SM-2 Active Recall`, hours: weekdayHours, pomodoros: Math.round((weekdayHours * 60) / 60) },
    { day: 'Thursday', focus: `${sub2} High-Yield Theory + ${sub1} Timed MCQs`, hours: weekdayHours, pomodoros: Math.round((weekdayHours * 60) / 60) },
    { day: 'Friday', focus: `${sub3} Full Chapter Drills + Weekly Backlog Clearance`, hours: weekdayHours, pomodoros: Math.round((weekdayHours * 60) / 60) },
    { day: 'Saturday', focus: `Full Syllabus Consolidation + All Subjects Formula Recall`, hours: weekdayHours, pomodoros: Math.round((weekdayHours * 60) / 60) },
    { 
      day: 'Sunday', 
      focus: sundayMode === 'mock' 
        ? 'Full-Length 3-Hour Mock Test + Deep Error Analysis' 
        : sundayMode === 'revision' 
          ? 'Light Weak-Topic Revision & Flashcard Queue Mastery' 
          : 'Complete Cognitive Recovery & Streak Freeze Shield Rest',
      hours: sundayMode === 'rest' ? 0 : weekdayHours,
      pomodoros: sundayMode === 'rest' ? 0 : Math.round((weekdayHours * 60) / 60)
    },
  ];

  const toggleDay = (dayName) => {
    setCompletedDays(prev => ({
      ...prev,
      [dayName]: !prev[dayName]
    }));
  };

  const handleCopy = () => {
    const textLines = [
      `📅 Weekly Study Schedule (${weeklyGoal} Hours Goal)`,
      `Subjects: ${sub1} • ${sub2} • ${sub3}`,
      '--------------------------------------------------',
      ...days.map(d => `• ${d.day} (${d.hours}h): ${d.focus}`),
      '--------------------------------------------------',
      'Generated with LifeTrack Pro Weekly Study Planner: https://lifetrackpro.in/tools/weekly-study-planner'
    ].join('\n');

    navigator.clipboard.writeText(textLines).then(() => {
      setCopied(true);
      setActionSuggestion({ action: 'copy' });
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const completedCount = Object.values(completedDays).filter(Boolean).length;

  return (
    <div className="interactive-widget-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px 20px', boxShadow: 'var(--shadow-md)', margin: '24px 0' }}>
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
          <h2 style={{ fontSize: '16px', fontWeight: 750, color: 'var(--text-1)', margin: 0 }}>
            7-Day Weekly Study Schedule Builder
          </h2>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0 }}>
          Balance multiple subjects, avoid burnout, and distribute weekly revision hours across a structured 7-day template.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', padding: '16px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
        {/* Weekly Goal */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: 'var(--text-2)', marginBottom: '6px' }}>
            <span>Weekly Target Hours:</span>
            <strong style={{ color: 'var(--primary)' }}>{weeklyGoal} hrs / week</strong>
          </div>
          <input
            type="range"
            min="20"
            max="70"
            step="2"
            value={weeklyGoal}
            onChange={(e) => setWeeklyGoal(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>

        {/* Sunday Mode */}
        <div>
          <label htmlFor="sunday-mode-select" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-2)', marginBottom: '6px' }}>
            Sunday Structure:
          </label>
          <select
            id="sunday-mode-select"
            value={sundayMode}
            onChange={(e) => setSundayMode(e.target.value)}
            style={{ width: '100%', padding: '6px 8px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--border-mid)', background: '#FFFFFF' }}
          >
            <option value="mock">Full-Length Mock Test &amp; Error Analysis</option>
            <option value="revision">Light Revision &amp; Flashcard Mastery</option>
            <option value="rest">Complete Rest (Streak Shield Protected)</option>
          </select>
        </div>

        {/* Subjects Customization */}
        <div>
          <label htmlFor="sub1-input" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-2)', marginBottom: '6px' }}>
            Primary Subject 1:
          </label>
          <input
            id="sub1-input"
            type="text"
            value={sub1}
            onChange={(e) => setSub1(e.target.value)}
            style={{ width: '100%', padding: '6px 8px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--border-mid)', background: '#FFFFFF' }}
          />
        </div>

        <div>
          <label htmlFor="sub2-input" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-2)', marginBottom: '6px' }}>
            Primary Subject 2:
          </label>
          <input
            id="sub2-input"
            type="text"
            value={sub2}
            onChange={(e) => setSub2(e.target.value)}
            style={{ width: '100%', padding: '6px 8px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--border-mid)', background: '#FFFFFF' }}
          />
        </div>
      </div>

      {/* 7-Day Plan Table */}
      <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 750, color: 'var(--text-1)' }}>
              7-Day Execution Blueprint • {completedCount} of 7 days logged
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>
              Click any day to mark completion during your study week
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="btn-main"
            style={{ padding: '6px 14px', fontSize: '11.5px', borderRadius: '100px' }}
          >
            {copied ? '✓ Schedule Copied!' : 'Copy 7-Day Schedule'}
          </button>
        </div>

        {/* AFTER ROUTINE ACTIONS: Subtle App Suggestion */}
        {actionSuggestion && (
          <AfterActionAppSuggestion
            action={actionSuggestion.action}
            source="weekly_study_planner"
            onDismiss={() => setActionSuggestion(null)}
          />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {days.map((d) => {
            const isDone = !!completedDays[d.day];
            return (
              <div
                key={d.day}
                role="button"
                tabIndex={0}
                onClick={() => toggleDay(d.day)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDay(d.day);
                  }
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-xs)',
                  background: isDone ? 'rgba(5,150,105,0.06)' : 'var(--bg-warm)',
                  border: `1.5px solid ${isDone ? 'rgba(5,150,105,0.3)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      border: `1.5px solid ${isDone ? 'var(--emerald)' : 'var(--border-mid)'}`,
                      background: isDone ? 'var(--emerald)' : '#FFFFFF',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800,
                    }}
                  >
                    {isDone ? '✓' : ''}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 650, color: 'var(--text-1)' }}>
                      {d.day}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-2)' }}>
                      {d.focus}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-soft)', padding: '2px 8px', borderRadius: '100px' }}>
                    {d.hours} hours
                  </span>
                  {d.pomodoros > 0 && (
                    <span style={{ fontSize: '10.5px', color: 'var(--text-3)' }}>
                      ({d.pomodoros} x 50m sprints)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Micro Note */}
      <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--text-2)', lineHeight: 1.5 }}>
        🛡️ <strong>Habit Shields for Weekly Consistency:</strong> Missed a study session due to an unexpected family event or test fatigue? Rather than breaking your psychological momentum, arm a LifeTrack Pro Streak Freeze Shield so your multi-week consistency badge remains active.
      </div>

      {/* STRATEGIC APP CTA PLACEMENT 1: Below Generated Routine */}
      <AppPromotionCard
        source="weekly_study_planner"
        placement="below_generated_routine"
      />
    </div>
  );
}