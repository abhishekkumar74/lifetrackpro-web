'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function SiteBroadcastBanner() {
  const [broadcast, setBroadcast] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  const fetchBroadcast = useCallback(async () => {
    try {
      const res = await fetch(`/api/broadcast?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });
      if (!res.ok) return;
      const data = await res.json();

      if (data?.broadcast?.active && data.broadcast.message) {
        const item = data.broadcast;
        const itemSignature = `${item.message}_${item.updated_at || ''}`;

        // Smart dismissal check:
        // Only consider dismissed if the user explicitly closed THIS exact version
        // in this browser session, AND it was closed recently.
        try {
          const dismissedSig = sessionStorage.getItem('ltp_dismissed_broadcast_sig');
          const dismissedTime = sessionStorage.getItem('ltp_dismissed_broadcast_time');

          if (dismissedSig === itemSignature && dismissedTime) {
            const elapsedMs = Date.now() - parseInt(dismissedTime, 10);
            // In development, auto-expire dismissal after 5 minutes so local testing is never blocked
            const maxDismissMs = process.env.NODE_ENV === 'production' ? 6 * 60 * 60 * 1000 : 5 * 60 * 1000;
            if (elapsedMs < maxDismissMs) {
              setDismissed(true);
            } else {
              setDismissed(false);
              sessionStorage.removeItem('ltp_dismissed_broadcast_sig');
            }
          } else {
            setDismissed(false);
          }
        } catch {
          setDismissed(false);
        }

        setBroadcast(item);
      } else {
        setBroadcast(null);
      }
    } catch {
      // Silently ignore network failures on public banner
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    let active = true;
    const loadInitial = async () => {
      if (active) await fetchBroadcast();
    };
    loadInitial();

    // 1. Cross-tab BroadcastChannel listener for instant admin synchronization
    let bc = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        bc = new BroadcastChannel('ltp_broadcast_channel');
        bc.onmessage = (event) => {
          if (event?.data?.type === 'BROADCAST_UPDATED') {
            // New broadcast from admin: clear dismissal and reload immediately
            try {
              sessionStorage.removeItem('ltp_dismissed_broadcast_sig');
              sessionStorage.removeItem('ltp_dismissed_broadcast');
            } catch {
              // Ignore
            }
            setDismissed(false);
            if (event.data.broadcast) {
              setBroadcast(event.data.broadcast.active ? event.data.broadcast : null);
            } else {
              fetchBroadcast();
            }
          }
        };
      }
    } catch {
      // Ignore if BroadcastChannel not available
    }

    // 2. Storage event listener (fires across tabs when localStorage is updated)
    const handleStorage = (e) => {
      if (e.key === 'ltp_broadcast_sync' || e.key === 'lifetrack_admin_banner') {
        try {
          sessionStorage.removeItem('ltp_dismissed_broadcast_sig');
          sessionStorage.removeItem('ltp_dismissed_broadcast');
        } catch {
          // Ignore
        }
        setDismissed(false);
        fetchBroadcast();
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3. Tab focus & visibility listener (refreshes if user returns to this tab)
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchBroadcast();
      }
    };
    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    // 4. Polling heartbeat every 20 seconds
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchBroadcast();
      }
    }, 20000);

    return () => {
      active = false;
      if (bc) bc.close();
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      clearInterval(interval);
    };
  }, [fetchBroadcast]);

  if (!broadcast || !broadcast.active || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    try {
      const itemSignature = `${broadcast.message}_${broadcast.updated_at || ''}`;
      sessionStorage.setItem('ltp_dismissed_broadcast_sig', itemSignature);
      sessionStorage.setItem('ltp_dismissed_broadcast_time', Date.now().toString());
    } catch {
      // Ignore
    }
  };

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'warning':
        return {
          background: 'linear-gradient(90deg, #D97706 0%, #B45309 100%)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.4)',
          color: '#FFFFFF',
        };
      case 'critical':
        return {
          background: 'linear-gradient(90deg, #E11D48 0%, #BE123C 100%)',
          borderBottom: '1px solid rgba(244, 63, 94, 0.4)',
          color: '#FFFFFF',
        };
      case 'success':
        return {
          background: 'linear-gradient(90deg, #059669 0%, #047857 100%)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#FFFFFF',
        };
      case 'info':
      default:
        return {
          background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.4)',
          color: '#FFFFFF',
        };
    }
  };

  const currentStyle = getSeverityStyle(broadcast.severity);

  return (
    <div
      id="site-broadcast-banner"
      role="alert"
      aria-live="polite"
      style={{
        ...currentStyle,
        position: 'relative',
        zIndex: 100,
        fontSize: '13px',
        fontWeight: 600,
        padding: '10px 16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 1.4,
        width: '100%',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', paddingRight: '28px' }}>
        <span aria-hidden="true" style={{ fontSize: '15px' }}>
          {broadcast.severity === 'critical' ? '🚨' : broadcast.severity === 'warning' ? '⚠️' : broadcast.severity === 'success' ? '✨' : '📢'}
        </span>
        <span style={{ letterSpacing: '-0.01em' }}>{broadcast.message}</span>
        {broadcast.link_url && (
          <Link
            href={broadcast.link_url}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#FFFFFF',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              fontWeight: 700,
              marginLeft: '4px',
            }}
          >
            {broadcast.link_text || 'Learn more →'}
          </Link>
        )}
      </div>

      <button
        type="button"
        id="dismiss-broadcast-btn"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          lineHeight: 1,
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; }}
      >
        ✕
      </button>
    </div>
  );
}
