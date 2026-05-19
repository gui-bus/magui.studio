import * as React from "react"

import { getTranslations } from "next-intl/server"
import Image from "next/image"
import Link from "next/link"

import { Section } from "@/src/components/ui/section"
import {
  ArrowUpRightIcon,
  BracketsCurlyIcon,
  CompassRoseIcon,
  SquaresFourIcon,
  TargetIcon,
} from "@/src/components/ui/serverIcons"
import { StaggeredText } from "@/src/components/ui/staggeredText"

interface MaguiConnectFeature {
  icon: React.ComponentType<{
    className?: string
    size?: number
    weight?: "bold" | "duotone" | "fill" | "regular"
  }>
  title: string
}

export async function MaguiConnect(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.MaguiConnect")
  const idT = await getTranslations("Index.Ids")

  const features: MaguiConnectFeature[] = [
    { icon: SquaresFourIcon, title: t("features.0") },
    { icon: TargetIcon, title: t("features.1") },
    { icon: BracketsCurlyIcon, title: t("features.2") },
    { icon: CompassRoseIcon, title: t("features.3") },
  ]

  return (
    <Section
      id={idT("connect")}
      className="py-24 md:py-32 lg:py-40"
      withContainer={true}
    >
      <div className="grid gap-px border border-foreground/8 bg-foreground/8 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="relative overflow-hidden bg-background p-8 md:p-10 lg:p-14">
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
                {t("eyebrow")}
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-5xl font-black uppercase leading-[1.1] tracking-[-0.06em] text-foreground md:text-7xl 2xl:text-[118px]">
                <span className="block">
                  <StaggeredText text={t("title_1")} />
                </span>
                <span className="mt-3 block text-brand-primary">
                  <StaggeredText text={t("title_2")} />
                </span>
              </h2>

              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
                {t("description")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon

                return (
                  <div
                    key={feature.title}
                    className="flex min-h-18 items-center gap-4 rounded-2xl border border-foreground/8 bg-muted/20 px-4 py-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
                      <Icon size={24} weight="bold" />
                    </div>
                    <p className="text-sm font-medium leading-snug text-foreground md:text-base">
                      {feature.title}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="grid gap-4 border-t border-foreground/8 pt-8 md:grid-cols-[1fr_auto] md:items-end">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-brand-primary">
                  {t("offer_eyebrow")}
                </p>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {t("offer")}
                </p>
              </div>
            </div>

            <Link
              href={`/#${idT("contact")}`}
              prefetch={false}
              className="group inline-flex w-full min-h-16 items-center justify-between gap-4 rounded-2xl bg-brand-primary px-5 py-4 text-white transition-transform duration-500 hover:scale-[1.01]"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.28em]">
                {t("cta")}
              </span>
              <ArrowUpRightIcon
                size={18}
                weight="bold"
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </article>

        <article className="relative overflow-hidden bg-background p-3 md:p-4">
          <div className="relative h-full min-h-180 md:min-h-120 overflow-hidden rounded-[28px] border border-foreground/8 bg-background">
            <Image
              src="/images/MAGUIConnect.png"
              alt={t("image_alt")}
              fill
              sizes="(max-width: 1280px) 100vw, 45vw"
              className="object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black via-black/72 to-transparent" />

            <div className="relative flex h-full flex-col justify-between p-6 md:p-8 lg:p-10">
              <div className="max-w-xs rounded-2xl border border-white/12 bg-black/28 p-4 text-white backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-white/72">
                  {t("card_eyebrow")}
                </p>
                <p className="mt-3 text-2xl font-black uppercase leading-none tracking-[-0.05em]">
                  {t("card_title")}
                </p>
              </div>

              <div className="max-w-md space-y-4 text-white">
                <p className="text-sm font-black uppercase tracking-[0.28em] text-white/72">
                  {t("card_label")}
                </p>
                <p className="text-lg leading-relaxed text-white md:text-xl">
                  {t("card_description")}
                </p>
                <p className="text-5xl font-black tabular-nums tracking-[-0.08em] text-brand-primary md:text-6xl">
                  {t("price")}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Section>
  )
}
