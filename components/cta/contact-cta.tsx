import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ContactCTAProps {
  size?: "default" | "sm" | "lg"
  className?: string
}

export function ContactCTA({ size = "default", className }: ContactCTAProps) {
  return (
    <Button asChild size={size} className={`bg-gradient-to-r from-primary to-accent hover:opacity-90 ${className}`}>
      <Link href="/contacto">
        Agendar Consulta <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  )
}

