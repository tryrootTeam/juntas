<template>
  <article class="bg-white rounded-xl border border-cream-400 shadow-sm overflow-hidden flex flex-col">
    <div class="p-4 flex items-start gap-4">
      <div
        class="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
        :class="avatarClass"
      >
        {{ initial }}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-deepblue truncate">
          {{ match.name || 'Sin nombre' }}{{ match.age != null ? `, ${match.age}` : '' }}
        </h3>
        <p v-if="match.occupation" class="text-sm text-deepblue-300 truncate">{{ match.occupation }}</p>
        <p v-if="zone" class="text-sm text-deepblue-300 truncate">{{ zone }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="scoreBadgeClass"
          >
            {{ match.compatibility_score ?? 0 }}% compatibilidad
          </span>
        </div>
        <div v-if="tags.length" class="flex flex-wrap gap-1.5 mt-2">
          <span
            v-for="tag in tags"
            :key="tag"
            class="px-2 py-0.5 rounded-md text-xs bg-cream-200 text-deepblue-300"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div class="mt-auto p-4 pt-0 flex gap-2">
      <button
        type="button"
        class="flex-1 px-4 py-2 rounded-lg font-medium text-sm bg-sage text-white hover:bg-sage-600 transition"
        @click="$emit('view')"
      >
        Ver perfil
      </button>
      <button
        type="button"
        class="px-4 py-2 rounded-lg font-medium text-sm border border-deepblue-200 text-deepblue-300 hover:bg-cream-200 transition"
        @click="$emit('pass')"
      >
        Pasar
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
})

defineEmits(['view', 'pass'])

const workScheduleLabels = {
  morning: 'Mañanas',
  afternoon: 'Tardes',
  evening: 'Tardes',
  night: 'Noches',
  flexible: 'Flexible',
}

const cleanlinessLabels = {
  strict: 'Orden estricta',
  normal: 'Normal',
  flexible: 'Flexible',
  very_organized: 'Muy ordenada',
  relaxed: 'Relajada',
}

const initial = computed(() => {
  const n = props.match.name || props.match.display_name || '?'
  return n[0].toUpperCase()
})

const zone = computed(() => {
  const z = props.match.preferred_zones
  if (!Array.isArray(z) || z.length === 0) return ''
  return z.slice(0, 2).join(', ')
})

const tags = computed(() => {
  const t = []
  if (props.match.has_children) {
    const ages = props.match.children_ages
    t.push(Array.isArray(ages) && ages.length ? `Hijos (${ages.join(', ')} años)` : 'Con hijos')
  }
  if (props.match.work_schedule) {
    t.push(workScheduleLabels[props.match.work_schedule] ?? props.match.work_schedule)
  }
  if (props.match.cleanliness_level) {
    t.push(cleanlinessLabels[props.match.cleanliness_level] ?? props.match.cleanliness_level)
  }
  return t
})

const avatarClass = computed(() => 'bg-gradient-to-br from-sage to-deepblue')

const scoreBadgeClass = computed(() => {
  const s = props.match.compatibility_score ?? 0
  if (s >= 80) return 'bg-sage/20 text-sage-700'
  if (s >= 60) return 'bg-deepblue/10 text-deepblue'
  return 'bg-cream-300 text-deepblue-300'
})
</script>
