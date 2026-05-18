"use server"

import {
  ProjectInquiryFormData,
  createProjectInquirySchema,
} from "@/src/lib/validations/projectInquiry"

import { getServerEnv } from "@/src/config/env"

interface SubmitProjectInquiryActionInput extends ProjectInquiryFormData {
  origin: "hero" | "contact" | "contactPage"
  referral?: string | null
}

interface SubmitProjectInquiryActionResult {
  success: boolean
}

const projectInquiryServerSchema = createProjectInquirySchema({
  companyMin: "Company must contain at least 2 characters.",
  contactMin: "Contact name must contain at least 2 characters.",
  emailInvalid: "Email must be valid.",
  emailOrPhoneRequired: "Email or phone is required.",
  phoneMin: "Phone must be valid.",
  websiteInvalid: "Website must be valid.",
  instagramInvalid: "Instagram must be valid.",
  messageMin: "Message must contain at least 5 characters.",
})

export async function submitProjectInquiryAction(
  input: SubmitProjectInquiryActionInput
): Promise<SubmitProjectInquiryActionResult> {
  getServerEnv()
  const parsedInput = projectInquiryServerSchema.safeParse(input)

  if (!parsedInput.success) {
    return { success: false }
  }

  return { success: true }
}
