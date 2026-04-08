"use client"

import * as React from "react"
import Image from "next/image"

import { useTranslations } from "next-intl"

import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Value(): React.JSX.Element {
  const t = useTranslations("Index.Value")
  const idT = useTranslations("Index.Ids")
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // Item 6: Spotlight Effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useSpring(mouseX, { damping: 50, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 50, stiffness: 200 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // Item 1: Staggered Text Utility
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
      id={idT("value")}
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full bg-background pt-32 pb-64 overflow-hidden border-t border-foreground/5"
    >
      {/* Item 6: Spotlight Background */}
      <motion.div 
        style={{ 
          background: `radial-gradient(800px circle at ${spotlightX}px ${spotlightY}px, var(--brand-primary), transparent 80%)`,
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
      />

      <div className="container mx-auto max-w-[1800px] px-6 lg:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div 
          style={{ opacity }}
          className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12"
        >
          <div className="max-w-4xl space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE_APPLE }}
              className="flex items-center gap-4"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
                {t("eyebrow")}
              </span>
            </motion.div>
            {/* Adjusted leading from [0.8] to [0.95] to fix accent visibility */}
            <h2 className="font-heading text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.95] tracking-[-0.05em] text-foreground uppercase">
              {renderStaggeredText(t("title"))}
            </h2>
          </div>
          <p className="max-w-md text-lg md:text-xl text-muted-foreground font-medium leading-relaxed pb-4 border-l border-foreground/10 pl-8">
            {renderStaggeredText(t("description"), 0.4)}
          </p>
        </motion.div>

        {/* DISCIPLINES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5">
          {(t.raw("disciplines") as any[]).map((discipline, i) => (
            <DisciplineCard key={discipline.id} discipline={discipline} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

function DisciplineCard({ discipline, index }: { discipline: any, index: number }): React.JSX.Element {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 1, ease: EASE_APPLE }}
      // Reverted Editorial Offset (removed lg:translate-y-X)
      className="group relative bg-background p-12 lg:p-16 h-[600px] flex flex-col justify-between overflow-hidden"
    >
      {/* Item 3: Refined Image Reveal (Focus & Scale) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
            animate={{ opacity: 0.25, scale: 1.05, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: EASE_APPLE }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <Image
              src="/utils/placeholder.svg"
              alt={discipline.title}
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em]">
            {discipline.label}
          </span>
          {/* Item 4: Kinetic ID Animation */}
          <div className="overflow-hidden">
            <motion.span 
              animate={{ y: isHovered ? 0 : "100%" }}
              initial={{ y: "100%" }}
              className="block font-heading text-4xl font-black text-brand-primary/40 transition-colors duration-500"
            >
              {discipline.id}
            </motion.span>
          </div>
        </div>
        {/* Adjusted leading to ensure accents are safe */}
        <h3 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-[1.1]">
          {discipline.title}
        </h3>
      </div>

      <div className="relative z-10 space-y-12">
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium transform group-hover:-translate-y-2 transition-all duration-700 ease-[0.16,1,0.3,1]">
          {discipline.description}
        </p>
        {/* Item 5: Dynamic Elastic Line */}
        <div className="relative h-[2px] w-12 bg-foreground/10 overflow-hidden">
          <motion.div 
            animate={{ x: isHovered ? 0 : "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute inset-0 bg-brand-primary"
          />
        </div>
      </div>
    </motion.div>
  )
}
