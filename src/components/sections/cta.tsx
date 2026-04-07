"use client"

import * as React from "react"
import Image from "next/image"

import { useTranslations } from "next-intl"

import { ChatCircleDots } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { Button } from "@/src/components/ui/button"

export function CTA(): React.JSX.Element {
  const t = useTranslations("Index.CTA")

  return (
    <section className="relative w-full px-6 py-64 md:px-12 lg:px-24 overflow-hidden bg-background">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center text-center space-y-24">
          {/* Central Logo Totem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-40 w-40"
          >
             <Image 
               src="/Logos/LOGO_VAR_01_DM.png" 
               alt="MAGUI Symbol" 
               fill 
               className="object-contain drop-shadow-[0_0_40px_rgba(var(--brand-primary),0.2)]" 
             />
          </motion.div>

          <div className="space-y-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-6xl md:text-9xl lg:text-[12rem] font-extrabold leading-[0.8] tracking-[-0.06em] text-foreground uppercase max-w-6xl"
            >
              {t("title")}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-xl text-xl md:text-2xl text-muted-foreground/60 font-sans font-light leading-relaxed"
            >
              {t("description")}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="group h-24 px-16 rounded-full bg-brand-primary text-white text-xl font-bold uppercase tracking-[0.4em] shadow-[0_0_60px_-10px_rgba(var(--brand-primary),0.6)] hover:scale-110 active:scale-95 transition-all duration-500 cursor-pointer"
            >
              {t("button")}
              <ChatCircleDots className="ml-6 transition-transform group-hover:rotate-12" size={32} weight="fill" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Background Industrial Accents */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-foreground/5 -z-10" />
      <div className="absolute left-1/2 top-0 w-px h-full bg-foreground/5 -z-10" />
    </section>
  )
}
