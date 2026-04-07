"use client"

import * as React from "react"
import Image from "next/image"

import { useTranslations } from "next-intl"

import { ArrowUpRight } from "@phosphor-icons/react"
import { motion, useScroll, useTransform } from "framer-motion"

export function Showcase(): React.JSX.Element {
  const t = useTranslations("Index.Showcase")
  const projects = t.raw("projects") as { title: string; category: string }[]

  return (
    <section id="portfolio" className="relative w-full py-64 bg-background">
      <div className="px-6 md:px-12 lg:px-24 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl space-y-8"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-brand-primary">The_Standard</span>
          <h2 className="font-heading text-6xl md:text-9xl font-extrabold tracking-[-0.05em] text-foreground uppercase leading-[0.85]">
            {t("title")}
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-1 px-6 md:px-12 lg:px-24">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="group relative w-full h-[70vh] rounded-[3rem] overflow-hidden border border-foreground/5 bg-muted/30 mb-4"
          >
            {/* Visual Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/5 group-hover:scale-105 transition-transform duration-[2s]" />
            
            <div className="relative h-full flex flex-col justify-between p-12 lg:p-20 z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <span className="text-[10px] font-black tracking-[0.4em] text-brand-primary uppercase">Project_0{index + 1}</span>
                  <h3 className="text-4xl md:text-7xl font-heading font-extrabold text-foreground uppercase tracking-tighter">
                    {project.title}
                  </h3>
                </div>
                
                {/* Logo Seal */}
                <div className="relative h-12 w-12 opacity-40 group-hover:opacity-100 transition-opacity">
                  <Image src="/Logos/LOGO_VAR_01_DM.png" alt="MAGUI Seal" fill className="object-contain" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-foreground/5 pt-12">
                <p className="max-w-md text-xl text-muted-foreground leading-relaxed font-sans font-light">
                  {project.category}. Design de alta fidelidade focado em autoridade e conversão absoluta.
                </p>
                
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground text-background group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 group-hover:rotate-45 shadow-2xl">
                  <ArrowUpRight size={32} weight="bold" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
