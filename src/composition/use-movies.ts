import { useAxios } from '@/composition'
import { useMoviesStore } from '@/stores/use-movies-store'
import { useBookedMoviesStore } from '@/stores/use-booked-movies-store'
import { storeToRefs } from 'pinia'
import { type Nullable } from '@/types'

export function useMovies() {
  const { get, post } = useAxios()
  const moviesStore = useMoviesStore()
  const bookedStore = useBookedMoviesStore()
  const { movies, selectedMovie, selectedMovieSessions, selectedMovieRowWithSeats } =
    storeToRefs(moviesStore)

  const { reservedTickets } = storeToRefs(bookedStore)

  const getAllMovies = async () => {
    try {
      const { status, data } = await get('/movies')
      if (status !== 200) {
        throw new Error(`Unexpected response status on getAllMovies: ${status}`)
      }

      movies.value = data.data || []
      return movies.value
    } catch (error) {
      console.error('Error fetching movies', error)
      throw error
    }
  }

  const getMovieById = async (id: number) => {
    try {
      const { status, data } = await get(`/movies?movie_id=${id}`)

      if (status !== 200) {
        throw new Error(`Unexpected response status on getMovieById: ${status}`)
      }

      selectedMovie.value = data.data[0]
      return selectedMovie.value
    } catch (error) {
      console.error('Error fetching movies by id', error)
      throw error
    }
  }

  const getMovieSessionById = async (id: number) => {
    try {
      const { status, data } = await get(`/movieShows?movie_id=${id}`)
      if (status !== 200) {
        throw new Error(`Unexpected response status on getMovieSessionById: ${status}`)
      }

      const sessions = data.data[id].map((session: any) => {
        return {
          showdate: session.showdate,
          daytime: session.daytime.split(';')
        }
      }) // TODO can remove to getters -> use-movie-store

      selectedMovieSessions.value = sessions
      return selectedMovieSessions.value
    } catch (error) {
      console.error('Error fetching session by id', error)
      throw error
    }
  }

  const searchMoviesBy = async ({ name, genres }: { name?: string; genres?: Nullable<number> }) => {
    try {
      const query = new URLSearchParams()
      if (name) query.append('name', name)
      if (typeof genres === 'number') query.append('genres', genres.toString())

      const { status, data } = await get(`/movies?${query.toString()}`)

      if (status !== 200) {
        throw new Error(`Unexpected response status on searchMoviesBy: ${status}`)
      }

      movies.value = data.data || []
      return movies.value
    } catch (error) {
      console.error('Error searching movies', error)
      throw error
    }
  }

  const getShowPlaces = async ({
    movie_id,
    daytime,
    showdate
  }: {
    movie_id: number
    daytime: string
    showdate: string
  }) => {
    try {
      const { status, data } = await get(
        `/showPlaces?movie_id=${movie_id}&daytime=${daytime}&showdate=${showdate}`
      )

      if (status !== 200) {
        throw new Error(`Unexpected response status on getShowPlaces: ${status}`)
      }

      selectedMovieRowWithSeats.value = data.data
      return data.data || []
    } catch (error) {
      console.error('Error fetching show places', error)
      throw error
    }
  }

  const bookPlace = async ({
    movie_id,
    row,
    seat,
    showdate,
    daytime
  }: {
    movie_id: number
    row: number
    seat: number
    showdate: string
    daytime: string
  }) => {
    try {
      const { status, data } = await post('/bookPlace', {
        movie_id,
        row,
        seat,
        showdate,
        daytime
      })

      if (status !== 200) {
        throw new Error(`Unexpected response status on bookPlace: ${status}`)
      }

      reservedTickets.value = [...reservedTickets.value, data.data]

      return data.data
    } catch (error) {
      console.error('Error booking place', error)
      throw error
    }
  }

  return {
    getAllMovies,
    getMovieById,
    searchMoviesBy,
    getMovieSessionById,
    getShowPlaces,
    bookPlace
  }
}
