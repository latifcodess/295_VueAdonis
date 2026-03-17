import ClassGroup from '#models/class_group'
import { classGroupValidator } from '#validators/class_group'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClassGroupsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return ClassGroup.query().orderBy('id')
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
    const { name } = await request.validateUsing(classGroupValidator)
    // Création d'un nouvel élève avec les données validées
    const classGroup = await ClassGroup.create({ name })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les données de l'élève créé
    return response.created(classGroup)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return ClassGroup.findOrFail(params.id)
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
    const { name } = await request.validateUsing(classGroupValidator)
    // Vérification de l'existence de l'élève
    const classGroup = await ClassGroup.findOrFail(params.id)
    // Mise à jour des données de l'élève
    classGroup.merge({ name })
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
