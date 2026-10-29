'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_USERS = [
  { id: 1, name: "Aryan Sharma", email: "aryan.jee@gmail.com", goal: "JEE Advanced 2025", streak: 45, focusHours: 148.5, plan: "PRO", status: "ACTIVE" },
  { id: 2, name: "Priya Mukherjee", email: "priya.neet@gmail.com", goal: "NEET UG 2026", streak: 28, focusHours: 112.0, plan: "PRO", status: "ACTIVE" },
  { id: 3, name: "Rohan Kapoor", email: "rohan.iitd@outlook.com", goal: "B.Tech CS IIT Delhi", streak: 19, focusHours: 84.2, plan: "FREE", status: "ACTIVE" },
  { id: 4, name: "Vikram Rathore", email: "vikram.upsc@gov.in", goal: "UPSC Civil Services", streak: 62, focusHours: 210.0, plan: "PRO", status: "ACTIVE" },
  { id: 5, name: "Ananya Sen", email: "ananya.cat@iimb.ac.in", goal: "CAT / MBA 2025", streak: 14, focusHours: 49.5, plan: "FREE", status: "ACTIVE" },
  { id: 6, name: "Devansh Patel", email: "devansh.code@gmail.com", goal: "FAANG SDE Prep", streak: 31, focusHours: 95.8, plan: "PRO", status: "ACTIVE" },
  { id: 7, name: "Sneha Reddy", email: "sneha.aiims@gmail.com", goal: "AIIMS PG Medical", streak: 3, focusHours: 14.0, plan: "FREE", status: "SUSPENDED" }
];

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [planFilter, setPlanFilter] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [bannerText, setBannerText] = useState('⚡ Welcome to LifeTrack Pro v2.4 — All study rooms operational!');

  // Form fields for new user
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserGoal, setNewUserGoal] = useState('');
  const [newUserPlan, setNewUserPlan] = useState('FREE');

  useEffect(() => {
    if (sessionStorage.getItem('lifetrack_admin_auth') === 'true') {
      setUnlocked(true);
    }
    const savedUsers = localStorage.getItem('lifetrack_users_data');
    if (savedUsers) {
      try { setUsers(JSON.parse(savedUsers)); } catch(e) {}
    }
  }, []);

  const saveUsersToStorage = (updated) => {
    setUsers(updated);
    localStorage.setItem('lifetrack_users_data', JSON.stringify(updated));
  };

  const handleUnlock = (e) => {
    e?.preventDefault();
    if (pin === '1234' || pin === 'admin' || pin === '') {
      setUnlocked(true);
      sessionStorage.setItem('lifetrack_admin_auth', 'true');
    } else {
      alert('Invalid PIN. Use default "1234" or click Quick Access.');
    }
  };

  const handleBypass = () => {
    setUnlocked(true);
    sessionStorage.setItem('lifetrack_admin_auth', 'true');
  };

  const togglePlan = (id) => {
    const updated = users.map(u => u.id === id ? { ...u, plan: u.plan === 'PRO' ? 'FREE' : 'PRO' } : u);
    saveUsersToStorage(updated);
  };

  const toggleStatus = (id) => {
    const updated = users.map(u => u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u);
    saveUsersToStorage(updated);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const newUser = {
      id: Date.now(),
      name: newUserName,
      email: newUserEmail,
      goal: newUserGoal || 'General Study',
      streak: 1,
      focusHours: 0.0,
      plan: newUserPlan,
      status: 'ACTIVE'
    };
    const updated = [newUser, ...users];
    saveUsersToStorage(updated);
    setAddUserOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserGoal('');
    alert(`Student "${newUser.name}" added successfully.`);
  };

  const handlePublishBanner = () => {
    if (!bannerText) return;
    localStorage.setItem('lifetrack_admin_banner', JSON.stringify({ active: true, message: bannerText }));
    window.dispatchEvent(new Event('storage'));
    alert('Announcement published! Check the top header on any page.');
  };

  const handleClearBanner = () => {
    localStorage.removeItem('lifetrack_admin_banner');
    window.dispatchEvent(new Event('storage'));
    alert('Announcement cleared.');
  };

  const exportCSV = () => {
    let csv = 'ID,Name,Email,Exam Goal,Streak Days,Focus Hours,Plan,Status\n';
    users.forEach(u => {
      csv += `"${u.id}","${u.name}","${u.email}","${u.goal}",${u.streak},${u.focusHours},"${u.plan}","${u.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lifetrack_students_export.csv';
    a.click();
  };

  const filteredUsers = users.filter(u => {
    const matchQuery = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       u.goal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || u.status === statusFilter;
    const matchPlan = planFilter === 'ALL' || u.plan === planFilter;
    return matchQuery && matchStatus && matchPlan;
  });

  if (!unlocked) {
    return (
      <div style={{
        minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
      }}>
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--border-glow)',
          borderRadius: '24px', padding: '40px 32px', maxWidth: '400px', width: '100%',
          textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '14px' }}>🛡️</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', marginBottom: '6px' }}>
            Super Admin Access
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '20px' }}>
            Enter your passcode to manage LifeTrack Pro students and rooms.
          </p>

          <form onSubmit={handleUnlock}>
            <input 
              type="password" 
              placeholder="••••" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{
                width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)',
                borderRadius: '12px', padding: '14px', fontSize: '18px', color: '#fff',
                textAlign: 'center', letterSpacing: '6px', outline: 'none', marginBottom: '16px'
              }}
            />
            <button type="submit" className="btn-main" style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}>
              Unlock Dashboard →
            </button>
          </form>

          <button 
            onClick={handleBypass}
            style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }}
          >
            ⚡ Instant Quick Access (Demo Mode)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#0B0B14', borderRight: '1px solid var(--border-subtle)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingLeft: '8px' }}>
          <Image src="/icon.png" alt="LifeTrack" width={30} height={30} style={{ borderRadius: '8px' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: '#fff' }}>LifeTrack Admin</div>
            <div style={{ fontSize: '10px', color: 'var(--cyan)', fontWeight: 700 }}>SUPERUSER</div>
          </div>
        </div>

        <button 
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          style={{ width: '100%', textAlign: 'left', display: 'flex', gap: '10px', padding: '10px 12px' }}
          onClick={() => setActiveTab('overview')}
        >
          <span>📊</span> Overview
        </button>

        <button 
          className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          style={{ width: '100%', textAlign: 'left', display: 'flex', gap: '10px', padding: '10px 12px' }}
          onClick={() => setActiveTab('users')}
        >
          <span>👥</span> Users Control ({users.length})
        </button>

        <button 
          className={`nav-btn ${activeTab === 'rooms' ? 'active' : ''}`}
          style={{ width: '100%', textAlign: 'left', display: 'flex', gap: '10px', padding: '10px 12px' }}
          onClick={() => setActiveTab('rooms')}
        >
          <span>🎧</span> Study Rooms (4 Live)
        </button>

        <button 
          className={`nav-btn ${activeTab === 'controls' ? 'active' : ''}`}
          style={{ width: '100%', textAlign: 'left', display: 'flex', gap: '10px', padding: '10px 12px' }}
          onClick={() => setActiveTab('controls')}
        >
          <span>📢</span> Broadcast Banners
        </button>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <Link href="/" className="btn-glass" style={{ width: '100%', justifyContent: 'center', fontSize: '12px', padding: '8px' }}>
            ← View Public Site
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800 }}>
              {activeTab === 'overview' && 'Live Platform Telemetry'}
              {activeTab === 'users' && 'Student Accounts & Access Control'}
              {activeTab === 'rooms' && 'Multiplayer Study Rooms Monitor'}
              {activeTab === 'controls' && 'Live In-App Announcement Broadcaster'}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>
              Connected to LifeTrack Pro Realtime Core · Uptime 99.98%
            </p>
          </div>
          <span style={{ fontSize: '12px', background: 'rgba(46,204,113,0.1)', color: 'var(--green)', padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(46,204,113,0.25)' }}>
            ● Supabase Realtime Active
          </span>
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-3)', textTransform: 'uppercase', fontWeight: 700 }}>Total Students</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', margin: '6px 0' }}>{14840 + users.length}</div>
                <div style={{ fontSize: '12px', color: 'var(--green)' }}>↑ 18.4% this month</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-3)', textTransform: 'uppercase', fontWeight: 700 }}>Active Today</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--cyan)', margin: '6px 0' }}>3,420</div>
                <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>Online right now</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-3)', textTransform: 'uppercase', fontWeight: 700 }}>Total Focus Hours</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', margin: '6px 0' }}>142,890</div>
                <div style={{ fontSize: '12px', color: 'var(--green)' }}>↑ 24.8% Pomodoro volume</div>
              </div>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-3)', textTransform: 'uppercase', fontWeight: 700 }}>Pro Tier Active</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary-light)', margin: '6px 0' }}>
                  {users.filter(u => u.plan === 'PRO').length}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>Power-user accounts</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Quick Admin Actions</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn-main" onClick={() => setActiveTab('users')}>
                  Manage Students ({users.length})
                </button>
                <button className="btn-glass" onClick={() => setActiveTab('controls')}>
                  Publish Broadcast Announcement
                </button>
                <button className="btn-glass" onClick={exportCSV}>
                  Export Students CSV
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === 'users' && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
              <input 
                type="text" 
                placeholder="Search students by name, email, or exam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 14px', color: '#fff', fontSize: '13px', width: '280px', outline: 'none' }}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-2)', padding: '8px', fontSize: '13px' }}
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>

                <select 
                  value={planFilter} 
                  onChange={(e) => setPlanFilter(e.target.value)}
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-2)', padding: '8px', fontSize: '13px' }}
                >
                  <option value="ALL">All Plans</option>
                  <option value="PRO">PRO</option>
                  <option value="FREE">FREE</option>
                </select>

                <button className="btn-main" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => setAddUserOpen(true)}>
                  + Add Student
                </button>

                <button className="btn-glass" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={exportCSV}>
                  📥 CSV
                </button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-3)' }}>
                  <th style={{ padding: '14px 20px' }}>Student</th>
                  <th style={{ padding: '14px 20px' }}>Target Exam</th>
                  <th style={{ padding: '14px 20px' }}>Streak</th>
                  <th style={{ padding: '14px 20px' }}>Focus Hours</th>
                  <th style={{ padding: '14px 20px' }}>Plan</th>
                  <th style={{ padding: '14px 20px' }}>Status</th>
                  <th style={{ padding: '14px 20px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 700, color: '#fff' }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--cyan)' }}>{u.goal}</td>
                    <td style={{ padding: '14px 20px', color: 'var(--amber)', fontWeight: 700 }}>🔥 {u.streak}d</td>
                    <td style={{ padding: '14px 20px' }}>{u.focusHours}h</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '100px',
                        background: u.plan === 'PRO' ? 'var(--primary-soft)' : 'rgba(255,255,255,0.06)',
                        color: u.plan === 'PRO' ? 'var(--primary-light)' : 'var(--text-3)',
                        border: u.plan === 'PRO' ? '1px solid var(--primary-light)' : 'none'
                      }}>
                        {u.plan}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ color: u.status === 'ACTIVE' ? 'var(--green)' : 'var(--coral)', fontWeight: 700, fontSize: '11px' }}>
                        ● {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          onClick={() => togglePlan(u.id)}
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-2)', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}
                        >
                          {u.plan === 'PRO' ? 'Make Free' : 'Give Pro'}
                        </button>
                        <button 
                          onClick={() => toggleStatus(u.id)}
                          style={{ background: 'rgba(255,83,118,0.1)', border: '1px solid rgba(255,83,118,0.3)', color: 'var(--coral)', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}
                        >
                          {u.status === 'ACTIVE' ? 'Ban' : 'Unban'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── ROOMS TAB ── */}
        {activeTab === 'rooms' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>🎯 JEE Physics Grind</h3>
                <span style={{ background: 'var(--coral)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '100px' }}>42 Students</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '14px' }}>Host: Aryan S. · Audio: 432Hz Binaural</p>
              <button className="btn-glass" style={{ width: '100%', fontSize: '12px' }} onClick={() => alert('Broadcast sent to room participants.')}>
                📢 Broadcast Alert to Room
              </button>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>🧬 NEET Biology Rapid Recall</h3>
                <span style={{ background: 'var(--coral)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '100px' }}>68 Students</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '14px' }}>Host: Priya M. · Audio: Rain Sounds</p>
              <button className="btn-glass" style={{ width: '100%', fontSize: '12px' }} onClick={() => alert('Broadcast sent to room participants.')}>
                📢 Broadcast Alert to Room
              </button>
            </div>
          </div>
        )}

        {/* ── BROADCAST CONTROLS TAB ── */}
        {activeTab === 'controls' && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              Live Marquee Announcement Broadcaster
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '20px' }}>
              Publish announcements, exam motivation, or updates directly to the top banner across all pages.
            </p>

            <input 
              type="text" 
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              style={{
                width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)',
                borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '14px', outline: 'none', marginBottom: '16px'
              }}
            />

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-main" onClick={handlePublishBanner}>
                📢 Publish To Live Site
              </button>
              <button className="btn-glass" onClick={handleClearBanner}>
                ✕ Clear Banner
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {addUserOpen && (
        <div className="modal-overlay" onClick={() => setAddUserOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setAddUserOpen(false)}>✕</button>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Add New Student</h3>
            <form onSubmit={handleCreateUser} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-3)' }}>Full Name</label>
                <input 
                  type="text" 
                  value={newUserName} 
                  onChange={(e) => setNewUserName(e.target.value)}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-3)' }}>Email</label>
                <input 
                  type="email" 
                  value={newUserEmail} 
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-3)' }}>Target Goal</label>
                <input 
                  type="text" 
                  value={newUserGoal} 
                  placeholder="e.g. NEET 2026 / JEE"
                  onChange={(e) => setNewUserGoal(e.target.value)}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-3)' }}>Plan</label>
                <select 
                  value={newUserPlan} 
                  onChange={(e) => setNewUserPlan(e.target.value)}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px' }}
                >
                  <option value="FREE">FREE Tier</option>
                  <option value="PRO">PRO Tier</option>
                </select>
              </div>

              <button type="submit" className="btn-main" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                Save Student Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
