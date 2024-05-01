import Movie from '#models/movie'
import { createMovieValidator } from '#validators/movie'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class MoviesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    try {  
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)

    const movies = await db.from('movies').join('users', 'users.id', '=', 'movies.user_id').paginate(page, limit);
    response.json(movies);
    } catch (err) {
      return response.internalServerError(err.stack);
    }
  }



  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
      const data = request.all()
      const payload = await createMovieValidator.validate(data)
      const movie = new Movie()
    try {

      await movie
        .fill({ title: payload.title, userId: auth.user?.id })
        .save()
      return response.created();
    } catch (err) {
      return response.internalServerError();

    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const movie = await Movie.find(params.id)
    
    if (!movie) {
      return response.notFound();
    }
    return movie
  }


  async update({ params, request, response }: HttpContext) { 
     const data = request.all()
    const payload = await createMovieValidator.validate(data)
    
    const movie = await Movie.find(params.id)

 if (!movie) {
      return response.notFound();
 }
    movie.title = payload.title
    await movie.save()

    return response.ok

  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const movie = await Movie.find(params.id)
    await movie?.delete();
    return response.noContent()
  }
}