import type { Metadata } from "next"
import { DiarioGratidaoClientPage } from "./DiarioGratidaoClientPage"

export const metadata: Metadata = {
  title: "Diário de Gratidão | Ferramentas TCC | Hanara Psicologia",
  description:
    "Cultive uma perspectiva mais positiva com a prática do Diário de Gratidão, uma técnica baseada em evidências para melhorar o bem-estar emocional.",
  keywords:
    "diário de gratidão, gratidão, tcc, terapia cognitivo comportamental, bem-estar, psicologia positiva, saúde mental",
  openGraph: {
    title: "Diário de Gratidão | Ferramentas TCC | Hanara Psicologia",
    description: "Cultive uma perspectiva mais positiva com a prática do Diário de Gratidão",
    images: [
      {
        url: "/images/og-diario-gratidao.jpg",
        width: 1200,
        height: 630,
        alt: "Ferramenta de Diário de Gratidão da Hanara Psicologia",
      },
    ],
  },
}

export default function DiarioGratidaoPage() {
  return <DiarioGratidaoClientPage />
}

