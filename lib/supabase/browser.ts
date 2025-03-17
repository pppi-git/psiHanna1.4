import { createBrowserClient } from '@supabase/ssr'

/**
 * Cria um cliente Supabase para uso no navegador
 * Este cliente é usado em componentes de cliente
 * 
 * @returns Cliente Supabase configurado para o navegador
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
} 