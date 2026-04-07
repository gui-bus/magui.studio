"use client"

import * as React from "react"
import Image from "next/image"

import { useTranslations } from "next-intl"

import { CaretDown, Plus, Globe } from "@phosphor-icons/react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

import { Button } from "@/src/components/ui/button"

export function Hero(): React.JSX.Element {
  const t = useTranslations("Index.Hero")
  const [mounted, setMounted] = React.useState(false)

  const { scrollY } = useScroll()
  const yParallax1 = useTransform(scrollY, [0, 800], [0, 150])
  const yParallax2 = useTransform(scrollY, [0, 800], [0, -100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  
  const scaleImage = useTransform(scrollY, [0, 800], [1, 1.1])
  const smoothScale = useSpring(scaleImage, { stiffness: 100, damping: 30 })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return (
    <section className="relative min-h-screen w-full bg-background" />
  )

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background px-6 lg:px-16 pt-32 lg:pt-48">
      {/* NOISE OVERLAY - Premium Texture */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />

      {/* BACKGROUND GRADIENTS - Subtle Depth */}
      <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-secondary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* TOP DECORATIVE ROW - Coordinates/Studio Label */}
        <div className="flex items-center justify-between mb-16 border-b border-foreground/5 pb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground"
          >
            <Globe weight="bold" className="text-brand-primary h-3 w-3" />
            <span>Studio / Global Service / Est. 2026</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground"
          >
            <span>-23.5505° S, -46.6333° W</span>
          </motion.div>
        </div>

        <div className="relative">
          {/* MAIN HEADLINE - Architectural & Kinetic Typography */}
          <div className="relative z-20 pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-7xl sm:text-9xl lg:text-[180px] xl:text-[220px] font-black leading-[0.8] tracking-[-0.05em] text-foreground uppercase mix-blend-difference"
            >
              Beyond <br />
              <span className="flex items-baseline gap-4 md:gap-8">
                Digital
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "clamp(100px, 20vw, 400px)" }}
                  transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] bg-brand-primary inline-block mb-[0.1em]"
                />
              </span>
              <span className="text-transparent border-text text-stroke-sm dark:text-stroke-white text-stroke-black">
                Limits
              </span>
            </motion.h1>
          </div>

          {/* ARTISTIC IMAGE COMPOSITION */}
          <motion.div 
            style={{ y: yParallax1, scale: smoothScale }}
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10 w-[65%] max-w-[1000px] aspect-[16/10] rounded-[2vw] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
              alt="Abstract Architecture"
              fill
              className="object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
              priority
            />
            {/* Image Overlay Texture */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 via-transparent to-transparent mix-blend-overlay" />
          </motion.div>

          {/* SECONDARY FLOATING ELEMENT - Data/Precision */}
          <motion.div
            style={{ y: yParallax2 }}
            className="absolute -bottom-20 left-[10%] z-30 hidden lg:block"
          >
            <div className="relative group p-12 rounded-[2vw] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl max-w-sm">
              <Plus weight="bold" className="absolute top-6 left-6 text-brand-primary h-4 w-4" />
              <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-8">
                {t("description")}
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-3xl font-heading font-black text-foreground">99.9%</div>
                  <div className="text-[9px] uppercase tracking-widest font-bold text-brand-primary">Precision</div>
                </div>
                <div className="h-10 w-[1px] bg-white/10" />
                <div>
                  <div className="text-3xl font-heading font-black text-foreground">Global</div>
                  <div className="text-[9px] uppercase tracking-widest font-bold text-brand-primary">Scope</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA ROW - Minimalist but Impactful */}
        <div className="mt-24 lg:mt-48 flex flex-col md:flex-row items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center gap-8"
          >
            <Button
              size="lg"
              className="group relative h-20 px-12 rounded-full bg-foreground text-background hover:scale-105 transition-transform duration-500 shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em]">
                {t("cta")}
                <Plus weight="bold" className="transition-transform group-hover:rotate-90" />
              </span>
            </Button>
            
            <button className="hidden sm:flex flex-col items-start gap-1 group">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground group-hover:text-brand-primary transition-colors">
                {t("secondary_cta")}
              </span>
              <div className="h-[1px] w-12 bg-muted-foreground/30 group-hover:w-full transition-all duration-500 group-hover:bg-brand-primary" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-end gap-4 text-right"
          >
             <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 w-12 rounded-full border-2 border-background bg-muted overflow-hidden relative grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <Image 
                      src={`https://images.unsplash.com/photo-${1500648767791 + i}?auto=format&fit=crop&w=150&h=150`} 
                      alt="Team" 
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Trusted by 500+ Innovators
              </p>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-brand-primary to-transparent" />
          <CaretDown weight="bold" className="text-brand-primary h-4 w-4" />
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .text-stroke-sm {
          -webkit-text-stroke-width: 1px;
        }
        .text-stroke-white {
          -webkit-text-stroke-color: white;
        }
        .text-stroke-black {
          -webkit-text-stroke-color: black;
        }
      `}</style>
    </section>
  )
}
