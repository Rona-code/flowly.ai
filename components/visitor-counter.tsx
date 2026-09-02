'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const NAMESPACE = 'flowly-ai-prod-2026'
    const KEY = 'unique-visitors'
    const VISITED_KEY = 'flowly_has_visited'

    const hasVisited = localStorage.getItem(VISITED_KEY)

    // Si nouveau visiteur : incrémentation (+1)
    // Si visiteur connu : lecture simple
    const url = !hasVisited
      ? `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`
      : `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur API')
        return res.json()
      })
      .then((data) => {
        // L'API renvoie { count: X }
        const total = data?.count

        if (typeof total === 'number') {
          setCount(total)
          if (!hasVisited) {
            localStorage.setItem(VISITED_KEY, 'true')
          }
        }
      })
      .catch((err) => {
        console.error('Erreur lors du comptage :', err)
        // Fallback visuel en cas de blocage d'adblocker
        setCount(12)
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
