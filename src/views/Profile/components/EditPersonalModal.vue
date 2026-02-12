<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepblue/50" @click.self="$emit('close')">
    <div class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" role="dialog" aria-labelledby="modal-personal-title">
      <div class="p-6">
        <h2 id="modal-personal-title" class="text-xl font-semibold text-deepblue mb-4">Información personal</h2>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
            {{ errorMessage }}
          </div>
          <div>
            <label for="edit-name" class="block text-sm font-medium text-deepblue mb-1">Nombre</label>
            <input id="edit-name" v-model="form.name" type="text" class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none" />
          </div>
          <div>
            <label for="edit-display" class="block text-sm font-medium text-deepblue mb-1">Nombre para mostrar</label>
            <input id="edit-display" v-model="form.display_name" type="text" class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none" />
          </div>
          <div>
            <label for="edit-age" class="block text-sm font-medium text-deepblue mb-1">Edad <span class="text-red-500">*</span></label>
            <input id="edit-age" v-model.number="form.age" type="number" min="18" max="99" class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none" :class="{ 'border-red-400': errors.age }" />
            <p v-if="errors.age" class="mt-1 text-sm text-red-600">{{ errors.age }}</p>
          </div>
          <div>
            <label for="edit-occupation" class="block text-sm font-medium text-deepblue mb-1">Profesión</label>
            <input id="edit-occupation" v-model.trim="form.occupation" type="text" class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-deepblue mb-2">Zonas preferidas</label>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="zone in zones"
                :key="zone"
                class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors"
                :class="form.preferred_zones.includes(zone) ? 'border-terracota bg-terracota-50 text-terracota-700' : 'border-cream-400 hover:border-deepblue-200'"
              >
                <input v-model="form.preferred_zones" type="checkbox" :value="zone" class="rounded border-cream-400 text-terracota focus:ring-terracota" />
                <span>{{ zone }}</span>
              </label>
            </div>
          </div>
          <div>
            <label for="edit-budget" class="block text-sm font-medium text-deepblue mb-1">Presupuesto mensual (€)</label>
            <input id="edit-budget" v-model.number="form.monthly_budget" type="number" min="0" step="50" class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none" :class="{ 'border-red-400': errors.monthly_budget }" />
            <p v-if="errors.monthly_budget" class="mt-1 text-sm text-red-600">{{ errors.monthly_budget }}</p>
          </div>
          <div>
            <label for="edit-bio" class="block text-sm font-medium text-deepblue mb-1">Bio</label>
            <textarea id="edit-bio" v-model="form.bio" rows="3" class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none" placeholder="Unas palabras sobre ti"></textarea>
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" class="flex-1 py-2.5 rounded-lg font-medium border border-cream-400 text-deepblue hover:bg-cream-100 transition" @click="$emit('close')">
              Cancelar
            </button>
            <button type="submit" class="flex-1 py-2.5 rounded-lg font-medium text-white bg-terracota hover:bg-terracota-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota disabled:opacity-60" :disabled="loading">
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

const zones = ['Ruzafa', 'Benimaclet', 'El Carmen', 'Poblats Marítims', 'Campanar', 'Jesús', 'Patraix', 'Otros']

const form = reactive({
  name: props.profile?.name ?? '',
  display_name: props.profile?.display_name ?? '',
  age: props.profile?.age ?? null,
  occupation: props.profile?.occupation ?? '',
  preferred_zones: Array.isArray(props.profile?.preferred_zones) ? [...props.profile.preferred_zones] : [],
  monthly_budget: props.profile?.monthly_budget ?? null,
  bio: props.profile?.bio ?? '',
})

const errors = reactive({ age: '', monthly_budget: '' })
const errorMessage = ref('')

watch(
  () => props.profile,
  (p) => {
    if (!p) return
    form.name = p.name ?? ''
    form.display_name = p.display_name ?? ''
    form.age = p.age ?? null
    form.occupation = p.occupation ?? ''
    form.preferred_zones = Array.isArray(p.preferred_zones) ? [...p.preferred_zones] : []
    form.monthly_budget = p.monthly_budget ?? null
    form.bio = p.bio ?? ''
  },
  { immediate: true }
)

function handleSubmit() {
  errors.age = ''
  errors.monthly_budget = ''
  errorMessage.value = ''
  if (form.age != null && (Number(form.age) < 18 || Number(form.age) > 99)) {
    errors.age = 'Edad entre 18 y 99.'
    return
  }
  if (form.monthly_budget != null && form.monthly_budget < 0) {
    errors.monthly_budget = 'El presupuesto no puede ser negativo.'
    return
  }
  emit('save', { ...form })
}
</script>
