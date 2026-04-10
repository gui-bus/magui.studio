"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { AnimatePresence, Variants, m } from "framer-motion"

export function Preloader(): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true)
  const configT = useTranslations("Config")

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const [mainText, studioText] = configT("name").split(".")

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.05 * i },
    }),
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
      },
    },
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 1,
            transition: { duration: 1 },
          }}
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-transparent"
        >
          <m.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            }}
            className="absolute inset-0 z-20 bg-background"
          />

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute z-25 w-75 h-75 bg-brand-primary/5 rounded-full blur-[60px] pointer-events-none"
          />

          <m.div
            className="relative z-40 flex flex-col items-center"
            variants={container}
            initial="hidden"
            animate="visible"
            exit={{
              y: -60,
              opacity: 0,
              filter: "blur(8px)",
              transition: { duration: 0.4, ease: "circIn" },
            }}
          >
            <div className="flex items-baseline overflow-hidden">
              {mainText.split("").map((letter, index) => (
                <m.span
                  key={index}
                  variants={child}
                  className="font-heading text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.05em] text-foreground leading-none"
                >
                  {letter}
                </m.span>
              ))}
              {studioText && (
                <>
                  <m.span
                    variants={child}
                    className="font-heading text-5xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] text-brand-primary leading-none"
                  >
                    .
                  </m.span>
                  <div className="flex">
                    {studioText.split("").map((letter, index) => (
                      <m.span
                        key={index}
                        variants={child}
                        className="font-heading text-5xl md:text-8xl lg:text-9xl font-light lowercase tracking-[-0.05em] text-foreground leading-none"
                      >
                        {letter}
                      </m.span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
