<template>
  <section
    class="card-feature rounded-2xl p-6 md:p-8"
    aria-labelledby="compatibility-heading"
  >
    <h2 id="compatibility-heading" class="font-display text-xl font-bold text-charcoal mb-4">
      Compatibilidad
    </h2>
    <div class="flex items-center gap-4 mb-6">
      <div
        class="w-20 h-20 rounded-full flex items-center justify-center font-display text-2xl font-bold text-off-white flex-shrink-0"
        :class="scoreClass"
      >
        {{ score }}%
      </div>
      <p class="text-warm-grey">
        Puntuación global de compatibilidad con tu perfil.
      </p>
    </div>
    <div v-if="breakdown && Object.keys(breakdown).length" class="space-y-3">
      <div
        v-for="(value, key) in breakdownLabels"
        :key="key"
        class="flex items-center justify-between gap-4"
      >
        <span class="text-charcoal font-medium">{{ value }}</span>
        <div class="flex-1 max-w-[200px] h-2 bg-warm-sand rounded-full overflow-hidden">
          <div
            class="h-full rounded-full bg-sage-green transition-all duration-300"
            :style="{ width: `${Math.min(100, breakdown[key] ?? 0)}%` }"
          />
        </div>
        <span class="text-sm font-semibold text-charcoal w-10 text-right">{{ breakdown[key] ?? 0 }}%</span>
      </div>
    </div>
    <p v-else class="text-warm-grey text-sm">
      No hay desglose detallado disponible.
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: { type: Number, default: 0 },
  breakdown: { type: Object, default: () => ({}) },
})

const scoreClass = computed(() => {
  const s = props.score
  if (s >= 80) return 'bg-sage-green'
  if (s >= 60) return 'bg-sage-400'
  return 'bg-warm-grey'
})

const breakdownLabels = computed(() => {
  const labels = {
    family: 'Familia',
    schedule: 'Horarios',
    lifestyle: 'Estilo de vida',
    budget_location: 'Presupuesto y zona',
    preferences: 'Preferencias',
  }
  const b = props.breakdown || {}
  return Object.keys(labels).filter((k) => b[k] != null).reduce((acc, k) => {
    acc[k] = labels[k]
    return acc
  }, {})
})
</script>
