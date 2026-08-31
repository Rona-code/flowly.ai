'use client'

import { Sparkles } from 'lucide-react'
import { ConfettiButton } from './confetti-provider'
import { useLanguage } from './language-provider'

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-12 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-primary/10 blur-3xl"
          />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {t.footer.ctaTitle}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
            {t.footer.ctaSubtitle}
          </p>
          <ConfettiButton className="relative mt-8 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95">
            {t.footer.ctaButton}
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
            © {new Date().getFullYear()} Flowly.ai. {t.footer.rights}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              {t.footer.links.terms}
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              {t.footer.links.privacy}
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              {t.footer.links.status}
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}