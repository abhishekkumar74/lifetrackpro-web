'use client';
import { useState } from 'react';

const EXAM_PRESETS = [
  { id: 'jee', name: 'IIT JEE Prep', defaultHours: 8, defaultDays: 6, cardRatio: 45, label: 'Formulas & Concepts' },
  { id: 'neet', name: 'NEET Medical', defaultHours: 9, defaultDays: 6, cardRatio: 60, label: 'NCERT Biology Lines' },
  { id: 'upsc', name: 'UPSC Civil Services', defaultHours: 8, defaultDays: 7, cardRatio: 40, label: 'Articles & Current Affairs' },
  { id: 'general', name: 'University / Tech', defaultHours: 5, defaultDays: 5, cardRatio: 35, label: 'Coursework & Concepts' },
];

export default function RoiCalculator() {
  const [activePreset, setActivePreset] = useState(EXAM_PRESETS[0]);
  const [hours, setHours] = useState(EXAM_PRESETS[0].defaultHours);
  const [days, setDays] = useState(EXAM_PRESETS[0].defaultDays);

  const applyPreset = (p) => {
    setActivePreset(p);
    setHours(p.defaultHours);
    setDays(p.defaultDays);
  };

  // Monthly Calculations (4.3 weeks per month average)
  const monthlyGrossHours = Math.round(hours * days * 4.3);
  // Estimated 18% reclaimed focus from reduced context switching & multi-tool overhead
  const estimatedReclaimedHours = (monthlyGrossHours * 0.18).toFixed(1);
  // Potential active recall review capacity (~35-60 flashcard reviews/hr)
  const potentialConceptsReviewed = Math.round(parseFloat(estimatedReclaimedHours) * activePreset.cardRatio).toLocaleString();

  // Slider progress percentages for filled tracks
  const hoursPercent = Math.min(100, Math.max(0, ((hours - 2) / (16 - 2)) * 100));
  const daysPercent = Math.min(100, Math.max(0, ((days - 1) / (7 - 1)) * 100));

  return (
    <div className="calculator-box">
      <div className="calc-controls-col">
        {/* Step 1: Preset Routine Selector */}
        <div className="calc-preset-section">
          <div className="calc-section-label">
            <span>Step 1 — Choose a starting routine</span>
          </div>
          <div className="calc-presets-grid" role="group" aria-label="Exam Routine Presets">
            {EXAM_PRESETS.map((p) => {
              const isSelected = activePreset.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p)}
                  aria-pressed={isSelected}
                  className={`calc-preset-btn ${isSelected ? 'active' : ''}`}
                >
                  <span className="calc-preset-radio" aria-hidden="true">
                    {isSelected && <span className="calc-preset-radio-dot" />}
                  </span>
                  <span className="calc-preset-name">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Set Your Routine */}
        <div className="calc-routine-section">
          <div className="calc-section-label">
            <span>Step 2 — Set your routine</span>
          </div>

          {/* Daily Study Goal Slider: 2–16 hours */}
          <div className="calc-slider-group">
            <div className="calc-label-row">
              <label htmlFor="daily-study-hours" className="calc-field-title">
                Daily study goal
              </label>
              <span className="calc-val-highlight">{hours} hours / day</span>
            </div>
            <div className="calc-slider-wrapper">
              <input
                id="daily-study-hours"
                type="range"
                min="2"
                max="16"
                step="1"
                value={hours}
                className="calc-slider"
                style={{
                  '--slider-progress': `${hoursPercent}%`,
                }}
                aria-label="Daily study goal: 2 to 16 hours"
                aria-valuemin="2"
                aria-valuemax="16"
                aria-valuenow={hours}
                aria-valuetext={`${hours} hours per day`}
                onChange={(e) => {
                  setHours(parseInt(e.target.value, 10));
                }}
              />
              <div className="calc-slider-ticks" aria-hidden="true">
                <span>2h</span>
                <span>6h</span>
                <span>10h</span>
                <span>16h</span>
              </div>
            </div>
          </div>

          {/* Study Days Per Week Slider: 1–7 days */}
          <div className="calc-slider-group">
            <div className="calc-label-row">
              <label htmlFor="study-days-week" className="calc-field-title">
                Study days per week
              </label>
              <span className="calc-val-highlight">{days} {days === 1 ? 'day' : 'days'} / week</span>
            </div>
            <div className="calc-slider-wrapper">
              <input
                id="study-days-week"
                type="range"
                min="1"
                max="7"
                step="1"
                value={days}
                className="calc-slider"
                style={{
                  '--slider-progress': `${daysPercent}%`,
                }}
                aria-label="Study days per week: 1 to 7 days"
                aria-valuemin="1"
                aria-valuemax="7"
                aria-valuenow={days}
                aria-valuetext={`${days} days per week`}
                onChange={(e) => {
                  setDays(parseInt(e.target.value, 10));
                }}
              />
              <div className="calc-slider-ticks" aria-hidden="true">
                <span>1 day</span>
                <span>3 days</span>
                <span>5 days</span>
                <span>7 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Information Block: Why focused study matters */}
        <div className="calc-info-block">
          <div className="calc-info-header">
            <span className="calc-info-badge">Why focused study matters</span>
          </div>
          <p className="calc-info-text">
            &ldquo;Frequent context switching can interrupt concentration. Keeping your study workflow organized may help you spend less time managing separate tools.&rdquo;
          </p>
        </div>
      </div>

      {/* Step 3: Explore Your Results (Dynamic Results Card) */}
      <div className="calc-results-card" aria-live="polite" aria-atomic="true">
        <div className="calc-results-step-tag">
          Step 3 — Explore your results
        </div>

        {/* Primary Headline & Metric */}
        <div className="calc-primary-metric">
          <div className="calc-res-lbl">Potential Monthly Focus Time</div>
          <div className="calc-res-num-wrap">
            <span className="calc-res-num">{estimatedReclaimedHours}</span>
            <span className="calc-res-unit">hours</span>
          </div>
          <p className="calc-res-sub">
            Based on your selected study routine and the calculator&apos;s assumptions.
          </p>
        </div>

        {/* Structured Results Breakdown */}
        <div className="calc-breakdown-list">
          <div className="calc-breakdown-item">
            <div className="calc-bd-meta">
              <span className="calc-bd-label">Estimated additional focus time</span>
              <span className="calc-bd-val">+{estimatedReclaimedHours} hrs</span>
            </div>
            <span className="calc-bd-hint">Estimated focus reclaimed from reduced multi-app switching</span>
          </div>

          <div className="calc-breakdown-item">
            <div className="calc-bd-meta">
              <span className="calc-bd-label">Potential revision capacity</span>
              <span className="calc-bd-val">~{potentialConceptsReviewed}</span>
            </div>
            <span className="calc-bd-hint">{activePreset.label} active recall reviews</span>
          </div>

          <div className="calc-breakdown-item">
            <div className="calc-bd-meta">
              <span className="calc-bd-label">Selected routine summary</span>
              <span className="calc-bd-val">~{monthlyGrossHours} hrs/mo</span>
            </div>
            <span className="calc-bd-hint">{hours}h/day &times; {days} days/week (~4.3 weeks/month)</span>
          </div>
        </div>

        {/* Transparent Disclaimer & Calculation Context */}
        <div className="calc-results-footer">
          <span className="calc-estimate-tag">* Estimates only</span>
          <p className="calc-estimate-desc">
            All figures are illustrative estimates based on routine inputs. Revision capacity is a projection, not a guaranteed outcome. Individual focus and study stamina vary.
          </p>
        </div>
      </div>
    </div>
  );
}
