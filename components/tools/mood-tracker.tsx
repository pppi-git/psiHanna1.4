"use client"

import { useMoodTracker } from "@/hooks/use-mood-tracker"
import { MOOD_OPTIONS } from "@/constants/mood-data"
import { Smile, ThumbsUp, Frown, AlertCircle, Meh } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap = {
  Smile,
  ThumbsUp,
  Frown,
  AlertCircle,
  Meh,
}

// Adicione props para identificar o usuário
export function MoodTracker({ userSpecific = false, userId = "" }: { userSpecific?: boolean; userId?: string }) {
  // Modifique a função useMoodTracker para usar o ID do usuário se fornecido
  const { activeMood, currentTip, isAnimating, handleMoodSelect } = useMoodTracker(userSpecific ? userId : undefined)

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-wrap justify-center gap-4 mb-4">
        {MOOD_OPTIONS.map((mood) => {
          const IconComponent = iconMap[mood.icon as keyof typeof iconMap]
          return (
            <button
              key={mood.id}
              className={cn(
                "mood-btn flex flex-col items-center transition-all duration-200",
                activeMood === mood.id && "active",
              )}
              onClick={() => handleMoodSelect(mood)}
              aria-label={mood.label}
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200",
                  "bg-primary/10 hover:bg-primary/20 border-2 border-primary/20",
                  activeMood === mood.id && "bg-primary/20 border-primary/50 shadow-md",
                )}
              >
                <IconComponent className="h-7 w-7 text-primary" />
              </div>
              <span
                className={cn(
                  "text-xs mt-1 font-medium transition-colors",
                  activeMood === mood.id && "text-primary font-semibold",
                )}
              >
                {mood.label}
              </span>
            </button>
          )
        })}
      </div>

      <div
        className={cn(
          "mt-3 p-3 bg-primary/5 rounded-lg text-sm text-center text-muted-foreground italic max-w-md",
          "transition-opacity duration-200",
          isAnimating ? "opacity-0" : "opacity-100",
        )}
      >
        {currentTip}
      </div>
    </div>
  )
}

