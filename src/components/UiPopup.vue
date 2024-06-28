<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['onClose'])
const props = withDefaults(
  defineProps<{
    isClickOutside?: boolean
  }>(),
  {
    isClickOutside: true
  }
)

const isOpen = ref(false)

const togglePopup = () => {
  isOpen.value = !isOpen.value
}

const onClose = () => {
  emit('onClose')
  isOpen.value = false
}

const clickOutside = () => {
  if (!props.isClickOutside) {
    return
  }

  emit('onClose')
  isOpen.value = false
}

defineExpose({
  togglePopup
})
</script>

<template>
  <teleport to="body">
    <Transition name="fadePopup" appear @touchstart.stop>
      <div
        v-if="isOpen"
        class="modal-body_wrapper flex fixed top-0 bottom-0 left-0 right-0 bg-black/40 z-50 px-3 md:px-0"
        @click="clickOutside"
      >
        <div
          class="modal-body relative m-auto bg-white rounded-xl lg:rounded-3xl w-full px-6 py-4 max-w-[370px] lg:max-w-[760px] max-h-[98dvh] overflow-y-auto"
          @click.stop
        >
          <div
            v-if="isClickOutside"
            class="btn-modal-close absolute right-4 top-4 w-8 h-8 bg-black/5 rounded-full flex lg:w-10 lg:h-10 cursor-pointer box-content text-white opacity-100 hover:opacity-75"
            @click="onClose"
          >
            <div class="text-black m-auto">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-ful h-full"
              >
                <path
                  d="M10.9972 1.00195L1.00391 10.9953"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.0002 11.0018L0.998535 0.998047"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="max-h-[92vh] mt-10">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
.fadePopup-enter-active,
.fadePopup-leave-active {
  transition: opacity 0.1s ease;
}

.fadePopup-enter-from,
.fadePopup-leave-to {
  opacity: 0;
}
</style>
