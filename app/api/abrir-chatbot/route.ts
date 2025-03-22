import { NextResponse } from "next/server"

export async function GET() {
  // Redirecionar para a página inicial com um parâmetro para abrir o chatbot
  const response = NextResponse.redirect(new URL("/?openChat=true", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))
  
  // Definir um cookie para indicar que o chatbot deve ser aberto
  response.cookies.set("abrirChatbot", "true", {
    maxAge: 60, // 1 minuto
    path: "/"
  })
  
  return response
}

export async function POST() {
  // Também suporta POST para formulários
  return await GET()
} 