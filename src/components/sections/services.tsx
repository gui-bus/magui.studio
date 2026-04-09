"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { ArrowUpRightIcon } from "@phosphor-icons/react"
import { m, AnimatePresence } from "framer-motion"

import { cn } from "@/src/lib/utils/utils"
import { Service } from "@/src/types/sections"
import { Section } from "@/src/components/ui/section"
import { GrainyNoise } from "@/src/components/ui/grainyNoise"
import Image from "next/image"

const SERVICE_IMAGES = [
  "/images/landing.webp",
  "/images/sales.webp",
  "/images/institutional.webp",
]

export function Services(): React.JSX.Element {
  const t = useTranslations("Index.Services")
  const idT = useTranslations("Index.Ids")
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  
  const services = React.useMemo<Service[]>(() => [
    {
      id: "01",
      title: t("landing.title"),
      label: t("landing.label"),
      description: t("landing.description"),
      color: "bg-brand-primary",
      textColor: "text-white",
    },
    {
      id: "02",
      title: t("sales.title"),
      label: t("sales.label"),
      description: t("sales.description"),
      color: "bg-zinc-900",
      textColor: "text-white",
    },
    {
      id: "03",
      title: t("institutional.title"),
      label: t("institutional.label"),
      description: t("institutional.description"),
      color: "bg-brand-secondary",
      textColor: "text-white",
    },
  ], [t])

  return (
    <Section id={idT("services")} className="border-y border-foreground/5 overflow-hidden" withContainer={false}>
      <GrainyNoise zIndex="z-50" opacity="opacity-[0.03] dark:opacity-[0.05]" />

      <div className="flex flex-col lg:flex-row h-full min-h-175 lg:h-225 w-full relative z-10">
        {services.map((service, index) => (
          <ServicePanel 
            key={service.id}
            service={service}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            image={SERVICE_IMAGES[index]}
          />
        ))}
      </div>
    </Section>
  )
}

interface ServicePanelProps {
  service: Service
  index: number
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
  image: string
}

function ServicePanel({ service, index, activeIndex, setActiveIndex, image }: ServicePanelProps) {
  const isActive = activeIndex === index
  const isOthersActive = activeIndex !== null && !isActive

  return (
    <m.div
      layout
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      animate={{ 
        width: activeIndex === null ? "33.33%" : isActive ? "65%" : "17.5%" 
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative h-full flex flex-col border-b lg:border-b-0 lg:border-r border-foreground/10 overflow-hidden transition-colors duration-700 min-h-75 lg:min-h-0",
        isActive ? "z-20" : "z-10 bg-background"
      )}
    >
      {/* BACKGROUND IMAGE WITH ZOOM */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className={cn(
            "object-cover transition-all duration-[2s] ease-out",
            isActive ? "scale-110 blur-0 opacity-40" : "scale-100 blur-sm opacity-0"
          )}
        />
        <div className={cn(
          "absolute inset-0 transition-opacity duration-700",
          isActive ? service.color : "bg-transparent",
          isActive ? "opacity-90" : "opacity-0"
        )} />
      </div>
      <div className="relative h-full w-full p-10 lg:p-24 flex flex-col justify-between z-10">
        <div className="flex items-center justify-between">
          <m.span 
            layout
            className={cn(
              "font-heading text-5xl lg:text-7xl font-black transition-colors duration-500 leading-none",
              isActive ? "text-white" : "text-foreground/10"
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
                transition={{ duration: 0.5 }}
                className="text-[11px] font-black uppercase tracking-[0.5em] text-white/60"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <h3 className={cn(
                "font-heading text-5xl lg:text-8xl font-black uppercase tracking-tighter lg:-rotate-90 whitespace-nowrap transition-all duration-500",
                isOthersActive ? "text-foreground/3" : "text-foreground/[0.07]"
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
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="font-heading text-6xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-[0.8] text-white"
              >
                {service.title}
              </m.h3>
              
              <m.p 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="max-w-2xl text-xl md:text-3xl font-medium leading-tight tracking-tight text-white/80"
              >
                {service.description}
              </m.p>
              
              <m.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="flex items-center gap-8"
              >
                <div className="h-24 w-24 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 hover:bg-white hover:text-black cursor-pointer group/btn">
                   <ArrowUpRightIcon size={40} weight="bold" className="transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </div>
                <div className="h-px w-24 bg-white/20 hidden md:block" />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between opacity-20">
           <span className="text-[10px] font-mono font-bold text-current">
             SERVICES // 2026
           </span>
           <div className="h-1 w-1 rounded-full bg-current" />
        </div>
      </div>
    </m.div>
  )
}
