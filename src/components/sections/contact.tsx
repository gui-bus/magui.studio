import * as React from "react"

import { getTranslations } from "next-intl/server"

import { Section } from "@/src/components/ui/section"

import { ProjectInquiryForm } from "@/src/components/common/projectInquiryForm"

import { getServerEnv } from "@/src/config/env"

export async function Contact(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.CTA")
  const idT = await getTranslations("Index.Ids")
  const serverEnv = getServerEnv()

  return (
    <Section
      id={idT("contact")}
      className="py-24 md:py-32 lg:py-40"
      withContainer={true}
    >
      <div className="space-y-10">
        <header className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-brand-primary" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-primary">
              {t("eyebrow")}
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="max-w-3xl font-heading text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-foreground md:text-6xl">
              {t("title")}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("description")}
            </p>
          </div>
        </header>

        <React.Suspense fallback={null}>
          <ProjectInquiryForm
            origin="contact"
            web3FormsAccessKey={serverEnv.WEB3FORMS_ACCESS_KEY}
          />
        </React.Suspense>
      </div>
    </Section>
  )
}
