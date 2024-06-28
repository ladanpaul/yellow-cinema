<script setup lang="ts">
import { UiHeader, UiFooter } from '@/components'
</script>

<template>
  <div class="flex flex-col min-h-screen wrap-bg pt-8 md:pt-10 relative">
    <UiHeader class="fixed top-0 w-full z-10" />
    <RouterView />
    <UiFooter class="mt-auto" />
  </div>
</template>

<style scoped>
.wrap-bg {
  @apply relative overflow-hidden;
}

.wrap-bg::before {
  @apply fixed top-0 left-0 w-full h-full bg-no-repeat bg-cover opacity-40 -z-[1] blur-sm;
  background-image: url('@/assets/img/cinema-bg-1.jpg');
  content: '';
}
</style>
