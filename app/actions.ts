"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

// Schema para validação do formulário de contato
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Por favor, selecione um assunto" }),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
  preferredContact: z.enum(["email", "phone", "whatsapp"], {
    required_error: "Por favor, selecione uma forma de contacto",
  }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

// Schema para validação do formulário de inscrição no programa
export const programSignupSchema = z.object({
  firstName: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  lastName: z.string().min(2, { message: "O sobrenome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Por favor, forneça um número de telefone válido" }),
  modality: z.string().min(1, { message: "Por favor, selecione uma modalidade" }),
  message: z.string().optional(),
})

export type ProgramSignupValues = z.infer<typeof programSignupSchema>

// Interface para respostas das ações do servidor
interface ActionResponse {
  success: boolean
  message: string
  error?: string
}

/**
 * Envia um formulário de contato
 * Salva os dados no Supabase
 */
export async function submitContactForm(values: ContactFormValues): Promise<ActionResponse> {
  try {
    // Validar dados
    const validatedData = contactFormSchema.parse(values)
    
    // Obter cliente Supabase
    const supabase = await createClient()

    // Inserir dados na tabela de contatos
    const { error } = await supabase.from('contacts').insert({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || '',
      subject: validatedData.subject,
      message: validatedData.message,
      preferred_contact: validatedData.preferredContact
    })

    if (error) {
      console.error("Erro ao salvar contato no Supabase:", error)
      
      // Verificar se é um erro de permissão
      if (error.code === '42501' || error.message.includes('permission denied')) {
        return {
          success: false,
          message: "Você não tem permissão para enviar mensagens",
          error: "Permissão negada"
        }
      }
      
      throw new Error(error.message)
    }

    // Em uma aplicação real, você também enviaria um email de notificação aqui

    return { 
      success: true, 
      message: "Mensagem enviada com sucesso!" 
    }
  } catch (error) {
    console.error("Erro ao enviar formulário de contato:", error)
    
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    
    return {
      success: false,
      message: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
      error: errorMessage
    }
  }
}

/**
 * Envia um formulário de inscrição no programa
 * Salva os dados no Supabase
 */
export async function submitProgramSignup(values: ProgramSignupValues): Promise<ActionResponse> {
  try {
    // Validar dados
    const validatedData = programSignupSchema.parse(values)
    
    // Obter cliente Supabase
    const supabase = await createClient()

    // Inserir dados na tabela de inscrições no programa
    const { error } = await supabase.from('program_signups').insert({
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      modality: validatedData.modality,
      message: validatedData.message || ''
    })

    if (error) {
      console.error("Erro ao salvar inscrição no Supabase:", error)
      
      // Verificar se é um erro de permissão
      if (error.code === '42501' || error.message.includes('permission denied')) {
        return {
          success: false,
          message: "Você não tem permissão para se inscrever no programa",
          error: "Permissão negada"
        }
      }
      
      throw new Error(error.message)
    }

    // Em uma aplicação real, você também enviaria um email de notificação aqui

    return {
      success: true,
      message: "Inscrição enviada com sucesso!",
    }
  } catch (error) {
    console.error("Erro ao processar inscrição:", error)
    
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    
    return {
      success: false,
      message: "Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente.",
      error: errorMessage
    }
  }
}

