"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

import { LanguageSwitcher } from "@/src/components/common/languageSwitcher"
import { ThemeToggle } from "@/src/components/common/themeToggle"

export function Header(): React.JSX.Element {
  const { resolvedTheme } = useTheme()
  const { scrollY } = useScroll()
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(var(--background), 0)", "rgba(var(--background), 0.8)"]
  )
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(24px)"]
  )

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Switch between LM (Light Mode - dark text) and DM (Dark Mode - light text)
  // Both are the colored versions (VAR_02)
  const logoSrc = resolvedTheme === "dark" 
    ? "/Logos/LOGO_VAR_02_DM.png" 
    : "/Logos/LOGO_VAR_02_LM.png"

  return (
    <motion.header
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className=" z-50 flex h-24 items-center justify-between px-6 md:px-12 lg:px-24"
    >
      <Link href="/" className="flex items-center">
        {mounted && (
          <Image 
            src={logoSrc} 
            alt="MAGUI.studio" 
            width={160} 
            height={44} 
            className="h-9 w-auto object-contain"
            priority
          />
        )}
      </Link>

      <div className="flex items-center gap-4 md:gap-10">
        <nav className="hidden lg:flex items-center gap-8 mr-4">
           <Link href="#portfolio" className="text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/50 hover:text-brand-primary transition-colors">Cases</Link>
           <Link href="#services" className="text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/50 hover:text-brand-primary transition-colors">Expertise</Link>
        </nav>
        <div className="flex items-center gap-4 border-l border-foreground/5 pl-8">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  )
}
