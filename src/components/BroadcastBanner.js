'use client';
import { useEffect, useState } from 'react';

export default function BroadcastBanner() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const checkBanner = () => {
      try {
        const stored = localStorage.getItem('lifetrack_admin_banner');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.active && parsed.message) {
            setBanner(parsed.message);
            return;
          }
        }
      } catch (e) {}
      setBanner(null);
    };

    checkBanner();
    window.addEventListener('storage', checkBanner);
    return () => window.removeEventListener('storage', checkBanner);
  }, []);

  if (!banner) return null;

  return (
    <div className="broadcast-banner">
      <span className="banner-badge">📣 Live Notice</span>
      <span>{banner}</span>
      <button className="banner-close" onClick={() => setBanner(null)} aria-label="Close banner">
        ✕
      </button>
    </div>
  );
}
