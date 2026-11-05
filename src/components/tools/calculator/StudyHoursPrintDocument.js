'use client';
import { BRAND_LOGO_BASE64 } from '@/lib/brandLogoBase64';
import { 
  OFFICIAL_PLAY_STORE_URL, 
  OFFICIAL_WEBSITE_URL, 
  PLAY_STORE_QR_DATA_URL 
} from '@/lib/qrCodeHelper';
import { calculateScenarios } from '@/lib/studyHoursEngine';

/**
 * StudyHoursPrintDocument
 * 
 * High-resolution A4 printable report and PDF export document for the
 * Study Hours & Syllabus Completion Calculator.
 * 
 * Styled specifically for high-contrast B&W and color A4 printing,
 * with standard font stacks, strict page-break protections,
 * clean analytical tables, and zero horizontal overflow.
 */
export default function StudyHoursPrintDocument({
  calcData = null,
  studentName = 'Aspirant',
  examName = 'Competitive Examination',
  isExportingPdf = false,
}) {
  if (!calcData) return null;

  const {
    breakdown = {},
    timeline = {},
    requiredDailyHours = 0,
    dailyAvailableHours = 6,
    feasibility = {},
    expectedCompletionDate = '',
    mode = 'quick',
    subjects = [],
    inputs = {},
  } = calcData;

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedExamDate = inputs.examDate ? new Date(inputs.examDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : 'Upcoming Exam';

  const formattedCompletionDate = expectedCompletionDate ? new Date(expectedCompletionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : 'N/A';

  const scenarios = calculateScenarios(
    breakdown.totalWorkloadHours || 400,
    timeline.availableStudyDays || 90,
    inputs.examDate,
    inputs.studyDaysPerWeek || 6,
    dailyAvailableHours
  );

  return (
    <div
      id="study-hours-print-document"
      className={`study-hours-print-document ${isExportingPdf ? 'rendering-pdf' : ''}`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        background: '#FFFFFF',
        color: '#172033',
        width: '100%',
        boxSizing: 'border-box',
        padding: '0',
      }}
    >
      {/* ── 1. DOCUMENT HEADER ── */}
      <header className="routine-print-header" style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #5B5CF0', paddingBottom: '8px', marginBottom: '8px', gap: '12px' }}>
          {/* Brand & Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={BRAND_LOGO_BASE64}
              alt="LifeTrack Pro Logo"
              style={{ width: '32px', height: '32px', borderRadius: '7px', objectFit: 'contain' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#172033', lineHeight: 1 }}>
                  LifeTrack <span style={{ color: '#5B5CF0' }}>Pro</span>
                </span>
                <span style={{ fontSize: '8.5px', fontWeight: 750, background: 'rgba(91, 92, 240, 0.1)', color: '#5B5CF0', padding: '2px 6px', borderRadius: '100px' }}>
                  ACADEMIC WORKLOAD OS
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#64748B', fontWeight: 500 }}>
                Study Hours, Syllabus Completion &amp; Preparation Feasibility Audit
              </p>
            </div>
          </div>

          {/* Date & Feasibility Badge */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#172033', whiteSpace: 'nowrap' }}>
              {currentDateFormatted}
            </div>
            <div
              style={{
                display: 'inline-block',
                marginTop: '3px',
                fontSize: '10px',
                fontWeight: 750,
                color: feasibility.color || '#15803D',
                background: feasibility.bg || '#F0FDF4',
                padding: '2px 8px',
                borderRadius: '5px',
                border: `1px solid ${feasibility.border || '#86EFAC'}`,
                lineHeight: '13px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {feasibility.label || 'Feasibility Checked'}
            </div>
          </div>
        </div>

        {/* Document Title & Countdown Ribbon */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
            <h1 style={{ fontSize: '17px', fontWeight: 850, color: '#172033', margin: 0, letterSpacing: '-0.3px' }}>
              {examName} — Study Hours &amp; Feasibility Report
            </h1>
            <div style={{ fontSize: '10px', color: '#64748B' }}>
              📌 <strong>Academic Planning Audit:</strong> Workload calculation
            </div>
          </div>

          {/* Unified Full-Width Student & Target Ribbon */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 12px',
              background: '#F8FAFC',
              borderRadius: '7px',
              border: '1px solid #E2E8F0',
              fontSize: '10.5px',
              color: '#475569',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <span style={{ whiteSpace: 'nowrap' }}>
                Student: <strong style={{ color: '#172033' }}>{studentName || 'Aspirant'}</strong>
              </span>
              <span style={{ whiteSpace: 'nowrap' }}>
                Exam Date: <strong style={{ color: '#5B5CF0' }}>{formattedExamDate}</strong>
              </span>
              <span style={{ whiteSpace: 'nowrap' }}>
                Countdown: <strong style={{ color: '#172033' }}>{timeline.totalCalendarDays} Days ({timeline.weeks} Wks)</strong>
              </span>
            </div>

            <div style={{ fontWeight: 650, color: '#334155', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '10px' }}>
              <span>Study Capacity: <strong style={{ color: '#172033' }}>{dailyAvailableHours}h/day</strong></span>
              <span style={{ margin: '0 6px', color: '#CBD5E1' }}>|</span>
              <span style={{ color: feasibility.isSurplus ? '#15803D' : '#DC2626', fontWeight: 750 }}>
                {feasibility.isSurplus ? `+${feasibility.dailyDifference}h Surplus` : `${feasibility.dailyDifference}h Deficit`}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. SUMMARY METRICS ROW (4 BOXES) ── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '8px' }}>
        <div style={{ border: '1.5px solid #C7D2FE', borderRadius: '7px', padding: '6px 8px', background: '#F5F5FF', textAlign: 'center' }}>
          <div style={{ fontSize: '8.5px', fontWeight: 750, color: '#5B5CF0' }}>REQUIRED DAILY STUDY</div>
          <div style={{ fontSize: '16px', fontWeight: 850, color: '#172033', fontFamily: 'Consolas, Menlo, monospace', margin: '1px 0' }}>
            {requiredDailyHours}<span style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', marginLeft: '2px' }}>h/day</span>
          </div>
          <div style={{ fontSize: '9px', color: '#5B5CF0', fontWeight: 700 }}>
            {feasibility.label}
          </div>
        </div>

        <div style={{ border: '1px solid #CBD5E1', borderRadius: '7px', padding: '6px 8px', background: '#F8FAFC', textAlign: 'center' }}>
          <div style={{ fontSize: '8.5px', fontWeight: 750, color: '#475569' }}>TOTAL WORKLOAD</div>
          <div style={{ fontSize: '16px', fontWeight: 850, color: '#172033', fontFamily: 'Consolas, Menlo, monospace', margin: '1px 0' }}>
            {breakdown.totalWorkloadHours}<span style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', marginLeft: '2px' }}>hrs</span>
          </div>
          <div style={{ fontSize: '9px', color: '#64748B' }}>Full Syllabus + Rev</div>
        </div>

        <div style={{ border: '1px solid #CBD5E1', borderRadius: '7px', padding: '6px 8px', background: '#F8FAFC', textAlign: 'center' }}>
          <div style={{ fontSize: '8.5px', fontWeight: 750, color: '#475569' }}>NET STUDY DAYS</div>
          <div style={{ fontSize: '16px', fontWeight: 850, color: '#172033', fontFamily: 'Consolas, Menlo, monospace', margin: '1px 0' }}>
            {timeline.availableStudyDays}<span style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', marginLeft: '2px' }}>days</span>
          </div>
          <div style={{ fontSize: '9px', color: '#64748B' }}>{inputs.studyDaysPerWeek}d/wk ({timeline.restDays} rest)</div>
        </div>

        <div style={{ border: '1px solid #CBD5E1', borderRadius: '7px', padding: '6px 8px', background: '#F8FAFC', textAlign: 'center' }}>
          <div style={{ fontSize: '8.5px', fontWeight: 750, color: '#475569' }}>EST. COMPLETION</div>
          <div style={{ fontSize: '14px', fontWeight: 850, color: '#172033', margin: '2px 0 1px' }}>
            {formattedCompletionDate}
          </div>
          <div style={{ fontSize: '9px', color: '#64748B' }}>At {dailyAvailableHours}h pace</div>
        </div>
      </section>

      {/* ── 2B. MOBILE APP COMPANION BANNER ── */}
      <div
        className="routine-print-page-break-avoid"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px 10px',
          background: '#F8FAFC',
          borderRadius: '6px',
          border: '1px solid #E2E8F0',
          marginBottom: '8px',
          fontSize: '10px',
          color: '#475569',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span>Want to track your calculated study hours with Pomodoro timer &amp; streaks?</span>
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
            gap: '2px',
            whiteSpace: 'nowrap',
          }}
        >
          Explore LifeTrack Pro on Play Store ↗
        </a>
      </div>

      {/* ── 3. WORKLOAD ALLOCATION BREAKDOWN TABLE ── */}
      <section className="routine-print-page-break-avoid" style={{ marginBottom: '8px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#172033', margin: '0 0 4px' }}>
          1. Workload Allocation Breakdown
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5px', textAlign: 'left', tableLayout: 'fixed', border: '1px solid #CBD5E1', borderRadius: '5px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#F1F5F9', borderBottom: '1.5px solid #CBD5E1' }}>
              <th style={{ width: '35%', padding: '4.5px 8px', fontWeight: 750, color: '#475569' }}>PREPARATION COMPONENT</th>
              <th style={{ width: '20%', padding: '4.5px 8px', fontWeight: 750, color: '#475569' }}>HOURS ALLOCATED</th>
              <th style={{ width: '15%', padding: '4.5px 8px', fontWeight: 750, color: '#475569' }}>% SHARE</th>
              <th style={{ width: '30%', padding: '4.5px 8px', fontWeight: 750, color: '#475569' }}>METHODOLOGY &amp; BASIS</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
              <td style={{ padding: '4.5px 8px', fontWeight: 700, color: '#172033' }}>Initial Syllabus Learning</td>
              <td style={{ padding: '4.5px 8px', fontWeight: 750, color: '#4F46E5' }}>{breakdown.learningHours} hrs</td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>
                {breakdown.totalWorkloadHours > 0 ? ((breakdown.learningHours / breakdown.totalWorkloadHours) * 100).toFixed(1) : 0}%
              </td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>First-time concept mastery &amp; notes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <td style={{ padding: '4.5px 8px', fontWeight: 700, color: '#172033' }}>Problem Practice &amp; PYQs</td>
              <td style={{ padding: '4.5px 8px', fontWeight: 750, color: '#0D9488' }}>{breakdown.practiceHours} hrs</td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>
                {breakdown.totalWorkloadHours > 0 ? ((breakdown.practiceHours / breakdown.totalWorkloadHours) * 100).toFixed(1) : 0}%
              </td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>Chapter drills, PYQs &amp; question sets</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
              <td style={{ padding: '4.5px 8px', fontWeight: 700, color: '#172033' }}>Revision &amp; Active Recall</td>
              <td style={{ padding: '4.5px 8px', fontWeight: 750, color: '#9333EA' }}>{breakdown.revisionHours} hrs</td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>
                {breakdown.totalWorkloadHours > 0 ? ((breakdown.revisionHours / breakdown.totalWorkloadHours) * 100).toFixed(1) : 0}%
              </td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>35% decay model per revision round</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <td style={{ padding: '4.5px 8px', fontWeight: 700, color: '#172033' }}>Mock Tests &amp; Error Analysis</td>
              <td style={{ padding: '4.5px 8px', fontWeight: 750, color: '#D97706' }}>{breakdown.mockHours} hrs</td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>
                {breakdown.totalWorkloadHours > 0 ? ((breakdown.mockHours / breakdown.totalWorkloadHours) * 100).toFixed(1) : 0}%
              </td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>Timed 3h exam simulation + deep analysis</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #CBD5E1', background: '#FFFFFF' }}>
              <td style={{ padding: '4.5px 8px', fontWeight: 700, color: '#172033' }}>Unplanned Delay Buffer</td>
              <td style={{ padding: '4.5px 8px', fontWeight: 750, color: '#64748B' }}>{breakdown.bufferHours} hrs</td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>
                {breakdown.totalWorkloadHours > 0 ? ((breakdown.bufferHours / breakdown.totalWorkloadHours) * 100).toFixed(1) : 0}%
              </td>
              <td style={{ padding: '4.5px 8px', color: '#64748B' }}>10% contingency for illness/fatigue</td>
            </tr>
            <tr style={{ background: '#EEF2FF', fontWeight: 800 }}>
              <td style={{ padding: '5.5px 8px', color: '#172033' }}>TOTAL PREPARATION WORKLOAD</td>
              <td style={{ padding: '5.5px 8px', color: '#4F46E5', fontSize: '11px' }}>{breakdown.totalWorkloadHours} hrs</td>
              <td style={{ padding: '5.5px 8px', color: '#172033' }}>100.0%</td>
              <td style={{ padding: '5.5px 8px', color: '#4F46E5' }}>Full Syllabus Readiness Target</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── 4. SUBJECT-WISE WORKLOAD TABLE (FOR ADVANCED MODE) ── */}
      {mode === 'advanced' && Array.isArray(subjects) && subjects.length > 0 && (
        <section className="routine-print-page-break-avoid" style={{ marginBottom: '8px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#172033', margin: '0 0 4px' }}>
            2. Subject-Wise Workload Distribution
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5px', textAlign: 'left', tableLayout: 'fixed', border: '1px solid #CBD5E1', borderRadius: '5px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#F1F5F9', borderBottom: '1.5px solid #CBD5E1' }}>
                <th style={{ width: '32%', padding: '4.5px 8px', fontWeight: 750, color: '#475569' }}>SUBJECT</th>
                <th style={{ width: '14%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>CHAPTERS</th>
                <th style={{ width: '14%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>LEARN (h)</th>
                <th style={{ width: '14%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>PRACTICE</th>
                <th style={{ width: '14%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>REVISION</th>
                <th style={{ width: '12%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, idx) => (
                <tr key={s.id || idx} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                  <td style={{ padding: '4.5px 8px', fontWeight: 700, color: '#172033' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ fontSize: '8.5px', fontWeight: 750, padding: '1px 4px', borderRadius: '3px', background: s.priority === 'high' ? '#FEE2E2' : '#F1F5F9', color: s.priority === 'high' ? '#DC2626' : '#64748B' }}>
                        {s.priority.toUpperCase()}
                      </span>
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '4.5px 6px', color: '#64748B' }}>{s.remainingChapters} rem ({s.completedChapters} done)</td>
                  <td style={{ padding: '4.5px 6px', color: '#4F46E5', fontWeight: 700 }}>{s.learningHours}h</td>
                  <td style={{ padding: '4.5px 6px', color: '#0D9488', fontWeight: 700 }}>{s.practiceHours}h</td>
                  <td style={{ padding: '4.5px 6px', color: '#9333EA', fontWeight: 700 }}>{s.revisionHours}h</td>
                  <td style={{ padding: '4.5px 6px', fontWeight: 800, color: '#0F172A' }}>{s.totalHours}h ({s.percentageOfTotal}%)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* ── 5. WHAT-IF STUDY PACE SCENARIO SIMULATOR ── */}
      <section className="routine-print-page-break-avoid" style={{ marginBottom: '8px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#172033', margin: '0 0 4px' }}>
          {mode === 'advanced' ? '3.' : '2.'} What-If Study Pace Simulation Matrix
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', textAlign: 'left', tableLayout: 'fixed', border: '1px solid #CBD5E1', borderRadius: '5px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#F1F5F9', borderBottom: '1.5px solid #CBD5E1' }}>
              <th style={{ width: '22%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>PACE TIER</th>
              <th style={{ width: '16%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>DAILY LOAD</th>
              <th style={{ width: '18%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>STUDY DAYS</th>
              <th style={{ width: '22%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>ESTIMATED FINISH</th>
              <th style={{ width: '22%', padding: '4.5px 6px', fontWeight: 750, color: '#475569' }}>EXAM MARGIN</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((sc, idx) => (
              <tr key={sc.id} style={{ borderBottom: '1px solid #E2E8F0', background: sc.dailyHours === dailyAvailableHours ? '#F0FDF4' : idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                <td style={{ padding: '4px 6px', fontWeight: 700, color: '#172033' }}>
                  {sc.label} {sc.dailyHours === dailyAvailableHours && <span style={{ color: '#15803D', fontSize: '8.5px' }}>(Current)</span>}
                </td>
                <td style={{ padding: '4px 6px', fontWeight: 750, color: '#4F46E5' }}>{sc.dailyHours} hrs/day</td>
                <td style={{ padding: '4px 6px', color: '#64748B' }}>{sc.studyDaysNeeded} study days</td>
                <td style={{ padding: '4px 6px', color: '#172033', fontWeight: 650 }}>{sc.completionDate}</td>
                <td style={{ padding: '4px 6px' }}>
                  <span style={{ fontSize: '8.5px', fontWeight: 750, color: sc.statusColor, background: sc.statusBg, padding: '1.5px 5px', borderRadius: '3px' }}>
                    {sc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── 6. CALCULATION METHODOLOGY & ASSUMPTIONS ── */}
      <section className="routine-print-page-break-avoid" style={{ marginBottom: '8px', background: '#F8FAFC', padding: '7px 10px', borderRadius: '7px', border: '1px solid #E2E8F0', fontSize: '9px', color: '#475569', lineHeight: 1.4 }}>
        <strong style={{ color: '#172033', fontSize: '10px' }}>Planning Assumptions &amp; Methodological Notes:</strong>
        <div style={{ marginTop: '3px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
          <div>• <strong>Revision Efficiency (35% Rule):</strong> Revision cycles are calculated at 35% of first-read time, reflecting cognitive reinforcement.</div>
          <div>• <strong>Rest Day Protection:</strong> Assumes {inputs.studyDaysPerWeek || 6} active study days per week, protecting 1 rest day to prevent neural fatigue.</div>
          <div>• <strong>Quality over Clock Time:</strong> 5 hours of deep Pomodoro focus equals 8 hours of passive reading with phone notifications active.</div>
          <div>• <strong>Dynamic Re-calibration:</strong> Recalculate this audit every 14 days as chapters are finished and mock test scores clarify weak topics.</div>
        </div>
      </section>

      {/* ── 7. LIFETRACK PRO BRANDING & APP PROMOTION FOOTER ── */}
      <footer className="routine-print-footer-promo routine-print-page-break-avoid" style={{ marginTop: '8px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
        <div
          style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            boxSizing: 'border-box',
          }}
        >
          {/* Left: Brand Values & Website */}
          <div style={{ flex: '1 1 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
              <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#5B5CF0' }} />
              <strong style={{ fontSize: '11.5px', color: '#172033', fontWeight: 800 }}>
                Stay consistent. One day at a time.
              </strong>
            </div>

            <p style={{ margin: '0 0 4px', fontSize: '9.5px', color: '#475569', lineHeight: 1.4, maxWidth: '520px' }}>
              Track your daily study hours, complete focus sessions, manage habits and monitor your progress with LifeTrack Pro.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '9.5px', color: '#64748B', flexWrap: 'wrap' }}>
              <span>
                Official Website:{' '}
                <a
                  href={OFFICIAL_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#5B5CF0', fontWeight: 700, textDecoration: 'none' }}
                >
                  {OFFICIAL_WEBSITE_URL}
                </a>
              </span>
              <span>•</span>
              <span style={{ color: '#059669', fontWeight: 650 }}>
                Google Play Store: LifeTrack Pro
              </span>
            </div>
          </div>

          {/* Right: Scannable & Clickable QR Code */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <a
              href={OFFICIAL_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Click or scan to download LifeTrack Pro on Google Play Store"
              style={{ display: 'inline-block', textDecoration: 'none' }}
            >
              <img
                src={PLAY_STORE_QR_DATA_URL}
                alt="Scan to explore LifeTrack Pro on Google Play Store"
                style={{
                  width: '68px',
                  height: '68px',
                  display: 'block',
                  background: '#FFFFFF',
                  padding: '2px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  margin: '0 auto',
                }}
              />
            </a>
            <div style={{ marginTop: '3px', fontSize: '8px', fontWeight: 800, color: '#5B5CF0', whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>
              SCAN TO EXPLORE LIFETRACK PRO
            </div>
            <div style={{ fontSize: '7.5px', color: '#64748B' }}>
              lifetrackpro.in
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
