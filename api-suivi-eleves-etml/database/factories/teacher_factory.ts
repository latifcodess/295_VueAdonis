// database/factories/student.ts
import Factory from '@adonisjs/lucid/factories'
import Teacher from '#models/teacher'

let caca = 1;

export const TeacherFactory = Factory.define(Teacher, async ({ faker }) => {
  
  const name = faker.person.lastName()
  const firstname = faker.person.firstName()

  return {
    name: name,
    firstname: firstname,
    email: faker.internet.email({ firstName: firstname.toLowerCase(), lastName: name.toLowerCase(), provider: 'latif.codes' }),
    userId: caca++
  }
}).build()
