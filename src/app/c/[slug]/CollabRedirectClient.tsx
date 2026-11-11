'use client';

import React, { useEffect, useState } from 'react';
import { PostHogCollabEventProperties } from '@/types/collab';

interface CollabRedirectClientProps {
  destinationUrl: string;
  partnerName: string;
  eventPayload: PostHogCollabEventProperties;
  posthogApiKey?: string;
  posthogHost?: string;
}

export function CollabRedirectClient({
  destinationUrl,
  partnerName,
  eventPayload,
  posthogApiKey,
  posthogHost = 'https://app.posthog.com',
}: CollabRedirectClientProps) {
  const [redirecting, setRedirecting] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(2);

  useEffect(() => {
    let isCancelled = false;

    // Send client-side PostHog event safely
    const sendPostHogEvent = async (): Promise<void> => {
      // 1. If PostHog is loaded on window
      if (typeof window !== 'undefined' && (window as unknown as { posthog?: { capture: (event: string, props: unknown) => void } }).posthog) {
        try {
          (window as unknown as { posthog: { capture: (event: string, props: unknown) => void } }).posthog.capture(
            'collab_link_landed',
            eventPayload
          );
        } catch (e) {
          console.warn('[PostHog] Client capture warning:', e);
        }
      } else if (posthogApiKey) {
        // Direct beacon fallback
        try {
          const distinctId = 'anon_' + Math.random().toString(36).substring(2, 15);
          await fetch(`${posthogHost}/capture/`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              api_key: posthogApiKey,
              event: 'collab_link_landed',
              distinct_id: distinctId,
              properties: {
                ...eventPayload,
                $current_url: window.location.href,
                $referrer: document.referrer,
              },
            }),
          });
        } catch {
          // Non-blocking
        }
      }
    };

    // Safe execution: Give beacon 150ms to dispatch before navigating
    const executeRedirect = async () => {
      try {
        await Promise.race([
          sendPostHogEvent(),
          new Promise((resolve) => setTimeout(resolve, 200)),
        ]);
      } finally {
        if (!isCancelled) {
          // Instant seamless replace to avoid browser back-button loops
          window.location.replace(destinationUrl);
        }
      }
    };

    executeRedirect();

    // 1-second interval ticker for visual feedback
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      isCancelled = true;
      clearInterval(timer);
    };
  }, [destinationUrl, eventPayload, posthogApiKey, posthogHost]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0F19',
        color: '#F8FAFC',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '36px 28px',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* App Icon / Logo */}
        <div
          style={{
            width: '72px',
            height: '72px',
            margin: '0 auto 20px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: '22px',
            fontWeight: 700,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
          }}
        >
          LifeTrack Pro
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: '#94A3B8',
            margin: '0 0 24px',
            lineHeight: 1.5,
          }}
        >
          Partner link from <span style={{ color: '#60A5FA', fontWeight: 600 }}>{partnerName}</span>
        </p>

        {/* Loading Spinner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            margin: '20px 0',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '3px solid rgba(255, 255, 255, 0.15)',
              borderTopColor: '#3B82F6',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <span style={{ fontSize: '14px', color: '#CBD5E1', fontWeight: 500 }}>
            Redirecting to Google Play...
          </span>
        </div>

        <p style={{ fontSize: '12px', color: '#64748B', margin: '16px 0 24px' }}>
          Taking you to the official Play Store download page.
        </p>

        {/* Direct Button Fallback */}
        <a
          href={destinationUrl}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '13px 20px',
            background: '#2563EB',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'background 0.15s ease',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.793 12 3.61 22.186c-.279-.27-.443-.647-.443-1.07V2.884c0-.423.164-.8.442-1.07zm11.232 11.233l2.454-2.454-12.012-6.84 9.558 9.294zm0-2.094L5.283 1.66 17.295 8.5l-2.454 2.453zm1.048 1.047l3.633 2.067c.712.405.712 1.066 0 1.471l-3.633 2.067-2.613-2.802 2.613-2.803z" />
          </svg>
          Open in Google Play
        </a>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
