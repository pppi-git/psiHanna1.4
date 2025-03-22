import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { Toaster } from "sonner"

export const metadata = {
  title: "Contacto & Inscrições | Hanara Psicologia",
  description:
    "Entre em contacto para agendar consultas, inscrever-se no programa de 8 semanas ou esclarecer dúvidas sobre os serviços oferecidos.",
}

export default function ContactoPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Toaster position="top-center" richColors />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Entre em Contacto</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Estou disponível para esclarecer suas dúvidas e ajudar no seu processo de bem-estar.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contacto</CardTitle>
                  <CardDescription>Várias formas de entrar em contacto comigo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Telefone</h3>
                      <p className="text-sm text-muted-foreground">+351 XXX XXX XXX</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">contacto@hanara.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Localização</h3>
                      <p className="text-sm text-muted-foreground">
                        Florianópolis - Brasil
                        <br />
                        Lisboa - Portugal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Horário de Atendimento</h3>
                      <p className="text-sm text-muted-foreground">
                        Segunda a Sexta: 9h às 19h
                        <br />
                        Sábado: 9h às 13h (mediante agendamento)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Consultas Online</CardTitle>
                  <CardDescription>Atendimento à distância com a mesma qualidade.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ofereço consultas online através de plataformas seguras de videoconferência, permitindo que você
                    receba atendimento de qualidade sem sair de casa. Ideal para quem tem uma agenda ocupada ou reside
                    fora de Lisboa.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Agende uma Consulta</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Escolha um horário conveniente para sua consulta inicial.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-12">
            <Card>
              <CardHeader>
                <CardTitle>Calendário de Disponibilidade</CardTitle>
                <CardDescription>Selecione uma data e horário para sua consulta.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-4">
                  <Calendar className="h-24 w-24 text-primary" />
                </div>
                <p className="text-center text-muted-foreground mb-4">
                  Para agendar uma consulta, entre em contacto por telefone, email ou através do formulário acima.
                </p>
                <div className="flex justify-center">
                  <Button>Solicitar Agendamento</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}

