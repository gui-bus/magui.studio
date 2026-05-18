"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  CheckCircleIcon,
  TicketIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { useForm } from "react-hook-form"

import { Button } from "@/src/components/ui/button"

import { trackEvent } from "@/src/lib/analytics"
import { cn } from "@/src/lib/utils/utils"
import {
  ProjectInquiryFormData,
  createProjectInquirySchema,
} from "@/src/lib/validations/projectInquiry"

interface ProjectInquiryFormProps {
  origin: "hero" | "contact" | "contactPage"
}

interface LeadSubmissionResponse {
  deduplicated?: boolean
  message?: string
  success: boolean
}

interface TextFieldProps {
  children: React.ReactNode
  hasError?: boolean
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)

  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : ""
  }

  if (digits.length <= 3) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`
}

function TextField({
  children,
  hasError = false,
}: TextFieldProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "border-b px-0 py-3 transition-all",
        hasError
          ? "border-red-500/70"
          : "border-border/60 focus-within:border-foreground"
      )}
    >
      {children}
    </div>
  )
}

export function ProjectInquiryForm({
  origin,
}: ProjectInquiryFormProps): React.JSX.Element {
  const t = useTranslations("Index.ContactDrawer")
  const searchParams = useSearchParams()
  const referral = searchParams.get("referral")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [submissionError, setSubmissionError] = React.useState<string | null>(
    null
  )
  const [formStartedAt] = React.useState<number>(() => Date.now())
  const idPrefix = React.useId()

  const schema = React.useMemo(
    () =>
      createProjectInquirySchema({
        companyMin: t("validation.companyMin"),
        contactMin: t("validation.contactMin"),
        emailInvalid: t("validation.emailInvalid"),
        emailOrPhoneRequired: t("validation.emailOrPhoneRequired"),
        phoneMin: t("validation.phoneMin"),
        websiteInvalid: t("validation.websiteInvalid"),
        instagramInvalid: t("validation.instagramInvalid"),
        messageMin: t("validation.messageMin"),
      }),
    [t]
  )

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectInquiryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "",
      email: "",
      instagram: "",
      message: "",
      name: "",
      phone: "",
      website: "",
    },
  })

  const phoneField = register("phone", {
    onChange: (event) => {
      const formattedValue = formatPhoneNumber(event.target.value)
      setValue("phone", formattedValue, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      })
    },
  })

  const onSubmit = React.useCallback(
    async (data: ProjectInquiryFormData): Promise<void> => {
      setIsSubmitting(true)
      setSubmissionError(null)

      try {
        const response = await fetch("/api/leads", {
          body: JSON.stringify({
            ...data,
            formStartedAt,
            honeypot: "",
            origin,
            pageUrl: window.location.href,
            referral: referral ?? undefined,
            referrer: document.referrer || undefined,
            utmCampaign: searchParams.get("utm_campaign") ?? undefined,
            utmContent: searchParams.get("utm_content") ?? undefined,
            utmMedium: searchParams.get("utm_medium") ?? undefined,
            utmSource: searchParams.get("utm_source") ?? undefined,
            utmTerm: searchParams.get("utm_term") ?? undefined,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          cache: "no-store",
        })
        const result = (await response.json()) as LeadSubmissionResponse

        if (!response.ok || !result.success) {
          throw new Error("lead_submission_failed")
        }

        trackEvent("generate_lead", {
          has_email: Boolean(data.email),
          has_instagram: Boolean(data.instagram),
          has_phone: Boolean(data.phone),
          has_website: Boolean(data.website),
          origin,
          referral: Boolean(referral),
        })
        setIsSuccess(true)
        reset()
      } catch {
        trackEvent("inquiry_submit_error", {
          origin,
        })
        setSubmissionError(t("errorMessage"))
      } finally {
        setIsSubmitting(false)
      }
    },
    [formStartedAt, origin, referral, reset, searchParams, t]
  )

  if (isSuccess) {
    return (
      <section className="px-0 py-16 text-center md:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6">
          <CheckCircleIcon
            size={52}
            weight="fill"
            className="text-brand-primary"
          />
          <div className="space-y-4">
            <h2 className="font-heading text-5xl font-black uppercase tracking-[-0.07em] text-foreground sm:text-6xl">
              {t("successTitle")}
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t("successMessage")}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {referral ? (
        <section className="border border-brand-primary/20 px-5 py-5">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center border border-brand-primary/30 text-brand-primary">
              <TicketIcon size={18} weight="fill" />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-brand-primary">
                {t("referralLabel")}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("referralText", { name: referral })}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-8 sm:px-7 sm:py-10">
        <div className="space-y-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
            {t("requiredNotePrefix")}{" "}
            <span className="font-bold text-red-500">*</span>{" "}
            {t("requiredNoteSuffix")}
          </p>

          <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
            <label
              className="space-y-3 md:col-span-2"
              htmlFor={`${idPrefix}-company`}
            >
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                {t("fields.company.label")}
                <span className="ml-1 text-red-500">*</span>
              </span>
              <TextField hasError={Boolean(errors.company)}>
                <input
                  {...register("company")}
                  id={`${idPrefix}-company`}
                  placeholder={t("fields.company.placeholder")}
                  aria-describedby={
                    errors.company ? `${idPrefix}-company-error` : undefined
                  }
                  aria-invalid={Boolean(errors.company)}
                  className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                />
              </TextField>
              {errors.company ? (
                <span
                  id={`${idPrefix}-company-error`}
                  className="flex items-center gap-2 text-sm text-red-600"
                >
                  <WarningCircleIcon size={16} weight="fill" />
                  {errors.company.message}
                </span>
              ) : null}
            </label>

            <label className="space-y-3" htmlFor={`${idPrefix}-name`}>
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                {t("fields.name.label")}
              </span>
              <TextField hasError={Boolean(errors.name)}>
                <input
                  {...register("name")}
                  id={`${idPrefix}-name`}
                  placeholder={t("fields.name.placeholder")}
                  aria-describedby={
                    errors.name ? `${idPrefix}-name-error` : undefined
                  }
                  aria-invalid={Boolean(errors.name)}
                  className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                />
              </TextField>
              {errors.name ? (
                <span
                  id={`${idPrefix}-name-error`}
                  className="flex items-center gap-2 text-sm text-red-600"
                >
                  <WarningCircleIcon size={16} weight="fill" />
                  {errors.name.message}
                </span>
              ) : null}
            </label>

            <label className="space-y-3" htmlFor={`${idPrefix}-phone`}>
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                {t("fields.phone.label")}
              </span>
              <TextField hasError={Boolean(errors.phone)}>
                <input
                  {...phoneField}
                  id={`${idPrefix}-phone`}
                  placeholder={t("fields.phone.placeholder")}
                  aria-describedby={
                    errors.phone ? `${idPrefix}-phone-error` : undefined
                  }
                  aria-invalid={Boolean(errors.phone)}
                  inputMode="numeric"
                  className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                />
              </TextField>
              {errors.phone ? (
                <span
                  id={`${idPrefix}-phone-error`}
                  className="flex items-center gap-2 text-sm text-red-600"
                >
                  <WarningCircleIcon size={16} weight="fill" />
                  {errors.phone.message}
                </span>
              ) : null}
            </label>

            <label className="space-y-3" htmlFor={`${idPrefix}-email`}>
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                {t("fields.email.label")}
                <span className="ml-1 text-red-500">*</span>
              </span>
              <TextField hasError={Boolean(errors.email)}>
                <input
                  {...register("email")}
                  id={`${idPrefix}-email`}
                  type="email"
                  placeholder={t("fields.email.placeholder")}
                  aria-describedby={
                    errors.email ? `${idPrefix}-email-error` : undefined
                  }
                  aria-invalid={Boolean(errors.email)}
                  className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                />
              </TextField>
              {errors.email ? (
                <span
                  id={`${idPrefix}-email-error`}
                  className="flex items-center gap-2 text-sm text-red-600"
                >
                  <WarningCircleIcon size={16} weight="fill" />
                  {errors.email.message}
                </span>
              ) : null}
            </label>

            <label className="space-y-3" htmlFor={`${idPrefix}-website`}>
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                {t("fields.website.label")}
              </span>
              <TextField hasError={Boolean(errors.website)}>
                <input
                  {...register("website")}
                  id={`${idPrefix}-website`}
                  placeholder={t("fields.website.placeholder")}
                  aria-describedby={
                    errors.website ? `${idPrefix}-website-error` : undefined
                  }
                  aria-invalid={Boolean(errors.website)}
                  className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                />
              </TextField>
              {errors.website ? (
                <span
                  id={`${idPrefix}-website-error`}
                  className="flex items-center gap-2 text-sm text-red-600"
                >
                  <WarningCircleIcon size={16} weight="fill" />
                  {errors.website.message}
                </span>
              ) : null}
            </label>

            <label className="space-y-3" htmlFor={`${idPrefix}-instagram`}>
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                {t("fields.instagram.label")}
              </span>
              <TextField hasError={Boolean(errors.instagram)}>
                <input
                  {...register("instagram")}
                  id={`${idPrefix}-instagram`}
                  placeholder={t("fields.instagram.placeholder")}
                  aria-describedby={
                    errors.instagram ? `${idPrefix}-instagram-error` : undefined
                  }
                  aria-invalid={Boolean(errors.instagram)}
                  className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                />
              </TextField>
              {errors.instagram ? (
                <span
                  id={`${idPrefix}-instagram-error`}
                  className="flex items-center gap-2 text-sm text-red-600"
                >
                  <WarningCircleIcon size={16} weight="fill" />
                  {errors.instagram.message}
                </span>
              ) : null}
            </label>

            <label
              className="space-y-3 md:col-span-2"
              htmlFor={`${idPrefix}-message`}
            >
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                {t("fields.message.label")}
              </span>
              <TextField hasError={Boolean(errors.message)}>
                <textarea
                  {...register("message")}
                  id={`${idPrefix}-message`}
                  rows={5}
                  placeholder={t("fields.message.placeholder")}
                  aria-describedby={
                    errors.message ? `${idPrefix}-message-error` : undefined
                  }
                  aria-invalid={Boolean(errors.message)}
                  className="min-h-28 w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                />
              </TextField>
              {errors.message ? (
                <span
                  id={`${idPrefix}-message-error`}
                  className="flex items-center gap-2 text-sm text-red-600"
                >
                  <WarningCircleIcon size={16} weight="fill" />
                  {errors.message.message}
                </span>
              ) : null}
            </label>
          </div>

          {submissionError ? (
            <p className="border border-red-500/30 px-5 py-4 text-sm leading-relaxed text-destructive">
              {submissionError}
            </p>
          ) : null}

          <div className="flex flex-col gap-4 border-t border-border/40 pt-6 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 min-w-52 rounded-none bg-foreground px-6 text-[11px] font-black uppercase tracking-[0.35em] text-background hover:bg-brand-primary"
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </div>
        </div>
      </section>
    </form>
  )
}
