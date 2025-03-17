"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { AzureChatbot } from "./azure-chatbot"

interface ChatbotContextType {
  openChatbot: () => void
  closeChatbot: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider")
  }
  return context
}

interface ChatbotProviderProps {
  children: ReactNode
  initialSystemMessage?: string
}

export function ChatbotProvider({ children, initialSystemMessage }: ChatbotProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openChatbot = () => setIsOpen(true)
  const closeChatbot = () => setIsOpen(false)

  return (
    <ChatbotContext.Provider value={{ openChatbot, closeChatbot }}>
      {children}
      <AzureChatbot initialSystemMessage={initialSystemMessage} isOpen={isOpen} onClose={closeChatbot} />
    </ChatbotContext.Provider>
  )
}

