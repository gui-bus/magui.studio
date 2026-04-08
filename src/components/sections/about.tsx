"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { motion } from "framer-motion"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function About(): React.JSX.Element {
  const t = useTranslations("Index.About")

  return (
    <section className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_APPLE }}
            className="space-y-8"
          >
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE_APPLE }}
                className="font-heading text-5xl md:text-8xl lg:text-[120px] font-black tracking-tight text-foreground leading-[0.9] uppercase"
              >
                {t("title")}
              </motion.h2>
            </div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: EASE_APPLE }}
              className="h-1.5 w-32 bg-brand-primary rounded-full mx-auto" 
            />

            <p className="max-w-4xl mx-auto text-2xl md:text-4xl text-muted-foreground/80 font-medium leading-tight tracking-tight">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--brand-primary)_0%,_transparent_70%)]" />
      </div>
    </section>
  )
}
