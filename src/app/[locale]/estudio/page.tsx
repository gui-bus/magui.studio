import * as React from "react"

import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { Section } from "@/src/components/ui/section"

import { Footer } from "@/src/components/common/footer"
import { Header } from "@/src/components/common/header"
import { Manifesto } from "@/src/components/sections/manifesto"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("StudioPage")
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function StudioPage(): Promise<React.JSX.Element> {
  const t = await getTranslations("StudioPage")
  const founders = t.raw("founders") as Array<{
    name: string
    role: string
    description: string
    image: string
    imageAlt: string
  }>

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden bg-background font-sans text-foreground selection:bg-brand-primary/30 selection:text-brand-primary">
      <Header />
      
      <main className="pt-24 md:pt-32">
        <Manifesto />
        <Section className="py-14 md:py-20 lg:py-24" withContainer>
          <div className="space-y-10 md:space-y-12">
            <header className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-brand-primary" />
                <p className="text-[10px] font-black uppercase tracking-[0.42em] text-brand-primary">
                  {t("team_label")}
                </p>
              </div>
              <h1 className="font-heading text-4xl font-black uppercase leading-[0.86] tracking-[-0.05em] md:text-6xl lg:text-7xl">
                {t("team_title")}
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("team_description")}
              </p>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:gap-8">
              {Array.isArray(founders) &&
                founders.map((founder, index) => (
                  <figure
                    key={founder.name}
                    className={`group space-y-5 ${
                      index % 2 !== 0 ? "md:pt-10" : ""
                    }`}
                  >
                    <div className="relative aspect-4/5 overflow-hidden rounded-4xl border border-border/60 bg-muted/20">
                      <Image
                        src={founder.image}
                        alt={founder.imageAlt}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        priority={index === 0}
                      />
                    </div>
                    <figcaption className="max-w-xl space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.34em] text-brand-primary/72">
                        {founder.role}
                      </p>
                      <h2 className="font-heading text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
                        {founder.name}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {founder.description}
                      </p>
                    </figcaption>
                  </figure>
                ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
