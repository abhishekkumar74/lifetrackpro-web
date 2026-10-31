'use client';

import PlayStoreIcon from '@/components/PlayStoreIcon';
import { SparklesIcon } from '@/components/Icons';
import Link from 'next/link';

export function HeroDownloadCta() {
  return (
    <div className="hero-cta-group hero-fade-in hero-fade-in-delay-3">
      <a
        href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-pill-primary"
        aria-label="Download LifeTrack Pro for Android on Google Play Store"
      >
        <span>Download for Android</span>
        <span className="btn-pill-arrow-chip" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </a>
      <a href="#tour" className="btn-pill-secondary" aria-label="Explore the LifeTrack Pro App">
        <SparklesIcon size={15} />
        <span>Explore the App</span>
      </a>
    </div>
  );
}

export function BottomDownloadCta() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <a
          href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-main"
          aria-label="Download LifeTrack Pro on Google Play Store"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <PlayStoreIcon size={17} />
          <span>Get LifeTrack Pro Free</span>
        </a>
        <Link href="/features" className="btn-glass" aria-label="Explore all features">
          <SparklesIcon size={16} />
          <span>Explore All Features</span>
        </Link>
      </div>

      <div className="cta-trust-row">
        <span className="cta-trust-item">✓ 100% Free Forever</span>
        <span>•</span>
        <span className="cta-trust-item">✓ Zero Hidden Fees</span>
        <span>•</span>
        <span className="cta-trust-item">✓ Works 100% Offline</span>
      </div>
    </>
  );
}
