"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { Button } from "@/src/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps): React.JSX.Element {
  const t = useTranslations("Errors.general")

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-muted-foreground">{t("description")}</p>
      <Button onClick={() => reset()} className="mt-8 rounded-full">
        {t("button")}
      </Button>
    </div>
  )
}
