<script setup lang="ts">
import { type MovieData, type Nullable } from '@/types'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/use-movies-store'
import { useMovies } from '@/composition'
import { storeToRefs } from 'pinia'
import { Movie, UiLoader, MoviesFilter } from '@/components'

const moviesStore = useMoviesStore()
const { movies, selectedMovie } = storeToRefs(moviesStore)
const { getAllMovies, searchMoviesBy } = useMovies()
const router = useRouter()

const goToSelectedMovie = (movie: MovieData) => {
  selectedMovie.value = movie
  router.push({ name: 'movie-details', params: { id: movie.id } })
}

const filterBy = async (data: { name?: string; genres?: Nullable<number> }) => {
  searchMoviesBy({ name: data.name, genres: data.genres })
}

if (!movies.value.length) {
  getAllMovies()
}

// TODO - clear filter on UNMOUNTED the component ( getAllMovies() as example )
</script>

<template>
  <div v-if="movies.length" class="flex flex-col min-h-screen">
    <MoviesFilter class="container" @search="filterBy($event)" />
    <section
      class="container px-2 py-4 md:px-6 text-3xl mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
    >
      <Movie
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @selectedMovie="goToSelectedMovie($event)"
      />
    </section>
    <!-- change to skeleton or spiner -->
  </div>
  <UiLoader v-else class="m-auto" />
</template>
