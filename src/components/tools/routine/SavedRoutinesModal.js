'use client';
import { useState } from 'react';

/**
 * SavedRoutinesModal — Manages persistent daily routines in localStorage
 */
export default function SavedRoutinesModal({
  isOpen,
  onClose,
  savedRoutines = [],
  onLoad,
  onDelete,
  onRename,
  onDuplicate,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  if (!isOpen) return null;

  const startRename = (r) => {
    setEditingId(r.id);
    setEditName(r.name);
  };

  const saveRename = (id) => {
    if (editName.trim()) {
      onRename(id, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
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
          maxWidth: '520px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              📁 Saved Daily Routines
            </h3>
            <span style={{ fontSize: '11px', color: '#64748B' }}>
              Stored locally on your browser • No account required
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '18px',
              color: '#64748B',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            ✕
          </button>
        </div>

        {/* List of Saved Routines */}
        <div style={{ padding: '18px 22px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {savedRoutines.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 12px', color: '#64748B' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📂</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>No saved routines yet</div>
              <p style={{ fontSize: '11.5px', margin: '4px 0 0 0' }}>
                Click &quot;💾 Save Routine&quot; on your live schedule to preserve custom configurations for school, coaching, or exams.
              </p>
            </div>
          ) : (
            savedRoutines.map((r) => (
              <div
                key={r.id}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ flex: '1 1 200px' }}>
                  {editingId === r.id ? (
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{ padding: '4px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                      />
                      <button
                        type="button"
                        onClick={() => saveRename(r.id)}
                        style={{ padding: '4px 8px', background: '#5B5CF0', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}
                      >
                        ✓
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A' }}>
                        {r.name}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                        {r.personaName || 'Custom'} • {r.studyHours}h study • {r.activityCount} blocks • Saved {new Date(r.savedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      onLoad(r);
                      onClose();
                    }}
                    style={{
                      padding: '5px 10px',
                      background: '#5B5CF0',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Load Routine
                  </button>
                  <button
                    type="button"
                    onClick={() => onDuplicate(r)}
                    title="Duplicate routine"
                    style={{
                      padding: '5px 8px',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    📑
                  </button>
                  <button
                    type="button"
                    onClick={() => startRename(r)}
                    title="Rename"
                    style={{
                      padding: '5px 8px',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(r.id)}
                    title="Delete"
                    style={{
                      padding: '5px 8px',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      color: '#DC2626',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
