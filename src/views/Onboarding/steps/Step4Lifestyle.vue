<template>
  <form class="space-y-4 sm:space-y-5" @submit.prevent="handleSubmit" novalidate>
    <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
      {{ errorMessage }}
    </div>

    <div>
      <label for="step4-cleanliness" class="block text-sm font-medium text-deepblue mb-1">Nivel de orden</label>
      <select
        id="step4-cleanliness"
        v-model="form.cleanliness_level"
        class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option value="">Selecciona</option>
        <option value="minimal">Mínimo</option>
        <option value="normal">Normal</option>
        <option value="strict">Muy ordenado</option>
      </select>
    </div>

    <div>
      <label for="step4-noise" class="block text-sm font-medium text-deepblue mb-1">Nivel de ruido</label>
      <select
        id="step4-noise"
        v-model="form.noise_level"
        class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option value="">Selecciona</option>
        <option value="quiet">Tranquilo</option>
        <option value="moderate">Moderado</option>
        <option value="lively">Animado</option>
      </select>
    </div>

    <div>
      <label for="step4-smoker" class="block text-sm font-medium text-deepblue mb-1">¿Fumas?</label>
      <select
        id="step4-smoker"
        v-model="form.is_smoker"
        class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option value="">Selecciona</option>
        <option value="no">No</option>
        <option value="yes">Sí</option>
        <option value="sometimes">A veces</option>
      </select>
    </div>

    <button
      type="submit"
      class="w-full py-2.5 rounded-lg font-medium text-white bg-terracota hover:bg-terracota-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2 disabled:opacity-60"
      :disabled="loading"
    >
      {{ loading ? 'Guardando…' : 'Siguiente' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
})

const emit = defineEmits(['submit'])

const form = reactive({
  cleanliness_level: props.modelValue.cleanliness_level ?? '',
  noise_level: props.modelValue.noise_level ?? '',
  is_smoker: props.modelValue.is_smoker ?? '',
})

watch(
  () => props.modelValue,
  (v) => {
    if (!v) return
    form.cleanliness_level = v.cleanliness_level ?? ''
    form.noise_level = v.noise_level ?? ''
    form.is_smoker = v.is_smoker ?? ''
  },
  { deep: true }
)

function handleSubmit() {
  emit('submit', { ...form })
}
</script>
