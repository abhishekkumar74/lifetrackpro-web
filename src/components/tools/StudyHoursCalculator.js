'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  calculateQuickWorkload,
  calculateAdvancedWorkload,
  calculateScenarios,
  getDefaultExamDate,
  generateStudyHoursTextExport,
  SUBJECT_PRESETS,
  REVISION_PERCENT_DEFAULT,
  BUFFER_PERCENT_DEFAULT,
} from '@/lib/studyHoursEngine';
import {
  WorkloadBreakdownChart,
  CapacityComparisonBar,
  SubjectDistributionBars,
  WhatIfScenarioTimeline,
} from './calculator/CalculatorCharts';
import StudyHoursPrintDocument from './calculator/StudyHoursPrintDocument';
import SavedCalculationsModal from './calculator/SavedCalculationsModal';
import {
  IconSparkles,
  IconLayers,
  IconCalendar,
  IconClock,
  IconSliders,
  IconBookmark,
  IconDownload,
  IconPrinter,
  IconCopy,
  IconCheck,
  IconFolder,
  IconRotateCcw,
  IconBookOpen,
  IconActivity,
  IconTrendingUp,
  IconAlertCircle,
  IconCheckCircle2,
  IconArrowRight,
  IconPlus,
  IconTrash2,
} from './calculator/CalculatorIcons';
import PlayStoreIcon from '@/components/PlayStoreIcon';

/**
 * StudyHoursCalculator
 * 
 * Premium Academic Workload & Preparation Feasibility Calculator.
 * Redesigned with a modern, high-end analytical SaaS aesthetic (Linear/Stripe-inspired),
 * crisp SVG micro-icons, zero childish emojis, and balanced responsive layout.
 */
export default function StudyHoursCalculator() {
  const [mode, setMode] = useState('quick'); // 'quick' | 'advanced'
  const [studentName, setStudentName] = useState('');
  const [examName, setExamName] = useState('Competitive Exam');
  const [toastMessage, setToastMessage] = useState(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultsRef = useRef(null);

  // ── QUICK MODE STATE ──
  const [quickRemainingChapters, setQuickRemainingChapters] = useState(20);
  const [quickCompletedChapters, setQuickCompletedChapters] = useState(6);
  const [quickHoursPerChapter, setQuickHoursPerChapter] = useState(5);
  const [quickExamDate, setQuickExamDate] = useState(() => getDefaultExamDate(90));
  const [quickStudyDaysPerWeek, setQuickStudyDaysPerWeek] = useState(6);
  const [quickRevisionCycles, setQuickRevisionCycles] = useState(2);
  const [quickRevisionPercent, setQuickRevisionPercent] = useState(REVISION_PERCENT_DEFAULT);
  const [quickAvailableHours, setQuickAvailableHours] = useState(6);

  // ── ADVANCED MODE STATE ──
  const [selectedPreset, setSelectedPreset] = useState('jee');
  const [advancedSubjects, setAdvancedSubjects] = useState(() => SUBJECT_PRESETS.jee.subjects);
  const [advancedExamDate, setAdvancedExamDate] = useState(() => getDefaultExamDate(120));
  const [advancedStudyDaysPerWeek, setAdvancedStudyDaysPerWeek] = useState(6);
  const [advancedAvailableHours, setAdvancedAvailableHours] = useState(7);
  const [pyqHours, setPyqHours] = useState(90);
  const [mockCount, setMockCount] = useState(10);
  const [mockDuration, setMockDuration] = useState(3);
  const [mockAnalysis, setMockAnalysis] = useState(2);
  const [activeRecallWeekly, setActiveRecallWeekly] = useState(3);
  const [bufferPercent, setBufferPercent] = useState(BUFFER_PERCENT_DEFAULT);
  const [showAdvancedExtras, setShowAdvancedExtras] = useState(false);

  // ── WHAT-IF CUSTOM PACE SLIDER ──
  const [customPaceHours, setCustomPaceHours] = useState(5);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ── LOAD PRESET ──
  const handleLoadPreset = (presetKey) => {
    setSelectedPreset(presetKey);
    const preset = SUBJECT_PRESETS[presetKey] || SUBJECT_PRESETS.general;
    setAdvancedSubjects(JSON.parse(JSON.stringify(preset.subjects)));
    setExamName(preset.name);
    setPyqHours(preset.defaultPYQHours);
    setMockCount(preset.defaultMockTests);
    setMockDuration(preset.defaultMockDuration);
    setMockAnalysis(preset.defaultMockAnalysis);
    showToast(`Loaded ${preset.name} workload template`);
  };

  // ── RESET INPUTS ──
  const handleResetInputs = () => {
    if (mode === 'quick') {
      setQuickRemainingChapters(20);
      setQuickCompletedChapters(6);
      setQuickHoursPerChapter(5);
      setQuickExamDate(getDefaultExamDate(90));
      setQuickStudyDaysPerWeek(6);
      setQuickRevisionCycles(2);
      setQuickRevisionPercent(REVISION_PERCENT_DEFAULT);
      setQuickAvailableHours(6);
    } else {
      handleLoadPreset('jee');
    }
    setHasCalculated(false);
    showToast('Inputs reset to baseline defaults');
  };

  // ── GENERATE / CALCULATE ACTION ──
  const handleCalculate = () => {
    setHasCalculated(true);
    showToast('⚡ Study hours & workload feasibility calculated!');
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  // ── ADVANCED SUBJECT HANDLERS ──
  const handleUpdateSubject = (id, field, value) => {
    setAdvancedSubjects(prev => prev.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleAddSubject = () => {
    const newSub = {
      id: `sub-${Date.now()}`,
      name: `Subject ${advancedSubjects.length + 1}`,
      remainingChapters: 12,
      completedChapters: 0,
      hoursPerChapter: 5,
      difficulty: 'medium',
      practiceHours: 20,
      revisionCycles: 2,
      priority: 'medium',
    };
    setAdvancedSubjects(prev => [...prev, newSub]);
    showToast('New subject added');
  };

  const handleDeleteSubject = (id) => {
    if (advancedSubjects.length <= 1) {
      showToast('At least one subject is required');
      return;
    }
    setAdvancedSubjects(prev => prev.filter(s => s.id !== id));
  };

  // ── CALCULATION ENGINE EXECUTION ──
  const calcData = useMemo(() => {
    if (mode === 'quick') {
      return calculateQuickWorkload({
        remainingChapters: quickRemainingChapters,
        completedChapters: quickCompletedChapters,
        hoursPerChapter: quickHoursPerChapter,
        examDate: quickExamDate,
        studyDaysPerWeek: quickStudyDaysPerWeek,
        revisionCycles: quickRevisionCycles,
        revisionPercent: quickRevisionPercent,
        dailyAvailableHours: quickAvailableHours,
      });
    }

    return calculateAdvancedWorkload({
      subjects: advancedSubjects,
      examDate: advancedExamDate,
      studyDaysPerWeek: advancedStudyDaysPerWeek,
      dailyAvailableHours: advancedAvailableHours,
      pyqHours,
      mockCount,
      mockDuration,
      mockAnalysis,
      activeRecallWeekly,
      bufferPercent,
    });
  }, [
    mode,
    quickRemainingChapters,
    quickCompletedChapters,
    quickHoursPerChapter,
    quickExamDate,
    quickStudyDaysPerWeek,
    quickRevisionCycles,
    quickRevisionPercent,
    quickAvailableHours,
    advancedSubjects,
    advancedExamDate,
    advancedStudyDaysPerWeek,
    advancedAvailableHours,
    pyqHours,
    mockCount,
    mockDuration,
    mockAnalysis,
    activeRecallWeekly,
    bufferPercent,
  ]);

  // ── WHAT-IF SCENARIOS ──
  const scenarios = useMemo(() => {
    const totalWorkload = calcData.breakdown?.totalWorkloadHours || 400;
    const availableStudyDays = calcData.timeline?.availableStudyDays || 90;
    const examDate = mode === 'quick' ? quickExamDate : advancedExamDate;
    const studyDaysPerWeek = mode === 'quick' ? quickStudyDaysPerWeek : advancedStudyDaysPerWeek;
    const currentPace = mode === 'quick' ? quickAvailableHours : advancedAvailableHours;

    return calculateScenarios(
      totalWorkload,
      availableStudyDays,
      examDate,
      studyDaysPerWeek,
      currentPace,
      customPaceHours
    );
  }, [calcData, mode, quickExamDate, advancedExamDate, quickStudyDaysPerWeek, advancedStudyDaysPerWeek, quickAvailableHours, advancedAvailableHours, customPaceHours]);

  // ── ACTIONS: SAVE SCENARIO ──
  const handleSaveScenario = () => {
    try {
      const savedList = JSON.parse(localStorage.getItem('lifetrack_saved_study_hours') || '[]');
      const newEntry = {
        id: `scen-${Date.now()}`,
        name: `${examName || 'Exam Plan'} (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
        timestamp: Date.now(),
        mode,
        studentName,
        examName,
        calcData,
      };
      const updated = [newEntry, ...savedList].slice(0, 20);
      localStorage.setItem('lifetrack_saved_study_hours', JSON.stringify(updated));
      showToast('Scenario saved successfully');
    } catch {
      showToast('Unable to access localStorage');
    }
  };

  // ── ACTIONS: LOAD SCENARIO DATA ──
  const handleLoadScenarioData = (loadedEntry) => {
    if (!loadedEntry) return;
    setMode(loadedEntry.mode || 'quick');
    setStudentName(loadedEntry.studentName || '');
    setExamName(loadedEntry.examName || 'Competitive Exam');

    const loadedData = loadedEntry.calcData;
    if (loadedData && loadedData.inputs) {
      if (loadedEntry.mode === 'quick') {
        setQuickRemainingChapters(loadedData.inputs.remainingChapters || 50);
        setQuickHoursPerChapter(loadedData.inputs.hoursPerChapter || 5);
        setQuickExamDate(loadedData.inputs.examDate || getDefaultExamDate(90));
        setQuickStudyDaysPerWeek(loadedData.inputs.studyDaysPerWeek || 6);
        setQuickRevisionCycles(loadedData.inputs.revisionCycles || 2);
        setQuickRevisionPercent(loadedData.inputs.revisionPercent || REVISION_PERCENT_DEFAULT);
        setQuickAvailableHours(loadedData.dailyAvailableHours || 6);
      } else {
        setAdvancedSubjects(loadedData.subjects || SUBJECT_PRESETS.jee.subjects);
        setAdvancedExamDate(loadedData.inputs.examDate || getDefaultExamDate(120));
        setAdvancedStudyDaysPerWeek(loadedData.inputs.studyDaysPerWeek || 6);
        setAdvancedAvailableHours(loadedData.dailyAvailableHours || 7);
        setPyqHours(loadedData.inputs.pyqHours || 90);
        setMockCount(loadedData.inputs.mockTestCount || 10);
        setMockDuration(loadedData.inputs.mockTestDuration || 3);
        setMockAnalysis(loadedData.inputs.mockAnalysisDuration || 2);
        setActiveRecallWeekly(loadedData.inputs.activeRecallHoursPerWeek || 4);
        setBufferPercent(loadedData.inputs.delayBufferPercent || BUFFER_PERCENT_DEFAULT);
      }
    }
    setHasCalculated(true);
    showToast('Scenario loaded');
  };

  // ── ACTIONS: COPY TEXT OUTLINE ──
  const handleCopyOutline = () => {
    const text = generateStudyHoursTextExport(calcData, studentName, examName);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showToast('Study Hours report copied');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // ── ACTIONS: PRINT REPORT ──
  const handlePrintReport = () => {
    window.print();
  };

  // ── ACTIONS: DOWNLOAD PDF REPORT ──
  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    showToast('Generating high-resolution A4 Study Hours PDF...');

    let originalDisplay = '';
    let originalPosition = '';
    let originalLeft = '';
    let originalTop = '';
    let originalWidth = '';
    let originalZIndex = '';
    let originalOpacity = '';
    let originalBackground = '';
    let originalPadding = '';
    let originalBoxSizing = '';
    let element = null;

    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      element = document.getElementById('study-hours-print-document');
      if (!element) {
        window.print();
        setIsExportingPdf(false);
        return;
      }

      // Temporarily reveal element with exact A4 portrait dimensions
      originalDisplay = element.style.display;
      originalPosition = element.style.position;
      originalLeft = element.style.left;
      originalTop = element.style.top;
      originalWidth = element.style.width;
      originalZIndex = element.style.zIndex;
      originalOpacity = element.style.opacity;
      originalBackground = element.style.background;
      originalPadding = element.style.padding;
      originalBoxSizing = element.style.boxSizing;

      element.style.display = 'block';
      element.style.position = 'fixed';
      element.style.top = '0';
      element.style.left = '0';
      element.style.width = '794px'; // 210mm at 96 DPI
      element.style.maxWidth = '794px';
      element.style.background = '#FFFFFF';
      element.style.padding = '14px 18px';
      element.style.boxSizing = 'border-box';
      element.style.zIndex = '99999';
      element.style.opacity = '1';

      await new Promise(r => setTimeout(r, 150));

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
        windowWidth: 794,
      });

      // Restore DOM styles immediately
      element.style.display = originalDisplay || '';
      element.style.position = originalPosition || '';
      element.style.left = originalLeft || '';
      element.style.top = originalTop || '';
      element.style.width = originalWidth || '';
      element.style.maxWidth = '';
      element.style.zIndex = originalZIndex || '';
      element.style.opacity = originalOpacity || '';
      element.style.background = originalBackground || '';
      element.style.padding = originalPadding || '';
      element.style.boxSizing = originalBoxSizing || '';

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 8;
      const printWidth = pdfWidth - margin * 2; // 194mm
      const printHeight = pdfHeight - margin * 2; // 281mm

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const pageCanvasHeight = Math.floor(canvasWidth * (printHeight / printWidth));

      let renderedHeight = 0;
      let pageIndex = 0;

      // Prevent trailing whitespace creating an empty extra page
      while (renderedHeight < canvasHeight - 25) {
        if (pageIndex > 0) {
          doc.addPage();
        }

        const sliceHeight = Math.min(pageCanvasHeight, canvasHeight - renderedHeight);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasWidth, sliceHeight);
        ctx.drawImage(
          canvas,
          0, renderedHeight, canvasWidth, sliceHeight,
          0, 0, canvasWidth, sliceHeight
        );

        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
        const slicePrintHeight = (sliceHeight / canvasWidth) * printWidth;

        doc.addImage(imgData, 'JPEG', margin, margin, printWidth, slicePrintHeight);

        renderedHeight += sliceHeight;
        pageIndex++;
      }

      const safeExam = (examName || 'Exam').replace(/[^a-zA-Z0-9]/g, '-').slice(0, 25);
      doc.save(`${safeExam}-Study-Hours-Report.pdf`);
      showToast('Study Hours PDF downloaded');
    } catch (err) {
      console.error('PDF export failed, fallback to native browser print:', err);
      if (element) {
        element.style.display = originalDisplay || '';
        element.style.position = originalPosition || '';
        element.style.left = originalLeft || '';
        element.style.top = originalTop || '';
        element.style.width = originalWidth || '';
        element.style.maxWidth = '';
        element.style.zIndex = originalZIndex || '';
        element.style.opacity = originalOpacity || '';
        element.style.background = originalBackground || '';
        element.style.padding = originalPadding || '';
        element.style.boxSizing = originalBoxSizing || '';
      }
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="study-hours-calculator-widget" style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            maxWidth: 'calc(100vw - 32px)',
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '12.5px',
            fontWeight: 650,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            animation: 'fadeIn 0.2s ease-in-out',
            pointerEvents: 'none',
          }}
        >
          <IconCheck size={14} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── TOP CONTROL BAR: SEGMENTED SWITCHER + TARGET CONTEXT ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
          padding: '8px 12px',
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)',
        }}
      >
        {/* Raycast / Apple style Segmented Pill Switcher */}
        <div
          style={{
            display: 'inline-flex',
            background: '#F1F5F9',
            padding: '3px',
            borderRadius: '9px',
            border: '1px solid #E2E8F0',
          }}
        >
          <button
            type="button"
            onClick={() => setMode('quick')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '7px',
              border: 'none',
              background: mode === 'quick' ? '#FFFFFF' : 'transparent',
              color: mode === 'quick' ? '#5B5CF0' : '#64748B',
              boxShadow: mode === 'quick' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <IconSparkles size={13} color={mode === 'quick' ? '#5B5CF0' : '#64748B'} />
            <span>Quick Calculation</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('advanced')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '7px',
              border: 'none',
              background: mode === 'advanced' ? '#FFFFFF' : 'transparent',
              color: mode === 'advanced' ? '#5B5CF0' : '#64748B',
              boxShadow: mode === 'advanced' ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <IconLayers size={13} color={mode === 'advanced' ? '#5B5CF0' : '#64748B'} />
            <span>Advanced Subject-Wise Audit</span>
          </button>
        </div>

        {/* Quick Personalization Inputs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: '1 1 auto', justifyContent: 'flex-end' }}>
          <input
            type="text"
            placeholder="Target Exam (e.g. JEE, NEET, UPSC)"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              borderRadius: '7px',
              border: '1px solid #CBD5E1',
              width: '180px',
              maxWidth: '100%',
              flex: '1 1 150px',
              outline: 'none',
              background: '#FFFFFF',
              color: '#0F172A',
            }}
          />
          <input
            type="text"
            placeholder="Student Name (Optional)"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              borderRadius: '7px',
              border: '1px solid #CBD5E1',
              width: '150px',
              maxWidth: '100%',
              flex: '1 1 130px',
              outline: 'none',
              background: '#FFFFFF',
              color: '#0F172A',
            }}
          />
        </div>
      </div>

      {/* ── MAIN WORKSPACE GRID: INPUTS (LEFT) vs LIVE RESULTS (RIGHT) ── */}
      <div className="study-hours-workspace-grid">
        {/* ════════════ LEFT COLUMN: INPUTS & WORKLOAD CONFIGURATION ════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%', boxSizing: 'border-box' }}>
          {mode === 'quick' ? (
            /* QUICK MODE PARAMETERS CARD */
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '20px 22px',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconSliders size={15} color="#5B5CF0" />
                </div>
                <div>
                  <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Quick Academic Parameters
                  </h2>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    Calculates required daily study pace from syllabus volume &amp; calendar countdown
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* 1. Target Examination Date Picker */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Target Examination Date:
                    </label>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: '#EEF2FF',
                        color: '#5B5CF0',
                      }}
                    >
                      {calcData.timeline.totalCalendarDays} days ({calcData.timeline.weeks} wks left)
                    </span>
                  </div>
                  <input
                    type="date"
                    min={todayStr}
                    value={quickExamDate}
                    onChange={(e) => setQuickExamDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      background: '#FFFFFF',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* 2. Remaining Chapters Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Remaining Chapters / Topics to Learn:
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input
                        type="number"
                        min="0"
                        max="300"
                        value={quickRemainingChapters}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (isNaN(val)) {
                            setQuickRemainingChapters(0);
                          } else {
                            setQuickRemainingChapters(Math.max(0, Math.min(300, val)));
                          }
                        }}
                        style={{
                          width: '56px',
                          padding: '3px 6px',
                          fontSize: '13px',
                          fontWeight: 750,
                          textAlign: 'center',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          color: '#0F172A',
                        }}
                      />
                      <span style={{ fontSize: '11px', color: '#64748B' }}>ch</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={Math.min(30, quickRemainingChapters)}
                    onChange={(e) => setQuickRemainingChapters(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#5B5CF0', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
                    <span>0 (Revision Only)</span>
                    <span>10 ch</span>
                    <span>20 ch</span>
                    <span>30 ch (Standard Subject)</span>
                  </div>
                  {quickRemainingChapters > 30 && (
                    <div style={{ fontSize: '11px', color: '#4F46E5', marginTop: '4px', fontWeight: 600 }}>
                      ℹ️ Multi-subject aggregate syllabus: {quickRemainingChapters} chapters (max limit: 300)
                    </div>
                  )}
                </div>

                {/* 3. Average Learning Hours per Chapter */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Average Learning Hours per Chapter:
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input
                        type="number"
                        min="0.5"
                        max="30"
                        step="0.5"
                        value={quickHoursPerChapter}
                        onChange={(e) => setQuickHoursPerChapter(Math.max(0.5, parseFloat(e.target.value) || 1))}
                        style={{
                          width: '54px',
                          padding: '3px 6px',
                          fontSize: '13px',
                          fontWeight: 750,
                          textAlign: 'center',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          color: '#0F172A',
                        }}
                      />
                      <span style={{ fontSize: '11px', color: '#64748B' }}>hrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={quickHoursPerChapter}
                    onChange={(e) => setQuickHoursPerChapter(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#5B5CF0' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
                    <span>1h (Review)</span>
                    <span>5h (Standard Theory)</span>
                    <span>10h (Heavy STEM)</span>
                    <span>15h</span>
                  </div>
                </div>

                {/* 4. Revision Cycles & Forgetting Curve Percentage */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Revision Cycles:
                    </label>
                    <select
                      value={quickRevisionCycles}
                      onChange={(e) => setQuickRevisionCycles(Number(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        fontSize: '12px',
                        fontWeight: 650,
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        outline: 'none',
                      }}
                    >
                      <option value="1">1x (First read only)</option>
                      <option value="2">2x (1 read + 1 revision)</option>
                      <option value="3">3x (1 read + 2 revisions)</option>
                      <option value="4">4x (High-rank mastery)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Revision Time % per Cycle:
                    </label>
                    <select
                      value={quickRevisionPercent}
                      onChange={(e) => setQuickRevisionPercent(Number(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        fontSize: '12px',
                        fontWeight: 650,
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        outline: 'none',
                      }}
                    >
                      <option value="25">25% (Spaced Flashcards)</option>
                      <option value="35">35% (Standard Forgetting Curve)</option>
                      <option value="50">50% (Detailed Second Read)</option>
                    </select>
                  </div>
                </div>

                {/* 5. Study Days per Week & Available Hours */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Study Days per Week:
                    </label>
                    <select
                      value={quickStudyDaysPerWeek}
                      onChange={(e) => setQuickStudyDaysPerWeek(Number(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        fontSize: '12px',
                        fontWeight: 650,
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        outline: 'none',
                      }}
                    >
                      <option value="5">5 days / wk (2 rest/mocks)</option>
                      <option value="6">6 days / wk (1 rest day — Optimal)</option>
                      <option value="7">7 days / wk (Daily continuous)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Your Daily Study Capacity:
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input
                        type="number"
                        min="1"
                        max="16"
                        step="0.5"
                        value={quickAvailableHours}
                        onChange={(e) => setQuickAvailableHours(Math.max(1, parseFloat(e.target.value) || 1))}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          background: '#FFFFFF',
                          color: '#0F172A',
                          outline: 'none',
                        }}
                      />
                      <span style={{ fontSize: '11px', color: '#64748B', whiteSpace: 'nowrap' }}>hrs/day</span>
                    </div>
                  </div>
                </div>

                {/* Calculate / Recalculate CTA Button */}
                <div style={{ marginTop: '4px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                  <button
                    type="button"
                    onClick={handleCalculate}
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      padding: '12px 18px',
                      fontSize: '13.5px',
                      fontWeight: 750,
                      borderRadius: '10px',
                      background: '#5B5CF0',
                      color: '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(91, 92, 240, 0.28)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#4F46E5'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#5B5CF0'; }}
                  >
                    <IconSparkles size={15} color="#FFFFFF" />
                    <span>{hasCalculated ? '🔄 Recalculate Study Hours' : '⚡ Calculate Required Study Hours'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ADVANCED SUBJECT-WISE AUDIT CARD */
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '20px 22px',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
              }}
            >
              {/* Preset Selector */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                <div>
                  <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Subject-by-Subject Workload Audit
                  </h2>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    Granular chapter counts, difficulty multipliers, and practice hours
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {Object.entries(SUBJECT_PRESETS).map(([key, p]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleLoadPreset(key)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        borderRadius: '6px',
                        border: selectedPreset === key ? '1px solid #5B5CF0' : '1px solid #E2E8F0',
                        background: selectedPreset === key ? '#EEF2FF' : '#F8FAFC',
                        color: selectedPreset === key ? '#5B5CF0' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {p.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {advancedSubjects.map((sub, idx) => (
                  <div
                    key={sub.id}
                    style={{
                      padding: '12px 14px',
                      background: '#F8FAFC',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={sub.name}
                        onChange={(e) => handleUpdateSubject(sub.id, 'name', e.target.value)}
                        style={{
                          fontSize: '13px',
                          fontWeight: 750,
                          color: '#0F172A',
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          width: '60%',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteSubject(sub.id)}
                        title="Remove subject"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                      >
                        <IconTrash2 size={14} color="#94A3B8" />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
                      <div>
                        <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>Remaining Ch:</span>
                        <input
                          type="number"
                          min="0"
                          value={sub.remainingChapters}
                          onChange={(e) => handleUpdateSubject(sub.id, 'remainingChapters', parseInt(e.target.value) || 0)}
                          style={{
                            width: '100%',
                            padding: '4px 6px',
                            fontSize: '12px',
                            fontWeight: 700,
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            background: '#FFFFFF',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>

                      <div>
                        <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>Avg Hours/Ch:</span>
                        <input
                          type="number"
                          min="0.5"
                          step="0.5"
                          value={sub.hoursPerChapter}
                          onChange={(e) => handleUpdateSubject(sub.id, 'hoursPerChapter', parseFloat(e.target.value) || 1)}
                          style={{
                            width: '100%',
                            padding: '4px 6px',
                            fontSize: '12px',
                            fontWeight: 700,
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            background: '#FFFFFF',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>

                      <div>
                        <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>Practice Hours:</span>
                        <input
                          type="number"
                          min="0"
                          value={sub.practiceHours}
                          onChange={(e) => handleUpdateSubject(sub.id, 'practiceHours', parseInt(e.target.value) || 0)}
                          style={{
                            width: '100%',
                            padding: '4px 6px',
                            fontSize: '12px',
                            fontWeight: 700,
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            background: '#FFFFFF',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>

                      <div>
                        <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>Priority:</span>
                        <select
                          value={sub.priority}
                          onChange={(e) => handleUpdateSubject(sub.id, 'priority', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '4px 6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            background: '#FFFFFF',
                            boxSizing: 'border-box',
                          }}
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddSubject}
                  style={{
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: '1px dashed #CBD5E1',
                    background: '#FFFFFF',
                    color: '#5B5CF0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <IconPlus size={14} color="#5B5CF0" />
                  <span>Add Subject</span>
                </button>
              </div>

              {/* Advanced Overall Settings */}
              <div style={{ paddingTop: '12px', borderTop: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Exam Date:
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={advancedExamDate}
                    onChange={(e) => setAdvancedExamDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      fontSize: '12px',
                      fontWeight: 650,
                      borderRadius: '7px',
                      border: '1px solid #CBD5E1',
                      background: '#FFFFFF',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Available Study Capacity:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      type="number"
                      min="1"
                      max="16"
                      step="0.5"
                      value={advancedAvailableHours}
                      onChange={(e) => setAdvancedAvailableHours(parseFloat(e.target.value) || 1)}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '7px',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                        boxSizing: 'border-box',
                      }}
                    />
                    <span style={{ fontSize: '11px', color: '#64748B' }}>h/d</span>
                  </div>
                </div>
              </div>

              {/* Advanced Mode Calculate CTA */}
              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
                <button
                  type="button"
                  onClick={handleCalculate}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    padding: '12px 18px',
                    fontSize: '13.5px',
                    fontWeight: 750,
                    borderRadius: '10px',
                    background: '#5B5CF0',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(91, 92, 240, 0.28)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#4F46E5'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#5B5CF0'; }}
                >
                  <IconSparkles size={15} color="#FFFFFF" />
                  <span>{hasCalculated ? '🔄 Recalculate Subject Workload' : '⚡ Calculate Advanced Workload & Feasibility'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ════════════ RIGHT COLUMN: LIVE WORKLOAD & FEASIBILITY DASHBOARD ════════════ */}
        <div ref={resultsRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
          {!hasCalculated ? (
            /* PLACEHOLDER EMPTY STATE CARD BEFORE USER CALCULATES */
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: 'clamp(24px, 4vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#EEF2FF',
                  border: '1px solid #E0E7FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <IconActivity size={28} color="#5B5CF0" />
              </div>

              <h2
                style={{
                  fontSize: 'clamp(18px, 2.5vw, 22px)',
                  fontWeight: 800,
                  color: '#0F172A',
                  margin: '0 0 8px',
                  letterSpacing: '-0.02em',
                }}
              >
                Calculate Your Exam Workload &amp; Daily Study Hours
              </h2>

              <p
                style={{
                  fontSize: '13.5px',
                  color: '#64748B',
                  maxWidth: '520px',
                  lineHeight: 1.6,
                  margin: '0 0 24px',
                }}
              >
                Set your target exam date, remaining chapters, revision cycles, and daily study capacity on the left, then click <strong>Calculate Required Study Hours</strong> to generate your personalized feasibility report.
              </p>

              {/* 3 Key Feature Preview Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  width: '100%',
                  maxWidth: '680px',
                  marginBottom: '26px',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    padding: '14px 16px',
                    background: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <IconClock size={16} color="#5B5CF0" />
                    <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A' }}>Exact Daily Target</div>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>
                    Computes required daily study pace using calendar countdowns, learning pace, and rest cycles.
                  </div>
                </div>

                <div
                  style={{
                    padding: '14px 16px',
                    background: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <IconRotateCcw size={16} color="#8B5CF6" />
                    <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A' }}>Forgetting Curve</div>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>
                    Calculates multi-cycle spaced repetition and PYQ practice workload so retention doesn&apos;t decay.
                  </div>
                </div>

                <div
                  style={{
                    padding: '14px 16px',
                    background: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <IconTrendingUp size={16} color="#0EA5E9" />
                    <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A' }}>Feasibility Diagnosis</div>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>
                    Identifies if your target is Comfortable, Manageable, Tight, or in Deficit before burnout happens.
                  </div>
                </div>
              </div>

              {/* Primary Trigger Button in Placeholder */}
              <button
                type="button"
                onClick={handleCalculate}
                style={{
                  minHeight: '46px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 800,
                  borderRadius: '10px',
                  background: '#5B5CF0',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px -2px rgba(91, 92, 240, 0.35)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#4F46E5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#5B5CF0'; }}
              >
                <IconSparkles size={16} color="#FFFFFF" />
                <span>⚡ Calculate Required Study Hours Now</span>
              </button>

              <div style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsSavedModalOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#5B5CF0',
                    fontSize: '12px',
                    fontWeight: 650,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                  }}
                >
                  <IconFolder size={13} color="#5B5CF0" />
                  <span>Or view previously saved scenarios</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* 1. PRIMARY RESULT HERO SCORECARD (CLEAN LINEAR / STRIPE DESIGN) */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: `1.5px solid ${calcData.feasibility.border || '#E2E8F0'}`,
                  padding: '22px 24px',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                }}
              >
            {/* Header row with OS micro-badge and feasibility pill */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#5B5CF0', textTransform: 'uppercase', letterSpacing: '0.04em', background: '#EEF2FF', padding: '2px 8px', borderRadius: '4px' }}>
                  Workload Audit
                </span>
                <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                  {examName}
                </span>
              </div>

              {/* Status Pill with dot indicator */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  background: calcData.feasibility.bg,
                  color: calcData.feasibility.color,
                  border: `1px solid ${calcData.feasibility.border}`,
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: calcData.feasibility.isSurplus ? '#10B981' : '#F43F5E',
                  }}
                />
                <span>{calcData.feasibility.label}</span>
              </div>
            </div>

            {/* Core Numeric Metric Callout */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'clamp(36px, 5.5vw, 46px)', fontWeight: 850, color: '#0F172A', fontFamily: 'var(--font-mono, monospace)', lineHeight: 1 }}>
                {calcData.requiredDailyHours}
              </span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#475569' }}>
                hrs / study day
              </span>
            </div>

            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
              Based on <strong>{calcData.timeline.availableStudyDays} effective study days</strong> before exam date ({mode === 'quick' ? quickAvailableHours : advancedAvailableHours}h/day declared capacity)
            </div>

            {/* Integrated 4-Column Tabular Metric Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
                gap: '8px',
                padding: '12px 14px',
                background: '#F8FAFC',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                marginBottom: '14px',
              }}
            >
              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block' }}>TOTAL WORKLOAD</span>
                <strong style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono, monospace)' }}>
                  {calcData.breakdown.totalWorkloadHours}h
                </strong>
                <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block' }}>Full syllabus</span>
              </div>

              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block' }}>INITIAL LEARN</span>
                <strong style={{ fontSize: '16px', fontWeight: 800, color: '#4F46E5', fontFamily: 'var(--font-mono, monospace)' }}>
                  {calcData.breakdown.learningHours}h
                </strong>
                <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block' }}>Concept mastery</span>
              </div>

              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block' }}>REVISION (35%)</span>
                <strong style={{ fontSize: '16px', fontWeight: 800, color: '#8B5CF6', fontFamily: 'var(--font-mono, monospace)' }}>
                  {calcData.breakdown.revisionHours}h
                </strong>
                <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block' }}>Forgetting curve</span>
              </div>

              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block' }}>PRACTICE &amp; MOCKS</span>
                <strong style={{ fontSize: '16px', fontWeight: 800, color: '#0EA5E9', fontFamily: 'var(--font-mono, monospace)' }}>
                  {calcData.breakdown.practiceHours + calcData.breakdown.mockHours}h
                </strong>
                <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block' }}>PYQs &amp; drills</span>
              </div>
            </div>

            {/* Feasibility Insight Callout */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '10px 14px',
                background: calcData.feasibility.bg,
                borderRadius: '8px',
                borderLeft: `3px solid ${calcData.feasibility.color}`,
                fontSize: '12px',
                color: '#334155',
                lineHeight: 1.5,
              }}
            >
              <div style={{ flexShrink: 0, marginTop: '1px' }}>
                {calcData.feasibility.isSurplus ? (
                  <IconCheckCircle2 size={16} color="#10B981" />
                ) : (
                  <IconAlertCircle size={16} color="#F43F5E" />
                )}
              </div>
              <div>
                <strong style={{ color: calcData.feasibility.color }}>{calcData.feasibility.label}:</strong>{' '}
                <span>{calcData.feasibility.text}</span>
              </div>
            </div>
          </div>

          {/* 2. ACTIONS TOOLBAR (SINGLE REFINED ROW) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '10px 14px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleSaveScenario}
                style={{
                  padding: '7px 13px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '7px',
                  border: 'none',
                  background: '#5B5CF0',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 1px 3px rgba(91, 92, 240, 0.25)',
                }}
              >
                <IconBookmark size={13} color="#FFFFFF" />
                <span>Save Scenario</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                style={{
                  padding: '7px 11px',
                  fontSize: '12px',
                  fontWeight: 650,
                  borderRadius: '7px',
                  border: '1px solid #CBD5E1',
                  background: isExportingPdf ? '#F1F5F9' : '#FFFFFF',
                  color: '#334155',
                  cursor: isExportingPdf ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <IconDownload size={13} color="#64748B" />
                <span>{isExportingPdf ? 'Exporting...' : 'PDF Report'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintReport}
                style={{
                  padding: '7px 11px',
                  fontSize: '12px',
                  fontWeight: 650,
                  borderRadius: '7px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#334155',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <IconPrinter size={13} color="#64748B" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={handleCopyOutline}
                style={{
                  padding: '7px 11px',
                  fontSize: '12px',
                  fontWeight: 650,
                  borderRadius: '7px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#334155',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {copied ? <IconCheck size={13} color="#10B981" /> : <IconCopy size={13} color="#64748B" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSavedModalOpen(true)}
                style={{
                  padding: '7px 11px',
                  fontSize: '12px',
                  fontWeight: 650,
                  borderRadius: '7px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#334155',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <IconFolder size={13} color="#64748B" />
                <span>Saved</span>
              </button>
            </div>

            {/* Subtle Reset Button */}
            <button
              type="button"
              onClick={handleResetInputs}
              title="Reset inputs to defaults"
              style={{
                padding: '6px 10px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#64748B',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <IconRotateCcw size={12} color="#64748B" />
              <span>Reset</span>
            </button>
          </div>

          {/* Sibling Link Pill */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/tools/study-timetable-generator"
              style={{
                fontSize: '12px',
                fontWeight: 650,
                color: '#5B5CF0',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span>Map these workload hours into date-by-date Study Timetable</span>
              <IconArrowRight size={13} color="#5B5CF0" />
            </Link>
          </div>

          {/* 3. MOBILE COMPANION PRODUCT CARD */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              background: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '7px', background: '#5B5CF0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '13px' }}>
                Li
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                  Execute these study hours on LifeTrack Pro mobile
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  Log focus blocks, habit streaks &amp; Pomodoro timers on Android (4.9 ★)
                </div>
              </div>
            </div>

            <a
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                background: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#1E293B',
                textDecoration: 'none',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
              }}
            >
              <PlayStoreIcon size={13} />
              <span>Explore App ↗</span>
            </a>
          </div>

          {/* 4. VISUAL BREAKDOWN & CAPACITY BALANCE */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconActivity size={14} color="#5B5CF0" />
              <span>Workload Allocation &amp; Capacity Balance</span>
            </div>

            <WorkloadBreakdownChart breakdown={calcData.breakdown} />

            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
              <CapacityComparisonBar
                requiredTotalHours={calcData.breakdown.totalWorkloadHours}
                availableTotalHours={calcData.totalAvailableCapacityHours}
                feasibility={calcData.feasibility}
                requiredDaily={calcData.requiredDailyHours}
                availableDaily={mode === 'quick' ? quickAvailableHours : advancedAvailableHours}
              />
            </div>
          </div>

          {/* 5. SUBJECT-WISE DISTRIBUTION (ADVANCED MODE) */}
          {mode === 'advanced' && calcData.subjects && calcData.subjects.length > 0 && (
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '18px 20px',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IconBookOpen size={14} color="#5B5CF0" />
                <span>Subject Workload Ranking</span>
              </div>
              <SubjectDistributionBars subjects={calcData.subjects} />
            </div>
          )}

          {/* 6. WHAT-IF STUDY PACE SIMULATION MATRIX */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IconTrendingUp size={14} color="#5B5CF0" />
                  <span>What-If Study Pace Simulation</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  Projected syllabus completion dates at different daily commitments
                </div>
              </div>

              {/* Custom Pace Control */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Custom:</span>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={customPaceHours}
                  onChange={(e) => setCustomPaceHours(Number(e.target.value))}
                  style={{
                    width: '42px',
                    padding: '2px 4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textAlign: 'center',
                    borderRadius: '5px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                  }}
                />
                <span style={{ fontSize: '11px', color: '#64748B' }}>h/d</span>
              </div>
            </div>

            <WhatIfScenarioTimeline
              scenarios={scenarios}
              activePace={mode === 'quick' ? quickAvailableHours : advancedAvailableHours}
            />
          </div>
          </>
        )}
        </div>
      </div>

      {/* ── MODALS & PRINT COMPONENT ── */}
      <SavedCalculationsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        onLoadScenario={handleLoadScenarioData}
        currentCalcData={calcData}
      />

      {/* ── DEDICATED A4 PRINT & PDF EXPORT DOCUMENT (NO DISPLAY:NONE WRAPPER) ── */}
      <StudyHoursPrintDocument
        calcData={calcData}
        studentName={studentName}
        examName={examName}
        isExportingPdf={isExportingPdf}
      />
    </div>
  );
}
