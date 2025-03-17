"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  }

  const navigate = (newDirection: number) => {
    setDirection(newDirection)
    if (newDirection > 0) {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    } else {
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-primary/5 to-accent/5 p-px">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 md:p-12 relative">
        <div className="absolute top-6 left-6 text-primary/20">
          <Quote className="h-12 w-12 rotate-180" />
        </div>

        <div className="min-h-[200px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center"
            >
              <p className="text-lg md:text-xl italic mb-6 max-w-2xl mx-auto">"{testimonials[current].quote}"</p>
              <div>
                <p className="font-medium">{testimonials[current].author}</p>
                <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1)
                setCurrent(index)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? "bg-primary w-4" : "bg-primary/30"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md flex items-center justify-center text-primary hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => navigate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md flex items-center justify-center text-primary hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

