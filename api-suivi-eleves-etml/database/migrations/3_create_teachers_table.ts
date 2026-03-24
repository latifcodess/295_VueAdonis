import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'teachers'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('firstname').notNullable()
      table.string('email').notNullable().unique()
      // Relation : 1 enseignant → 1 utilisateur
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .unique() // Un enseignant est lié à un seul utilisateur
        .nullable() // Permettre aux enseignants de ne pas être liés à un utilisateur (par exemple, pour les anciens enseignants)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
