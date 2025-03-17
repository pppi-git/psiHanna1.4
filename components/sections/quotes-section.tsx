import { Leaf } from "lucide-react"
import { InteractiveQuote } from "@/components/calm-inspired/interactive-quote"

export function QuotesSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-2">
          <Leaf className="h-4 w-4 mr-2" />
          <span>Inspiração Diária</span>
        </div>
        <h2 className="text-2xl font-bold mb-3">Citações Inspiradoras</h2>
        <p className="text-muted-foreground mb-4">
          Às vezes, uma simples mudança de perspectiva pode transformar nosso dia. Explore estas citações inspiradoras
          sobre mindfulness, resiliência e bem-estar emocional.
        </p>
        <p className="text-sm text-muted-foreground">
          Passe o mouse sobre a citação para pausar a rotação automática e use as setas para navegar manualmente. Uma
          nova citação aparece a cada 10 segundos.
        </p>
      </div>

      <div>
        <InteractiveQuote />
      </div>
    </div>
  )
}

