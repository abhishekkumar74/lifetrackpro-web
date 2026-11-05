'use client';
import { useState } from 'react';
import { CATEGORY_STYLES, generateRoutineTextExport, findAlternativeRoutineSlot } from '@/lib/routineEngine';
import AppPromotionCard from '../AppPromotionCard';
import AfterActionAppSuggestion from '../AfterActionAppSuggestion';

/**
 * RoutineTimelineView — Right Column Daily Routine Dashboard
 * Redesigned for spacious layout, clear visual hierarchy, and Linear/Notion aesthetic.
 */
export default function RoutineTimelineView({
  activities = [],
  profile,
  balanceData,
  onUpdateActivity,
  onDeleteActivity,
  onAddActivityClick,
  onEditActivityClick,
  onRegenerate,
  onSaveRoutine,
  onOpenSavedModal,
  onPrintRoutine,
  onDownloadPdf,
  isExportingPdf = false,
  showToast,
  isConflictFree = true,
  conflictWarnings = [],
  onStartFocus,
}) {
  const [copied, setCopied] = useState(false);
  const [actionSuggestion, setActionSuggestion] = useState(null);
  const [rescheduleProposal, setRescheduleProposal] = useState(null);

  // 1-Click Copy Formatted Text Outline
  const handleCopy = () => {
    const textLines = generateRoutineTextExport(
      activities,
      profile.personaKey,
      profile.wakeTime,
      profile.sleepHours
    );

    navigator.clipboard.writeText(textLines).then(() => {
      setCopied(true);
      setActionSuggestion({ action: 'copy' });
      if (typeof showToast === 'function') {
        showToast('📋 Routine copied to clipboard!');
      }
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Browser Print Routine
  const handlePrint = () => {
    setActionSuggestion({ action: 'pdf' });
    if (typeof onPrintRoutine === 'function') {
      onPrintRoutine();
    } else {
      window.print();
    }
  };

  // Download PDF Document
  const handleDownloadPdf = () => {
    setActionSuggestion({ action: 'pdf' });
    if (typeof onDownloadPdf === 'function') {
      onDownloadPdf();
    } else {
      window.print();
    }
  };

  // Intelligent Rescheduling trigger
  const handleTriggerReschedule = (activity) => {
    const proposal = findAlternativeRoutineSlot(activity, activities, profile.wakeTime, profile.sleepHours);
    if (proposal) {
      setRescheduleProposal({
        activity,
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
    const { activity, proposal } = rescheduleProposal;

    onUpdateActivity({
      ...activity,
      startTime: proposal.startTime,
      endTime: proposal.endTime,
      timeWindow: proposal.displayTime,
      note: `${activity.note || ''} (Rescheduled: ${proposal.note})`.trim(),
    });

    setRescheduleProposal(null);
    if (typeof showToast === 'function') {
      showToast('⚡ Activity successfully rescheduled!');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. DASHBOARD HEADER & SUMMARY METRICS CARD */}
      <div className="daily-routine-dashboard-card">
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#172033', margin: 0 }}>
                My Daily Routine
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 750,
                  padding: '2.5px 8px',
                  borderRadius: '100px',
                  background: 'rgba(91, 92, 240, 0.08)',
                  color: '#5B5CF0',
                }}
              >
                {profile.personaKey.toUpperCase()}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
              Build a balanced 24-hour schedule around your lifestyle, study time and personal commitments. ({balanceData.completedCount || 0} of {balanceData.studyCount || activities.filter(a => ['deep_work', 'practice', 'recall'].includes(a.category) || a.type === 'study').length} study sessions completed • {balanceData.scheduledStudyHours}h available study time)
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 650,
                padding: '3px 9px',
                borderRadius: '100px',
                background: isConflictFree ? '#F0FDF4' : '#FEF2F2',
                color: isConflictFree ? '#15803D' : '#DC2626',
                border: `1px solid ${isConflictFree ? '#DCFCE7' : '#FEE2E2'}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>{isConflictFree ? '✓' : '⚠️'}</span>
              <span>{isConflictFree ? '100% Conflict-Free Schedule' : 'Schedule Conflicts Detected'}</span>
            </span>
          </div>
        </div>

        {/* 4 Clean Metric Cards (Linear / Notion Productivity Aesthetic) */}
        <div className="daily-routine-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))', gap: '10px' }}>
          {/* Metric 1: Focus Study */}
          <div className="daily-routine-metric-card" style={{ padding: '14px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8ECF2', boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.03)' }}>
            <div className="metric-lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4F46E5', display: 'inline-block' }} />
              <span>Focus Study</span>
            </div>
            <div className="metric-val" style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono)', margin: '4px 0 2px' }}>
              {balanceData.scheduledStudyHours}<span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>h</span>
            </div>
            <div className="metric-sub" style={{ fontSize: '11px', color: '#94A3B8' }}>
              {balanceData.studyCount} deep blocks
            </div>
          </div>

          {/* Metric 2: Sleep */}
          <div className="daily-routine-metric-card" style={{ padding: '14px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8ECF2', boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.03)' }}>
            <div className="metric-lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#64748B', display: 'inline-block' }} />
              <span>Restorative Sleep</span>
            </div>
            <div className="metric-val" style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono)', margin: '4px 0 2px' }}>
              {balanceData.scheduledSleepHours}<span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>h</span>
            </div>
            <div className="metric-sub" style={{ fontSize: '11px', color: '#94A3B8' }}>
              Full neuro-recovery
            </div>
          </div>

          {/* Metric 3: Fixed Activities */}
          <div className="daily-routine-metric-card" style={{ padding: '14px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8ECF2', boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.03)' }}>
            <div className="metric-lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D97706', display: 'inline-block' }} />
              <span>Fixed Activities</span>
            </div>
            <div className="metric-val" style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono)', margin: '4px 0 2px' }}>
              {balanceData.scheduledFixedHours}<span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>h</span>
            </div>
            <div className="metric-sub" style={{ fontSize: '11px', color: '#94A3B8' }}>
              Classes &amp; meals
            </div>
          </div>

          {/* Metric 4: Rest and Breaks */}
          <div className="daily-routine-metric-card" style={{ padding: '14px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8ECF2', boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.03)' }}>
            <div className="metric-lbl" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0D9488', display: 'inline-block' }} />
              <span>Rest &amp; Breaks</span>
            </div>
            <div className="metric-val" style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono)', margin: '4px 0 2px' }}>
              {balanceData.scheduledBreakHours}<span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>h</span>
            </div>
            <div className="metric-sub" style={{ fontSize: '11px', color: '#94A3B8' }}>
              Recovery buffers
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACTIONS TOOLBAR */}
      <div className="daily-routine-toolbar">
        {/* Primary CTAs (50/50 on Mobile) */}
        <div className="toolbar-primary-row">
          <button
            type="button"
            onClick={onSaveRoutine}
            style={{
              padding: '8px 16px',
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
            <span>Save Routine</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            title="Download formatted A4 PDF routine"
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

        {/* Secondary Utility Actions (Compact row) */}
        <div className="toolbar-secondary-row">
          <button
            type="button"
            onClick={onRegenerate}
            title="Recalculate routine based on configuration"
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

          <button
            type="button"
            onClick={onAddActivityClick}
            title="Add custom routine activity"
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

          <button
            type="button"
            onClick={handleCopy}
            title="Copy routine text outline to clipboard"
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
            onClick={handlePrint}
            title="Open browser print dialog for A4 routine"
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
            title="View saved routines in browser"
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

        {/* Timetable Link Banner */}
        <a
          href="/tools/study-timetable-generator?import=routine"
          className="toolbar-timetable-link"
          title="Import available study windows into the Study Timetable Generator to assign specific subjects and chapters"
        >
          <span>📚</span>
          <span>Plan Subjects in Timetable →</span>
        </a>
      </div>

      {/* MOBILE APP COMPANION STRIP (PERSISTED ON PAGE VIEW) */}
      <div
        className="daily-routine-mobile-companion-strip"
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
            Want to follow this routine on mobile?
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

      {/* STRATEGIC APP CTA PLACEMENT 2: Subtle Post-Action Suggestion */}
      {actionSuggestion && (
        <AfterActionAppSuggestion
          action={actionSuggestion.action}
          source="daily_routine_planner"
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
              ⚡ Adaptive Reschedule Proposal
            </div>
            <div style={{ fontSize: '12px', color: '#172033', marginTop: '2px' }}>
              Missed <strong>{rescheduleProposal.activity.title}</strong>? We found an open buffer at <strong>{rescheduleProposal.proposal.displayTime}</strong> ({rescheduleProposal.proposal.note}).
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

      {/* 3. VERTICAL TIMELINE OF 24-HOUR ACTIVITIES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {activities.map((act) => {
          const styleMeta = CATEGORY_STYLES[act.category] || CATEGORY_STYLES.deep_work;
          const isSleep = act.category === 'sleep';
          const isFixed = act.category === 'fixed';
          const isBreak = act.category === 'break';
          const isStudyActivity = ['deep_work', 'practice', 'recall'].includes(act.category) || act.type === 'study' || (act.title && act.title.toLowerCase().includes('study'));

          if (isStudyActivity) {
            return (
              <div
                key={act.id}
                className="daily-routine-study-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background: act.completed ? 'rgba(5, 150, 105, 0.04)' : '#FFFFFF',
                  border: `1px solid ${act.completed ? 'rgba(5, 150, 105, 0.3)' : '#E8ECF2'}`,
                  borderLeft: `4px solid ${act.completed ? 'var(--emerald)' : styleMeta.accent}`,
                  boxShadow: '0 2px 10px -2px rgba(15, 23, 42, 0.04)',
                  opacity: act.completed ? 0.8 : 1,
                  transition: 'all 0.15s ease',
                  minWidth: 0,
                }}
              >
                {/* Header Row: Checkbox, Time, Category Badge, Duration Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, overflow: 'hidden' }}>
                    {/* Complete Checkbox ONLY FOR STUDY */}
                    <button
                      type="button"
                      onClick={() => onUpdateActivity({ ...act, completed: !act.completed })}
                      title={act.completed ? 'Mark pending' : 'Mark completed'}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '7px',
                        border: `1.5px solid ${act.completed ? 'var(--emerald)' : '#CBD5E1'}`,
                        background: act.completed ? 'var(--emerald)' : '#FFFFFF',
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
                      {act.completed ? '✓' : ''}
                    </button>

                    <span className="routine-time-full" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#172033', whiteSpace: 'nowrap' }}>
                      {act.timeWindow}
                    </span>
                    <span className="routine-time-short" style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#172033', whiteSpace: 'nowrap' }}>
                      {act.timeWindow ? act.timeWindow.replace(/\s[AP]M/g, '') : ''}
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
                      <span>{styleMeta.label ? styleMeta.label.split(' ')[0] : 'Study'}</span>
                    </span>

                    {act.isLocked && <span title="Locked schedule slot" style={{ fontSize: '11px', flexShrink: 0 }}>🔒</span>}
                  </div>

                  {/* Duration pill placed on top right */}
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
                    {act.duration}m
                  </span>
                </div>

                {/* Body: Title & Pedagogical Description */}
                <div style={{ paddingLeft: '34px' }} className="study-card-body">
                  <div
                    style={{
                      fontSize: '14.5px',
                      fontWeight: 750,
                      color: '#172033',
                      textDecoration: act.completed ? 'line-through' : 'none',
                      lineHeight: 1.35,
                    }}
                  >
                    {act.title}
                  </div>
                  {act.note && (
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '3px', lineHeight: 1.45 }}>
                      {act.note}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="study-card-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', paddingTop: '6px', borderTop: '1px solid #F1F5F9' }}>
                  <button
                    type="button"
                    onClick={() => typeof onStartFocus === 'function' && onStartFocus(act)}
                    title={act.completed ? 'Restart focus timer' : 'Start live focus timer with ambient sound'}
                    className="study-focus-launch-btn"
                    style={{
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: 750,
                      borderRadius: '8px',
                      background: act.completed ? '#F0FDF4' : 'rgba(91, 92, 240, 0.1)',
                      border: `1px solid ${act.completed ? '#86EFAC' : 'rgba(91, 92, 240, 0.3)'}`,
                      color: act.completed ? '#15803D' : '#5B5CF0',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>⏱️</span>
                    <span>{act.completed ? 'Focus Again' : 'Start Focus'}</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="study-secondary-btns">
                    <button
                      type="button"
                      onClick={() => onEditActivityClick(act)}
                      title="Edit activity"
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
                      onClick={() => onUpdateActivity({ ...act, isLocked: !act.isLocked })}
                      title={act.isLocked ? 'Unlock slot' : 'Lock slot to prevent shifting'}
                      style={{
                        padding: '5px 8px',
                        fontSize: '11.5px',
                        borderRadius: '7px',
                        background: act.isLocked ? 'rgba(91, 92, 240, 0.08)' : '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        color: act.isLocked ? '#5B5CF0' : '#64748B',
                        cursor: 'pointer',
                      }}
                    >
                      {act.isLocked ? '🔒' : '🔓'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTriggerReschedule(act)}
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
                      onClick={() => onDeleteActivity(act.id)}
                      title="Remove activity"
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

          // NON-STUDY ACTIVITY: Rendered in 1 clean line with NO checkbox
          return (
            <div
              key={act.id}
              className="daily-routine-row-nonstudy"
              title={act.note ? `${act.title} — ${act.note}` : act.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 12px',
                borderRadius: '9px',
                background: isSleep ? '#F1F5F9' : '#F8FAFC',
                border: '1px solid #E8ECF2',
                borderLeft: `3px solid ${styleMeta.accent || '#94A3B8'}`,
                gap: '8px',
                transition: 'all 0.15s ease',
                minWidth: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                flexWrap: 'nowrap',
              }}
            >
              {/* Left group in a single clean row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 auto', minWidth: 0, overflow: 'hidden' }}>
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
                  {act.timeWindow}
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
                  {act.timeWindow ? act.timeWindow.replace(/\s[AP]M/g, '') : ''}
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
                  <span>{styleMeta.label ? styleMeta.label.split(' ')[0] : 'Activity'}</span>
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
                  {act.title}
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
                  {act.duration}m
                </span>

                {act.isLocked && (
                  <span title="Locked schedule slot" style={{ fontSize: '10.5px', flexShrink: 0 }}>
                    🔒
                  </span>
                )}
              </div>

              {/* Right group: compact actions (Desktop shows all, Mobile shows Edit & Delete) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => onEditActivityClick(act)}
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
                  onClick={() => onUpdateActivity({ ...act, isLocked: !act.isLocked })}
                  title={act.isLocked ? 'Unlock slot' : 'Lock slot'}
                  className="nonstudy-desktop-only"
                  style={{
                    padding: '3px 5px',
                    fontSize: '11px',
                    borderRadius: '5px',
                    background: act.isLocked ? 'rgba(91, 92, 240, 0.08)' : '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    color: act.isLocked ? '#5B5CF0' : '#64748B',
                    cursor: 'pointer',
                  }}
                >
                  {act.isLocked ? '🔒' : '🔓'}
                </button>

                {!isSleep && !isFixed && (
                  <button
                    type="button"
                    onClick={() => handleTriggerReschedule(act)}
                    title="Missed this session? Find next available slot"
                    className="nonstudy-desktop-only"
                    style={{
                      padding: '3px 6px',
                      fontSize: '11px',
                      borderRadius: '5px',
                      background: 'rgba(217, 119, 6, 0.08)',
                      border: '1px solid rgba(217, 119, 6, 0.25)',
                      color: '#D97706',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    ⚡
                  </button>
                )}

                {!isSleep && (
                  <button
                    type="button"
                    onClick={() => onDeleteActivity(act.id)}
                    title="Remove activity"
                    style={{
                      padding: '3px 5px',
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
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* STRATEGIC APP CTA PLACEMENT 1: Below Generated Routine Card */}
      <AppPromotionCard
        source="daily_routine_planner"
        placement="below_generated_routine"
      />
    </div>
  );
}
