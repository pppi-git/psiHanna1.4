import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Configuração para exportação estática
export const dynamic = 'force-static'

// Schema para validação dos dados das ferramentas
const ToolDataSchema = z.record(z.unknown())

const ToolsRequestSchema = z.object({
  toolType: z.string().min(1, { message: 'O tipo da ferramenta é obrigatório' }),
  data: ToolDataSchema
})

type ToolsRequest = z.infer<typeof ToolsRequestSchema>

// Definição do tipo para os dados das ferramentas
type ToolData = {
  id?: string
  user_id?: string | null
  tool_type: string
  data: Record<string, any>
}

// Definição do tipo para respostas da API
type ApiResponse = {
  success: boolean
  message: string
  data?: any
  error?: string
}

/**
 * Manipulador POST para salvar dados das ferramentas
 * 
 * @param req Requisição Next.js
 * @returns Resposta JSON com status de sucesso
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Extrair dados do corpo da requisição
    const body = await req.json()
    
    // Validar dados necessários
    if (!body.tool_type || !body.data) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Dados inválidos', 
          error: 'Os campos tool_type e data são obrigatórios' 
        }, 
        { status: 400 }
      )
    }
    
    // Criar dados para inserção
    const toolData: ToolData = {
      tool_type: body.tool_type,
      data: body.data,
      user_id: body.user_id || null, // Pode ser null para usuários anônimos
    }
    
    // Inicializar cliente Supabase
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado (opcional)
    const { data: { user } } = await supabase.auth.getUser()
    
    // Se o usuário estiver autenticado, associar os dados a ele
    if (user && !toolData.user_id) {
      toolData.user_id = user.id
    }
    
    // Inserir dados na tabela tools_data
    const { data, error } = await supabase
      .from('tools_data')
      .insert(toolData)
      .select()
      .single()
    
    if (error) {
      console.error('Erro ao salvar dados da ferramenta:', error)
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Não foi possível salvar os dados', 
          error: error.message 
        }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Dados salvos com sucesso',
      data
    })
  } catch (error: any) {
    console.error('Erro ao processar requisição:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao processar requisição', 
        error: error.message || 'Erro desconhecido' 
      }, 
      { status: 500 }
    )
  }
}

/**
 * Manipulador GET para obter dados das ferramentas
 * 
 * @param req Requisição Next.js
 * @returns Resposta JSON com os dados da ferramenta
 */
export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Obter parâmetros da URL
    const searchParams = req.nextUrl.searchParams
    const toolType = searchParams.get('tool_type')
    const userId = searchParams.get('user_id')
    
    // Validar parâmetros necessários
    if (!toolType) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Parâmetros inválidos', 
          error: 'O parâmetro tool_type é obrigatório' 
        }, 
        { status: 400 }
      )
    }
    
    // Inicializar cliente Supabase
    const supabase = await createClient()
    
    // Verificar se o usuário está autenticado (opcional)
    const { data: { user } } = await supabase.auth.getUser()
    
    // Construir consulta base
    let query = supabase
      .from('tools_data')
      .select('*')
      .eq('tool_type', toolType)
    
    // Filtrar por userId se fornecido ou usar o ID do usuário autenticado
    if (userId) {
      query = query.eq('user_id', userId)
    } else if (user) {
      query = query.eq('user_id', user.id)
    } else {
      // Para usuários anônimos, mostrar apenas entradas sem user_id
      query = query.is('user_id', null)
    }
    
    // Ordenar do mais recente para o mais antigo
    query = query.order('created_at', { ascending: false })
    
    // Executar consulta
    const { data, error } = await query
    
    if (error) {
      console.error('Erro ao buscar dados da ferramenta:', error)
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Não foi possível buscar os dados', 
          error: error.message 
        }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Dados obtidos com sucesso',
      data: data || []
    })
  } catch (error: any) {
    console.error('Erro ao processar requisição:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao processar requisição', 
        error: error.message || 'Erro desconhecido' 
      }, 
      { status: 500 }
    )
  }
} 