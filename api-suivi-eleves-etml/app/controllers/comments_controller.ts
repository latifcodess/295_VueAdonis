import Comment from '#models/comment'
import Student from '#models/student'
import CommentPolicy from '#policies/comment_policy'
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
  async store({ params, request, response, auth }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { content } = await request.validateUsing(commentValidator)
    // Récupération de l'utilisateur authentifié
    const user = auth.user!
    // Chargement de l'enseignant lié à cet utilisateur
    const teacher = await user.related('teacher').query().first()
    if (!teacher) {
      return response.badRequest({ message: 'Teacher not found' })
    }
    const teacherId = teacher.id
    // Création du commentaire lié à l'élève
    const comment = await Comment.create({
      content,
      studentId: params.student_id,
      teacherId,
    })
    // Réponse HTTP 201 avec le commentaire
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
  async update({ params, request, response, bouncer }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { content } = await request.validateUsing(commentValidator)
    // Vérifie que le commentaire appartient bien à l'élève
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .firstOrFail()
    // Vérifie les permissions de l'utilisateur connecté
    if (await bouncer.with(CommentPolicy).denies('update', comment)) {
      return response.unauthorized({
        message:
          "Vous n'êtes pas l'auteur de ce commentaire. Vous n'avez pas le droit de le modifier",
      })
    }
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
