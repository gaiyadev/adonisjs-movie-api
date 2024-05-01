import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { createSignUpValidator } from '#validators/sign_up'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async signUp({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await createSignUpValidator.validate(data)
      const findUser = await User.findBy('email', payload.email)

      if (findUser) {
        response.conflict({ error: 'User already exist' })
        return
      }

      const user = new User()

      await user
        .fill({ full_name: payload.full_name, email: payload.email, password: payload.password })
        .save()

      return response.created({ message: 'Success!' })
    } catch (err) {
      return response.internalServerError(err)
    }
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)

    if (!user) {
      response.forbidden('Invalid credentials')
      return
    }

    if (!(await hash.verify(user.password, password))) {
      response.forbidden('Invalid credentials')
      return
    }
    
      await User.verifyCredentials(email, password)

      const token = await User.accessTokens.create(user)

      return {
      message: "success",
    type: 'bearer',
    value: token.value!.release(),
  }
  }
    
  async findUserById({ response, auth }: HttpContext) {

        return response.json({data: auth.user});
    }
}
