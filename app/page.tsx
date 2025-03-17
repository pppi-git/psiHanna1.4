"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Brain,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Star,
  Sparkles,
  Leaf,
  Shield,
  Bot,
} from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { FeatureCard } from "@/components/calm-inspired/feature-card"
import { TestimonialCarousel } from "@/components/calm-inspired/testimonial-carousel"
import { ProgressJourney } from "@/components/calm-inspired/progress-journey"
import { BenefitsGrid } from "@/components/calm-inspired/benefits-grid"
import { InteractiveQuote } from "@/components/calm-inspired/interactive-quote"
import { ChatButton } from "@/components/chat-button"
import { useToast } from "@/hooks/use-toast"
import type React from "react"

export default function Home() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { toast } = useToast()

  const handlePatientAreaClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast({
      title: "Área em Construção",
      description: "A área do paciente está em desenvolvimento e estará disponível em breve.",
      duration: 5000,
    })
  }

  const testimonials = [
    {
      id: 1,
      quote:
        "O programa de 8 semanas transformou completamente a forma como lido com o stress. Sinto-me mais calma e presente no dia a dia.",
      author: "Maria Silva",
      role: "Professora",
    },
    {
      id: 2,
      quote:
        "As sessões de terapia com a Dra. Hanara me ajudaram a superar um período muito difícil da minha vida. Sou muito grato pelo seu apoio.",
      author: "João Pereira",
      role: "Engenheiro",
    },
    {
      id: 3,
      quote:
        "Aprendi técnicas de mindfulness que uso diariamente. A ansiedade diminuiu significativamente e consigo lidar melhor com situações estressantes.",
      author: "Ana Costa",
      role: "Advogada",
    },
  ]

  const journeySteps = [
    {
      id: 1,
      title: "Autoconhecimento",
      description:
        "Comece sua jornada com uma avaliação personalizada para identificar padrões de pensamento e comportamento que contribuem para o stress e ansiedade.",
    },
    {
      id: 2,
      title: "Aprendizagem",
      description:
        "Aprenda técnicas baseadas em evidências científicas da Terapia Cognitivo-Comportamental e práticas de Mindfulness para gerenciar emoções.",
    },
    {
      id: 3,
      title: "Prática",
      description:
        "Desenvolva uma rotina diária de práticas que promovem o bem-estar mental e emocional, com suporte contínuo durante todo o processo.",
    },
    {
      id: 4,
      title: "Integração",
      description:
        "Incorpore as novas habilidades na sua vida cotidiana, transformando sua relação com pensamentos, emoções e situações desafiadoras.",
    },
  ]

  const benefits = [
    {
      id: 1,
      title: "Redução de Stress",
      description:
        "Aprenda técnicas eficazes para reduzir os níveis de stress e gerenciar situações desafiadoras do dia a dia.",
    },
    {
      id: 2,
      title: "Controlo da Ansiedade",
      description:
        "Desenvolva habilidades para identificar e modificar padrões de pensamento ansiosos que afetam seu bem-estar.",
    },
    {
      id: 3,
      title: "Atenção Plena",
      description:
        "Cultive a capacidade de estar presente no momento atual, reduzindo ruminações e preocupações excessivas.",
    },
    {
      id: 4,
      title: "Regulação Emocional",
      description: "Melhore sua capacidade de reconhecer e gerenciar emoções difíceis de forma saudável e construtiva.",
    },
    {
      id: 5,
      title: "Autocompaixão",
      description: "Desenvolva uma atitude mais gentil e compreensiva em relação a si mesmo, reduzindo a autocrítica.",
    },
    {
      id: 6,
      title: "Hábitos Saudáveis",
      description: "Incorpore práticas diárias que promovam bem-estar físico e mental a longo prazo em sua rotina.",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-white to-primary/5"
      >
        <div className="absolute inset-0 wave-pattern opacity-30 z-0"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Encontre paz interior e equilíbrio emocional</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Transforme sua relação com o stress e ansiedade
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Terapia Cognitivo-Comportamental, Mindfulness e programas especializados para ajudar você a viver com
                mais calma, clareza e bem-estar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/programa">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 rounded-full px-6"
                  >
                    Programa de 8 Semanas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <ChatButton
                  variant="outline"
                  size="lg"
                  className="border-primary hover:bg-primary/10 transition-all duration-300 rounded-full px-6"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Falar com Assistente
                </ChatButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16"
            >
              <div className="p-8 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm">
                <p className="text-center text-muted-foreground">
                  Experimente técnicas de respiração para reduzir o stress e a ansiedade.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="w-full py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Sua Jornada para o Bem-estar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Um processo estruturado e personalizado para ajudar você a desenvolver habilidades duradouras para lidar
              com o stress e a ansiedade.
            </p>
          </div>

          <ProgressJourney steps={journeySteps} />
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="w-full py-20 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-2">
              <Leaf className="h-4 w-4 mr-2" />
              <span>Abordagens Terapêuticas</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Serviços Especializados</h2>
            <p className="max-w-2xl text-muted-foreground">
              Abordagens terapêuticas personalizadas para ajudar no seu processo de crescimento e bem-estar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Brain}
              title="Terapia Cognitivo-Comportamental"
              description="Abordagem baseada em evidências para identificar e modificar padrões de pensamento negativos que influenciam comportamentos e emoções."
              color="primary"
            />
            <FeatureCard
              icon={Heart}
              title="Mindfulness"
              description="Técnicas que promovem a consciência do momento presente, ajudando a lidar com pensamentos e emoções difíceis de forma mais equilibrada."
              color="accent"
            />
            <FeatureCard
              icon={Calendar}
              title="Programa de 8 Semanas"
              description="Um percurso guiado que combina T.C.C. e mindfulness para desenvolver habilidades de gestão emocional e redução de stress."
              color="secondary"
            />
          </div>

          <div className="mt-12 text-center">
            <Link href="/ferramentas">
              <Button className="rounded-full px-6 bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent transition-all duration-300">
                Explorar Ferramentas Interativas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full py-16 bg-gradient-to-b from-white to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <InteractiveQuote />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              <Shield className="h-4 w-4 mr-2" />
              <span>Resultados Comprovados</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Benefícios para Sua Vida</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O que você pode esperar ao participar do programa de 8 semanas ou das sessões de terapia individual.
            </p>
          </div>

          <BenefitsGrid benefits={benefits} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-2">
              <Star className="h-4 w-4 mr-2" />
              <span>Histórias de Transformação</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">O que Dizem Sobre Mim</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias de pessoas que transformaram suas vidas através da terapia.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="w-full py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={aboutInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="grid gap-12 lg:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <span>Conheça-me</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Sobre a Psicóloga Hanara</h2>
              <p className="text-muted-foreground">
                Especialista em Terapia Cognitivo-Comportamental e Mindfulness, com formação em programas de redução de
                stress e ansiedade.
              </p>
              <p className="text-muted-foreground">
                Dedico-me a criar um espaço seguro e acolhedor onde você possa explorar seus pensamentos e emoções,
                desenvolvendo habilidades práticas para lidar com os desafios da vida com mais equilíbrio e serenidade.
              </p>
              <div className="pt-2">
                <Link href="/sobre">
                  <Button
                    variant="outline"
                    className="group border-accent text-accent hover:bg-accent/10 transition-all duration-300 rounded-full px-6"
                  >
                    Conheça minha trajetória
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col space-y-6"
            >
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Experiência</h3>
                  <p className="text-muted-foreground">
                    Mais de 10 anos de atuação clínica com foco em saúde mental e bem-estar, ajudando pessoas a
                    superarem desafios emocionais.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Atendimento Personalizado</h3>
                  <p className="text-muted-foreground">
                    Abordagem adaptada às necessidades específicas de cada pessoa, respeitando sua individualidade e
                    ritmo de desenvolvimento.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-primary/5 to-accent/5 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Comece sua jornada de transformação
            </h2>
            <p className="text-lg text-muted-foreground">
              Dê o primeiro passo para uma vida com mais equilíbrio emocional, clareza mental e bem-estar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/programa">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 rounded-full px-6"
                >
                  Inscrever no Programa
                </Button>
              </Link>
              <ChatButton
                variant="outline"
                size="lg"
                className="border-primary hover:bg-primary/10 transition-all duration-300 rounded-full px-6"
              />
            </div>
            {/* Botões de CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
                <Link href="/contacto">Agende uma Consulta</Link>
              </Button>
              <Button size="lg" variant="outline" onClick={handlePatientAreaClick}>
                Área do Paciente
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

