'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const WORKSPACE = 'flowly-ai-prod-2026'
    const COUNTER = 'unique-visitors'
    const VISITED_KEY = 'flowly_has_visited'
    const COUNT_CACHE_KEY = 'flowly_unique_count'

    const hasVisited = localStorage.getItem(VISITED_KEY)
    const cachedCount = localStorage.getItem(COUNT_CACHE_KEY)

    // 1. VISITEUR CONNU : On affiche la valeur stockée sans refaire d'appel HTTP
    if (hasVisited && cachedCount) {
      setCount(parseInt(cachedCount, 10))
      return
    }

    // 2. NOUVEAU VISITEUR : On incrémente via /up/
    fetch(`https://counterapi.com/api/${WORKSPACE}/up/${COUNTER}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur réseau CounterAPI')
        return res.json()
      })
      .then((data) => {
        // 'up_count' donne le nombre exact d'incréments uniques (colonne INC)
        const uniqueVisitors = data.up_count ?? data.value

        if (typeof uniqueVisitors === 'number') {
          setCount(uniqueVisitors)
          // On marque le visiteur comme connu et on enregistre le score
          localStorage.setItem(VISITED_KEY, 'true')
          localStorage.setItem(COUNT_CACHE_KEY, uniqueVisitors.toString())
        }
      })
      .catch((err) => {
        console.error('Erreur lors du comptage des visiteurs :', err)
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
