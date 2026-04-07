"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { useTheme } from "next-themes"

export function Footer(): React.JSX.Element {
  const t = useTranslations("Config")
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const logoSrc = resolvedTheme === "dark" 
    ? "/Logos/LOGO_VAR_02_DM.png" 
    : "/Logos/LOGO_VAR_02_LM.png"

  return (
    <footer className="w-full bg-background px-6 py-24 md:px-12 lg:px-24 border-t border-foreground/5">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24">
          <div className="space-y-12 max-w-md">
            <div className="relative h-10 w-48">
              {mounted && (
                <Image 
                  src={logoSrc} 
                  alt="MAGUI.studio" 
                  fill 
                  className="object-contain"
                />
              )}
            </div>
            <p className="text-xl text-muted-foreground/50 leading-relaxed font-sans font-light">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-16">
            <div className="flex flex-wrap gap-12 justify-start md:justify-end">
               <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Connect</p>
                 <div className="flex flex-col gap-2">
                   <Link href="#" className="text-sm font-medium hover:text-brand-primary transition-colors">Instagram</Link>
                   <Link href="#" className="text-sm font-medium hover:text-brand-primary transition-colors">LinkedIn</Link>
                 </div>
               </div>
               <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Studio</p>
                 <div className="flex flex-col gap-2">
                   <Link href="#portfolio" className="text-sm font-medium hover:text-brand-primary transition-colors">Cases</Link>
                   <Link href="#services" className="text-sm font-medium hover:text-brand-primary transition-colors">Expertise</Link>
                 </div>
               </div>
            </div>
            
            <div className="pt-12 border-t border-foreground/5 w-full flex flex-col md:items-end gap-4">
              <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.3em]">
                © {new Date().getFullYear()} MAGUI.studio — All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
