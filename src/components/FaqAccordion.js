'use client';
import { useState } from 'react';
import { ChevronRightIcon } from './Icons';
import { ALL_FAQS } from '@/data/faqs';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Features', 'Spaced Repetition', 'Exams', 'Platforms & Privacy'];

  const filteredFaqs = ALL_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search & Filter Bar */}
      <div style={{ marginBottom: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="Search question or keyword (e.g. SM-2, offline, streak, free)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search question or keyword"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 'var(--radius-xs)',
            border: '1.5px solid var(--border-subtle)',
            fontSize: '13px',
            background: '#FFFFFF',
            color: 'var(--text-1)',
            boxShadow: 'var(--shadow-sm)',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
        />

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }} role="group" aria-label="FAQ Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              style={{
                background: activeCategory === cat ? 'var(--primary-soft)' : '#FFFFFF',
                color: activeCategory === cat ? 'var(--primary)' : 'var(--text-2)',
                border: `1.5px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border-subtle)'}`,
                borderRadius: '100px',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: activeCategory === cat ? 750 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Container */}
      <div className="faq-container">
        {filteredFaqs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-3)', fontSize: '13px' }}>
            No questions found matching &quot;{searchQuery}&quot;. Try another keyword or reset category filter.
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const itemKey = `faq-item-${index}`;
            return (
              <div key={faq.q} className={`faq-item ${isOpen ? 'active' : ''}`} style={{ background: '#FFFFFF' }}>
                <button 
                  id={`${itemKey}-btn`}
                  type="button"
                  className="faq-question-btn" 
                  aria-expanded={isOpen}
                  aria-controls={`${itemKey}-panel`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '13.5px', fontWeight: 650, color: 'var(--text-1)', paddingRight: '12px' }}>
                    {faq.q}
                  </span>
                  <span style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: 'var(--text-3)', display: 'inline-flex' }}>
                    <ChevronRightIcon size={14} />
                  </span>
                </button>
                {isOpen && (
                  <div 
                    id={`${itemKey}-panel`}
                    role="region"
                    aria-labelledby={`${itemKey}-btn`}
                    className="faq-answer" 
                    style={{ padding: '0 18px 16px', fontSize: '12.5px', color: 'var(--text-2)', lineHeight: '1.6' }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
