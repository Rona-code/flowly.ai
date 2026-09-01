'use client'

import React, { useState } from 'react'
import { X, CreditCard, Lock, AlertTriangle, Loader2 } from 'lucide-react'
import { useLanguage } from './language-provider'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  planPrice: string
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  planName,
  planPrice,
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const { t } = useLanguage()
  const checkoutT = t.checkout

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(false)

    setTimeout(() => {
      setIsLoading(false)
      setError(true)
    }, 2000)
  }

  const handleResetAndClose = () => {
    setError(false)
    setIsLoading(false)
    setName('')
    setEmail('')
    setCardNumber('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100">
        
        {/* Bouton Fermer */}
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {error ? (
          /* Écran d'erreur de solvabilité */
          <div className="flex flex-col items-center text-center py-4 space-y-4">
            <div className="rounded-full bg-red-500/10 p-3 text-red-500 border border-red-500/20">
              <AlertTriangle className="h-10 w-10" />
            </div>
            
            <h3 className="text-xl font-bold text-red-500">
              {checkoutT.errorTitle}
            </h3>

            <p className="text-sm text-slate-300">
              {checkoutT.errorMsg.replace('{{name}}', name || 'Cher utilisateur')}
            </p>

            <blockquote className="text-xs italic text-slate-400 border-l-2 border-slate-700 pl-3 my-2 text-left">
              {checkoutT.errorQuote}
            </blockquote>

            <button
              onClick={handleResetAndClose}
              className="w-full mt-4 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-slate-200 transition-colors"
            >
              {checkoutT.closeBtn}
            </button>
          </div>
        ) : (
          /* Formulaire de paiement */
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-indigo-400" />
                {checkoutT.title}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {checkoutT.subtitle} <span className="font-semibold text-indigo-400">{planName}</span> ({planPrice})
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {checkoutT.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={checkoutT.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {checkoutT.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder={checkoutT.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {checkoutT.cardLabel}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="4242 •••• •••• 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full rounded-lg bg-slate-800/80 border border-slate-700 pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {checkoutT.loading}
                  </>
                ) : (
                  checkoutT.submit
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}