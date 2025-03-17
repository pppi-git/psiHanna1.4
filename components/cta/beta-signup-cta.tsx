"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
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
import { z } from "zod"
import { createClient } from "@/lib/supabase/client"

// Schema de validação para o formulário de inscrição beta
const betaSignupSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
});

interface BetaSignupCTAProps {
  size?: "default" | "sm" | "lg"
  className?: string
}

export function BetaSignupCTA({ size = "default", className = "" }: BetaSignupCTAProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
    
    // Limpar erro do campo quando o usuário digita
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }))
    }
  }

  const validateForm = () => {
    try {
      betaSignupSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: {[key: string]: string} = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar formulário
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true)
    
    try {
      console.log("Enviando inscrição beta:", formData);
      
      // Criar cliente Supabase
      const supabase = createClient();
      
      // Verificar se a tabela beta_signups existe, se não, criar
      const { error: tableCheckError } = await supabase.rpc('check_and_create_beta_signups_table');
      
      if (tableCheckError) {
        console.error("Erro ao verificar/criar tabela beta_signups:", tableCheckError);
        // Tentar inserir mesmo assim, talvez a tabela já exista
      }
      
      // Inserir dados na tabela beta_signups
      const { error } = await supabase
        .from('beta_signups')
        .insert({
          name: formData.name,
          email: formData.email,
        });
      
      if (error) {
        console.error("Erro ao salvar inscrição beta:", error);
        
        // Verificar se é um erro de duplicação (email já cadastrado)
        if (error.code === '23505' || error.message.includes('duplicate')) {
          toast.error("Este email já está inscrito no programa beta.", {
            duration: 5000,
          });
          setIsSubmitting(false);
          return;
        }
        
        throw new Error(error.message);
      }
      
      console.log("Inscrição beta salva com sucesso!");
      
      toast.success("Inscrição realizada com sucesso! Entraremos em contato em breve.", {
        duration: 5000,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Erro ao processar inscrição beta:", error);
      
      toast.error("Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const resetForm = () => {
    setFormData({ name: "", email: "" })
    setIsSubmitted(false)
    setErrors({})
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
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <div className="col-span-3 space-y-1">
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <div className="col-span-3 space-y-1">
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-primary to-accent" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Inscrever-se"
                  )}
                </Button>
              </DialogFooter>
            </form>
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

