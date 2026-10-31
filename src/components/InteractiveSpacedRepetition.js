'use client';
import { useState } from 'react';
import { CardsIcon } from './Icons';

export default function InteractiveSpacedRepetition() {
  const sampleCards = [
    {
      id: 1,
      subject: 'Physics (NEET / JEE)',
      question: 'What is the de Broglie wavelength formula for a particle of mass m with kinetic energy K?',
      answer: 'λ = h / p = h / √(2mK), where h is Planck\'s constant and p is momentum.',
      details: 'Critical in Dual Nature of Radiation & Matter (guaranteed 1-2 questions every year).'
    },
    {
      id: 2,
      subject: 'Biology (NEET)',
      question: 'In genetics, what is the phenotypic ratio of a dihybrid cross obeying Mendel\'s Law of Independent Assortment?',
      answer: '9 : 3 : 3 : 1 (Dominant-Dominant, Dominant-Recessive, Recessive-Dominant, Recessive-Recessive).',
      details: 'From NCERT Class 12, Principles of Inheritance & Variation.'
    },
    {
      id: 3,
      subject: 'Polity (UPSC Prelims)',
      question: 'Under which Constitutional Article does the Supreme Court have the power of judicial review of legislation?',
      answer: 'Article 13, read alongside Articles 32, 131-136, and Article 142.',
      details: 'Basic Structure Doctrine (Kesavananda Bharati v. State of Kerala, 1973).'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewsDone, setReviewsDone] = useState(0);
  const [calculatedInterval, setCalculatedInterval] = useState(null);

  const currentCard = sampleCards[currentIndex];

  const handleRating = (grade, intervalText, efText) => {
    setFlipped(false);
    setReviewsDone((r) => r + 1);
    setCalculatedInterval({ grade, intervalText, efText });
    setCurrentIndex((prev) => (prev + 1) % sampleCards.length);
  };

  return (
    <div className="interactive-widget-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '28px 24px', boxShadow: 'var(--shadow-md)', margin: '28px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', background: 'rgba(5,150,105,0.1)', color: 'var(--emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardsIcon size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 750, color: 'var(--text-1)' }}>Interactive SM-2 Algorithm Simulator</div>
            <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Card {currentIndex + 1} of {sampleCards.length} • {currentCard.subject}</div>
          </div>
        </div>

        <div style={{ fontSize: '11px', background: 'var(--bg-cream)', padding: '4px 10px', borderRadius: '100px', border: '1px solid var(--border-subtle)', color: 'var(--text-2)' }}>
          Session Reviews: <strong>{reviewsDone}</strong>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
        {/* Flashcard 3D Box */}
        <div>
          <div 
            className="flashcard-3d-box" 
            onClick={() => setFlipped(!flipped)}
            style={{ height: '220px', cursor: 'pointer', perspective: '1000px', margin: 0 }}
          >
            <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`} style={{ transition: 'transform 0.4s var(--ease-spring)' }}>
              {/* Front Face */}
              <div className="flashcard-front" style={{ background: 'var(--bg-warm)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-mid)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 750, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {currentCard.subject}
                  </span>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-3)' }}>Click card to flip</span>
                </div>

                <div style={{ fontSize: '14.5px', fontWeight: 650, color: 'var(--text-1)', lineHeight: '1.45', margin: 'auto 0' }}>
                  {currentCard.question}
                </div>

                <div style={{ fontSize: '10.5px', color: 'var(--text-3)', textAlign: 'center', borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px' }}>
                  Tap anywhere on card to reveal answer
                </div>
              </div>

              {/* Back Face */}
              <div className="flashcard-back" style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--emerald)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 750, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Correct Answer
                  </span>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-3)' }}>Click to flip back</span>
                </div>

                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-1)', lineHeight: '1.45', margin: 'auto 0' }}>
                  {currentCard.answer}
                  <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '6px', fontWeight: 400 }}>
                    {currentCard.details}
                  </div>
                </div>

                <div style={{ fontSize: '10.5px', color: 'var(--text-3)', textAlign: 'center', borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px' }}>
                  Rate your recall difficulty below
                </div>
              </div>
            </div>
          </div>

          {/* Rating Buttons */}
          <div style={{ marginTop: '14px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '6px', textAlign: 'center' }}>
              How easily did you recall this concept?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              <button 
                onClick={() => handleRating('Again', 'in 10 minutes', '2.30')}
                className="grade-btn grade-again"
                style={{ padding: '8px 4px', fontSize: '11px', borderRadius: 'var(--radius-xs)' }}
              >
                Again
                <span style={{ display: 'block', fontSize: '9px', opacity: 0.8 }}>10m</span>
              </button>
              <button 
                onClick={() => handleRating('Hard', 'in 12 hours', '2.44')}
                className="grade-btn grade-hard"
                style={{ padding: '8px 4px', fontSize: '11px', borderRadius: 'var(--radius-xs)' }}
              >
                Hard
                <span style={{ display: 'block', fontSize: '9px', opacity: 0.8 }}>12h</span>
              </button>
              <button 
                onClick={() => handleRating('Good', 'in 1 day', '2.50')}
                className="grade-btn grade-good"
                style={{ padding: '8px 4px', fontSize: '11px', borderRadius: 'var(--radius-xs)' }}
              >
                Good
                <span style={{ display: 'block', fontSize: '9px', opacity: 0.8 }}>1d</span>
              </button>
              <button 
                onClick={() => handleRating('Easy', 'in 4 days', '2.60')}
                className="grade-btn grade-easy"
                style={{ padding: '8px 4px', fontSize: '11px', borderRadius: 'var(--radius-xs)' }}
              >
                Easy
                <span style={{ display: 'block', fontSize: '9px', opacity: 0.8 }}>4d</span>
              </button>
            </div>
          </div>
        </div>

        {/* Algorithm Calculation Visualizer */}
        <div style={{ background: 'var(--bg-warm)', padding: '18px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 750, color: 'var(--text-1)', marginBottom: '8px' }}>
            Mathematical SM-2 Calculation
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--primary)', background: '#FFFFFF', padding: '8px 12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', marginBottom: '12px' }}>
            I(n) = I(n-1) × EF
          </div>

          {calculatedInterval ? (
            <div style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.25)', borderRadius: 'var(--radius-xs)', padding: '12px', marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--emerald)' }}>
                Recorded Rating: {calculatedInterval.grade}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-1)', marginTop: '4px' }}>
                Next Review Scheduled: <strong>{calculatedInterval.intervalText}</strong>
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-3)', marginTop: '2px' }}>
                Updated Ease Factor: {calculatedInterval.efText}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginBottom: '12px', lineHeight: '1.5' }}>
              Flip the card and rate recall difficulty above to simulate how the SM-2 engine calculates your next review interval.
            </div>
          )}

          <div style={{ fontSize: '11px', color: 'var(--text-2)', lineHeight: '1.55' }}>
            <strong>Why it matters:</strong> Without spaced repetition, 70% of facts are lost within 24 hours. The SM-2 algorithm reviews each concept right before the forgetting threshold, locking it into permanent long-term memory.
          </div>
        </div>
      </div>
    </div>
  );
}
