import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ClassGroup from '#models/class_group'
import type { HasMany } from '@adonisjs/lucid/types/relations'


export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare name: string

  @column()
  declare firstname: string

  @column()
  declare email: string

  @hasMany(() => ClassGroup)
  declare classGroups: HasMany<typeof ClassGroup>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
