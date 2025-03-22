"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BreathingAnimationProps {
  autoPlay?: boolean
  size?: "sm" | "md" | "lg"
}

export function BreathingAnimation({ autoPlay = false, size = "md" }: BreathingAnimationProps) {
  const [isBreathing, setIsBreathing] = useState(autoPlay)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("rest")
  const [count, setCount] = useState(0)

  const sizes = {
    sm: {
      container: "w-24 h-24",
      text: "text-sm",
      circle: { min: 40, max: 80 },
    },
    md: {
      container: "w-32 h-32",
      text: "text-base",
      circle: { min: 60, max: 120 },
    },
    lg: {
      container: "w-40 h-40",
      text: "text-lg",
      circle: { min: 80, max: 160 },
    },
  }

  useEffect(() => {
    if (!isBreathing) {
      setPhase("rest")
      setCount(0)
      return
    }

    const breathingCycle = () => {
      // Inhale for 4 seconds
      setPhase("inhale")
      setCount(4)

      const inhaleInterval = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            clearInterval(inhaleInterval)

            // Hold for 4 seconds
            setPhase("hold")
            setCount(4)

            const holdInterval = setInterval(() => {
              setCount((prev) => {
                if (prev <= 1) {
                  clearInterval(holdInterval)

                  // Exhale for 6 seconds
                  setPhase("exhale")
                  setCount(6)

                  const exhaleInterval = setInterval(() => {
                    setCount((prev) => {
                      if (prev <= 1) {
                        clearInterval(exhaleInterval)

                        // Rest for 2 seconds before starting again
                        setPhase("rest")
                        setCount(2)

                        const restInterval = setInterval(() => {
                          setCount((prev) => {
                            if (prev <= 1) {
                              clearInterval(restInterval)
                              breathingCycle() // Start the cycle again
                            }
                            return prev - 1
                          })
                        }, 1000)
                      }
                      return prev - 1
                    })
                  }, 1000)
                }
                return prev - 1
              })
            }, 1000)
          }
          return prev - 1
        })
      }, 1000)
    }

    breathingCycle()

    return () => {
      // Clear any intervals when component unmounts or breathing stops
      const allIntervals = setInterval(() => {}, 0)
      for (let i = 0; i < allIntervals; i++) {
        clearInterval(i)
      }
    }
  }, [isBreathing])

  const circleVariants = {
    inhale: {
      scale: sizes[size].circle.max / 100,
      opacity: 0.8,
      transition: { duration: 4, ease: "easeInOut" },
    },
    hold: {
      scale: sizes[size].circle.max / 100,
      opacity: 0.8,
      transition: { duration: 0.2 },
    },
    exhale: {
      scale: sizes[size].circle.min / 100,
      opacity: 0.4,
      transition: { duration: 6, ease: "easeInOut" },
    },
    rest: {
      scale: sizes[size].circle.min / 100,
      opacity: 0.4,
      transition: { duration: 0.2 },
    },
  }

  const getInstructions = () => {
    if (!isBreathing) return "Clique para iniciar"

    switch (phase) {
      case "inhale":
        return "Inspire..."
      case "hold":
        return "Segure..."
      case "exhale":
        return "Expire..."
      case "rest":
        return "Relaxe..."
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative ${sizes[size].container} flex items-center justify-center cursor-pointer`}
        onClick={() => setIsBreathing(!isBreathing)}
      >
        <motion.div
          className="absolute rounded-full bg-gradient-to-r from-primary/40 to-accent/40 backdrop-blur-sm"
          variants={circleVariants}
          animate={phase}
          initial="rest"
        />
        <div className={`z-10 ${sizes[size].text} font-medium text-center`}>
          <p>{getInstructions()}</p>
          {isBreathing && count > 0 && <p className="text-2xl mt-1">{count}</p>}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground text-center max-w-xs">
        {isBreathing
          ? "Respire junto com a animação para um momento de calma"
          : "Experimente um exercício de respiração para reduzir o stress"}
      </p>
    </div>
  )
}

