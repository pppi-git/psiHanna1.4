import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'

type ApiResponse = {
  success: boolean
  message: string
  error?: string
}

/**
 * API para configurar o banco de dados Supabase
 * Executa scripts SQL para criar tabelas e políticas
 */
export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    // Criar cliente Supabase
    const supabase = await createClient()
    
    // Verificar se o cliente foi criado com sucesso
    if (!supabase) {
      throw new Error('Falha ao criar cliente Supabase')
    }
    
    // Informar que o script SQL deve ser executado diretamente no console do Supabase
    return NextResponse.json({
      success: true,
      message: 'Para configurar o banco de dados, por favor use o SQL Console do Supabase com o script em supabase/setup_direct.sql'
    })
  } catch (error: any) {
    console.error('Erro ao configurar banco de dados:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao configurar banco de dados',
        error: error.message || 'Erro desconhecido' 
      },
      { status: 500 }
    )
  }
} 