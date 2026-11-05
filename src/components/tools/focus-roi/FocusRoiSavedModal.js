'use client';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lifetrack_saved_focus_roi_scenarios';

export default function FocusRoiSavedModal({ isOpen, onClose, onLoadScenario, currentCalcData }) {
  const [savedList, setSavedList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          setSavedList(JSON.parse(raw));
        } else {
          setSavedList([]);
        }
      } catch (e) {
        console.warn('Failed to load saved scenarios from localStorage', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id, e) => {
    e.stopPropagation();
    try {
      const updated = savedList.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSavedList(updated);
    } catch (err) {
      console.warn('Failed to delete scenario', err);
    }
  };

  const handleSelect = (item) => {
    if (onLoadScenario) {
      onLoadScenario(item);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#F8FAFC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>📁</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                Saved Focus ROI Calculations
              </h3>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>
                Locally saved distraction audit scenarios
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              color: '#64748B',
              cursor: 'pointer',
              padding: '4px',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
          {savedList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 12px', color: '#64748B' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📑</div>
              <p style={{ margin: '0 0 6px', fontSize: '13.5px', fontWeight: 700, color: '#1E293B' }}>
                No saved scenarios found
              </p>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Adjust your inputs on the calculator and click <strong>&ldquo;Save Scenario&rdquo;</strong> to store your calculation history.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {savedList.map((sc) => {
                const dateStr = sc.savedAt
                  ? new Date(sc.savedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Recent';

                return (
                  <div
                    key={sc.id}
                    onClick={() => handleSelect(sc)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #E2E8F0',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                          {sc.name || 'Untitled Scenario'}
                        </span>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 750,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            background: sc.mode === 'advanced' ? '#EEF2FF' : '#F1F5F9',
                            color: sc.mode === 'advanced' ? '#4F46E5' : '#475569',
                          }}
                        >
                          {sc.mode === 'advanced' ? 'Advanced' : 'Quick'}
                        </span>
                      </div>

                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        {dateStr} • {sc.examName || 'Exam Prep'}
                      </div>

                      <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#10B981', marginTop: '4px' }}>
                        +{sc.data?.recoverable?.monthlyHours || 0} hrs/mo recoverable ({sc.data?.efficiency?.percent || 0}% efficiency)
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(sc.id, e)}
                        title="Delete scenario"
                        style={{
                          background: '#FEF2F2',
                          border: '1px solid #FECACA',
                          borderRadius: '6px',
                          color: '#DC2626',
                          padding: '6px 8px',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid #E2E8F0',
            background: '#F8FAFC',
            textAlign: 'right',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '7px 16px',
              fontSize: '12.5px',
              fontWeight: 700,
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#334155',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
