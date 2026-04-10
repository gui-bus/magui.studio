import * as React from "react"

import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

process.env.NEXT_PUBLIC_SITE_URL = "https://example.com"

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "pt",
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
}))

const motionDiv = ({
  children,
  ...props
}: { children?: React.ReactNode } & Record<string, unknown>) =>
  React.createElement(
    "div",
    props as React.HTMLAttributes<HTMLDivElement>,
    children
  )

vi.mock("framer-motion", () => ({
  motion: {
    div: motionDiv,
  },
  m: {
    div: motionDiv,
    span: motionDiv,
    h2: motionDiv,
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  useScroll: () => ({
    scrollYProgress: 0,
  }),
  useTransform: () => "0%",
}))
