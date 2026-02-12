import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/services/supabase'

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchMatches(userId) {
    if (!userId) return
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('matches')
        .select('*')
        .or(`user_a.eq.${userId},user_b.eq.${userId}`)
      if (err) throw err
      matches.value = data || []
      return matches.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    matches,
    loading,
    error,
    fetchMatches,
  }
})
