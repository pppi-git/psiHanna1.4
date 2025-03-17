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

  // IMPORTANTE: Não execute código entre createServerClient e
  // supabase.auth.getUser(). Um simples erro pode tornar muito difícil depurar
  // problemas com usuários sendo desconectados aleatoriamente.

  // Obter informações do usuário atual
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  // Registrar erros de autenticação, mas não interromper o fluxo
  if (authError) {
    console.error('Erro de autenticação no middleware:', authError)
  }

  // Neste projeto, não vamos redirecionar para login, pois é um site público
  // com algumas áreas protegidas. Se você quiser adicionar autenticação mais tarde,
  // você pode descomentar o código abaixo.

  /*
  // Verificar se o usuário está autenticado para rotas protegidas
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    !isPublicRoute(request.nextUrl.pathname)
  ) {
    // Redirecionar para a página de login
    const redirectUrl = new URL('/login', request.url)
    
    // Adicionar URL de retorno como parâmetro de consulta
    redirectUrl.searchParams.set('returnUrl', request.nextUrl.pathname)
    
    return NextResponse.redirect(redirectUrl)
  }
  */

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