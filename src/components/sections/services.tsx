"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { Desktop, Strategy, TrendUp } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Services(): React.JSX.Element {
  const t = useTranslations("Index.Services")

  const services = [
    {
      icon: <Strategy size={48} weight="thin" className="text-brand-primary" />,
      title: t("uiux.title"),
      description: t("uiux.description"),
    },
    {
      icon: <Desktop size={48} weight="thin" className="text-brand-secondary" />,
      title: t("frontend.title"),
      description: t("frontend.description"),
    },
    {
      icon: <TrendUp size={48} weight="thin" className="text-brand-primary" />,
      title: t("performance.title"),
      description: t("performance.description"),
    },
  ]

  return (
    <section id="services" className="relative w-full py-64 px-6 md:px-12 lg:px-24 bg-foreground text-background">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-8 max-w-3xl">
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-brand-primary">Our_Expertise</span>
            <h2 className="font-heading text-6xl md:text-9xl font-extrabold tracking-[-0.05em] text-background uppercase leading-[0.85]">
              {t("title")}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col space-y-16 p-16 rounded-[3rem] border border-background/5 bg-background/[0.03] hover:bg-background/[0.08] transition-all duration-700"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-background/5 border border-background/10 group-hover:bg-brand-primary transition-all duration-500">
                <div className="group-hover:text-white transition-colors">
                  {service.icon}
                </div>
              </div>
              
              <div className="space-y-8">
                <h3 className="text-4xl lg:text-5xl font-heading font-extrabold text-background tracking-tighter uppercase leading-tight">
                  {service.title}
                </h3>
                <p className="text-xl text-background/40 leading-relaxed font-sans font-light group-hover:text-background/70 transition-colors">
                  {service.description}
                </p>
              </div>

              <div className="pt-12 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="h-px flex-1 bg-brand-primary" />
                <span className="text-[9px] font-black tracking-[0.4em] text-brand-primary uppercase">Expert_Assigned</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
