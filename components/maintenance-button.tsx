"use client"

import type React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

export function MaintenanceButton({ children, ...props }: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setIsClicked(true)

    toast.warning("Área em manutenção", {
      description: "Esta funcionalidade está temporariamente indisponível enquanto trabalhamos em melhorias.",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      duration: 5000,
    })

    // Reset após um tempo para permitir cliques futuros
    setTimeout(() => setIsClicked(false), 2000)
  }

  return (
    <Button onClick={handleClick} disabled={isClicked} {...props}>
      {children}
    </Button>
  )
}

