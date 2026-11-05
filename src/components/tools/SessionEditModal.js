'use client';
import { useState, useEffect } from 'react';
import { CloseIcon } from '@/components/Icons';
import { minutesToDisplayTime, timeToMinutes } from '@/lib/timetableEngine';

export default function SessionEditModal({
  isOpen,
  onClose,
  session,
  subjects = [],
  onSave,
  onDelete,
}) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('deep_work');
  const [startTime, setStartTime] = useState('06:00');
  const [duration, setDuration] = useState(50);
  const [note, setNote] = useState('');
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      setTitle(session.title || '');
      setSubject(session.subject || (subjects[0]?.name || 'Core Focus'));
      setType(session.type || 'deep_work');
      setStartTime(session.rawStartTime || '06:00');
      setDuration(session.duration || 50);
      setNote(session.note || '');
      setLocked(!!session.locked);
      setError('');
    }
  }, [session, subjects]);

  if (!isOpen || !session) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Session title is required.');
      return;
    }

    const dur = parseInt(duration, 10);
    if (isNaN(dur) || dur < 10 || dur > 240) {
      setError('Duration must be between 10 and 240 minutes.');
      return;
    }

    const startM = timeToMinutes(startTime);
    const endM = startM + dur;
    const endHours = Math.floor(endM / 60) % 24;
    const endMins = endM % 60;
    const rawEndTime = `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
    const timeWindow = `${minutesToDisplayTime(startM)} – ${minutesToDisplayTime(endM)}`;

    onSave({
      ...session,
      title: title.trim(),
      subject,
      type,
      rawStartTime: startTime,
      rawEndTime,
      duration: dur,
      timeWindow,
      note: note.trim(),
      locked,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-modal-title"
      className="planner-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="planner-modal-window">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 id="session-modal-title" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--planner-text-primary)', margin: 0 }}>
              {session.isNew ? 'Add Study Session Block' : 'Edit Study Session'}
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--planner-text-secondary)' }}>
              Configure subject, start time and duration
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

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#EF4444', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Session Title */}
          <div className="planner-form-group">
            <label htmlFor="session-title" className="planner-label">
              Session Title
            </label>
            <input
              id="session-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mechanics Numericals, Organic Reaction Drills"
              className="planner-input"
              autoFocus
            />
          </div>

          {/* Subject & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label htmlFor="session-subject" className="planner-label">
                Associated Subject
              </label>
              <select
                id="session-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="planner-select"
              >
                {subjects.map((s) => (
                  <option key={s.id || s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
                <option value="General Revision">General Revision</option>
                <option value="Mock Test">Mock Test</option>
              </select>
            </div>

            <div>
              <label htmlFor="session-category" className="planner-label">
                Session Type
              </label>
              <select
                id="session-category"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="planner-select"
              >
                <option value="deep_work">Deep Work Sprint</option>
                <option value="revision">Active Recall Review</option>
                <option value="practice">Timed MCQ Practice</option>
                <option value="mock_test">Mock Test Simulation</option>
                <option value="break">Recovery Break</option>
              </select>
            </div>
          </div>

          {/* Start Time & Duration */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '12px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <div style={{ minWidth: 0, maxWidth: '100%' }}>
              <label htmlFor="session-start" className="planner-label">
                Start Time
              </label>
              <input
                id="session-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="planner-input"
                style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ minWidth: 0, maxWidth: '100%' }}>
              <label htmlFor="session-duration" className="planner-label">
                Duration (minutes)
              </label>
              <input
                id="session-duration"
                type="number"
                min="10"
                max="240"
                step="5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="planner-input"
                style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="planner-form-group">
            <label htmlFor="session-notes" className="planner-label">
              Study Focus / Topic Notes
            </label>
            <input
              id="session-notes"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Chapter 4 NCERT formulas + 30 PYQs"
              className="planner-input"
            />
          </div>

          {/* Lock Option */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--planner-border)' }}>
            <input
              type="checkbox"
              checked={locked}
              onChange={(e) => setLocked(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--planner-indigo)' }}
            />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 650, color: 'var(--planner-text-primary)' }}>
                Lock session position
              </div>
              <div style={{ fontSize: '12px', color: 'var(--planner-text-secondary)' }}>
                Prevents this block from moving when you regenerate the timetable.
              </div>
            </div>
          </label>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            {!session.isNew ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(session.id);
                  onClose();
                }}
                className="planner-btn-secondary"
                style={{ color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              >
                Delete Block
              </button>
            ) : <div />}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={onClose}
                className="planner-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="planner-btn-primary"
              >
                {session.isNew ? 'Add Block' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
