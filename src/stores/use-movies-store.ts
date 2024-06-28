import { defineStore } from 'pinia'
import { type MoviesState } from '@/types'

export const useMoviesStore = defineStore('movies', {
  state: (): MoviesState => ({
    movies: [],
    selectedMovie: null,
    selectedMovieSessions: [],
    selectedMovieRowWithSeats: []
  })
})
