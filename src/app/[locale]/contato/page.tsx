import * as React from "react"

import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { Contact } from "@/src/components/sections/contact"
import { Footer } from "@/src/components/common/footer"
import { Header } from "@/src/components/common/header"

import { siteConfig } from "@/src/config/site"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Index.ContactPage")
  const configT = await getTranslations("Config")
  const url = new URL(siteConfig.contact.path, siteConfig.url)
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

export default async function ContactPage(): Promise<React.JSX.Element> {
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
