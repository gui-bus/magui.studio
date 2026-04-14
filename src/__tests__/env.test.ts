import { describe, expect, it } from "vitest"
import { z } from "zod"

describe("env schema", () => {
  const publicEnvSchema = z.object({
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
  })

  const serverEnvSchema = z.object({
    WEB3FORMS_ACCESS_KEY: z.string().uuid(),
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
      WEB3FORMS_ACCESS_KEY: "4fc93430-7b53-491f-a7ed-8cb2c3b3fd46",
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
