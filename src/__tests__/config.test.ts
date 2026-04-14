import { describe, expect, it } from "vitest"

import { siteConfig } from "@/src/config/site"

describe("siteConfig", () => {
  it("should have valid technical properties", () => {
    expect(siteConfig.shortName).toBeDefined()
    expect(siteConfig.url).toBeDefined()
    expect(siteConfig.locales).toContain("pt")
    expect(siteConfig.locales).toContain("en")
    expect(siteConfig.defaultLocale).toBe("pt")
  })

  it("should have analytics configuration", () => {
    expect(siteConfig.analytics).toBeDefined()
    expect(siteConfig.analytics.google).toBeDefined()
  })

  it("should expose the primary social profiles", () => {
    expect(siteConfig.socials).toHaveLength(3)
    expect(siteConfig.sameAs).toContain(siteConfig.links.instagram)
    expect(siteConfig.sameAs).toContain(siteConfig.links.linkedin)
    expect(siteConfig.sameAs).toContain(siteConfig.links.x)
  })

  it("should expose the dedicated contact route", () => {
    expect(siteConfig.contact.path).toBe("/contato")
  })

  it("should expose the portfolio route", () => {
    expect(siteConfig.projects.path).toBe("/#portfolio")
  })
})
