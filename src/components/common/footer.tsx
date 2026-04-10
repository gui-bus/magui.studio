"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { useTheme } from "next-themes"

import { Plus, ArrowUp } from "@phosphor-icons/react"
import { m } from "framer-motion"
import { NavLink } from "@/src/components/ui/navLink"

export const Footer = React.memo(function Footer(): React.JSX.Element {
  const t = useTranslations("Footer")
  const configT = useTranslations("Config")
  const navT = useTranslations("Index.Nav")
  const idT = useTranslations("Index.Ids")
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const logoSrc = React.useMemo(() => 
    resolvedTheme === "dark" 
      ? "/logos/LOGO_VAR_03_LM.svg" 
      : "/logos/LOGO_VAR_03_DM.svg"
  , [resolvedTheme])

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const navigationLinks = React.useMemo(() => [
    { id: "about", label: navT("about") },
    { id: "services", label: navT("services") },
    { id: "portfolio", label: navT("portfolio") },
    { id: "faq", label: navT("faq") }
  ], [navT])

  const socialLinks = ["Instagram", "LinkedIn", "Behance"]

  return (
    <footer className="w-full bg-background pt-32 pb-12 border-t border-foreground/5 overflow-hidden" aria-label="Site Footer">
      <div className="px-6 lg:px-12">
        
        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-12 items-start mb-48">
          
          {/* BRAND BLOCK */}
          <div className="lg:col-span-5 space-y-16">
            <div className="relative h-12 w-64">
              {mounted && (
                <Image 
                  src={logoSrc} 
                  alt="MAGUI.studio Branding" 
                  fill 
                  sizes="256px"
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
                 <Plus weight="bold" size={10} className="text-brand-primary" aria-hidden="true" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Navigation</span>
              </div>
              <ul className="space-y-6">
                {navigationLinks.map((link) => (
                  <li key={link.id} className="group overflow-hidden">
                    <NavLink 
                      href={`#${idT(link.id)}`} 
                      label={link.label}
                      variant="footer"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-3">
                 <Plus weight="bold" size={10} className="text-brand-primary" aria-hidden="true" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">Social</span>
              </div>
              <ul className="space-y-6">
                {socialLinks.map((link) => (
                  <li key={link} className="group overflow-hidden">
                    <NavLink 
                      href="#" 
                      label={link}
                      variant="footer"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10 hidden md:block">
              <div className="flex items-center gap-3">
                 <Plus weight="bold" size={10} className="text-brand-primary" aria-hidden="true" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">{t("studio_title")}</span>
              </div>
              <div className="space-y-6 text-sm font-medium text-muted-foreground/80 leading-relaxed">
                 <p>{t("established")}</p>
                 <p>{t("availability")}</p>
              </div>
            </div>

          </div>
        </div>

        {/* MASSIVE SIGNATURE LOGO */}
        <div className="relative w-full mb-24 overflow-hidden py-12">
           <m.h2 
             initial={{ opacity: 0, y: 100 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="text-7xl md:text-[160px] lg:text-[280px] xl:text-[360px] font-black leading-none text-foreground uppercase tracking-[-0.08em] select-none text-center relative"
           >
             MAGUI
           </m.h2>
        </div>

        {/* BOTTOM CREDITS */}
        <div className="pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/70">
            <span>{t("credits", { year: new Date().getFullYear() })}</span>
            
            <div className="h-px w-8 bg-foreground/10 hidden md:block" aria-hidden="true" />
            
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 text-brand-primary hover:text-foreground transition-all duration-500 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-full px-2"
              aria-label="Scroll to Top"
            >
              <span>{t("back_to_top")}</span>
              <ArrowUp weight="bold" className="transition-transform group-hover:-translate-y-1" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
})
