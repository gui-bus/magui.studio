import * as React from "react"

import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { Section } from "@/src/components/ui/section"
import { ProjectInquiryForm } from "@/src/components/common/projectInquiryForm"

export async function Contact(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.CTA")
  const idT = await getTranslations("Index.Ids")
  const configT = await getTranslations("Config")

  return (
    <Section
      id={idT("contact")}
      className="border-t border-foreground/5 py-24 md:py-32 lg:py-40"
      withContainer={true}
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_minmax(0,1.2fr)] lg:items-start lg:gap-24">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="relative h-10 w-40 lg:h-12 lg:w-48">
              <Image
                src="/logos/LOGO_VAR_03_DM.svg"
                alt={configT("name")}
                fill
                className="object-contain object-left dark:hidden"
              />
              <Image
                src="/logos/LOGO_VAR_03_LM.svg"
                alt={configT("name")}
                fill
                className="hidden object-contain object-left dark:block"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-primary">
                {t("eyebrow")}
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] text-foreground md:text-7xl lg:text-8xl">
                {t("title")}
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("description")}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-foreground/[0.02] p-8">
            <p className="font-heading text-2xl font-black uppercase tracking-tight text-foreground">
              {t("cardTitle")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("cardDescription")}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 z-0 rounded-[2.5rem] bg-brand-primary/5 blur-3xl" />
          <div className="relative z-10 rounded-3xl border border-border/60 bg-background p-6 shadow-2xl shadow-black/5 md:p-10">
            <ProjectInquiryForm origin="contact" />
          </div>
        </div>
      </div>
    </Section>
  )
}
