'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { ConfettiButton } from './confetti-provider'
import { useLanguage } from './language-provider'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10rem] size-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-24 text-center md:pt-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          {t.hero.badge}
        </div>

        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
          {t.hero.titleStart}
          <span className="text-primary">{t.hero.titleHighlight}</span>
          {t.hero.titleEnd}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {t.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <ConfettiButton className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95">
            {t.hero.ctaPrimary}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </ConfettiButton>
          <ConfettiButton className="rounded-xl border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary">
            {t.hero.ctaSecondary}
          </ConfettiButton>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">{t.hero.subtext}</p>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
          <span>{t.hero.socialProof}</span>
          {['NimbusCorp', 'Zignals', 'Quantiqo', 'Pulsr', 'Vortex&Co'].map((name) => (
            <span key={name} className="font-display font-semibold text-foreground/60">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}