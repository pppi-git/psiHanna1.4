"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Toaster } from "sonner"

export default function ProgramaClientPage() {
  const [activeWeek, setActiveWeek] = useState(1)

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [structureRef, structureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Toaster position="top-center" richColors />
      <section ref={heroRef} className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center space-y-4 text-center"
            >
              <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-primary/20 text-primary mb-2 mx-auto">
                <span className="text-sm font-medium">Transformação em 8 Semanas</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Programa de 8 Semanas
                </h1>
                <p className="text-muted-foreground md:text-xl mx-auto">
                  Uma jornada estruturada para redução de stress e ansiedade, combinando T.C.C. e Mindfulness.
                </p>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Este programa foi desenvolvido para proporcionar ferramentas práticas e eficazes para lidar com o
                  stress e a ansiedade do dia a dia, promovendo maior equilíbrio emocional e bem-estar.
                </p>
                <p>
                  Ao longo de 8 semanas, você aprenderá técnicas baseadas em evidências científicas que poderá
                  incorporar na sua rotina, transformando sua relação com pensamentos, emoções e comportamentos.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-4">
                <Link href="/contacto" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Inscrever-me Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={benefitsRef} className="w-full py-12 md:py-24 lg:py-32 gradient-bg">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-accent/20 text-accent mb-2">
                <span className="text-sm font-medium">Resultados Comprovados</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Benefícios do Programa</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                O que você pode esperar ao participar do programa de 8 semanas.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate={benefitsInView ? "show" : "hidden"}
            className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col space-y-2">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Redução de Stress</h3>
                  <p className="text-sm text-muted-foreground">
                    Aprenda técnicas eficazes para reduzir os níveis de stress e gerenciar situações desafiadoras.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col space-y-2">
                  <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Controlo da Ansiedade</h3>
                  <p className="text-sm text-muted-foreground">
                    Desenvolva habilidades para identificar e modificar padrões de pensamento ansiosos.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col space-y-2">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Atenção Plena</h3>
                  <p className="text-sm text-muted-foreground">
                    Cultive a capacidade de estar presente no momento atual, reduzindo ruminações e preocupações.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col space-y-2">
                  <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Regulação Emocional</h3>
                  <p className="text-sm text-muted-foreground">
                    Melhore sua capacidade de reconhecer e gerenciar emoções difíceis de forma saudável.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col space-y-2">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Autocompaixão</h3>
                  <p className="text-sm text-muted-foreground">
                    Desenvolva uma atitude mais gentil e compreensiva em relação a si mesmo.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col space-y-2">
                  <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Hábitos Saudáveis</h3>
                  <p className="text-sm text-muted-foreground">
                    Incorpore práticas diárias que promovam bem-estar físico e mental a longo prazo.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={structureRef} className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 wave-pattern opacity-20 z-0"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={structureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-primary/20 text-primary mb-2">
                <span className="text-sm font-medium">Jornada Completa</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Estrutura do Programa</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Conheça o conteúdo abordado em cada semana do programa.
              </p>
            </div>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <div className="flex justify-between mb-8 overflow-x-auto pb-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
                <button
                  key={week}
                  onClick={() => setActiveWeek(week)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 min-w-[40px] ${
                    activeWeek === week
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                >
                  {week}
                </button>
              ))}
            </div>

            <motion.div
              key={activeWeek}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center mr-2 text-primary font-bold">
                      {activeWeek}
                    </span>
                    {activeWeek <= 2
                      ? "Fundamentos"
                      : activeWeek <= 4
                        ? "Aprofundamento"
                        : activeWeek <= 6
                          ? "Integração"
                          : "Consolidação"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeWeek <= 2 && (
                    <>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Introdução aos conceitos básicos de T.C.C. e Mindfulness</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Identificação de padrões de pensamento automáticos</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Práticas iniciais de atenção à respiração e ao corpo</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Estabelecimento de intenções e objetivos pessoais</span>
                      </p>
                    </>
                  )}
                  {activeWeek > 2 && activeWeek <= 4 && (
                    <>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Técnicas avançadas de reestruturação cognitiva</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Práticas de body scan e meditação sentada</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Estratégias para lidar com pensamentos difíceis</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Desenvolvimento de autocompaixão</span>
                      </p>
                    </>
                  )}
                  {activeWeek > 4 && activeWeek <= 6 && (
                    <>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Mindfulness nas atividades diárias</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Gestão de emoções difíceis</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Comunicação consciente e relações interpessoais</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Práticas para lidar com o stress no momento presente</span>
                      </p>
                    </>
                  )}
                  {activeWeek > 6 && (
                    <>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Desenvolvimento de um plano de prática pessoal</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Estratégias para manutenção dos ganhos a longo prazo</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Prevenção de recaídas</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Integração das práticas na vida cotidiana</span>
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-xs bg-white/50 h-2 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${(activeWeek / 8) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="inscricao" className="w-full py-12 md:py-24 lg:py-32 gradient-bg">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-accent/20 text-accent mb-2">
                <span className="text-sm font-medium">Vagas Limitadas</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Inscreva-se no Programa</h2>
              <p className="text-muted-foreground">
                Entre em contato para garantir sua vaga na próxima turma do programa de 8 semanas.
              </p>
              <div className="space-y-2">
                <p className="font-medium">Detalhes do Programa:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">Duração: 8 semanas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">Formato: Sessões semanais de 2 horas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">Modalidade: Presencial ou online</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      Material: Acesso a recursos digitais e guias de prática
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      Suporte: Acompanhamento individual durante todo o programa
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                As vagas são limitadas para garantir um atendimento de qualidade. Reserve já o seu lugar!
              </p>
              <div className="pt-4">
                <Link href="/contacto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Contactar para Inscrição
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden h-full">
                <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
                <CardContent className="p-6 flex flex-col justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Próxima Turma</h3>
                    <p className="text-muted-foreground">
                      A próxima turma do programa de 8 semanas terá início em breve. Entre em contato para garantir sua
                      vaga e receber informações detalhadas sobre datas, horários e valores.
                    </p>
                    <div className="pt-4">
                      <Link href="/contacto">
                        <Button variant="outline" size="lg" className="w-full">
                          Solicitar Informações
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 wave-pattern opacity-20 z-0"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-primary/20 text-primary mb-2">
                <span className="text-sm font-medium">Dúvidas Frequentes</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Perguntas Frequentes</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Respostas para as dúvidas mais comuns sobre o programa de 8 semanas.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl space-y-4 py-12"
          >
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary to-accent"></div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Preciso ter experiência prévia com meditação?</h3>
                  <p className="text-muted-foreground">
                    Não, o programa é adequado tanto para iniciantes quanto para pessoas com experiência. Todas as
                    práticas são ensinadas desde o básico.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary to-accent"></div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Quanto tempo preciso dedicar diariamente às práticas?</h3>
                  <p className="text-muted-foreground">
                    Recomendamos cerca de 20-30 minutos diários para as práticas formais, além da aplicação dos
                    conceitos no dia a dia. Essa prática consistente é fundamental para obter os melhores resultados.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary to-accent"></div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    O programa é adequado para quem está em tratamento psiquiátrico?
                  </h3>
                  <p className="text-muted-foreground">
                    Sim, mas é importante informar sobre seu tratamento atual. O programa pode ser um complemento
                    valioso, mas não substitui tratamentos em andamento.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary to-accent"></div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Posso fazer o programa totalmente online?</h3>
                  <p className="text-muted-foreground">
                    Sim, oferecemos a modalidade 100% online com a mesma qualidade e conteúdo do formato presencial,
                    através de plataforma de videoconferência.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10px, -10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10px, -15px) rotate(5deg);
          }
          50% {
            transform: translate(15px, 10px) rotate(10deg);
          }
          75% {
            transform: translate(-10px, 15px) rotate(-5deg);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.1;
            box-shadow: 0 0 3px rgba(255, 255, 255, 0.1);
          }
          50% {
            opacity: 0.3;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
          }
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  )
}

