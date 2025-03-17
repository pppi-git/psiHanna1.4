"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { submitProgramSignup, getProgramSignupSchema } from "@/app/actions"
import type { ProgramSignupValues } from "@/app/actions"
import { z } from "zod"

export function SimpleSignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ProgramSignupValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    modality: "presencial", // valor padrão
    message: "",
  })
  const [success, setSuccess] = useState(false)
  const [schema, setSchema] = useState<z.ZodObject<any> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar o schema do servidor
  useEffect(() => {
    const loadSchema = async () => {
      try {
        const programSchema = await getProgramSignupSchema()
        setSchema(programSchema)
        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao carregar schema:", error)
        toast.error("Erro ao carregar formulário. Por favor, recarregue a página.")
        setIsLoading(false)
      }
    }

    loadSchema()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validar dados com o schema
      if (schema) {
        try {
          schema.parse(formData)
        } catch (validationError) {
          if (validationError instanceof z.ZodError) {
            const errorMessages = validationError.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
            toast.error(`Erro de validação: ${errorMessages}`, {
              duration: 5000,
            })
            setIsSubmitting(false)
            return
          }
        }
      }

      // Enviar dados para o servidor usando a função de ação do servidor
      const result = await submitProgramSignup(formData)

      if (result.success) {
        setSuccess(true)
        toast.success(result.message, {
          duration: 5000,
        })
      } else {
        toast.error(result.message, {
          duration: 5000,
        })
      }
    } catch (error) {
      toast.error("Erro ao processar inscrição. Por favor, tente novamente.", {
        duration: 5000,
      })
      console.error("Erro ao processar inscrição:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6 border shadow-sm">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    )
  }

  if (success) {
    return (
      <Card className="p-6 border shadow-sm">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckIcon className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold">Inscrição Enviada!</h3>
          <p className="text-muted-foreground">
            Obrigado pelo seu interesse. Entraremos em contato em breve com mais informações.
          </p>
          <Button
            onClick={() => {
              setSuccess(false)
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                modality: "presencial",
                message: "",
              })
            }}
            variant="outline"
          >
            Enviar nova inscrição
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Seu nome"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Seu sobrenome"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu.email@exemplo.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Seu telefone"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="modality">Modalidade</Label>
          <select
            id="modality"
            name="modality"
            value={formData.modality}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem (opcional)</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Compartilhe suas expectativas ou dúvidas sobre o programa"
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar Inscrição"}
        </Button>
      </form>
    </Card>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

