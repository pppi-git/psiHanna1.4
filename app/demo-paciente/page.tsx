import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Construction, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Área do Paciente - Em Manutenção | Hanara Vecello Psicologia",
  description: "Nossa área do paciente está em manutenção para melhorar sua experiência."
}

export default function ManutencaoPage() {
  return (
    <div className="container px-4 py-12 mx-auto max-w-4xl min-h-[80vh] flex items-center justify-center">
      <Card className="w-full">
        <CardContent className="pt-6 pb-8 px-6">
          <div className="flex flex-col items-center text-center">
            <Construction className="h-16 w-16 text-amber-500 mb-4" />
            
            <h1 className="text-3xl font-bold mb-4">Área do Paciente em Manutenção</h1>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3 max-w-2xl">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-amber-800 text-left">
                <p className="font-medium mb-1">Estamos trabalhando para melhorar sua experiência!</p>
                <p className="text-sm">
                  A área do paciente está temporariamente indisponível enquanto implementamos novas 
                  funcionalidades e melhorias. Agradecemos sua compreensão e paciência.
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Enquanto isso, você pode acessar nossas ferramentas de bem-estar e recursos disponíveis 
              no site principal, ou entrar em contato diretamente para agendar ou confirmar consultas.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para Página Inicial
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link href="/ferramentas" className="flex items-center gap-2">
                  Acessar Ferramentas
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link href="/contacto" className="flex items-center gap-2">
                  Entrar em Contato
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 