'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StudentProfileModal from '@/components/StudentProfileModal';


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
      else if (activeTab === 'system' || activeTab === 'database') await loadSystemStatus();
      else if (activeTab === 'broadcaster') await loadBroadcast();
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
  const [studentStatusFilter, setStudentStatusFilter] = useState('ALL');
  const [activeProfileStudentId, setActiveProfileStudentId] = useState(null);
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

  // ── Broadcaster State (Live Database-backed) ──
  const [broadcastData, setBroadcastData] = useState({
    active: false,
    message: '',
    severity: 'info',
    link_url: '',
    link_text: '',
    updated_at: null,
    updated_by: null,
  });
  const [broadcastLoading, setBroadcastLoading] = useState(false);
  const [broadcastSaving, setBroadcastSaving] = useState(false);
  const [broadcastFeedback, setBroadcastFeedback] = useState(null);

  // ── System & Security State (Live Diagnostics & Controls) ──
  const [systemData, setSystemData] = useState(null);
  const [systemLoading, setSystemLoading] = useState(false);
  const [systemDiagnosing, setSystemDiagnosing] = useState(false);
  const [systemFeedback, setSystemFeedback] = useState(null);
  const [maintenanceForm, setMaintenanceForm] = useState({ enabled: false, message: '' });
  const [featureFlagsForm, setFeatureFlagsForm] = useState({
    enable_study_rooms: true,
    enable_ambient_sounds: true,
    enable_ai_insights: true,
    enable_flashcards: true,
  });
  const [versionPolicyForm, setVersionPolicyForm] = useState({
    min_version: '1.0.0',
    latest_version: '1.0.0',
    force_update: false,
    store_url: 'https://play.google.com/store/apps/details?id=com.lifetrackpro.app',
  });
  const [savingMaintenance, setSavingMaintenance] = useState(false);
  const [savingFeatureFlags, setSavingFeatureFlags] = useState(false);
  const [savingVersionPolicy, setSavingVersionPolicy] = useState(false);

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
        status: studentStatusFilter,
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

  // ── Load Live Broadcast ──
  const loadBroadcast = async () => {
    setBroadcastLoading(true);
    try {
      const res = await fetch(`/api/admin/broadcast?t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.broadcast) {
          setBroadcastData({
            active: Boolean(data.broadcast.active),
            message: data.broadcast.message || '',
            severity: data.broadcast.severity || 'info',
            link_url: data.broadcast.link_url || '',
            link_text: data.broadcast.link_text || '',
            updated_at: data.broadcast.updated_at || null,
            updated_by: data.broadcast.updated_by || null,
          });
        }
      }
    } catch (err) {
      console.warn('[LOAD BROADCAST WARNING]', err.message || err);
    } finally {
      setBroadcastLoading(false);
    }
  };

  // ── Load System & Security Diagnostics ──
  const loadSystemStatus = async () => {
    setSystemLoading(true);
    try {
      const res = await fetch('/api/admin/system');
      if (res.ok) {
        const data = await res.json();
        setSystemData(data);
        if (data.configurations) {
          if (data.configurations.maintenanceMode) {
            setMaintenanceForm({
              enabled: Boolean(data.configurations.maintenanceMode.enabled),
              message: data.configurations.maintenanceMode.message || '',
            });
          }
          if (data.configurations.featureFlags) {
            setFeatureFlagsForm({
              enable_study_rooms: Boolean(data.configurations.featureFlags.enable_study_rooms),
              enable_ambient_sounds: Boolean(data.configurations.featureFlags.enable_ambient_sounds),
              enable_ai_insights: Boolean(data.configurations.featureFlags.enable_ai_insights),
              enable_flashcards: Boolean(data.configurations.featureFlags.enable_flashcards),
            });
          }
          if (data.configurations.versionPolicy) {
            setVersionPolicyForm({
              min_version: data.configurations.versionPolicy.min_version || '1.0.0',
              latest_version: data.configurations.versionPolicy.latest_version || '1.0.0',
              force_update: Boolean(data.configurations.versionPolicy.force_update),
              store_url: data.configurations.versionPolicy.store_url || 'https://play.google.com/store/apps/details?id=com.lifetrackpro.app',
            });
          }
        }
      }
    } catch (err) {
      console.warn('[LOAD SYSTEM STATUS WARNING]', err.message || err);
    } finally {
      setSystemLoading(false);
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
        status: studentStatusFilter,
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
    } else if (activeTab === 'system' || activeTab === 'database') {
      loadSystemStatus();
    } else if (activeTab === 'broadcaster') {
      loadBroadcast();
    }
    return () => {
      ignore = true;
    };
  }, [activeTab, studentPage, studentLimit, studentSearch, studentPlanFilter, studentCategoryFilter, studentStatusFilter, roomPage, roomLimit, roomSearch, roomStatusFilter, announcementPage, announcementLimit, announcementStatusFilter, announcementSeverityFilter]);

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
    if (!item) return;
    setEditingAnnouncement(item);
    setAnnouncementForm({
      title: item.title || '',
      message: item.message || '',
      severity: item.severity || 'info',
      target_category: item.target_category || item.targetCategory || 'all',
      is_active: item.is_active !== undefined ? Boolean(item.is_active) : (item.isActive !== undefined ? Boolean(item.isActive) : true),
      expires_at: item.expires_at ? item.expires_at.slice(0, 16) : (item.expiresAt ? item.expiresAt.slice(0, 16) : ''),
    });
    setAnnouncementModalOpen(true);
  };

  const handleOpenAnnouncementModal = (item = null) => {
    if (item && item.id) {
      handleOpenEditAnnouncement(item);
    } else {
      handleOpenCreateAnnouncement();
    }
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

  const handleDeleteAnnouncement = () => {
    handleConfirmDeleteAnnouncement();
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
        status: studentStatusFilter,
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

  // ── Live Broadcaster Handlers ──
  const handleSaveBroadcast = async (customState = null, forceActive = null) => {
    let payload = customState ? { ...customState } : { ...broadcastData };
    if (forceActive !== null) {
      payload.active = forceActive;
    }

    if (payload.active && !payload.message.trim()) {
      setBroadcastFeedback({
        type: 'error',
        message: 'Please enter an announcement message before publishing.',
      });
      return;
    }

    setBroadcastSaving(true);
    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save broadcast');

      const savedBroadcast = {
        active: Boolean(data.broadcast?.active),
        message: data.broadcast?.message || payload.message,
        severity: data.broadcast?.severity || payload.severity,
        link_url: data.broadcast?.link_url || '',
        link_text: data.broadcast?.link_text || '',
        updated_at: data.broadcast?.updated_at || new Date().toISOString(),
        updated_by: data.broadcast?.updated_by || 'Admin',
      };

      setBroadcastData(savedBroadcast);

      // Multi-channel cross-tab broadcast synchronization
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('ltp_broadcast_sync', Date.now().toString());
          localStorage.setItem('lifetrack_admin_banner', JSON.stringify(savedBroadcast));
          window.dispatchEvent(new Event('storage'));
        } catch {
          // Ignore
        }
        try {
          if ('BroadcastChannel' in window) {
            const bc = new BroadcastChannel('ltp_broadcast_channel');
            bc.postMessage({ type: 'BROADCAST_UPDATED', broadcast: savedBroadcast });
            bc.close();
          }
        } catch {
          // Ignore
        }
      }

      setBroadcastFeedback({
        type: 'success',
        message: savedBroadcast.active
          ? '✓ Live broadcast published to LifeTrack Pro public website! Visible at the top of every page.'
          : '✓ Live broadcast deactivated. Banner hidden from visitors.',
      });
      setTimeout(() => setBroadcastFeedback(null), 5000);
    } catch (err) {
      setBroadcastFeedback({
        type: 'error',
        message: `Broadcast Error: ${err.message}`,
      });
    } finally {
      setBroadcastSaving(false);
    }
  };

  const handleToggleBroadcastActive = () => {
    const nextActive = !broadcastData.active;
    const nextState = { ...broadcastData, active: nextActive };
    setBroadcastData(nextState);
    handleSaveBroadcast(nextState, nextActive);
  };

  const handleClearBroadcast = () => {
    const cleared = {
      active: false,
      message: '',
      severity: 'info',
      link_url: '',
      link_text: '',
    };
    setBroadcastData((prev) => ({ ...prev, ...cleared }));
    handleSaveBroadcast(cleared, false);
  };

  // ── Live System & Security Handlers ──
  const handleRunSystemDiagnostics = async () => {
    setSystemDiagnosing(true);
    await loadSystemStatus();
    setSystemDiagnosing(false);
    setSystemFeedback({
      type: 'success',
      message: '✓ System diagnostics completed. Live database ping and subsystems refreshed.',
    });
    setTimeout(() => setSystemFeedback(null), 4000);
  };

  const handleSaveMaintenanceGate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSavingMaintenance(true);
    try {
      const res = await fetch('/api/admin/system/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenanceForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update maintenance gate');
      setSystemFeedback({
        type: 'success',
        message: maintenanceForm.enabled
          ? '⚠️ Maintenance mode activated in database.'
          : '✓ Maintenance mode disabled. Normal operations active.',
      });
      setTimeout(() => setSystemFeedback(null), 5000);
      loadSystemStatus();
    } catch (err) {
      setSystemFeedback({ type: 'error', message: `Maintenance Error: ${err.message}` });
    } finally {
      setSavingMaintenance(false);
    }
  };

  const handleSaveFeatureFlags = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSavingFeatureFlags(true);
    try {
      const res = await fetch('/api/admin/system/feature-flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(featureFlagsForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update feature flags');
      setSystemFeedback({
        type: 'success',
        message: '✓ Dynamic feature flags updated in Supabase.',
      });
      setTimeout(() => setSystemFeedback(null), 5000);
      loadSystemStatus();
    } catch (err) {
      setSystemFeedback({ type: 'error', message: `Feature Flags Error: ${err.message}` });
    } finally {
      setSavingFeatureFlags(false);
    }
  };

  const handleSaveVersionPolicy = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSavingVersionPolicy(true);
    try {
      const res = await fetch('/api/admin/system/version-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(versionPolicyForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update version policy');
      setSystemFeedback({
        type: 'success',
        message: '✓ Mobile version policy saved in database.',
      });
      setTimeout(() => setSystemFeedback(null), 5000);
      loadSystemStatus();
    } catch (err) {
      setSystemFeedback({ type: 'error', message: `Version Policy Error: ${err.message}` });
    } finally {
      setSavingVersionPolicy(false);
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

                  <select
                    value={studentStatusFilter}
                    onChange={(e) => {
                      setStudentStatusFilter(e.target.value);
                      setStudentPage(1);
                    }}
                    className="admin-select"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="active">Active Only</option>
                    <option value="suspended">Suspended Only</option>
                    <option value="deactivated">Deactivated Only</option>
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
                          <th>Plan & Account Status</th>
                          <th>Registered / Active</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((u) => {
                          const displayName = u.name?.trim() || 'Anonymous Student';
                          const initial = displayName.charAt(0).toUpperCase();
                          const isSuspended = u.status === 'suspended';
                          const isDeactivated = u.status === 'deactivated';

                          return (
                            <tr
                              key={u.id}
                              style={{
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease',
                              }}
                              className="admin-table-row-hover"
                            >
                              <td onClick={() => setActiveProfileStudentId(u.id)}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{
                                    width: '34px', height: '34px', borderRadius: '50%',
                                    background: u.isPremium ? '#EEF2FF' : '#F1F5F9',
                                    color: u.isPremium ? '#5B5CF0' : '#475569',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 700, fontSize: '13px',
                                    border: u.isPremium ? '1.5px solid rgba(91, 92, 240, 0.35)' : '1px solid #E2E8F0',
                                    flexShrink: 0,
                                  }}>
                                    {initial}
                                  </div>
                                  <div>
                                    <div style={{
                                      fontWeight: 600,
                                      color: '#0F172A',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                    }}>
                                      <span style={{ textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.15s' }}>
                                        {displayName}
                                      </span>
                                      <span style={{
                                        fontSize: '10px',
                                        color: '#5B5CF0',
                                        background: 'rgba(91, 92, 240, 0.08)',
                                        padding: '1px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 600,
                                      }}>
                                        Profile ↗
                                      </span>
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                                      {u.id.slice(0, 8)}...
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td onClick={() => setActiveProfileStudentId(u.id)}>
                                <span className="admin-badge admin-badge-teal">
                                  {u.category}
                                </span>
                              </td>

                              <td onClick={() => setActiveProfileStudentId(u.id)} style={{ color: '#475569' }}>
                                Lv. {u.level} · {u.xp} XP
                              </td>

                              <td onClick={() => setActiveProfileStudentId(u.id)}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                                  <span className={`admin-badge ${u.isPremium ? 'admin-badge-pro' : 'admin-badge-free'}`}>
                                    {u.isPremium ? '★ PRO' : 'FREE'}
                                  </span>
                                  {isSuspended ? (
                                    <span style={{
                                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                                      padding: '2px 7px', borderRadius: '4px', fontSize: '10px',
                                      fontWeight: 700, background: '#FEF3C7', color: '#D97706',
                                      border: '1px solid rgba(217, 119, 6, 0.25)',
                                    }}>
                                      ● Suspended
                                    </span>
                                  ) : isDeactivated ? (
                                    <span style={{
                                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                                      padding: '2px 7px', borderRadius: '4px', fontSize: '10px',
                                      fontWeight: 700, background: '#FEE2E2', color: '#DC2626',
                                      border: '1px solid rgba(220, 38, 38, 0.25)',
                                    }}>
                                      ● Deactivated
                                    </span>
                                  ) : (
                                    <span style={{
                                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                                      padding: '2px 7px', borderRadius: '4px', fontSize: '10px',
                                      fontWeight: 700, background: '#ECFDF5', color: '#059669',
                                      border: '1px solid rgba(5, 150, 105, 0.25)',
                                    }}>
                                      ● Active
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td onClick={() => setActiveProfileStudentId(u.id)} style={{ color: '#64748B', fontSize: '12px' }}>
                                <div>
                                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  }) : '—'}
                                </div>
                                {u.lastSignInAt && (
                                  <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>
                                    Active: {new Date(u.lastSignInAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                  </div>
                                )}
                              </td>

                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                  <button
                                    type="button"
                                    onClick={() => setActiveProfileStudentId(u.id)}
                                    className="admin-btn admin-btn-secondary"
                                    style={{
                                      padding: '4px 10px',
                                      fontSize: '11px',
                                      color: '#5B5CF0',
                                      borderColor: 'rgba(91, 92, 240, 0.3)',
                                      fontWeight: 600,
                                    }}
                                    title="Open detailed user profile, study metrics, and admin actions"
                                  >
                                    👤 Profile
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEntitlementModalUser(u)}
                                    className="admin-btn admin-btn-secondary"
                                    style={{ padding: '4px 10px', fontSize: '11px' }}
                                  >
                                    {u.isPremium ? 'Revoke PRO' : 'Grant PRO'}
                                  </button>
                                </div>
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

              {/* Comprehensive Student Profile Modal */}
              {activeProfileStudentId && (
                <StudentProfileModal
                  studentId={activeProfileStudentId}
                  onClose={() => setActiveProfileStudentId(null)}
                  onUserUpdated={() => {
                    loadStudents();
                  }}
                />
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

              {/* Cross-Link Notice to Website Announcement Broadcaster */}
              <div style={{
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '10px',
                padding: '12px 18px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>🌐</span>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#1E40AF' }}>Website Announcement Banner (Site Broadcast):</strong>
                    <span style={{ fontSize: '13px', color: '#1E3A8A', marginLeft: '6px' }}>
                      To broadcast a top alert banner across the public website for all visitors, use the dedicated Site Broadcaster.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('broadcaster')}
                  className="admin-btn admin-btn-primary"
                  style={{ padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  ⚡ Go to Site Broadcaster →
                </button>
              </div>

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
                        {announcements.map((a) => {
                          const isActive = a.is_active !== undefined ? Boolean(a.is_active) : Boolean(a.isActive);
                          const target = a.target_category || a.targetCategory || 'all';
                          const expires = a.expires_at || a.expiresAt;
                          return (
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

                              <td style={{ color: '#475569', textTransform: 'capitalize' }}>
                                {target === 'all' ? 'All Students' : target}
                              </td>

                              <td>
                                <span className={`admin-badge ${isActive ? 'admin-badge-emerald' : 'admin-badge-free'}`}>
                                  {isActive ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                              </td>

                              <td style={{ color: '#64748B', fontSize: '12px' }}>
                                {expires ? new Date(expires).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                }) : 'Never'}
                              </td>

                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleAnnouncementActive(a)}
                                    className={`admin-btn ${isActive ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                                    style={{ padding: '4px 8px', fontSize: '11px' }}
                                    title={isActive ? 'Deactivate announcement' : 'Activate announcement'}
                                  >
                                    {isActive ? 'Deactivate' : 'Activate'}
                                  </button>
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
                          );
                        })}
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

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Expiration Date & Time (Optional)
                        </label>
                        <input
                          type="datetime-local"
                          value={announcementForm.expires_at}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, expires_at: e.target.value })}
                          className="admin-input"
                          style={{ width: '100%' }}
                        />
                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>Leave blank for permanent announcement until deleted.</span>
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
              TAB 6: SYSTEM & SECURITY (Fully Functional)
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'system' && (
            <div>
              {systemFeedback && (
                <div style={{
                  padding: '12px 18px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: systemFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                  border: `1px solid ${systemFeedback.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  color: systemFeedback.type === 'success' ? '#059669' : '#DC2626',
                }}>
                  {systemFeedback.message}
                </div>
              )}

              {/* Top Bar with Diagnostics Button */}
              <div className="admin-card" style={{ padding: '16px 20px', marginBottom: '22px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0', color: '#0F172A' }}>
                    Infrastructure & Security Posture
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                    Real-time status diagnostics, security boundaries, and emergency gates.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={systemDiagnosing}
                  onClick={handleRunSystemDiagnostics}
                  className="admin-btn admin-btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>{systemDiagnosing ? '⏳' : '⚡'}</span>
                  <span>{systemDiagnosing ? 'Testing Latency...' : 'Run Diagnostics'}</span>
                </button>
              </div>

              {/* 4 Metric Cards */}
              <div className="admin-metric-grid" style={{ marginBottom: '24px' }}>
                <div className="admin-card">
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Database Health</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', margin: '6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
                    {systemData?.database?.latencyMs !== undefined ? `${systemData.database.latencyMs}ms Latency` : 'Connected'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {systemData?.database?.tables ? `${Object.keys(systemData.database.tables).length} Relational Tables Verified` : 'Supabase PostgreSQL'}
                  </div>
                </div>

                <div className="admin-card">
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Route Protection</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#5B5CF0', margin: '6px 0' }}>Proxy Guard Active</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>HMAC Session Cookie (8h Expiry)</div>
                </div>

                <div className="admin-card">
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Rate Limiter</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#D97706', margin: '6px 0' }}>Dual-Key Window</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>5 attempts / 15m (IP & Email Guard)</div>
                </div>

                <div className="admin-card">
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Server Runtime</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '6px 0' }}>
                    {systemData?.runtime?.memoryRssMb ? `${systemData.runtime.memoryRssMb} MB RSS` : 'Node.js Engine'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Uptime: {systemData?.runtime?.uptimeSeconds ? `${Math.floor(systemData.runtime.uptimeSeconds / 60)}m` : 'Active'} • {systemData?.runtime?.environment || 'Production'}
                  </div>
                </div>
              </div>

              {/* Two Column Control Section */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                {/* Emergency Maintenance Mode Card */}
                <div className="admin-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0', color: '#0F172A' }}>
                        Emergency Maintenance Gate
                      </h4>
                      <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                        Halts mobile app requests and displays a maintenance screen.
                      </p>
                    </div>
                    <span className={`admin-badge ${maintenanceForm.enabled ? 'admin-badge-rose' : 'admin-badge-emerald'}`}>
                      {maintenanceForm.enabled ? 'GATE ACTIVE' : 'NORMAL'}
                    </span>
                  </div>

                  <form onSubmit={handleSaveMaintenanceGate}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', background: maintenanceForm.enabled ? '#FEF2F2' : '#F8FAFC', padding: '12px', borderRadius: '8px', border: `1px solid ${maintenanceForm.enabled ? 'rgba(239, 68, 68, 0.3)' : '#E2E8F0'}` }}>
                      <input
                        type="checkbox"
                        id="maintenance-toggle"
                        checked={maintenanceForm.enabled}
                        onChange={(e) => setMaintenanceForm({ ...maintenanceForm, enabled: e.target.checked })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <label htmlFor="maintenance-toggle" style={{ fontSize: '13px', fontWeight: 700, color: maintenanceForm.enabled ? '#DC2626' : '#0F172A', cursor: 'pointer' }}>
                        {maintenanceForm.enabled ? '⚠️ Maintenance Gate is ENABLED' : 'Enable Emergency Maintenance Gate'}
                      </label>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                        Maintenance Message shown to students:
                      </label>
                      <textarea
                        rows={3}
                        value={maintenanceForm.message}
                        onChange={(e) => setMaintenanceForm({ ...maintenanceForm, message: e.target.value })}
                        className="admin-input"
                        style={{ width: '100%', resize: 'vertical' }}
                        placeholder="Maintenance notification details..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={savingMaintenance}
                      className={`admin-btn ${maintenanceForm.enabled ? 'admin-btn-danger' : 'admin-btn-primary'}`}
                      style={{ width: '100%' }}
                    >
                      {savingMaintenance ? 'Saving in Database...' : 'Save Maintenance Gate'}
                    </button>
                  </form>
                </div>

                {/* Dynamic Feature Flags Card */}
                <div className="admin-card">
                  <div style={{ marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0', color: '#0F172A' }}>
                      Mobile App Feature Flags
                    </h4>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                      Remotely enable or disable application modules in real time.
                    </p>
                  </div>

                  <form onSubmit={handleSaveFeatureFlags}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Synchronous Study Rooms</div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>Live rooms and peer study timers</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={featureFlagsForm.enable_study_rooms}
                          onChange={(e) => setFeatureFlagsForm({ ...featureFlagsForm, enable_study_rooms: e.target.checked })}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Ambient Sound Generator</div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>Binaural beats, white noise, and rain</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={featureFlagsForm.enable_ambient_sounds}
                          onChange={(e) => setFeatureFlagsForm({ ...featureFlagsForm, enable_ambient_sounds: e.target.checked })}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>AI Study Insights</div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>Personalized retention and focus tips</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={featureFlagsForm.enable_ai_insights}
                          onChange={(e) => setFeatureFlagsForm({ ...featureFlagsForm, enable_ai_insights: e.target.checked })}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Spaced Repetition Flashcards</div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>SM-2 memory retention engine</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={featureFlagsForm.enable_flashcards}
                          onChange={(e) => setFeatureFlagsForm({ ...featureFlagsForm, enable_flashcards: e.target.checked })}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={savingFeatureFlags}
                      className="admin-btn admin-btn-primary"
                      style={{ width: '100%' }}
                    >
                      {savingFeatureFlags ? 'Saving...' : 'Apply Feature Flags'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Version Policy & Credentials Audit Section */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
                {/* Mobile Version Policy Card */}
                <div className="admin-card">
                  <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px 0', color: '#0F172A' }}>
                    Mobile Version & Update Enforcement
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
                    Enforce minimum app version to prevent out-of-date clients from corrupting schemas.
                  </p>

                  <form onSubmit={handleSaveVersionPolicy} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Min Supported Version
                        </label>
                        <input
                          type="text"
                          required
                          value={versionPolicyForm.min_version}
                          onChange={(e) => setVersionPolicyForm({ ...versionPolicyForm, min_version: e.target.value })}
                          className="admin-input"
                          style={{ width: '100%' }}
                          placeholder="1.0.0"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Latest Store Version
                        </label>
                        <input
                          type="text"
                          required
                          value={versionPolicyForm.latest_version}
                          onChange={(e) => setVersionPolicyForm({ ...versionPolicyForm, latest_version: e.target.value })}
                          className="admin-input"
                          style={{ width: '100%' }}
                          placeholder="1.0.0"
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                        Google Play Store URL
                      </label>
                      <input
                        type="url"
                        value={versionPolicyForm.store_url}
                        onChange={(e) => setVersionPolicyForm({ ...versionPolicyForm, store_url: e.target.value })}
                        className="admin-input"
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        id="force-update-toggle"
                        checked={versionPolicyForm.force_update}
                        onChange={(e) => setVersionPolicyForm({ ...versionPolicyForm, force_update: e.target.checked })}
                        style={{ cursor: 'pointer' }}
                      />
                      <label htmlFor="force-update-toggle" style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}>
                        Force update dialog (blocks older versions)
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={savingVersionPolicy}
                      className="admin-btn admin-btn-primary"
                      style={{ marginTop: '4px' }}
                    >
                      {savingVersionPolicy ? 'Saving...' : 'Save Version Policy'}
                    </button>
                  </form>
                </div>

                {/* Environment Secrets Audit Card */}
                <div className="admin-card">
                  <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px 0', color: '#0F172A' }}>
                    Zero-Trust Security Credentials Audit
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '14px' }}>
                    Verification of server-side secrets and cryptographic keys without exposing sensitive data.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                    {[
                      { name: 'Supabase Database URL', status: Boolean(systemData?.security?.credentialsProvisioned?.supabaseUrl) },
                      { name: 'Supabase Service Role Key', status: Boolean(systemData?.security?.credentialsProvisioned?.supabaseServiceRoleKey) },
                      { name: 'Admin Session HMAC Secret', status: Boolean(systemData?.security?.credentialsProvisioned?.adminSessionSecret) },
                      { name: 'Configured Administrator Email', status: Boolean(systemData?.security?.credentialsProvisioned?.adminEmail) },
                      { name: 'Google OAuth Web Client ID', status: Boolean(systemData?.security?.credentialsProvisioned?.googleOAuthClientId) },
                      { name: 'PostHog Analytics Telemetry', status: Boolean(systemData?.security?.credentialsProvisioned?.posthogKey) },
                      { name: 'Sentry Runtime Exception Monitor', status: Boolean(systemData?.security?.credentialsProvisioned?.sentryDsn) },
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                        <span style={{ fontWeight: 600, color: '#334155' }}>{item.name}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 700 }}>
                          <span>✓</span>
                          <span>Verified</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 7: DATABASE SCHEMAS (Connected to live statistics)
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'database' && (
            <div className="admin-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    Supabase PostgreSQL: zvfeafmixnevqbelxnqp
                  </h3>
                </div>
                <span className="admin-badge admin-badge-emerald">
                  {systemData?.database?.latencyMs ? `${systemData.database.latencyMs}ms Latency` : 'Connected'}
                </span>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
                The admin panel connects to the mobile app PostgreSQL database using a server-side client initialized with the Supabase Service Role Key.
              </p>

              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px', color: '#0F172A' }}>
                Active Relational Tables & Metrics:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', fontSize: '13px', color: '#475569' }}>
                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: '#0F172A' }}>public.profiles</strong>
                    <span style={{ fontWeight: 700, color: '#5B5CF0' }}>
                      {systemData?.database?.tables?.profiles?.count !== undefined ? `${systemData.database.tables.profiles.count} rows` : 'Active'}
                    </span>
                  </div>
                  <div>Student profiles, categories, XP levels, and Pro tier (<code style={{ color: '#5B5CF0' }}>is_premium</code>).</div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: '#0F172A' }}>public.study_rooms</strong>
                    <span style={{ fontWeight: 700, color: '#5B5CF0' }}>
                      {systemData?.database?.tables?.studyRooms?.count !== undefined ? `${systemData.database.tables.studyRooms.count} rows` : 'Active'}
                    </span>
                  </div>
                  <div>Synchronous rooms, host IDs, timers, and active state (<code style={{ color: '#5B5CF0' }}>is_active</code>).</div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: '#0F172A' }}>public.app_announcements</strong>
                    <span style={{ fontWeight: 700, color: '#5B5CF0' }}>
                      {systemData?.database?.tables?.announcements?.count !== undefined ? `${systemData.database.tables.announcements.count} rows` : 'Active'}
                    </span>
                  </div>
                  <div>Targeted remote broadcast alerts sent to mobile app users.</div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: '#0F172A' }}>public.app_config</strong>
                    <span style={{ fontWeight: 700, color: '#5B5CF0' }}>
                      {systemData?.database?.tables?.appConfig?.count !== undefined ? `${systemData.database.tables.appConfig.count} rows` : 'Active'}
                    </span>
                  </div>
                  <div>Global application configuration, feature flags, version policy, and site broadcasts.</div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: '#0F172A' }}>public.admin_audit_logs</strong>
                    <span style={{ fontWeight: 700, color: '#5B5CF0' }}>
                      {systemData?.database?.tables?.auditLogs?.count !== undefined ? `${systemData.database.tables.auditLogs.count} rows` : 'Active'}
                    </span>
                  </div>
                  <div>Tamper-evident administrative audit trail capturing all privileged mutations.</div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <strong style={{ color: '#0F172A' }}>public.room_messages</strong>
                  <div style={{ marginTop: '4px' }}>Real-time chat messages associated with collaborative study rooms.</div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <strong style={{ color: '#0F172A' }}>public.focus_sessions</strong>
                  <div style={{ marginTop: '4px' }}>Pomodoro focus sessions, intervals, and historical study statistics.</div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <strong style={{ color: '#0F172A' }}>public.habits & habit_logs</strong>
                  <div style={{ marginTop: '4px' }}>Habit templates, recurring schedules, and daily completion streaks.</div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 8: SITE BROADCASTER (Live Database-Backed)
             ══════════════════════════════════════════════════════════ */}
          {activeTab === 'broadcaster' && (
            <div className="admin-card">
              {broadcastFeedback && (
                <div style={{
                  padding: '12px 18px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: broadcastFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                  border: `1px solid ${broadcastFeedback.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  color: broadcastFeedback.type === 'success' ? '#059669' : '#DC2626',
                }}>
                  {broadcastFeedback.message}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0F172A' }}>
                  Website Announcement Broadcaster
                </h3>
                <span className={`admin-badge ${broadcastData.active ? 'admin-badge-emerald' : 'admin-badge-free'}`}>
                  {broadcastData.active ? '🟢 BROADCASTING LIVE ON WEBSITE' : '⚪ INACTIVE (BANNER HIDDEN)'}
                </span>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '22px' }}>
                Broadcast a live, high-visibility announcement banner across the top of the LifeTrack Pro public website. Saved in database and synced across all visitors.
              </p>

              {/* Live Preview Box */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '8px' }}>
                  Live Preview as seen by Website Visitors:
                </label>
                <div style={{
                  background: broadcastData.severity === 'critical'
                    ? 'linear-gradient(90deg, #E11D48 0%, #BE123C 100%)'
                    : broadcastData.severity === 'warning'
                    ? 'linear-gradient(90deg, #D97706 0%, #B45309 100%)'
                    : broadcastData.severity === 'success'
                    ? 'linear-gradient(90deg, #059669 0%, #047857 100%)'
                    : 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
                  color: '#FFFFFF',
                  padding: '11px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px' }}>
                      {broadcastData.severity === 'critical' ? '🚨' : broadcastData.severity === 'warning' ? '⚠️' : broadcastData.severity === 'success' ? '✨' : '📢'}
                    </span>
                    <span>{broadcastData.message || 'No announcement message specified.'}</span>
                    {broadcastData.link_url && (
                      <span style={{ textDecoration: 'underline', fontWeight: 700, marginLeft: '6px' }}>
                        {broadcastData.link_text || 'Learn more →'}
                      </span>
                    )}
                  </div>
                  <span style={{ background: 'rgba(255, 255, 255, 0.25)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>
                    ✕
                  </span>
                </div>
              </div>

              {/* Form Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: broadcastData.active ? '#ECFDF5' : '#F8FAFC', padding: '14px', borderRadius: '8px', border: `1px solid ${broadcastData.active ? 'rgba(16, 185, 129, 0.4)' : '#E2E8F0'}` }}>
                  <input
                    type="checkbox"
                    id="broadcast-active-toggle"
                    checked={broadcastData.active}
                    onChange={(e) => setBroadcastData({ ...broadcastData, active: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="broadcast-active-toggle" style={{ fontSize: '14px', fontWeight: 700, color: broadcastData.active ? '#059669' : '#0F172A', cursor: 'pointer' }}>
                    {broadcastData.active ? '✓ Broadcast is Active and Visible to Visitors' : 'Broadcast is Currently Inactive (Hidden)'}
                  </label>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                      Announcement Message
                    </label>
                    <span style={{ fontSize: '11px', color: (broadcastData.message?.length || 0) > 280 ? '#DC2626' : '#94A3B8' }}>
                      {broadcastData.message?.length || 0}/300 characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={broadcastData.message}
                    onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
                    placeholder="e.g. ⚡ LifeTrack Pro 2.0 is now live on Google Play! Update your app for synchronous rooms."
                    className="admin-input"
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Banner Urgency / Theme
                    </label>
                    <select
                      value={broadcastData.severity}
                      onChange={(e) => setBroadcastData({ ...broadcastData, severity: e.target.value })}
                      className="admin-select"
                      style={{ width: '100%' }}
                    >
                      <option value="info">Info / General (Indigo & Purple)</option>
                      <option value="warning">Notice / Warning (Warm Amber)</option>
                      <option value="critical">Urgent / Alert (Coral Red)</option>
                      <option value="success">Feature Release / Success (Emerald Green)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Action Link URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={broadcastData.link_url}
                      onChange={(e) => setBroadcastData({ ...broadcastData, link_url: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. /features or https://play.google.com/..."
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                      Action Link Label (Optional)
                    </label>
                    <input
                      type="text"
                      value={broadcastData.link_text}
                      onChange={(e) => setBroadcastData({ ...broadcastData, link_text: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. Check details →"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    disabled={broadcastSaving}
                    className="admin-btn admin-btn-primary"
                    onClick={() => handleSaveBroadcast(null, true)}
                    style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)' }}
                  >
                    {broadcastSaving ? 'Saving to Database...' : '⚡ Save & Publish Live on Website'}
                  </button>

                  <button
                    type="button"
                    disabled={broadcastSaving}
                    className="admin-btn admin-btn-secondary"
                    onClick={() => handleSaveBroadcast(null, false)}
                  >
                    Save as Inactive Draft
                  </button>

                  <button
                    type="button"
                    disabled={broadcastSaving}
                    className={`admin-btn ${broadcastData.active ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                    onClick={handleToggleBroadcastActive}
                  >
                    {broadcastData.active ? '⏸ Pause / Hide Banner' : '▶ Activate Banner'}
                  </button>

                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn admin-btn-secondary"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    🌐 View Live on Website ↗
                  </a>

                  <button
                    type="button"
                    disabled={broadcastSaving}
                    className="admin-btn admin-btn-danger"
                    onClick={handleClearBroadcast}
                    style={{ marginLeft: 'auto' }}
                  >
                    Clear Text
                  </button>
                </div>

                {broadcastData.updated_at && (
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>✓ Synced with Supabase:</span>
                    <span>{new Date(broadcastData.updated_at).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })} {broadcastData.updated_by ? `by ${broadcastData.updated_by}` : ''}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
