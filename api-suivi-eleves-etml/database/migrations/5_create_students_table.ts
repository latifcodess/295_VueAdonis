import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'students'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Ajout des colonnes name et firstname
      table.string('name').notNullable()
      table.string('firstname').notNullable()
      table
        .integer('class_group_id') // on ajoute une colonne teacher_id correspondantau maître de classe
        .unsigned()
        .references('id') // teacher_id fait référence à la colonne id d’une autretable. C’est ce lien qui définit la clé étrangère.
        .inTable('class_groups') // Précise dans quelle table se trouve la colonne idréférencée.
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
