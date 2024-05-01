/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import MoviesController from '#controllers/movies_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('/sign-up', [UsersController, 'signUp'])
  router.post('/login', [UsersController, 'login'])
  router.get('/:id', [UsersController, 'findUserById']).use([middleware.auth()])
}).prefix('/api/v1/users')


router.group(() => {
  router.post('/', [MoviesController, 'store']).use([middleware.auth()])
  router.get('/', [MoviesController, 'index'])
  router.get('/:id', [MoviesController, 'show'])
  router.patch('/:id', [MoviesController, 'update']).use([middleware.auth()])
  router.delete('/:id', [MoviesController, 'destroy']).use([middleware.auth()])
}).prefix('/api/v1/movies')


