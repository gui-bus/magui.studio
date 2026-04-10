"use client"

import * as React from "react"

import { useMotionValue, useSpring } from "framer-motion"

export function useMagnetic(strength: number = 0.1) {
  const magneticX = useMotionValue(0)
  const magneticY = useMotionValue(0)

  const springX = useSpring(magneticX, { damping: 20, stiffness: 150 })
  const springY = useSpring(magneticY, { damping: 20, stiffness: 150 })

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      const { clientX, clientY, currentTarget } = e
      const { left, top, width, height } = currentTarget.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)

      magneticX.set(x * strength)
      magneticY.set(y * strength)
    },
    [magneticX, magneticY, strength]
  )

  const reset = React.useCallback(() => {
    magneticX.set(0)
    magneticY.set(0)
  }, [magneticX, magneticY])

  return { x: springX, y: springY, handleMouseMove, reset }
}
