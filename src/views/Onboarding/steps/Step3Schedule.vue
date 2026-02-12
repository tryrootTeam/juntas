<template>
  <form class="space-y-4 sm:space-y-5" @submit.prevent="handleSubmit" novalidate>
    <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
      {{ errorMessage }}
    </div>

    <div>
      <label for="step3-schedule" class="block text-sm font-medium text-charcoal mb-1">Horario de trabajo</label>
      <select
        id="step3-schedule"
        v-model="form.work_schedule"
        class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option value="">Selecciona</option>
        <option value="morning">Mañanas</option>
        <option value="afternoon">Tardes</option>
        <option value="night">Noches</option>
        <option value="flexible">Flexible</option>
      </select>
    </div>

    <div>
      <label for="step3-wfh" class="block text-sm font-medium text-charcoal mb-1">¿Trabajas desde casa?</label>
      <select
        id="step3-wfh"
        v-model="form.works_from_home"
        class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option value="">Selecciona</option>
        <option value="full">Sí, siempre</option>
        <option value="hybrid">Híbrido</option>
        <option value="no">No</option>
      </select>
    </div>

    <div>
      <label for="step3-time" class="block text-sm font-medium text-charcoal mb-1">Tiempo en casa</label>
      <select
        id="step3-time"
        v-model="form.time_at_home"
        class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option value="">Selecciona</option>
        <option value="low">Poco</option>
        <option value="medium">Medio</option>
        <option value="high">Mucho</option>
      </select>
    </div>

    <button
      type="submit"
      class="btn-primary w-full disabled:opacity-60"
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
  work_schedule: props.modelValue.work_schedule ?? '',
  works_from_home: props.modelValue.works_from_home ?? '',
  time_at_home: props.modelValue.time_at_home ?? '',
})

watch(
  () => props.modelValue,
  (v) => {
    if (!v) return
    form.work_schedule = v.work_schedule ?? ''
    form.works_from_home = v.works_from_home ?? ''
    form.time_at_home = v.time_at_home ?? ''
  },
  { deep: true }
)

function handleSubmit() {
  emit('submit', { ...form })
}
</script>
