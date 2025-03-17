"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Brain, Play, Pause, Clock, Calendar, Info, Plus, Save, FileText, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { Slider } from "@/components/ui/slider"

// Tipo para o registro de meditação
interface MeditationSession {
  id: string
  date: string
  duration: number
  type: string
  notes: string
  createdAt: string
  updatedAt: string
}

// Tipo para meditação guiada
interface GuidedMeditation {
  id: string
  title: string
  description: string
  duration: number
  level: "Iniciante" | "Intermediário" | "Avançado" | "Todos os níveis"
  audioUrl?: string
}

export default function MeditacoesPage() {
  const [sessions, setSessions] = useState<MeditationSession[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [activeTab, setActiveTab] = useState<"guided" | "timer">("guided")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMeditation, setCurrentMeditation] = useState<GuidedMeditation | null>(null)
  const [timerDuration, setTimerDuration] = useState(5)
  const [remainingTime, setRemainingTime] = useState(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

  // Estado para o formulário
  const [formData, setFormData] = useState({
    duration: 10,
    type: "Respiração Consciente",
    notes: "",
  })

  // Meditações guiadas disponíveis
  const guidedMeditations: GuidedMeditation[] = [
    {
      id: "1",
      title: "Respiração Consciente",
      description:
        "Uma prática simples para acalmar a mente e trazer atenção para o momento presente através da respiração.",
      duration: 10,
      level: "Iniciante",
    },
    {
      id: "2",
      title: "Body Scan",
      description: "Uma prática que ajuda a desenvolver consciência corporal e liberar tensões físicas.",
      duration: 15,
      level: "Intermediário",
    },
    {
      id: "3",
      title: "Redução de Ansiedade",
      description: "Uma meditação específica para momentos de ansiedade, ajudando a acalmar o sistema nervoso.",
      duration: 12,
      level: "Todos os níveis",
    },
    {
      id: "4",
      title: "Meditação para Dormir",
      description: "Uma prática relaxante para ajudar a acalmar a mente e preparar o corpo para um sono tranquilo.",
      duration: 20,
      level: "Todos os níveis",
    },
    {
      id: "5",
      title: "Loving-Kindness (Metta)",
      description: "Prática para cultivar sentimentos de bondade e compaixão por si mesmo e pelos outros.",
      duration: 15,
      level: "Intermediário",
    },
  ]

  // Tipos de meditação disponíveis
  const meditationTypes = [
    "Respiração Consciente",
    "Body Scan",
    "Loving-Kindness",
    "Visualização",
    "Meditação Guiada",
    "Meditação Silenciosa",
    "Outro",
  ]

  // Carregar sessões do localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem("meditationSessions")
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions))
    } else {
      // Dados de exemplo para demonstração
      const exampleSessions: MeditationSession[] = [
        {
          id: "1",
          date: "2025-03-05",
          duration: 10,
          type: "Respiração Consciente",
          notes: "Consegui manter o foco por mais tempo hoje. Notei menos pensamentos intrusivos.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          date: "2025-03-04",
          duration: 15,
          type: "Body Scan",
          notes: "Senti dificuldade em relaxar as áreas de tensão nos ombros e pescoço.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          date: "2025-03-03",
          duration: 5,
          type: "Respiração Consciente",
          notes: "Meditação curta antes do trabalho. Ajudou a começar o dia com mais calma.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
      setSessions(exampleSessions)
      localStorage.setItem("meditationSessions", JSON.stringify(exampleSessions))
    }
  }, [])

  // Função para iniciar o timer de meditação
  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval)

    const duration = timerDuration * 60
    setRemainingTime(duration)
    setIsPlaying(true)

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setTimerInterval(interval)
  }

  // Função para pausar o timer
  const pauseTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
    setIsPlaying(false)
  }

  // Função para iniciar uma meditação guiada
  const startGuidedMeditation = (meditation: GuidedMeditation) => {
    setCurrentMeditation(meditation)
    // Em uma implementação real, aqui você iniciaria a reprodução do áudio
    setIsPlaying(true)
  }

  // Função para pausar uma meditação guiada
  const pauseGuidedMeditation = () => {
    // Em uma implementação real, aqui você pausaria a reprodução do áudio
    setIsPlaying(false)
  }

  // Função para formatar o tempo restante
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Função para salvar um novo registro
  const saveSession = () => {
    const newSession: MeditationSession = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      duration: formData.duration,
      type: formData.type,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedSessions = [...sessions, newSession]
    setSessions(updatedSessions)
    localStorage.setItem("meditationSessions", JSON.stringify(updatedSessions))

    // Resetar formulário e fechar diálogo
    setFormData({
      duration: 10,
      type: "Respiração Consciente",
      notes: "",
    })
    setIsAddDialogOpen(false)
  }

  // Função para atualizar um registro existente
  const updateSession = () => {
    if (!selectedSession) return

    const updatedSession: MeditationSession = {
      ...selectedSession,
      duration: formData.duration,
      type: formData.type,
      notes: formData.notes,
      updatedAt: new Date().toISOString(),
    }

    const updatedSessions = sessions.map((session) => (session.id === selectedSession.id ? updatedSession : session))

    setSessions(updatedSessions)
    localStorage.setItem("meditationSessions", JSON.stringify(updatedSessions))

    // Resetar formulário e fechar diálogo
    setFormData({
      duration: 10,
      type: "Respiração Consciente",
      notes: "",
    })
    setIsEditDialogOpen(false)
  }

  // Função para excluir um registro
  const deleteSession = () => {
    if (!selectedSession) return

    const updatedSessions = sessions.filter((session) => session.id !== selectedSession.id)
    setSessions(updatedSessions)
    localStorage.setItem("meditationSessions", JSON.stringify(updatedSessions))

    setIsDeleteDialogOpen(false)
    setSelectedSession(null)
  }

  // Função para abrir o diálogo de visualização
  const openViewDialog = (session: MeditationSession) => {
    setSelectedSession(session)
    setIsViewDialogOpen(true)
  }

  // Função para abrir o diálogo de edição
  const openEditDialog = (session: MeditationSession) => {
    setSelectedSession(session)
    setFormData({
      duration: session.duration,
      type: session.type,
      notes: session.notes,
    })
    setIsEditDialogOpen(true)
  }

  // Função para abrir o diálogo de exclusão
  const openDeleteDialog = (session: MeditationSession) => {
    setSelectedSession(session)
    setIsDeleteDialogOpen(true)
  }

  // Formatação de data para exibição
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: pt })
    } catch (error) {
      return dateString
    }
  }

  // Limpar o intervalo quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval)
    }
  }, [timerInterval])

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/ferramentas" className="flex items-center text-primary hover:text-primary/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Ferramentas
            </Link>
            <h1 className="text-2xl font-bold">Meditações</h1>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Meditação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Registrar Meditação</DialogTitle>
                <DialogDescription>Adicione os detalhes da sua prática de meditação.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (minutos)</Label>
                    <Select
                      value={formData.duration.toString()}
                      onValueChange={(value) => setFormData({ ...formData, duration: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 10, 15, 20, 30, 45, 60].map((duration) => (
                          <SelectItem key={duration} value={duration.toString()}>
                            {duration} minutos
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Meditação</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {meditationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Anotações</Label>
                  <Textarea
                    id="notes"
                    placeholder="Como foi sua experiência? O que você notou durante a prática?"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={saveSession} className="bg-gradient-to-r from-primary to-accent">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {showIntroduction && (
          <Alert className="mb-6 bg-primary/10 border-primary/20">
            <Info className="h-4 w-4" />
            <AlertTitle>Meditações Guiadas e Timer</AlertTitle>
            <AlertDescription>
              <p className="mb-2">
                Esta ferramenta oferece meditações guiadas e um timer para suas práticas de mindfulness. Você também
                pode registrar suas sessões para acompanhar seu progresso.
              </p>
              <p className="mb-2">
                Seus registros são salvos localmente no seu navegador e não são compartilhados com ninguém.
              </p>
              <Button variant="outline" size="sm" onClick={() => setShowIntroduction(false)} className="mt-2">
                Entendi
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Praticar Meditação</CardTitle>
                  <CardDescription>Escolha entre meditações guiadas ou use o timer</CardDescription>
                </div>
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant={activeTab === "guided" ? "default" : "ghost"}
                    className="rounded-none"
                    onClick={() => setActiveTab("guided")}
                  >
                    Guiadas
                  </Button>
                  <Button
                    variant={activeTab === "timer" ? "default" : "ghost"}
                    className="rounded-none"
                    onClick={() => setActiveTab("timer")}
                  >
                    Timer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === "guided" ? (
                <div className="space-y-4">
                  {currentMeditation ? (
                    <div className="text-center">
                      <h3 className="text-xl font-medium mb-2">{currentMeditation.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{currentMeditation.description}</p>

                      <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-16 w-16 rounded-full"
                          onClick={() =>
                            isPlaying ? pauseGuidedMeditation() : startGuidedMeditation(currentMeditation)
                          }
                        >
                          {isPlaying ? (
                            <Pause className="h-8 w-8 text-primary" />
                          ) : (
                            <Play className="h-8 w-8 text-primary ml-1" />
                          )}
                        </Button>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{currentMeditation.duration} minutos</span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => {
                          setCurrentMeditation(null)
                          setIsPlaying(false)
                        }}
                      >
                        Voltar às meditações
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {guidedMeditations.map((meditation) => (
                        <div key={meditation.id} className="rounded-md border p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{meditation.title}</h3>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3" />
                                <span>{meditation.duration} minutos</span>
                                <span>•</span>
                                <span>{meditation.level}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">{meditation.description}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => startGuidedMeditation(meditation)}
                            >
                              <Play className="h-4 w-4" />
                              Iniciar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Timer de Meditação</h3>
                    <p className="text-sm text-muted-foreground">Defina a duração da sua prática e inicie o timer.</p>
                  </div>

                  {isPlaying ? (
                    <div>
                      <div className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <div className="text-center">
                          <div className="text-3xl font-medium">{formatTime(remainingTime)}</div>
                          <div className="text-xs text-muted-foreground mt-1">restantes</div>
                        </div>
                      </div>

                      <Button variant="outline" size="lg" className="mt-4" onClick={pauseTimer}>
                        <Pause className="h-4 w-4 mr-2" />
                        Pausar
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6">
                        <Label htmlFor="timer-duration" className="mb-2 block">
                          Duração (minutos)
                        </Label>
                        <div className="flex items-center gap-4">
                          <Slider
                            id="timer-duration"
                            value={[timerDuration]}
                            min={1}
                            max={60}
                            step={1}
                            onValueChange={(value) => setTimerDuration(value[0])}
                            className="w-48 mx-auto"
                          />
                          <span className="text-lg font-medium w-8">{timerDuration}</span>
                        </div>
                      </div>

                      <Button className="bg-gradient-to-r from-primary to-accent" size="lg" onClick={startTimer}>
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar Meditação
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Meditações</CardTitle>
              <CardDescription>Acompanhe sua prática ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <div className="text-center py-4">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Nenhuma meditação registrada ainda.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="font-medium">{session.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(session.date)}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{session.duration} minutos</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openViewDialog(session)}>
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Ver</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(session)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(session)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Registrar Meditação
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Diálogo de Visualização */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes da Meditação</DialogTitle>
              <DialogDescription>Registro completo da sessão de meditação</DialogDescription>
            </DialogHeader>
            {selectedSession && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(selectedSession.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedSession.duration} minutos</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Tipo de Meditação:</h4>
                    <div className="bg-muted p-3 rounded-md text-sm">{selectedSession.type}</div>
                  </div>

                  {selectedSession.notes && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Anotações:</h4>
                      <div className="bg-muted p-3 rounded-md text-sm">{selectedSession.notes}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Fechar
              </Button>
              {selectedSession && (
                <Button
                  variant="default"
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    openEditDialog(selectedSession)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Meditação</DialogTitle>
              <DialogDescription>Atualize os detalhes da sua sessão de meditação.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duração (minutos)</Label>
                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(value) => setFormData({ ...formData, duration: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a duração" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 15, 20, 30, 45, 60].map((duration) => (
                        <SelectItem key={duration} value={duration.toString()}>
                          {duration} minutos
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Tipo de Meditação</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {meditationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes">Anotações</Label>
                <Textarea
                  id="edit-notes"
                  placeholder="Como foi sua experiência? O que você notou durante a prática?"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={updateSession} className="bg-gradient-to-r from-primary to-accent">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo de Exclusão */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir este registro de meditação? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedSession && (
                <div className="bg-muted p-3 rounded-md text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{selectedSession.type}</span>
                    <span className="text-xs text-muted-foreground">{selectedSession.duration} minutos</span>
                  </div>
                  <p className="text-muted-foreground mt-1">{formatDate(selectedSession.date)}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={deleteSession}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Sobre a Meditação</CardTitle>
              <CardDescription>Benefícios e dicas para uma prática regular</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  A meditação é uma prática milenar que envolve treinar a atenção e a consciência para alcançar um
                  estado mental de clareza e equilíbrio emocional. Pesquisas científicas têm demonstrado diversos
                  benefícios da prática regular:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Redução de stress e ansiedade</li>
                  <li>Melhora na qualidade do sono</li>
                  <li>Aumento da capacidade de concentração e foco</li>
                  <li>Maior regulação emocional</li>
                  <li>Diminuição de sintomas depressivos</li>
                  <li>Melhora no sistema imunológico</li>
                  <li>Redução da pressão arterial</li>
                </ul>
                <p>Para estabelecer uma prática regular de meditação, considere estas dicas:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Comece com sessões curtas (5-10 minutos) e aumente gradualmente</li>
                  <li>Escolha um horário específico do dia para praticar</li>
                  <li>Crie um espaço tranquilo e confortável para sua prática</li>
                  <li>Experimente diferentes técnicas para descobrir o que funciona melhor para você</li>
                  <li>Use aplicativos ou meditações guiadas se estiver começando</li>
                  <li>Seja gentil consigo mesmo - a mente divagando é parte normal do processo</li>
                  <li>Mantenha um registro das suas práticas para acompanhar seu progresso</li>
                </ul>
                <p>
                  Lembre-se que a meditação é uma habilidade que se desenvolve com o tempo. A consistência é mais
                  importante que a duração - é melhor meditar 5 minutos todos os dias do que 30 minutos uma vez por
                  semana.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

