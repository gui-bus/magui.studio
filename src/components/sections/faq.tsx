"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { CaretDown } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function FAQ(): React.JSX.Element {
  const t = useTranslations("Index.FAQ")
  const items = t.raw("items") as { question: string; answer: string }[]
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section className="relative w-full py-32 lg:py-64 bg-background">
      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="mb-24 space-y-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_APPLE }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-8 bg-brand-primary/30" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
              {t("eyebrow")}
            </span>
            <div className="h-px w-8 bg-brand-primary/30" />
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_APPLE }}
              className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tight text-foreground"
            >
              {t("title")}
            </motion.h2>
          </div>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: EASE_APPLE }}
              className={cn(
                "group rounded-3xl border transition-all duration-700",
                openIndex === index 
                  ? "bg-muted/30 border-brand-primary/20 shadow-xl shadow-brand-primary/5" 
                  : "bg-background border-foreground/5 hover:border-foreground/10"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-10 flex items-center justify-between text-left"
              >
                <span className="text-xl md:text-2xl font-bold text-foreground tracking-tight group-hover:text-brand-primary transition-colors">
                  {item.question}
                </span>
                <div className={cn(
                  "h-12 w-12 rounded-full border border-foreground/10 flex items-center justify-center transition-transform duration-700",
                  openIndex === index ? "rotate-180 bg-brand-primary border-brand-primary text-white" : "text-foreground"
                )}>
                  <CaretDown weight="bold" size={20} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE_APPLE }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-10 border-t border-foreground/5 mt-2 pt-8">
                      <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-medium">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
