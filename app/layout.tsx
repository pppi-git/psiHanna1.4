import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChatbotProvider } from "@/components/chatbot-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hanara Psicologia | Terapia Cognitivo-Comportamental e Mindfulness",
  description:
    "Serviços de psicologia com foco em Terapia Cognitivo-Comportamental, Mindfulness e programa de 8 semanas para controlo de stress e ansiedade.",
  keywords: "psicologia, terapia cognitivo-comportamental, TCC, mindfulness, ansiedade, stress, Portugal",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-PT">
      <body className={inter.className}>
        <ChatbotProvider initialSystemMessage="Você é um assistente psicológico útil que fornece informações sobre terapia cognitivo-comportamental, mindfulness e bem-estar mental. Você responde em português de Portugal. Você não fornece diagnósticos médicos, apenas informações educacionais. Você representa a Hanara Psicologia, um serviço de psicologia com foco em Terapia Cognitivo-Comportamental, Mindfulness e programa de 8 semanas para controlo de stress e ansiedade.">
          <Header />
          {children}
          <Footer />
        </ChatbotProvider>
      </body>
    </html>
  )
}



import './globals.css'