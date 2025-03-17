import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, ArrowLeft, Tag, Share2, Bookmark } from "lucide-react"

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
      
      <h2>Um exemplo prático</h2>
      
      <p>Imagine uma pessoa que sente ansiedade intensa ao falar em público. Seus pensamentos automáticos podem incluir: "Vou gaguejar e todos vão rir de mim", "Vou esquecer tudo o que tenho para dizer", "As pessoas vão perceber que estou nervoso e me acharão incompetente".</p>
      
      <p>Na TCC, essa pessoa aprenderia a:</p>
      
      <ol>
        <li>Identificar esses pensamentos ansiosos</li>
        <li>Questionar sua validade: "Qual a probabilidade real de eu esquecer tudo? Já aconteceu antes? O que aconteceu nas últimas vezes que falei em público?"</li>
        <li>Desenvolver pensamentos alternativos mais realistas: "Posso ficar nervoso, mas isso não significa que vou falhar completamente", "Mesmo que eu cometa algum erro, isso não será catastrófico"</li>
        <li>Praticar técnicas de respiração e relaxamento antes de apresentações</li>
        <li>Expor-se gradualmente a situações de fala pública, começando com grupos menores e avançando progressivamente</li>
      </ol>
      
      <h2>Quando procurar ajuda</h2>
      
      <p>Se a ansiedade está interferindo em sua vida cotidiana, relacionamentos, trabalho ou bem-estar geral, considere buscar o apoio de um profissional especializado em TCC. A terapia pode ser realizada individualmente ou em grupo, e muitas vezes é combinada com outras abordagens para maximizar os resultados.</p>
      
      <p>Lembre-se: ansiedade é tratável, e com as ferramentas certas, é possível desenvolver uma relação mais saudável com as preocupações e medos, recuperando qualidade de vida e bem-estar emocional.</p>
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
      
      <h2>Práticas Simples para o Dia a Dia</h2>
      
      <p>Aqui estão algumas maneiras de incorporar mindfulness em sua rotina diária:</p>
      
      <h3>1. Respiração Consciente (1-2 minutos)</h3>
      
      <p>Várias vezes ao dia, pause o que estiver fazendo e traga sua atenção para a respiração. Observe o ar entrando e saindo, a sensação nas narinas, o movimento do peito e abdômen. Quando a mente divagar (o que é natural), gentilmente retorne a atenção à respiração.</p>
      
      <h3>2. Alimentação Consciente</h3>
      
      <p>Durante pelo menos uma refeição por dia, coma com atenção plena:</p>
      
      <ul>
        <li>Observe as cores, texturas e aromas dos alimentos</li>
        <li>Mastigue lentamente, saboreando cada mordida</li>
        <li>Perceba as sensações de fome e saciedade</li>
        <li>Evite distrações como televisão, celular ou computador</li>
      </ul>
      
      <h3>3. Caminhada Consciente</h3>
      
      <p>Ao caminhar, mesmo que por curtas distâncias:</p>
      
      <ul>
        <li>Sinta o contato dos pés com o chão</li>
        <li>Observe o movimento das pernas e braços</li>
        <li>Perceba o ambiente ao redor: sons, cheiros, temperaturas</li>
        <li>Quando a mente divagar, gentilmente retorne a atenção ao ato de caminhar</li>
      </ul>
      
      <h3>4. Pausa Consciente</h3>
      
      <p>Estabeleça "gatilhos" para pausas conscientes durante o dia:</p>
      
      <ul>
        <li>Ao ouvir o telefone tocar, respire profundamente antes de atender</li>
        <li>Antes de iniciar o carro, faça três respirações conscientes</li>
        <li>Ao abrir o e-mail, pause por um momento e conecte-se com seu corpo</li>
      </ul>
      
      <h3>5. Escuta Consciente</h3>
      
      <p>Durante conversas:</p>
      
      <ul>
        <li>Dê atenção plena à pessoa que está falando</li>
        <li>Evite formular respostas enquanto o outro ainda fala</li>
        <li>Observe não apenas as palavras, mas também o tom de voz e linguagem corporal</li>
        <li>Note quando sua mente divaga e gentilmente retorne à conversa</li>
      </ul>
      
      <h2>Dicas para Estabelecer uma Prática Regular</h2>
      
      <ol>
        <li><strong>Comece pequeno:</strong> 1-2 minutos por dia é suficiente para iniciar</li>
        <li><strong>Seja consistente:</strong> pratique diariamente, mesmo que brevemente</li>
        <li><strong>Integre à rotina:</strong> associe a prática a atividades que já realiza</li>
        <li><strong>Seja gentil consigo:</strong> não se julgue quando a mente divagar</li>
        <li><strong>Use lembretes:</strong> adesivos, alarmes ou aplicativos podem ajudar</li>
      </ol>
      
      <h2>Superando Desafios Comuns</h2>
      
      <p><strong>Mente agitada:</strong> É normal que a mente divague. O objetivo não é parar os pensamentos, mas notar quando isso acontece e gentilmente retornar ao momento presente.</p>
      
      <p><strong>Falta de tempo:</strong> Lembre-se que mesmo práticas muito breves (1-2 minutos) trazem benefícios. Além disso, mindfulness pode ser integrado a atividades que você já realiza.</p>
      
      <p><strong>Impaciência:</strong> Os benefícios do mindfulness são cumulativos. Seja paciente e confie no processo, sem expectativas de resultados imediatos.</p>
      
      <h2>Conclusão</h2>
      
      <p>Mindfulness não precisa ser complicado ou demorado. Pequenos momentos de atenção plena distribuídos ao longo do dia podem transformar significativamente sua experiência de vida, reduzindo stress e aumentando bem-estar. Comece hoje mesmo, com práticas simples, e observe as mudanças que ocorrem em sua relação com o momento presente.</p>
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

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
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

                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>

                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={post.author.image || "/placeholder.svg"}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>

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

              <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

              <div className="flex justify-between items-center border-t border-b py-6 mt-8">
                <div className="text-sm">
                  <p className="font-medium">Gostou deste artigo?</p>
                  <p className="text-muted-foreground">Compartilhe com quem possa se interessar</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Compartilhar</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                    <span className="sr-only">Salvar</span>
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

