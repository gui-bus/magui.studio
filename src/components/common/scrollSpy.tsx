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
      rootMargin: "-25% 0px -65% 0px", // Slightly adjusted for better precision
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id")
          if (id) {
            if (id === heroId) {
              // If it's the hero, remove the hash from URL
              window.history.replaceState(null, "", window.location.pathname)
            } else {
              // Update URL hash for other sections
              window.history.replaceState(null, "", `#${id}`)
            }
          }
        }
      });
    }, options)

    sections.forEach((section) => observer.observe(section))

    // Handle the case where the user scrolls to the very top manually
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
