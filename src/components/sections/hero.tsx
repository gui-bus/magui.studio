"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"

import { ArrowUpRightIcon } from "@phosphor-icons/react"
import { m } from "framer-motion"

import { Button } from "@/src/components/ui/button"
import { Section } from "@/src/components/ui/section"
import { StaggeredText } from "@/src/components/ui/staggeredText"

import { TRANSITION_SLOW, VARIANTS_FADE_IN_UP } from "@/src/config/animations"

export function Hero(): React.JSX.Element {
  const t = useTranslations("Index.Hero")
  const idT = useTranslations("Index.Ids")
  const [mounted, setMounted] = React.useState(false)
  const containerRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => setMounted(true), [])

  if (!mounted)
    return (
      <Section  withContainer={false}>
        {" "}
        {null}{" "}
      </Section>
    )

  return (
    <Section
      id={idT("hero")}
      ref={containerRef}
      className="flex items-center"
      withContainer={false}
    >
      <div className="relative z-10 py-20 w-full px-6 md:px-12 lg:px-24">
        <div className="relative">
          {/* MAIN HEADLINE */}
          <div className="relative z-30">
            <m.div
              variants={VARIANTS_FADE_IN_UP}
              initial="hidden"
              animate="visible"
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-px w-12 bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
                {t("eyebrow")}
              </span>
            </m.div>

            <h1 className="font-heading text-6xl md:text-9xl lg:text-[140px] font-black leading-[0.75] tracking-[-0.06em] text-foreground uppercase select-none">
              <div className="block">
                <StaggeredText text={t("title_1")} />
              </div>
              <div className="flex flex-wrap ml-[0.5em] text-brand-primary drop-shadow-xl">
                <StaggeredText text={t("title_2")} delayBase={0.2} />
              </div>
              <div className="block leading-[0.8] mt-2">
                <StaggeredText text={t("title_3")} delayBase={0.4} />
              </div>
            </h1>
          </div>

          {/* ARTISTIC IMAGE */}
          <m.div
            initial={{
              opacity: 0,
              clipPath: "inset(20% 40% 20% 40% round 2rem)",
            }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
            transition={{ ...TRANSITION_SLOW, delay: 0.6 }}
            className="absolute top-1/2 right-0 -translate-y-[20%] lg:-translate-y-1/2 z-10 w-[80%] lg:w-[55%] aspect-16/10 lg:aspect-video overflow-hidden rounded-r-4xl"
          >
            <Image
              src="/images/hero.webp"
              alt={t("image_alt")}
              fill
              sizes="(max-width: 1024px) 80vw, 55vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent opacity-100" />
            <div className="absolute inset-0 bg-brand-primary/5 mix-blend-overlay" />
          </m.div>
        </div>

        <div className="mt-24 lg:mt-48 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <m.div
            variants={VARIANTS_FADE_IN_UP}
            initial="hidden"
            animate="visible"
            custom={1}
            className="lg:col-span-6 space-y-12"
          >
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium tracking-tight">
              {t("description")}
            </p>
          </m.div>

          <m.div
            variants={VARIANTS_FADE_IN_UP}
            initial="hidden"
            animate="visible"
            custom={1}
            className="lg:col-span-6 space-y-12"
          >
            <div className="flex flex-wrap items-center gap-10">
              <Button
                size="lg"
                className="group relative h-20 px-12 rounded-full bg-brand-primary text-white hover:scale-105 transition-all duration-500 shadow-2xl shadow-brand-primary/20"
              >
                <span className="relative z-10 flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em]">
                  {t("cta")}
                  <ArrowUpRightIcon
                    weight="bold"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </Button>

              <button className="flex items-start gap-1 group flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground group-hover:text-brand-primary transition-colors">
                  {t("secondary_cta")}
                </span>
                <div className="h-px w-8 bg-muted-foreground/30 group-hover:w-full transition-all duration-500 group-hover:bg-brand-primary" />
              </button>
            </div>
          </m.div>
        </div>
      </div>
    </Section>
  )
}
