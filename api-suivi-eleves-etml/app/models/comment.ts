import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Student from './student.js'
import Teacher from './teacher.js'
import { DateTime } from 'luxon'
export default class Comment extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare studentId: number

  @column()
  declare teacherId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation : 1 commentaire → 1 élève
  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  // Relation : 1 commentaire → 1 enseignant
  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>
  
}
