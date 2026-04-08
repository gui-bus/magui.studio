"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"

import { ArrowUpRight } from "@phosphor-icons/react"
import { m } from "framer-motion"

import { Button } from "@/src/components/ui/button"
import { StaggeredText } from "@/src/components/ui/staggeredText"
import { Section } from "@/src/components/ui/section"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Contact(): React.JSX.Element {
  const t = useTranslations("Index.CTA")
  const idT = useTranslations("Index.Ids")
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <Section 
      id={idT("contact")}
      ref={containerRef} 
      className="py-48 lg:py-72 border-t border-foreground/5"
      withContainer={true}
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-end">

        <div className="lg:col-span-8 space-y-12">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_APPLE }}
            className="space-y-8"
          >
            <div className="relative h-12 w-48 lg:h-16 lg:w-64">
              <Image 
                src="/Logos/LOGO_VAR_03_LM.png" 
                alt="MAGUI" 
                fill
                className="object-contain object-left dark:hidden"
              />
              <Image 
                src="/Logos/LOGO_VAR_03_DM.png" 
                alt="MAGUI" 
                fill
                className="object-contain object-left hidden dark:block"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="h-[2px] w-16 bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-brand-primary">
                Next Step
              </span>
            </div>
          </m.div>

          <h2 className="font-heading text-6xl md:text-9xl lg:text-[140px] font-black leading-[0.8] tracking-[-0.06em] text-foreground uppercase max-w-5xl">

            <StaggeredText text={t("title")} />
          </h2>
        </div>

        <div className="lg:col-span-4 space-y-16">
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, ease: EASE_APPLE }}
            className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed border-l border-foreground/10 pl-10"
          >
            {t("description")}
          </m.p>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1, ease: EASE_APPLE }}
            className="pl-10"
          >
            <Button
              size="lg"
              className="group relative h-24 px-12 rounded-full bg-foreground text-background dark:bg-foreground dark:text-background overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 flex items-center gap-6 text-xs font-black uppercase tracking-[0.4em]">
                {t("button")}
                <ArrowUpRight weight="bold" size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-500" aria-hidden="true" />
              </span>
            </Button>
          </m.div>
        </div>

      </div>
    </Section>
  )
}
