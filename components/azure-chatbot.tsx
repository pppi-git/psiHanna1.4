"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  role: "system" | "user" | "assistant"
  content: string
}

interface ChatbotProps {
  initialSystemMessage?: string
  isOpen?: boolean
  onClose?: () => void
}

export function AzureChatbot({
  initialSystemMessage = "Você é um assistente psicológico útil que fornece informações sobre terapia cognitivo-comportamental, mindfulness e bem-estar mental. Você não fornece diagnósticos médicos, apenas informações educacionais.",
  isOpen = false,
  onClose,
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: initialSystemMessage },
    { 
      role: "assistant", 
      content: "Olá! Sou o assistente virtual da Hanara Psicologia. Estou aqui para conversar sobre saúde mental, ajudar com técnicas de TCC e mindfulness. Como posso ajudar você hoje? Não hesite em fazer perguntas!" 
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(isOpen)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setIsVisible(isOpen)
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          max_tokens: 800,
          temperature: 0.7,
          top_p: 0.95,
          stream: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Erro ao chamar a API:", err)
      setError("Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    setIsVisible(!isVisible)
    if (onClose && isVisible) {
      onClose()
    }
  }

  return (
    <>
      {/* Botão flutuante para abrir o chat */}
      {!isVisible && (
        <motion.div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-3 mb-3 max-w-60"
          >
            <p className="text-sm font-medium">Precisa de ajuda? Converse comigo!</p>
            <p className="text-xs text-muted-foreground">Assistente de apoio psicológico</p>
          </motion.div>
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
            onClick={toggleChat}
            aria-label="Abrir chat"
          >
            <Bot className="h-6 w-6" />
          </motion.button>
        </motion.div>
      )}

      {/* Janela de chat */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-full sm:w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Cabeçalho */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Assistente Hanara</h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Fechar chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Área de mensagens */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <AnimatePresence initial={false}>
                {messages
                  .filter((msg) => msg.role !== "system")
                  .map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-primary text-white rounded-tr-none"
                            : "bg-white border border-gray-200 rounded-tl-none"
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          {message.role === "assistant" ? (
                            <Bot className="h-4 w-4 mr-1 text-primary" />
                          ) : (
                            <User className="h-4 w-4 mr-1 text-white" />
                          )}
                          <span className="text-xs font-medium">{message.role === "user" ? "Você" : "Assistente"}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>

              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 mr-1 text-primary" />
                      <span className="text-xs font-medium">Assistente</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
                      <span className="text-sm text-gray-500">Digitando...</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center mb-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-[90%] text-center">
                    <p className="text-sm text-red-600">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => setError(null)}
                    >
                      Tentar novamente
                    </Button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Formulário de entrada */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="resize-none min-h-[60px] max-h-[120px] flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-primary hover:bg-primary/90 h-10 w-10"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Enviar</span>
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Este assistente fornece apenas informações educacionais, não substitui aconselhamento profissional.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

