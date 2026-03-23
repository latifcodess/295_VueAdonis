import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'comments'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('content').notNullable() // Contenu du commentaire
      // Relation : 1 commentaire → 1 élève
      table
        .integer('student_id')
        .unsigned()
        .notNullable() // Important : un commentaire doit toujours être lié à un élève
        .references('id')
        .inTable('students')
        .onDelete('CASCADE') // si l'élève est supprimé, le commentaire sera supprimé également
      // Relation : 1 commentaire → 1 enseignant
      table
        .integer('teacher_id')
        .unsigned()
        .nullable() // Important : un commentaire peut ne pas être lié à un enseignant
        .references('id')
        .inTable('teachers')
        .onDelete('SET NULL') // si l'enseignant est supprimé, le commentaire restera en DB mais sans être lié à un enseignant
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
