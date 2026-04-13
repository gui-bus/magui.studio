import * as React from "react"

import { Metadata } from "next"
import { getLocale, getTranslations } from "next-intl/server"
import Image from "next/image"
import Link from "next/link"

import { getProjectCases } from "@/src/content/projects"

import { ArrowUpRightIcon } from "@/src/components/ui/serverIcons"

import { Footer } from "@/src/components/common/footer"
import { Header } from "@/src/components/common/header"

import { siteConfig } from "@/src/config/site"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ProjectCases")
  const url = new URL(siteConfig.projects.path, siteConfig.url)

  return {
    title: t("archive_title"),
    description: t("archive_description"),
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title: t("archive_title"),
      description: t("archive_description"),
      type: "website",
      url: url.toString(),
    },
  }
}

export default async function ProjectsPage(): Promise<React.JSX.Element> {
  const locale = await getLocale()
  const t = await getTranslations("ProjectCases")
  const projects = getProjectCases(locale as "pt" | "en")

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden bg-background font-sans text-foreground selection:bg-brand-primary/30 selection:text-brand-primary">
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="border-b border-foreground/5 px-6 py-18 md:px-12 md:py-24 lg:px-24 lg:py-32">
          <div className="mx-auto max-w-7xl space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-brand-primary" />
                <span className="text-[11px] font-black uppercase tracking-[0.45em] text-brand-primary">
                  {t("archive_eyebrow")}
                </span>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)] lg:items-end">
                <h1 className="font-heading text-5xl font-black uppercase leading-[0.8] tracking-[-0.06em] md:text-7xl lg:text-[112px]">
                  {t("archive_title")}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
                  {t("archive_description")}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="group overflow-hidden border border-foreground/8 bg-background"
                >
                  <div className="relative aspect-[1.08] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${project.accent} opacity-20`}
                    />
                  </div>

                  <div className="space-y-6 p-6 md:p-7">
                    <div className="space-y-3">
                      <h2 className="font-heading text-3xl font-black uppercase leading-[0.88] tracking-[-0.04em] md:text-4xl">
                        {project.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {project.summary}
                      </p>
                    </div>

                    <div className="grid gap-3 border-t border-foreground/8 pt-5 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-black uppercase tracking-[0.25em] text-foreground/45">
                          {t("facts_sector")}
                        </span>
                        <span>{project.sector}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-black uppercase tracking-[0.25em] text-foreground/45">
                          {t("facts_scope")}
                        </span>
                        <span>{project.scope}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`${siteConfig.projects.path}/${project.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-[11px] font-black uppercase tracking-[0.32em] text-background transition-colors hover:bg-brand-primary"
                      >
                        {t("archive_open")}
                        <ArrowUpRightIcon size={16} weight="bold" />
                      </Link>

                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-foreground/10 px-5 py-3 text-[11px] font-black uppercase tracking-[0.32em] text-foreground transition-colors hover:border-brand-primary hover:text-brand-primary"
                      >
                        {t("archive_live")}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.35em] text-brand-primary transition-colors hover:text-foreground"
              >
                {t("archive_back_home")}
                <ArrowUpRightIcon size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
