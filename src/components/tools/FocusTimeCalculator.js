'use client';
import { useState } from 'react';

export default function FocusTimeCalculator() {
  const [deskHours, setDeskHours] = useState(8);
  const [distractionLevel, setDistractionLevel] = useState('moderate');
  const [pomodoroCadence, setPomodoroCadence] = useState('50');

  // Efficiency factor based on attention residue science (Dr. Gloria Mark / Cal Newport)
  const efficiencyMap = {
    minimal: { ratio: 0.88, label: 'High Focus (Minimal Distraction)', penaltyDesc: '~12% lost to brief pauses & biological breaks' },
    moderate: { ratio: 0.65, label: 'Fragmented Focus (Notifications/Tab switching)', penaltyDesc: '~35% lost to attention residue & notification checks' },
    high: { ratio: 0.42, label: 'Heavy Multitasking (Frequent social media / video feeds)', penaltyDesc: '~58% lost to continuous cognitive disruption' },
  };

  const selectedEff = efficiencyMap[distractionLevel];
  const netDeepHours = (deskHours * selectedEff.ratio).toFixed(1);
  const lostHours = (deskHours - parseFloat(netDeepHours)).toFixed(1);

  // Calculate Pomodoro intervals
  const cadenceMinutes = parseInt(pomodoroCadence, 10);
  const breakMinutes = cadenceMinutes === 25 ? 5 : cadenceMinutes === 50 ? 10 : 20;
  const cycleMinutes = cadenceMinutes + breakMinutes;
  const totalAvailableMinutes = deskHours * 60;
  const completedBlocks = Math.floor(totalAvailableMinutes / cycleMinutes);

  return (
    <div className="interactive-widget-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px 20px', boxShadow: 'var(--shadow-md)', margin: '24px 0' }}>
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--rose)' }} />
          <h2 style={{ fontSize: '16px', fontWeight: 750, color: 'var(--text-1)', margin: 0 }}>
            Deep Focus vs Attention Residue Calculator
          </h2>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0 }}>
          Measure how many hours you actually retain in deep work versus time lost to subtle phone distractions and multi-tasking.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '16px', padding: '18px', background: 'var(--bg-warm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
        {/* Desk Hours */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: 'var(--text-2)', marginBottom: '6px' }}>
            <span>Time Spent at Study Desk:</span>
            <strong style={{ color: 'var(--primary)' }}>{deskHours} hours</strong>
          </div>
          <input
            type="range"
            min="2"
            max="14"
            step="1"
            value={deskHours}
            onChange={(e) => setDeskHours(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>

        {/* Distraction Environment */}
        <div>
          <label htmlFor="distraction-select" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-2)', marginBottom: '6px' }}>
            Study Environment Distractions:
          </label>
          <select
            id="distraction-select"
            value={distractionLevel}
            onChange={(e) => setDistractionLevel(e.target.value)}
            style={{ width: '100%', minHeight: '38px', padding: '8px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--border-mid)', background: '#FFFFFF' }}
          >
            <option value="minimal">Minimal (Phone in other room, quiet library)</option>
            <option value="moderate">Moderate (Phone on desk, occasional notifications)</option>
            <option value="high">High (Chatting, social media, multitasking)</option>
          </select>
        </div>

        {/* Pomodoro Structure */}
        <div>
          <label htmlFor="pomodoro-select" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-2)', marginBottom: '6px' }}>
            Pomodoro Cadence:
          </label>
          <select
            id="pomodoro-select"
            value={pomodoroCadence}
            onChange={(e) => setPomodoroCadence(e.target.value)}
            style={{ width: '100%', minHeight: '38px', padding: '8px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--border-mid)', background: '#FFFFFF' }}
          >
            <option value="25">25m Work / 5m Break (Standard Pomodoro)</option>
            <option value="50">50m Work / 10m Break (Deep Work Sprint — Optimal)</option>
            <option value="90">90m Work / 20m Break (Ultradian Exam Simulation)</option>
          </select>
        </div>
      </div>

      {/* Output Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '18px' }}>
        <div style={{ background: 'rgba(5, 150, 105, 0.08)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(5, 150, 105, 0.25)', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 700, textTransform: 'uppercase' }}>
            Net Deep Focus Hours
          </div>
          <div style={{ fontSize: '34px', fontWeight: 800, color: 'var(--emerald)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
            {netDeepHours} <span style={{ fontSize: '14px', fontWeight: 600 }}>hrs</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-2)' }}>
            True high-cognitive synthesis time
          </div>
        </div>

        <div style={{ background: 'rgba(225, 29, 72, 0.08)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(225, 29, 72, 0.25)', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--rose)', fontWeight: 700, textTransform: 'uppercase' }}>
            Lost to Attention Residue
          </div>
          <div style={{ fontSize: '34px', fontWeight: 800, color: 'var(--rose)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
            {lostHours} <span style={{ fontSize: '14px', fontWeight: 600 }}>hrs</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-2)' }}>
            {selectedEff.penaltyDesc}
          </div>
        </div>

        <div style={{ background: 'var(--bg-warm)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: 700, textTransform: 'uppercase' }}>
            Optimal Pomodoro Cycles
          </div>
          <div style={{ fontSize: '34px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
            {completedBlocks} <span style={{ fontSize: '14px', fontWeight: 600 }}>blocks</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-2)' }}>
            {cadenceMinutes}m sprint + {breakMinutes}m active recovery
          </div>
        </div>
      </div>

      {/* Science Note */}
      <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--text-2)', lineHeight: 1.5 }}>
        🔬 <strong>The 23-Minute Attention Rule:</strong> Research at the University of California demonstrates that after an interruption (like glancing at a notification), it takes an average of 23 minutes and 15 seconds to fully recover deep immersion in complex problem solving.
      </div>
    </div>
  );
}