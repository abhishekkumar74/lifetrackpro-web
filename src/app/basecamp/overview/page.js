'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (activeTab === 'overview') await loadTelemetry();
      else if (activeTab === 'students') await loadStudents();
      else if (activeTab === 'rooms') await loadRooms();
      else if (activeTab === 'announcements') await loadAnnouncements();
      else if (activeTab === 'audit') await loadAudit();
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore
    } finally {
      window.location.replace('/basecamp');
    }
  };

  // ── Telemetry State ──
  const [telemetry, setTelemetry] = useState(null);
  const [telemetryLoading, setTelemetryLoading] = useState(true);
  const [telemetryError, setTelemetryError] = useState(null);

  // ── Students Management State ──
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState(null);
  const [studentPage, setStudentPage] = useState(1);
  const [studentLimit] = useState(10);
  const [studentTotal, setStudentTotal] = useState(0);
  const [studentTotalPages, setStudentTotalPages] = useState(1);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentPlanFilter, setStudentPlanFilter] = useState('ALL');
  const [studentCategoryFilter, setStudentCategoryFilter] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [entitlementModalUser, setEntitlementModalUser] = useState(null);
  const [entitlementMutating, setEntitlementMutating] = useState(false);
  const [studentActionFeedback, setStudentActionFeedback] = useState(null);

  // ── Study Rooms State ──
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsError, setRoomsError] = useState(null);
  const [roomPage, setRoomPage] = useState(1);
  const [roomLimit] = useState(10);
  const [roomTotal, setRoomTotal] = useState(0);
  const [roomTotalPages, setRoomTotalPages] = useState(1);
  const [roomSearch, setRoomSearch] = useState('');
  const [roomStatusFilter, setRoomStatusFilter] = useState('ALL');
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
  const [roomDetailLoading, setRoomDetailLoading] = useState(false);
  const [closeRoomModal, setCloseRoomModal] = useState(null);
  const [roomMutating, setRoomMutating] = useState(false);
  const [roomActionFeedback, setRoomActionFeedback] = useState(null);

  // ── Remote Announcements State ──
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);
  const [announcementsError, setAnnouncementsError] = useState(null);
  const [announcementsStatus, setAnnouncementsStatus] = useState('active');
  const [announcementPage, setAnnouncementPage] = useState(1);
  const [announcementLimit] = useState(10);
  const [announcementTotal, setAnnouncementTotal] = useState(0);
  const [announcementTotalPages, setAnnouncementTotalPages] = useState(1);
  const [announcementStatusFilter, setAnnouncementStatusFilter] = useState('ALL');
  const [announcementSeverityFilter, setAnnouncementSeverityFilter] = useState('ALL');
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    severity: 'info',
    target_category: 'all',
    is_active: true,
    expires_at: '',
  });
  const [announcementMutating, setAnnouncementMutating] = useState(false);
  const [announcementActionFeedback, setAnnouncementActionFeedback] = useState(null);
  const [deletingAnnouncement, setDeletingAnnouncement] = useState(null);
  const [deleteMutating, setDeleteMutating] = useState(false);

  // ── Audit Logs State ──
  const [auditData, setAuditData] = useState(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const [sessionAuditActions, setSessionAuditActions] = useState([]);

  // ── Broadcaster State ──
  const [bannerText, setBannerText] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lifetrack_admin_banner');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.message) return parsed.message;
        }
      } catch {
        // Ignore read errors
      }
    }
    return '⚡ Welcome to LifeTrack Pro — Focused study tools for serious aspirants.';
  });
  const [bannerSaved, setBannerSaved] = useState(false);

  // ── Load Telemetry ──
  const loadTelemetry = async () => {
    setTelemetryLoading(true);
    setTelemetryError(null);
    try {
      const res = await fetch('/api/admin/telemetry/overview');
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `HTTP Error ${res.status}: Failed to load database telemetry`);
      }
      const data = await res.json();
      setTelemetry(data);
      setTelemetryError(null);
    } catch (err) {
      setTelemetryError(err.message || 'Unable to communicate with the database telemetry service.');
    } finally {
      setTelemetryLoading(false);
    }
  };

  // ── Load Students ──
  const loadStudents = async () => {
    setStudentsLoading(true);
    setStudentsError(null);
    try {
      const params = new URLSearchParams({
        page: studentPage.toString(),
        limit: studentLimit.toString(),
        search: studentSearch.trim(),
        plan: studentPlanFilter,
        category: studentCategoryFilter,
      });
      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `HTTP Error ${res.status}: Failed to load students`);
      }
      const data = await res.json();
      setStudents(data.users || []);
      setStudentTotal(data.pagination?.total || 0);
      setStudentTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setStudentsError(err.message || 'Unable to retrieve students.');
    } finally {
      setStudentsLoading(false);
    }
  };

  // ── Load Study Rooms ──
  const loadRooms = async () => {
    setRoomsLoading(true);
    setRoomsError(null);
    try {
      const params = new URLSearchParams({
        page: roomPage.toString(),
        limit: roomLimit.toString(),
        search: roomSearch.trim(),
        status: roomStatusFilter,
      });
      const res = await fetch(`/api/admin/rooms?${params.toString()}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `HTTP Error ${res.status}: Failed to load study rooms`);
      }
      const data = await res.json();
      setRooms(data.rooms || []);
      setRoomTotal(data.pagination?.total || 0);
      setRoomTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setRoomsError(err.message || 'Unable to retrieve study rooms.');
    } finally {
      setRoomsLoading(false);
    }
  };

  // ── Load Remote Announcements ──
  const loadAnnouncements = async () => {
    setAnnouncementsLoading(true);
    setAnnouncementsError(null);
    try {
      const params = new URLSearchParams({
        page: announcementPage.toString(),
        limit: announcementLimit.toString(),
        status: announcementStatusFilter,
        severity: announcementSeverityFilter,
      });
      const res = await fetch(`/api/admin/announcements?${params.toString()}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `HTTP Error ${res.status}: Failed to load announcements`);
      }
      const data = await res.json();
      setAnnouncementsStatus(data.status || 'active');
      setAnnouncements(data.announcements || []);
      setAnnouncementTotal(data.pagination?.total || 0);
      setAnnouncementTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setAnnouncementsError(err.message || 'Unable to retrieve announcements.');
    } finally {
      setAnnouncementsLoading(false);
    }
  };

  // ── Load Audit Log Info ──
  const loadAudit = async () => {
    setAuditLoading(true);
    try {
      const res = await fetch('/api/admin/audit');
      const data = await res.json();
      setAuditData(data);
    } catch (err) {
      console.warn('Audit fetch warning:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch('/api/admin/telemetry/overview');
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error || `HTTP Error ${res.status}: Failed to load database telemetry`);
        }
        const data = await res.json();
        if (!ignore) {
          setTelemetry(data);
          setTelemetryError(null);
          setTelemetryLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setTelemetryError(err.message || 'Unable to communicate with the database telemetry service.');
          setTelemetryLoading(false);
        }
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  // Tab switch effect
  useEffect(() => {
    let ignore = false;
    if (activeTab === 'students') {
      const params = new URLSearchParams({
        page: studentPage.toString(),
        limit: studentLimit.toString(),
        search: studentSearch.trim(),
        plan: studentPlanFilter,
        category: studentCategoryFilter,
      });
      fetch(`/api/admin/users?${params.toString()}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load students');
          return res.json();
        })
        .then((data) => {
          if (!ignore) {
            setStudents(data.users || []);
            setStudentTotal(data.pagination?.total || 0);
            setStudentTotalPages(data.pagination?.totalPages || 1);
            setStudentsLoading(false);
          }
        })
        .catch((err) => {
          if (!ignore) {
            setStudentsError(err.message || 'Unable to retrieve students.');
            setStudentsLoading(false);
          }
        });
    } else if (activeTab === 'rooms') {
      const params = new URLSearchParams({
        page: roomPage.toString(),
        limit: roomLimit.toString(),
        search: roomSearch.trim(),
        status: roomStatusFilter,
      });
      fetch(`/api/admin/rooms?${params.toString()}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load study rooms');
          return res.json();
        })
        .then((data) => {
          if (!ignore) {
            setRooms(data.rooms || []);
            setRoomTotal(data.pagination?.total || 0);
            setRoomTotalPages(data.pagination?.totalPages || 1);
            setRoomsLoading(false);
          }
        })
        .catch((err) => {
          if (!ignore) {
            setRoomsError(err.message || 'Unable to retrieve study rooms.');
            setRoomsLoading(false);
          }
        });
    } else if (activeTab === 'announcements') {
      const params = new URLSearchParams({
        page: announcementPage.toString(),
        limit: announcementLimit.toString(),
        status: announcementStatusFilter,
        severity: announcementSeverityFilter,
      });
      fetch(`/api/admin/announcements?${params.toString()}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load announcements');
          return res.json();
        })
        .then((data) => {
          if (!ignore) {
            setAnnouncementsStatus(data.status || 'active');
            setAnnouncements(data.announcements || []);
            setAnnouncementTotal(data.pagination?.total || 0);
            setAnnouncementTotalPages(data.pagination?.totalPages || 1);
            setAnnouncementsLoading(false);
          }
        })
        .catch((err) => {
          if (!ignore) {
            setAnnouncementsError(err.message || 'Unable to retrieve announcements.');
            setAnnouncementsLoading(false);
          }
        });
    } else if (activeTab === 'audit') {
      fetch('/api/admin/audit')
        .then((res) => res.json())
        .then((data) => {
          if (!ignore) {
            setAuditData(data);
            setAuditLoading(false);
          }
        })
        .catch(() => {
          if (!ignore) setAuditLoading(false);
        });
    }
    return () => {
      ignore = true;
    };
  }, [activeTab, studentPage, studentLimit, studentSearch, studentPlanFilter, studentCategoryFilter, roomPage, roomLimit, roomSearch, roomStatusFilter, announcementPage, announcementLimit, announcementStatusFilter, announcementSeverityFilter]);

  // ── Handle Pro Entitlement Mutation ──
  const handleConfirmEntitlement = async () => {
    if (!entitlementModalUser) return;
    const targetUser = entitlementModalUser;
    const newPremiumState = !targetUser.isPremium;

    setEntitlementMutating(true);
    try {
      const res = await fetch(`/api/admin/users/${targetUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_premium: newPremiumState }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData?.error || `Failed to update entitlement (HTTP ${res.status})`);
      }

      // Add to session audit activity
      const actionName = newPremiumState ? 'PRO_ENTITLEMENT_GRANTED' : 'PRO_ENTITLEMENT_REVOKED';
      setSessionAuditActions((prev) => [
        {
          timestamp: new Date().toLocaleTimeString(),
          action: actionName,
          target: `${targetUser.name} (${targetUser.id})`,
          detail: `Status changed to ${newPremiumState ? 'PRO' : 'FREE'} (verified in DB)`,
        },
        ...prev,
      ]);

      setStudentActionFeedback({
        type: 'success',
        message: `✓ Database Verified: Pro access for '${targetUser.name}' set to ${newPremiumState ? 'PRO' : 'FREE'}.`,
      });
      setTimeout(() => setStudentActionFeedback(null), 5000);

      // Refresh list
      loadStudents();
      setEntitlementModalUser(null);
    } catch (err) {
      setStudentActionFeedback({
        type: 'error',
        message: `Mutation Error: ${err.message}`,
      });
    } finally {
      setEntitlementMutating(false);
    }
  };

  // ── Handle Room Details View ──
  const handleViewRoomDetails = async (roomId) => {
    setRoomDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/rooms/${roomId}`);
      if (!res.ok) throw new Error('Failed to fetch room details');
      const data = await res.json();
      setSelectedRoomDetails(data.room);
    } catch (err) {
      setRoomActionFeedback({
        type: 'error',
        message: `Could not load room details: ${err.message}`,
      });
    } finally {
      setRoomDetailLoading(false);
    }
  };

  // ── Handle Reactivate Room Mutation ──
  const handleReactivateRoom = async (room) => {
    setRoomMutating(true);
    try {
      const res = await fetch(`/api/admin/rooms/${room.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: true }),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData?.error || 'Failed to reactivate room');

      setRoomActionFeedback({
        type: 'success',
        message: `✓ Verified: Study room '${room.name}' has been reactivated.`,
      });
      setTimeout(() => setRoomActionFeedback(null), 5000);
      loadRooms();
    } catch (err) {
      setRoomActionFeedback({
        type: 'error',
        message: `Reactivation failed: ${err.message}`,
      });
    } finally {
      setRoomMutating(false);
    }
  };

  // ── Handle Close Room Mutation ──
  const handleConfirmCloseRoom = async () => {
    if (!closeRoomModal) return;
    const targetRoom = closeRoomModal;

    setRoomMutating(true);
    try {
      const res = await fetch(`/api/admin/rooms/${targetRoom.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'close' }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData?.error || `Failed to close room (HTTP ${res.status})`);
      }

      setSessionAuditActions((prev) => [
        {
          timestamp: new Date().toLocaleTimeString(),
          action: 'STUDY_ROOM_CLOSED',
          target: `${targetRoom.name} (${targetRoom.id})`,
          detail: 'Room deactivated (is_active: false). Messages and student data preserved.',
        },
        ...prev,
      ]);

      setRoomActionFeedback({
        type: 'success',
        message: `✓ Database Verified: Room '${targetRoom.name}' closed. All chat messages and records preserved.`,
      });
      setTimeout(() => setRoomActionFeedback(null), 5000);

      loadRooms();
      setCloseRoomModal(null);
    } catch (err) {
      setRoomActionFeedback({
        type: 'error',
        message: `Mutation Error: ${err.message}`,
      });
    } finally {
      setRoomMutating(false);
    }
  };

  // ── Announcement Handlers ──
  const handleOpenCreateAnnouncement = () => {
    setEditingAnnouncement(null);
    setAnnouncementForm({
      title: '',
      message: '',
      severity: 'info',
      target_category: 'all',
      is_active: true,
      expires_at: '',
    });
    setAnnouncementModalOpen(true);
  };

  const handleOpenEditAnnouncement = (item) => {
    setEditingAnnouncement(item);
    setAnnouncementForm({
      title: item.title,
      message: item.message,
      severity: item.severity,
      target_category: item.target_category || 'all',
      is_active: item.is_active,
      expires_at: item.expires_at ? item.expires_at.slice(0, 16) : '',
    });
    setAnnouncementModalOpen(true);
  };

  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementForm.title.trim() || !announcementForm.message.trim()) {
      setAnnouncementActionFeedback({
        type: 'error',
        message: 'Please fill out both title and message.',
      });
      return;
    }

    setAnnouncementMutating(true);
    try {
      const isEdit = Boolean(editingAnnouncement?.id);
      const url = isEdit
        ? `/api/admin/announcements/${editingAnnouncement.id}`
        : '/api/admin/announcements';
      const method = isEdit ? 'PATCH' : 'POST';

      const payload = {
        title: announcementForm.title.trim(),
        message: announcementForm.message.trim(),
        severity: announcementForm.severity,
        target_category: announcementForm.target_category,
        is_active: announcementForm.is_active,
        expires_at: announcementForm.expires_at ? new Date(announcementForm.expires_at).toISOString() : null,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData?.error || 'Failed to save announcement');
      }

      setAnnouncementActionFeedback({
        type: 'success',
        message: isEdit
          ? `✓ Verified in database: Announcement '${payload.title}' updated successfully.`
          : `✓ Verified in database: Announcement '${payload.title}' created and broadcast.`,
      });
      setTimeout(() => setAnnouncementActionFeedback(null), 5000);

      setAnnouncementModalOpen(false);
      loadAnnouncements();
    } catch (err) {
      setAnnouncementActionFeedback({
        type: 'error',
        message: `Announcement Mutation Error: ${err.message}`,
      });
    } finally {
      setAnnouncementMutating(false);
    }
  };

  const handleToggleAnnouncementActive = async (item) => {
    try {
      const res = await fetch(`/api/admin/announcements/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !item.is_active }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData?.error || 'Failed to update status');

      setAnnouncementActionFeedback({
        type: 'success',
        message: `✓ Verified: Announcement '${item.title}' is now ${!item.is_active ? 'ACTIVE' : 'INACTIVE'}.`,
      });
      setTimeout(() => setAnnouncementActionFeedback(null), 5000);
      loadAnnouncements();
    } catch (err) {
      setAnnouncementActionFeedback({
        type: 'error',
        message: `Status update failed: ${err.message}`,
      });
    }
  };

  const handleConfirmDeleteAnnouncement = async () => {
    if (!deletingAnnouncement) return;
    setDeleteMutating(true);
    try {
      const res = await fetch(`/api/admin/announcements/${deletingAnnouncement.id}`, {
        method: 'DELETE',
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData?.error || 'Failed to delete announcement');

      setAnnouncementActionFeedback({
        type: 'success',
        message: `✓ Verified in database: Announcement '${deletingAnnouncement.title}' deleted.`,
      });
      setTimeout(() => setAnnouncementActionFeedback(null), 5000);

      setDeletingAnnouncement(null);
      loadAnnouncements();
    } catch (err) {
      setAnnouncementActionFeedback({
        type: 'error',
        message: `Delete failed: ${err.message}`,
      });
    } finally {
      setDeleteMutating(false);
    }
  };

  // ── Safe CSV Export Function ──
  const handleExportCSV = async () => {
    try {
      // Fetch up to 100 students for export
      const params = new URLSearchParams({
        page: '1',
        limit: '100',
        search: studentSearch.trim(),
        plan: studentPlanFilter,
        category: studentCategoryFilter,
      });

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to retrieve export records from server.');
      const data = await res.json();
      const exportRows = data.users || [];

      if (exportRows.length === 0) {
        setStudentActionFeedback({
          type: 'error',
          message: 'No student records available to export.',
        });
        return;
      }

      // Safe CSV serialization escaping formula injection (=, +, -, @)
      const sanitizeCell = (val) => {
        if (val === null || val === undefined) return '""';
        let str = String(val).replace(/"/g, '""');
        if (/^[=+\-@\t\r]/.test(str)) {
          str = `'${str}`;
        }
        return `"${str}"`;
      };

      const headers = ['Student ID', 'Name', 'Email', 'Target Category', 'XP Points', 'Level', 'Pro Tier', 'Registered At'];
      const csvLines = [headers.map(sanitizeCell).join(',')];

      for (const u of exportRows) {
        const line = [
          sanitizeCell(u.id),
          sanitizeCell(u.name),
          sanitizeCell(u.email),
          sanitizeCell(u.category),
          sanitizeCell(u.xp),
          sanitizeCell(u.level),
          sanitizeCell(u.isPremium ? 'PRO' : 'FREE'),
          sanitizeCell(u.createdAt),
        ];
        csvLines.push(line.join(','));
      }

      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csvLines.join('\n'));
      const link = document.createElement('a');
      link.setAttribute('href', csvContent);
      link.setAttribute('download', `lifetrack_students_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setStudentActionFeedback({
        type: 'error',
        message: `CSV Export failed: ${err.message}`,
      });
    }
  };

  // ── Broadcaster Handlers ──
  const handlePublishBanner = () => {
    if (!bannerText.trim()) return;
    try {
      localStorage.setItem('lifetrack_admin_banner', JSON.stringify({ active: true, message: bannerText.trim() }));
      window.dispatchEvent(new Event('storage'));
      setBannerSaved(true);
      setTimeout(() => setBannerSaved(false), 3000);
    } catch {
      // Ignore storage write errors
    }
  };

  const handleClearBanner = () => {
    try {
      localStorage.removeItem('lifetrack_admin_banner');
      window.dispatchEvent(new Event('storage'));
      setBannerText('');
    } catch {
      // Ignore
    }
  };

  return (
    <div className="admin-layout-root">
      {/* ── Mobile Backdrop Overlay ── */}
      <div 
        className={`admin-drawer-overlay ${mobileDrawerOpen ? 'mobile-open' : ''}`}
        onClick={() => setMobileDrawerOpen(false)}
      />

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar-container ${mobileDrawerOpen ? 'mobile-open' : ''}`}>
        {/* Brand Area */}
        <div className="admin-sidebar-brand">
          <Image src="/icon.png" alt="LifeTrack Pro" width={32} height={32} style={{ borderRadius: '8px' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              LifeTrack Pro
            </div>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>
              Basecamp Console
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setMobileDrawerOpen(false)}
            style={{ 
              display: 'none', 
              background: 'none', 
              border: 'none', 
              color: '#94A3B8', 
              fontSize: '18px', 
              cursor: 'pointer' 
            }}
            className="mobile-close-btn"
          >
            ✕
          </button>
        </div>

        {/* Group 1: Operations */}
        <div className="admin-nav-group">
          <span className="admin-nav-group-title">Operations</span>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => { setActiveTab('overview'); setMobileDrawerOpen(false); }}
          >
            <span className="nav-icon">📊</span>
            <span>Live Telemetry</span>
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => { setActiveTab('students'); setMobileDrawerOpen(false); }}
          >
            <span className="nav-icon">👥</span>
            <span>Student Management</span>
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => { setActiveTab('rooms'); setMobileDrawerOpen(false); }}
          >
            <span className="nav-icon">🎧</span>
            <span>Study Rooms</span>
          </button>
        </div>

        {/* Group 2: Communications */}
        <div className="admin-nav-group">
          <span className="admin-nav-group-title">Communications</span>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => { setActiveTab('announcements'); setMobileDrawerOpen(false); }}
          >
            <span className="nav-icon">📢</span>
            <span>App Announcements</span>
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'broadcaster' ? 'active' : ''}`}
            onClick={() => { setActiveTab('broadcaster'); setMobileDrawerOpen(false); }}
          >
            <span className="nav-icon">⚡</span>
            <span>Site Broadcaster</span>
          </button>
        </div>

        {/* Group 3: Security & Platform */}
        <div className="admin-nav-group">
          <span className="admin-nav-group-title">Security & Platform</span>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => { setActiveTab('audit'); setMobileDrawerOpen(false); }}
          >
            <span className="nav-icon">📋</span>
            <span>Audit Trail</span>
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => { setActiveTab('system'); setMobileDrawerOpen(false); }}
          >
            <span className="nav-icon">🛡️</span>
            <span>System & Security</span>
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => { setActiveTab('database'); setMobileDrawerOpen(false); }}
          >
            <span className="nav-icon">🗄️</span>
            <span>Database Schemas</span>
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#5B5CF0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '12px' }}>
              A
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Administrator
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#34D399', fontWeight: 600 }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399', display: 'inline-block' }}></span>
                Active Session
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link 
              href="/" 
              target="_blank"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#94A3B8',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Site</span>
              <span style={{ fontSize: '10px' }}>↗</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#F87171',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Workspace ── */}
      <div className="admin-workspace">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              style={{
                display: 'none',
                background: '#F1F5F9',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              className="mobile-hamburger-btn"
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span>Basecamp</span>
                <span>/</span>
                <span style={{ color: '#5B5CF0' }}>
                  {activeTab === 'overview' && 'Live Telemetry'}
                  {activeTab === 'students' && 'Students'}
                  {activeTab === 'rooms' && 'Study Rooms'}
                  {activeTab === 'announcements' && 'Announcements'}
                  {activeTab === 'audit' && 'Audit Trail'}
                  {activeTab === 'system' && 'Security'}
                  {activeTab === 'database' && 'Database'}
                  {activeTab === 'broadcaster' && 'Broadcaster'}
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0', lineHeight: 1.2 }}>
                {activeTab === 'overview' && 'Platform Overview & Telemetry'}
                {activeTab === 'students' && 'Student Management & Entitlements'}
                {activeTab === 'rooms' && 'Study Room Operations'}
                {activeTab === 'announcements' && 'Remote App Announcements'}
                {activeTab === 'audit' && 'Administrative Audit Trail'}
                {activeTab === 'system' && 'Infrastructure & Security Posture'}
                {activeTab === 'database' && 'Supabase Database & Schemas'}
                {activeTab === 'broadcaster' && 'Site Announcement Broadcaster'}
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {telemetry?.database?.status === 'connected' ? (
              <span className="admin-badge admin-badge-emerald" title="Connected to zvfeafmixnevqbelxnqp">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                <span>Supabase Live ({telemetry.database.latencyMs}ms)</span>
              </span>
            ) : telemetryLoading ? (
              <span className="admin-badge admin-badge-free">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94A3B8', display: 'inline-block' }}></span>
                <span>Checking Database...</span>
              </span>
            ) : (
              <span className="admin-badge admin-badge-rose">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }}></span>
                <span>Database Offline</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleManualRefresh}
              className="admin-btn admin-btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
              title="Refresh current data"
              disabled={isRefreshing}
            >
              <span style={{ display: 'inline-block', transform: isRefreshing ? 'rotate(360deg)' : 'none', transition: 'transform 0.4s ease' }}>🔄</span>
              <span className="btn-text-desktop">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="admin-content-area">
          {/* ══════════════════════════════════════════════════════════
              TAB 1: LIVE TELEMETRY
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div>
              {telemetryLoading ? (
                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>⏳</div>
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>Querying live database metrics from Supabase...</p>
                </div>
              ) : telemetryError ? (
                <div style={{ background: '#FEF2F2', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#DC2626', marginBottom: '8px' }}>
                    Database Telemetry Unavailable
                  </h3>
                  <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>
                    {telemetryError}
                  </p>
                  <button type="button" onClick={loadTelemetry} className="admin-btn admin-btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                    🔄 Retry Connection
                  </button>
                </div>
              ) : telemetry ? (
                <div>
                  {/* Metric Cards Grid */}
                  <div className="admin-metric-grid">
                    {/* Card 1: Students */}
                    <div className="admin-stat-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className="admin-stat-label">Registered Students</span>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                          👥
                        </div>
                      </div>
                      <div>
                        <div className="admin-stat-number">{telemetry.metrics.totalUsers.toLocaleString()}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="admin-badge admin-badge-pro" style={{ padding: '1px 6px', fontSize: '10px' }}>
                            {telemetry.metrics.proUsers} PRO
                          </span>
                          <span>·</span>
                          <span>{telemetry.metrics.freeUsers} Free</span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Focus Time */}
                    <div className="admin-stat-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className="admin-stat-label">Focus Time Recorded</span>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                          ⏱️
                        </div>
                      </div>
                      <div>
                        <div className="admin-stat-number" style={{ color: '#059669' }}>
                          {telemetry.metrics.focusTime.totalHours} <span style={{ fontSize: '16px', fontWeight: 600, color: '#64748B' }}>hrs</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                          {telemetry.metrics.focusTime.totalMinutes.toLocaleString()} total logged minutes
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Sessions */}
                    <div className="admin-stat-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className="admin-stat-label">Focus Sessions</span>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                          🎯
                        </div>
                      </div>
                      <div>
                        <div className="admin-stat-number">{telemetry.metrics.totalFocusSessions.toLocaleString()}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                          Pomodoro study intervals
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Study Rooms */}
                    <div className="admin-stat-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className="admin-stat-label">Live Study Rooms</span>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                          🎧
                        </div>
                      </div>
                      <div>
                        <div className="admin-stat-number" style={{ color: '#D97706' }}>
                          {telemetry.metrics.activeStudyRooms}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                          {telemetry.metrics.activeHabits} active user habits
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Registrations Table */}
                  <div className="admin-table-container" style={{ marginBottom: '28px' }}>
                    <div className="admin-table-header">
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                          Recent Student Registrations
                        </h3>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                          Live student profiles synced from Supabase database
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setActiveTab('students')}
                          className="admin-btn admin-btn-primary"
                          style={{ padding: '6px 14px', fontSize: '12px' }}
                        >
                          Manage All Students →
                        </button>
                      </div>
                    </div>

                    {telemetry.recentRegistrations.length === 0 ? (
                      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
                        No student profiles found in the database.
                      </div>
                    ) : (
                      <div className="admin-table-scroll-wrapper">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Student</th>
                              <th>Category</th>
                              <th>Progress</th>
                              <th>Subscription</th>
                              <th>Joined Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {telemetry.recentRegistrations.map((u) => {
                              const displayName = u.name?.trim() || 'Anonymous Student';
                              const initial = displayName.charAt(0).toUpperCase();
                              return (
                                <tr key={u.id}>
                                  <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: u.isPro ? '#EEF2FF' : '#F1F5F9',
                                        color: u.isPro ? '#5B5CF0' : '#475569',
                                        fontWeight: 700,
                                        fontSize: '13px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: u.isPro ? '1px solid rgba(91, 92, 240, 0.25)' : '1px solid #E2E8F0',
                                        flexShrink: 0,
                                      }}>
                                        {initial}
                                      </div>
                                      <div>
                                        <div style={{ fontWeight: 600, color: '#0F172A' }}>
                                          {displayName}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                                          ID: {u.id ? `${u.id.slice(0, 8)}...` : 'N/A'}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="admin-badge admin-badge-teal">
                                      {u.category || 'General'}
                                    </span>
                                  </td>
                                  <td>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                                      Lv. {u.level || 1}
                                    </span>
                                    <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '6px' }}>
                                      ({u.xp || 0} XP)
                                    </span>
                                  </td>
                                  <td>
                                    <span className={`admin-badge ${u.isPro ? 'admin-badge-pro' : 'admin-badge-free'}`}>
                                      {u.isPro ? '★ PRO' : 'FREE'}
                                    </span>
                                  </td>
                                  <td style={{ color: '#64748B', fontSize: '12px' }}>
                                    {u.registeredAt ? new Date(u.registeredAt).toLocaleDateString('en-IN', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    }) : 'Recent'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 2: STUDENT MANAGEMENT
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'students' && (
            <div>
              {studentActionFeedback && (
                <div style={{
                  padding: '12px 18px',
                  borderRadius: '10px',
                  marginBottom: '18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: studentActionFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                  border: `1px solid ${studentActionFeedback.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  color: studentActionFeedback.type === 'success' ? '#059669' : '#DC2626',
                }}>
                  {studentActionFeedback.message}
                </div>
              )}

              {/* Filter and Action Bar */}
              <div className="admin-card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flex: 1, minWidth: '280px' }}>
                  <input
                    type="text"
                    placeholder="Search students by name..."
                    value={studentSearch}
                    onChange={(e) => {
                      setStudentSearch(e.target.value);
                      setStudentPage(1);
                    }}
                    className="admin-input"
                    style={{ minWidth: '220px' }}
                  />

                  <select
                    value={studentPlanFilter}
                    onChange={(e) => {
                      setStudentPlanFilter(e.target.value);
                      setStudentPage(1);
                    }}
                    className="admin-select"
                  >
                    <option value="ALL">All Plans (PRO & Free)</option>
                    <option value="PRO">PRO Tier Only</option>
                    <option value="FREE">Free Tier Only</option>
                  </select>

                  <select
                    value={studentCategoryFilter}
                    onChange={(e) => {
                      setStudentCategoryFilter(e.target.value);
                      setStudentPage(1);
                    }}
                    className="admin-select"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="aspirant">Aspirant</option>
                    <option value="cse_student">CSE Student</option>
                    <option value="jee">JEE Aspirant</option>
                    <option value="neet">NEET Aspirant</option>
                    <option value="upsc">UPSC Aspirant</option>
                    <option value="general">General</option>
                  </select>

                  <button
                    type="button"
                    onClick={loadStudents}
                    className="admin-btn admin-btn-secondary"
                  >
                    🔄 Apply Filter
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="admin-btn admin-btn-secondary"
                    style={{ color: '#0D9488', borderColor: 'rgba(20, 184, 166, 0.3)' }}
                  >
                    📥 Export CSV
                  </button>
                </div>
              </div>

              {/* Students Table */}
              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0F172A' }}>
                    Active Student Accounts ({studentTotal.toLocaleString()})
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>
                    Page {studentPage} of {studentTotalPages}
                  </span>
                </div>

                {studentsLoading ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>⏳</div>
                    <p style={{ fontSize: '14px' }}>Loading real student records from Supabase...</p>
                  </div>
                ) : studentsError ? (
                  <div style={{ padding: '30px', textAlign: 'center', color: '#DC2626' }}>
                    <p style={{ marginBottom: '12px' }}>{studentsError}</p>
                    <button type="button" onClick={loadStudents} className="admin-btn admin-btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                      Retry
                    </button>
                  </div>
                ) : students.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B' }}>
                    <p style={{ fontSize: '14px' }}>No student profiles matched your filter criteria.</p>
                  </div>
                ) : (
                  <div className="admin-table-scroll-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Exam Category</th>
                          <th>Level & XP</th>
                          <th>Status</th>
                          <th>Registered</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((u) => {
                          const displayName = u.name?.trim() || 'Anonymous Student';
                          const initial = displayName.charAt(0).toUpperCase();
                          return (
                            <tr key={u.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: u.isPremium ? '#EEF2FF' : '#F1F5F9',
                                    color: u.isPremium ? '#5B5CF0' : '#475569',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 700, fontSize: '13px',
                                    border: u.isPremium ? '1px solid rgba(91, 92, 240, 0.25)' : '1px solid #E2E8F0',
                                    flexShrink: 0,
                                  }}>
                                    {initial}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{displayName}</div>
                                    <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                                      {u.id.slice(0, 8)}...
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <span className="admin-badge admin-badge-teal">
                                  {u.category}
                                </span>
                              </td>

                              <td style={{ color: '#475569' }}>
                                Lv. {u.level} · {u.xp} XP
                              </td>

                              <td>
                                <span className={`admin-badge ${u.isPremium ? 'admin-badge-pro' : 'admin-badge-free'}`}>
                                  {u.isPremium ? '★ PRO' : 'FREE'}
                                </span>
                              </td>

                              <td style={{ color: '#64748B', fontSize: '12px' }}>
                                {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                }) : '—'}
                              </td>

                              <td style={{ textAlign: 'right' }}>
                                <button
                                  type="button"
                                  onClick={() => setEntitlementModalUser(u)}
                                  className="admin-btn admin-btn-secondary"
                                  style={{ padding: '4px 10px', fontSize: '11px' }}
                                >
                                  {u.isPremium ? 'Revoke PRO' : 'Grant PRO'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pagination */}
                {studentTotalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderTop: '1px solid #E2E8F0' }}>
                    <button
                      type="button"
                      disabled={studentPage <= 1 || studentsLoading}
                      onClick={() => setStudentPage((p) => Math.max(1, p - 1))}
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      ← Previous
                    </button>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      Page {studentPage} of {studentTotalPages}
                    </span>
                    <button
                      type="button"
                      disabled={studentPage >= studentTotalPages || studentsLoading}
                      onClick={() => setStudentPage((p) => Math.min(studentTotalPages, p + 1))}
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

              {/* Entitlement Confirmation Modal */}
              {entitlementModalUser && (
                <div style={{
                  position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
                }}>
                  <div className="admin-card" style={{ maxWidth: '480px', width: '100%', padding: '28px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 12px 0', color: '#0F172A' }}>
                      {entitlementModalUser.isPremium ? 'Revoke PRO Entitlement?' : 'Grant PRO Entitlement?'}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                      You are changing the subscription entitlement for student: <strong style={{ color: '#0F172A' }}>{entitlementModalUser.name || 'Anonymous Student'}</strong>.
                    </p>
                    <div style={{
                      background: '#F8FAFC', border: '1px solid #E2E8F0',
                      borderRadius: '8px', padding: '12px', fontSize: '12px', color: '#64748B', marginBottom: '20px',
                    }}>
                      This action will update <code style={{ color: '#5B5CF0' }}>profiles.is_premium = {!entitlementModalUser.isPremium ? 'true' : 'false'}</code> in the database.
                      The mobile app will immediately reflect this entitlement.
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button
                        type="button"
                        disabled={entitlementMutating}
                        onClick={() => setEntitlementModalUser(null)}
                        className="admin-btn admin-btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={entitlementMutating}
                        onClick={handleConfirmEntitlement}
                        className={`admin-btn ${entitlementModalUser.isPremium ? 'admin-btn-danger' : 'admin-btn-primary'}`}
                      >
                        {entitlementMutating ? 'Verifying with DB...' : entitlementModalUser.isPremium ? 'Confirm Revoke' : 'Confirm Grant'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 3: STUDY ROOMS
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'rooms' && (
            <div>
              {roomActionFeedback && (
                <div style={{
                  padding: '12px 18px',
                  borderRadius: '10px',
                  marginBottom: '18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: roomActionFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                  border: `1px solid ${roomActionFeedback.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  color: roomActionFeedback.type === 'success' ? '#059669' : '#DC2626',
                }}>
                  {roomActionFeedback.message}
                </div>
              )}

              {/* Filter and Action Bar */}
              <div className="admin-card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flex: 1, minWidth: '280px' }}>
                  <input
                    type="text"
                    placeholder="Search by room name or subject..."
                    value={roomSearch}
                    onChange={(e) => {
                      setRoomSearch(e.target.value);
                      setRoomPage(1);
                    }}
                    className="admin-input"
                    style={{ minWidth: '240px' }}
                  />

                  <select
                    value={roomStatusFilter}
                    onChange={(e) => {
                      setRoomStatusFilter(e.target.value);
                      setRoomPage(1);
                    }}
                    className="admin-select"
                  >
                    <option value="ALL">All Rooms</option>
                    <option value="ACTIVE">Active Rooms Only</option>
                    <option value="INACTIVE">Inactive / Closed</option>
                  </select>

                  <button
                    type="button"
                    onClick={loadRooms}
                    className="admin-btn admin-btn-secondary"
                  >
                    🔄 Apply Filter
                  </button>
                </div>
              </div>

              {/* Rooms Table */}
              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0F172A' }}>
                    Study Rooms ({roomTotal.toLocaleString()})
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>
                    Page {roomPage} of {roomTotalPages}
                  </span>
                </div>

                {roomsLoading ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>⏳</div>
                    <p style={{ fontSize: '14px' }}>Loading real study rooms from Supabase...</p>
                  </div>
                ) : roomsError ? (
                  <div style={{ padding: '30px', textAlign: 'center', color: '#DC2626' }}>
                    <p style={{ marginBottom: '12px' }}>{roomsError}</p>
                    <button type="button" onClick={loadRooms} className="admin-btn admin-btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                      Retry
                    </button>
                  </div>
                ) : rooms.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B' }}>
                    <p style={{ fontSize: '14px' }}>No study rooms matched your filter criteria.</p>
                  </div>
                ) : (
                  <div className="admin-table-scroll-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Room Title</th>
                          <th>Host</th>
                          <th>Category</th>
                          <th>Participants</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rooms.map((r) => (
                          <tr key={r.id}>
                            <td>
                              <div style={{ fontWeight: 600, color: '#0F172A' }}>{r.name}</div>
                              <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                                ID: {r.id.slice(0, 8)}...
                              </div>
                            </td>

                            <td style={{ color: '#475569' }}>
                              {r.hostName || 'Anonymous Host'}
                            </td>

                            <td>
                              <span className="admin-badge admin-badge-teal">
                                {r.subject || 'General Study'}
                              </span>
                            </td>

                            <td style={{ color: '#475569', fontWeight: 600 }}>
                              👥 {r.participantsCount ?? r.memberCount ?? 1}
                            </td>

                            <td>
                              {r.isActive ? (
                                <span className="admin-badge admin-badge-emerald">
                                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981' }}></span>
                                  LIVE
                                </span>
                              ) : (
                                <span className="admin-badge admin-badge-free">
                                  CLOSED
                                </span>
                              )}
                            </td>

                            <td style={{ color: '#64748B', fontSize: '12px' }}>
                              {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }) : '—'}
                            </td>

                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '6px' }}>
                                <button
                                  type="button"
                                  onClick={() => handleViewRoomDetails(r.id)}
                                  className="admin-btn admin-btn-secondary"
                                  style={{ padding: '4px 10px', fontSize: '11px' }}
                                >
                                  Details
                                </button>
                                {r.isActive ? (
                                  <button
                                    type="button"
                                    onClick={() => setCloseRoomModal(r)}
                                    className="admin-btn admin-btn-danger"
                                    style={{ padding: '4px 10px', fontSize: '11px' }}
                                  >
                                    Terminate
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleReactivateRoom(r)}
                                    className="admin-btn admin-btn-secondary"
                                    style={{ padding: '4px 10px', fontSize: '11px', color: '#059669', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                                  >
                                    Reactivate
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Rooms Pagination Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>
                        Showing page {roomPage} of {roomTotalPages} ({roomTotal.toLocaleString()} total)
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          disabled={roomPage <= 1}
                          onClick={() => setRoomPage((p) => Math.max(1, p - 1))}
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                        >
                          ← Previous
                        </button>
                        <button
                          type="button"
                          disabled={roomPage >= roomTotalPages}
                          onClick={() => setRoomPage((p) => Math.min(roomTotalPages, p + 1))}
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Room Confirmation Modal */}
              {closeRoomModal && (
                <div style={{
                  position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
                }}>
                  <div className="admin-card" style={{ maxWidth: '480px', width: '100%', padding: '28px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 12px 0', color: '#DC2626' }}>
                      Terminate Live Study Room?
                    </h3>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                      You are about to terminate room: <strong style={{ color: '#0F172A' }}>{closeRoomModal.name}</strong>.
                      This will disconnect all active participants.
                    </p>
                    <div style={{
                      background: '#FEF2F2', border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '8px', padding: '12px', fontSize: '12px', color: '#DC2626', marginBottom: '20px',
                    }}>
                      This sets <code style={{ color: '#B91C1C' }}>study_rooms.is_active = false</code> and archives room state.
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button
                        type="button"
                        disabled={roomMutating}
                        onClick={() => setCloseRoomModal(null)}
                        className="admin-btn admin-btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={roomMutating}
                        onClick={handleConfirmCloseRoom}
                        className="admin-btn admin-btn-danger"
                      >
                        {roomMutating ? 'Terminating...' : 'Confirm Terminate'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Room Details Modal */}
              {selectedRoomDetails && (
                <div style={{
                  position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
                }}>
                  <div className="admin-card" style={{ maxWidth: '520px', width: '100%', padding: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <span className={`admin-badge ${selectedRoomDetails.isActive ? 'admin-badge-emerald' : 'admin-badge-free'}`} style={{ marginBottom: '8px' }}>
                          {selectedRoomDetails.isActive ? 'LIVE ROOM' : 'CLOSED ROOM'}
                        </span>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '4px 0', color: '#0F172A' }}>
                          {selectedRoomDetails.name}
                        </h3>
                        <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                          ID: {selectedRoomDetails.id}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedRoomDetails(null)}
                        style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94A3B8' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', marginBottom: '20px' }}>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Subject</div>
                        <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedRoomDetails.subject || 'General Study'}</div>
                      </div>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Host</div>
                        <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedRoomDetails.hostName || 'Anonymous'}</div>
                      </div>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Room Type & Timer</div>
                        <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedRoomDetails.roomType} ({selectedRoomDetails.timerMinutes}m)</div>
                      </div>
                      <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Chat Messages</div>
                        <div style={{ fontWeight: 700, color: '#5B5CF0', marginTop: '2px' }}>💬 {selectedRoomDetails.messageCount ?? 0} messages</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedRoomDetails(null)}
                        className="admin-btn admin-btn-secondary"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 4: REMOTE APP ANNOUNCEMENTS
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'announcements' && (
            <div>
              {announcementActionFeedback && (
                <div style={{
                  padding: '12px 18px',
                  borderRadius: '10px',
                  marginBottom: '18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: announcementActionFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                  border: `1px solid ${announcementActionFeedback.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  color: announcementActionFeedback.type === 'success' ? '#059669' : '#DC2626',
                }}>
                  {announcementActionFeedback.message}
                </div>
              )}

              {/* Action and Filter Bar */}
              <div className="admin-card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flex: 1, minWidth: '280px' }}>
                  <select
                    value={announcementStatusFilter}
                    onChange={(e) => {
                      setAnnouncementStatusFilter(e.target.value);
                      setAnnouncementPage(1);
                    }}
                    className="admin-select"
                  >
                    <option value="ALL">All Announcements</option>
                    <option value="ACTIVE">Active Announcements</option>
                    <option value="INACTIVE">Archived / Inactive</option>
                  </select>

                  <button
                    type="button"
                    onClick={loadAnnouncements}
                    className="admin-btn admin-btn-secondary"
                  >
                    🔄 Refresh
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => handleOpenAnnouncementModal()}
                    className="admin-btn admin-btn-primary"
                  >
                    + Create Announcement
                  </button>
                </div>
              </div>

              {/* Announcements Table */}
              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0F172A' }}>
                    Remote In-App Announcements ({announcementTotal.toLocaleString()})
                  </h3>
                </div>

                {announcementsLoading ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>⏳</div>
                    <p style={{ fontSize: '14px' }}>Loading announcements from Supabase...</p>
                  </div>
                ) : announcementsError ? (
                  <div style={{ padding: '30px', textAlign: 'center', color: '#DC2626' }}>
                    <p style={{ marginBottom: '12px' }}>{announcementsError}</p>
                    <button type="button" onClick={loadAnnouncements} className="admin-btn admin-btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                      Retry
                    </button>
                  </div>
                ) : announcements.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B' }}>
                    <p style={{ fontSize: '14px' }}>No announcements created yet. Click &ldquo;+ Create Announcement&rdquo; to broadcast to mobile users.</p>
                  </div>
                ) : (
                  <div className="admin-table-scroll-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Title & Message</th>
                          <th>Severity</th>
                          <th>Target</th>
                          <th>Status</th>
                          <th>Expires</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {announcements.map((a) => (
                          <tr key={a.id}>
                            <td>
                              <div style={{ fontWeight: 600, color: '#0F172A' }}>{a.title}</div>
                              <div style={{ fontSize: '12px', color: '#64748B', maxWidth: '360px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {a.message}
                              </div>
                            </td>

                            <td>
                              <span className={`admin-badge ${
                                a.severity === 'critical' ? 'admin-badge-rose' :
                                a.severity === 'warning' ? 'admin-badge-amber' : 'admin-badge-teal'
                              }`}>
                                {a.severity?.toUpperCase() || 'INFO'}
                              </span>
                            </td>

                            <td style={{ color: '#475569' }}>
                              {a.targetCategory === 'all' ? 'All Students' : a.targetCategory}
                            </td>

                            <td>
                              <span className={`admin-badge ${a.isActive ? 'admin-badge-emerald' : 'admin-badge-free'}`}>
                                {a.isActive ? 'ACTIVE' : 'INACTIVE'}
                              </span>
                            </td>

                            <td style={{ color: '#64748B', fontSize: '12px' }}>
                              {a.expiresAt ? new Date(a.expiresAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }) : 'Never'}
                            </td>

                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <button
                                  type="button"
                                  onClick={() => handleOpenAnnouncementModal(a)}
                                  className="admin-btn admin-btn-secondary"
                                  style={{ padding: '4px 8px', fontSize: '11px' }}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingAnnouncement(a)}
                                  className="admin-btn admin-btn-danger"
                                  style={{ padding: '4px 8px', fontSize: '11px' }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Announcements Pagination Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>
                        Showing page {announcementPage} of {announcementTotalPages} ({announcementTotal.toLocaleString()} total)
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          disabled={announcementPage <= 1}
                          onClick={() => setAnnouncementPage((p) => Math.max(1, p - 1))}
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                        >
                          ← Previous
                        </button>
                        <button
                          type="button"
                          disabled={announcementPage >= announcementTotalPages}
                          onClick={() => setAnnouncementPage((p) => Math.min(announcementTotalPages, p + 1))}
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Create / Edit Announcement Modal */}
              {announcementModalOpen && (
                <div style={{
                  position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
                }}>
                  <div className="admin-card" style={{ maxWidth: '520px', width: '100%', padding: '28px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 16px 0', color: '#0F172A' }}>
                      {editingAnnouncement ? 'Edit Announcement' : 'Create In-App Announcement'}
                    </h3>

                    <form onSubmit={handleSaveAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Announcement Title
                        </label>
                        <input
                          type="text"
                          required
                          value={announcementForm.title}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                          className="admin-input"
                          style={{ width: '100%' }}
                          placeholder="e.g. Scheduled Maintenance"
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Message Body
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={announcementForm.message}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                          className="admin-input"
                          style={{ width: '100%', resize: 'vertical' }}
                          placeholder="Details to be shown to mobile users..."
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                            Severity Level
                          </label>
                          <select
                            value={announcementForm.severity}
                            onChange={(e) => setAnnouncementForm({ ...announcementForm, severity: e.target.value })}
                            className="admin-select"
                            style={{ width: '100%' }}
                          >
                            <option value="info">Info (Blue/Teal)</option>
                            <option value="warning">Warning (Amber)</option>
                            <option value="critical">Critical (Rose)</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                            Target Audience
                          </label>
                          <select
                            value={announcementForm.target_category}
                            onChange={(e) => setAnnouncementForm({ ...announcementForm, target_category: e.target.value })}
                            className="admin-select"
                            style={{ width: '100%' }}
                          >
                            <option value="all">All Students</option>
                            <option value="jee">JEE Aspirants</option>
                            <option value="neet">NEET Aspirants</option>
                            <option value="upsc">UPSC Aspirants</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <input
                          type="checkbox"
                          id="announcement-active-check"
                          checked={announcementForm.is_active}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, is_active: e.target.checked })}
                          style={{ cursor: 'pointer' }}
                        />
                        <label htmlFor="announcement-active-check" style={{ fontSize: '13px', color: '#0F172A', cursor: 'pointer' }}>
                          Active immediately on save
                        </label>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                        <button
                          type="button"
                          onClick={() => setAnnouncementModalOpen(false)}
                          className="admin-btn admin-btn-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={announcementMutating}
                          className="admin-btn admin-btn-primary"
                        >
                          {announcementMutating ? 'Saving to DB...' : 'Save Announcement'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Delete Confirmation Modal */}
              {deletingAnnouncement && (
                <div style={{
                  position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
                }}>
                  <div className="admin-card" style={{ maxWidth: '440px', width: '100%', padding: '28px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 12px 0', color: '#DC2626' }}>
                      Delete Announcement?
                    </h3>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                      Are you sure you want to permanently delete: <strong style={{ color: '#0F172A' }}>{deletingAnnouncement.title}</strong>?
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button
                        type="button"
                        disabled={deleteMutating}
                        onClick={() => setDeletingAnnouncement(null)}
                        className="admin-btn admin-btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={deleteMutating}
                        onClick={handleDeleteAnnouncement}
                        className="admin-btn admin-btn-danger"
                      >
                        {deleteMutating ? 'Deleting...' : 'Confirm Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 5: AUDIT TRAIL
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'audit' && (
            <div>
              {auditLoading ? (
                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>⏳</div>
                  <p style={{ fontSize: '14px' }}>Loading audit records...</p>
                </div>
              ) : (
                <div>
                  <div className="admin-card" style={{ marginBottom: '24px', borderLeft: '4px solid #10B981' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '18px' }}>🛡️</span>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#0F172A' }}>
                        Administrative Audit Trail Active
                      </h3>
                    </div>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                      Every sensitive administrative mutation (PRO grants, study room terminations, announcements, and Google logins) is immutably recorded with administrator email, timestamp, IP address, and target identifier.
                    </p>
                  </div>

                  <div className="admin-table-container">
                    <div className="admin-table-header">
                      <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0F172A' }}>
                        Session Activity Log
                      </h3>
                      <button type="button" onClick={loadAudit} className="admin-btn admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                        🔄 Refresh
                      </button>
                    </div>

                    {sessionAuditActions.length === 0 ? (
                      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
                        No privileged actions performed in this browser session yet. Actions like Pro grant/revoke and room closure will be recorded here and in server logs.
                      </div>
                    ) : (
                      <div className="admin-table-scroll-wrapper">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Time</th>
                              <th>Action</th>
                              <th>Target</th>
                              <th>Verification Detail</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sessionAuditActions.map((log, idx) => (
                              <tr key={idx}>
                                <td style={{ color: '#64748B', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                                  {log.timestamp}
                                </td>
                                <td>
                                  <span className="admin-badge admin-badge-teal">
                                    {log.action}
                                  </span>
                                </td>
                                <td style={{ fontWeight: 600, color: '#0F172A' }}>
                                  {log.target}
                                </td>
                                <td style={{ color: '#475569', fontSize: '12px' }}>
                                  {log.detail}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 6: SYSTEM & SECURITY
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'system' && (
            <div>
              <div className="admin-metric-grid" style={{ marginBottom: '28px' }}>
                <div className="admin-card">
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Route Protection</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', margin: '6px 0' }}>Server Proxy Guard</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Enforced via Next.js Proxy boundary</div>
                </div>

                <div className="admin-card">
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Authentication</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#5B5CF0', margin: '6px 0' }}>HMAC Session Cookie</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>HttpOnly, SameSite=Lax, 8h expiry</div>
                </div>

                <div className="admin-card">
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Search Indexing</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '6px 0' }}>noindex, nofollow</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Excluded in robots.txt & layout metadata</div>
                </div>

                <div className="admin-card">
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Rate Limiting</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#D97706', margin: '6px 0' }}>Dual-Key Sliding Window</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>5 attempts / 15m lockout on IP & Email</div>
                </div>
              </div>

              <div className="admin-card">
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: '#0F172A' }}>
                  Zero-Trust Architecture Standards
                </h3>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>
                  The Basecamp operations console is protected by defense-in-depth security principles:
                </p>
                <ul style={{ fontSize: '13px', color: '#64748B', paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Privileged secrets are strictly server-side and never returned to the browser or client bundles.</li>
                  <li>All admin mutations strictly validate UUIDs and request bodies on the server.</li>
                  <li>Bearer header fallback has been eliminated from browser-facing admin APIs.</li>
                  <li>Every privileged mutation performs a write-and-verify confirmation loop directly with Supabase.</li>
                </ul>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 7: DATABASE SCHEMAS
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'database' && (
            <div className="admin-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Supabase Project: zvfeafmixnevqbelxnqp
                </h3>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
                The admin panel connects to the mobile app PostgreSQL database using a server-side client initialized with the Supabase Service Role Key.
              </p>

              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px', color: '#0F172A' }}>Active Relational Tables:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', fontSize: '13px', color: '#475569' }}>
                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <strong style={{ color: '#0F172A' }}>public.profiles</strong>: Student names, categories, XP, levels, and Pro tier (<code style={{ color: '#5B5CF0' }}>is_premium</code>).
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <strong style={{ color: '#0F172A' }}>public.study_rooms</strong>: Synchronous rooms, hosts, timers, and active status (<code style={{ color: '#5B5CF0' }}>is_active</code>).
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <strong style={{ color: '#0F172A' }}>public.room_messages</strong>: Live chat messages associated with study rooms.
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <strong style={{ color: '#0F172A' }}>public.focus_sessions</strong>: Pomodoro tracking, duration, and completed intervals.
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <strong style={{ color: '#0F172A' }}>public.habits & habit_logs</strong>: Habit templates, streaks, and completions.
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 8: SITE BROADCASTER
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'broadcaster' && (
            <div className="admin-card">
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#0F172A' }}>
                Website Announcement Broadcaster
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '20px' }}>
                Broadcast a live announcement banner across the top of the LifeTrack Pro public website.
              </p>

              {/* Live Preview Box */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '8px' }}>
                  Live Preview on Public Website:
                </label>
                <div style={{
                  background: 'linear-gradient(90deg, #5B5CF0, #7C3AED)',
                  color: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(91, 92, 240, 0.2)',
                }}>
                  <span>📢</span>
                  <span>{bannerText || 'No announcement currently broadcasting.'}</span>
                </div>
              </div>

              <textarea
                rows={3}
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder="Enter announcement text..."
                className="admin-input"
                style={{ width: '100%', marginBottom: '16px' }}
              />

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button type="button" className="admin-btn admin-btn-primary" onClick={handlePublishBanner}>
                  Save Announcement
                </button>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={handleClearBanner}>
                  Clear
                </button>
                {bannerSaved && (
                  <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
                    ✓ Saved successfully
                  </span>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
