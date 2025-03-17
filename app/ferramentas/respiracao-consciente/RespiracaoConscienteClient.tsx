"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Info, ArrowRight, CheckCircle, HelpCircle, BookOpen, Pause, Play, RotateCcw } from "lucide-react"

// Tipos para as técnicas de respiração
interface BreathingTechnique {
  id: string
  name: string
  description: string
  inhaleTime: number
  holdTime: number
  exhaleTime: number
  holdAfterExhaleTime: number
  cycles: number
  benefits: string[]
  instructions: string
}

// Dados para as técnicas de respiração
const breathingTechniques: BreathingTechnique[] = [
  {
    id: "respiracao-478",
    name: "Respiração 4-7-8",
    description: "Uma técnica poderosa para acalmar o sistema nervoso e induzir relaxamento rápido.",
    inhaleTime: 4,
    holdTime: 7,
    exhaleTime: 8,
    holdAfterExhaleTime: 0,
    cycles: 4,
    benefits: [
      "Reduz ansiedade e estresse",
      "Ajuda a adormecer mais rapidamente",
      "Controla reações emocionais intensas",
      "Melhora a concentração",
    ],
    instructions:
      "Inspire pelo nariz contando até 4, segure a respiração contando até 7, e expire lentamente pela boca contando até 8. Repita o ciclo 4 vezes.",
  },
  {
    id: "respiracao-caixa",
    name: "Respiração Quadrada",
    description: "Uma técnica equilibrada que ajuda a regular o ritmo respiratório e acalmar a mente.",
    inhaleTime: 4,
    holdTime: 4,
    exhaleTime: 4,
    holdAfterExhaleTime: 4,
    cycles: 5,
    benefits: [
      "Equilibra o sistema nervoso",
      "Melhora o foco e a clareza mental",
      "Reduz a tensão física",
      "Fortalece a consciência do momento presente",
    ],
    instructions:
      "Inspire pelo nariz contando até 4, segure a respiração contando até 4, expire pelo nariz contando até 4, e segure novamente contando até 4. Repita o ciclo 5 vezes.",
  },
  {
    id: "respiracao-diafragmatica",
    name: "Respiração Diafragmática",
    description:
      "Uma técnica profunda que utiliza o diafragma para maximizar a capacidade pulmonar e promover relaxamento.",
    inhaleTime: 5,
    holdTime: 2,
    exhaleTime: 6,
    holdAfterExhaleTime: 0,
    cycles: 6,
    benefits: [
      "Reduz os níveis de cortisol (hormônio do estresse)",
      "Melhora a oxigenação do sangue",
      "Diminui a frequência cardíaca",
      "Alivia tensão muscular",
    ],
    instructions:
      "Coloque uma mão no peito e outra no abdômen. Inspire lentamente pelo nariz por 5 segundos, sentindo o abdômen expandir (não o peito). Segure por 2 segundos e expire lentamente pela boca por 6 segundos. Repita 6 vezes.",
  },
]

export function RespiracaoConscienteClient() {
  const [activeTab, setActiveTab] = useState("ferramenta")
  const [step, setStep] = useState(1)
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [isBreathingActive, setIsBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale" | "holdAfterExhale">("inhale")
  const [currentCycle, setCurrentCycle] = useState(1)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [customSettings, setCustomSettings] = useState({
    inhaleTime: 4,
    holdTime: 4,
    exhaleTime: 4,
    holdAfterExhaleTime: 0,
    cycles: 4,
  })
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null)
  const [feedbackNotes, setFeedbackNotes] = useState("")

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Efeito para criar elementos de áudio
  useEffect(() => {
    audioRef.current = new Audio("/sounds/soft-bell.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Efeito para gerenciar o timer de respiração
  useEffect(() => {
    if (!isBreathingActive || !selectedTechnique) return

    const technique = selectedTechnique

    // Configurar o timer inicial
    if (breathingPhase === "inhale") {
      setSecondsLeft(technique.inhaleTime)
    }

    // Gerenciar o timer
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Tocar som suave na transição
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
          }

          // Mudar para a próxima fase
          if (breathingPhase === "inhale") {
            if (technique.holdTime > 0) {
              setBreathingPhase("hold")
              return technique.holdTime
            } else {
              setBreathingPhase("exhale")
              return technique.exhaleTime
            }
          } else if (breathingPhase === "hold") {
            setBreathingPhase("exhale")
            return technique.exhaleTime
          } else if (breathingPhase === "exhale") {
            if (technique.holdAfterExhaleTime > 0) {
              setBreathingPhase("holdAfterExhale")
              return technique.holdAfterExhaleTime
            } else {
              // Verificar se completou todos os ciclos
              if (currentCycle >= technique.cycles) {
                setIsBreathingActive(false)
                setCurrentCycle(1)
                setBreathingPhase("inhale")
                return 0
              } else {
                setCurrentCycle((c) => c + 1)
                setBreathingPhase("inhale")
                return technique.inhaleTime
              }
            }
          } else if (breathingPhase === "holdAfterExhale") {
            // Verificar se completou todos os ciclos
            if (currentCycle >= technique.cycles) {
              setIsBreathingActive(false)
              setCurrentCycle(1)
              setBreathingPhase("inhale")
              return 0
            } else {
              setCurrentCycle((c) => c + 1)
              setBreathingPhase("inhale")
              return technique.inhaleTime
            }
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isBreathingActive, breathingPhase, currentCycle, selectedTechnique])

  // Função para iniciar o exercício de respiração
  const startBreathing = () => {
    setIsBreathingActive(true)
    setBreathingPhase("inhale")
    setCurrentCycle(1)
    setSecondsLeft(selectedTechnique?.inhaleTime || 4)
  }

  // Função para pausar o exercício de respiração
  const pauseBreathing = () => {
    setIsBreathingActive(false)
  }

  // Função para reiniciar o exercício de respiração
  const resetBreathing = () => {
    setIsBreathingActive(false)
    setBreathingPhase("inhale")
    setCurrentCycle(1)
    setSecondsLeft(selectedTechnique?.inhaleTime || 4)
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setIsComplete(true)
    }
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleRestart = () => {
    setSelectedTechnique(null)
    setStep(1)
    setIsComplete(false)
    setIsBreathingActive(false)
    setCurrentCycle(1)
    setBreathingPhase("inhale")
    setFeedbackRating(null)
    setFeedbackNotes("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Função para obter dica contextual
  const getContextualTip = () => {
    switch (step) {
      case 1:
        return "Escolha a técnica que melhor se adapta à sua necessidade atual. Se estiver com ansiedade aguda, a técnica 4-7-8 pode ser mais eficaz. Para prática regular, a Respiração Quadrada é excelente."
      case 2:
        return "Encontre uma posição confortável, sentado ou deitado. Mantenha as costas retas, ombros relaxados e feche os olhos se preferir. Respire naturalmente algumas vezes antes de começar."
      case 3:
        return "Concentre-se nas sensações da respiração - o ar entrando pelas narinas, o movimento do peito e abdômen. Se a mente divagar, gentilmente traga a atenção de volta para a respiração."
      default:
        return ""
    }
  }

  // Função para obter a mensagem da fase de respiração
  const getBreathingPhaseMessage = () => {
    switch (breathingPhase) {
      case "inhale":
        return "Inspire"
      case "hold":
        return "Segure"
      case "exhale":
        return "Expire"
      case "holdAfterExhale":
        return "Segure"
      default:
        return ""
    }
  }

  // Função para obter a cor da fase de respiração
  const getBreathingPhaseColor = () => {
    switch (breathingPhase) {
      case "inhale":
        return "from-blue-500 to-cyan-300"
      case "hold":
        return "from-purple-500 to-indigo-300"
      case "exhale":
        return "from-teal-500 to-green-300"
      case "holdAfterExhale":
        return "from-amber-500 to-yellow-300"
      default:
        return "from-gray-500 to-gray-300"
    }
  }

  // Função para calcular o progresso total do exercício
  const calculateTotalProgress = () => {
    if (!selectedTechnique || !isBreathingActive) return 0

    const technique = selectedTechnique
    const totalSeconds =
      (technique.inhaleTime + technique.holdTime + technique.exhaleTime + technique.holdAfterExhaleTime) *
      technique.cycles

    let secondsCompleted = 0

    // Ciclos completos
    secondsCompleted +=
      (currentCycle - 1) *
      (technique.inhaleTime + technique.holdTime + technique.exhaleTime + technique.holdAfterExhaleTime)

    // Fase atual
    if (breathingPhase === "hold") {
      secondsCompleted += technique.inhaleTime + (technique.holdTime - secondsLeft)
    } else if (breathingPhase === "exhale") {
      secondsCompleted += technique.inhaleTime + technique.holdTime + (technique.exhaleTime - secondsLeft)
    } else if (breathingPhase === "holdAfterExhale") {
      secondsCompleted +=
        technique.inhaleTime + technique.holdTime + technique.exhaleTime + (technique.holdAfterExhaleTime - secondsLeft)
    } else {
      secondsCompleted += technique.inhaleTime - secondsLeft
    }

    return (secondsCompleted / totalSeconds) * 100
  }

  // Função para calcular o progresso da fase atual
  const calculatePhaseProgress = () => {
    if (!selectedTechnique || !isBreathingActive) return 0

    const technique = selectedTechnique
    let totalPhaseTime = 0

    if (breathingPhase === "inhale") {
      totalPhaseTime = technique.inhaleTime
    } else if (breathingPhase === "hold") {
      totalPhaseTime = technique.holdTime
    } else if (breathingPhase === "exhale") {
      totalPhaseTime = technique.exhaleTime
    } else if (breathingPhase === "holdAfterExhale") {
      totalPhaseTime = technique.holdAfterExhaleTime
    }

    if (totalPhaseTime === 0) return 0

    return ((totalPhaseTime - secondsLeft) / totalPhaseTime) * 100
  }

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  // Animação para o círculo de respiração
  const circleVariants = {
    inhale: {
      scale: [1, 1.5],
      opacity: [0.3, 0.7],
      transition: {
        duration: selectedTechnique?.inhaleTime || 4,
        ease: "easeInOut",
      },
    },
    hold: {
      scale: 1.5,
      opacity: 0.7,
      transition: {
        duration: selectedTechnique?.holdTime || 4,
        ease: "linear",
      },
    },
    exhale: {
      scale: [1.5, 1],
      opacity: [0.7, 0.3],
      transition: {
        duration: selectedTechnique?.exhaleTime || 4,
        ease: "easeInOut",
      },
    },
    holdAfterExhale: {
      scale: 1,
      opacity: 0.3,
      transition: {
        duration: selectedTechnique?.holdAfterExhaleTime || 0,
        ease: "linear",
      },
    },
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/ferramentas" className="flex items-center text-primary hover:text-primary/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Ferramentas
            </Link>
            <h1 className="text-2xl font-bold">Respiração Consciente</h1>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ferramenta">Ferramenta</TabsTrigger>
            <TabsTrigger value="aprender">Aprender</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="ferramenta" className="mt-6">
            <Alert className="mb-6 bg-primary/10 border-primary/20">
              <Info className="h-4 w-4" />
              <AlertTitle>Sobre esta ferramenta</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  A Respiração Consciente é uma técnica poderosa para acalmar o sistema nervoso, reduzir a ansiedade e
                  melhorar o foco.
                </p>
                <p>
                  Esta ferramenta interativa guiará você através de diferentes técnicas de respiração com temporizadores
                  visuais para facilitar a prática.
                </p>
              </AlertDescription>
            </Alert>

            <AnimatePresence mode="wait">
              {!isComplete ? (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>
                          Passo {step} de 3:{" "}
                          {step === 1 ? "Escolha uma Técnica" : step === 2 ? "Preparação" : "Prática"}
                        </CardTitle>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowTip(!showTip)}
                            aria-label="Mostrar dica"
                          >
                            <HelpCircle className="h-5 w-5 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        {step === 1
                          ? "Selecione a técnica de respiração que deseja praticar"
                          : step === 2
                            ? "Prepare-se para o exercício de respiração"
                            : "Siga o guia visual e pratique a respiração consciente"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {showTip && (
                        <Alert className="mb-4 bg-accent/10 border-accent/20">
                          <HelpCircle className="h-4 w-4 text-accent" />
                          <AlertDescription className="text-sm">{getContextualTip()}</AlertDescription>
                        </Alert>
                      )}

                      {step === 1 && (
                        <div className="space-y-4">
                          <RadioGroup
                            value={selectedTechnique?.id || ""}
                            onValueChange={(value) => {
                              const technique = breathingTechniques.find((t) => t.id === value)
                              if (technique) {
                                setSelectedTechnique(technique)
                              }
                            }}
                          >
                            <div className="space-y-4">
                              {breathingTechniques.map((technique) => (
                                <motion.div
                                  key={technique.id}
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.02 }}
                                  className="relative"
                                >
                                  <div
                                    className={`rounded-lg border p-4 ${selectedTechnique?.id === technique.id ? "border-primary bg-primary/5" : "border-border"}`}
                                  >
                                    <RadioGroupItem
                                      value={technique.id}
                                      id={technique.id}
                                      className="absolute right-4 top-4"
                                    />
                                    <div className="mb-2">
                                      <Label htmlFor={technique.id} className="text-lg font-medium cursor-pointer">
                                        {technique.name}
                                      </Label>
                                      <p className="text-sm text-muted-foreground mt-1">{technique.description}</p>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {technique.benefits.slice(0, 2).map((benefit, index) => (
                                        <span
                                          key={index}
                                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                                        >
                                          {benefit}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {step === 2 && selectedTechnique && (
                        <div className="space-y-6">
                          <div className="bg-muted p-4 rounded-lg">
                            <h3 className="font-medium text-lg mb-2">{selectedTechnique.name}</h3>
                            <p className="text-muted-foreground mb-4">{selectedTechnique.description}</p>

                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">Como praticar:</h4>
                              <p className="text-sm">{selectedTechnique.instructions}</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="font-medium">Benefícios:</h3>
                            <ul className="space-y-2">
                              {selectedTechnique.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20">
                                    <span className="text-primary text-xs">✓</span>
                                  </div>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-accent/10 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">Dicas para uma prática eficaz:</h3>
                            <ul className="space-y-1 text-sm">
                              <li>• Encontre um local tranquilo onde não será interrompido</li>
                              <li>• Sente-se em uma posição confortável com a coluna ereta</li>
                              <li>• Solte os ombros e relaxe o maxilar</li>
                              <li>• Feche os olhos para minimizar distrações visuais</li>
                              <li>• Respire naturalmente algumas vezes antes de começar</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {step === 3 && selectedTechnique && (
                        <div className="space-y-6">
                          <div className="flex flex-col items-center justify-center">
                            <div className="relative flex items-center justify-center mb-6">
                              <motion.div
                                className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${getBreathingPhaseColor()} opacity-20`}
                                initial={{ scale: 1, opacity: 0.2 }}
                                animate={isBreathingActive ? breathingPhase : "inhale"}
                                variants={circleVariants}
                                key={`outer-${breathingPhase}-${currentCycle}`}
                              />
                              <motion.div
                                className={`absolute w-48 h-48 rounded-full bg-gradient-to-r ${getBreathingPhaseColor()} opacity-30`}
                                initial={{ scale: 1, opacity: 0.3 }}
                                animate={isBreathingActive ? breathingPhase : "inhale"}
                                variants={circleVariants}
                                key={`inner-${breathingPhase}-${currentCycle}`}
                              />
                              <div className="relative z-10 text-center">
                                {isBreathingActive ? (
                                  <>
                                    <div className="text-3xl font-bold mb-2">{getBreathingPhaseMessage()}</div>
                                    <div className="text-5xl font-bold">{secondsLeft}</div>
                                    <div className="text-sm mt-2">
                                      Ciclo {currentCycle} de {selectedTechnique.cycles}
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-xl font-medium text-center">
                                    Pressione Iniciar quando estiver pronto
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="w-full max-w-md mb-4">
                              <Progress value={calculateTotalProgress()} className="h-2 mb-1" />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Progresso</span>
                                <span>{Math.round(calculateTotalProgress())}%</span>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              {!isBreathingActive ? (
                                <Button onClick={startBreathing} className="bg-gradient-to-r from-primary to-accent">
                                  <Play className="h-4 w-4 mr-2" />
                                  Iniciar
                                </Button>
                              ) : (
                                <Button onClick={pauseBreathing} variant="outline">
                                  <Pause className="h-4 w-4 mr-2" />
                                  Pausar
                                </Button>
                              )}
                              <Button onClick={resetBreathing} variant="outline">
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reiniciar
                              </Button>
                            </div>
                          </div>

                          <div className="bg-muted p-4 rounded-lg mt-6">
                            <h3 className="font-medium mb-2">Lembretes:</h3>
                            <ul className="space-y-1 text-sm">
                              <li>• Respire pelo nariz, a menos que as instruções indiquem o contrário</li>
                              <li>• Mantenha os ombros relaxados durante todo o exercício</li>
                              <li>• Se sentir tontura, volte a respirar normalmente</li>
                              <li>• Observe as sensações no corpo durante a prática</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep} disabled={step === 1}>
                        Voltar
                      </Button>
                      <Button
                        onClick={handleNextStep}
                        className="bg-gradient-to-r from-primary to-accent"
                        disabled={step === 1 && !selectedTechnique}
                      >
                        {step === 3 ? "Concluir" : "Próximo"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="mb-6 border-primary/20">
                    <CardHeader className="bg-primary/5">
                      <div className="flex items-center">
                        <CheckCircle className="h-6 w-6 text-primary mr-2" />
                        <CardTitle>Prática Concluída!</CardTitle>
                      </div>
                      <CardDescription>
                        Parabéns por completar sua sessão de respiração consciente. Como você se sente?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {selectedTechnique && (
                          <div>
                            <h3 className="text-sm font-medium mb-2">Técnica Praticada:</h3>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium">{selectedTechnique.name}</p>
                              <p className="text-sm text-muted-foreground mt-1">{selectedTechnique.description}</p>
                            </div>
                          </div>
                        )}

                        <div>
                          <h3 className="text-sm font-medium mb-2">Como você se sente agora?</h3>
                          <div className="grid grid-cols-5 gap-2 mb-4">
                            {["Muito melhor", "Melhor", "Igual", "Um pouco pior", "Pior"].map((rating, index) => (
                              <Button
                                key={rating}
                                type="button"
                                variant={feedbackRating === index ? "default" : "outline"}
                                className="flex flex-col items-center p-3 h-auto"
                                onClick={() => setFeedbackRating(index)}
                              >
                                <span className="text-xs">{rating}</span>
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Benefícios da Prática Regular:</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            A prática regular da respiração consciente pode trazer benefícios duradouros:
                          </p>
                          <ul className="space-y-1 text-sm">
                            <li>• Redução dos níveis gerais de estresse e ansiedade</li>
                            <li>• Melhora da qualidade do sono</li>
                            <li>• Aumento da capacidade de concentração</li>
                            <li>• Fortalecimento do sistema imunológico</li>
                            <li>• Maior equilíbrio emocional no dia a dia</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
                      <Button variant="outline" onClick={handleRestart}>
                        Praticar Novamente
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-primary to-accent"
                        onClick={() => (window.location.href = "/ferramentas")}
                      >
                        Explorar Mais Ferramentas
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Próximos Passos</CardTitle>
                      <CardDescription>Sugestões para continuar sua prática de respiração consciente</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium flex items-center mb-2">
                            <BookOpen className="h-4 w-4 mr-2 text-primary" />
                            Pratique Diariamente
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Mesmo 5 minutos por dia podem trazer benefícios significativos. Tente incorporar a
                            respiração consciente em momentos específicos da sua rotina.
                          </p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium flex items-center mb-2">
                            <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                            Experimente Outras Técnicas
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Cada técnica de respiração tem benefícios específicos. Explore diferentes métodos para
                            descobrir quais funcionam melhor para você em diferentes situações.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/ferramentas">
                          Voltar para Ferramentas
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="aprender" className="mt-6">
            <div className="prose prose-sm max-w-none">
              <h2 className="text-2xl font-bold mb-4">Sobre a Respiração Consciente</h2>

              <p className="lead mb-6">
                A respiração consciente é uma prática milenar que envolve prestar atenção deliberada ao processo de
                respiração, usando técnicas específicas para regular o ritmo e a profundidade da respiração.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">O que é?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Um conjunto de técnicas que utilizam padrões respiratórios específicos para influenciar o sistema
                      nervoso, acalmar a mente e promover o bem-estar físico e mental.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Por que funciona?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      A respiração é o único processo autônomo que podemos controlar conscientemente, criando uma ponte
                      entre mente e corpo e permitindo influenciar diretamente o sistema nervoso.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4">A Ciência por Trás da Respiração</h3>

              <p className="mb-4">
                A respiração consciente não é apenas uma prática tradicional - é respaldada por extensa pesquisa
                científica que demonstra seus efeitos no corpo e na mente:
              </p>

              <div className="bg-muted p-6 rounded-lg mb-8">
                <h4 className="font-bold mb-3">Efeitos Fisiológicos</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                      <span className="text-primary font-medium">1</span>
                    </div>
                    <div>
                      <strong>Sistema Nervoso Autônomo</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        A respiração lenta e profunda ativa o sistema nervoso parassimpático (responsável pelo "descanso
                        e digestão"), reduzindo a resposta de luta ou fuga e diminuindo os níveis de cortisol.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                      <span className="text-primary font-medium">2</span>
                    </div>
                    <div>
                      <strong>Variabilidade da Frequência Cardíaca</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        Técnicas de respiração melhoram a VFC, um indicador de resiliência ao estresse e saúde
                        cardiovascular geral.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                      <span className="text-primary font-medium">3</span>
                    </div>
                    <div>
                      <strong>Função Cerebral</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        Estudos de neuroimagem mostram que a respiração consciente ativa regiões cerebrais associadas à
                        atenção e reduz a atividade na amígdala, centro do processamento do medo.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">Benefícios Comprovados</h3>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Redução do Estresse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Diminuição dos níveis de cortisol</li>
                      <li>• Redução da pressão arterial</li>
                      <li>• Alívio da tensão muscular</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Saúde Mental</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Redução de sintomas de ansiedade</li>
                      <li>• Melhora do humor</li>
                      <li>• Maior resiliência emocional</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Função Cognitiva</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Aumento da concentração</li>
                      <li>• Melhora da memória de trabalho</li>
                      <li>• Maior clareza mental</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Saúde Física</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Fortalecimento do sistema imunológico</li>
                      <li>• Melhora da função pulmonar</li>
                      <li>• Redução da inflamação crônica</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Sono</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Redução da insônia</li>
                      <li>• Melhora da qualidade do sono</li>
                      <li>• Facilidade para adormecer</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Dor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Redução da percepção da dor</li>
                      <li>• Alívio de dores de cabeça tensionais</li>
                      <li>• Complemento para manejo da dor crônica</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4">Técnicas de Respiração Consciente</h3>

              <p className="mb-4">
                Existem diversas técnicas de respiração, cada uma com propósitos e benefícios específicos:
              </p>

              <Accordion type="single" collapsible className="mb-8">
                <AccordionItem value="technique1">
                  <AccordionTrigger>Respiração 4-7-8</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Desenvolvida pelo Dr. Andrew Weil, esta técnica é conhecida como "tranquilizante natural para o
                      sistema nervoso".
                    </p>
                    <div className="bg-muted p-3 rounded-md mb-2">
                      <p className="font-medium">Como praticar:</p>
                      <ol className="list-decimal pl-5 mt-1 space-y-1 text-sm">
                        <li>Inspire silenciosamente pelo nariz contando até 4</li>
                        <li>Segure a respiração contando até 7</li>
                        <li>Expire completamente pela boca, fazendo um som audível, contando até 8</li>
                        <li>Repita o ciclo 3-4 vezes</li>
                      </ol>
                    </div>
                    <p className="text-sm">
                      <strong>Melhor para:</strong> Ansiedade aguda, dificuldade para dormir, controle de impulsos e
                      gerenciamento de desejos intensos.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technique2">
                  <AccordionTrigger>Respiração Quadrada (Box Breathing)</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Utilizada por Navy SEALs e profissionais de alto desempenho para manter a calma sob pressão.
                    </p>
                    <div className="bg-muted p-3 rounded-md mb-2">
                      <p className="font-medium">Como praticar:</p>
                      <ol className="list-decimal pl-5 mt-1 space-y-1 text-sm">
                        <li>Inspire pelo nariz contando até 4</li>
                        <li>Segure a respiração contando até 4</li>
                        <li>Expire pelo nariz contando até 4</li>
                        <li>Segure com os pulmões vazios contando até 4</li>
                        <li>Repita o ciclo 5-10 vezes</li>
                      </ol>
                    </div>
                    <p className="text-sm">
                      <strong>Melhor para:</strong> Situações de alto estresse, preparação para momentos de desempenho,
                      foco e concentração.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technique3">
                  <AccordionTrigger>Respiração Diafragmática (Abdominal)</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      A base de muitas práticas de respiração, focada em usar o diafragma para respiração profunda e
                      eficiente.
                    </p>
                    <div className="bg-muted p-3 rounded-md mb-2">
                      <p className="font-medium">Como praticar:</p>
                      <ol className="list-decimal pl-5 mt-1 space-y-1 text-sm">
                        <li>Coloque uma mão no peito e outra no abdômen</li>
                        <li>Inspire lentamente pelo nariz, expandindo o abdômen (não o peito)</li>
                        <li>Expire lentamente pela boca ou nariz, contraindo suavemente o abdômen</li>
                        <li>Pratique por 5-10 minutos</li>
                      </ol>
                    </div>
                    <p className="text-sm">
                      <strong>Melhor para:</strong> Prática diária, redução do estresse crônico, melhora da capacidade
                      pulmonar, base para outras técnicas.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technique4">
                  <AccordionTrigger>Respiração Alternada pelas Narinas (Nadi Shodhana)</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Uma técnica do yoga que equilibra os hemisférios cerebrais e harmoniza o sistema nervoso.
                    </p>
                    <div className="bg-muted p-3 rounded-md mb-2">
                      <p className="font-medium">Como praticar:</p>
                      <ol className="list-decimal pl-5 mt-1 space-y-1 text-sm">
                        <li>Feche a narina direita com o polegar direito e inspire pela narina esquerda</li>
                        <li>
                          Feche a narina esquerda com o dedo anelar direito, solte o polegar e expire pela narina
                          direita
                        </li>
                        <li>Inspire pela narina direita</li>
                        <li>Feche a narina direita com o polegar, solte o anelar e expire pela narina esquerda</li>
                        <li>Continue alternando por 5-10 ciclos</li>
                      </ol>
                    </div>
                    <p className="text-sm">
                      <strong>Melhor para:</strong> Equilíbrio energético, preparação para meditação, clareza mental,
                      redução da ansiedade.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technique5">
                  <AccordionTrigger>Respiração Coerente</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Técnica que sincroniza a respiração com o ritmo cardíaco para maximizar a variabilidade da
                      frequência cardíaca.
                    </p>
                    <div className="bg-muted p-3 rounded-md mb-2">
                      <p className="font-medium">Como praticar:</p>
                      <ol className="list-decimal pl-5 mt-1 space-y-1 text-sm">
                        <li>Respire em um ritmo constante de 5-6 respirações por minuto</li>
                        <li>Inspire por aproximadamente 5 segundos</li>
                        <li>Expire por aproximadamente 5 segundos</li>
                        <li>Continue por 5-10 minutos</li>
                      </ol>
                    </div>
                    <p className="text-sm">
                      <strong>Melhor para:</strong> Equilíbrio do sistema nervoso autônomo, redução da pressão arterial,
                      melhora da VFC, resiliência ao estresse.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <h3 className="text-xl font-bold mb-4">Aplicações Práticas</h3>

              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Para Ansiedade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Em momentos de ansiedade aguda, a respiração 4-7-8 ou a respiração quadrada podem interromper o
                      ciclo de pensamentos acelerados e acalmar o sistema nervoso rapidamente.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Dica:</strong> Pratique regularmente quando estiver calmo para usar efetivamente durante
                      crises.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Para Foco</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Antes de tarefas que exigem concentração, a respiração alternada pelas narinas por 3-5 minutos
                      pode equilibrar os hemisférios cerebrais e melhorar o foco.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Dica:</strong> Combine com uma intenção clara sobre a tarefa a ser realizada.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Para Dormir</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      A respiração 4-7-8 praticada deitado na cama pode ajudar a acalmar a mente e preparar o corpo para
                      o sono. A respiração diafragmática lenta também é eficaz.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Dica:</strong> Combine com um relaxamento progressivo dos músculos para resultados ainda
                      melhores.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Para Estresse Crônico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      A respiração coerente praticada diariamente por 10-20 minutos pode reduzir significativamente os
                      níveis de estresse crônico e melhorar a resiliência.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Dica:</strong> Estabeleça um horário regular para praticar, como logo após acordar ou
                      antes de dormir.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mb-8">
                <h3 className="text-xl font-bold mb-3">Evidências Científicas</h3>
                <p className="mb-4">
                  A eficácia da respiração consciente é respaldada por extensa pesquisa científica:
                </p>
                <ul className="space-y-2">
                  <li className="text-sm">
                    • Um estudo publicado no Journal of Alternative and Complementary Medicine demonstrou que a
                    respiração lenta e profunda por apenas 5 minutos pode reduzir significativamente a pressão arterial.
                  </li>
                  <li className="text-sm">
                    • Pesquisadores da Universidade de Stanford descobriram que técnicas específicas de respiração podem
                    aliviar sintomas de ansiedade e depressão tão eficazmente quanto algumas medicações.
                  </li>
                  <li className="text-sm">
                    • Um estudo de 2018 publicado na Frontiers in Human Neuroscience identificou um centro neural no
                    tronco cerebral que conecta a respiração ao estado de alerta, explicando como padrões respiratórios
                    diferentes afetam nosso estado mental.
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">Integrando a Respiração Consciente no Dia a Dia</h3>

              <ol className="space-y-4 mb-6">
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <strong>Crie âncoras de respiração</strong>
                    <p className="text-muted-foreground mt-1">
                      Associe a prática a atividades diárias específicas, como antes de checar e-mails, ao entrar no
                      carro, ou antes das refeições.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <strong>Pratique micro-intervenções</strong>
                    <p className="text-muted-foreground mt-1">
                      Mesmo 3-5 respirações conscientes podem ter um impacto significativo. Faça pausas breves ao longo
                      do dia para respirar profundamente.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <strong>Use lembretes</strong>
                    <p className="text-muted-foreground mt-1">
                      Configure alarmes discretos no celular ou use aplicativos de respiração que enviam lembretes
                      periódicos.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">4</span>
                  </div>
                  <div>
                    <strong>Combine com outras práticas</strong>
                    <p className="text-muted-foreground mt-1">
                      Integre a respiração consciente com yoga, meditação, ou antes de exercícios físicos para
                      potencializar os benefícios.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">5</span>
                  </div>
                  <div>
                    <strong>Adapte às necessidades</strong>
                    <p className="text-muted-foreground mt-1">
                      Diferentes técnicas servem a diferentes propósitos. Aprenda várias e use a mais adequada para cada
                      situação.
                    </p>
                  </div>
                </li>
              </ol>

              <h3 className="text-xl font-bold mb-4">Recursos Adicionais</h3>

              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Livros Recomendados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>"Respire" - James Nestor</li>
                      <li>"A Ciência da Respiração" - Swami Rama</li>
                      <li>"O Poder da Respiração" - Anders Olsson</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Aplicativos Úteis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>Breathwrk - Guias visuais e sonoros para diferentes técnicas</li>
                      <li>Calm - Inclui exercícios de respiração para diferentes objetivos</li>
                      <li>Prana Breath - Personalizável para diferentes técnicas</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Perguntas Frequentes</CardTitle>
                <CardDescription>Respostas para dúvidas comuns sobre Respiração Consciente</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="q1">
                    <AccordionTrigger>Com que frequência devo praticar a respiração consciente?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        O ideal é praticar diariamente, mesmo que por períodos curtos (5-10 minutos). Benefícios
                        significativos são observados com prática regular. Além disso, é útil incorporar micro-práticas
                        (3-5 respirações profundas) em vários momentos do dia, especialmente antes de situações
                        estressantes ou quando sentir ansiedade surgindo.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q2">
                    <AccordionTrigger>É normal sentir tontura durante os exercícios de respiração?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Uma leve tontura pode ocorrer, especialmente para iniciantes, devido à mudança nos níveis de
                        oxigênio e dióxido de carbono no sangue. Se isso acontecer, pare o exercício e volte a respirar
                        normalmente. Com o tempo, seu corpo se adaptará. Se a tontura for intensa ou persistente, reduza
                        a duração ou intensidade do exercício e considere consultar um profissional de saúde.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q3">
                    <AccordionTrigger>Qual é a melhor posição para praticar respiração consciente?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        A posição ideal é sentada com a coluna ereta, ombros relaxados e mãos descansando sobre as coxas
                        ou no colo. Isso permite expansão pulmonar completa e fluxo de ar adequado. No entanto, você
                        também pode praticar deitado (especialmente para relaxamento antes de dormir) ou mesmo em pé. O
                        mais importante é manter a coluna alinhada e os ombros relaxados, independentemente da posição
                        escolhida.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q4">
                    <AccordionTrigger>
                      Quanto tempo leva para sentir os benefícios da respiração consciente?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Muitas pessoas sentem benefícios imediatos após uma única sessão, como redução da ansiedade e
                        maior clareza mental. Para benefícios mais profundos e duradouros, como redução do estresse
                        crônico e melhora da saúde geral, a prática regular por 4-8 semanas geralmente produz resultados
                        notáveis. Lembre-se que, assim como qualquer prática, a consistência é mais importante que a
                        duração de cada sessão.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q5">
                    <AccordionTrigger>Devo respirar pelo nariz ou pela boca?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Na maioria das técnicas de respiração consciente, recomenda-se inspirar pelo nariz e expirar
                        pelo nariz ou pela boca, dependendo da técnica específica. A respiração nasal filtra, aquece e
                        umidifica o ar, além de promover a produção de óxido nítrico, que tem benefícios para a saúde.
                        No entanto, se você estiver congestionado ou tiver dificuldade para respirar pelo nariz, é
                        perfeitamente aceitável adaptar e respirar pela boca.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q6">
                    <AccordionTrigger>
                      A respiração consciente pode substituir medicamentos para ansiedade?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Embora a respiração consciente seja uma ferramenta poderosa para gerenciar a ansiedade, ela não
                        deve ser considerada um substituto para tratamentos médicos prescritos sem consultar um
                        profissional de saúde. Para muitas pessoas, a respiração consciente funciona melhor como um
                        complemento ao tratamento convencional. Se você está tomando medicamentos para ansiedade ou
                        outros transtornos, converse com seu médico antes de fazer qualquer alteração no seu regime de
                        tratamento.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q7">
                    <AccordionTrigger>Como saber se estou respirando corretamente?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Na respiração diafragmática adequada, seu abdômen (não o peito) deve expandir durante a
                        inspiração e contrair durante a expiração. Uma maneira simples de verificar é colocar uma mão no
                        peito e outra no abdômen - a mão no abdômen deve mover-se mais. Além disso, a respiração ideal é
                        suave, silenciosa e relaxada, sem esforço ou tensão. Com a prática regular, a respiração correta
                        se tornará mais natural e intuitiva.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

