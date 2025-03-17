import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Criar tabela de contatos
    const { error: contactError } = await supabase.rpc('create_contact_table', {})
    
    if (contactError && !contactError.message.includes('already exists')) {
      return NextResponse.json({ error: contactError.message }, { status: 500 })
    }

    // Criar tabela de inscrições no programa
    const { error: programSignupError } = await supabase.rpc('create_program_signup_table', {})
    
    if (programSignupError && !programSignupError.message.includes('already exists')) {
      return NextResponse.json({ error: programSignupError.message }, { status: 500 })
    }

    // Criar tabela para dados das ferramentas
    const { error: toolsDataError } = await supabase.rpc('create_tools_data_table', {})
    
    if (toolsDataError && !toolsDataError.message.includes('already exists')) {
      return NextResponse.json({ error: toolsDataError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Banco de dados configurado com sucesso' })
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error)
    return NextResponse.json(
      { error: 'Erro ao configurar banco de dados' },
      { status: 500 }
    )
  }
} 