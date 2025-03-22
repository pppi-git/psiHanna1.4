import { NextResponse } from "next/server"
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    // Criar cliente Supabase diretamente
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Variáveis de ambiente do Supabase não definidas")
    }
    
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    
    // Testar uma consulta simples
    const { data, error } = await supabase.from('contacts').select('count(*)', { count: 'exact' }).limit(1)
    
    if (error) {
      throw error
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Conexão com Supabase funcionando!",
        data
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro ao conectar com Supabase:", error)
    
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao conectar com Supabase",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    )
  }
} 