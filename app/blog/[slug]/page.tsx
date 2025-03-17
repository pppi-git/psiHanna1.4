import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, ArrowLeft, Tag, Share2, Bookmark } from "lucide-react"
import { Metadata } from "next"

// Dados simulados de posts do blog
const blogPosts = [
  {
    id: 1,
    title: "Como a Terapia Cognitivo-Comportamental pode ajudar na ansiedade",
    excerpt:
      "Descubra como a TCC oferece ferramentas práticas para identificar e modificar padrões de pensamento que contribuem para a ansiedade.",
    content: `
      <p>A ansiedade é uma resposta natural do organismo a situações de perigo ou stress, mas quando se torna excessiva ou desproporcional, pode interferir significativamente na qualidade de vida. A Terapia Cognitivo-Comportamental (TCC) tem se mostrado uma das abordagens mais eficazes no tratamento de transtornos de ansiedade.</p>
      
      <h2>O que é a Terapia Cognitivo-Comportamental?</h2>
      
      <p>A TCC é uma forma de psicoterapia baseada em evidências científicas que se concentra na identificação e modificação de padrões de pensamento e comportamento disfuncionais. Ela parte do princípio de que nossos pensamentos influenciam diretamente nossas emoções e comportamentos.</p>
      
      <p>No caso da ansiedade, a TCC ajuda a pessoa a reconhecer pensamentos catastróficos ou distorcidos que alimentam o ciclo ansioso e a desenvolver formas mais realistas e adaptativas de interpretar situações.</p>
      
      <h2>Como a TCC aborda a ansiedade?</h2>
      
      <p>A abordagem da TCC para a ansiedade geralmente inclui os seguintes componentes:</p>
      
      <ul>
        <li><strong>Psicoeducação:</strong> Compreender o que é ansiedade, como ela funciona no corpo e na mente, e por que certas respostas ocorrem.</li>
        <li><strong>Identificação de pensamentos automáticos:</strong> Reconhecer os pensamentos negativos que surgem rapidamente em situações ansiogênicas.</li>
        <li><strong>Reestruturação cognitiva:</strong> Aprender a questionar e modificar pensamentos distorcidos, substituindo-os por alternativas mais realistas.</li>
        <li><strong>Exposição gradual:</strong> Enfrentar progressivamente situações evitadas devido à ansiedade, em um ritmo tolerável.</li>
        <li><strong>Técnicas de relaxamento:</strong> Aprender métodos como respiração diafragmática, relaxamento muscular progressivo e mindfulness.</li>
        <li><strong>Prevenção de recaídas:</strong> Desenvolver estratégias para manter os ganhos terapêuticos a longo prazo.</li>
      </ul>
      
      <h2>Benefícios da TCC para ansiedade</h2>
      
      <p>Diversos estudos científicos comprovam a eficácia da TCC no tratamento de transtornos de ansiedade. Entre os principais benefícios estão:</p>
      
      <ul>
        <li>Redução significativa dos sintomas de ansiedade</li>
        <li>Resultados duradouros, que se mantêm após o término da terapia</li>
        <li>Desenvolvimento de habilidades que podem ser aplicadas em diferentes situações</li>
        <li>Menor taxa de recaída comparada a tratamentos exclusivamente medicamentosos</li>
        <li>Abordagem estruturada e focada em objetivos, geralmente com duração limitada</li>
      </ul>
    `,
    date: "10 de Março, 2025",
    readTime: "6 min",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["TCC", "Ansiedade", "Saúde Mental"],
    slug: "tcc-ansiedade",
    author: {
      name: "Dra. Hanara Silva",
      role: "Psicóloga Clínica",
      image: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: 2,
    title: "Mindfulness no dia a dia: práticas simples para começar",
    excerpt:
      "Aprenda como incorporar a atenção plena em atividades cotidianas e transformar sua relação com o momento presente.",
    content: `
      <p>Mindfulness, ou Atenção Plena, é a prática de estar conscientemente presente no momento atual, observando pensamentos, sensações e o ambiente ao redor sem julgamento. Embora muitas pessoas associem mindfulness a longas sessões de meditação, é possível incorporar esta prática em atividades cotidianas, trazendo mais consciência e presença para a vida diária.</p>
      
      <h2>O que é Mindfulness?</h2>
      
      <p>Mindfulness pode ser definido como a capacidade de estar totalmente presente, consciente de onde estamos e o que estamos fazendo, sem reagir excessivamente ao que está acontecendo ao nosso redor ou dentro de nós. Esta prática tem raízes em tradições contemplativas antigas, mas foi adaptada para contextos contemporâneos e validada por numerosos estudos científicos.</p>
      
      <h2>Benefícios do Mindfulness</h2>
      
      <p>Pesquisas científicas têm demonstrado diversos benefícios da prática regular de mindfulness:</p>
      
      <ul>
        <li>Redução de stress e ansiedade</li>
        <li>Melhora na qualidade do sono</li>
        <li>Aumento da capacidade de concentração e foco</li>
        <li>Maior regulação emocional</li>
        <li>Diminuição de sintomas depressivos</li>
        <li>Melhora no sistema imunológico</li>
        <li>Redução da pressão arterial</li>
      </ul>
    `,
    date: "5 de Março, 2025",
    readTime: "5 min",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Mindfulness", "Bem-estar", "Práticas Diárias"],
    slug: "mindfulness-dia-a-dia",
    author: {
      name: "Dra. Hanara Silva",
      role: "Psicóloga Clínica",
      image: "/placeholder.svg?height=100&width=100",
    },
  },
]

// Definição de tipos
type BlogPostParams = {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Artigo não encontrado | Hanara Psicologia",
      description: "O artigo que você está procurando não foi encontrado.",
    }
  }

  return {
    title: `${post.title} | Hanara Psicologia`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostParams) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return (
      <main className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Artigo não encontrado</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                O artigo que você está procurando não foi encontrado.
              </p>
              <Link href="/blog">
                <Button>Voltar para o Blog</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para o Blog
            </Link>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} de leitura</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
                <div className="flex items-center space-x-4 mb-8">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex gap-2 flex-wrap mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="flex items-center justify-between pt-8 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
