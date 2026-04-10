"use client"

import * as React from "react"

import { m } from "framer-motion"

import { VARIANTS_TEXT_REVEAL } from "@/src/config/animations"

interface StaggeredTextProps {
  text: string
  delayBase?: number
  className?: string
  once?: boolean
}

export const StaggeredText = React.memo(function StaggeredText({
  text,
  delayBase = 0,
  once = true,
}: StaggeredTextProps) {
  const words = React.useMemo(() => text.split(" "), [text])

  return (
    <span className="inline-flex flex-wrap">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden mr-[0.2em] last:mr-0"
        >
          <m.span
            custom={delayBase + i * 0.08}
            variants={VARIANTS_TEXT_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            className="inline-block"
          >
            {word}
          </m.span>
        </span>
      ))}
    </span>
  )
})
