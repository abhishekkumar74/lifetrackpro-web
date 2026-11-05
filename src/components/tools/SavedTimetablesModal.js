'use client';
import { useState } from 'react';
import { CloseIcon } from '@/components/Icons';

export default function SavedTimetablesModal({
  isOpen,
  onClose,
  savedTimetables = [],
  onLoad,
  onDelete,
  onRename,
  onDuplicate,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  if (!isOpen) return null;

  const handleStartRename = (entry) => {
    setEditingId(entry.id);
    setEditName(entry.name);
  };

  const handleSaveRename = (id) => {
    if (editName.trim()) {
      onRename(id, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-modal-title"
      className="planner-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="planner-modal-window">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 id="saved-modal-title" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--planner-text-primary)', margin: 0 }}>
              Saved Study Schedules
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--planner-text-secondary)' }}>
              Manage, restore, or duplicate previous timetable versions
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--planner-text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
            }}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* List of saved timetables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
          {savedTimetables.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--planner-border)' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>📂</span>
              <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--planner-text-primary)' }}>
                No Saved Timetables Yet
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--planner-text-secondary)', margin: '4px 0 0' }}>
                Click &apos;Save Timetable&apos; in the main dashboard to keep snapshot versions of your study routines.
              </p>
            </div>
          ) : (
            savedTimetables.map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--planner-border)',
                  background: '#FFFFFF',
                  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {editingId === entry.id ? (
                    <div style={{ display: 'flex', gap: '6px', flex: 1, marginRight: '10px' }}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="planner-input"
                        style={{ height: '36px', fontSize: '13px' }}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveRename(entry.id)}
                        className="planner-btn-primary"
                        style={{ height: '36px', padding: '0 12px', fontSize: '12px' }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '14.5px', fontWeight: 750, color: 'var(--planner-text-primary)' }}>
                        {entry.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--planner-text-secondary)', marginTop: '2px' }}>
                        {entry.examName} • {entry.sessionCount} sessions • Saved {new Date(entry.savedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        onLoad(entry);
                        onClose();
                      }}
                      className="planner-btn-primary"
                      style={{ height: '34px', padding: '0 12px', fontSize: '12px' }}
                    >
                      Load
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartRename(entry)}
                      className="planner-btn-secondary"
                      style={{ height: '34px', padding: '0 8px', fontSize: '12px' }}
                      title="Rename"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => onDuplicate(entry)}
                      className="planner-btn-secondary"
                      style={{ height: '34px', padding: '0 8px', fontSize: '12px' }}
                      title="Duplicate"
                    >
                      📋
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(entry.id)}
                      className="planner-btn-secondary"
                      style={{ height: '34px', padding: '0 8px', fontSize: '12px', color: '#EF4444' }}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
          <button
            type="button"
            onClick={onClose}
            className="planner-btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
