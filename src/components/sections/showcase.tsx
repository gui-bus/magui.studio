"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

import { Project } from "@/src/types/sections"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react"
import {
  AnimatePresence,
  type PanInfo,
  m,
  useScroll,
  useTransform,
} from "framer-motion"

import { Section } from "@/src/components/ui/section"
import { StaggeredText } from "@/src/components/ui/staggeredText"

const AUTO_PLAY_DURATION = 6000
const DRAG_THRESHOLD = 80
const SWIPE_THRESHOLD = 500

export function Showcase(): React.JSX.Element {
  const t = useTranslations("Index.Showcase")
  const idT = useTranslations("Index.Ids")
  const projects = t.raw("projects") as Project[]
  const hasMultipleProjects = projects.length > 1

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const [isPaused, setIsPaused] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"])

  const nextProject = React.useCallback((): void => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }, [projects.length])

  const prevProject = React.useCallback((): void => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }, [projects.length])

  const handleDragEnd = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
      setIsPaused(false)

      if (!hasMultipleProjects) return

      const swipePower = Math.abs(info.offset.x) * Math.abs(info.velocity.x)

      if (
        info.offset.x <= -DRAG_THRESHOLD ||
        (info.velocity.x < 0 && swipePower > SWIPE_THRESHOLD)
      ) {
        nextProject()
        return
      }

      if (
        info.offset.x >= DRAG_THRESHOLD ||
        (info.velocity.x > 0 && swipePower > SWIPE_THRESHOLD)
      ) {
        prevProject()
      }
    },
    [hasMultipleProjects, nextProject, prevProject]
  )

  React.useEffect((): (() => void) | void => {
    if (isPaused || !hasMultipleProjects) return

    const interval = setInterval(nextProject, AUTO_PLAY_DURATION)
    return () => clearInterval(interval)
  }, [hasMultipleProjects, isPaused, nextProject])

  const activeProject = projects[currentIndex]
  const carouselClassName = hasMultipleProjects
    ? "grid cursor-grab grid-cols-1 items-center gap-8 touch-pan-y lg:grid-cols-12 lg:gap-16"
    : "grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"

  return (
    <Section
      id={idT("portfolio")}
      ref={containerRef}
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32 lg:pt-64"
      withContainer={true}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <m.div
        style={{ x: backgroundX }}
        className="pointer-events-none absolute right-0 top-0 z-0 -translate-y-1/4 select-none"
      >
        <span className="whitespace-nowrap text-[110px] font-black uppercase leading-none text-foreground/2 md:text-[200px] lg:text-[350px] dark:text-white/1">
          {t("background_text")}
        </span>
      </m.div>

      <div className="relative z-10 mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between lg:mb-32">
        <div className="space-y-6 sm:space-y-8">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <div className="h-px w-10 bg-brand-primary sm:w-12" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-brand-primary sm:text-[11px] sm:tracking-[0.5em]">
              {t("eyebrow")}
            </span>
          </m.div>

          <h2 className="font-heading text-4xl font-black uppercase tracking-[-0.04em] leading-[0.82] sm:text-6xl md:text-7xl lg:text-9xl">
            {t("title")}
          </h2>
        </div>

        {hasMultipleProjects ? (
          <div className="flex items-center gap-3 self-start sm:gap-4">
            <button
              type="button"
              onClick={prevProject}
              aria-label="Projeto anterior"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur-sm transition-all duration-500 hover:border-foreground hover:bg-foreground hover:text-background active:scale-90 sm:h-14 sm:w-14 md:h-16 md:w-16"
            >
              <ArrowLeftIcon
                weight="bold"
                size={20}
                className="transition-transform duration-500 group-hover:-translate-x-1 md:size-6"
              />
            </button>

            <div className="flex min-w-28 flex-col items-center gap-3 rounded-full border border-border/60 bg-background/75 px-4 py-3 backdrop-blur-sm sm:min-w-32 sm:px-5">
              <div className="overflow-hidden font-mono text-[0.72rem] font-bold tracking-[0.28em] text-foreground/65 sm:text-xs">
                <AnimatePresence mode="wait">
                  <m.span
                    key={currentIndex}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    className="block text-center"
                  >
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </m.span>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-1.5">
                {projects.map((_, index) => {
                  const isActive = index === currentIndex

                  return (
                    <div
                      key={index}
                      className={[
                        "h-1 rounded-full transition-all duration-500",
                        isActive
                          ? "w-10 bg-brand-primary"
                          : "w-3 bg-foreground/15",
                      ].join(" ")}
                    >
                      {isActive ? (
                        <m.div
                          key={`progress-${currentIndex}-${isPaused}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={
                            isPaused
                              ? { duration: 0.2 }
                              : {
                                  duration: AUTO_PLAY_DURATION / 1000,
                                  ease: "linear",
                                }
                          }
                          className="h-full rounded-full bg-brand-primary"
                        />
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={nextProject}
              aria-label="Pr�ximo projeto"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur-sm transition-all duration-500 hover:border-foreground hover:bg-foreground hover:text-background active:scale-90 sm:h-14 sm:w-14 md:h-16 md:w-16"
            >
              <ArrowRightIcon
                weight="bold"
                size={20}
                className="transition-transform duration-500 group-hover:translate-x-1 md:size-6"
              />
            </button>
          </div>
        ) : null}
      </div>

      <div className="relative z-10 min-h-[34rem] sm:min-h-[42rem] lg:min-h-[53rem]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <m.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            drag={hasMultipleProjects ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={handleDragEnd}
            className={carouselClassName}
            whileDrag={{ cursor: "grabbing" }}
          >
            <div className="group/img relative aspect-[4/3] sm:aspect-video lg:col-span-7 lg:aspect-[16/10]">
              <m.div
                initial={{
                  clipPath:
                    direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
                }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                exit={{
                  clipPath:
                    direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full overflow-hidden shadow-2xl"
              >
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 60vw"
                  className="object-cover scale-[1.02] transition-transform duration-[4s] ease-out group-hover/img:scale-105 sm:object-contain sm:group-hover/img:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </m.div>

              <div className="absolute -left-2 -top-2 z-20 h-10 w-10 border-l-2 border-t-2 border-brand-primary/40 sm:-left-4 sm:-top-4 sm:h-16 sm:w-16" />
              <div className="absolute -bottom-2 -right-2 z-20 h-10 w-10 border-b-2 border-r-2 border-brand-primary/40 sm:-bottom-4 sm:-right-4 sm:h-16 sm:w-16" />
            </div>

            <div className="lg:col-span-5">
              <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                <div className="overflow-hidden">
                  <m.h2
                    key={activeProject.title}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1,
                    }}
                    className="font-heading text-4xl font-black uppercase tracking-tighter leading-[0.82] text-foreground sm:text-6xl md:text-7xl lg:text-[110px]"
                  >
                    <StaggeredText text={activeProject.title} />
                  </m.h2>
                </div>
              </div>

              <div className="pt-6 sm:pt-8">
                <Link
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex w-full items-center justify-between gap-6 rounded-full bg-foreground px-6 py-4 text-background transition-all duration-500 hover:scale-[1.02] active:scale-95 dark:bg-white dark:text-black sm:w-auto sm:gap-8 sm:px-10 sm:py-6 lg:gap-10 lg:px-14 lg:py-8"
                >
                  <span className="text-xs font-black uppercase tracking-[0.32em] sm:text-sm sm:tracking-[0.4em]">
                    {t("view_project")}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-current transition-all duration-500 group-hover/btn:border-brand-primary group-hover/btn:bg-brand-primary group-hover/btn:text-white sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                    <ArrowUpRightIcon
                      weight="bold"
                      size={22}
                      className="transition-transform duration-500 group-hover/btn:rotate-45"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
