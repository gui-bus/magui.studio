import * as React from "react"

import { getMessages, getTranslations } from "next-intl/server"

import { Discipline } from "@/src/types/sections"

import { Section } from "@/src/components/ui/section"
import { StaggeredText } from "@/src/components/ui/staggeredText"

import { ValueDisciplineCarousel } from "@/src/components/sections/valueCarousel"

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

            <h2 className="font-heading text-5xl font-black uppercase leading-[1.2] tracking-[-0.06em] text-foreground md:text-8xl 2xl:text-[136px]">
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
          <ValueDisciplineCarousel
            disciplines={disciplines}
            images={disciplineImages}
          />
        </div>
      </div>
    </Section>
  )
}
