"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { Gauge, Palette, ShieldCheck } from "@phosphor-icons/react"
import { motion } from "framer-motion"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function About(): React.JSX.Element {
  const t = useTranslations("Index.About")
  const stats = t.raw("stats") as { label: string; value: string }[]

  const icons = [
    <Gauge key="gauge" size={32} weight="fill" className="text-brand-primary" />,
    <Palette key="palette" size={32} weight="fill" className="text-brand-primary" />,
    <ShieldCheck key="shield" size={32} weight="fill" className="text-brand-primary" />,
  ]

  return (
    <section className="relative w-full py-32 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_APPLE }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE_APPLE }}
                className="font-heading text-4xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]"
              >
                {t("title")}
              </motion.h2>
            </div>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: EASE_APPLE }}
              className="h-1.5 w-24 bg-brand-primary rounded-full mx-auto lg:mx-0 origin-left" 
            />
            <p className="text-xl md:text-2xl text-muted-foreground/80 font-sans leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 1, ease: EASE_APPLE }}
                className="group flex items-center gap-8 p-8 rounded-3xl border border-border/10 bg-muted/30 hover:bg-background hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500"
              >
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background border border-border/10 shadow-sm group-hover:shadow-brand-primary/10 transition-shadow duration-500"
                >
                  {icons[index]}
                </motion.div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/50 group-hover:text-brand-primary transition-colors">
                    {stat.label}
                  </span>
                  <p className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
