<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50" @click.self="$emit('close')">
    <div class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" role="dialog" aria-labelledby="modal-family-title">
      <div class="p-6">
        <h2 id="modal-family-title" class="text-xl font-semibold text-charcoal mb-4">Situación familiar</h2>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
            {{ errorMessage }}
          </div>
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="form.has_children" type="checkbox" class="rounded border-warm-sand text-soft-terracota focus:ring-soft-terracota" />
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
                  <input v-model="form.children_ages" type="checkbox" :value="age" class="rounded border-warm-sand text-soft-terracota focus:ring-soft-terracota" />
                  <span>{{ age }} años</span>
                </label>
              </div>
            </div>
            <div>
              <label for="edit-custody" class="block text-sm font-medium text-charcoal mb-1">Tipo de custodia</label>
              <select id="edit-custody" v-model="form.custody_type" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
                <option value="">Selecciona</option>
                <option value="shared_50">Compartida 50/50</option>
                <option value="shared_other">Compartida (otro)</option>
                <option value="full">Completa</option>
                <option value="none">No aplica</option>
              </select>
            </div>
          </template>
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="form.has_pets" type="checkbox" class="rounded border-warm-sand text-soft-terracota focus:ring-soft-terracota" />
              <span class="text-sm font-medium text-charcoal">¿Tienes mascotas?</span>
            </label>
          </div>
          <div v-if="form.has_pets">
            <label for="edit-pet" class="block text-sm font-medium text-charcoal mb-1">Tipo de mascota</label>
            <select id="edit-pet" v-model="form.pet_type" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option value="">Selecciona</option>
              <option value="dog">Perro</option>
              <option value="cat">Gato</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" class="btn-secondary flex-1" @click="$emit('close')">
              Cancelar
            </button>
            <button type="submit" class="btn-primary flex-1 disabled:opacity-60" :disabled="loading">
              {{ loading ? 'Guardando…' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  profile: { type: Object, default: null },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'save'])

const childAgeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const form = reactive({
  has_children: props.profile?.has_children ?? false,
  children_ages: Array.isArray(props.profile?.children_ages) ? [...props.profile.children_ages] : [],
  custody_type: props.profile?.custody_type ?? '',
  has_pets: props.profile?.has_pets ?? false,
  pet_type: props.profile?.pet_type ?? '',
})

const errorMessage = ref('')

watch(
  () => props.profile,
  (p) => {
    if (!p) return
    form.has_children = p.has_children ?? false
    form.children_ages = Array.isArray(p.children_ages) ? [...p.children_ages] : []
    form.custody_type = p.custody_type ?? ''
    form.has_pets = p.has_pets ?? false
    form.pet_type = p.pet_type ?? ''
  },
  { immediate: true }
)

function handleSubmit() {
  errorMessage.value = ''
  if (form.has_children && form.children_ages.length === 0) {
    errorMessage.value = 'Indica las edades de los hijos.'
    return
  }
  if (form.has_children && !form.custody_type) {
    errorMessage.value = 'Selecciona el tipo de custodia.'
    return
  }
  emit('save', { ...form })
}
</script>
