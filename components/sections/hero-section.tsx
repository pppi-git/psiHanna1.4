import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
        <Sparkles className="h-4 w-4 mr-2" />
        <span>Ferramentas Interativas</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ferramentas para seu Bem-estar</h1>

      <p className="text-muted-foreground md:text-lg">
        Experimente estas ferramentas interativas para ajudar a reduzir o stress, aumentar a consciência emocional e
        promover o equilíbrio mental no seu dia a dia.
      </p>
    </div>
  )
}

