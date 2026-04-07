"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { Gauge, Palette, ShieldCheck } from "@phosphor-icons/react"
import { motion } from "framer-motion"

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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <h2 className="font-heading text-4xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
              {t("title")}
            </h2>
            <div className="h-1.5 w-24 bg-brand-primary rounded-full mx-auto lg:mx-0" />
            <p className="text-xl md:text-2xl text-muted-foreground/80 font-sans leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group flex items-center gap-8 p-8 rounded-3xl border border-border/10 bg-muted/30 hover:bg-background hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background border border-border/10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {icons[index]}
                </div>
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
