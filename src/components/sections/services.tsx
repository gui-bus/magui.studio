"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { ArrowUpRight } from "@phosphor-icons/react"
import { m, AnimatePresence } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"
import { Service } from "@/src/types/sections"
import { Section } from "@/src/components/ui/section"
import { TRANSITION_MEDIUM } from "@/src/config/animations"

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Services(): React.JSX.Element {
  const t = useTranslations("Index.Services")
  const idT = useTranslations("Index.Ids")
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  
  const services = React.useMemo<Service[]>(() => [
    {
      id: "01",
      title: t("uiux.title"),
      label: t("uiux.label"),
      description: t("uiux.description"),
      color: "bg-brand-primary",
      textColor: "text-white",
    },
    {
      id: "02",
      title: t("frontend.title"),
      label: t("frontend.label"),
      description: t("frontend.description"),
      color: "bg-foreground",
      textColor: "text-background",
    },
    {
      id: "03",
      title: t("performance.title"),
      label: t("performance.label"),
      description: t("performance.description"),
      color: "bg-brand-secondary",
      textColor: "text-white",
    },
  ], [t])

  return (
    <Section id={idT("services")} className="border-y border-foreground/5" withContainer={false}>
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} aria-hidden="true" />

      <div className="flex flex-col lg:flex-row h-full min-h-[600px] lg:h-[800px] w-full relative z-10">
        {services.map((service, index) => {
          const isActive = activeIndex === index
          const isOthersActive = activeIndex !== null && !isActive

          return (
            <m.div
              key={index}
              layout
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              animate={{ 
                width: activeIndex === null ? "33.33%" : isActive ? "60%" : "20%" 
              }}
              transition={{ duration: 1, ease: EASE_APPLE }}
              className={cn(
                "relative h-full flex flex-col border-b lg:border-b-0 lg:border-r border-foreground/5 overflow-hidden transition-colors duration-1000 min-h-[200px] lg:min-h-0",
                isActive ? service.color : "bg-background"
              )}
            >
              <div className="relative h-full w-full p-12 lg:p-20 flex flex-col justify-between">
                <div className="flex items-center justify-between overflow-hidden">
                  <m.span 
                    layout
                    className={cn(
                      "font-heading text-4xl lg:text-6xl font-black transition-colors duration-500",
                      isActive ? service.textColor : "text-brand-primary/20"
                    )}
                  >
                    {service.id}
                  </m.span>
                  <AnimatePresence>
                    {isActive && (
                      <m.span
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, ease: EASE_APPLE }}
                        className={cn("text-[10px] font-black uppercase tracking-[0.6em]", service.textColor)}
                      >
                        {service.label}
                      </m.span>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {!isActive ? (
                    <m.div
                      key="vertical"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={TRANSITION_MEDIUM}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <h3 className={cn(
                        "font-heading text-5xl lg:text-7xl font-black uppercase tracking-tighter lg:rotate-[-90deg] whitespace-nowrap transition-colors duration-500",
                        isOthersActive ? "text-foreground/5" : "text-foreground/10"
                      )}>
                        {service.title}
                      </h3>
                    </m.div>
                  ) : (
                    <m.div
                      key="horizontal"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { 
                          opacity: 1,
                          transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
                        }
                      }}
                      className="space-y-12"
                    >
                      <m.h3 
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={TRANSITION_MEDIUM}
                        className={cn("font-heading text-6xl md:text-8xl lg:text-[100px] font-black uppercase tracking-[-0.05em] leading-[0.85]", service.textColor)}
                      >
                        {service.title}
                      </m.h3>
                      <m.p 
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={TRANSITION_MEDIUM}
                        className={cn("max-w-2xl text-xl md:text-3xl font-medium leading-tight tracking-tight opacity-80", service.textColor)}
                      >
                        {service.description}
                      </m.p>
                      
                      <m.div 
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "h-24 w-24 rounded-full border flex items-center justify-center transition-all duration-700 group cursor-pointer",
                          service.textColor === "text-white" ? "border-white/20 hover:bg-white hover:text-brand-primary" : "border-background/20 hover:bg-background hover:text-foreground"
                        )}
                      >
                         <ArrowUpRight size={40} weight="bold" aria-hidden="true" />
                      </m.div>
                    </m.div>
                  )}
                </AnimatePresence>

                <div className="flex items-end justify-between">
                   <m.div 
                     layout
                     className={cn(
                       "h-px transition-all duration-1000",
                       isActive ? "w-full bg-current opacity-20" : "w-12 bg-foreground/10"
                     )} 
                   />
                </div>
              </div>

              <div className={cn(
                "absolute inset-0 z-0 opacity-10 transition-opacity duration-1000 pointer-events-none",
                isActive ? "opacity-20" : "opacity-0"
              )} 
                   style={{ backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
                   aria-hidden="true"
              />
            </m.div>
          )
        })}
      </div>
    </Section>
  )
}
