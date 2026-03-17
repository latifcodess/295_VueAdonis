import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import ClassGroup from './class_group.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare firstname: string
  
  @column()
  declare classGroupId: number

  // Relation : 1 classe → 1 enseignant
  @belongsTo(() => ClassGroup)
  declare classGroup: BelongsTo<typeof ClassGroup>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
