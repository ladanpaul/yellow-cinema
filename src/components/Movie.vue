<script setup lang="ts">
import { type PropType } from 'vue'
import { type MovieData } from '@/types'

defineEmits(['selectedMovie'])

defineProps({
  movie: {
    type: Object as PropType<MovieData>,
    required: true
  }
})
</script>

<template>
  <article
    class="flex justify-center md:justify-start transition-transform duration-300 transform hover:scale-105 cursor-pointer border rounded-xl md:p-4 border-transparent md:hover:border-amber-400 md:hover:shadow-custom-amber"
    @click="$emit('selectedMovie', movie)"
  >
    <figure class="flex flex-col min-w-[220px] w-[220px]">
      <img :src="movie.image" alt="Movie Image" class="w-full h-auto object-cover" />
      <!-- TODO add loading  for image -->
      <figcaption
        class="text-sm font-bold p-1 bg-amber-400 rounded-b text-center"
        v-html="movie.name"
      ></figcaption>
    </figure>
    <section class="hidden md:flex flex-col ml-4">
      <header class="font-bold uppercase text-lg">
        <h2 v-html="movie.name"></h2>
      </header>
      <p class="mt-4 leading-6 text-xs md:text-sm" v-html="movie.description" />
    </section>
  </article>
</template>
