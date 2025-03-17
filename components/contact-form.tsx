"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { ArrowRight, Loader2 } from "lucide-react"

// Esquema de validação
const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Número de telefone inválido" }).optional(),
  subject: z.enum(["consulta", "programa", "duvida", "outro"], {
    required_error: "Por favor selecione um assunto",
  }),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Inicializar o formulário
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "duvida",
      message: "",
    },
  })

  const { watch } = form

  // Função para lidar com o envio do formulário
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      // Simular um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aqui você adicionaria a lógica real de envio para seu backend
      console.log("Dados do formulário:", data)

      // Mostrar mensagem de sucesso
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.", {
        duration: 5000,
      })

      // Resetar o formulário
      form.reset()
    } catch (error) {
      // Mostrar mensagem de erro
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente.", {
        duration: 5000,
      })
      console.error("Erro ao enviar formulário:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">Entre em Contacto</h3>
          <p className="text-sm text-muted-foreground">
            Preencha o formulário abaixo para enviar uma mensagem. Responderei o mais breve possível.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu.email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+351 XXX XXX XXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Assunto</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="consulta" />
                        </FormControl>
                        <FormLabel className="font-normal">Agendar Consulta</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="programa" />
                        </FormControl>
                        <FormLabel className="font-normal">Inscrição no Programa de 8 Semanas</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="duvida" />
                        </FormControl>
                        <FormLabel className="font-normal">Dúvida</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="outro" />
                        </FormControl>
                        <FormLabel className="font-normal">Outro</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("subject") === "programa" && (
              <p className="text-sm text-muted-foreground mt-2">
                Por favor, indique na mensagem se prefere a modalidade presencial ou online.
              </p>
            )}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escreva sua mensagem aqui..."
                      className="resize-none min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Mensagem
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

