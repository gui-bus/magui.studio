import { NextRequest, NextResponse } from "next/server"

import { createHmac } from "node:crypto"
import { z } from "zod"

import { logger } from "@/src/lib/logger"
import { createProjectInquirySchema } from "@/src/lib/validations/projectInquiry"

import { getServerEnv } from "@/src/config/env"

interface DashboardLeadRequestBody {
  companyName: string
  contactName?: string
  email?: string
  phone?: string
  website?: string
  instagram?: string
  message?: string
  pageUrl?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
}

interface DashboardLeadResponseBody {
  created?: boolean
  deduplicated?: boolean
  leadId?: string
  success?: boolean
}

const MIN_SUBMISSION_TIME_MS = 1500
const isDevelopment = process.env.NODE_ENV === "development"

const requestSchema = createProjectInquirySchema({
  companyMin: "Company must contain at least 2 characters.",
  contactMin: "Contact name must contain at least 2 characters.",
  emailInvalid: "Email must be valid.",
  emailOrPhoneRequired: "Email or phone is required.",
  phoneMin: "Phone must be valid.",
  websiteInvalid: "Website must be valid.",
  instagramInvalid: "Instagram must be valid.",
  messageMin: "Message must contain at least 5 characters.",
}).extend({
  formStartedAt: z.coerce.number().int().nonnegative(),
  honeypot: z.string().trim().max(0).optional().default(""),
  origin: z.enum(["hero", "contact", "contactPage"]),
  pageUrl: z.string().trim().url().optional().or(z.literal("")),
  referral: z.string().trim().optional(),
  referrer: z.string().trim().url().optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(255).optional(),
  utmContent: z.string().trim().max(255).optional(),
  utmMedium: z.string().trim().max(255).optional(),
  utmSource: z.string().trim().max(255).optional(),
  utmTerm: z.string().trim().max(255).optional(),
})

function normalizeOptionalUrl(value?: string): string | undefined {
  if (!value) {
    return undefined
  }

  return value
}

function normalizeWebsiteUrl(value?: string): string | undefined {
  const trimmedValue = sanitizeText(value)

  if (!trimmedValue) {
    return undefined
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue
  }

  return `https://${trimmedValue}`
}

function sanitizeText(value?: string): string | undefined {
  const trimmedValue = value?.trim()

  if (!trimmedValue) {
    return undefined
  }

  return trimmedValue
}

function normalizeInstagramUrl(value?: string): string | undefined {
  const trimmedValue = sanitizeText(value)

  if (!trimmedValue) {
    return undefined
  }

  if (/^https?:\/\/(www\.)?instagram\.com\//i.test(trimmedValue)) {
    return trimmedValue
  }

  if (trimmedValue.startsWith("@")) {
    return `https://instagram.com/${trimmedValue.slice(1)}`
  }

  return `https://instagram.com/${trimmedValue}`
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const serverEnv = getServerEnv()
    const requestBody = (await request.json()) as unknown
    const parsedBody = requestSchema.safeParse(requestBody)

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          ...(isDevelopment ? { reason: "invalid_payload" } : {}),
        },
        { status: 400 }
      )
    }

    const data = parsedBody.data

    if (data.honeypot) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    if (Date.now() - data.formStartedAt < MIN_SUBMISSION_TIME_MS) {
      return NextResponse.json(
        {
          success: false,
          ...(isDevelopment ? { reason: "submission_too_fast" } : {}),
        },
        { status: 400 }
      )
    }

    const pageUrl = normalizeOptionalUrl(data.pageUrl)
    const referrer = normalizeOptionalUrl(data.referrer)
    const payload: DashboardLeadRequestBody = {
      companyName: data.company,
      contactName: sanitizeText(data.name),
      email: sanitizeText(data.email),
      phone: sanitizeText(data.phone),
      website: normalizeWebsiteUrl(data.website),
      instagram: normalizeInstagramUrl(data.instagram),
      message:
        [
          sanitizeText(data.message),
          data.referral ? `Referral: ${data.referral}` : undefined,
        ]
          .filter(Boolean)
          .join("\n") || undefined,
      pageUrl,
      referrer,
      utmSource: sanitizeText(data.utmSource),
      utmMedium: sanitizeText(data.utmMedium),
      utmCampaign: sanitizeText(data.utmCampaign),
      utmContent: sanitizeText(data.utmContent),
      utmTerm: sanitizeText(data.utmTerm),
    }
    const rawBody = JSON.stringify(payload)
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const signature = createHmac(
      "sha256",
      serverEnv.DASHBOARD_PUBLIC_LEADS_SIGNING_SECRET
    )
      .update(`${timestamp}.${rawBody}`)
      .digest("hex")

    const response = await fetch(serverEnv.DASHBOARD_PUBLIC_LEADS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-magui-leads-key": serverEnv.DASHBOARD_PUBLIC_LEADS_KEY,
        "x-magui-signature": signature,
        "x-magui-timestamp": timestamp,
      },
      body: rawBody,
      cache: "no-store",
    })

    const responseText = await response.text()
    let result: DashboardLeadResponseBody | null = null

    try {
      result = JSON.parse(responseText) as DashboardLeadResponseBody
    } catch {
      logger.error(
        {
          responseStatus: response.status,
          responseText,
        },
        "Dashboard public leads endpoint returned a non-JSON response"
      )
    }

    const isAcceptedResponse =
      response.ok &&
      Boolean(
        result?.success ??
        result?.created ??
        result?.deduplicated ??
        result?.leadId
      )

    if (!isAcceptedResponse) {
      logger.error(
        {
          origin: data.origin,
          payload,
          responseStatus: response.status,
          responseText,
        },
        "Dashboard public leads submission failed"
      )
      return NextResponse.json(
        {
          success: false,
          ...(isDevelopment
            ? {
                reason: "upstream_rejected",
                upstreamStatus: response.status,
                upstreamBody: responseText,
              }
            : {}),
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      created: result?.created ?? false,
      deduplicated: result?.deduplicated ?? false,
      leadId: result?.leadId,
    })
  } catch (error) {
    logger.error({ error }, "Lead proxy request failed before completion")
    const errorMessage =
      error instanceof Error ? error.message : "unknown_error"

    return NextResponse.json(
      {
        success: false,
        ...(isDevelopment
          ? {
              reason: errorMessage.includes("Invalid server environment")
                ? "server_env_invalid"
                : "upstream_request_failed",
            }
          : {}),
      },
      { status: 502 }
    )
  }
}
