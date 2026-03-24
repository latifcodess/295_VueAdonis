/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import StudentsController from '#controllers/students_controller'
import TeachersController from '#controllers/teachers_controller'
import ClassGroupsController from '#controllers/class_groups_controller'
import CommentsController from '#controllers/comments_controller'
import { middleware } from './kernel.js'
import AuthController from '#controllers/auth_controller'
// Route de test
router.get('test', async () => {
  return 'API is working!'
})
router
  .group(() => {
    // Routes pour le CRUD /students
    router.resource('students', StudentsController).apiOnly()
    // Routes pour le CRUD /teachers
    router.resource('teachers', TeachersController).apiOnly()
    // Routes pour le CRUD /classGroup
    router.resource('classGroups', ClassGroupsController).apiOnly()
    // Routes imbriquées sur les commentaires
    // pour le CRUD /students/:student_id/comments
    router
      .group(() => {
        router.resource('comments', CommentsController).apiOnly()
      })
      .prefix('students/:student_id')
  })
  .use(middleware.auth())

// Routes pour l'authentification
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')
