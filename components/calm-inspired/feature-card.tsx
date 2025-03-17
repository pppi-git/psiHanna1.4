"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  color: "primary" | "accent" | "secondary"
}

export function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  const colorClasses = {
    primary: "from-primary/20 to-primary/5 text-primary",
    accent: "from-accent/20 to-accent/5 text-accent",
    secondary: "from-secondary/30 to-secondary/10 text-foreground",
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-2xl overflow-hidden bg-gradient-to-b p-px"
      style={{ backgroundImage: `linear-gradient(to bottom, hsl(var(--${color})/0.2), transparent)` }}
    >
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 h-full flex flex-col">
        <div
          className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 bg-gradient-to-br ${colorClasses[color]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow">{description}</p>
      </div>
    </motion.div>
  )
}

