import ClassGroup from '#models/class_group'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { create } from 'domain'

export default class extends BaseSeeder {
  async run() {
    await ClassGroup.createMany([
      {name: "CID2A"},
      {name: "CID2B"},
      {name: "CIN2A"},
      {name: "CIN2B"},
    ])
  }
}