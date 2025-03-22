import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Schema para validação do formulário de contato
 */
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
 * Tipo para os valores do formulário de contato
 */
type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Tipo para a resposta da API
 */
interface ApiResponse {
  success: boolean
  message: string
  errors?: unknown
  error?: string
}

/**
 * Endpoint POST para processar o envio do formulário de contato
 * Esta versão usa diretamente o cliente Supabase sem depender do middleware
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  console.log("[API-DIRETO] Recebendo requisição POST para /api/contacto-direto")
  
  try {
    // Obter dados do corpo da requisição
    const body = await request.json()
    console.log("[API-DIRETO] Dados recebidos:", body)
    
    // Validar dados com Zod
    const validationResult = contactFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      console.error("[API-DIRETO] Erro de validação:", validationResult.error)
      
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
    
    // Dados validados, criar cliente Supabase diretamente
    console.log("[API-DIRETO] Dados validados, criando cliente Supabase")
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Variáveis de ambiente do Supabase não configuradas")
    }
    
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    
    // Preparar dados para inserção
    const contactData = {
      name: validationResult.data.name,
      email: validationResult.data.email,
      phone: validationResult.data.phone || '',
      subject: validationResult.data.subject,
      message: validationResult.data.message,
      preferred_contact: validationResult.data.preferredContact,
      created_at: new Date().toISOString()
    }
    console.log("[API-DIRETO] Dados preparados para inserção:", contactData)
    
    // Inserir dados na tabela de contatos
    console.log("[API-DIRETO] Inserindo dados na tabela contacts")
    const { error } = await supabase.from('contacts').insert(contactData)
    
    if (error) {
      console.error("[API-DIRETO] Erro ao salvar contato no Supabase:", error)
      
      // Verificar se é um erro de permissão
      if (error.code === '42501' || error.message.includes('permission denied')) {
        return NextResponse.json(
          {
            success: false,
            message: "Você não tem permissão para enviar mensagens",
            error: "Permissão negada"
          },
          { status: 403 }
        )
      }
      
      throw new Error(error.message)
    }
    
    console.log("[API-DIRETO] Dados inseridos com sucesso!")
    
    // Em uma aplicação real, você também enviaria um email de notificação aqui
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Mensagem enviada com sucesso!" 
      },
      { status: 200 }
    )
  } catch (error) {
    // Tratar erros
    console.error("[API-DIRETO] Erro ao processar requisição:", error)
    
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