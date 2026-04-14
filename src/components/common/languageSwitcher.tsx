"use client"

import * as React from "react"

import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"

import { locales } from "@/src/i18n/config"
import { usePathname, useRouter } from "@/src/i18n/navigation"
import { CaretDown, Check } from "@phosphor-icons/react"
import { m } from "framer-motion"
import Cookies from "js-cookie"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

import { cn } from "@/src/lib/utils/utils"

const countryCodes: Record<string, string> = {
  en: "US",
  pt: "BR",
}

interface LocaleRouteParams {
  [key: string]: string | Array<string>
}

function toFlagEmoji(countryCode: string): string {
  return Array.from(countryCode.toUpperCase())
    .map((character) => String.fromCodePoint(127397 + character.charCodeAt(0)))
    .join("")
}

export function LanguageSwitcher(): React.JSX.Element {
  const t = useTranslations("Locale")
  const currentLocale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams<LocaleRouteParams>()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleLocaleChange = React.useCallback(
    (newLocale: string): void => {
      if (newLocale === currentLocale) return
      Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 })

      if (pathname === "/projetos/[slug]") {
        const slugParam = params.slug
        const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam

        if (slug) {
          router.replace({ pathname, params: { slug } }, { locale: newLocale })
        }

        return
      }

      router.replace(pathname as Exclude<typeof pathname, "/projetos/[slug]">, {
        locale: newLocale,
      })
    },
    [currentLocale, params, pathname, router]
  )

  if (!mounted) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-full border border-border/50 bg-muted/20" />
    )
  }

  const currentFlag = toFlagEmoji(countryCodes[currentLocale] ?? "US")

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <div className="group flex h-9 items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 backdrop-blur-sm transition-all hover:border-border hover:bg-muted/50">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="text-base leading-none opacity-90 transition-all group-hover:opacity-100"
            >
              {currentFlag}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
              {currentLocale}
            </span>
          </div>
          <CaretDown
            size={12}
            weight="bold"
            className="text-muted-foreground/60 transition-colors group-hover:text-foreground"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-110 w-40 rounded-2xl border border-border/60 bg-background/95 p-1.5 shadow-xl shadow-black/5 backdrop-blur-xl"
      >
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={cn(
              "group mb-0.5 flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-sm transition-all last:mb-0",
              currentLocale === loc
                ? "bg-muted font-bold text-brand-primary"
                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className={cn(
                  "text-base leading-none transition-all",
                  currentLocale === loc
                    ? "opacity-100"
                    : "opacity-60 group-hover:opacity-100"
                )}
              >
                {toFlagEmoji(countryCodes[loc] ?? "US")}
              </span>
              <span className="font-bold tracking-tight">{t(loc)}</span>
            </div>
            {currentLocale === loc && (
              <m.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Check weight="bold" size={12} className="text-brand-primary" />
              </m.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
