'use client';
import { useState } from 'react';

export default function RoiCalculator() {
  const [hours, setHours] = useState(6);
  const [days, setDays] = useState(6);

  const monthlyHours = hours * days * 4.3;
  const hoursSaved = (monthlyHours * 0.18).toFixed(1);
  const cardsMastered = Math.round(hoursSaved * 40).toLocaleString();

  return (
    <div className="calculator-box">
      <div>
        <div className="calc-slider-group">
          <div className="calc-label-row">
            <span>Daily Study Goal</span>
            <span className="calc-val-highlight">{hours} Hours / day</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="14" 
            value={hours} 
            className="calc-slider"
            onChange={(e) => setHours(parseInt(e.target.value))}
          />
        </div>

        <div className="calc-slider-group">
          <div className="calc-label-row">
            <span>Study Days Per Week</span>
            <span className="calc-val-highlight">{days} Days / week</span>
          </div>
          <input 
            type="range" 
            min="3" 
            max="7" 
            value={days} 
            className="calc-slider"
            onChange={(e) => setDays(parseInt(e.target.value))}
          />
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: '1.6' }}>
          ⚡ Students lose an estimated 18% of productive study capacity switching across 5 separate apps. LifeTrack Pro eliminates all context-switching penalties.
        </p>
      </div>

      <div className="calc-results-card">
        <div className="calc-res-num">{hoursSaved} hrs</div>
        <div className="calc-res-lbl">Reclaimed Focus Time Every Month</div>

        <div className="calc-breakdown">
          <div>
            <div className="cbd-val">{cardsMastered}</div>
            <div className="cbd-lbl">Flashcards Mastered</div>
          </div>
          <div>
            <div className="cbd-val">+84%</div>
            <div className="cbd-lbl">Retention Boost</div>
          </div>
        </div>
      </div>
    </div>
  );
}
