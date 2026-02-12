<template>
  <aside class="conversations-list flex flex-col border-r border-cream-400 bg-white w-80 shrink-0 overflow-hidden">
    <div class="p-3 border-b border-cream-400">
      <h2 class="text-lg font-semibold text-deepblue">Conversaciones</h2>
    </div>
    <div v-if="loading" class="flex justify-center py-8">
      <p class="text-sm text-deepblue-300">Cargando...</p>
    </div>
    <ul v-else class="flex-1 overflow-y-auto">
      <li
        v-for="conv in conversations"
        :key="conv.id"
        :class="[
          'flex items-center gap-3 px-3 py-3 cursor-pointer border-b border-cream-200 transition',
          conv.id === activeId
            ? 'bg-sage/10 border-l-4 border-l-sage'
            : 'hover:bg-cream-100',
        ]"
        @click="$emit('select', conv.id)"
      >
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 bg-gradient-to-br from-sage to-deepblue"
        >
          {{ otherUserInitial(conv) }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-medium text-deepblue truncate">
            {{ otherUserName(conv) }}
          </p>
          <p v-if="lastMessage(conv.id)" class="text-sm text-deepblue-300 truncate">
            {{ lastMessage(conv.id).content }}
          </p>
        </div>
      </li>
    </ul>
    <p v-if="!loading && conversations.length === 0" class="p-4 text-sm text-deepblue-300 text-center">
      No hay conversaciones. Empareja con alguien en el dashboard para empezar.
    </p>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  conversations: {
    type: Array,
    default: () => [],
  },
  activeId: {
    type: String,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  getLastMessage: {
    type: Function,
    default: () => null,
  },
})

defineEmits(['select'])

const authStore = useAuthStore()
const currentUserId = authStore.user?.id

function otherUser(conv) {
  if (!conv || !currentUserId) return null
  return conv.user_a === currentUserId ? conv.user_b_profile : conv.user_a_profile
}

function otherUserName(conv) {
  const u = otherUser(conv)
  return u?.display_name || 'Usuario'
}

function otherUserInitial(conv) {
  const n = otherUserName(conv)
  return n[0]?.toUpperCase() || '?'
}

function lastMessage(conversationId) {
  return props.getLastMessage(conversationId) ?? null
}
</script>
