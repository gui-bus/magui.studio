import * as React from "react"

import { About } from "@/src/components/sections/about"
import { CTA } from "@/src/components/sections/cta"
import { FAQ } from "@/src/components/sections/faq"
import { Hero } from "@/src/components/sections/hero"
import { Process } from "@/src/components/sections/process"
import { Services } from "@/src/components/sections/services"
import { Showcase } from "@/src/components/sections/showcase"
import { Value } from "@/src/components/sections/value"

import { Footer } from "@/src/components/common/footer"
import { Header } from "@/src/components/common/header"

export default function Page(): React.JSX.Element {
  return (
    <div className="relative min-h-svh w-full bg-background font-sans text-foreground selection:bg-brand-primary/30 selection:text-brand-primary overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Value />
        <About />
        <Showcase />
        <Services />
        <Process />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
