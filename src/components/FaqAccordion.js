'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: "Is LifeTrack Pro free to use?",
    a: "Yes! The core functionality including the Pomodoro focus timer, active flashcards, daily habit streaks, and exam target progress is free forever with zero intrusive ads."
  },
  {
    q: "How does LifeTrack Pro compare to Anki and Forest?",
    a: "Anki is purely flashcards with an outdated desktop interface, and Forest is only a basic timer. LifeTrack Pro combines the proven SM-2 spaced repetition algorithm, custom focus timer with binaural audio, daily habit streaks, and live multiplayer study rooms into one modern interface."
  },
  {
    q: "Which platforms is LifeTrack Pro available on?",
    a: "LifeTrack Pro is currently live on Android via Google Play / APK and as a responsive Web App. The native iOS version for iPhone and iPad is currently in active testing."
  },
  {
    q: "Can I use LifeTrack Pro for non-exam goals?",
    a: "Absolutely. Many learners use LifeTrack Pro for learning languages, tracking daily workout streaks, reading books, coding interview preparation, and professional certifications."
  },
  {
    q: "Is my study data secure and private?",
    a: "Yes. All data is encrypted and stored securely using Supabase with row-level security. We never sell or share your study routines or personal metrics."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-container">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
            <button 
              className="faq-question-btn" 
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{faq.q}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-3)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}>
                ▼
              </span>
            </button>
            <div className="faq-answer">
              {faq.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
