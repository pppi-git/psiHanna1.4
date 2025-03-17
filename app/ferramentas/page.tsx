import type { Metadata } from "next"
import { FerramentasPageClient } from "./FerramentasPageClient"

export const metadata: Metadata = {
  title: "Ferramentas de Saúde Mental | Hanara Psicologia",
  description:
    "Acesse ferramentas gratuitas de saúde mental baseadas em Terapia Cognitivo-Comportamental para melhorar seu bem-estar emocional e mental.",
  keywords:
    "ferramentas tcc, meditação guiada, registro de pensamentos, diário de gratidão, saúde mental, terapia cognitivo-comportamental, exercícios mentais",
  openGraph: {
    title: "Ferramentas de Saúde Mental | Hanara Psicologia",
    description: "Acesse ferramentas gratuitas de saúde mental baseadas em Terapia Cognitivo-Comportamental",
    images: [
      {
        url: "/images/og-ferramentas.jpg",
        width: 1200,
        height: 630,
        alt: "Ferramentas de Saúde Mental da Hanara Psicologia",
      },
    ],
  },
}

export default function FerramentasPage() {
  return <FerramentasPageClient />
}

