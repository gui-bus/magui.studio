"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"

import { ArrowUpRight, Globe, Plus } from "@phosphor-icons/react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

import { Button } from "@/src/components/ui/button"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Hero(): React.JSX.Element {
  const t = useTranslations("Index.Hero")
  const [mounted, setMounted] = React.useState(false)

  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 800], [0, 160])
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0])
  
  const scaleImage = useTransform(scrollY, [0, 1000], [1, 1.1])
  const smoothScale = useSpring(scaleImage, { stiffness: 45, damping: 20 })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <section className="relative w-full bg-background" />

  return (
    <section className="relative w-full overflow-hidden bg-background">
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
          <Globe weight="bold" className="text-brand-primary h-3 w-3" />
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
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: EASE_APPLE }}
                    className="block mix-blend-difference drop-shadow-sm"
                  >
                    {t("title_1")}
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.1,
                      duration: 1.2,
                      ease: EASE_APPLE,
                    }}
                    className="block ml-[0.5em] text-brand-primary drop-shadow-xl"
                  >
                    {t("title_2")}
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.2,
                      duration: 1.2,
                      ease: EASE_APPLE,
                    }}
                    className="block leading-[0.8] mt-2 mix-blend-difference drop-shadow-sm"
                  >
                    {t("title_3")}
                  </motion.span>
                </div>
              </h1>
            </div>

            {/* ARTISTIC IMAGE - Integrated Architectural Composition */}
            <motion.div 
              style={{ y: yParallax, scale: smoothScale }}
              initial={{ opacity: 0, clipPath: "inset(10% 20% 10% 20% round 2rem)", filter: "blur(10px) grayscale(1)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)", filter: "blur(0px) grayscale(0.5)" }}
              transition={{ duration: 1.8, ease: EASE_APPLE, delay: 0.4 }}
              className="absolute top-1/2 right-0 -translate-y-[20%] lg:-translate-y-1/2 z-10 w-[80%] lg:w-[55%] aspect-[16/10] lg:aspect-[16/9] overflow-hidden shadow-2xl transition-all duration-1000"
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
              transition={{ delay: 0.8, duration: 1, ease: EASE_APPLE }}
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

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1, ease: EASE_APPLE }}
              className="lg:col-span-7 flex flex-col md:flex-row md:items-end justify-between gap-12"
            >
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-primary">
                    <Plus weight="bold" className="h-4 w-4" />
                    <span className="text-[10px] uppercase tracking-widest font-black">
                      {t("precision")}
                    </span>
                  </div>
                  <div className="text-4xl font-heading font-black tracking-tighter uppercase">
                    {t("precision_value")}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-primary">
                    <Plus weight="bold" className="h-4 w-4" />
                    <span className="text-[10px] uppercase tracking-widest font-black">
                      {t("scope")}
                    </span>
                  </div>
                  <div className="text-4xl font-heading font-black tracking-tighter uppercase">
                    {t("scope_value")}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-6 border-l md:border-l-0 md:border-r border-foreground/5 pl-8 md:pl-0 md:pr-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-14 w-14 rounded-full border-[3px] border-background bg-muted overflow-hidden relative grayscale hover:grayscale-0 transition-all cursor-pointer shadow-xl"
                    >
                      <Image
                        src="/utils/placeholder.svg"
                        alt={t("brand_alt")}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  {t("trusted")}
                </p>
              </div>
            </motion.div>
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
