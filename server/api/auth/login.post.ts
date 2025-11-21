import { defineEventHandler, readBody, createError } from 'h3'
import { usePostgres } from '../../utils/postgres'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const db = usePostgres()

  const users = await db`
    SELECT * FROM users WHERE email = ${email}
  `
  const user = users[0]

  if (!user || user.password !== password) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  return {
    ok: true,
    user: { id: user.id_user, email: user.email }
  }
})
