"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Info, Target, Plus, ArrowRight, CheckCircle, HelpCircle, Download, Sparkles } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

// Tipo para o plano de ação
interface ActionStep {
  id: string
  description: string
  completed: boolean
}

interface ActionPlan {
  title: string
  description: string
  category: string
  deadline: string
  steps: ActionStep[]
}

export function PlanoAcaoClientPage() {
  const [activeTab, setActiveTab] = useState("ferramenta")
  const [step, setStep] = useState(1)
  const [showTip, setShowTip] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const planRef = useRef<HTMLDivElement>(null)

  // Estado para o formulário
  const [formData, setFormData] = useState<ActionPlan>({
    title: "",
    description: "",
    category: "Pessoal",
    deadline: "",
    steps: [
      { id: "1", description: "", completed: false },
      { id: "2", description: "", completed: false },
      { id: "3", description: "", completed: false },
    ],
  })

  // Categorias disponíveis
  const categories = ["Pessoal", "Profissional", "Saúde", "Relacionamentos", "Financeiro", "Outro"]

  // Função para adicionar um passo
  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { id: Date.now().toString(), description: "", completed: false }],
    })
  }

  // Função para remover um passo
  const removeStep = (id: string) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((step) => step.id !== id),
    })
  }

  // Função para atualizar um passo
  const updateStep = (id: string, description: string) => {
    setFormData({
      ...formData,
      steps: formData.steps.map((step) => (step.id === id ? { ...step, description } : step)),
    })
  }

  // Função para alternar o estado de conclusão de um passo
  const toggleStepCompletion = (stepId: string) => {
    setFormData({
      ...formData,
      steps: formData.steps.map((step) => (step.id === stepId ? { ...step, completed: !step.completed } : step)),
    })
  }

  // Função para avançar para o próximo passo
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setIsComplete(true)
    }
  }

  // Função para voltar ao passo anterior
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Função para reiniciar o formulário
  const handleRestart = () => {
    setFormData({
      title: "",
      description: "",
      category: "Pessoal",
      deadline: "",
      steps: [
        { id: "1", description: "", completed: false },
        { id: "2", description: "", completed: false },
        { id: "3", description: "", completed: false },
      ],
    })
    setStep(1)
    setIsComplete(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Função para baixar o plano como PDF
  const handleDownloadPDF = async () => {
    if (!planRef.current) return;
    
    try {
      setIsGeneratingPDF(true);
      
      // Capturar o conteúdo do plano como imagem
      const canvas = await html2canvas(planRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Criar um novo documento PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Adicionar logo e informações de contato
      pdf.setFontSize(22);
      pdf.setTextColor(41, 128, 185); // Cor primária
      pdf.text('Hanara Psicologia', 20, 20);
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Plano de Ação Personalizado', 20, 30);
      
      // Adicionar data
      const today = new Date();
      const dateStr = today.toLocaleDateString('pt-BR');
      pdf.text(`Criado em: ${dateStr}`, 20, 40);
      
      // Adicionar imagem do plano
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 20, 50, imgWidth, imgHeight);
      
      // Adicionar rodapé com informações de contato
      const pageHeight = pdf.internal.pageSize.height;
      pdf.setFontSize(10);
      pdf.text('Hanara Psicologia | www.hanarapsi.com', 20, pageHeight - 20);
      pdf.text('Email: contato@hanarapsi.com | Tel: +351 123 456 789', 20, pageHeight - 15);
      
      // Salvar o PDF
      pdf.save(`Plano_de_Acao_${dateStr.replace(/\//g, '-')}.pdf`);
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Função para obter dica contextual
  const getContextualTip = () => {
    switch (step) {
      case 1:
        return "Defina um objetivo específico e mensurável. Em vez de 'melhorar minha saúde', tente 'praticar exercícios 3 vezes por semana durante 30 minutos'."
      case 2:
        return "Divida seu objetivo em passos pequenos e concretos. Cada passo deve ser uma ação específica que você pode realizar."
      case 3:
        return "Defina uma categoria e prazo para seu plano. Um prazo realista aumenta suas chances de sucesso."
      default:
        return ""
    }
  }

  // Obter cor baseada na categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Pessoal":
        return "bg-blue-100 text-blue-800"
      case "Profissional":
        return "bg-purple-100 text-purple-800"
      case "Saúde":
        return "bg-green-100 text-green-800"
      case "Relacionamentos":
        return "bg-pink-100 text-pink-800"
      case "Financeiro":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Calcular progresso do plano
  const calculateProgress = () => {
    if (formData.steps.length === 0) return 0
    const completedSteps = formData.steps.filter((step) => step.completed).length
    return Math.round((completedSteps / formData.steps.length) * 100)
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

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/ferramentas" className="flex items-center text-primary hover:text-primary/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Ferramentas
            </Link>
            <h1 className="text-2xl font-bold">Plano de Ação</h1>
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
                  O Plano de Ação é uma técnica que ajuda a transformar objetivos em passos concretos e gerenciáveis,
                  aumentando suas chances de sucesso.
                </p>
                <p>
                  Esta é uma versão interativa para praticar. Seus dados não são salvos em nossos servidores - se
                  desejar guardar seu plano, você poderá baixá-lo ao final do exercício.
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
                          Passo {step} de 3: {step === 1 ? "Objetivo" : step === 2 ? "Passos" : "Detalhes"}
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
                          ? "Defina seu objetivo principal"
                          : step === 2
                            ? "Divida seu objetivo em passos concretos"
                            : "Adicione detalhes ao seu plano"}
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
                          <div className="space-y-2">
                            <Label htmlFor="title">Objetivo</Label>
                            <Input
                              id="title"
                              placeholder="O que você quer alcançar?"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                              id="description"
                              placeholder="Descreva seu objetivo em mais detalhes"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Passos para Alcançar o Objetivo</Label>
                              <Button type="button" variant="outline" size="sm" onClick={addStep}>
                                <Plus className="h-3 w-3 mr-1" /> Adicionar Passo
                              </Button>
                            </div>

                            <div className="space-y-3 mt-2">
                              {formData.steps.map((step, index) => (
                                <div key={step.id} className="flex items-center gap-2">
                                  <div className="w-6 h-6 flex items-center justify-center bg-muted rounded-full shrink-0">
                                    <span className="text-xs font-medium">{index + 1}</span>
                                  </div>
                                  <Input
                                    placeholder={`Passo ${index + 1}`}
                                    value={step.description}
                                    onChange={(e) => updateStep(step.id, e.target.value)}
                                    className="flex-1"
                                  />
                                  {formData.steps.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeStep(step.id)}
                                      className="h-8 w-8"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                      >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" x2="10" y1="11" y2="17" />
                                        <line x1="14" x2="14" y1="11" y2="17" />
                                      </svg>
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="category">Categoria</Label>
                              <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="deadline">Data Limite</Label>
                              <Input
                                id="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                              />
                            </div>
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
                        disabled={
                          (step === 1 && !formData.title.trim()) ||
                          (step === 2 && formData.steps.filter(s => s.description.trim()).length === 0)
                        }
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
                        <CardTitle>Plano Concluído!</CardTitle>
                      </div>
                      <CardDescription>
                        Parabéns por criar seu plano de ação. Revise abaixo o que você registrou.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6" ref={planRef}>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Objetivo:</h3>
                          <div className="bg-muted p-3 rounded-md text-sm font-medium">{formData.title}</div>
                        </div>

                        {formData.description && (
                          <div>
                            <h3 className="text-sm font-medium mb-2">Descrição:</h3>
                            <div className="bg-muted p-3 rounded-md text-sm">{formData.description}</div>
                          </div>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium">Passos:</h3>
                            <span className="text-sm">{calculateProgress()}% concluído</span>
                          </div>
                          <div className="space-y-2">
                            {formData.steps
                              .filter((step) => step.description.trim() !== "")
                              .map((step, index) => (
                                <div key={step.id} className="flex items-start gap-2 bg-muted p-3 rounded-md">
                                  <input
                                    type="checkbox"
                                    id={`step-${step.id}`}
                                    checked={step.completed}
                                    onChange={() => toggleStepCompletion(step.id)}
                                    className="mt-1"
                                  />
                                  <label
                                    htmlFor={`step-${step.id}`}
                                    className={`text-sm flex-1 ${step.completed ? "line-through text-muted-foreground" : ""}`}
                                  >
                                    {index + 1}. {step.description}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">Categoria:</h3>
                            <div
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(formData.category)}`}
                            >
                              {formData.category}
                            </div>
                          </div>

                          {formData.deadline && (
                            <div>
                              <h3 className="text-sm font-medium mb-2">Data Limite:</h3>
                              <div className="bg-muted p-2 rounded-md text-sm inline-block">{formData.deadline}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
                      <Button variant="outline" onClick={handleRestart}>
                        Criar Novo Plano
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-primary to-accent" 
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                      >
                        {isGeneratingPDF ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Gerando PDF...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Baixar como PDF
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Próximos Passos</CardTitle>
                      <CardDescription>Sugestões para implementar seu plano de ação</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium flex items-center mb-2">
                            <Sparkles className="h-4 w-4 mr-2 text-primary" />
                            Revisão Regular
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Reserve um tempo semanal para revisar seu progresso e ajustar seu plano conforme necessário.
                          </p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium flex items-center mb-2">
                            <Target className="h-4 w-4 mr-2 text-primary" />
                            Celebre Conquistas
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Reconheça e celebre cada passo concluído, mesmo os pequenos. Isso mantém sua motivação.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/ferramentas">
                          Explorar Mais Ferramentas
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
              <h2 className="text-2xl font-bold mb-4">Sobre o Plano de Ação</h2>

              <p className="lead mb-6">
                O Plano de Ação é uma ferramenta poderosa que transforma objetivos amplos em passos concretos e
                gerenciáveis, aumentando significativamente suas chances de sucesso.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">O que é?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Uma estratégia estruturada que divide um objetivo maior em etapas menores, específicas e
                      alcançáveis, com prazos definidos e métricas de acompanhamento.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Por que funciona?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ao dividir objetivos grandes em passos menores, reduzimos a sobrecarga cognitiva, diminuímos a
                      procrastinação e criamos um caminho claro para o sucesso.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4">Benefícios Comprovados</h3>

              <p className="mb-4">
                Pesquisas em psicologia cognitiva e comportamental demonstram que planos de ação estruturados oferecem
                diversos benefícios:
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Clareza Mental</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Redução da ansiedade</li>
                      <li>• Maior foco e direção</li>
                      <li>• Melhor tomada de decisão</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Motivação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Celebração de pequenas vitórias</li>
                      <li>• Progresso visível e mensurável</li>
                      <li>• Redução da procrastinação</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Eficiência</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Melhor gestão do tempo</li>
                      <li>• Priorização mais eficaz</li>
                      <li>• Redução de esforços desperdiçados</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Adaptabilidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Identificação precoce de obstáculos</li>
                      <li>• Ajustes baseados em feedback</li>
                      <li>• Maior resiliência a mudanças</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Responsabilidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Compromisso mais forte</li>
                      <li>• Acompanhamento sistemático</li>
                      <li>• Maior consistência nas ações</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Resultados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Maior taxa de conclusão</li>
                      <li>• Qualidade superior de execução</li>
                      <li>• Satisfação pessoal aumentada</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4">A Ciência por Trás dos Planos de Ação</h3>

              <p className="mb-4">
                Estudos em neurociência e psicologia comportamental revelam como os planos de ação afetam nosso cérebro
                e comportamento:
              </p>

              <div className="bg-muted p-6 rounded-lg mb-8">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                      <span className="text-primary font-medium">1</span>
                    </div>
                    <div>
                      <strong>Efeito de Implementação de Intenções</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pesquisas do Dr. Peter Gollwitzer mostram que planos detalhados do tipo "se-então" aumentam em
                        até 300% as chances de alcançar objetivos, pois criam gatilhos neurais automáticos.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                      <span className="text-primary font-medium">2</span>
                    </div>
                    <div>
                      <strong>Redução da Carga Cognitiva</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ao dividir tarefas complexas em passos menores, reduzimos a demanda no córtex pré-frontal,
                        diminuindo a fadiga mental e aumentando a capacidade de foco.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                      <span className="text-primary font-medium">3</span>
                    </div>
                    <div>
                      <strong>Sistema de Recompensa</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        Cada passo concluído ativa o sistema de recompensa do cérebro, liberando dopamina e criando um
                        ciclo positivo de motivação e ação.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">Como Criar Planos de Ação Eficazes</h3>

              <ol className="space-y-4 mb-6">
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <strong>Defina objetivos SMART</strong>
                    <p className="text-muted-foreground mt-1">
                      Específicos, Mensuráveis, Alcançáveis, Relevantes e Temporais. Um objetivo bem definido é o
                      primeiro passo para um plano eficaz.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <strong>Divida em passos concretos</strong>
                    <p className="text-muted-foreground mt-1">
                      Cada passo deve ser uma ação específica, não um mini-objetivo. "Pesquisar 3 academias próximas" é
                      melhor que "encontrar uma academia".
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <strong>Estabeleça prazos realistas</strong>
                    <p className="text-muted-foreground mt-1">
                      Prazos muito apertados geram ansiedade, enquanto prazos muito longos facilitam a procrastinação.
                      Encontre o equilíbrio ideal.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">4</span>
                  </div>
                  <div>
                    <strong>Identifique recursos necessários</strong>
                    <p className="text-muted-foreground mt-1">
                      Determine quais ferramentas, conhecimentos, pessoas ou outros recursos você precisará para cada
                      etapa do plano.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">5</span>
                  </div>
                  <div>
                    <strong>Antecipe obstáculos</strong>
                    <p className="text-muted-foreground mt-1">
                      Pense antecipadamente em possíveis barreiras e crie planos de contingência para superá-las quando
                      surgirem.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mb-8">
                <h3 className="text-xl font-bold mb-3">Evidências Científicas</h3>
                <p className="mb-4">A eficácia dos planos de ação é amplamente documentada em pesquisas científicas:</p>
                <ul className="space-y-2">
                  <li className="text-sm">
                    • Um estudo de 2015 publicado no Journal of Consulting and Clinical Psychology mostrou que pacientes
                    que criaram planos de ação detalhados tiveram 91% mais chances de aderir a tratamentos médicos.
                  </li>
                  <li className="text-sm">
                    • Pesquisadores da Universidade de Harvard descobriram que executivos que usavam planos de ação
                    estruturados completavam 20-30% mais projetos no prazo do que aqueles que não utilizavam.
                  </li>
                  <li className="text-sm">
                    • Um estudo longitudinal de 2018 com mais de 5.000 participantes mostrou que pessoas que criavam
                    planos de ação para seus objetivos tinham 42% mais chances de alcançá-los em um ano.
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">Aplicações em Diferentes Áreas</h3>

              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Saúde e Bem-estar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Planos de ação são fundamentais para mudanças de hábitos de saúde, como iniciar exercícios,
                      melhorar a alimentação ou reduzir o estresse.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Exemplo:</strong> Em vez de "perder peso", um plano detalharia passos como "preparar
                      marmitas saudáveis aos domingos" e "caminhar 20 minutos após o almoço".
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Desenvolvimento Profissional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Planos de ação estruturam o desenvolvimento de habilidades, transições de carreira e projetos
                      profissionais complexos.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Exemplo:</strong> Para "melhorar habilidades de apresentação", os passos incluiriam
                      "assistir a 3 TED Talks por semana" e "praticar por 10 minutos diários".
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Relacionamentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Planos de ação podem fortalecer relacionamentos, melhorar a comunicação e resolver conflitos de
                      forma estruturada.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Exemplo:</strong> Para "melhorar a comunicação com o parceiro", os passos incluiriam
                      "reservar 15 minutos diários para conversar sem distrações".
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Finanças Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Planos de ação são essenciais para orçamentos, redução de dívidas, economias e investimentos.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Exemplo:</strong> Para "criar um fundo de emergência", os passos incluiriam "configurar
                      transferência automática de 10% do salário" e "revisar despesas semanalmente".
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4">Superando Desafios Comuns</h3>

              <Accordion type="single" collapsible className="mb-8">
                <AccordionItem value="challenge1">
                  <AccordionTrigger>Planos muito ambiciosos ou complexos</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      É comum criar planos iniciais muito ambiciosos que acabam sendo abandonados. Comece com planos
                      menores e mais simples, com 3-5 passos no máximo.
                    </p>
                    <p>
                      Lembre-se que é melhor completar um plano pequeno do que abandonar um grande. À medida que você
                      ganha confiança, pode gradualmente aumentar a complexidade.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="challenge2">
                  <AccordionTrigger>Falta de flexibilidade</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Planos rígidos tendem a falhar quando surgem imprevistos. Construa flexibilidade em seu plano, com
                      margens de tempo e alternativas para cada passo.
                    </p>
                    <p>
                      Revise seu plano regularmente e esteja aberto a ajustes. Um bom plano é um documento vivo que
                      evolui conforme você avança e aprende.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="challenge3">
                  <AccordionTrigger>Dificuldade em manter o foco</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      É fácil perder o foco ou se distrair com novas ideias e projetos. Estabeleça revisões regulares do
                      seu plano e use lembretes visuais.
                    </p>
                    <p>
                      Considere compartilhar seu plano com alguém de confiança que possa ajudá-lo a manter o compromisso
                      e oferecer feedback construtivo.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="challenge4">
                  <AccordionTrigger>Perfeccionismo paralisante</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Muitas pessoas adiam a ação enquanto tentam criar o "plano perfeito". Lembre-se que um plano bom e
                      implementado é infinitamente melhor que um plano perfeito que nunca sai do papel.
                    </p>
                    <p>
                      Comece com um plano simples e refine-o à medida que avança. A experiência prática sempre revelará
                      ajustes necessários que nenhum planejamento teórico poderia prever.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <h3 className="text-xl font-bold mb-4">Recursos Adicionais</h3>

              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Livros Recomendados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>"Atomic Habits" - James Clear</li>
                      <li>"Getting Things Done" - David Allen</li>
                      <li>"The One Thing" - Gary Keller</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Aplicativos Úteis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>Trello - Organização visual de planos</li>
                      <li>Todoist - Gerenciamento de tarefas</li>
                      <li>Notion - Documentação e acompanhamento</li>
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
                <CardDescription>Respostas para dúvidas comuns sobre Planos de Ação</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="q1">
                    <AccordionTrigger>
                      Qual a diferença entre um plano de ação e uma simples lista de tarefas?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Um plano de ação é mais estruturado e estratégico que uma lista de tarefas. Enquanto uma lista
                        de tarefas é uma coleção de itens a fazer, geralmente não relacionados, um plano de ação
                        organiza passos sequenciais e interdependentes para alcançar um objetivo específico. O plano de
                        ação inclui prazos, recursos necessários, métricas de sucesso e considera potenciais obstáculos.
                        É um documento mais abrangente e orientado a resultados.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q2">
                    <AccordionTrigger>Com que frequência devo revisar meu plano de ação?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        A frequência ideal de revisão depende da natureza e duração do seu plano. Para planos de curto
                        prazo (semanas), uma revisão diária ou a cada dois dias é recomendada. Para planos de médio
                        prazo (meses), uma revisão semanal é geralmente suficiente. Para planos de longo prazo (anos),
                        revisões mensais ou trimestrais são adequadas. O importante é estabelecer um ritmo regular de
                        revisão e ajuste, especialmente após completar marcos importantes ou encontrar obstáculos
                        significativos.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q3">
                    <AccordionTrigger>Quantos objetivos ou planos de ação devo ter simultaneamente?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Pesquisas em psicologia cognitiva sugerem que a maioria das pessoas consegue gerenciar
                        efetivamente entre 2-3 objetivos principais simultaneamente. Ter muitos planos concorrentes pode
                        diluir seu foco e energia, reduzindo as chances de sucesso em todos eles. Se você tem múltiplos
                        objetivos, considere priorizá-los e trabalhar em poucos de cada vez, ou agrupar objetivos
                        relacionados em um único plano mais abrangente com diferentes componentes.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q4">
                    <AccordionTrigger>O que fazer quando um plano não está funcionando?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">Quando um plano não está progredindo como esperado, siga estes passos:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li>
                          Analise onde exatamente está o problema (passos muito grandes, prazos irrealistas, recursos
                          insuficientes)
                        </li>
                        <li>Determine se o objetivo ainda é relevante e alcançável</li>
                        <li>Ajuste os passos, prazos ou recursos conforme necessário</li>
                        <li>Considere obter feedback de outras pessoas</li>
                        <li>
                          Se necessário, esteja disposto a reformular completamente o plano ou até mesmo abandoná-lo se
                          as circunstâncias mudaram significativamente
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q5">
                    <AccordionTrigger>Como manter a motivação durante a execução do plano?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">
                        Manter a motivação ao longo do tempo é um dos maiores desafios na execução de planos. Algumas
                        estratégias eficazes incluem:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li>
                          Conectar-se emocionalmente com seu "porquê" - a razão profunda para buscar esse objetivo
                        </li>
                        <li>Dividir o plano em marcos menores e celebrar cada conquista</li>
                        <li>Visualizar regularmente o resultado final desejado</li>
                        <li>Criar um sistema de recompensas para si mesmo</li>
                        <li>Encontrar um parceiro de responsabilidade ou mentor</li>
                        <li>Acompanhar visualmente seu progresso (gráficos, barras de progresso)</li>
                        <li>Revisar e reconhecer regularmente o quanto você já avançou</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q6">
                    <AccordionTrigger>Planos de ação funcionam para todos os tipos de personalidade?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Sim, mas a abordagem ideal pode variar. Pessoas mais analíticas geralmente preferem planos
                        detalhados com muitos dados e métricas. Pessoas criativas podem se beneficiar de planos mais
                        visuais, como mapas mentais ou storyboards. Pessoas orientadas a relacionamentos podem se sair
                        melhor com planos que incluem componentes sociais, como parceiros de responsabilidade. O
                        importante é adaptar o formato e a estrutura do plano ao seu estilo pessoal de processamento de
                        informações e tomada de decisões, mantendo os elementos essenciais: objetivo claro, passos
                        concretos e prazos definidos.
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

