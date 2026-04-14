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
      className="pt-24 md:pt-32 lg:pt-40"
      withContainer={true}
    >
      <div className="space-y-16 lg:space-y-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="space-y-8 lg:max-w-[60rem]">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
                {t("eyebrow")}
              </span>
            </div>

            <h2 className="font-heading text-5xl font-black uppercase leading-[0.76] tracking-[-0.06em] text-foreground md:text-7xl lg:text-[136px]">
              <span className="block">
                <StaggeredText text={t("title_1")} />
              </span>
              <span className="mt-3 block text-brand-primary">
                <StaggeredText text={t("title_2")} />
              </span>
            </h2>
          </div>

          <div className="lg:max-w-3xl lg:self-end">
            <div className="relative overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/[0.02] p-8 md:p-10">
              <div className="absolute left-0 top-0 h-10 w-10 border-b border-r border-brand-primary/28" />
              <p className="text-xl font-medium leading-tight tracking-tight text-muted-foreground md:text-2xl lg:text-3xl">
                {t("description")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px border border-foreground/8 bg-foreground/8 lg:grid-cols-3">
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
    <article className="group relative isolate min-h-[28rem] overflow-hidden bg-background lg:min-h-[36rem]">
      <Image
        src={image}
        alt={discipline.title}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-background transition-colors duration-700 group-hover:bg-black/72" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col justify-between p-8 md:p-10 lg:p-12">
        <div className="flex items-start justify-between gap-6">
          <span className="text-[11px] font-black uppercase tracking-[0.45em] text-brand-primary">
            {discipline.label}
          </span>
          <span
            className={cn(
              "font-heading text-4xl font-black leading-none transition-colors duration-700 md:text-5xl",
              index === 1 ? "text-foreground/18" : "text-foreground/14",
              "group-hover:text-white/72"
            )}
          >
            {discipline.id}
          </span>
        </div>

        <div className="space-y-8">
          <h3 className="max-w-[10ch] font-heading text-4xl font-black uppercase leading-[0.86] tracking-[-0.05em] text-foreground transition-colors duration-700 md:text-5xl lg:text-6xl group-hover:text-white">
            {discipline.title}
          </h3>

          <div className="space-y-5">
            <div className="h-px w-16 bg-brand-primary/45 transition-colors duration-700 group-hover:bg-white/34" />
            <p className="text-lg font-medium leading-relaxed text-muted-foreground transition-colors duration-700 md:text-xl group-hover:text-white/78">
              {discipline.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
