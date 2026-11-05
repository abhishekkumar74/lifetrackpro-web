'use client';
import { useState } from 'react';

/**
 * CalculatorCharts.js
 * 
 * High-performance, zero-dependency SVG visualization components:
 * 1. WorkloadBreakdownChart — Modern donut breakdown of learning, practice, revision, mocks, buffer
 * 2. CapacityComparisonBar — Modern Linear/Stripe style capacity vs workload meter
 * 3. SubjectDistributionBars — Subject-by-subject percentage ranking
 * 4. WhatIfScenarioTimeline — Horizontal pace horizon comparison
 */

export function WorkloadBreakdownChart({ breakdown = {} }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const {
    learningHours = 0,
    practiceHours = 0,
    revisionHours = 0,
    mockHours = 0,
    bufferHours = 0,
    totalWorkloadHours = 0,
  } = breakdown;

  const segments = [
    { label: 'Initial Learning', hours: learningHours, color: '#4F46E5', desc: 'First-time concepts & notes' },
    { label: 'Revision & Recall', hours: revisionHours, color: '#8B5CF6', desc: 'Forgetting curve review cycles' },
    { label: 'Practice & PYQs', hours: practiceHours, color: '#0EA5E9', desc: 'Problem sets & past questions' },
    { label: 'Mock Tests & Analysis', hours: mockHours, color: '#F59E0B', desc: 'Full exam simulations & review' },
    { label: 'Contingency Buffer', hours: bufferHours, color: '#64748B', desc: '10% safety buffer for delays' },
  ].filter((s) => s.hours > 0);

  const total = totalWorkloadHours || segments.reduce((acc, s) => acc + s.hours, 0) || 1;

  // Donut geometry
  const size = 170;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '22px', flexWrap: 'wrap' }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
            />
            {segments.map((seg, idx) => {
              const percent = seg.hours / total;
              const strokeDasharray = `${percent * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedPercent * circumference;
              accumulatedPercent += percent;

              const isHovered = hoveredIdx === idx;

              return (
                <circle
                  key={seg.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>

          {/* Centered Total Stat */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono, monospace)', lineHeight: 1 }}>
              {hoveredIdx !== null ? `${segments[hoveredIdx].hours}h` : `${total}h`}
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 650, marginTop: '3px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              {hoveredIdx !== null ? segments[hoveredIdx].label : 'Total Workload'}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '180px' }}>
          {segments.map((seg, idx) => {
            const pct = ((seg.hours / total) * 100).toFixed(1);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={seg.label}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '5px 8px',
                  borderRadius: '6px',
                  background: isHovered ? '#F8FAFC' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: seg.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: isHovered ? 700 : 550, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {seg.label}
                  </span>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '8px', fontVariantNumeric: 'tabular-nums' }}>
                  <strong style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                    {seg.hours}h
                  </strong>
                  <span style={{ fontSize: '10.5px', color: '#94A3B8', marginLeft: '4px' }}>
                    ({pct}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * CapacityComparisonBar
 * 
 * Sleek linear capacity vs workload meter with clear deficit/surplus indicator
 */
export function CapacityComparisonBar({
  requiredTotalHours = 0,
  availableTotalHours = 0,
  feasibility = {},
  requiredDaily = 0,
  availableDaily = 6,
}) {
  const isSurplus = feasibility.isSurplus;
  const diffHours = Math.abs(availableTotalHours - requiredTotalHours).toFixed(1);
  const fillRatio = requiredTotalHours > 0 ? Math.min(100, Math.round((availableTotalHours / requiredTotalHours) * 100)) : 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top summary row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Capacity Coverage Ratio
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
            <span>{availableTotalHours}h available</span>
            <span style={{ color: '#94A3B8', margin: '0 6px' }}>/</span>
            <span style={{ color: '#64748B' }}>{requiredTotalHours}h required</span>
          </div>
        </div>

        {/* Delta Chip */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 9px',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: 700,
            background: isSurplus ? '#ECFDF5' : '#FFF1F2',
            color: isSurplus ? '#059669' : '#E11D48',
            border: `1px solid ${isSurplus ? '#A7F3D0' : '#FECDD3'}`,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isSurplus ? '#10B981' : '#F43F5E' }} />
          <span>{isSurplus ? `+${diffHours}h surplus (${fillRatio}%)` : `-${diffHours}h deficit (${fillRatio}%)`}</span>
        </div>
      </div>

      {/* Progress track */}
      <div style={{ position: 'relative', width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${Math.min(100, fillRatio)}%`,
            height: '100%',
            background: isSurplus ? 'linear-gradient(90deg, #10B981, #059669)' : 'linear-gradient(90deg, #F43F5E, #E11D48)',
            borderRadius: '100px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* Contextual description */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
        <span>Available pace: <strong>{availableDaily}h/d</strong></span>
        <span>Required pace: <strong style={{ color: isSurplus ? '#059669' : '#E11D48' }}>{requiredDaily}h/d</strong></span>
      </div>
    </div>
  );
}

/**
 * SubjectDistributionBars
 * 
 * Renders subject-by-subject percentage of total workload
 */
export function SubjectDistributionBars({ subjects = [] }) {
  if (!subjects || subjects.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {subjects.map((s) => {
        const priorityColors = {
          high: { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' },
          medium: { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
          low: { bg: '#F1F5F9', text: '#64748B', border: '#E2E8F0' },
        };
        const pStyle = priorityColors[s.priority] || priorityColors.medium;

        return (
          <div key={s.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 750,
                    padding: '1px 5px',
                    borderRadius: '4px',
                    background: pStyle.bg,
                    color: pStyle.text,
                    border: `1px solid ${pStyle.border}`,
                    textTransform: 'uppercase',
                  }}
                >
                  {s.priority}
                </span>
                <span style={{ fontWeight: 650, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {s.name}
                </span>
              </div>
              <div style={{ flexShrink: 0, marginLeft: '8px', fontVariantNumeric: 'tabular-nums' }}>
                <strong style={{ color: '#0F172A' }}>{s.totalHours}h</strong>
                <span style={{ color: '#94A3B8', fontSize: '10.5px', marginLeft: '3px' }}>({s.percentageOfTotal}%)</span>
              </div>
            </div>

            <div style={{ width: '100%', height: '6px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${Math.min(100, s.percentageOfTotal)}%`,
                  height: '100%',
                  background: '#5B5CF0',
                  borderRadius: '100px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * WhatIfScenarioTimeline
 * 
 * Visual comparison of completion dates across daily study hours
 */
export function WhatIfScenarioTimeline({ scenarios = [], activePace = 6 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', width: '100%', boxSizing: 'border-box' }}>
      {scenarios.map((sc) => {
        const isActive = sc.dailyHours === activePace;

        return (
          <div
            key={sc.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: '8px',
              border: isActive ? '1.5px solid #5B5CF0' : '1px solid #E2E8F0',
              background: isActive ? '#F5F5FF' : '#FFFFFF',
              transition: 'all 0.15s ease',
              flexWrap: 'wrap',
              gap: '8px',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: '1 1 auto' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 750,
                  padding: '2px 7px',
                  borderRadius: '5px',
                  background: isActive ? '#5B5CF0' : '#F1F5F9',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontFamily: 'var(--font-mono, monospace)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {sc.dailyHours}h/d
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 650, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {sc.label}
                </div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>
                  {sc.studyDaysNeeded} study days needed
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 'auto' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
                Finishes: {sc.completionDate}
              </div>
              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  color: sc.statusColor,
                  background: sc.statusBg,
                  padding: '1px 6px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginTop: '1px',
                  whiteSpace: 'nowrap',
                }}
              >
                {sc.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
