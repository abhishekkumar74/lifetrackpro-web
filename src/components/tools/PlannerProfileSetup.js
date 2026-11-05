'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EXAM_PRESETS } from '@/lib/timetableEngine';

export default function PlannerProfileSetup({
  profile,
  setProfile,
  onGenerate,
  realismData,
  hasGenerated = false,
}) {
  const [activeStep, setActiveStep] = useState(1); // 1: Exam, 2: Study Windows & Routine, 3: Subjects, 4: Strategy
  const [newSubjectName, setNewSubjectName] = useState('');
  const [detectedRoutine, setDetectedRoutine] = useState(null);

  // Fixed Commitments & Coaching (Open by default as requested)
  const [showFixedCommitments, setShowFixedCommitments] = useState(true);
  const [newCommitmentName, setNewCommitmentName] = useState('');
  const [newCommitmentStart, setNewCommitmentStart] = useState('08:00');
  const [newCommitmentEnd, setNewCommitmentEnd] = useState('14:00');

  const handleAddFixedCommitment = () => {
    if (!newCommitmentName.trim()) return;
    const newEntry = {
      id: `fixed-${Date.now()}`,
      name: newCommitmentName.trim(),
      startTime: newCommitmentStart,
      endTime: newCommitmentEnd,
    };
    setProfile(prev => ({
      ...prev,
      fixedCommitments: [...(prev.fixedCommitments || []), newEntry],
    }));
    setNewCommitmentName('');
  };

  const handleRemoveFixedCommitment = (id) => {
    setProfile(prev => ({
      ...prev,
      fixedCommitments: (prev.fixedCommitments || []).filter(c => c.id !== id),
    }));
  };

  // Check for saved daily routine in localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lifetrack_daily_routine_active');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.availableStudyWindows) && parsed.availableStudyWindows.length > 0) {
          setDetectedRoutine(parsed);
        }
      }
    } catch {
      // Safe fallback
    }
  }, []);

  // Handle Exam preset selection
  const handleExamChange = (newExam) => {
    const preset = EXAM_PRESETS[newExam];
    setProfile(prev => ({
      ...prev,
      exam: newExam,
      sessionCadence: preset?.defaultCadence || 50,
      breakDuration: preset?.breakDuration || 10,
      subjects: preset?.defaultSubjects ? JSON.parse(JSON.stringify(preset.defaultSubjects)) : prev.subjects,
    }));
  };

  // Import Study Windows from Daily Routine
  const handleImportDailyRoutine = () => {
    if (!detectedRoutine || !detectedRoutine.availableStudyWindows) return;
    setProfile(prev => ({
      ...prev,
      isImportedFromRoutine: true,
      importedStudyWindows: detectedRoutine.availableStudyWindows,
      manualDailyHours: detectedRoutine.totalStudyHours || 7,
      sessionCadence: prev.sessionCadence || 90,
    }));
  };

  const handleDisconnectRoutine = () => {
    setProfile(prev => ({
      ...prev,
      isImportedFromRoutine: false,
      importedStudyWindows: [],
    }));
  };

  // Subject management
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const newSub = {
      id: `sub-${Date.now()}`,
      name: newSubjectName.trim(),
      proficiency: 'average',
      priority: 'high',
      syllabusCompletion: 50,
      revisionTopics: 'Core high-weightage chapters',
    };
    setProfile(prev => ({
      ...prev,
      subjects: [...prev.subjects, newSub],
    }));
    setNewSubjectName('');
  };

  const handleUpdateSubject = (id, field, value) => {
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.map(s => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  const handleRemoveSubject = (id) => {
    if (profile.subjects.length <= 1) {
      alert('You must maintain at least one academic subject in your timetable.');
      return;
    }
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s.id !== id),
    }));
  };

  // Calculate days until exam date
  let countdownText = null;
  if (profile.examDate) {
    const target = new Date(profile.examDate);
    const now = new Date();
    const diffTime = target - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      const weeks = Math.floor(diffDays / 7);
      const remDays = diffDays % 7;
      countdownText = `${diffDays} days remaining (${weeks}w ${remDays}d)`;
    } else if (diffDays === 0) {
      countdownText = 'Exam is today!';
    } else {
      countdownText = 'Exam date passed';
    }
  }

  const STEPS = [
    { num: 1, title: 'Exam & Goal', shortTitle: 'Goal', desc: 'Target exam, countdown & stage' },
    { num: 2, title: 'Study Windows', shortTitle: 'Hours', desc: 'Routine import or daily hours' },
    { num: 3, title: 'Subjects & Syllabus', shortTitle: 'Subjects', desc: 'Weak areas & completion %' },
    { num: 4, title: 'Academic Strategy', shortTitle: 'Strategy', desc: 'Cadence, PYQ & Active Recall' },
  ];

  const isUsingImportedWindows = profile.isImportedFromRoutine && Array.isArray(profile.importedStudyWindows) && profile.importedStudyWindows.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* ── STEPPER: DESKTOP ── */}
      <div className="planner-stepper-desktop">
        {STEPS.map((step) => {
          const isActive = activeStep === step.num;
          const isCompleted = activeStep > step.num;

          return (
            <button
              key={step.num}
              type="button"
              onClick={() => setActiveStep(step.num)}
              className={`planner-step-tab ${isActive ? 'active' : ''}`}
              title={step.title}
            >
              <span className={`planner-step-badge ${isCompleted ? 'completed' : ''}`}>
                {isCompleted ? '✓' : step.num}
              </span>
              <span>{step.shortTitle}</span>
            </button>
          );
        })}
      </div>

      {/* ── STEPPER: MOBILE COMPACT PROGRESS ── */}
      <div className="planner-stepper-mobile">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '8px' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--planner-indigo)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Step {activeStep} of 4
            </span>
            <div style={{ fontSize: '14.5px', fontWeight: 750, color: 'var(--planner-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {STEPS[activeStep - 1].title}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            <button
              type="button"
              disabled={activeStep === 1}
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              className="planner-btn-secondary"
              style={{ height: '32px', padding: '0 8px', fontSize: '11.5px', opacity: activeStep === 1 ? 0.35 : 1 }}
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={activeStep === 4}
              onClick={() => setActiveStep(prev => Math.min(4, prev + 1))}
              className="planner-btn-primary"
              style={{ height: '32px', padding: '0 10px', fontSize: '11.5px', opacity: activeStep === 4 ? 0.35 : 1 }}
            >
              Next →
            </button>
          </div>
        </div>

        {/* 4-segment progress bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                height: '4px',
                borderRadius: '100px',
                background: s <= activeStep ? 'var(--planner-indigo)' : '#E2E8F0',
                transition: 'background 0.2s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── STEP 1: EXAM & PREPARATION BENCHMARK ── */}
      {activeStep === 1 && (
        <div className="planner-card">
          <div className="planner-card-header">
            <h2 className="planner-card-title">Exam &amp; Preparation Benchmark</h2>
            <p className="planner-card-subtitle">
              Select your competitive target exam, test date countdown, and target score to calibrate academic difficulty.
            </p>
          </div>

          <div className="planner-form-group">
            <label htmlFor="planner-exam-select" className="planner-label">
              Target Examination
            </label>
            <select
              id="planner-exam-select"
              value={profile.exam}
              onChange={(e) => handleExamChange(e.target.value)}
              className="planner-select"
            >
              {Object.keys(EXAM_PRESETS).map(key => (
                <option key={key} value={key}>
                  {EXAM_PRESETS[key].name} ({EXAM_PRESETS[key].category})
                </option>
              ))}
            </select>
          </div>

          {profile.exam === 'custom' && (
            <div className="planner-form-group">
              <label htmlFor="custom-exam-name" className="planner-label">
                Custom Exam / Certification Name
              </label>
              <input
                id="custom-exam-name"
                type="text"
                value={profile.customExamName || ''}
                onChange={(e) => setProfile(p => ({ ...p, customExamName: e.target.value }))}
                placeholder="e.g. CFA Level 1, CA Foundation, AWS Architect"
                className="planner-input"
              />
            </div>
          )}

          <div className="planner-grid-2col planner-form-group">
            <div style={{ minWidth: 0, maxWidth: '100%' }}>
              <label htmlFor="exam-date-picker" className="planner-label">
                Target Exam Date (Optional)
              </label>
              <input
                id="exam-date-picker"
                type="date"
                value={profile.examDate || ''}
                onChange={(e) => setProfile(p => ({ ...p, examDate: e.target.value }))}
                className="planner-input"
                style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ minWidth: 0, maxWidth: '100%' }}>
              <label htmlFor="target-rank-input" className="planner-label">
                Target Score / Rank
              </label>
              <input
                id="target-rank-input"
                type="text"
                value={profile.targetScoreRank || ''}
                onChange={(e) => setProfile(p => ({ ...p, targetScoreRank: e.target.value }))}
                placeholder="e.g. 680+ or Top 500 AIR"
                className="planner-input"
                style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {countdownText && (
            <div style={{ padding: '8px 12px', background: 'var(--planner-indigo-light)', color: 'var(--planner-indigo)', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>⏳</span>
              <span>{countdownText}</span>
            </div>
          )}

          <div className="planner-form-group">
            <label htmlFor="horizon-select" className="planner-label">
              Academic Roadmap Horizon (Multi-Week Timeline)
            </label>
            <select
              id="horizon-select"
              value={profile.horizonDays || 60}
              onChange={(e) => setProfile(p => ({ ...p, horizonDays: parseInt(e.target.value, 10) }))}
              className="planner-select"
            >
              <option value={30}>30-Day Sprint (4 Weeks • Intensive Crash Syllabus)</option>
              <option value={60}>60-Day Booster (8 Weeks • High-Yield Concepts &amp; PYQs)</option>
              <option value={90}>90-Day Full Syllabus Master (12 Weeks • Complete Academic Plan)</option>
              <option value={120}>120-Day Comprehensive Marathon (16 Weeks • Foundation to Top AIR)</option>
            </select>
          </div>

          <div className="planner-grid-2col planner-form-group">
            <div style={{ minWidth: 0, maxWidth: '100%' }}>
              <label htmlFor="prep-level-select" className="planner-label">
                Preparation Stage
              </label>
              <select
                id="prep-level-select"
                value={profile.prepLevel || 'intermediate'}
                onChange={(e) => setProfile(p => ({ ...p, prepLevel: e.target.value }))}
                className="planner-select"
                style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}
              >
                <option value="beginner">Beginner (Concept Building)</option>
                <option value="intermediate">Intermediate (Problem Practice &amp; PYQs)</option>
                <option value="advanced">Advanced (Mock Simulations &amp; Rank Sprint)</option>
              </select>
            </div>

            <div style={{ minWidth: 0, maxWidth: '100%' }}>
              <label htmlFor="strategy-mode-select" className="planner-label">
                Academic Strategy Mode
              </label>
              <select
                id="strategy-mode-select"
                value={profile.strategyMode || 'balanced'}
                onChange={(e) => setProfile(p => ({ ...p, strategyMode: e.target.value }))}
                className="planner-select"
                style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}
              >
                <option value="balanced">Balanced (Concepts + Practice + Review)</option>
                <option value="intensive">Weak Subject Sprint (Maximum Weighting)</option>
                <option value="revision">Active Recall &amp; Syllabus Coverage</option>
                <option value="morning">Morning Peak Cognitive Interleaving</option>
              </select>
            </div>
          </div>

          <div className="planner-step-actions">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="planner-btn-primary"
            >
              Continue to Study Windows →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: AVAILABLE STUDY WINDOWS & ROUTINE INTEGRATION ── */}
      {activeStep === 2 && (
        <div className="planner-card">
          <div className="planner-card-header">
            <h2 className="planner-card-title">Available Study Windows</h2>
            <p className="planner-card-subtitle">
              Allocate your academic subjects into real cognitive study windows. You can import windows directly from your 24-hour Daily Routine or configure manual daily hours.
            </p>
          </div>

          {/* Option A: Import from Daily Routine */}
          <div style={{ padding: '16px', background: isUsingImportedWindows ? '#F0FDF4' : '#F8FAFC', borderRadius: '14px', border: `1.5px solid ${isUsingImportedWindows ? '#86EFAC' : '#E2E8F0'}`, marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>📥</span>
                  <strong style={{ fontSize: '14px', color: '#0F172A' }}>
                    Import from Daily Routine Planner
                  </strong>
                  {isUsingImportedWindows && (
                    <span style={{ fontSize: '10.5px', fontWeight: 750, background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '100px' }}>
                      ACTIVE SYNC
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0', lineHeight: 1.45 }}>
                  Automatically locks in your sleep, meals, and school/coaching commitments from your lifestyle routine and schedules subjects only during genuine study windows.
                </p>
              </div>

              {isUsingImportedWindows ? (
                <button
                  type="button"
                  onClick={handleDisconnectRoutine}
                  style={{
                    padding: '6px 12px',
                    fontSize: '11.5px',
                    fontWeight: 650,
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#64748B',
                    cursor: 'pointer',
                  }}
                >
                  Disconnect &amp; Use Manual
                </button>
              ) : detectedRoutine ? (
                <button
                  type="button"
                  onClick={handleImportDailyRoutine}
                  style={{
                    padding: '7px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    background: '#4F46E5',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)',
                  }}
                >
                  Import {detectedRoutine.availableStudyWindows?.length || 0} Study Windows ({detectedRoutine.totalStudyHours}h)
                </button>
              ) : (
                <Link
                  href="/tools/daily-routine-generator"
                  style={{
                    padding: '7px 12px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: '1px solid #C7D2FE',
                    background: '#EEF2FF',
                    color: '#4F46E5',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Build 24h Routine First →</span>
                </Link>
              )}
            </div>

            {/* If routine is active or detected */}
            {isUsingImportedWindows ? (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #DCFCE7' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#15803D', marginBottom: '8px' }}>
                  ✓ {profile.importedStudyWindows.length} Study Windows Synchronized ({profile.manualDailyHours}h Total Focus Time):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {profile.importedStudyWindows.map((w, idx) => (
                    <span
                      key={w.id || idx}
                      style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: '#FFFFFF',
                        border: '1px solid #BBF7D0',
                        color: '#166534',
                        fontWeight: 600,
                      }}
                    >
                      {w.timeWindow || `${w.startTime} – ${w.endTime}`} ({w.duration}m)
                    </span>
                  ))}
                </div>
              </div>
            ) : detectedRoutine ? (
              <div style={{ marginTop: '10px', fontSize: '11.5px', color: '#475569' }}>
                💡 Saved routine detected: <strong>{detectedRoutine.personaKey?.toUpperCase()} profile</strong> with {detectedRoutine.totalStudyHours}h study allocation. Click Import to apply!
              </div>
            ) : (
              <div style={{ marginTop: '6px', fontSize: '11.5px', color: '#64748B' }}>
                No active 24-hour daily routine saved yet. You can set manual hours below or create one anytime.
              </div>
            )}
          </div>

          {/* Option B: Manual Target Study Hours (Standalone) */}
          <div style={{ padding: '16px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', opacity: isUsingImportedWindows ? 0.6 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label htmlFor="manual-study-slider" className="planner-label" style={{ margin: 0 }}>
                Daily Available Study Target
              </label>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#4F46E5', fontFamily: 'var(--font-mono)' }}>
                {profile.manualDailyHours || 7.5} Hours / Day
              </span>
            </div>

            <input
              id="manual-study-slider"
              type="range"
              min="2"
              max="14"
              step="0.5"
              disabled={isUsingImportedWindows}
              value={profile.manualDailyHours || 7.5}
              onChange={(e) => setProfile(p => ({ ...p, manualDailyHours: parseFloat(e.target.value) }))}
              style={{ width: '100%', accentColor: '#4F46E5', cursor: isUsingImportedWindows ? 'not-allowed' : 'pointer', margin: '8px 0' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#94A3B8', marginBottom: '14px' }}>
              <span>2 hrs (Light)</span>
              <span>5 hrs (College)</span>
              <span>8 hrs (Full-Time)</span>
              <span>12+ hrs (Sprint)</span>
            </div>

            <div className="planner-grid-2col planner-form-group">
              <div style={{ minWidth: 0 }}>
                <span className="planner-label" style={{ display: 'block', marginBottom: '4px' }}>
                  Study Shift Distribution
                </span>
                <select
                  aria-label="Study shift distribution selection"
                  disabled={isUsingImportedWindows}
                  value={profile.studyShift || 'balanced'}
                  onChange={(e) => setProfile(p => ({ ...p, studyShift: e.target.value }))}
                  className="planner-select"
                >
                  <option value="balanced">Balanced Across Day (Morning, Noon &amp; Night)</option>
                  <option value="morning">Morning Shift (Early Alertness Peak)</option>
                  <option value="evening">Afternoon &amp; Evening Shift</option>
                </select>
              </div>

              <div style={{ minWidth: 0 }}>
                <span className="planner-label" style={{ display: 'block', marginBottom: '4px' }}>
                  Focus Session Cadence
                </span>
                <select
                  aria-label="Focus session cadence selection"
                  value={profile.sessionCadence || 90}
                  onChange={(e) => setProfile(p => ({ ...p, sessionCadence: parseInt(e.target.value, 10) }))}
                  className="planner-select"
                >
                  <option value="50">50m Focus + 10m Break (Pomodoro)</option>
                  <option value="90">90m Focus + 15m Break (JEE / Exam Shift)</option>
                  <option value="120">120m Full Paper Simulation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Option C: Fixed Commitments & Coaching Classes (Open by default) */}
          <div style={{ marginTop: '16px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showFixedCommitments ? '14px' : '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🏛️</span>
                <span style={{ fontSize: '13.5px', fontWeight: 750, color: '#0F172A' }}>
                  Fixed Commitments &amp; Coaching ({profile.fixedCommitments?.length || 0})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowFixedCommitments(!showFixedCommitments)}
                style={{
                  fontSize: '12px',
                  fontWeight: 650,
                  color: 'var(--planner-indigo)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {showFixedCommitments ? '▲ Hide' : '▼ View & Customize'}
              </button>
            </div>

            {showFixedCommitments && (
              <div>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px', lineHeight: 1.45 }}>
                  Protected non-negotiable slots (school, coaching classes, college lectures, meals) prevent study sessions from being scheduled during these hours.
                </p>

                {/* List of existing commitments */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  {(profile.fixedCommitments || []).map((c) => (
                    <div
                      key={c.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        background: '#FFFBEB',
                        borderRadius: '8px',
                        border: '1px solid #FDE68A',
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, color: '#92400E' }}>{c.name}</span>
                        <span style={{ color: '#B45309', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                          ({c.startTime} – {c.endTime})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFixedCommitment(c.id)}
                        title="Remove fixed slot"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '13px',
                          padding: '0 4px',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {(!profile.fixedCommitments || profile.fixedCommitments.length === 0) && (
                    <div style={{ fontSize: '11.5px', color: '#94A3B8', fontStyle: 'italic', padding: '4px 0' }}>
                      No fixed commitments added yet. Add school, tuition, or coaching hours below.
                    </div>
                  )}
                </div>

                {/* Add new commitment */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="e.g. School Classes, Coaching Tuition"
                    value={newCommitmentName}
                    onChange={(e) => setNewCommitmentName(e.target.value)}
                    style={{
                      flex: '1 1 160px',
                      height: '34px',
                      padding: '0 10px',
                      fontSize: '12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      type="time"
                      value={newCommitmentStart}
                      onChange={(e) => setNewCommitmentStart(e.target.value)}
                      aria-label="Commitment start time"
                      style={{
                        width: '95px',
                        height: '34px',
                        padding: '0 6px',
                        fontSize: '11.5px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                      }}
                    />
                    <span style={{ fontSize: '11px', color: '#64748B' }}>to</span>
                    <input
                      type="time"
                      value={newCommitmentEnd}
                      onChange={(e) => setNewCommitmentEnd(e.target.value)}
                      aria-label="Commitment end time"
                      style={{
                        width: '95px',
                        height: '34px',
                        padding: '0 6px',
                        fontSize: '11.5px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFixedCommitment}
                    style={{
                      padding: '0 12px',
                      height: '34px',
                      fontSize: '12px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      background: '#F8FAFC',
                      color: '#0F172A',
                      cursor: 'pointer',
                    }}
                  >
                    + Add Slot
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="planner-step-actions" style={{ justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="planner-btn-secondary"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="planner-btn-primary"
            >
              Continue to Subjects →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: SUBJECTS, SYLLABUS & WEAK AREAS ── */}
      {activeStep === 3 && (
        <div className="planner-card">
          <div className="planner-card-header">
            <h2 className="planner-card-title">Subjects, Chapters &amp; Weak Areas</h2>
            <p className="planner-card-subtitle">
              Categorize weak, average, and strong topics. Weak subjects receive top priority slots and higher study interleaving.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {profile.subjects.map((sub) => (
              <div
                key={sub.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => handleUpdateSubject(sub.id, 'name', e.target.value)}
                    aria-label={`Subject name for ${sub.name}`}
                    style={{
                      fontSize: '14px',
                      fontWeight: 750,
                      color: '#0F172A',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      flex: '1 1 200px',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(sub.id)}
                    aria-label={`Delete ${sub.name}`}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      fontSize: '13px',
                      padding: '2px 6px',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; }}
                  >
                    ✕ Remove
                  </button>
                </div>

                <div className="planner-grid-2col" style={{ gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: 650, marginBottom: '3px' }}>
                      Proficiency Level
                    </span>
                    <select
                      aria-label={`Proficiency level for ${sub.name}`}
                      value={sub.proficiency || 'average'}
                      onChange={(e) => handleUpdateSubject(sub.id, 'proficiency', e.target.value)}
                      style={{
                        width: '100%',
                        height: '34px',
                        padding: '0 8px',
                        fontSize: '12px',
                        fontWeight: 650,
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                        color: sub.proficiency === 'weak' ? '#C2410C' : sub.proficiency === 'strong' ? '#047857' : '#0F172A',
                      }}
                    >
                      <option value="weak">🔴 Weak (Needs Priority Boost)</option>
                      <option value="average">🟡 Average (Steady Progress)</option>
                      <option value="strong">🟢 Strong (Revision &amp; Mocks)</option>
                    </select>
                  </div>

                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: 650, marginBottom: '3px' }}>
                      Priority Weight
                    </span>
                    <select
                      aria-label={`Priority weight for ${sub.name}`}
                      value={sub.priority || 'high'}
                      onChange={(e) => handleUpdateSubject(sub.id, 'priority', e.target.value)}
                      style={{
                        width: '100%',
                        height: '34px',
                        padding: '0 8px',
                        fontSize: '12px',
                        fontWeight: 650,
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                      }}
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                </div>

                {/* Syllabus Completion Slider */}
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>
                    <span>Syllabus Completed</span>
                    <span style={{ color: '#0F172A', fontWeight: 750 }}>{sub.syllabusCompletion || 50}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={sub.syllabusCompletion || 50}
                    onChange={(e) => handleUpdateSubject(sub.id, 'syllabusCompletion', parseInt(e.target.value, 10))}
                    aria-label={`Syllabus completion percentage for ${sub.name}`}
                    style={{ width: '100%', accentColor: '#4F46E5', height: '4px' }}
                  />
                </div>

                {/* Revision Topics Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Key chapters / topics (e.g. Rotational Motion, Mechanics)"
                    value={sub.revisionTopics || ''}
                    onChange={(e) => handleUpdateSubject(sub.id, 'revisionTopics', e.target.value)}
                    aria-label={`Key chapters and revision topics for ${sub.name}`}
                    style={{
                      width: '100%',
                      height: '32px',
                      padding: '0 10px',
                      fontSize: '11.5px',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                      background: '#F8FAFC',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Subject Input */}
          <form onSubmit={handleAddSubject} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="+ Add Subject (e.g. Physics, GS Paper 1, Placement DSA)"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              className="planner-input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="planner-btn-secondary" style={{ flexShrink: 0 }}>
              Add Subject
            </button>
          </form>

          <div className="planner-step-actions" style={{ justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="planner-btn-secondary"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(4)}
              className="planner-btn-primary"
            >
              Continue to Strategy →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: ACADEMIC STRATEGY & MODULES ── */}
      {activeStep === 4 && (
        <div className="planner-card">
          <div className="planner-card-header">
            <h2 className="planner-card-title">Academic Strategy &amp; Revision Modules</h2>
            <p className="planner-card-subtitle">
              Configure active recall, timed MCQ drills, and mock test analysis modules.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={profile.preferences?.includeSpacedRecall ?? true}
                onChange={(e) => setProfile(p => ({
                  ...p,
                  preferences: { ...p.preferences, includeSpacedRecall: e.target.checked }
                }))}
                style={{ width: '16px', height: '16px', accentColor: '#4F46E5' }}
              />
              <div>
                <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block' }}>
                  🧠 SM-2 Spaced Repetition &amp; Active Recall Slots
                </strong>
                <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                  Schedules high-retention active recall sessions to consolidate formulas and definitions before bed.
                </span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={profile.preferences?.includePracticeDrills ?? true}
                onChange={(e) => setProfile(p => ({
                  ...p,
                  preferences: { ...p.preferences, includePracticeDrills: e.target.checked }
                }))}
                style={{ width: '16px', height: '16px', accentColor: '#4F46E5' }}
              />
              <div>
                <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block' }}>
                  📝 Timed PYQ Drills &amp; Numerical Problem Solving
                </strong>
                <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                  Inserts timed test conditions for previous-year questions to train solving velocity.
                </span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={profile.preferences?.includeMockTests ?? true}
                onChange={(e) => setProfile(p => ({
                  ...p,
                  preferences: { ...p.preferences, includeMockTests: e.target.checked }
                }))}
                style={{ width: '16px', height: '16px', accentColor: '#4F46E5' }}
              />
              <div>
                <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block' }}>
                  🎯 Sectional Mock Tests &amp; Error Log Analysis
                </strong>
                <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                  Reserves deliberate error diagnosis blocks to permanently fix concept mistakes.
                </span>
              </div>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="planner-btn-secondary"
            >
              ← Back to Subjects
            </button>
          </div>
        </div>
      )}

      {/* ── REALISM & WORKLOAD SUMMARY PILL ── */}
      {hasGenerated && realismData && (
        <div style={{ padding: '12px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Academic Realism Score
            </span>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
              {realismData.score}% — {realismData.label}
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', textAlign: 'right' }}>
            {realismData.studyHours}h Study • {realismData.breakHours}h Recovery Buffers
          </div>
        </div>
      )}

      {/* ── MAIN GENERATOR ACTION BUTTON ── */}
      <button
        type="button"
        onClick={onGenerate}
        className="planner-btn-primary"
        style={{
          width: '100%',
          height: '48px',
          fontSize: '14.5px',
          fontWeight: 800,
          borderRadius: '12px',
          background: '#4F46E5',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 14px -2px rgba(79, 70, 229, 0.35)',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#4338CA'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#4F46E5'; }}
      >
        <span>⚡ Generate AI-Optimized Timetable</span>
      </button>

      {/* ── USER'S REQUESTED PERMANENT SINGLE-LINE TEXT LINK (ZERO DISTRACTION) ── */}
      <div
        style={{
          marginTop: '12px',
          textAlign: 'center',
          fontSize: '11.5px',
          color: '#64748B',
          lineHeight: 1.5,
        }}
      >
        <span>Want to follow this timetable on mobile? </span>
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
  );
}
