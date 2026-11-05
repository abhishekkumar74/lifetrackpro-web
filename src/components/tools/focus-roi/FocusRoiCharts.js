'use client';
import React from 'react';

/**
 * FocusTimeAllocationChart
 * 
 * Visualizes the breakdown of Planned Daily Study into:
 * - Net Productive Focus Time (Teal/Indigo)
 * - Direct Distraction Minutes (Amber/Rose)
 * - Cognitive Refocus Lag / Attention Residue (Purple/Indigo)
 */
export function FocusTimeAllocationChart({ plannedMins = 360, loss = {}, efficiency = {} }) {
  const directMins = loss.directMinutes || 0;
  const refocusMins = loss.refocusMinutes || 0;
  const netMins = Math.max(0, plannedMins - (directMins + refocusMins));

  const total = plannedMins || 1;
  const netPct = Math.round((netMins / total) * 100);
  const directPct = Math.round((directMins / total) * 100);
  const refocusPct = Math.max(0, 100 - (netPct + directPct));

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Multi-segment stacked bar */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '5px' }}>
          <span>Daily Planned Study Allocation:</span>
          <span style={{ color: '#0F172A', fontFamily: 'monospace' }}>{(plannedMins / 60).toFixed(1)} hrs (100%)</span>
        </div>

        <div
          style={{
            height: '14px',
            borderRadius: '100px',
            background: '#F1F5F9',
            overflow: 'hidden',
            display: 'flex',
            width: '100%',
          }}
        >
          {netPct > 0 && (
            <div
              style={{
                width: `${netPct}%`,
                background: '#10B981',
                height: '100%',
                transition: 'width 0.3s ease',
              }}
              title={`Net Focus: ${netPct}% (${(netMins / 60).toFixed(1)}h)`}
            />
          )}
          {directPct > 0 && (
            <div
              style={{
                width: `${directPct}%`,
                background: '#F59E0B',
                height: '100%',
                transition: 'width 0.3s ease',
              }}
              title={`Direct Distraction: ${directPct}% (${directMins}m)`}
            />
          )}
          {refocusPct > 0 && (
            <div
              style={{
                width: `${refocusPct}%`,
                background: '#EF4444',
                height: '100%',
                transition: 'width 0.3s ease',
              }}
              title={`Refocus Lag: ${refocusPct}% (${refocusMins}m)`}
            />
          )}
        </div>
      </div>

      {/* Legend Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px',
          padding: '10px 12px',
          background: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          fontSize: '11px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
          <div>
            <span style={{ color: '#64748B', display: 'block' }}>Net Productive Focus:</span>
            <strong style={{ color: '#0F172A', fontFamily: 'monospace' }}>
              {(netMins / 60).toFixed(1)}h ({netPct}%)
            </strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }} />
          <div>
            <span style={{ color: '#64748B', display: 'block' }}>Direct Distraction:</span>
            <strong style={{ color: '#D97706', fontFamily: 'monospace' }}>
              {directMins}m ({directPct}%)
            </strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', flexShrink: 0 }} />
          <div>
            <span style={{ color: '#64748B', display: 'block' }}>Cognitive Refocus Lag:</span>
            <strong style={{ color: '#DC2626', fontFamily: 'monospace' }}>
              {refocusMins}m ({refocusPct}%)
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * DistractionCategoryBars
 * 
 * Displays individual category percentages
 */
export function DistractionCategoryBars({ categories = [] }) {
  const activeCategories = categories.filter((c) => c.enabled && c.totalMinutes > 0);

  if (activeCategories.length === 0) {
    return (
      <div style={{ padding: '12px', textAlign: 'center', color: '#64748B', fontSize: '12px' }}>
        No active distraction categories enabled.
      </div>
    );
  }

  const maxMinutes = Math.max(...activeCategories.map((c) => c.totalMinutes), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
      {activeCategories.map((cat) => {
        const barPct = Math.min(100, Math.round((cat.totalMinutes / maxMinutes) * 100));

        return (
          <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                <span style={{ fontSize: '13px' }}>{cat.icon}</span>
                <span style={{ fontWeight: 700, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {cat.name}
                </span>
              </div>
              <div style={{ flexShrink: 0, marginLeft: '8px', fontSize: '11px', color: '#64748B' }}>
                <strong style={{ color: '#0F172A', fontFamily: 'monospace' }}>{cat.totalMinutes}m/day</strong> ({cat.percentOfTotalLoss}%)
              </div>
            </div>

            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${barPct}%`,
                  height: '100%',
                  background: '#5B5CF0',
                  borderRadius: '100px',
                  transition: 'width 0.3s ease',
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
 * WhatIfScenarioGrid
 * 
 * Visual comparison of potential time recovered across interruption reduction milestones
 */
export function WhatIfScenarioGrid({ scenarios = [], activeCustom = 40, onCustomChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
      {scenarios.map((sc, idx) => {
        return (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '10px',
              border: sc.isCustom ? '1.5px solid #5B5CF0' : '1px solid #E2E8F0',
              background: sc.isCustom ? '#F5F5FF' : '#FFFFFF',
              boxSizing: 'border-box',
              width: '100%',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: '1 1 auto' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 7px',
                  borderRadius: '6px',
                  background: sc.isCustom ? '#5B5CF0' : '#EEF2FF',
                  color: sc.isCustom ? '#FFFFFF' : '#4F46E5',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                -{sc.percent}%
              </span>

              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 750, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {sc.label}
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748B' }}>
                  {sc.subtitle}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 'auto' }}>
              <div style={{ fontSize: '13px', fontWeight: 850, color: '#10B981', fontFamily: 'monospace' }}>
                +{sc.monthlyHours}h / month
              </div>
              <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
                +{sc.extraSessions} deep Pomodoro blocks
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
