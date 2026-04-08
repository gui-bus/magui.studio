"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { motion } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Process(): React.JSX.Element {
  const t = useTranslations("Index.Process")
  const steps = t.raw("steps") as { title: string; description: string }[]

  return (
    <section className="relative w-full px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-24">
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE_APPLE }}
              className="font-heading text-5xl md:text-7xl font-black tracking-tight text-foreground"
            >
              {t("title")}
            </motion.h2>
          </div>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.5, ease: EASE_APPLE }}
            className="h-px flex-1 bg-border/10 hidden md:block origin-left" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 1, ease: EASE_APPLE }}
              className="group relative p-10 rounded-[2rem] border border-border/10 bg-muted/20 hover:bg-background hover:border-brand-primary/20 hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="text-5xl font-heading font-black text-foreground/5 group-hover:text-brand-primary/10 transition-colors duration-500">
                  0{index + 1}
                </span>
                <div className="h-2 w-2 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-heading font-bold text-foreground tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-10 left-10 right-10 h-0.5 bg-border/5 group-hover:bg-brand-primary/20 transition-colors" />
              
              {/* Animated Progress Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + (index * 0.1), duration: 0.8, ease: EASE_APPLE }}
                className="absolute bottom-10 left-10 right-10 h-0.5 bg-brand-primary/10 origin-left"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
