<template>
  <form class="space-y-4 sm:space-y-5" @submit.prevent="handleSubmit" novalidate>
    <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
      {{ errorMessage }}
    </div>

    <div>
      <label for="step5-roommates" class="block text-sm font-medium text-deepblue mb-1">Número de compañeros preferido</label>
      <select
        id="step5-roommates"
        v-model.number="form.preferred_roommates_count"
        class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option :value="null">Selecciona</option>
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3 o más</option>
      </select>
    </div>

    <div>
      <label for="step5-age" class="block text-sm font-medium text-deepblue mb-1">Edad preferida de compañeros</label>
      <select
        id="step5-age"
        v-model="form.preferred_age"
        class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option value="">Selecciona</option>
        <option value="similar">Similar a la mía</option>
        <option value="any">Cualquiera</option>
      </select>
    </div>

    <div>
      <label for="step5-children" class="block text-sm font-medium text-deepblue mb-1">Preferencia sobre hijos</label>
      <select
        id="step5-children"
        v-model="form.children_preference"
        class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
      >
        <option value="">Selecciona</option>
        <option value="with_children">Con hijos</option>
        <option value="without_children">Sin hijos</option>
        <option value="no_preference">Sin preferencia</option>
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
  preferred_roommates_count: props.modelValue.preferred_roommates_count ?? null,
  preferred_age: props.modelValue.preferred_age ?? '',
  children_preference: props.modelValue.children_preference ?? '',
})

watch(
  () => props.modelValue,
  (v) => {
    if (!v) return
    form.preferred_roommates_count = v.preferred_roommates_count ?? null
    form.preferred_age = v.preferred_age ?? ''
    form.children_preference = v.children_preference ?? ''
  },
  { deep: true }
)

function handleSubmit() {
  emit('submit', { ...form })
}
</script>
