"use client"

import * as React from "react"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { FAQItem } from "@/src/types/sections"
import { Section } from "@/src/components/ui/section"
import { SectionHeader } from "@/src/components/ui/sectionHeader"
import { AccordionItem } from "@/src/components/ui/accordion"
import { ArrowUpRight } from "@phosphor-icons/react"

export function FAQ(): React.JSX.Element {
  const t = useTranslations("Index.FAQ")
  const idT = useTranslations("Index.Ids")
  const items = t.raw("items") as FAQItem[]
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <Section id={idT("faq")} className="py-32 lg:py-64">
      <div className="max-w-6xl mx-auto space-y-24 lg:space-y-32">
        {/* HEADER */}
        <div className="text-center space-y-8">
          <SectionHeader 
            eyebrow={t("eyebrow")} 
            title={t("title")}
            align="center"
            className="mb-0"
          />
        </div>

        {/* ACCORDION LIST */}
        <div className="border-t border-foreground/10">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* BOTTOM CONTACT FOOTNOTE */}
        <div className="text-center pt-12 border-t border-foreground/5 flex flex-col items-center gap-8">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">
            Ainda com dúvidas?
          </p>
          <Link 
            href={`#${idT("contact")}`}
            className="group flex flex-col items-center gap-2"
          >
            <span className="text-brand-primary font-black uppercase tracking-[0.4em] text-xs">
              Iniciar Protocolo de Atendimento
            </span>
            <div className="h-px w-12 bg-brand-primary/30 group-hover:w-full transition-all duration-700" />
          </Link>
        </div>
      </div>
    </Section>
  )
}
