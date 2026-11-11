'use client';
import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  calculateQuickRoi,
  calculateAdvancedRoi,
  calculateWhatIfScenarios,
  generateRecommendations,
  generateRoiTextExport,
  DEFAULT_DISTRACTION_CATEGORIES,
} from '@/lib/focusRoiEngine';
import {
  FocusTimeAllocationChart,
  DistractionCategoryBars,
  WhatIfScenarioGrid,
} from './focus-roi/FocusRoiCharts';
import FocusRoiSavedModal from './focus-roi/FocusRoiSavedModal';
import FocusRoiPrintDocument from './focus-roi/FocusRoiPrintDocument';
import PlayStoreIcon from '@/components/PlayStoreIcon';

export default function FocusRoiCalculator() {
  const [mode, setMode] = useState('quick'); // 'quick' | 'advanced'
  const [studentName, setStudentName] = useState('');
  const [examName, setExamName] = useState('Target Competitive Exam');
  const [toastMessage, setToastMessage] = useState(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [copied, setCopied] = useState(false);

  // ── QUICK MODE STATE ──
  const [quickDailyHours, setQuickDailyHours] = useState(6);
  const [quickDaysPerWeek, setQuickDaysPerWeek] = useState(6);
  const [quickInterruptions, setQuickInterruptions] = useState(14);
  const [quickDistractionMins, setQuickDistractionMins] = useState(4);
  const [quickRefocusMins, setQuickRefocusMins] = useState(5);
  const [quickAvoidablePercent, setQuickAvoidablePercent] = useState(75);

  // ── ADVANCED MODE STATE ──
  const [advSessionDuration, setAdvSessionDuration] = useState(50);
  const [advSessionsPerDay, setAdvSessionsPerDay] = useState(6);
  const [advDaysPerWeek, setAdvDaysPerWeek] = useState(6);
  const [advRefocusMins, setAdvRefocusMins] = useState(5);
  const [advAvoidablePercent, setAdvAvoidablePercent] = useState(75);
  const [advCategories, setAdvCategories] = useState(() => JSON.parse(JSON.stringify(DEFAULT_DISTRACTION_CATEGORIES)));
  const [customCategoryName, setCustomCategoryName] = useState('');

  // ── WHAT-IF CUSTOM PACE ──
  const [customReduction, setCustomReduction] = useState(40);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ── RESET INPUTS ──
  const handleResetInputs = () => {
    if (mode === 'quick') {
      setQuickDailyHours(6);
      setQuickDaysPerWeek(6);
      setQuickInterruptions(14);
      setQuickDistractionMins(4);
      setQuickRefocusMins(5);
      setQuickAvoidablePercent(75);
    } else {
      setAdvSessionDuration(50);
      setAdvSessionsPerDay(6);
      setAdvDaysPerWeek(6);
      setAdvRefocusMins(5);
      setAdvAvoidablePercent(75);
      setAdvCategories(JSON.parse(JSON.stringify(DEFAULT_DISTRACTION_CATEGORIES)));
    }
    showToast('🔄 Inputs reset to default study parameters');
  };

  // ── ADVANCED CATEGORY HANDLERS ──
  const handleToggleCategory = (id) => {
    setAdvCategories(
      advCategories.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const handleUpdateCategoryFreq = (id, freq) => {
    setAdvCategories(
      advCategories.map((c) => (c.id === id ? { ...c, frequency: Number(freq) } : c))
    );
  };

  const handleUpdateCategoryDur = (id, dur) => {
    setAdvCategories(
      advCategories.map((c) => (c.id === id ? { ...c, durationMins: Number(dur) } : c))
    );
  };

  const handleAddCustomCategory = () => {
    if (!customCategoryName.trim()) return;
    const newCat = {
      id: `custom_${Date.now()}`,
      name: customCategoryName.trim(),
      icon: '⚡',
      description: 'Custom user-defined distraction',
      frequency: 4,
      durationMins: 4,
      enabled: true,
    };
    setAdvCategories([...advCategories, newCat]);
    setCustomCategoryName('');
    showToast(`Added "${newCat.name}" category!`);
  };

  const handleRemoveCategory = (id) => {
    setAdvCategories(advCategories.filter((c) => c.id !== id));
    showToast('Category removed');
  };

  // ── CORE REACTIVE CALCULATION ──
  const calcData = useMemo(() => {
    if (mode === 'quick') {
      return calculateQuickRoi({
        dailyStudyHours: quickDailyHours,
        studyDaysPerWeek: quickDaysPerWeek,
        interruptionsPerDay: quickInterruptions,
        avgDistractionMins: quickDistractionMins,
        avgRefocusMins: quickRefocusMins,
        avoidablePercent: quickAvoidablePercent,
      });
    }

    return calculateAdvancedRoi({
      sessionDurationMins: advSessionDuration,
      sessionsPerDay: advSessionsPerDay,
      studyDaysPerWeek: advDaysPerWeek,
      avgRefocusMins: advRefocusMins,
      avoidablePercent: advAvoidablePercent,
      categories: advCategories,
    });
  }, [
    mode,
    quickDailyHours,
    quickDaysPerWeek,
    quickInterruptions,
    quickDistractionMins,
    quickRefocusMins,
    quickAvoidablePercent,
    advSessionDuration,
    advSessionsPerDay,
    advDaysPerWeek,
    advRefocusMins,
    advAvoidablePercent,
    advCategories,
  ]);

  // ── SCENARIOS & RECOMMENDATIONS ──
  const scenarios = useMemo(() => {
    return calculateWhatIfScenarios(calcData, customReduction);
  }, [calcData, customReduction]);

  const recommendations = useMemo(() => {
    return generateRecommendations(calcData);
  }, [calcData]);

  // ── ACTIONS: SAVE SCENARIO ──
  const handleSaveScenario = () => {
    try {
      const STORAGE_KEY = 'lifetrack_saved_focus_roi_scenarios';
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];

      const namePrompt = window.prompt('Enter a name for this Focus ROI calculation:', `${examName} Focus Plan`);
      if (!namePrompt || !namePrompt.trim()) return;

      const newScenario = {
        id: `roi_${Date.now()}`,
        name: namePrompt.trim(),
        savedAt: new Date().toISOString(),
        mode,
        examName,
        studentName,
        data: calcData,
      };

      const updated = [newScenario, ...list.slice(0, 19)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      showToast(`💾 Scenario "${namePrompt.trim()}" saved!`);
    } catch (e) {
      console.warn('Error saving scenario to localStorage', e);
      showToast('Error saving scenario');
    }
  };

  // ── ACTIONS: LOAD SCENARIO ──
  const handleLoadScenarioData = (loadedScenario) => {
    if (!loadedScenario || !loadedScenario.data) return;
    const { data } = loadedScenario;

    if (data.mode === 'quick' && data.inputs) {
      setMode('quick');
      setQuickDailyHours(data.inputs.dailyStudyHours || 6);
      setQuickDaysPerWeek(data.inputs.studyDaysPerWeek || 6);
      setQuickInterruptions(data.inputs.interruptionsPerDay || 14);
      setQuickDistractionMins(data.inputs.avgDistractionMins || 4);
      setQuickRefocusMins(data.inputs.avgRefocusMins || 5);
      setQuickAvoidablePercent(data.inputs.avoidablePercent || 75);
    } else if (data.mode === 'advanced' && data.inputs) {
      setMode('advanced');
      setAdvSessionDuration(data.inputs.sessionDurationMins || 50);
      setAdvSessionsPerDay(data.inputs.sessionsPerDay || 6);
      setAdvDaysPerWeek(data.inputs.studyDaysPerWeek || 6);
      setAdvRefocusMins(data.inputs.avgRefocusMins || 5);
      setAdvAvoidablePercent(data.inputs.avoidablePercent || 75);
      if (Array.isArray(data.inputs.categories)) {
        setAdvCategories(data.inputs.categories);
      }
    }

    if (loadedScenario.examName) setExamName(loadedScenario.examName);
    if (loadedScenario.studentName) setStudentName(loadedScenario.studentName);
    showToast('⚡ Focus calculation scenario loaded!');
  };

  // ── ACTIONS: COPY REPORT ──
  const handleCopyReport = () => {
    const text = generateRoiTextExport(calcData, studentName, examName);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showToast('📋 Focus ROI Report copied to clipboard!');
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
    showToast('📄 Generating A4 Study Efficiency PDF Report...');

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

      element = document.getElementById('focus-roi-print-document');
      if (!element) {
        window.print();
        setIsExportingPdf(false);
        return;
      }

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

      await new Promise((r) => setTimeout(r, 150));

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
        windowWidth: 794,
      });

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
      const printWidth = pdfWidth - margin * 2;
      const printHeight = pdfHeight - margin * 2;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const pageCanvasHeight = Math.floor(canvasWidth * (printHeight / printWidth));

      let renderedHeight = 0;
      let pageIndex = 0;

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
          0,
          renderedHeight,
          canvasWidth,
          sliceHeight,
          0,
          0,
          canvasWidth,
          sliceHeight
        );

        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
        const slicePrintHeight = (sliceHeight / canvasWidth) * printWidth;

        doc.addImage(imgData, 'JPEG', margin, margin, printWidth, slicePrintHeight);

        renderedHeight += sliceHeight;
        pageIndex++;
      }

      const safeExam = (examName || 'Focus-ROI').replace(/[^a-zA-Z0-9]/g, '-').slice(0, 25);
      doc.save(`${safeExam}-Focus-Efficiency-Report.pdf`);
      showToast('✅ Focus Efficiency PDF downloaded!');
    } catch (err) {
      console.error('PDF export failed:', err);
      if (element) {
        element.style.display = originalDisplay || '';
        element.style.position = originalPosition || '';
      }
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="focus-roi-calculator-root" style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* ── TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 700,
            zIndex: 99999,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #334155',
          }}
        >
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── TOP CONTROLS & MODE SWITCHER ROW ── */}
      <div className="focus-roi-top-bar">
        {/* Mode Tabs */}
        <div className="focus-roi-mode-toggle">
          <button
            type="button"
            onClick={() => setMode('quick')}
            className="focus-roi-mode-btn"
            style={{
              background: mode === 'quick' ? '#5B5CF0' : 'transparent',
              color: mode === 'quick' ? '#FFFFFF' : '#475569',
              boxShadow: mode === 'quick' ? '0 1px 4px rgba(91, 92, 240, 0.3)' : 'none',
            }}
          >
            <span>⚡</span>
            <span>Quick Calculation</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('advanced')}
            className="focus-roi-mode-btn"
            style={{
              background: mode === 'advanced' ? '#5B5CF0' : 'transparent',
              color: mode === 'advanced' ? '#FFFFFF' : '#475569',
              boxShadow: mode === 'advanced' ? '0 1px 4px rgba(91, 92, 240, 0.3)' : 'none',
            }}
          >
            <span>🔬</span>
            <span>Advanced Distraction Audit</span>
          </button>
        </div>

        {/* Quick Personalization Inputs */}
        <div className="focus-roi-personalization-wrap">
          <input
            type="text"
            placeholder="Target Exam / Goal (e.g. JEE, NEET, UPSC)"
            aria-label="Target Exam or Goal"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="focus-roi-personalization-input exam-input"
          />
          <input
            type="text"
            placeholder="Your Name (Optional)"
            aria-label="Your Name (Optional)"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="focus-roi-personalization-input name-input"
          />
        </div>
      </div>

      {/* ── MAIN WORKSPACE GRID: INPUTS (LEFT) vs LIVE RESULTS (RIGHT) ── */}
      <div className="focus-roi-workspace-grid">
        {/* ════════════ LEFT COLUMN: INPUTS & DISTRACTION MODEL ════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', boxSizing: 'border-box' }}>
          {/* Quick Mode Form */}
          {mode === 'quick' ? (
            <div className="focus-roi-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '18px' }}>⚡</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    Study Cadence &amp; Interruption Estimates
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#64748B' }}>
                    Assumptions are fully editable to reflect your real study environment
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* 1. Daily Study Hours */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Planned Daily Study Hours:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="16"
                      step="0.5"
                      aria-label="Planned Daily Study Hours (Numeric Input)"
                      value={quickDailyHours}
                      onChange={(e) => setQuickDailyHours(Number(e.target.value))}
                      style={{
                        width: '72px',
                        minHeight: '38px',
                        padding: '4px 8px',
                        fontSize: '14px',
                        fontWeight: 800,
                        color: '#5B5CF0',
                        borderRadius: '7px',
                        border: '1.5px solid #CBD5E1',
                        textAlign: 'center',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    step="0.5"
                    value={quickDailyHours}
                    onChange={(e) => setQuickDailyHours(Number(e.target.value))}
                    className="focus-roi-range-slider"
                    aria-label="Planned Daily Study Hours"
                  />
                  <div className="focus-roi-preset-row">
                    {[
                      { value: 2, label: '2 hrs' },
                      { value: 6, label: '6 hrs (Typical)' },
                      { value: 10, label: '10 hrs (Aspirant)' },
                      { value: 16, label: '16 hrs' },
                    ].map((preset) => {
                      const isActive = quickDailyHours === preset.value;
                      return (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickDailyHours(preset.value);
                          }}
                          className={`focus-roi-preset-btn ${isActive ? 'is-active' : ''}`}
                          aria-label={`Set daily study hours to ${preset.value}`}
                          aria-pressed={isActive}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Study Days Per Week */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Study Days Per Week:
                    </label>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#5B5CF0' }}>
                      {quickDaysPerWeek} days / wk
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value={quickDaysPerWeek}
                    onChange={(e) => setQuickDaysPerWeek(Number(e.target.value))}
                    className="focus-roi-range-slider"
                    aria-label="Study Days Per Week"
                  />
                  <div className="focus-roi-preset-row">
                    {[
                      { value: 1, label: '1 day' },
                      { value: 5, label: '5 days' },
                      { value: 6, label: '6 days (Recommended)' },
                      { value: 7, label: '7 days' },
                    ].map((preset) => {
                      const isActive = quickDaysPerWeek === preset.value;
                      return (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickDaysPerWeek(preset.value);
                          }}
                          className={`focus-roi-preset-btn ${isActive ? 'is-active' : ''}`}
                          aria-label={`Set study days to ${preset.value}`}
                          aria-pressed={isActive}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Average Interruptions Per Study Day */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Daily Interruptions &amp; Off-Task Checks:
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      aria-label="Daily Interruptions (Numeric Input)"
                      value={quickInterruptions}
                      onChange={(e) => setQuickInterruptions(Number(e.target.value))}
                      style={{
                        width: '72px',
                        minHeight: '38px',
                        padding: '4px 8px',
                        fontSize: '14px',
                        fontWeight: 800,
                        color: '#EF4444',
                        borderRadius: '7px',
                        border: '1.5px solid #CBD5E1',
                        textAlign: 'center',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={quickInterruptions}
                    onChange={(e) => setQuickInterruptions(Number(e.target.value))}
                    className="focus-roi-range-slider"
                    aria-label="Daily Interruptions"
                  />
                  <div className="focus-roi-preset-row">
                    {[
                      { value: 0, label: '0 (Monk)' },
                      { value: 8, label: '8 (Guarded)' },
                      { value: 15, label: '15 (Average)' },
                      { value: 40, label: '40+ (Fractured)' },
                    ].map((preset) => {
                      const isActive = quickInterruptions === preset.value;
                      return (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickInterruptions(preset.value);
                          }}
                          className={`focus-roi-preset-btn ${isActive ? 'is-active' : ''}`}
                          aria-label={`Set daily interruptions to ${preset.value}`}
                          aria-pressed={isActive}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Direct Distraction & Focus Recovery in 2 Columns */}
                <div className="focus-roi-form-2col">
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Avg Distraction Duration:
                    </label>
                    <select
                      aria-label="Average Distraction Duration"
                      value={quickDistractionMins}
                      onChange={(e) => setQuickDistractionMins(Number(e.target.value))}
                      style={{
                        width: '100%',
                        minHeight: '44px',
                        padding: '8px 10px',
                        fontSize: '12.5px',
                        fontWeight: 650,
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        background: '#FFFFFF',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="2">~2 mins (Quick reply)</option>
                      <option value="4">~4 mins (Standard check)</option>
                      <option value="8">~8 mins (Short reel feed)</option>
                      <option value="15">~15 mins (Deep rabbit hole)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Focus Recovery Lag:
                    </label>
                    <select
                      aria-label="Focus Recovery Lag"
                      value={quickRefocusMins}
                      onChange={(e) => setQuickRefocusMins(Number(e.target.value))}
                      style={{
                        width: '100%',
                        minHeight: '44px',
                        padding: '8px 10px',
                        fontSize: '12.5px',
                        fontWeight: 650,
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        background: '#FFFFFF',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="3">~3 mins (Fast mental re-entry)</option>
                      <option value="5">~5 mins (Standard attention residue)</option>
                      <option value="10">~10 mins (Complex problem solving)</option>
                      <option value="15">~15 mins (High cognitive fatigue)</option>
                    </select>
                  </div>
                </div>

                {/* 5. Avoidable Interruption Percentage */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Estimated Avoidable Interruption Rate:
                    </label>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#10B981' }}>
                      {quickAvoidablePercent}% Avoidable
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={quickAvoidablePercent}
                    onChange={(e) => setQuickAvoidablePercent(Number(e.target.value))}
                    className="focus-roi-range-slider"
                    aria-label="Avoidable Interruption Percentage"
                  />
                  <div className="focus-roi-preset-row">
                    {[
                      { value: 20, label: '20% (Strict)' },
                      { value: 50, label: '50%' },
                      { value: 75, label: '75% (Standard)' },
                      { value: 100, label: '100%' },
                    ].map((preset) => {
                      const isActive = quickAvoidablePercent === preset.value;
                      return (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickAvoidablePercent(preset.value);
                          }}
                          className={`focus-roi-preset-btn ${isActive ? 'is-active' : ''}`}
                          aria-label={`Set avoidable rate to ${preset.value}%`}
                          aria-pressed={isActive}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Advanced Mode Form */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
              {/* Cadence Setup */}
              <div className="focus-roi-card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                  ⚙️ Daily Session Structure
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      Block Duration:
                    </label>
                    <select
                      aria-label="Session Block Duration"
                      value={advSessionDuration}
                      onChange={(e) => setAdvSessionDuration(Number(e.target.value))}
                      style={{ width: '100%', minHeight: '40px', padding: '6px 8px', fontSize: '12.5px', borderRadius: '7px', border: '1.5px solid #CBD5E1', boxSizing: 'border-box' }}
                    >
                      <option value="25">25 min (Pomodoro)</option>
                      <option value="50">50 min (Standard Deep)</option>
                      <option value="90">90 min (Ultradian Cycle)</option>
                      <option value="120">120 min (Mock Block)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      Sessions / Day:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="16"
                      aria-label="Sessions Per Day"
                      value={advSessionsPerDay}
                      onChange={(e) => setAdvSessionsPerDay(Number(e.target.value))}
                      style={{ width: '100%', minHeight: '40px', padding: '6px 8px', fontSize: '13px', fontWeight: 700, borderRadius: '7px', border: '1.5px solid #CBD5E1', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      Days / Week:
                    </label>
                    <select
                      aria-label="Study Days Per Week"
                      value={advDaysPerWeek}
                      onChange={(e) => setAdvDaysPerWeek(Number(e.target.value))}
                      style={{ width: '100%', minHeight: '40px', padding: '6px 8px', fontSize: '12.5px', borderRadius: '7px', border: '1.5px solid #CBD5E1', boxSizing: 'border-box' }}
                    >
                      <option value="5">5 days / wk</option>
                      <option value="6">6 days / wk</option>
                      <option value="7">7 days / wk</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      Refocus Lag:
                    </label>
                    <select
                      aria-label="Refocus Lag Duration"
                      value={advRefocusMins}
                      onChange={(e) => setAdvRefocusMins(Number(e.target.value))}
                      style={{ width: '100%', minHeight: '40px', padding: '6px 8px', fontSize: '12.5px', borderRadius: '7px', border: '1.5px solid #CBD5E1', boxSizing: 'border-box' }}
                    >
                      <option value="3">3 mins</option>
                      <option value="5">5 mins (Average)</option>
                      <option value="8">8 mins (High)</option>
                      <option value="12">12 mins (Fatigue)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Distraction Categories List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>
                    Distraction Sources ({advCategories.filter((c) => c.enabled).length} Enabled)
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                    Enable / disable specific distractions
                  </div>
                </div>

                {advCategories.map((cat) => (
                  <div
                    key={cat.id}
                    style={{
                      background: cat.enabled ? '#FFFFFF' : '#F8FAFC',
                      borderRadius: '12px',
                      border: cat.enabled ? '1.5px solid #CBD5E1' : '1px dashed #CBD5E1',
                      padding: '12px 14px',
                      boxSizing: 'border-box',
                      opacity: cat.enabled ? 1 : 0.65,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                        <span style={{ fontSize: '16px' }}>{cat.icon}</span>
                        <div>
                          <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block' }}>
                            {cat.name}
                          </strong>
                          <span style={{ fontSize: '11px', color: '#64748B' }}>
                            {cat.description}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleCategory(cat.id)}
                          style={{
                            padding: '4px 10px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            borderRadius: '6px',
                            border: cat.enabled ? '1px solid #10B981' : '1px solid #CBD5E1',
                            background: cat.enabled ? '#ECFDF5' : '#FFFFFF',
                            color: cat.enabled ? '#059669' : '#64748B',
                            cursor: 'pointer',
                            minHeight: '32px',
                          }}
                        >
                          {cat.enabled ? '✓ Enabled' : '○ Off'}
                        </button>

                        {cat.id.startsWith('custom_') && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(cat.id)}
                            style={{
                              background: '#FEF2F2',
                              border: '1px solid #FECACA',
                              borderRadius: '6px',
                              color: '#DC2626',
                              padding: '4px 8px',
                              fontSize: '11px',
                              cursor: 'pointer',
                              minHeight: '32px',
                            }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

                    {cat.enabled && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '2px', fontWeight: 650 }}>
                            Frequency / Day:
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="60"
                            aria-label={`${cat.name} daily frequency`}
                            value={cat.frequency ?? cat.defaultFrequency}
                            onChange={(e) => handleUpdateCategoryFreq(cat.id, e.target.value)}
                            style={{ width: '100%', minHeight: '38px', padding: '6px 8px', fontSize: '12.5px', fontWeight: 700, borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                          />
                        </div>

                        <div>
                          <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '2px', fontWeight: 650 }}>
                            Duration / Instance:
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input
                              type="number"
                              min="0.5"
                              max="60"
                              step="0.5"
                              aria-label={`${cat.name} duration in minutes`}
                              value={cat.durationMins ?? cat.defaultDurationMins}
                              onChange={(e) => handleUpdateCategoryDur(cat.id, e.target.value)}
                              style={{ width: '100%', minHeight: '38px', padding: '6px 8px', fontSize: '12.5px', fontWeight: 700, borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                            />
                            <span style={{ fontSize: '11px', color: '#64748B' }}>min</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Custom Category Row */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="text"
                    placeholder="Add custom distraction (e.g. Gaming, Phone Calls)"
                    aria-label="Add custom distraction name"
                    value={customCategoryName}
                    onChange={(e) => setCustomCategoryName(e.target.value)}
                    style={{
                      flex: 1,
                      minHeight: '42px',
                      padding: '8px 12px',
                      fontSize: '12.5px',
                      borderRadius: '8px',
                      border: '1.5px solid #CBD5E1',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomCategory}
                    style={{
                      padding: '0 16px',
                      minHeight: '42px',
                      fontSize: '12px',
                      fontWeight: 750,
                      background: '#5B5CF0',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ════════════ RIGHT COLUMN: LIVE RESULTS DASHBOARD ════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%', boxSizing: 'border-box' }}>
          {/* 1. PRIMARY RESULT HERO CARD */}
          <div
            className="focus-roi-card"
            style={{
              border: `1.5px solid ${calcData.efficiency.border}`,
              background: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  POTENTIAL MONTHLY FOCUS TIME RECOVERED
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '6px 0 4px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 'clamp(34px, 5vw, 44px)', fontWeight: 850, color: '#10B981', fontFamily: 'Consolas, Menlo, monospace', lineHeight: 1 }}>
                    +{calcData.recoverable.monthlyHours}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#475569' }}>
                    hours / month
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  Equivalent to <strong>~{calcData.recoverable.dailyHours} hours/day</strong> (~{calcData.recoverable.dailyMinutes} mins) of productive study capacity unlocked.
                </div>
              </div>

              {/* Status Badge */}
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 750,
                    background: calcData.efficiency.bg,
                    color: calcData.efficiency.color,
                    border: `1px solid ${calcData.efficiency.border}`,
                  }}
                >
                  <span>{calcData.efficiency.percent >= 75 ? '🎯' : '⚠️'}</span>
                  <span>{calcData.efficiency.percent}% Efficiency</span>
                </span>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '5px' }}>
                  {calcData.efficiency.label}
                </div>
              </div>
            </div>
          </div>

          {/* 2. DEDICATED EFFICIENCY & NET BALANCE CARD (FULL-WIDTH) */}
          <div
            className="focus-roi-card"
            style={{
              border: `1.5px solid ${calcData.efficiency.border}`,
              background: calcData.efficiency.bg,
              padding: '16px 18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px' }}>⚖️</span>
              <strong style={{ fontSize: '13.5px', color: calcData.efficiency.color }}>
                Study Efficiency &amp; Cognitive Time Balance
              </strong>
            </div>

            {/* Quick 3-Metric Comparison Pill */}
            <div className="focus-roi-balance-pill">
              <div>
                <span style={{ fontSize: '10px', color: '#64748B', display: 'block', fontWeight: 700 }}>PLANNED</span>
                <strong style={{ fontSize: '15px', color: '#0F172A', fontFamily: 'monospace' }}>
                  {calcData.planned.monthlyHours}h/mo
                </strong>
              </div>
              <div style={{ borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '10px', color: '#EF4444', display: 'block', fontWeight: 700 }}>LOST TO DISTRACTION</span>
                <strong style={{ fontSize: '15px', color: '#EF4444', fontFamily: 'monospace' }}>
                  -{calcData.loss.monthlyHours}h/mo
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: '#10B981', display: 'block', fontWeight: 700 }}>RECOVERABLE (ROI)</span>
                <strong style={{ fontSize: '15px', color: '#10B981', fontFamily: 'monospace' }}>
                  +{calcData.recoverable.monthlyHours}h/mo
                </strong>
              </div>
            </div>

            {/* Plain-English Explanation */}
            <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: calcData.efficiency.color, lineHeight: 1.5 }}>
              <strong>Diagnosis:</strong> You are currently losing approximately <strong>{calcData.loss.dailyMinutes} minutes every study day</strong> (split between {calcData.loss.directMinutes}m direct distraction and {calcData.loss.refocusMinutes}m cognitive resumption lag).
            </p>

            {/* Suggested Action */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.75)',
                borderRadius: '8px',
                fontSize: '11.5px',
                color: '#334155',
                lineHeight: 1.45,
              }}
            >
              <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
              <div>
                <strong>Suggested Action:</strong>{' '}
                {calcData.efficiency.percent >= 80
                  ? 'Your study discipline is high. Protect your morning peak focus windows and keep phone alerts silenced during problem sets.'
                  : `By eliminating ~${calcData.inputs.avoidablePercent}% of avoidable interruptions, you can recover +${calcData.recoverable.extraPomodoroSessions} deep 50-minute Pomodoro sessions every month.`}
              </div>
            </div>
          </div>

          {/* 3. SECONDARY METRICS (6 BALANCED CARDS FOR MOBILE & DESKTOP) */}
          <div className="focus-roi-metrics-grid">
            {/* 1. Daily Time Lost */}
            <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase' }}>
                <span>⏳</span>
                <span>Daily Lost</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 850, color: '#EF4444', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                {calcData.loss.dailyMinutes}m
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>~{calcData.loss.dailyHours} hrs per study day</div>
            </div>

            {/* 2. Weekly Time Lost */}
            <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase' }}>
                <span>📅</span>
                <span>Weekly Lost</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 850, color: '#EF4444', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                {calcData.loss.weeklyHours}h
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Across {calcData.inputs.studyDaysPerWeek} study days</div>
            </div>

            {/* 3. Monthly Time Lost */}
            <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase' }}>
                <span>🗓️</span>
                <span>Monthly Lost</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 850, color: '#DC2626', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                {calcData.loss.monthlyHours}h
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Gross distraction overhead</div>
            </div>

            {/* 4. Direct Distraction */}
            <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase' }}>
                <span>📱</span>
                <span>Direct Distraction</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 850, color: '#D97706', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                {calcData.loss.directMinutes}m
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>{calcData.loss.directPercentOfLoss}% of total daily loss</div>
            </div>

            {/* 5. Refocus Recovery Lag */}
            <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#9333EA', textTransform: 'uppercase' }}>
                <span>🧠</span>
                <span>Refocus Lag</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 850, color: '#9333EA', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                {calcData.loss.refocusMinutes}m
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Attention residue delay</div>
            </div>

            {/* 6. Potential Weekly Recovered */}
            <div style={{ padding: '12px 14px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>
                <span>✨</span>
                <span>Weekly Recovered</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 850, color: '#10B981', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                +{calcData.recoverable.weeklyHours}h
              </div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>+{calcData.recoverable.dailyHours}h each study day</div>
            </div>
          </div>

          {/* 4. ACTIONS TOOLBAR (MOBILE 2-COL / DESKTOP FLEX) */}
          <div className="focus-roi-card" style={{ padding: '12px 14px' }}>
            <div className="focus-roi-actions-grid">
              <button
                type="button"
                onClick={handleSaveScenario}
                className="focus-roi-action-btn-primary"
                style={{
                  minHeight: '44px',
                  padding: '8px 16px',
                  fontSize: '12.5px',
                  fontWeight: 750,
                  borderRadius: '9px',
                  border: 'none',
                  background: '#5B5CF0',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(91, 92, 240, 0.25)',
                }}
              >
                <span>💾</span>
                <span>Save Scenario</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                style={{
                  minHeight: '44px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '9px',
                  border: '1.5px solid #C7D2FE',
                  background: isExportingPdf ? '#F1F5F9' : '#EEF2FF',
                  color: '#4F46E5',
                  cursor: isExportingPdf ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <span>{isExportingPdf ? '⏳' : '📄'}</span>
                <span>{isExportingPdf ? 'Exporting...' : 'Download PDF'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintReport}
                style={{
                  minHeight: '44px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: 650,
                  borderRadius: '9px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#172033',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <span>🖨️</span>
                <span>Print Report</span>
              </button>

              <button
                type="button"
                onClick={handleCopyReport}
                style={{
                  minHeight: '44px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: 650,
                  borderRadius: '9px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#172033',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <span>📋</span>
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSavedModalOpen(true)}
                style={{
                  minHeight: '44px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: 650,
                  borderRadius: '9px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#172033',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <span>📁</span>
                <span>Saved</span>
              </button>

              <button
                type="button"
                onClick={handleResetInputs}
                className="focus-roi-action-btn-reset"
                style={{
                  minHeight: '44px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: 650,
                  borderRadius: '9px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#475569',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <span>🔄</span>
                <span>Reset</span>
              </button>
            </div>

            {/* Quick Sibling Tool Links */}
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
              <Link
                href="/tools/study-hours-calculator"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#5B5CF0',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span>📊</span>
                <span>Calculate Total Syllabus Completion Hours Instead →</span>
              </Link>
            </div>
          </div>

          {/* 5. VISUAL ALLOCATION & DISTRACTION CATEGORIES */}
          <div className="focus-roi-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#172033', marginBottom: '14px' }}>
              📊 Daily Study Time Allocation &amp; Distraction Breakdown
            </div>

            <FocusTimeAllocationChart
              plannedMins={calcData.planned.dailyMinutes}
              loss={calcData.loss}
              efficiency={calcData.efficiency}
            />

            {mode === 'advanced' && calcData.loss.categories && (
              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '12px', fontWeight: 750, color: '#334155', marginBottom: '10px' }}>
                  Distraction Source Ranking
                </div>
                <DistractionCategoryBars categories={calcData.loss.categories} />
              </div>
            )}
          </div>

          {/* 6. WHAT-IF SCENARIOS SIMULATOR */}
          <div className="focus-roi-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#172033' }}>
                  ⚡ What-If Interruption Reduction Milestones
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  Simulate potential hours gained by reducing avoidable distractions
                </div>
              </div>

              {/* Custom Reduction Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 650 }}>Custom:</span>
                <input
                  type="number"
                  min="5"
                  max="95"
                  aria-label="Custom percentage reduction"
                  value={customReduction}
                  onChange={(e) => setCustomReduction(Number(e.target.value))}
                  style={{
                    width: '48px',
                    minHeight: '32px',
                    padding: '2px 4px',
                    fontSize: '12px',
                    fontWeight: 750,
                    textAlign: 'center',
                    borderRadius: '6px',
                    border: '1.5px solid #CBD5E1',
                    boxSizing: 'border-box',
                  }}
                />
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 650 }}>% cut</span>
              </div>
            </div>

            <WhatIfScenarioGrid
              scenarios={scenarios}
              activeCustom={customReduction}
            />
          </div>

          {/* 7. PERSONALIZED ACTIONABLE RECOMMENDATIONS */}
          <div className="focus-roi-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#172033', marginBottom: '6px' }}>
              🎯 Input-Derived Focus Recommendations
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '12px' }}>
              Personalized interventions based on your distraction audit results
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    background: '#F8FAFC',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{rec.icon}</span>
                      <span>{rec.title}</span>
                    </div>
                    <span
                      style={{
                        fontSize: '9.5px',
                        fontWeight: 750,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: '#EEF2FF',
                        color: '#4F46E5',
                        textTransform: 'uppercase',
                      }}
                    >
                      {rec.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 6px', lineHeight: 1.5 }}>
                    {rec.description}
                  </p>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#5B5CF0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>➔ Action:</span>
                    <span>{rec.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SAVED SCENARIOS MODAL ── */}
      <FocusRoiSavedModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        onLoadScenario={handleLoadScenarioData}
        currentCalcData={calcData}
      />

      {/* ── DEDICATED A4 PRINT & PDF EXPORT DOCUMENT ── */}
      <FocusRoiPrintDocument
        calcData={calcData}
        studentName={studentName}
        examName={examName}
        isExportingPdf={isExportingPdf}
      />
    </div>
  );
}
