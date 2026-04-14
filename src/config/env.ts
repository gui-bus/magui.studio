import { z } from "zod"

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
})

const serverEnvSchema = z.object({
  WEB3FORMS_ACCESS_KEY: z.string().uuid(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
})

const parsedPublicEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
})

if (!parsedPublicEnv.success) {
  const errors = parsedPublicEnv.error.flatten().fieldErrors
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(errors, null, 2)}`
  )
}

export const publicEnv = parsedPublicEnv.data

export type ServerEnv = z.infer<typeof serverEnvSchema>

export function getServerEnv(): ServerEnv {
  const parsedServerEnv = serverEnvSchema.safeParse({
    WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY,
    NODE_ENV: process.env.NODE_ENV,
  })

  if (!parsedServerEnv.success) {
    const errors = parsedServerEnv.error.flatten().fieldErrors
    throw new Error(
      `Invalid server environment variables: ${JSON.stringify(errors, null, 2)}`
    )
  }

  return parsedServerEnv.data
}
