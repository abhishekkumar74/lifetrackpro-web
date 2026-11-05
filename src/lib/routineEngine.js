/**
 * LifeTrack Pro — Smart Daily Routine Engine for Students
 * 
 * Generates an accurate, constraint-aware, 24-hour circadian daily schedule.
 * Accurately calculates all 1,440 minutes of the day from wake-up to sleep
 * with zero overlaps and zero unexplained gaps.
 */

export const STUDENT_PERSONAS = {
  school: {
    id: 'school',
    name: 'School Student',
    tagline: 'Classes 8 AM – 2 PM + Evening Study',
    icon: '🎒',
    description: 'Balances daytime school classes and homework with 3.5–4.5 hours of disciplined self-study and teenage sleep needs.',
    defaultWakeTime: '06:00',
    defaultSleepHours: 7.5,
    defaultStudyTargetHours: 4.5,
    recommendedStudyRange: '3.5 – 5.0 hrs',
    studyAdvice: 'Optimal for homework, NCERT revision & weekly school test prep without evening burnout.',
    defaultChronotype: 'balanced',
    cadenceMinutes: 50,
    breakMinutes: 10,
    defaultCommitments: [
      { id: 'c-commute-1', name: 'School Commute & Morning Prep', startTime: '07:20', endTime: '08:00', category: 'fixed', isLocked: true },
      { id: 'c-school', name: 'School Classes & Lab Periods', startTime: '08:00', endTime: '14:00', category: 'fixed', isLocked: true },
      { id: 'c-lunch', name: 'Nutritional Lunch & Decompression', startTime: '14:00', endTime: '15:00', category: 'nutrition', isLocked: true },
      { id: 'c-sports', name: 'Sports, Physical Play & Fresh Air', startTime: '17:30', endTime: '18:30', category: 'exercise', isLocked: true },
      { id: 'c-dinner', name: 'Dinner & Family Time', startTime: '20:30', endTime: '21:15', category: 'nutrition', isLocked: true },
    ],
  },
  college: {
    id: 'college',
    name: 'College / University Student',
    tagline: 'Lectures, Labs & Placement Prep',
    icon: '🎓',
    description: 'Designed for university students balancing lectures, labs, DSA coding, semester projects, and campus life.',
    defaultWakeTime: '06:30',
    defaultSleepHours: 7,
    defaultStudyTargetHours: 5,
    recommendedStudyRange: '4.0 – 6.0 hrs',
    studyAdvice: 'Balances semester GPA coursework with career placement technical sprints.',
    defaultChronotype: 'balanced',
    cadenceMinutes: 60,
    breakMinutes: 15,
    defaultCommitments: [
      { id: 'c-commute-1', name: 'Campus Commute', startTime: '08:20', endTime: '09:00', category: 'fixed', isLocked: true },
      { id: 'c-college', name: 'University Lectures & Lab Practical', startTime: '09:00', endTime: '15:30', category: 'fixed', isLocked: true },
      { id: 'c-lunch', name: 'Lunch & Social Break', startTime: '12:30', endTime: '13:30', category: 'nutrition', isLocked: true },
      { id: 'c-gym', name: 'Gym / Fitness Workout', startTime: '17:30', endTime: '18:30', category: 'exercise', isLocked: true },
      { id: 'c-dinner', name: 'Dinner & Downtime', startTime: '20:45', endTime: '21:30', category: 'nutrition', isLocked: true },
    ],
  },
  fulltime: {
    id: 'fulltime',
    name: 'Full-Time Competitive Aspirant',
    tagline: 'JEE, NEET, UPSC & GATE Deep Work',
    icon: '🎯',
    description: 'Maximizes high-cognitive deep work (7–9 hours) for competitive exams with circadian energy-matching and zero burnout.',
    defaultWakeTime: '05:30',
    defaultSleepHours: 7.5,
    defaultStudyTargetHours: 8,
    recommendedStudyRange: '7.0 – 9.0 hrs',
    studyAdvice: 'The biological sweet spot for high-retention numerical problem solving and active recall.',
    defaultChronotype: 'lark',
    cadenceMinutes: 90,
    breakMinutes: 15,
    defaultCommitments: [
      { id: 'c-breakfast', name: 'Hydration & Healthy Breakfast', startTime: '06:15', endTime: '07:00', category: 'nutrition', isLocked: true },
      { id: 'c-lunch', name: 'Nutritional Lunch & 20m Power Nap', startTime: '13:00', endTime: '14:00', category: 'nutrition', isLocked: true },
      { id: 'c-walk', name: 'Outdoor Walk & Sunlight Recovery', startTime: '17:30', endTime: '18:15', category: 'exercise', isLocked: true },
      { id: 'c-dinner', name: 'Screen-Free Dinner & Family Chat', startTime: '20:30', endTime: '21:15', category: 'nutrition', isLocked: true },
    ],
  },
  working: {
    id: 'working',
    name: 'Working Professional / Aspirant',
    tagline: 'Morning & Night Focus Sprints',
    icon: '💼',
    description: 'Carves out 3–4 high-yield focus hours around a full-time 9-to-6 job or professional career.',
    defaultWakeTime: '05:30',
    defaultSleepHours: 7,
    defaultStudyTargetHours: 3.5,
    recommendedStudyRange: '3.0 – 4.5 hrs',
    studyAdvice: 'Frontloads a 90m deep sprint before office hours, followed by evening active recall.',
    defaultChronotype: 'lark',
    cadenceMinutes: 45,
    breakMinutes: 10,
    defaultCommitments: [
      { id: 'c-commute-1', name: 'Morning Work Commute', startTime: '08:45', endTime: '09:30', category: 'fixed', isLocked: true },
      { id: 'c-office', name: 'Office Work Hours', startTime: '09:30', endTime: '18:30', category: 'fixed', isLocked: true },
      { id: 'c-commute-2', name: 'Evening Return Commute', startTime: '18:30', endTime: '19:15', category: 'fixed', isLocked: true },
      { id: 'c-lunch', name: 'Workplace Lunch Break', startTime: '13:00', endTime: '14:00', category: 'nutrition', isLocked: true },
      { id: 'c-dinner', name: 'Dinner & Transition', startTime: '20:15', endTime: '21:00', category: 'nutrition', isLocked: true },
    ],
  },
  self_learner: {
    id: 'self_learner',
    name: 'Self-Learner / Lifelong Learner',
    tagline: 'Flexible Skill Building & Creation',
    icon: '💡',
    description: 'Designed for independent developers, researchers, and creators pursuing flexible deep work sprints.',
    defaultWakeTime: '07:00',
    defaultSleepHours: 8,
    defaultStudyTargetHours: 6,
    recommendedStudyRange: '5.0 – 7.0 hrs',
    studyAdvice: 'Combines creative deep work blocks with autonomous research and reading.',
    defaultChronotype: 'balanced',
    cadenceMinutes: 60,
    breakMinutes: 15,
    defaultCommitments: [
      { id: 'c-priming', name: 'Morning Priming & Breakfast', startTime: '07:00', endTime: '08:00', category: 'nutrition', isLocked: true },
      { id: 'c-lunch', name: 'Lunch & Independent Reading', startTime: '13:00', endTime: '14:00', category: 'nutrition', isLocked: true },
      { id: 'c-workout', name: 'Daily Movement / Workout', startTime: '17:30', endTime: '18:30', category: 'exercise', isLocked: true },
      { id: 'c-dinner', name: 'Dinner & Social Decompression', startTime: '20:30', endTime: '21:30', category: 'nutrition', isLocked: true },
    ],
  },
};

/**
 * Converts HH:MM string into total minutes from midnight (0 to 1439).
 */
export function timeStringToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const parts = timeStr.split(':');
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  return ((h % 24) * 60 + (m % 60) + 1440) % 1440;
}

/**
 * Converts total minutes from midnight into 24-hour HH:MM format.
 */
export function minutesTo24Hour(totalMinutes) {
  const norm = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Converts total minutes from midnight into human-readable 12-hour format (e.g. "06:30 AM").
 */
export function minutesTo12Hour(totalMinutes) {
  const norm = ((totalMinutes % 1440) + 1440) % 1440;
  let h = Math.floor(norm / 60);
  const m = norm % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * Formats a time window string (e.g. "06:00 AM – 07:30 AM").
 */
export function formatTimeWindow(startMin, endMin) {
  return `${minutesTo12Hour(startMin)} – ${minutesTo12Hour(endMin)}`;
}

/**
 * Calculates bedtime (minutes from midnight) given wake-up time and sleep duration.
 */
export function calculateBedtimeMinutes(wakeTimeStr, sleepHours) {
  const wakeMin = timeStringToMinutes(wakeTimeStr);
  const sleepDurationMin = Math.round(sleepHours * 60);
  return ((wakeMin - sleepDurationMin) + 1440) % 1440;
}

/**
 * Premium SaaS Category Metadata & Clean Visual Palettes
 */
export const CATEGORY_STYLES = {
  deep_work: {
    label: 'Deep Work Focus',
    color: '#4338CA',
    bg: '#EEF2FF',
    border: '#E0E7FF',
    accent: '#4F46E5',
    icon: '⚡',
  },
  practice: {
    label: 'Problem Practice & Drills',
    color: '#0369A1',
    bg: '#F0F9FF',
    border: '#E0F2FE',
    accent: '#0284C7',
    icon: '📝',
  },
  recall: {
    label: 'Active Recall & Revision',
    color: '#047857',
    bg: '#ECFDF5',
    border: '#D1FAE5',
    accent: '#059669',
    icon: '🧠',
  },
  fixed: {
    label: 'Fixed Commitment',
    color: '#475569',
    bg: '#F8FAFC',
    border: '#E2E8F0',
    accent: '#64748B',
    icon: '🏫',
  },
  nutrition: {
    label: 'Nutrition & Meal Buffer',
    color: '#C2410C',
    bg: '#FFF7ED',
    border: '#FFEDD5',
    accent: '#EA580C',
    icon: '🥗',
  },
  exercise: {
    label: 'Exercise & Movement',
    color: '#0F766E',
    bg: '#F0FDFA',
    border: '#CCFBF1',
    accent: '#0D9488',
    icon: '🏃',
  },
  break: {
    label: 'Cognitive Break',
    color: '#64748B',
    bg: '#F8FAFC',
    border: '#E2E8F0',
    accent: '#94A3B8',
    icon: '☕',
  },
  wind_down: {
    label: 'Wind-Down & Buffer',
    color: '#6D28D9',
    bg: '#F5F3FF',
    border: '#EDE9FE',
    accent: '#7C3AED',
    icon: '🌙',
  },
  sleep: {
    label: 'Restorative Sleep',
    color: '#334155',
    bg: '#F1F5F9',
    border: '#E2E8F0',
    accent: '#475569',
    icon: '💤',
  },
};

/**
 * Bulletproof 24-Hour Routine Generation Algorithm
 * 
 * Accurately allocates every single minute of the 1,440-minute day starting at `wakeMin`.
 * Enforces the strict invariant: activity[i].endMin === activity[i+1].startMin
 * with zero overlaps and zero unexplained gaps.
 */
export function generateSmartDailyRoutine({
  personaKey = 'fulltime',
  wakeTime = '06:00',
  sleepHours = 7.5,
  studyTargetHours = 8,
  chronotype = 'balanced',
  cadenceMinutes = 90,
  breakMinutes = 15,
  commitments = [],
  includeMorningPriming = true,
  includeActiveRecall = true,
  includeWindDown = true,
  existingActivities = [],
} = {}) {
  const persona = STUDENT_PERSONAS[personaKey] || STUDENT_PERSONAS.fulltime;
  const wakeMin = timeStringToMinutes(wakeTime);
  const sleepDurationMin = Math.round(sleepHours * 60);
  const bedtimeMin = calculateBedtimeMinutes(wakeTime, sleepHours);
  const wakingDurationMin = 1440 - sleepDurationMin;

  // Track conflict warnings
  const conflictWarnings = [];

  // Helper to normalize any time offset relative to wakeMin (0 to 1439)
  const toWakeOffset = (min) => ((min - wakeMin) + 1440) % 1440;
  const fromWakeOffset = (offset) => (wakeMin + offset) % 1440;

  // 1. Process and Validate Fixed Commitments within Waking Hours
  // If commitments array is provided (even if empty, meaning student removed commitments), honor it!
  const rawCommitments = Array.isArray(commitments) ? commitments : (persona.defaultCommitments || []);
  const validCommitments = [];

  rawCommitments.forEach((comm) => {
    let cStart = timeStringToMinutes(comm.startTime);
    let cEnd = timeStringToMinutes(comm.endTime);
    let cDur = cEnd - cStart;
    if (cDur <= 0) cDur += 1440;

    let startOffset = toWakeOffset(cStart);
    let endOffset = startOffset + cDur;

    // Check if commitment falls entirely or partially inside sleep window
    if (startOffset >= wakingDurationMin) {
      conflictWarnings.push(`Commitment "${comm.name}" (${comm.startTime}) falls during your sleep window (${minutesTo12Hour(bedtimeMin)} – ${minutesTo12Hour(wakeMin)}).`);
      return;
    }

    if (endOffset > wakingDurationMin) {
      // Clamped to bedtime so it doesn't collide with sleep
      cDur = wakingDurationMin - startOffset;
      endOffset = wakingDurationMin;
      conflictWarnings.push(`Commitment "${comm.name}" extended past your bedtime and was adjusted.`);
    }

    validCommitments.push({
      ...comm,
      startMin: cStart,
      endMin: (cStart + cDur) % 1440,
      duration: cDur,
      startOffset,
      endOffset,
      isLocked: true,
    });
  });

  // Sort commitments by wake offset
  validCommitments.sort((a, b) => a.startOffset - b.startOffset);

  // Merge any overlapping commitments to ensure zero collision
  const nonOverlappingCommitments = [];
  for (let i = 0; i < validCommitments.length; i++) {
    const cur = validCommitments[i];
    if (nonOverlappingCommitments.length === 0) {
      nonOverlappingCommitments.push(cur);
    } else {
      const prev = nonOverlappingCommitments[nonOverlappingCommitments.length - 1];
      if (cur.startOffset < prev.endOffset) {
        // Collision detected between fixed commitments!
        conflictWarnings.push(`Fixed commitments "${prev.name}" and "${cur.name}" overlap. Combined time slot.`);
        // Extend previous commitment to cover both
        const newEndOffset = Math.max(prev.endOffset, cur.endOffset);
        prev.endOffset = newEndOffset;
        prev.duration = newEndOffset - prev.startOffset;
        prev.endMin = fromWakeOffset(newEndOffset);
        prev.endTime = minutesTo24Hour(prev.endMin);
      } else {
        nonOverlappingCommitments.push(cur);
      }
    }
  }

  // 2. Identify Continuous Unallocated Waking Intervals
  // We partition [0, wakingDurationMin] into alternating (Commitment / Open Gap)
  const scheduleSegments = [];
  let currentOffset = 0;

  // Handle Morning Priming before the first commitment if room exists
  const firstComm = nonOverlappingCommitments[0];
  const firstCommStart = firstComm ? firstComm.startOffset : wakingDurationMin;

  if (includeMorningPriming && firstCommStart >= 15) {
    const primingDur = Math.min(30, firstCommStart);
    scheduleSegments.push({
      type: 'priming',
      title: 'Morning Hydration, Sunlight & Mental Priming',
      category: 'nutrition',
      startOffset: 0,
      endOffset: primingDur,
      duration: primingDur,
      note: '500ml water, sunlight exposure for cortisol awakening response, and zero phone/social media feeds.',
      isLocked: false,
    });
    currentOffset = primingDur;
  }

  // Iterate through waking window and insert commitments + gaps
  for (const comm of nonOverlappingCommitments) {
    if (comm.startOffset > currentOffset) {
      // Free open gap
      scheduleSegments.push({
        type: 'gap',
        startOffset: currentOffset,
        endOffset: comm.startOffset,
        duration: comm.startOffset - currentOffset,
      });
    }

    scheduleSegments.push({
      type: 'fixed',
      id: comm.id,
      title: comm.name,
      category: comm.category || 'fixed',
      startOffset: comm.startOffset,
      endOffset: comm.endOffset,
      duration: comm.duration,
      note: comm.note || (comm.category === 'nutrition' ? 'Mindful meal buffer away from academic screens.' : 'Protected non-negotiable schedule window.'),
      isLocked: true,
    });

    currentOffset = comm.endOffset;
  }

  // Handle evening gap before bedtime
  if (currentOffset < wakingDurationMin) {
    scheduleSegments.push({
      type: 'gap',
      startOffset: currentOffset,
      endOffset: wakingDurationMin,
      duration: wakingDurationMin - currentOffset,
    });
  }

  // 3. Fill Free Waking Gaps with Study Blocks, Recovery Breaks & Buffers
  let targetStudyMinutes = Math.round(studyTargetHours * 60);
  let allocatedStudyMinutes = 0;
  let studyBlockCount = 0;

  const finalWakingActivities = [];

  // Identify all gaps to allocate study time
  scheduleSegments.forEach((segment) => {
    if (segment.type !== 'gap') {
      finalWakingActivities.push(segment);
      return;
    }

    // This is a free gap
    let gapCursor = segment.startOffset;
    let gapRemaining = segment.duration;

    // Check if this gap touches bedtime and needs a night wind-down
    let gapWindDownDur = 0;
    if (segment.endOffset === wakingDurationMin && includeWindDown && gapRemaining >= 45) {
      gapWindDownDur = 30; // reserve last 30m for wind-down
      gapRemaining -= gapWindDownDur;
    }

    // Allocate study blocks into this gap
    while (gapRemaining >= 30 && allocatedStudyMinutes < targetStudyMinutes) {
      let blockDur = Math.min(cadenceMinutes, gapRemaining);
      const remainingTarget = targetStudyMinutes - allocatedStudyMinutes;
      if (blockDur > remainingTarget && remainingTarget >= 30) {
        blockDur = remainingTarget;
      }

      studyBlockCount++;
      let category = 'deep_work';
      const blockStartMin = fromWakeOffset(gapCursor);
      let title = 'Study Focus Block';
      let note = 'Dedicated study window. Map target subjects and chapters using the Study Timetable Generator.';

      if (blockStartMin >= 300 && blockStartMin < 720) {
        // 5:00 AM to 12:00 PM
        title = studyBlockCount === 1 ? 'Morning Study Block' : `Morning Study Block ${studyBlockCount}`;
        note = 'High-alertness morning study window for core concepts and deep problem solving.';
        category = 'deep_work';
      } else if (blockStartMin >= 720 && blockStartMin < 1020) {
        // 12:00 PM to 5:00 PM
        title = 'Afternoon Study Block';
        note = 'Afternoon self-study window for practice sets, assignments, or textbook reading.';
        category = 'practice';
      } else if (blockStartMin >= 1020 && blockStartMin < 1260) {
        // 5:00 PM to 9:00 PM
        title = 'Evening Study Block';
        note = 'Evening study window for homework, question sets, or secondary subject review.';
        category = 'deep_work';
      } else {
        // 9:00 PM onwards
        title = 'Night Revision Block';
        note = 'End-of-day revision time for active recall, formula review, and memory consolidation.';
        category = 'recall';
      }

      finalWakingActivities.push({
        type: 'study',
        title,
        category,
        startOffset: gapCursor,
        endOffset: gapCursor + blockDur,
        duration: blockDur,
        note,
        isLocked: false,
        isAvailableStudyWindow: true,
      });

      allocatedStudyMinutes += blockDur;
      gapCursor += blockDur;
      gapRemaining -= blockDur;

      // Add cognitive break if room exists before next task
      if (gapRemaining >= 15 && allocatedStudyMinutes < targetStudyMinutes) {
        const breakDur = Math.min(breakMinutes, gapRemaining);
        finalWakingActivities.push({
          type: 'break',
          title: 'Active Recovery Break & Hydration',
          category: 'break',
          startOffset: gapCursor,
          endOffset: gapCursor + breakDur,
          duration: breakDur,
          note: 'Step away from study desk, hydrate, stretch, and rest your eyes. Avoid infinite scroll feeds.',
          isLocked: false,
        });

        gapCursor += breakDur;
        gapRemaining -= breakDur;
      }
    }

    // If gap still has unallocated minutes, fill with buffer/free time
    if (gapRemaining > 0) {
      finalWakingActivities.push({
        type: 'buffer',
        title: gapRemaining >= 45 ? 'Buffer Time, Reading & Hobby Decompression' : 'Rest Buffer & Task Transition',
        category: 'wind_down',
        startOffset: gapCursor,
        endOffset: gapCursor + gapRemaining,
        duration: gapRemaining,
        note: 'Flexible personal buffer to absorb schedule slips, read, or decompress.',
        isLocked: false,
      });
      gapCursor += gapRemaining;
    }

    // Append reserved wind-down if present
    if (gapWindDownDur > 0) {
      finalWakingActivities.push({
        type: 'wind_down',
        title: 'Night Wind-Down & Circadian Melatonin Rise',
        category: 'wind_down',
        startOffset: gapCursor,
        endOffset: gapCursor + gapWindDownDur,
        duration: gapWindDownDur,
        note: 'Dim bedroom lights, log completed daily habits in LifeTrack Pro, pack tomorrow desk, and screen curfew.',
        isLocked: false,
      });
    }
  });

  // 4. Construct Final 24-Hour Activities with Absolute Time Math
  const activities = [];

  finalWakingActivities.sort((a, b) => a.startOffset - b.startOffset);

  finalWakingActivities.forEach((act, idx) => {
    const startMin = fromWakeOffset(act.startOffset);
    const endMin = fromWakeOffset(act.endOffset);
    activities.push({
      id: act.id || `act-waking-${idx}-${startMin}`,
      title: act.title,
      category: act.category,
      startMin,
      endMin,
      duration: act.duration,
      startTime: minutesTo24Hour(startMin),
      endTime: minutesTo24Hour(endMin),
      timeWindow: formatTimeWindow(startMin, endMin),
      note: act.note,
      isLocked: !!act.isLocked,
      completed: false,
    });
  });

  // 5. Append Sleep Block (Completes the 24 hours perfectly)
  activities.push({
    id: 'act-sleep',
    title: 'Restorative Memory Consolidation Sleep',
    category: 'sleep',
    startMin: bedtimeMin,
    endMin: wakeMin,
    duration: sleepDurationMin,
    startTime: minutesTo24Hour(bedtimeMin),
    endTime: minutesTo24Hour(wakeMin),
    timeWindow: formatTimeWindow(bedtimeMin, wakeMin),
    note: `${sleepHours} hours uninterrupted sleep for neuroplasticity, memory consolidation & immune recovery.`,
    isLocked: true,
    completed: false,
  });

  // 6. Strict Verification: Validate Invariant on Complete Schedule
  // Ensure activity[i].endMin === activity[i+1].startMin and total duration === 1440
  let isStrictlyContinuous = true;
  let totalCalculatedMinutes = 0;

  for (let i = 0; i < activities.length; i++) {
    const cur = activities[i];
    const next = activities[(i + 1) % activities.length];
    totalCalculatedMinutes += cur.duration;

    if (cur.endMin !== next.startMin) {
      isStrictlyContinuous = false;
      conflictWarnings.push(`Timeline discontinuity between "${cur.title}" and "${next.title}".`);
    }
  }

  if (totalCalculatedMinutes !== 1440) {
    isStrictlyContinuous = false;
    conflictWarnings.push(`Total schedule duration (${totalCalculatedMinutes}m) deviates from 24 hours (1440m).`);
  }

  // Preserve completed states if matching existing activity ID
  if (Array.isArray(existingActivities) && existingActivities.length > 0) {
    const completedMap = new Map();
    existingActivities.forEach(e => {
      if (e.completed) completedMap.set(e.id, true);
    });
    activities.forEach(a => {
      if (completedMap.has(a.id)) {
        a.completed = true;
      }
    });
  }

  return {
    activities,
    conflictWarnings,
    isConflictFree: isStrictlyContinuous && conflictWarnings.length === 0,
    allocatedStudyMinutes,
    targetStudyMinutes,
  };
}

/**
 * Calculates schedule realism, balance metrics, and burnout warning flags.
 */
export function evaluateRoutineBalance(activities, sleepHours, targetStudyHours, conflictWarnings = []) {
  let totalStudyMin = 0;
  let totalBreakMin = 0;
  let totalFixedMin = 0;
  let totalExerciseMin = 0;
  let totalSleepMin = Math.round(sleepHours * 60);

  activities.forEach(a => {
    if (a.category === 'deep_work' || a.category === 'practice' || a.category === 'recall') {
      totalStudyMin += a.duration || 0;
    } else if (a.category === 'break' || a.category === 'wind_down') {
      totalBreakMin += a.duration || 0;
    } else if (a.category === 'fixed' || a.category === 'nutrition') {
      totalFixedMin += a.duration || 0;
    } else if (a.category === 'exercise') {
      totalExerciseMin += a.duration || 0;
    }
  });

  const scheduledStudyHours = (totalStudyMin / 60).toFixed(1);
  const scheduledBreakHours = (totalBreakMin / 60).toFixed(1);
  const scheduledFixedHours = (totalFixedMin / 60).toFixed(1);
  const scheduledSleepHours = (totalSleepMin / 60).toFixed(1);

  // Realism Score calculation (0 to 100)
  let score = 96;
  const warnings = [...conflictWarnings];

  if (sleepHours < 6.5) {
    score -= 20;
    warnings.push('Sleep target is under 6.5 hours. Chronic sleep restriction reduces cognitive memory retention by over 30%.');
  }

  if (totalStudyMin / 60 > 11) {
    score -= 25;
    warnings.push('Targeting over 11 study hours daily frequently leads to severe mental fatigue within 7 days.');
  } else if (totalStudyMin / 60 > 9) {
    score -= 10;
    warnings.push('High intensity 9+ hour schedule: ensure all active recovery buffers are strictly protected.');
  }

  if (totalExerciseMin < 20) {
    score -= 5;
    warnings.push('Include at least 25 minutes of physical movement to boost brain-derived neurotrophic factor (BDNF).');
  }

  if (totalBreakMin < 45) {
    score -= 15;
    warnings.push('Recovery buffers are too tight. Schedule at least 45 minutes of total daily cognitive breaks.');
  }

  let label = 'Balanced & Highly Sustainable';
  let badgeColor = 'var(--emerald)';

  if (score < 70) {
    label = 'High Burnout Risk';
    badgeColor = 'var(--rose)';
  } else if (score < 85) {
    label = 'Intensive Aspirant Routine';
    badgeColor = 'var(--amber)';
  }

  return {
    score: Math.max(40, Math.min(100, score)),
    label,
    badgeColor,
    warnings,
    scheduledStudyHours,
    scheduledBreakHours,
    scheduledFixedHours,
    scheduledSleepHours,
    studyCount: activities.filter(a => a.category === 'deep_work' || a.category === 'practice' || a.category === 'recall').length,
    completedCount: activities.filter(a => a.completed).length,
  };
}

/**
 * Intelligent Rescheduling Finder
 * Finds the best open or low-priority buffer slot to reschedule a missed session.
 */
export function findAlternativeRoutineSlot(missedActivity, allActivities, wakeTime, sleepHours) {
  const wakeMin = timeStringToMinutes(wakeTime);
  const bedtimeMin = calculateBedtimeMinutes(wakeTime, sleepHours);

  // Look for any wind-down or non-essential buffer activity later in the day that can accommodate the duration
  const missedIdx = allActivities.findIndex(a => a.id === missedActivity.id);
  const subsequentActivities = missedIdx >= 0 ? allActivities.slice(missedIdx + 1) : allActivities;

  // Candidate 1: Existing flexible wind-down slot with sufficient time
  for (const act of subsequentActivities) {
    if (act.category === 'wind_down' && (act.duration || 0) >= Math.min(45, missedActivity.duration)) {
      return {
        targetActivityId: act.id,
        startTime: act.startTime,
        endTime: act.endTime,
        displayTime: act.timeWindow,
        note: `Swap with ${act.title}`,
      };
    }
  }

  // Candidate 2: Late evening 45m before winddown
  const fallbackStart = ((bedtimeMin - 60) + 1440) % 1440;
  return {
    startTime: minutesTo24Hour(fallbackStart),
    endTime: minutesTo24Hour(fallbackStart + 45),
    displayTime: formatTimeWindow(fallbackStart, fallbackStart + 45),
    note: 'Evening consolidation slot',
  };
}

/**
 * Generates formatted text outline for 1-click clipboard copying.
 */
export function generateRoutineTextExport(activities, personaName, wakeTime, sleepHours) {
  const lines = [
    `📅 LifeTrack Pro — 24-Hour Daily Routine for Students`,
    `Profile: ${personaName} | Wake: ${wakeTime} | Sleep: ${sleepHours}h`,
    `Generated via: https://lifetrackpro.in/tools/daily-routine-generator`,
    `------------------------------------------------------------`,
  ];

  activities.forEach(a => {
    const check = a.completed ? '✓ ' : '• ';
    lines.push(`${check}${a.timeWindow} [${CATEGORY_STYLES[a.category]?.label || a.category.toUpperCase()}]: ${a.title} (${a.duration}m)`);
    if (a.note) {
      lines.push(`    ↳ ${a.note}`);
    }
  });

  lines.push(`------------------------------------------------------------`);
  lines.push(`💡 Tip: Follow this routine consistently for 21 days to cement automatic study habits.`);
  return lines.join('\n');
}

/**
 * Extracts available study windows from a generated daily routine for seamless integration
 * with the Study Timetable Generator.
 */
export function extractAvailableStudyWindows(activities = []) {
  if (!Array.isArray(activities)) return [];
  return activities
    .filter(a => a.type === 'study' || a.isAvailableStudyWindow || a.category === 'deep_work' || a.category === 'practice' || a.category === 'recall')
    .map(a => ({
      id: a.id,
      title: a.title,
      startTime: a.startTime,
      endTime: a.endTime,
      startMin: a.startMin,
      endMin: a.endMin,
      duration: a.duration,
      category: a.category,
      timeWindow: a.timeWindow,
    }));
}
