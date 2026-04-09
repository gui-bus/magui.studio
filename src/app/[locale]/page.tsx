import * as React from "react"
import dynamic from "next/dynamic"

import { Hero } from "@/src/components/sections/hero"
import { Value } from "@/src/components/sections/value"
import { Header } from "@/src/components/common/header"
import { Footer } from "@/src/components/common/footer"
import { ScrollSpy } from "@/src/components/common/scrollSpy"

const Showcase = dynamic(() => import("@/src/components/sections/showcase").then(mod => mod.Showcase))
const Services = dynamic(() => import("@/src/components/sections/services").then(mod => mod.Services))
const FAQ = dynamic(() => import("@/src/components/sections/faq").then(mod => mod.FAQ))
const Contact = dynamic(() => import("@/src/components/sections/contact").then(mod => mod.Contact))

export default function Page() {
  return (
    <div className="relative min-h-svh w-full bg-background font-sans text-foreground selection:bg-brand-primary/30 selection:text-brand-primary overflow-x-hidden">
      <ScrollSpy />
      <Header />
      <main>
        <Hero />
        <Value />
        <Showcase />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
