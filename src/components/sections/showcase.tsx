"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react"
import { m, AnimatePresence, useScroll, useTransform } from "framer-motion"

import { Project } from "@/src/types/sections"
import { Section } from "@/src/components/ui/section"
import { StaggeredText } from "@/src/components/ui/staggeredText"

const AUTO_PLAY_DURATION = 6000 

export function Showcase(): React.JSX.Element {
  const t = useTranslations("Index.Showcase")
  const idT = useTranslations("Index.Ids")
  const projects = t.raw("projects") as Project[]
  
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1) 
  const [isPaused, setIsHovered] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"])

  const nextProject = React.useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }, [projects.length])

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  React.useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextProject, AUTO_PLAY_DURATION)
    return () => clearInterval(interval)
  }, [nextProject, isPaused])

  const activeProject = projects[currentIndex]

  return (
    <Section 
      id={idT("portfolio")} 
      ref={containerRef}
      className="py-32 lg:pt-64 relative overflow-hidden" 
      withContainer={true}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {/* PARALLAX BACKGROUND TEXT */}
        <m.div 
          style={{ x: backgroundX }}
          className="absolute top-0 right-0 -translate-y-1/4 pointer-events-none select-none z-0"
        >
          <span className="text-9xl md:text-[200px] lg:text-[350px] font-black text-foreground/2 dark:text-white/1 uppercase leading-none whitespace-nowrap">
            Selected Work
          </span>
        </m.div>

        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 lg:mb-40 relative z-10">
          <div className="space-y-8">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-12 bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
                {t("eyebrow")}
              </span>
            </m.div>
            <h2 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.04em] leading-[0.8]">
              {t("title")}
            </h2>
          </div>

          {/* CAROUSEL CONTROLS */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={prevProject}
                className="group h-16 w-16 rounded-full border border-foreground/10 flex items-center justify-center transition-all duration-500 hover:bg-foreground hover:text-background active:scale-90"
              >
                <ArrowLeftIcon weight="bold" size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <div className="flex flex-col items-center gap-2 font-mono text-sm font-bold min-w-16">
                 <div className="overflow-hidden h-5 flex flex-col items-center">
                    <AnimatePresence mode="wait">
                      <m.span 
                        key={currentIndex}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        className="text-brand-primary block"
                      >
                        0{currentIndex + 1}
                      </m.span>
                    </AnimatePresence>
                 </div>
                 <div className="relative h-12 w-px bg-foreground/10 overflow-hidden">
                    <m.div 
                      key={`progress-${currentIndex}-${isPaused}`}
                      initial={{ height: 0 }}
                      animate={isPaused ? { height: "100%" } : { height: "100%" }}
                      transition={isPaused ? { duration: 0.5 } : { duration: AUTO_PLAY_DURATION / 1000, ease: "linear" }}
                      className="w-full bg-brand-primary"
                    />
                 </div>
                 <span className="opacity-30">0{projects.length}</span>
              </div>

              <button 
                onClick={nextProject}
                className="group h-16 w-16 rounded-full border border-foreground/10 flex items-center justify-center transition-all duration-500 hover:bg-foreground hover:text-background active:scale-90"
              >
                <ArrowRightIcon weight="bold" size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* CAROUSEL CONTENT */}
        <div className="relative min-h-150 lg:min-h-212.5 z-10">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <m.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 100 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
            >
              {/* IMAGE SIDE */}
              <div className="lg:col-span-7 relative aspect-video lg:aspect-16/10 group/img">
      

                <m.div 
                  initial={{ clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={{ clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full overflow-hidden shadow-2xl"
                >
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain transition-transform duration-[4s] ease-out scale-105 group-hover/img:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </m.div>

                {/* Decorative technical markers */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-brand-primary/40 z-20" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-brand-primary/40 z-20" />
              </div>

              {/* CONTENT SIDE */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-10">
                  <div className="flex items-center gap-6 overflow-hidden">
                    <m.span 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      className="font-mono text-sm lg:text-xl text-brand-primary font-bold uppercase tracking-widest"
                    >
                      Case Study
                    </m.span>
                    <m.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="h-px w-24 bg-brand-primary/30 origin-left" 
                    />
                  </div>
                  
                  <div className="overflow-hidden">
                    <m.h2 
                      key={activeProject.title}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      className="font-heading text-6xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tighter leading-[0.8] text-foreground"
                    >
                      <StaggeredText text={activeProject.title} />
                    </m.h2>
                  </div>
                </div>

                <div className="pt-8">
                  <Link 
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-10 group/btn bg-foreground text-background dark:bg-white dark:text-black py-8 px-14 rounded-full transition-all duration-500 hover:scale-105 shadow-2xl shadow-black/10 active:scale-95"
                  >
                    <span className="text-sm font-black uppercase tracking-[0.4em]">
                      {t("view_project")}
                    </span>
                    <div className="h-14 w-14 rounded-full border border-current flex items-center justify-center group-hover/btn:bg-brand-primary group-hover/btn:border-brand-primary group-hover/btn:text-white transition-all duration-500">
                      <ArrowUpRightIcon weight="bold" size={28} className="group-hover/btn:rotate-45 transition-transform duration-500" />
                    </div>
                  </Link>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
    </Section>
  )
}
