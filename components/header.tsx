"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { motion } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activePath, setActivePath] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handlePathChange = () => {
      setActivePath(window.location.pathname)
    }

    window.addEventListener("scroll", handleScroll)
    handlePathChange() // Set initial path

    // Listen for route changes in client-side navigation
    window.addEventListener("popstate", handlePathChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("popstate", handlePathChange)
    }
  }, [])

  const navItems = [
    { path: "/", label: "Início" },
    { path: "/sobre", label: "Sobre" },
    { path: "/programa", label: "Programa" },
    { path: "/ferramentas", label: "Ferramentas" },
    { path: "/assistente-ia", label: "Assistente IA" },
    { path: "/blog", label: "Blog" },
    { path: "/contacto", label: "Contacto" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          >
            Hanara
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Psicologia
          </motion.span>
        </Link>

        {/* Navegação */}
        <nav className="hidden md:flex gap-4 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                activePath === item.path ? "text-primary" : ""
              }`}
              onClick={() => setActivePath(item.path)}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                  activePath === item.path ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Área de Login e Agendamento */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <Link href="/demo-paciente/dashboard">
            <Button
              variant="secondary"
              size="sm"
              className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full"
            >
              <User className="h-4 w-4 mr-2" />
              Área do Paciente
            </Button>
          </Link>

          <Link href="/contacto">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 rounded-full">
              Agendar Consulta
            </Button>
          </Link>
        </div>

        {/* Botão do menu mobile */}
        <button className="flex items-center space-x-2 md:hidden ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="container md:hidden bg-white/95 backdrop-blur-sm"
        >
          <nav className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activePath === item.path ? "text-primary" : ""
                }`}
                onClick={() => {
                  setActivePath(item.path)
                  setIsMenuOpen(false)
                }}
              >
                {item.label}
              </Link>
            ))}

            <Link href="/demo-paciente/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button variant="secondary" className="w-full bg-primary/10 text-primary hover:bg-primary/20 mb-2">
                <User className="h-4 w-4 mr-2" />
                Área do Paciente
              </Button>
            </Link>

            <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 rounded-full">
                Agendar Consulta
              </Button>
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

