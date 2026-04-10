"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { FAQItem } from "@/src/types/sections"
import { Section } from "@/src/components/ui/section"
import { m, AnimatePresence } from "framer-motion"
import { StaggeredText } from "@/src/components/ui/staggeredText"
import { cn } from "@/src/lib/utils/utils"

export function FAQ(): React.JSX.Element {
  const t = useTranslations("Index.FAQ")
  const idT = useTranslations("Index.Ids")
  const items = t.raw("items") as FAQItem[]
  
  return (
    <Section id={idT("faq")} className="py-32 lg:py-64 relative overflow-hidden">
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-primary/5 blur-[120px] rounded-full -mr-1/4 -mt-1/4 pointer-events-none" />
      
      <div className="container px-6 md:px-10 relative z-10">
        {/* MINIMALIST HEADER */}
        <div className="flex flex-col gap-12 mb-32">
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

          <h2 className="font-heading text-6xl md:text-9xl lg:text-[140px] font-black uppercase tracking-[-0.05em] leading-[0.8] text-foreground">
            <StaggeredText text={t("title")} />
          </h2>
        </div>

        {/* QUESTIONS LIST */}
        <div className="flex flex-col gap-px bg-foreground/10 border border-foreground/10 overflow-hidden rounded-3xl lg:rounded-[3rem]">
          {items.map((item, index) => (
            <FAQModule 
              key={index}
              index={index}
              item={item}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function FAQModule({ item, index }: { item: FAQItem, index: number }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <m.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "relative p-10 lg:p-16 bg-background group cursor-pointer transition-colors duration-700 overflow-hidden",
        isOpen ? "bg-foreground/5" : "hover:bg-foreground/[0.02]"
      )}
    >
      <div className="relative z-10 flex flex-col gap-12"> 
        <div className="flex items-start justify-between gap-8">
          <div className="space-y-6">
            <h3 className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tighter leading-tight transition-colors duration-500",
              isOpen ? "text-brand-primary" : "text-foreground"
            )}>
              {item.question}
            </h3>
          </div>
          
          <div className="flex-shrink-0 pt-2">
             <div className={cn(
               "h-10 w-10 rounded-full border border-foreground/10 flex items-center justify-center transition-all duration-500",
               isOpen ? "rotate-180 bg-brand-primary border-brand-primary text-white" : ""
             )}>
                <div className={cn(
                  "h-0.5 w-4 bg-current transition-transform duration-500",
                  isOpen ? "rotate-0" : ""
                )} />
                {!isOpen && <div className="absolute h-4 w-0.5 bg-current" />}
             </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-8 space-y-8">
                <div className="h-px w-12 bg-brand-primary/30" />
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
                  {item.answer}
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* ACTIVE MODULE DECORATION */}
      <m.div 
        animate={{ scaleX: isOpen ? 1 : 0 }}
        className="absolute bottom-0 left-0 h-1 w-full bg-brand-primary origin-left"
      />
    </m.div>
  )
}
