"use client"

import * as React from "react"

import { useMotionValue, useSpring } from "framer-motion"

export function useSpotlight(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const spotlightX = useSpring(mouseX, { damping: 50, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 50, stiffness: 200 })

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (
        !containerRef.current ||
        typeof window === "undefined" ||
        window.innerWidth < 1024
      )
        return

      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [containerRef, mouseX, mouseY]
  )

  return { spotlightX, spotlightY, handleMouseMove }
}
