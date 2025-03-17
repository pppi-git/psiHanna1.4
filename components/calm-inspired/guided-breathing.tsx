"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Play, Pause, Settings } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface GuidedBreathingProps {
  autoPlay?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

type BreathingPhase = "inhale" | "hold-inhale" | "exhale" | "hold-exhale" | "idle"

export function GuidedBreathing({ autoPlay = false, size = "md", className = "" }: GuidedBreathingProps) {
  const [isActive, setIsActive] = useState(autoPlay)
  const [phase, setPhase] = useState<BreathingPhase>("idle")
  const [count, setCount] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [showInstructions, setShowInstructions] = useState(true)

  // Breathing pattern settings
  const [settings, setSettings] = useState({
    inhaleTime: 4,
    holdInhaleTime: 4,
    exhaleTime: 6,
    holdExhaleTime: 2,
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const sizes = {
    sm: {
      container: "w-48 h-48",
      text: "text-sm",
      circle: { min: 50, max: 90 },
    },
    md: {
      container: "w-64 h-64",
      text: "text-base",
      circle: { min: 60, max: 120 },
    },
    lg: {
      container: "w-80 h-80",
      text: "text-lg",
      circle: { min: 70, max: 150 },
    },
  }

  useEffect(() => {
    // Create audio element with error handling
    try {
      audioRef.current = new Audio("/sounds/calm-breathing.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = volume

      // Preload the audio to check if it's available
      audioRef.current.load()

      // Add error event listener
      audioRef.current.addEventListener("error", () => {
        console.warn("Audio file could not be loaded. Sound will be disabled.")
        setIsMuted(true)
      })
    } catch (error) {
      console.warn("Audio initialization failed:", error)
      setIsMuted(true)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("error", () => {})
        audioRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (isActive && !isMuted && audioRef.current) {
      // Use a promise with proper error handling
      const playPromise = audioRef.current.play()

      // Modern browsers return a promise from play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Audio playback failed, disabling sound:", error)
          setIsMuted(true)
        })
      }
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [isActive, isMuted])

  useEffect(() => {
    if (!isActive) {
      setPhase("idle")
      setCount(0)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    const startBreathingCycle = () => {
      // Start with inhale
      setPhase("inhale")
      setCount(settings.inhaleTime)

      let currentPhase: BreathingPhase = "inhale"
      let currentCount = settings.inhaleTime

      intervalRef.current = setInterval(() => {
        currentCount -= 1
        setCount(currentCount)

        if (currentCount <= 0) {
          // Move to next phase
          switch (currentPhase) {
            case "inhale":
              currentPhase = "hold-inhale"
              currentCount = settings.holdInhaleTime
              setPhase("hold-inhale")
              setCount(settings.holdInhaleTime)
              break

            case "hold-inhale":
              currentPhase = "exhale"
              currentCount = settings.exhaleTime
              setPhase("exhale")
              setCount(settings.exhaleTime)
              break

            case "exhale":
              currentPhase = "hold-exhale"
              currentCount = settings.holdExhaleTime
              setPhase("hold-exhale")
              setCount(settings.holdExhaleTime)
              break

            case "hold-exhale":
              currentPhase = "inhale"
              currentCount = settings.inhaleTime
              setPhase("inhale")
              setCount(settings.inhaleTime)
              break

            default:
              break
          }
        }
      }, 1000)
    }

    startBreathingCycle()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isActive, settings])

  const toggleActive = () => {
    setIsActive(!isActive)
    if (showInstructions) {
      setShowInstructions(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const getInstructions = () => {
    if (!isActive) return "Iniciar"

    switch (phase) {
      case "inhale":
        return "Inspire"
      case "hold-inhale":
        return "Segure"
      case "exhale":
        return "Expire"
      case "hold-exhale":
        return "Relaxe"
      default:
        return "Iniciar"
    }
  }

  const circleVariants = {
    inhale: {
      scale: sizes[size].circle.max / 100,
      opacity: 0.8,
      transition: { duration: settings.inhaleTime, ease: "easeInOut" },
    },
    "hold-inhale": {
      scale: sizes[size].circle.max / 100,
      opacity: 0.8,
      transition: { duration: 0.2 },
    },
    exhale: {
      scale: sizes[size].circle.min / 100,
      opacity: 0.4,
      transition: { duration: settings.exhaleTime, ease: "easeInOut" },
    },
    "hold-exhale": {
      scale: sizes[size].circle.min / 100,
      opacity: 0.4,
      transition: { duration: 0.2 },
    },
    idle: {
      scale: sizes[size].circle.min / 100,
      opacity: 0.4,
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <div
          className={`relative ${sizes[size].container} flex items-center justify-center cursor-pointer rounded-full bg-gradient-to-br from-blue-400 to-purple-500`}
          onClick={toggleActive}
        >
          {/* Anel de progresso */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Anel base */}
            <circle className="stroke-white/20 fill-none" cx="50" cy="50" r="45" strokeWidth="2" />
            {/* Anel de progresso animado */}
            <motion.circle
              className="stroke-white fill-none"
              cx="50"
              cy="50"
              r="45"
              strokeWidth="2"
              strokeDasharray="282.7433388230814"
              animate={{
                strokeDashoffset:
                  phase === "inhale"
                    ? 0
                    : phase === "hold-inhale"
                      ? 0
                      : phase === "exhale"
                        ? 282.7433388230814
                        : 282.7433388230814,
              }}
              transition={{
                duration: phase === "inhale" ? settings.inhaleTime : phase === "exhale" ? settings.exhaleTime : 0.2,
                ease: "linear",
              }}
            />
            {/* Marcadores de fase */}
            <circle cx="50" cy="5" r="2" fill="white" /> {/* Topo */}
            <circle cx="95" cy="50" r="2" fill="white" /> {/* Direita */}
            <circle cx="50" cy="95" r="2" fill="white" /> {/* Base */}
            <circle cx="5" cy="50" r="2" fill="white" /> {/* Esquerda */}
          </svg>

          {/* Círculo central pulsante */}
          <motion.div
            className="absolute rounded-full bg-white/90 backdrop-blur-sm"
            style={{
              width: "70%",
              height: "70%",
            }}
            animate={{
              scale: phase === "inhale" || phase === "hold-inhale" ? 1 : 0.8,
              opacity: phase === "idle" ? 0.7 : 0.9,
            }}
            transition={{
              duration: phase === "inhale" ? settings.inhaleTime : phase === "exhale" ? settings.exhaleTime : 0.2,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className={`${sizes[size].text} font-medium text-gray-800`}>
                <p className="text-2xl">{getInstructions()}</p>
                {isActive && count > 0 && <p className="text-lg mt-1 text-gray-600">{count}s</p>}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controles */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleActive()
            }}
            className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
            aria-label={isActive ? "Pausar respiração guiada" : "Iniciar respiração guiada"}
          >
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMute()
            }}
            className={`w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center ${
              audioRef.current?.error ? "text-gray-400 cursor-not-allowed" : "text-gray-800 hover:bg-white"
            } transition-colors`}
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
            disabled={audioRef.current?.error}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                aria-label="Configurações"
              >
                <Settings className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80" onClick={(e) => e.stopPropagation()}>
              <div className="space-y-4">
                <h3 className="font-medium">Configurações de Respiração</h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Tempo de Inspiração</label>
                    <span className="text-sm">{settings.inhaleTime}s</span>
                  </div>
                  <Slider
                    value={[settings.inhaleTime]}
                    min={2}
                    max={8}
                    step={1}
                    onValueChange={(value) => setSettings({ ...settings, inhaleTime: value[0] })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Tempo de Retenção (após inspirar)</label>
                    <span className="text-sm">{settings.holdInhaleTime}s</span>
                  </div>
                  <Slider
                    value={[settings.holdInhaleTime]}
                    min={0}
                    max={8}
                    step={1}
                    onValueChange={(value) => setSettings({ ...settings, holdInhaleTime: value[0] })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Tempo de Expiração</label>
                    <span className="text-sm">{settings.exhaleTime}s</span>
                  </div>
                  <Slider
                    value={[settings.exhaleTime]}
                    min={3}
                    max={10}
                    step={1}
                    onValueChange={(value) => setSettings({ ...settings, exhaleTime: value[0] })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Tempo de Pausa (após expirar)</label>
                    <span className="text-sm">{settings.holdExhaleTime}s</span>
                  </div>
                  <Slider
                    value={[settings.holdExhaleTime]}
                    min={0}
                    max={6}
                    step={1}
                    onValueChange={(value) => setSettings({ ...settings, holdExhaleTime: value[0] })}
                  />
                </div>

                {!isMuted && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm">Volume</label>
                      <span className="text-sm">{Math.round(volume * 100)}%</span>
                    </div>
                    <Slider value={[volume]} min={0} max={1} step={0.05} onValueChange={handleVolumeChange} />
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 text-center max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
          >
            <h3 className="font-medium mb-2">Como usar a respiração guiada</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Siga o ritmo da animação para um exercício de respiração que ajuda a reduzir o stress e a ansiedade.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
                <span>Inspire lentamente enquanto o círculo expande</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-accent mr-2"></span>
                <span>Segure a respiração quando o círculo estiver expandido</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
                <span>Expire lentamente enquanto o círculo contrai</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-accent mr-2"></span>
                <span>Relaxe brevemente antes de iniciar um novo ciclo</span>
              </li>
            </ul>
            <button onClick={() => setShowInstructions(false)} className="mt-4 text-sm text-primary hover:underline">
              Entendi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

