import { defineStore } from 'pinia'
import { type BookedMoviesState } from '@/types'

export const useBookedMoviesStore = defineStore('yellow-booking', {
  state: (): BookedMoviesState => ({
    reservedTickets: [] //can be an array for future booking multiple tikets
  }),
  persist: true
})
