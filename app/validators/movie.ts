import vine from '@vinejs/vine'

export const createMovieValidator = vine.compile(
  vine.object({
    title: vine.string().trim()
  })
)