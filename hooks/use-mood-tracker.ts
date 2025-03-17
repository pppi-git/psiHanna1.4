"use client"

// Adicione suporte para ID de usuário
import { useState, useCallback } from "react"
import type { MoodOption } from "@/types"
import { DEFAULT_MOOD_TIP } from "@/constants/mood-data"

export function useMoodTracker(userId?: string) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [activeMood, setActiveMood] = useState<string | null>(null)
  const [currentTip, setCurrentTip] = useState<string>(DEFAULT_MOOD_TIP)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const handleMoodSelect = useCallback((mood: MoodOption) => {
    setActiveMood(mood.id)

    // Animação de fade para a dica
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTip(mood.tip)
      setIsAnimating(false)
    }, 200)
  }, [])

  // Modifique a função saveMood para usar o ID do usuário
  const saveMood = useCallback(
    (mood: string) => {
      setSelectedMood(mood)

      // Em uma implementação real, você enviaria isso para um backend
      // Aqui estamos apenas simulando com localStorage
      const storageKey = userId ? `mood-history-${userId}` : "mood-history"

      try {
        const existingData = localStorage.getItem(storageKey)
        const moodHistory = existingData ? JSON.parse(existingData) : []

        moodHistory.push({
          mood,
          timestamp: new Date().toISOString(),
        })

        localStorage.setItem(storageKey, JSON.stringify(moodHistory))

        return true
      } catch (error) {
        console.error("Erro ao salvar humor:", error)
        return false
      }
    },
    [userId],
  )

  return { selectedMood, setSelectedMood, saveMood, activeMood, currentTip, isAnimating, handleMoodSelect }
}

