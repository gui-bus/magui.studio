"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { useTheme } from "next-themes"

import { Plus } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Footer(): React.JSX.Element {
  const t = useTranslations("Config")
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const logoSrc = resolvedTheme === "dark" 
    ? "/Logos/LOGO_VAR_02_DM.png" 
    : "/Logos/LOGO_VAR_02_LM.png"

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
              {t("description")}
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
                {["Services", "Showcase", "About"].map((link) => (
                  <li key={link}>
                    <Link href={`#${link.toLowerCase()}`} className="text-lg font-bold uppercase tracking-tighter text-foreground hover:text-brand-primary transition-colors duration-300 block">
                      {link}
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
                  <li key={link}>
                    <Link href="#" className="text-lg font-bold uppercase tracking-tighter text-foreground hover:text-brand-primary transition-colors duration-300 block">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10 hidden md:block">
              <div className="flex items-center gap-3">
                 <Plus weight="bold" size={10} className="text-brand-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Studio</span>
              </div>
              <div className="space-y-6 text-sm font-medium text-muted-foreground leading-relaxed">
                 <p>Est. 2026 — Global Strategy</p>
                 <p>Available for International Projects</p>
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
             className="text-7xl md:text-[160px] lg:text-[280px] xl:text-[360px] font-black leading-none text-foreground uppercase tracking-[-0.08em] select-none text-center"
           >
             MAGUI<span className="text-[0.2em] align-top text-brand-primary">®</span>
           </motion.h2>
        </div>

        {/* BOTTOM CREDITS */}
        <div className="pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">
            <span>© {new Date().getFullYear()} MAGUI.studio</span>
            <div className="h-1 w-1 rounded-full bg-foreground/10" />
            <span>Privacy Policy</span>
          </div>
          
          <div className="flex items-center gap-4 group cursor-default">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/20 group-hover:text-brand-primary transition-colors">Digital Authority Standard</span>
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
