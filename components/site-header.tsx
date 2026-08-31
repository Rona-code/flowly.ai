'use client'

import { Globe, Sparkles } from 'lucide-react'
import { ConfettiButton } from './confetti-provider'
import { useLanguage } from './language-provider'
import { VisitorCounter } from './visitor-counter'
import { Logo } from './logo'

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage()

  const NAV = [
    { label: t.nav.features, href: '#features' },
    { label: t.nav.demo, href: '#demo' },
    { label: t.nav.pricing, href: '#pricing' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        {/* Logo + Compteur de visiteurs */}
        <div className="flex items-center gap-3">
	<a href="#" className="flex items-center gap-2.5">
  		<Logo className="size-8 transition-transform hover:scale-105" />
  		<span className="font-display text-lg font-bold tracking-tight">
    			Flowly<span className="text-primary">.ai</span>
  		</span>
	</a>

          <VisitorCounter />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1 text-xs">
            <Globe className="ml-1 size-3.5 text-muted-foreground" />
            <button
              onClick={() => setLang('fr')}
              className={`rounded-full px-2 py-0.5 transition-colors ${
                lang === 'fr' ? 'bg-primary font-bold text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLang('en')}
              className={`rounded-full px-2 py-0.5 transition-colors ${
                lang === 'en' ? 'bg-primary font-bold text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              EN
            </button>
          </div>

          <ConfettiButton className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95">
            {t.nav.cta}
          </ConfettiButton>
        </div>
      </div>
    </header>
  )
}