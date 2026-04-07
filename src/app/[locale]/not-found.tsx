import * as React from "react"

import { useTranslations } from "next-intl"
import Link from "next/link"

import { Button } from "@/src/components/ui/button"

export default function NotFound(): React.JSX.Element {
  const t = useTranslations("Errors.not_found")

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-muted-foreground">{t("description")}</p>
      <Link href="/" className="mt-8">
        <Button className="rounded-full">{t("button")}</Button>
      </Link>
    </div>
  )
}
