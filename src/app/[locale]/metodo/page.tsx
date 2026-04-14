import * as React from "react"

import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { Footer } from "@/src/components/common/footer"
import { Header } from "@/src/components/common/header"
import { Process } from "@/src/components/sections/process"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("MethodPage")
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function MethodPage(): Promise<React.JSX.Element> {
  return (
    <div className="relative min-h-svh w-full overflow-x-hidden bg-background font-sans text-foreground selection:bg-brand-primary/30 selection:text-brand-primary">
      <Header />

      <Process />

      <Footer />
    </div>
  )
}
