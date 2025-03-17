import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Ler o script SQL do arquivo
    const sqlFilePath = path.join(process.cwd(), 'supabase', 'setup_direct.sql')
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8')
    
    // Executar o script SQL diretamente
    const { error } = await supabase.rpc('exec_sql', { sql: sqlScript })
    
    if (error) {
      console.error('Erro ao executar SQL:', error)
      
      // Alternativa: tentar executar o SQL diretamente
      const { error: directError } = await supabase.from('_exec_sql').select('*').eq('query', sqlScript)
      
      if (directError) {
        return NextResponse.json({ 
          error: directError.message,
          message: 'Não foi possível executar o SQL diretamente. Por favor, execute o script manualmente no console SQL do Supabase.' 
        }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Banco de dados configurado com sucesso ou tentativa realizada. Verifique no painel do Supabase se as tabelas foram criadas.' 
    })
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao configurar banco de dados',
        message: 'Por favor, execute o script SQL manualmente no console SQL do Supabase.'
      },
      { status: 500 }
    )
  }
} 