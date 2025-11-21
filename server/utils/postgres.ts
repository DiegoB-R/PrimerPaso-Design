import postgres from 'postgres'
import { createError } from 'h3'

let sql: any = null

export function usePostgres() {
  if (sql) return sql

  if (!process.env.NUXT_POSTGRES_URL) {
    throw createError({ statusCode: 500, statusMessage: 'Missing NUXT_POSTGRES_URL' })
  }

  sql = postgres(process.env.NUXT_POSTGRES_URL, {
    ssl: process.env.NODE_ENV === 'production' ? 'require' : false
  })

  return sql
}
