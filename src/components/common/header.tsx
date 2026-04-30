"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import Image from "next/image"
import { ArrowUpRight } from "@phosphor-icons/react"

import { Link } from "@/src/i18n/navigation"
import { AnimatePresence, m } from "framer-motion"

import { NavLink } from "@/src/components/ui/navLink"

import { cn } from "@/src/lib/utils/utils"

import { siteConfig } from "@/src/config/site"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const LanguageSwitcher = dynamic(
  () =>
    import("@/src/components/common/languageSwitcher").then(
      (module) => module.LanguageSwitcher
    ),
  {
    loading: (): React.JSX.Element => (
      <div className="h-9 w-24 animate-pulse rounded-full border border-border/50 bg-muted/20" />
    ),
  }
)

const ThemeToggle = dynamic(
  () =>
    import("@/src/components/common/themeToggle").then(
      (module) => module.ThemeToggle
    ),
  {
    loading: (): React.JSX.Element => (
      <div className="h-9 w-18 animate-pulse rounded-full border border-border/50 bg-muted/20" />
    ),
  }
)

export const Header = React.memo(function Header(): React.JSX.Element {
  const t = useTranslations("Index.Nav")
  const idT = useTranslations("Index.Ids")
  const dashboardHref = "https://dashboard.magui.studio"
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null)
  const lastFocusedElementRef = React.useRef<HTMLElement | null>(null)
  const previousBodyOverflowRef = React.useRef("")

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    if (isOpen) {
      previousBodyOverflowRef.current = document.body.style.overflow
      lastFocusedElementRef.current =
        document.activeElement as HTMLElement | null
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = previousBodyOverflowRef.current
    }

    return () => {
      document.body.style.overflow = previousBodyOverflowRef.current
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) {
      lastFocusedElementRef.current?.focus()
      return
    }

    const menuElement = menuRef.current

    if (!menuElement) {
      return
    }

    const focusableElements = Array.from(
      menuElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    )
    const firstFocusableElement = focusableElements[0]
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1] ?? firstFocusableElement

    firstFocusableElement?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setIsOpen(false)
        toggleButtonRef.current?.focus()
        return
      }

      if (event.key !== "Tab" || focusableElements.length === 0) {
        return
      }

      const activeElement = document.activeElement as HTMLElement | null

      if (event.shiftKey && activeElement === firstFocusableElement) {
        event.preventDefault()
        lastFocusableElement?.focus()
        return
      }

      if (!event.shiftKey && activeElement === lastFocusableElement) {
        event.preventDefault()
        firstFocusableElement?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const navLinks = React.useMemo(
    () => [
      { href: "/", label: t("home") },
      { href: `/#${idT("portfolio")}`, label: t("portfolio") },
      { href: `/#${idT("services")}`, label: t("services") },
      { href: siteConfig.method.path, label: t("method") },
      { href: siteConfig.studio.path, label: t("about") },
      { href: siteConfig.contact.path, label: t("contact") },
    ],
    [idT, t]
  )

  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "inset(0% 0% 100% 0%)",
      transition: {
        duration: 0.8,
        ease: EASE_APPLE,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.8,
        ease: EASE_APPLE,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: 50 },
    open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_APPLE } },
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2 flex h-24 w-full max-w-440 items-center justify-between px-6 transition-all duration-700 md:px-10 2xl:px-20",
          isOpen ? "z-220" : "z-100",
          scrolled || isOpen
            ? "bg-background/80 backdrop-blur-xl"
            : " bg-transparent backdrop-blur-none"
        )}
      >
        <div className="relative z-220 flex min-w-0 shrink items-center gap-6 2xl:gap-8">
          <Link
            href="/"
            className="flex h-full shrink-0 items-center"
            aria-label={t("home_label")}
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/logos/LOGO_VAR_03_DM.svg"
              alt={t("logo_alt")}
              width={0}
              height={0}
              sizes="100vw"
              className="h-6 w-auto min-w-28 object-contain dark:hidden 2xl:min-w-32"
            />
            <Image
              src="/logos/LOGO_VAR_03_LM.svg"
              alt={t("logo_alt")}
              width={0}
              height={0}
              sizes="100vw"
              className="hidden h-6 w-auto min-w-28 object-contain dark:block 2xl:min-w-32"
            />
          </Link>

          <div className="hidden shrink-0 items-center gap-5 border-l border-foreground/10 pl-6 2xl:flex">
            <nav
              className="hidden min-w-0 items-center 2xl:flex"
              aria-label={t("main_nav_label")}
            >
              <div className="flex min-w-0 items-center gap-6 2xl:gap-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    className="whitespace-nowrap"
                  />
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-6 2xl:flex-1 2xl:gap-8">
          <div className="hidden shrink-0 items-center gap-4 2xl:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href={dashboardHref}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand-primary px-4 text-sm font-medium whitespace-nowrap text-white shadow-lg shadow-brand-primary/12 transition-all duration-300 hover:bg-brand-primary/92 hover:shadow-xl hover:shadow-brand-primary/18 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <span>{t("client_area")}</span>
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                weight="regular"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-220 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-foreground/5 bg-foreground/5 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary 2xl:hidden"
            aria-label={isOpen ? t("close_menu") : t("open_menu")}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <m.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 4 : 0,
                width: isOpen ? 24 : 16,
              }}
              className="h-0.5 bg-foreground rounded-full origin-center"
              aria-hidden="true"
            />
            <m.span
              animate={{
                opacity: isOpen ? 0 : 1,
                x: isOpen ? 10 : 0,
                width: 24,
              }}
              className="h-0.5 bg-foreground rounded-full"
              aria-hidden="true"
            />
            <m.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -4 : 0,
                width: isOpen ? 24 : 16,
              }}
              className="h-0.5 bg-foreground rounded-full origin-center"
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("mobile_nav_label")}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-190 overflow-y-auto overflow-x-hidden bg-background px-6 pt-24 pb-8 md:px-12"
          >
            <div className="absolute top-0 right-0 h-full w-1/4 border-l border-foreground/5 bg-muted/20 -z-10 hidden md:block" />
            <div className="absolute -bottom-10 right-0 -z-10 opacity-[0.03] select-none pointer-events-none">
              <span className="text-[130px] font-black uppercase tracking-tighter rotate-90 origin-bottom-right">
                MAGUI
              </span>
            </div>

            <div className="relative flex min-h-full flex-col">
              <nav className="flex flex-col gap-3 md:gap-4">
                <m.div variants={itemVariants} className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">
                    {t("main_nav_label")}
                  </span>
                </m.div>

                {navLinks.map((link) => (
                  <m.div key={link.href} variants={itemVariants}>
                    <NavLink
                      href={link.href}
                      label={link.label}
                      variant="mobile"
                      onClick={() => setIsOpen(false)}
                    />
                  </m.div>
                ))}
              </nav>

              <m.div
                variants={itemVariants}
                className="mt-10 border-t border-foreground/10 pt-6 md:mt-14 md:pt-8"
              >
                <div className="flex flex-col gap-4">
                  <a
                    href={dashboardHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 text-sm font-medium text-white shadow-lg shadow-brand-primary/12 transition-all duration-300 hover:bg-brand-primary/92 hover:shadow-xl hover:shadow-brand-primary/18 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  >
                    <span>{t("client_area")}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={16}
                      weight="regular"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">
                    {t("preferences")}
                  </span>
                  <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </m.div>

              <m.div
                variants={itemVariants}
                className="mt-auto pt-10 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span>{t("studio_year")}</span>
                  <span className="h-1 w-1 rounded-full bg-brand-primary/40" />
                  <span>{t("technical_rigor")}</span>
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
})
