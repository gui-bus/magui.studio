import * as React from "react"

import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { Button } from "@/src/components/ui/button"

import { CookieConsent } from "@/src/components/common/cookieConsent"

describe("Components", () => {
  describe("Button", () => {
    it("renders correctly with children", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText("Click me")).toBeInTheDocument()
    })
  })

  describe("CookieConsent", () => {
    it("should render the banner when no consent exists", () => {
      render(<CookieConsent />)
      expect(screen.getByText("message")).toBeInTheDocument()
      expect(screen.getByText("accept")).toBeInTheDocument()
      expect(screen.getByText("decline")).toBeInTheDocument()
    })

    it("should close the banner when clicking accept", () => {
      // Mock window.location.reload
      const reloadMock = vi.fn()
      Object.defineProperty(window, "location", {
        value: { reload: reloadMock },
        writable: true,
      })

      render(<CookieConsent />)
      const acceptButton = screen.getByText("accept")
      fireEvent.click(acceptButton)

      expect(reloadMock).toHaveBeenCalled()
    })
  })
})
