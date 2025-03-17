import type { Metadata } from "next"
import { PlanoAcaoClientPage } from "./PlanoAcaoClientPage"

export const metadata: Metadata = {
  title: "Plano de Ação | Ferramentas TCC | Hanara Psicologia",
  description:
    "Transforme seus objetivos em passos concretos e alcançáveis com a técnica de Plano de Ação, uma ferramenta eficaz para organizar metas e aumentar sua produtividade.",
  keywords:
    "plano de ação, objetivos, metas, tcc, terapia cognitivo comportamental, produtividade, organização, psicologia",
  openGraph: {
    title: "Plano de Ação | Ferramentas TCC | Hanara Psicologia",
    description: "Transforme seus objetivos em passos concretos e alcançáveis com a técnica de Plano de Ação",
    images: [
      {
        url: "/images/og-plano-acao.jpg",
        width: 1200,
        height: 630,
        alt: "Ferramenta de Plano de Ação da Hanara Psicologia",
      },
    ],
  },
}

export default function PlanoAcaoPage() {
  return <PlanoAcaoClientPage />
}

