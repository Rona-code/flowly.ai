'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const WORKSPACE = 'flowly-ai-prod-2026'
    const COUNTER = 'unique-visitors'
    const VISITED_KEY = 'flowly_has_visited'
    const CACHED_COUNT_KEY = 'flowly_cached_count'

    const hasVisited = localStorage.getItem(VISITED_KEY)
    const cachedCount = localStorage.getItem(CACHED_COUNT_KEY)

    // Si le visiteur est déjà venu, on affiche le dernier score enregistré sans appeler l'API `/get`
    if (hasVisited && cachedCount) {
      setCount(parseInt(cachedCount, 10))
      return
    }

    // NOUVEAU VISITEUR : On incrémente via /up/
    fetch(`https://counterapi.com/api/${WORKSPACE}/up/${COUNTER}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur réseau CounterAPI')
        return res.json()
      })
      .then((data) => {
        // 'data.value' contient le vrai nombre d'incréments (12)
        const realCount = data?.value

        if (typeof realCount === 'number') {
          setCount(realCount)
          localStorage.setItem(VISITED_KEY, 'true')
          localStorage.setItem(CACHED_COUNT_KEY, realCount.toString())
        }
      })
      .catch((err) => {
        console.error('Erreur lors de l’incrémentation :', err)
      })
  }, [])

  if (count === null) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/80 px-2.5 py-0.5 text-xs text-muted-foreground animate-pulse">
        <Eye className="size-3.5 text-primary" />
        <span className="font-mono text-[11px]">...</span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/80 px-2.5 py-0.5 text-xs text-muted-foreground">
      <Eye className="size-3.5 text-primary" />
      <span className="font-mono text-[11px] font-medium text-foreground">
        {count.toLocaleString()}
      </span>
      <span className="text-[10px] text-muted-foreground">visites</span>
    </div>
  )
}
