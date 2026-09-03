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
    const handleScroll = () => {
      // Hauteur totale de la page (compatible mobile)
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )

      // Position actuelle du scroll + hauteur de l'écran
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const clientHeight = window.innerHeight

      // Déclenchement à 500px du bas pour anticiper le scroll rapide sur mobile
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight - 500) {
        setBlocks((prev) => [...prev, prev.length])
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
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
            <Testimonials />
            <FAQ />
          </div>
        ))}
        <SiteFooter />
      </main>
    </ConfettiProvider>
  )
}
