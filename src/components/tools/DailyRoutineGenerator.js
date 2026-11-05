'use client';
import { useState, useEffect, useCallback } from 'react';
import RoutineProfileConfig from './routine/RoutineProfileConfig';
import RoutineTimelineView from './routine/RoutineTimelineView';
import EditActivityModal from './routine/EditActivityModal';
import SavedRoutinesModal from './routine/SavedRoutinesModal';
import RoutinePrintDocument from './routine/RoutinePrintDocument';
import FocusSessionModal from './FocusSessionModal';
import { 
  STUDENT_PERSONAS, 
  generateSmartDailyRoutine, 
  evaluateRoutineBalance,
  extractAvailableStudyWindows 
} from '@/lib/routineEngine';

/**
 * Smart Daily Routine Planner for Students
 * Master Orchestrator Component
 * 
 * Re-architected for a spacious, modern productivity SaaS layout (42% / 58% desktop split),
 * accurate 24-hour conflict-free scheduling, and responsive mobile behavior.
 */
export default function DailyRoutineGenerator() {
  const defaultPersona = STUDENT_PERSONAS.school;

  // 1. Profile Configuration State
  const [profile, setProfile] = useState({
    studentName: '',
    targetGoal: '',
    personaKey: 'school',
    wakeTime: defaultPersona.defaultWakeTime,
    sleepHours: defaultPersona.defaultSleepHours,
    studyTargetHours: defaultPersona.defaultStudyTargetHours,
    chronotype: defaultPersona.defaultChronotype,
    cadenceMinutes: defaultPersona.cadenceMinutes,
    breakMinutes: defaultPersona.breakMinutes,
    commitments: JSON.parse(JSON.stringify(defaultPersona.defaultCommitments)),
    includeMorningPriming: true,
    includeActiveRecall: true,
    includeWindDown: true,
  });

  const [activities, setActivities] = useState([]);
  const [conflictWarnings, setConflictWarnings] = useState([]);
  const [isConflictFree, setIsConflictFree] = useState(true);
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [activeRoutineName, setActiveRoutineName] = useState('My Daily Student Routine');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Modals & Feedback
  const [editingActivity, setEditingActivity] = useState(null);
  const [activeFocusSession, setActiveFocusSession] = useState(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const handleStartFocus = (act) => {
    setActiveFocusSession({
      id: act.id,
      subject: act.title,
      duration: act.duration || 50,
    });
  };

  const handleCompleteFocus = (actId) => {
    setActivities(prev => prev.map(a => (a.id === actId ? { ...a, completed: true } : a)));
    setActiveFocusSession(null);
    showToast('🎯 Focus session logged! Routine updated.');
  };

  // 2. Check for Previous Saved Routine on Mount (Zero dummy generation before user generates)
  useEffect(() => {
    try {
      const activeStored = localStorage.getItem('lifetrack_daily_routine_active');
      if (activeStored) {
        const parsed = JSON.parse(activeStored);
        if (parsed && parsed.activitiesCount > 0 && Array.isArray(parsed.commitments)) {
          // User already generated in this session, optionally restore
        }
      }
    } catch {
      // Safe fallback
    }
  }, []);

  // 3. Load Saved Routines from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ltp_saved_daily_routines');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedRoutines(parsed);
        }
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  // 4. Synchronize Active Routine to LocalStorage for Study Timetable Integration
  useEffect(() => {
    if (activities && activities.length > 0) {
      try {
        const availableWindows = extractAvailableStudyWindows(activities);
        const totalStudyMinutes = availableWindows.reduce((acc, w) => acc + (w.duration || 0), 0);
        const routineSyncPayload = {
          updatedAt: new Date().toISOString(),
          personaKey: profile.personaKey,
          wakeTime: profile.wakeTime,
          sleepHours: profile.sleepHours,
          totalStudyMinutes,
          totalStudyHours: Number((totalStudyMinutes / 60).toFixed(1)),
          availableStudyWindows: availableWindows,
          commitments: profile.commitments,
          activitiesCount: activities.length,
        };
        localStorage.setItem('lifetrack_daily_routine_active', JSON.stringify(routineSyncPayload));
      } catch {
        // Safe localStorage fallback
      }
    }
  }, [activities, profile.personaKey, profile.wakeTime, profile.sleepHours, profile.commitments]);

  // Compute Balance & Realism Score
  const balanceData = evaluateRoutineBalance(activities, profile.sleepHours, profile.studyTargetHours, conflictWarnings);

  // Re-generate routine from profile constraints
  const handleGenerate = () => {
    const result = generateSmartDailyRoutine({
      personaKey: profile.personaKey,
      wakeTime: profile.wakeTime,
      sleepHours: profile.sleepHours,
      studyTargetHours: profile.studyTargetHours,
      chronotype: profile.chronotype,
      cadenceMinutes: profile.cadenceMinutes,
      breakMinutes: profile.breakMinutes,
      commitments: profile.commitments,
      includeMorningPriming: profile.includeMorningPriming,
      includeActiveRecall: profile.includeActiveRecall,
      includeWindDown: profile.includeWindDown,
      existingActivities: activities, // Preserves completed checks
    });

    setActivities(result.activities);
    setConflictWarnings(result.conflictWarnings);
    setIsConflictFree(result.isConflictFree);
    setHasGenerated(true);
    showToast('⚡ 24-Hour Routine Generated & Synchronized!');
  };

  // Activity update & delete
  const handleUpdateActivity = (updated) => {
    setActivities(prev => prev.map(a => (a.id === updated.id ? updated : a)));
  };

  const handleDeleteActivity = (id) => {
    const targetActivity = activities.find(a => a.id === id);
    setActivities(prev => prev.filter(a => a.id !== id));
    // Also remove from profile commitments so it does not resurrect on regenerate!
    setProfile(prev => ({
      ...prev,
      commitments: prev.commitments.filter(c => c.id !== id && c.name !== targetActivity?.title),
    }));
    showToast('Activity removed from routine.');
  };

  const handleAddNewActivityClick = () => {
    setEditingActivity({
      isNew: true,
      id: `custom-activity-${Date.now()}`,
      title: 'New Study / Focus Sprint',
      category: 'deep_work',
      startTime: '16:00',
      duration: 60,
      note: '',
      isLocked: false,
      completed: false,
    });
  };

  const handleSaveActivityFromModal = (saved) => {
    if (saved.isNew) {
      delete saved.isNew;
      setActivities(prev => [...prev, saved].sort((a, b) => a.startMin - b.startMin));
      showToast('Added custom activity to schedule.');
    } else {
      handleUpdateActivity(saved);
      showToast('Activity details updated.');
    }
  };

  // Persistent Routine Management
  const handleSaveCurrentRoutine = () => {
    const personaTitle = STUDENT_PERSONAS[profile.personaKey]?.name || 'Student Routine';
    const newEntry = {
      id: `routine-${Date.now()}`,
      name: `${activeRoutineName} (${new Date().toLocaleDateString()})`,
      personaName: personaTitle,
      savedAt: new Date().toISOString(),
      profile: JSON.parse(JSON.stringify(profile)),
      activities: JSON.parse(JSON.stringify(activities)),
      studyHours: balanceData.scheduledStudyHours,
      activityCount: activities.length,
    };

    const nextSaved = [newEntry, ...savedRoutines];
    setSavedRoutines(nextSaved);
    try {
      localStorage.setItem('ltp_saved_daily_routines', JSON.stringify(nextSaved));
    } catch {}
    showToast('💾 Routine successfully saved to your browser!');
  };

  const handleLoadRoutine = (entry) => {
    if (entry.profile) setProfile(entry.profile);
    if (entry.activities) setActivities(entry.activities);
    setActiveRoutineName(entry.name);
    setHasGenerated(true);
    showToast(`📂 Loaded '${entry.name}'!`);
  };

  const handleDeleteSavedRoutine = (id) => {
    const nextSaved = savedRoutines.filter(r => r.id !== id);
    setSavedRoutines(nextSaved);
    try {
      localStorage.setItem('ltp_saved_daily_routines', JSON.stringify(nextSaved));
    } catch {}
    showToast('Deleted saved routine.');
  };

  const handleRenameSavedRoutine = (id, newName) => {
    const nextSaved = savedRoutines.map(r => (r.id === id ? { ...r, name: newName } : r));
    setSavedRoutines(nextSaved);
    try {
      localStorage.setItem('ltp_saved_daily_routines', JSON.stringify(nextSaved));
    } catch {}
    showToast('Routine renamed.');
  };

  const handleDuplicateSavedRoutine = (entry) => {
    const dup = {
      ...entry,
      id: `routine-${Date.now()}`,
      name: `${entry.name} (Copy)`,
      savedAt: new Date().toISOString(),
    };
    const nextSaved = [dup, ...savedRoutines];
    setSavedRoutines(nextSaved);
    try {
      localStorage.setItem('ltp_saved_daily_routines', JSON.stringify(nextSaved));
    } catch {}
    showToast('Routine duplicated.');
  };

  // ── PRINT & PDF EXPORT SYSTEM ──
  // A. Print Routine — triggers browser print dialog for isolated A4 routine document
  const handlePrintRoutine = () => {
    window.print();
  };

  // B. Download PDF — client-side downloadable PDF using jsPDF
  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    showToast('📄 Generating high-resolution A4 Routine PDF...');

    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;
      const element = document.getElementById('routine-print-document');

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

      const rawName = profile.studentName || 'My';
      const cleanName = rawName.trim().replace(/[^a-zA-Z0-9_-]/g, '-');
      doc.save(`${cleanName}-Daily-Study-Routine.pdf`);
      setIsExportingPdf(false);
      showToast('✅ Daily Routine PDF downloaded!');
    } catch (err) {
      console.error('PDF Generation failed, fallback to native browser print:', err);
      setIsExportingPdf(false);
      window.print();
    }
  };

  return (
    <div className="daily-routine-planner-widget" style={{ margin: '28px 0' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            maxWidth: 'calc(100vw - 32px)',
            background: '#172033',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '12px',
            fontSize: '12.5px',
            fontWeight: 700,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            animation: 'fadeIn 0.2s ease-in-out',
            pointerEvents: 'none',
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Main Two-Column Desktop & Fluid Mobile Layout (42% / 58% split) */}
      <div className="daily-routine-main-grid">
        {/* Left Column: Routine Configuration (~42% desktop) */}
        <div className="daily-routine-config-col">
          <RoutineProfileConfig
            profile={profile}
            setProfile={setProfile}
            onGenerate={handleGenerate}
            onDeleteCommitment={handleDeleteActivity}
            balanceData={balanceData}
            hasGenerated={hasGenerated}
          />
        </div>

        {/* Right Column: Live Routine Dashboard (~58% desktop) */}
        <div className="daily-routine-dashboard-col">
          {hasGenerated && activities.length > 0 ? (
            <RoutineTimelineView
              activities={activities}
              profile={profile}
              balanceData={balanceData}
              onUpdateActivity={handleUpdateActivity}
              onDeleteActivity={handleDeleteActivity}
              onAddActivityClick={handleAddNewActivityClick}
              onEditActivityClick={(act) => setEditingActivity(act)}
              onRegenerate={handleGenerate}
              onSaveRoutine={handleSaveCurrentRoutine}
              onOpenSavedModal={() => setIsSavedModalOpen(true)}
              onPrintRoutine={handlePrintRoutine}
              onDownloadPdf={handleDownloadPdf}
              isExportingPdf={isExportingPdf}
              showToast={showToast}
              isConflictFree={isConflictFree}
              conflictWarnings={conflictWarnings}
              onStartFocus={handleStartFocus}
            />
          ) : (
            <div
              className="daily-routine-dashboard-card"
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
                  background: 'rgba(91, 92, 240, 0.08)',
                  color: '#5B5CF0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '18px',
                }}
              >
                🗓️
              </div>
              <h2 style={{ fontSize: '21px', fontWeight: 800, color: '#172033', margin: '0 0 8px' }}>
                Create Your Personalized 24-Hour Daily Routine
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '520px', lineHeight: 1.6, margin: '0 0 32px' }}>
                Select your student lifestyle category, set your wake-up &amp; sleep hours, and add your daily commitments on the left, then click <strong>⚡ Generate Smart 24-Hour Routine</strong> to build your customized schedule.
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
                <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E8ECF2' }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>🛡️</div>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#172033', marginBottom: '3px' }}>100% Conflict-Free</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>Locks school, meals, and 7.5h sleep so study blocks never clash.</div>
                </div>
                <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E8ECF2' }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>🧠</div>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#172033', marginBottom: '3px' }}>Circadian Focus Peaks</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>Frontloads deep work into your biological morning alertness windows.</div>
                </div>
                <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E8ECF2' }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>🖨️</div>
                  <div style={{ fontSize: '13px', fontWeight: 750, color: '#172033', marginBottom: '3px' }}>Printable Desk Schedule</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45 }}>1-click high-contrast A4 PDF export formatted for your study desk wall.</div>
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
                <span>⚡ Generate Smart 24-Hour Routine Now</span>
              </button>

              {savedRoutines.length > 0 && (
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
                    📂 Or open a previously saved routine ({savedRoutines.length} saved)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dedicated A4 Print & PDF Export Document */}
      <RoutinePrintDocument
        activities={activities}
        profile={profile}
        balanceData={balanceData}
        isExportingPdf={isExportingPdf}
      />

      {/* Modals */}
      <FocusSessionModal
        isOpen={!!activeFocusSession}
        onClose={() => setActiveFocusSession(null)}
        session={activeFocusSession}
        onComplete={handleCompleteFocus}
      />

      <EditActivityModal
        isOpen={!!editingActivity}
        onClose={() => setEditingActivity(null)}
        activity={editingActivity}
        onSave={handleSaveActivityFromModal}
        onDelete={handleDeleteActivity}
      />

      <SavedRoutinesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedRoutines={savedRoutines}
        onLoad={handleLoadRoutine}
        onDelete={handleDeleteSavedRoutine}
        onRename={handleRenameSavedRoutine}
        onDuplicate={handleDuplicateSavedRoutine}
      />
    </div>
  );
}
