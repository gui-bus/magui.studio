"use client"

import * as React from "react"
import Image from "next/image"

import { useTranslations } from "next-intl"

import { ArrowRight } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Showcase(): React.JSX.Element {
  const t = useTranslations("Index.Showcase")
  const idT = useTranslations("Index.Ids")
  const projects = t.raw("projects") as { title: string }[]
  const [activeIndex, setActiveIndex] = React.useState(0)

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
      id={idT("portfolio")}
      className="relative w-full py-32 lg:py-64 bg-background overflow-hidden px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* SECTION HEADER */}
        <div className="mb-32 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_APPLE }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-brand-primary" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
              {t("eyebrow")}
            </span>
          </motion.div>
          <h2 className="font-heading text-5xl md:text-7xl lg:text-[100px] font-black leading-[0.9] tracking-tight text-foreground uppercase">
            {renderStaggeredText(t("title"))}
          </h2>
        </div>

        {/* MAIN INTERACTION AREA - Stable Height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center min-h-[600px]">
          
          {/* LEFT: THE LIST */}
          <div className="lg:col-span-5 flex flex-col border-t border-foreground/5">
            {projects.map((project, index) => (
              <button
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                className="group relative w-full py-10 border-b border-foreground/5 text-left transition-all duration-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <span className={cn(
                      "font-heading text-xl font-black transition-colors duration-500",
                      activeIndex === index ? "text-brand-primary" : "text-foreground/20"
                    )}>
                      0{index + 1}
                    </span>
                    <h3 className={cn(
                      "font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-500",
                      activeIndex === index ? "text-foreground translate-x-4" : "text-foreground/40"
                    )}>
                      {project.title}
                    </h3>
                  </div>
                  <div className={cn(
                    "h-12 w-12 rounded-full border flex items-center justify-center transition-all duration-500",
                    activeIndex === index ? "bg-brand-primary border-brand-primary text-white scale-110" : "border-foreground/10 text-transparent"
                  )}>
                    <ArrowRight weight="bold" size={20} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT: THE LENS (The Preview Frame) */}
          <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-[16/10] w-full">
            <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden border border-foreground/5 bg-muted/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                  transition={{ duration: 0.8, ease: EASE_APPLE }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/utils/placeholder.svg"
                    alt={projects[activeIndex].title}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle Brand Ambient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 via-transparent to-transparent mix-blend-overlay" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorative Frame Detail */}
            <div className="absolute -inset-4 border border-foreground/[0.03] rounded-[3.5rem] lg:rounded-[4.5rem] pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  )
}
