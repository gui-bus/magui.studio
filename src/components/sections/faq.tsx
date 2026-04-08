"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { FAQItem } from "@/src/types/sections"
import { CaretRight } from "@phosphor-icons/react"
import { AnimatePresence, m } from "framer-motion"

import { StaggeredText } from "@/src/components/ui/staggeredText"
import { Section } from "@/src/components/ui/section"

import { cn } from "@/src/lib/utils/utils"

import { TRANSITION_MEDIUM, VARIANTS_FADE_IN_UP, EASE_APPLE } from "@/src/config/animations"

export function FAQ(): React.JSX.Element {
  const t = useTranslations("Index.FAQ")
  const idT = useTranslations("Index.Ids")
  const items = t.raw("items") as FAQItem[]
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <Section
      id={idT("faq")}
      className="py-32"
    >
      {/* SECTION HEADER */}
      <div className="mb-24 space-y-6">
        <m.div
          variants={VARIANTS_FADE_IN_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12 bg-brand-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">
            {t("eyebrow")}
          </span>
        </m.div>

        <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tight text-foreground leading-none">
          <StaggeredText text={t("title")} />
        </h2>
      </div>

      {/* ACCORDION LIST */}
      <div
        className="flex flex-col border-t border-foreground/10"
        role="presentation"
      >
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const panelId = `faq-panel-${index}`
          const buttonId = `faq-button-${index}`

          return (
            <div key={index} className="border-b border-foreground/10">
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full py-10 flex items-center justify-between text-left group focus-visible:outline-brand-primary focus-visible:outline-offset-4"
              >
                <div className="flex items-center gap-8 lg:gap-12">
                  <span
                    className={cn(
                      "font-heading text-xl font-black transition-colors duration-500",
                      isOpen ? "text-brand-primary" : "text-foreground/60"
                    )}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className={cn(
                      "text-xl md:text-3xl font-bold tracking-tight transition-all duration-500",
                      isOpen
                        ? "text-brand-primary"
                        : "text-foreground group-hover:text-brand-primary"
                    )}
                  >
                    {item.question}
                  </span>
                </div>

                <div
                  className={cn(
                    "h-10 w-10 rounded-full border border-foreground/10 flex items-center justify-center transition-all duration-700 shrink-0",
                    isOpen
                      ? "rotate-90 bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20"
                      : "text-muted-foreground/80 group-hover:border-brand-primary group-hover:text-brand-primary"
                  )}
                >
                  <CaretRight weight="bold" size={20} aria-hidden="true" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={TRANSITION_MEDIUM}
                    className="overflow-hidden"
                  >
                    <div className="pl-16 lg:pl-24 pb-12">
                      <p className="text-lg md:text-xl text-muted-foreground/70 leading-relaxed font-medium max-w-2xl border-l border-foreground/10 pl-8">
                        {item.answer}
                      </p>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
