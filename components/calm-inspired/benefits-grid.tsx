"use client"

import { motion } from "framer-motion"

interface Benefit {
  id: number
  title: string
  description: string
}

interface BenefitsGridProps {
  benefits: Benefit[]
}

export function BenefitsGrid({ benefits }: BenefitsGridProps) {
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
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      {benefits.map((benefit) => (
        <motion.div
          key={benefit.id}
          variants={item}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-muted shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-full h-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full mb-4"></div>
          <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
          <p className="text-sm text-muted-foreground">{benefit.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

