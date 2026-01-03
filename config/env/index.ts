import { z } from 'zod'

const envSchema = z.object({
  GOOGLE_AUTH_CLIENT_ID: z.string(),
  GOOGLE_AUTH_CLIENT_SECRET: z.string(),
  NEXT_AUTH_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

const envProject = envSchema.safeParse({
  GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
})

if (!envProject.success) {
  throw new Error(
    'Please provide the correct environment variables. Refer to the .env.example file for more information'
  )
}

const envConfig = envProject.data
export default envConfig
