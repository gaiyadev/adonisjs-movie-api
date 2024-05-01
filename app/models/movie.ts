import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo} from '@adonisjs/lucid/orm'
import User from '#models/user'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

   @column({columnName: "user_id"})
  declare userId: number

  @column({columnName: 'title'})
  declare title: string

  @belongsTo(() => User)
  declare user: relations.BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}