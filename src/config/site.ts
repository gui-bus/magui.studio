import { publicEnv } from "./env"

export const siteConfig = {
  name: "MAGUI.studio",
  shortName: "MAGUI",
  legalName: "MAGUI.studio",
  manifestDescription:
    "Est\u00fadio de dire\u00e7\u00e3o visual, interface e experi\u00eancias digitais com foco em performance, clareza e autoridade.",
  url: publicEnv.NEXT_PUBLIC_SITE_URL,
  ogImage: `${publicEnv.NEXT_PUBLIC_SITE_URL}/og.png`,
  authors: [
    {
      name: "MAGUI.studio",
      url: "https://magui.studio",
    },
  ],
  creator: "MAGUI.studio",
  links: {
    instagram: "https://www.instagram.com/_magui.studio",
    linkedin: "https://www.linkedin.com/company/magui-studio",
    x: "https://x.com/magui_studio",
  },
  socials: [
    {
      href: "https://www.instagram.com/_magui.studio",
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/company/magui-studio",
      label: "LinkedIn",
    },
    {
      href: "https://x.com/magui_studio",
      label: "X",
    },
  ],
  sameAs: [
    "https://www.instagram.com/_magui.studio",
    "https://www.linkedin.com/company/magui-studio",
    "https://x.com/magui_studio",
  ],
  contact: {
    email: "contato@magui.studio",
    path: "/contato" as const,
  },
  projects: {
    path: "/#portfolio" as const,
  },
  method: {
    path: "/metodo" as const,
  },
  studio: {
    path: "/estudio" as const,
  },
  locales: ["pt", "en"],
  defaultLocale: "pt",
  analytics: {
    google: publicEnv.NEXT_PUBLIC_GA_ID || "",
  },
}

export type SiteConfig = typeof siteConfig
