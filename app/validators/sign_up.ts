import vine from '@vinejs/vine'

export const createSignUpValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim(),
    full_name: vine.string().trim()
  })
)
