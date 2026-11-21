'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
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
  TargetIcon,
  HelpCircleIcon, 
  ChevronRightIcon, 
  MenuIcon, 
  CloseIcon 
} from './Icons';
import { LinkedInIcon, InstagramIcon, WhatsAppIcon, TelegramIcon } from './SocialIcons';

export default function Navbar() {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on route change during render without cascading effect
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setDropdownOpen(false);
    setIsPinned(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setIsPinned(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setIsPinned(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const handleDropdownMouseEnter = () => {
    if (!isPinned) {
      setDropdownOpen(true);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isPinned) {
      setDropdownOpen(false);
    }
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    if (isPinned) {
      // It was pinned, now unpin and close
      setIsPinned(false);
      setDropdownOpen(false);
    } else {
      // Pin open so moving mouse away keeps it open ("click pai ruke")
      setIsPinned(true);
      setDropdownOpen(true);
    }
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
    setIsPinned(false);
  };

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
          <Link href="/" className="brand-wrap" onClick={handleHomeClick}>
            <Image 
              src="/icon.png" 
              alt="LifeTrack Pro Icon" 
              width={32} 
              height={32} 
              className="brand-icon-img"
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

            {/* Exams Dropdown (Hover opens, mouse-leave closes, click pins open, item click closes) */}
            <div 
              ref={dropdownRef}
              className={`nav-dropdown-wrapper ${dropdownOpen ? 'open' : ''}`}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button 
                type="button" 
                id="exams-dropdown-btn"
                className={`nav-btn ${pathname.startsWith('/exams') ? 'active' : ''}`}
                onClick={handleDropdownToggle}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-controls="exams-dropdown-menu"
                style={{ 
                  cursor: 'pointer',
                  border: 'none',
                  fontFamily: 'inherit',
                  background: dropdownOpen ? 'rgba(15, 23, 42, 0.06)' : undefined 
                }}
              >
                Exams ▾
              </button>
              <div 
                id="exams-dropdown-menu"
                className={`nav-dropdown-menu ${dropdownOpen ? 'open' : ''}`}
                role="menu"
                aria-labelledby="exams-dropdown-btn"
              >
                <Link href="/exams" className="nav-dropdown-item" role="menuitem" onClick={handleDropdownItemClick}>
                  <strong>All Exam Hubs</strong>
                  <span>Overview &amp; preparation roadmaps</span>
                </Link>
                <Link href="/exams/jee" className="nav-dropdown-item" role="menuitem" onClick={handleDropdownItemClick}>
                  <strong>IIT JEE Main &amp; Adv</strong>
                  <span>90m blocks &amp; formula recall</span>
                </Link>
                <Link href="/exams/neet" className="nav-dropdown-item" role="menuitem" onClick={handleDropdownItemClick}>
                  <strong>NEET UG Prep</strong>
                  <span>NCERT biology &amp; 50m sprints</span>
                </Link>
                <Link href="/exams/upsc" className="nav-dropdown-item" role="menuitem" onClick={handleDropdownItemClick}>
                  <strong>UPSC Civil Services</strong>
                  <span>Mains answer timers &amp; GS recall</span>
                </Link>
              </div>
            </div>

            <Link href="/tools" className={`nav-btn ${pathname.startsWith('/tools') ? 'active' : ''}`}>
              Free Tools
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
              <PlayStoreIcon size={15} />
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
              {mobileMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
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
              <Link href="/" className="brand-wrap" onClick={handleHomeClick} aria-label="LifeTrack Pro - Mobile Home">
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

            <div className="drawer-section-label">Exams</div>

            <Link href="/exams" className={`mobile-menu-link ${pathname.startsWith('/exams') ? 'active' : ''}`} onClick={closeDrawer}>
              <span className="menu-link-title">
                <TargetIcon size={16} className="menu-link-icon" />
                <span>Exams Hub</span>
              </span>
              <ChevronRightIcon size={14} />
            </Link>

            <div className="drawer-submenu-group">
              <Link href="/exams/jee" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', marginRight: '6px' }}>JEE</span>
                  <span>IIT JEE Study Planner</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
              <Link href="/exams/neet" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', marginRight: '6px' }}>NEET</span>
                  <span>NEET Study Tracker</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
              <Link href="/exams/upsc" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', marginRight: '6px' }}>UPSC</span>
                  <span>UPSC CSE Prep OS</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
            </div>

            <div className="drawer-divider" />

            <div className="drawer-section-label">Tools &amp; Help</div>

            <Link href="/tools" className={`mobile-menu-link ${pathname === '/tools' ? 'active' : ''}`} onClick={closeDrawer}>
              <span className="menu-link-title">
                <CalculatorIcon size={16} className="menu-link-icon" />
                <span>Free Study Tools Hub</span>
              </span>
              <span style={{ fontSize: '9.5px', fontWeight: 800, background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '100px', marginRight: '6px' }}>FREE</span>
              <ChevronRightIcon size={14} />
            </Link>

            <div className="drawer-submenu-group">
              <Link href="/tools/study-timetable-generator" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <TimerIcon size={15} className="menu-link-icon" />
                  <span>Timetable Generator</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
              <Link href="/tools/daily-routine-generator" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <HabitFlameIcon size={15} className="menu-link-icon" />
                  <span>Daily Routine Maker</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
              <Link href="/tools/study-hours-calculator" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <CalculatorIcon size={15} className="menu-link-icon" />
                  <span>Study Hours Calculator</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
              <Link href="/tools/focus-time-calculator" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <HeadphonesIcon size={15} className="menu-link-icon" />
                  <span>Focus Time Calculator</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
              <Link href="/tools/weekly-study-planner" className="mobile-menu-link sub" onClick={closeDrawer}>
                <span className="menu-link-title">
                  <CardsIcon size={15} className="menu-link-icon" />
                  <span>Weekly Study Planner</span>
                </span>
                <ChevronRightIcon size={13} />
              </Link>
            </div>

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
