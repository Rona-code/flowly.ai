'use client'

import { useLanguage } from './language-provider'

export function Testimonials() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 border-t border-border/40">
      <div className="mb-16 text-center">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
          {t.testimonials.tag}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t.testimonials.title}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {t.testimonials.items.map((item) => (
          <div
            key={item.author}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card/40 p-6 shadow-sm"
          >
            <p className="text-sm italic text-foreground/90">« {item.quote} »</p>
            <div className="mt-6 pt-4 border-t border-border/40">
              <p className="font-semibold text-sm">{item.author}</p>
              <p className="text-xs text-muted-foreground">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}