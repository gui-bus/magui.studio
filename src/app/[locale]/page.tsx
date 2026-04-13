import * as React from "react"

import { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import dynamic from "next/dynamic"

import { FAQItem } from "@/src/types/sections"

import CurvedLoop from "@/src/components/common/curvedMarquee"
import { Footer } from "@/src/components/common/footer"
import { Header } from "@/src/components/common/header"
import { ScrollSpy } from "@/src/components/common/scrollSpy"
import { Contact } from "@/src/components/sections/contact"
import { FAQ } from "@/src/components/sections/faq"
import { Hero } from "@/src/components/sections/hero"
import { Manifesto } from "@/src/components/sections/manifesto"
import { Services } from "@/src/components/sections/services"
import { Value } from "@/src/components/sections/value"

import { siteConfig } from "@/src/config/site"

const Showcase = dynamic(() =>
  import("@/src/components/sections/showcase").then((mod) => mod.Showcase)
)

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Config")
  const title = t("name")
  const description = t("description")
  const url = new URL(siteConfig.url)
  const ogUrl = new URL(`${siteConfig.url}/api/og`)
  ogUrl.searchParams.set("title", title)
  ogUrl.searchParams.set("description", description)

  return {
    title,
    description,
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: url.toString(),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl.toString()],
    },
  }
}

export default function Page(): React.JSX.Element {
  const t = useTranslations("Index.Marquee")
  const faqT = useTranslations("Index.FAQ")
  const faqItems = faqT.raw("items") as FAQItem[]
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
      name: item.question,
    })),
  }

  return (
    <div className="relative min-h-svh w-full bg-background font-sans text-foreground selection:bg-brand-primary/30 selection:text-brand-primary overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollSpy />
      <Header />
      <main className="pt-24 md:pt-32">
        <Hero />
        <Value />
        <Manifesto />
        <Showcase />
        <Services />

        <div className="pt-44!">
          <CurvedLoop marqueeText={t("text")} speed={1.5} curveAmount={150} />
        </div>

        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
