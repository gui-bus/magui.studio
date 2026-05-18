import { describe, expect, it } from "vitest"

import { createProjectInquirySchema } from "@/src/lib/validations/projectInquiry"

const schema = createProjectInquirySchema({
  companyMin: "company_min",
  contactMin: "contact_min",
  emailInvalid: "email_invalid",
  emailOrPhoneRequired: "email_or_phone_required",
  phoneMin: "phone_min",
  websiteInvalid: "website_invalid",
  instagramInvalid: "instagram_invalid",
  messageMin: "message_min",
})

describe("Project inquiry schema", () => {
  it("accepts a valid payload", () => {
    const result = schema.safeParse({
      company: "MAGUI",
      name: "Gui Borges",
      email: "contato@magui.studio",
      phone: "(11) 9 9999-9999",
      website: "magui.studio",
      instagram: "@magui",
      message: "Preciso de uma landing page com posicionamento forte.",
    })

    expect(result.success).toBe(true)
  })

  it("requires at least email or phone", () => {
    const result = schema.safeParse({
      company: "MAGUI",
      name: "",
      email: "",
      phone: "",
      website: "",
      instagram: "",
      message: "",
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toContain(
        "email_or_phone_required"
      )
    }
  })

  it("rejects invalid payloads with configured messages", () => {
    const result = schema.safeParse({
      company: "M",
      name: "G",
      email: "email-invalido",
      phone: "123",
      website: "site invalido",
      instagram: "@@magui",
      message: "oi",
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.company).toContain(
        "company_min"
      )
      expect(result.error.flatten().fieldErrors.name).toContain("contact_min")
      expect(result.error.flatten().fieldErrors.email).toContain(
        "email_invalid"
      )
      expect(result.error.flatten().fieldErrors.phone).toContain("phone_min")
      expect(result.error.flatten().fieldErrors.website).toContain(
        "website_invalid"
      )
      expect(result.error.flatten().fieldErrors.instagram).toContain(
        "instagram_invalid"
      )
      expect(result.error.flatten().fieldErrors.message).toContain(
        "message_min"
      )
    }
  })
})
