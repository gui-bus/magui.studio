"use client"

import * as React from "react"
import Image from "next/image"

import { useTranslations } from "next-intl"

import { m, useTransform, useScroll, AnimatePresence } from "framer-motion"

import { Section } from "@/src/components/ui/section"
import { SectionHeader } from "@/src/components/ui/sectionHeader"
import { useSpotlight } from "@/src/lib/hooks/useSpotlight"
import { Discipline } from "@/src/types/sections"
import { TRANSITION_MEDIUM, VARIANTS_FADE_IN_UP } from "@/src/config/animations"

export function Value(): React.JSX.Element {
  const t = useTranslations("Index.Value")
  const idT = useTranslations("Index.Ids")
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { spotlightX, spotlightY, handleMouseMove } = useSpotlight(containerRef)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const disciplines = t.raw("disciplines") as Discipline[]
  const disciplineImages = [
    "/images/strategy.webp",
    "/images/code.webp",
    "/images/ui.webp",
  ]

  return (
    <Section 
      id={idT("value")}
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="pt-32 border-t border-foreground/5"
      withContainer={true}
    >
      <m.div 
        style={{ 
          background: `radial-gradient(800px circle at ${spotlightX}px ${spotlightY}px, var(--brand-primary), transparent 80%)`,
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] hidden lg:block"
      />

      {/* SECTION HEADER */}
      <SectionHeader 
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        eyebrowType="dot"
        style={{ opacity }}
        className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12"
      />

      {/* DISCIPLINES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5">
        {disciplines.map((discipline, i) => (
          <DisciplineCard 
            key={discipline.id} 
            discipline={discipline} 
            index={i} 
            image={disciplineImages[i] || disciplineImages[0]}
          />
        ))}
      </div>

    </Section>
  )
}

function DisciplineCard({ discipline, index, image }: { discipline: Discipline, index: number, image: string }): React.JSX.Element {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <m.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={VARIANTS_FADE_IN_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.2}
      className="group relative bg-background p-12 lg:p-16 h-[600px] flex flex-col justify-between overflow-hidden"
    >
      <AnimatePresence>
        {isHovered && (
          <m.div 
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={TRANSITION_MEDIUM}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <Image
              src={image}
              alt={`${discipline.title} Context`}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-500" />
          </m.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em]">
            {discipline.label}
          </span>
          <div className="overflow-hidden">
            <m.span 
              animate={{ y: isHovered ? 0 : "100%" }}
              initial={{ y: "100%" }}
              transition={TRANSITION_MEDIUM}
              className="block font-heading text-4xl font-black text-white transition-colors duration-500"
            >
              {discipline.id}
            </m.span>
          </div>
        </div>
        <h3 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-[1.1] group-hover:text-white transition-colors duration-500">
          {discipline.title}
        </h3>
      </div>

      <div className="relative z-10 space-y-12">
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium transform group-hover:-translate-y-2 group-hover:text-white/80 transition-all duration-700">
          {discipline.description}
        </p>
        <div className="relative h-[2px] w-12 bg-foreground/10 overflow-hidden">
          <m.div 
            animate={{ x: isHovered ? 0 : "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute inset-0 bg-brand-primary"
          />
        </div>
      </div>
    </m.div>
  )
}
