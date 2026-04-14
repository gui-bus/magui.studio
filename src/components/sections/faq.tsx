import * as React from "react"

import { getMessages, getTranslations } from "next-intl/server"

import { FAQItem } from "@/src/types/sections"

import { Section } from "@/src/components/ui/section"
import { CaretDownIcon } from "@/src/components/ui/serverIcons"
import { StaggeredText } from "@/src/components/ui/staggeredText"

export async function FAQ(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.FAQ")
  const idT = await getTranslations("Index.Ids")
  const messages = await getMessages()
  const items = messages.Index.FAQ.items as FAQItem[]

  return (
    <Section
      id={idT("faq")}
      className="relative overflow-hidden py-24 md:py-36 lg:py-48"
      withContainer={true}
    >
      <div className="space-y-12 lg:space-y-16">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-brand-primary" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
              {t("eyebrow")}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.65fr)] xl:items-end">
            <h2 className="font-heading text-5xl font-black uppercase leading-[0.74] tracking-[-0.06em] text-foreground md:text-8xl 2xl:text-[136px]">
              <StaggeredText text={t("title")} />
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <FAQModule key={item.question} index={index} item={item} />
          ))}
        </div>
      </div>
    </Section>
  )
}

interface FAQModuleProps {
  index: number
  item: FAQItem
}

function FAQModule({ item, index }: FAQModuleProps): React.JSX.Element {
  const itemNumber = String(index + 1).padStart(2, "0")

  return (
    <details className="group overflow-hidden border border-foreground/8 bg-background dark:border-white/10">
      <summary className="flex cursor-pointer list-none flex-col gap-6 px-6 py-7 text-left transition-colors duration-500 marker:hidden md:px-8 md:py-8 lg:px-10 lg:py-10">
        <div className="flex items-start justify-between gap-5">
          <div className="flex min-w-0 flex-1 items-start gap-4 md:gap-6">
            <span className="font-heading text-3xl font-black leading-none text-foreground/14 transition-colors duration-500 group-hover:text-brand-primary/40 group-open:text-brand-primary/40 md:text-4xl dark:text-white/14 dark:group-hover:text-brand-primary/55 dark:group-open:text-brand-primary/55">
              {itemNumber}
            </span>

            <div className="min-w-0">
              <h3 className="font-heading text-lg font-black uppercase leading-tight tracking-[-0.04em] text-foreground transition-colors duration-500 group-open:text-brand-primary sm:text-xl md:text-2xl lg:text-3xl dark:text-white">
                {item.question}
              </h3>
            </div>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-background text-foreground/72 transition-all duration-500 group-open:border-brand-primary group-open:bg-brand-primary group-open:text-white md:h-12 md:w-12 dark:border-white/10 dark:bg-transparent dark:text-white/72">
            <CaretDownIcon
              size={22}
              weight="bold"
              className="transition-transform duration-500 group-open:rotate-180"
            />
          </div>
        </div>
      </summary>

      <div className="border-t border-foreground/8 px-6 py-7 md:px-8 md:py-8 lg:px-10 dark:border-white/10">
        <div className="space-y-5 md:ml-[3.6rem]">
          <div className="h-px w-16 bg-brand-primary/40" />
          <p className="w-full text-lg font-medium leading-relaxed text-foreground/72 md:text-xl lg:text-2xl dark:text-white/72">
            {item.answer}
          </p>
        </div>
      </div>
    </details>
  )
}
