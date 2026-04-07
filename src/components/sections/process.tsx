import * as React from "react"

import { getTranslations } from "next-intl/server"

import { cn } from "@/src/lib/utils/utils"

export async function Process(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.Process")
  const steps = t.raw("steps") as { title: string; description: string }[]

  return (
    <section className="relative w-full px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-24">
          <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight text-foreground">
            {t("title")}
          </h2>
          <div className="h-px flex-1 bg-border/10 hidden md:block" />
          <span className="text-xs font-mono font-bold text-brand-primary tracking-[0.4em]">PROTOCOL_V4.0</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative p-10 rounded-[2rem] border border-border/10 bg-muted/20 hover:bg-background hover:border-brand-primary/20 hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="text-5xl font-heading font-black text-foreground/5 group-hover:text-brand-primary/10 transition-colors duration-500">
                  0{index + 1}
                </span>
                <div className="h-2 w-2 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-heading font-bold text-foreground tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-10 left-10 right-10 h-0.5 bg-border/5 group-hover:bg-brand-primary/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
