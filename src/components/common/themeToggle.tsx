"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { Moon, Sun } from "@phosphor-icons/react"

import { useThemeTransition } from "@/src/lib/hooks/useThemeTransition"
import { cn } from "@/src/lib/utils/utils"

export function ThemeToggle(): React.JSX.Element {
  const t = useTranslations("ThemeToggle")
  const { resolvedTheme, toggleTheme } = useThemeTransition()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-9 w-18 animate-pulse rounded-full border border-border/50 bg-muted/20" />
    )
  }

  const isLight = resolvedTheme === "light"

  return (
    <div className="group relative flex h-9 w-18 items-center rounded-full border border-border/60 bg-background/50 p-1 backdrop-blur-sm transition-all hover:border-border hover:bg-muted/50">
      <div
        className="absolute z-0 h-7 w-7 rounded-full bg-muted shadow-sm"
        style={{
          transform: `translateX(${isLight ? 0 : 34}px)`,
          transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <button
        type="button"
        onClick={() => (isLight ? null : toggleTheme())}
        className={cn(
          "relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-200",
          isLight
            ? "text-foreground"
            : "text-muted-foreground/50 hover:text-muted-foreground"
        )}
        aria-label={t("light")}
        title={t("light")}
      >
        <Sun
          weight={isLight ? "fill" : "regular"}
          size={14}
          className="transition-transform duration-300"
        />
      </button>

      <button
        type="button"
        onClick={() => (!isLight ? null : toggleTheme())}
        className={cn(
          "relative z-10 ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-200",
          !isLight
            ? "text-foreground"
            : "text-muted-foreground/50 hover:text-muted-foreground"
        )}
        aria-label={t("dark")}
        title={t("dark")}
      >
        <Moon
          weight={!isLight ? "fill" : "regular"}
          size={14}
          className="transition-transform duration-300"
        />
      </button>
    </div>
  )
}
