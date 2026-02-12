<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50" @click.self="$emit('close')">
    <div class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" role="dialog" aria-labelledby="modal-lifestyle-title">
      <div class="p-6">
        <h2 id="modal-lifestyle-title" class="text-xl font-semibold text-charcoal mb-4">Estilo de vida</h2>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="edit-schedule" class="block text-sm font-medium text-charcoal mb-1">Horario de trabajo</label>
            <select id="edit-schedule" v-model="form.work_schedule" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option value="">Selecciona</option>
              <option value="morning">Mañanas</option>
              <option value="afternoon">Tardes</option>
              <option value="night">Noches</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          <div>
            <label for="edit-wfh" class="block text-sm font-medium text-charcoal mb-1">¿Trabajas desde casa?</label>
            <select id="edit-wfh" v-model="form.works_from_home" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option value="">Selecciona</option>
              <option value="full">Sí, siempre</option>
              <option value="hybrid">Híbrido</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label for="edit-time" class="block text-sm font-medium text-charcoal mb-1">Tiempo en casa</label>
            <select id="edit-time" v-model="form.time_at_home" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option value="">Selecciona</option>
              <option value="low">Poco</option>
              <option value="medium">Medio</option>
              <option value="high">Mucho</option>
            </select>
          </div>
          <div>
            <label for="edit-cleanliness" class="block text-sm font-medium text-charcoal mb-1">Nivel de orden</label>
            <select id="edit-cleanliness" v-model="form.cleanliness_level" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option value="">Selecciona</option>
              <option value="minimal">Mínimo</option>
              <option value="normal">Normal</option>
              <option value="strict">Muy ordenado</option>
            </select>
          </div>
          <div>
            <label for="edit-noise" class="block text-sm font-medium text-charcoal mb-1">Nivel de ruido</label>
            <select id="edit-noise" v-model="form.noise_level" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option value="">Selecciona</option>
              <option value="quiet">Tranquilo</option>
              <option value="moderate">Moderado</option>
              <option value="lively">Animado</option>
            </select>
          </div>
          <div>
            <label for="edit-smoker" class="block text-sm font-medium text-charcoal mb-1">¿Fumas?</label>
            <select id="edit-smoker" v-model="form.is_smoker" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option value="">Selecciona</option>
              <option value="no">No</option>
              <option value="yes">Sí</option>
              <option value="sometimes">A veces</option>
            </select>
          </div>
          <div>
            <label for="edit-roommates" class="block text-sm font-medium text-charcoal mb-1">Número de compañeros preferido</label>
            <select id="edit-roommates" v-model.number="form.preferred_roommates_count" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option :value="null">Selecciona</option>
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3 o más</option>
            </select>
          </div>
          <div>
            <label for="edit-age-pref" class="block text-sm font-medium text-charcoal mb-1">Edad preferida de compañeros</label>
            <select id="edit-age-pref" v-model="form.preferred_age" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option value="">Selecciona</option>
              <option value="similar">Similar a la mía</option>
              <option value="any">Cualquiera</option>
            </select>
          </div>
          <div>
            <label for="edit-children-pref" class="block text-sm font-medium text-charcoal mb-1">Preferencia sobre hijos</label>
            <select id="edit-children-pref" v-model="form.children_preference" class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none">
              <option value="">Selecciona</option>
              <option value="with_children">Con hijos</option>
              <option value="without_children">Sin hijos</option>
              <option value="no_preference">Sin preferencia</option>
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
import { reactive, watch } from 'vue'

const props = defineProps({
  profile: { type: Object, default: null },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  work_schedule: props.profile?.work_schedule ?? '',
  works_from_home: props.profile?.works_from_home ?? '',
  time_at_home: props.profile?.time_at_home ?? '',
  cleanliness_level: props.profile?.cleanliness_level ?? '',
  noise_level: props.profile?.noise_level ?? '',
  is_smoker: props.profile?.is_smoker ?? '',
  preferred_roommates_count: props.profile?.preferred_roommates_count ?? null,
  preferred_age: props.profile?.preferred_age ?? '',
  children_preference: props.profile?.children_preference ?? '',
})

watch(
  () => props.profile,
  (p) => {
    if (!p) return
    form.work_schedule = p.work_schedule ?? ''
    form.works_from_home = p.works_from_home ?? ''
    form.time_at_home = p.time_at_home ?? ''
    form.cleanliness_level = p.cleanliness_level ?? ''
    form.noise_level = p.noise_level ?? ''
    form.is_smoker = p.is_smoker ?? ''
    form.preferred_roommates_count = p.preferred_roommates_count ?? null
    form.preferred_age = p.preferred_age ?? ''
    form.children_preference = p.children_preference ?? ''
  },
  { immediate: true }
)

function handleSubmit() {
  emit('save', { ...form })
}
</script>
