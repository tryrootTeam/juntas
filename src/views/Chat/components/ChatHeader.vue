<template>
  <header class="chat-header flex items-center gap-3 px-4 py-3 border-b border-cream-400 bg-white shrink-0">
    <button
      v-if="showBack"
      type="button"
      class="md:hidden p-2 -ml-2 rounded-lg text-deepblue hover:bg-cream-200 transition"
      aria-label="Volver a conversaciones"
      @click="$emit('back')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <div
      class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0 bg-gradient-to-br from-sage to-deepblue"
    >
      {{ initial }}
    </div>
    <div class="min-w-0 flex-1">
      <h2 class="font-semibold text-deepblue truncate">
        {{ user?.display_name || 'Usuario' }}
      </h2>
      <p v-if="user?.birthdate" class="text-xs text-deepblue-300 truncate">
        {{ ageLabel }}
      </p>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
  showBack: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['back'])

const initial = computed(() => {
  const n = props.user?.display_name || '?'
  return n[0].toUpperCase()
})

const ageLabel = computed(() => {
  const b = props.user?.birthdate
  if (!b) return ''
  const birth = new Date(b)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age >= 0 ? `${age} años` : ''
})
</script>
