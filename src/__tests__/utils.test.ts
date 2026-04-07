import { describe, expect, it } from "vitest"

import { cn } from "@/src/lib/utils/utils"

describe("cn utility", () => {
  it("should merge tailwind classes correctly", () => {
    expect(cn("px-2", "py-2")).toBe("px-2 py-2")
  })

  it("should handle conditional classes", () => {
    expect(cn("px-2", true && "py-2", false && "m-2")).toBe("px-2 py-2")
  })

  it("should merge conflicting tailwind classes", () => {
    expect(cn("px-2 p-4")).toBe("p-4")
  })
})
