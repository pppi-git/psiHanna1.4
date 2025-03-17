"use client"

import { useState } from "react"
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
import { ArrowLeft, Info, Heart, ArrowRight, CheckCircle, HelpCircle, Download, Sparkles } from "lucide-react"

export function DiarioGratidaoClientPage() {
  const [activeTab, setActiveTab] = useState("ferramenta")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    item1: "",
    item2: "",
    item3: "",
    reflection: "",
    mood: "Feliz",
  })
  const [isComplete, setIsComplete] = useState(false)
  const [showTip, setShowTip] = useState(false)

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
    setFormData({
      item1: "",
      item2: "",
      item3: "",
      reflection: "",
      mood: "Feliz",
    })
    setStep(1)
    setIsComplete(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Função para gerar PDF (simulada)
  const handleDownloadPDF = () => {
    alert(
      "Em uma implementação real, esta função geraria um PDF do seu diário de gratidão para você salvar localmente.",
    )
  }

  // Função para obter dica contextual
  const getContextualTip = () => {
    switch (step) {
      case 1:
        return "Tente ser específico sobre o que você agradece. Em vez de 'minha família', você poderia escrever 'o apoio que minha irmã me deu hoje quando precisei conversar'."
      case 2:
        return "Ao refletir, considere como a prática da gratidão está afetando seu dia a dia. Você está notando mais coisas positivas? Está reagindo diferente às situações?"
      case 3:
        return "Escolha o humor que melhor representa como você se sente após completar este exercício de gratidão."
      default:
        return ""
    }
  }

  // Função para obter emoji baseado no humor
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "Feliz":
        return "😊"
      case "Tranquilo":
        return "😌"
      case "Grato":
        return "🙏"
      case "Inspirado":
        return "✨"
      case "Esperançoso":
        return "🌱"
      default:
        return "😊"
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
            <h1 className="text-2xl font-bold">Diário de Gratidão</h1>
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
                  O Diário de Gratidão é uma prática simples mas poderosa que consiste em registrar regularmente coisas
                  pelas quais você é grato.
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
                          Passo {step} de 3: {step === 1 ? "Gratidão" : step === 2 ? "Reflexão" : "Humor"}
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
                          ? "Liste três coisas pelas quais você é grato hoje"
                          : step === 2
                            ? "Reflita sobre como a prática da gratidão está afetando sua vida"
                            : "Como você está se sentindo após este exercício?"}
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
                            <Label htmlFor="item1">Sou grato por...</Label>
                            <Input
                              id="item1"
                              placeholder="Algo bom que aconteceu hoje"
                              value={formData.item1}
                              onChange={(e) => setFormData({ ...formData, item1: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="item2">Sou grato por...</Label>
                            <Input
                              id="item2"
                              placeholder="Uma pessoa que fez diferença na sua vida"
                              value={formData.item2}
                              onChange={(e) => setFormData({ ...formData, item2: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="item3">Sou grato por...</Label>
                            <Input
                              id="item3"
                              placeholder="Algo que você geralmente toma como garantido"
                              value={formData.item3}
                              onChange={(e) => setFormData({ ...formData, item3: e.target.value })}
                            />
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="reflection">Reflexão (opcional)</Label>
                            <Textarea
                              id="reflection"
                              placeholder="Como a prática da gratidão está afetando seu dia a dia? Você está notando mudanças na sua perspectiva?"
                              value={formData.reflection}
                              onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
                              className="min-h-[150px]"
                            />
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="mood">Como você está se sentindo?</Label>
                            <div className="grid grid-cols-5 gap-2">
                              {["Feliz", "Tranquilo", "Grato", "Inspirado", "Esperançoso"].map((mood) => (
                                <Button
                                  key={mood}
                                  type="button"
                                  variant={formData.mood === mood ? "default" : "outline"}
                                  className="flex flex-col items-center p-3 h-auto"
                                  onClick={() => setFormData({ ...formData, mood })}
                                >
                                  <span className="text-2xl mb-1">{getMoodEmoji(mood)}</span>
                                  <span className="text-xs">{mood}</span>
                                </Button>
                              ))}
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
                        disabled={step === 1 && !formData.item1 && !formData.item2 && !formData.item3}
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
                        Parabéns por completar seu diário de gratidão. Revise abaixo o que você registrou.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Sou grato por:</h3>
                          <ul className="space-y-2">
                            {[formData.item1, formData.item2, formData.item3].filter(Boolean).map((item, index) => (
                              <li key={index} className="bg-muted p-3 rounded-md text-sm flex items-start gap-2">
                                <Heart className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                            {[formData.item1, formData.item2, formData.item3].filter(Boolean).length === 0 && (
                              <li className="bg-muted p-3 rounded-md text-sm text-muted-foreground">
                                Nenhum item de gratidão registrado
                              </li>
                            )}
                          </ul>
                        </div>

                        {formData.reflection && (
                          <div>
                            <h3 className="text-sm font-medium mb-2">Reflexão:</h3>
                            <div className="bg-muted p-3 rounded-md text-sm">{formData.reflection}</div>
                          </div>
                        )}

                        <div>
                          <h3 className="text-sm font-medium mb-2">Humor:</h3>
                          <div className="bg-muted p-3 rounded-md text-sm flex items-center gap-2">
                            <span className="text-xl">{getMoodEmoji(formData.mood)}</span>
                            <span>{formData.mood}</span>
                          </div>
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
                      <CardDescription>Sugestões para continuar sua jornada de gratidão</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium flex items-center mb-2">
                            <Sparkles className="h-4 w-4 mr-2 text-primary" />
                            Pratique Diariamente
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Para melhores resultados, torne a gratidão um hábito diário. Escolha um horário específico,
                            como antes de dormir ou logo ao acordar.
                          </p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium flex items-center mb-2">
                            <Heart className="h-4 w-4 mr-2 text-primary" />
                            Varie Suas Práticas
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Além do diário, experimente expressar gratidão diretamente às pessoas, criar um frasco de
                            gratidão ou fazer meditações de gratidão.
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
              <h2 className="text-2xl font-bold mb-4">Sobre o Diário de Gratidão</h2>

              <p className="lead mb-6">
                O Diário de Gratidão é uma prática simples mas poderosa que consiste em registrar regularmente coisas
                pelas quais você é grato, ajudando a cultivar uma perspectiva mais positiva da vida.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">O que é?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Uma prática intencional de notar e apreciar aspectos positivos da vida, desde grandes conquistas
                      até pequenas alegrias cotidianas.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Por que funciona?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      A gratidão redireciona o foco mental de carências e problemas para abundância e aspectos
                      positivos, criando novos padrões neurais com o tempo.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4">Benefícios Comprovados</h3>

              <p className="mb-4">
                Pesquisas científicas têm demonstrado que a prática regular da gratidão pode trazer diversos benefícios
                para o bem-estar físico e mental:
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Bem-estar Emocional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Aumento de emoções positivas</li>
                      <li>• Redução de sintomas depressivos</li>
                      <li>• Maior satisfação com a vida</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Saúde Física</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Melhor qualidade do sono</li>
                      <li>• Redução da pressão arterial</li>
                      <li>• Fortalecimento do sistema imunológico</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Relacionamentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Maior empatia e compaixão</li>
                      <li>• Redução de comparações sociais</li>
                      <li>• Fortalecimento de vínculos</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Resiliência</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Melhor enfrentamento do estresse</li>
                      <li>• Recuperação mais rápida de traumas</li>
                      <li>• Maior capacidade de adaptação</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Perspectiva</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Redução de materialismo</li>
                      <li>• Maior apreciação do presente</li>
                      <li>• Menos comparações sociais</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Desempenho</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Aumento da produtividade</li>
                      <li>• Melhora na tomada de decisões</li>
                      <li>• Maior motivação intrínseca</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4">Como a Gratidão Transforma o Cérebro</h3>

              <p className="mb-4">
                Estudos de neurociência revelam que a prática regular da gratidão pode literalmente remodelar o cérebro:
              </p>

              <div className="bg-muted p-6 rounded-lg mb-8">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                      <span className="text-primary font-medium">1</span>
                    </div>
                    <div>
                      <strong>Ativa o Sistema de Recompensa</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        A gratidão estimula regiões cerebrais associadas a recompensa, formação de vínculos sociais e
                        processamento de prazer, liberando dopamina e serotonina.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                      <span className="text-primary font-medium">2</span>
                    </div>
                    <div>
                      <strong>Reduz Atividade em Regiões de Estresse</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        A prática diminui a atividade na amígdala e outras áreas associadas ao processamento de ameaças
                        e estresse.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                      <span className="text-primary font-medium">3</span>
                    </div>
                    <div>
                      <strong>Fortalece Conexões Neurais</strong>
                      <p className="text-sm text-muted-foreground mt-1">
                        A repetição da prática de gratidão fortalece as vias neurais, tornando mais fácil e natural
                        notar aspectos positivos com o tempo.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">Como Praticar Efetivamente</h3>

              <ol className="space-y-4 mb-6">
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <strong>Seja específico</strong>
                    <p className="text-muted-foreground mt-1">
                      Em vez de "sou grato pela minha família", tente "sou grato pelo apoio que meu irmão me deu durante
                      a mudança de casa".
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <strong>Busque profundidade</strong>
                    <p className="text-muted-foreground mt-1">
                      Reflita sobre por que você é grato por algo e como isso afeta sua vida. A qualidade da reflexão é
                      mais importante que a quantidade.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <strong>Crie um ritual</strong>
                    <p className="text-muted-foreground mt-1">
                      Estabeleça um horário regular para sua prática, como antes de dormir ou logo ao acordar, para
                      criar um hábito consistente.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">4</span>
                  </div>
                  <div>
                    <strong>Varie sua abordagem</strong>
                    <p className="text-muted-foreground mt-1">
                      Alterne entre diferentes práticas de gratidão: escrever, meditar, expressar verbalmente, ou criar
                      um frasco de gratidão.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 shrink-0">
                    <span className="text-primary font-medium">5</span>
                  </div>
                  <div>
                    <strong>Sinta genuinamente</strong>
                    <p className="text-muted-foreground mt-1">
                      Não apenas liste itens mecanicamente. Permita-se sentir genuinamente a gratidão enquanto escreve
                      ou reflete.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mb-8">
                <h3 className="text-xl font-bold mb-3">Evidências Científicas</h3>
                <p className="mb-4">
                  A prática da gratidão é uma das intervenções mais bem estudadas da psicologia positiva:
                </p>
                <ul className="space-y-2">
                  <li className="text-sm">
                    • Um estudo de 2003 por Emmons e McCullough mostrou que participantes que escreveram sobre gratidão
                    semanalmente relataram melhor bem-estar, menos sintomas físicos e mais exercício físico que grupos
                    de controle.
                  </li>
                  <li className="text-sm">
                    • Pesquisadores da Universidade da Califórnia descobriram que pessoas que praticavam gratidão
                    regularmente tinham níveis mais baixos de cortisol (hormônio do estresse) e dormiam melhor.
                  </li>
                  <li className="text-sm">
                    • Um estudo de 2015 publicado no Journal of Personality and Social Psychology mostrou que expressar
                    gratidão fortalece relacionamentos e aumenta comportamentos pró-sociais.
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mb-4">Variações da Prática</h3>

              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Diário de Gratidão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Registrar regularmente coisas pelas quais você é grato. Pode ser diariamente, semanalmente ou em
                      qualquer frequência que funcione para você.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Dica:</strong> Tente listar 3-5 itens e incluir pelo menos um novo a cada dia.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Frasco de Gratidão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Escreva momentos de gratidão em pequenos papéis e coloque-os em um frasco. Quando precisar de um
                      impulso emocional, leia alguns deles.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Dica:</strong> Use papéis coloridos e decore o frasco para tornar a prática mais atraente
                      visualmente.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cartas de Gratidão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Escreva cartas detalhadas para pessoas que impactaram positivamente sua vida, expressando sua
                      gratidão específica.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Dica:</strong> Entregar a carta pessoalmente e ler em voz alta amplifica os benefícios
                      para ambos.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Meditação de Gratidão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Dedique alguns minutos para meditar focando em coisas, pessoas ou experiências pelas quais você é
                      grato.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Dica:</strong> Visualize cada item com detalhes e note as sensações físicas que surgem ao
                      sentir gratidão.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-bold mb-4">Superando Desafios Comuns</h3>

              <Accordion type="single" collapsible className="mb-8">
                <AccordionItem value="challenge1">
                  <AccordionTrigger>Dificuldade em encontrar coisas pelas quais ser grato</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Comece com o básico: saúde, abrigo, alimentação, pessoas em sua vida. Depois, expanda para
                      pequenas alegrias: o sabor do café, um dia ensolarado, uma música que você ama.
                    </p>
                    <p>
                      Tente também mudar sua perspectiva: transforme desafios em oportunidades de gratidão. Por exemplo,
                      "estou grato pela dor nas pernas após o exercício porque significa que estou fortalecendo meu
                      corpo".
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="challenge2">
                  <AccordionTrigger>Sensação de que a prática está se tornando mecânica</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Varie sua abordagem: alterne entre escrever, meditar, expressar verbalmente ou criar
                      representações visuais da sua gratidão.
                    </p>
                    <p>
                      Aprofunde sua reflexão: além de listar pelo que é grato, explore por que isso é importante para
                      você e como afeta sua vida. A qualidade da reflexão é mais importante que a quantidade.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="challenge3">
                  <AccordionTrigger>Manter a consistência da prática</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Vincule a prática a uma rotina existente: por exemplo, pratique gratidão enquanto toma café da
                      manhã ou antes de dormir.
                    </p>
                    <p>
                      Ajuste suas expectativas: se diário parece muito, comece com duas ou três vezes por semana. É
                      melhor uma prática consistente menos frequente do que abandonar completamente.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="challenge4">
                  <AccordionTrigger>Sentir-se inautêntico ou forçado</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Comece onde você está: se está passando por um momento difícil, reconheça isso e busque pequenas
                      coisas pelas quais ser grato, mesmo em meio aos desafios.
                    </p>
                    <p>
                      Lembre-se que gratidão não é negar dificuldades ou fingir que tudo está perfeito. É possível
                      reconhecer desafios e ainda assim apreciar aspectos positivos da vida.
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
                      <li>"Agradecer e Crescer" - Robert Emmons</li>
                      <li>"O Poder da Gratidão" - Brené Brown</li>
                      <li>"365 Dias de Gratidão" - Janice Kaplan</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Aplicativos Úteis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>Gratitude Journal - Diário digital com lembretes</li>
                      <li>Presently - Simples e minimalista</li>
                      <li>ThinkUp - Combina gratidão com afirmações positivas</li>
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
                <CardDescription>Respostas para dúvidas comuns sobre o Diário de Gratidão</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="q1">
                    <AccordionTrigger>Com que frequência devo praticar a gratidão?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        A maioria dos estudos mostra benefícios com práticas diárias ou pelo menos 3 vezes por semana. O
                        mais importante é a consistência - é melhor praticar brevemente com regularidade do que fazer
                        sessões longas esporadicamente. Encontre uma frequência que funcione para sua rotina e que você
                        consiga manter a longo prazo.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q2">
                    <AccordionTrigger>Posso repetir os mesmos itens de gratidão?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Sim, é natural ser grato pelas mesmas coisas fundamentais repetidamente. No entanto, tente
                        adicionar pelo menos um item novo a cada prática para expandir sua consciência. Além disso,
                        mesmo ao mencionar o mesmo item (como "minha família"), tente encontrar aspectos específicos
                        diferentes para apreciar a cada vez.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q3">
                    <AccordionTrigger>Quanto tempo leva para ver resultados?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Muitas pessoas relatam benefícios imediatos após uma única sessão, como melhora no humor. No
                        entanto, para mudanças mais profundas e duradouras, estudos sugerem que a prática consistente
                        por 3-8 semanas começa a criar mudanças neurais significativas. Lembre-se que os benefícios
                        geralmente aumentam com o tempo de prática.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q4">
                    <AccordionTrigger>Como praticar gratidão em momentos difíceis?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Durante períodos desafiadores, a gratidão pode ser ainda mais poderosa, embora mais difícil.
                        Algumas estratégias:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li>Comece com coisas muito simples e básicas</li>
                        <li>Reconheça o que o desafio está lhe ensinando</li>
                        <li>Aprecie pequenos momentos de alívio ou beleza</li>
                        <li>Seja grato por recursos internos como resiliência ou perseverança</li>
                        <li>Lembre-se que sentir gratidão não significa negar a dificuldade</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q5">
                    <AccordionTrigger>A gratidão funciona para qualquer pessoa?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Embora a maioria das pessoas se beneficie da prática da gratidão, a eficácia pode variar.
                        Pessoas com certas condições de saúde mental, como depressão severa, podem inicialmente achar a
                        prática desafiadora e podem se beneficiar de começar com abordagens mais graduais. A
                        personalidade também influencia - pessoas naturalmente mais otimistas podem adotar a prática
                        mais facilmente, mas aqueles com tendências mais pessimistas frequentemente obtêm benefícios
                        ainda maiores com o tempo.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q6">
                    <AccordionTrigger>Qual é a diferença entre gratidão e pensamento positivo?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Embora relacionados, são práticas distintas. O pensamento positivo envolve focar em expectativas
                        otimistas para o futuro, enquanto a gratidão foca em apreciar o que já existe no presente. A
                        gratidão não exige que você negue realidades negativas ou force otimismo - você pode reconhecer
                        desafios e ainda assim ser grato por aspectos específicos da sua vida. Estudos mostram que a
                        gratidão tende a ter efeitos mais duradouros no bem-estar que simplesmente "pensar positivo".
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

