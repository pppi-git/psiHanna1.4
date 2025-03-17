import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Award, BookOpen, GraduationCap } from "lucide-react"

export const metadata = {
  title: "Sobre | Hanara Psicologia",
  description:
    "Conheça a psicóloga Hanara, sua formação, metodologia e abordagem terapêutica baseada em T.C.C. e Mindfulness.",
}

export default function SobrePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Texto à esquerda */}
              <div className="max-w-3xl text-left space-y-4 flex-1">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Sobre Mim</h1>
                  <p className="text-muted-foreground md:text-xl">
                    Olá, sou a Hanara, psicóloga especializada em Terapia Cognitivo-Comportamental e Mindfulness.
                  </p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Dedico-me a ajudar pessoas a superarem desafios emocionais e comportamentais, com foco especial em
                    stress, ansiedade e desenvolvimento pessoal.
                  </p>
                  <p>
                    Minha abordagem combina técnicas baseadas em evidências científicas com um atendimento humanizado e
                    personalizado para cada pessoa.
                  </p>
                </div>
              </div>

              {/* Imagem à direita, menor */}
              <div className="relative w-full md:w-1/3 overflow-hidden rounded-xl" style={{ height: "250px" }}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/83BAF921-D66C-45FD-8765-9388033521BF_1_105_c-TpsgKaWRNeU8gljZzQVe7zYKVtNJrG.jpeg"
                  alt="Psicóloga Hanara"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Formação e Credenciais</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Minha trajetória acadêmica e profissional.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <GraduationCap className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Bacharel em Psicologia</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Formação completa em Psicologia com ênfase em abordagens baseadas em evidências.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <BookOpen className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Especialista em T.C.C.</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Especialização em Terapia Cognitivo-Comportamental pela Universidade PUC.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Award className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Certificação em Mindfulness</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Formação e certificação em práticas de Mindfulness e intervenções baseadas em atenção plena.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="tcc" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Abordagens Terapêuticas</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Conheça as principais metodologias que utilizo no meu trabalho.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Ícone TCC - Pensamentos */}
            <div className="group bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Pensamentos</h3>
              <p className="text-muted-foreground">
                Identificação e reestruturação de pensamentos automáticos negativos e crenças limitantes.
              </p>
            </div>

            {/* Ícone TCC - Emoções */}
            <div className="group bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Emoções</h3>
              <p className="text-muted-foreground">
                Regulação emocional e desenvolvimento de estratégias para lidar com emoções intensas.
              </p>
            </div>

            {/* Ícone TCC - Comportamentos */}
            <div className="group bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Comportamentos</h3>
              <p className="text-muted-foreground">
                Modificação de padrões comportamentais disfuncionais e desenvolvimento de novos hábitos.
              </p>
            </div>

            {/* Ícone Mindfulness */}
            <div className="group bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Mindfulness</h3>
              <p className="text-muted-foreground">
                Práticas de atenção plena para redução de stress e desenvolvimento de consciência no momento presente.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="bg-muted rounded-xl p-6 space-y-4">
              <h3 className="text-2xl font-bold">Terapia Cognitivo-Comportamental</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  A Terapia Cognitivo-Comportamental (T.C.C.) é uma abordagem baseada em evidências científicas que se
                  concentra na identificação e modificação de padrões de pensamento e comportamento disfuncionais.
                </p>
                <p>
                  Esta terapia parte do princípio de que nossos pensamentos influenciam nossas emoções e comportamentos.
                  Ao identificar pensamentos negativos automáticos e crenças limitantes, podemos desafiá-los e
                  substituí-los por alternativas mais adaptativas.
                </p>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-6 space-y-4">
              <h3 className="text-2xl font-bold">Mindfulness</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Mindfulness, ou Atenção Plena, é uma prática que nos ensina a estar presentes no momento atual,
                  observando pensamentos, sensações e emoções sem julgamento.
                </p>
                <p>
                  Esta abordagem tem raízes em tradições contemplativas milenares, mas foi adaptada para contextos
                  terapêuticos modernos, com ampla validação científica de seus benefícios para a saúde mental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pronto para começar?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Conheça o programa de 8 semanas ou agende uma consulta individual.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/programa">
                <Button className="w-full min-[400px]:w-auto">
                  Programa de 8 Semanas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contacto">
                <Button variant="outline" className="w-full min-[400px]:w-auto">
                  Agendar Consulta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

