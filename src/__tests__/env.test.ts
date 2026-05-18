import { describe, expect, it } from "vitest"
import { z } from "zod"

describe("env schema", () => {
  const publicEnvSchema = z.object({
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
  })

  const serverEnvSchema = z.object({
    DASHBOARD_PUBLIC_LEADS_URL: z.string().url(),
    DASHBOARD_PUBLIC_LEADS_KEY: z.string().min(1),
    DASHBOARD_PUBLIC_LEADS_SIGNING_SECRET: z.string().min(1),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  })

  it("should validate a correct URL", () => {
    const result = publicEnvSchema.safeParse({
      NEXT_PUBLIC_SITE_URL: "https://example.com",
    })
    expect(result.success).toBe(true)
  })

  it("should validate server secrets", () => {
    const result = serverEnvSchema.safeParse({
      DASHBOARD_PUBLIC_LEADS_URL:
        "https://dashboard.magui.studio/api/public/leads",
      DASHBOARD_PUBLIC_LEADS_KEY: "shared-key",
      DASHBOARD_PUBLIC_LEADS_SIGNING_SECRET: "signing-secret",
    })
    expect(result.success).toBe(true)
  })

  it("should fail on invalid URL", () => {
    const result = publicEnvSchema.safeParse({
      NEXT_PUBLIC_SITE_URL: "not-a-url",
    })
    expect(result.success).toBe(false)
  })

  it("should fail when missing required URL", () => {
    const result = publicEnvSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
