import Comment from '#models/comment'
import Student from '#models/student'
import { commentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'
export default class CommentsController {
  /**
   * Afficher tous les commentaires de l'élève student_id
   */
  async index({ params, response }: HttpContext) {
    // Récupération de l'élève dont l'id est en paramètre
    const student = await Student.findOrFail(params.student_id)
    // Chargement des commentaires et
    // pour chaque commentaire, on précharge l'enseignant
    await student.load('comments', (query) => {
      query.preload('teacher')
    })
    return response.ok(student.comments)
  }
  /**
   * Ajouter un nouveau commentaire à l'élève student_id
   */
  async store({ params, request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { content } = await request.validateUsing(commentValidator)
    // Pour l'instant, on fixe "en dur" l'id de l'enseignant
    // Lorsque l'on va mettre en place l'authentification,
    // on pourra récupérer l'id de l'enseignant connecté
    const teacherId = 1
    // Création du commentaire lié à l'élève
    const comment = await Comment.create({
      content,
      studentId: params.student_id,
      teacherId,
    })
    return response.created(comment)
  }
  /**
   * Afficher un commentaire de l'élève student_id
   */
  async show({ params, response }: HttpContext) {
    // Récupère le commentaire
    // Vérifie que le commentaire appartient à l'élève
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .preload('teacher')
      .firstOrFail()
    return response.ok(comment)
  }
  /**
   * Mettre à jour le commentaire de l'élève student_id
   */
  async update({ params, request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { content } = await request.validateUsing(commentValidator)
    // Vérifie que le commentaire appartient bien à l'élève
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .firstOrFail()
    // Mise à jour
    comment.content = content
    await comment.save()
    // Réponse 200 OK avec le commentaire mis à jour
    return response.ok(comment)
  }
  /**
   * Supprimer le commentaire de l'élève student_id
   */
  async destroy({ params, response }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .firstOrFail()
    // Suppression du commentaire
    await comment.delete()
    // On utilise `response.noContent` pour retourner un code HTTP 204 sans contenu
    return response.noContent()
  }
}
