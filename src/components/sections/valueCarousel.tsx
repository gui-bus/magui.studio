"use client"

import * as React from "react"

import Image from "next/image"

import { Discipline } from "@/src/types/sections"

import { cn } from "@/src/lib/utils/utils"

interface ValueDisciplineCarouselProps {
  disciplines: Discipline[]
  images: readonly string[]
}

interface ValueDisciplineCardProps {
  discipline: Discipline
  image: string
  index: number
  isActive: boolean
}

const AUTO_ROTATE_INTERVAL = 2400

export function ValueDisciplineCarousel({
  disciplines,
  images,
}: ValueDisciplineCarouselProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect((): (() => void) | void => {
    if (disciplines.length <= 1) return undefined

    const intervalId = window.setInterval((): void => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % disciplines.length)
    }, AUTO_ROTATE_INTERVAL)

    return (): void => {
      window.clearInterval(intervalId)
    }
  }, [disciplines.length])

  return (
    <>
      {disciplines.map((discipline, index) => (
        <ValueDisciplineCard
          key={discipline.id}
          discipline={discipline}
          image={images[index] ?? images[0] ?? ""}
          index={index}
          isActive={activeIndex === index}
        />
      ))}
    </>
  )
}

function ValueDisciplineCard({
  discipline,
  image,
  index,
  isActive,
}: ValueDisciplineCardProps): React.JSX.Element {
  return (
    <article className="relative isolate min-h-96 overflow-hidden bg-background 2xl:min-h-144">
      <Image
        src={image}
        alt={discipline.title}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        quality={index === 1 ? 48 : 56}
        className={cn(
          "object-cover transition-all duration-700",
          isActive ? "scale-105 opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-700",
          isActive ? "bg-black/72" : "bg-background"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)] transition-opacity duration-700",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="relative flex h-full flex-col justify-between p-7 md:p-8 lg:p-12">
        <div className="flex items-start justify-between gap-6">
          <span className="text-[11px] font-black uppercase tracking-[0.45em] text-brand-primary">
            {discipline.label}
          </span>
          <span
            className={cn(
              "font-heading text-4xl font-black leading-none transition-colors duration-700 md:text-[2.65rem] lg:text-5xl",
              index === 1 ? "text-foreground/35" : "text-foreground/30",
              isActive && "text-white/82"
            )}
          >
            {discipline.id}
          </span>
        </div>

        <div className="space-y-6 md:space-y-7 lg:space-y-8">
          <h3
            className={cn(
              "max-w-[10ch] font-heading text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] transition-colors duration-700 md:text-[2.65rem] lg:text-6xl",
              isActive ? "text-white" : "text-foreground"
            )}
          >
            {discipline.title}
          </h3>

          <div className="space-y-4 md:space-y-5">
            <div
              className={cn(
                "h-px w-16 transition-colors duration-700",
                isActive ? "bg-white/34" : "bg-brand-primary/45"
              )}
            />
            <p
              className={cn(
                "text-base font-medium leading-relaxed transition-colors duration-700 md:text-lg lg:text-xl",
                isActive ? "text-white/78" : "text-muted-foreground"
              )}
            >
              {discipline.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
