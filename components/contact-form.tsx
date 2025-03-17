"use client"

import { useState, useEffect } from "react"
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
import { submitContactForm, getContactFormSchema } from "@/app/actions"
import type { ContactFormValues } from "@/app/actions"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSchema, setFormSchema] = useState<z.ZodObject<any> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar o schema do servidor
  useEffect(() => {
    const loadSchema = async () => {
      try {
        const schema = await getContactFormSchema()
        setFormSchema(schema)
        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao carregar schema:", error)
        toast.error("Erro ao carregar formulário. Por favor, recarregue a página.")
        setIsLoading(false)
      }
    }

    loadSchema()
  }, [])

  // Inicializar o formulário
  const form = useForm<ContactFormValues>({
    resolver: formSchema ? zodResolver(formSchema) : undefined,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "duvida",
      message: "",
      preferredContact: "email",
    },
  })

  // Função para lidar com o envio do formulário
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    console.log("Enviando dados do formulário:", data)

    try {
      // Enviar dados para o servidor usando a função de ação do servidor
      console.log("Chamando submitContactForm com dados:", data)
      const result = await submitContactForm(data)
      console.log("Resposta do servidor:", result)

      if (result.success) {
        // Mostrar mensagem de sucesso
        console.log("Formulário enviado com sucesso!")
        toast.success(result.message, {
          duration: 5000,
        })

        // Resetar o formulário
        form.reset()
      } else {
        // Mostrar mensagem de erro
        console.error("Erro retornado pelo servidor:", result.error || result.message)
        
        let mensagemErro = "Erro ao enviar mensagem. Por favor, tente novamente.";
        
        // Personalizar mensagem de erro com base no tipo de erro
        if (result.error?.includes("permission denied")) {
          mensagemErro = "Você não tem permissão para enviar mensagens. Verifique sua conexão.";
        } else if (result.error?.includes("not found")) {
          mensagemErro = "O serviço de mensagens está temporariamente indisponível. Tente novamente mais tarde.";
        } else if (result.error) {
          mensagemErro = `Erro ao enviar mensagem: ${result.error}`;
        }
        
        toast.error(mensagemErro, {
          duration: 5000,
        })
      }
    } catch (error) {
      // Mostrar mensagem de erro
      console.error("Erro ao enviar formulário:", error)
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Erro desconhecido ao processar formulário"
      
      console.error("Detalhes do erro:", errorMessage)
      
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por outro meio.", {
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Carregando formulário...</p>
        </div>
      </div>
    )
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
            
            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Forma de contacto preferida</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="email" />
                        </FormControl>
                        <FormLabel className="font-normal">Email</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="phone" />
                        </FormControl>
                        <FormLabel className="font-normal">Telefone</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="whatsapp" />
                        </FormControl>
                        <FormLabel className="font-normal">WhatsApp</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
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

