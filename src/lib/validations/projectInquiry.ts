import { z } from "zod"

export interface ProjectInquiryValidationMessages {
  companyMin: string
  contactMin: string
  emailInvalid: string
  emailOrPhoneRequired: string
  phoneMin: string
  websiteInvalid: string
  instagramInvalid: string
  messageMin: string
}

const optionalWebsiteField = (invalidMessage: string) =>
  z
    .string()
    .trim()
    .refine(
      (value) =>
        value.length === 0 ||
        /^(https?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?#].*)?$/.test(value),
      invalidMessage
    )

const optionalInstagramField = (invalidMessage: string) =>
  z
    .string()
    .trim()
    .refine(
      (value) =>
        value.length === 0 ||
        /^(@)?[a-zA-Z0-9._]+$/.test(value) ||
        /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._/?=&-]+$/i.test(value),
      invalidMessage
    )

export function createProjectInquirySchema(
  messages: ProjectInquiryValidationMessages
) {
  return z
    .object({
      company: z.string().trim().min(2, messages.companyMin).max(120),
      name: z
        .string()
        .trim()
        .refine(
          (value) => value.length === 0 || value.length >= 2,
          messages.contactMin
        ),
      email: z
        .string()
        .trim()
        .refine(
          (value) => value.length === 0 || z.email().safeParse(value).success,
          messages.emailInvalid
        ),
      phone: z
        .string()
        .trim()
        .max(24, messages.phoneMin)
        .refine(
          (value) => value.length === 0 || value.replace(/\D/g, "").length >= 8,
          messages.phoneMin
        ),
      website: optionalWebsiteField(messages.websiteInvalid),
      instagram: optionalInstagramField(messages.instagramInvalid),
      message: z
        .string()
        .trim()
        .refine(
          (value) => value.length === 0 || value.length >= 5,
          messages.messageMin
        ),
    })
    .refine((data) => Boolean(data.email?.trim() || data.phone?.trim()), {
      message: messages.emailOrPhoneRequired,
      path: ["email"],
    })
}

export type ProjectInquiryFormData = z.infer<
  ReturnType<typeof createProjectInquirySchema>
>
