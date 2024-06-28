<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMoviesStore } from '@/stores/use-movies-store'
import { useBookedMoviesStore } from '@/stores/use-booked-movies-store'
import { useMovies } from '@/composition'
import { storeToRefs } from 'pinia'
import { type MovieSessions, type Nullable } from '@/types'
import { UiButton, UiLoader, BookSession } from '@/components'

const popupRef = ref<InstanceType<typeof BookSession> | null>(null)

const moviesStore = useMoviesStore()
const { selectedMovie, selectedMovieSessions, selectedMovieRowWithSeats } = storeToRefs(moviesStore)
const bookedStore = useBookedMoviesStore()
const { reservedTickets } = storeToRefs(bookedStore)

const { getMovieById, getMovieSessionById, getShowPlaces, bookPlace } = useMovies()
const route = useRoute()

const sessionBlock = ref<HTMLElement | null>(null)
const selectedSession = ref<Nullable<MovieSessions & { movie_id: number }>>(null) // movie_id: number can be added to interface MovieSessions?!

const scrollToSessions = () => {
  sessionBlock.value?.scrollIntoView({ behavior: 'smooth' })
}

const setSelectedSession = (showdate: string, daytime: string) => {
  selectedSession.value = { movie_id: movieId.value, showdate, daytime }
}

const isSelectedSession = (showdate: string, daytime: string) => {
  return selectedSession.value?.showdate === showdate && selectedSession.value?.daytime === daytime
}

const showPlaces = async (formData: { movie_id: number; daytime: string; showdate: string }) => {
  await getShowPlaces(formData)
  togglePopup()
}

const togglePopup = () => {
  popupRef.value?.togglePopup()
}

const movieId = computed(() => {
  return Number(route.params.id)
})

const reserveTicket = async (data: { seat: number; row: number }) => {
  if (!selectedSession.value) {
    return
  }

  bookPlace({
    movie_id: movieId.value,
    row: data.row,
    seat: data.seat,
    showdate: selectedSession.value!.showdate,
    daytime: selectedSession.value!.daytime
  })
}

if (!selectedMovie.value) {
  getMovieById(movieId.value)
}

onMounted(() => {
  getMovieSessionById(movieId.value)
})

onUnmounted(() => {
  selectedMovieSessions.value = []
  selectedMovieRowWithSeats.value = []
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <section v-if="selectedMovie" class="container px-2 py-4 md:px-6 mt-10">
      <h1 class="font-bold text-2xl text-center" v-html="selectedMovie.name"></h1>
      <div class="mt-4 flex flex-col md:flex-row items-start">
        <div class="flex flex-col mx-auto md:mx-0">
          <!-- TODO add loading  for image -->
          <img
            :src="selectedMovie.image"
            alt="movie image"
            class="w-[250px] min-w-[250px] object-cover mx-auto md:mx-auto"
          />
          <UiButton class="mt-2" @click="scrollToSessions">Купити квиток</UiButton>
        </div>
        <div class="flex flex-col mt-4 md:ml-4 md:mt-0">
          <p class="text-xs md:text-sm" v-html="selectedMovie.additional"></p>
          <p class="mt-4 font-bold text-sm md:text-base" v-html="selectedMovie.description"></p>
        </div>
      </div>
      <!-- TODO - can remove to components as MovieSessions component  -->
      <section ref="sessionBlock" v-if="selectedMovieSessions.length" class="mt-8">
        <h3 class="text-center text-lg font-bold">Сеанси:</h3>
        <p class="text-center text-xs text-yellow-800">( виберіть свій сеанс )</p>
        <!-- TODO remove to main page with redirect and show user all his tikets -->
        <div
          v-if="reservedTickets.length && reservedTickets[0].movie_id === movieId.toString()"
          class="mt-4 py-4 px-6 flex flex-col items-center bg-yellow1 rounded-md w-fit mx-auto"
        >
          <h3 class="text-lg font-bold">Дякуюємо за бронювання:</h3>
          <div class="mt-4" v-for="tiket in reservedTickets" :key="tiket.movie_id">
            <p>
              <span class="font-semibold">День:</span>
              {{ tiket.showdate }}
            </p>
            <p>
              <span class="font-semibold">Час:</span>
              {{ tiket.daytime }}
            </p>
            <p>
              <span class="font-semibold">Ряд:</span>
              {{ tiket.row }}
            </p>
            <p>
              <span class="font-semibold">Місце:</span>
              {{ tiket.seat }}
            </p>
          </div>
        </div>
        <div class="flex flex-col p-6 pb-7">
          <div
            v-for="(session, idx) in selectedMovieSessions"
            :key="idx"
            class="mt-2 flex flex-col md:items-center first:mt-0"
          >
            <h6
              :class="[
                'text-base font-semibold text-center px-2',
                { 'bg-yellow1': selectedSession?.showdate === session.showdate }
              ]"
            >
              {{ session.showdate }}
            </h6>
            <ul class="mt-2 flex items-center text-sm overflow-x-auto">
              <li
                v-for="(daytime, i) in session.daytime"
                :key="i"
                :class="[
                  'p-2 bg-yellow-700 text-yellow-100 rounded ml-2 first:ml-0 cursor-pointer',
                  {
                    '!bg-yellow1 !text-black': isSelectedSession(session.showdate, daytime)
                  }
                ]"
                @click="setSelectedSession(session.showdate, daytime)"
              >
                {{ daytime }}
              </li>
            </ul>
          </div>
          <UiButton
            :disabled="!selectedSession"
            class="mt-6 px-6 mx-auto"
            @click="showPlaces(selectedSession!)"
            >Продовжити</UiButton
          >
        </div>
      </section>
      <UiLoader v-else class="mt-8" />
    </section>
    <!-- change to skeleton or spiner -->
    <UiLoader v-else class="m-auto" />
  </div>
  <BookSession
    v-if="selectedMovieRowWithSeats.length"
    ref="popupRef"
    :seats="selectedMovieRowWithSeats"
    @selectedSeat="reserveTicket($event)"
  >
    <div class="text-center text-2xl font-semibold">Купівля</div>
  </BookSession>
</template>
