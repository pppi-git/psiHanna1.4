import { Bot, Brain, MessageSquare, ThumbsUp, Zap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "Assistente Virtual Hanara | Hanara Vecello Psicologia",
  description: "Converse com o nosso assistente virtual de apoio psicológico treinado com técnicas de TCC cientificamente comprovadas."
}

export default function AssistenteVirtual() {
  return (
    <div className="container px-4 py-12 mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Assistente Virtual Hanara
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Converse com nosso assistente virtual treinado pela Psicóloga Hanara Vecello com técnicas de TCC cientificamente comprovadas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Apoio emocional e orientação ao seu dispor</h2>
          <p className="text-lg text-muted-foreground">
            Nosso assistente virtual utiliza a mais avançada tecnologia de inteligência artificial para oferecer suporte psicológico baseado em evidências científicas.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Orientações baseadas em TCC</h3>
                <p className="text-muted-foreground">Aprenda técnicas da Terapia Cognitivo-Comportamental para gerenciar pensamentos negativos.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Exercícios de mindfulness</h3>
                <p className="text-muted-foreground">Pratique exercícios de atenção plena para reduzir o estresse e a ansiedade.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Disponível 24/7</h3>
                <p className="text-muted-foreground">Acesso a suporte a qualquer hora do dia, quando você mais precisar.</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <form action="/api/abrir-chatbot">
              <Button size="lg" className="gap-2" type="submit">
                <MessageSquare className="h-4 w-4" />
                <span>Conversar agora</span>
              </Button>
            </form>
            
            <Button variant="outline" size="lg" asChild>
              <Link href="/ferramentas" className="gap-2">
                <Zap className="h-4 w-4" />
                <span>Ver outras ferramentas</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -z-10 rounded-full w-72 h-72 bg-primary/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Assistente Hanara</h3>
                  <p className="text-xs text-muted-foreground">Apoio psicológico sempre disponível</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-muted/30 rounded-lg p-4 rounded-tl-none">
                  <p className="text-sm">
                    Olá! Sou o assistente virtual da Hanara Psicologia. Estou aqui para conversar sobre saúde mental, ajudar com técnicas de TCC e mindfulness. Como posso ajudar você hoje?
                  </p>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-4 rounded-tr-none ml-auto max-w-[80%]">
                  <p className="text-sm">
                    Tenho sentido muita ansiedade ultimamente. O que posso fazer?
                  </p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 rounded-tl-none">
                  <p className="text-sm">
                    Lamento saber que está passando por isso. A ansiedade é uma resposta natural do corpo, mas pode ser desconfortável. Aqui estão algumas técnicas que podem ajudar:
                  </p>
                  <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                    <li>Pratique respiração profunda por 5 minutos</li>
                    <li>Identifique seus pensamentos ansiosos</li>
                    <li>Tente a técnica de aterramento 5-4-3-2-1</li>
                    <li>Estabeleça uma rotina de autocuidado</li>
                  </ul>
                  <p className="text-sm mt-2">
                    Gostaria de explorar alguma dessas técnicas mais a fundo?
                  </p>
                </div>
              </div>
              
              <form action="/api/abrir-chatbot">
                <Button className="w-full gap-2" type="submit">
                  <MessageSquare className="h-4 w-4" />
                  <span>Iniciar conversa</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-xl p-8 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Como o assistente pode ajudar você</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nosso assistente foi desenvolvido para oferecer apoio em diversas situações, sempre com base em técnicas comprovadas cientificamente.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Técnicas de TCC</h3>
            <p className="text-muted-foreground">
              Aprenda a identificar pensamentos distorcidos e substituí-los por pensamentos mais realistas e construtivos.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Gestão do estresse</h3>
            <p className="text-muted-foreground">
              Descubra estratégias práticas para lidar com o estresse do dia a dia e melhorar seu bem-estar geral.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <ThumbsUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Hábitos saudáveis</h3>
            <p className="text-muted-foreground">
              Orientações para desenvolver e manter rotinas que promovam a saúde mental e o equilíbrio emocional.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Converse agora mesmo com nosso assistente e dê o primeiro passo em direção ao seu bem-estar emocional.
        </p>
        <form action="/api/abrir-chatbot">
          <Button size="lg" className="gap-2" type="submit">
            <MessageSquare className="h-4 w-4" />
            <span>Iniciar conversa com o assistente</span>
          </Button>
        </form>
      </div>
    </div>
  )
} 