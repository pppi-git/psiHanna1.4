import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Schema para validação dos dados das ferramentas
const ToolDataSchema = z.record(z.unknown())

const ToolsRequestSchema = z.object({
  toolType: z.string().min(1, { message: 'O tipo da ferramenta é obrigatório' }),
  data: ToolDataSchema
})

type ToolsRequest = z.infer<typeof ToolsRequestSchema>

interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  error?: string
  local?: boolean
}

/**
 * Salva dados de uma ferramenta
 * Se o usuário estiver autenticado, salva no Supabase
 * Caso contrário, retorna sucesso para salvar localmente
 */
export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()
    
    // Validar os dados
    const result = ToolsRequestSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: 'Dados inválidos',
        message: result.error.errors.map(e => `${e.path}: ${e.message}`).join(', ')
      }, { status: 400 })
    }
    
    const { toolType, data } = result.data
    
    // Obter cliente Supabase
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado
    const { data: authData, error: authError } = await supabase.auth.getUser()
    
    if (authError || !authData.user) {
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
      data
    })
    
    if (error) {
      console.error('Erro ao salvar dados da ferramenta:', error)
      
      // Verificar se é um erro de permissão
      if (error.code === '42501' || error.message.includes('permission denied')) {
        return NextResponse.json({
          success: false,
          error: 'Permissão negada',
          message: 'Você não tem permissão para salvar estes dados',
          local: true
        }, { status: 403 })
      }
      
      return NextResponse.json({
        success: false,
        error: 'Erro ao salvar dados',
        message: error.message,
        local: true
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Dados salvos com sucesso',
      local: false
    })
  } catch (error) {
    console.error('Erro ao processar solicitação:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
      message: errorMessage,
      local: true
    }, { status: 500 })
  }
}

/**
 * Busca dados de uma ferramenta
 * Se o usuário estiver autenticado, busca do Supabase
 * Caso contrário, retorna array vazio
 */
export async function GET(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    // Obter parâmetros da URL
    const url = new URL(request.url)
    const toolType = url.searchParams.get('toolType')
    
    if (!toolType) {
      return NextResponse.json({
        success: false,
        error: 'Parâmetro toolType é obrigatório'
      }, { status: 400 })
    }
    
    // Obter cliente Supabase
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado
    const { data: authData, error: authError } = await supabase.auth.getUser()
    
    if (authError || !authData.user) {
      // Se não estiver autenticado, retornar vazio
      return NextResponse.json({ 
        success: true,
        data: [],
        local: true
      })
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
      
      // Verificar se é um erro de permissão
      if (error.code === '42501' || error.message.includes('permission denied')) {
        return NextResponse.json({
          success: false,
          error: 'Permissão negada',
          message: 'Você não tem permissão para acessar estes dados',
          local: true
        }, { status: 403 })
      }
      
      return NextResponse.json({
        success: false,
        error: 'Erro ao buscar dados',
        message: error.message,
        local: true
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true,
      data,
      local: false
    })
  } catch (error) {
    console.error('Erro ao processar solicitação:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
      message: errorMessage,
      local: true
    }, { status: 500 })
  }
} 