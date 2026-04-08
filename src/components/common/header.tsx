"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

import { LanguageSwitcher } from "@/src/components/common/languageSwitcher"
import { ThemeToggle } from "@/src/components/common/themeToggle"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Header(): React.JSX.Element {
  const t = useTranslations("Index.Nav")
  const idT = useTranslations("Index.Ids")
  const { resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const logoSrc = resolvedTheme === "dark" 
    ? "/Logos/LOGO_VAR_02_DM.png" 
    : "/Logos/LOGO_VAR_02_LM.png"

  const navLinks = [
    { href: `#${idT("portfolio")}`, label: t("portfolio") },
    { href: `#${idT("services")}`, label: t("services") },
    { href: `#${idT("about")}`, label: t("about") },
    { href: `#${idT("faq")}`, label: t("faq") },
  ]

  return (
    <>
      <header className="relative w-full z-[100] flex h-32 items-center justify-between px-6 md:px-12 lg:px-24 border-b border-foreground/5 bg-background">
        {/* LOGO */}
        <Link href="/" className="relative z-[110] flex items-center h-full">
          {mounted && (
            <Image 
              src={logoSrc} 
              alt="MAGUI.studio" 
              width={160} 
              height={44} 
              className="h-8 md:h-9 w-auto object-contain"
              priority
            />
          )}
        </Link>

        {/* DESKTOP NAV */}
        <div className="flex items-center gap-12">
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="group relative text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 hover:text-brand-primary transition-colors duration-500"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6 border-l border-foreground/10 pl-8">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[110] h-10 w-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
              className="h-[2px] w-6 bg-foreground rounded-full origin-center"
            />
            <motion.span 
              animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 10 : 0 }}
              className="h-[2px] w-6 bg-foreground rounded-full"
            />
            <motion.span 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
              className="h-[2px] w-6 bg-foreground rounded-full origin-center"
            />
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: EASE_APPLE }}
            className="fixed inset-0 z-[105] bg-background/80 flex flex-col justify-center px-6 md:px-12"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: EASE_APPLE }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter text-foreground hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-20 pt-12 border-t border-foreground/10 flex items-center gap-8"
            >
              <LanguageSwitcher />
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
