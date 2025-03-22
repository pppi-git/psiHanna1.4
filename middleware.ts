import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware para gerenciar autenticação e sessão do Supabase
 * Atualiza tokens de autenticação e gerencia cookies
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Criar resposta inicial
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Inicializar cliente Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Primeiro, definir cookies na solicitação
          cookiesToSet.forEach(({ name, value }) => 
            request.cookies.set(name, value)
          )
          
          // Criar nova resposta com a solicitação atualizada
          supabaseResponse = NextResponse.next({
            request,
          })
          
          // Definir cookies na resposta
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: Você *deve* retornar o objeto supabaseResponse como está.
  return supabaseResponse
}

/**
 * Configuração do matcher para o middleware
 * Define quais rotas serão processadas pelo middleware
 */
export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de solicitação, exceto os que começam com:
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico (arquivo de favicon)
     * - arquivos de imagem (svg, png, jpg, jpeg, gif, webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 