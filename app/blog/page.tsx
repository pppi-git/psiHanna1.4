import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, ArrowRight, Tag } from "lucide-react"

export const metadata = {
  title: "Blog | Hanara Psicologia",
  description: "Artigos sobre saúde mental, Terapia Cognitivo-Comportamental, Mindfulness e bem-estar emocional.",
}

// Dados simulados de posts do blog
const blogPosts = [
  {
    id: 1,
    title: "Como a Terapia Cognitivo-Comportamental pode ajudar na ansiedade",
    excerpt:
      "Descubra como a TCC oferece ferramentas práticas para identificar e modificar padrões de pensamento que contribuem para a ansiedade.",
    date: "10 de Março, 2025",
    readTime: "6 min",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["TCC", "Ansiedade", "Saúde Mental"],
    slug: "tcc-ansiedade",
  },
  {
    id: 2,
    title: "Mindfulness no dia a dia: práticas simples para começar",
    excerpt:
      "Aprenda como incorporar a atenção plena em atividades cotidianas e transformar sua relação com o momento presente.",
    date: "5 de Março, 2025",
    readTime: "5 min",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Mindfulness", "Bem-estar", "Práticas Diárias"],
    slug: "mindfulness-dia-a-dia",
  },
  {
    id: 3,
    title: "O impacto do stress crônico no corpo e na mente",
    excerpt:
      "Entenda como o stress prolongado afeta diferentes sistemas do organismo e conheça estratégias para gerenciá-lo.",
    date: "28 de Fevereiro, 2025",
    readTime: "8 min",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Stress", "Saúde Mental", "Bem-estar"],
    slug: "impacto-stress-cronico",
  },
  {
    id: 4,
    title: "Sono e saúde mental: uma relação fundamental",
    excerpt:
      "Descubra como a qualidade do sono influencia diretamente sua saúde mental e aprenda técnicas para melhorar seu descanso.",
    date: "20 de Fevereiro, 2025",
    readTime: "7 min",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Sono", "Saúde Mental", "Hábitos Saudáveis"],
    slug: "sono-saude-mental",
  },
  {
    id: 5,
    title: "Autocompaixão: o antídoto para a autocrítica excessiva",
    excerpt:
      "Aprenda a desenvolver uma relação mais gentil consigo mesmo e como isso pode transformar sua saúde emocional.",
    date: "15 de Fevereiro, 2025",
    readTime: "6 min",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Autocompaixão", "Bem-estar", "Desenvolvimento Pessoal"],
    slug: "autocompassao-autocritica",
  },
  {
    id: 6,
    title: "Exercícios de respiração para momentos de ansiedade",
    excerpt:
      "Conheça técnicas de respiração simples e eficazes que podem ajudar a acalmar o sistema nervoso em momentos de ansiedade.",
    date: "10 de Fevereiro, 2025",
    readTime: "4 min",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Respiração", "Ansiedade", "Técnicas"],
    slug: "exercicios-respiracao-ansiedade",
  },
]

export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Blog</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Artigos sobre saúde mental, Terapia Cognitivo-Comportamental, Mindfulness e bem-estar emocional.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime} de leitura</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <div
                        key={tag}
                        className="inline-flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="p-0 h-auto text-primary">
                      Ler artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline">Carregar mais artigos</Button>
          </div>
        </div>
      </section>
    </main>
  )
}

