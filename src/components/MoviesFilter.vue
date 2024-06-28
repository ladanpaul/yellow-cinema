<script setup lang="ts">
import { ref, computed } from 'vue'
import { UiButton } from '@/components'
import { type Nullable } from '@/types'

const emit = defineEmits(['search'])

const genres = [
  { label: 'Бойовики', value: 0 },
  { label: 'Пригоди', value: 1 },
  { label: 'Комедії', value: 2 },
  { label: 'Драми', value: 3 },
  { label: 'Жахи', value: 4 },
  { label: 'Вестерни', value: 5 }
] // TODO - it's can be a props

const movieName = ref('')
const selectedGenre = ref<Nullable<number>>(null)

const formData = computed(() => {
  return {
    name: movieName.value,
    genres: selectedGenre.value
  }
})

const isDisabledBtn = computed(() => {
  return !!(!selectedGenre.value && !movieName.value.length)
})

const search = () => {
  emit('search', formData.value)
}

// TODO - save filters on store
</script>

<template>
  <!-- TODO - added "show all movies | reset filters" -->
  <!-- TODO - can be better to create Input and Select UI components -->
  <div class="flex flex-col mt-20 md:w-[450px]">
    <div class="flex flex-col md:flex-row md:justify-between">
      <label class="flex flex-col">
        <span class="text-sm font-semibold">Вкажіть назву:</span>
        <input
          type="text"
          v-model="movieName"
          class="mt-1 py-1.5 px-4 rounded outline-none md:w-[200px]"
          @keyup.enter="search"
        />
      </label>
      <label class="flex flex-col mt-4 md:mt-0">
        <span class="text-sm font-semibold">Виберіть жанр:</span>
        <select v-model="selectedGenre" class="mt-1 py-2 px-4 rounded outline-none md:w-[200px]">
          <option v-for="(genre, index) in genres" :key="index" :value="genre.value">
            {{ genre.label }}
          </option>
        </select>
      </label>
    </div>
    <UiButton :disabled="isDisabledBtn" class="mt-4" @click="search">Пошук</UiButton>
  </div>
</template>
