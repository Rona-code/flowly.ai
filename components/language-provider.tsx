'use client'

import React, { createContext, useContext, useState } from 'react'
import { Language, TRANSLATIONS } from '@/lib/i18n'

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: (typeof TRANSLATIONS)['fr']
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('fr')

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}