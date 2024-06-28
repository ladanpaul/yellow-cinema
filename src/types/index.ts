export type Nullable<T> = null | T

export interface MovieData {
  additional: string
  description: string
  genre: number
  id: number
  image: string
  name: string
}

export interface MoviesResponse {
  data: MovieData[]
  error_code: number
  error_message: string
}

export interface MovieSessions {
  showdate: string
  daytime: string
}

export interface Seat {
  seat: number
  is_free: boolean
}

export interface RowWithSeats {
  row: number
  seats: Seat[]
}

export type SelectedMovieRowWithSeats = Array<[RowWithSeats, Seat[]]>

export interface MoviesState {
  movies: MovieData[]
  selectedMovie: Nullable<MovieData>
  selectedMovieSessions: MovieSessions[]
  selectedMovieRowWithSeats: SelectedMovieRowWithSeats
}

interface BookedMovies {
  daytime: string
  movie_id: number | string
  row: number
  seat: number
  showdate: string
}

export interface BookedMoviesState {
  reservedTickets: BookedMovies[]
}
