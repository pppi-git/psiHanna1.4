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
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Respiração Guiada</CardTitle>
          <CardDescription>Exercícios de respiração para reduzir ansiedade</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground mb-4">
            A respiração consciente é uma das formas mais eficazes de acalmar o sistema nervoso e reduzir a ansiedade.
          </p>
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-lg bg-primary/10 text-center">
              <p className="text-sm text-muted-foreground">
                Experimente técnicas de respiração para reduzir o stress e a ansiedade.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

