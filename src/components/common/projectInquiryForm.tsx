"use client"

import * as React from "react"

import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CaretLeftIcon,
  CheckCircleIcon,
  ClockCountdownIcon,
  LockSimpleIcon,
  TicketIcon,
  UserCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { AnimatePresence, m } from "framer-motion"
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
  web3FormsAccessKey: string
}

interface ProjectInquiryOption {
  value: string
  label: string
}

interface ProjectInquirySelectionGroupProps {
  errorMessage?: string
  hasError?: boolean
  label: string
  name: "projectType" | "budget" | "deadline"
  options: ProjectInquiryOption[]
  selectedValue: string
  onSelect: (value: string) => void
  required?: boolean
}

interface StepItem {
  icon: React.ReactNode
  title: string
}

interface FormSectionProps {
  eyebrow: string
  title: string
  description?: string
  requiredNote: React.ReactNode
  children: React.ReactNode
}

interface TextFieldProps {
  children: React.ReactNode
  hasError?: boolean
}

interface Web3FormsClientResponse {
  message?: string
  success: boolean
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)

  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : ""
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function FormSection({
  eyebrow,
  title,
  description,
  requiredNote,
  children,
}: FormSectionProps): React.JSX.Element {
  return (
    <section className="space-y-5 rounded-4xl bg-background/92 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-6">
      <header className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.34em] text-brand-primary/80">
          {eyebrow}
        </p>
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h3>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        <p className="text-[11px] leading-relaxed text-muted-foreground/80">
          {requiredNote}
        </p>
      </header>

      {children}
    </section>
  )
}

function ProjectInquirySelectionGroup({
  errorMessage,
  hasError = false,
  label,
  name,
  options,
  selectedValue,
  onSelect,
  required = false,
}: ProjectInquirySelectionGroupProps): React.JSX.Element {
  return (
    <fieldset className="space-y-3">
      <legend className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={`${name}-${option.value}`}
            type="button"
            onClick={(): void => onSelect(option.value)}
            className={cn(
              "rounded-3xl border px-4 py-3 text-left text-[11px] font-black uppercase tracking-[0.22em] transition-all",
              selectedValue === option.value
                ? "border-transparent bg-foreground text-background shadow-lg shadow-black/8 dark:bg-white dark:text-black"
                : hasError
                  ? "border-red-500/60 bg-red-500/6 text-foreground hover:border-red-500 hover:bg-red-500/10"
                  : "border-transparent bg-muted/24 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      {errorMessage ? (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <WarningCircleIcon size={16} weight="fill" />
          {errorMessage}
        </p>
      ) : null}
    </fieldset>
  )
}

function TextField({
  children,
  hasError = false,
}: TextFieldProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "rounded-[1.35rem] border bg-muted/18 px-3.5 py-2.5 transition-all",
        hasError
          ? "border-red-500/70 bg-red-500/3 ring-1 ring-red-500/15"
          : "border-transparent focus-within:bg-muted/26 focus-within:ring-1 focus-within:ring-brand-primary/40"
      )}
    >
      {children}
    </div>
  )
}

export function ProjectInquiryForm({
  origin,
  web3FormsAccessKey,
}: ProjectInquiryFormProps): React.JSX.Element {
  const t = useTranslations("Index.ContactDrawer")
  const searchParams = useSearchParams()
  const referral = searchParams.get("referral")
  const selectedService = searchParams.get("service")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [submissionError, setSubmissionError] = React.useState<string | null>(
    null
  )
  const [stepValidationError, setStepValidationError] = React.useState<
    string | null
  >(null)
  const idPrefix = React.useId()
  const requiredNote = (
    <>
      {t("requiredNotePrefix")}{" "}
      <span className="font-bold text-red-500">*</span>{" "}
      {t("requiredNoteSuffix")}
    </>
  )

  const schema = React.useMemo(
    () =>
      createProjectInquirySchema({
        nameMin: t("validation.nameMin"),
        emailInvalid: t("validation.emailInvalid"),
        phoneMin: t("validation.phoneMin"),
        projectTypeRequired: t("validation.projectTypeRequired"),
        projectTypeOtherRequired: t("validation.projectTypeOtherRequired"),
        budgetRequired: t("validation.budgetRequired"),
        deadlineRequired: t("validation.deadlineRequired"),
        messageMin: t("validation.messageMin"),
      }),
    [t]
  )

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectInquiryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectType: "landing",
      budget: "range2",
      deadline: "thirtyDays",
      company: "",
      email: "",
      phone: "",
      link: "",
      message: "",
      name: "",
      projectTypeOther: "",
    },
  })

  const projectTypes = React.useMemo<ProjectInquiryOption[]>(
    () => [
      { value: "landing", label: t("projectTypes.landing") },
      { value: "sales", label: t("projectTypes.sales") },
      { value: "institutional", label: t("projectTypes.institutional") },
      { value: "other", label: t("projectTypes.other") },
    ],
    [t]
  )

  const budgetOptions = React.useMemo<ProjectInquiryOption[]>(
    () => [
      { value: "range1", label: t("budgets.range1") },
      { value: "range2", label: t("budgets.range2") },
      { value: "range3", label: t("budgets.range3") },
      { value: "range4", label: t("budgets.range4") },
    ],
    [t]
  )

  const deadlineOptions = React.useMemo<ProjectInquiryOption[]>(
    () => [
      { value: "urgent", label: t("deadlines.urgent") },
      { value: "thirtyDays", label: t("deadlines.thirtyDays") },
      { value: "sixtyDays", label: t("deadlines.sixtyDays") },
      { value: "flexible", label: t("deadlines.flexible") },
    ],
    [t]
  )

  const selectedProjectType = watch("projectType")
  const selectedBudget = watch("budget")
  const selectedDeadline = watch("deadline")
  const watchedName = watch("name")
  const watchedCompany = watch("company")

  React.useEffect(() => {
    if (
      selectedService === "landing" ||
      selectedService === "sales" ||
      selectedService === "institutional"
    ) {
      setValue("projectType", selectedService, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    }
  }, [selectedService, setValue])

  const stepItems = React.useMemo<StepItem[]>(
    () => [
      {
        title: t("stepper.identity.title"),
        icon: <UserCircleIcon size={18} weight="bold" />,
      },
      {
        title: t("stepper.scope.title"),
        icon: <BriefcaseIcon size={18} weight="bold" />,
      },
      {
        title: t("stepper.delivery.title"),
        icon: <ClockCountdownIcon size={18} weight="bold" />,
      },
    ],
    [t]
  )

  const stepSummary = React.useMemo((): string => {
    if (currentStep === 0) {
      return watchedName || watchedCompany || t("sections.identity.description")
    }

    if (currentStep === 1) {
      return selectedProjectType === "other"
        ? t("projectTypes.other")
        : t(`projectTypes.${selectedProjectType}`)
    }

    return `${t(`budgets.${selectedBudget}`)} · ${t(
      `deadlines.${selectedDeadline}`
    )}`
  }, [
    currentStep,
    selectedBudget,
    selectedDeadline,
    selectedProjectType,
    t,
    watchedCompany,
    watchedName,
  ])

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

  const validateCurrentStep = React.useCallback(async (): Promise<boolean> => {
    if (currentStep === 0) {
      return trigger(["name", "email", "phone"], { shouldFocus: true })
    }

    if (currentStep === 1) {
      const fields: Array<keyof ProjectInquiryFormData> = [
        "projectType",
        "message",
      ]

      if (selectedProjectType === "other") {
        fields.push("projectTypeOther")
      }

      return trigger(fields, { shouldFocus: true })
    }

    return trigger(["budget", "deadline"], { shouldFocus: true })
  }, [currentStep, selectedProjectType, trigger])

  const handleNextStep = React.useCallback(async (): Promise<void> => {
    const isValid = await validateCurrentStep()

    if (!isValid) {
      setStepValidationError(t("validation.stepError"))
      return
    }

    setStepValidationError(null)
    setCurrentStep((step) => Math.min(step + 1, stepItems.length - 1))
  }, [stepItems.length, t, validateCurrentStep])

  const handlePreviousStep = React.useCallback((): void => {
    setStepValidationError(null)
    setCurrentStep((step) => Math.max(step - 1, 0))
  }, [])

  React.useEffect(() => {
    setStepValidationError(null)
  }, [currentStep])

  const onSubmit = React.useCallback(
    async (data: ProjectInquiryFormData): Promise<void> => {
      setIsSubmitting(true)
      setSubmissionError(null)

      try {
        const formData = new FormData()

        formData.append("access_key", web3FormsAccessKey)
        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("phone", data.phone)
        formData.append("link", data.link || "Not provided")
        formData.append("message", data.message)
        formData.append("subject", `New project inquiry: ${data.name}`)
        formData.append("replyto", data.email)
        formData.append("company", data.company || "Not provided")
        formData.append("budget", data.budget)
        formData.append("deadline", data.deadline)
        formData.append(
          "project_type",
          data.projectType === "other"
            ? `other (${data.projectTypeOther})`
            : data.projectType
        )
        formData.append("origin", origin)
        formData.append("botcheck", "")

        if (referral) {
          formData.append("referral_source", referral)
        }

        const response = await fetch("https://api.web3forms.com/submit", {
          body: formData,
          headers: {
            Accept: "application/json",
          },
          method: "POST",
        })
        const result = (await response.json()) as Web3FormsClientResponse

        if (!response.ok || !result.success) {
          throw new Error("web3forms_submission_failed")
        }

        trackEvent("generate_lead", {
          budget: data.budget,
          deadline: data.deadline,
          origin,
          project_type: data.projectType,
          referral: Boolean(referral),
        })
        setIsSuccess(true)
        setStepValidationError(null)
        setCurrentStep(0)
        reset()
      } catch {
        trackEvent("inquiry_submit_error", {
          origin,
          project_type: data.projectType,
        })
        setSubmissionError(t("errorMessage"))
      } finally {
        setIsSubmitting(false)
      }
    },
    [origin, referral, reset, t, web3FormsAccessKey]
  )

  return isSuccess ? (
    <section className="rounded-4xl bg-background px-6 py-14 text-center shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:px-10">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="flex size-20 items-center justify-center rounded-full bg-brand-primary text-white shadow-2xl shadow-brand-primary/20">
          <CheckCircleIcon size={44} weight="fill" />
        </div>
        <div className="space-y-3">
          <h2 className="font-heading text-4xl font-black uppercase tracking-[-0.05em] text-foreground">
            {t("successTitle")}
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
            {t("successMessage")}
          </p>
        </div>
      </div>
    </section>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-[2.25rem] bg-foreground/2 md:p-5"
    >
      {referral ? (
        <section className="rounded-[1.75rem] bg-brand-primary/8 px-5 py-5">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
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

      <section className="rounded-4xl bg-background/92 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-6">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-brand-primary/80">
                {t("title")}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {stepSummary}
              </p>
            </div>
            <div className="whitespace-nowrap rounded-full bg-muted/24 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground sm:tracking-[0.28em]">
              {currentStep + 1} / {stepItems.length}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {stepItems.map((step, index) => {
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              const isLocked = index > currentStep

              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => {
                    if (!isLocked) {
                      setCurrentStep(index)
                    }
                  }}
                  disabled={isLocked}
                  className={cn(
                    "flex min-h-24 flex-col items-start gap-2 rounded-[1.35rem] px-3 py-3 text-left transition-all sm:min-h-0 sm:flex-row sm:items-center sm:gap-3 sm:rounded-3xl sm:px-4 sm:py-4",
                    isActive
                      ? "bg-foreground text-background"
                      : isCompleted
                        ? "bg-brand-primary/10 text-foreground"
                        : "bg-muted/10 text-muted-foreground/45",
                    isLocked
                      ? "cursor-not-allowed border border-border/30 opacity-45"
                      : "cursor-pointer"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10",
                      isActive
                        ? "bg-white/14 text-white"
                        : isCompleted
                          ? "bg-brand-primary text-white"
                          : "bg-background/75 text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon size={16} weight="fill" />
                    ) : isLocked ? (
                      <LockSimpleIcon size={15} weight="bold" />
                    ) : (
                      step.icon
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-black uppercase tracking-[0.24em] opacity-56 sm:text-[10px] sm:tracking-[0.28em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] leading-tight sm:text-xs sm:tracking-[0.16em]">
                      {step.title}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={currentStep}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {currentStep === 0 ? (
            <FormSection
              eyebrow={t("sections.identity.eyebrow")}
              title={t("sections.identity.title")}
              description={t("sections.identity.description")}
              requiredNote={requiredNote}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-3" htmlFor={`${idPrefix}-name`}>
                  <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                    {t("fields.name.label")}
                    <span className="ml-1 text-red-500">*</span>
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

                <label className="space-y-3" htmlFor={`${idPrefix}-phone`}>
                  <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                    {t("fields.phone.label")}
                    <span className="ml-1 text-red-500">*</span>
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

                <label className="space-y-3" htmlFor={`${idPrefix}-company`}>
                  <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                    {t("fields.company.label")}
                  </span>
                  <TextField>
                    <input
                      {...register("company")}
                      id={`${idPrefix}-company`}
                      placeholder={t("fields.company.placeholder")}
                      className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                    />
                  </TextField>
                </label>

                <label
                  className="space-y-3 md:col-span-2"
                  htmlFor={`${idPrefix}-link`}
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                    {t("fields.link.label")}
                  </span>
                  <TextField hasError={Boolean(errors.link)}>
                    <input
                      {...register("link")}
                      id={`${idPrefix}-link`}
                      placeholder={t("fields.link.placeholder")}
                      className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                    />
                  </TextField>
                </label>
              </div>
            </FormSection>
          ) : null}

          {currentStep === 1 ? (
            <FormSection
              eyebrow={t("sections.scope.eyebrow")}
              title={t("sections.scope.title")}
              description={t("sections.scope.description")}
              requiredNote={requiredNote}
            >
              <div className="space-y-6">
                <ProjectInquirySelectionGroup
                  errorMessage={errors.projectType?.message}
                  hasError={Boolean(errors.projectType)}
                  label={t("fields.projectType.label")}
                  name="projectType"
                  options={projectTypes}
                  selectedValue={selectedProjectType}
                  required
                  onSelect={(value: string): void =>
                    setValue("projectType", value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                />

                <AnimatePresence>
                  {selectedProjectType === "other" ? (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <label
                        className="block space-y-3 pt-1"
                        htmlFor={`${idPrefix}-projectTypeOther`}
                      >
                        <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                          {t("fields.projectTypeOther.label")}
                          <span className="ml-1 text-red-500">*</span>
                        </span>
                        <TextField hasError={Boolean(errors.projectTypeOther)}>
                          <input
                            {...register("projectTypeOther")}
                            id={`${idPrefix}-projectTypeOther`}
                            placeholder={t(
                              "fields.projectTypeOther.placeholder"
                            )}
                            aria-describedby={
                              errors.projectTypeOther
                                ? `${idPrefix}-project-type-other-error`
                                : undefined
                            }
                            aria-invalid={Boolean(errors.projectTypeOther)}
                            className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                          />
                        </TextField>
                        {errors.projectTypeOther ? (
                          <span
                            id={`${idPrefix}-project-type-other-error`}
                            className="flex items-center gap-2 text-sm text-red-600"
                          >
                            <WarningCircleIcon size={16} weight="fill" />
                            {errors.projectTypeOther.message}
                          </span>
                        ) : null}
                      </label>
                    </m.div>
                  ) : null}
                </AnimatePresence>

                <label
                  className="block space-y-3"
                  htmlFor={`${idPrefix}-message`}
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                    {t("fields.message.label")}
                    <span className="ml-1 text-red-500">*</span>
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
                      className="min-h-24 w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
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
            </FormSection>
          ) : null}

          {currentStep === 2 ? (
            <FormSection
              eyebrow={t("sections.delivery.eyebrow")}
              title={t("sections.delivery.title")}
              description={t("sections.delivery.description")}
              requiredNote={requiredNote}
            >
              <div className="grid gap-6">
                <ProjectInquirySelectionGroup
                  errorMessage={errors.budget?.message}
                  hasError={Boolean(errors.budget)}
                  label={t("fields.budget.label")}
                  name="budget"
                  options={budgetOptions}
                  selectedValue={selectedBudget}
                  required
                  onSelect={(value: string): void =>
                    setValue("budget", value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                />

                <ProjectInquirySelectionGroup
                  errorMessage={errors.deadline?.message}
                  hasError={Boolean(errors.deadline)}
                  label={t("fields.deadline.label")}
                  name="deadline"
                  options={deadlineOptions}
                  selectedValue={selectedDeadline}
                  required
                  onSelect={(value: string): void =>
                    setValue("deadline", value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                />
              </div>
            </FormSection>
          ) : null}
        </m.div>
      </AnimatePresence>

      {submissionError ? (
        <p className="rounded-3xl bg-destructive/10 px-5 py-4 text-sm leading-relaxed text-destructive">
          {submissionError}
        </p>
      ) : null}

      {stepValidationError ? (
        <p className="flex items-center gap-3 rounded-3xl border border-red-500/25 bg-red-500/5 px-5 py-4 text-sm leading-relaxed text-red-700">
          <WarningCircleIcon size={18} weight="fill" />
          {stepValidationError}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          size="lg"
          variant="ghost"
          onClick={handlePreviousStep}
          disabled={currentStep === 0 || isSubmitting}
          className="h-12 rounded-full border border-border/60 bg-background px-5 text-[11px] font-black uppercase tracking-[0.28em] text-foreground hover:bg-muted disabled:opacity-40"
        >
          <CaretLeftIcon size={18} weight="bold" />
          {t("submitBlock.previous")}
        </Button>

        {currentStep < stepItems.length - 1 ? (
          <Button
            type="button"
            size="lg"
            onClick={handleNextStep}
            className="h-12 rounded-full bg-foreground px-6 text-[11px] font-black uppercase tracking-[0.35em] text-background shadow-xl shadow-black/10 hover:bg-brand-primary"
          >
            {t("submitBlock.next")}
            <ArrowRightIcon size={18} weight="bold" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-12 rounded-full bg-foreground px-6 text-[11px] font-black uppercase tracking-[0.35em] text-background shadow-xl shadow-black/10 hover:bg-brand-primary"
          >
            {isSubmitting ? t("submitting") : t("submit")}
            <ArrowRightIcon size={18} weight="bold" />
          </Button>
        )}
      </div>
    </form>
  )
}
