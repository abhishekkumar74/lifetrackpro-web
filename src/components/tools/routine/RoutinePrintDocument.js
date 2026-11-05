'use client';
import { 
  STUDENT_PERSONAS, 
  CATEGORY_STYLES, 
  timeStringToMinutes, 
  calculateBedtimeMinutes, 
  minutesTo12Hour 
} from '@/lib/routineEngine';
import { BRAND_LOGO_BASE64 } from '@/lib/brandLogoBase64';
import { 
  OFFICIAL_PLAY_STORE_URL, 
  OFFICIAL_WEBSITE_URL, 
  PLAY_STORE_QR_DATA_URL 
} from '@/lib/qrCodeHelper';

/**
 * RoutinePrintDocument
 * 
 * Dedicated, professional A4 print and PDF export template.
 * Renders ONLY the user's generated routine, summary metrics,
 * personalized header, and subtle LifeTrack Pro branding + QR code.
 * 
 * Styled specifically for high-contrast B&W and color A4 printing,
 * with standard font stacks, zero broken emojis, and slice-based autoPaging.
 */
export default function RoutinePrintDocument({
  activities = [],
  profile = {},
  balanceData = {},
  isExportingPdf = false,
}) {
  const persona = STUDENT_PERSONAS[profile.personaKey] || STUDENT_PERSONAS.school;
  const wakeMin = timeStringToMinutes(profile.wakeTime || '06:00');
  const bedtimeMin = calculateBedtimeMinutes(profile.wakeTime || '06:00', profile.sleepHours || 7.5);
  
  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="routine-print-document"
      className={`routine-print-document ${isExportingPdf ? 'rendering-pdf' : ''}`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        background: '#FFFFFF',
        color: '#172033',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* ── 1. DOCUMENT HEADER ── */}
      <header className="routine-print-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #5B5CF0', paddingBottom: '10px', marginBottom: '12px', gap: '14px' }}>
          {/* Brand & Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={BRAND_LOGO_BASE64}
              alt="LifeTrack Pro Logo"
              style={{ width: '34px', height: '34px', borderRadius: '8px', objectFit: 'contain' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#172033', lineHeight: 1 }}>
                  LifeTrack <span style={{ color: '#5B5CF0' }}>Pro</span>
                </span>
                <span style={{ fontSize: '9px', fontWeight: 750, background: 'rgba(91, 92, 240, 0.1)', color: '#5B5CF0', padding: '2px 7px', borderRadius: '100px' }}>
                  STUDENT LIFE OS
                </span>
              </div>
              <p style={{ margin: '3px 0 0', fontSize: '10.5px', color: '#64748B', fontWeight: 500 }}>
                24-Hour Circadian Study Schedule &amp; Habit Blueprint
              </p>
            </div>
          </div>

          {/* Date & Verification Badge */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#172033', whiteSpace: 'nowrap' }}>
              {currentDateFormatted}
            </div>
            <div
              style={{
                display: 'inline-block',
                marginTop: '3px',
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
              100% Conflict-Free Schedule
            </div>
          </div>
        </div>

        {/* Main Document Title & Unified Metadata Ribbon */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 850, color: '#172033', margin: 0, letterSpacing: '-0.3px' }}>
              My Daily Study Routine
            </h1>
            <div style={{ fontSize: '10.5px', color: '#64748B' }}>
              📌 <strong>Study Desk Instructions:</strong> Pin on wall. Follow daily.
            </div>
          </div>

          {/* Unified Full-Width Profile & Sleep Ribbon (100% Balanced, Single Line) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 14px',
              background: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '11px',
              color: '#475569',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0, overflow: 'hidden' }}>
              {profile.studentName && (
                <span style={{ whiteSpace: 'nowrap' }}>
                  Student: <strong style={{ color: '#172033' }}>{profile.studentName}</strong>
                </span>
              )}
              <span style={{ whiteSpace: 'nowrap' }}>
                Category: <strong style={{ color: '#5B5CF0' }}>{persona.name}</strong>
              </span>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Target Goal: <strong style={{ color: '#172033' }}>{profile.targetGoal || persona.tagline}</strong>
              </span>
            </div>

            <div style={{ fontWeight: 650, color: '#334155', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>
              <span>Wake: <strong style={{ color: '#172033' }}>{minutesTo12Hour(wakeMin)}</strong></span>
              <span style={{ margin: '0 8px', color: '#CBD5E1' }}>|</span>
              <span>Sleep: <strong style={{ color: '#172033' }}>{minutesTo12Hour(bedtimeMin)}</strong> ({profile.sleepHours}h)</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. DAILY SUMMARY METRICS (A4 PRINT FRIENDLY) ── */}
      <section className="routine-print-summary routine-print-page-break-avoid" aria-label="Daily Routine Summary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {/* Target */}
          <div style={{ padding: '8px 10px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 750, color: '#64748B' }}>
              TARGET FOCUS
            </div>
            <div style={{ fontSize: '18px', fontWeight: 850, color: '#172033', fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace', margin: '2px 0 1px' }}>
              {profile.studyTargetHours || 6}<span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginLeft: '2px' }}>h</span>
            </div>
            <div style={{ fontSize: '9.5px', color: '#64748B' }}>Daily Goal</div>
          </div>

          {/* Scheduled Study */}
          <div style={{ padding: '8px 10px', background: '#F5F5FF', borderRadius: '8px', border: '1.5px solid #C7D2FE', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 750, color: '#5B5CF0' }}>
              SCHEDULED STUDY
            </div>
            <div style={{ fontSize: '18px', fontWeight: 850, color: '#172033', fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace', margin: '2px 0 1px' }}>
              {balanceData.scheduledStudyHours || 0}<span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginLeft: '2px' }}>h</span>
            </div>
            <div style={{ fontSize: '9.5px', color: '#5B5CF0', fontWeight: 750 }}>
              {balanceData.studyCount || 0} Deep Sprints
            </div>
          </div>

          {/* Sleep */}
          <div style={{ padding: '8px 10px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 750, color: '#334155' }}>
              SLEEP RECOVERY
            </div>
            <div style={{ fontSize: '18px', fontWeight: 850, color: '#172033', fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace', margin: '2px 0 1px' }}>
              {balanceData.scheduledSleepHours || profile.sleepHours}<span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginLeft: '2px' }}>h</span>
            </div>
            <div style={{ fontSize: '9.5px', color: '#64748B' }}>Restorative Sleep</div>
          </div>

          {/* Fixed Commitments */}
          <div style={{ padding: '8px 10px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 750, color: '#D97706' }}>
              FIXED ROUTINE
            </div>
            <div style={{ fontSize: '18px', fontWeight: 850, color: '#172033', fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace', margin: '2px 0 1px' }}>
              {balanceData.scheduledFixedHours || 0}<span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginLeft: '2px' }}>h</span>
            </div>
            <div style={{ fontSize: '9.5px', color: '#64748B' }}>Classes &amp; Meals</div>
          </div>

          {/* Breaks */}
          <div style={{ padding: '8px 10px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 750, color: '#0D9488' }}>
              RECOVERY BREAKS
            </div>
            <div style={{ fontSize: '18px', fontWeight: 850, color: '#172033', fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace', margin: '2px 0 1px' }}>
              {balanceData.scheduledBreakHours || 0}<span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginLeft: '2px' }}>h</span>
            </div>
            <div style={{ fontSize: '9.5px', color: '#64748B' }}>Buffers &amp; Rest</div>
          </div>
        </div>

        {/* Mobile App Companion Link Banner */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 12px',
            background: '#F8FAFC',
            borderRadius: '7px',
            border: '1px solid #E2E8F0',
            marginBottom: '10px',
            fontSize: '11px',
            color: '#475569',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px' }}>📱</span>
            <span>Want to follow this routine on mobile?</span>
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
            }}
          >
            Explore LifeTrack Pro on Play Store ↗
          </a>
        </div>
      </section>

      {/* ── 3. DAILY SCHEDULE TABLE ── */}
      <section className="routine-print-schedule" aria-label="Daily Schedule Timeline">
        <table className="routine-print-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', textAlign: 'left', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: '#F1F5F9', borderBottom: '2px solid #CBD5E1', borderTop: '1px solid #E2E8F0' }}>
              <th style={{ width: '38px', padding: '9px 6px', textAlign: 'center', fontSize: '10px', fontWeight: 750, color: '#475569' }}>
                DONE
              </th>
              <th style={{ width: '145px', padding: '9px 10px', fontSize: '10px', fontWeight: 750, color: '#475569' }}>
                TIME WINDOW
              </th>
              <th style={{ width: '65px', padding: '9px 8px', fontSize: '10px', fontWeight: 750, color: '#475569' }}>
                DURATION
              </th>
              <th style={{ width: '115px', padding: '9px 10px', fontSize: '10px', fontWeight: 750, color: '#475569' }}>
                CATEGORY
              </th>
              <th style={{ padding: '9px 10px', fontSize: '10px', fontWeight: 750, color: '#475569' }}>
                SCHEDULED ACTIVITY &amp; DESCRIPTION
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#64748B', fontStyle: 'italic' }}>
                  No activities scheduled. Please configure your profile and click Generate.
                </td>
              </tr>
            ) : (
              activities.map((act, idx) => {
                const styleMeta = CATEGORY_STYLES[act.category] || CATEGORY_STYLES.break;
                const isStudyBlock = ['deep_work', 'practice', 'recall'].includes(act.category) || act.type === 'study' || (act.title && act.title.toLowerCase().includes('study'));

                return (
                  <tr
                    key={act.id || idx}
                    className="routine-print-row"
                    style={{
                      borderBottom: '1px solid #E8ECF2',
                      background: isStudyBlock ? (idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA') : '#F8FAFC',
                      pageBreakInside: 'avoid',
                      breakInside: 'avoid',
                    }}
                  >
                    {/* Checkbox Column — ONLY for Study Sessions */}
                    <td style={{ padding: '7px 4px', textAlign: 'center', verticalAlign: 'middle' }}>
                      {isStudyBlock ? (
                        <div
                          style={{
                            width: '13px',
                            height: '13px',
                            border: '1.5px solid #5B5CF0',
                            borderRadius: '3px',
                            margin: '0 auto',
                            background: '#FFFFFF',
                          }}
                        />
                      ) : (
                        <span style={{ color: '#CBD5E1', fontSize: '11px', fontWeight: 600 }}>—</span>
                      )}
                    </td>

                    {/* Time Window Column */}
                    <td style={{ padding: '7px 10px', fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace', fontWeight: 700, fontSize: '11px', color: '#172033', whiteSpace: 'nowrap' }}>
                      {act.timeWindow || `${act.startTime} – ${act.endTime}`}
                    </td>

                    {/* Duration Column */}
                    <td style={{ padding: '7px 8px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: isStudyBlock ? '#EEF2FF' : '#F1F5F9',
                          color: isStudyBlock ? '#4F46E5' : '#475569',
                          border: isStudyBlock ? '1px solid #C7D2FE' : '1px solid #E2E8F0',
                        }}
                      >
                        {act.duration}m
                      </span>
                    </td>

                    {/* Category Badge Column (Clean CSS dot + label, ZERO emojis) */}
                    <td style={{ padding: '7px 10px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          color: styleMeta.color,
                        }}
                      >
                        <span
                          style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            backgroundColor: styleMeta.accent || styleMeta.color,
                            display: 'inline-block',
                            flexShrink: 0,
                          }}
                        />
                        <span>{styleMeta.label ? styleMeta.label.split(' ')[0] : 'Activity'}</span>
                      </span>
                    </td>

                    {/* Activity Title & Notes Column */}
                    <td style={{ padding: '7px 10px', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: isStudyBlock ? 750 : 600, color: isStudyBlock ? '#172033' : '#475569', fontSize: '11.5px', lineHeight: 1.35 }}>
                        {act.title}
                      </div>
                      {isStudyBlock && act.note && (
                        <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', lineHeight: 1.4 }}>
                          {act.note}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

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
