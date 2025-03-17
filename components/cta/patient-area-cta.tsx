"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PatientAreaCTAProps {
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline"
  className?: string
  children?: React.ReactNode
}

export function PatientAreaCTA({
  size = "default",
  variant = "default",
  className = "",
  children = "Área do Paciente",
}: PatientAreaCTAProps) {
  const { toast } = useToast()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast({
      title: "Área em Construção",
      description: "A área do paciente está em desenvolvimento e estará disponível em breve.",
      duration: 5000,
    })
  }

  const baseClass =
    variant === "default"
      ? "bg-gradient-to-r from-primary to-accent hover:opacity-90"
      : "border-primary hover:bg-primary/10"

  return (
    <Button size={size} variant={variant} onClick={handleClick} className={`${baseClass} ${className}`}>
      {children} {variant === "default" && <ArrowRight className="ml-2 h-4 w-4" />}
    </Button>
  )
}

