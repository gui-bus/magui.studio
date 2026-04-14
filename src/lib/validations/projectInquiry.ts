import { z } from "zod"

export interface ProjectInquiryValidationMessages {
  nameMin: string
  emailInvalid: string
  phoneMin: string
  projectTypeRequired: string
  projectTypeOtherRequired: string
  budgetRequired: string
  deadlineRequired: string
  messageMin: string
}

export function createProjectInquirySchema(
  messages: ProjectInquiryValidationMessages
) {
  return z
    .object({
      name: z.string().trim().min(2, messages.nameMin),
      email: z.string().trim().email(messages.emailInvalid),
      phone: z
        .string()
        .trim()
        .refine(
          (value) => value.replace(/\D/g, "").length >= 10,
          messages.phoneMin
        ),
      link: z.string().trim().optional(),
      company: z.string().trim().optional(),
      projectType: z.string().min(1, messages.projectTypeRequired),
      projectTypeOther: z.string().trim().optional(),
      budget: z.string().min(1, messages.budgetRequired),
      deadline: z.string().min(1, messages.deadlineRequired),
      message: z.string().trim().min(10, messages.messageMin),
    })
    .refine(
      (data) => {
        if (data.projectType === "other" && !data.projectTypeOther) {
          return false
        }
        return true
      },
      {
        message: messages.projectTypeOtherRequired,
        path: ["projectTypeOther"],
      }
    )
}

export type ProjectInquiryFormData = z.infer<
  ReturnType<typeof createProjectInquirySchema>
>
