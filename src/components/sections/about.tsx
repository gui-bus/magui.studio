"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { m } from "framer-motion"
import { StaggeredText } from "@/src/components/ui/staggeredText"
import { Section } from "@/src/components/ui/section"
import { useSpotlight } from "@/src/lib/hooks/useSpotlight"
import { EASE_APPLE } from "@/src/config/animations"

export function About(): React.JSX.Element {
  const t = useTranslations("Index.About")
  const idT = useTranslations("Index.Ids")
  const containerRef = React.useRef<HTMLElement>(null)

  const { spotlightX, spotlightY, handleMouseMove } = useSpotlight(containerRef)

  return (
    <Section 
      id={idT("about")}
      ref={containerRef as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      className="py-48 lg:py-64"
      withContainer={true}
    >
      {/* Optimized Background */}
      <m.div 
        style={{ 
          background: `radial-gradient(800px circle at ${spotlightX}px ${spotlightY}px, var(--brand-primary), transparent 80%)`,
        }}
        animate={{ 
          scale: [0.95, 1.05, 0.95],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        aria-hidden="true"
      />

      <div className="flex flex-col items-center text-center space-y-16">
        <div className="space-y-12">
          <h2 className="font-heading text-5xl md:text-8xl lg:text-[140px] font-black tracking-tight text-foreground leading-[1.0] uppercase select-none">
            <StaggeredText text={t("title")} />
          </h2>
          
          <div className="relative flex justify-center">
            <m.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.5, ease: EASE_APPLE }}
              className="h-2 w-48 bg-brand-primary rounded-full relative overflow-hidden"
            >
              <m.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                aria-hidden="true"
              />
            </m.div>
          </div>

          <p className="max-w-5xl mx-auto text-2xl md:text-4xl lg:text-5xl text-muted-foreground/70 font-medium leading-[1.2] tracking-tight">
            <StaggeredText text={t("description")} delayBase={0.5} />
          </p>
        </div>
      </div>
    </Section>
  )
}
