import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ToolCardProps } from "@/types"

export function ToolCard({ icon, title, description, content }: ToolCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">{content}</CardContent>
    </Card>
  )
}

