<template>
  <form class="space-y-4 sm:space-y-5" @submit.prevent="handleSubmit" novalidate>
    <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
      {{ errorMessage }}
    </div>

    <div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input v-model="form.has_children" type="checkbox" class="rounded border-warm-sand text-terracota focus:ring-terracota" />
        <span class="text-sm font-medium text-charcoal">¿Tienes hijos?</span>
      </label>
    </div>

    <template v-if="form.has_children">
      <div>
        <label class="block text-sm font-medium text-charcoal mb-2">Edades de los hijos</label>
        <div class="flex flex-wrap gap-2">
          <label
            v-for="age in childAgeOptions"
            :key="age"
            class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors"
            :class="form.children_ages.includes(age) ? 'border-soft-terracota bg-soft-terracota/20' : 'border-warm-sand'"
          >
            <input v-model="form.children_ages" type="checkbox" :value="age" class="rounded border-warm-sand text-terracota focus:ring-terracota" />
            <span>{{ age }} años</span>
          </label>
        </div>
        <p v-if="errors.children_ages" class="mt-1 text-sm text-red-600">{{ errors.children_ages }}</p>
      </div>
      <div>
        <label for="step2-custody" class="block text-sm font-medium text-charcoal mb-1">Tipo de custodia</label>
        <select
          id="step2-custody"
          v-model="form.custody_type"
          class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
          :class="{ 'border-red-400': errors.custody_type }"
        >
          <option value="">Selecciona</option>
          <option value="shared_50">Compartida 50/50</option>
          <option value="shared_other">Compartida (otro)</option>
          <option value="full">Completa</option>
          <option value="none">No aplica</option>
        </select>
        <p v-if="errors.custody_type" class="mt-1 text-sm text-red-600">{{ errors.custody_type }}</p>
      </div>
    </template>

    <div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input v-model="form.has_pets" type="checkbox" class="rounded border-warm-sand text-terracota focus:ring-terracota" />
        <span class="text-sm font-medium text-charcoal">¿Tienes mascotas?</span>
      </label>
    </div>
    <div v-if="form.has_pets">
      <label for="step2-pet" class="block text-sm font-medium text-charcoal mb-1">Tipo de mascota</label>
      <select
        id="step2-pet"
        v-model="form.pet_type"
        class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option value="">Selecciona</option>
        <option value="dog">Perro</option>
        <option value="cat">Gato</option>
        <option value="other">Otro</option>
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
import { validateStep2 } from '@/lib/onboardingValidation'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
})

const emit = defineEmits(['submit'])

const childAgeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const form = reactive({
  has_children: props.modelValue.has_children ?? false,
  children_ages: Array.isArray(props.modelValue.children_ages) ? [...props.modelValue.children_ages] : [],
  custody_type: props.modelValue.custody_type ?? '',
  has_pets: props.modelValue.has_pets ?? false,
  pet_type: props.modelValue.pet_type ?? '',
})

const errors = reactive({ children_ages: '', custody_type: '' })

watch(
  () => props.modelValue,
  (v) => {
    if (!v) return
    form.has_children = v.has_children ?? false
    form.children_ages = Array.isArray(v.children_ages) ? [...v.children_ages] : []
    form.custody_type = v.custody_type ?? ''
    form.has_pets = v.has_pets ?? false
    form.pet_type = v.pet_type ?? ''
  },
  { deep: true }
)

function handleSubmit() {
  Object.assign(errors, { children_ages: '', custody_type: '' })
  const result = validateStep2(form)
  if (!result.valid) {
    if (result.field) errors[result.field] = 'Completa este campo correctamente.'
    return
  }
  emit('submit', { ...form })
}
</script>
