<template>
  <div class="chat-page flex flex-col h-screen bg-cream pt-16">
    <AppHeader :is-public="false" />

    <div class="flex flex-1 overflow-hidden relative">
      <ConversationsList
        :conversations="conversations"
        :active-id="activeConversationId"
        :loading="loadingConversations"
        :get-last-message="chatStore.getLastMessage"
        :class="[
          'md:flex-none',
          activeConversationId ? 'hidden md:block' : 'flex-1 min-w-0',
        ]"
        @select="selectConversation"
      />

      <div
        v-if="activeConversation"
        class="flex-1 flex flex-col min-w-0 absolute inset-0 md:relative bg-cream z-10"
      >
        <ChatHeader :user="otherUser" :show-back="true" @back="goBack" />
        <MessagesArea
          :messages="messages"
          :current-user-id="currentUserId"
          :loading="loadingMessages"
          :has-more="messages.length >= 50"
          @load-more="loadMoreMessages"
        />
        <MessageInput
          :disabled="!canSendMessages"
          @send="sendMessage"
        />
      </div>

      <EmptyState v-else />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import ConversationsList from './components/ConversationsList.vue'
import ChatHeader from './components/ChatHeader.vue'
import MessagesArea from './components/MessagesArea.vue'
import MessageInput from './components/MessageInput.vue'
import EmptyState from './components/EmptyState.vue'
import { useChatStore } from '@/stores/chat'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const userStore = useUserStore()

const currentUserId = computed(() => userStore.profile?.id ?? '')
const conversations = computed(() => chatStore.conversations)
const messages = computed(() => chatStore.messages)
const activeConversation = computed(() => chatStore.activeConversation)
const activeConversationId = computed(() => chatStore.activeConversationId)
const canSendMessages = computed(() => userStore.profile?.can_send_messages ?? false)
const loadingConversations = computed(() => chatStore.loadingConversations)
const loadingMessages = computed(() => chatStore.loadingMessages)

const otherUser = computed(() => {
  const conv = activeConversation.value
  if (!conv || !currentUserId.value) return null
  return conv.user_a === currentUserId.value ? conv.user_b_profile : conv.user_a_profile
})

async function selectConversation(conversationId) {
  await chatStore.selectConversation(conversationId)
  router.replace({ name: 'chat-conversation', params: { conversationId } }).catch(() => {})
}

async function sendMessage(content) {
  if (!canSendMessages.value) {
    alert('Completa tu verificación para enviar mensajes.')
    return
  }
  try {
    await chatStore.sendMessage(content)
  } catch (e) {
    console.error(e)
    alert('No se pudo enviar el mensaje.')
  }
}

function loadMoreMessages() {
  chatStore.loadMoreMessages()
}

function goBack() {
  router.push({ name: 'chat' })
  chatStore.cleanup()
}

onMounted(async () => {
  await chatStore.fetchConversations()
  const conversationId = route.params.conversationId
  if (conversationId) {
    await selectConversation(conversationId)
  }
})

onUnmounted(() => {
  chatStore.cleanup()
})

watch(
  () => route.params.conversationId,
  (newId) => {
    if (newId) selectConversation(newId)
  }
)
</script>
