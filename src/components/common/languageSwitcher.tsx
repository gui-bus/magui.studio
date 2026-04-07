"use client"

import * as React from "react"

import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { locales } from "@/src/i18n/config"
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import Cookies from "js-cookie"
import ReactCountryFlag from "react-country-flag"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

import { cn } from "@/src/lib/utils/utils"

const flagCodes: Record<string, string> = {
  en: "US",
  pt: "BR",
  es: "ES",
  de: "DE",
  fr: "FR",
  it: "IT",
}

export function LanguageSwitcher(): React.JSX.Element {
  const t = useTranslations("Locale")
  const currentLocale = useLocale()
  const router = useRouter()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  const handleLocaleChange = (newLocale: string): void => {
    if (newLocale === currentLocale) return
    Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 })
    router.refresh()
  }

  if (!mounted) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-full border border-border/50 bg-muted/20" />
    )
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <div className="group flex h-9 items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 backdrop-blur-sm transition-all hover:border-border hover:bg-muted/50">
          <div className="flex items-center gap-2">
            <ReactCountryFlag
              countryCode={flagCodes[currentLocale]}
              svg
              className="rounded-[2px] opacity-90 grayscale-[0.2] transition-all group-hover:grayscale-0"
              style={{ width: "1.1em", height: "0.8em" }}
            />
            <span className="text-xs font-medium text-muted-foreground uppercase transition-colors group-hover:text-foreground">
              {currentLocale}
            </span>
          </div>
          <CaretDownIcon
            size={12}
            className="text-muted-foreground/60 transition-colors group-hover:text-foreground"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-110 w-40 animate-in rounded-2xl border border-border/60 bg-background/95 p-1.5 shadow-xl shadow-black/5 backdrop-blur-xl duration-200 zoom-in-95 fade-in"
      >
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={cn(
              "group mb-0.5 flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-sm transition-all last:mb-0",
              currentLocale === loc
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-2.5">
              <ReactCountryFlag
                countryCode={flagCodes[loc]}
                svg
                className={cn(
                  "rounded-[2px] transition-all",
                  currentLocale === loc
                    ? "opacity-100"
                    : "opacity-60 grayscale-[0.4] group-hover:opacity-100 group-hover:grayscale-0"
                )}
                style={{ width: "1.2em", height: "0.9em" }}
              />
              <span className="tracking-tight">{t(loc)}</span>
            </div>
            {currentLocale === loc && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <CheckIcon
                  weight="bold"
                  size={12}
                  className="text-foreground/70"
                />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
