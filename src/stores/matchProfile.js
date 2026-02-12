import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/services/supabase'

export const useMatchProfileStore = defineStore('matchProfile', () => {
  const profile = ref(null)
  const compatibility = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const compatibilityReasons = computed(() => {
    if (!profile.value || !compatibility.value?.breakdown) return []
    const reasons = []
    const b = compatibility.value.breakdown
    if (b.family >= 80) reasons.push('Situación familiar compatible')
    if (b.schedule >= 80) reasons.push('Horarios complementarios')
    if (b.lifestyle >= 80) reasons.push('Estilo de vida similar')
    if (b.budget_location >= 80) reasons.push('Presupuesto y zona afines')
    if (b.preferences >= 80) reasons.push('Preferencias alineadas')
    return reasons
  })

  async function fetchProfile(matchId) {
    if (!matchId) return
    loading.value = true
    error.value = null
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No autenticada')

      const { data, error: rpcError } = await supabase.rpc('get_match_profile', {
        user_id_param: user.id,
        match_id_param: matchId,
      })

      if (rpcError) throw rpcError

      profile.value = data?.profile ?? null
      const comp = data?.compatibility
      if (comp) {
        compatibility.value = {
          score: comp.compatibility_score ?? 0,
          breakdown: comp.compatibility_breakdown ?? {},
          matchId: comp.id,
        }
      } else {
        compatibility.value = null
      }

      // Marcar match como "visto"
      if (comp) {
        await supabase
          .from('matches')
          .update({ status: 'viewed' })
          .or(`and(user_a.eq.${user.id},user_b.eq.${matchId}),and(user_a.eq.${matchId},user_b.eq.${user.id})`)
          .select()
      }
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function startConversation(matchId) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No autenticada')

    const [userA, userB] = [user.id, matchId].sort()
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .eq('user_a', userA)
      .eq('user_b', userB)
      .maybeSingle()

    if (existing) return existing.id

    const { data: conv, error: insertError } = await supabase
      .from('conversations')
      .insert({ user_a: userA, user_b: userB })
      .select()
      .single()

    if (insertError) throw insertError
    return conv.id
  }

  async function passMatch(matchId) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [userA, userB] = [user.id, matchId].sort()
    await supabase
      .from('matches')
      .update({ status: 'passed' })
      .eq('user_a', userA)
      .eq('user_b', userB)
      .select()
  }

  function clearProfile() {
    profile.value = null
    compatibility.value = null
    error.value = null
  }

  return {
    profile,
    compatibility,
    loading,
    error,
    compatibilityReasons,
    fetchProfile,
    startConversation,
    passMatch,
    clearProfile,
  }
})
