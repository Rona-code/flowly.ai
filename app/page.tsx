"use client"

import { useState, useEffect } from 'react'
import { ConfettiProvider } from '@/components/confetti-provider'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { UselessAI } from '@/components/useless-ai'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  const [blocks, setBlocks] = useState([0])

  useEffect(() => {
    const handleScrollCheck = () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const clientHeight = window.innerHeight

      // Quand l'utilisateur s'approche du bas (à moins de 600px)
      if (scrollTop + clientHeight >= scrollHeight - 600) {
        // 1. On injecte un nouveau bloc pour allonger la page
        setBlocks((prev) => [...prev, prev.length])

        // 2. ROLLBACK TROLL : On renvoie violemment l'utilisateur vers le haut
        window.scrollTo({
          top: Math.max(0, scrollTop - 800),
          behavior: 'smooth'
        })
      }
    }

    // Événements Scroll + Touch pour bloquer l'inertie tactile sur mobile
    window.addEventListener('scroll', handleScrollCheck, { passive: true })
    window.addEventListener('touchmove', handleScrollCheck, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScrollCheck)
      window.removeEventListener('touchmove', handleScrollCheck)
    }
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
            <Testimonials />
            <FAQ />
          </div>
        ))}
        <SiteFooter />
      </main>
    </ConfettiProvider>
  )
}
