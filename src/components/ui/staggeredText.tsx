"use client"

import * as React from "react"
import { m } from "framer-motion"

interface StaggeredTextProps {
  text: string
  delayBase?: number
  className?: string
  duration?: number
  once?: boolean
}

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const StaggeredText = React.memo(function StaggeredText({
  text,
  delayBase = 0,
  duration = 1.2,
  once = true
}: StaggeredTextProps) {
  const words = React.useMemo(() => text.split(" "), [text])

  return (
    <span className="inline-flex flex-wrap">
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
          <m.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once }}
            transition={{ 
              duration, 
              ease: EASE_APPLE, 
              delay: delayBase + (i * 0.08) 
            }}
            className="inline-block"
          >
            {word}
          </m.span>
        </span>
      ))}
    </span>
  )
})
