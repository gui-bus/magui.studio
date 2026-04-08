"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"

import { ArrowUpRight, Globe } from "@phosphor-icons/react"
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"

import { Button } from "@/src/components/ui/button"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Hero(): React.JSX.Element {
  const t = useTranslations("Index.Hero")
  const idT = useTranslations("Index.Ids")
  const [mounted, setMounted] = React.useState(false)

  // Item 7: Background Spotlight
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useSpring(mouseX, { damping: 50, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 50, stiffness: 200 })

  const { scrollY } = useScroll()
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  if (!mounted) return <section className="relative w-full bg-background" />

  const renderStaggeredText = (text: string, delayBase: number = 0) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
        <motion.span
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
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
      id={idT("hero")}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-background"
    >
      {/* Item 7: Spotlight Background Effect */}
      <motion.div 
        style={{ 
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, var(--brand-primary), transparent 80%)`,
          left: 0,
          top: 0,
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.08]"
      />

      {/* NOISE OVERLAY - Premium Texture */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        }}
      />

      {/* TOP HEADER INFO - Studio Status */}
      <div className="absolute top-0 left-0 w-full z-40 px-6 lg:px-12 py-8 flex items-center justify-between border-b border-foreground/5 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_APPLE }}
          className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground"
        >
          <div className="relative flex h-3 w-3 items-center justify-center">
            <Globe weight="bold" className="text-brand-primary h-3 w-3" />
            {/* Item 5: Radar Micro-interaction */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-40" />
          </div>
          <span>{t("studio_info")}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE_APPLE }}
          className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span>{t("studio_tagline")}</span>
        </motion.div>
      </div>

      <div className="relative z-10 pt-48 lg:pt-64 pb-32">
        <div className="container mx-auto max-w-[1800px] px-6 lg:px-12">
          <div className="relative">
            {/* MAIN HEADLINE - Editorial Kinetic Typography */}
            <div className="relative z-30">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: EASE_APPLE }}
                className="mb-8 flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-brand-primary" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
                  {t("eyebrow")}
                </span>
              </motion.div>

              <h1 className="font-heading text-6xl md:text-9xl lg:text-[140px] font-black leading-[0.75] tracking-[-0.06em] text-foreground uppercase select-none">
                <div className="flex flex-wrap">
                  {renderStaggeredText(t("title_1"), 0)}
                </div>
                {/* Item 4: Shimmer effect on title_2 */}
                <div className="flex flex-wrap ml-[0.5em] text-brand-primary drop-shadow-xl relative overflow-hidden group">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                    className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                  {renderStaggeredText(t("title_2"), 0.2)}
                </div>
                <div className="flex flex-wrap leading-[0.8] mt-2">
                  {renderStaggeredText(t("title_3"), 0.4)}
                </div>
              </h1>
            </div>

            {/* Item 2: Cinematic Image Entry */}
            <motion.div 
              initial={{ 
                opacity: 0, 
                clipPath: "inset(20% 40% 20% 40% round 2rem)", 
                filter: "blur(20px) grayscale(1)" 
              }}
              animate={{ 
                opacity: 1, 
                clipPath: "inset(0% 0% 0% 0% round 2rem)", 
                filter: "blur(0px) grayscale(0.5)" 
              }}
              transition={{ duration: 2, ease: EASE_APPLE, delay: 0.6 }}
              className="absolute top-1/2 right-0 -translate-y-[20%] lg:-translate-y-1/2 z-10 w-[80%] lg:w-[55%] aspect-[16/10] lg:aspect-[16/9] overflow-hidden shadow-2xl"
            >
              <Image
                src="/utils/placeholder.svg"
                alt={t("image_alt")}
                fill
                className="object-cover"
                priority
              />
              {/* Refined Image Scrim for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-brand-primary/5 mix-blend-overlay" />
            </motion.div>
          </div>

          {/* LOWER CONTENT - Balanced Information */}
          <div className="mt-24 lg:mt-48 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div
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
                    <ArrowUpRight
                      weight="bold"
                      className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </Button>

                <button className="flex flex-col items-start gap-1 group">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground group-hover:text-brand-primary transition-colors">
                    {t("secondary_cta")}
                  </span>
                  <div className="h-[1px] w-8 bg-muted-foreground/30 group-hover:w-full transition-all duration-500 group-hover:bg-brand-primary" />
                </button>
              </div>
            </motion.div>

            <div className="lg:col-span-7" />
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR - Studio Style */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="absolute bottom-12 right-12 z-40 flex items-center gap-6"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/30 rotate-90 origin-right translate-y-12 whitespace-nowrap">
          {t("scroll")}
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-brand-primary to-transparent" />
      </motion.div>
    </section>
  )
}
