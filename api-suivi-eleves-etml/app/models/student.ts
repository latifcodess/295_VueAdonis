import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import ClassGroup from '#models/class_group'
import Comment from '#models/comment'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare firstname: string

  @column()
  declare classGroupId: number

  @belongsTo(() => ClassGroup)
  declare classGroup: BelongsTo<typeof ClassGroup>

  // Relation : 1 élève -> N commentaires
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
