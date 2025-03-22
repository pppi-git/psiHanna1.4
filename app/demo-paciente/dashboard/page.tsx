import { redirect } from "next/navigation"

export default function DashboardPage() {
  redirect("/demo-paciente")
  
  // Esta parte nunca será executada devido ao redirecionamento
  return null
} 