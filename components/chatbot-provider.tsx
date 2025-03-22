"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { AzureChatbot } from "./azure-chatbot"
import { useSearchParams } from "next/navigation"

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
  const searchParams = useSearchParams()

  useEffect(() => {
    // Verificar se há parâmetro na URL ou cookie para abrir o chatbot
    const shouldOpenChat = searchParams.get("openChat") === "true" || document.cookie.includes("abrirChatbot=true")
    
    if (shouldOpenChat) {
      setIsOpen(true)
      // Limpar cookie após uso
      document.cookie = "abrirChatbot=; max-age=0; path=/;"
    }
  }, [searchParams])

  const openChatbot = () => setIsOpen(true)
  const closeChatbot = () => setIsOpen(false)

  return (
    <ChatbotContext.Provider value={{ openChatbot, closeChatbot }}>
      {children}
      <AzureChatbot initialSystemMessage={initialSystemMessage} isOpen={isOpen} onClose={closeChatbot} />
    </ChatbotContext.Provider>
  )
}

