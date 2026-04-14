"use server"

import {
  ProjectInquiryFormData,
  createProjectInquirySchema,
} from "@/src/lib/validations/projectInquiry"
import { logger } from "@/src/lib/logger"

import { getServerEnv } from "@/src/config/env"

interface SubmitProjectInquiryActionInput extends ProjectInquiryFormData {
  origin: "hero" | "contact" | "contactPage"
  referral?: string | null
}

interface Web3FormsServerResponse {
  message?: string
  success?: boolean
}

interface SubmitProjectInquiryActionResult {
  success: boolean
}

const projectInquiryServerSchema = createProjectInquirySchema({
  nameMin: "Name must contain at least 2 characters.",
  emailInvalid: "Email must be valid.",
  phoneMin: "Phone must be valid.",
  projectTypeRequired: "Project type is required.",
  projectTypeOtherRequired: "Project type details are required.",
  budgetRequired: "Budget is required.",
  deadlineRequired: "Deadline is required.",
  messageMin: "Message must contain at least 10 characters.",
})

export async function submitProjectInquiryAction(
  input: SubmitProjectInquiryActionInput
): Promise<SubmitProjectInquiryActionResult> {
  const serverEnv = getServerEnv()
  const parsedInput = projectInquiryServerSchema.safeParse(input)

  if (!parsedInput.success) {
    return { success: false }
  }

  const data = parsedInput.data
  const formData = new FormData()

  formData.append("access_key", serverEnv.WEB3FORMS_ACCESS_KEY)
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
  formData.append("origin", input.origin)
  formData.append("botcheck", "")

  if (input.referral) {
    formData.append("referral_source", input.referral)
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    body: formData,
    headers: {
      Accept: "application/json",
    },
    method: "POST",
    cache: "no-store",
  })
  const responseText = await response.text()
  let result: Web3FormsServerResponse | null = null

  try {
    result = JSON.parse(responseText) as Web3FormsServerResponse
  } catch {
    logger.error(
      {
        responseStatus: response.status,
        responseText,
      },
      "Web3Forms returned a non-JSON response"
    )
  }

  if (!response.ok || !result?.success) {
    logger.error(
      {
        payload: {
          budget: data.budget,
          deadline: data.deadline,
          origin: input.origin,
          projectType: data.projectType,
        },
        responseStatus: response.status,
        responseText,
      },
      "Project inquiry submission failed"
    )
    return { success: false }
  }

  return { success: true }
}
