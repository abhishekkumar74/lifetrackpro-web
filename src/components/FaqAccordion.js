'use client';
import { useState } from 'react';
import { ALL_FAQS } from '@/data/faqs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FaqAccordion({ title, subtitle, items, defaultValue = 'item-0', containerClassName = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // If specific items are provided, render as standalone accordion component
  if (items && items.length > 0) {
    return (
      <div className={`faq-card-container rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm ${containerClassName}`}>
        {title && (
          <div className="faq-card-header mb-6">
            <h2 className="faq-card-title text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="faq-card-subtitle mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <Accordion type="single" collapsible defaultValue={defaultValue} className="faq-accordion w-full">
          {items.map((item, idx) => {
            const question = item.question || item.q || '';
            const answer = item.answer || item.a || '';
            const itemKey = `item-${idx}`;
            return (
              <AccordionItem key={itemKey} value={itemKey} className="faq-accordion-item border-b border-slate-200/80 last:border-b-0">
                <AccordionTrigger className="faq-accordion-trigger text-left font-semibold text-base sm:text-lg text-slate-900 hover:no-underline py-4">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="faq-accordion-content text-slate-600 text-sm sm:text-base leading-relaxed pb-4">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  }

  // Otherwise, render full searchable FAQ hub with category pills (for /faq page)
  const categories = ['All', 'Features', 'Spaced Repetition', 'Exams', 'Platforms & Privacy'];

  const filteredFaqs = ALL_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h2 className="sr-only">Knowledge Base Questions and Answers</h2>
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
      <div className="faq-card-container rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        {filteredFaqs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-3)', fontSize: '13px' }}>
            No questions found matching &quot;{searchQuery}&quot;. Try another keyword or reset category filter.
          </div>
        ) : (
          <Accordion type="single" collapsible defaultValue="item-0" className="faq-accordion w-full">
            {filteredFaqs.map((faq, index) => {
              const itemKey = `item-${index}`;
              return (
                <AccordionItem key={faq.q} value={itemKey} className="faq-accordion-item border-b border-slate-200/80 last:border-b-0">
                  <AccordionTrigger className="faq-accordion-trigger text-left font-semibold text-base sm:text-lg text-slate-900 hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="faq-accordion-content text-slate-600 text-sm sm:text-base leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
}
