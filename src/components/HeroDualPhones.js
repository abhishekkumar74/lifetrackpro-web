'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HeroDualPhones() {
  // hoveredPhone: 'dashboard' | 'timer' | null
  // By default (null), Dashboard is in front as requested: "by default Dashboard upar rhega"
  const [hoveredPhone, setHoveredPhone] = useState(null);

  const isTimerHovered = hoveredPhone === 'timer';
  const isDashboardActive = !isTimerHovered; // true by default or when hovering dashboard

  return (
    <div
      className={`hero-phones-stage hero-fade-in hero-fade-in-delay-3 ${
        isTimerHovered ? 'stage-timer-active' : 'stage-dashboard-active'
      }`}
      onMouseLeave={() => setHoveredPhone(null)}
    >
      <div className="hero-ambient-cloud" aria-hidden="true" />

      {/* Primary Phone (Dashboard D.png) - Default Front */}
      <div
        className={`hero-phone-item hero-phone-primary ${
          isDashboardActive ? 'is-front' : 'is-back'
        }`}
        onMouseEnter={() => setHoveredPhone('dashboard')}
        onClick={() => setHoveredPhone(isDashboardActive && hoveredPhone ? null : 'dashboard')}
        role="button"
        tabIndex={0}
        aria-label="LifeTrack Pro Daily Planner and Habit Dashboard Screen"
      >
        <div className="hero-phone-notch" />
        <div className="hero-phone-screen">
          <Image
            src="/assets/images/D.png"
            alt="LifeTrack Pro Daily Planner & Habit Dashboard Interface"
            width={600}
            height={1300}
            priority
            sizes="(max-width: 640px) 200px, 260px"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Secondary Phone (Focus Timer F1.png) - Swaps to Front when hovered */}
      <div
        className={`hero-phone-item hero-phone-secondary ${
          isTimerHovered ? 'is-front' : 'is-back'
        }`}
        onMouseEnter={() => setHoveredPhone('timer')}
        onClick={() => setHoveredPhone(isTimerHovered ? null : 'timer')}
        role="button"
        tabIndex={0}
        aria-label="LifeTrack Pro Focus Timer & Deep Work Session Screen"
      >
        <div className="hero-phone-notch" />
        <div className="hero-phone-screen">
          <Image
            src="/assets/images/F1.png"
            alt="LifeTrack Pro Focus Timer & Deep Work Session Screen"
            width={600}
            height={1300}
            priority
            sizes="(max-width: 640px) 190px, 250px"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}
