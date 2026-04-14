import * as React from "react"

import { getMessages, getTranslations } from "next-intl/server"
import Image from "next/image"

import { Discipline } from "@/src/types/sections"

import { Section } from "@/src/components/ui/section"
import {
  ArrowUpRightIcon,
  SquaresFourIcon,
} from "@/src/components/ui/serverIcons"
import { StaggeredText } from "@/src/components/ui/staggeredText"

export async function Manifesto(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.About")
  const idT = await getTranslations("Index.Ids")
  const messages = await getMessages()
  const principles = messages.Index.About.principles as string[]
  const highlights = messages.Index.About.highlights as Discipline[]
  const pillars = messages.Index.About.pillars as string[]

  return (
    <Section id={idT("about")} className="py-10 md:py-20" withContainer={true}>
      <div className="space-y-14 lg:space-y-20">
        <div className="max-w-6xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-brand-primary">
              {t("eyebrow")}
            </span>
          </div>

          <div className="space-y-8">
            <h2 className="font-heading text-5xl font-black uppercase leading-[0.82] tracking-[-0.06em] text-foreground md:text-7xl lg:text-[128px]">
              <span className="block">
                <StaggeredText text={t("title_1")} />
              </span>
              <span className="mt-2 block text-brand-primary lg:ml-28">
                <StaggeredText text={t("title_2")} />
              </span>
            </h2>

            <p className="max-w-5xl text-xl leading-tight tracking-tight md:text-3xl lg:text-[2.2rem]">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <article className="space-y-6 xl:col-span-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.9fr)]">
              <div
                className="relative overflow-hidden border border-foreground/8 bg-background"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 64px) 0, 100% 64px, 100% 100%, 0 100%)",
                }}
              >
                <div className="relative h-88 w-full md:h-120">
                  <Image
                    src="/images/manifesto.webp"
                    alt={t("image_alt")}
                    fill
                    sizes="(max-width: 1280px) 100vw, 56vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 grid grid-cols-1 gap-px bg-white/20 md:grid-cols-2">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight.id}
                      className="bg-black/18 px-6 py-12 md:py-10 text-white md:text-black dark:text-white backdrop-blur-[2px]"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                        {highlight.label}
                      </p>
                      <p className="mt-3 max-w-md text-lg font-medium leading-snug">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-4  bg-background px-7 py-7">
                  <span className="inline-flex rounded-full  px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/72 dark:border-white/12 dark:text-white/70">
                    {t("badge")}
                  </span>

                  <div className="space-y-3">
                    <h3 className="font-heading text-4xl font-black uppercase tracking-[-0.05em] text-foreground md:text-5xl dark:text-white">
                      {t("title")}
                    </h3>
                    <p className="text-lg font-medium leading-relaxed text-foreground/68 dark:text-white/68">
                      {t("panel_description")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-px overflow-hidden border border-foreground/8 bg-foreground/8 dark:border-white/10 dark:bg-white/8">
                  {principles.map((item) => (
                    <div
                      key={item}
                      className="bg-background px-6 py-6 text-base font-medium leading-relaxed text-foreground/72 dark:bg-white/4 dark:text-white/72"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="xl:col-span-4">
            <div className="flex h-full flex-col justify-between gap-6  bg-foreground px-8 py-8 text-background dark:border-white/10 dark:bg-white dark:text-black">
              <div className="space-y-8">
                <span className="inline-flex rounded-full  px-4 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/68 dark:border-black/12 dark:text-black/62">
                  {t("panel_eyebrow")}
                </span>

                <div className="space-y-4">
                  <h3 className="font-heading text-4xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-6xl">
                    {t("panel_title")}
                  </h3>
                  <p className="text-lg font-medium leading-relaxed text-white/76 dark:text-black/72">
                    {t("sidebar_description")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {pillars.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-white/14 bg-white/7 px-5 py-5 dark:border-black/10 dark:bg-black/4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-black uppercase tracking-[0.35em] text-white/74 dark:text-black/70">
                        {item}
                      </span>
                      <ArrowUpRightIcon size={18} weight="bold" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] border border-white/12 bg-black/14 p-6 dark:border-black/10 dark:bg-black/6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/7 dark:border-black/10 dark:bg-black/4">
                    <SquaresFourIcon size={20} weight="bold" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.38em] text-white/60 dark:text-black/58">
                      {t("focus_label")}
                    </p>
                    <p className="text-base font-medium leading-snug text-white/84 dark:text-black/78">
                      {t("focus")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  )
}
