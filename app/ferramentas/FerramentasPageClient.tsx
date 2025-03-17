"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, FileText, Heart, Target, Calendar, ArrowRight, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function FerramentasPageClient() {
  const [activeCategory, setActiveCategory] = useState("todas")
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aqui você pode adicionar a lógica para enviar os dados para um servidor
    // Por exemplo, usando fetch para uma API

    // Exibe a mensagem de sucesso
    toast.success("Inscrição realizada com sucesso! Entraremos em contato em breve.", {
      duration: 5000,
    })

    // Marca como enviado para mostrar a mensagem de confirmação
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setFormData({ name: "", email: "" })
    setIsSubmitted(false)
    setOpen(false)
  }

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

  return (
    <main className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Ferramentas para seu Bem-estar Mental
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore nossas ferramentas gratuitas baseadas em Terapia Cognitivo-Comportamental para apoiar sua jornada
              de autoconhecimento e saúde mental.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
                <a href="#ferramentas">Explorar Ferramentas</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/sobre">Sobre a TCC</Link>
              </Button>
            </div>
          </div>

          <div id="ferramentas" className="scroll-mt-16">
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Nossas Ferramentas</h2>
              <Tabs defaultValue="todas" className="w-full max-w-3xl" onValueChange={handleCategoryChange}>
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="todas">Todas</TabsTrigger>
                  <TabsTrigger value="autoconhecimento">Autoconhecimento</TabsTrigger>
                  <TabsTrigger value="relaxamento">Relaxamento</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className={activeCategory !== "todas" && activeCategory !== "autoconhecimento" ? "hidden" : ""}
              >
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Registro de Pensamentos</CardTitle>
                    <CardDescription>Identifique e desafie pensamentos negativos</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2 flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">
                      Uma ferramenta essencial da TCC para identificar padrões de pensamento negativos e desenvolver
                      perspectivas mais equilibradas.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Autoconhecimento
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Ansiedade</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Depressão</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-accent">
                      <Link href="/ferramentas/registro-pensamentos">
                        Acessar Ferramenta <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={activeCategory !== "todas" && activeCategory !== "autoconhecimento" ? "hidden" : ""}
              >
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Diário de Gratidão</CardTitle>
                    <CardDescription>Cultive uma perspectiva mais positiva</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2 flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">
                      Registre diariamente coisas pelas quais você é grato para melhorar seu bem-estar e treinar seu
                      cérebro a notar o positivo.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Autoconhecimento
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Bem-estar</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Positividade</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-accent">
                      <Link href="/ferramentas/diario-gratidao">
                        Acessar Ferramenta <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={activeCategory !== "todas" && activeCategory !== "autoconhecimento" ? "hidden" : ""}
              >
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Plano de Ação</CardTitle>
                    <CardDescription>Transforme objetivos em passos concretos</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2 flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">
                      Divida seus objetivos em passos pequenos e gerenciáveis para aumentar suas chances de sucesso e
                      reduzir a procrastinação.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Autoconhecimento
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Produtividade</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Motivação</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-accent">
                      <Link href="/ferramentas/plano-acao">
                        Acessar Ferramenta <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={activeCategory !== "todas" && activeCategory !== "relaxamento" ? "hidden" : ""}
              >
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Meditações Guiadas</CardTitle>
                    <CardDescription>Pratique mindfulness e relaxamento</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2 flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">
                      Acesse meditações guiadas para reduzir o estresse, melhorar o foco e cultivar uma maior
                      consciência do momento presente.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Relaxamento</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Mindfulness</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Estresse</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-accent">
                      <Link href="/ferramentas/meditacoes">
                        Acessar Ferramenta <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={activeCategory !== "todas" && activeCategory !== "relaxamento" ? "hidden" : ""}
              >
                <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-primary/20">
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-primary to-accent text-white text-xs px-3 py-1 rounded-full font-medium">
                      Novo
                    </span>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Respiração Consciente</CardTitle>
                    <CardDescription>Técnicas de respiração para acalmar a mente</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2 flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">
                      Aprenda e pratique diferentes técnicas de respiração para reduzir a ansiedade, melhorar o foco e
                      promover o relaxamento.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Relaxamento</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Ansiedade</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Estresse</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-accent">
                      <Link href="/ferramentas/respiracao-consciente">
                        Acessar Ferramenta <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3">
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-primary" />
                      Acesso Premium
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">Desbloqueie Ferramentas Avançadas</h3>
                        <p className="text-muted-foreground mb-4">
                          Torne-se um paciente para acessar versões avançadas destas ferramentas, com recursos como:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20">
                              <span className="text-primary text-xs">✓</span>
                            </div>
                            <span>Análise de padrões com inteligência artificial</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20">
                              <span className="text-primary text-xs">✓</span>
                            </div>
                            <span>Sincronização com seu terapeuta</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20">
                              <span className="text-primary text-xs">✓</span>
                            </div>
                            <span>Visualizações avançadas e insights personalizados</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex-shrink-0">
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                              Inscrever-se no Beta <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            {!isSubmitted ? (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Inscrição no Programa Beta</DialogTitle>
                                  <DialogDescription>
                                    Preencha os campos abaixo para se inscrever no programa beta e ter acesso antecipado
                                    às ferramentas premium.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                      Nome
                                    </Label>
                                    <Input
                                      id="name"
                                      placeholder="Seu nome completo"
                                      className="col-span-3"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                      Email
                                    </Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      placeholder="seu.email@exemplo.com"
                                      className="col-span-3"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-primary to-accent"
                                    onClick={handleSubmit}
                                  >
                                    Inscrever-se
                                  </Button>
                                </DialogFooter>
                              </>
                            ) : (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Inscrição Confirmada!</DialogTitle>
                                </DialogHeader>
                                <div className="py-6 text-center">
                                  <div className="mb-4 mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6 text-green-600"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                  <p className="text-lg font-medium mb-2">
                                    Obrigado por se inscrever, {formData.name}!
                                  </p>
                                  <p className="text-muted-foreground mb-4">
                                    Enviamos um email de confirmação para{" "}
                                    <span className="font-medium">{formData.email}</span>. Entraremos em contato em
                                    breve com mais informações sobre o programa beta.
                                  </p>
                                </div>
                                <DialogFooter>
                                  <Button className="bg-gradient-to-r from-primary to-accent" onClick={resetForm}>
                                    Fechar
                                  </Button>
                                </DialogFooter>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Como a TCC Pode Ajudar Você</h2>
              <p className="text-muted-foreground">
                A Terapia Cognitivo-Comportamental é uma abordagem baseada em evidências que ajuda a identificar e
                modificar padrões de pensamento e comportamento negativos.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-white border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl">Identifique Padrões</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reconheça como pensamentos, emoções e comportamentos estão interconectados e influenciam seu
                    bem-estar.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl">Desenvolva Habilidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Aprenda técnicas práticas para gerenciar emoções difíceis e responder de forma mais adaptativa aos
                    desafios.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl">Promova Mudanças</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Transforme padrões negativos em hábitos saudáveis que promovem bem-estar e resiliência emocional.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-primary/5 to-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Comece Sua Jornada de Bem-estar</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore nossas ferramentas gratuitas ou agende uma consulta para um atendimento personalizado.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
                <Link href="/contacto">Agendar Consulta</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#ferramentas">Explorar Ferramentas</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

