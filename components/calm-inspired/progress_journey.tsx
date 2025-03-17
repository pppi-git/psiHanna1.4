"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface JourneyStep {
  id: number
  title: string
  description: string
}

interface ProgressJourneyProps {
  steps: JourneyStep[]
  currentStep?: number
  onChange?: (step: number) => void
}

export function ProgressJourney({ steps, currentStep = 1, onChange }: ProgressJourneyProps) {
  const [activeStep, setActiveStep] = useState(currentStep)

  const handleStepChange = (step: number) => {
    setActiveStep(step)
    if (onChange) onChange(step)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0"></div>

        {steps.map((step) => (
          <motion.button
            key={step.id}
            onClick={() => handleStepChange(step.id)}
            className={`relative z-10 flex flex-col items-center`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                step.id < activeStep
                  ? "bg-primary text-white"
                  : step.id === activeStep
                    ? "bg-white border-2 border-primary text-primary"
                    : "bg-white border border-muted text-muted-foreground"
              }`}
            >
              {step.id < activeStep ? <CheckCircle className="h-5 w-5" /> : <span>{step.id}</span>}
            </div>
            <span
              className={`text-xs font-medium ${step.id === activeStep ? "text-primary" : "text-muted-foreground"}`}
            >
              {step.title}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-muted shadow-sm"
      >
        <h3 className="text-xl font-medium mb-2">{steps.find((s) => s.id === activeStep)?.title}</h3>
        <p className="text-muted-foreground">{steps.find((s) => s.id === activeStep)?.description}</p>
      </motion.div>
    </div>
  )
}

