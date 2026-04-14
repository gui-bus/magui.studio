import * as React from "react"

import { getTranslations } from "next-intl/server"
import { Onest } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

import { NavLink } from "@/src/components/ui/navLink"
import { ArrowUpIcon, PlusIcon } from "@/src/components/ui/serverIcons"

import { siteConfig } from "@/src/config/site"

export const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-onest",
})

export async function Footer(): Promise<React.JSX.Element> {
  const t = await getTranslations("Footer")
  const configT = await getTranslations("Config")
  const navT = await getTranslations("Index.Nav")

  const navigationLinks = [
    { href: siteConfig.studio.path, label: navT("about") },
    { href: siteConfig.method.path, label: navT("method") },
    { href: siteConfig.projects.path, label: navT("portfolio") },
    { href: siteConfig.contact.path, label: navT("contact") },
  ]

  return (
    <footer
      className="w-full overflow-hidden bg-background pb-12 pt-32"
      aria-label={t("site_footer_label")}
    >
      <div className="px-6 lg:px-12">
        <div className="mb-20 md:mb-48 grid grid-cols-1 items-start gap-24 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-16 lg:col-span-5">
            <div className="relative h-12 w-64">
              <Image
                src="/logos/LOGO_VAR_03_DM.svg"
                alt={configT("name")}
                fill
                sizes="256px"
                className="object-contain object-left dark:hidden"
              />
              <Image
                src="/logos/LOGO_VAR_03_LM.svg"
                alt={configT("name")}
                fill
                sizes="256px"
                className="hidden object-contain object-left dark:block"
              />
            </div>
            <p className="max-w-md text-2xl font-medium leading-tight tracking-tight text-muted-foreground">
              {configT("description")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 lg:col-span-7 lg:pl-24 md:grid-cols-3">
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <PlusIcon
                  weight="bold"
                  size={10}
                  className="text-brand-primary"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">
                  {t("nav_title")}
                </span>
              </div>
              <ul className="space-y-6">
                {navigationLinks.map((link) => (
                  <li key={link.href} className="group overflow-hidden">
                    <NavLink
                      href={link.href}
                      label={link.label}
                      variant="footer"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <PlusIcon
                  weight="bold"
                  size={10}
                  className="text-brand-primary"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">
                  {t("social_title")}
                </span>
              </div>
              <ul className="space-y-6">
                {siteConfig.socials.map((link) => (
                  <li key={link.label} className="group overflow-hidden">
                    <NavLink
                      href={link.href}
                      label={link.label}
                      variant="footer"
                      rel="noreferrer"
                      target="_blank"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden space-y-10 md:block">
              <div className="flex items-center gap-3">
                <PlusIcon
                  weight="bold"
                  size={10}
                  className="text-brand-primary"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">
                  {t("studio_title")}
                </span>
              </div>
              <div className="space-y-6 text-sm font-medium leading-relaxed text-muted-foreground/80">
                <p>{t("established")}</p>
                <p>{t("availability")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-20 md:mb-24 w-full overflow-hidden md:py-12">
          <h2
            className={`${onest.className} relative select-none text-center font-black uppercase leading-none tracking-[-0.08em] text-foreground text-7xl md:text-[160px] lg:text-[280px] xl:text-[360px]`}
          >
            {configT("name").split(".")[0]}
          </h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 md:pt-12 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/70 md:justify-start">
            <span>{t("credits", { year: new Date().getFullYear() })}</span>

            <div
              className="hidden h-px w-8 bg-foreground/10 md:block"
              aria-hidden="true"
            />

            <Link
              href="#page-top"
              className="group flex items-center gap-2 rounded-full px-2 uppercase text-brand-primary transition-all duration-500 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label={t("scroll_to_top_label")}
            >
              <span>{t("back_to_top")}</span>
              <ArrowUpIcon
                weight="duotone"
                className="transition-transform group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
