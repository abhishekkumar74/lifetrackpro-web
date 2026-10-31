import Link from 'next/link';
import { 
  TimerIcon, 
  CardsIcon, 
  HabitFlameIcon, 
  CalculatorIcon, 
  SparklesIcon, 
  TargetIcon,
  HelpCircleIcon
} from '@/components/Icons';
import PlayStoreIcon from '@/components/PlayStoreIcon';
import InteractiveStudyRooms from '@/components/InteractiveStudyRooms';

export const metadata = {
  title: 'Virtual Study Rooms & Online Study Groups for Students',
  description: 'Join silent virtual study rooms and online study groups. Practice body doubling with synchronized Pomodoro sessions, ambient audio, and zero video fatigue.',
  keywords: [
    'virtual study rooms',
    'online study groups',
    'body doubling for students',
    'silent study room online',
    'study with me live',
    'pomodoro study group',
    'virtual study space',
    'adhd body doubling study app',
    'camera free study room',
    'jee virtual study room',
    'neet online study group',
    'upsc focus room',
    'lifetrack pro study rooms'
  ],
  alternates: {
    canonical: 'https://lifetrackpro.in/features/study-rooms',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Virtual Study Rooms & Online Study Groups for Students | LifeTrack Pro',
    description: 'Practice virtual body doubling in silent study rooms. Synchronized Pomodoro timers, ambient soundscapes, and focused peer accountability without video fatigue.',
    url: 'https://lifetrackpro.in/features/study-rooms',
    siteName: 'LifeTrack Pro',
    locale: 'en_IN',
    type: 'article',
    images: [
      {
        url: 'https://lifetrackpro.in/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro Silent Virtual Study Rooms and Student Focus Sessions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Study Rooms & Online Study Groups | LifeTrack Pro',
    description: 'Silent virtual study rooms with synchronized Pomodoro timers and ambient audio. Pure body doubling focus with zero video fatigue.',
    images: ['https://lifetrackpro.in/play_store_feature_graphic.png'],
    creator: '@LifeTrackPro',
  },
};

export default function StudyRoomsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://lifetrackpro.in/features/study-rooms#webpage",
        "url": "https://lifetrackpro.in/features/study-rooms",
        "name": "Virtual Study Rooms & Online Study Groups for Students | LifeTrack Pro",
        "description": "Silent virtual study rooms and online study groups engineered for student body doubling, synchronized Pomodoro focus blocks, and zero video fatigue.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://lifetrackpro.in/#website",
          "url": "https://lifetrackpro.in/",
          "name": "LifeTrack Pro"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifetrackpro.in/" },
          { "@type": "ListItem", "position": 2, "name": "Features Hub", "item": "https://lifetrackpro.in/features" },
          { "@type": "ListItem", "position": 3, "name": "Study Rooms", "item": "https://lifetrackpro.in/features/study-rooms" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a virtual study room and how does it help students focus?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A virtual study room is an online, structured focus environment where students work independently alongside each other. By synchronizing study and break intervals with focused peers, students experience quiet social accountability that overcomes procrastination and isolation without the interruptions of casual group chats."
            }
          },
          {
            "@type": "Question",
            "name": "What is body doubling and why is it effective for studying?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Body doubling is a recognized productivity and focus technique where the presence of another focused individual keeps you anchored to your task. It is widely used by students and individuals with ADHD to lower task resistance, reduce boredom, eliminate doomscrolling, and maintain sustained concentration during difficult academic sessions."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need a camera or microphone to use LifeTrack Pro study rooms?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. LifeTrack Pro is 100% camera-free and microphone-free. We deliberately avoid video feeds to protect student privacy, reduce mobile data and battery drain, and prevent 'Zoom fatigue' and performance anxiety. You receive all the accountability of a university library without feeling watched."
            }
          },
          {
            "@type": "Question",
            "name": "How do synchronized Pomodoro timers work in focus sessions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Focus sessions use synchronized intervals (such as 25/5 or 50/10 minute blocks). Starting and finishing intervals alongside study themes establishes structured study rhythms, encouraging deep immersion followed by timely mental recovery."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use virtual study rooms for competitive exams like JEE, NEET, and UPSC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. LifeTrack Pro offers exam-themed rooms tailored for rigorous preparations including IIT JEE numerical problem solving, NEET biology active recall, and UPSC GS answer writing sprints."
            }
          },
          {
            "@type": "Question",
            "name": "Does the interactive study room widget on this web page show real-time user data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The interactive web widget is a client-side simulation demonstrating room themes, soundscapes (such as 432Hz binaural beats and rain), and synchronized countdown clocks. The LifeTrack Pro mobile application provides the actual distraction-free focus environment with background audio persistence on your device."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container subpage-container">
        <div>
          {/* Visual Semantic Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/features" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Features</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Study Rooms</span>
          </nav>

          <div className="section-eyebrow">Silent Focus &amp; Body Doubling</div>
          <h1 className="subpage-h1">Virtual Study Rooms &amp; Online Study Groups for Deep Student Focus</h1>
          
          <p className="subpage-lead">
            Solo studying often triggers isolation, wandering attention, and doomscrolling. LifeTrack Pro brings the quiet social accountability of a premier university library directly to your device with silent virtual study rooms, structured focus sessions, and camera-free body doubling.
          </p>

          {/* Interactive Study Rooms Simulator Widget */}
          <section aria-label="Interactive Study Room Demonstration">
            <InteractiveStudyRooms />
            <p style={{ fontSize: '12px', color: 'var(--text-3)', textAlign: 'center', marginTop: '-14px', marginBottom: '24px' }}>
              Interactive Demonstration: Preview silent room themes, acoustic soundscapes, and synchronized interval pacing.
            </p>
          </section>

          {/* Educational Science Section on Body Doubling */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              The Science of Body Doubling: Why Studying Alongside Peers Prevents Procrastination
            </h2>
            <p className="content-card-p">
              <strong>Body doubling</strong> is a well-established cognitive focus technique where working in the quiet presence of others anchors your executive function. When studying alone in a bedroom or hostel room, low dopamine and task inertia frequently lead to procrastination, tab-switching, and phone checks.
            </p>
            <p className="content-card-p">
              Behavioral researchers link this to the <em>Hawthorne Effect</em> and social facilitation theory: humans instinctively maintain higher discipline and diligence when aware of shared academic effort. LifeTrack Pro recreates this psychological anchor virtually without the social anxiety or awkwardness of open webcams.
            </p>
            <ul className="content-card-list">
              <li>✓ <strong>Lowers Task Initiation Friction:</strong> Knowing that other students are quietly logging focus blocks makes cracking open difficult textbooks significantly easier.</li>
              <li>✓ <strong>Effective for ADHD &amp; Procrastination:</strong> Body doubling provides external structure that keeps wandering attention anchored on current problem sets.</li>
              <li>✓ <strong>Zero Performance Anxiety:</strong> Camera-free study spaces eliminate self-consciousness, allowing you to study comfortably in your own space without worrying about how you look on video.</li>
              <li>✓ <strong>Reinforces Daily Momentum:</strong> Completed focus sessions feed directly into your <Link href="/features/habit-tracker" style={{ color: 'var(--primary)', fontWeight: 600 }}>daily habit streaks</Link> to build long-term consistency.</li>
            </ul>
          </div>

          {/* How LifeTrack Pro Focus Rooms Actually Work */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              How LifeTrack Pro Focus Rooms Work: Pure Focus, Zero Distractions
            </h2>
            <p className="content-card-p">
              Many online study groups fail because they rely on open voice channels or busy chat streams that create more distractions than they solve. LifeTrack Pro is deliberately designed around distraction-free focus:
            </p>
            <ul className="content-card-list">
              <li>• <strong>100% Silent &amp; Camera-Free:</strong> No intrusive video feeds, no open microphones, and no side-conversations. You get the calm reassurance of mutual dedication without interruptions.</li>
              <li>• <strong>Synchronized Pomodoro Cadences:</strong> Integrated with our <Link href="/features/pomodoro-timer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Pomodoro Focus Timer</Link>. Choose between 25/5 short sprints or 50/10 marathon intervals so study blocks and mental recovery periods remain structured.</li>
              <li>• <strong>Built-In Acoustic Masking:</strong> Immerse yourself in built-in focus soundscapes including 432Hz binaural tones, gentle rainfall, café white noise, and soothing lo-fi beats that run smoothly in the background.</li>
              <li>• <strong>Battery &amp; Bandwidth Friendly:</strong> Because there are no power-hungry video streams or resource-heavy background processes, study sessions consume minimal mobile data and preserve battery life during full-day library marathons.</li>
              <li>• <strong>Dedicated Exam Themes:</strong> Choose rooms tailored to your exact academic focus, from competitive syllabus marathons to late-night revision sessions.</li>
            </ul>
          </div>

          {/* Comparison Matrix: LifeTrack Pro vs Video Calls & Discord */}
          <div className="content-card reveal" style={{ overflowX: 'auto' }}>
            <h2 className="content-card-h2">Virtual Study Rooms vs. Discord &amp; Zoom: Why Silent Focus Wins</h2>
            <p className="content-card-p">
              See why dedicated silent study rooms provide far superior focus compared to general-purpose meeting apps and chat servers:
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', marginTop: '12px' }} aria-label="Virtual Study Room Comparison">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-mid)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', color: 'var(--text-1)' }}>Feature</th>
                  <th style={{ padding: '8px 12px', color: 'var(--primary)', fontWeight: 700 }}>LifeTrack Pro Silent Rooms</th>
                  <th style={{ padding: '8px 12px', color: 'var(--text-3)' }}>Zoom / Google Meet</th>
                  <th style={{ padding: '8px 12px', color: 'var(--text-3)' }}>Discord / WhatsApp Groups</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>Camera / Video Pressure</td>
                  <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>✓ 100% Camera-Free</td>
                  <td style={{ padding: '10px 12px', color: 'var(--rose)' }}>Webcam Required / Pressure</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-3)' }}>Optional / Mixed</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>Chat &amp; Notification Distractions</td>
                  <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>✓ Zero Text Spam</td>
                  <td style={{ padding: '10px 12px', color: 'var(--amber)' }}>In-Meeting Chat Pings</td>
                  <td style={{ padding: '10px 12px', color: 'var(--rose)' }}>Constant Memes &amp; Chats</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>Cognitive Zoom Fatigue</td>
                  <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>✓ None</td>
                  <td style={{ padding: '10px 12px', color: 'var(--rose)' }}>High Self-Consciousness</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-3)' }}>Moderate</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>Integrated Pomodoro &amp; Soundscapes</td>
                  <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>✓ Native Built-In</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-3)' }}>✕ None (External App)</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-3)' }}>Requires Bot Setup</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>Mobile Data &amp; Battery Drain</td>
                  <td style={{ padding: '10px 12px', color: 'var(--emerald)', fontWeight: 700 }}>✓ Minimal (&lt; 2% / hr)</td>
                  <td style={{ padding: '10px 12px', color: 'var(--rose)' }}>Heavy (Video Streaming)</td>
                  <td style={{ padding: '10px 12px', color: 'var(--amber)' }}>Moderate</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tailored Online Study Groups for Major Competitive Exams */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Tailored Online Study Groups for Competitive Exam Aspirants
            </h2>
            <p className="content-card-p">
              Competitive exam preparation requires rigorous, multi-hour focus blocks. LifeTrack Pro study rooms align with the demanding preparation schedules of India&apos;s toughest examinations:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginTop: '14px' }}>
              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <TargetIcon size={16} />
                  <span>IIT JEE Problem Solving</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: '10px' }}>
                  Engage in uninterrupted 50-minute and 90-minute numerical sprints for Mechanics, Calculus, and Organic Chemistry alongside serious aspirants.
                </p>
                <Link href="/exams/jee" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>
                  Explore JEE Study Planner →
                </Link>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <CardsIcon size={16} />
                  <span>NEET Biology Recall</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: '10px' }}>
                  Pair silent study blocks with rapid NCERT active recall and botanical classification reviews to maximize biological memory retention.
                </p>
                <Link href="/exams/neet" style={{ color: 'var(--emerald)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>
                  Explore NEET Routine →
                </Link>
              </div>

              <div style={{ background: 'var(--bg-cream)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--amber)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <TimerIcon size={16} />
                  <span>UPSC Answer Writing</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: '10px' }}>
                  Practice disciplined, timed GS Paper answer writing sprints and editorial analysis with zero interruptions from casual chat pings.
                </p>
                <Link href="/exams/upsc" style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>
                  Explore UPSC Focus Hub →
                </Link>
              </div>
            </div>
          </div>

          {/* Connected Life OS Ecosystem */}
          <div className="content-card reveal">
            <h2 className="content-card-h2">
              Part of Your Complete LifeTrack Pro Study OS
            </h2>
            <p className="content-card-p">
              Virtual study rooms are tightly integrated with the rest of the <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>LifeTrack Pro</Link> ecosystem. Everything you do works together to build lasting academic discipline:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '12px' }}>
              <Link href="/features/pomodoro-timer" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <TimerIcon size={15} /> Pomodoro Timer
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Customizable 25/5 and 50/10 focus intervals with acoustic soundscapes and zero ads.
                  </p>
                </div>
              </Link>

              <Link href="/features/spaced-repetition" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CardsIcon size={15} /> SM-2 Flashcards
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Automated active recall queues scheduled scientifically before forgetting occurs.
                  </p>
                </div>
              </Link>

              <Link href="/features/habit-tracker" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <HabitFlameIcon size={15} /> Habit Streak Shields
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Turn daily study targets into unbroken streaks protected by streak freeze shields.
                  </p>
                </div>
              </Link>

              <Link href="/calculator" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-cream)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sky)', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <CalculatorIcon size={15} /> Focus ROI Calculator
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-2)', margin: 0, lineHeight: '1.45' }}>
                    Calculate exactly how many distracted hours you reclaim each month.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="content-card reveal reveal-delay-1">
            <h2 className="content-card-h2">
              Frequently Asked Questions About Virtual Study Rooms
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  What is a virtual study room and how does it help students focus?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  A virtual study room is an online, structured focus environment where students work independently alongside each other. By synchronizing study and break intervals with focused peers, students experience quiet social accountability that overcomes procrastination and isolation without the interruptions of casual group chats.
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  What is body doubling and why is it effective for studying?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  Body doubling is a recognized productivity and focus technique where the presence of another focused individual keeps you anchored to your task. It is widely used by students and individuals with ADHD to lower task resistance, reduce boredom, eliminate doomscrolling, and maintain sustained concentration during difficult academic sessions.
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  Do I need a camera or microphone to use LifeTrack Pro study rooms?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  No. LifeTrack Pro is 100% camera-free and microphone-free. We deliberately avoid video feeds to protect student privacy, reduce mobile data and battery drain, and prevent &apos;Zoom fatigue&apos; and performance anxiety. You receive all the accountability of a university library without feeling watched.
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  How do synchronized Pomodoro timers work in focus sessions?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  Focus sessions use synchronized intervals (such as 25/5 or 50/10 minute blocks). Starting and finishing intervals alongside study themes establishes structured study rhythms, encouraging deep immersion followed by timely mental recovery.
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  Can I use virtual study rooms for competitive exams like JEE, NEET, and UPSC?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  Yes. LifeTrack Pro offers exam-themed rooms tailored for rigorous preparations including IIT JEE numerical problem solving, NEET biology active recall, and UPSC GS answer writing sprints.
                </p>
              </div>

              <div className="content-card-faq" style={{ margin: 0 }}>
                <h3 className="content-card-faq-h3">
                  Does the interactive study room widget on this web page show real-time user data?
                </h3>
                <p className="content-card-p" style={{ marginBottom: 0 }}>
                  The interactive web widget is a client-side simulation demonstrating room themes, soundscapes (such as 432Hz binaural beats and rain), and synchronized countdown clocks. The LifeTrack Pro mobile application provides the actual distraction-free focus environment with background audio persistence on your device.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTAs */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '24px' }}>
            <a 
              href="https://play.google.com/store/apps/details?id=com.lifetrackpro.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-main" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <PlayStoreIcon size={16} />
              <span>Get LifeTrack Pro on Play Store</span>
            </a>
            <Link href="/calculator" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <CalculatorIcon size={16} />
              <span>Calculate Reclaimed Focus Hours</span>
            </Link>
            <Link href="/features" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon size={16} />
              <span>Explore All Features</span>
            </Link>
            <Link href="/faq" className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircleIcon size={16} />
              <span>Student FAQ</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
