"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

export function ScrollSpy(): null {
  const idT = useTranslations("Index.Ids")
  const heroId = idT("hero")

  React.useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const options = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id")
          if (id) {
            if (id === heroId) {
              window.history.replaceState(null, "", window.location.pathname)
            } else {
              window.history.replaceState(null, "", `#${id}`)
            }
          }
        }
      })
    }, options)

    sections.forEach((section) => observer.observe(section))

    const handleScroll = () => {
      if (window.scrollY < 100) {
        window.history.replaceState(null, "", window.location.pathname)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [heroId])

  return null
}
