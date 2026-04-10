"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"

import { Service } from "@/src/types/sections"
import { ArrowUpRightIcon } from "@phosphor-icons/react"
import { AnimatePresence, m } from "framer-motion"

import { Section } from "@/src/components/ui/section"
import { StaggeredText } from "@/src/components/ui/staggeredText"

import { cn } from "@/src/lib/utils/utils"

import { VARIANTS_FADE_IN_UP } from "@/src/config/animations"

const SERVICE_IMAGES = [
  "/images/landing.webp",
  "/images/sales.webp",
  "/images/institutional.webp",
]

export function Services(): React.JSX.Element {
  const t = useTranslations("Index.Services")
  const idT = useTranslations("Index.Ids")
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile && activeIndex === null) {
        setActiveIndex(0)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [activeIndex])

  const services = React.useMemo<Service[]>(
    () => [
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
    ],
    [t]
  )

  return (
    <Section
      id={idT("services")}
      className="border-y border-foreground/5 overflow-hidden py-24 md:py-44"
      withContainer={false}
    >
      <div className="container px-6 md:px-10 mb-20 md:mb-32 relative">
        <div className="flex flex-col gap-12 md:gap-24">
          <div className="space-y-8 md:space-y-12">
            <m.div
              variants={VARIANTS_FADE_IN_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-12 bg-brand-primary" />
              <m.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary"
              >
                {t("eyebrow")}
              </m.span>
            </m.div>

            <h2 className="font-heading text-5xl md:text-9xl lg:text-[160px] font-black leading-[0.85] md:leading-[0.7] tracking-[-0.06em] text-foreground uppercase select-none">
              <m.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                <StaggeredText text={t("title_1")} />
              </m.div>
              <m.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
                className="block text-brand-primary mt-2 md:mt-4"
              >
                <StaggeredText text={t("title_2")} delayBase={0.3} />
              </m.div>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <m.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="max-w-4xl text-xl md:text-3xl lg:text-5xl text-muted-foreground font-medium leading-tight tracking-tighter"
            >
              {t("description")}
            </m.p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-full md:min-h-275 lg:h-225 w-full relative z-10 border-t border-foreground/5 bg-foreground/5 gap-px">
        {services.map((service, index) => (
          <ServicePanel
            key={service.id}
            service={service}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            image={SERVICE_IMAGES[index]}
            isMobile={isMobile}
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
  isMobile: boolean
}

function ServicePanel({
  service,
  index,
  activeIndex,
  setActiveIndex,
  image,
  isMobile,
}: ServicePanelProps) {
  const t = useTranslations("Index.Services")
  const isActive = activeIndex === index
  const isOthersActive = activeIndex !== null && !isActive

  return (
    <m.div
      layout
      onMouseEnter={() => !isMobile && setActiveIndex(index)}
      onMouseLeave={() => !isMobile && setActiveIndex(null)}
      onClick={() => isMobile && setActiveIndex(index)}
      animate={{
        width: isMobile
          ? "100%"
          : activeIndex === null
            ? "33.33%"
            : isActive
              ? "65%"
              : "17.5%",
        height: isMobile ? (isActive ? "70%" : "15%") : "100%",
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative h-full flex flex-col overflow-hidden transition-colors duration-700",
        isActive ? "z-20 shadow-2xl" : "z-10 bg-background"
      )}
    >
      <AnimatePresence>
        {isActive && (
          <m.div
            initial={{
              clipPath: isMobile ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)",
            }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{
              clipPath: isMobile ? "inset(100% 0 0 0)" : "inset(0 0 0 100%)",
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover scale-110 blur-0 opacity-40"
            />
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-700 opacity-90",
                service.color
              )}
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
          </m.div>
        )}
      </AnimatePresence>

      <div className="relative h-full w-full p-8 lg:p-24 flex flex-col justify-between z-10">
        <div className="flex items-center justify-between">
          <m.span
            layout
            className={cn(
              "font-heading text-4xl lg:text-7xl font-black transition-colors duration-500 leading-none",
              isActive ? "text-white" : "text-foreground/10"
            )}
          >
            {service.id}
          </m.span>

          <AnimatePresence>
            {isActive && (
              <m.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4"
              >
                <div className="h-px w-8 bg-white/30" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-white/60">
                  {service.label}
                </span>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={cn(
            "relative flex-1 flex justify-start",
            isActive ? "" : "ml-16 md:ml-0"
          )}
        >
          <AnimatePresence mode="wait">
            {!isActive ? (
              <m.div
                key="vertical"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center pointer-events-none"
              >
                <h3
                  className={cn(
                    "font-heading text-lg md:text-5xl font-black uppercase tracking-tighter lg:-rotate-90 whitespace-nowrap transition-all duration-500 text-white -mt-8 md:mt-0"
                  )}
                >
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
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                }}
                className="space-y-6 md:space-y-12"
              >
                <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-white/20 pointer-events-none" />

                <m.h3
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="font-heading text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white mt-5"
                >
                  <StaggeredText text={service.title} />
                </m.h3>

                <m.p
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="max-w-2xl text-lg md:text-3xl font-medium leading-tight tracking-tight text-white/80"
                >
                  {service.description}
                </m.p>

                <m.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  className="flex items-center gap-8"
                >
                  <div className="h-16 w-16 md:h-24 md:w-24 rounded-full border border-white flex items-center justify-center transition-all duration-500 hover:bg-white text-white hover:text-black cursor-pointer group/btn shadow-2xl">
                    <ArrowUpRightIcon
                      size={isMobile ? 24 : 40}
                      weight="bold"
                      className="transition-transform duration-500 group-hover/btn:rotate-45"
                    />
                  </div>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </m.div>
  )
}
