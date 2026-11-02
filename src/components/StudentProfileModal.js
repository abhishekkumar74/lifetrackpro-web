'use client';
import { useState, useEffect, useCallback } from 'react';

/**
 * StudentProfileModal
 * Comprehensive Student Profile, Study Analytics, Habits, Study Rooms,
 * Account Status, and Administrative Support/Audit System.
 * SECURITY: Zero exposure of passwords, credentials, or private secrets.
 */
export default function StudentProfileModal({ studentId, onClose, onUserUpdated }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'focus', 'habits', 'rooms', 'history', 'actions'
  const [mutating, setMutating] = useState(false);
  const [actionFeedback, setActionFeedback] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Support Note State
  const [supportNote, setSupportNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  // Suspend Dialog State
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState('');

  // Delete Dialog State
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Fetch full student profile
  const fetchStudentDetails = useCallback(async () => {
    if (!studentId) return;
    try {
      const res = await fetch(`/api/admin/users/${studentId}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `HTTP ${res.status}: Failed to load student details`);
      }
      const data = await res.json();
      setStudent(data.student);
      setError(null);
    } catch (err) {
      setError(err.message || 'Unable to retrieve student profile.');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    let ignore = false;
    const loadDetails = async () => {
      try {
        const res = await fetch(`/api/admin/users/${studentId}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error || `HTTP ${res.status}: Failed to load student details`);
        }
        const data = await res.json();
        if (!ignore) {
          setStudent(data.student);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to retrieve student profile.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    if (studentId) {
      loadDetails();
    }

    return () => {
      ignore = true;
    };
  }, [studentId]);

  // Copy UUID
  const handleCopyId = () => {
    if (!student?.id) return;
    navigator.clipboard?.writeText(student.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Generic mutation handler
  const executeMutation = async (payload, successMsg) => {
    setMutating(true);
    setActionFeedback(null);
    try {
      const res = await fetch(`/api/admin/users/${studentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || 'Administrative update failed.');
      }

      setActionFeedback({ type: 'success', message: successMsg });
      await fetchStudentDetails();
      if (onUserUpdated) onUserUpdated();
    } catch (err) {
      setActionFeedback({ type: 'error', message: err.message || 'Action failed.' });
    } finally {
      setMutating(false);
    }
  };

  // Toggle Pro Entitlement
  const handleTogglePro = async () => {
    const nextPro = !student.isPremium;
    await executeMutation(
      { is_premium: nextPro },
      nextPro ? '★ PRO entitlement successfully granted.' : 'PRO entitlement revoked. User switched to Free tier.'
    );
  };

  // Suspend Account
  const handleSuspendConfirm = async () => {
    await executeMutation(
      { status: 'suspended', suspension_reason: suspensionReason.trim() || 'Administrative suspension' },
      'Student account suspended. Authentication has been locked.'
    );
    setShowSuspendDialog(false);
    setSuspensionReason('');
  };

  // Reactivate Account
  const handleReactivate = async () => {
    await executeMutation(
      { status: 'active' },
      'Student account reactivated. Access successfully restored.'
    );
  };

  // Add Support Note
  const handleAddSupportNote = async (e) => {
    e.preventDefault();
    if (!supportNote.trim()) return;
    setSubmittingNote(true);
    try {
      const res = await fetch(`/api/admin/users/${studentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ support_note: supportNote.trim() }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || 'Failed to record note.');
      }
      setSupportNote('');
      setActionFeedback({ type: 'success', message: 'Support note recorded in student audit trail.' });
      await fetchStudentDetails();
    } catch (err) {
      setActionFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmittingNote(false);
    }
  };

  // Process Account Deletion
  const handleDeleteConfirm = async (permanent = false) => {
    setMutating(true);
    setActionFeedback(null);
    try {
      const res = await fetch(`/api/admin/users/${studentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: deleteReason.trim() || 'Account deletion processed by admin', permanent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Deletion request failed.');

      setShowDeleteDialog(false);
      setActionFeedback({ type: 'success', message: data.message });
      if (onUserUpdated) onUserUpdated();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setActionFeedback({ type: 'error', message: err.message });
      setMutating(false);
    }
  };

  if (!studentId) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '20px',
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        maxWidth: '920px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        animation: 'modalFadeIn 0.2s ease-out',
      }}>
        {/* Modal Top Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: '#F8FAFC',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E2E8F0' }} />
              <div>
                <div style={{ width: '160px', height: '18px', background: '#E2E8F0', borderRadius: '4px', marginBottom: '6px' }} />
                <div style={{ width: '120px', height: '14px', background: '#E2E8F0', borderRadius: '4px' }} />
              </div>
            </div>
          ) : error ? (
            <div style={{ color: '#DC2626', fontWeight: 600, fontSize: '14px' }}>
              ⚠️ {error}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {/* Avatar with Status Indicator */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: student.isPremium ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#F1F5F9',
                  color: student.isPremium ? '#FFFFFF' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '20px',
                  border: student.isPremium ? '2px solid rgba(79, 70, 229, 0.3)' : '2px solid #E2E8F0',
                }}>
                  {student.name?.charAt(0).toUpperCase() || 'S'}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: student.accountStatus === 'suspended' ? '#F59E0B' : student.accountStatus === 'deactivated' ? '#EF4444' : '#10B981',
                  border: '2px solid #FFFFFF',
                }} title={`Account is ${student.accountStatus}`} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {student.name}
                  </h2>
                  <span className={`admin-badge ${student.isPremium ? 'admin-badge-pro' : 'admin-badge-free'}`}>
                    {student.isPremium ? '★ PRO' : 'FREE'}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: student.accountStatus === 'suspended' ? '#FEF3C7' : student.accountStatus === 'deactivated' ? '#FEE2E2' : '#DCFCE7',
                    color: student.accountStatus === 'suspended' ? '#B45309' : student.accountStatus === 'deactivated' ? '#B91C1C' : '#15803D',
                  }}>
                    ● {student.accountStatus.toUpperCase()}
                  </span>
                  <span className="admin-badge admin-badge-teal">
                    {student.category}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                    Lv. {student.level} · {student.xp} XP
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', flexWrap: 'wrap', fontSize: '12px', color: '#64748B' }}>
                  <span>📧 {student.email}</span>
                  <span>•</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>
                    ID: {student.id.slice(0, 13)}...
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: copiedId ? '#059669' : '#4F46E5',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: 0,
                    }}
                  >
                    {copiedId ? '✓ Copied!' : '📋 Copy ID'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Top Quick Actions & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {student && (
              <button
                type="button"
                onClick={handleTogglePro}
                disabled={mutating}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                {student.isPremium ? 'Revoke PRO' : '★ Grant PRO'}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                color: '#64748B',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
              title="Close Profile"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Action Feedback Banner */}
        {actionFeedback && (
          <div style={{
            padding: '10px 24px',
            background: actionFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
            borderBottom: `1px solid ${actionFeedback.type === 'success' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
            color: actionFeedback.type === 'success' ? '#059669' : '#DC2626',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span>{actionFeedback.type === 'success' ? '✓' : '⚠️'} {actionFeedback.message}</span>
            <button
              type="button"
              onClick={() => setActionFeedback(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 700 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {loading ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
              <p style={{ fontSize: '14px', fontWeight: 600 }}>Loading comprehensive student profile from database...</p>
            </div>
          ) : error || !student ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#DC2626' }}>
              <p>{error || 'Student not found.'}</p>
              <button type="button" onClick={fetchStudentDetails} className="admin-btn admin-btn-primary" style={{ marginTop: '12px' }}>
                Retry Fetch
              </button>
            </div>
          ) : (
            <div>
              {/* Top 4 Key Metric Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: '14px',
                marginBottom: '24px',
              }}>
                {/* 1. Focus Hours */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    ⏱️ Total Focus Hours
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
                    {student.focusStats?.totalHours || 0} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>hrs</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
                    {student.focusStats?.completedSessions || 0} completed ({student.focusStats?.avgSessionMinutes || 0}m avg)
                  </div>
                </div>

                {/* 2. Habit Completion */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    🎯 Habit Completion Rate
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#059669' }}>
                    {student.habitStats?.completionRate || 0}%
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
                    {student.habitStats?.activeHabits || 0} active habits · {student.habitStats?.completedLogs || 0} logged
                  </div>
                </div>

                {/* 3. Daily Goals & Routine */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    📚 Daily Focus Target
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#4F46E5' }}>
                    {student.dailyHours} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>hrs/day</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px', textTransform: 'capitalize' }}>
                    Peak time: {student.peakTime || 'Morning'}
                  </div>
                </div>

                {/* 4. Account Activity */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                    👤 Account Activity
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                    {student.lastSignInAt ? new Date(student.lastSignInAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    }) : 'Never active'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                    Joined: {student.createdAt ? new Date(student.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    }) : '—'}
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #E2E8F0',
                gap: '8px',
                marginBottom: '20px',
                overflowX: 'auto',
              }}>
                {[
                  { id: 'overview', label: '📊 Overview & Goals' },
                  { id: 'focus', label: `⏱ Focus Sessions (${student.focusStats?.totalSessions || 0})` },
                  { id: 'habits', label: `🎯 Habits (${student.habitStats?.totalHabits || 0})` },
                  { id: 'rooms', label: `👥 Study Rooms (${student.studyRooms?.hostedCount || 0})` },
                  { id: 'history', label: `📜 Account History (${student.auditHistory?.length || 0})` },
                  { id: 'actions', label: '⚙️ Admin Actions' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: activeTab === t.id ? '2px solid #4F46E5' : '2px solid transparent',
                      padding: '10px 14px',
                      fontSize: '13px',
                      fontWeight: activeTab === t.id ? 700 : 500,
                      color: activeTab === t.id ? '#4F46E5' : '#64748B',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Overview & Goals */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* AI Study Insight */}
                  {student.aiInsight && (
                    <div style={{
                      background: '#EEF2FF',
                      border: '1px solid rgba(79, 70, 229, 0.25)',
                      borderRadius: '12px',
                      padding: '16px 20px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '18px' }}>✨</span>
                        <strong style={{ fontSize: '13px', color: '#3730A3' }}>AI Learning Insight</strong>
                        {student.aiInsightUpdatedAt && (
                          <span style={{ fontSize: '11px', color: '#6366F1' }}>
                            (Updated {new Date(student.aiInsightUpdatedAt).toLocaleDateString()})
                          </span>
                        )}
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#4338CA', lineHeight: '1.6' }}>
                        {student.aiInsight}
                      </p>
                    </div>
                  )}

                  {/* Basic Details Grid */}
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0', color: '#0F172A' }}>
                      Student Profile Information
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Target Exam Category</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>
                          {student.category}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Sub-Categories / Subjects</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>
                          {Array.isArray(student.subCategory) && student.subCategory.length > 0 
                            ? student.subCategory.join(', ')
                            : 'None selected'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Daily Study Target</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>
                          {student.dailyHours} hours/day
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Preferred Peak Study Time</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginTop: '2px', textTransform: 'capitalize' }}>
                          {student.peakTime || 'Morning'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Subscription Status</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: student.isPremium ? '#4F46E5' : '#64748B', marginTop: '2px' }}>
                          {student.isPremium ? '★ PRO Tier (Full Access)' : 'Free Tier'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Account Security Status</div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: student.accountStatus === 'suspended' ? '#B45309' : student.accountStatus === 'deactivated' ? '#B91C1C' : '#15803D',
                          marginTop: '2px',
                        }}>
                          {student.accountStatus.toUpperCase()}
                          {student.suspensionReason && (
                            <span style={{ fontSize: '11px', fontWeight: 400, color: '#64748B', display: 'block' }}>
                              Reason: {student.suspensionReason}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subject Breakdown Cards */}
                  {student.focusStats?.subjectBreakdown?.length > 0 && (
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0', color: '#0F172A' }}>
                        Subject Focus Distribution
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                        {student.focusStats.subjectBreakdown.map((sb, idx) => (
                          <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{sb.subject}</div>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#4F46E5', marginTop: '4px' }}>
                              {(sb.minutes / 60).toFixed(1)} hrs
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748B' }}>{sb.count} sessions</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Focus Sessions */}
              {activeTab === 'focus' && (
                <div>
                  {student.focusStats?.recentSessions?.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B', background: '#F8FAFC', borderRadius: '12px' }}>
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>⏱️</div>
                      <p style={{ margin: 0, fontSize: '14px' }}>No focus sessions recorded yet for this student.</p>
                    </div>
                  ) : (
                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Goal / Subject</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Mood / Audio</th>
                            <th>Timestamp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {student.focusStats.recentSessions.map((s) => (
                            <tr key={s.id}>
                              <td>
                                <strong style={{ color: '#0F172A', display: 'block' }}>{s.goal}</strong>
                                <span style={{ fontSize: '11px', color: '#64748B' }}>{s.subject}</span>
                              </td>
                              <td style={{ fontWeight: 600, color: '#4F46E5' }}>
                                {s.durationMin} mins
                              </td>
                              <td>
                                <span style={{
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  padding: '2px 8px',
                                  borderRadius: '6px',
                                  background: s.status === 'completed' ? '#DCFCE7' : '#FEF3C7',
                                  color: s.status === 'completed' ? '#15803D' : '#B45309',
                                }}>
                                  {s.status}
                                </span>
                              </td>
                              <td style={{ color: '#64748B', fontSize: '12px' }}>
                                {s.mood || 'Standard'} {s.soundUsed ? `· ${s.soundUsed}` : ''}
                              </td>
                              <td style={{ fontSize: '12px', color: '#64748B' }}>
                                {new Date(s.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Habits & Routines */}
              {activeTab === 'habits' && (
                <div>
                  {student.habitStats?.habits?.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B', background: '#F8FAFC', borderRadius: '12px' }}>
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎯</div>
                      <p style={{ margin: 0, fontSize: '14px' }}>No daily habits initialized yet.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                      {student.habitStats.habits.map((h) => (
                        <div key={h.id} style={{
                          background: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '14px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}>
                          <span style={{ fontSize: '24px' }}>{h.emoji}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{h.title}</div>
                            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', textTransform: 'capitalize' }}>
                              {h.frequency} {h.bestTime ? `· Best: ${h.bestTime}` : ''}
                            </div>
                          </div>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: h.isActive ? '#DCFCE7' : '#F1F5F9',
                            color: h.isActive ? '#15803D' : '#64748B',
                          }}>
                            {h.isActive ? 'ACTIVE' : 'PAUSED'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Study Rooms */}
              {activeTab === 'rooms' && (
                <div>
                  {student.studyRooms?.rooms?.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B', background: '#F8FAFC', borderRadius: '12px' }}>
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>👥</div>
                      <p style={{ margin: 0, fontSize: '14px' }}>No live study rooms hosted by this student.</p>
                    </div>
                  ) : (
                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Room Name</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Members</th>
                            <th>Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {student.studyRooms.rooms.map((r) => (
                            <tr key={r.id}>
                              <td style={{ fontWeight: 600, color: '#0F172A' }}>{r.name}</td>
                              <td style={{ color: '#475569' }}>{r.subject}</td>
                              <td>
                                <span className={`admin-badge ${r.isActive ? 'admin-badge-active' : 'admin-badge-closed'}`}>
                                  {r.isActive ? 'LIVE' : 'CLOSED'}
                                </span>
                              </td>
                              <td style={{ color: '#64748B' }}>{r.memberCount} joined</td>
                              <td style={{ fontSize: '12px', color: '#64748B' }}>
                                {new Date(r.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 5: Account History & Support Audit */}
              {activeTab === 'history' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Add Support Note Box */}
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 8px 0', color: '#0F172A' }}>
                      📝 Add Internal Support / Incident Note
                    </h4>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px 0' }}>
                      Record support tickets, verification notes, or user assistance history into the permanent audit trail.
                    </p>
                    <form onSubmit={handleAddSupportNote} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <textarea
                        rows={2}
                        value={supportNote}
                        onChange={(e) => setSupportNote(e.target.value)}
                        placeholder="e.g. Student contacted support regarding streak restoration. Verified and updated."
                        className="admin-input"
                        style={{ width: '100%', resize: 'vertical' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          type="submit"
                          disabled={submittingNote || !supportNote.trim()}
                          className="admin-btn admin-btn-primary"
                          style={{ padding: '6px 14px', fontSize: '12px' }}
                        >
                          {submittingNote ? 'Recording Note...' : 'Save Support Note'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Audit Timeline */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 12px 0', color: '#0F172A' }}>
                      Administrative Audit Trail ({student.auditHistory?.length || 0} events)
                    </h4>
                    {student.auditHistory?.length === 0 ? (
                      <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                        No administrative actions or support notes recorded yet for this student.
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {student.auditHistory.map((a) => (
                          <div key={a.id} style={{
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: '12px',
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{ fontWeight: 700, color: '#4F46E5', fontFamily: 'var(--font-mono)' }}>
                                {a.action}
                              </span>
                              <span style={{ color: '#94A3B8' }}>
                                {new Date(a.createdAt).toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div style={{ color: '#475569', marginBottom: '4px' }}>
                              by <strong style={{ color: '#0F172A' }}>{a.adminEmail}</strong> (IP: {a.ipAddress})
                            </div>
                            {a.details?.note && (
                              <div style={{ background: '#F8FAFC', padding: '6px 10px', borderRadius: '6px', color: '#0F172A', marginTop: '6px', borderLeft: '3px solid #4F46E5' }}>
                                <strong>Note:</strong> {a.details.note}
                              </div>
                            )}
                            {a.details?.reason && (
                              <div style={{ background: '#FFFBEB', padding: '6px 10px', borderRadius: '6px', color: '#B45309', marginTop: '6px' }}>
                                <strong>Reason:</strong> {a.details.reason}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 6: Admin Actions */}
              {activeTab === 'actions' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Action 1: Subscription Tier Control */}
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 6px 0', color: '#0F172A' }}>
                      Subscription Status & Entitlement
                    </h4>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 14px 0' }}>
                      Manually verify or adjust the user&apos;s Pro status. Changes sync instantly with the mobile app and are logged.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className={`admin-badge ${student.isPremium ? 'admin-badge-pro' : 'admin-badge-free'}`}>
                        Current: {student.isPremium ? '★ PRO' : 'FREE'}
                      </span>
                      <button
                        type="button"
                        onClick={handleTogglePro}
                        disabled={mutating}
                        className={`admin-btn ${student.isPremium ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                      >
                        {student.isPremium ? 'Revoke PRO Entitlement' : '★ Grant PRO Entitlement'}
                      </button>
                    </div>
                  </div>

                  {/* Action 2: Account Suspension / Reactivation */}
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 6px 0', color: '#0F172A' }}>
                      Account Access Control (Suspend / Reactivate)
                    </h4>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 14px 0' }}>
                      Suspension locks the student&apos;s authentication tokens and prevents login across mobile and web platforms.
                    </p>
                    {student.accountStatus === 'suspended' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#B45309' }}>
                          ⏸ Account is currently Suspended
                        </span>
                        <button
                          type="button"
                          onClick={handleReactivate}
                          disabled={mutating}
                          className="admin-btn admin-btn-primary"
                        >
                          ▶ Reactivate Account
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowSuspendDialog(true)}
                        disabled={mutating}
                        className="admin-btn admin-btn-danger"
                      >
                        ⏸ Suspend Student Account
                      </button>
                    )}
                  </div>

                  {/* Action 3: Process Deletion Request */}
                  <div style={{ background: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: '12px', padding: '18px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 6px 0', color: '#C53030' }}>
                      Danger Zone: Process Account Deletion Request
                    </h4>
                    <p style={{ fontSize: '12px', color: '#742A2A', margin: '0 0 14px 0' }}>
                      Fulfill a student&apos;s GDPR/privacy deletion request. Soft-deactivation locks credentials while retaining compliance logs.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowDeleteDialog(true)}
                      disabled={mutating}
                      className="admin-btn admin-btn-danger"
                      style={{ background: '#DC2626', color: '#FFFFFF' }}
                    >
                      🗑️ Process Deletion Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#F8FAFC',
          fontSize: '12px',
          color: '#64748B',
        }}>
          <div>
            🔒 Privileged Admin Session · Immutable Audit Logging Active
          </div>
          <button
            type="button"
            onClick={onClose}
            className="admin-btn admin-btn-secondary"
            style={{ padding: '6px 14px' }}
          >
            Done
          </button>
        </div>
      </div>

      {/* Suspend Confirmation Sub-Dialog */}
      {showSuspendDialog && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          padding: '20px',
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '14px', maxWidth: '440px', width: '100%', padding: '24px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 8px 0', color: '#B45309' }}>
              Confirm Account Suspension
            </h3>
            <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 14px 0' }}>
              Are you sure you want to suspend <strong style={{ color: '#0F172A' }}>{student.name}</strong>? They will be locked out of the mobile app immediately.
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Suspension Reason (Required for audit):
              </label>
              <input
                type="text"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                placeholder="e.g. Terms violation, requested security hold"
                className="admin-input"
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setShowSuspendDialog(false)}
                className="admin-btn admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={mutating || !suspensionReason.trim()}
                onClick={handleSuspendConfirm}
                className="admin-btn admin-btn-danger"
              >
                {mutating ? 'Suspending...' : 'Confirm Suspension'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Sub-Dialog */}
      {showDeleteDialog && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          padding: '20px',
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '14px', maxWidth: '460px', width: '100%', padding: '24px', border: '1px solid #FED7D7' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 8px 0', color: '#DC2626' }}>
              Confirm Account Deletion Request
            </h3>
            <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 14px 0', lineHeight: '1.5' }}>
              You are about to process a deletion request for <strong style={{ color: '#0F172A' }}>{student.name}</strong> ({student.email}).
            </p>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Reason for deletion:
              </label>
              <input
                type="text"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="e.g. User requested deletion via support ticket #1042"
                className="admin-input"
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#DC2626', marginBottom: '6px' }}>
                Type student name &quot;{student.name}&quot; to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={student.name}
                className="admin-input"
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setDeleteConfirmText('');
                }}
                className="admin-btn admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={mutating || deleteConfirmText.trim().toLowerCase() !== student.name.trim().toLowerCase()}
                onClick={() => handleDeleteConfirm(false)}
                className="admin-btn admin-btn-danger"
                style={{ background: '#DC2626' }}
              >
                {mutating ? 'Processing...' : 'Confirm Deactivation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
