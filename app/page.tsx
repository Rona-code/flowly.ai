"use client"

import { useState, useEffect } from 'react'
import { ConfettiProvider } from '@/components/confetti-provider'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { UselessAI } from '@/components/useless-ai'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  // Un tableau de blocs qui s'agrandit à l'infini
  const [blocks, setBlocks] = useState([0])

  useEffect(() => {
    const handleScroll = () => {
      // Si on approche du bas de la page (à moins de 300px)
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        // On génère un nouveau bloc à l'infini
        setBlocks((prev) => [...prev, prev.length])
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ConfettiProvider>
      <SiteHeader />
      <main>
        {blocks.map((id) => (
          <div key={id}>
            <Hero />
            <UselessAI />
            <Features />
            <Pricing />
          </div>
        ))}
        <SiteFooter />
      </main>
    </ConfettiProvider>
  )
}