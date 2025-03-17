import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Schema para validação dos dados das ferramentas
const ToolsDataSchema = z.object({
  toolType: z.string(),
  data: z.any()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validar os dados
    const validatedData = ToolsDataSchema.safeParse(body)
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }
    
    const { toolType, data } = validatedData.data
    
    // Obter cliente Supabase
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado
    const { data: authData } = await supabase.auth.getUser()
    
    if (!authData.user) {
      // Se não estiver autenticado, salvar apenas localmente (retornar sucesso)
      return NextResponse.json({ 
        success: true, 
        message: 'Dados salvos localmente',
        local: true
      })
    }
    
    // Se estiver autenticado, salvar no banco de dados
    const { error } = await supabase.from('tools_data').insert({
      user_id: authData.user.id,
      tool_type: toolType,
      data: data
    })
    
    if (error) {
      console.error('Erro ao salvar dados da ferramenta:', error)
      return NextResponse.json(
        { error: 'Erro ao salvar dados' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Dados salvos com sucesso',
      local: false
    })
  } catch (error) {
    console.error('Erro ao processar solicitação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    // Obter parâmetros da URL
    const url = new URL(request.url)
    const toolType = url.searchParams.get('toolType')
    
    if (!toolType) {
      return NextResponse.json(
        { error: 'Parâmetro toolType é obrigatório' },
        { status: 400 }
      )
    }
    
    // Obter cliente Supabase
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado
    const { data: authData } = await supabase.auth.getUser()
    
    if (!authData.user) {
      // Se não estiver autenticado, retornar vazio
      return NextResponse.json({ data: [] })
    }
    
    // Se estiver autenticado, buscar dados do banco de dados
    const { data, error } = await supabase
      .from('tools_data')
      .select('*')
      .eq('user_id', authData.user.id)
      .eq('tool_type', toolType)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar dados da ferramenta:', error)
      return NextResponse.json(
        { error: 'Erro ao buscar dados' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Erro ao processar solicitação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 