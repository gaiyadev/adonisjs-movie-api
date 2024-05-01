import { DateTime } from 'luxon'
import { BaseModel, column , beforeSave , hasMany} from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import * as relations from '@adonisjs/lucid/types/relations'
import Movie from '#models/movie'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder)  {
  @column({ isPrimary: true })
  declare id: number;
  
  @column({columnName: "full_name"})
  declare full_name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @hasMany(() => Movie)
 declare movies: relations.HasMany<typeof Movie>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null  })
  declare updatedAt: DateTime

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.email) {
      user.email = user.email.toLowerCase()
    }
  }

   static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

}