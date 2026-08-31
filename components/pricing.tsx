'use client'

import { Check, X } from 'lucide-react'
import { ConfettiButton } from './confetti-provider'
import { useLanguage } from './language-provider'

export function Pricing() {
  const { t } = useLanguage()

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
          {t.pricing.tag}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {t.pricing.title}
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">{t.pricing.subtitle}</p>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {t.pricing.plans.map((plan, i) => {
          const isHighlighted = i === 1
          return (
            <div
              key={plan.name}
              className={
                isHighlighted
                  ? 'relative flex flex-col justify-between rounded-2xl border-2 border-primary bg-card p-8 shadow-2xl shadow-primary/10'
                  : 'relative flex flex-col justify-between rounded-2xl border border-border bg-card/50 p-8'
              }
            >
              {isHighlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {t.pricing.badgeHighlighted}
                </span>
              )}

              <div>
                <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 min-h-12 text-sm text-muted-foreground">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>

                <ConfettiButton
                  className={
                    isHighlighted
                      ? 'mt-6 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95'
                      : 'mt-6 w-full rounded-xl border border-border bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-muted'
                  }
                >
                  {plan.cta}
                </ConfettiButton>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat.label} className="flex items-start gap-3 text-sm">
                      {feat.ok ? (
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      ) : (
                        <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
                      )}
                      <span
                        className={
                          feat.ok ? 'text-foreground/90' : 'text-muted-foreground/60 line-through'
                        }
                      >
                        {feat.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}