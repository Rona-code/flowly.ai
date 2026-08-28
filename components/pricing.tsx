'use client'

import { Check, X } from 'lucide-react'
import { ConfettiButton } from './confetti-provider'

const PLANS = [
  {
    name: 'Gratuit',
    price: '0€',
    period: '/mois',
    tagline: 'Pour ceux qui veulent ne rien avoir, gratuitement.',
    highlighted: false,
    cta: 'Ne rien commencer',
    features: [
      { label: 'Accès à 0 fonctionnalité', ok: true },
      { label: '1 confetti par semaine', ok: true },
      { label: 'Support par pigeon voyageur', ok: false },
      { label: 'Réponses de l\u2019IA', ok: false },
    ],
  },
  {
    name: 'Pro',
    price: '499€',
    period: '/mois',
    tagline: 'Notre offre la plus populaire (personne ne le sait pourquoi).',
    highlighted: true,
    cta: 'Passer Pro maintenant',
    features: [
      { label: 'Toujours 0 fonctionnalité, mais en gras', ok: true },
      { label: 'Confettis illimités au clic', ok: true },
      { label: 'IA qui répond n\u2019importe quoi', ok: true },
      { label: 'Badge « Pro » invisible', ok: true },
      { label: 'Remboursement', ok: false },
    ],
  },
  {
    name: 'Entreprise',
    price: '499€',
    period: '/mois/employé/lundi',
    tagline: 'Pour scaler le néant à l\u2019échelle de toute votre organisation.',
    highlighted: false,
    cta: 'Contacter un commercial fictif',
    features: [
      { label: 'Tout le plan Pro, en double', ok: true },
      { label: 'Facture de 34 pages', ok: true },
      { label: 'Un account manager qui ignore vos mails', ok: true },
      { label: 'SLA de 12%', ok: true },
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
          Tarifs
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Des prix simples, transparents et complètement déraisonnables
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          Un seul chiffre à retenir : 499€/mois. Facturé annuellement, mensuellement,
          et une troisième fois pour le plaisir.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.highlighted
                ? 'relative rounded-2xl border-2 border-primary bg-card p-8 shadow-2xl shadow-primary/10 lg:-mt-4 lg:mb-4'
                : 'relative rounded-2xl border border-border bg-card/50 p-8'
            }
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Le plus débile
              </span>
            )}

            <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
            <p className="mt-2 min-h-10 text-sm text-muted-foreground">
              {plan.tagline}
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold tracking-tight">
                {plan.price}
              </span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>

            <ConfettiButton
              className={
                plan.highlighted
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
                      feat.ok
                        ? 'text-foreground/90'
                        : 'text-muted-foreground/60 line-through'
                    }
                  >
                    {feat.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
