<script setup lang="ts">
import { ref } from 'vue'
import { UiPopup, UiButton } from '@/components'
import { type SelectedMovieRowWithSeats } from '@/types'

interface SelectedSeats {
  seat: number
  row: number
}

const submitWrapRef = ref<HTMLElement | null>(null)

const emit = defineEmits(['selectedSeat'])

const props = defineProps({
  seats: {
    type: Array as () => SelectedMovieRowWithSeats,
    required: true
  }
})

const popupRef = ref<InstanceType<typeof UiPopup> | null>(null)

const togglePopup = () => {
  popupRef.value?.togglePopup()
}

const selectedSeat = ref<SelectedSeats | null>(null)

const setSeat = (seat: number, row: number) => {
  selectedSeat.value = {
    seat,
    row
  }

  submitWrapRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const submit = () => {
  emit('selectedSeat', selectedSeat.value)
  togglePopup()
}

defineExpose({
  togglePopup
})
</script>

<template>
  <UiPopup ref="popupRef">
    <div class="text-center text-2xl font-semibold">Купівля</div>
    <div class="flex flex-col space-y-1">
      <div
        v-for="(row, rowIndex) in props.seats"
        :key="rowIndex"
        class="flex items-center space-y-1"
      >
        <div class="flex text-sm font-bold shrink-0">Ряд {{ row[0].row }}:</div>
        <div class="ml-4 flex items-center justify-center flex-wrap gap-1">
          <div
            v-for="place in row[1]"
            :key="place.seat"
            :class="[
              'w-4 h-4 text-8px font-semibold flex items-center justify-center rounded cursor-pointer text-yellow-100',
              !place.is_free ||
              (selectedSeat?.seat === place.seat && selectedSeat?.row === row[0].row)
                ? 'bg-red-500 !text-black'
                : 'bg-green-500'
            ]"
            @click="setSeat(place.seat, row[0].row)"
          >
            {{ place.seat }}
          </div>
        </div>
      </div>
    </div>
    <div ref="submitWrapRef" class="flex pb-4 mt-4">
      <UiButton class="mx-auto px-8" @click="submit">Підтвердити</UiButton>
    </div>
  </UiPopup>
</template>
