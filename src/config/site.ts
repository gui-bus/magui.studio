import { env } from "./env"

export const siteConfig = {
  name: "MAGUI.studio",
  shortName: "MAGUI",
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: `${env.NEXT_PUBLIC_SITE_URL}/og.png`,
  authors: [
    {
      name: "MAGUI.studio",
      url: "https://magui.studio",
    },
  ],
  creator: "MAGUI.studio",
  links: {
    twitter: "https://twitter.com/maguistudio",
    github: "https://github.com/maguistudio",
  },
  contact: {
    email: "contato@magui.studio",
  },
  locales: ["pt", "en", "es", "fr", "it"],
  defaultLocale: "pt",
  analytics: {
    google: env.NEXT_PUBLIC_GA_ID || "",
  },
}

export type SiteConfig = typeof siteConfig
