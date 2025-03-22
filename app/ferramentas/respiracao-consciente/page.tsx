import { Metadata } from "next"
import { RespiracaoConscienteClient } from "./RespiracaoConscienteClient"

export const metadata: Metadata = {
  title: "Respiração Consciente | Ferramentas TCC | Hanara Psicologia",
  description:
    "Aprenda técnicas de respiração consciente para reduzir a ansiedade, melhorar o foco e promover o relaxamento com exercícios guiados.",
  keywords:
    "respiração consciente, técnicas de respiração, mindfulness, ansiedade, estresse, relaxamento, tcc, terapia cognitivo comportamental",
  openGraph: {
    title: "Respiração Consciente | Ferramentas TCC | Hanara Psicologia",
    description: "Aprenda técnicas de respiração consciente para reduzir a ansiedade e promover o relaxamento",
    images: [
      {
        url: "http://localhost:3000/images/og-respiracao-consciente.jpg",
        width: 1200,
        height: 630,
        alt: "Ferramenta de Respiração Consciente da Hanara Psicologia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Respiração Consciente | Ferramentas TCC | Hanara Psicologia",
    description: "Aprenda técnicas de respiração consciente para reduzir a ansiedade e promover o relaxamento",
    images: [
      {
        url: "http://localhost:3000/images/og-respiracao-consciente.jpg",
        width: 1200,
        height: 630,
        alt: "Ferramenta de Respiração Consciente da Hanara Psicologia",
      },
    ],
  },
}

export default function RespiracaoConscientePage() {
  return <RespiracaoConscienteClient />
}

