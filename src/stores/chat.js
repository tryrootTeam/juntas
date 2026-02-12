import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/services/supabase'

const PAGE_SIZE = 50

export const useChatStore = defineStore('chat', () => {
  const conversations = ref([])
  const messages = ref([])
  const activeConversationId = ref(null)
  const activeConversation = ref(null)
  const loadingConversations = ref(false)
  const loadingMessages = ref(false)
  const channel = ref(null)
  const messagesPage = ref(0)
  const lastMessageByConversationId = ref({})

  async function fetchConversations() {
    loadingConversations.value = true
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          user_a_profile:profiles!user_a(id, display_name, photo_url, birthdate),
          user_b_profile:profiles!user_b(id, display_name, photo_url, birthdate)
        `)
        .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
        .order('updated_at', { ascending: false })

      if (error) throw error
      conversations.value = data || []

      if (conversations.value.length > 0) {
        const ids = conversations.value.map((c) => c.id)
        const { data: lastMessages } = await supabase
          .from('messages')
          .select('conversation_id, content, created_at, read_at')
          .in('conversation_id', ids)
          .order('created_at', { ascending: false })

        const byConv = {}
        for (const row of lastMessages || []) {
          if (!byConv[row.conversation_id]) byConv[row.conversation_id] = [row]
        }
        lastMessageByConversationId.value = Object.fromEntries(
          Object.entries(byConv).map(([k, v]) => [k, v[0]])
        )
      } else {
        lastMessageByConversationId.value = {}
      }
    } finally {
      loadingConversations.value = false
    }
  }

  function getLastMessage(conversationId) {
    return lastMessageByConversationId.value[conversationId] ?? null
  }

  async function selectConversation(conversationId) {
    if (!conversationId) return
    activeConversationId.value = conversationId
    activeConversation.value = conversations.value.find((c) => c.id === conversationId) ?? null
    messagesPage.value = 0
    await fetchMessages(conversationId, 0)
    subscribeToMessages(conversationId)
  }

  async function fetchMessages(conversationId, page = 0) {
    if (!conversationId) return
    loadingMessages.value = true
    try {
      const from = page * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!sender_id(id, display_name, photo_url)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error
      const list = (data || []).reverse()

      if (page === 0) {
        messages.value = list
      } else {
        messages.value = [...list, ...messages.value]
      }
    } finally {
      loadingMessages.value = false
    }
  }

  function subscribeToMessages(conversationId) {
    if (channel.value) {
      supabase.removeChannel(channel.value)
      channel.value = null
    }

    channel.value = supabase
      .channel(`conversation:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new
          if (newMsg.conversation_id !== activeConversationId.value) return
          const conv = activeConversation.value
          const senderProfile =
            conv?.user_a_profile?.id === newMsg.sender_id
              ? conv.user_a_profile
              : conv?.user_b_profile
          messages.value.push({
            ...newMsg,
            sender: senderProfile || { id: newMsg.sender_id, display_name: 'Usuario' },
          })
          setTimeout(() => {
            const el = document.querySelector('.messages-area')
            if (el) el.scrollTop = el.scrollHeight
          }, 100)
        }
      )
      .subscribe()
  }

  async function sendMessage(content) {
    if (!activeConversationId.value) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('messages').insert({
      conversation_id: activeConversationId.value,
      sender_id: user.id,
      content: content.trim(),
    })

    if (error) throw error
    // updated_at de la conversación lo actualiza el trigger en backend
  }

  async function loadMoreMessages() {
    if (!activeConversationId.value) return
    messagesPage.value += 1
    await fetchMessages(activeConversationId.value, messagesPage.value)
  }

  function cleanup() {
    if (channel.value) {
      supabase.removeChannel(channel.value)
      channel.value = null
    }
    activeConversationId.value = null
    activeConversation.value = null
    messages.value = []
  }

  return {
    conversations,
    messages: computed(() => messages.value),
    activeConversationId: computed(() => activeConversationId.value),
    activeConversation: computed(() => activeConversation.value),
    loadingConversations,
    loadingMessages,
    getLastMessage,
    fetchConversations,
    selectConversation,
    fetchMessages,
    sendMessage,
    loadMoreMessages,
    cleanup,
  }
})
