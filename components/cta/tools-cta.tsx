import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ToolsCTAProps {
  size?: "default" | "sm" | "lg"
  className?: string
}

export function ToolsCTA({ size = "default", className }: ToolsCTAProps) {
  return (
    <Button asChild size={size} className={`bg-gradient-to-r from-primary to-accent hover:opacity-90 ${className}`}>
      <Link href="/ferramentas">
        Explorar Ferramentas <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  )
}

