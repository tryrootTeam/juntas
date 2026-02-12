<template>
  <form class="space-y-4 sm:space-y-5" @submit.prevent="handleSubmit" novalidate>
    <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
      {{ errorMessage }}
    </div>

    <div>
      <label for="step1-name" class="block text-sm font-medium text-deepblue mb-1">Nombre</label>
      <input
        id="step1-name"
        :value="form.name"
        type="text"
        readonly
        class="w-full px-3 py-2 border rounded-lg border-cream-400 bg-cream-100 text-deepblue-300 cursor-not-allowed"
      />
    </div>

    <div>
      <label for="step1-age" class="block text-sm font-medium text-deepblue mb-1">Edad <span class="text-red-500">*</span></label>
      <input
        id="step1-age"
        v-model.number="form.age"
        type="number"
        min="18"
        max="99"
        class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
        :class="{ 'border-red-400': errors.age }"
        placeholder="Ej. 32"
      />
      <p v-if="errors.age" class="mt-1 text-sm text-red-600">{{ errors.age }}</p>
    </div>

    <div>
      <label for="step1-occupation" class="block text-sm font-medium text-deepblue mb-1">Profesión <span class="text-red-500">*</span></label>
      <input
        id="step1-occupation"
        v-model.trim="form.occupation"
        type="text"
        class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
        :class="{ 'border-red-400': errors.occupation }"
        placeholder="Ej. Project Manager"
      />
      <p v-if="errors.occupation" class="mt-1 text-sm text-red-600">{{ errors.occupation }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-deepblue mb-2">Zonas preferidas <span class="text-red-500">*</span></label>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="zone in zones"
          :key="zone"
          class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors"
          :class="form.preferred_zones.includes(zone) ? 'border-terracota bg-terracota-50 text-terracota-700' : 'border-cream-400 hover:border-deepblue-200'"
        >
          <input
            v-model="form.preferred_zones"
            type="checkbox"
            :value="zone"
            class="rounded border-cream-400 text-terracota focus:ring-terracota"
          />
          <span>{{ zone }}</span>
        </label>
      </div>
      <p v-if="errors.preferred_zones" class="mt-1 text-sm text-red-600">{{ errors.preferred_zones }}</p>
    </div>

    <div>
      <label for="step1-budget" class="block text-sm font-medium text-deepblue mb-1">Presupuesto mensual (€) <span class="text-red-500">*</span></label>
      <input
        id="step1-budget"
        v-model.number="form.monthly_budget"
        type="number"
        min="100"
        max="2000"
        step="50"
        class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
        :class="{ 'border-red-400': errors.monthly_budget }"
        placeholder="Ej. 500"
      />
      <p v-if="errors.monthly_budget" class="mt-1 text-sm text-red-600">{{ errors.monthly_budget }}</p>
      <p class="mt-1 text-xs text-deepblue-300">Entre 100 € y 2000 €</p>
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
import { ref, reactive, watch } from 'vue'
import { validateStep1 } from '@/lib/onboardingValidation'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
})

const emit = defineEmits(['submit'])

const zones = ['Ruzafa', 'Benimaclet', 'El Carmen', 'Poblats Marítims', 'Campanar', 'Jesús', 'Patraix', 'Otros']

const form = reactive({
  name: props.modelValue.name ?? '',
  age: props.modelValue.age ?? null,
  occupation: props.modelValue.occupation ?? '',
  preferred_zones: Array.isArray(props.modelValue.preferred_zones) ? [...props.modelValue.preferred_zones] : [],
  monthly_budget: props.modelValue.monthly_budget ?? null,
})

const errors = reactive({ age: '', occupation: '', preferred_zones: '', monthly_budget: '' })

watch(
  () => props.modelValue,
  (v) => {
    if (!v) return
    form.name = v.name ?? ''
    form.age = v.age ?? null
    form.occupation = v.occupation ?? ''
    form.preferred_zones = Array.isArray(v.preferred_zones) ? [...v.preferred_zones] : []
    form.monthly_budget = v.monthly_budget ?? null
  },
  { deep: true }
)

function handleSubmit() {
  Object.assign(errors, { age: '', occupation: '', preferred_zones: '', monthly_budget: '' })
  const result = validateStep1(form)
  if (!result.valid) {
    if (result.field) errors[result.field] = 'Completa este campo correctamente.'
    return
  }
  emit('submit', { ...form })
}
</script>
