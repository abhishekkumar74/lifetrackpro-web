'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import DownloadModal from './DownloadModal';
import PlayStoreIcon from './PlayStoreIcon';
import { 
  HomeIcon, 
  FeaturesIcon, 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  HeadphonesIcon, 
  CalculatorIcon, 
  HelpCircleIcon, 
  ChevronRightIcon, 
  MenuIcon, 
  CloseIcon 
} from './Icons';
import { LinkedInIcon, InstagramIcon, WhatsAppIcon, TelegramIcon } from './SocialIcons';

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
  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeDrawer = () => setMobileMenuOpen(false);

  const handleHomeClick = (e) => {
    closeDrawer();
    if (pathname === '/') {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="site-header-wrapper">
        <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
          <Link href="/" className="brand-wrap" onClick={handleHomeClick} aria-label="LifeTrack Pro Home">
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
            <Link href="/" className={`nav-btn ${pathname === '/' ? 'active' : ''}`} onClick={handleHomeClick}>
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
            <a 
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-download" 
              title="Download LifeTrack Pro on Google Play Store"
            >
              <PlayStoreIcon size={16} />
              <span className="cta-download-full">Download from Play Store</span>
              <span className="cta-download-short">Play Store</span>
            </a>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              type="button"
              className={`mobile-nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-backdrop" 
            onClick={closeDrawer} 
            aria-hidden="true" 
          />
          <div className="mobile-menu-drawer" role="dialog" aria-label="Mobile Navigation">
            {/* Drawer Header with Prominent Close (X) Button */}
            <div className="drawer-header">
              <Link href="/" className="brand-wrap" onClick={handleHomeClick} aria-label="LifeTrack Pro Home">
                <Image 
                  src="/icon.png" 
                  alt="LifeTrack Pro" 
                  width={28} 
                  height={28} 
                  className="brand-icon-img"
                />
                <div className="brand-title">
                  LifeTrack <span style={{ color: 'var(--primary)' }}>Pro</span>
                </div>
              </Link>
              <button 
                type="button" 
                className="drawer-close-btn" 
                onClick={closeDrawer} 
                aria-label="Close menu"
                title="Close menu"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="drawer-section-label">Navigation</div>

            <Link href="/" className={`mobile-menu-link ${pathname === '/' ? 'active' : ''}`} onClick={handleHomeClick}>
              <span className="menu-link-title">
                <HomeIcon size={16} className="menu-link-icon" />
                <span>Home</span>
              </span>
              <ChevronRightIcon size={14} />
            </Link>

            <Link href="/features" className={`mobile-menu-link ${pathname === '/features' ? 'active' : ''}`} onClick={closeDrawer}>
              <span className="menu-link-title">
                <FeaturesIcon size={16} className="menu-link-icon" />
                <span>Features Hub</span>
              </span>
              <ChevronRightIcon size={14} />
            </Link>

            <div className="drawer-submenu-group">
              <Link href="/features/pomodoro-timer" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <TimerIcon size={15} className="menu-link-icon" />
                  <span>Pomodoro Timer</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
              <Link href="/features/spaced-repetition" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <CardsIcon size={15} className="menu-link-icon" />
                  <span>Spaced Repetition (SM-2)</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
              <Link href="/features/habit-tracker" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <HabitFlameIcon size={15} className="menu-link-icon" />
                  <span>Habit Streak Tracker</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
              <Link href="/features/study-rooms" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <HeadphonesIcon size={15} className="menu-link-icon" />
                  <span>Live Study Rooms</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
            </div>

            <div className="drawer-divider" />

            <div className="drawer-section-label">Tools &amp; Help</div>

            <Link href="/calculator" className={`mobile-menu-link ${pathname === '/calculator' ? 'active' : ''}`} onClick={closeDrawer}>
              <span className="menu-link-title">
                <CalculatorIcon size={16} className="menu-link-icon" />
                <span>Focus ROI Calculator</span>
              </span>
              <ChevronRightIcon size={14} />
            </Link>

            <Link href="/faq" className={`mobile-menu-link ${pathname === '/faq' ? 'active' : ''}`} onClick={closeDrawer}>
              <span className="menu-link-title">
                <HelpCircleIcon size={16} className="menu-link-icon" />
                <span>FAQ &amp; Guides</span>
              </span>
              <ChevronRightIcon size={14} />
            </Link>

            <div className="drawer-divider" />
            <div className="drawer-section-label">Study Community</div>
            <div className="drawer-social-row">
              <a href="https://chat.whatsapp.com/B8uwXjT9R665ahqcXVsZdk" target="_blank" rel="noopener noreferrer" className="drawer-social-btn whatsapp" aria-label="WhatsApp Study Community" title="WhatsApp Community">
                <WhatsAppIcon size={16} />
              </a>
              <a href="https://t.me/lifetrackpro" target="_blank" rel="noopener noreferrer" className="drawer-social-btn telegram" aria-label="Telegram Channel" title="Telegram Channel">
                <TelegramIcon size={16} />
              </a>
              <a href="https://www.instagram.com/lifetrackpro/" target="_blank" rel="noopener noreferrer" className="drawer-social-btn instagram" aria-label="Instagram" title="Instagram @lifetrackpro">
                <InstagramIcon size={16} />
              </a>
              <a href="https://www.linkedin.com/company/lifetrackpro" target="_blank" rel="noopener noreferrer" className="drawer-social-btn linkedin" aria-label="LinkedIn" title="LinkedIn Company">
                <LinkedInIcon size={16} />
              </a>
            </div>

            <a 
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-main" 
              style={{ width: '100%', justifyContent: 'center', marginTop: '12px', gap: '8px' }}
              onClick={closeDrawer}
            >
              <PlayStoreIcon size={18} />
              <span>Download from Play Store</span>
            </a>
          </div>
        </>
      )}

      {modalOpen && <DownloadModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
