import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Cria um cliente Supabase para uso no servidor
 * Este cliente é usado em Server Components e Server Actions
 * 
 * @returns Cliente Supabase configurado para o servidor
 */
export async function createClient() {
  console.log('[SERVER] Iniciando criação do cliente Supabase')
  
  try {
    const cookieStore = await cookies()
    console.log('[SERVER] Cookie store obtido com sucesso')
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('[SERVER] Erro: Variáveis de ambiente do Supabase não definidas')
      throw new Error('Variáveis de ambiente do Supabase não definidas')
    }
    
    const client = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            console.log('[SERVER] Obtendo todos os cookies')
            try {
              const allCookies = cookieStore.getAll()
              console.log(`[SERVER] ${allCookies.length} cookies encontrados`)
              return allCookies
            } catch (error) {
              console.error('[SERVER] Erro ao obter cookies:', error)
              return []
            }
          },
          setAll(cookiesToSet) {
            console.log('[SERVER] Configurando cookies:', cookiesToSet.length)
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                console.log(`[SERVER] Definindo cookie: ${name}`)
                cookieStore.set(name, value, options)
              })
            } catch (error) {
              console.error('[SERVER] Erro ao definir cookies:', error)
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
    
    console.log('[SERVER] Cliente Supabase criado com sucesso')
    return client
  } catch (error) {
    console.error('[SERVER] Erro ao criar cliente Supabase:', error)
    throw error
  }
} 