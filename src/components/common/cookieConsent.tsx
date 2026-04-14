"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { GoogleAnalytics } from "@next/third-parties/google"
import { AnimatePresence, m } from "framer-motion"
import Cookies from "js-cookie"

import { Button } from "@/src/components/ui/button"

interface CookieConsentProps {
  gaId?: string
}

export function CookieConsent({
  gaId,
}: CookieConsentProps): React.JSX.Element | null {
  const t = useTranslations("CookieConsent")
  const [showBanner, setShowBanner] = React.useState(false)
  const [consent, setConsent] = React.useState<"accepted" | "declined" | null>(
    null
  )

  React.useEffect(() => {
    const storedConsent = Cookies.get("cookie-consent")

    if (storedConsent === "accepted" || storedConsent === "declined") {
      setConsent(storedConsent)
      return
    }

    if (!storedConsent) {
      setShowBanner(true)
    }
  }, [])

  const handleConsent = (value: "accepted" | "declined"): void => {
    Cookies.set("cookie-consent", value, { expires: 365 })
    setConsent(value)
    setShowBanner(false)
  }

  return (
    <>
      {gaId && consent === "accepted" ? <GoogleAnalytics gaId={gaId} /> : null}

      <AnimatePresence>
        {showBanner && (
          <m.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed right-6 bottom-6 left-6 z-50 mx-auto max-w-2xl"
          >
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/95 p-6 shadow-2xl backdrop-blur-xl sm:flex-row">
              <p className="text-sm text-muted-foreground">{t("message")}</p>
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConsent("declined")}
                  className="rounded-full"
                >
                  {t("decline")}
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleConsent("accepted")}
                  className="rounded-full bg-brand-primary hover:bg-brand-primary/90"
                >
                  {t("accept")}
                </Button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
