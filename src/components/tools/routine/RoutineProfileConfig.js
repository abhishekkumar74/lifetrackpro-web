'use client';
import { useState } from 'react';
import { STUDENT_PERSONAS, calculateBedtimeMinutes, minutesTo12Hour } from '@/lib/routineEngine';

/**
 * RoutineProfileConfig — Left Column Routine Configuration Panel
 * Redesigned for spacious layout, clear visual hierarchy, and modern SaaS aesthetic.
 */
export default function RoutineProfileConfig({
  profile,
  setProfile,
  onGenerate,
  onDeleteCommitment,
  balanceData,
  hasGenerated = false,
}) {
  const [showCommitmentEditor, setShowCommitmentEditor] = useState(true);
  const [newCommName, setNewCommName] = useState('');
  const [newCommStart, setNewCommStart] = useState('08:00');
  const [newCommEnd, setNewCommEnd] = useState('14:00');
  const [newCommCategory, setNewCommCategory] = useState('fixed');

  const selectedPersona = STUDENT_PERSONAS[profile.personaKey] || STUDENT_PERSONAS.fulltime;
  const bedtimeMin = calculateBedtimeMinutes(profile.wakeTime, profile.sleepHours);
  const bedtimeDisplay = minutesTo12Hour(bedtimeMin);

  const handlePersonaChange = (key) => {
    const p = STUDENT_PERSONAS[key];
    if (!p) return;
    setProfile(prev => ({
      ...prev,
      personaKey: key,
      wakeTime: p.defaultWakeTime,
      sleepHours: p.defaultSleepHours,
      studyTargetHours: p.defaultStudyTargetHours,
      chronotype: p.defaultChronotype,
      cadenceMinutes: p.cadenceMinutes,
      breakMinutes: p.breakMinutes,
      commitments: JSON.parse(JSON.stringify(p.defaultCommitments)),
    }));
  };

  const handleAddCommitment = (e) => {
    e.preventDefault();
    if (!newCommName.trim()) return;

    const newComm = {
      id: `custom-comm-${Date.now()}`,
      name: newCommName.trim(),
      startTime: newCommStart,
      endTime: newCommEnd,
      category: newCommCategory,
      isLocked: true,
      note: 'Custom student commitment',
    };

    setProfile(prev => ({
      ...prev,
      commitments: [...prev.commitments, newComm],
    }));

    setNewCommName('');
  };

  const handleRemoveCommitment = (id) => {
    setProfile(prev => ({
      ...prev,
      commitments: prev.commitments.filter(c => c.id !== id),
    }));
    if (onDeleteCommitment) {
      onDeleteCommitment(id);
    }
  };

  return (
    <div className="daily-routine-config-card">
      {/* Panel Header (Pinned at top of card) */}
      <div className="daily-routine-config-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#172033', margin: 0 }}>
            Routine Configuration
          </h2>
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Set your student lifestyle, sleep &amp; academic targets
          </span>
        </div>

        {hasGenerated && balanceData && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 650,
              padding: '3px 9px',
              borderRadius: '100px',
              background: '#F0FDF4',
              color: '#15803D',
              border: '1px solid #DCFCE7',
            }}
          >
            {balanceData.score}% Realism
          </span>
        )}
      </div>

      {/* Scrollable Form Body with Smooth Independent Scroll */}
      <div className="daily-routine-config-body">
        {/* Student Personalization for Print & PDF */}
      <div style={{ marginBottom: '18px', padding: '12px 14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E8ECF2' }}>
        <div style={{ fontSize: '11px', fontWeight: 750, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span>📝</span>
          <span>Personalize Printed Planner (Optional)</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '10px' }}>
          <div>
            <label htmlFor="student-name-input" style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#172033', marginBottom: '4px' }}>
              Your Name
            </label>
            <input
              id="student-name-input"
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={profile.studentName || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, studentName: e.target.value }))}
              style={{
                width: '100%',
                height: '36px',
                padding: '0 10px',
                fontSize: '12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                boxSizing: 'border-box',
                outline: 'none',
                background: '#FFFFFF',
              }}
            />
          </div>
          <div>
            <label htmlFor="student-goal-input" style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#172033', marginBottom: '4px' }}>
              Target Goal / Exam
            </label>
            <input
              id="student-goal-input"
              type="text"
              placeholder="e.g. IIT JEE 2026, NEET 680+"
              value={profile.targetGoal || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, targetGoal: e.target.value }))}
              style={{
                width: '100%',
                height: '36px',
                padding: '0 10px',
                fontSize: '12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                boxSizing: 'border-box',
                outline: 'none',
                background: '#FFFFFF',
              }}
            />
          </div>
        </div>
      </div>

      {/* 1. Student Lifestyle Cards */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: 750, color: '#172033', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            1. Student Lifestyle Category
          </label>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Select profile</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Object.values(STUDENT_PERSONAS).map((p) => {
            const isSelected = profile.personaKey === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePersonaChange(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: isSelected ? '1.5px solid #4F46E5' : '1px solid #E8ECF2',
                  background: isSelected ? '#F8FAFF' : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 8px -1px rgba(79, 70, 229, 0.12)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1, marginRight: '8px' }}>
                  <span style={{ fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>{p.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 750, color: isSelected ? '#4338CA' : '#172033', whiteSpace: 'normal', lineHeight: 1.3 }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', whiteSpace: 'normal', lineHeight: 1.35 }}>
                      {p.tagline}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: `1.5px solid ${isSelected ? '#4F46E5' : '#CBD5E1'}`,
                    background: isSelected ? '#4F46E5' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {isSelected ? '✓' : ''}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Wake-Up & Sleep Schedule */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 750, color: '#172033', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
          2. Wake-Up &amp; Sleep Schedule
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          <div style={{ minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: 650, marginBottom: '4px' }}>
              Wake-Up Time
            </span>
            <select
              aria-label="Wake up time selection"
              value={profile.wakeTime}
              onChange={(e) => setProfile(prev => ({ ...prev, wakeTime: e.target.value }))}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 10px',
                fontSize: '12.5px',
                fontWeight: 650,
                borderRadius: '10px',
                border: '1px solid #E8ECF2',
                background: '#FFFFFF',
                color: '#172033',
              }}
            >
              <option value="05:00">05:00 AM (Early Lark)</option>
              <option value="05:30">05:30 AM (Brahma Muhurta)</option>
              <option value="06:00">06:00 AM (Standard Early)</option>
              <option value="06:30">06:30 AM (Moderate)</option>
              <option value="07:00">07:00 AM (College/School)</option>
              <option value="07:30">07:30 AM (Restful)</option>
              <option value="08:00">08:00 AM (Daylight Shift)</option>
              <option value="09:00">09:00 AM (Night Owl Anchor)</option>
            </select>
          </div>

          <div style={{ minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: 650, marginBottom: '4px' }}>
              Sleep Target
            </span>
            <select
              aria-label="Sleep duration selection"
              value={profile.sleepHours}
              onChange={(e) => setProfile(prev => ({ ...prev, sleepHours: parseFloat(e.target.value) }))}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 10px',
                fontSize: '12.5px',
                fontWeight: 650,
                borderRadius: '10px',
                border: '1px solid #E8ECF2',
                background: '#FFFFFF',
                color: '#172033',
              }}
            >
              <option value="6.5">6.5 Hours (Deep Work Base)</option>
              <option value="7">7.0 Hours (High Productivity)</option>
              <option value="7.5">7.5 Hours (Optimal Retention)</option>
              <option value="8">8.0 Hours (Full Neuro-Recovery)</option>
              <option value="8.5">8.5 Hours (Teenage Development)</option>
            </select>
          </div>
        </div>

        {/* Calculated Bedtime Pill */}
        <div
          style={{
            marginTop: '8px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            fontSize: '11.5px',
            color: '#475569',
            fontWeight: 550,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>🌙</span>
          <span>
            Calculated Bedtime: <strong style={{ color: '#4F46E5', fontWeight: 700 }}>{bedtimeDisplay}</strong> (ensures {profile.sleepHours}h uninterrupted sleep)
          </span>
        </div>
      </div>

      {/* 3. Daily Study Target Slider */}
      <div style={{ marginBottom: '20px', background: '#F8FAFC', padding: '14px 16px', borderRadius: '12px', border: '1px solid #E8ECF2' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: 750, color: '#172033', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            3. Daily Study Target
          </label>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#5B5CF0', fontFamily: 'var(--font-mono)' }}>
            {profile.studyTargetHours} Hours / Day
          </span>
        </div>

        <input
          type="range"
          min="2"
          max="11"
          step="0.5"
          value={profile.studyTargetHours}
          onChange={(e) => setProfile(prev => ({ ...prev, studyTargetHours: parseFloat(e.target.value) }))}
          style={{ width: '100%', accentColor: '#5B5CF0', cursor: 'pointer', height: '6px', margin: '8px 0' }}
          aria-label="Daily study hours target slider"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', marginBottom: '6px' }}>
          <span>2 hrs (Light)</span>
          <span>4.5 hrs (School)</span>
          <span>8 hrs (Aspirant)</span>
          <span>11 hrs (Intense)</span>
        </div>

        <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.4, borderTop: '1px solid #E2E8F0', paddingTop: '6px' }}>
          💡 <strong>{selectedPersona.name}:</strong> {selectedPersona.studyAdvice}
        </div>
      </div>

      {/* 4. Energy Preferences & Focus Cadence */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 750, color: '#172033', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
          4. Energy &amp; Focus Cadence
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          <div style={{ minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: 650, marginBottom: '4px' }}>
              Energy Chronotype
            </span>
            <select
              aria-label="Energy chronotype selection"
              value={profile.chronotype}
              onChange={(e) => setProfile(prev => ({ ...prev, chronotype: e.target.value }))}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 10px',
                fontSize: '12.5px',
                fontWeight: 650,
                borderRadius: '10px',
                border: '1px solid #E8ECF2',
                background: '#FFFFFF',
                color: '#172033',
              }}
            >
              <option value="lark">🌅 Morning Lark</option>
              <option value="balanced">⚖️ Balanced Circadian</option>
              <option value="owl">🦉 Evening Surge</option>
            </select>
          </div>

          <div style={{ minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: 650, marginBottom: '4px' }}>
              Focus Block Cadence
            </span>
            <select
              aria-label="Focus block cadence selection"
              value={profile.cadenceMinutes}
              onChange={(e) => setProfile(prev => ({ ...prev, cadenceMinutes: parseInt(e.target.value, 10) }))}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 10px',
                fontSize: '12.5px',
                fontWeight: 650,
                borderRadius: '10px',
                border: '1px solid #E8ECF2',
                background: '#FFFFFF',
                color: '#172033',
              }}
            >
              <option value="50">50m Focus + 10m Break</option>
              <option value="60">60m Focus + 15m Break</option>
              <option value="90">90m Focus + 15m Break</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Fixed Commitments & Meals Expandable Accordion */}
      <div style={{ marginBottom: '22px', border: '1px solid #E8ECF2', borderRadius: '12px', overflow: 'hidden' }}>
        <button
          type="button"
          onClick={() => setShowCommitmentEditor(!showCommitmentEditor)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#F8FAFC',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 750,
            color: '#172033',
            cursor: 'pointer',
          }}
        >
          <span>🏫 Fixed Commitments &amp; Meals ({profile.commitments.length})</span>
          <span style={{ fontSize: '11px', color: '#5B5CF0', fontWeight: 700 }}>
            {showCommitmentEditor ? '▲ Close' : '▼ View & Customize'}
          </span>
        </button>

        {showCommitmentEditor && (
          <div style={{ padding: '16px', background: '#FFFFFF', borderTop: '1px solid #E8ECF2' }}>
            <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 12px 0', lineHeight: 1.45 }}>
              Protected slots prevent school lectures, coaching classes, and family meals from being overwritten by study sessions.
            </p>

            {/* List of active commitments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
              {profile.commitments.map((comm) => (
                <div
                  key={comm.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#F8FAFC',
                    border: '1px solid #E8ECF2',
                    fontSize: '12px',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: '#172033' }}>{comm.name}</span>
                    <span style={{ fontSize: '11px', color: '#64748B', marginLeft: '6px', fontFamily: 'var(--font-mono)' }}>
                      ({comm.startTime} – {comm.endTime})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCommitment(comm.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#EF4444',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                    title="Remove commitment"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add commitment mini-form */}
            <form onSubmit={handleAddCommitment} style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#F1F5F9', padding: '12px', borderRadius: '10px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 750, color: '#475569' }}>Add Custom Fixed Commitment:</div>
              <input
                type="text"
                placeholder="e.g. Physics Tuition, Coaching Classes, Gym"
                value={newCommName}
                onChange={(e) => setNewCommName(e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  padding: '0 12px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#172033',
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Start</label>
                  <input
                    type="time"
                    value={newCommStart}
                    onChange={(e) => setNewCommStart(e.target.value)}
                    style={{ width: '100%', height: '34px', padding: '0 6px', fontSize: '11.5px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: '#64748B', fontWeight: 600 }}>End</label>
                  <input
                    type="time"
                    value={newCommEnd}
                    onChange={(e) => setNewCommEnd(e.target.value)}
                    style={{ width: '100%', height: '34px', padding: '0 6px', fontSize: '11.5px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Type</label>
                  <select
                    value={newCommCategory}
                    onChange={(e) => setNewCommCategory(e.target.value)}
                    style={{ width: '100%', height: '34px', padding: '0 4px', fontSize: '11px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                  >
                    <option value="fixed">Fixed</option>
                    <option value="nutrition">Meal</option>
                    <option value="exercise">Exercise</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                style={{
                  padding: '7px 12px',
                  background: '#14B8A6',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '7px',
                  fontSize: '11.5px',
                  fontWeight: 750,
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                }}
              >
                + Add Commitment
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Warnings & Realism Feedback */}
      {hasGenerated && balanceData && balanceData.warnings.length > 0 && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px', padding: '12px 14px', marginBottom: '18px', fontSize: '11.5px', color: '#92400E', lineHeight: 1.5 }}>
          ⚠️ <strong>Schedule Advisory:</strong>
          <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
            {balanceData.warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}
      </div>

      {/* 6. Pinned Footer Action Bar: Always accessible Generate button & Play Store link */}
      <div className="daily-routine-config-footer">
        <button
          type="button"
          onClick={onGenerate}
          style={{
            width: '100%',
            height: '46px',
            background: '#4F46E5',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px -2px rgba(79, 70, 229, 0.35)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#4338CA'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#4F46E5'; }}
        >
          <span>⚡ Generate Smart 24-Hour Routine</span>
        </button>

        {/* Subtle single-line app link (clean text type, zero distraction) */}
        <div
          style={{
            marginTop: '10px',
            textAlign: 'center',
            fontSize: '11.5px',
            color: '#64748B',
            lineHeight: 1.5,
          }}
        >
          <span>Want to follow this routine on mobile? </span>
          <a
            href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#4F46E5',
              fontWeight: 650,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              borderBottom: '1px dashed rgba(79, 70, 229, 0.35)',
              paddingBottom: '1px',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#3730A3'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#4F46E5'; }}
          >
            <span>Explore LifeTrack Pro on Play Store</span>
            <span style={{ fontSize: '10px' }}>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
