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
})
