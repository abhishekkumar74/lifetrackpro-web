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
      <div className="cta-btn-group">
        <a
          href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn-primary"
          aria-label="Download LifeTrack Pro on Google Play Store"
        >
          <PlayStoreIcon size={18} />
          <span>Get LifeTrack Pro Free</span>
        </a>
        <Link href="/features" className="cta-btn-secondary" aria-label="Explore all features">
          <SparklesIcon size={15} />
          <span>Explore All Features</span>
        </Link>
      </div>

      <div className="cta-trust-row">
        <div className="cta-trust-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <span>100% Free Forever</span>
        </div>
        <div className="cta-trust-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Zero Hidden Fees</span>
        </div>
        <div className="cta-trust-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Works 100% Offline</span>
        </div>
      </div>
    </>
  );
}
