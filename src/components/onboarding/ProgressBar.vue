<template>
  <div class="w-full px-2 py-4 sm:px-4">
    <p class="text-sm font-medium text-deepblue-300 mb-3 sm:mb-4" aria-live="polite">
      Paso {{ currentStep }} de 6
    </p>
    <div class="flex items-center justify-between gap-0" role="progressbar" :aria-valuenow="currentStep" aria-valuemin="1" aria-valuemax="6" :aria-label="`Paso ${currentStep} de 6`">
      <template v-for="(_, index) in 6" :key="index">
        <div
          class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors flex-shrink-0"
          :class="stepClass(index + 1)"
        >
          <span v-if="index + 1 < currentStep" aria-hidden="true">✓</span>
          <span v-else-if="index + 1 === currentStep" aria-hidden="true">{{ index + 1 }}</span>
          <span v-else class="w-2 h-2 rounded-full bg-current" aria-hidden="true" />
        </div>
        <span
          v-if="index < 5"
          class="flex-1 min-h-0.5 rounded mx-0.5 max-w-4"
          :class="index + 1 < currentStep ? 'bg-terracota' : 'bg-cream-400'"
          aria-hidden="true"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentStep: { type: Number, required: true },
})

function stepClass(step) {
  if (step < props.currentStep) return 'bg-terracota text-white'
  if (step === props.currentStep) return 'bg-terracota text-white ring-2 ring-terracota ring-offset-2'
  return 'bg-cream-400 text-deepblue-300'
}
</script>
