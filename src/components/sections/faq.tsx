"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { FAQItem } from "@/src/types/sections"
import { CaretDownIcon } from "@phosphor-icons/react"
import { AnimatePresence, m } from "framer-motion"

import { Section } from "@/src/components/ui/section"
import { StaggeredText } from "@/src/components/ui/staggeredText"

import { cn } from "@/src/lib/utils/utils"

export function FAQ(): React.JSX.Element {
  const t = useTranslations("Index.FAQ")
  const idT = useTranslations("Index.Ids")
  const items = t.raw("items") as FAQItem[]

  return (
    <Section
      id={idT("faq")}
      className="relative overflow-hidden border-t border-foreground/5 py-24 md:py-36 lg:py-48"
      withContainer={true}
    >
      <div className="space-y-12 lg:space-y-16">
        <div className="space-y-8">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-brand-primary" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary">
              {t("eyebrow")}
            </span>
          </m.div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.65fr)] xl:items-end">
            <h2 className="max-w-6xl font-heading text-5xl font-black uppercase leading-[0.8] tracking-[-0.05em] text-foreground md:text-7xl xl:text-[112px]">
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
  const [isOpen, setIsOpen] = React.useState(false)
  const panelId = React.useId()
  const itemNumber = String(index + 1).padStart(2, "0")

  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="overflow-hidden border border-foreground/8 bg-background dark:border-white/10"
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          "group flex w-full flex-col gap-6 px-6 py-7 text-left transition-colors duration-500 md:px-8 md:py-8 lg:px-10 lg:py-10",
          isOpen ? "bg-foreground/3 dark:bg-white/3" : ""
        )}
      >
        <div className="flex items-start justify-between gap-5">
          <div className="flex min-w-0 flex-1 items-start gap-4 md:gap-6">
            <span className="font-heading text-3xl font-black leading-none text-foreground/14 transition-colors duration-500 group-hover:text-brand-primary/40 md:text-4xl dark:text-white/14 dark:group-hover:text-brand-primary/55">
              {itemNumber}
            </span>

            <div className="min-w-0">
              <h3
                className={cn(
                  "font-heading text-lg font-black uppercase leading-tight tracking-[-0.04em] transition-colors duration-500 sm:text-xl md:text-2xl lg:text-3xl",
                  isOpen
                    ? "text-brand-primary"
                    : "text-foreground dark:text-white"
                )}
              >
                {item.question}
              </h3>
            </div>
          </div>

          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-foreground/72 transition-all duration-500 md:h-12 md:w-12 dark:border-white/10 dark:text-white/72",
              isOpen
                ? "border-brand-primary bg-brand-primary text-white"
                : "bg-background dark:bg-transparent"
            )}
          >
            <CaretDownIcon
              size={22}
              weight="bold"
              className={cn(
                "transition-transform duration-500",
                isOpen ? "rotate-180" : ""
              )}
            />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <m.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-foreground/8 px-6 py-7 md:px-8 md:py-8 lg:px-10 dark:border-white/10">
              <div className="space-y-5 md:ml-[3.6rem]">
                <div className="h-px w-16 bg-brand-primary/40" />
                <p className="w-full text-lg font-medium leading-relaxed text-foreground/72 md:text-xl lg:text-2xl dark:text-white/72">
                  {item.answer}
                </p>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </m.article>
  )
}
