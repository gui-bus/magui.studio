import { describe, expect, it } from "vitest"

import { createAnimation } from "@/src/lib/animations/themeAnimations"

describe("themeAnimations", () => {
  it("should create diagonal-wipe animation with correct properties", () => {
    const animation = createAnimation()
    expect(animation.name).toBe("diagonal-wipe")
    expect(animation.css).toContain("::view-transition-old(root)")
    expect(animation.css).toContain("::view-transition-new(root)")
    expect(animation.css).toContain("@keyframes diagonal-wipe")
  })
})
