import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'class_groups'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table
        .integer('teacher_id') // on ajoute une colonne teacher_id correspondantau maître de classe
        .unsigned() // la valeur ne peut pas être négative
        .references('id') // teacher_id fait référence à la colonne id d’une autretable. C’est ce lien qui définit la clé étrangère.
        .inTable('teachers') // Précise dans quelle table se trouve la colonne idréférencée.
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
