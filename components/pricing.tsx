'use client'

import React, { useState } from 'react'
import { Check, X } from 'lucide-react'
import { useLanguage } from './language-provider'
import { CheckoutModal } from './checkout-modal'

export function Pricing() {
  const { t } = useLanguage()
  const pricingT = t.pricing

  const [selectedPlan, setSelectedPlan] = useState<{
    name: string
    price: string
  } | null>(null)

  const handleOpenCheckout = (name: string, price: string) => {
    setSelectedPlan({ name, price: `${price}/mois` })
  }

  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-2">
            {pricingT.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {pricingT.title}
          </h2>
          <p className="mt-4 text-base text-slate-400">
            {pricingT.subtitle}
          </p>
        </div>

        {/* Grille des cartes de tarifs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingT.plans.map((plan, index) => {
            const isHighlighted = index === 1 // Offre Pro mise en avant

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all ${
                  isHighlighted
                    ? 'bg-slate-900/90 border-2 border-orange-500 shadow-2xl shadow-orange-500/10'
                    : 'bg-slate-900/40 border border-slate-800'
                }`}
              >
                {/* Badge d'aide à la décision */}
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    {pricingT.badgeHighlighted}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-400 min-h-[32px] mb-6">{plan.tagline}</p>

                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-extrabold tracking-tight text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">
                      {plan.period}
                    </span>
                  </div>

                  {/* Liste des fonctionnalités */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat.label} className="flex items-start text-xs">
                        {feat.ok ? (
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mr-3 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-slate-600 shrink-0 mr-3 mt-0.5" />
                        )}
                        <span className={feat.ok ? 'text-slate-200' : 'text-slate-500 line-through'}>
                          {feat.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bouton CTA */}
                <button
                  onClick={() => handleOpenCheckout(plan.name, plan.price)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md ${
                    isHighlighted
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pop-up Checkout */}
      <CheckoutModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        planName={selectedPlan?.name || ''}
        planPrice={selectedPlan?.price || ''}
      />
    </section>
  )
}