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

router.get('/', async () => {
  return {
    hello: 'API is working',
  }
})

// route CRUD students
router.resource('students', StudentsController).apiOnly()

// route CRUD comments
router.group(() => {
  router.resource('comments', CommentsController).apiOnly()
})
.prefix('students/:students_id')

// route CRUD teachers
router.resource('teachers', TeachersController).apiOnly()

// route CRUD class_groups
router.resource('class_groups', ClassGroupsController).apiOnly()