"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Pause, 
  Play, 
  RotateCcw, 
  Wind, 
  Clock, 
  Check,
  AlertCircle,
  LucideProps,
  ArrowUp
} from "lucide-react"

interface BreathingTechnique {
  id: string
  name: string
  description: string
  inhaleTime: number // em segundos
  holdTime: number // em segundos
  exhaleTime: number // em segundos
  holdAfterExhaleTime: number // em segundos
  cycles: number
  instructions: string[]
  benefits: string[]
}

// Ícones personalizados para as diferentes fases
const InhaleIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22v-9" />
    <path d="M12 13a9 9 0 0 0 9-9" />
    <path d="M12 13a9 9 0 0 1-9-9" />
  </svg>
)

const ExhaleIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2v9" />
    <path d="M12 11a9 9 0 0 0 9 9" />
    <path d="M12 11a9 9 0 0 1-9 9" />
  </svg>
)

const HoldIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="8" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
)

export function RespiracaoConscienteClient() {
  const [selectedTechnique, setSelectedTechnique] = useState<string>("four-seven-eight")
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "holdAfterExhale">("inhale")
  const [currentCycle, setCurrentCycle] = useState(1)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [progress, setProgress] = useState(0)
  const [sessionCompleted, setSessionCompleted] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const breathingTechniques: BreathingTechnique[] = [
    {
      id: "four-seven-eight",
      name: "Respiração 4-7-8",
      description: "Uma técnica poderosa para acalmar o sistema nervoso e reduzir a ansiedade.",
      inhaleTime: 4,
      holdTime: 7,
      exhaleTime: 8,
      holdAfterExhaleTime: 0,
      cycles: 4,
      instructions: [
        "Inspire pelo nariz durante 4 segundos",
        "Segure a respiração durante 7 segundos",
        "Expire pela boca durante 8 segundos",
      ],
      benefits: [
        "Reduz a ansiedade e o stress",
        "Ajuda a adormecer mais rapidamente",
        "Diminui a pressão arterial e frequência cardíaca",
        "Melhora a concentração"
      ]
    },
    {
      id: "box-breathing",
      name: "Respiração Quadrada",
      description: "Técnica de respiração equilibrada para aumentar o foco e a concentração.",
      inhaleTime: 4,
      holdTime: 4,
      exhaleTime: 4,
      holdAfterExhaleTime: 4,
      cycles: 4,
      instructions: [
        "Inspire pelo nariz durante 4 segundos",
        "Segure a respiração durante 4 segundos",
        "Expire pela boca durante 4 segundos",
        "Segure a respiração durante 4 segundos",
      ],
      benefits: [
        "Melhora a concentração e atenção",
        "Aumenta a clareza mental",
        "Reduz o stress físico e mental",
        "Fortalece a resiliência mental"
      ]
    }
  ]

  const getCurrentTechnique = () => {
    return breathingTechniques.find(t => t.id === selectedTechnique) || breathingTechniques[0]
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // Reset session completed when technique changes
  useEffect(() => {
    setSessionCompleted(false)
  }, [selectedTechnique])

  useEffect(() => {
    if (isActive) {
      const currentTechnique = getCurrentTechnique()
      let phaseDuration = 0
      
      // Definir a duração da fase atual
      switch (phase) {
        case "inhale":
          phaseDuration = currentTechnique.inhaleTime
          break
        case "hold":
          phaseDuration = currentTechnique.holdTime
          break
        case "exhale":
          phaseDuration = currentTechnique.exhaleTime
          break
        case "holdAfterExhale":
          phaseDuration = currentTechnique.holdAfterExhaleTime
          break
      }
      
      // Se não tiver segundos definidos, inicializar
      if (remainingSeconds <= 0) {
        setRemainingSeconds(phaseDuration)
      }
      
      // Iniciar temporizador
      const timer = setInterval(() => {
        setRemainingSeconds(prev => {
          const newValue = prev - 1
          
          // Calcular o progresso para a animação
          setProgress(100 - (newValue / phaseDuration * 100))
          
          if (newValue <= 0) {
            // Mudar para a próxima fase
            let nextPhase: "inhale" | "hold" | "exhale" | "holdAfterExhale" = "inhale"
            let nextCycle = currentCycle
            
            if (phase === "inhale") {
              nextPhase = "hold"
            } else if (phase === "hold") {
              nextPhase = "exhale"
            } else if (phase === "exhale") {
              if (currentTechnique.holdAfterExhaleTime > 0) {
                nextPhase = "holdAfterExhale"
              } else {
                nextPhase = "inhale"
                
                // Verificar se é o final do ciclo
                if (nextCycle >= currentTechnique.cycles) {
                  // Exercício concluído
                  setIsActive(false)
                  setCurrentCycle(1)
                  setSessionCompleted(true)
                  return 0
                }
                
                nextCycle++
              }
            } else if (phase === "holdAfterExhale") {
              nextPhase = "inhale"
              
              // Verificar se é o final do ciclo
              if (nextCycle >= currentTechnique.cycles) {
                // Exercício concluído
                setIsActive(false)
                setCurrentCycle(1)
                setSessionCompleted(true)
                return 0
              }
              
              nextCycle++
            }
            
            setPhase(nextPhase)
            setCurrentCycle(nextCycle)
            
            // Define a duração da próxima fase
            let nextPhaseDuration = 0
            switch (nextPhase) {
              case "inhale":
                nextPhaseDuration = currentTechnique.inhaleTime
                break
              case "hold":
                nextPhaseDuration = currentTechnique.holdTime
                break
              case "exhale":
                nextPhaseDuration = currentTechnique.exhaleTime
                break
              case "holdAfterExhale":
                nextPhaseDuration = currentTechnique.holdAfterExhaleTime
                break
            }
            
            return nextPhaseDuration;
          }
          
          return newValue
        })
      }, 1000)
      
      timerRef.current = timer
      
      return () => {
        clearInterval(timer)
      }
    }
  }, [isActive, phase, currentCycle, selectedTechnique])

  const handleStartPause = () => {
    setSessionCompleted(false)
    
    if (!isActive) {
      // Iniciar/retomar o exercício
      setIsActive(true)
      
      // Reiniciar contagem no início se necessário
      const currentTechnique = getCurrentTechnique()
      if (remainingSeconds <= 0) {
        setRemainingSeconds(currentTechnique.inhaleTime)
        setPhase("inhale")
      }
    } else {
      // Pausar o exercício
      setIsActive(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const handleReset = () => {
    setIsActive(false)
    setPhase("inhale")
    setCurrentCycle(1)
    setRemainingSeconds(0)
    setProgress(0)
    setSessionCompleted(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const handleTechniqueChange = (id: string) => {
    if (isActive) {
      handleReset()
    }
    setSelectedTechnique(id)
  }

  const currentTechnique = getCurrentTechnique()
  
  // Configurações de visualização específicas para cada fase
  const getPhaseColor = () => {
    switch (phase) {
      case "inhale": return "hsl(var(--primary))"
      case "hold": return "#f59e0b" // amber-500
      case "exhale": return "#6366f1" // indigo-500
      case "holdAfterExhale": return "#8b5cf6" // violet-500
      default: return "hsl(var(--primary))"
    }
  }

  const getPhaseIcon = () => {
    switch (phase) {
      case "inhale": return <InhaleIcon className="h-8 w-8 text-primary animate-pulse" />
      case "exhale": return <ExhaleIcon className="h-8 w-8 text-indigo-500" />
      case "hold":
      case "holdAfterExhale": 
        return <HoldIcon className="h-8 w-8 text-amber-500" />
      default: return <Wind className="h-8 w-8" />
    }
  }

  const getPhaseText = () => {
    switch (phase) {
      case "inhale": return "Inspire"
      case "exhale": return "Expire"
      case "hold": return "Segure"
      case "holdAfterExhale": return "Segure"
      default: return "Relaxe"
    }
  }

  const getAnimationStyle = () => {
    if (!isActive) return {}
    
    switch (phase) {
      case "inhale":
        return { 
          transform: `scale(${0.9 + (progress/100) * 0.3})`,
          transition: 'transform 1s ease-in-out'
        }
      case "exhale":
        return { 
          transform: `scale(${1.2 - (progress/100) * 0.3})`,
          transition: 'transform 1s ease-in-out'
        }
      case "hold":
      case "holdAfterExhale":
        return { 
          transform: phase === "hold" ? 'scale(1.2)' : 'scale(0.9)',
          boxShadow: `0 0 ${15 + (Math.sin(Date.now() / 300) + 1) * 10}px ${getPhaseColor()}`
        }
      default:
        return {}
    }
  }

  const getPhaseInstruction = () => {
    switch (phase) {
      case "inhale": return "Inspire lentamente pelo nariz"
      case "exhale": return "Expire lentamente pela boca"
      case "hold": return "Segure a respiração"
      case "holdAfterExhale": return "Segure com os pulmões vazios"
      default: return "Relaxe"
    }
  }

  const renderCompletedSession = () => {
    return (
      <div className="text-center p-4">
        <Check className="h-12 w-12 mx-auto mb-3 text-primary" />
        <div className="text-xl font-medium mb-2">Exercício concluído!</div>
        <div className="text-sm text-muted-foreground mb-4">
          <p className="mb-2">Parabéns! Como se sente agora?</p>
          <p>Termine com mais algumas respirações profundas e observe como se sente.</p>
        </div>
        <div className="flex justify-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            size="sm"
            className="flex items-center"
          >
            <RotateCcw className="h-3 w-3 mr-2" />
            Praticar novamente
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center"
          >
            <ArrowUp className="h-3 w-3 mr-2" />
            Voltar ao topo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/ferramentas"
            className="flex items-center text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Ferramentas
          </Link>
          <h1 className="text-2xl font-bold">Respiração Consciente</h1>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Respiração Consciente</CardTitle>
          <CardDescription>
            Uma técnica poderosa para acalmar o sistema nervoso, reduzir a ansiedade e melhorar o foco.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={selectedTechnique} onValueChange={handleTechniqueChange} className="mb-6">
            <TabsList className="grid grid-cols-2">
              {breathingTechniques.map((technique) => (
                <TabsTrigger key={technique.id} value={technique.id}>
                  {technique.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {breathingTechniques.map((technique) => (
              <TabsContent key={technique.id} value={technique.id}>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium mb-2">Como praticar:</h3>
                    <p className="mb-2">{technique.description}</p>
                    <ul className="list-disc list-inside space-y-1">
                      {technique.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="font-medium mb-2">Benefícios:</h3>
                    <ul className="space-y-1">
                      {technique.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-72 h-72 flex items-center justify-center mb-8">
              {/* Círculo de fundo com gradiente */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: isActive 
                    ? `conic-gradient(from 0deg, ${getPhaseColor()} 0%, ${getPhaseColor()} ${progress}%, transparent ${progress}%, transparent 100%)`
                    : sessionCompleted 
                      ? 'conic-gradient(from 0deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%, transparent 100%, transparent 100%)'
                      : 'hsl(var(--muted))',
                  opacity: 0.2
                }}
              />
              
              {/* Círculo animado principal */}
              <div 
                className="absolute rounded-full bg-background border-4 transition-all duration-300"
                style={{
                  borderColor: isActive 
                    ? getPhaseColor() 
                    : sessionCompleted 
                      ? 'hsl(var(--primary))' 
                      : 'hsl(var(--muted))',
                  width: '85%',
                  height: '85%',
                  ...getAnimationStyle()
                }}
              />
              
              {/* Conteúdo central com instruções */}
              <div className="absolute z-10 flex flex-col items-center justify-center text-center">
                {isActive ? (
                  <>
                    {getPhaseIcon()}
                    <div className="text-3xl font-bold my-2" style={{ color: getPhaseColor() }}>
                      {getPhaseText()}
                    </div>
                    <div className="text-2xl font-semibold">{remainingSeconds}s</div>
                    <div className="text-sm text-muted-foreground max-w-40 mt-1">
                      {getPhaseInstruction()}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Ciclo {currentCycle} de {currentTechnique.cycles}
                      </span>
                    </div>
                  </>
                ) : sessionCompleted ? (
                  renderCompletedSession()
                ) : (
                  <div className="text-center p-4">
                    <Wind className="h-10 w-10 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-medium mb-1">Pronto para começar?</div>
                    <div className="text-sm text-muted-foreground">Clique em Iniciar</div>
                  </div>
                )}
              </div>
              
              {/* Indicadores de fase ao redor do círculo */}
              {isActive && (
                <div className="absolute w-full h-full">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className={`w-3 h-3 rounded-full ${phase === "inhale" ? "bg-primary" : "bg-muted"}`} />
                  </div>
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                    <div className={`w-3 h-3 rounded-full ${phase === "hold" ? "bg-amber-500" : "bg-muted"}`} />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className={`w-3 h-3 rounded-full ${phase === "exhale" ? "bg-indigo-500" : "bg-muted"}`} />
                  </div>
                  {currentTechnique.holdAfterExhaleTime > 0 && (
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className={`w-3 h-3 rounded-full ${phase === "holdAfterExhale" ? "bg-violet-500" : "bg-muted"}`} />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              {!sessionCompleted && (
                <Button 
                  onClick={handleStartPause}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isActive ? "Pausar" : "Iniciar"}
                </Button>
              )}
              
              {isActive && (
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reiniciar
                </Button>
              )}
            </div>
            
            {!isActive && !sessionCompleted && (
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <p>Certifique-se de estar em um local tranquilo e confortável.</p>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Pratique esta técnica de respiração regularmente para obter melhores resultados. 
            Recomenda-se pelo menos 5 minutos por dia para reduzir o stress e a ansiedade.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

