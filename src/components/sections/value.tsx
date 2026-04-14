import * as React from "react"

import { getMessages, getTranslations } from "next-intl/server"
import Image from "next/image"

import { Discipline } from "@/src/types/sections"

import { Section } from "@/src/components/ui/section"
import { StaggeredText } from "@/src/components/ui/staggeredText"

import { cn } from "@/src/lib/utils/utils"

interface ValueDisciplineCardProps {
  discipline: Discipline
  image: string
  index: number
}

const disciplineImages = [
  "/images/strategy.webp",
  "/images/code.webp",
  "/images/ui.webp",
] as const

export async function Value(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.Value")
  const idT = await getTranslations("Index.Ids")
  const messages = await getMessages()
  const disciplines = messages.Index.Value.disciplines as Discipline[]

  return (
    <Section
      id={idT("value")}
      className="pt-24 md:pt-26 lg:pt-40"
      withContainer={true}
    >
      <div className="space-y-14 md:space-y-16 lg:space-y-24">
        <div className="flex flex-col gap-10 md:gap-12 2xl:flex-row lg:gap-20">
          <div className="space-y-7 md:space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
                {t("eyebrow")}
              </span>
            </div>

            <h2 className="font-heading text-5xl font-black uppercase leading-[0.74] tracking-[-0.06em] text-foreground md:text-8xl 2xl:text-[136px]">
              <span className="block">
                <StaggeredText text={t("title_1")} />
              </span>
              <span className="mt-2 block text-brand-primary md:mt-3">
                <StaggeredText text={t("title_2")} />
              </span>
            </h2>
          </div>

          <div className="2xl:max-w-3xl 2xl:self-end">
            <div className="relative overflow-hidden">
              <p className="text-lg font-medium leading-snug tracking-tight text-muted-foreground md:text-xl lg:text-3xl">
                {t("description")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px border border-foreground/8 bg-foreground/8 2xl:grid-cols-3">
          {disciplines.map((discipline, index) => (
            <ValueDisciplineCard
              key={discipline.id}
              discipline={discipline}
              image={disciplineImages[index] ?? disciplineImages[0]}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function ValueDisciplineCard({
  discipline,
  image,
  index,
}: ValueDisciplineCardProps): React.JSX.Element {
  return (
    <article className="group relative isolate min-h-96 overflow-hidden bg-background md:min-h-104 lg:min-h-144">
      <Image
        src={image}
        alt={discipline.title}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-background transition-colors duration-700 group-hover:bg-black/72" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col justify-between p-7 md:p-8 lg:p-12">
        <div className="flex items-start justify-between gap-6">
          <span className="text-[11px] font-black uppercase tracking-[0.45em] text-brand-primary">
            {discipline.label}
          </span>
          <span
            className={cn(
              "font-heading text-4xl font-black leading-none transition-colors duration-700 md:text-[2.65rem] lg:text-5xl",
              index === 1 ? "text-foreground/18" : "text-foreground/14",
              "group-hover:text-white/72"
            )}
          >
            {discipline.id}
          </span>
        </div>

        <div className="space-y-6 md:space-y-7 lg:space-y-8">
          <h3 className="max-w-[10ch] font-heading text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-foreground transition-colors duration-700 md:text-[2.65rem] lg:text-6xl group-hover:text-white">
            {discipline.title}
          </h3>

          <div className="space-y-4 md:space-y-5">
            <div className="h-px w-16 bg-brand-primary/45 transition-colors duration-700 group-hover:bg-white/34" />
            <p className="text-base font-medium leading-relaxed text-muted-foreground transition-colors duration-700 md:text-lg lg:text-xl group-hover:text-white/78">
              {discipline.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
