import * as React from "react"

import { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { getPathname } from "@/src/i18n/navigation"

import { Footer } from "@/src/components/common/footer"
import { Header } from "@/src/components/common/header"
import { Process } from "@/src/components/sections/process"

import { siteConfig } from "@/src/config/site"

interface MethodPageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({
  params,
}: MethodPageProps): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("MethodPage")
  const url = new URL(
    getPathname({
      locale,
      href: siteConfig.method.path,
    }),
    siteConfig.url
  )

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      url: url.toString(),
    },
  }
}

export default async function MethodPage({
  params,
}: MethodPageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden bg-background font-sans text-foreground selection:bg-brand-primary/30 selection:text-brand-primary">
      <Header />

      <Process />

      <Footer />
    </div>
  )
}
