import ClassGroup from '#models/class_group'
import { classGroupValidator } from '#validators/class_group'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClassGroupsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return ClassGroup.query().preload('teacher').orderBy('id')
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
    const { name, teacherId } = await request.validateUsing(classGroupValidator)
    // Création d'un nouvel élève avec les données validées
    const classGroup = await ClassGroup.create({ name, teacherId })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les données de l'élève créé
    return response.created(classGroup)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const classGroup = await ClassGroup.query()
      .preload('teacher')
      .where('id', params.id)
      .firstOrFail()

      return classGroup
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
    const { name, teacherId } = await request.validateUsing(classGroupValidator)
    // Vérification de l'existence de l'élève
    const classGroup = await ClassGroup.findOrFail(params.id)
    // Mise à jour des données de l'élève
    classGroup.merge({ name, teacherId })
    // Sauvegarde des modifications
    await classGroup.save()
    // Retour le json de l'élève mis à jour
    return classGroup
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)
    return classGroup.delete()
  }
}
