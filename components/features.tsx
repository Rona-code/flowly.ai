'use client'

import { Brain, CloudOff, Gauge, Infinity as InfinityIcon, ShieldCheck, Wand2 } from 'lucide-react'
import { useLanguage } from './language-provider'

const ICONS = [Brain, Gauge, CloudOff, InfinityIcon, ShieldCheck, Wand2]

export function Features() {
  const { t } = useLanguage()

  return (
    <section id="features" className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
            {t.features.tag}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {t.features.title}
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((f, i) => {
            const IconComponent = ICONS[i]
            return (
              <div
                key={f.title}
                className="group bg-background p-8 transition-colors hover:bg-card"
              >
                <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:-rotate-6">
                  <IconComponent className="size-5" />
                </span>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}