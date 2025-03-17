import { Sparkles } from "lucide-react"
import { ProgressJourney } from "@/components/calm-inspired/progress-journey"
import { JOURNEY_STEPS } from "@/constants/journey-steps"

export function JourneySection() {
  return (
    <div className="mt-8">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
          <Sparkles className="h-4 w-4 mr-2" />
          <span>Sua Jornada</span>
        </div>
        <h2 className="text-2xl font-bold mb-3">Jornada de Bem-estar</h2>
        <p className="text-muted-foreground">
          O caminho para o bem-estar emocional é uma jornada contínua. Explore as etapas do nosso programa e descubra
          como podemos ajudar você em cada fase do processo.
        </p>
      </div>

      <ProgressJourney steps={JOURNEY_STEPS} />
    </div>
  )
}

