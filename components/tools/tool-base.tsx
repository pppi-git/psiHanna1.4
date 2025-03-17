import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface ToolBaseProps {
  icon: ReactNode
  title: string
  description: string
  children: ReactNode
  className?: string
}

export function ToolBase({ icon, title, description, children, className = "" }: ToolBaseProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">{children}</CardContent>
    </Card>
  )
}

