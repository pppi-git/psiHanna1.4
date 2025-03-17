import { createBrowserClient } from '@supabase/ssr'

/**
 * Cria um cliente Supabase para uso no navegador
 * Este cliente é usado em componentes do lado do cliente
 * 
 * @returns Cliente Supabase configurado para o navegador
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis de ambiente do Supabase não configuradas')
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
} 