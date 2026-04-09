"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { ArrowUpRight } from "@phosphor-icons/react"
import { m } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"
import { Project } from "@/src/types/sections"
import { Section } from "@/src/components/ui/section"
import { SectionHeader } from "@/src/components/ui/sectionHeader"
import { VARIANTS_FADE_IN_UP } from "@/src/config/animations"

export function Showcase(): React.JSX.Element {
  const t = useTranslations("Index.Showcase")
  const idT = useTranslations("Index.Ids")
  const projects = t.raw("projects") as Project[]

  return (
    <Section id={idT("portfolio")} className="py-32 lg:py-64 relative overflow-hidden">
        {/* DECORATIVE BACKGROUND TEXT */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 pointer-events-none select-none z-0">
          <span className="text-9xl md:text-[200px] lg:text-[320px] font-black text-foreground/[0.02] uppercase leading-none">
            Selected
          </span>
        </div>

        {/* SECTION HEADER */}
        <SectionHeader 
          eyebrow={t("eyebrow")}
          title={t("title")}
          className="mb-24 lg:mb-40 relative z-10"
        />

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 gap-24 lg:gap-48 relative z-10">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
              viewProjectLabel={t("view_project")}
            />
          ))}
        </div>
    </Section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  viewProjectLabel: string
}

function ProjectCard({ project, index, viewProjectLabel }: ProjectCardProps) {
  return (
    <m.div
      variants={VARIANTS_FADE_IN_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
    >
      {/* IMAGE SIDE WITH CUSTOM CLIP-PATH REVEAL */}
      <div className={cn(
        "lg:col-span-7 relative aspect-video group/img",
        index % 2 !== 0 ? "lg:order-last" : ""
      )}>
        {/* Technical Corner Markers */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-brand-primary/30 z-20 transition-transform duration-700 group-hover/img:-translate-x-2 group-hover/img:-translate-y-2" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-brand-primary/30 z-20 transition-transform duration-700 group-hover/img:translate-x-2 group-hover/img:translate-y-2" />

        <m.div 
          initial={{ clipPath: "inset(20% 20% 20% 20% round 3rem)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 3rem)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative w-full h-full overflow-hidden bg-muted/10 border border-foreground/5 shadow-2xl"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-[2s] ease-out group-hover/img:scale-110"
          />
          {/* Refined Overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
          
          {/* Scanline / Digital Texture Detail */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
        </m.div>
      </div>

      {/* CONTENT SIDE */}
      <div className={cn(
        "lg:col-span-5 space-y-10",
        index % 2 !== 0 ? "lg:pr-12" : "lg:pl-12"
      )}>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm lg:text-xl text-brand-primary font-bold">
              0{index + 1}
            </span>
            <div className="h-px w-12 bg-brand-primary/20" />
          </div>
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
            {project.title}
          </h2>
        </div>

        <Link 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-6 group/btn"
        >
          <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-brand-primary text-white flex items-center justify-center transition-all duration-500 group-hover/btn:scale-110 group-hover/btn:rotate-45 shadow-xl shadow-brand-primary/20">
            <ArrowUpRight weight="bold" size={28} />
          </div>
          <span className="text-sm font-black uppercase tracking-[0.3em] border-b-2 border-transparent group-hover/btn:border-brand-primary transition-all duration-500 text-foreground">
            {viewProjectLabel}
          </span>
        </Link>
      </div>
    </m.div>
  )
}
