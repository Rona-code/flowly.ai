'use client'

import { useState } from 'react'
import { Loader2, Send, Sparkles } from 'lucide-react'
import { useConfetti } from './confetti-provider'
import { useLanguage } from './language-provider'

export function UselessAI() {
  const { t } = useLanguage()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const { fire } = useConfetti()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setAnswer(null)
    setTimeout(() => {
      const answers = t.uselessAi.answers
      const next = answers[Math.floor(Math.random() * answers.length)]
      setAnswer(next)
      setLoading(false)
      fire()
    }, 1400)
  }

  return (
    <section id="demo" className="mx-auto max-w-4xl px-6 py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {t.uselessAi.title}
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">{t.uselessAi.subtitle}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-primary/70" />
            <span className="size-3 rounded-full bg-muted-foreground/40" />
          </div>
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            {t.uselessAi.version}
          </span>
        </div>

        <div className="min-h-40 space-y-4 p-6">
          {loading && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="size-4 animate-spin text-primary" />
              <span className="text-sm">{t.uselessAi.loading}</span>
            </div>
          )}

          {!loading && answer && (
            <div className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              <p className="rounded-xl rounded-tl-none bg-secondary px-4 py-3 text-sm leading-relaxed text-secondary-foreground">
                {answer}
              </p>
            </div>
          )}

          {!loading && !answer && (
            <p className="pt-6 text-center text-sm text-muted-foreground">
              {t.uselessAi.empty}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.uselessAi.placeholder}
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-60"
          >
            <Send className="size-4" />
            {t.uselessAi.button}
          </button>
        </form>
      </div>
    </section>
  )
}