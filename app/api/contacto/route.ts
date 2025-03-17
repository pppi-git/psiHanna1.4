import { NextRequest, NextResponse } from "next/server"
import { submitContactForm } from "@/app/actions"
import { z } from "zod"

// Schema para validação do formulário de contato
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Por favor, selecione um assunto" }),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
  preferredContact: z.enum(["email", "phone", "whatsapp"], {
    required_error: "Por favor, selecione uma forma de contacto",
  }),
})

/**
 * Endpoint POST para processar o envio do formulário de contato
 */
export async function POST(request: NextRequest) {
  console.log("[API] Recebendo requisição POST para /api/contacto")
  
  try {
    // Obter dados do corpo da requisição
    const body = await request.json()
    console.log("[API] Dados recebidos:", body)
    
    // Validar dados com Zod
    const validationResult = contactFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      console.error("[API] Erro de validação:", validationResult.error)
      
      // Retornar erro de validação
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      )
    }
    
    // Dados validados, enviar para a função de ação do servidor
    console.log("[API] Dados validados, enviando para submitContactForm")
    const result = await submitContactForm(validationResult.data)
    
    // Retornar resultado da ação do servidor
    console.log("[API] Resultado da ação:", result)
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 })
    } else {
      return NextResponse.json(result, { status: 500 })
    }
  } catch (error) {
    // Tratar erros
    console.error("[API] Erro ao processar requisição:", error)
    
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao processar requisição",
        error: errorMessage,
      },
      { status: 500 }
    )
  }
} 