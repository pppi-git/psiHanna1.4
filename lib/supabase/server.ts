import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Cria um cliente Supabase para uso no servidor
 * Este cliente é usado em Server Components e Server Actions
 * 
 * @returns Cliente Supabase configurado para o servidor
 */
export async function createClient() {
  const cookieStore = await cookies()
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis de ambiente do Supabase não configuradas')
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {
            // O método setAll foi chamado de um Server Component.
            // Isso pode ser ignorado se você tiver middleware atualizando
            // as sessões dos usuários.
            console.debug('Erro ao definir cookies em Server Component:', error)
          }
        },
      },
    }
  )
} 