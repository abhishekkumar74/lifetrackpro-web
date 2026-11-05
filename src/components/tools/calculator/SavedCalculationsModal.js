'use client';
import { useState, useEffect } from 'react';

/**
 * SavedCalculationsModal
 * 
 * Manages user's saved study hours calculation scenarios in localStorage.
 * Allows instant load, rename, delete, and scenario switching.
 */
export default function SavedCalculationsModal({
  isOpen = false,
  onClose,
  onLoadScenario,
  currentCalcData = null,
}) {
  const [savedList, setSavedList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const STORAGE_KEY = 'lifetrack_saved_study_hours_scenarios';

  const loadFromStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedList(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load saved study hour scenarios', e);
    }
    setSavedList([]);
  };

  useEffect(() => {
    if (isOpen) {
      loadFromStorage();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id) => {
    const updated = savedList.filter((item) => item.id !== id);
    setSavedList(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Error saving scenarios to localStorage', e);
    }
  };

  const handleStartRename = (item) => {
    setEditingId(item.id);
    setEditName(item.name || 'Untitled Scenario');
  };

  const handleSaveRename = (id) => {
    const updated = savedList.map((item) => {
      if (item.id === id) {
        return { ...item, name: editName.trim() || item.name };
      }
      return item;
    });
    setSavedList(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Error saving renamed scenario', e);
    }
    setEditingId(null);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px -8px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#F8FAFC',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#172033' }}>
              📁 Saved Calculation Scenarios
            </h3>
            <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: '#64748B' }}>
              Compare different target exams, daily paces and preparation horizons
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '8px',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#64748B',
            }}
          >
            ✕
          </button>
        </div>

        {/* Scenarios List */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
          {savedList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748B' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>📊</div>
              <strong style={{ fontSize: '14px', color: '#172033' }}>No Saved Scenarios Yet</strong>
              <p style={{ fontSize: '12px', margin: '6px auto 0', maxWidth: '340px' }}>
                Use the <strong>&quot;Save Scenario&quot;</strong> button in the calculator toolbar to store different exam targets and pace simulations.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {savedList.map((item) => {
                const isEditing = editingId === item.id;
                const calc = item.data;

                return (
                  <div
                    key={item.id}
                    style={{
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      background: '#FFFFFF',
                      transition: 'border-color 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {isEditing ? (
                          <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              autoFocus
                              style={{
                                flex: 1,
                                padding: '4px 8px',
                                fontSize: '13px',
                                borderRadius: '6px',
                                border: '1.5px solid #5B5CF0',
                                outline: 'none',
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveRename(item.id)}
                              style={{
                                padding: '4px 10px',
                                fontSize: '11.5px',
                                fontWeight: 700,
                                background: '#5B5CF0',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                              }}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              style={{
                                padding: '4px 8px',
                                fontSize: '11.5px',
                                background: '#F1F5F9',
                                color: '#64748B',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <strong style={{ fontSize: '13.5px', color: '#172033' }}>
                              {item.name}
                            </strong>
                            <span
                              style={{
                                fontSize: '9.5px',
                                fontWeight: 750,
                                padding: '1px 6px',
                                borderRadius: '4px',
                                background: calc?.feasibility?.bg || '#F0FDF4',
                                color: calc?.feasibility?.color || '#15803D',
                                border: `1px solid ${calc?.feasibility?.border || '#86EFAC'}`,
                              }}
                            >
                              {calc?.feasibility?.label || 'Feasible'}
                            </span>
                          </div>
                        )}

                        <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          <span>Exam: <strong>{calc?.inputs?.examDate || 'Custom'}</strong></span>
                          <span>•</span>
                          <span>Required: <strong style={{ color: '#5B5CF0' }}>{calc?.requiredDailyHours} hrs/day</strong></span>
                          <span>•</span>
                          <span>Workload: <strong>{calc?.breakdown?.totalWorkloadHours} hrs</strong></span>
                          <span>•</span>
                          <span>Days: <strong>{calc?.timeline?.availableStudyDays} d</strong></span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof onLoadScenario === 'function') {
                              onLoadScenario(item.data);
                              onClose();
                            }
                          }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '11.5px',
                            fontWeight: 750,
                            background: '#5B5CF0',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStartRename(item)}
                          title="Rename scenario"
                          style={{
                            padding: '6px 8px',
                            fontSize: '11.5px',
                            background: '#F1F5F9',
                            color: '#475569',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Delete scenario"
                          style={{
                            padding: '6px 8px',
                            fontSize: '11.5px',
                            background: '#FEF2F2',
                            color: '#DC2626',
                            border: '1px solid #FECACA',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid #E2E8F0',
            background: '#F8FAFC',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11.5px',
            color: '#64748B',
          }}
        >
          <span>Stored privately in your local browser cache</span>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 650,
              background: '#FFFFFF',
              color: '#172033',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
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
