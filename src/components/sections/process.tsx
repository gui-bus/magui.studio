"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { motion } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Process(): React.JSX.Element {
  const t = useTranslations("Index.Process")
  const idT = useTranslations("Index.Ids")
  const steps = t.raw("steps") as { title: string; description: string }[]

  const renderStaggeredText = (text: string, delayBase: number = 0) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
        <motion.span
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.2, 
            ease: EASE_APPLE, 
            delay: delayBase + (i * 0.08) 
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      </span>
    ))
  }

  return (
    <section 
      id={idT("process")}
      className="relative w-full py-32 lg:py-64 bg-background overflow-hidden px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* SECTION HEADER */}
        <div className="mb-32 lg:mb-48 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_APPLE }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-8 bg-brand-primary/30" />
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-brand-primary">
              Protocol V4.0
            </span>
            <div className="h-px w-8 bg-brand-primary/30" />
          </motion.div>
          <h2 className="font-heading text-5xl md:text-7xl lg:text-[100px] font-black leading-none tracking-tight text-foreground uppercase">
            {renderStaggeredText(t("title"))}
          </h2>
        </div>

        {/* TIMELINE FLOW - Unique Architectural Design */}
        <div className="relative">
          
          {/* Main Connecting Line */}
          <div className="absolute top-0 left-[15px] md:left-0 md:top-12 w-px h-full md:w-full md:h-px bg-foreground/5 overflow-hidden">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: EASE_APPLE, delay: 0.5 }}
              className="w-full h-full bg-gradient-to-r from-brand-primary/10 via-brand-primary to-brand-primary/10 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <StepNode key={index} step={step} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

function StepNode({ step, index }: { step: any, index: number }): React.JSX.Element {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pt-0 md:pt-24 group"
    >
      {/* Node Marker */}
      <div className="absolute top-0 left-0 md:left-0 md:top-12 -translate-y-1/2 md:-translate-x-0">
        <div className="relative flex items-center justify-center h-8 w-8">
          <motion.div 
            animate={{ 
              scale: isHovered ? 1.5 : 1,
              backgroundColor: isHovered ? "var(--brand-primary)" : "transparent"
            }}
            className="absolute inset-0 rounded-full border border-brand-primary/30"
          />
          <motion.div 
            animate={{ 
              scale: isHovered ? 0.5 : 1,
              backgroundColor: isHovered ? "white" : "var(--brand-primary)"
            }}
            className="h-2 w-2 rounded-full" 
          />
          
          {/* Pulse Effect */}
          {isHovered && (
            <motion.div 
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute h-full w-full rounded-full bg-brand-primary"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 + (index * 0.1), ease: EASE_APPLE }}
        className="space-y-6 pl-12 md:pl-0"
      >
        <div className="space-y-2">
          <span className={cn(
            "font-heading text-4xl font-black transition-colors duration-500",
            isHovered ? "text-brand-primary" : "text-foreground/10"
          )}>
            0{index + 1}
          </span>
          <h3 className="font-heading text-2xl lg:text-3xl font-bold uppercase tracking-tight text-foreground leading-[1.1]">
            {step.title}
          </h3>
        </div>
        
        <p className="text-lg text-muted-foreground/80 leading-relaxed font-medium max-w-xs transition-colors duration-500 group-hover:text-foreground">
          {step.description}
        </p>

        {/* Modular Detail */}
        <div className="pt-4 overflow-hidden">
          <motion.div 
            animate={{ x: isHovered ? 0 : "-100%" }}
            transition={{ duration: 0.5, ease: EASE_APPLE }}
            className="h-px w-12 bg-brand-primary"
          />
        </div>
      </motion.div>
    </div>
  )
}
