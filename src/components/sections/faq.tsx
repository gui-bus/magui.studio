"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { CaretRight } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function FAQ(): React.JSX.Element {
  const t = useTranslations("Index.FAQ")
  const idT = useTranslations("Index.Ids")
  const items = t.raw("items") as { question: string; answer: string }[]
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section 
      id={idT("faq")}
      className="relative w-full py-32 lg:py-64 bg-background overflow-hidden px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-5xl">
        
        {/* SECTION HEADER - Refined */}
        <div className="mb-24 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_APPLE }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">
              {t("eyebrow")}
            </span>
          </motion.div>
          
          <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tight text-foreground leading-none">
            {t("title")}
          </h2>
        </div>

        {/* GUIDED LIST */}
        <div className="flex flex-col border-t border-foreground/10">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="border-b border-foreground/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-10 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-8 lg:gap-12">
                  <span className={cn(
                    "font-heading text-xl font-black transition-colors duration-500",
                    openIndex === index ? "text-brand-primary" : "text-foreground/20"
                  )}>
                    0{index + 1}
                  </span>
                  <span className={cn(
                    "text-xl md:text-3xl font-bold tracking-tight transition-all duration-500",
                    openIndex === index ? "text-brand-primary translate-x-2" : "text-foreground group-hover:translate-x-2"
                  )}>
                    {item.question}
                  </span>
                </div>

                {/* ARROW INDICATOR */}
                <div className={cn(
                  "h-10 w-10 rounded-full border border-foreground/5 flex items-center justify-center transition-all duration-500 shrink-0",
                  openIndex === index ? "rotate-90 bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-muted-foreground group-hover:border-foreground/20 group-hover:text-foreground"
                )}>
                  <CaretRight weight="bold" size={20} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_APPLE }}
                    className="overflow-hidden"
                  >
                    <div className="pl-16 lg:pl-24 pb-12">
                      <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-medium max-w-2xl border-l border-foreground/10 pl-8">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
