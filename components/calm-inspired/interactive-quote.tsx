"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote } from "lucide-react"

interface QuoteData {
  text: string
  author: string
}

const quotes: QuoteData[] = [
  {
    text: "Respire fundo. Deixe ir. E lembre-se de que este momento exato é o único que você sabe que tem com certeza.",
    author: "Oprah Winfrey",
  },
  {
    text: "A vida é 10% do que acontece conosco e 90% de como reagimos a isso.",
    author: "Charles R. Swindoll",
  },
  {
    text: "A paz vem de dentro. Não a procure fora de você.",
    author: "Buda",
  },
  {
    text: "Você não pode parar as ondas, mas pode aprender a surfar.",
    author: "Jon Kabat-Zinn",
  },
  {
    text: "Preocupe-se menos com o que as pessoas pensam e mais com o que você sente. Seja curioso. Vá por caminhos inexplorados. O que os outros chamam de loucura pode ser genialidade.",
    author: "Thich Nhat Hanh",
  },
  {
    text: "Não deixe que o comportamento dos outros destrua sua paz interior.",
    author: "Dalai Lama",
  },
  {
    text: "Cada manhã somos nascidos de novo. O que fazemos hoje é o que mais importa.",
    author: "Buda",
  },
]

export function InteractiveQuote() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [isHovering])

  const handleNext = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length)
  }

  const handlePrevious = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length)
  }

  return (
    <div
      className="relative max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-b from-primary/5 to-accent/5 backdrop-blur-sm"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-6 left-6 text-primary/20">
        <Quote className="h-10 w-10 rotate-180" />
      </div>

      <div className="min-h-[150px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-lg md:text-xl italic mb-4">"{quotes[currentQuote].text}"</p>
            <p className="text-sm text-muted-foreground">— {quotes[currentQuote].author}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentQuote ? "bg-primary w-4" : "bg-primary/30"
            }`}
            aria-label={`Ver citação ${index + 1}`}
          />
        ))}
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-between px-4 opacity-0 transition-opacity duration-300 ${isHovering ? "opacity-100" : ""}`}
      >
        <button
          onClick={handlePrevious}
          className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-primary hover:bg-white transition-colors"
          aria-label="Citação anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-primary hover:bg-white transition-colors"
          aria-label="Próxima citação"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

