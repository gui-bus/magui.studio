"use client"

import * as React from "react"

import { LazyMotion, domAnimation } from "framer-motion"

interface MotionProviderProps {
  children: React.ReactNode
}

export function MotionProvider({
  children,
}: MotionProviderProps): React.JSX.Element {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
