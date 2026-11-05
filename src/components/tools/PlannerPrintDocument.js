'use client';
import { BRAND_LOGO_BASE64 } from '@/lib/brandLogoBase64';
import { 
  OFFICIAL_PLAY_STORE_URL, 
  OFFICIAL_WEBSITE_URL, 
  PLAY_STORE_QR_DATA_URL 
} from '@/lib/qrCodeHelper';
import { EXAM_PRESETS } from '@/lib/timetableEngine';

/**
 * PlannerPrintDocument
 * 
 * Dedicated, professional A4 print and PDF export template for AI Study Planner.
 * Supports:
 * 1. Daily Study Timetable (activeView === 'day') with checkboxes ONLY on study rows,
 *    and 1-line clean formatting for breaks & fixed coaching commitments.
 * 2. Academic Master Roadmap (activeView === 'roadmap' | 'calendar') as a multi-week plan.
 */
export default function PlannerPrintDocument({
  sessions = [],
  profile = {},
  roadmap = null,
  realismData = {},
  isExportingPdf = false,
  activeView = 'day',
}) {
  const examPreset = EXAM_PRESETS[profile.exam] || { name: profile.customExamName || 'Competitive Exam' };
  const examDisplayName = profile.exam === 'custom' && profile.customExamName 
    ? profile.customExamName 
    : (roadmap?.examDisplayName || examPreset.name || 'Competitive Exam');

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Day Timetable Metrics
  const studySessions = sessions.filter(s => s.type !== 'break' && s.type !== 'fixed' && !s.isFixed);
  const breakSessions = sessions.filter(s => s.type === 'break');
  const fixedSessions = sessions.filter(s => s.type === 'fixed' || s.isFixed);

  const totalStudyMinutes = studySessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const studyHours = (totalStudyMinutes / 60).toFixed(1);
  const totalBreakMinutes = breakSessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const breakHours = (totalBreakMinutes / 60).toFixed(1);
  const totalFixedMinutes = fixedSessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const fixedHours = (totalFixedMinutes / 60).toFixed(1);

  // Multi-Week Roadmap Metrics
  const totalDays = roadmap?.totalDays || 60;
  const totalWeeks = roadmap?.totalWeeks || 8;
  const totalPYQs = roadmap?.totalPYQTarget || 2400;
  const totalMocks = roadmap?.totalMocks || totalWeeks;

  const isDayMode = activeView === 'day' || (!roadmap && sessions.length > 0);

  return (
    <div
      id="planner-print-document"
      className={`planner-print-document ${isExportingPdf ? 'rendering-pdf' : ''}`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        background: '#FFFFFF',
        color: '#172033',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        padding: '0',
      }}
    >
      {/* ── 1. DOCUMENT HEADER ── */}
      <header className="routine-print-header" style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #5B5CF0', paddingBottom: '10px', marginBottom: '12px', gap: '14px' }}>
          {/* Brand & Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={BRAND_LOGO_BASE64}
              alt="LifeTrack Pro Logo"
              style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'contain' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#172033', lineHeight: 1 }}>
                  LifeTrack <span style={{ color: '#5B5CF0' }}>Pro</span>
                </span>
                <span style={{ fontSize: '9px', fontWeight: 750, background: 'rgba(91, 92, 240, 0.1)', color: '#5B5CF0', padding: '2px 7px', borderRadius: '100px' }}>
                  ACADEMIC PERFORMANCE OS
                </span>
              </div>
              <p style={{ margin: '3px 0 0', fontSize: '10.5px', color: '#64748B', fontWeight: 500 }}>
                {isDayMode
                  ? 'Daily Study Timetable & Interleaved Focus Blueprint'
                  : 'Academic Master Roadmap & Date-by-Date Syllabus Plan'}
              </p>
            </div>
          </div>

          {/* Date & Target Score */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#172033', whiteSpace: 'nowrap' }}>
              {currentDateFormatted}
            </div>
            <div
              style={{
                display: 'inline-block',
                marginTop: '4px',
                fontSize: '10.5px',
                fontWeight: 750,
                color: '#15803D',
                background: '#F0FDF4',
                padding: '3px 10px',
                borderRadius: '5px',
                border: '1px solid #86EFAC',
                lineHeight: '14px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              Target: {String(profile?.targetScoreRank || roadmap?.targetScoreRank || '').trim() || 'Top AIR Target'}
            </div>
          </div>
        </div>

        {/* Title Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 850, color: '#172033', margin: '0 0 4px', letterSpacing: '-0.4px' }}>
              {examDisplayName} — {isDayMode ? 'My Daily Study Timetable' : 'Master Academic Roadmap'}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '11px', color: '#475569' }}>
              {isDayMode ? (
                <>
                  <span>
                    Focus Target: <strong style={{ color: '#5B5CF0' }}>{studyHours}h Focus Time</strong>
                  </span>
                  <span>
                    Cadence: <strong>{profile.sessionCadence || 90}m Sprints</strong>
                  </span>
                  <span>
                    Sessions: <strong style={{ color: '#172033' }}>{studySessions.length} Study Blocks</strong>
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Roadmap Horizon: <strong style={{ color: '#5B5CF0' }}>{totalDays} Days ({totalWeeks} Weeks)</strong>
                  </span>
                  <span>
                    Total Practice: <strong style={{ color: '#172033' }}>{totalPYQs} PYQs</strong>
                  </span>
                  <span>
                    Full Mocks: <strong style={{ color: '#9333EA' }}>{totalMocks} Scheduled Sunday Tests</strong>
                  </span>
                </>
              )}
            </div>
          </div>

          <div style={{ fontSize: '10.5px', color: '#64748B', textAlign: 'right' }}>
            📌 <strong>Study Desk Instructions:</strong> Pin on study wall. Check [ ] upon completing focus blocks.
          </div>
        </div>
      </header>

      {/* ── 2. SUMMARY METRICS ROW (4 BOXES) ── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px' }}>
        {isDayMode ? (
          <>
            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', background: '#F8FAFC' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748B' }}>TARGET FOCUS</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#5B5CF0', marginTop: '2px' }}>{studyHours}h</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>{studySessions.length} deep sprints</div>
            </div>

            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', background: '#F8FAFC' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748B' }}>SCHEDULED STUDY</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--emerald)', marginTop: '2px' }}>{studyHours}h</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>Distraction-free</div>
            </div>

            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', background: '#F8FAFC' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748B' }}>RECOVERY BREAKS</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>{breakHours}h</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>{breakSessions.length} recovery buffers</div>
            </div>

            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', background: '#F8FAFC' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748B' }}>FIXED COMMITMENTS</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>{fixedSessions.length} Slots</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>{fixedHours}h School/Coaching</div>
            </div>
          </>
        ) : (
          <>
            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', background: '#F8FAFC' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748B' }}>ROADMAP SPAN</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#5B5CF0', marginTop: '2px' }}>{totalDays} Days</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>{totalWeeks} Weeks Master Plan</div>
            </div>

            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', background: '#F8FAFC' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748B' }}>TARGET PYQ VOLUME</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--emerald)', marginTop: '2px' }}>{totalPYQs} Qs</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>Previous Year Questions</div>
            </div>

            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', background: '#F8FAFC' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748B' }}>SUNDAY MOCKS</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#9333EA', marginTop: '2px' }}>{totalMocks} Tests</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>3h Simulation + Error Log</div>
            </div>

            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px', background: '#F8FAFC' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#64748B' }}>TARGET BENCHMARK</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>{profile?.targetScoreRank || 'Top AIR'}</div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>Weak areas prioritized</div>
            </div>
          </>
        )}
      </section>

      {/* ── 2B. MOBILE APP COMPANION BANNER (REQUESTED SECTION) ── */}
      <div
        className="routine-print-page-break-avoid"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 12px',
          background: '#F8FAFC',
          borderRadius: '7px',
          border: '1px solid #E2E8F0',
          marginBottom: '12px',
          fontSize: '11px',
          color: '#475569',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px' }}>📱</span>
          <span>Want to follow this study timetable on mobile?</span>
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
            whiteSpace: 'nowrap',
          }}
        >
          Explore LifeTrack Pro on Play Store ↗
        </a>
      </div>

      {/* ── 3. MAIN TABLE: DAY TIMETABLE OR MULTI-WEEK ROADMAP ── */}
      {isDayMode ? (
        <section style={{ marginBottom: '14px' }}>
          <div
            className="routine-print-page-break-avoid"
            style={{
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              overflow: 'hidden',
              pageBreakInside: 'avoid',
              breakInside: 'avoid',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', textAlign: 'left', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ background: '#F1F5F9', borderBottom: '1px solid #CBD5E1' }}>
                  <th style={{ width: '38px', padding: '6px 4px', textAlign: 'center', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Done</th>
                  <th style={{ width: '115px', padding: '6px 8px', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Time Window</th>
                  <th style={{ width: '55px', padding: '6px 8px', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Duration</th>
                  <th style={{ width: '90px', padding: '6px 8px', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '6px 8px', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Subject &amp; Scheduled Topic</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => {
                  const isBreak = s.type === 'break';
                  const isFixed = s.type === 'fixed' || s.isFixed;
                  const isStudy = !isBreak && !isFixed;

                  return (
                    <tr
                      key={s.id}
                      style={{
                        borderBottom: '1px solid #E2E8F0',
                        background: isBreak ? '#F8FAFC' : isFixed ? '#FFFBEB' : '#FFFFFF',
                        pageBreakInside: 'avoid',
                        breakInside: 'avoid',
                      }}
                    >
                      {/* Checkbox ONLY for study sessions */}
                      <td style={{ padding: '6px 4px', verticalAlign: 'middle', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>
                        {isStudy ? '[ ]' : '—'}
                      </td>

                      <td style={{ padding: '6px 8px', verticalAlign: 'middle', fontWeight: 750, color: '#0F172A', fontFamily: 'monospace' }}>
                        {s.timeWindow}
                      </td>

                      <td style={{ padding: '6px 8px', verticalAlign: 'middle', fontWeight: 700, color: '#475569' }}>
                        <span style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '1px 5px', borderRadius: '4px' }}>
                          {s.duration}m
                        </span>
                      </td>

                      <td style={{ padding: '6px 8px', verticalAlign: 'middle', fontWeight: 700 }}>
                        {isBreak ? (
                          <span style={{ color: '#059669', background: '#ECFDF5', padding: '1px 6px', borderRadius: '4px', border: '1px solid #A7F3D0', fontSize: '9px' }}>
                            ☕ Break
                          </span>
                        ) : isFixed ? (
                          <span style={{ color: '#D97706', background: '#FEF3C7', padding: '1px 6px', borderRadius: '4px', border: '1px solid #FDE68A', fontSize: '9px' }}>
                            🏛️ Fixed
                          </span>
                        ) : s.type === 'practice' ? (
                          <span style={{ color: '#0D9488', background: '#F0FDFA', padding: '1px 6px', borderRadius: '4px', border: '1px solid #99F6E4', fontSize: '9px' }}>
                            📝 MCQ Drill
                          </span>
                        ) : s.type === 'revision' || s.type === 'recall' ? (
                          <span style={{ color: '#9333EA', background: '#FAF5FF', padding: '1px 6px', borderRadius: '4px', border: '1px solid #E9D5FF', fontSize: '9px' }}>
                            🧠 Recall
                          </span>
                        ) : s.type === 'mock_test' ? (
                          <span style={{ color: '#C026D3', background: '#FDF4FF', padding: '1px 6px', borderRadius: '4px', border: '1px solid #F5D0FE', fontSize: '9px' }}>
                            🎯 Mock
                          </span>
                        ) : (
                          <span style={{ color: '#4F46E5', background: '#EEF2FF', padding: '1px 6px', borderRadius: '4px', border: '1px solid #C7D2FE', fontSize: '9px' }}>
                            ⚡ Deep Work
                          </span>
                        )}
                      </td>

                      <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 750, color: isStudy ? '#0F172A' : '#475569' }}>
                          {s.title}
                        </div>
                        {s.note && (
                          <div style={{ fontSize: '9px', color: '#64748B', marginTop: '1px', lineHeight: 1.3 }}>
                            {s.note}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        roadmap && Array.isArray(roadmap.weeks) && (
          <section style={{ marginBottom: '14px' }}>
            {roadmap.weeks.map((w) => (
              <div
                key={w.weekNumber}
                className="routine-print-page-break-avoid"
                style={{
                  marginBottom: '14px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid',
                }}
              >
                {/* Week Header Banner */}
                <div style={{ background: '#F8FAFC', borderBottom: '1.5px solid #CBD5E1', padding: '7px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 800, background: '#5B5CF0', color: '#FFFFFF', padding: '2px 7px', borderRadius: '4px' }}>
                      WEEK {w.weekNumber}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 750, color: '#0F172A' }}>
                      {w.dateRange}
                    </span>
                    <span style={{ fontSize: '9.5px', color: '#64748B', background: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                      {w.phaseName}
                    </span>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 750, color: '#059669', background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px', border: '1px solid #A7F3D0' }}>
                    Target: {w.weeklyPYQ} PYQs
                  </div>
                </div>

                {/* Weekly Goal */}
                <div style={{ padding: '5px 10px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', fontSize: '10px', color: '#475569' }}>
                  <strong>Goal:</strong> {w.weeklyGoal}
                </div>

                {/* Days Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', textAlign: 'left', tableLayout: 'fixed' }}>
                  <thead>
                    <tr style={{ background: '#F1F5F9', borderBottom: '1px solid #CBD5E1' }}>
                      <th style={{ width: '105px', padding: '6px 8px', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Day &amp; Date</th>
                      <th style={{ width: '135px', padding: '6px 8px', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Subject</th>
                      <th style={{ padding: '6px 8px', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Chapter / Syllabus Target</th>
                      <th style={{ width: '85px', padding: '6px 8px', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Questions</th>
                      <th style={{ width: '40px', padding: '6px 4px', textAlign: 'center', fontSize: '9px', fontWeight: 750, color: '#475569', textTransform: 'uppercase' }}>Done</th>
                    </tr>
                  </thead>
                  <tbody>
                    {w.days.map((d) => {
                      const isMock = d.isSundayMock;
                      const isWed = d.isWednesdayRecall;

                      return (
                        <tr
                          key={d.id}
                          style={{
                            borderBottom: '1px solid #E2E8F0',
                            background: isMock ? '#FAF5FF' : isWed ? '#F0F9FF' : '#FFFFFF',
                            pageBreakInside: 'avoid',
                            breakInside: 'avoid',
                          }}
                        >
                          <td style={{ padding: '6px 8px', verticalAlign: 'top', fontWeight: 750, color: isMock ? '#9333EA' : '#0F172A' }}>
                            <div>{d.displayDay}</div>
                            {isMock && <span style={{ fontSize: '8px', fontWeight: 800, color: '#9333EA', background: '#F3E8FF', padding: '1px 4px', borderRadius: '3px' }}>FULL MOCK</span>}
                            {isWed && <span style={{ fontSize: '8px', fontWeight: 700, color: '#0284C7', background: '#E0F2FE', padding: '1px 4px', borderRadius: '3px' }}>RECALL</span>}
                          </td>
                          <td style={{ padding: '6px 8px', verticalAlign: 'top', color: isMock ? '#9333EA' : '#5B5CF0', fontWeight: 700 }}>
                            {d.subject}
                          </td>
                          <td style={{ padding: '6px 8px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 750, color: '#0F172A' }}>{d.chapter}</div>
                            <div style={{ fontSize: '9px', color: '#64748B', marginTop: '2px', lineHeight: 1.3 }}>
                              {isMock ? `${d.mockTestDetails.timing} • ${d.mockTestDetails.analysis}` : `${d.shifts.morning} | ${d.shifts.afternoon}`}
                            </div>
                          </td>
                          <td style={{ padding: '6px 8px', verticalAlign: 'top', fontWeight: 700, color: isMock ? '#9333EA' : '#059669' }}>
                            {d.targetQuestions}
                          </td>
                          <td style={{ padding: '6px 4px', verticalAlign: 'middle', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>
                            [ ]
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </section>
        )
      )}

      {/* ── 4. LIFETRACK PRO BRANDING & APP PROMOTION FOOTER ── */}
      <footer className="routine-print-footer-promo routine-print-page-break-avoid" style={{ marginTop: '16px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
        <div
          style={{
            backgroundColor: '#F8FAFC',
            border: '1.5px solid #CBD5E1',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxSizing: 'border-box',
          }}
        >
          {/* Left: Brand Values & Website */}
          <div style={{ flex: '1 1 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#5B5CF0' }} />
              <strong style={{ fontSize: '12.5px', color: '#172033', fontWeight: 800 }}>
                Stay consistent. One day at a time.
              </strong>
            </div>

            <p style={{ margin: '0 0 6px', fontSize: '10px', color: '#475569', lineHeight: 1.45, maxWidth: '520px' }}>
              Track your daily habits, complete focus sessions, manage your goals and monitor your progress with LifeTrack Pro.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '10px', color: '#64748B', flexWrap: 'wrap' }}>
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
                  width: '88px',
                  height: '88px',
                  display: 'block',
                  background: '#FFFFFF',
                  padding: '3px',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  margin: '0 auto',
                }}
              />
            </a>
            <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#5B5CF0', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
              SCAN TO EXPLORE LIFETRACK PRO
            </div>
            <div style={{ fontSize: '8.5px', color: '#64748B' }}>
              lifetrackpro.in
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
