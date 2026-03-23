// database/seeders/student_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { StudentFactory } from '#database/factories/student_factory'
export default class StudentSeeder extends BaseSeeder {
  public async run() {
    // Crée 10 étudiants
    await StudentFactory.createMany(10)
  }
}
