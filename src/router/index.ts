import { createRouter, createWebHistory } from 'vue-router'
import Movies from '@/views/Movies.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Movies
    },
    {
      path: '/:id',
      name: 'movie-details',
      component: () => import('../views/MovieDetails.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
