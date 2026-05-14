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
          <article className="xl:col-span-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)]">
              <div className="overflow-hidden rounded-4xl bg-[#F0F0F0]">
                <div className="relative h-88 w-full md:h-120">
                  <Image
                    src="/images/AVATAR.png"
                    alt={t("image_alt")}
                    fill
                    sizes="(max-width: 1280px) 100vw, 56vw"
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {highlights.map((highlight, index) => (
                    <div
                      key={highlight.id}
                      className="relative px-7 py-8 md:px-8 md:py-10"
                    >
                      <span className="absolute right-7 top-6 font-heading text-5xl font-black leading-none text-[#161616]/6">
                        0{index + 1}
                      </span>

                      <p className="relative text-[10px] font-black uppercase tracking-[0.35em] text-[#161616]/45">
                        {highlight.label}
                      </p>

                      <p className="relative mt-4 max-w-md text-lg font-semibold leading-snug text-[#161616]">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-4xl bg-[#161616] p-7 text-[#F0F0F0] md:p-8">
                  <span className="inline-flex rounded-full bg-white/8 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#F0F0F0]/60">
                    {t("badge")}
                  </span>

                  <h3 className="mt-8 font-heading text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-5xl">
                    {t("title")}
                  </h3>

                  <p className="mt-5 text-lg font-medium leading-relaxed text-[#F0F0F0]/72">
                    {t("panel_description")}
                  </p>
                </div>

                <div className="overflow-hidden rounded-4xl bg-[#F0F0F0]">
                  {principles.map((item, index) => (
                    <div
                      key={item}
                      className="grid grid-cols-[3rem_1fr] gap-4 px-6 py-5 md:px-7"
                    >
                      <div className="flex items-start justify-center">
                        <span className="font-heading text-lg font-black text-[#161616]/20">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="text-base font-medium leading-relaxed text-[#161616]/72">
                        {item}
                      </p>
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
                  <h3 className="font-heading text-4xl font-black uppercase leading-[0.88] tracking-tighter md:text-6xl">
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
