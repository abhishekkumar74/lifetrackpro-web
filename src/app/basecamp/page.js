'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';
import Link from 'next/link';

function LoginForm() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/basecamp/overview';
  const urlError = searchParams.get('error');
  const urlEmail = searchParams.get('email');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Derive initial error message from URL query params
  const urlErrorMessage = useMemo(() => {
    if (!urlError) return '';
    if (urlError === 'unauthorized_email') {
      return `Access Denied: Google account (${urlEmail || 'provided'}) is not authorized as an administrator. Only the configured admin account can access this portal.`;
    }
    if (urlError === 'google_access_denied') {
      return 'Google authentication was cancelled or access was denied.';
    }
    if (urlError === 'session_exchange_failed') {
      return 'Google session exchange failed. Please try signing in again.';
    }
    if (urlError === 'missing_auth_code') {
      return 'Google authentication code was missing. Please try signing in again.';
    }
    if (urlError === 'auth_not_configured') {
      return 'Admin authentication service is not configured in server environment.';
    }
    if (urlError === 'rate_limited') {
      return 'Too many login attempts. Please wait a moment before trying again.';
    }
    if (urlError === 'oauth_init_failed') {
      return 'Could not initialize Google authentication. Please check network connection.';
    }
    return 'Authentication error. Please try again.';
  }, [urlError, urlEmail]);

  const errorMessage = formError || urlErrorMessage;

  // 1. Client-Side Hash Fragment Handler (for implicit OAuth returns #access_token=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash.includes('access_token=') || window.location.hash.includes('error=')) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !anonKey) return;

      const supabase = createBrowserClient(supabaseUrl, anonKey);

      supabase.auth.getSession().then(async ({ data, error }) => {
        setGoogleLoading(true);
        if (error || !data?.session?.user) {
          setFormError('Failed to parse Google authentication tokens from redirect.');
          setGoogleLoading(false);
          return;
        }

        const user = data.session.user;
        try {
          const res = await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              sub: user.id,
              returnTo,
            }),
          });

          const result = await res.json().catch(() => ({}));
          if (res.ok && result.success) {
            window.location.replace(result.redirectUrl || returnTo);
            return;
          }

          setFormError(result.error || 'Google account unauthorized.');
          setGoogleLoading(false);
        } catch {
          setFormError('Network error completing session exchange.');
          setGoogleLoading(false);
        }
      }).catch(() => {
        setGoogleLoading(false);
      });
    }
  }, [returnTo]);

  // 2. Client-Side Google OAuth Trigger via @supabase/ssr (Ensures PKCE cookies are stored locally)
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setFormError('');

    // Production Supabase client environment credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      setFormError('Supabase environment variables are missing.');
      setGoogleLoading(false);
      return;
    }

    try {
      const supabase = createBrowserClient(supabaseUrl, anonKey);
      const callbackUrl = `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(returnTo)}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline',
          },
        },
      });

      if (error) {
        setFormError(error.message || 'Google OAuth failed to start.');
        setGoogleLoading(false);
      }
    } catch (err) {
      console.error('[CLIENT GOOGLE AUTH ERROR]', err);
      setFormError('Failed to initiate Google sign in.');
      setGoogleLoading(false);
    }
  };

  // 3. Password Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnTo }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFormError(data?.error || 'Authentication failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      window.location.replace(data?.redirectUrl || returnTo);
    } catch {
      setFormError('Network error during authentication. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.15) 0%, #06090e 70%)',
    }}>
      <div style={{
        background: '#0d121c',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '40px 32px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
        position: 'relative',
      }}>
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <Image 
              src="/icon.png" 
              alt="LifeTrack Pro" 
              width={48} 
              height={48} 
              style={{ borderRadius: '12px' }} 
            />
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 6px 0' }}>
            Basecamp Access
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-3)', margin: 0 }}>
            LifeTrack Pro Operations Console
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div style={{
            background: 'rgba(255, 83, 118, 0.12)',
            border: '1px solid rgba(255, 83, 118, 0.3)',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '20px',
            fontSize: '13px',
            color: '#ff8a9e',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            lineHeight: 1.45,
          }}>
            <span style={{ fontSize: '16px', lineHeight: 1 }}>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Google Authentication Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}>
          {/* Main Branded Google Button (Client PKCE OAuth) */}
          <button
            id="google-client-signin-btn"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: '#131b29',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: (googleLoading || loading) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box',
              opacity: googleLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!googleLoading && !loading) {
                e.currentTarget.style.background = '#1a2538';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!googleLoading && !loading) {
                e.currentTarget.style.background = '#131b29';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.36 7.36 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.13z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.24 6.58l4.04 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
            </svg>
            <span>{googleLoading ? 'Connecting to Google...' : 'Sign in with Google'}</span>
          </button>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '22px 0',
          gap: '12px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
          <span style={{
            fontSize: '11px',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontWeight: 500,
          }}>
            or sign in with password
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
        </div>

        {/* Password login form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label 
              htmlFor="admin-email" 
              style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '6px' }}
            >
              Administrator Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@lifetrackpro.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || googleLoading}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="admin-password" 
              style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '6px' }}
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || googleLoading}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="btn-main"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: (loading || googleLoading) ? 'not-allowed' : 'pointer',
              opacity: (loading || googleLoading) ? 0.7 : 1,
              marginTop: '4px',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Console →'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link 
            href="/" 
            style={{ fontSize: '12px', color: 'var(--text-3)', textDecoration: 'none' }}
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}>
        Loading security boundary...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
