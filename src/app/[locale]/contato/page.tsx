import * as React from "react"

import { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { getPathname } from "@/src/i18n/navigation"

import { Footer } from "@/src/components/common/footer"
import { Header } from "@/src/components/common/header"
import { Contact } from "@/src/components/sections/contact"

import { siteConfig } from "@/src/config/site"

interface ContactPageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("ContactPage")
  const configT = await getTranslations("Config")
  const url = new URL(
    getPathname({
      locale,
      href: siteConfig.contact.path,
    }),
    siteConfig.url
  )
  const ogUrl = new URL(`${siteConfig.url}/api/og`)
  ogUrl.searchParams.set("title", `${t("metaTitle")} | ${configT("name")}`)
  ogUrl.searchParams.set("description", t("metaDescription"))

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      description: t("metaDescription"),
      title: t("metaTitle"),
      type: "website",
      url: url.toString(),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: t("metaTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [ogUrl.toString()],
    },
  }
}

export default async function ContactPage({
  params,
}: ContactPageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden bg-background font-sans text-foreground selection:bg-brand-primary/30 selection:text-brand-primary">
      <Header />
      <main className="pt-12 md:pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
