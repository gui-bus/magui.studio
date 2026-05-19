import * as React from "react"

import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { MaguiConnect } from "@/src/components/sections/maguiConnect"

describe("MaguiConnect", () => {
  it("renders the MAGUI Connect section content", async () => {
    render(await MaguiConnect())

    expect(screen.getByText("eyebrow")).toBeInTheDocument()
    expect(screen.getByText("features.0")).toBeInTheDocument()
    expect(screen.getByText("price")).toBeInTheDocument()
  })
})
