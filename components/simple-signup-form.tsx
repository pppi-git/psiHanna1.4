"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export function SimpleSignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setIsSubmitting(false)
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
                name: "",
                email: "",
                phone: "",
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
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
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

