"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { useChatbot } from "./chatbot-provider"

interface ChatButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
}

export function ChatButton({ variant = "default", size = "default", className = "", children }: ChatButtonProps) {
  const { openChatbot } = useChatbot()

  return (
    <Button variant={variant} size={size} className={className} onClick={openChatbot}>
      {children || (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Falar com Assistente
        </>
      )}
    </Button>
  )
}

