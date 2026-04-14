import {
  getAdjacentProjectCases,
  getProjectCaseBySlug,
  getProjectCaseSlugs,
  getProjectCases,
} from "@/src/content/projects"
import { describe, expect, it } from "vitest"

describe("project cases content", () => {
  it("exposes a case for every slug", () => {
    const slugs = getProjectCaseSlugs()

    expect(slugs).toEqual(["apareca-e-venda", "powervet", "horizon-travels"])

    for (const slug of slugs) {
      expect(getProjectCaseBySlug(slug, "pt")).not.toBeNull()
      expect(getProjectCaseBySlug(slug, "en")).not.toBeNull()
    }
  })

  it("returns localized cases with neighboring navigation", () => {
    const cases = getProjectCases("pt")
    const adjacent = getAdjacentProjectCases("powervet", "pt")

    expect(cases).toHaveLength(3)
    expect(cases[0]).toMatchObject({
      sector: "Infoprodutos e Posicionamento",
      scope: "Landing Page de Alta Conversão",
      year: "2026",
    })
    expect(cases[1]?.stack).toHaveLength(4)
    expect(cases[2]?.role).toBe(
      "Conceito Visual, UI Design e Desenvolvimento Full-stack"
    )
    expect(adjacent?.previousProject.slug).toBe("apareca-e-venda")
    expect(adjacent?.nextProject.slug).toBe("horizon-travels")
  })
})
