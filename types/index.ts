import type React from "react"
// Tipos compartilhados para todo o projeto

export interface JourneyStep {
  id: number
  title: string
  description: string
}

export interface MoodOption {
  id: string
  label: string
  icon: string
  tip: string
}

export interface ToolCardProps {
  icon: React.ReactNode
  title: string
  description: string
  content: React.ReactNode
}

