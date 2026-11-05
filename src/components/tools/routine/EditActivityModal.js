'use client';
import { useState, useEffect } from 'react';
import { CATEGORY_STYLES, timeStringToMinutes, minutesTo24Hour, formatTimeWindow } from '@/lib/routineEngine';

/**
 * EditActivityModal — Modal to customize or add any 24-hour activity
 */
export default function EditActivityModal({
  isOpen,
  onClose,
  activity,
  onSave,
  onDelete,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('deep_work');
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState(60);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (activity) {
      setTitle(activity.title || '');
      setCategory(activity.category || 'deep_work');
      setStartTime(activity.startTime || '09:00');
      setDuration(activity.duration || 60);
      setNote(activity.note || '');
    }
  }, [activity]);

  if (!isOpen || !activity) return null;

  const isNew = !!activity.isNew;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const startMin = timeStringToMinutes(startTime);
    const durNum = Math.max(10, parseInt(duration, 10) || 45);
    const endMin = (startMin + durNum) % 1440;

    onSave({
      ...activity,
      title: title.trim(),
      category,
      startMin,
      duration: durNum,
      endMin,
      startTime,
      endTime: minutesTo24Hour(endMin),
      timeWindow: formatTimeWindow(startMin, endMin),
      note: note.trim(),
    });

    onClose();
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
          maxWidth: '460px',
          padding: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E2E8F0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            {isNew ? '➕ Add Daily Activity' : '✏️ Edit Activity'}
          </h3>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '5px' }}>
              Activity Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Physics Numerical Drills, Commute, Lunch"
              style={{
                width: '100%',
                padding: '9px 12px',
                fontSize: '13px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '5px' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#0F172A',
                }}
              >
                <option value="deep_work">⚡ Deep Work Focus</option>
                <option value="practice">📝 Problem Practice</option>
                <option value="recall">🧠 Active Recall</option>
                <option value="fixed">🏫 Fixed Commitment</option>
                <option value="nutrition">🥗 Meal / Nutrition</option>
                <option value="exercise">🏃 Exercise / Movement</option>
                <option value="break">☕ Cognitive Break</option>
                <option value="wind_down">🌙 Wind-Down</option>
                <option value="sleep">💤 Sleep</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '5px' }}>
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  color: '#0F172A',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '5px' }}>
              Duration: {duration} minutes
            </label>
            <input
              type="range"
              min="15"
              max="240"
              step="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: '#5B5CF0' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '5px' }}>
              Notes or Instructions
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Solve 30 PYQs with 50/10 timer; keep phone outside room."
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                resize: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            {!isNew && (
              <button
                type="button"
                onClick={() => {
                  onDelete(activity.id);
                  onClose();
                }}
                style={{
                  padding: '8px 14px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#DC2626',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Delete Activity
              </button>
            )}

            <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '8px 14px',
                  background: '#F1F5F9',
                  color: '#475569',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  background: '#5B5CF0',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 750,
                  cursor: 'pointer',
                }}
              >
                {isNew ? 'Add Activity' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
