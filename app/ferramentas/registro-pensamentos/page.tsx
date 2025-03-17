import type { Metadata } from "next"
import { RegistroPensamentosClient } from "./RegistroPensamentosClient"

export const metadata: Metadata = {
  title: "Registro de Pensamentos | Ferramentas TCC | Hanara Psicologia",
  description:
    "Aprenda a identificar e desafiar pensamentos negativos com a técnica de Registro de Pensamentos da Terapia Cognitivo-Comportamental (TCC).",
  keywords:
    "registro de pensamentos, tcc, terapia cognitivo comportamental, pensamentos automáticos, distorções cognitivas, saúde mental",
  openGraph: {
    title: "Registro de Pensamentos | Ferramentas TCC | Hanara Psicologia",
    description:
      "Aprenda a identificar e desafiar pensamentos negativos com a técnica de Registro de Pensamentos da TCC",
    images: [
      {
        url: "/images/og-registro-pensamentos.jpg",
        width: 1200,
        height: 630,
        alt: "Ferramenta de Registro de Pensamentos da Hanara Psicologia",
      },
    ],
  },
}

export default function RegistroPensamentosPage() {
  return <RegistroPensamentosClient />
}

