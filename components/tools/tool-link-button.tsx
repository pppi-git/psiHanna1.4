import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToolLinkButtonProps {
  href: string
}

export function ToolLinkButton({ href }: ToolLinkButtonProps) {
  return (
    <div className="flex justify-center">
      <Link href={href}>
        <Button className="bg-gradient-to-r from-primary to-accent">
          Acessar Ferramenta
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}

