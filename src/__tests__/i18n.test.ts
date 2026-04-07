import en from "@/messages/en.json"
import pt from "@/messages/pt.json"
import { describe, expect, it } from "vitest"

function getAllKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.keys(obj).reduce((keys: string[], key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value as Record<string, unknown>, fullKey))
    } else {
      keys.push(fullKey)
    }
    return keys
  }, [])
}

describe("i18n synchronization", () => {
  const ptKeys = getAllKeys(pt as Record<string, unknown>)
  const enKeys = getAllKeys(en as Record<string, unknown>)

  it("should have identical keys in pt and en", () => {
    expect(ptKeys).toEqual(enKeys)
  })

  it("should have specific namespaces", () => {
    expect(ptKeys).toContain("Config.name")
    expect(ptKeys).toContain("Locale.pt")
    expect(ptKeys).toContain("Errors.not_found.title")
  })
})
