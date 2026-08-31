'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from './language-provider'

export function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
          {t.faq.tag}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t.faq.title}
        </h2>
        <p className="mt-4 text-muted-foreground">{t.faq.subtitle}</p>
      </div>

      <div className="space-y-4">
        {t.faq.items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={item.q}
              className="rounded-2xl border border-border bg-card/50 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left font-semibold"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`size-5 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}