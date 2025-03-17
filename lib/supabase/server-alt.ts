import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Cria um cliente Supabase alternativo para uso no servidor
 * Este cliente não depende de cookies, útil para APIs e scripts
 * 
 * @returns Cliente Supabase configurado para o servidor
 */
export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis de ambiente do Supabase não configuradas')
  }
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  })
} 