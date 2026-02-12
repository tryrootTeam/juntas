<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="card-feature p-5 flex items-center gap-4">
      <div class="flex-shrink-0 w-12 h-12 rounded-full bg-sage-green/15 flex items-center justify-center text-sage-green">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-medium text-warm-grey font-body">Matches totales</p>
        <p class="font-display text-2xl font-bold text-charcoal">{{ stats.totalMatches ?? 0 }}</p>
      </div>
    </div>

    <div class="card-feature p-5 flex items-center gap-4">
      <div class="flex-shrink-0 w-12 h-12 rounded-full bg-soft-terracota/20 flex items-center justify-center text-soft-terracota">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-medium text-warm-grey">Conversaciones activas</p>
        <p class="font-display text-2xl font-bold text-charcoal">{{ stats.activeConversations ?? 0 }}</p>
      </div>
    </div>

    <div class="card-feature p-5 flex items-center gap-4">
      <div class="flex-shrink-0 w-12 h-12 rounded-full bg-deep-plum/10 flex items-center justify-center text-deep-plum">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-medium text-warm-grey font-body">Compatibilidad media</p>
        <p class="font-display text-2xl font-bold text-charcoal">{{ formattedAvg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  stats: {
    type: Object,
    default: () => ({}),
  },
})

const formattedAvg = computed(() => {
  const v = props.stats.avgCompatibility ?? props.stats.avg_compatibility
  if (v == null) return '—'
  const n = Number(v)
  return Number.isFinite(n) ? `${Math.round(n)}%` : '—'
})
</script>
