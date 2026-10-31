'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PhoneSimulator from './PhoneSimulator';
import {
  TimerIcon,
  CardsIcon,
  HabitFlameIcon,
  TargetIcon,
  ChartIcon,
} from './Icons';

const CHAPTERS = [
  {
    id: 'dashboard',
    tabIndex: 'habits',
    num: '01',
    tag: 'HABIT TRACKER',
    title: 'Build Habits That Actually Stick.',
    subtitle: '',
    desc: 'Visual flame streaks and daily rhythm checklists turn study routines into automatic habits. When unexpected emergencies hit, freeze shields protect your streak.',
    image: '/assets/images/app_habit_streak.png',
    alt: 'LifeTrack Pro Home Dashboard and Habit Tracker showing 4-day active streak, daily focus block, and flashcards queue',
    accent: '#F59E0B',
    pillText: 'Habit Tracker',
    icon: HabitFlameIcon,
    metric: 'Streak Freeze Shield',
    metricSub: 'Emergency tokens preserve hard-earned compounding streaks',
    highlights: [
      'Streak Freeze Protection — Missed days don\'t reset your progress',
      'Single-Tap Daily Logging — Seamless friction-free habit tracking',
      'Integrated Study Rhythm — Habits linked directly with focus blocks',
    ],
    link: '/features/habit-tracker',
    linkText: 'Explore Habit Tracker →',
  },
  {
    id: 'focus',
    tabIndex: 'timer',
    num: '02',
    tag: 'Focus Engine',
    title: 'Precision Focus Blocks',
    subtitle: 'Calibrated for 8+ Hour Marathon Revision Days',
    desc: '30-minute and 50-minute Pomodoro blocks engineered to eliminate cognitive fatigue. Built-in 432Hz binaural audio and natural rain soundscapes keep your attention locked even when your screen locks.',
    image: '/assets/images/app_focus_timer.png',
    alt: 'LifeTrack Pro Focus Timer screen featuring 30:00 circular dial, 50m study block, soundscapes, and start button',
    accent: '#3B82F6',
    pillText: 'Focus Timer',
    icon: TimerIcon,
    metric: '97% Completion',
    metricSub: 'Rankers log an average of 4.2 deep blocks daily',
    highlights: [
      '50/10 & 90-min JEE/UPSC exam simulation cadences',
      'Ambient 432Hz binaural focus soundscapes & rain',
      'Background timer continues even on locked device',
    ],
    link: '/features/pomodoro-timer',
    linkText: 'Explore Focus Engine →',
  },
  {
    id: 'vault',
    tabIndex: 'habits',
    num: '03',
    tag: 'Goal Roadmap',
    title: 'Milestone Roadmaps & Vault',
    subtitle: 'Turn Distant Exam Dates Into Daily Micro-Wins',
    desc: 'Deconstruct massive syllabus requirements into structured milestone rings. Monitor your placement or exam countdown with real-time percentage completion dials that update as you complete daily tasks.',
    image: '/assets/images/app_goal_vault.png',
    alt: 'LifeTrack Pro Goal Vault screen displaying 20% progress ring, task checklist, and placement milestone',
    accent: '#10B981',
    pillText: 'Goal Vault',
    icon: TargetIcon,
    metric: '20% Milestone Achieved',
    metricSub: 'Deconstructs 6-month goals into achievable daily steps',
    highlights: [
      'Visual progress rings showing true syllabus completion',
      'Priority milestones for JEE, NEET, and placement targets',
      'Interactive task breakdowns linked to your daily schedule',
    ],
    link: '/features',
    linkText: 'Explore Goal Vault →',
  },
  {
    id: 'learn',
    tabIndex: 'cards',
    num: '04',
    tag: 'Memory Science',
    title: 'SM-2 Active Recall & Syllabus',
    subtitle: 'Expanding Review Schedules Before Memory Decay',
    desc: 'The gold-standard SuperMemo-2 algorithm predicts the exact moment knowledge begins to fade. Automatically schedules high-yield NCERT Biology, Organic Chemistry, or CS formula cards for maximum long-term retention.',
    image: '/assets/images/app_learn_syllabus.png',
    alt: 'LifeTrack Pro Learn Syllabus screen showing curriculum progress, chapter modules, and flashcards',
    accent: '#6366F1',
    pillText: 'SM-2 Flashcards',
    icon: CardsIcon,
    metric: '8 Cards Due Today',
    metricSub: 'Active recall ensures 95%+ exam-day retention',
    highlights: [
      'NCERT line-by-line & formula decks ready to review',
      'Intelligent review queue prevents last-minute cramming',
      'Zero clunky desktop interface — instant mobile recall',
    ],
    link: '/features/spaced-repetition',
    linkText: 'Explore SM-2 Flashcards →',
  },
  {
    id: 'analytics',
    tabIndex: 'analytics',
    num: '05',
    tag: 'Productivity Stats',
    title: 'Discipline Velocity & Reports',
    subtitle: 'Ahead of 92% of Peers in Your Category',
    desc: 'GitHub-style study heatmaps and weekly growth reports provide undeniable proof of your compounding effort. Compare your focus hours against category benchmarks to stay inspired every single day.',
    image: '/assets/images/app_progress_stats.png',
    alt: 'LifeTrack Pro Progress & Stats screen showing Month Growth, 92% peer ranking, and 97% completion ratio',
    accent: '#0284C7',
    pillText: 'Discipline Stats',
    icon: ChartIcon,
    metric: 'Ahead of 92% Peers',
    metricSub: '119.3 verified focus hours logged this month',
    highlights: [
      'GitHub-style daily study intensity heatmaps',
      'Subject time distribution and focus velocity breakdown',
      '100% private, local data with zero tracking or surveillance',
    ],
    link: '/calculator',
    linkText: 'Explore Productivity Stats →',
  },
];

export default function CinematicScrollShowcase() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [viewMode, setViewMode] = useState('app'); // 'app' or 'simulator'
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const pillsBarRef = useRef(null);

  const current = CHAPTERS[activeChapter];

  // Smoothly keep active tab centered in horizontal navigation on mobile WITHOUT scrolling the window
  useEffect(() => {
    const container = pillsBarRef.current;
    if (!container) return;
    const activeBtn = container.querySelector('.fixed-pill-btn.is-active');
    if (activeBtn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const scrollOffset = (btnRect.left - containerRect.left) + container.scrollLeft - (container.clientWidth / 2) + (activeBtn.offsetWidth / 2);
      container.scrollTo({
        left: Math.max(0, scrollOffset),
        behavior: 'smooth',
      });
    }
  }, [activeChapter]);

  const handleNext = () => {
    setActiveChapter((prev) => (prev + 1) % CHAPTERS.length);
  };

  const handlePrev = () => {
    setActiveChapter((prev) => (prev - 1 + CHAPTERS.length) % CHAPTERS.length);
  };

  // Touch Swipe Gesture on Mockup
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swiped Left -> Next
        handleNext();
      } else {
        // Swiped Right -> Prev
        handlePrev();
      }
    }
  };

  return (
    <section className="fixed-showcase-section" id="tour">
      <span id="simulator" style={{ position: 'absolute', top: '-80px', pointerEvents: 'none' }} />
      {/* Soft Ambient Atmospheric Glow with Feathered Fade */}
      <div
        className="fixed-ambient-glow"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 55% 50%, ${current.accent}22 0%, ${current.accent}14 45%, ${current.accent}06 75%, transparent 100%)`,
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Top Header: Title & Mode Switcher */}
        <div className="fixed-showcase-header">
          <div>
            <div className="section-eyebrow" style={{ color: current.accent }}>
              Inside LifeTrack Pro • System {current.num} of 05
            </div>
            <h2 className="section-h2" style={{ color: '#0F172A', margin: 0 }}>
              One Unified Life OS. Zero Card Overload.
            </h2>
          </div>

          <div className="showcase-mode-toggle" role="tablist" aria-label="Tour Mode">
            <button
              type="button"
              className={`mode-toggle-btn ${viewMode === 'app' ? 'is-active' : ''}`}
              onClick={() => setViewMode('app')}
            >
              <span className="mode-dot" style={{ background: '#3B82F6' }} />
              Authentic App
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${viewMode === 'simulator' ? 'is-active' : ''}`}
              onClick={() => setViewMode('simulator')}
            >
              <span className="mode-dot" style={{ background: '#10B981' }} />
              Simulator
            </button>
          </div>
        </div>

        {/* 5 Segmented Pill Buttons with Refined Navigation */}
        <div
          ref={pillsBarRef}
          className="fixed-pills-bar"
          role="tablist"
          aria-label="Feature Chapters"
        >
          {CHAPTERS.map((chap, idx) => {
            const Icon = chap.icon;
            const isActive = idx === activeChapter;
            return (
              <button
                key={chap.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveChapter(idx)}
                className={`fixed-pill-btn ${isActive ? 'is-active' : ''}`}
                style={{
                  '--pill-accent': chap.accent,
                }}
              >
                <Icon size={14} className="pill-icon" />
                <span>{chap.pillText}</span>
              </button>
            );
          })}
        </div>

        {/* Main Stage: Desktop Side-by-side / Mobile Clean Fit */}
        <div className="fixed-stage-layout">

          {/* Left Editorial Card (Desktop) */}
          <div className="fixed-story-card">
            <div className="showcase-card-header">
              <span
                className="showcase-tag"
                style={{
                  color: current.accent,
                  background: `${current.accent}14`,
                  borderColor: `${current.accent}30`,
                }}
              >
                {current.tag}
              </span>
              <span className="showcase-counter">
                {activeChapter + 1} of {CHAPTERS.length} Systems
              </span>
            </div>

            <h3 className="fixed-story-title">{current.title}</h3>
            {current.subtitle ? <div className="fixed-story-subtitle">{current.subtitle}</div> : null}
            <p className="fixed-story-desc">{current.desc}</p>

            <div className="fixed-metric-box" style={{ borderLeftColor: current.accent }}>
              <div className="fixed-metric-val" style={{ color: current.accent }}>
                {current.metric}
              </div>
              <div className="fixed-metric-sub">{current.metricSub}</div>
            </div>

            <ul className="fixed-checklist">
              {current.highlights.map((h, i) => (
                <li key={i} className="fixed-check-item">
                  <span className="fixed-check-icon" style={{ color: current.accent }}>
                    ✓
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="fixed-story-footer">
              <Link
                href={current.link}
                className="fixed-action-btn"
                style={{
                  background: current.accent,
                  color: '#FFFFFF',
                  boxShadow: `0 3px 12px ${current.accent}40`,
                }}
              >
                <span>{current.linkText}</span>
              </Link>

              <div className="fixed-arrows">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="fixed-arrow-btn"
                  title="Previous chapter"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="fixed-arrow-btn"
                  title="Next chapter"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Phone Centerpiece with Touch Swipe */}
          <div
            className="fixed-phone-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Soft Radiant Halo Directly Behind Phone Mockup with smooth round radial decay */}
            <div
              className="fixed-phone-halo"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${current.accent}38 0%, ${current.accent}1c 30%, ${current.accent}06 52%, transparent 68%)`,
              }}
            />

            {viewMode === 'app' ? (
              <div className="fixed-iphone-bezel">
                <div className="fixed-iphone-notch" />
                <div className="fixed-iphone-screen">
                  <Image
                    key={current.image}
                    src={current.image}
                    alt={current.alt}
                    width={1206}
                    height={2622}
                    priority
                    unoptimized
                    className="fixed-iphone-img"
                    sizes="(max-width: 768px) 210px, 350px"
                  />
                </div>
              </div>
            ) : (
              <div className="fixed-sim-wrapper">
                <PhoneSimulator
                  controlledTab={current.tabIndex}
                  onTabChange={(tab) => {
                    const matchedIdx = CHAPTERS.findIndex((c) => c.tabIndex === tab);
                    if (matchedIdx !== -1) setActiveChapter(matchedIdx);
                  }}
                />
              </div>
            )}

            {/* Mobile Controls: Sleek In-Place Navigation Below Phone */}
            <div className="fixed-mobile-nav">
              <div className="fixed-mob-controls-row">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="fixed-mob-arrow"
                  aria-label="Previous system"
                >
                  ←
                </button>

                <div className="fixed-mob-info">
                  <span className="fixed-mob-tag" style={{ color: current.accent }}>
                    {current.tag}
                  </span>
                  <span className="fixed-mob-title">{current.title}</span>
                  <span className="fixed-mob-metric" style={{ color: current.accent }}>
                    {current.metric}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="fixed-mob-arrow"
                  aria-label="Next system"
                >
                  →
                </button>
              </div>

              {/* 5 Dot Indicators */}
              <div className="fixed-mob-dots" role="tablist" aria-label="System Indicators">
                {CHAPTERS.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveChapter(i)}
                    className={`fixed-mob-dot ${i === activeChapter ? 'is-active' : ''}`}
                    style={{
                      background: i === activeChapter ? c.accent : 'rgba(255, 255, 255, 0.22)',
                      width: i === activeChapter ? '22px' : '7px',
                    }}
                    aria-label={`Jump to ${c.pillText}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
