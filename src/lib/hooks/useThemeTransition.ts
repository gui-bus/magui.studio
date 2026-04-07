import { useCallback } from "react"

import { useTheme } from "next-themes"

import { createAnimation } from "../animations/themeAnimations"

interface UseThemeTransition {
  theme: string | undefined
  resolvedTheme: string | undefined
  toggleTheme: () => void
}

export function useThemeTransition(): UseThemeTransition {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const toggleTheme = useCallback((): void => {
    if (typeof window === "undefined") return

    const animation = createAnimation()
    let styleElement = document.getElementById(
      "theme-transition-styles"
    ) as HTMLStyleElement
    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = "theme-transition-styles"
      document.head.appendChild(styleElement)
    }
    styleElement.textContent = animation.css

    const currentTheme = resolvedTheme || theme
    const nextTheme = currentTheme === "light" ? "dark" : "light"

    if (!document.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    document.startViewTransition(async () => {
      setTheme(nextTheme)
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
  }, [theme, resolvedTheme, setTheme])

  return { theme, resolvedTheme, toggleTheme }
}
