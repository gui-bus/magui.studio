"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function About(): React.JSX.Element {
  const t = useTranslations("Index.About")
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Item 5: Background Spotlight
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useSpring(mouseX, { damping: 50, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 50, stiffness: 200 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // Item 1: Staggered Text Utility
  const renderStaggeredText = (text: string, delayBase: number = 0) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.3em] last:mr-0">
        <motion.span
          initial={{ y: "100%", filter: "blur(10px)", opacity: 0 }}
          whileInView={{ y: 0, filter: "blur(0px)", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1, 
            ease: EASE_APPLE, 
            delay: delayBase + (i * 0.05) 
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
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-48 lg:py-64 px-6 md:px-12 lg:px-24 bg-background overflow-hidden"
    >
      {/* Item 5 & 6: Breathing Spotlight Background */}
      <motion.div 
        style={{ 
          background: `radial-gradient(800px circle at ${spotlightX}px ${spotlightY}px, var(--brand-primary), transparent 80%)`,
        }}
        animate={{ 
          scale: [0.95, 1.05, 0.95],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="pointer-events-none absolute inset-0 z-0"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-16">
          <div className="space-y-12">
            {/* Item 1 & 3: Staggered Title & Leading Adjustment */}
            <h2 className="font-heading text-5xl md:text-8xl lg:text-[140px] font-black tracking-tight text-foreground leading-[1.0] uppercase select-none">
              {renderStaggeredText(t("title"))}
            </h2>
            
            {/* Item 4: Pulse Micro-interaction on Highlight Bar */}
            <div className="relative flex justify-center">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.5, ease: EASE_APPLE }}
                className="h-2 w-48 bg-brand-primary rounded-full relative overflow-hidden"
              >
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.div>
            </div>

            {/* Item 2: Progressive Focus & Staggered Description */}
            <p className="max-w-5xl mx-auto text-2xl md:text-4xl lg:text-5xl text-muted-foreground/80 font-medium leading-[1.2] tracking-tight">
              {renderStaggeredText(t("description"), 0.5)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Editorial Decorative Detail */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        className="absolute bottom-12 left-12 text-[10px] font-black uppercase tracking-[0.8em] text-foreground rotate-90 origin-left"
      >
        Manifesto v1.0
      </motion.div>
    </section>
  )
}
