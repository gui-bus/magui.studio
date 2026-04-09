import * as React from "react"
import { m, AnimatePresence } from "framer-motion"
import { CaretRight } from "@phosphor-icons/react"
import { cn } from "@/src/lib/utils/utils"
import { TRANSITION_MEDIUM } from "@/src/config/animations"

interface AccordionItemProps {
  index: number
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

export function AccordionItem({
  index,
  question,
  answer,
  isOpen,
  onClick,
}: AccordionItemProps) {
  const panelId = `accordion-panel-${index}`
  const buttonId = `accordion-button-${index}`

  return (
    <div className="border-b border-foreground/10 last:border-0">
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onClick}
        className="w-full py-10 lg:py-12 flex items-start justify-between text-left group focus-visible:outline-none"
      >
        <div className="flex gap-8 lg:gap-16">
          <span className="font-mono text-xs text-brand-primary/40 pt-2 lg:pt-3">
            [ 0{index + 1} ]
          </span>
          <span
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter transition-all duration-500 leading-tight",
              isOpen
                ? "text-foreground"
                : "text-foreground/40 group-hover:text-foreground/70"
            )}
          >
            {question}
          </span>
        </div>

        <div
          className={cn(
            "h-10 w-10 lg:h-12 lg:w-12 rounded-full border border-foreground/10 flex items-center justify-center transition-all duration-700 shrink-0 mt-1",
            isOpen
              ? "rotate-45 bg-brand-primary border-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/20"
              : "text-foreground/20 group-hover:border-foreground/30 group-hover:text-foreground/60"
          )}
        >
          <CaretRight weight="bold" className="w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-20 lg:pl-32 pr-8 lg:pr-48 pb-12 lg:pb-16">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
                  {answer}
                </p>
                <div className="h-px w-8 bg-brand-primary/40" />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
