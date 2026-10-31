import Link from 'next/link';

const EXAM_TRACKS = [
  {
    id: 'jee',
    stageNum: '01',
    category: 'Engineering Entrance',
    title: 'JEE Main & Advanced',
    focus: 'Physics, Chemistry & Mathematics Preparation',
    desc: 'Structured 90-minute simulation blocks, SM-2 formula flashcards, and ranker focus lounges.',
    accent: '#0F172A',
    accentLight: '#F1F5F9',
    accentBorder: '#CBD5E1',
    ctaLink: '/exams/jee',
    ctaText: 'Explore JEE Preparation',
    capabilities: [
      {
        label: 'Physics, Chemistry & Mathematics Preparation',
        detail: 'Organize high-yield syllabus roadmaps across all three subjects with formula weightage tracking.',
      },
      {
        label: 'Focus Sessions & Study Planning',
        detail: '90-minute exam simulation blocks calibrated to actual 3-hour problem-solving stamina.',
      },
      {
        label: 'Formula Flashcards & Revision Tools',
        detail: 'SM-2 spaced repetition queues for Physics derivations and Math theorem retention.',
      },
      {
        label: 'Study Progress & Syllabus Tracking',
        detail: 'Chapter completion metrics and silent multiplayer study rooms for daily discipline.',
      },
    ],
  },
  {
    id: 'neet',
    stageNum: '02',
    category: 'Medical Entrance',
    title: 'NEET UG & PG',
    focus: 'Biology, Physics & Chemistry Preparation',
    desc: 'NCERT line-by-line active recall flashcards, Organic Chemistry reactions, and 12-hour routine blocks.',
    accent: '#0F172A',
    accentLight: '#F1F5F9',
    accentBorder: '#CBD5E1',
    ctaLink: '/exams/neet',
    ctaText: 'Explore NEET Preparation',
    capabilities: [
      {
        label: 'Biology, Physics & Chemistry Preparation',
        detail: 'Structured daily balance covering NCERT Biology lines, reaction mechanisms, and numericals.',
      },
      {
        label: 'Revision & Flashcard Workflows',
        detail: 'Active recall review queues targeted for 360/360 in Biology without passive rereading.',
      },
      {
        label: 'Study Planning & Routine Blocks',
        detail: '12-hour daily timetable templates backed by emergency streak freeze tokens.',
      },
      {
        label: 'Syllabus Coverage Tracking',
        detail: 'High-yield chapter completion tracking to guarantee zero gaps before mock tests.',
      },
    ],
  },
  {
    id: 'upsc',
    stageNum: '03',
    category: 'Civil Services',
    title: 'UPSC Civil Services',
    focus: 'Subject-Wise Planning & Mains Writing',
    desc: 'Strict 7-min & 11-min answer stopwatches, Constitutional Articles recall, and Prelims countdowns.',
    accent: '#0F172A',
    accentLight: '#F1F5F9',
    accentBorder: '#CBD5E1',
    ctaLink: '/exams/upsc',
    ctaText: 'Explore UPSC Preparation',
    capabilities: [
      {
        label: 'Subject-Wise Preparation Planning',
        detail: 'Roadmaps across GS1-4, Optionals, and daily current affairs revision blocks.',
      },
      {
        label: 'Polity & Articles Revision Workflows',
        detail: 'Spaced repetition flashcards for Constitutional Articles, Amendments & landmark Cases.',
      },
      {
        label: 'Answer-Writing Practice Stopwatches',
        detail: 'Dedicated 7-min (10-marker) and 11-min (15-marker) countdown timers for Mains writing drills.',
      },
      {
        label: 'Study Sessions & Progress Tracking',
        detail: 'Daily deep work logging and Prelims syllabus completion checklists with streak shields.',
      },
    ],
  },
];

export default function InteractiveExamShowcase() {
  return (
    <section className="exam-prep-section" id="exam-systems" aria-label="Tailored Preparation Systems">
      <div className="container">
        {/* Section A — Hero Header & Direct Exam Navigation */}
        <div className="reveal exam-prep-header">
          <div className="section-eyebrow">TAILORED PREPARATION SYSTEMS</div>
          <h2 className="section-h2">Prepare With a Plan. Progress With Purpose.</h2>
          <p className="section-desc exam-prep-subtitle">
            A structured study experience for competitive exam aspirants, with tools to organize preparation, manage focus, and track progress.
          </p>

          {/* Exam Navigation Pills (Redirecting to Dedicated Exam Pages) */}
          <div className="exam-nav-pills-bar" aria-label="Exam Pages Navigation">
            <Link href="/exams/jee" className="exam-nav-link-pill pill-jee">
              <span className="exam-nav-pill-dot" style={{ background: '#0F172A' }} />
              <span className="exam-nav-pill-title">JEE</span>
              <span className="exam-nav-pill-arrow" aria-hidden="true">↗</span>
            </Link>
            <Link href="/exams/neet" className="exam-nav-link-pill pill-neet">
              <span className="exam-nav-pill-dot" style={{ background: '#0F172A' }} />
              <span className="exam-nav-pill-title">NEET</span>
              <span className="exam-nav-pill-arrow" aria-hidden="true">↗</span>
            </Link>
            <Link href="/exams/upsc" className="exam-nav-link-pill pill-upsc">
              <span className="exam-nav-pill-dot" style={{ background: '#0F172A' }} />
              <span className="exam-nav-pill-title">UPSC</span>
              <span className="exam-nav-pill-arrow" aria-hidden="true">↗</span>
            </Link>
            <Link href="/features" className="exam-nav-link-pill pill-other">
              <span className="exam-nav-pill-dot" style={{ background: '#0F172A' }} />
              <span className="exam-nav-pill-title">Other Exams</span>
              <span className="exam-nav-pill-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Section B — Continuous Timeline Pathway (Cardless Sequential System) */}
        <div className="exam-timeline-wrapper">
          {/* Continuous Illuminated Spine */}
          <div className="exam-timeline-spine" aria-hidden="true" />

          {EXAM_TRACKS.map((track, idx) => (
            <article
              key={track.id}
              id={`pathway-${track.id}`}
              className={`exam-timeline-stage reveal ${idx === 1 ? 'reveal-delay-1' : idx === 2 ? 'reveal-delay-2' : ''}`}
              style={{
                '--stage-accent': track.accent,
                '--stage-light': track.accentLight,
                '--stage-border': track.accentBorder,
              }}
            >
              {/* Timeline Node Column */}
              <div className="exam-stage-marker" aria-hidden="true">
                <div className="exam-stage-node">
                  <span className="exam-stage-node-num">{track.stageNum}</span>
                  <span className="exam-stage-node-pulse" />
                </div>
              </div>

              {/* Timeline Stage Body (Open & Cardless) */}
              <div className="exam-stage-body">
                {/* Stage Header Info */}
                <div className="exam-stage-meta-row">
                  <span className="exam-stage-badge">
                    <span className="exam-stage-badge-dot" />
                    {track.category}
                  </span>
                  <span className="exam-stage-path-code">PATHWAY {track.stageNum}</span>
                </div>

                <div className="exam-stage-title-group">
                  <h3 className="exam-stage-title">{track.title}</h3>
                  <div className="exam-stage-focus">{track.focus}</div>
                  <p className="exam-stage-desc">{track.desc}</p>
                </div>

                {/* 4 Milestones Timeline Grid */}
                <div className="exam-stage-milestones">
                  {track.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="exam-milestone-item">
                      <div className="exam-milestone-marker-row">
                        <span className="exam-milestone-num">0{cIdx + 1}</span>
                        <span className="exam-milestone-title">{cap.label}</span>
                      </div>
                      <p className="exam-milestone-detail">{cap.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Dedicated Direct Redirect CTA */}
                <div className="exam-stage-footer">
                  <Link href={track.ctaLink} className="exam-stage-cta-btn">
                    <span>{track.ctaText}</span>
                    <span className="exam-stage-cta-arrow" aria-hidden="true">→</span>
                  </Link>
                  <span className="exam-stage-footer-note">
                    Direct access to specialized exam timers, syllabus roadmaps &amp; flashcards
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Other Exams Footer Callout & Centered CTA Button */}
        <div className="exam-timeline-more reveal">
          <p className="exam-timeline-more-text">
            Preparing for CAT, GATE, NEET-PG, or State PSCs?
          </p>
          <div className="exam-timeline-more-btn-wrap">
            <Link href="/features" className="exam-timeline-cta-btn">
              <span>Explore all flexible study tools &amp; custom schedules</span>
              <span className="exam-timeline-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
