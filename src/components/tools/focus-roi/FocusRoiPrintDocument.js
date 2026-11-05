'use client';
import React from 'react';
import { calculateWhatIfScenarios, generateRecommendations } from '@/lib/focusRoiEngine';

export default function FocusRoiPrintDocument({
  calcData,
  studentName = '',
  examName = '',
  isExportingPdf = false,
}) {
  if (!calcData) return null;

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const scenarios = calculateWhatIfScenarios(calcData);
  const recommendations = generateRecommendations(calcData);

  return (
    <div
      id="focus-roi-print-document"
      style={{
        display: 'none',
        background: '#FFFFFF',
        color: '#0F172A',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        lineHeight: 1.45,
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2.5px solid #5B5CF0', paddingBottom: '12px', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: '#5B5CF0', color: '#FFFFFF', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '15px' }}>
              Li
            </div>
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.4px' }}>
              LifeTrack <span style={{ color: '#5B5CF0' }}>Pro</span>
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontWeight: 650 }}>
            Study Efficiency &amp; Focus Time ROI Audit Report
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '10.5px', color: '#64748B' }}>
          <div style={{ fontWeight: 700, color: '#0F172A' }}>{dateStr}</div>
          <div>Mode: {calcData.mode === 'advanced' ? 'Advanced Granular Distraction Audit' : 'Quick Study Efficiency Check'}</div>
          <div>Official Android App: lifetrackpro.in</div>
        </div>
      </div>

      {/* ── STUDENT & TARGET METADATA ── */}
      <div style={{ background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '10px 14px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Student Aspirant:</span>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
            {studentName || 'Academic Aspirant'}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Target Goal / Exam:</span>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#5B5CF0' }}>
            {examName || 'Competitive Examination Target'}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Study Cadence:</span>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
            {calcData.planned.dailyHours}h/day • {calcData.inputs.studyDaysPerWeek} days/wk
          </div>
        </div>
      </div>

      {/* ── PRIMARY RESULT & EFFICIENCY SCORE ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px', marginBottom: '16px' }}>
        {/* Monthly Recoverable Card */}
        <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '10px', padding: '14px 16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 800, color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            POTENTIAL MONTHLY FOCUS TIME RECOVERED
          </div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#166534', fontFamily: 'monospace', lineHeight: 1.1, margin: '6px 0 2px' }}>
            +{calcData.recoverable.monthlyHours} Hours
          </div>
          <div style={{ fontSize: '11px', color: '#166534' }}>
            Equivalent to <strong>+{calcData.recoverable.extraPomodoroSessions} deep 50-minute Pomodoro blocks</strong> unlocked every single month.
          </div>
        </div>

        {/* Study Efficiency Card */}
        <div style={{ background: calcData.efficiency.bg, border: `1.5px solid ${calcData.efficiency.border}`, borderRadius: '10px', padding: '14px 16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 800, color: calcData.efficiency.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            ESTIMATED STUDY EFFICIENCY
          </div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: calcData.efficiency.color, fontFamily: 'monospace', lineHeight: 1.1, margin: '6px 0 2px' }}>
            {calcData.efficiency.percent}%
          </div>
          <div style={{ fontSize: '11px', color: calcData.efficiency.color, fontWeight: 700 }}>
            Rating: {calcData.efficiency.label}
          </div>
        </div>
      </div>

      {/* ── 3-METRIC COMPARISON PILL ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', textAlign: 'center', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '9.5px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Monthly Planned Study</span>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#0F172A', fontFamily: 'monospace' }}>
            {calcData.planned.monthlyHours}h
          </div>
        </div>
        <div style={{ borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '9.5px', color: '#EF4444', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Time Lost</span>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#EF4444', fontFamily: 'monospace' }}>
            -{calcData.loss.monthlyHours}h/mo
          </div>
        </div>
        <div>
          <span style={{ fontSize: '9.5px', color: '#16A34A', fontWeight: 700, textTransform: 'uppercase' }}>Potentially Recoverable</span>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#16A34A', fontFamily: 'monospace' }}>
            +{calcData.recoverable.monthlyHours}h/mo
          </div>
        </div>
      </div>

      {/* ── DETAILED NUMERICAL AUDIT TABLE ── */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', marginBottom: '6px', textTransform: 'uppercase' }}>
          1. Time Loss &amp; Attention Residue Breakdown
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F1F5F9', borderBottom: '1.5px solid #CBD5E1' }}>
              <th style={{ padding: '6px 8px', fontWeight: 750, color: '#334155' }}>Component</th>
              <th style={{ padding: '6px 8px', fontWeight: 750, color: '#334155' }}>Daily Measure</th>
              <th style={{ padding: '6px 8px', fontWeight: 750, color: '#334155' }}>Weekly Volume</th>
              <th style={{ padding: '6px 8px', fontWeight: 750, color: '#334155' }}>Monthly Total</th>
              <th style={{ padding: '6px 8px', fontWeight: 750, color: '#334155' }}>Scientific Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '6px 8px', fontWeight: 700, color: '#0F172A' }}>Direct Distraction</td>
              <td style={{ padding: '6px 8px', fontFamily: 'monospace', color: '#D97706', fontWeight: 700 }}>{calcData.loss.directMinutes} mins</td>
              <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{((calcData.loss.directMinutes * calcData.inputs.studyDaysPerWeek) / 60).toFixed(1)} hrs</td>
              <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{((calcData.loss.directMinutes * calcData.planned.monthlyStudyDays) / 60).toFixed(1)} hrs</td>
              <td style={{ padding: '6px 8px', color: '#64748B' }}>Time spent away from material (scrolling, messaging, calls)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#FAFAFC' }}>
              <td style={{ padding: '6px 8px', fontWeight: 700, color: '#0F172A' }}>Focus Recovery Lag</td>
              <td style={{ padding: '6px 8px', fontFamily: 'monospace', color: '#DC2626', fontWeight: 700 }}>{calcData.loss.refocusMinutes} mins</td>
              <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{((calcData.loss.refocusMinutes * calcData.inputs.studyDaysPerWeek) / 60).toFixed(1)} hrs</td>
              <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{((calcData.loss.refocusMinutes * calcData.planned.monthlyStudyDays) / 60).toFixed(1)} hrs</td>
              <td style={{ padding: '6px 8px', color: '#64748B' }}>Cognitive resumption lag required to re-enter flow state</td>
            </tr>
            <tr style={{ borderBottom: '1.5px solid #CBD5E1', fontWeight: 800 }}>
              <td style={{ padding: '6px 8px', color: '#0F172A' }}>Total Estimated Loss</td>
              <td style={{ padding: '6px 8px', fontFamily: 'monospace', color: '#DC2626' }}>{calcData.loss.dailyMinutes} mins</td>
              <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{calcData.loss.weeklyHours} hrs</td>
              <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{calcData.loss.monthlyHours} hrs</td>
              <td style={{ padding: '6px 8px', color: '#0F172A' }}>Combined cognitive overhead deducted from planned study</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── WHAT-IF SCENARIOS TABLE ── */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', marginBottom: '6px', textTransform: 'uppercase' }}>
          2. What-If Interruption Reduction Milestones
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F1F5F9', borderBottom: '1.5px solid #CBD5E1' }}>
              <th style={{ padding: '5px 8px', fontWeight: 750, color: '#334155' }}>Milestone Target</th>
              <th style={{ padding: '5px 8px', fontWeight: 750, color: '#334155' }}>Daily Recovered</th>
              <th style={{ padding: '5px 8px', fontWeight: 750, color: '#334155' }}>Weekly Recovered</th>
              <th style={{ padding: '5px 8px', fontWeight: 750, color: '#334155' }}>Monthly Recovered</th>
              <th style={{ padding: '5px 8px', fontWeight: 750, color: '#334155' }}>Extra 50m Sessions</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((sc, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', background: i % 2 === 1 ? '#FAFAFC' : '#FFFFFF' }}>
                <td style={{ padding: '5px 8px', fontWeight: 700, color: '#0F172A' }}>{sc.label}</td>
                <td style={{ padding: '5px 8px', fontFamily: 'monospace', color: '#16A34A', fontWeight: 700 }}>+{sc.dailyHours}h/day</td>
                <td style={{ padding: '5px 8px', fontFamily: 'monospace' }}>+{sc.weeklyHours} hrs</td>
                <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontWeight: 800, color: '#15803D' }}>+{sc.monthlyHours} hrs/mo</td>
                <td style={{ padding: '5px 8px', color: '#4F46E5', fontWeight: 700 }}>+{sc.extraSessions} Pomodoros</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── PERSONALIZED RECOMMENDATIONS ── */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', marginBottom: '6px', textTransform: 'uppercase' }}>
          3. Personalized Focus Recommendations
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {recommendations.map((rec) => (
            <div key={rec.id} style={{ padding: '8px 10px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                {rec.icon} {rec.title}
              </div>
              <p style={{ fontSize: '10px', color: '#475569', margin: '0 0 4px', lineHeight: 1.4 }}>
                {rec.description}
              </p>
              <div style={{ fontSize: '9.5px', fontWeight: 750, color: '#5B5CF0' }}>
                ➔ Action: {rec.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER & DISCLAIMER ── */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px', fontSize: '9.5px', color: '#64748B', lineHeight: 1.45 }}>
        <div>
          * <strong>Methodology &amp; Scientific Reference:</strong> Calculations incorporate cognitive psychology models of attention residue (Gloria Mark, UC Irvine) and task resumption friction. All figures are mathematical projections based on user-supplied assumptions and do not constitute guaranteed academic improvements.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span>LifeTrack Pro Academic Productivity Suite • lifetrackpro.in</span>
          <span>Download on Google Play Store</span>
        </div>
      </div>
    </div>
  );
}
