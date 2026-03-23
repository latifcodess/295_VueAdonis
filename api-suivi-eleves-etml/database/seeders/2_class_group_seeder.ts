// database/seeders/class_group_seeder.ts
import ClassGroup from '#models/class_group'
import Teacher from '#models/teacher'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
export default class ClassGroupSeeder extends BaseSeeder {
  public async run() {
    // Récupération des enseignants
    const teachers = await Teacher.all()

    await ClassGroup.createMany([
      {id:1, name: 'CIN1A', teacherId: teachers[0].id },
      {id:2, name: 'CIN1B', teacherId: teachers[0].id },
      {id:3, name: 'CIN1C', teacherId: teachers[1].id },
      {id:4, name: 'FID1', teacherId: teachers[1].id },
      {id:5, name: 'FID2', teacherId: teachers[2].id },
      {id:6, name: 'CID2A', teacherId: teachers[2].id },
      {id:7, name: 'CID2B', teacherId: teachers[3].id },
    ])
  }
}
