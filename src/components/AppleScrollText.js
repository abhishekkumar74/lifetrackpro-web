'use client';

const PHILOSOPHY_PILLARS = [
  {
    num: '01',
    tag: 'FOCUS FLOW',
    title: 'Unified Deep Work',
    desc: 'Run structured Pomodoro blocks that automatically log focus time and build study momentum without context switching.',
    accent: '#3B82F6',
    flowLabel: '50/10 Focus Blocks',
    sub: 'Ambient soundscape support',
  },
  {
    num: '02',
    tag: 'ACTIVE RECALL',
    title: 'Compounding Memory',
    desc: 'SM-2 spaced repetition auto-schedules flashcard reviews at expanding intervals right before memory decay occurs.',
    accent: '#818CF8',
    flowLabel: 'SM-2 Review Queues',
    sub: 'Expanding retention intervals',
  },
  {
    num: '03',
    tag: 'HABIT SHIELD',
    title: 'Shielded Momentum',
    desc: 'Daily study checklists build automatic consistency, while emergency streak freeze tokens protect progress on rest days.',
    accent: '#F59E0B',
    flowLabel: 'Streak Freeze Tokens',
    sub: 'Emergency habit protection',
  },
];

const METRICS = [
  {
    value: 'SM-2',
    label: 'Spaced Repetition Recall',
    sub: 'Algorithmic intervals for formula & deck retention',
    accent: '#3B82F6',
  },
  {
    value: '50 / 10',
    label: 'Calibrated Focus Cadence',
    sub: 'Standard deep work blocks with ambient soundscapes',
    accent: '#10B981',
  },
  {
    value: 'Freeze Shield',
    label: 'Habit Momentum Guard',
    sub: 'Emergency tokens protect streaks on rest days',
    accent: '#F59E0B',
  },
  {
    value: 'PIN Vault',
    label: 'Encrypted Local Privacy',
    sub: 'PIN-locked journal entries with zero data selling',
    accent: '#818CF8',
  },
];

export default function AppleScrollText() {
  return (
    <section className="manifesto-cardless-section" aria-label="LifeTrack Pro Core Philosophy">
      {/* Deep Atmospheric Radial Light */}
      <div className="manifesto-ambient-light" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="manifesto-inner">
          
          {/* Header */}
          <div className="manifesto-header reveal">
            <div className="manifesto-eyebrow">
              <span className="manifesto-pulse" />
              <span>THE UNIFIED PHILOSOPHY</span>
            </div>
            
            <h2 className="manifesto-title">
              You don&apos;t have a discipline problem.<br />
              <span className="manifesto-title-gradient">You have a fragmentation problem.</span>
            </h2>
            
            <p className="manifesto-lead">
              Your goals, habits, study sessions, and revision plans shouldn&apos;t live in separate places. LifeTrack Pro brings them together so you can spend less time managing tools and more time making progress.
            </p>
          </div>

          {/* Connected Cardless Pipeline */}
          <div className="manifesto-flow-container">
            <div className="manifesto-flow-track" />
            
            {PHILOSOPHY_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.num}
                className={`manifesto-flow-step reveal ${idx === 1 ? 'reveal-delay-1' : idx === 2 ? 'reveal-delay-2' : ''}`}
                style={{ '--step-accent': pillar.accent }}
              >
                {/* Flow Step Marker */}
                <div className="flow-step-marker">
                  <span className="flow-step-dot" />
                  <span className="flow-step-num">{pillar.num}</span>
                </div>

                <div className="flow-step-content">
                  <div className="flow-step-tag">{pillar.tag}</div>
                  <h3 className="flow-step-title">{pillar.title}</h3>
                  <p className="flow-step-desc">{pillar.desc}</p>
                  
                  <div className="flow-step-live">
                    <span className="flow-step-live-dot" />
                    <span className="flow-step-live-text">{pillar.flowLabel}</span>
                    <span className="flow-step-live-sub">• {pillar.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cardless Verified Product Capabilities */}
          <div className="manifesto-metrics-cardless reveal">
            <div className="manifesto-metrics-row">
              {METRICS.map((m, idx) => (
                <div key={idx} className="manifesto-metric-item">
                  <div className="manifesto-metric-value" style={{ '--metric-accent': m.accent }}>
                    {m.value}
                  </div>
                  <div className="manifesto-metric-bar" style={{ background: m.accent }} />
                  <div className="manifesto-metric-label">{m.label}</div>
                  <div className="manifesto-metric-desc">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

