import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Teacher from '#models/teacher'
import Student from '#models/student'

export default class ClassGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare teacherId: number | null
  // Relation : 1 classe → 1 enseignant
  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>

  @hasMany(() => Student)
  declare classGroups: HasMany<typeof Student>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
