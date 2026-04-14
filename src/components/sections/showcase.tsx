"use client"

import * as React from "react"

import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import NextLink from "next/link"

import { AppLocale, getProjectCases } from "@/src/content/projects"
import { Link } from "@/src/i18n/navigation"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react"
import { AnimatePresence, m, useScroll, useTransform } from "framer-motion"

import { Section } from "@/src/components/ui/section"

import { trackEvent } from "@/src/lib/analytics"

const EASE_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface ProjectMetaItem {
  label: string
  value: string
}

export function Showcase(): React.JSX.Element {
  const locale = useLocale()
  const t = useTranslations("Index.Showcase")
  const idT = useTranslations("Index.Ids")
  const projects = getProjectCases(locale as AppLocale)
  const hasMultipleProjects = projects.length > 1

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const containerRef = React.useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"])
  const activeProject = projects[currentIndex]

  const projectMeta: ProjectMetaItem[] = [
    { label: t("sector_label"), value: activeProject.sector },
    { label: t("scope_label"), value: activeProject.scope },
    { label: t("year_label"), value: activeProject.year },
  ]

  const handleProjectSelect = React.useCallback(
    (index: number): void => {
      if (index === currentIndex) return

      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)

      trackEvent("select_content", {
        content_type: "portfolio_preview",
        item_id: projects[index]?.id ?? `project-${index}`,
      })
    },
    [currentIndex, projects]
  )

  const goToPreviousProject = React.useCallback((): void => {
    if (!hasMultipleProjects) return
    handleProjectSelect((currentIndex - 1 + projects.length) % projects.length)
  }, [currentIndex, handleProjectSelect, hasMultipleProjects, projects.length])

  const goToNextProject = React.useCallback((): void => {
    if (!hasMultipleProjects) return
    handleProjectSelect((currentIndex + 1) % projects.length)
  }, [currentIndex, handleProjectSelect, hasMultipleProjects, projects.length])

  return (
    <Section
      id={idT("portfolio")}
      ref={containerRef}
      className="relative overflow-hidden py-20 lg:py-32"
      withContainer={true}
    >
      <m.div
        style={{ x: backgroundX }}
        className="pointer-events-none absolute right-0 top-10 z-0 hidden select-none lg:block"
      >
        <span className="whitespace-nowrap text-[220px] font-black uppercase leading-none tracking-[-0.08em] text-foreground/[0.03]">
          {t("background_text")}
        </span>
      </m.div>

      <div className="relative z-10 space-y-10 lg:space-y-14">
        <header className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-end">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-px w-10 bg-brand-primary sm:w-12" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-brand-primary sm:text-[11px] sm:tracking-[0.5em]">
                {t("eyebrow")}
              </span>
            </div>

            <h2 className="max-w-5xl font-heading text-4xl font-black uppercase leading-[0.86] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
              {t("title")}
            </h2>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("description")}
            </p>
          </div>

          <aside className="rounded-[2rem] bg-muted/28 p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-brand-primary/80">
              {t("selection_label")}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("selection_description")}
            </p>
          </aside>
        </header>

        <div
          className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={t("projects_nav_label")}
        >
          {projects.map((project, index) => {
            const isActive = index === currentIndex

            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`showcase-panel-${project.id}`}
                onClick={() => handleProjectSelect(index)}
                className={[
                  "group min-w-[16rem] rounded-[1.75rem] px-4 py-4 text-left transition-all duration-500 sm:min-w-[18rem] sm:px-5",
                  isActive
                    ? "bg-brand-primary/[0.08] shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                    : "bg-muted/22 hover:bg-background/88",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary/80">
                      {project.year}
                    </p>
                    <p className="font-heading text-2xl font-black uppercase leading-none tracking-[-0.04em] text-foreground">
                      {project.title}
                    </p>
                  </div>
                  <span
                    className={[
                      "mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition-colors",
                      isActive ? "bg-brand-primary" : "bg-foreground/12",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {project.sector}
                </p>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.article
            key={activeProject.id}
            id={`showcase-panel-${activeProject.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.55, ease: EASE_SMOOTH }}
            className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-stretch"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-muted/20 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <Link
                href={{
                  pathname: "/projetos/[slug]",
                  params: { slug: activeProject.slug },
                }}
                onClick={() =>
                  trackEvent("select_content", {
                    content_type: "portfolio_case",
                    item_id: activeProject.id,
                  })
                }
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[16/11]">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain transition duration-700 group-hover:scale-[1.03]"
                    priority
                  />
                </div>
              </Link>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-[2rem] bg-background/90 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.05)] sm:p-7">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.34em] text-brand-primary/80">
                      {t("selected_case_label")}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl font-black uppercase leading-[0.88] tracking-[-0.05em] text-foreground sm:text-5xl">
                      {activeProject.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {activeProject.summary}
                    </p>
                  </div>

                  {hasMultipleProjects ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={goToPreviousProject}
                        aria-label={t("previous_project_label")}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-muted/55 text-foreground transition-all hover:bg-muted"
                      >
                        <ArrowLeftIcon size={18} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={goToNextProject}
                        aria-label={t("next_project_label")}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-muted/55 text-foreground transition-all hover:bg-muted"
                      >
                        <ArrowRightIcon size={18} weight="bold" />
                      </button>
                    </div>
                  ) : null}
                </div>

                <dl className="grid gap-3 sm:grid-cols-3">
                  {projectMeta.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.25rem] bg-muted/20 px-4 py-4"
                    >
                      <dt className="text-[10px] font-black uppercase tracking-[0.28em] text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className="mt-2 text-sm font-medium leading-relaxed text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {activeProject.notes[0]}
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={{
                      pathname: "/projetos/[slug]",
                      params: { slug: activeProject.slug },
                    }}
                    onClick={() =>
                      trackEvent("select_content", {
                        content_type: "portfolio_case",
                        item_id: activeProject.id,
                      })
                    }
                    className="group inline-flex flex-1 items-center justify-between gap-4 rounded-full bg-foreground px-5 py-4 text-background transition-all duration-500 hover:scale-[1.01] hover:bg-brand-primary dark:bg-white dark:text-black"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.28em]">
                      {t("view_project")}
                    </span>
                    <ArrowUpRightIcon
                      weight="bold"
                      size={18}
                      className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>

                  <NextLink
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackEvent("select_content", {
                        content_type: "live_project",
                        item_id: activeProject.id,
                      })
                    }
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-muted/45 px-5 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-foreground transition-all duration-500 hover:bg-muted"
                  >
                    {t("live_project")}
                    <ArrowSquareOutIcon
                      weight="bold"
                      size={18}
                      className="transition-transform duration-500 group-hover:-translate-y-0.5"
                    />
                  </NextLink>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {t("cta_note")}
                </p>
              </div>
            </div>
          </m.article>
        </AnimatePresence>
      </div>
    </Section>
  )
}
