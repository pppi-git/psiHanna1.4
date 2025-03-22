import { Brain, Heart, FileText, Target, Clock } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PublicToolsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {/* Meditações Guiadas */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Meditações Guiadas</CardTitle>
          <CardDescription>Áudios para prática de mindfulness e relaxamento</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground mb-4">
            Pratique meditação com áudios guiados ou use o timer para sessões personalizadas. Registre suas práticas
            para acompanhar seu progresso.
          </p>
          <Button asChild className="w-full">
            <Link href="/ferramentas/meditacoes">Acessar Ferramenta</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Registro de Pensamentos */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Registro de Pensamentos</CardTitle>
          <CardDescription>Identifique e desafie pensamentos negativos</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground mb-4">
            O registro de pensamentos é uma ferramenta fundamental da Terapia Cognitivo-Comportamental para identificar
            e modificar padrões de pensamento negativos.
          </p>
          <Button asChild className="w-full">
            <Link href="/ferramentas/registro-pensamentos">Acessar Ferramenta</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Diário de Gratidão */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Diário de Gratidão</CardTitle>
          <CardDescription>Cultive uma mentalidade mais positiva</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground mb-4">
            Registre diariamente três coisas pelas quais você é grato. Esta prática simples pode melhorar
            significativamente seu bem-estar emocional.
          </p>
          <Button asChild className="w-full">
            <Link href="/ferramentas/diario-gratidao">Acessar Ferramenta</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Plano de Ação */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Plano de Ação</CardTitle>
          <CardDescription>Divida seus objetivos em passos gerenciáveis</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground mb-4">
            Crie planos de ação estruturados para alcançar seus objetivos. Divida-os em passos pequenos e acompanhe seu
            progresso.
          </p>
          <Button asChild className="w-full">
            <Link href="/ferramentas/plano-acao">Acessar Ferramenta</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Respiração Guiada */}
      <div className="bg-card rounded-lg border shadow-sm transition-all hover:shadow-md">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 text-primary">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Respiração Consciente</h3>
          <p className="text-muted-foreground mb-4">
            Pratique técnicas de respiração guiada para reduzir o stress e a ansiedade. Inclui respiração 4-7-8 e respiração quadrada.
          </p>
          <Link href="/ferramentas/respiracao-consciente">
            <Button className="w-full">Aceder à Ferramenta</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

