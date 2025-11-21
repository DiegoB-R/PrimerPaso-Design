import { defineEventHandler, readBody, createError } from 'h3'
import { usePostgres } from '../../utils/postgres'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const db = usePostgres()

  // 1️⃣ Verificar si ya existe un usuario con ese email
  const existing = await db`
    SELECT * FROM users WHERE email = ${email}
  `

  if (existing.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El usuario ya existe'
    })
  }

  // 2️⃣ Insertar nuevo usuario con rol por defecto 'student'
  const result = await db`
    INSERT INTO users (email, password, rol)
    VALUES (${email}, ${password}, 'student')
    RETURNING id_user, email, rol
  `

  return {
    ok: true,
    user: result[0]
  }
})
