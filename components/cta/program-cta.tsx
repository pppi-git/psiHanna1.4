import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ProgramCTAProps {
  size?: "default" | "sm" | "lg"
  className?: string
}

export function ProgramCTA({ size = "default", className }: ProgramCTAProps) {
  return (
    <Button asChild size={size} className={`bg-gradient-to-r from-primary to-accent hover:opacity-90 ${className}`}>
      <Link href="/programa">
        Programa de 8 Semanas <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  )
}

