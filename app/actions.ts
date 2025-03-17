"use server"

import { z } from "zod"

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
  modalidade: z.string().min(1, { message: "Por favor, selecione uma modalidade" }),
  message: z.string().optional(),
})

export type ProgramSignupValues = z.infer<typeof programSignupSchema>

export async function submitContactForm(values: ContactFormValues) {
  try {
    // Em uma aplicação real, você:
    // 1. Armazenaria os dados do formulário em um banco de dados
    // 2. Enviaria uma notificação por email
    // 3. Possivelmente integraria com um sistema CRM

    // Simular um atraso de processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Para demonstração, apenas logamos os dados do formulário
    console.log("Formulário de contato enviado:", values)

    return { success: true, message: "Mensagem enviada com sucesso!" }
  } catch (error) {
    console.error("Erro ao enviar formulário de contato:", error)
    return {
      success: false,
      message: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
    }
  }
}

// Esquema para validação do formulário de inscrição no programa
const ProgramSignupSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Por favor, forneça um número de telefone válido" }),
  modality: z.enum(["presencial", "online"], {
    required_error: "Por favor, selecione uma modalidade",
  }),
  message: z.string().optional(),
})

export async function submitProgramSignup(formData: unknown) {
  try {
    // Validar os dados do formulário
    const validatedFields = ProgramSignupSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Dados de formulário inválidos",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    // Aqui você implementaria a lógica para salvar os dados
    // Por exemplo, enviar para um banco de dados ou API

    // Simulando um atraso de processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Retornar sucesso
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

