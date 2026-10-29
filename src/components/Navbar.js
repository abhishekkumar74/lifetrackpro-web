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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="brand-wrap">
          <Image 
            src="/icon.png" 
            alt="LifeTrack Pro Icon" 
            width={36} 
            height={36} 
            className="brand-icon-img"
            priority
          />
          <div className="brand-title">
            LifeTrack <span style={{ color: 'var(--primary-light)' }}>Pro</span>
          </div>
          <span className="brand-badge">Life OS</span>
        </Link>

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
        </div>
      </nav>

      {modalOpen && <DownloadModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
