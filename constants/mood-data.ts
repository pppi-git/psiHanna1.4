import type { MoodOption } from "@/types"

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "happy",
    label: "Feliz",
    icon: "Smile",
    tip: "Quando estamos felizes, é um bom momento para praticar gratidão. Tente listar 3 coisas que contribuíram para esse sentimento.",
  },
  {
    id: "calm",
    label: "Calmo",
    icon: "ThumbsUp",
    tip: "A calma é um estado ideal para praticar mindfulness. Aproveite para fazer uma breve meditação de 5 minutos.",
  },
  {
    id: "sad",
    label: "Triste",
    icon: "Frown",
    tip: "A tristeza é uma emoção natural. Permita-se senti-la sem julgamento e considere compartilhar seus sentimentos com alguém de confiança.",
  },
  {
    id: "angry",
    label: "Irritado",
    icon: "AlertCircle",
    tip: "Quando sentimos raiva, respirar profundamente por 10 segundos pode ajudar a acalmar o sistema nervoso antes de reagir.",
  },
  {
    id: "anxious",
    label: "Ansioso",
    icon: "Meh",
    tip: "Para ansiedade, tente a técnica 5-4-3-2-1: identifique 5 coisas que pode ver, 4 que pode tocar, 3 que pode ouvir, 2 que pode cheirar e 1 que pode provar.",
  },
]

export const DEFAULT_MOOD_TIP = "Como você está se sentindo hoje? Selecione uma emoção."

