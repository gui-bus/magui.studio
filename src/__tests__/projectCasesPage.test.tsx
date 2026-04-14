import * as React from "react"

import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import ProjectCasePage, {
  generateMetadata as generateProjectCaseMetadata,
  generateStaticParams,
} from "@/src/app/[locale]/projetos/[slug]/page"

vi.mock("@/src/components/common/header", () => ({
  Header: () => <div>Header</div>,
}))

vi.mock("@/src/components/common/footer", () => ({
  Footer: () => <div>Footer</div>,
}))

describe("project case routes", () => {
  it("renders the project case page with visual sections", async () => {
    render(
      await ProjectCasePage({
        params: Promise.resolve({
          locale: "pt",
          slug: "powervet",
        }),
      })
    )

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "PowerVet",
      })
    ).toBeInTheDocument()
    expect(screen.getByText("Style guide")).toBeInTheDocument()
    expect(screen.getByText("Desafio")).toBeInTheDocument()
    expect(screen.getByText("Solução")).toBeInTheDocument()
    expect(screen.getAllByAltText("PowerVet").length).toBeGreaterThanOrEqual(3)
    expect(screen.getByText(/saúde animal/i)).toBeInTheDocument()
    expect(screen.getByText("Outros projetos")).toBeInTheDocument()
  })

  it("generates static params for every locale and project slug", () => {
    const params = generateStaticParams()

    expect(params).toHaveLength(6)
    expect(params).toContainEqual({
      locale: "pt",
      slug: "powervet",
    })
    expect(params).toContainEqual({
      locale: "en",
      slug: "horizon-travels",
    })
  })

  it("generates case metadata", async () => {
    const projectMetadata = await generateProjectCaseMetadata({
      params: Promise.resolve({
        locale: "pt",
        slug: "apareca-e-venda",
      }),
    })

    expect(projectMetadata.title).toBe("Apareça e Venda")
    expect(projectMetadata.description).toContain("faturamento")
    expect(projectMetadata.openGraph?.title).toBe("Apareça e Venda")
  })
})
