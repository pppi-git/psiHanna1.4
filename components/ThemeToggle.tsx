'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { analytics } from '@/lib/services/analytics'

/**
 * Componente para alternar entre os temas claro e escuro
 * Otimizado para acessibilidade e performance
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratação ao renderizar botões de tema
  useEffect(() => {
    setMounted(true)
  }, [])

  // Alternar entre temas
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    
    // Registrar evento de analytics
    analytics.trackEvent('button_click', {
      component: 'ThemeToggle',
      action: 'toggle',
      value: newTheme
    })
  }

  // Evitar flash de conteúdo incorreto durante a hidratação
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      aria-label={theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
      title={theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
} 