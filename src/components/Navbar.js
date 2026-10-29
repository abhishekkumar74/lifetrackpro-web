'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import DownloadModal from './DownloadModal';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="brand-wrap">
          <Image 
            src="/icon.png" 
            alt="LifeTrack Pro Icon" 
            width={32} 
            height={32} 
            className="brand-icon-img"
            priority
          />
          <div className="brand-title">
            LifeTrack <span style={{ color: 'var(--primary)' }}>Pro</span>
          </div>
          <span className="brand-badge">Life OS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-center">
          <Link href="/" className={`nav-btn ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link href="/features" className={`nav-btn ${pathname.startsWith('/features') ? 'active' : ''}`}>
            Features
          </Link>
          <Link href="/calculator" className={`nav-btn ${pathname === '/calculator' ? 'active' : ''}`}>
            ROI Calculator
          </Link>
          <Link href="/faq" className={`nav-btn ${pathname === '/faq' ? 'active' : ''}`}>
            FAQ
          </Link>
        </div>

        <div className="nav-right">
          <Link href="/admin" className="admin-link-btn" title="Open Admin Control Center">
            <span>🛡️</span> Admin Panel
          </Link>
          <button className="cta-download" onClick={() => setModalOpen(true)}>
            <span>▶</span> Download Free
          </button>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-nav-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <Link href="/" className="mobile-menu-link">
            <span>🏠 Home</span>
            <span>→</span>
          </Link>
          <Link href="/features" className="mobile-menu-link">
            <span>⚡ Features Hub</span>
            <span>→</span>
          </Link>
          <Link href="/features/pomodoro-timer" className="mobile-menu-link" style={{ paddingLeft: '28px', fontSize: '13.5px', color: 'var(--text-2)' }}>
            <span>⏱️ Pomodoro Timer</span>
          </Link>
          <Link href="/features/spaced-repetition" className="mobile-menu-link" style={{ paddingLeft: '28px', fontSize: '13.5px', color: 'var(--text-2)' }}>
            <span>🃏 Spaced Repetition (SM-2)</span>
          </Link>
          <Link href="/features/habit-tracker" className="mobile-menu-link" style={{ paddingLeft: '28px', fontSize: '13.5px', color: 'var(--text-2)' }}>
            <span>🔥 Habit Streak Tracker</span>
          </Link>
          <Link href="/features/study-rooms" className="mobile-menu-link" style={{ paddingLeft: '28px', fontSize: '13.5px', color: 'var(--text-2)' }}>
            <span>🎧 Live Study Rooms</span>
          </Link>
          <Link href="/calculator" className="mobile-menu-link">
            <span>🧮 Focus ROI Calculator</span>
            <span>→</span>
          </Link>
          <Link href="/faq" className="mobile-menu-link">
            <span>❓ FAQ &amp; Guides</span>
            <span>→</span>
          </Link>
          <Link href="/admin" className="mobile-menu-link" style={{ color: 'var(--primary)' }}>
            <span>🛡️ Super Admin Panel</span>
            <span>→</span>
          </Link>
          <button 
            className="btn-main" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
            onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
          >
            Download Free Android App
          </button>
        </div>
      )}

      {modalOpen && <DownloadModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
