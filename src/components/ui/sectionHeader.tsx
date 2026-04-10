import * as React from "react"

import { HTMLMotionProps, m } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"

import { VARIANTS_FADE_IN_UP } from "@/src/config/animations"

import { StaggeredText } from "./staggeredText"

interface SectionHeaderProps extends HTMLMotionProps<"div"> {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  eyebrowType?: "line" | "dot" | "double-line"
  className?: string
  titleClassName?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  eyebrowType = "line",
  className,
  titleClassName,
  ...props
}: SectionHeaderProps) {
  return (
    <m.div
      variants={VARIANTS_FADE_IN_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn(
        "mb-24 space-y-8",
        align === "center" && "text-center",
        className
      )}
      {...props}
    >
      <div className="space-y-8">
        {eyebrow && (
          <div
            className={cn(
              "flex items-center gap-4",
              align === "center" && "justify-center"
            )}
          >
            {(eyebrowType === "line" || eyebrowType === "double-line") && (
              <div className="h-px w-12 bg-brand-primary" />
            )}
            {eyebrowType === "dot" && (
              <div className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            )}

            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
              {eyebrow}
            </span>

            {eyebrowType === "double-line" && (
              <div className="h-px w-12 bg-brand-primary" />
            )}
          </div>
        )}

        <h2
          className={cn(
            "font-heading text-5xl md:text-7xl lg:text-[100px] font-black leading-[0.9] tracking-tight text-foreground uppercase",
            titleClassName
          )}
        >
          <StaggeredText text={title} />
        </h2>
      </div>

      {description && (
        <p
          className={cn(
            "max-w-3xl text-xl md:text-2xl text-muted-foreground/70 font-medium leading-relaxed",
            align === "left" && "border-l border-foreground/10 pl-8",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </m.div>
  )
}
