"use client"

import * as React from "react"
import Image from "next/image"

import { useTranslations } from "next-intl"

import { motion, useScroll, useTransform } from "framer-motion"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Value(): React.JSX.Element {
  const t = useTranslations("Index.Value")
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative w-full bg-background pt-32 pb-64 overflow-hidden border-t border-foreground/5">
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
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE_APPLE }}
                className="font-heading text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.8] tracking-[-0.05em] text-foreground uppercase"
              >
                {t("title")}
              </motion.h2>
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1, ease: EASE_APPLE }}
            className="max-w-md text-lg md:text-xl text-muted-foreground font-medium leading-relaxed pb-4 border-l border-foreground/10 pl-8"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* DISCIPLINES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5">
          {(t.raw("disciplines") as any[]).map((discipline, i) => (
            <DisciplineCard key={discipline.id} discipline={discipline} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

      </div>
    </section>
  )
}

function DisciplineCard({ discipline, index, scrollYProgress }: { discipline: any, index: number, scrollYProgress: any }): React.JSX.Element {
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 1, ease: EASE_APPLE }}
      className="group relative bg-background p-12 lg:p-16 h-[600px] flex flex-col justify-between overflow-hidden"
    >
      {/* Background Reveal Image with Parallax */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000"
      >
        <Image
          src="/utils/placeholder.svg"
          alt={discipline.title}
          fill
          className="object-cover scale-125 group-hover:scale-110 transition-transform duration-1000"
        />
      </motion.div>

      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-brand-primary tracking-tighter">
            {discipline.label}
          </span>
          <span className="font-heading text-4xl font-black text-foreground/5 group-hover:text-brand-primary/20 transition-colors duration-500">
            {discipline.id}
          </span>
        </div>
        <h3 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-none">
          {discipline.title}
        </h3>
      </div>

      <div className="relative z-10 space-y-12">
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium transform group-hover:-translate-y-2 transition-transform duration-700 ease-[0.16,1,0.3,1]">
          {discipline.description}
        </p>
        <div className="h-[2px] w-12 bg-brand-primary group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]" />
      </div>
    </motion.div>
  )
}
