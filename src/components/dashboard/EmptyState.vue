<template>
  <div class="text-center py-12 px-4">
    <div class="w-16 h-16 rounded-full bg-cream-300 flex items-center justify-center mx-auto mb-4 text-deepblue-300 text-3xl" aria-hidden="true">
      {{ icon }}
    </div>
    <h3 class="text-lg font-semibold text-deepblue mb-1">{{ title }}</h3>
    <p class="text-deepblue-300 mb-6 max-w-sm mx-auto">{{ message }}</p>
    <button
      v-if="hasActiveFilter"
      type="button"
      class="px-5 py-2.5 rounded-lg font-medium bg-sage text-white hover:bg-sage-600 transition"
      @click="$emit('reset-filter')"
    >
      Ver todos los matches
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  filter: {
    type: String,
    default: 'all',
  },
})

defineEmits(['reset-filter'])

const hasActiveFilter = computed(() => props.filter && props.filter !== 'all')

const config = {
  all: {
    icon: '👋',
    title: 'Aún no hay matches',
    message: 'Completa tu perfil y la verificación para que podamos mostrarte compatibles.',
  },
  with_children: {
    icon: '👶',
    title: 'Ningún match con hijos',
    message: 'No hay perfiles con hijos que coincidan con tus filtros.',
  },
  without_children: {
    icon: '🏠',
    title: 'Ningún match sin hijos',
    message: 'No hay perfiles sin hijos que coincidan con tus filtros.',
  },
  high_compat: {
    icon: '✨',
    title: 'Ningún match con alta compatibilidad',
    message: 'No hay perfiles con 80% o más de compatibilidad.',
  },
}

const icon = computed(() => (config[props.filter] || config.all).icon)
const title = computed(() => (config[props.filter] || config.all).title)
const message = computed(() => (config[props.filter] || config.all).message)
</script>
