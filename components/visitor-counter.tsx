'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const WORKSPACE = 'flowly-ai-prod-2026'
    const COUNTER = 'unique-visitors'
    const HAS_VISITED_KEY = 'flowly_has_visited'

    const hasVisited = localStorage.getItem(HAS_VISITED_KEY)

    // Si nouveau visiteur: incrémente (+1)
    // Si déjà visité: interroge l'endpoint /up/ sans incrémenter (inc=0)
    const endpoint = !hasVisited
      ? `https://counterapi.com/api/${WORKSPACE}/up/${COUNTER}`
      : `https://counterapi.com/api/${WORKSPACE}/up/${COUNTER}?inc=0`

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur réseau')
        return res.json()
      })
      .then((data) => {
        // 'value' sur l'endpoint /up/ correspond directement à la métrique INC
        const total = data.value ?? data.up_count

        if (typeof total === 'number') {
          setCount(total)
          if (!hasVisited) {
            localStorage.setItem(HAS_VISITED_KEY, 'true')
          }
        }
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des visites :', err)
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
