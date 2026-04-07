"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { ArrowRight, Cpu, Pulse } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { Button } from "@/src/components/ui/button"

import { LanguageSwitcher } from "@/src/components/common/languageSwitcher"
import { ThemeToggle } from "@/src/components/common/themeToggle"

export default function Page(): React.JSX.Element {
  const t = useTranslations("Index")

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-background font-sans text-foreground selection:bg-brand-primary/30 selection:text-brand-primary uppercase tracking-tighter">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-radial-gradient from-brand-primary/5 via-transparent to-transparent opacity-50" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 backdrop-blur-md bg-background/40 border-b border-border/40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-brand-primary/20 rotate-45" />
            <Cpu
              weight="fill"
              className="h-4 w-4 text-brand-primary relative z-10"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-[10px] font-bold leading-none tracking-[0.2em] text-foreground">
              PROJECT_TEMPLATE
            </span>
            <span className="font-mono text-[8px] tracking-[0.1em] text-muted-foreground/60 mt-1">
              V16.1.7_STABLE
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <LanguageSwitcher />
          <div className="h-4 w-px bg-border/60" />
          <ThemeToggle />
        </motion.div>
      </header>

      <main className="relative z-10 flex min-h-svh flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-12 lg:px-24 pt-32 pb-24 text-left">
        <div className="flex-1 space-y-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-brand-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-primary">
              System Infrastructure Ready
            </span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-heading text-7xl font-black uppercase leading-[0.8] tracking-[-0.06em] sm:text-8xl lg:text-[11rem] drop-shadow-sm"
            >
              {t("title")}
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-gradient-to-r from-brand-primary to-transparent"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-[580px] normal-case tracking-normal font-medium"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-10 pt-4"
          >
            <Button
              size="lg"
              className="group h-16 px-10 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90 transition-all duration-300 font-bold uppercase text-xs tracking-[0.2em] shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {t("button")}
              <ArrowRight
                weight="bold"
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Button>

            <div className="flex flex-col justify-center border-l border-border/60 pl-8">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2">
                Network Status
              </span>
              <div className="flex items-center gap-3">
                <div className="flex h-2 w-2 items-center justify-center">
                  <div className="h-full w-full rounded-full bg-brand-primary animate-ping opacity-40" />
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-brand-primary" />
                </div>
                <span className="text-[11px] text-foreground font-mono font-bold tracking-widest leading-none">
                  CORE_SYNC_ACTIVE
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:flex items-center justify-center w-[500px] h-[500px]"
        >
          <div className="absolute inset-0 rounded-full border border-brand-primary/10 animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-12 rounded-full border-2 border-dashed border-border/20 animate-[spin_25s_linear_infinite_reverse]" />

          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-72 w-72 bg-card/40 backdrop-blur-2xl border border-border/60 shadow-2xl rounded-3xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
              <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <Pulse
                    weight="bold"
                    className="h-5 w-5 text-brand-primary/40"
                  />
                  <span className="font-mono text-[10px] text-brand-primary font-bold">
                    NODE_01
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="h-1 w-12 bg-brand-primary/20" />
                  <div className="h-1 w-24 bg-brand-primary/40" />
                  <div className="h-1 w-16 bg-brand-primary/20" />
                </div>
              </div>
              <div className="relative flex flex-col items-center gap-4 text-center">
                <div className="h-20 w-20 border-4 border-brand-primary rounded-full border-t-transparent animate-spin" />
                <span className="font-mono text-[9px] text-brand-primary tracking-[0.4em] font-black">
                  UPLINKING
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-between px-6 py-4 md:px-12 md:py-6 backdrop-blur-sm bg-background/10">
        <div className="flex flex-col gap-2 text-left">
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted-foreground/40">
            Interface Protocol
          </p>
          <div className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-[0.2em] flex items-center gap-2">
            Active_Session
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-right">
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted-foreground/40">
            Deployment Status
          </p>
          <p className="font-mono text-[10px] text-brand-primary font-bold uppercase tracking-[0.2em]">
            SYSTEM_STABLE_V1
          </p>
        </div>
      </footer>
    </div>
  )
}
