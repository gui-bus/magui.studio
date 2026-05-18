import * as React from "react"

import { getTranslations } from "next-intl/server"
import dynamic from "next/dynamic"

import { Section } from "@/src/components/ui/section"
import { StaggeredText } from "@/src/components/ui/staggeredText"

const ProjectInquiryForm = dynamic(() =>
  import("@/src/components/common/projectInquiryForm").then(
    (module) => module.ProjectInquiryForm
  )
)

export async function Contact(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.CTA")
  const idT = await getTranslations("Index.Ids")
  const contactTitleParts = t("title").split(" ")
  const contactTitlePrimary = contactTitleParts.slice(0, -2).join(" ")
  const contactTitleAccent = contactTitleParts.slice(-2).join(" ")

  return (
    <Section
      id={idT("contact")}
      className="py-24 md:py-32 lg:py-40"
      withContainer={true}
    >
      <div className="space-y-14 lg:space-y-18">
        <header className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-brand-primary" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
              {t("eyebrow")}
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="max-w-5xl font-heading text-5xl font-black uppercase leading-[1.2] tracking-[-0.06em] text-foreground md:text-8xl 2xl:text-[136px]">
              <span className="block">
                <StaggeredText text={contactTitlePrimary} />
              </span>
              <span className="mt-3 block text-brand-primary">
                <StaggeredText text={contactTitleAccent} />
              </span>
            </h2>
            <p className="max-w-4xl text-xl font-medium leading-tight tracking-tight text-muted-foreground md:text-3xl lg:text-4xl">
              {t("description")}
            </p>
          </div>
        </header>
        <React.Suspense fallback={null}>
          <ProjectInquiryForm origin="contact" />
        </React.Suspense>
      </div>
    </Section>
  )
}
