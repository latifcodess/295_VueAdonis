// database/factories/student.ts
import Factory from '@adonisjs/lucid/factories'
import Student from '#models/student'
export const StudentFactory = Factory.define(Student, async ({ faker }) => {
  return {
    name: faker.person.lastName(),
    firstname: faker.person.firstName(),
    classGroupId: faker.number.int({min: 1, max: 7})
  }
}).build()
