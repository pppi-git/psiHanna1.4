"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <footer className="w-full border-t bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="container flex flex-col gap-6 py-8 md:py-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4"
        >
          <motion.div variants={item} className="space-y-3">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Hanara Psicologia
            </h3>
            <p className="text-sm text-muted-foreground">
              Serviços de psicologia com foco em Terapia Cognitivo-Comportamental, Mindfulness e programas para controlo
              de stress e ansiedade.
            </p>
          </motion.div>
          <motion.div variants={item} className="space-y-3">
            <h3 className="text-lg font-medium">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/programa"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Programa de 8 Semanas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={item} className="space-y-3">
            <h3 className="text-lg font-medium">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Rua Exemplo, 123
                <br />
                1000-000 Lisboa
                <br />
                Portugal
              </li>
              <li className="text-muted-foreground">+351 XXX XXX XXX</li>
              <li className="text-muted-foreground">contacto@hanarapsicologa.pt</li>
            </ul>
          </motion.div>
          <motion.div variants={item} className="space-y-3">
            <h3 className="text-lg font-medium">Redes Sociais</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:contacto@hanarapsicologa.pt"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        <div className="flex flex-col gap-2 sm:flex-row items-center justify-between border-t pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Hanara Psicologia. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

