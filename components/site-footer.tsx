'use client'

import { Sparkles } from 'lucide-react'
import { ConfettiButton } from './confetti-provider'

export function SiteFooter() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-12 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-primary/10 blur-3xl"
          />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Prêt à ne rien changer à votre vie&nbsp;?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
            Rejoignez les 0 entreprises qui font déjà confiance à Flowly.ai pour
            ne strictement rien accomplir. Le premier clic est offert.
          </p>
          <ConfettiButton className="relative mt-8 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95">
            Cliquer pour des confettis
          </ConfettiButton>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" />
            </span>
            <span className="font-display font-bold">
              Flowly<span className="text-primary">.ai</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Flowly.ai. Aucun droit réservé, aucune
            fonctionnalité livrée.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Conditions
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Vie privée
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Statut (down)
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
