<script setup lang="ts">
import { computed } from 'vue'
enum Theme {
  default = 'yellow'
}

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    theme?: string
  }>(),
  {
    disabled: false,
    theme: Theme.default
  }
)

const buttonTheme = computed(() => {
  const themes: Record<string, string[]> = {
    yellow: [
      `bg-yellow1 text-black enabled:hover:bg-black enabled:hover:text-white font-bold leading-tight transition-all enabled:hover:duration-200`
    ]
  }

  return themes[props.theme]
})
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'rounded-lg border-2 border-solid border-black text-base text-center min-h-[40px] disabled:bg-opacity-40 disabled:border-transparent disabled:text-opacity-60',
      buttonTheme
    ]"
  >
    <span class="relative z-1"><slot /></span>
  </button>
</template>
