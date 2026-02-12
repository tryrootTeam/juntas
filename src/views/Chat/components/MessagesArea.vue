<template>
  <div
    ref="scrollRef"
    class="messages-area flex flex-col gap-3 overflow-y-auto flex-1 p-4 bg-cream-100 min-h-0"
    @scroll="onScroll"
  >
    <div v-if="loading" class="flex justify-center py-4">
      <p class="text-sm text-warm-grey">Cargando mensajes...</p>
    </div>
    <template v-else>
      <button
        v-if="hasMore"
        type="button"
        class="self-center text-sm text-sage-green hover:underline py-1"
        @click="$emit('load-more')"
      >
        Cargar más
      </button>
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="[
          'flex',
          msg.sender_id === currentUserId ? 'justify-end' : 'justify-start',
        ]"
      >
        <div
          :class="[
            'max-w-[80%] rounded-2xl px-4 py-2 break-words',
            msg.sender_id === currentUserId
              ? 'bg-soft-terracota text-off-white rounded-br-md'
              : 'bg-warm-sand/50 border border-warm-sand text-charcoal rounded-bl-md',
          ]"
        >
          <p v-if="msg.sender_id !== currentUserId" class="text-xs font-medium text-warm-grey mb-0.5">
            {{ msg.sender?.display_name || 'Usuario' }}
          </p>
          <p class="text-sm">{{ msg.content }}</p>
          <p
            :class="[
              'text-xs mt-1',
              msg.sender_id === currentUserId ? 'text-off-white/80' : 'text-warm-grey',
            ]"
          >
            {{ formatTime(msg.created_at) }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  currentUserId: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasMore: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['load-more'])

const scrollRef = ref(null)

function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const sameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  if (sameDay) {
    return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function onScroll() {
  // Podría usar para cargar más al hacer scroll arriba
}
</script>
