import { env } from "./env"

export const siteConfig = {
  name: "Landing Page Template",
  shortName: "LandingTemplate",
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: `${env.NEXT_PUBLIC_SITE_URL}/og.png`,
  authors: [
    {
      name: "Guilherme Bustamante",
      url: "https://github.com/bustamante-gui",
    },
  ],
  creator: "Guilherme Bustamante",
  links: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example",
  },
  contact: {
    email: "contact@example.com",
  },
  locales: ["pt", "en"],
  defaultLocale: "pt",
  analytics: {
    google: env.NEXT_PUBLIC_GA_ID || "",
  },
}

export type SiteConfig = typeof siteConfig
