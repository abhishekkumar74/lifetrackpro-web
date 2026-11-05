/**
 * LifeTrack Pro — Study Efficiency & Focus Time ROI Calculation Engine
 * 
 * Computes:
 * - Direct Distraction Time & Cognitive Refocus Recovery Lag (Attention Residue)
 * - Total Lost Study Time (Daily, Weekly, Monthly)
 * - Potential Recoverable Focus Hours
 * - Estimated Study Efficiency Percentage
 * - What-If Improvement Scenarios (25%, 50%, 75%, 100%, Custom)
 * - Personalized, input-derived recommendations
 */

export const WEEKS_PER_MONTH = 4.345;

export const DEFAULT_DISTRACTION_CATEGORIES = [
  {
    id: 'notifications',
    name: 'Push & Message Notifications',
    icon: '🔔',
    description: 'Phone pings, WhatsApp/Telegram groups, email alerts',
    defaultFrequency: 12, // per day
    defaultDurationMins: 2.5, // direct minutes per instance
    enabled: true,
  },
  {
    id: 'social_media',
    name: 'Social Media & Short Video Feeds',
    icon: '📱',
    description: 'Instagram reels, YouTube shorts, Twitter/X, Reddit scrolling',
    defaultFrequency: 6,
    defaultDurationMins: 6,
    enabled: true,
  },
  {
    id: 'app_switching',
    name: 'Unnecessary App & Tab Switching',
    icon: '🔀',
    description: 'Jumping between disparate timers, note apps, PDFs, browser tabs',
    defaultFrequency: 8,
    defaultDurationMins: 2,
    enabled: true,
  },
  {
    id: 'rabbit_holes',
    name: 'Unplanned Web Browsing / Rabbit Holes',
    icon: '🌐',
    description: 'Googling tangential queries, shopping, news during study blocks',
    defaultFrequency: 3,
    defaultDurationMins: 8,
    enabled: true,
  },
  {
    id: 'environmental',
    name: 'Physical & Ambient Interruptions',
    icon: '🚪',
    description: 'Family walk-ins, roommate chats, hostel noise, snack trips',
    defaultFrequency: 4,
    defaultDurationMins: 5,
    enabled: true,
  },
];

/**
 * Validates and clamps a number between min and max
 */
export function clamp(val, min, max, defaultVal) {
  const n = Number(val);
  if (isNaN(n)) return defaultVal;
  return Math.max(min, Math.min(max, n));
}

/**
 * Computes Quick Mode Focus ROI
 */
export function calculateQuickRoi({
  dailyStudyHours = 6,
  studyDaysPerWeek = 6,
  interruptionsPerDay = 15,
  avgDistractionMins = 4,
  avgRefocusMins = 5,
  avoidablePercent = 70,
}) {
  const validDailyHours = clamp(dailyStudyHours, 0.5, 16, 6);
  const validDaysPerWeek = clamp(studyDaysPerWeek, 1, 7, 6);
  const validInterruptions = clamp(interruptionsPerDay, 0, 100, 15);
  const validDistractionMins = clamp(avgDistractionMins, 0, 60, 4);
  const validRefocusMins = clamp(avgRefocusMins, 0, 30, 5);
  const validAvoidablePct = clamp(avoidablePercent, 0, 100, 70);

  // Time Planned
  const dailyPlannedMinutes = validDailyHours * 60;
  const weeklyPlannedHours = Number((validDailyHours * validDaysPerWeek).toFixed(1));
  const monthlyStudyDays = Number((validDaysPerWeek * WEEKS_PER_MONTH).toFixed(1));
  const monthlyPlannedHours = Number((validDailyHours * monthlyStudyDays).toFixed(1));

  // Time Lost (Raw)
  const rawDirectMins = validInterruptions * validDistractionMins;
  const rawRefocusMins = validInterruptions * validRefocusMins;
  const rawTotalLostMins = rawDirectMins + rawRefocusMins;

  // Cap lost minutes so it never exceeds planned study time
  const cappedTotalLostMins = Math.min(dailyPlannedMinutes, rawTotalLostMins);
  const scalingRatio = rawTotalLostMins > 0 ? cappedTotalLostMins / rawTotalLostMins : 1;

  const directDistractionMins = Math.round(rawDirectMins * scalingRatio);
  const focusRecoveryMins = Math.round(rawRefocusMins * scalingRatio);
  const dailyLostMins = directDistractionMins + focusRecoveryMins;
  const dailyLostHours = Number((dailyLostMins / 60).toFixed(2));

  // Recoverable Time
  const dailyRecoverableMins = Math.round(dailyLostMins * (validAvoidablePct / 100));
  const dailyRecoverableHours = Number((dailyRecoverableMins / 60).toFixed(2));
  const weeklyRecoverableHours = Number(((dailyRecoverableMins * validDaysPerWeek) / 60).toFixed(1));
  const monthlyRecoverableHours = Number(((dailyRecoverableMins * monthlyStudyDays) / 60).toFixed(1));

  // Cumulative Weekly & Monthly Lost
  const weeklyLostHours = Number(((dailyLostMins * validDaysPerWeek) / 60).toFixed(1));
  const monthlyLostHours = Number(((dailyLostMins * monthlyStudyDays) / 60).toFixed(1));

  // Efficiency
  const netProductiveMinutes = Math.max(0, dailyPlannedMinutes - dailyLostMins);
  const efficiencyPercent = dailyPlannedMinutes > 0
    ? Math.round((netProductiveMinutes / dailyPlannedMinutes) * 100)
    : 0;

  // Additional 50-minute Pomodoro sessions gained per month
  const extraSessionsMonthly = Math.floor((monthlyRecoverableHours * 60) / 50);

  // Efficiency Rating
  let ratingLabel = 'Optimal Focus';
  let ratingColor = '#10B981';
  let ratingBg = '#ECFDF5';
  let ratingBorder = '#A7F3D0';

  if (efficiencyPercent < 55) {
    ratingLabel = 'Critical Focus Leak';
    ratingColor = '#EF4444';
    ratingBg = '#FEF2F2';
    ratingBorder = '#FECACA';
  } else if (efficiencyPercent < 75) {
    ratingLabel = 'Moderate Focus Residue';
    ratingColor = '#F59E0B';
    ratingBg = '#FFFBEB';
    ratingBorder = '#FDE68A';
  } else if (efficiencyPercent < 90) {
    ratingLabel = 'Good Academic Efficiency';
    ratingColor = '#6366F1';
    ratingBg = '#EEF2FF';
    ratingBorder = '#C7D2FE';
  }

  return {
    mode: 'quick',
    inputs: {
      dailyStudyHours: validDailyHours,
      studyDaysPerWeek: validDaysPerWeek,
      interruptionsPerDay: validInterruptions,
      avgDistractionMins: validDistractionMins,
      avgRefocusMins: validRefocusMins,
      avoidablePercent: validAvoidablePct,
    },
    planned: {
      dailyMinutes: dailyPlannedMinutes,
      dailyHours: validDailyHours,
      weeklyHours: weeklyPlannedHours,
      monthlyStudyDays,
      monthlyHours: monthlyPlannedHours,
    },
    loss: {
      directMinutes: directDistractionMins,
      refocusMinutes: focusRecoveryMins,
      dailyMinutes: dailyLostMins,
      dailyHours: dailyLostHours,
      weeklyHours: weeklyLostHours,
      monthlyHours: monthlyLostHours,
      directPercentOfLoss: dailyLostMins > 0 ? Math.round((directDistractionMins / dailyLostMins) * 100) : 50,
      refocusPercentOfLoss: dailyLostMins > 0 ? Math.round((focusRecoveryMins / dailyLostMins) * 100) : 50,
    },
    recoverable: {
      dailyMinutes: dailyRecoverableMins,
      dailyHours: dailyRecoverableHours,
      weeklyHours: weeklyRecoverableHours,
      monthlyHours: monthlyRecoverableHours,
      extraPomodoroSessions: extraSessionsMonthly,
    },
    efficiency: {
      percent: efficiencyPercent,
      label: ratingLabel,
      color: ratingColor,
      bg: ratingBg,
      border: ratingBorder,
    },
  };
}

/**
 * Computes Advanced Mode Focus ROI with granular categories
 */
export function calculateAdvancedRoi({
  sessionDurationMins = 50,
  sessionsPerDay = 6,
  studyDaysPerWeek = 6,
  avgRefocusMins = 5,
  avoidablePercent = 75,
  categories = DEFAULT_DISTRACTION_CATEGORIES,
}) {
  const validSessionMins = clamp(sessionDurationMins, 15, 180, 50);
  const validSessionsPerDay = clamp(sessionsPerDay, 1, 20, 6);
  const validDaysPerWeek = clamp(studyDaysPerWeek, 1, 7, 6);
  const validRefocusMins = clamp(avgRefocusMins, 0, 30, 5);
  const validAvoidablePct = clamp(avoidablePercent, 0, 100, 75);

  const dailyPlannedMinutes = validSessionMins * validSessionsPerDay;
  const dailyPlannedHours = Number((dailyPlannedMinutes / 60).toFixed(1));
  const weeklyPlannedHours = Number((dailyPlannedHours * validDaysPerWeek).toFixed(1));
  const monthlyStudyDays = Number((validDaysPerWeek * WEEKS_PER_MONTH).toFixed(1));
  const monthlyPlannedHours = Number((dailyPlannedHours * monthlyStudyDays).toFixed(1));

  // Compute category breakdown
  let totalInterruptions = 0;
  let rawDirectMinutes = 0;

  const categoryBreakdown = categories.map((cat) => {
    if (!cat.enabled) {
      return {
        ...cat,
        frequency: 0,
        directMinutes: 0,
        refocusMinutes: 0,
        totalMinutes: 0,
      };
    }
    const freq = clamp(cat.frequency ?? cat.defaultFrequency, 0, 100, 5);
    const dur = clamp(cat.durationMins ?? cat.defaultDurationMins, 0, 60, 3);
    const directMins = freq * dur;
    const refocMins = freq * validRefocusMins;

    totalInterruptions += freq;
    rawDirectMinutes += directMins;

    return {
      ...cat,
      frequency: freq,
      durationMins: dur,
      directMinutes: directMins,
      refocusMinutes: refocMins,
      totalMinutes: directMins + refocMins,
    };
  });

  const rawRefocusMinutes = totalInterruptions * validRefocusMins;
  const rawTotalLostMins = rawDirectMinutes + rawRefocusMinutes;

  // Cap to planned study time
  const cappedTotalLostMins = Math.min(dailyPlannedMinutes, rawTotalLostMins);
  const scalingRatio = rawTotalLostMins > 0 ? cappedTotalLostMins / rawTotalLostMins : 1;

  const directDistractionMins = Math.round(rawDirectMinutes * scalingRatio);
  const focusRecoveryMins = Math.round(rawRefocusMinutes * scalingRatio);
  const dailyLostMins = directDistractionMins + focusRecoveryMins;
  const dailyLostHours = Number((dailyLostMins / 60).toFixed(2));

  // Apply scaling to individual categories
  const finalCategories = categoryBreakdown.map((cat) => ({
    ...cat,
    directMinutes: Math.round(cat.directMinutes * scalingRatio),
    refocusMinutes: Math.round(cat.refocusMinutes * scalingRatio),
    totalMinutes: Math.round(cat.totalMinutes * scalingRatio),
    percentOfTotalLoss: dailyLostMins > 0 ? Math.round((Math.round(cat.totalMinutes * scalingRatio) / dailyLostMins) * 100) : 0,
  }));

  // Recoverable calculations
  const dailyRecoverableMins = Math.round(dailyLostMins * (validAvoidablePct / 100));
  const dailyRecoverableHours = Number((dailyRecoverableMins / 60).toFixed(2));
  const weeklyRecoverableHours = Number(((dailyRecoverableMins * validDaysPerWeek) / 60).toFixed(1));
  const monthlyRecoverableHours = Number(((dailyRecoverableMins * monthlyStudyDays) / 60).toFixed(1));

  const weeklyLostHours = Number(((dailyLostMins * validDaysPerWeek) / 60).toFixed(1));
  const monthlyLostHours = Number(((dailyLostMins * monthlyStudyDays) / 60).toFixed(1));

  // Efficiency
  const netProductiveMinutes = Math.max(0, dailyPlannedMinutes - dailyLostMins);
  const efficiencyPercent = dailyPlannedMinutes > 0
    ? Math.round((netProductiveMinutes / dailyPlannedMinutes) * 100)
    : 0;

  const extraSessionsMonthly = Math.floor((monthlyRecoverableHours * 60) / validSessionMins);

  let ratingLabel = 'Optimal Focus';
  let ratingColor = '#10B981';
  let ratingBg = '#ECFDF5';
  let ratingBorder = '#A7F3D0';

  if (efficiencyPercent < 55) {
    ratingLabel = 'Critical Focus Leak';
    ratingColor = '#EF4444';
    ratingBg = '#FEF2F2';
    ratingBorder = '#FECACA';
  } else if (efficiencyPercent < 75) {
    ratingLabel = 'Moderate Focus Residue';
    ratingColor = '#F59E0B';
    ratingBg = '#FFFBEB';
    ratingBorder = '#FDE68A';
  } else if (efficiencyPercent < 90) {
    ratingLabel = 'Good Academic Efficiency';
    ratingColor = '#6366F1';
    ratingBg = '#EEF2FF';
    ratingBorder = '#C7D2FE';
  }

  return {
    mode: 'advanced',
    inputs: {
      sessionDurationMins: validSessionMins,
      sessionsPerDay: validSessionsPerDay,
      studyDaysPerWeek: validDaysPerWeek,
      avgRefocusMins: validRefocusMins,
      avoidablePercent: validAvoidablePct,
      categories: finalCategories,
      totalInterruptions,
    },
    planned: {
      dailyMinutes: dailyPlannedMinutes,
      dailyHours: dailyPlannedHours,
      weeklyHours: weeklyPlannedHours,
      monthlyStudyDays,
      monthlyHours: monthlyPlannedHours,
    },
    loss: {
      directMinutes: directDistractionMins,
      refocusMinutes: focusRecoveryMins,
      dailyMinutes: dailyLostMins,
      dailyHours: dailyLostHours,
      weeklyHours: weeklyLostHours,
      monthlyHours: monthlyLostHours,
      directPercentOfLoss: dailyLostMins > 0 ? Math.round((directDistractionMins / dailyLostMins) * 100) : 50,
      refocusPercentOfLoss: dailyLostMins > 0 ? Math.round((focusRecoveryMins / dailyLostMins) * 100) : 50,
      categories: finalCategories,
    },
    recoverable: {
      dailyMinutes: dailyRecoverableMins,
      dailyHours: dailyRecoverableHours,
      weeklyHours: weeklyRecoverableHours,
      monthlyHours: monthlyRecoverableHours,
      extraPomodoroSessions: extraSessionsMonthly,
    },
    efficiency: {
      percent: efficiencyPercent,
      label: ratingLabel,
      color: ratingColor,
      bg: ratingBg,
      border: ratingBorder,
    },
  };
}

/**
 * Calculates What-If Scenarios (25%, 50%, 75%, 100%, and custom % reduction in interruptions)
 */
export function calculateWhatIfScenarios(calcResult, customReductionPercent = 40) {
  const dailyLostMins = calcResult.loss.dailyMinutes || 0;
  const monthlyStudyDays = calcResult.planned.monthlyStudyDays || 26;
  const studyDaysPerWeek = calcResult.inputs.studyDaysPerWeek || 6;
  const sessionMins = calcResult.mode === 'advanced' ? (calcResult.inputs.sessionDurationMins || 50) : 50;

  const steps = [
    { percent: 25, label: 'Modest Cut (25%)', subtitle: 'Silence notifications & close social apps' },
    { percent: 50, label: 'Disciplined Guard (50%)', subtitle: 'Scheduled phone checks only between blocks' },
    { percent: 75, label: 'Deep Work Flow (75%)', subtitle: 'Full focus mode with ambient noise blocking' },
    { percent: 100, label: 'Monk Mode (100%)', subtitle: 'Zero avoidable interruptions during study' },
    { percent: clamp(customReductionPercent, 5, 95, 40), label: `Custom Target (${clamp(customReductionPercent, 5, 95, 40)}%)`, subtitle: 'Your chosen reduction milestone', isCustom: true },
  ];

  return steps.map((s) => {
    const dailySavedMins = Math.round(dailyLostMins * (s.percent / 100));
    const dailySavedHours = Number((dailySavedMins / 60).toFixed(1));
    const weeklySavedHours = Number(((dailySavedMins * studyDaysPerWeek) / 60).toFixed(1));
    const monthlySavedHours = Number(((dailySavedMins * monthlyStudyDays) / 60).toFixed(1));
    const extraSessions = Math.floor((monthlySavedHours * 60) / sessionMins);

    return {
      percent: s.percent,
      label: s.label,
      subtitle: s.subtitle,
      isCustom: s.isCustom || false,
      dailyHours: dailySavedHours,
      dailyMins: dailySavedMins,
      weeklyHours: weeklySavedHours,
      monthlyHours: monthlySavedHours,
      extraSessions,
    };
  });
}

/**
 * Generates personalized recommendations based on actual calculator inputs
 */
export function generateRecommendations(calcResult) {
  const recs = [];
  const { loss, inputs, efficiency } = calcResult;

  // 1. Refocus Lag / Attention Residue
  if (inputs.avgRefocusMins >= 6) {
    recs.push({
      id: 'refocus_lag',
      icon: '🧠',
      title: 'Address Attention Residue Lag',
      tag: 'Cognitive Science',
      description: `Your estimated focus recovery time (${inputs.avgRefocusMins} mins/interruption) causes significant "attention residue." Gloria Mark's cognitive research shows full mental re-engagement takes time. Try setting a strict 50-minute "no-screen-exit" rule per session.`,
      action: 'Use 50m Focus Sprints without switching screens',
    });
  }

  // 2. High Interruptions
  const totalInterr = calcResult.mode === 'advanced' ? (inputs.totalInterruptions || 0) : (inputs.interruptionsPerDay || 0);
  if (totalInterr >= 15) {
    recs.push({
      id: 'high_interruptions',
      icon: '🛡️',
      title: 'Implement an Interruption Firewall',
      tag: 'Urgent Recalibration',
      description: `With ~${totalInterr} interruptions daily, your brain enters constant context switching. Put your phone in another room or activate Do-Not-Disturb on your device during dedicated study blocks.`,
      action: 'Store phone outside study perimeter',
    });
  }

  // 3. Category-Specific Insights (Advanced Mode)
  if (calcResult.mode === 'advanced' && loss.categories) {
    const sorted = [...loss.categories].sort((a, b) => b.totalMinutes - a.totalMinutes);
    const topCat = sorted[0];

    if (topCat && topCat.totalMinutes > 20) {
      if (topCat.id === 'notifications') {
        recs.push({
          id: 'top_notifications',
          icon: '🔕',
          title: 'Batch Notification Checks',
          tag: 'Top Distraction Source',
          description: `Push notifications account for ~${topCat.totalMinutes} daily lost minutes. Rather than checking messages real-time, schedule two 10-minute "inbox review windows" per day.`,
          action: 'Batch check WhatsApp & Telegram after study blocks',
        });
      } else if (topCat.id === 'social_media') {
        recs.push({
          id: 'top_social_media',
          icon: '🛑',
          title: 'Establish Social Media Blackouts',
          tag: 'Dopamine Loop Risk',
          description: `Short-form video and social scrolling consume ~${topCat.totalMinutes} minutes daily. The variable dopamine reward creates strong impulse cravings. Block feed apps completely between 9 AM and 6 PM.`,
          action: 'Impose study-hours app lock on reel feeds',
        });
      } else if (topCat.id === 'app_switching') {
        recs.push({
          id: 'top_app_switching',
          icon: '📦',
          title: 'Unify Fragmented Study Tools',
          tag: 'Tooling Overhead',
          description: `Jumping between disconnected study tools costs ~${topCat.totalMinutes} daily minutes. Consolidate your timer, flashcard drills, and daily habit tracking into a unified single-purpose Study OS.`,
          action: 'Consolidate workflow into LifeTrack Pro',
        });
      } else if (topCat.id === 'rabbit_holes') {
        recs.push({
          id: 'top_rabbit_holes',
          icon: '📝',
          title: 'Maintain an Off-Task "Curiosity Pad"',
          tag: 'Browser Discipline',
          description: `Tangential search queries drain ~${topCat.totalMinutes} daily minutes. Keep a physical sticky pad on your desk. When an off-topic query arises, write it down and search only during scheduled breaks.`,
          action: 'Jot questions on paper; research only after focus block',
        });
      } else if (topCat.id === 'environmental') {
        recs.push({
          id: 'top_environmental',
          icon: '🎧',
          title: 'Signal Active Focus to Roommates / Family',
          tag: 'Boundary Setting',
          description: `Physical interruptions consume ~${topCat.totalMinutes} daily minutes. Use closed doors, study room ambient audio, or noise-cancelling headphones as a clear visual signal that you are in a non-interruptible block.`,
          action: 'Set a visual "Deep Study" sign and wear headphones',
        });
      }
    }
  }

  // 4. Efficiency Recommendation
  if (efficiency.percent < 70) {
    recs.push({
      id: 'efficiency_recovery',
      icon: '📈',
      title: 'Target 80%+ Study Efficiency',
      tag: 'Strategic Goal',
      description: `Your current study efficiency is ~${efficiency.percent}%. By reducing avoidable distractions by just 50%, you could unlock approximately ${calcResult.recoverable.monthlyHours} hours of deep study time this month.`,
      action: 'Recover ~50% avoidable distractions this week',
    });
  } else {
    recs.push({
      id: 'high_efficiency_maintain',
      icon: '⭐',
      title: 'Protect Your High-Purity Focus State',
      tag: 'Strong Discipline',
      description: `You are maintaining a strong ${efficiency.percent}% study efficiency rating. Protect your morning peak alertness window for the most mathematically demanding problem sets.`,
      action: 'Schedule hardest concepts during your first 2 hours',
    });
  }

  return recs.slice(0, 4);
}

/**
 * Generates plain text report for clipboard export
 */
export function generateRoiTextExport(calcResult, studentName = '', examName = '') {
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const studentHeader = studentName ? `Student: ${studentName}` : 'Student: Academic Aspirant';
  const examHeader = examName ? `Target Exam: ${examName}` : 'Target: Competitive Academic Preparation';

  let lines = [
    `════════════════════════════════════════════════════════════`,
    `   LIFETRACK PRO — STUDY EFFICIENCY & FOCUS TIME ROI REPORT `,
    `════════════════════════════════════════════════════════════`,
    `Date Generated: ${dateStr}`,
    `${studentHeader} | ${examHeader}`,
    `Calculator Mode: ${calcResult.mode === 'advanced' ? 'Advanced Granular Distraction Audit' : 'Quick Study Efficiency Check'}`,
    ``,
    `1. STUDY TIME BASELINE`,
    `   • Planned Daily Study: ${calcResult.planned.dailyHours} hours/day`,
    `   • Study Days Per Week: ${calcResult.inputs.studyDaysPerWeek} days/week`,
    `   • Net Monthly Study Days: ${calcResult.planned.monthlyStudyDays} days`,
    `   • Gross Planned Monthly Study: ${calcResult.planned.monthlyHours} hours`,
    ``,
    `2. ESTIMATED TIME LOSS & ATTENTION RESIDUE`,
    `   • Daily Direct Distraction: ${calcResult.loss.directMinutes} minutes`,
    `   • Daily Cognitive Refocus Lag: ${calcResult.loss.refocusMinutes} minutes`,
    `   • Total Daily Time Lost: ${calcResult.loss.dailyMinutes} mins (~${calcResult.loss.dailyHours} hours/day)`,
    `   • Total Weekly Time Lost: ${calcResult.loss.weeklyHours} hours/week`,
    `   • Total Monthly Time Lost: ${calcResult.loss.monthlyHours} hours/month`,
    `   • Calculated Study Efficiency: ${calcResult.efficiency.percent}% (${calcResult.efficiency.label})`,
    ``,
    `3. POTENTIAL FOCUS TIME RECOVERY (ROI)`,
    `   • Avoidable Interruption Rate: ${calcResult.inputs.avoidablePercent}%`,
    `   • Daily Recoverable Focus: ~${calcResult.recoverable.dailyHours} hours/day (${calcResult.recoverable.dailyMinutes} mins)`,
    `   • Weekly Recoverable Focus: ~${calcResult.recoverable.weeklyHours} hours/week`,
    `   • MONTHLY RECOVERABLE FOCUS: ~${calcResult.recoverable.monthlyHours} HOURS / MONTH`,
    `   • Equivalent 50-Min Pomodoro Blocks: +${calcResult.recoverable.extraPomodoroSessions} deep sessions unlocked`,
    ``,
    `4. WHAT-IF SCENARIOS (REDUCING INTERRUPTIONS)`,
  ];

  const scenarios = calculateWhatIfScenarios(calcResult);
  scenarios.forEach((sc) => {
    lines.push(`   • ${sc.label}: +${sc.monthlyHours} hrs/mo (+${sc.dailyHours}h/day, +${sc.extraSessions} Pomodoros)`);
  });

  lines.push(
    ``,
    `* Disclaimer: All figures are mathematical projections based on user-supplied parameters and cognitive science estimates. Not guaranteed outcomes.`,
    `════════════════════════════════════════════════════════════`,
    `Generated by LifeTrack Pro — https://lifetrackpro.in/calculator`,
    `Official Android App: https://play.google.com/store/apps/details?id=com.lifetrackpro.app`
  );

  return lines.join('\n');
}
