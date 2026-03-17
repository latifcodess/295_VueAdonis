import Teacher from '#models/teacher'
import { teacherValidator } from '#validators/teacher'
import type { HttpContext } from '@adonisjs/core/http'

export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Teacher.query().orderBy('id')
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { name, firstname } = await request.validateUsing(teacherValidator)
    // Création d'un nouvel élève avec les données validées
    const teacher = await Teacher.create({ name, firstname })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les données de l'élève créé
    return response.created(teacher)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return Teacher.findOrFail(params.id)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    // Récupération des données
    const { name, firstname } = await request.validateUsing(teacherValidator)
    // Vérification de l'existence de l'élève
    const teacher = await Teacher.findOrFail(params.id)
    // Mise à jour des données de l'élève
    teacher.merge({ name, firstname })
    // Sauvegarde des modifications
    await teacher.save()
    // Retour le json de l'élève mis à jour
    return teacher
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    return teacher.delete()
  }
}
