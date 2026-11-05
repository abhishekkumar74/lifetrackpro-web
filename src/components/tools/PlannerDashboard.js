'use client';
import { useState } from 'react';
import { generateMultiWeekICalContent, findAlternativeSlot } from '@/lib/timetableEngine';
import AppPromotionCard from './AppPromotionCard';
import AfterActionAppSuggestion from './AfterActionAppSuggestion';

/** Session type visual styling & pedagogical tokens */
const SESSION_TYPE_STYLES = {
  deep_work: {
    label: 'Core Deep Work',
    shortLabel: 'Deep Work',
    color: '#4F46E5',
    bg: 'rgba(79, 70, 229, 0.08)',
    border: 'rgba(79, 70, 229, 0.25)',
    accent: '#5B5CF0',
    icon: '⚡',
  },
  practice: {
    label: 'Timed MCQ / PYQ',
    shortLabel: 'MCQ Drill',
    color: '#0D9488',
    bg: 'rgba(13, 148, 136, 0.08)',
    border: 'rgba(13, 148, 136, 0.25)',
    accent: '#14B8A6',
    icon: '📝',
  },
  recall: {
    label: 'SM-2 Active Recall',
    shortLabel: 'Recall',
    color: '#9333EA',
    bg: 'rgba(147, 51, 234, 0.08)',
    border: 'rgba(147, 51, 234, 0.25)',
    accent: '#A855F7',
    icon: '🧠',
  },
  revision: {
    label: 'SM-2 Active Recall',
    shortLabel: 'Recall',
    color: '#9333EA',
    bg: 'rgba(147, 51, 234, 0.08)',
    border: 'rgba(147, 51, 234, 0.25)',
    accent: '#A855F7',
    icon: '🧠',
  },
  mock_test: {
    label: 'Mock Test & Error Log',
    shortLabel: 'Mock Test',
    color: '#C026D3',
    bg: 'rgba(192, 38, 211, 0.08)',
    border: 'rgba(192, 38, 211, 0.25)',
    accent: '#C026D3',
    icon: '🎯',
  },
  break: {
    label: 'Recovery Break',
    shortLabel: 'Break',
    color: '#059669',
    bg: 'rgba(5, 150, 105, 0.08)',
    border: 'rgba(5, 150, 105, 0.25)',
    accent: '#10B981',
    icon: '☕',
  },
  fixed: {
    label: 'School / Coaching / Fixed',
    shortLabel: 'Coaching',
    color: '#D97706',
    bg: 'rgba(217, 119, 6, 0.08)',
    border: 'rgba(217, 119, 6, 0.25)',
    accent: '#F59E0B',
    icon: '🏛️',
  },
};

export default function PlannerDashboard({
  sessions = [],
  profile = {},
  roadmap = null,
  onToggleDayComplete,
  onUpdateSession,
  onDeleteSession,
  onAddSessionClick,
  onEditSessionClick,
  onRegenerate,
  onOpenSavedModal,
  onSaveCurrentTimetable,
  onBoostWeakSubjects,
  onPrintTimetable,
  onDownloadPdf,
  isExportingPdf = false,
  onStartFocus,
  showToast,
  onViewChange,
}) {
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'roadmap' | 'calendar'
  const [selectedWeek, setSelectedWeek] = useState('all');
  const [copied, setCopied] = useState(false);
  const [actionSuggestion, setActionSuggestion] = useState(null);
  const [rescheduleProposal, setRescheduleProposal] = useState(null);

  const handleSwitchView = (mode) => {
    setViewMode(mode);
    if (typeof onViewChange === 'function') {
      onViewChange(mode);
    }
  };

  // ── METRICS CALCULATIONS FOR DAY TIMELINE ──
  const studySessions = sessions.filter(
    (s) => s.type !== 'break' && s.type !== 'fixed' && !s.isFixed
  );
  const breakSessions = sessions.filter((s) => s.type === 'break');
  const fixedSessions = sessions.filter((s) => s.type === 'fixed' || s.isFixed);
  const completedSessions = studySessions.filter((s) => s.completed);

  const totalStudyMinutes = studySessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const studyHours = (totalStudyMinutes / 60).toFixed(1);
  const completedMinutes = completedSessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const completedHours = (completedMinutes / 60).toFixed(1);

  const totalBreakMinutes = breakSessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const breakHours = (totalBreakMinutes / 60).toFixed(1);

  const totalFixedMinutes = fixedSessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const fixedHours = (totalFixedMinutes / 60).toFixed(1);

  // Subject Time Balance Distribution
  const subjectDistribution = {};
  studySessions.forEach((s) => {
    const subName = s.subject || 'Core Focus';
    subjectDistribution[subName] = (subjectDistribution[subName] || 0) + (s.duration || 0);
  });
  const subjectColors = ['#5B5CF0', '#14B8A6', '#D97706', '#9333EA', '#0284C7', '#E11D48'];

  // Next upcoming study session
  const nextSprint = studySessions.find((s) => !s.completed) || studySessions[0];

  // Weak subjects check
  const weakSubjects = (profile.subjects || []).filter((s) => s.proficiency === 'weak');

  // Multi-Week Roadmap Metrics
  const totalDays = roadmap?.totalDays || 60;
  const totalWeeks = roadmap?.totalWeeks || 8;
  const allRoadmapDays = roadmap?.weeks ? roadmap.weeks.flatMap((w) => w.days) : [];
  const completedRoadmapDaysCount = allRoadmapDays.filter((d) => d.completed).length;
  const roadmapProgressPercent =
    totalDays > 0 ? Math.round((completedRoadmapDaysCount / totalDays) * 100) : 0;

  // ── COPY ACTIONS ──
  const handleCopyDayTimetable = () => {
    const examTitle =
      profile.customExamName || profile.exam?.toUpperCase() || 'LifeTrack Pro Study Timetable';
    const lines = [
      `🎯 ${examTitle} — Daily Study Timetable`,
      `Target: ${profile.targetScoreRank || 'Top AIR'} • Study Target: ${studyHours}h (${studySessions.length} Focus Blocks)`,
      '==================================================',
    ];

    sessions.forEach((s) => {
      const isBreak = s.type === 'break';
      const isFixed = s.type === 'fixed' || s.isFixed;
      if (isBreak) {
        lines.push(`  ☕ ${s.timeWindow}: ${s.title} (${s.duration}m)`);
      } else if (isFixed) {
        lines.push(`  🏛️ ${s.timeWindow}: ${s.title} (${s.duration}m) [Protected Commitment]`);
      } else {
        lines.push(
          `  ⚡ ${s.timeWindow}: [${s.subject}] ${s.title} (${s.duration}m) ${
            s.completed ? '✓ COMPLETED' : '[ ]'
          }`
        );
        if (s.note) lines.push(`     ↳ ${s.note}`);
      }
    });

    lines.push('==================================================');
    lines.push(
      'Generated with LifeTrack Pro AI Study Planner: https://lifetrackpro.in/tools/study-timetable-generator'
    );

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setActionSuggestion({ action: 'copy' });
      if (typeof showToast === 'function') {
        showToast('📋 Daily Timetable copied to clipboard!');
      }
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleCopyRoadmap = () => {
    if (!roadmap || !Array.isArray(roadmap.weeks)) return;
    const lines = [
      `🎯 ${roadmap.examDisplayName} — Academic Master Roadmap (${totalDays} Days • ${totalWeeks} Weeks)`,
      `Target Goal: ${roadmap.targetScoreRank} • Daily Study Target: ${roadmap.dailyStudyHours} Hours`,
      `Total PYQ Practice: ${roadmap.totalPYQTarget} Questions • Sunday Mock Tests: ${roadmap.totalMocks}`,
      '==================================================',
    ];

    roadmap.weeks.forEach((w) => {
      lines.push(`\n📅 WEEK ${w.weekNumber} (${w.dateRange}) — ${w.phaseName}`);
      lines.push(`Goal: ${w.weeklyGoal}`);
      lines.push(`Weekly Target PYQs: ${w.weeklyPYQ}`);
      w.days.forEach((d) => {
        lines.push(
          `  • ${d.displayDay}: [${d.subject}] ${d.chapter} (${d.targetQuestions}) ${
            d.completed ? '✓ DONE' : '[ ]'
          }`
        );
        if (d.isSundayMock) {
          lines.push(
            `    ↳ ${d.mockTestDetails.name} (${d.mockTestDetails.timing}) + ${d.mockTestDetails.analysis}`
          );
        }
      });
    });

    lines.push('\n==================================================');
    lines.push(
      'Generated with LifeTrack Pro AI Study Planner: https://lifetrackpro.in/tools/study-timetable-generator'
    );

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setActionSuggestion({ action: 'copy' });
      if (typeof showToast === 'function') {
        showToast('📋 Syllabus Roadmap copied to clipboard!');
      }
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // ── EXPORT ICAL (.ICS) ──
  const handleExportICal = () => {
    if (viewMode === 'day') {
      const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const icsLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//LifeTrack Pro//AI Study Timetable//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
      ];

      sessions.forEach((s) => {
        if (s.type === 'break') return;
        const sHour = (s.rawStartTime || '08:00').replace(':', '');
        const eHour = (s.rawEndTime || '09:00').replace(':', '');

        icsLines.push('BEGIN:VEVENT');
        icsLines.push(`UID:ltp-session-${s.id || Date.now()}@lifetrackpro.in`);
        icsLines.push(`DTSTAMP:${todayStr}T000000Z`);
        icsLines.push(`DTSTART:${todayStr}T${sHour}00`);
        icsLines.push(`DTEND:${todayStr}T${eHour}00`);
        icsLines.push(`SUMMARY:${s.title}`);
        icsLines.push(
          `DESCRIPTION:${(s.note || s.subject || 'Study Session').replace(/\n/g, ' ')}`
        );
        icsLines.push('END:VEVENT');
      });

      icsLines.push('END:VCALENDAR');
      const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `LifeTrackPro_DayTimetable_${todayStr}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setActionSuggestion({ action: 'calendar' });
      if (typeof showToast === 'function') {
        showToast('📅 Day timetable exported to .ics!');
      }
    } else {
      if (!roadmap) return;
      const icsString = generateMultiWeekICalContent(roadmap, roadmap.examDisplayName);
      const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `LifeTrackPro_${roadmap.exam || 'Roadmap'}_${totalDays}Days_${new Date()
          .toISOString()
          .slice(0, 10)}.ics`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setActionSuggestion({ action: 'calendar' });
      if (typeof showToast === 'function') {
        showToast('📅 Multi-week roadmap exported to .ics!');
      }
    }
  };

  const handlePrint = () => {
    setActionSuggestion({ action: 'pdf' });
    if (typeof onPrintTimetable === 'function') {
      onPrintTimetable();
    } else {
      window.print();
    }
  };

  const handleDownloadPdfClick = () => {
    setActionSuggestion({ action: 'pdf' });
    if (typeof onDownloadPdf === 'function') {
      onDownloadPdf();
    } else {
      window.print();
    }
  };

  // ── ADAPTIVE RESCHEDULE HANDLER ──
  const handleTriggerReschedule = (session) => {
    const proposal = findAlternativeSlot(
      session,
      sessions,
      profile.wakeTime || '06:00',
      profile.sleepTime || '23:00'
    );
    if (proposal) {
      setRescheduleProposal({
        session,
        proposal,
      });
    } else {
      if (typeof showToast === 'function') {
        showToast('No free buffers remaining today. Consider trimming an evening non-essential block.');
      }
    }
  };

  const handleApplyReschedule = () => {
    if (!rescheduleProposal) return;
    const { session, proposal } = rescheduleProposal;

    onUpdateSession({
      ...session,
      rawStartTime: proposal.startTime,
      rawEndTime: proposal.endTime,
      timeWindow: proposal.displayTime,
      note: `${session.note || ''} (Rescheduled: ${proposal.displayTime})`.trim(),
    });

    setRescheduleProposal(null);
    if (typeof showToast === 'function') {
      showToast('⚡ Session successfully shifted to free buffer!');
    }
  };

  // Filter weeks for roadmap view
  const displayedWeeks =
    selectedWeek === 'all'
      ? roadmap?.weeks || []
      : (roadmap?.weeks || []).filter((w) => w.weekNumber === parseInt(selectedWeek, 10));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* ── 1. HEADER & SUMMARY METRICS CARD ── */}
      <div className="daily-routine-dashboard-card">
        {/* Header Row with View Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '18px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#172033', margin: 0 }}>
                {viewMode === 'day'
                  ? 'Daily Study Target Dashboard'
                  : viewMode === 'roadmap'
                  ? 'Academic Master Roadmap'
                  : 'Study Desk Wall Calendar'}
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 750,
                  padding: '2.5px 8px',
                  borderRadius: '100px',
                  background: 'rgba(91, 92, 240, 0.08)',
                  color: '#5B5CF0',
                  textTransform: 'uppercase',
                }}
              >
                {roadmap?.examDisplayName || profile.customExamName || profile.exam?.toUpperCase() || 'GOAL'}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 750,
                  padding: '2.5px 8px',
                  borderRadius: '100px',
                  background: '#F0FDF4',
                  color: '#15803D',
                  border: '1px solid #DCFCE7',
                }}
              >
                🎯 {profile.targetScoreRank || roadmap?.targetScoreRank || 'Top AIR'}
              </span>
            </div>
            <span style={{ fontSize: '13px', color: '#64748B' }}>
              {viewMode === 'day'
                ? `${completedSessions.length} of ${studySessions.length} focus sessions completed (${completedHours}h logged)`
                : `Date-by-date syllabus distribution, chapter targets, and Sunday mock exams (${completedRoadmapDaysCount} of ${totalDays} days completed)`}
            </span>
          </div>

          {/* 3-View Segmented Switcher */}
          <div
            style={{
              display: 'flex',
              background: '#F1F5F9',
              padding: '3px',
              borderRadius: '10px',
              flexWrap: 'wrap',
              gap: '2px',
              maxWidth: '100%',
            }}
          >
            <button
              type="button"
              onClick={() => handleSwitchView('day')}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: viewMode === 'day' ? 750 : 550,
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'day' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'day' ? 'var(--planner-indigo)' : '#64748B',
                boxShadow: viewMode === 'day' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              📅 Day Timeline
            </button>
            <button
              type="button"
              onClick={() => handleSwitchView('roadmap')}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: viewMode === 'roadmap' ? 750 : 550,
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'roadmap' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'roadmap' ? 'var(--planner-indigo)' : '#64748B',
                boxShadow: viewMode === 'roadmap' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              🗓️ Multi-Week Roadmap
            </button>
            <button
              type="button"
              onClick={() => handleSwitchView('calendar')}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: viewMode === 'calendar' ? 750 : 550,
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'calendar' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'calendar' ? 'var(--planner-indigo)' : '#64748B',
                boxShadow: viewMode === 'calendar' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              📌 Wall Calendar
            </button>
          </div>
        </div>

        {/* ── 4 SUMMARY METRIC CARDS ── */}
        {viewMode === 'day' ? (
          <div className="daily-routine-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            <div className="daily-routine-metric-card" style={{ padding: '14px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8ECF2', borderLeft: '3.5px solid var(--planner-indigo)', boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.03)' }}>
              <div className="metric-lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--planner-indigo)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--planner-indigo)', display: 'inline-block' }} />
                <span>Focus Goal</span>
              </div>
              <div className="metric-val" style={{ fontSize: '24px', fontWeight: 800, color: '#172033', margin: '4px 0 2px' }}>
                {studyHours}
                <span style={{ fontSize: '14px', fontWeight: 600 }}>h</span>
              </div>
              <div className="metric-sub" style={{ fontSize: '11.5px', color: '#64748B' }}>{studySessions.length} deep sprints</div>
            </div>

            <div className="daily-routine-metric-card" style={{ padding: '14px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8ECF2', borderLeft: '3.5px solid var(--emerald)', boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.03)' }}>
              <div className="metric-lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--emerald)', display: 'inline-block' }} />
                <span>Completed</span>
              </div>
              <div className="metric-val" style={{ fontSize: '24px', fontWeight: 800, color: '#172033', margin: '4px 0 2px' }}>
                {completedHours}
                <span style={{ fontSize: '14px', fontWeight: 600 }}>h</span>
              </div>
              <div className="metric-sub" style={{ fontSize: '11.5px', color: '#64748B' }}>{completedSessions.length} logged</div>
            </div>

            <div className="daily-routine-metric-card" style={{ padding: '14px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8ECF2', borderLeft: '3.5px solid #10B981', boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.03)' }}>
              <div className="metric-lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                <span>Rest Breaks</span>
              </div>
              <div className="metric-val" style={{ fontSize: '24px', fontWeight: 800, color: '#172033', margin: '4px 0 2px' }}>
                {breakHours}
                <span style={{ fontSize: '14px', fontWeight: 600 }}>h</span>
              </div>
              <div className="metric-sub" style={{ fontSize: '11.5px', color: '#64748B' }}>{breakSessions.length} recovery slots</div>
            </div>

            <div className="daily-routine-metric-card" style={{ padding: '14px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8ECF2', borderLeft: '3.5px solid #D97706', boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.03)' }}>
              <div className="metric-lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D97706', display: 'inline-block' }} />
                <span>Fixed Slots</span>
              </div>
              <div className="metric-val" style={{ fontSize: '24px', fontWeight: 800, color: '#172033', margin: '4px 0 2px' }}>
                {fixedSessions.length}
              </div>
              <div className="metric-sub" style={{ fontSize: '11.5px', color: '#64748B' }}>{fixedHours}h protected periods</div>
            </div>
          </div>
        ) : (
          <div className="planner-metrics-grid">
            <div className="planner-metric-box">
              <span className="planner-metric-label" style={{ color: 'var(--planner-indigo)' }}>
                Roadmap Horizon
              </span>
              <div className="planner-metric-value" style={{ color: 'var(--planner-indigo)' }}>
                {totalDays}
                <span style={{ fontSize: '14px', fontWeight: 600 }}> Days</span>
              </div>
              <span className="planner-metric-sub">{totalWeeks} Weeks Master Plan</span>
            </div>

            <div className="planner-metric-box">
              <span className="planner-metric-label" style={{ color: 'var(--emerald)' }}>
                Target PYQ Volume
              </span>
              <div className="planner-metric-value" style={{ color: 'var(--emerald)' }}>
                {roadmap?.totalPYQTarget || 2400}
                <span style={{ fontSize: '14px', fontWeight: 600 }}> Qs</span>
              </div>
              <span className="planner-metric-sub">Previous Year Questions mapped</span>
            </div>

            <div className="planner-metric-box">
              <span className="planner-metric-label" style={{ color: '#9333EA' }}>
                Sunday Mock Exams
              </span>
              <div className="planner-metric-value" style={{ color: '#9333EA' }}>
                {roadmap?.totalMocks || totalWeeks}
                <span style={{ fontSize: '14px', fontWeight: 600 }}> Mocks</span>
              </div>
              <span className="planner-metric-sub">Full 3h tests + Error book logs</span>
            </div>

            <div className="planner-metric-box">
              <span className="planner-metric-label" style={{ color: '#D97706' }}>
                Milestone Progress
              </span>
              <div className="planner-metric-value" style={{ color: '#D97706' }}>
                {completedRoadmapDaysCount}
                <span style={{ fontSize: '14px', fontWeight: 600 }}>/{totalDays}</span>
              </div>
              <span className="planner-metric-sub">{roadmapProgressPercent}% syllabus targets verified</span>
            </div>
          </div>
        )}

        {/* ── SUBJECT TIME BALANCE BAR (DAY VIEW) OR PROGRESS BAR (ROADMAP VIEW) ── */}
        {viewMode === 'day' ? (
          <div style={{ marginTop: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#64748B',
                marginBottom: '5px',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              <span style={{ fontWeight: 650 }}>Subject Time Balance:</span>
              <span>{Object.keys(subjectDistribution).length} subjects scheduled</span>
            </div>

            {/* Segmented Color Bar */}
            <div
              style={{
                height: '7px',
                background: '#F1F5F9',
                borderRadius: '100px',
                display: 'flex',
                overflow: 'hidden',
              }}
            >
              {Object.keys(subjectDistribution).map((subName, i) => {
                const dur = subjectDistribution[subName];
                const pct = totalStudyMinutes > 0 ? (dur / totalStudyMinutes) * 100 : 0;
                return (
                  <div
                    key={subName}
                    title={`${subName}: ${(dur / 60).toFixed(1)}h (${Math.round(pct)}%)`}
                    style={{
                      width: `${pct}%`,
                      background: subjectColors[i % subjectColors.length],
                      transition: 'width 0.3s ease',
                    }}
                  />
                );
              })}
            </div>

            {/* Micro legend */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '8px',
                fontSize: '11px',
                color: '#475569',
              }}
            >
              {Object.keys(subjectDistribution).map((subName, i) => (
                <div key={subName} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: subjectColors[i % subjectColors.length],
                    }}
                  />
                  <span>
                    {subName} ({(subjectDistribution[subName] / 60).toFixed(1)}h)
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#64748B',
                marginBottom: '6px',
              }}
            >
              <span>Overall Roadmap Completion:</span>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>
                {roadmapProgressPercent}% Complete
              </span>
            </div>
            <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, roadmapProgressPercent)}%`,
                  background: 'linear-gradient(90deg, #5B5CF0, #14B8A6)',
                  borderRadius: '100px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── 2. ACTIONS TOOLBAR ── */}
      <div className="daily-routine-toolbar">
        {/* Primary Row: Save Timetable + Download PDF */}
        <div className="toolbar-primary-row">
          <button
            type="button"
            onClick={onSaveCurrentTimetable}
            style={{
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 750,
              borderRadius: '9px',
              border: 'none',
              background: '#5B5CF0',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(91, 92, 240, 0.25)',
            }}
          >
            <span>💾</span>
            <span>{viewMode === 'day' ? 'Save Timetable' : 'Save Roadmap'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdfClick}
            disabled={isExportingPdf}
            title="Download formatted A4 PDF timetable"
            style={{
              padding: '8px 13px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '9px',
              border: '1px solid #C7D2FE',
              background: isExportingPdf ? '#F1F5F9' : '#EEF2FF',
              color: isExportingPdf ? '#64748B' : '#4F46E5',
              cursor: isExportingPdf ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span>{isExportingPdf ? '⏳' : '📄'}</span>
            <span>{isExportingPdf ? 'Exporting...' : 'Download PDF'}</span>
          </button>
        </div>

        {/* Secondary Utility Actions (Compact Row) */}
        <div className="toolbar-secondary-row">
          <button
            type="button"
            onClick={onRegenerate}
            title="Recalculate timetable"
            style={{
              padding: '7px 11px',
              fontSize: '11.5px',
              fontWeight: 700,
              borderRadius: '8px',
              border: '1px solid #E8ECF2',
              background: '#FFFFFF',
              color: '#172033',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            }}
          >
            <span>🔄</span>
            <span>Regen</span>
          </button>

          {viewMode === 'day' && (
            <button
              type="button"
              onClick={onAddSessionClick}
              title="Add custom study session"
              style={{
                padding: '7px 11px',
                fontSize: '11.5px',
                fontWeight: 700,
                borderRadius: '8px',
                border: '1px solid #E8ECF2',
                background: '#FFFFFF',
                color: '#172033',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              }}
            >
              <span>➕</span>
              <span>Add</span>
            </button>
          )}

          {viewMode === 'day' && weakSubjects.length > 0 && (
            <button
              type="button"
              onClick={onBoostWeakSubjects}
              title="Automatically allocate extra practice to weak subjects"
              style={{
                padding: '7px 11px',
                fontSize: '11.5px',
                fontWeight: 750,
                borderRadius: '8px',
                border: '1px solid rgba(217, 119, 6, 0.3)',
                background: 'rgba(217, 119, 6, 0.08)',
                color: '#D97706',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>⚡</span>
              <span>Boost Weak</span>
            </button>
          )}

          <button
            type="button"
            onClick={viewMode === 'day' ? handleCopyDayTimetable : handleCopyRoadmap}
            title="Copy text outline to clipboard"
            style={{
              padding: '7px 11px',
              fontSize: '11.5px',
              fontWeight: 650,
              borderRadius: '8px',
              border: '1px solid #E8ECF2',
              background: '#FFFFFF',
              color: '#172033',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>📋</span>
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportICal}
            title="Export to Google / Apple Calendar (.ics)"
            style={{
              padding: '7px 11px',
              fontSize: '11.5px',
              fontWeight: 650,
              borderRadius: '8px',
              border: '1px solid #C7D2FE',
              background: '#FFFFFF',
              color: '#4F46E5',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>📅</span>
            <span>iCal</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            title="Open browser print dialog for A4 timetable"
            style={{
              padding: '7px 11px',
              fontSize: '11.5px',
              fontWeight: 650,
              borderRadius: '8px',
              border: '1px solid #E8ECF2',
              background: '#FFFFFF',
              color: '#172033',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>🖨️</span>
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={onOpenSavedModal}
            title="View saved timetables in browser"
            style={{
              padding: '7px 11px',
              fontSize: '11.5px',
              fontWeight: 650,
              borderRadius: '8px',
              border: '1px solid #E8ECF2',
              background: '#FFFFFF',
              color: '#172033',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>📁</span>
            <span>Saved</span>
          </button>
        </div>

        {/* Link back to Daily Routine Generator */}
        <a
          href="/tools/daily-routine-generator"
          className="toolbar-timetable-link"
          title="Align study timetable with your 24-hour lifestyle, sleep & meal routine"
        >
          <span>⏰</span>
          <span>Open 24h Daily Routine →</span>
        </a>
      </div>

      {/* MOBILE APP COMPANION STRIP (PERSISTED ON PAGE VIEW) */}
      <div
        className="planner-mobile-companion-strip"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 16px',
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          fontSize: '12.5px',
          color: '#475569',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '15px' }}>📱</span>
          <span style={{ fontWeight: 650, color: '#1E293B' }}>
            Want to follow this timetable &amp; track targets on mobile?
          </span>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontWeight: 750,
            color: '#4F46E5',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '12.5px',
          }}
        >
          <span>Explore LifeTrack Pro on Play Store</span>
          <span>↗</span>
        </a>
      </div>

      {/* STRATEGIC APP CTA PLACEMENT: Subtle Post-Action Suggestion */}
      {actionSuggestion && (
        <AfterActionAppSuggestion
          action={actionSuggestion.action}
          source="study_timetable_planner"
          onDismiss={() => setActionSuggestion(null)}
        />
      )}

      {/* INTELLIGENT RESCHEDULING PROPOSAL ALERT */}
      {rescheduleProposal && (
        <div
          style={{
            padding: '16px 18px',
            background: 'rgba(91, 92, 240, 0.05)',
            borderRadius: '12px',
            border: '1.5px solid #5B5CF0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#5B5CF0' }}>
              ⚡ Adaptive Study Reschedule Proposal
            </div>
            <div style={{ fontSize: '12px', color: '#172033', marginTop: '2px' }}>
              Missed <strong>{rescheduleProposal.session.title}</strong>? We found an open buffer at{' '}
              <strong>{rescheduleProposal.proposal.displayTime}</strong>.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleApplyReschedule}
              style={{
                padding: '7px 14px',
                fontSize: '12px',
                fontWeight: 700,
                background: '#5B5CF0',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              ✓ Accept &amp; Shift Slot
            </button>
            <button
              type="button"
              onClick={() => setRescheduleProposal(null)}
              style={{
                padding: '7px 12px',
                fontSize: '12px',
                fontWeight: 650,
                background: '#F1F5F9',
                color: '#475569',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── 3. VIEW MODE 1: DAY TIMELINE ── */}
      {viewMode === 'day' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Next Scheduled Focus Sprint Banner */}
          {nextSprint && (
            <div
              className="daily-routine-focus-banner"
              style={{
                padding: '14px 18px',
                background: '#EEF2FF',
                borderRadius: '12px',
                border: '1px solid #C7D2FE',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#4F46E5',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  ⚡ NEXT SCHEDULED FOCUS SPRINT ({nextSprint.duration} min)
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1E1B4B', marginTop: '2px' }}>
                  {nextSprint.title} ({nextSprint.timeWindow})
                </div>
              </div>

              <button
                type="button"
                onClick={() => typeof onStartFocus === 'function' && onStartFocus(nextSprint)}
                className="daily-routine-focus-banner-btn"
                style={{
                  padding: '9px 18px',
                  fontSize: '12.5px',
                  fontWeight: 750,
                  borderRadius: '9px',
                  background: '#4F46E5',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
                }}
              >
                <span>⏱️</span>
                <span>Start Live Focus Timer</span>
              </button>
            </div>
          )}

          {/* Timeline Activities List */}
          {sessions.map((sess) => {
            const isBreak = sess.type === 'break';
            const isFixed = sess.type === 'fixed' || sess.isFixed;
            const isStudy = !isBreak && !isFixed;
            const styleMeta =
              SESSION_TYPE_STYLES[sess.type] ||
              (isFixed ? SESSION_TYPE_STYLES.fixed : SESSION_TYPE_STYLES.deep_work);

            // ── STUDY SESSIONS: RICH CARD WITH COMPLETION CHECKBOX ──
            if (isStudy) {
              return (
                <div
                  key={sess.id}
                  className="daily-routine-study-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    background: sess.completed ? 'rgba(5, 150, 105, 0.04)' : '#FFFFFF',
                    border: `1px solid ${
                      sess.completed ? 'rgba(5, 150, 105, 0.3)' : '#E8ECF2'
                    }`,
                    borderLeft: `4px solid ${
                      sess.completed ? 'var(--emerald)' : styleMeta.accent
                    }`,
                    boxShadow: '0 2px 10px -2px rgba(15, 23, 42, 0.04)',
                    opacity: sess.completed ? 0.8 : 1,
                    transition: 'all 0.15s ease',
                    minWidth: 0,
                  }}
                >
                  {/* Header Row: Checkbox, Time, Category Badge, Duration Tag */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        minWidth: 0,
                        overflow: 'hidden',
                      }}
                    >
                      {/* Complete Checkbox ONLY FOR STUDY SESSIONS */}
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateSession({ ...sess, completed: !sess.completed })
                        }
                        title={sess.completed ? 'Mark pending' : 'Mark completed'}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '7px',
                          border: `1.5px solid ${
                            sess.completed ? 'var(--emerald)' : '#CBD5E1'
                          }`,
                          background: sess.completed ? 'var(--emerald)' : '#FFFFFF',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          flexShrink: 0,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {sess.completed ? '✓' : ''}
                      </button>

                      <span
                        className="routine-time-full"
                        style={{
                          fontSize: '12px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          color: '#172033',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {sess.timeWindow}
                      </span>
                      <span
                        className="routine-time-short"
                        style={{
                          fontSize: '11.5px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          color: '#172033',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {sess.timeWindow ? sess.timeWindow.replace(/\s[AP]M/g, '') : ''}
                      </span>

                      <span
                        className="routine-cat-full"
                        style={{
                          fontSize: '10px',
                          fontWeight: 750,
                          padding: '2px 8px',
                          borderRadius: '100px',
                          background: styleMeta.bg,
                          color: styleMeta.color,
                          border: `1px solid ${styleMeta.border}`,
                          whiteSpace: 'nowrap',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <span>{styleMeta.icon}</span>
                        <span>{styleMeta.label}</span>
                      </span>
                      <span
                        className="routine-cat-short"
                        style={{
                          fontSize: '10px',
                          fontWeight: 750,
                          padding: '2px 6px',
                          borderRadius: '100px',
                          background: styleMeta.bg,
                          color: styleMeta.color,
                          border: `1px solid ${styleMeta.border}`,
                          whiteSpace: 'nowrap',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        <span>{styleMeta.icon}</span>
                        <span>{styleMeta.shortLabel}</span>
                      </span>

                      {sess.locked && (
                        <span title="Locked schedule slot" style={{ fontSize: '11px', flexShrink: 0 }}>
                          🔒
                        </span>
                      )}
                    </div>

                    {/* Duration badge pinned top-right */}
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#64748B',
                        fontWeight: 700,
                        background: '#F1F5F9',
                        border: '1px solid #E2E8F0',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {sess.duration}m
                    </span>
                  </div>

                  {/* Body: Title & Pedagogical Description */}
                  <div style={{ paddingLeft: '34px' }} className="study-card-body">
                    <div
                      style={{
                        fontSize: '14.5px',
                        fontWeight: 750,
                        color: '#172033',
                        textDecoration: sess.completed ? 'line-through' : 'none',
                        lineHeight: 1.35,
                      }}
                    >
                      {sess.title}
                    </div>
                    {sess.note && (
                      <div
                        style={{
                          fontSize: '11.5px',
                          color: '#64748B',
                          marginTop: '3px',
                          lineHeight: 1.45,
                        }}
                      >
                        {sess.note}
                      </div>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div
                    className="study-card-actions"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                      paddingTop: '6px',
                      borderTop: '1px solid #F1F5F9',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        typeof onStartFocus === 'function' && onStartFocus(sess)
                      }
                      title={
                        sess.completed
                          ? 'Restart focus timer'
                          : 'Start live focus timer with ambient sound'
                      }
                      className="study-focus-launch-btn"
                      style={{
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 750,
                        borderRadius: '8px',
                        background: sess.completed ? '#F0FDF4' : 'rgba(91, 92, 240, 0.1)',
                        border: `1px solid ${
                          sess.completed ? '#86EFAC' : 'rgba(91, 92, 240, 0.3)'
                        }`,
                        color: sess.completed ? '#15803D' : '#5B5CF0',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <span>⏱️</span>
                      <span>{sess.completed ? 'Focus Again' : 'Start Focus'}</span>
                    </button>

                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                      className="study-secondary-btns"
                    >
                      <button
                        type="button"
                        onClick={() => onEditSessionClick(sess)}
                        title="Edit session details"
                        style={{
                          padding: '5px 9px',
                          fontSize: '11.5px',
                          borderRadius: '7px',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          color: '#334155',
                          cursor: 'pointer',
                        }}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onUpdateSession({ ...sess, locked: !sess.locked })
                        }
                        title={
                          sess.locked ? 'Unlock slot' : 'Lock slot to prevent shifting'
                        }
                        style={{
                          padding: '5px 8px',
                          fontSize: '11.5px',
                          borderRadius: '7px',
                          background: sess.locked
                            ? 'rgba(91, 92, 240, 0.08)'
                            : '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          color: sess.locked ? '#5B5CF0' : '#64748B',
                          cursor: 'pointer',
                        }}
                      >
                        {sess.locked ? '🔒' : '🔓'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTriggerReschedule(sess)}
                        title="Missed this session? Find next available slot"
                        style={{
                          padding: '5px 9px',
                          fontSize: '11.5px',
                          borderRadius: '7px',
                          background: 'rgba(217, 119, 6, 0.08)',
                          border: '1px solid rgba(217, 119, 6, 0.25)',
                          color: '#D97706',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        ⚡ Shift
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteSession(sess.id)}
                        title="Remove session"
                        style={{
                          padding: '5px 8px',
                          fontSize: '11.5px',
                          borderRadius: '7px',
                          background: 'rgba(239, 68, 68, 0.06)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          color: '#DC2626',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // ── NON-STUDY ACTIVITIES (BREAKS & FIXED COACHING): 1 CLEAN LINE WITH NO CHECKBOX ──
            return (
              <div
                key={sess.id}
                className="daily-routine-row-nonstudy"
                title={sess.note ? `${sess.title} — ${sess.note}` : sess.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 12px',
                  borderRadius: '9px',
                  background: isFixed ? '#FFFBEB' : '#F8FAFC',
                  border: `1px solid ${isFixed ? '#FDE68A' : '#E8ECF2'}`,
                  borderLeft: `3px solid ${styleMeta.accent || '#94A3B8'}`,
                  gap: '8px',
                  transition: 'all 0.15s ease',
                  minWidth: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  flexWrap: 'nowrap',
                }}
              >
                {/* Left Group in a single clean row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flex: '1 1 auto',
                    minWidth: 0,
                    overflow: 'hidden',
                  }}
                >
                  <span
                    className="routine-time-full"
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 750,
                      color: '#475569',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {sess.timeWindow}
                  </span>
                  <span
                    className="routine-time-short"
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 750,
                      color: '#475569',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {sess.timeWindow ? sess.timeWindow.replace(/\s[AP]M/g, '') : ''}
                  </span>

                  <span
                    className="routine-cat-full"
                    style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      padding: '1.5px 6px',
                      borderRadius: '100px',
                      background: styleMeta.bg,
                      color: styleMeta.color,
                      border: `1px solid ${styleMeta.border}`,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    <span>{styleMeta.icon}</span>
                    <span>{styleMeta.shortLabel}</span>
                  </span>
                  <span
                    className="routine-cat-short"
                    style={{
                      fontSize: '10px',
                      padding: '2px 5px',
                      borderRadius: '6px',
                      background: styleMeta.bg,
                      border: `1px solid ${styleMeta.border}`,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      alignItems: 'center',
                    }}
                    title={styleMeta.label}
                  >
                    <span>{styleMeta.icon}</span>
                  </span>

                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 650,
                      color: '#334155',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      minWidth: 0,
                      flex: '1 1 auto',
                    }}
                  >
                    {sess.title}
                  </span>

                  <span
                    style={{
                      fontSize: '10px',
                      color: '#64748B',
                      fontWeight: 650,
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {sess.duration}m
                  </span>

                  {sess.locked && (
                    <span title="Locked schedule slot" style={{ fontSize: '10.5px', flexShrink: 0 }}>
                      🔒
                    </span>
                  )}
                </div>

                {/* Right Action Icons (Strictly 1 line, Edit & Delete) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => onEditSessionClick(sess)}
                    title="Edit activity"
                    style={{
                      padding: '3px 6px',
                      fontSize: '11px',
                      borderRadius: '5px',
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      color: '#475569',
                      cursor: 'pointer',
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onUpdateSession({ ...sess, locked: !sess.locked })
                    }
                    title={sess.locked ? 'Unlock slot' : 'Lock slot'}
                    className="nonstudy-desktop-only"
                    style={{
                      padding: '3px 5px',
                      fontSize: '11px',
                      borderRadius: '5px',
                      background: sess.locked ? 'rgba(91, 92, 240, 0.08)' : '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      color: sess.locked ? '#5B5CF0' : '#64748B',
                      cursor: 'pointer',
                    }}
                  >
                    {sess.locked ? '🔒' : '🔓'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteSession(sess.id)}
                    title="Remove from schedule"
                    style={{
                      padding: '3px 6px',
                      fontSize: '11px',
                      borderRadius: '5px',
                      background: 'rgba(239, 68, 68, 0.06)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      color: '#DC2626',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── 4. VIEW MODE 2: WEEK-BY-WEEK ACADEMIC MASTER ROADMAP ── */}
      {viewMode === 'roadmap' && roadmap && Array.isArray(roadmap.weeks) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Week Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              type="button"
              onClick={() => setSelectedWeek('all')}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: selectedWeek === 'all' ? 750 : 600,
                borderRadius: '8px',
                border: selectedWeek === 'all' ? '1.5px solid #5B5CF0' : '1px solid #E2E8F0',
                background: selectedWeek === 'all' ? 'rgba(91, 92, 240, 0.08)' : '#FFFFFF',
                color: selectedWeek === 'all' ? '#5B5CF0' : '#475569',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              All Weeks ({totalWeeks})
            </button>
            {roadmap.weeks.map((w) => (
              <button
                key={w.weekNumber}
                type="button"
                onClick={() => setSelectedWeek(w.weekNumber)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: selectedWeek === w.weekNumber ? 750 : 600,
                  borderRadius: '8px',
                  border:
                    selectedWeek === w.weekNumber
                      ? '1.5px solid #5B5CF0'
                      : '1px solid #E2E8F0',
                  background:
                    selectedWeek === w.weekNumber
                      ? 'rgba(91, 92, 240, 0.08)'
                      : '#FFFFFF',
                  color: selectedWeek === w.weekNumber ? '#5B5CF0' : '#475569',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Week {w.weekNumber}
              </button>
            ))}
          </div>

          {/* Weeks Iteration */}
          {displayedWeeks.map((w) => (
            <div
              key={w.weekNumber}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '20px',
                boxShadow: '0 2px 10px -2px rgba(15, 23, 42, 0.04)',
              }}
            >
              {/* Week Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '16px',
                  borderBottom: '1px solid #F1F5F9',
                  paddingBottom: '14px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 800,
                        color: '#5B5CF0',
                        background: 'rgba(91, 92, 240, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      WEEK {w.weekNumber}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A' }}>
                      {w.dateRange}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 650,
                        color: '#64748B',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        padding: '2px 7px',
                        borderRadius: '6px',
                      }}
                    >
                      {w.phaseName}
                    </span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.4 }}>
                    <strong>Goal:</strong> {w.weeklyGoal}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--emerald)',
                    background: '#F0FDF4',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '1px solid #DCFCE7',
                  }}
                >
                  🎯 Target: {w.weeklyPYQ} PYQs
                </div>
              </div>

              {/* 7 Days Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                  gap: '12px',
                }}
              >
                {w.days.map((d) => {
                  const isMock = d.isSundayMock;
                  const isWed = d.isWednesdayRecall;

                  return (
                    <div
                      key={d.id}
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        background: d.completed
                          ? '#F0FDF4'
                          : isMock
                          ? '#FAF5FF'
                          : '#F8FAFC',
                        border: `1.5px solid ${
                          d.completed
                            ? '#86EFAC'
                            : isMock
                            ? '#E9D5FF'
                            : isWed
                            ? '#BAE6FD'
                            : '#E2E8F0'
                        }`,
                        borderLeft: `4px solid ${
                          d.completed
                            ? 'var(--emerald)'
                            : isMock
                            ? '#9333EA'
                            : isWed
                            ? '#0284C7'
                            : '#5B5CF0'
                        }`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        position: 'relative',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {/* Top Row: Date, Day & Checkbox */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 800,
                              color: isMock ? '#9333EA' : '#0F172A',
                            }}
                          >
                            {d.displayDay}
                          </span>
                          {isMock ? (
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 800,
                                padding: '1px 6px',
                                borderRadius: '4px',
                                background: '#9333EA',
                                color: '#FFFFFF',
                              }}
                            >
                              FULL MOCK
                            </span>
                          ) : isWed ? (
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 750,
                                padding: '1px 6px',
                                borderRadius: '4px',
                                background: '#E0F2FE',
                                color: '#0369A1',
                              }}
                            >
                              SPACED RECALL
                            </span>
                          ) : (
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                padding: '1px 6px',
                                borderRadius: '4px',
                                background: 'rgba(91, 92, 240, 0.08)',
                                color: '#5B5CF0',
                              }}
                            >
                              {d.subjectProficiency === 'weak' ? 'WEAK FOCUS' : 'CORE'}
                            </span>
                          )}
                        </div>

                        {/* Interactive Completion Toggle */}
                        <button
                          type="button"
                          onClick={() => onToggleDayComplete(d.id)}
                          title={
                            d.completed
                              ? 'Mark uncompleted'
                              : 'Mark daily milestone target completed'
                          }
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            border: `1.5px solid ${
                              d.completed ? 'var(--emerald)' : '#CBD5E1'
                            }`,
                            background: d.completed ? 'var(--emerald)' : '#FFFFFF',
                            color: '#FFFFFF',
                            fontSize: '13px',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                        >
                          {d.completed ? '✓' : ''}
                        </button>
                      </div>

                      {/* Chapter / Mock Exam Title */}
                      <div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#64748B',
                            fontWeight: 650,
                            textTransform: 'uppercase',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {d.subject}
                        </div>
                        <div
                          style={{
                            fontSize: '13.5px',
                            fontWeight: 750,
                            color: '#0F172A',
                            marginTop: '1px',
                            textDecoration: d.completed ? 'line-through' : 'none',
                          }}
                        >
                          {d.chapter}
                        </div>
                      </div>

                      {/* Shifts or Mock Test Details */}
                      {isMock ? (
                        <div
                          style={{
                            background: '#FFFFFF',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            border: '1px solid #E9D5FF',
                            fontSize: '11.5px',
                            color: '#6B21A8',
                          }}
                        >
                          <div>
                            <strong>Exam:</strong> {d.mockTestDetails.timing}
                          </div>
                          <div style={{ marginTop: '2px' }}>
                            <strong>Analysis:</strong> {d.mockTestDetails.analysis}
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            background: '#FFFFFF',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                            fontSize: '11px',
                            color: '#475569',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3px',
                          }}
                        >
                          <div>• {d.shifts.morning}</div>
                          <div>• {d.shifts.afternoon}</div>
                          <div>• {d.shifts.evening}</div>
                        </div>
                      )}

                      {/* Target Questions Footer */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: isMock ? '#9333EA' : 'var(--planner-indigo)',
                          marginTop: 'auto',
                          paddingTop: '4px',
                        }}
                      >
                        <span>Target: {d.targetQuestions}</span>
                        {d.completed && (
                          <span style={{ color: 'var(--emerald)', fontSize: '11px' }}>
                            ✓ Milestone Achieved
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 5. VIEW MODE 3: STUDY DESK WALL CALENDAR ── */}
      {viewMode === 'calendar' && roadmap && Array.isArray(roadmap.weeks) && (
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '2px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.06)',
            overflowX: 'auto',
          }}
        >
          {/* Calendar Header */}
          <div
            style={{
              borderBottom: '2px solid #5B5CF0',
              paddingBottom: '16px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#5B5CF0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                LifeTrack Pro • Academic Study Desk Wall Calendar
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 850, color: '#0F172A', margin: '2px 0 4px' }}>
                {roadmap.examDisplayName} — Master Syllabus Calendar
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                Target: <strong>{roadmap.targetScoreRank}</strong> • Total Volume:{' '}
                <strong>{roadmap.totalPYQTarget} PYQs</strong> •{' '}
                <strong>
                  {totalWeeks} Weeks / {totalDays} Days
                </strong>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                onClick={handlePrint}
                style={{
                  padding: '8px 16px',
                  fontSize: '12.5px',
                  fontWeight: 750,
                  borderRadius: '9px',
                  background: '#5B5CF0',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>🖨️</span>
                <span>Print Poster (A4 / A3)</span>
              </button>
            </div>
          </div>

          {/* Wall Calendar Matrix Table with Touch-Scroll Wrapper */}
          <div
            style={{
              width: '100%',
              maxWidth: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              margin: '14px 0',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #CBD5E1' }}>
                  <th style={{ padding: '10px', fontSize: '12px', fontWeight: 800, color: '#0F172A', textAlign: 'left', width: '90px' }}>
                    Week
                  </th>
                  <th style={{ padding: '10px', fontSize: '12px', fontWeight: 800, color: '#0F172A', textAlign: 'left' }}>
                    Monday
                  </th>
                  <th style={{ padding: '10px', fontSize: '12px', fontWeight: 800, color: '#0F172A', textAlign: 'left' }}>
                    Tuesday
                  </th>
                  <th style={{ padding: '10px', fontSize: '12px', fontWeight: 800, color: '#0284C7', textAlign: 'left' }}>
                    Wednesday (Recall)
                  </th>
                  <th style={{ padding: '10px', fontSize: '12px', fontWeight: 800, color: '#0F172A', textAlign: 'left' }}>
                    Thursday
                  </th>
                  <th style={{ padding: '10px', fontSize: '12px', fontWeight: 800, color: '#0F172A', textAlign: 'left' }}>
                    Friday
                  </th>
                  <th style={{ padding: '10px', fontSize: '12px', fontWeight: 800, color: '#0F172A', textAlign: 'left' }}>
                    Saturday
                  </th>
                  <th style={{ padding: '10px', fontSize: '12px', fontWeight: 800, color: '#9333EA', textAlign: 'left', background: 'rgba(147, 51, 234, 0.08)' }}>
                    Sunday (Mock Exam)
                  </th>
                </tr>
              </thead>
              <tbody>
                {roadmap.weeks.map((w) => (
                  <tr key={w.weekNumber} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px', verticalAlign: 'top', background: '#F8FAFC', borderRight: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#5B5CF0' }}>
                        Week {w.weekNumber}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                        {w.dateRange}
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--emerald)', marginTop: '4px' }}>
                        {w.weeklyPYQ} PYQs
                      </div>
                    </td>

                    {w.days.map((d) => {
                      const isMock = d.isSundayMock;
                      const isWed = d.isWednesdayRecall;

                      return (
                        <td
                          key={d.id}
                          style={{
                            padding: '10px',
                            verticalAlign: 'top',
                            borderRight: '1px solid #E2E8F0',
                            background: d.completed
                              ? '#F0FDF4'
                              : isMock
                              ? 'rgba(147, 51, 234, 0.05)'
                              : isWed
                              ? 'rgba(2, 132, 199, 0.03)'
                              : '#FFFFFF',
                            minWidth: '100px',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 750, color: isMock ? '#9333EA' : '#0F172A' }}>
                              {d.displayDay.split(', ')[1] || d.displayDay}
                            </span>
                            <span
                              onClick={() => onToggleDayComplete(d.id)}
                              title="Click to toggle completion on wall calendar"
                              style={{
                                fontSize: '11px',
                                cursor: 'pointer',
                                padding: '1px 4px',
                                borderRadius: '3px',
                                background: d.completed ? 'var(--emerald)' : '#F1F5F9',
                                color: d.completed ? '#FFFFFF' : '#94A3B8',
                                fontWeight: 800,
                              }}
                            >
                              {d.completed ? '✓' : '[ ]'}
                            </span>
                          </div>

                          <div style={{ fontSize: '9.5px', fontWeight: 750, color: isMock ? '#9333EA' : '#5B5CF0', textTransform: 'uppercase' }}>
                            {d.subject.split(' (')[0]}
                          </div>

                          <div style={{ fontSize: '11px', fontWeight: 650, color: '#1E293B', marginTop: '2px', lineHeight: 1.3, textDecoration: d.completed ? 'line-through' : 'none' }}>
                            {d.chapter}
                          </div>

                          <div style={{ fontSize: '9.5px', color: '#64748B', marginTop: '4px', fontWeight: 600 }}>
                            {d.targetQuestions}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '18px', padding: '12px 16px', background: '#F8FAFC', borderRadius: '10px', border: '1px dashed #CBD5E1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '12px', color: '#475569' }}>
              📌 <strong>Study Desk Instructions:</strong> Print this calendar on A4 or A3 format and pin it directly above your study desk. Check off each day after completing your target questions.
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748B' }}>
              LifeTrack Pro • Academic Performance OS
            </div>
          </div>
        </div>
      )}

      {/* ── 6. STRATEGIC APP CONVERSION CARD ── */}
      <AppPromotionCard
        source="study_timetable_planner"
        placement="below_generated_routine"
      />
    </div>
  );
}
