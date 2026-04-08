"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"

import { ArrowUpRight, Globe } from "@phosphor-icons/react"
import { m, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"

import { Button } from "@/src/components/ui/button"
import { StaggeredText } from "@/src/components/ui/staggeredText"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Hero(): React.JSX.Element {
  const t = useTranslations("Index.Hero")
  const idT = useTranslations("Index.Ids")
  const [mounted, setMounted] = React.useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useSpring(mouseX, { damping: 50, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 50, stiffness: 200 })

  const { scrollY } = useScroll()
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    // Optimization: Skip tracking on mobile or low performance devices if needed
    if (window.innerWidth < 1024) return 
    const { clientX, clientY } = e
    mouseX.set(clientX)
    mouseY.set(clientY)
  }, [mouseX, mouseY])

  // LCP Fix: Initial render must be minimal
  if (!mounted) return <section className="relative w-full bg-background min-h-svh" />

  return (
    <section 
      id={idT("hero")}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-background min-h-svh flex items-center"
    >
      {/* Background Spotlight - Client Side Only */}
      <m.div 
        style={{ 
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, var(--brand-primary), transparent 80%)`,
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.08] hidden lg:block"
      />

      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] dark:opacity-[0.06]"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
      />

      <div className="absolute top-0 left-0 w-full z-40 px-6 lg:px-12 py-8 flex items-center justify-between border-b border-foreground/5 backdrop-blur-sm">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_APPLE }}
          className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground"
        >
          <div className="relative flex h-3 w-3 items-center justify-center">
            <Globe weight="bold" className="text-brand-primary h-3 w-3" />
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-40" />
          </div>
          <span>{t("studio_info")}</span>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE_APPLE }}
          className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span>{t("studio_tagline")}</span>
        </m.div>
      </div>

      <div className="relative z-10 pt-32 pb-32 w-full">
        <div className="container mx-auto max-w-[1800px] px-6 lg:px-12">
          <div className="relative">
            <div className="relative z-30">
              <m.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: EASE_APPLE }}
                className="mb-8 flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-brand-primary" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
                  {t("eyebrow")}
                </span>
              </m.div>

              <h1 className="font-heading text-6xl md:text-9xl lg:text-[140px] font-black leading-[0.75] tracking-[-0.06em] text-foreground uppercase select-none">
                <div className="block">
                  <StaggeredText text={t("title_1")} />
                </div>
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

            {/* Optimized Image for LCP - No complex filters or clip-paths initially */}
            <div className="absolute top-1/2 right-0 -translate-y-[20%] lg:-translate-y-1/2 z-10 w-[80%] lg:w-[55%] aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="/utils/placeholder.svg"
                alt={t("image_alt")}
                fill
                sizes="(max-width: 1024px) 80vw, 55vw"
                className="object-cover"
                priority
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-brand-primary/5 mix-blend-overlay" />
            </div>
          </div>

          <div className="mt-24 lg:mt-48 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <m.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1, ease: EASE_APPLE }}
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

                <button className="flex flex-col items-start gap-1 group">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground group-hover:text-brand-primary transition-colors">
                    {t("secondary_cta")}
                  </span>
                  <div className="h-[1px] w-8 bg-muted-foreground/30 group-hover:w-full transition-all duration-500 group-hover:bg-brand-primary" />
                </button>
              </div>
            </m.div>
            <div className="lg:col-span-7" />
          </div>
        </div>
      </div>

      <m.div
        style={{ opacity: opacityFade }}
        className="absolute bottom-12 right-12 z-40 flex items-center gap-6"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/30 rotate-90 origin-right translate-y-12 whitespace-nowrap">
          {t("scroll")}
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-brand-primary to-transparent" />
      </m.div>
    </section>
  )
}
