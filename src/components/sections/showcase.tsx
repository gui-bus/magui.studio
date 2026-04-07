"use client"

import * as React from "react"
import Image from "next/image"

import { useTranslations } from "next-intl"

import { ArrowRight } from "@phosphor-icons/react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Showcase(): React.JSX.Element {
  const t = useTranslations("Index.Showcase")
  const projects = t.raw("projects") as { title: string; category: string; year: string }[]

  return (
    <section id="portfolio" className="relative w-full py-32 lg:py-64 bg-background">
      <div className="container mx-auto max-w-[1800px] px-6 lg:px-12 relative z-10">
        
        {/* SECTION HEADER - Clean & Balanced */}
        <div className="mb-32 lg:mb-48 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-4xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE_APPLE }}
              className="flex items-center gap-4"
            >
              <div className="h-1 w-8 bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                {t("eyebrow")}
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE_APPLE }}
                className="font-heading text-6xl md:text-8xl lg:text-[100px] font-black leading-tight tracking-tighter text-foreground uppercase"
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
            className="max-w-md text-lg text-muted-foreground font-medium leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* PROJECTS LIST - Minimalist Swiss Layout */}
        <div className="border-t border-foreground/10">
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} index={index} viewText={t("view_project")} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProjectItem({ project, index, viewText }: { project: any, index: number, viewText: string }): React.JSX.Element {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - 128) // Center of 256px wide image
    mouseY.set(e.clientY - rect.top - 96) // Center of 192px tall image
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.1, ease: EASE_APPLE }}
      onMouseMove={handleMouseMove}
      className="group relative border-b border-foreground/10 py-12 lg:py-20 flex flex-col lg:flex-row lg:items-center gap-12 cursor-pointer overflow-hidden"
    >
      {/* Sliding Background Reveal */}
      <div className="absolute inset-0 bg-foreground/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.16,1,0.3,1]" />

      {/* Index & Category */}
      <div className="relative z-10 lg:w-1/4 space-y-2">
        <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">
          0{index + 1} — {project.year}
        </span>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {project.category}
        </p>
      </div>

      {/* Project Title */}
      <div className="relative z-10 lg:w-2/4">
        <h3 className="font-heading text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-foreground group-hover:text-brand-primary transition-colors duration-500">
          {project.title}
        </h3>
      </div>

      {/* Interaction & View */}
      <div className="relative z-10 lg:w-1/4 flex items-center justify-between lg:justify-end gap-8">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0 transition-all duration-700 ease-[0.16,1,0.3,1]">
          {viewText}
        </span>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="h-16 w-16 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-500"
        >
          <ArrowRight weight="bold" size={24} className="text-foreground group-hover:text-white transition-colors duration-500" />
        </motion.div>
      </div>

      {/* Floating Image Preview (Hover) - Apple Mouse Follow */}
      <motion.div 
        style={{ x, y }}
        className="hidden lg:block absolute left-0 top-0 w-64 h-48 pointer-events-none opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 z-20"
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src="/utils/placeholder.svg"
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" />
        </div>
      </motion.div>
    </motion.div>
  )
}
