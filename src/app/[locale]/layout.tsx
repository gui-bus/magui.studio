import { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { locales } from "@/src/i18n/config"

import { CookieConsent } from "@/src/components/common/cookieConsent"
import { MotionProvider } from "@/src/components/common/motionProvider"
import { Preloader } from "@/src/components/common/preloader"
import { ThemeProvider } from "@/src/components/common/themeProvider"

import { cn } from "@/src/lib/utils/utils"

import { fontVariables } from "@/src/config/fonts"
import { siteConfig } from "@/src/config/site"

import "@/src/app/globals.css"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams(): Array<{ locale: string }> {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Config")
  const ogUrl = new URL(`${siteConfig.url}/api/og`)
  ogUrl.searchParams.set("title", t("name"))
  ogUrl.searchParams.set("description", t("description"))

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("name"),
      template: `%s | ${t("name")}`,
    },
    description: t("description"),
    applicationName: t("name"),
    category: "design",
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title: t("name"),
      description: t("description"),
      siteName: t("name"),
      locale,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: t("name"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("name"),
      description: t("description"),
      images: [ogUrl.toString()],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/manifest.webmanifest`,
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("name"),
    },
    formatDetection: {
      telephone: false,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>): Promise<React.JSX.Element> {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()
  const t = await getTranslations("Config")

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: t("name"),
        description: t("description"),
        url: siteConfig.url,
        inLanguage: locale,
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.legalName,
        url: siteConfig.url,
        description: t("description"),
        email: siteConfig.contact.email,
        sameAs: siteConfig.sameAs,
      },
    ],
  }

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn("relative antialiased", fontVariables)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        id="page-top"
        className="mx-auto w-full max-w-440 overflow-x-hidden"
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <MotionProvider>
              <Preloader />
              {children}
            </MotionProvider>
            <CookieConsent gaId={siteConfig.analytics.google} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
