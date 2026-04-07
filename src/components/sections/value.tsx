"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { motion, useScroll, useTransform } from "framer-motion"

export function Value(): React.JSX.Element {
  const t = useTranslations("Index.Value")
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])

  return (
    <section ref={containerRef} className="relative w-full py-[20vh] px-6 md:px-12 lg:px-24 bg-background overflow-hidden">
      <motion.div 
        style={{ opacity, scale }}
        className="mx-auto max-w-[1400px] text-center space-y-16"
      >
        <span className="text-[11px] font-black uppercase tracking-[0.8em] text-brand-primary">Our_Ethos</span>
        
        <h2 className="font-heading text-5xl md:text-8xl lg:text-[10rem] font-extrabold text-foreground uppercase leading-[0.85] tracking-[-0.06em]">
          {t("title")}
        </h2>

        <p className="mx-auto max-w-2xl text-xl md:text-3xl text-muted-foreground/80 font-sans font-light leading-relaxed">
          {t("description")}
        </p>

        <div className="pt-24 border-t border-foreground/5 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
           <div className="space-y-2">
             <p className="text-4xl font-heading font-extrabold text-foreground tracking-tighter uppercase">Rigor</p>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Protocol_01</p>
           </div>
           <div className="space-y-2">
             <p className="text-4xl font-heading font-extrabold text-foreground tracking-tighter uppercase">Authority</p>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Protocol_02</p>
           </div>
           <div className="space-y-2">
             <p className="text-4xl font-heading font-extrabold text-foreground tracking-tighter uppercase">Elite</p>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Protocol_03</p>
           </div>
        </div>
      </motion.div>
    </section>
  )
}
