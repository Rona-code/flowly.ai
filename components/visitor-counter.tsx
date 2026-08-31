'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export function VisitorCounter() {
  const [count, setCount] = useState<number>(1)

  useEffect(() => {
    const NAMESPACE = 'flowly-ai-app-v2'
    const KEY = 'unique_visits'
    const STORAGE_KEY = 'flowly_visit_count'
    const HAS_VISITED_KEY = 'flowly_has_visited'

    const localCount = localStorage.getItem(STORAGE_KEY)
    const hasVisited = localStorage.getItem(HAS_VISITED_KEY)

    if (localCount) {
      setCount(parseInt(localCount, 10))
    }

    const endpoint = !hasVisited
      ? `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`
      : `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setCount(data.count)
          localStorage.setItem(STORAGE_KEY, data.count.toString())
          localStorage.setItem(HAS_VISITED_KEY, 'true')
        }
      })
      .catch(() => {
        if (!hasVisited) {
          const fallbackCount = parseInt(localCount || '142', 10) + 1
          setCount(fallbackCount)
          localStorage.setItem(STORAGE_KEY, fallbackCount.toString())
          localStorage.setItem(HAS_VISITED_KEY, 'true')
        }
      })
  }, [])

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