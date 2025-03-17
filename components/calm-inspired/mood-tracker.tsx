"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Smile, Frown, Meh, ThumbsUp } from "lucide-react"

type Mood = "great" | "good" | "okay" | "bad" | "awful"

interface MoodOption {
  value: Mood
  label: string
  icon: React.ReactNode
  color: string
}

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const moodOptions: MoodOption[] = [
    {
      value: "great",
      label: "Ótimo",
      icon: <Smile className="h-6 w-6 fill-current" />,
      color: "bg-green-100 text-green-600 border-green-200",
    },
    {
      value: "good",
      label: "Bem",
      icon: <Smile className="h-6 w-6" />,
      color: "bg-emerald-100 text-emerald-600 border-emerald-200",
    },
    {
      value: "okay",
      label: "Neutro",
      icon: <Meh className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600 border-blue-200",
    },
    {
      value: "bad",
      label: "Mal",
      icon: <Frown className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-600 border-amber-200",
    },
    {
      value: "awful",
      label: "Péssimo",
      icon: <Frown className="h-6 w-6 fill-current" />,
      color: "bg-red-100 text-red-600 border-red-200",
    },
  ]

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
    setShowFeedback(true)

    // In a real app, you would save this to a database
    console.log("Mood selected:", mood)
  }

  const getFeedbackMessage = () => {
    switch (selectedMood) {
      case "great":
      case "good":
        return "Que bom! Continuar práticas que promovem bem-estar é importante para manter esse estado positivo."
      case "okay":
        return "Está tudo bem se sentir neutro. Que tal experimentar uma prática de mindfulness para elevar seu humor?"
      case "bad":
      case "awful":
        return "Sinto muito que não esteja se sentindo bem. Exercícios de respiração e mindfulness podem ajudar a aliviar emoções difíceis."
      default:
        return ""
    }
  }

  const resetMood = () => {
    setSelectedMood(null)
    setShowFeedback(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium mb-2">Como você está se sentindo hoje?</h3>
        <p className="text-sm text-muted-foreground">
          Acompanhar seu humor pode ajudar a identificar padrões e desenvolver estratégias de autocuidado.
        </p>
      </div>

      {!showFeedback ? (
        <div className="flex justify-between gap-2">
          {moodOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => handleMoodSelect(option.value)}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 ${option.color} transition-all`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-2">{option.icon}</div>
              <span className="text-sm font-medium">{option.label}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-muted"
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                moodOptions.find((m) => m.value === selectedMood)?.color
              }`}
            >
              {moodOptions.find((m) => m.value === selectedMood)?.icon}
            </div>
          </div>

          <p className="text-center mb-4">{getFeedbackMessage()}</p>

          <div className="flex justify-center">
            <motion.button
              onClick={resetMood}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Obrigado</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

