import * as React from "react"

import { getMessages, getTranslations } from "next-intl/server"
import Image from "next/image"

import { ProcessStep } from "@/src/types/sections"

import { Section } from "@/src/components/ui/section"
import {
  BracketsCurlyIcon,
  CompassRoseIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
} from "@/src/components/ui/serverIcons"
import { StaggeredText } from "@/src/components/ui/staggeredText"

const PROCESS_IMAGES = [
  "/images/strategy.webp",
  "/images/code.webp",
  "/images/ui.webp",
  "/images/landing.webp",
] as const

const PROCESS_ICONS = [
  CompassRoseIcon,
  BracketsCurlyIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
] as const

export async function Process(): Promise<React.JSX.Element> {
  const t = await getTranslations("Index.Process")
  const idT = await getTranslations("Index.Ids")
  const messages = await getMessages()
  const steps = messages.Index.Process.steps as ProcessStep[]

  return (
    <Section
      id={idT("process")}
      className="py-24 md:py-36 lg:py-48"
      withContainer={true}
    >
      <div className="mb-14 flex flex-col gap-10 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-brand-primary">
              {t("eyebrow")}
            </span>
          </div>

          <h2 className="font-heading text-5xl font-black uppercase leading-[0.8] tracking-[-0.06em] text-foreground md:text-7xl lg:text-[132px]">
            <span className="block">
              <StaggeredText text={t("title_1")} />
            </span>
            <span className="mt-2 block text-brand-primary lg:ml-24">
              <StaggeredText text={t("title_2")} />
            </span>
          </h2>
        </div>

        <p className="max-w-3xl text-xl font-medium leading-tight tracking-tight text-muted-foreground md:text-3xl">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-4xl border border-foreground/8 bg-foreground/8 xl:grid-cols-2">
        {steps.map((step, index) => (
          <ProcessCard
            key={step.title}
            index={index}
            methodLabel={t("method_label")}
            step={step}
            stepLabel={t("step_label", {
              step: String(index + 1).padStart(2, "0"),
            })}
          />
        ))}
      </div>
    </Section>
  )
}

interface ProcessCardProps {
  index: number
  methodLabel: string
  step: ProcessStep
  stepLabel: string
}

function ProcessCard({
  index,
  methodLabel,
  step,
  stepLabel,
}: ProcessCardProps): React.JSX.Element {
  const Icon = PROCESS_ICONS[index] ?? RocketLaunchIcon
  const imageSrc = PROCESS_IMAGES[index] ?? PROCESS_IMAGES[0]
  const stepId = String(index + 1).padStart(2, "0")
  const clipPath =
    index % 2 === 0
      ? "polygon(0 0, calc(100% - 56px) 0, 100% 56px, 100% 100%, 0 100%)"
      : "polygon(56px 0, 100% 0, 100% 100%, 0 100%, 0 56px)"

  return (
    <article className="group relative bg-background p-8 md:p-10 lg:p-12">
      <div className="relative z-10 flex h-full flex-col gap-10">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-brand-primary">
              {stepLabel}
            </span>
            <h3 className="font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-foreground md:text-6xl">
              {step.title}
            </h3>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border/60 bg-foreground text-background transition-transform duration-500 group-hover:scale-110 dark:bg-white dark:text-black">
            <Icon size={26} weight="bold" />
          </div>
        </div>

        <p className="max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground md:text-2xl">
          {step.description}
        </p>

        <div
          className="relative overflow-hidden border border-foreground/8"
          style={{ clipPath }}
        >
          <div className="relative h-56 w-full md:h-72">
            <Image
              src={imageSrc}
              alt={step.title}
              fill
              sizes="(max-width: 1280px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-white backdrop-blur-sm">
            <Icon size={16} weight="fill" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              {step.title}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-[auto_1fr] gap-px bg-white/10">
            <div className="bg-black/45 px-5 py-4 text-2xl font-black text-white">
              {stepId}
            </div>
            <div className="bg-black/20 px-5 py-4 text-[11px] font-black uppercase tracking-[0.38em] text-white/70">
              {methodLabel}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
