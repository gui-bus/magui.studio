import * as React from "react"

import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  AppLocale,
  getAdjacentProjectCases,
  getProjectCaseBySlug,
  getProjectCaseSlugs,
} from "@/src/content/projects"
import { locales } from "@/src/i18n/config"

import {
  ArrowUpRightIcon,
  LightbulbIcon,
  TargetIcon,
} from "@/src/components/ui/serverIcons"

import { Footer } from "@/src/components/common/footer"
import { Header } from "@/src/components/common/header"

import { siteConfig } from "@/src/config/site"

interface ProjectCasePageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

interface ProjectFactItem {
  label: string
  value: string
}

export function generateStaticParams(): Array<{
  locale: string
  slug: string
}> {
  return locales.flatMap((locale) =>
    getProjectCaseSlugs().map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: ProjectCasePageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProjectCaseBySlug(slug, locale as AppLocale)

  if (!project) {
    return {}
  }

  const url = new URL(
    `${siteConfig.projects.path}/${project.slug}`,
    siteConfig.url
  )
  const imageUrl = new URL(project.image, siteConfig.url)

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: url.toString(),
      images: [
        {
          url: imageUrl.toString(),
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [imageUrl.toString()],
    },
  }
}

export default async function ProjectCasePage({
  params,
}: ProjectCasePageProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params
  const t = await getTranslations("ProjectCases")
  const project = getProjectCaseBySlug(slug, locale as AppLocale)

  if (!project) {
    notFound()
  }

  const adjacentProjects = getAdjacentProjectCases(
    project.slug,
    locale as AppLocale
  )

  if (!adjacentProjects) {
    notFound()
  }

  const projectUrl = new URL(
    `${siteConfig.projects.path}/${project.slug}`,
    siteConfig.url
  )
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${projectUrl.toString()}#webpage`,
        name: project.title,
        description: project.summary,
        url: projectUrl.toString(),
      },
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl.toString()}#creative-work`,
        name: project.title,
        description: project.summary,
        image: new URL(project.image, siteConfig.url).toString(),
        url: projectUrl.toString(),
        creator: {
          "@type": "Organization",
          name: siteConfig.legalName,
        },
      },
    ],
  }

  const quickFacts: ProjectFactItem[] = [
    { label: t("facts_sector"), value: project.sector },
    { label: t("facts_scope"), value: project.scope },
    { label: t("facts_year"), value: project.year },
    { label: t("facts_role"), value: project.role },
    { label: t("stack_label"), value: project.stack.join(", ") },
  ]

  return (
    <div className="min-h-svh overflow-x-hidden bg-background text-foreground selection:bg-brand-primary/20 selection:text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="overflow-x-hidden pt-24 md:pt-32">
        <section className="space-y-10 px-6 pb-16 md:px-12 md:pb-20 lg:px-16 lg:pb-24">
          <Link
            href={siteConfig.projects.path}
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.34em] text-brand-primary transition-colors hover:text-foreground"
          >
            {t("back_to_projects")}
            <ArrowUpRightIcon size={16} weight="bold" />
          </Link>

          <header className="space-y-8">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-black uppercase tracking-[0.28em] text-foreground/46">
              <span>{t("hero_label")}</span>
              <span>{project.scope}</span>
              <span>{project.year}</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-heading text-[clamp(4.5rem,12vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.08em]">
                {project.title}
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground md:max-w-3xl md:text-lg">
                {project.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-background transition-colors hover:bg-brand-primary"
              >
                {t("live_project")}
                <ArrowUpRightIcon size={16} weight="bold" />
              </Link>
              <Link
                href={siteConfig.contact.path}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/10 px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-foreground transition-colors hover:border-foreground/24"
              >
                {t("open_brief")}
                <ArrowUpRightIcon size={16} weight="bold" />
              </Link>
            </div>
          </header>

          <figure className="overflow-hidden bg-white shadow-[0_38px_120px_rgba(15,23,42,0.1)]">
            <div className="relative aspect-video overflow-hidden bg-[#f5f4ef]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </figure>

          <div className="grid gap-8 border-t border-foreground/8 pt-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
            <dl className="grid gap-8 sm:grid-cols-2">
              {quickFacts.map((item) => (
                <div key={item.label} className="min-w-0 space-y-2">
                  <dt className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-primary">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-foreground/74">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.intro}
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-foreground/8 bg-foreground/1 px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] bg-size-[32px_32px]" />

          <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:gap-24">
            <article className="group space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/8 bg-background shadow-sm transition-transform group-hover:scale-110">
                  <TargetIcon className="text-brand-primary" size={20} />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.34em] text-brand-primary">
                  {t("challenge_label")}
                </h2>
              </div>
              <div className="space-y-6">
                <p className="font-heading text-2xl font-black uppercase leading-tight tracking-[-0.04em] md:text-3xl">
                  {project.challenge}
                </p>
                <div className="h-px w-12 bg-foreground/10 transition-all group-hover:w-24" />
              </div>
              <div className="pointer-events-none absolute -left-12 top-0 opacity-[0.02] transition-transform group-hover:translate-x-4">
                <TargetIcon size={240} />
              </div>
            </article>

            <article className="group space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/8 bg-background shadow-sm transition-transform group-hover:scale-110">
                  <LightbulbIcon className="text-brand-primary" size={20} />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.34em] text-brand-primary">
                  {t("solution_label")}
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.solution}
                </p>
                <div className="h-px w-12 bg-foreground/10 transition-all group-hover:w-24" />
              </div>
              <div className="pointer-events-none absolute -right-12 top-0 opacity-[0.02] transition-transform group-hover:-translate-x-4">
                <LightbulbIcon size={240} />
              </div>
            </article>
          </div>
        </section>

        <section className="space-y-16 border-t border-foreground/8 px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-brand-primary">
              {t("design_system_label")}
            </p>
            <h2 className="font-heading text-4xl font-black uppercase leading-[0.84] tracking-[-0.06em] md:text-6xl">
              {t("style_guide_label")}
            </h2>
          </div>

          <div className="grid gap-20 lg:grid-cols-[0.4fr_1fr]">
            <div className="space-y-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.28em] text-foreground/40">
                {t("typeface_label")}
              </h3>
              <div className="space-y-24">
                {project.typography.map((font) => (
                  <div key={font.name} className="relative space-y-4">
                    <div
                      className="pointer-events-none absolute -top-12 -left-4 select-none text-[12rem] leading-none text-foreground/3"
                      style={{ fontFamily: font.name }}
                    >
                      Aa
                    </div>
                    <div className="relative z-10 space-y-2">
                      <p
                        className="text-4xl font-black uppercase tracking-tighter md:text-6xl"
                        style={{ fontFamily: font.name }}
                      >
                        {font.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-brand-primary" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                          {font.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.28em] text-foreground/40">
                {t("palette_label")}
              </h3>
              <div className="grid grid-cols-1 gap-px bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
                {project.colors.map((color) => (
                  <div
                    key={color.hex}
                    className="group relative flex flex-col bg-background"
                  >
                    <div
                      className="aspect-video w-full transition-transform duration-700 md:aspect-square"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="space-y-4 p-6 transition-colors group-hover:bg-foreground/2">
                      <div className="space-y-1">
                        <p className="text-[11px] font-black uppercase tracking-widest">
                          {color.name}
                        </p>
                        <div className="h-px w-8 bg-brand-primary transition-all group-hover:w-full" />
                      </div>
                      <div className="flex flex-col gap-1 font-mono text-[10px] leading-none text-muted-foreground/60">
                        <span className="text-foreground/80">{color.hex}</span>
                        <span>{color.oklch}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 border-t border-foreground/8 px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <figure className="overflow-hidden bg-white shadow-[0_34px_110px_rgba(15,23,42,0.1)]">
            <div className="relative aspect-16/10 overflow-hidden bg-[#f5f4ef]">
              <Image
                src={project.gallery[0] ?? "/utils/placeholder.svg"}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </figure>

          <div className="grid gap-6 lg:grid-cols-2">
            <figure className="overflow-hidden bg-white shadow-[0_30px_96px_rgba(15,23,42,0.09)]">
              <div className="relative aspect-4/5 overflow-hidden bg-[#f5f4ef]">
                <Image
                  src={project.gallery[1] ?? "/utils/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <figure className="overflow-hidden bg-white shadow-[0_30px_96px_rgba(15,23,42,0.09)]">
              <div className="relative aspect-4/5 overflow-hidden bg-[#f5f4ef]">
                <Image
                  src={project.gallery[2] ?? "/utils/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>

          <article className="grid gap-5 border-t border-foreground/8 pt-6 md:grid-cols-3">
            {project.notes.map((item) => (
              <p
                key={item}
                className="text-sm leading-relaxed text-foreground/72 md:text-base"
              >
                {item}
              </p>
            ))}
          </article>
        </section>

        <section className="space-y-10 border-t border-foreground/8 px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <div className="space-y-5">
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-brand-primary">
              {t("more_projects")}
            </p>
            <h2 className="font-heading text-3xl font-black uppercase leading-[0.84] tracking-[-0.06em] md:text-5xl">
              {t("cta_title")}
            </h2>
            <Link
              href={siteConfig.contact.path}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-background transition-colors hover:bg-brand-primary"
            >
              {t("open_brief")}
              <ArrowUpRightIcon size={16} weight="bold" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                href: `${siteConfig.projects.path}/${adjacentProjects.previousProject.slug}`,
                label: t("previous_project"),
                project: adjacentProjects.previousProject,
              },
              {
                href: `${siteConfig.projects.path}/${adjacentProjects.nextProject.slug}`,
                label: t("next_project"),
                project: adjacentProjects.nextProject,
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group overflow-hidden bg-white shadow-[0_24px_84px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#f5f4ef]">
                  <Image
                    src="/utils/placeholder.svg"
                    alt={item.project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3 px-5 py-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-primary">
                    {item.label}
                  </p>
                  <p className="font-heading text-2xl font-black uppercase tracking-[-0.05em]">
                    {item.project.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.project.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
