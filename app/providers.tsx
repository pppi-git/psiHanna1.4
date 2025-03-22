'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect } from 'react'
import { analytics } from '@/lib/services/analytics'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  // Inicializar analytics quando o componente montar
  useEffect(() => {
    // Apenas inicializar no navegador
    if (typeof window !== 'undefined') {
      analytics.init({
        debug: process.env.NODE_ENV === 'development',
      })
    }
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
} 