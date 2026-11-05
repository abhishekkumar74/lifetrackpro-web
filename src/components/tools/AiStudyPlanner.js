'use client';
import { useState, useEffect, useCallback } from 'react';
import PlannerProfileSetup from './PlannerProfileSetup';
import PlannerDashboard from './PlannerDashboard';
import SessionEditModal from './SessionEditModal';
import FocusSessionModal from './FocusSessionModal';
import SavedTimetablesModal from './SavedTimetablesModal';
import PlannerPrintDocument from './PlannerPrintDocument';
import { 
  EXAM_PRESETS, 
  generateDayTimetable, 
  calculateRealismScore,
  generateAcademicMasterRoadmap,
} from '@/lib/timetableEngine';

export default function AiStudyPlanner() {
  // 1. Pure Academic Initial State (Zero lifestyle/sleep/meal scheduling)
  const [profile, setProfile] = useState({
    exam: 'jee',
    customExamName: '',
    examDate: '',
    horizonDays: 60,
    targetScoreRank: '99+ Percentile',
    prepLevel: 'intermediate',
    strategyMode: 'balanced',
    sessionCadence: 90,
    breakDuration: 15,
    subjects: EXAM_PRESETS.jee.defaultSubjects,
    isImportedFromRoutine: false,
    importedStudyWindows: [],
    manualDailyHours: 7.5,
    studyShift: 'balanced',
    fixedCommitments: [],
    preferences: {
      includeSpacedRecall: true,
      includePracticeDrills: true,
      includeMockTests: true,
      includeErrorAnalysis: true,
    },
  });

  const [roadmap, setRoadmap] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [savedTimetables, setSavedTimetables] = useState([]);
  const [activeTimetableName, setActiveTimetableName] = useState('My AI Study Timetable');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [dashboardViewMode, setDashboardViewMode] = useState('day');

  // Modals
  const [focusModalSession, setFocusModalSession] = useState(null);
  const [editModalSession, setEditModalSession] = useState(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Toast notification helper
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  // 2. Check for Routine Integration & Query Parameters (Zero dummy generation before user generates)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const shouldImportParam = searchParams.get('import') === 'routine';

      const storedRoutine = localStorage.getItem('lifetrack_daily_routine_active');
      if (storedRoutine) {
        const parsed = JSON.parse(storedRoutine);
        if (parsed && Array.isArray(parsed.availableStudyWindows) && parsed.availableStudyWindows.length > 0) {
          if (shouldImportParam) {
            setProfile(p => ({
              ...p,
              isImportedFromRoutine: true,
              importedStudyWindows: parsed.availableStudyWindows,
              manualDailyHours: parsed.totalStudyHours || p.manualDailyHours,
            }));
            showToast('✓ Successfully imported study windows from your Daily Routine!');
          }
        }
      }
    } catch {
      // Safe fallback
    }
  }, []); // Run once on mount

  // 3. Load Saved Timetables from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ltp_saved_timetables');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedTimetables(parsed);
        }
      }
    } catch {
      // Ignore local storage parse errors
    }
  }, []);

  // Compute Realism score dynamically
  const realismData = calculateRealismScore({
    sessions,
    subjects: profile.subjects,
    isImportedFromRoutine: profile.isImportedFromRoutine,
  });

  // Re-generate full timetable and academic master roadmap
  const handleGenerate = () => {
    const nextSessions = generateDayTimetable({
      exam: profile.exam,
      customExamName: profile.customExamName,
      subjects: profile.subjects,
      sessionCadence: profile.sessionCadence,
      breakDuration: profile.breakDuration,
      preferences: profile.preferences,
      strategyMode: profile.strategyMode,
      importedStudyWindows: profile.isImportedFromRoutine ? profile.importedStudyWindows : null,
      manualDailyHours: profile.manualDailyHours,
      studyShift: profile.studyShift,
      fixedCommitments: profile.fixedCommitments || [],
      existingSessions: sessions, // Preserves locked sessions!
    });
    setSessions(nextSessions);

    const nextRoadmap = generateAcademicMasterRoadmap({
      exam: profile.exam,
      customExamName: profile.customExamName,
      examDate: profile.examDate,
      horizonDays: profile.horizonDays || 60,
      targetScoreRank: profile.targetScoreRank,
      subjects: profile.subjects,
      dailyStudyHours: profile.manualDailyHours || 7.5,
      preferences: profile.preferences,
      existingRoadmap: roadmap,
    });
    setRoadmap(nextRoadmap);
    setHasGenerated(true);
    showToast('⚡ AI Academic Master Roadmap & Desk Calendar Generated!');
  };

  const handleToggleDayComplete = (dayId) => {
    setRoadmap((prev) => {
      if (!prev || !Array.isArray(prev.weeks)) return prev;
      return {
        ...prev,
        weeks: prev.weeks.map((w) => ({
          ...w,
          days: w.days.map((d) => (d.id === dayId ? { ...d, completed: !d.completed } : d)),
        })),
      };
    });
  };

  // Weak Subject Booster
  const handleBoostWeakSubjects = () => {
    const weakSub = profile.subjects.find(s => s.proficiency === 'weak');
    if (!weakSub) {
      showToast('No weak subjects marked. Mark a subject as Weak in Step 3.');
      return;
    }

    // Invert one of the middle general deep work sessions into a dedicated booster
    setSessions(prev => {
      let boosted = false;
      return prev.map(s => {
        if (!boosted && s.type === 'deep_work' && !s.locked && s.subject !== weakSub.name) {
          boosted = true;
          return {
            ...s,
            title: `⚡ Booster: ${weakSub.name} High-Yield Practice`,
            subject: weakSub.name,
            type: 'practice',
            note: 'Targeted weak topic mastery and numerical error rectification.',
          };
        }
        return s;
      });
    });
    showToast(`🚀 Booster session added for ${weakSub.name}!`);
  };

  // Save current timetable to localStorage
  const handleSaveCurrentTimetable = () => {
    const newEntry = {
      id: `tt-${Date.now()}`,
      name: `${activeTimetableName} (${new Date().toLocaleDateString()})`,
      examName: EXAM_PRESETS[profile.exam]?.name || profile.customExamName || 'Custom Goal',
      savedAt: new Date().toISOString(),
      profile: JSON.parse(JSON.stringify(profile)),
      sessions: JSON.parse(JSON.stringify(sessions)),
      sessionCount: sessions.length,
    };

    const nextSaved = [newEntry, ...savedTimetables];
    setSavedTimetables(nextSaved);
    try {
      localStorage.setItem('ltp_saved_timetables', JSON.stringify(nextSaved));
    } catch {
      // LocalStorage fallback
    }
    showToast('💾 Timetable successfully saved to your browser!');
  };

  // Load a saved timetable
  const handleLoadTimetable = (entry) => {
    if (entry.profile) setProfile(entry.profile);
    if (entry.sessions) setSessions(entry.sessions);
    if (entry.roadmap) {
      setRoadmap(entry.roadmap);
    } else {
      const r = generateAcademicMasterRoadmap({
        exam: entry.profile?.exam || 'jee',
        customExamName: entry.profile?.customExamName || '',
        examDate: entry.profile?.examDate || '',
        horizonDays: entry.profile?.horizonDays || 60,
        targetScoreRank: entry.profile?.targetScoreRank || '99+ Percentile',
        subjects: entry.profile?.subjects || [],
        dailyStudyHours: entry.profile?.manualDailyHours || 7.5,
        preferences: entry.profile?.preferences || {},
      });
      setRoadmap(r);
    }
    setActiveTimetableName(entry.name);
    setHasGenerated(true);
    showToast(`📂 Loaded '${entry.name}'!`);
  };

  // Delete saved timetable
  const handleDeleteSavedTimetable = (id) => {
    const nextSaved = savedTimetables.filter(t => t.id !== id);
    setSavedTimetables(nextSaved);
    try {
      localStorage.setItem('ltp_saved_timetables', JSON.stringify(nextSaved));
    } catch {}
    showToast('Deleted timetable version.');
  };

  // Rename saved timetable
  const handleRenameSavedTimetable = (id, newName) => {
    const nextSaved = savedTimetables.map(t => (t.id === id ? { ...t, name: newName } : t));
    setSavedTimetables(nextSaved);
    try {
      localStorage.setItem('ltp_saved_timetables', JSON.stringify(nextSaved));
    } catch {}
    showToast('Timetable renamed.');
  };

  // Duplicate saved timetable
  const handleDuplicateSavedTimetable = (entry) => {
    const dup = {
      ...entry,
      id: `tt-${Date.now()}`,
      name: `${entry.name} (Copy)`,
      savedAt: new Date().toISOString(),
    };
    const nextSaved = [dup, ...savedTimetables];
    setSavedTimetables(nextSaved);
    try {
      localStorage.setItem('ltp_saved_timetables', JSON.stringify(nextSaved));
    } catch {}
    showToast('Timetable duplicated.');
  };

  // Session updates
  const handleUpdateSession = (updatedSession) => {
    setSessions(prev => prev.map(s => (s.id === updatedSession.id ? updatedSession : s)));
  };

  const handleDeleteSession = (sessionId) => {
    const targetSession = sessions.find(s => s.id === sessionId);
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    // Also remove from fixedCommitments if it was a fixed commitment!
    if (targetSession && (targetSession.type === 'fixed' || targetSession.isFixed)) {
      setProfile(prev => ({
        ...prev,
        fixedCommitments: prev.fixedCommitments.filter(
          c => c.id !== sessionId && c.name !== targetSession.title
        ),
      }));
    }
    showToast('Session removed from timetable.');
  };

  const handleDeleteCommitment = (commitmentId, commitmentName) => {
    setSessions(prev => prev.filter(s => s.id !== commitmentId && s.title !== commitmentName));
  };

  const handleAddNewSession = () => {
    setEditModalSession({
      isNew: true,
      id: `custom-session-${Date.now()}`,
      title: 'New Study Block',
      subject: profile.subjects[0]?.name || 'Core Focus',
      type: 'deep_work',
      duration: 50,
      rawStartTime: '16:00',
      note: '',
      locked: false,
    });
  };

  const handleSessionSaveFromModal = (savedSession) => {
    if (savedSession.isNew) {
      delete savedSession.isNew;
      setSessions(prev => [...prev, savedSession].sort((a, b) => a.rawStartTime.localeCompare(b.rawStartTime)));
      showToast('Added new study block.');
    } else {
      handleUpdateSession(savedSession);
      showToast('Session updated.');
    }
  };

  const handleSessionCompleted = (sessionId) => {
    setSessions(prev => prev.map(s => (s.id === sessionId ? { ...s, completed: true } : s)));
    showToast('🎉 Focus session completed and logged!');
  };

  // ── PRINT & PDF EXPORT SYSTEM ──
  const handlePrintTimetable = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    showToast('📄 Generating high-resolution A4 Study Schedule PDF...');

    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;
      const element = document.getElementById('planner-print-document');

      if (!element) {
        window.print();
        setIsExportingPdf(false);
        return;
      }

      // Temporarily reveal element with exact A4 portrait dimensions
      const originalDisplay = element.style.display;
      const originalPosition = element.style.position;
      const originalLeft = element.style.left;
      const originalTop = element.style.top;
      const originalWidth = element.style.width;
      const originalZIndex = element.style.zIndex;
      const originalOpacity = element.style.opacity;
      const originalBackground = element.style.background;
      const originalPadding = element.style.padding;
      const originalBoxSizing = element.style.boxSizing;

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

      await new Promise(r => setTimeout(r, 120));

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

      // Stop if remaining height is trivial padding/whitespace (< 25px) to prevent empty trailing pages
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

      const rawExam = profile.customExamName || profile.exam || 'LifeTrackPro';
      const cleanName = rawExam.trim().replace(/[^a-zA-Z0-9_-]/g, '-');
      try {
        if (typeof window !== 'undefined') {
          window.__lastPdfDataUri = doc.output('datauristring');
        }
      } catch (e) {}
      doc.save(`${cleanName}-${dashboardViewMode === 'day' ? 'Daily-Timetable' : 'Master-Roadmap'}.pdf`);
      setIsExportingPdf(false);
      showToast('✅ Study Timetable PDF downloaded!');
    } catch (err) {
      console.error('PDF Generation failed, fallback to native browser print:', err);
      setIsExportingPdf(false);
      window.print();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'var(--planner-text-primary)',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '13.5px',
            fontWeight: 700,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* ── 2-COLUMN WORKSPACE GRID (42% Left / 58% Right, Centered Architecture) ── */}
      <div className="daily-routine-main-grid">
        {/* Left Column: Multi-Step Setup Wizard */}
        <div className="daily-routine-config-col" style={{ position: 'relative', top: 'auto', alignSelf: 'start' }}>
          <PlannerProfileSetup
            profile={profile}
            setProfile={setProfile}
            onGenerate={handleGenerate}
            realismData={realismData}
            hasGenerated={hasGenerated}
          />
        </div>

        {/* Right Column: Live Interactive Dashboard */}
        <div className="daily-routine-dashboard-col">
          {hasGenerated && (sessions.length > 0 || roadmap) ? (
            <PlannerDashboard
              sessions={sessions}
              profile={profile}
              roadmap={roadmap}
              onToggleDayComplete={handleToggleDayComplete}
              onUpdateSession={handleUpdateSession}
              onDeleteSession={handleDeleteSession}
              onAddSessionClick={handleAddNewSession}
              onEditSessionClick={(s) => setEditModalSession(s)}
              onRegenerate={handleGenerate}
              onOpenSavedModal={() => setIsSavedModalOpen(true)}
              onSaveCurrentTimetable={handleSaveCurrentTimetable}
              onBoostWeakSubjects={handleBoostWeakSubjects}
              onPrintTimetable={handlePrintTimetable}
              onDownloadPdf={handleDownloadPdf}
              isExportingPdf={isExportingPdf}
              onStartFocus={(s) => setFocusModalSession(s)}
              showToast={showToast}
              onViewChange={(mode) => setDashboardViewMode(mode)}
            />
          ) : (
            <div
              className="planner-card"
              style={{
                padding: '48px 32px',
                textAlign: 'center',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px dashed #CBD5E1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '520px',
                boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.03)',
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '20px',
                  background: 'rgba(79, 70, 229, 0.08)',
                  color: '#4F46E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '18px',
                }}
              >
                🎯
              </div>
              <h2 style={{ fontSize: '21px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
                Build Your Academic Master Roadmap &amp; Desk Calendar
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '520px', lineHeight: 1.6, margin: '0 0 32px' }}>
                Select your target exam (JEE, NEET, UPSC, etc.), set your exam date and daily study hours on the left, then click <strong>⚡ Generate AI-Optimized Timetable</strong> to build your date-by-date syllabus plan.
              </p>

              {/* 3 Key Capabilities Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '14px',
                  width: '100%',
                  maxWidth: '640px',
                  marginBottom: '32px',
                  textAlign: 'left',
                }}
              >
                <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>📅</div>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A', marginBottom: '3px' }}>Date-by-Date Roadmap</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>Complete 30/60/90-day syllabus distributed across your daily study shifts.</div>
                </div>
                <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>📊</div>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A', marginBottom: '3px' }}>PYQ Volume &amp; Mocks</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>Target question volume and Sunday full 3-hour mock exam simulations.</div>
                </div>
                <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>🖨️</div>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#0F172A', marginBottom: '3px' }}>Desk Calendar &amp; iCal</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>1-click high-contrast printable wall calendar and Google/Apple calendar export.</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                style={{
                  padding: '13px 30px',
                  fontSize: '14px',
                  fontWeight: 800,
                  borderRadius: '12px',
                  background: '#4F46E5',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px -2px rgba(79, 70, 229, 0.35)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#4338CA'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#4F46E5'; }}
              >
                <span>⚡ Generate AI-Optimized Timetable Now</span>
              </button>

              {savedTimetables.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setIsSavedModalOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#4F46E5',
                      fontSize: '12.5px',
                      fontWeight: 650,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    📂 Or open a previously saved timetable ({savedTimetables.length} saved)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dedicated A4 Print & PDF Export Document */}
      <PlannerPrintDocument
        sessions={sessions}
        profile={profile}
        roadmap={roadmap}
        realismData={realismData}
        isExportingPdf={isExportingPdf}
        activeView={dashboardViewMode}
      />

      {/* Modals */}
      <SessionEditModal
        isOpen={!!editModalSession}
        onClose={() => setEditModalSession(null)}
        session={editModalSession}
        subjects={profile.subjects}
        onSave={handleSessionSaveFromModal}
        onDelete={handleDeleteSession}
      />

      <FocusSessionModal
        isOpen={!!focusModalSession}
        onClose={() => setFocusModalSession(null)}
        session={focusModalSession}
        onComplete={handleSessionCompleted}
      />

      <SavedTimetablesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTimetables={savedTimetables}
        onLoad={handleLoadTimetable}
        onDelete={handleDeleteSavedTimetable}
        onRename={handleRenameSavedTimetable}
        onDuplicate={handleDuplicateSavedTimetable}
      />
    </div>
  );
}
