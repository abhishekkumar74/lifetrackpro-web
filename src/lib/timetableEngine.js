/**
 * LifeTrack Pro — Intelligent Study Timetable Engine
 * 
 * Heuristic, constraint-satisfaction scheduling engine that:
 * 1. Respects biological sleep hours & circadian rhythms.
 * 2. Carves out fixed commitments (school, college, coaching, meals, commute).
 * 3. Distributes high-priority and weak subjects with weighted interleaving.
 * 4. Integrates spaced recall, practice numericals, and mock test analysis.
 * 5. Prevents cognitive fatigue by enforcing break buffers.
 * 6. Preserves locked sessions during regeneration.
 * 7. Evaluates schedule realism & burnout risk.
 */

export const EXAM_PRESETS = {
  jee: {
    name: 'IIT JEE (Main & Advanced)',
    category: 'Engineering',
    defaultCadence: 90, // 90m blocks match NTA exam shifts
    breakDuration: 15,
    defaultSubjects: [
      { id: 'sub-1', name: 'Physics (Mechanics & Electrodynamics)', proficiency: 'weak', priority: 'high', syllabusCompletion: 45, revisionTopics: 'Rotational Motion, Gauss Law, EMI' },
      { id: 'sub-2', name: 'Chemistry (Organic & Inorganic)', proficiency: 'average', priority: 'high', syllabusCompletion: 60, revisionTopics: 'GOC Mechanisms, Coordination Compounds' },
      { id: 'sub-3', name: 'Mathematics (Calculus & Vectors)', proficiency: 'strong', priority: 'medium', syllabusCompletion: 70, revisionTopics: 'Definite Integrals, 3D Geometry' },
    ],
  },
  neet: {
    name: 'NEET UG Medical',
    category: 'Medical',
    defaultCadence: 50,
    breakDuration: 10,
    defaultSubjects: [
      { id: 'sub-1', name: 'Biology (Botany & Zoology)', proficiency: 'average', priority: 'high', syllabusCompletion: 65, revisionTopics: 'Genetics, Plant Physiology, Human Reproduction' },
      { id: 'sub-2', name: 'Physics (Numericals & Formulas)', proficiency: 'weak', priority: 'high', syllabusCompletion: 40, revisionTopics: 'Ray Optics, Thermodynamics, Modern Physics' },
      { id: 'sub-3', name: 'Chemistry (Organic Reactions & Physical)', proficiency: 'average', priority: 'medium', syllabusCompletion: 55, revisionTopics: 'Equilibrium, Hydrocarbons, P-Block' },
    ],
  },
  upsc: {
    name: 'UPSC Civil Services (CSE)',
    category: 'Civil Services',
    defaultCadence: 60,
    breakDuration: 15,
    defaultSubjects: [
      { id: 'sub-1', name: 'General Studies (Polity & Governance)', proficiency: 'average', priority: 'high', syllabusCompletion: 50, revisionTopics: 'Fundamental Rights, Constitutional Articles, Judiciary' },
      { id: 'sub-2', name: 'GS 3 (Economy, Environment & Tech)', proficiency: 'weak', priority: 'high', syllabusCompletion: 35, revisionTopics: 'Monetary Policy, Biodiversity, Climate Treaties' },
      { id: 'sub-3', name: 'Optional Subject Paper 1 & 2', proficiency: 'average', priority: 'high', syllabusCompletion: 45, revisionTopics: 'Core Thinkers, Case Studies, Section B Analysis' },
      { id: 'sub-4', name: 'Current Affairs & Daily Mains Answer Writing', proficiency: 'strong', priority: 'medium', syllabusCompletion: 80, revisionTopics: 'The Hindu Editorials, 10-Marker Structure' },
    ],
  },
  gate: {
    name: 'GATE (Engineering Graduate)',
    category: 'Engineering / Masters',
    defaultCadence: 60,
    breakDuration: 10,
    defaultSubjects: [
      { id: 'sub-1', name: 'Core Engineering Subjects', proficiency: 'weak', priority: 'high', syllabusCompletion: 40, revisionTopics: 'High-Weightage Technical Concepts' },
      { id: 'sub-2', name: 'Engineering Mathematics', proficiency: 'average', priority: 'high', syllabusCompletion: 60, revisionTopics: 'Linear Algebra, Probability, Calculus' },
      { id: 'sub-3', name: 'General Aptitude & Reasoning', proficiency: 'strong', priority: 'low', syllabusCompletion: 85, revisionTopics: 'Verbal & Numerical Ability' },
    ],
  },
  ssc: {
    name: 'SSC CGL / CHSL',
    category: 'Government Exams',
    defaultCadence: 50,
    breakDuration: 10,
    defaultSubjects: [
      { id: 'sub-1', name: 'Quantitative Aptitude', proficiency: 'weak', priority: 'high', syllabusCompletion: 50, revisionTopics: 'Trigonometry, Algebra, Arithmetic Speed' },
      { id: 'sub-2', name: 'General Intelligence & Reasoning', proficiency: 'strong', priority: 'medium', syllabusCompletion: 75, revisionTopics: 'Series, Coding-Decoding, Non-Verbal' },
      { id: 'sub-3', name: 'English Comprehension & Vocab', proficiency: 'average', priority: 'high', syllabusCompletion: 60, revisionTopics: 'Grammar Rules, Idioms, Cloze Test' },
      { id: 'sub-4', name: 'General Awareness (Static + GK)', proficiency: 'weak', priority: 'medium', syllabusCompletion: 40, revisionTopics: 'History, Polity, Modern Science' },
    ],
  },
  banking: {
    name: 'Banking (IBPS PO / SBI PO)',
    category: 'Banking',
    defaultCadence: 45,
    breakDuration: 10,
    defaultSubjects: [
      { id: 'sub-1', name: 'Data Analysis & Interpretation (Quant)', proficiency: 'weak', priority: 'high', syllabusCompletion: 45, revisionTopics: 'Caselet DI, Arithmetic DI, Quadratic Eq' },
      { id: 'sub-2', name: 'Reasoning Ability & Puzzles', proficiency: 'average', priority: 'high', syllabusCompletion: 55, revisionTopics: 'Floor Puzzles, Seating Arrangement, Syllogism' },
      { id: 'sub-3', name: 'English Language (Reading & Vocab)', proficiency: 'strong', priority: 'medium', syllabusCompletion: 70, revisionTopics: 'RC Passages, Error Detection' },
      { id: 'sub-4', name: 'Banking Awareness & Current Economy', proficiency: 'average', priority: 'medium', syllabusCompletion: 50, revisionTopics: 'RBI Guidelines, Financial Acronyms' },
    ],
  },
  college: {
    name: 'College Semester / Tech Placements',
    category: 'Higher Education',
    defaultCadence: 50,
    breakDuration: 10,
    defaultSubjects: [
      { id: 'sub-1', name: 'Data Structures & Algorithms', proficiency: 'weak', priority: 'high', syllabusCompletion: 45, revisionTopics: 'Graphs, Dynamic Programming, Trees' },
      { id: 'sub-2', name: 'Core CS (OS, DBMS, Networks)', proficiency: 'average', priority: 'high', syllabusCompletion: 60, revisionTopics: 'SQL Joins, Concurrency, Virtual Memory' },
      { id: 'sub-3', name: 'Semester Coursework & Assignments', proficiency: 'strong', priority: 'low', syllabusCompletion: 75, revisionTopics: 'Weekly lab reports, presentations' },
    ],
  },
  custom: {
    name: 'Custom Study Goal',
    category: 'Personalized',
    defaultCadence: 50,
    breakDuration: 10,
    defaultSubjects: [
      { id: 'sub-1', name: 'Primary Focus Topic', proficiency: 'weak', priority: 'high', syllabusCompletion: 30, revisionTopics: 'Fundamental Principles & Exercises' },
      { id: 'sub-2', name: 'Secondary Supporting Subject', proficiency: 'average', priority: 'medium', syllabusCompletion: 50, revisionTopics: 'Practice Problems & Summary Notes' },
    ],
  },
};

/** Convert "HH:MM" (24h) string to minutes from 00:00 */
export function timeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** Convert minutes from 00:00 to "HH:MM AM/PM" format */
export function minutesToDisplayTime(minutes) {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${String(displayHours).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
}

/** Convert minutes from 00:00 to "HH:MM" 24h format */
export function minutesTo24h(minutes) {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

/**
 * Calculates free non-overlapping study intervals between wake and sleep times,
 * cleanly carving out all fixed commitments (meals, school, college, coaching).
 */
export function calculateFreeStudyWindows(wakeTimeStr, sleepTimeStr, fixedCommitments = []) {
  const wakeMin = timeToMinutes(wakeTimeStr);
  let sleepMin = timeToMinutes(sleepTimeStr);

  // If sleep time is less than wake time, it means sleeping past midnight (e.g. wake 06:00, sleep 01:00)
  if (sleepMin <= wakeMin) {
    sleepMin += 1440;
  }

  // Normalize fixed commitments into linear minute intervals relative to wake
  const normalizedCommitments = fixedCommitments
    .map(c => {
      let start = timeToMinutes(c.startTime);
      let end = timeToMinutes(c.endTime);

      if (start < wakeMin) start += 1440;
      if (end <= start) end += 1440;

      return {
        ...c,
        startMin: Math.max(wakeMin, start),
        endMin: Math.min(sleepMin, end),
      };
    })
    .filter(c => c.startMin < c.endMin)
    .sort((a, b) => a.startMin - b.startMin);

  // Merge overlapping fixed commitments
  const mergedCommitments = [];
  for (const c of normalizedCommitments) {
    if (!mergedCommitments.length) {
      mergedCommitments.push({ ...c });
    } else {
      const last = mergedCommitments[mergedCommitments.length - 1];
      if (c.startMin <= last.endMin) {
        last.endMin = Math.max(last.endMin, c.endMin);
      } else {
        mergedCommitments.push({ ...c });
      }
    }
  }

  // Carve out the free intervals
  const freeWindows = [];
  let pointer = wakeMin;

  for (const c of mergedCommitments) {
    if (c.startMin > pointer) {
      const duration = c.startMin - pointer;
      if (duration >= 20) { // Minimum 20 mins needed for a useful study micro-session
        freeWindows.push({
          startMin: pointer,
          endMin: c.startMin,
          durationMin: duration,
        });
      }
    }
    pointer = Math.max(pointer, c.endMin);
  }

  if (pointer < sleepMin) {
    const duration = sleepMin - pointer;
    if (duration >= 20) {
      freeWindows.push({
        startMin: pointer,
        endMin: sleepMin,
        durationMin: duration,
      });
    }
  }

  return { freeWindows, mergedCommitments, wakeMin, sleepMin };
}

/**
 * Helper to generate balanced study windows across the day based on manual daily hours target
 * when no imported daily routine is present.
 */
export function createStudyWindowsFromTargetHours(targetMinutes, shift = 'balanced') {
  const target = Math.max(120, Math.min(840, targetMinutes)); // 2h to 14h
  const windows = [];

  if (shift === 'morning') {
    // Frontloaded morning shift
    const morningPart = Math.min(target, 300); // up to 5h
    windows.push({
      startMin: 390, // 06:30 AM
      endMin: 390 + morningPart,
      duration: morningPart,
      label: 'Morning Peak Study Window',
    });
    if (target > morningPart) {
      const rem = target - morningPart;
      windows.push({
        startMin: 870, // 02:30 PM
        endMin: 870 + rem,
        duration: rem,
        label: 'Afternoon Practice Window',
      });
    }
  } else if (shift === 'evening') {
    // Midday & evening shift
    const middayPart = Math.min(Math.round(target * 0.4), 180);
    const eveningPart = target - middayPart;
    windows.push({
      startMin: 600, // 10:00 AM
      endMin: 600 + middayPart,
      duration: middayPart,
      label: 'Midday Study Window',
    });
    windows.push({
      startMin: 990, // 04:30 PM
      endMin: 990 + eveningPart,
      duration: eveningPart,
      label: 'Evening Intensive Window',
    });
  } else {
    // Balanced shift across morning, afternoon, and evening
    const slot1 = Math.min(Math.round(target * 0.38), 180);
    const slot2 = Math.min(Math.round(target * 0.34), 150);
    const slot3 = target - slot1 - slot2;

    windows.push({
      startMin: 420, // 07:00 AM
      endMin: 420 + slot1,
      duration: slot1,
      label: 'Morning Focus Window',
    });
    if (slot2 > 0) {
      windows.push({
        startMin: 870, // 02:30 PM
        endMin: 870 + slot2,
        duration: slot2,
        label: 'Afternoon Practice Window',
      });
    }
    if (slot3 > 0) {
      windows.push({
        startMin: 1140, // 07:00 PM
        endMin: 1140 + slot3,
        duration: slot3,
        label: 'Evening Revision Window',
      });
    }
  }

  return windows;
}

/**
 * Intelligent Timetable Generator:
 * Generates an optimized day schedule respecting constraints, priorities, and locked blocks.
 */
export function generateDayTimetable({
  exam = 'jee',
  customExamName = '',
  wakeTime = '06:00',
  sleepTime = '23:00',
  fixedCommitments = [],
  subjects = [],
  sessionCadence = 50,
  breakDuration = 10,
  preferences = {
    includeSpacedRecall: true,
    includePracticeDrills: true,
    includeMockTests: true,
    includeErrorAnalysis: true,
  },
  strategyMode = 'balanced', // 'balanced' | 'intensive' | 'revision' | 'morning'
  existingSessions = [], // To preserve locked sessions
  importedStudyWindows = null, // Optional integration: array of { startTime, endTime, duration, title } from Daily Routine
  manualDailyHours = null, // Optional standalone: target study hours
  studyShift = 'balanced', // 'balanced' | 'morning' | 'afternoon' | 'evening'
}) {
  let freeWindows = [];

  // If study windows were imported from Daily Routine, use them directly
  if (Array.isArray(importedStudyWindows) && importedStudyWindows.length > 0) {
    freeWindows = importedStudyWindows.map(w => {
      const sMin = timeToMinutes(w.startTime || '07:00');
      let eMin = timeToMinutes(w.endTime || '09:00');
      if (eMin <= sMin) eMin += 1440;
      return {
        startMin: sMin,
        endMin: eMin,
        duration: eMin - sMin,
        label: w.title || 'Available Study Window',
      };
    });
  } else if (manualDailyHours && Number(manualDailyHours) > 0) {
    const targetMin = Math.round(Number(manualDailyHours) * 60);
    freeWindows = createStudyWindowsFromTargetHours(targetMin, studyShift);
  } else {
    const { freeWindows: calculatedWindows } = calculateFreeStudyWindows(wakeTime, sleepTime, fixedCommitments);
    freeWindows = calculatedWindows;
  }

  // Extract locked STUDY sessions from existing timetable (NEVER carry over fixed commitments or breaks!)
  const lockedSessions = existingSessions.filter(s => s.locked && s.type !== 'fixed' && !s.isFixed);

  // Helper: check collision with locked sessions or active fixed commitments
  const collidesWithLockedOrFixed = (startMin, endMin) => {
    const hitsLocked = lockedSessions.some(ls => {
      const lsStart = timeToMinutes(ls.rawStartTime);
      const lsEnd = timeToMinutes(ls.rawEndTime);
      return Math.max(startMin, lsStart) < Math.min(endMin, lsEnd);
    });
    if (hitsLocked) return true;

    return (fixedCommitments || []).some(fc => {
      const fcStart = timeToMinutes(fc.startTime);
      let fcEnd = timeToMinutes(fc.endTime);
      if (fcEnd <= fcStart) fcEnd += 1440;
      return Math.max(startMin, fcStart) < Math.min(endMin, fcEnd);
    });
  };

  // Subject prioritization weights
  const weightedSubjects = subjects.map(s => {
    let weight = 1.0;
    if (s.priority === 'high') weight += 1.2;
    if (s.priority === 'medium') weight += 0.5;

    if (s.proficiency === 'weak') weight += 1.4; // Weak gets heavy priority boost
    if (s.proficiency === 'average') weight += 0.4;

    if (strategyMode === 'revision') {
      // Prioritize subjects with lower syllabus completion
      weight += (100 - (s.syllabusCompletion || 50)) / 100;
    } else if (strategyMode === 'intensive' && s.proficiency === 'weak') {
      weight += 1.0;
    }

    return { ...s, weight };
  });

  // Sort subjects so weak and high priority come first
  weightedSubjects.sort((a, b) => b.weight - a.weight);

  // Calculate subject quota pool
  let subjectRoundRobinIndex = 0;

  // Determine actual session length based on cadence
  const studyCadenceMin = Number(sessionCadence) || 50;
  const breakCadenceMin = Number(breakDuration) || 10;

  const generatedSessions = [];

  // Re-insert locked study sessions into the schedule first
  lockedSessions.forEach(ls => {
    generatedSessions.push({ ...ls });
  });

  // Insert active fixed commitments into schedule
  (fixedCommitments || []).forEach(c => {
    const sMin = timeToMinutes(c.startTime || '08:00');
    let eMin = timeToMinutes(c.endTime || '14:00');
    if (eMin <= sMin) eMin += 1440;
    const dur = eMin - sMin;

    generatedSessions.push({
      id: c.id || `fixed-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: c.name || 'School / Coaching Classes',
      subject: 'Fixed Schedule Period',
      type: 'fixed',
      duration: dur,
      rawStartTime: c.startTime || '08:00',
      rawEndTime: c.endTime || '14:00',
      timeWindow: `${minutesToDisplayTime(sMin)} – ${minutesToDisplayTime(eMin)}`,
      note: 'Protected non-negotiable commitment window.',
      completed: false,
      locked: true,
      isFixed: true,
    });
  });

  // Populate free windows with purely academic sessions
  let consecutiveStudyMinutes = 0;
  let isFirstSessionOfDay = true;

  freeWindows.forEach(window => {
    let currentMin = window.startMin;

    while (currentMin + 25 <= window.endMin) {
      const remainingWindowTime = window.endMin - currentMin;

      // Determine block length
      let currentSessionLength = Math.min(studyCadenceMin, remainingWindowTime);

      // Determine session type based on position and preferences
      let sessionType = 'deep_work';
      if (currentSessionLength < 40 || (preferences.includeSpacedRecall && isFirstSessionOfDay)) {
        sessionType = 'revision';
        isFirstSessionOfDay = false;
      } else if (preferences.includePracticeDrills && generatedSessions.length % 3 === 2) {
        sessionType = 'practice';
      } else if (preferences.includeMockTests && generatedSessions.length === 4) {
        sessionType = 'mock_test';
      }

      const sessionEndMin = currentMin + currentSessionLength;

      // Check collision with locked or fixed session
      if (!collidesWithLockedOrFixed(currentMin, sessionEndMin)) {
        // Pick subject using weighted round-robin
        const selectedSubject = weightedSubjects[subjectRoundRobinIndex % weightedSubjects.length] || {
          name: 'Core Focus Topic',
          id: 'default-sub'
        };
        subjectRoundRobinIndex++;

        let title = '';
        let note = '';
        if (sessionType === 'revision') {
          title = `${selectedSubject.name} — SM-2 Active Recall`;
          note = selectedSubject.revisionTopics ? `Target: ${selectedSubject.revisionTopics}` : 'Review due flashcards and key formula exceptions.';
        } else if (sessionType === 'practice') {
          title = `${selectedSubject.name} — Timed MCQ / PYQ Sprint`;
          note = 'Distraction-free numerical solving and timed question drills.';
        } else if (sessionType === 'mock_test') {
          title = `${selectedSubject.name} — Topic Test & Error Log Analysis`;
          note = 'Sectional test followed by deep error diagnosis and concept correction.';
        } else {
          title = `${selectedSubject.name} — Core Concepts & Theory`;
          note = selectedSubject.revisionTopics ? `Focus: ${selectedSubject.revisionTopics}` : 'High-focus concept comprehension, textbook reading, and formula synthesis.';
        }

        generatedSessions.push({
          id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          title,
          subject: selectedSubject.name,
          subjectId: selectedSubject.id,
          proficiency: selectedSubject.proficiency,
          priority: selectedSubject.priority,
          syllabusCompletion: selectedSubject.syllabusCompletion,
          type: sessionType,
          duration: currentSessionLength,
          rawStartTime: minutesTo24h(currentMin),
          rawEndTime: minutesTo24h(sessionEndMin),
          timeWindow: `${minutesToDisplayTime(currentMin)} – ${minutesToDisplayTime(sessionEndMin)}`,
          note,
          completed: false,
          locked: false,
          isFixed: false,
        });

        consecutiveStudyMinutes += currentSessionLength;
        currentMin = sessionEndMin;

        // Auto-insert break if continuous study reaches >60 mins
        if (currentMin + breakCadenceMin <= window.endMin && consecutiveStudyMinutes >= 50) {
          const breakEndMin = currentMin + breakCadenceMin;
          if (!collidesWithLockedOrFixed(currentMin, breakEndMin)) {
            generatedSessions.push({
              id: `break-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
              title: 'Cognitive Recovery Break',
              subject: 'Rest & Mental Reset',
              type: 'break',
              duration: breakCadenceMin,
              rawStartTime: minutesTo24h(currentMin),
              rawEndTime: minutesTo24h(breakEndMin),
              timeWindow: `${minutesToDisplayTime(currentMin)} – ${minutesToDisplayTime(breakEndMin)}`,
              note: 'Hydrate, stretch, eye relaxation away from blue light screens.',
              completed: false,
              locked: false,
              isFixed: false,
            });
            currentMin = breakEndMin;
            consecutiveStudyMinutes = 0;
          }
        }
      } else {
        // Skip ahead past collision
        currentMin += 15;
      }
    }
  });

  // Sort chronologically from earliest session
  generatedSessions.sort((a, b) => {
    let aMin = timeToMinutes(a.rawStartTime);
    let bMin = timeToMinutes(b.rawStartTime);
    return aMin - bMin;
  });

  return generatedSessions;
}

/**
 * Calculates a comprehensive "Timetable Realism Score" (0–100)
 * with practical, actionable diagnostic recommendations.
 */
export function calculateRealismScore({
  sessions = [],
  wakeTime = '06:00',
  sleepTime = '23:00',
  subjects = [],
  isImportedFromRoutine = false,
}) {
  const studySessions = sessions.filter(s => s.type !== 'break' && s.type !== 'fixed');
  const breakSessions = sessions.filter(s => s.type === 'break');

  const totalStudyMinutes = studySessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const totalBreakMinutes = breakSessions.reduce((sum, s) => sum + (s.duration || 0), 0);

  const studyHours = (totalStudyMinutes / 60).toFixed(1);
  const breakHours = (totalBreakMinutes / 60).toFixed(1);

  const wakeM = timeToMinutes(wakeTime);
  let sleepM = timeToMinutes(sleepTime);
  if (sleepM <= wakeM) sleepM += 1440;
  const sleepDurationM = 1440 - (sleepM - wakeM);
  const sleepHours = ((sleepDurationM > 0 ? sleepDurationM : 450) / 60).toFixed(1);

  let score = 100;
  const diagnostics = [];
  const suggestions = [];

  // 1. Integration or Routine Status
  if (isImportedFromRoutine) {
    diagnostics.push({
      type: 'success',
      message: 'Synchronized with Daily Routine: Sleep, meals, and lifestyle buffers are protected.',
    });
  } else {
    diagnostics.push({
      type: 'success',
      message: 'Pure Academic Allocation: Focus slots mapped to your target syllabus.',
    });
  }

  // 2. Study Volume Evaluation
  const studyNum = parseFloat(studyHours);
  if (studyNum > 11.0) {
    score -= 25;
    diagnostics.push({
      type: 'danger',
      message: `Extreme workload (${studyHours}h study). High probability of cognitive exhaustion by Day 3.`,
    });
    suggestions.push('Cap daily focused study at 8–9 hours and increase review frequency instead of raw hours.');
  } else if (studyNum > 8.5) {
    score -= 5;
    diagnostics.push({
      type: 'warning',
      message: `Intensive sprint schedule (${studyHours}h study). Recommended only for final 30-day revision.`,
    });
  } else if (studyNum < 3.0) {
    score -= 15;
    diagnostics.push({
      type: 'warning',
      message: `Low daily study time (${studyHours}h). May fall behind competitive exam benchmarks.`,
    });
    suggestions.push('Try adding one 50-minute morning study block before daytime commitments.');
  } else {
    diagnostics.push({
      type: 'success',
      message: `Sustainable daily focus target: ${studyHours} hours of deep work.`,
    });
  }

  // 3. Break Ratio Evaluation
  const breakRatio = totalStudyMinutes > 0 ? (totalBreakMinutes / totalStudyMinutes) : 0;
  if (breakRatio < 0.12 && totalStudyMinutes > 180) {
    score -= 15;
    diagnostics.push({
      type: 'warning',
      message: 'Insufficient breaks scheduled. Cognitive stamina drops significantly after 90m.',
    });
    suggestions.push('Add 10-15 min recovery breaks between study sprints.');
  } else {
    diagnostics.push({
      type: 'success',
      message: `Balanced mental recovery ratio: ${breakHours}h scheduled breaks.`,
    });
  }

  // 4. Weak Subject Coverage
  const weakSubjects = subjects.filter(s => s.proficiency === 'weak');
  const weakSubjectNames = weakSubjects.map(s => s.name);
  const scheduledSubjectNames = new Set(studySessions.map(s => s.subject));

  const missedWeakSubjects = weakSubjectNames.filter(name => !scheduledSubjectNames.has(name));
  if (missedWeakSubjects.length > 0) {
    score -= 15;
    diagnostics.push({
      type: 'warning',
      message: `Weak subject '${missedWeakSubjects[0]}' has no scheduled slot today.`,
    });
    suggestions.push(`Allocate at least one 45-min active recall block to ${missedWeakSubjects[0]}.`);
  }

  score = Math.max(20, Math.min(100, Math.round(score)));

  let label = 'Optimal & Realistic';
  let badgeColor = 'var(--emerald)';
  if (score < 60) {
    label = 'High Burnout Risk';
    badgeColor = 'var(--rose)';
  } else if (score < 80) {
    label = 'Challenging Sprint Pace';
    badgeColor = 'var(--amber)';
  }

  return {
    score,
    label,
    badgeColor,
    studyHours,
    breakHours,
    sleepHours,
    diagnostics,
    suggestions,
  };
}

/**
 * Adaptive Rescheduling:
 * Finds the next available non-conflicting study slot for a missed session.
 */
export function findAlternativeSlot(missedSession, allSessions, wakeTime, sleepTime) {
  const wakeM = timeToMinutes(wakeTime);
  let sleepM = timeToMinutes(sleepTime);
  if (sleepM <= wakeM) sleepM += 1440;

  const durationNeeded = missedSession.duration || 50;

  // Find all gaps between sessions >= durationNeeded
  const sortedSessions = [...allSessions]
    .filter(s => s.id !== missedSession.id)
    .sort((a, b) => timeToMinutes(a.rawStartTime) - timeToMinutes(b.rawStartTime));

  let candidateStart = wakeM;

  for (const s of sortedSessions) {
    const sStart = timeToMinutes(s.rawStartTime);
    const sEnd = timeToMinutes(s.rawEndTime);

    if (sStart - candidateStart >= durationNeeded) {
      return {
        startTime: minutesTo24h(candidateStart),
        endTime: minutesTo24h(candidateStart + durationNeeded),
        displayTime: `${minutesToDisplayTime(candidateStart)} – ${minutesToDisplayTime(candidateStart + durationNeeded)}`,
      };
    }
    candidateStart = Math.max(candidateStart, sEnd);
  }

  if (sleepM - candidateStart >= durationNeeded) {
    return {
      startTime: minutesTo24h(candidateStart),
      endTime: minutesTo24h(candidateStart + durationNeeded),
      displayTime: `${minutesToDisplayTime(candidateStart)} – ${minutesToDisplayTime(candidateStart + durationNeeded)}`,
    };
  }

  return null;
}

/**
 * Generate iCal (.ics) Calendar File Content
 * Enables 1-click import into Google Calendar, Apple Calendar, and Outlook.
 */
export function generateICalContent(sessions, examName = 'Exam Prep') {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}${month}${day}`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LifeTrack Pro//AI Study Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:LifeTrack Pro - ${examName} Schedule`,
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  sessions
    .filter(s => s.type !== 'break')
    .forEach((s, idx) => {
      const [sh, sm] = (s.rawStartTime || '06:00').split(':').map(str => str.padStart(2, '0'));
      const [eh, em] = (s.rawEndTime || '07:00').split(':').map(str => str.padStart(2, '0'));

      const uid = `ltp-session-${todayStr}-${idx}-${Date.now()}@lifetrackpro.in`;
      const summary = s.title.replace(/[,;]/g, ' ');
      const description = `${s.subject} (${s.type}) - ${s.note || ''}`.replace(/[,;]/g, ' ');

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${todayStr}T000000Z`);
      lines.push(`DTSTART:${todayStr}T${sh}${sm}00`);
      lines.push(`DTEND:${todayStr}T${eh}${em}00`);
      lines.push(`SUMMARY:${summary}`);
      lines.push(`DESCRIPTION:${description}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('BEGIN:VALARM');
      lines.push('TRIGGER:-PT5M');
      lines.push('ACTION:DISPLAY');
      lines.push(`DESCRIPTION:Upcoming Study Session: ${summary}`);
      lines.push('END:VALARM');
      lines.push('END:VEVENT');
    });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * LONG-TERM ACADEMIC MASTER ROADMAP & STUDY DESK CALENDAR ENGINE
 * ─────────────────────────────────────────────────────────────────────────────
 * Powers the Study Timetable Generator as a multi-week, date-by-date academic
 * master syllabus roadmap (30/60/90/120 days) with chapter targets, PYQs,
 * and Sunday full-length mock exams.
 */

export const EXAM_SYLLABUS_CHAPTERS = {
  jee: {
    'Physics (Mechanics & Electrodynamics)': [
      'Kinematics & Projectile Motion',
      'Newton’s Laws of Motion & Friction',
      'Work, Energy & Power Theorem',
      'Center of Mass & Collision Mechanics',
      'Rotational Dynamics & Moment of Inertia',
      'Gravitation & Planetary Orbits',
      'Fluids Mechanics & Surface Tension',
      'Thermal Physics & Heat Transfer',
      'Electrostatics & Gauss Law Applications',
      'Current Electricity & Kirchhoff Rules',
      'Magnetic Effects of Current & Biot-Savart',
      'Electromagnetic Induction & Faraday Law',
      'Alternating Current & LCR Resonance',
      'Ray Optics & Optical Instruments',
      'Wave Optics & Interference (YDSE)',
      'Dual Nature, Photoelectric & Modern Physics',
      'Nuclear Physics & Radioactivity',
    ],
    'Chemistry (Organic & Inorganic)': [
      'Chemical Bonding & Molecular Structure',
      'Chemical Thermodynamics & Enthalpy',
      'Equilibrium (Chemical & Ionic pH)',
      'Solutions & Colligative Properties',
      'Electrochemistry & Nernst Equation',
      'Chemical Kinetics & Arrhenius Equation',
      'Periodic Table & Transition Elements (d & f)',
      'Coordination Compounds & CFT/VBT',
      'p-Block High-Weightage Trends',
      'General Organic Chemistry (GOC & Inductive)',
      'Reaction Mechanisms & Carbocation Shifts',
      'Hydrocarbons (Alkanes, Alkenes, Alkynes)',
      'Haloalkanes & Nucleophilic Substitutions',
      'Alcohols, Phenols & Ethers',
      'Aldehydes, Ketones & Carboxylic Acids',
      'Amines & Nitrogen Functional Compounds',
      'Biomolecules & Everyday Chemistry',
    ],
    'Mathematics (Calculus & Vectors)': [
      'Sets, Relations & Composite Functions',
      'Trigonometric Equations & Inverses',
      'Matrices, Inverses & Determinant Properties',
      'Limits, Continuity & Differentiability',
      'Application of Derivatives (Tangents, Maxima)',
      'Indefinite Integration & Substitution Models',
      'Definite Integrals & Special Properties',
      'Differential Equations (Separable & Linear)',
      'Straight Lines & Pair of Lines',
      'Circles & System of Tangents',
      'Parabola, Ellipse & Hyperbola Conics',
      'Vector Algebra & Dot/Cross Products',
      'Three-Dimensional (3D) Geometry & Planes',
      'Permutations, Combinations & Counting',
      'Binomial Theorem & Term Expansion',
      'Probability Distributions & Bayes Theorem',
    ],
  },
  neet: {
    'Biology (Botany & Zoology)': [
      'Living World & Biological Classification',
      'Plant Kingdom & Morphology of Flowering Plants',
      'Anatomy of Flowering Plants & Tissues',
      'Cell: The Unit of Life & Cell Cycle',
      'Photosynthesis in Higher Plants',
      'Respiration in Plants & ATP Pathways',
      'Plant Growth & Endocrine Regulators',
      'Human Digestion & Respiration Physiology',
      'Body Fluids, Circulation & Cardiac Cycle',
      'Excretory Products & Osmoregulation',
      'Locomotion, Movement & Skeletal Joints',
      'Neural Control, Synapses & Sensory Organs',
      'Chemical Coordination & Hormones',
      'Reproduction in Flowering Plants',
      'Human Reproduction & Reproductive Health',
      'Principles of Inheritance & Mendelian Genetics',
      'Molecular Basis of Inheritance (DNA/RNA)',
      'Biotechnology: Principles & Processes',
      'Ecology, Ecosystems & Biodiversity Conservation',
    ],
    'Physics (Numericals & Formulas)': [
      'Physical World, Units & Dimensional Analysis',
      'Motion in a Straight Line & Vectors',
      'Laws of Motion & Friction Practice',
      'Work, Energy & Power Numericals',
      'System of Particles & Rotational Motion',
      'Gravitation & Satellite Motion',
      'Mechanical Properties of Solids & Fluids',
      'Thermal Properties & Thermodynamics',
      'Kinetic Theory of Gases (KTG)',
      'Oscillations (SHM) & Sound Waves',
      'Electrostatics, Potential & Capacitance',
      'Current Electricity & Potentiometer Drills',
      'Moving Charges, Magnetism & Matter',
      'Electromagnetic Induction & AC Circuits',
      'Ray Optics, Lenses & Mirrors',
      'Wave Optics, Huygens & Young’s Experiment',
      'Dual Nature of Radiation & Matter',
      'Atoms, Nuclei & Semiconductor Diodes',
    ],
    'Chemistry (Organic Reactions & Physical)': [
      'Some Basic Concepts & Mole Concept Calculations',
      'Atomic Structure & Quantum Numbers',
      'Periodic Trends & Chemical Bonding',
      'States of Matter & Gas Laws',
      'Chemical Thermodynamics & Hess Law',
      'Equilibrium (Le Chatelier & Buffer Solutions)',
      'Redox Reactions & Oxidation States',
      'Hydrogen & s-Block Elements',
      'p-Block Elements (Groups 13 to 18)',
      'Organic Chemistry: Fundamental Principles & Nomenclature',
      'Hydrocarbons: Aliphatic & Aromatic Chemistry',
      'Solutions & Raoult’s Law Numericals',
      'Electrochemistry & Conductivity Cells',
      'Chemical Kinetics & Reaction Rates',
      'Coordination Compounds & Isomerism',
      'Haloalkanes, Alcohols & Phenols Synthesis',
      'Aldehydes, Ketones & Amines Reagents',
      'Biomolecules, Polymers & Environmental Chem',
    ],
  },
  upsc: {
    'General Studies (Polity & Governance)': [
      'Constitutional Framework & Historical Underpinnings',
      'Preamble, Fundamental Rights & DPSP',
      'Union Executive, Parliament & Judiciary Structure',
      'Federal Structure, Centre-State Relations & Inter-State Council',
      'Local Governance: Panchayati Raj & 73rd/74th Amendments',
      'Statutory, Regulatory & Quasi-Judicial Bodies',
      'Public Policies, Governance Models & Citizen Charters',
      'Electoral Reforms & Representation of People Act',
    ],
    'GS 3 (Economy, Environment & Tech)': [
      'Indian Economy & Resource Mobilization Trends',
      'Inclusive Growth, Employment & Fiscal Federalism',
      'Agriculture: Cropping Patterns, Subsidies & Food Security',
      'Infrastructure: Energy, Ports, Roads & Railways',
      'Science & Technology: Indigenization & Space Missions',
      'Environmental Conservation, Climate Change & COP Summits',
      'Disaster Management & National Disaster Response Force',
      'Internal Security: Border Management & Cyber Threats',
    ],
    'Optional Subject Paper 1 & 2': [
      'Foundational Conceptual Thinkers & Methodologies',
      'Core Theoretical Paradigms & Critiques',
      'Applied Perspectives & Inter-disciplinary Models',
      'Case Study Analysis & Contemporary Applications',
      'Previous 10 Years Mains Optional Question Dissection',
      'Section B Analytical Essays & Diagrammatic Structuring',
    ],
    'Current Affairs & Daily Mains Answer Writing': [
      'National & International Geo-Political Flashpoints',
      'Editorials Analysis (The Hindu / Indian Express)',
      'PIB Releases & Government Scheme Guidelines',
      'Daily 2 Question Mains Answer Writing Practice (10 & 15 markers)',
      'Prelims CSAT Mock Drills & Speed Comprehension',
    ],
  },
  gate: {
    'Core Engineering Subjects': [
      'Engineering Fundamentals & First Principles',
      'Circuit / Machine / Structure Mechanics & Design',
      'Transfer Functions, Stability & Frequency Domain',
      'Thermal Systems & Fluid Dynamics Analysis',
      'Algorithms & Computational Complexity Models',
      'High-Weightage Engineering Gate PYQs (2018–2024)',
    ],
    'Engineering Mathematics': [
      'Linear Algebra: Eigenvalues & Vector Spaces',
      'Calculus: Gradient, Divergence, Curl & Multiple Integrals',
      'Differential Equations: First Order & Cauchy-Euler',
      'Complex Variables: Cauchy-Riemann & Residue Theorem',
      'Probability & Statistics: Conditional Prob & Distributions',
      'Numerical Methods: Newton-Raphson & Runge-Kutta',
    ],
    'General Aptitude & Reasoning': [
      'Verbal Ability & Contextual Vocabulary',
      'Quantitative Reasoning & Numerical Estimation',
      'Spatial & Diagrammatic Logical Reasoning',
    ],
  },
  ssc: {
    'Quantitative Aptitude': [
      'Number Systems, Divisibility & Remainder Rules',
      'Percentages, Profit, Loss & Discount',
      'Simple & Compound Interest Calculations',
      'Ratio, Proportion, Mixture & Alligation',
      'Time & Work, Pipes & Cisterns',
      'Speed, Time & Distance, Trains & Boats',
      'Algebra & Polynomial Identities',
      'Geometry: Triangles, Circles & Chords',
      'Mensuration: 2D & 3D Volume Formulas',
      'Trigonometry & Heights/Distances',
    ],
    'General Intelligence & Reasoning': [
      'Analogy, Classification & Odd One Out',
      'Coding-Decoding & Alphabet Series',
      'Blood Relations & Family Tree Deduction',
      'Direction Sense & Distance Logic',
      'Syllogisms & Venn Diagram Intersections',
      'Non-Verbal Reasoning: Paper Folding & Embedded Figures',
    ],
    'English Comprehension & Vocab': [
      'Grammar Rules: Subject-Verb Agreement & Tenses',
      'Spotting the Errors & Sentence Improvement',
      'Vocabulary: Synonyms, Antonyms & One Word Substitution',
      'Idioms, Phrases & Cloze Test Drills',
      'Reading Comprehension & Critical Inferences',
    ],
    'General Awareness (Static + GK)': [
      'Ancient, Medieval & Modern Indian History',
      'Indian Polity & Constitutional Articles',
      'Physical & Economic Geography of India',
      'General Science (Physics, Chemistry, Biology basics)',
      'Current Affairs & Annual Sports / Awards',
    ],
  },
  banking: {
    'Data Analysis & Interpretation (Quant)': [
      'Simplification, Approximation & Number Series',
      'Quadratic Equations & Inequalities',
      'Data Interpretation: Bar Charts & Tabular Sets',
      'Data Interpretation: Caselet & Radar DI Sets',
      'Arithmetic Word Problems: Profit, Age, Work & SI/CI',
      'Probability & Mensuration in Banking Exams',
    ],
    'Reasoning Ability & Puzzles': [
      'Linear & Circular Seating Arrangements',
      'Floor, Box & Flat-based Complex Puzzles',
      'Inequalities & Coding-Decoding',
      'Syllogism (Only a Few & Possibility cases)',
      'Input-Output Machine Stepping Logic',
      'Critical Reasoning & Course of Action',
    ],
    'English Language (Reading & Vocab)': [
      'Reading Comprehension: Economic & Editorial Passages',
      'Cloze Test & Fillers with Contextual Vocabulary',
      'Para Jumbles & Sentence Rearrangement',
      'Error Detection & Phrase Replacement',
    ],
    'Banking Awareness & Current Economy': [
      'RBI Monetary Policy, Rates (Repo, Reverse Repo, CRR)',
      'Banking Terms, BASEL Norms & NPA Recovery',
      'Financial Inclusions & Government Social Schemes',
      'Static GK: National Parks, Dams & Headquarter Cities',
    ],
  },
  college: {
    'Data Structures & Algorithms': [
      'Arrays, Strings & Two-Pointer Patterns',
      'Hash Maps, Sets & Sliding Window Techniques',
      'Linked Lists, Stacks & Queues Implementations',
      'Recursion, Backtracking & Permutations',
      'Binary Trees & Binary Search Trees (BST)',
      'Graphs: BFS, DFS, Dijkstra & Topological Sort',
      'Dynamic Programming: 1D & 2D Memoization',
    ],
    'Core CS (OS, DBMS, Networks)': [
      'Operating Systems: Processes, Threads & CPU Scheduling',
      'OS Concurrency: Semaphores, Deadlocks & Virtual Memory',
      'DBMS: Relational Model, ER Diagrams & Normalization (1NF–BCNF)',
      'SQL Queries: Joins, Subqueries & Transactions (ACID)',
      'Computer Networks: OSI Layers, TCP/IP & Handshakes',
      'Network Security: HTTP/HTTPS, DNS & Sockets',
    ],
    'Semester Coursework & Assignments': [
      'Module 1 & 2 Syllabus Lecture Note Consolidation',
      'Mid-Semester Previous Year Exam Question Papers',
      'Lab Practical Reports & Code Submission Projects',
      'Final End-Semester Comprehensive Theoretical Review',
    ],
  },
  custom: {
    'Primary Focus Topic': [
      'Core Theoretical Principles & Fundamentals',
      'Intermediate Problem Formulation & Proofs',
      'Advanced Applied Problem Solving & Drills',
      'Milestone Review & Self-Assessment Testing',
    ],
    'Secondary Supporting Subject': [
      'Foundational Conceptual Overview',
      'Weekly Active Recall & Flashcard Drilling',
      'Synthesis Notes & Practical Application Project',
    ],
  },
};

/**
 * Generate a complete multi-week, date-by-date Academic Master Roadmap.
 */
export function generateAcademicMasterRoadmap({
  exam = 'jee',
  customExamName = '',
  examDate = '',
  horizonDays = 60,
  targetScoreRank = '',
  subjects = [],
  dailyStudyHours = 7.5,
  preferences = {},
  existingRoadmap = null,
}) {
  const examPreset = EXAM_PRESETS[exam] || { name: customExamName || 'Competitive Exam' };
  const examDisplayName = exam === 'custom' && customExamName ? customExamName : (examPreset.name || 'Competitive Exam');

  // Compute duration
  let totalDays = parseInt(horizonDays, 10) || 60;
  let hasExactExamDate = false;
  let countdownDays = totalDays;

  if (examDate) {
    const target = new Date(examDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diff > 0) {
      totalDays = Math.min(180, Math.max(14, diff));
      countdownDays = diff;
      hasExactExamDate = true;
    }
  }

  const totalWeeks = Math.ceil(totalDays / 7);
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  // Subject chapters map
  const syllabusBank = EXAM_SYLLABUS_CHAPTERS[exam] || EXAM_SYLLABUS_CHAPTERS.jee;

  // Prioritize subjects: weak subjects get higher frequency
  const effectiveSubjects = subjects.length > 0 
    ? subjects 
    : (examPreset.defaultSubjects || [
        { id: 'sub-1', name: 'Core Subject 1', proficiency: 'weak', priority: 'high' },
        { id: 'sub-2', name: 'Core Subject 2', proficiency: 'average', priority: 'high' },
      ]);

  // Weighted rotation pool
  const subjectPool = [];
  effectiveSubjects.forEach((sub) => {
    const weight = sub.proficiency === 'weak' ? 3 : sub.priority === 'high' ? 2 : 1;
    for (let i = 0; i < weight; i++) {
      subjectPool.push(sub);
    }
  });

  // Track completed states if merging with existing roadmap
  const completedMap = {};
  if (existingRoadmap && Array.isArray(existingRoadmap.weeks)) {
    existingRoadmap.weeks.forEach(w => {
      w.days.forEach(d => {
        if (d.completed) completedMap[d.id] = true;
      });
    });
  }

  const weeks = [];
  let dayCounter = 0;
  let subjectPointer = 0;
  let totalPYQTarget = 0;

  for (let w = 1; w <= totalWeeks; w++) {
    const weekStart = new Date(startDate.getTime() + (w - 1) * 7 * 86400000);
    const weekEnd = new Date(weekStart.getTime() + 6 * 86400000);

    // Determine phase
    let phaseName = 'Phase 1: High-Weightage Core Theory & Weak Concepts';
    let weeklyGoal = `Complete Week ${w} foundation chapters and establish problem speed.`;
    let weeklyPYQ = 220;

    const progressRatio = w / totalWeeks;
    if (progressRatio <= 0.4) {
      phaseName = 'Phase 1: High-Weightage Core Theory & Weak Concepts';
      weeklyGoal = `Target deep concept mastery in weak subjects and solve high-yield question sets.`;
      weeklyPYQ = 240;
    } else if (progressRatio <= 0.75) {
      phaseName = 'Phase 2: Timed Problem Solving & PYQ Drilling';
      weeklyGoal = `Intensive previous year questions (PYQs 2019-2024) and mixed subject drills.`;
      weeklyPYQ = 320;
    } else if (w < totalWeeks) {
      phaseName = 'Phase 3: Full-Length Mock Marathons & Error Remediation';
      weeklyGoal = `Take full 3-hour mocks in exact exam shift, log every error into your mistake book.`;
      weeklyPYQ = 350;
    } else {
      phaseName = 'Phase 4: Final Tapering, Rapid Formula Recall & Mental Priming';
      weeklyGoal = `Zero new topics. Rapid formula sheet sweeps, exam hall time allocation & sleep alignment.`;
      weeklyPYQ = 180;
    }

    totalPYQTarget += weeklyPYQ;

    const days = [];
    for (let d = 0; d < 7; d++) {
      dayCounter++;
      const curDate = new Date(weekStart.getTime() + d * 86400000);
      const dayIndex = curDate.getDay(); // 0 is Sun, 3 is Wed
      const isSunday = dayIndex === 0;
      const isWednesday = dayIndex === 3;

      const sub = subjectPool[subjectPointer % subjectPool.length];
      subjectPointer++;

      // Pick a chapter from syllabus or subject's revision topics
      const subChapters = syllabusBank[sub.name] || [
        `${sub.name} High-Weightage Modules`,
        `${sub.name} Practice Drills & PYQs`,
        `${sub.name} Formula Derivations & Speed Practice`,
        `${sub.name} Weak Area Error Rectification`,
      ];
      const chapterIndex = (w * 2 + d) % subChapters.length;
      const chapterTitle = subChapters[chapterIndex] || `${sub.name} Core Concepts`;

      const dayId = `day-w${w}-d${d + 1}`;
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = dayNames[dayIndex];

      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const displayDay = `${dayName.slice(0, 3)}, ${monthNames[curDate.getMonth()]} ${curDate.getDate()}`;
      const dateStr = curDate.toISOString().slice(0, 10);

      let targetQuestions = isSunday ? 'Mock Exam (180–200 Qs)' : `${Math.round(weeklyPYQ / 6)} PYQs`;

      days.push({
        id: dayId,
        dayNumber: dayCounter,
        dateStr,
        dayName,
        displayDay,
        subject: isSunday ? 'Full Syllabus Mock' : sub.name,
        subjectProficiency: sub.proficiency,
        chapter: isSunday ? `Full-Length Mock Test #${w}` : chapterTitle,
        targetQuestions,
        isSundayMock: isSunday,
        isWednesdayRecall: isWednesday,
        mockTestDetails: isSunday ? {
          name: `All-India Level Mock Test #${w}`,
          timing: '09:00 AM – 12:00 PM (3 Hours)',
          analysis: '2.0h Error Log & Mistake Notebook Remediation',
        } : null,
        shifts: isSunday ? {
          morning: '09:00 AM – 12:00 PM: 3-Hour Timed Mock Exam in exam conditions',
          afternoon: '02:00 PM – 04:30 PM: In-depth question-by-question mistake analysis',
          evening: '06:00 PM – 07:30 PM: Revise weak concepts identified in mock error log',
        } : {
          morning: `Morning Shift (${Math.round(dailyStudyHours * 0.4)}h): ${chapterTitle} Theory & Core Formulas`,
          afternoon: `Afternoon Shift (${Math.round(dailyStudyHours * 0.4)}h): ${targetQuestions} Timed Problem Solving`,
          evening: `Night Shift (${Math.max(1, Math.round(dailyStudyHours * 0.2))}h): Spaced Retrieval & Flashcards`,
        },
        completed: !!completedMap[dayId],
      });
    }

    const startMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][weekStart.getMonth()];
    const endMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][weekEnd.getMonth()];
    const dateRange = `${startMonth} ${weekStart.getDate()} – ${endMonth} ${weekEnd.getDate()}`;

    weeks.push({
      weekNumber: w,
      dateRange,
      phaseName,
      weeklyGoal,
      weeklyPYQ,
      days,
    });
  }

  return {
    exam,
    examDisplayName,
    examDate,
    countdownDays,
    hasExactExamDate,
    totalDays,
    totalWeeks,
    targetScoreRank: targetScoreRank || (exam === 'jee' ? '99+ Percentile' : exam === 'neet' ? '680+ Score' : 'Top Rank Target'),
    dailyStudyHours,
    totalPYQTarget,
    totalMocks: totalWeeks,
    weeks,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Generate Multi-Week iCal (.ics) Calendar File Content
 * Exports the entire 30/60/90-day academic roadmap with daily chapters and Sunday mocks.
 */
export function generateMultiWeekICalContent(roadmap, examName = 'Study Prep') {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LifeTrack Pro//Academic Master Roadmap//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:LifeTrack Pro - ${examName} Master Roadmap`,
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  if (!roadmap || !Array.isArray(roadmap.weeks)) return lines.join('\r\n');

  roadmap.weeks.forEach(w => {
    w.days.forEach(d => {
      const cleanDate = d.dateStr.replace(/-/g, '');
      const uid = `ltp-roadmap-${d.id}-${cleanDate}@lifetrackpro.in`;
      const summary = d.isSundayMock 
        ? `🎯 [MOCK TEST #${w.weekNumber}] ${d.chapter}`
        : `📚 [${d.subject}] ${d.chapter} (${d.targetQuestions})`;
      
      const description = d.isSundayMock
        ? `Full 3-Hour Exam Simulation + Error Log Remediation. Target: ${roadmap.targetScoreRank}`
        : `${d.shifts.morning}\\n${d.shifts.afternoon}\\n${d.shifts.evening}`;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${cleanDate}T000000Z`);
      lines.push(`DTSTART;VALUE=DATE:${cleanDate}`);
      lines.push(`SUMMARY:${summary.replace(/[,;]/g, ' ')}`);
      lines.push(`DESCRIPTION:${description.replace(/[,;]/g, ' ')}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('BEGIN:VALARM');
      lines.push('TRIGGER:-PT15M');
      lines.push('ACTION:DISPLAY');
      lines.push(`DESCRIPTION:Study Target: ${summary.replace(/[,;]/g, ' ')}`);
      lines.push('END:VALARM');
      lines.push('END:VEVENT');
    });
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
