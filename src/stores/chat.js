import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/services/supabase'

export const useChatStore = defineStore('chat', () => {
  const conversations = ref([])
  const activeConversation = ref(null)
  const messages = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchConversations(userId) {
    if (!userId) return
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('conversations')
        .select('*')
        .or(`user_a.eq.${userId},user_b.eq.${userId}`)
      if (err) throw err
      conversations.value = data || []
      return conversations.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function fetchMessages(conversationId) {
    if (!conversationId) return
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
      if (err) throw err
      messages.value = data || []
      return messages.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  function setActiveConversation(conv) {
    activeConversation.value = conv
  }

  return {
    conversations,
    activeConversation,
    messages,
    loading,
    error,
    fetchConversations,
    fetchMessages,
    setActiveConversation,
  }
})
