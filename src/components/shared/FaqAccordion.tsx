"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export interface FaqItem {
  question?: string
  q?: string
  answer?: string
  a?: string
  category?: string
}

export interface FaqAccordionProps {
  title?: string
  subtitle?: string
  items: FaqItem[]
  defaultValue?: string
  className?: string
  containerClassName?: string
}

export default function FaqAccordion({
  title,
  subtitle,
  items = [],
  defaultValue = "item-0",
  className,
  containerClassName,
}: FaqAccordionProps) {
  if (!items || items.length === 0) return null

  return (
    <div
      className={cn(
        "faq-card-container rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm",
        containerClassName
      )}
    >
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

      <Accordion
        type="single"
        collapsible
        defaultValue={defaultValue}
        className={cn("faq-accordion w-full", className)}
      >
        {items.map((item, idx) => {
          const question = item.question || item.q || ""
          const answer = item.answer || item.a || ""
          const itemKey = `item-${idx}`

          return (
            <AccordionItem
              key={itemKey}
              value={itemKey}
              className="faq-accordion-item border-b border-slate-200/80 last:border-b-0"
            >
              <AccordionTrigger className="faq-accordion-trigger text-left font-semibold text-base sm:text-lg text-slate-900 hover:no-underline py-4">
                {question}
              </AccordionTrigger>
              <AccordionContent className="faq-accordion-content text-slate-600 text-sm sm:text-base leading-relaxed pb-4">
                {answer}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
export { FaqAccordion }
