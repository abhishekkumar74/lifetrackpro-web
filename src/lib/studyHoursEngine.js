/**
 * studyHoursEngine.js
 * 
 * LifeTrack Pro — Academic Workload & Feasibility Calculation Engine
 * 
 * Pure, deterministic mathematical engine for calculating:
 * - Exact calendar days and effective study days before an examination
 * - Initial syllabus learning workload (by chapters or subject breakdown)
 * - Revision time requirements (based on empirical forgetting curve decay)
 * - PYQ practice, mock test simulation and analysis investment
 * - Safety buffers for unexpected delays / illness
 * - Required daily study hours vs available study capacity
 * - Feasibility index (Comfortable, Manageable, Tight, Not Feasible)
 * - Expected syllabus completion date
 * - Multi-tier What-If scenario simulations (3h, 4h, 5h, 6h, 8h, custom)
 * 
 * Strict guarantees:
 * - Zero division by zero
 * - Handles past dates, today, tomorrow, and multi-year horizons gracefully
 * - Supports fractional hours and fractional chapters
 * - Never invents pseudo-scientific scores
 */

// ── DEFAULT CONSTANTS & PRESETS ──

export const REVISION_PERCENT_DEFAULT = 35; // Empirical: 1 revision cycle takes ~35% of initial study time
export const BUFFER_PERCENT_DEFAULT = 10;   // Recommended 10% safety buffer for illness/unplanned interruptions

export const DIFFICULTY_MULTIPLIERS = {
  easy: 0.85,
  medium: 1.0,
  hard: 1.25,
};

export const PRIORITY_WEIGHTS = {
  high: 1.2,
  medium: 1.0,
  low: 0.8,
};

export const SUBJECT_PRESETS = {
  jee: {
    id: 'jee',
    name: 'IIT JEE (Main & Advanced)',
    subjects: [
      { id: 'phy', name: 'Physics (Mechanics, Electrodynamics, Modern)', remainingChapters: 22, completedChapters: 8, hoursPerChapter: 6, difficulty: 'hard', practiceHoursPerChapter: 3, revisionCycles: 2, priority: 'high' },
      { id: 'chem', name: 'Chemistry (Physical, Organic, Inorganic)', remainingChapters: 24, completedChapters: 6, hoursPerChapter: 5, difficulty: 'medium', practiceHoursPerChapter: 2.5, revisionCycles: 2, priority: 'medium' },
      { id: 'math', name: 'Mathematics (Calculus, Algebra, Coordinate)', remainingChapters: 20, completedChapters: 6, hoursPerChapter: 7, difficulty: 'hard', practiceHoursPerChapter: 4, revisionCycles: 2, priority: 'high' },
    ],
    defaultPYQHours: 120,
    defaultMockTests: 10,
    defaultMockDuration: 3,
    defaultMockAnalysis: 2,
  },
  neet: {
    id: 'neet',
    name: 'NEET UG (Medical)',
    subjects: [
      { id: 'bio_bot', name: 'Biology — Botany (Genetics, Ecology, Plant Phys)', remainingChapters: 19, completedChapters: 7, hoursPerChapter: 4, difficulty: 'medium', practiceHoursPerChapter: 2, revisionCycles: 3, priority: 'high' },
      { id: 'bio_zoo', name: 'Biology — Zoology (Human Phys, Reproduction, Biotech)', remainingChapters: 19, completedChapters: 8, hoursPerChapter: 4, difficulty: 'medium', practiceHoursPerChapter: 2, revisionCycles: 3, priority: 'high' },
      { id: 'chem', name: 'Chemistry (Organic, Inorganic & Physical)', remainingChapters: 26, completedChapters: 6, hoursPerChapter: 5, difficulty: 'medium', practiceHoursPerChapter: 2.5, revisionCycles: 2, priority: 'medium' },
      { id: 'phy', name: 'Physics (Mechanics, Optics, Thermodynamics)', remainingChapters: 24, completedChapters: 5, hoursPerChapter: 6, difficulty: 'hard', practiceHoursPerChapter: 3.5, revisionCycles: 2, priority: 'high' },
    ],
    defaultPYQHours: 140,
    defaultMockTests: 12,
    defaultMockDuration: 3.3,
    defaultMockAnalysis: 2,
  },
  upsc: {
    id: 'upsc',
    name: 'UPSC Civil Services (IAS / IPS)',
    subjects: [
      { id: 'gs1', name: 'GS-1: History, Heritage, Geography & Society', remainingChapters: 25, completedChapters: 10, hoursPerChapter: 6, difficulty: 'medium', practiceHoursPerChapter: 2, revisionCycles: 2, priority: 'high' },
      { id: 'gs2', name: 'GS-2: Polity, Constitution, Governance & IR', remainingChapters: 20, completedChapters: 8, hoursPerChapter: 6, difficulty: 'hard', practiceHoursPerChapter: 2.5, revisionCycles: 2, priority: 'high' },
      { id: 'gs3', name: 'GS-3: Economy, Environment, Tech & Security', remainingChapters: 22, completedChapters: 6, hoursPerChapter: 6, difficulty: 'hard', practiceHoursPerChapter: 2.5, revisionCycles: 2, priority: 'high' },
      { id: 'optional', name: 'Optional Subject (Papers 1 & 2)', remainingChapters: 18, completedChapters: 6, hoursPerChapter: 8, difficulty: 'hard', practiceHoursPerChapter: 4, revisionCycles: 3, priority: 'high' },
    ],
    defaultPYQHours: 150,
    defaultMockTests: 15,
    defaultMockDuration: 2,
    defaultMockAnalysis: 2.5,
  },
  general: {
    id: 'general',
    name: 'College / Semester / General Preparation',
    subjects: [
      { id: 'sub1', name: 'Core Major Subject 1', remainingChapters: 10, completedChapters: 2, hoursPerChapter: 5, difficulty: 'medium', practiceHoursPerChapter: 2, revisionCycles: 2, priority: 'high' },
      { id: 'sub2', name: 'Core Major Subject 2', remainingChapters: 8, completedChapters: 3, hoursPerChapter: 5, difficulty: 'medium', practiceHoursPerChapter: 2, revisionCycles: 2, priority: 'medium' },
      { id: 'sub3', name: 'Elective / Secondary Subject', remainingChapters: 6, completedChapters: 2, hoursPerChapter: 4, difficulty: 'easy', practiceHoursPerChapter: 1.5, revisionCycles: 1, priority: 'low' },
    ],
    defaultPYQHours: 40,
    defaultMockTests: 4,
    defaultMockDuration: 3,
    defaultMockAnalysis: 1.5,
  },
};

/**
 * Returns default date string 90 days in the future (YYYY-MM-DD)
 */
export function getDefaultExamDate(daysAhead = 90) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

// ── CALENDAR & TIMELINE CALCULATIONS ──

/**
 * Calculates calendar days and effective study days between a start date and target exam date.
 * Respects studyDaysPerWeek (e.g. 6 days/week means 1 rest day every 7 days).
 * 
 * @param {string|Date} examDateInput 
 * @param {number} studyDaysPerWeek (1 to 7)
 * @param {string|Date} [startDateInput] defaults to today
 * @returns {object} { totalCalendarDays, availableStudyDays, restDays, weeks, isPastDate, isSameDay }
 */
export function calculateAvailableStudyDays(examDateInput, studyDaysPerWeek = 6, startDateInput = null) {
  const start = startDateInput ? new Date(startDateInput) : new Date();
  start.setHours(0, 0, 0, 0);

  if (!examDateInput) {
    return {
      totalCalendarDays: 0,
      availableStudyDays: 0,
      restDays: 0,
      weeks: 0,
      isPastDate: false,
      isSameDay: true,
      error: 'Please select an exam date',
    };
  }

  const exam = new Date(examDateInput);
  exam.setHours(0, 0, 0, 0);

  const diffMs = exam.getTime() - start.getTime();
  const totalCalendarDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (totalCalendarDays < 0) {
    return {
      totalCalendarDays: 0,
      availableStudyDays: 0,
      restDays: 0,
      weeks: 0,
      isPastDate: true,
      isSameDay: false,
      error: 'The examination date is in the past. Please select an upcoming date.',
    };
  }

  if (totalCalendarDays === 0) {
    return {
      totalCalendarDays: 0,
      availableStudyDays: 0,
      restDays: 0,
      weeks: 0,
      isPastDate: false,
      isSameDay: true,
      error: 'Exam is scheduled for today.',
    };
  }

  const cleanDaysPerWeek = Math.min(7, Math.max(1, Number(studyDaysPerWeek) || 6));
  const fullWeeks = Math.floor(totalCalendarDays / 7);
  const remainderDays = totalCalendarDays % 7;

  // Study days = fullWeeks * daysPerWeek + min(remainderDays, daysPerWeek)
  const availableStudyDays = (fullWeeks * cleanDaysPerWeek) + Math.min(remainderDays, cleanDaysPerWeek);
  const restDays = Math.max(0, totalCalendarDays - availableStudyDays);
  const weeks = Number((totalCalendarDays / 7).toFixed(1));

  return {
    totalCalendarDays,
    availableStudyDays: Math.max(1, availableStudyDays),
    restDays,
    weeks,
    isPastDate: false,
    isSameDay: false,
    error: null,
  };
}

/**
 * Calculates the expected calendar date on which syllabus completion will be achieved,
 * based on remaining hours and daily study capacity.
 */
export function calculateExpectedCompletionDate(totalHoursNeeded, dailyHoursAvailable, studyDaysPerWeek = 6, startDateInput = null) {
  if (!totalHoursNeeded || totalHoursNeeded <= 0 || !dailyHoursAvailable || dailyHoursAvailable <= 0) {
    const today = startDateInput ? new Date(startDateInput) : new Date();
    return today.toISOString().split('T')[0];
  }

  const cleanStudyDays = Math.min(7, Math.max(1, Number(studyDaysPerWeek) || 6));
  const requiredStudyDays = Math.ceil(totalHoursNeeded / dailyHoursAvailable);
  
  // Convert study days to calendar days
  const calendarRatio = 7 / cleanStudyDays;
  const calendarDaysNeeded = Math.ceil(requiredStudyDays * calendarRatio);

  const start = startDateInput ? new Date(startDateInput) : new Date();
  start.setHours(0, 0, 0, 0);
  const target = new Date(start.getTime() + calendarDaysNeeded * 24 * 60 * 60 * 1000);
  
  return target.toISOString().split('T')[0];
}

// ── FEASIBILITY DETERMINATION ──

/**
 * Classifies feasibility into 4 clear, honest, non-scientific categories:
 * - comfortable: surplus capacity >= 25%
 * - manageable: required <= available
 * - tight: required <= 1.25x available (minor deficit, recoverable with disciplined focus)
 * - not_feasible: required > 1.25x available (significant deficit, needs date/scope adjustment)
 */
export function determineFeasibility(requiredDaily, availableDaily) {
  const req = Number(requiredDaily) || 0;
  const avail = Number(availableDaily) || 6;

  if (req <= 0) {
    return {
      status: 'comfortable',
      label: 'Syllabus Complete',
      color: '#15803D',
      bg: '#F0FDF4',
      border: '#86EFAC',
      text: 'You have zero remaining chapters! Focus on active recall, spaced flashcards, and full-length exam mock simulations.',
      dailyDifference: +(avail - req).toFixed(1),
      isSurplus: true,
    };
  }

  const ratio = req / Math.max(0.1, avail);

  if (ratio <= 0.75) {
    return {
      status: 'comfortable',
      label: 'Comfortable Pace',
      color: '#15803D',
      bg: '#F0FDF4',
      border: '#86EFAC',
      text: `Your available study capacity exceeds the required workload by ${(avail - req).toFixed(1)} hrs/day. You have a generous safety buffer for restful sleep, deep revision, and recovery days.`,
      dailyDifference: +(avail - req).toFixed(1),
      isSurplus: true,
    };
  }

  if (ratio <= 1.05) {
    return {
      status: 'manageable',
      label: 'Realistic & Manageable',
      color: '#0284C7',
      bg: '#F0F9FF',
      border: '#BAE6FD',
      text: `Your plan is well-balanced. Dedicating ${req.toFixed(1)} hrs/day will complete your full syllabus and revision rounds comfortably before exam day with consistent daily execution.`,
      dailyDifference: +(avail - req).toFixed(1),
      isSurplus: avail >= req,
    };
  }

  if (ratio <= 1.30) {
    const deficit = +(req - avail).toFixed(1);
    return {
      status: 'tight',
      label: 'Tight Schedule (Intensive)',
      color: '#D97706',
      bg: '#FFFBEB',
      border: '#FDE68A',
      text: `Your schedule has minimal buffer. You face a deficit of ${deficit} hrs/day. Consider increasing your daily commitment by ~1 to 1.5 hours or prioritizing high-yield chapters first.`,
      dailyDifference: -deficit,
      isSurplus: false,
    };
  }

  const deficit = +(req - avail).toFixed(1);
  return {
    status: 'not_feasible',
    label: 'High Burnout / Unrealistic',
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
    text: `Required study load (${req.toFixed(1)} hrs/day) significantly exceeds your declared capacity (${avail.toFixed(1)} hrs/day) by ${deficit} hrs/day. Studying at this volume causes acute cognitive fatigue. We recommend trimming low-weightage topics (80/20 Pareto) or extending your target exam horizon.`,
    dailyDifference: -deficit,
    isSurplus: false,
  };
}

// ── QUICK CALCULATION ENGINE ──

export function calculateQuickWorkload({
  remainingChapters = 50,
  hoursPerChapter = 5,
  examDate = getDefaultExamDate(90),
  studyDaysPerWeek = 6,
  revisionCycles = 2,
  revisionPercent = REVISION_PERCENT_DEFAULT,
  dailyAvailableHours = 6,
  completedChapters = 10,
}) {
  const cleanChapters = Math.max(0, Number(remainingChapters) || 0);
  const cleanHoursPerCh = Math.max(0.5, Number(hoursPerChapter) || 5);
  const cleanRevisionCycles = Math.max(1, Number(revisionCycles) || 1);
  const cleanRevisionPercent = Math.max(10, Math.min(100, Number(revisionPercent) || REVISION_PERCENT_DEFAULT));
  const cleanAvailableHours = Math.max(0.5, Number(dailyAvailableHours) || 6);

  // A. Initial Learning Hours
  const learningHours = +(cleanChapters * cleanHoursPerCh).toFixed(1);

  // B. Revision Hours: First cycle is already in learningHours. Subsequent rounds take revisionPercent of initial time.
  const additionalRevisionRounds = Math.max(0, cleanRevisionCycles - 1);
  const revisionMultiplier = additionalRevisionRounds * (cleanRevisionPercent / 100);
  const revisionHours = +(learningHours * revisionMultiplier).toFixed(1);

  // C. Practice & PYQ Hours (Quick default estimation: ~1.5h practice per chapter)
  const practiceHours = +(cleanChapters * 1.5).toFixed(1);

  // D. Mock Tests (Quick default: 1 mock per 3 weeks remaining)
  const timeline = calculateAvailableStudyDays(examDate, studyDaysPerWeek);
  const estimatedMocks = Math.max(2, Math.floor(timeline.weeks / 3));
  const mockHours = +(estimatedMocks * 4.5).toFixed(1); // 3h test + 1.5h analysis

  // E. Unexpected Delay Buffer (10%)
  const subtotal = learningHours + revisionHours + practiceHours + mockHours;
  const bufferHours = +(subtotal * (BUFFER_PERCENT_DEFAULT / 100)).toFixed(1);

  // F. Total Workload
  const totalWorkloadHours = +(subtotal + bufferHours).toFixed(1);

  // G. Required Daily Hours
  const availableDays = timeline.availableStudyDays || 1;
  const requiredDailyHours = +(totalWorkloadHours / availableDays).toFixed(1);

  // H. Feasibility & Completion Date
  const feasibility = determineFeasibility(requiredDailyHours, cleanAvailableHours);
  const expectedCompletionDate = calculateExpectedCompletionDate(totalWorkloadHours, cleanAvailableHours, studyDaysPerWeek);

  // Total capacity available
  const totalAvailableCapacityHours = +(availableDays * cleanAvailableHours).toFixed(1);
  const totalHourGap = +(totalAvailableCapacityHours - totalWorkloadHours).toFixed(1);
  const extraDaysNeeded = totalHourGap < 0 ? Math.ceil(Math.abs(totalHourGap) / cleanAvailableHours) : 0;

  return {
    mode: 'quick',
    inputs: {
      remainingChapters: cleanChapters,
      hoursPerChapter: cleanHoursPerCh,
      examDate,
      studyDaysPerWeek,
      revisionCycles: cleanRevisionCycles,
      revisionPercent: cleanRevisionPercent,
      dailyAvailableHours: cleanAvailableHours,
      completedChapters: Number(completedChapters) || 0,
    },
    timeline,
    breakdown: {
      learningHours,
      revisionHours,
      practiceHours,
      mockHours,
      bufferHours,
      totalWorkloadHours,
    },
    requiredDailyHours,
    dailyAvailableHours: cleanAvailableHours,
    feasibility,
    expectedCompletionDate,
    totalAvailableCapacityHours,
    totalHourGap,
    extraDaysNeeded,
  };
}

// ── ADVANCED SUBJECT-WISE CALCULATION ENGINE ──

export function calculateAdvancedWorkload({
  subjects = [],
  examDate = getDefaultExamDate(90),
  studyDaysPerWeek = 6,
  pyqHours = 60,
  mockTestCount = 8,
  mockTestDuration = 3,
  mockAnalysisDuration = 2,
  activeRecallHoursPerWeek = 4,
  delayBufferPercent = BUFFER_PERCENT_DEFAULT,
  dailyAvailableHours = 6,
}) {
  const cleanSubjects = Array.isArray(subjects) && subjects.length > 0 ? subjects : SUBJECT_PRESETS.general.subjects;
  const cleanStudyDays = Math.min(7, Math.max(1, Number(studyDaysPerWeek) || 6));
  const cleanAvailableHours = Math.max(0.5, Number(dailyAvailableHours) || 6);

  const timeline = calculateAvailableStudyDays(examDate, cleanStudyDays);

  let totalRemainingChapters = 0;
  let totalCompletedChapters = 0;
  let initialLearningHours = 0;
  let subjectPracticeHours = 0;
  let subjectRevisionHours = 0;

  const subjectWorkloads = cleanSubjects.map((sub) => {
    const remCh = Math.max(0, Number(sub.remainingChapters) || 0);
    const compCh = Math.max(0, Number(sub.completedChapters) || 0);
    const hoursPerCh = Math.max(0.5, Number(sub.hoursPerChapter) || 5);
    const diffMultiplier = DIFFICULTY_MULTIPLIERS[sub.difficulty] || 1.0;
    const practicePerCh = Math.max(0, Number(sub.practiceHoursPerChapter) || 2);
    const revCycles = Math.max(1, Number(sub.revisionCycles) || 1);

    totalRemainingChapters += remCh;
    totalCompletedChapters += compCh;

    // Initial learning for this subject
    const subLearning = +(remCh * hoursPerCh * diffMultiplier).toFixed(1);
    initialLearningHours += subLearning;

    // Practice hours for this subject
    const subPractice = +(remCh * practicePerCh).toFixed(1);
    subjectPracticeHours += subPractice;

    // Revision hours for this subject (35% of learning time per additional cycle)
    const revRounds = Math.max(0, revCycles - 1);
    const subRevision = +(subLearning * revRounds * 0.35).toFixed(1);
    subjectRevisionHours += subRevision;

    const subTotal = +(subLearning + subPractice + subRevision).toFixed(1);

    return {
      ...sub,
      learningHours: subLearning,
      practiceHours: subPractice,
      revisionHours: subRevision,
      totalHours: subTotal,
      percentageOfTotal: 0, // calculated below
    };
  });

  // Dedicated Practice (PYQs)
  const cleanPyqHours = Math.max(0, Number(pyqHours) || 0);
  const totalPracticeHours = +(subjectPracticeHours + cleanPyqHours).toFixed(1);

  // Active Recall Time across preparation weeks
  const cleanActiveRecallWeekly = Math.max(0, Number(activeRecallHoursPerWeek) || 0);
  const activeRecallTotal = +(timeline.weeks * cleanActiveRecallWeekly).toFixed(1);
  const totalRevisionHours = +(subjectRevisionHours + activeRecallTotal).toFixed(1);

  // Mock Tests & Error Analysis
  const cleanMockCount = Math.max(0, Number(mockTestCount) || 0);
  const cleanMockDuration = Math.max(1, Number(mockTestDuration) || 3);
  const cleanMockAnalysis = Math.max(0, Number(mockAnalysisDuration) || 2);
  const totalMockHours = +(cleanMockCount * (cleanMockDuration + cleanMockAnalysis)).toFixed(1);

  // Safety Buffer
  const cleanBufferPercent = Math.max(0, Math.min(30, Number(delayBufferPercent) || BUFFER_PERCENT_DEFAULT));
  const subtotal = initialLearningHours + totalPracticeHours + totalRevisionHours + totalMockHours;
  const bufferHours = +(subtotal * (cleanBufferPercent / 100)).toFixed(1);

  // Total Preparation Workload
  const totalWorkloadHours = +(subtotal + bufferHours).toFixed(1);

  // Assign subject percentage shares
  subjectWorkloads.forEach((s) => {
    s.percentageOfTotal = totalWorkloadHours > 0 ? +((s.totalHours / totalWorkloadHours) * 100).toFixed(1) : 0;
  });

  // Daily requirement and feasibility
  const availableDays = timeline.availableStudyDays || 1;
  const requiredDailyHours = +(totalWorkloadHours / availableDays).toFixed(1);
  const feasibility = determineFeasibility(requiredDailyHours, cleanAvailableHours);
  const expectedCompletionDate = calculateExpectedCompletionDate(totalWorkloadHours, cleanAvailableHours, cleanStudyDays);

  const totalAvailableCapacityHours = +(availableDays * cleanAvailableHours).toFixed(1);
  const totalHourGap = +(totalAvailableCapacityHours - totalWorkloadHours).toFixed(1);
  const extraDaysNeeded = totalHourGap < 0 ? Math.ceil(Math.abs(totalHourGap) / cleanAvailableHours) : 0;

  return {
    mode: 'advanced',
    inputs: {
      examDate,
      studyDaysPerWeek: cleanStudyDays,
      pyqHours: cleanPyqHours,
      mockTestCount: cleanMockCount,
      mockTestDuration: cleanMockDuration,
      mockAnalysisDuration: cleanMockAnalysis,
      activeRecallHoursPerWeek: cleanActiveRecallWeekly,
      delayBufferPercent: cleanBufferPercent,
      dailyAvailableHours: cleanAvailableHours,
    },
    timeline,
    subjects: subjectWorkloads,
    totals: {
      remainingChapters: totalRemainingChapters,
      completedChapters: totalCompletedChapters,
    },
    breakdown: {
      learningHours: +initialLearningHours.toFixed(1),
      practiceHours: totalPracticeHours,
      revisionHours: totalRevisionHours,
      mockHours: totalMockHours,
      bufferHours,
      totalWorkloadHours,
    },
    requiredDailyHours,
    dailyAvailableHours: cleanAvailableHours,
    feasibility,
    expectedCompletionDate,
    totalAvailableCapacityHours,
    totalHourGap,
    extraDaysNeeded,
  };
}

// ── WHAT-IF SCENARIO SIMULATOR ──

/**
 * Compares preparation timelines across 5 standard study tiers + 1 custom tier.
 */
export function calculateScenarios(totalWorkloadHours, availableStudyDays, examDate, studyDaysPerWeek = 6, customHours = 7) {
  const tiers = [
    { id: 'light', label: 'Light Pace', dailyHours: 3, tierName: 'Low Intensity', notes: 'Best for working professionals or light semester review; risks missing dates for heavy syllabuses.' },
    { id: 'moderate', label: 'Balanced Sprint', dailyHours: 4, tierName: 'Moderate', notes: 'Sustainable for multi-month prep. Leaves ample room for exercise, meals and full sleep.' },
    { id: 'recommended', label: 'Standard Deep Work', dailyHours: 5, tierName: 'Optimal', notes: 'The gold standard for full-time students. 5 pure Pomodoro focus hours yields peak retention.' },
    { id: 'intensive', label: 'Intensive Preparation', dailyHours: 6, tierName: 'Competitive Sprint', notes: 'Demanding pace for competitive exams (JEE/NEET/UPSC). Requires zero phone distraction.' },
    { id: 'extreme', label: 'Crash Exam Sprint', dailyHours: 8, tierName: 'High Strain', notes: 'Emergency sprint pace for final 3-4 weeks. Risk of cognitive exhaustion if sustained longer.' },
    { id: 'custom', label: 'Custom Pace', dailyHours: Math.max(1, Number(customHours) || 7), tierName: 'Custom Defined', notes: 'Your personally adjusted daily commitment.' },
  ];

  const examTime = new Date(examDate).getTime();

  return tiers.map((tier) => {
    const daysNeeded = Math.ceil(totalWorkloadHours / tier.dailyHours);
    const completionDate = calculateExpectedCompletionDate(totalWorkloadHours, tier.dailyHours, studyDaysPerWeek);
    const compTime = new Date(completionDate).getTime();
    const finishesBeforeExam = compTime <= examTime;
    const daysMargin = Math.round((examTime - compTime) / (1000 * 60 * 60 * 24));

    return {
      ...tier,
      studyDaysNeeded: daysNeeded,
      completionDate,
      finishesBeforeExam,
      daysMargin,
      status: finishesBeforeExam ? (daysMargin > 14 ? 'Comfortable Finish' : 'Just in Time') : `Delayed by ${Math.abs(daysMargin)} days`,
      statusColor: finishesBeforeExam ? '#15803D' : '#DC2626',
      statusBg: finishesBeforeExam ? '#F0FDF4' : '#FEF2F2',
    };
  });
}

// ── TEXT OUTLINE EXPORT ──

export function generateStudyHoursTextExport(calcData, studentName = 'Aspirant', examName = 'Competitive Exam') {
  const { breakdown, timeline, requiredDailyHours, dailyAvailableHours, feasibility, expectedCompletionDate, mode } = calcData;

  const lines = [
    `==================================================`,
    `LIFETRACK PRO — STUDY HOURS & WORKLOAD REPORT`,
    `Student: ${studentName} | Target Exam: ${examName}`,
    `Generated on: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    `==================================================\n`,
    `1. PREPARATION FEASIBILITY: ${feasibility.label.toUpperCase()}`,
    `• Required Daily Study: ${requiredDailyHours} hrs/day`,
    `• Declared Daily Capacity: ${dailyAvailableHours} hrs/day`,
    `• Capacity Margin: ${feasibility.isSurplus ? `+${feasibility.dailyDifference} hrs surplus` : `${feasibility.dailyDifference} hrs deficit`}`,
    `• Feasibility Advisory: ${feasibility.text}\n`,
    `2. TIMELINE & COUNTDOWN:`,
    `• Target Exam Date: ${calcData.inputs.examDate}`,
    `• Total Calendar Days Remaining: ${timeline.totalCalendarDays} days (${timeline.weeks} weeks)`,
    `• Available Study Days (Net): ${timeline.availableStudyDays} days (${calcData.inputs.studyDaysPerWeek} days/week)`,
    `• Scheduled Rest Days: ${timeline.restDays} days`,
    `• Expected Syllabus Completion Date: ${expectedCompletionDate}\n`,
    `3. WORKLOAD ALLOCATION BREAKDOWN:`,
    `• Initial Learning: ${breakdown.learningHours} hrs`,
    `• Practice & PYQs: ${breakdown.practiceHours} hrs`,
    `• Revision Cycles: ${breakdown.revisionHours} hrs`,
    `• Full Mock Tests & Analysis: ${breakdown.mockHours} hrs`,
    `• Safety Buffer (Delays/Illness): ${breakdown.bufferHours} hrs`,
    `--------------------------------------------------`,
    `TOTAL PREPARATION WORKLOAD: ${breakdown.totalWorkloadHours} HOURS`,
    `--------------------------------------------------\n`,
  ];

  if (mode === 'advanced' && Array.isArray(calcData.subjects)) {
    lines.push(`4. SUBJECT-WISE WORKLOAD:`);
    calcData.subjects.forEach((s) => {
      lines.push(`• [${s.priority.toUpperCase()}] ${s.name}: ${s.totalHours} hrs (${s.percentageOfTotal}% of total)`);
      lines.push(`  ↳ Learning: ${s.learningHours}h | Practice: ${s.practiceHours}h | Revision: ${s.revisionHours}h | Rem: ${s.remainingChapters} ch`);
    });
    lines.push('');
  }

  lines.push(`==================================================`);
  lines.push(`Track this workload and daily progress with LifeTrack Pro:`);
  lines.push(`https://lifetrackpro.in/tools/study-hours-calculator`);
  lines.push(`Google Play Store: https://play.google.com/store/apps/details?id=com.lifetrackpro.app`);
  lines.push(`==================================================`);

  return lines.join('\n');
}
