"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { useTheme } from "next-themes"

import { Plus, ArrowUp } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Footer(): React.JSX.Element {
  const t = useTranslations("Footer")
  const configT = useTranslations("Config")
  const navT = useTranslations("Index.Nav")
  const idT = useTranslations("Index.Ids")
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const logoSrc = resolvedTheme === "dark" 
    ? "/Logos/LOGO_VAR_02_DM.png" 
    : "/Logos/LOGO_VAR_02_LM.png"

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full bg-background pt-32 pb-12 border-t border-foreground/5 overflow-hidden">
      <div className="container mx-auto max-w-[1800px] px-6 lg:px-12">
        
        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-12 items-start mb-48">
          
          {/* BRAND BLOCK */}
          <div className="lg:col-span-5 space-y-16">
            <div className="relative h-12 w-64">
              {mounted && (
                <Image 
                  src={logoSrc} 
                  alt="MAGUI.studio" 
                  fill 
                  className="object-contain object-left"
                />
              )}
            </div>
            <p className="max-w-md text-2xl text-muted-foreground font-medium leading-tight tracking-tight">
              {configT("description")}
            </p>
          </div>

          {/* LINKS GRID */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-24">
            
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                 <Plus weight="bold" size={10} className="text-brand-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Navigation</span>
              </div>
              <ul className="space-y-6">
                {[
                  { id: "services", label: navT("services") },
                  { id: "portfolio", label: navT("portfolio") },
                  { id: "about", label: navT("about") }
                ].map((link) => (
                  <li key={link.id} className="group overflow-hidden">
                    <Link href={`#${idT(link.id as any)}`} className="text-lg font-bold uppercase tracking-tighter text-foreground hover:text-brand-primary transition-all duration-500 flex items-center gap-2 group-hover:translate-x-2">
                      {link.label}
                      <Plus size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-3">
                 <Plus weight="bold" size={10} className="text-brand-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Social</span>
              </div>
              <ul className="space-y-6">
                {["Instagram", "LinkedIn", "Behance"].map((link) => (
                  <li key={link} className="group overflow-hidden">
                    <Link href="#" className="text-lg font-bold uppercase tracking-tighter text-foreground hover:text-brand-primary transition-all duration-500 flex items-center gap-2 group-hover:translate-x-2">
                      {link}
                      <Plus size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10 hidden md:block">
              <div className="flex items-center gap-3">
                 <Plus weight="bold" size={10} className="text-brand-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">{t("studio_title")}</span>
              </div>
              <div className="space-y-6 text-sm font-medium text-muted-foreground leading-relaxed">
                 <p>{t("established")}</p>
                 <p>{t("availability")}</p>
              </div>
            </div>

          </div>
        </div>

        {/* MASSIVE SIGNATURE LOGO - Insany Inspiration */}
        <div className="relative w-full mb-24 overflow-hidden py-12">
           <motion.h2 
             initial={{ opacity: 0, y: 100 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="text-7xl md:text-[160px] lg:text-[280px] xl:text-[360px] font-black leading-none text-foreground uppercase tracking-[-0.08em] select-none text-center relative"
           >
             {/* Signature Shimmer Effect */}
             <motion.div 
               animate={{ x: ["-100%", "200%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
               className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-brand-primary/5 to-transparent skew-x-12 pointer-events-none"
             />
             MAGUI<span className="text-[0.2em] align-top text-brand-primary">®</span>
           </motion.h2>
        </div>

        {/* BOTTOM CREDITS */}
        <div className="pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">
            <span>{t("credits", { year: new Date().getFullYear() })}</span>
            <div className="h-1 w-1 rounded-full bg-foreground/10 hidden md:block" />
            <Link href="#" className="hover:text-brand-primary transition-colors">{t("policy")}</Link>
            
            {/* NEW ELEGANT BACK TO TOP */}
            <div className="h-1 w-1 rounded-full bg-foreground/10 hidden md:block" />
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 text-brand-primary hover:text-foreground transition-all duration-500 group"
            >
              <span>{t("back_to_top")}</span>
              <ArrowUp weight="bold" className="transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 group cursor-default">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/20 group-hover:text-brand-primary transition-colors">{t("standard")}</span>
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="h-10 w-10 border border-foreground/5 rounded-full flex items-center justify-center"
             >
                <Plus weight="bold" size={14} className="text-brand-primary/40" />
             </motion.div>
          </div>
        </div>

      </div>
    </footer>
  )
}
