import { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages, getTranslations } from "next-intl/server"
import { cookies } from "next/headers"

import { GoogleAnalytics } from "@next/third-parties/google"

import { CookieConsent } from "@/src/components/common/cookieConsent"
import { ThemeProvider } from "@/src/components/common/themeProvider"
import { MotionProvider } from "@/src/components/common/motionProvider"

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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Config")
  const ogUrl = new URL(`${siteConfig.url}/api/og`)
  ogUrl.searchParams.set("title", t("name"))
  ogUrl.searchParams.set("description", t("description"))

  return {
    title: {
      default: t("name"),
      template: `%s | ${t("name")}`,
    },
    description: t("description"),
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
    manifest: `${siteConfig.url}/site.webmanifest`,
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
}: Readonly<{
  children: React.ReactNode
}>): Promise<React.JSX.Element> {
  const locale = await getLocale()
  const messages = await getMessages()
  const t = await getTranslations("Config")
  const cookieStore = await cookies()
  const consent = cookieStore.get("cookie-consent")?.value

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("name"),
    description: t("description"),
    url: siteConfig.url,
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("antialiased", fontVariables)}
    >
      <head>
        <link rel="preload" as="image" href="/utils/placeholder.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="mx-auto w-full max-w-440 overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <MotionProvider>
              {children}
            </MotionProvider>
            <CookieConsent />
          </ThemeProvider>
        </NextIntlClientProvider>

        {siteConfig.analytics.google && consent === "accepted" && (
          <GoogleAnalytics gaId={siteConfig.analytics.google} />
        )}
      </body>
    </html>
  )
}
