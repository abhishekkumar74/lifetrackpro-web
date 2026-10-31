'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LinkedInIcon, InstagramIcon, WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

export default function Footer() {
  const pathname = usePathname();

  const handleLogoClick = (e) => {
    if (pathname === '/') {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link 
              href="/" 
              className="brand-wrap footer-brand-link" 
              onClick={handleLogoClick}
              aria-label="LifeTrack Pro Home"
              title="LifeTrack Pro Home"
            >
              <Image 
                src="/icon.png" 
                alt="LifeTrack Pro" 
                width={32} 
                height={32} 
                className="brand-icon-img footer-logo-img"
              />
              <div className="brand-title footer-brand-title" style={{ color: '#FFFFFF' }}>
                LifeTrack <span className="footer-brand-highlight" style={{ color: 'var(--primary-light)' }}>Pro</span>
              </div>
            </Link>
            <p className="footer-desc">
              The all-in-one productivity Life OS combining Pomodoro focus sessions, spaced repetition flashcards, habit tracking, and live study rooms.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Core Features</h4>
              <ul>
                <li><Link href="/features/pomodoro-timer">Pomodoro Timer</Link></li>
                <li><Link href="/features/spaced-repetition">SM-2 Spaced Repetition</Link></li>
                <li><Link href="/features/habit-tracker">Habit Streaks</Link></li>
                <li><Link href="/features/study-rooms">Live Study Rooms</Link></li>
                <li><Link href="/calculator">Focus ROI Calculator</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Target Aspirants</h4>
              <ul>
                <li><Link href="/exams/neet">NEET UG &amp; PG Routine</Link></li>
                <li><Link href="/exams/jee">JEE Main &amp; Advanced</Link></li>
                <li><Link href="/exams/upsc">UPSC Civil Services</Link></li>
                <li><Link href="/features">Tech &amp; Coding Placements</Link></li>
                <li><Link href="/faq">Common Questions</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app" target="_blank" rel="noopener noreferrer">
                    Download on Play Store
                  </a>
                </li>
                <li><Link href="/faq">FAQ Documentation</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/sitemap.xml" target="_blank">XML Sitemap</Link></li>
                <li><Link href="/robots.txt" target="_blank">Robots.txt</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Community</h4>
              <ul>
                <li>
                  <a href="https://chat.whatsapp.com/B8uwXjT9R665ahqcXVsZdk" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                    <WhatsAppIcon size={14} />
                    <span>WhatsApp Group</span>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/lifetrackpro" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                    <TelegramIcon size={14} />
                    <span>Telegram Channel</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/lifetrackpro/" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                    <InstagramIcon size={14} />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/lifetrackpro" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                    <LinkedInIcon size={14} />
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 LifeTrack Pro. All rights reserved. Crafted for serious students.
          </div>
          <div className="footer-bottom-social">
            <a 
              href="https://chat.whatsapp.com/B8uwXjT9R665ahqcXVsZdk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-icon-btn social-whatsapp" 
              aria-label="WhatsApp Community"
              title="WhatsApp Community Group"
            >
              <WhatsAppIcon size={16} />
            </a>
            <a 
              href="https://t.me/lifetrackpro" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-icon-btn social-telegram" 
              aria-label="Telegram Channel"
              title="Telegram Channel"
            >
              <TelegramIcon size={16} />
            </a>
            <a 
              href="https://www.instagram.com/lifetrackpro/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-icon-btn social-instagram" 
              aria-label="Instagram"
              title="Instagram @lifetrackpro"
            >
              <InstagramIcon size={16} />
            </a>
            <a 
              href="https://www.linkedin.com/company/lifetrackpro" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-icon-btn social-linkedin" 
              aria-label="LinkedIn"
              title="LinkedIn Company Page"
            >
              <LinkedInIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
