"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"

import { ArrowUpRight, Globe } from "@phosphor-icons/react"
import { m } from "framer-motion"

import { Button } from "@/src/components/ui/button"
import { StaggeredText } from "@/src/components/ui/staggeredText"
import { Section } from "@/src/components/ui/section"
import { useSpotlight } from "@/src/lib/hooks/useSpotlight"
import { TRANSITION_SLOW, VARIANTS_FADE_IN_UP } from "@/src/config/animations"

export function Hero(): React.JSX.Element {
  const t = useTranslations("Index.Hero")
  const idT = useTranslations("Index.Ids")
  const [mounted, setMounted] = React.useState(false)
  const containerRef = React.useRef<HTMLElement>(null)

  const { spotlightX, spotlightY, handleMouseMove } = useSpotlight(containerRef)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <Section className="min-h-svh" withContainer={false}> {null} </Section>

  return (
    <Section 
      id={idT("hero")}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="flex items-center min-h-svh"
      withContainer={false}
    >
      {/* Background Spotlight */}
      <m.div 
        style={{ 
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, var(--brand-primary), transparent 80%)`,
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.08] hidden lg:block"
      />

      {/* TOP HEADER INFO */}
      <div className="absolute top-0 left-0 w-full z-40 px-6 lg:px-12 py-8 flex items-center justify-between backdrop-blur-sm">
        <m.div
          variants={VARIANTS_FADE_IN_UP}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground"
        >
          <div className="relative flex h-5 w-5 items-center justify-center">
            <Image 
              src="/Logos/icon.png" 
              alt="MAGUI" 
              width={20} 
              height={20} 
              className="object-contain"
            />
          </div>
          <span>{t("studio_info")}</span>
        </m.div>
        <m.div
          variants={VARIANTS_FADE_IN_UP}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span>{t("studio_tagline")}</span>
        </m.div>
      </div>

      <div className="relative z-10 pt-32 pb-32 w-full px-6 md:px-12 lg:px-24">
        <div className="relative">
          {/* MAIN HEADLINE */}
          <div className="relative z-30">
            <m.div
              variants={VARIANTS_FADE_IN_UP}
              initial="hidden"
              animate="visible"
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
                {t("eyebrow")}
              </span>
            </m.div>

            <h1 className="font-heading text-6xl md:text-9xl lg:text-[140px] font-black leading-[0.75] tracking-[-0.06em] text-foreground uppercase select-none">
              <div className="block"><StaggeredText text={t("title_1")} /></div>
              <div className="flex flex-wrap ml-[0.5em] text-brand-primary drop-shadow-xl relative overflow-hidden">
                <m.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                  className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <StaggeredText text={t("title_2")} delayBase={0.2} />
              </div>
              <div className="block leading-[0.8] mt-2">
                <StaggeredText text={t("title_3")} delayBase={0.4} />
              </div>
            </h1>
          </div>

          {/* ARTISTIC IMAGE */}
          <m.div 
            initial={{ opacity: 0, clipPath: "inset(20% 40% 20% 40% round 2rem)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
            transition={{ ...TRANSITION_SLOW, delay: 0.6 }}
            className="absolute top-1/2 right-0 -translate-y-[20%] lg:-translate-y-1/2 z-10 w-[80%] lg:w-[55%] aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl"
          >
            <Image
              src="/utils/placeholder.svg"
              alt={t("image_alt")}
              fill
              sizes="(max-width: 1024px) 80vw, 55vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-brand-primary/5 mix-blend-overlay" />
          </m.div>
        </div>

        <div className="mt-24 lg:mt-48 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <m.div
            variants={VARIANTS_FADE_IN_UP}
            initial="hidden"
            animate="visible"
            custom={1}
            className="lg:col-span-5 space-y-12"
          >
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium tracking-tight">
              {t("description")}
            </p>

            <div className="flex flex-wrap items-center gap-10">
              <Button
                size="lg"
                className="group relative h-20 px-12 rounded-full bg-brand-primary text-white hover:scale-105 transition-all duration-500 shadow-2xl shadow-brand-primary/20"
              >
                <span className="relative z-10 flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em]">
                  {t("cta")}
                  <ArrowUpRight weight="bold" className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Button>

              <button className="flex items-start gap-1 group flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground group-hover:text-brand-primary transition-colors">
                  {t("secondary_cta")}
                </span>
                <div className="h-[1px] w-8 bg-muted-foreground/30 group-hover:w-full transition-all duration-500 group-hover:bg-brand-primary" />
              </button>
            </div>
          </m.div>
        </div>
      </div>
    </Section>
  )
}
