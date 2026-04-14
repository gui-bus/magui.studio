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
    alternates: { canonical: url.toString() },
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
    <div className="relative min-h-svh w-full bg-background font-sans text-foreground selection:bg-brand-primary/30">
      <Header />

      <main className="relative pt-32 md:pt-48">
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-150 w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-brand-primary/10 via-transparent to-transparent blur-3xl" />

        <section className="px-6 pb-32 md:px-12">
          <div className="mb-24 flex flex-col items-start justify-between gap-8 border-b border-foreground/5 pb-16 lg:flex-row lg:items-end">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-2 text-brand-primary">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  {t("archive_eyebrow")}
                </span>
              </div>
              <h1 className="font-heading text-7xl font-black uppercase leading-[0.8] tracking-tighter md:text-9xl lg:text-[150px]">
                {t("archive_title")}
                <span className="text-brand-primary">.</span>
              </h1>
            </div>
            <p className="max-w-xs text-sm font-medium leading-relaxed text-muted-foreground/80 md:text-base">
              {t("archive_description")}
            </p>
          </div>

          <div className="grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.slug}
                className="group relative flex flex-col"
              >
                <Link
                  href={`${siteConfig.projects.path}/${project.slug}`}
                  className="relative aspect-4/5 w-full overflow-hidden bg-muted transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-brand-primary/10"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                    <div className="translate-y-4 scale-90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                      <div className="rounded-full bg-white p-5 text-black">
                        <ArrowUpRightIcon size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6">
                    <span className="bg-brand-primary px-2 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                      {project.sector}
                    </span>
                  </div>
                </Link>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-heading text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
                      {project.title}
                    </h2>
                    <span className="text-[10px] font-mono text-muted-foreground/50">
                      / 0{index + 1}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">
                    {project.summary}
                  </p>

                  <div className="flex gap-6 pt-2">
                    <Link
                      href={`${siteConfig.projects.path}/${project.slug}`}
                      className="group/link flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors hover:text-brand-primary"
                    >
                      {t("archive_open")}
                      <ArrowUpRightIcon
                        size={14}
                        className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </Link>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t("archive_live")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-32 flex justify-center border-t border-foreground/5 pt-20">
            <Link
              href="/#portfolio"
              className="group relative overflow-hidden border border-foreground/10 px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:border-brand-primary"
            >
              <span className="relative z-10 transition-colors group-hover:text-white">
                {t("archive_back_home")}
              </span>
              <div className="absolute inset-0 z-0 translate-y-full bg-brand-primary transition-transform duration-300 group-hover:translate-y-0" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
