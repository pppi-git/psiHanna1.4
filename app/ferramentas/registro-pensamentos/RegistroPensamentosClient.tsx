"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Info, Brain, ArrowRight, CheckCircle, HelpCircle, BookOpen, Download } from "lucide-react"

// Tipo para emoção
interface Emotion {
  name: string
  intensity: number
}

// Dados de exemplo para emoções
const emotionOptions = [
  "Ansiedade",
  "Tristeza",
  "Raiva",
  "Medo",
  "Culpa",
  "Vergonha",
  "Frustração",
  "Desapontamento",
  "Ciúme",
  "Insegurança",
]

// Dados de exemplo para distorções cognitivas
const cognitiveDistortions = [
  {
    name: "Pensamento Tudo-ou-Nada",
    description: "Ver as situações em termos absolutos, preto e branco, sem considerar nuances ou meio-termo.",
    example: "Se eu não for perfeito, sou um fracasso completo.",
  },
  {
    name: "Generalização Excessiva",
    description: "Tirar uma conclusão geral a partir de um único incidente ou evidência.",
    example: "Fui rejeitado uma vez, serei rejeitado por todos sempre.",
  },
  {
    name: "Filtro Mental",
    description: "Focar exclusivamente nos aspectos negativos e ignorar os positivos.",
    example: "Recebo dez elogios e uma crítica, e só consigo pensar na crítica.",
  },
  {
    name: "Desqualificar o Positivo",
    description: "Rejeitar experiências positivas insistindo que 'não contam'.",
    example: "Fiz bem o trabalho, mas foi só sorte, qualquer um poderia ter feito.",
  },
  {
    name: "Leitura Mental",
    description: "Presumir que sabe o que os outros estão pensando sem evidências.",
    example: "Ele não me cumprimentou, deve estar com raiva de mim.",
  },
  {
    name: "Catastrofização",
    description: "Esperar que o pior aconteça sem considerar outros resultados mais prováveis.",
    example: "Se eu falar na reunião, vou gaguejar e todos vão rir de mim.",
  },
]

export function RegistroPensamentosClient() {
  const [activeTab, setActiveTab] = useState("ferramenta")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    situation: "",
    thoughts: "",
    emotions: [{ name: "Ansiedade", intensity: 50 }],
    behaviors: "",
    alternativeThoughts: "",
    outcome: "",
  })
  const [isComplete, setIsComplete] = useState(false)
  const [showTip, setShowTip] = useState(false)

  const handleNextStep = () => {
    if (step < 5) {
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
    setFormData({
      situation: "",
      thoughts: "",
      emotions: [{ name: "Ansiedade", intensity: 50 }],
      behaviors: "",
      alternativeThoughts: "",
      outcome: "",
    })
    setStep(1)
    setIsComplete(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Função para adicionar emoção
  const handleAddEmotion = () => {
    if (formData.emotions.length < 5) {
      setFormData({
        ...formData,
        emotions: [...formData.emotions, { name: "Ansiedade", intensity: 50 }],
      })
    }
  }

  // Função para remover emoção
  const handleRemoveEmotion = (index: number) => {
    const newEmotions = [...formData.emotions]
    newEmotions.splice(index, 1)
    setFormData({
      ...formData,
      emotions: newEmotions,
    })
  }

  // Função para atualizar emoção
  const handleUpdateEmotion = (index: number, field: "name" | "intensity", value: string | number) => {
    const newEmotions = [...formData.emotions]
    newEmotions[index] = {
      ...newEmotions[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      emotions: newEmotions,
    })
  }

  // Função para gerar PDF (simulada)
  const handleDownloadPDF = () => {
    alert(
      "Em uma implementação real, esta função geraria um PDF do seu registro de pensamentos para você salvar localmente.",
    )
  }

  // Função para obter dica contextual
  const getContextualTip = () => {
    switch (step) {
      case 1:
        return "Descreva a situação de forma objetiva, como se estivesse relatando um fato. Evite incluir interpretações ou julgamentos neste momento."
      case 2:
        return "Registre seus pensamentos automáticos exatamente como eles surgiram na sua mente, sem censura. Estes são os pensamentos que aparecem rapidamente e muitas vezes não percebemos."
      case 3:
        return "Identifique as emoções que você sentiu e avalie sua intensidade. Tente ser específico sobre o que você sentiu e como reagiu fisicamente."
      case 4:
        return "Questione seus pensamentos automáticos. Há evidências que os apoiam? Existem outras perspectivas possíveis? Como você aconselharia um amigo nesta situação?"
      case 5:
        return "Reflita sobre como você se sente agora após analisar a situação. Houve mudança na intensidade das emoções? O que você aprendeu?"
      default:
        return ""
    }
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
            <h1 className="text-2xl font-bold">Registro de Pensamentos</h1>
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
                  O Registro de Pensamentos é uma técnica fundamental da Terapia Cognitivo-Comportamental que ajuda a
                  identificar e modificar padrões de pensamento negativos.
                </p>
                <p>
                  Esta é uma versão interativa para praticar. Seus dados não são salvos em nossos servidores - se
                  desejar guardar seu registro, você poderá baixá-lo ao final do exercício.
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
                          Passo {step} de 5:{" "}
                          {step === 1
                            ? "Situação"
                            : step === 2
                              ? "Pensamentos e Emoções"
                              : step === 3
                                ? "Comportamentos"
                                : step === 4
                                  ? "Pensamentos Alternativos"
                                  : "Resultado"}
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
                          ? "Descreva a situação que desencadeou pensamentos negativos"
                          : step === 2
                            ? "Identifique seus pensamentos automáticos e emoções associadas"
                            : step === 3
                              ? "Como você reagiu? O que fez ou deixou de fazer?"
                              : step === 4
                                ? "Desenvolva perspectivas mais equilibradas"
                                : "Reflita sobre o que aprendeu e como se sente agora"}
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
                            <Label htmlFor="situation">Situação</Label>
                            <Textarea
                              id="situation"
                              placeholder="Descreva a situação que desencadeou os pensamentos (ex: reunião de trabalho, conversa difícil, evento social)"
                              value={formData.situation}
                              onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                              className="min-h-[120px]"
                            />
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="thoughts">Pensamentos Automáticos</Label>
                            <Textarea
                              id="thoughts"
                              placeholder="Quais pensamentos surgiram na situação? (ex: 'Vou falhar', 'Todos vão me julgar')"
                              value={formData.thoughts}
                              onChange={(e) => setFormData({ ...formData, thoughts: e.target.value })}
                              className="min-h-[120px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Emoções e Intensidade</Label>
                              {formData.emotions.length < 5 && (
                                <Button type="button" variant="outline" size="sm" onClick={handleAddEmotion}>
                                  + Adicionar Emoção
                                </Button>
                              )}
                            </div>

                            {formData.emotions.map((emotion, index) => (
                              <div key={index} className="grid grid-cols-12 gap-2 items-center mt-2">
                                <div className="col-span-5">
                                  <Select
                                    value={emotion.name}
                                    onValueChange={(value) => handleUpdateEmotion(index, "name", value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {emotionOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="col-span-5">
                                  <Slider
                                    value={[emotion.intensity]}
                                    min={0}
                                    max={100}
                                    step={5}
                                    onValueChange={(value) => handleUpdateEmotion(index, "intensity", value[0])}
                                  />
                                </div>
                                <div className="col-span-1 text-center">
                                  <span className="text-sm">{emotion.intensity}%</span>
                                </div>
                                <div className="col-span-1">
                                  {formData.emotions.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveEmotion(index)}
                                      className="h-8 w-8"
                                      aria-label="Remover emoção"
                                    >
                                      <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="behaviors">Comportamentos</Label>
                            <Textarea
                              id="behaviors"
                              placeholder="O que você fez ou deixou de fazer? Como reagiu à situação?"
                              value={formData.behaviors}
                              onChange={(e) => setFormData({ ...formData, behaviors: e.target.value })}
                              className="min-h-[120px]"
                            />
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="alternativeThoughts">Pensamentos Alternativos</Label>
                            <Textarea
                              id="alternativeThoughts"
                              placeholder="Quais seriam formas mais equilibradas de pensar sobre a situação? Que evidências apoiam ou contradizem seus pensamentos iniciais?"
                              value={formData.alternativeThoughts}
                              onChange={(e) => setFormData({ ...formData, alternativeThoughts: e.target.value })}
                              className="min-h-[120px]"
                            />
                          </div>

                          <div className="bg-muted p-4 rounded-md">
                            <h4 className="text-sm font-medium mb-2">Distorções Cognitivas Comuns</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Ao revisar seus pensamentos, considere se eles contêm alguma destas distorções:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {cognitiveDistortions.slice(0, 4).map((distortion) => (
                                <div key={distortion.name} className="text-xs p-2 bg-background rounded border">
                                  <span className="font-medium">{distortion.name}</span>: {distortion.description}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="outcome">Resultado</Label>
                            <Textarea
                              id="outcome"
                              placeholder="Como você se sente agora? Houve mudança na intensidade das emoções? O que você aprendeu?"
                              value={formData.outcome}
                              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                              className="min-h-[120px]"
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep} disabled={step === 1}>
                        Voltar
                      </Button>
                      <Button onClick={handleNextStep} className="bg-gradient-to-r from-primary to-accent">
                        {step === 5 ? "Concluir" : "Próximo"}
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
                        <CardTitle>Registro Concluído!</CardTitle>
                      </div>
                      <CardDescription>
                        Parabéns por completar seu registro de pensamentos. Revise abaixo o que você registrou.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Situação:</h3>
                          <div className="bg-muted p-3 rounded-md text-sm">
                            {formData.situation || "Não preenchido"}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Pensamentos Automáticos:</h3>
                          <div className="bg-muted p-3 rounded-md text-sm">{formData.thoughts || "Não preenchido"}</div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Emoções:</h3>
                          <div className="bg-muted p-3 rounded-md">
                            {formData.emotions.map((emotion, index) => (
                              <div key={index} className="flex items-center justify-between mb-1 text-sm">
                                <span>{emotion.name}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary rounded-full"
                                      style={{ width: `${emotion.intensity}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs">{emotion.intensity}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Comportamentos:</h3>
                          <div className="bg-muted p-3 rounded-md text-sm">
                            {formData.behaviors || "Não preenchido"}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Pensamentos Alternativos:</h3>
                          <div className="bg-muted p-3 rounded-md text-sm">
                            {formData.alternativeThoughts || "Não preenchido"}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Resultado:</h3>
                          <div className="bg-muted p-3 rounded-md text-sm">{formData.outcome || "Não preenchido"}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
                      <Button variant="outline" onClick={handleRestart}>
                        Criar Novo Registro
                      </Button>
                      <Button className="bg-gradient-to-r from-primary to-accent" onClick={handleDownloadPDF}>
                        <Download className="h-4 w-4 mr-2" />
                        Baixar como PDF
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Próximos Passos</CardTitle>
                      <CardDescription>Sugestões para continuar sua jornada de autoconhecimento</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium flex items-center mb-2">
                            <BookOpen className="h-4 w-4 mr-2 text-primary" />
                            Pratique Regularmente
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Quanto mais você praticar o registro de pensamentos, mais natural se tornará o processo de
                            identificar e desafiar pensamentos negativos.
                          </p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium flex items-center mb-2">
                            <Brain className="h-4 w-4 mr-2 text-primary" />
                            Explore Outras Ferramentas
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Combine esta técnica com outras ferramentas como meditação e diário de gratidão para
                            resultados ainda melhores.
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
              <h2 className="text-2xl font-bold mb-4">Sobre o Registro de Pensamentos</h2>

              <p className="lead mb-6">
                O Registro de Pensamentos é uma técnica fundamental da Terapia Cognitivo-Comportamental (TCC) que ajuda
                a identificar e modificar padrões de pensamento negativos que contribuem para emoções difíceis.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">O que é?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Uma ferramenta estruturada para examinar pensamentos automáticos, identificar distorções
                      cognitivas e desenvolver perspectivas mais equilibradas.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Por que funciona?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ao tornar conscientes os pensamentos automáticos e questioná-los, você interrompe o ciclo negativo
                      de pensamentos-emoções-comportamentos.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4">O Modelo Cognitivo</h3>

              <p>
                A TCC se baseia no modelo cognitivo, que propõe que não são os eventos em si que causam nossas emoções,
                mas sim a forma como interpretamos esses eventos. Este modelo pode ser resumido como:
              </p>

              <div className="bg-muted p-4 rounded-md my-4 flex flex-col md:flex-row items-center justify-between text-center">
                <div className="p-3">
                  <div className="font-bold mb-1">Situação</div>
                  <div className="text-sm text-muted-foreground">O que aconteceu</div>
                </div>
                <ArrowRight className="h-4 w-4 my-2 md:my-0 rotate-90 md:rotate-0" />
                <div className="p-3">
                  <div className="font-bold mb-1">Pensamentos</div>
                  <div className="text-sm text-muted-foreground">Interpretação do evento</div>
                </div>
                <ArrowRight className="h-4 w-4 my-2 md:my-0 rotate-90 md:rotate-0" />
                <div className="p-3">
                  <div className="font-bold mb-1">Emoções</div>
                  <div className="text-sm text-muted-foreground">Como você se sente</div>
                </div>
                <ArrowRight className="h-4 w-4 my-2 md:my-0 rotate-90 md:rotate-0" />
                <div className="p-3">
                  <div className="font-bold mb-1">Comportamentos</div>
                  <div className="text-sm text-muted-foreground">Como você reage</div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Benefícios do Registro de Pensamentos</h3>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span>Aumenta a consciência sobre padrões de pensamento automáticos</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span>Ajuda a identificar distorções cognitivas comuns</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span>Desenvolve habilidades para questionar e desafiar pensamentos negativos</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span>Promove perspectivas mais equilibradas e realistas</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary/20">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span>Reduz a intensidade de emoções difíceis como ansiedade e tristeza</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-4">Distorções Cognitivas Comuns</h3>

              <p className="mb-4">
                Distorções cognitivas são padrões de pensamento irracionais ou exagerados que reforçam emoções
                negativas. Identificá-las é o primeiro passo para desafiá-las:
              </p>

              <div className="space-y-3 mb-6">
                {cognitiveDistortions.map((distortion) => (
                  <Accordion type="single" collapsible key={distortion.name}>
                    <AccordionItem value={distortion.name}>
                      <AccordionTrigger className="text-left">{distortion.name}</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">{distortion.description}</p>
                        <div className="bg-muted p-2 rounded text-sm">
                          <strong>Exemplo:</strong> {distortion.example}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4">Como Praticar Efetivamente</h3>

              <ol className="space-y-4 mb-6">
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <strong>Pratique regularmente</strong>
                    <p className="text-muted-foreground mt-1">
                      Quanto mais você praticar, mais natural se tornará o processo de identificar e questionar
                      pensamentos automáticos.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <strong>Seja específico</strong>
                    <p className="text-muted-foreground mt-1">
                      Quanto mais detalhes você incluir sobre a situação, pensamentos e emoções, mais eficaz será a
                      análise.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <strong>Questione com curiosidade</strong>
                    <p className="text-muted-foreground mt-1">
                      Aborde seus pensamentos com uma atitude de curiosidade, não de julgamento. Pergunte: "Que
                      evidências apoiam ou contradizem este pensamento?"
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">4</span>
                  </div>
                  <div>
                    <strong>Desenvolva alternativas</strong>
                    <p className="text-muted-foreground mt-1">
                      Busque perspectivas mais equilibradas, não apenas positivas. O objetivo é encontrar visões mais
                      realistas, não necessariamente otimistas.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">5</span>
                  </div>
                  <div>
                    <strong>Observe padrões</strong>
                    <p className="text-muted-foreground mt-1">
                      Com o tempo, você começará a notar padrões recorrentes em seus pensamentos, o que facilitará
                      identificá-los e desafiá-los mais rapidamente.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mb-8">
                <h3 className="text-xl font-bold mb-3">Evidências Científicas</h3>
                <p className="mb-4">
                  Numerosos estudos científicos demonstram a eficácia da técnica de registro de pensamentos e da TCC em
                  geral:
                </p>
                <ul className="space-y-2">
                  <li className="text-sm">
                    • Meta-análises mostram que a TCC é eficaz no tratamento de transtornos de ansiedade, depressão,
                    transtorno obsessivo-compulsivo e muitas outras condições.
                  </li>
                  <li className="text-sm">
                    • Estudos de neuroimagem revelam que a TCC pode alterar a atividade cerebral em regiões associadas
                    ao processamento emocional.
                  </li>
                  <li className="text-sm">
                    • Pesquisas indicam que as habilidades aprendidas com o registro de pensamentos continuam a
                    beneficiar os pacientes muito tempo após o término da terapia.
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">Recursos Adicionais</h3>

              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Livros Recomendados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>"Mente Sem Ansiedade" - Dr. David Burns</li>
                      <li>"Terapia Cognitiva para Depressão" - Aaron Beck</li>
                      <li>"Pensando Bem, Sentindo-se Melhor" - Judith Beck</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Aplicativos Úteis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>MindDoc - Rastreador de humor e diário</li>
                      <li>Woebot - Chatbot de TCC</li>
                      <li>Thought Diary - Diário de pensamentos</li>
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
                <CardDescription>Respostas para dúvidas comuns sobre o Registro de Pensamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="q1">
                    <AccordionTrigger>Com que frequência devo praticar o registro de pensamentos?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Idealmente, pratique sempre que notar emoções intensas ou desconfortáveis. No início, tente
                        fazer pelo menos 2-3 registros por semana. Com o tempo, você internalizará o processo e poderá
                        fazê-lo mentalmente quando necessário.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q2">
                    <AccordionTrigger>Posso fazer isso sozinho ou preciso de um terapeuta?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Você pode praticar o registro de pensamentos por conta própria, e muitas pessoas se beneficiam
                        disso. No entanto, um terapeuta treinado em TCC pode oferecer orientação personalizada, ajudar a
                        identificar padrões que você pode não perceber e fornecer técnicas adicionais para situações
                        específicas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q3">
                    <AccordionTrigger>Quanto tempo leva para ver resultados?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Muitas pessoas notam benefícios imediatos ao completar um registro de pensamentos, como redução
                        na intensidade emocional. Porém, para mudanças mais profundas nos padrões de pensamento, a
                        prática regular por algumas semanas ou meses é geralmente necessária. A TCC é considerada uma
                        terapia de curto prazo, com resultados significativos tipicamente observados em 12-20 semanas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q4">
                    <AccordionTrigger>E se eu não conseguir identificar meus pensamentos?</AccordionTrigger>
                    <AccordionContent>
                      <p>Isso é comum no início. Tente estas estratégias:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li>
                          Comece pelas emoções: pergunte "O que estava passando pela minha cabeça quando me senti
                          assim?"
                        </li>
                        <li>Imagine um amigo na mesma situação e o que ele poderia estar pensando</li>
                        <li>Preste atenção ao seu diálogo interno durante o dia para aumentar a consciência</li>
                        <li>Registre logo após a situação, quando as memórias estão mais frescas</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q5">
                    <AccordionTrigger>O registro de pensamentos funciona para qualquer problema?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        O registro de pensamentos é particularmente eficaz para condições como ansiedade, depressão,
                        raiva e baixa autoestima. No entanto, pode não ser suficiente como única intervenção para
                        condições mais complexas como transtorno bipolar, esquizofrenia ou trauma severo, que geralmente
                        requerem abordagens combinadas incluindo medicação e outras técnicas terapêuticas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q6">
                    <AccordionTrigger>Como sei se estou fazendo corretamente?</AccordionTrigger>
                    <AccordionContent>
                      <p>Um registro de pensamentos eficaz geralmente resulta em:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li>Redução na intensidade das emoções negativas</li>
                        <li>Maior clareza sobre a situação</li>
                        <li>Capacidade de ver perspectivas alternativas</li>
                        <li>Sensação de maior controle sobre seus pensamentos</li>
                      </ul>
                      <p className="mt-2">
                        Se você não está experimentando esses benefícios, considere consultar um terapeuta para
                        orientação adicional.
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

