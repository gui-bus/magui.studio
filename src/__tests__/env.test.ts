import { describe, expect, it } from "vitest"
import { z } from "zod"

describe("env schema", () => {
  const envSchema = z.object({
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  })

  it("should validate a correct URL", () => {
    const result = envSchema.safeParse({
      NEXT_PUBLIC_SITE_URL: "https://example.com",
    })
    expect(result.success).toBe(true)
  })

  it("should fail on invalid URL", () => {
    const result = envSchema.safeParse({
      NEXT_PUBLIC_SITE_URL: "not-a-url",
    })
    expect(result.success).toBe(false)
  })

  it("should fail when missing required URL", () => {
    const result = envSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
