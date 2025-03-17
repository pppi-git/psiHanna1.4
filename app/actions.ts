"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

// Schema for contact form validation
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

// Schema for program signup form validation
export const programSignupSchema = z.object({
  firstName: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  lastName: z.string().min(2, { message: "O sobrenome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Por favor, forneça um número de telefone válido" }),
  modality: z.string().min(1, { message: "Por favor, selecione uma modalidade" }),
  message: z.string().optional(),
})

export type ProgramSignupValues = z.infer<typeof programSignupSchema>

export async function submitContactForm(values: ContactFormValues) {
  try {
    // Obter cliente Supabase
    const supabase = await createClient()

    // Inserir dados na tabela de contatos
    const { error } = await supabase.from('contacts').insert({
      name: values.name,
      email: values.email,
      phone: values.phone || '',
      subject: values.subject,
      message: values.message,
      preferred_contact: values.preferredContact
    })

    if (error) {
      console.error("Erro ao salvar contato no Supabase:", error)
      throw new Error(error.message)
    }

    // Em uma aplicação real, você também enviaria um email de notificação aqui

    return { success: true, message: "Mensagem enviada com sucesso!" }
  } catch (error) {
    console.error("Erro ao enviar formulário de contato:", error)
    return {
      success: false,
      message: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
    }
  }
}

export async function submitProgramSignup(values: ProgramSignupValues) {
  try {
    // Obter cliente Supabase
    const supabase = await createClient()

    // Inserir dados na tabela de inscrições no programa
    const { error } = await supabase.from('program_signups').insert({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      modality: values.modality,
      message: values.message || ''
    })

    if (error) {
      console.error("Erro ao salvar inscrição no Supabase:", error)
      throw new Error(error.message)
    }

    // Em uma aplicação real, você também enviaria um email de notificação aqui

    return {
      success: true,
      message: "Inscrição enviada com sucesso!",
    }
  } catch (error) {
    console.error("Erro ao processar inscrição:", error)
    return {
      success: false,
      message: "Ocorreu um erro ao processar sua inscrição",
    }
  }
}

