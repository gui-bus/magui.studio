import * as React from "react"

import { getTranslations } from "next-intl/server"
import Image from "next/image"
import Link from "next/link"

import { Link as LocalizedLink } from "@/src/i18n/navigation"

import { Button } from "@/src/components/ui/button"
import { Section } from "@/src/components/ui/section"
import { ArrowUpRightIcon } from "@/src/components/ui/serverIcons"
import { StaggeredText } from "@/src/components/ui/staggeredText"

import { siteConfig } from "@/src/config/site"

export async function Hero(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.Hero")
  const idT = await getTranslations("Index.Ids")

  return (
    <Section
      id={idT("hero")}
      className="flex items-center"
      withContainer={false}
    >
      <div className="relative z-10 py-5 md:py-20 w-full px-6 md:px-12 lg:px-24">
        <div className="relative flex">
          <div className="relative z-30">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-brand-primary" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-brand-primary">
                {t("eyebrow")}
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-8xl 2xl:text-9xl font-black leading-[0.75] tracking-[-0.06em] text-foreground uppercase select-none mt-20 md:mt-0">
              <div className="block">
                <StaggeredText text={t("title_1")} />
              </div>
              <div className="flex flex-wrap ml-[0.5em] text-brand-primary drop-shadow-xl">
                <StaggeredText text={t("title_2")} />
              </div>
              <div className="block leading-[0.8] mt-2">
                <StaggeredText text={t("title_3")} />
              </div>
            </h1>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-[20%] lg:-translate-y-1/2 z-10 w-[80%] lg:w-[55%] aspect-16/10 lg:aspect-video overflow-hidden rounded-r-4xl">
            <Image
              src="/images/hero.webp"
              alt={t("image_alt")}
              fill
              fetchPriority="high"
              sizes="(max-width: 768px) 92vw, (max-width: 1280px) 72vw, 46vw"
              quality={68}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 md:via-background/10 to-transparent opacity-100" />
            <div className="absolute inset-0 bg-brand-primary/5 mix-blend-overlay" />
          </div>
        </div>

        <div className="mt-24 lg:mt-48 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 space-y-12">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium tracking-tight">
              {t("description")}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-12">
            <div className="flex flex-wrap items-center justify-center gap-10">
              <Button
                asChild={true}
                size="lg"
                className="group relative h-20 rounded-full bg-brand-primary px-12 text-white shadow-2xl shadow-brand-primary/20 transition-all duration-500 hover:scale-105"
              >
                <LocalizedLink href={siteConfig.contact.path} prefetch={false}>
                  <span className="relative z-10 flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-slate-950">
                    {t("cta")}
                    <ArrowUpRightIcon
                      weight="bold"
                      className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </LocalizedLink>
              </Button>

              <Link
                href="/#portfolio"
                prefetch={false}
                className="flex items-start gap-1 group flex-col"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground group-hover:text-brand-primary transition-colors">
                  {t("secondary_cta")}
                </span>
                <div className="h-px w-8 bg-muted-foreground/30 group-hover:w-full transition-all duration-500 group-hover:bg-brand-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
