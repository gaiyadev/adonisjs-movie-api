import vine from '@vinejs/vine'

export const createSignUpValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim(),
    username: vine.string().trim()
  })
)
