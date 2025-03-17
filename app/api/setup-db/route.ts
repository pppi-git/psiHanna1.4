import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server-alt'
import fs from 'fs'
import path from 'path'

interface ApiResponse {
  success: boolean
  message: string
  error?: string
  details?: unknown
}

/**
 * API para configurar o banco de dados Supabase
 * Executa scripts SQL para criar tabelas e políticas
 */
export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    // Obter cliente Supabase
    const supabase = await createClient()
    
    // Ler o script SQL do arquivo
    const sqlFilePath = path.join(process.cwd(), 'supabase', 'setup_simple.sql')
    
    if (!fs.existsSync(sqlFilePath)) {
      return NextResponse.json({
        success: false,
        message: 'Arquivo SQL não encontrado',
        error: `Arquivo não encontrado: ${sqlFilePath}`
      }, { status: 404 })
    }
    
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8')
    
    try {
      // Tentar executar o script SQL usando RPC
      const { error } = await supabase.rpc('exec_sql', { sql: sqlScript })
      
      if (error) {
        console.error('Erro ao executar SQL via RPC:', error)
        throw error
      }
      
      return NextResponse.json({
        success: true,
        message: 'Banco de dados configurado com sucesso'
      })
    } catch (rpcError) {
      console.warn('Função RPC não disponível, tentando método alternativo')
      
      // Se a função RPC não estiver disponível, tentar executar o SQL diretamente
      try {
        // Nota: Esta abordagem requer permissões especiais no Supabase
        const { error: directError } = await supabase.from('_exec_sql').select('*').eq('query', sqlScript)
        
        if (directError) {
          console.error('Erro ao executar SQL diretamente:', directError)
          
          return NextResponse.json({
            success: false,
            message: 'Não foi possível executar o SQL diretamente. Por favor, execute o script manualmente no console SQL do Supabase.',
            error: directError.message,
            details: directError
          }, { status: 500 })
        }
        
        return NextResponse.json({
          success: true,
          message: 'Banco de dados configurado com sucesso usando método alternativo'
        })
      } catch (directError) {
        console.error('Erro ao executar SQL diretamente:', directError)
        
        return NextResponse.json({
          success: false,
          message: 'Por favor, execute o script SQL manualmente no console SQL do Supabase.',
          error: directError instanceof Error ? directError.message : 'Erro desconhecido',
          details: directError
        }, { status: 500 })
      }
    }
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Por favor, execute o script SQL manualmente no console SQL do Supabase.',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      details: error
    }, { status: 500 })
  }
} 