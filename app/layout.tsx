import './globals.css'
import { Metadata, Viewport } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChatbotProvider } from "@/components/chatbot-provider"
import { Providers } from './providers'

export const metadataBase = new URL('https://hanarawebsite.vercel.app')

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    template: '%s | Hanara Psicologia',
    default: 'Hanara Psicologia | Terapia Cognitivo-Comportamental', 
  },
  description: 'Serviços de psicologia focados em Terapia Cognitivo-Comportamental e práticas de mindfulness para promover bem-estar emocional e saúde mental.',
  keywords: ['psicologia', 'terapia cognitivo-comportamental', 'mindfulness', 'saúde mental', 'bem-estar emocional', 'psicoterapia', 'ansiedade', 'depressão'],
  authors: [{ name: 'Hanara Psicologia', url: 'https://hanarawebsite.vercel.app' }],
  category: 'Saúde Mental',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Hanara Psicologia | Terapia Cognitivo-Comportamental',
    description: 'Serviços de psicologia focados em Terapia Cognitivo-Comportamental e mindfulness para promover bem-estar emocional e saúde mental.',
    siteName: 'Hanara Psicologia',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hanara Psicologia - Terapia Cognitivo-Comportamental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hanara Psicologia | Terapia Cognitivo-Comportamental',
    description: 'Serviços de psicologia focados em Terapia Cognitivo-Comportamental e mindfulness',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <ChatbotProvider initialSystemMessage="Você é um assistente de apoio psicológico treinado pela Psicóloga Hanara com técnicas de Terapia Cognitivo-Comportamental cientificamente comprovadas. Forneça orientações baseadas em TCC, mindfulness e bem-estar mental. Responda em português do Brasil. Não forneça diagnósticos médicos, apenas informações educacionais.">
            <Header />
            <main>{children}</main>
            <Footer />
          </ChatbotProvider>
        </Providers>
      </body>
    </html>
  )
}

