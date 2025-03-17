"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface BetaSignupCTAProps {
  size?: "default" | "sm" | "lg"
  className?: string
}

export function BetaSignupCTA({ size = "default", className = "" }: BetaSignupCTAProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aqui você pode adicionar a lógica para enviar os dados para um servidor

    toast.success("Inscrição realizada com sucesso! Entraremos em contato em breve.", {
      duration: 5000,
    })

    setIsSubmitted(true)
  }

  const resetForm = () => {
    setFormData({ name: "", email: "" })
    setIsSubmitted(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={size} className={`bg-gradient-to-r from-primary to-accent ${className}`}>
          Inscrever-se no Beta <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Inscrição no Programa Beta</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para se inscrever no programa beta e ter acesso antecipado às ferramentas
                premium.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  className="col-span-3"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  className="col-span-3"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-gradient-to-r from-primary to-accent" onClick={handleSubmit}>
                Inscrever-se
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Inscrição Confirmada!</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center">
              <div className="mb-4 mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium mb-2">Obrigado por se inscrever, {formData.name}!</p>
              <p className="text-muted-foreground mb-4">
                Enviamos um email de confirmação para <span className="font-medium">{formData.email}</span>. Entraremos
                em contato em breve com mais informações sobre o programa beta.
              </p>
            </div>
            <DialogFooter>
              <Button className="bg-gradient-to-r from-primary to-accent" onClick={resetForm}>
                Fechar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

