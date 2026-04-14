import * as React from "react"

import { getTranslations } from "next-intl/server"
import Image from "next/image"
import Link from "next/link"

import { Section } from "@/src/components/ui/section"
import { ArrowUpRightIcon } from "@/src/components/ui/serverIcons"
import { StaggeredText } from "@/src/components/ui/staggeredText"

import { cn } from "@/src/lib/utils/utils"

interface ServiceShowcaseItem {
  id: string
  inquiryValue: "institutional" | "landing" | "sales"
  title: string
  label: string
  description: string
  image: string
  overlayClassName: string
}

const serviceImages = [
  "/images/landing.webp",
  "/images/sales.webp",
  "/images/institutional.webp",
] as const

export async function Services(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.Services")
  const idT = await getTranslations("Index.Ids")

  const services: ServiceShowcaseItem[] = [
    {
      id: "01",
      inquiryValue: "landing",
      title: t("landing.title"),
      label: t("landing.label"),
      description: t("landing.description"),
      image: serviceImages[0],
      overlayClassName:
        "from-brand-primary/94 via-brand-primary/84 to-brand-primary/68",
    },
    {
      id: "02",
      inquiryValue: "sales",
      title: t("sales.title"),
      label: t("sales.label"),
      description: t("sales.description"),
      image: serviceImages[1],
      overlayClassName: "from-black/92 via-zinc-900/84 to-zinc-800/70",
    },
    {
      id: "03",
      inquiryValue: "institutional",
      title: t("institutional.title"),
      label: t("institutional.label"),
      description: t("institutional.description"),
      image: serviceImages[2],
      overlayClassName:
        "from-brand-secondary/94 via-brand-secondary/84 to-brand-secondary/70",
    },
  ]

  return (
    <Section
      id={idT("services")}
      className="overflow-hidden py-24 md:py-32 lg:py-40"
      withContainer={true}
    >
      <div className="space-y-16 lg:space-y-24">
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="space-y-10">
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
              <span className="mt-3 block text-brand-primary">
                <StaggeredText text={t("title_2")} />
              </span>
            </h2>
          </div>

          <p className="max-w-4xl text-xl font-medium leading-tight tracking-tight text-muted-foreground md:text-3xl lg:text-4xl">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-foreground/8 bg-foreground/8 2xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="group relative isolate min-h-120 overflow-hidden bg-background lg:min-h-152"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br opacity-95 transition-opacity duration-700 group-hover:opacity-88",
                  service.overlayClassName
                )}
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[3rem_3rem] opacity-20" />

              <div className="relative flex h-full flex-col justify-between p-8 text-white md:p-10 lg:p-12">
                <div className="flex items-start justify-between gap-6">
                  <span className="font-heading text-5xl font-black leading-none text-white/24 md:text-6xl">
                    {service.id}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-white/30" />
                    <span className="text-[11px] font-black uppercase tracking-[0.45em] text-white/68">
                      {service.label}
                    </span>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="max-w-[11ch] font-heading text-4xl font-black uppercase leading-[0.84] tracking-[-0.05em] md:text-7xl">
                    <StaggeredText text={service.title} />
                  </h3>

                  <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/78 md:text-xl">
                    {service.description}
                  </p>

                  <Link
                    href={`/?service=${service.inquiryValue}#${idT("contact")}`}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-white/35 group-hover:bg-white/14"
                    aria-label={`${t("selection")} ${service.title}`}
                  >
                    <ArrowUpRightIcon size={20} weight="bold" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
