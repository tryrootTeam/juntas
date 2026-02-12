import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/services/supabase'
import { calculateCompatibility, calculateDetailedCompatibility } from '@/lib/matchingAlgorithm'

/**
 * Enriched match item: profile + compatibility_score, compatibility_breakdown, matchId, status.
 */
function enrichCandidate(profile, currentUserProfile, existingMatch) {
  const score = currentUserProfile
    ? calculateCompatibility(currentUserProfile, profile)
    : 0
  const breakdown = currentUserProfile
    ? calculateDetailedCompatibility(currentUserProfile, profile)
    : {}
  return {
    ...profile,
    compatibility_score: score,
    compatibility_breakdown: breakdown,
    matchId: existingMatch?.id ?? null,
    status: existingMatch?.status ?? 'pending',
  }
}

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref([])
  const loading = ref(false)
  const error = ref(null)
  const stats = ref(null)

  const statsFormatted = computed(() => ({
    totalMatches: stats.value?.total_matches ?? 0,
    activeConversations: stats.value?.active_conversations ?? 0,
    avgCompatibility: stats.value?.avg_compatibility ?? 0,
  }))

  async function fetchMatchCandidates(userId, userProfile) {
    if (!userId) return
    loading.value = true
    error.value = null
    try {
      const { data: profiles, error: rpcErr } = await supabase.rpc('get_user_matches', {
        user_id_param: userId,
      })
      if (rpcErr) throw rpcErr

      const { data: existingRows } = await supabase
        .from('matches')
        .select('id, user_a, user_b, status')
        .or(`user_a.eq.${userId},user_b.eq.${userId}`)

      const byOther = new Map()
      for (const row of existingRows || []) {
        const other = row.user_a === userId ? row.user_b : row.user_a
        byOther.set(other, { id: row.id, status: row.status })
      }

      const enriched = (profiles || []).map((p) =>
        enrichCandidate(p, userProfile || null, byOther.get(p.id))
      )
      matches.value = enriched

      await fetchUserStats(userId)
      return matches.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function fetchUserStats(userId) {
    if (!userId) return
    try {
      const { data, error: rpcErr } = await supabase.rpc('get_user_stats', {
        user_id_param: userId,
      })
      if (rpcErr) throw rpcErr
      stats.value = data ?? null
      return data
    } catch (e) {
      stats.value = null
      return null
    }
  }

  async function updateMatchStatus(userId, matchedUserId, newStatus, fallbackMatch = null) {
    const [userA, userB] = [userId, matchedUserId].sort()
    const { data: existing } = await supabase
      .from('matches')
      .select('id')
      .eq('user_a', userA)
      .eq('user_b', userB)
      .maybeSingle()

    if (existing?.id) {
      const { error: updErr } = await supabase
        .from('matches')
        .update({ status: newStatus })
        .eq('id', existing.id)
      if (updErr) throw updErr
      const m = matches.value.find((x) => x.id === matchedUserId)
      if (m) m.status = newStatus
      await fetchUserStats(userId)
      return existing.id
    }

    if (newStatus === 'passed' && fallbackMatch) {
      await upsertMatch(
        userId,
        matchedUserId,
        fallbackMatch.compatibility_score ?? 0,
        fallbackMatch.compatibility_breakdown ?? {},
        'passed'
      )
      const m = matches.value.find((x) => x.id === matchedUserId)
      if (m) m.status = 'passed'
      return null
    }
    return null
  }

  async function upsertMatch(userId, matchedUserId, compatibilityScore, compatibilityBreakdown, status = 'pending') {
    const [userA, userB] = [userId, matchedUserId].sort()
    const payload = {
      user_a: userA,
      user_b: userB,
      compatibility_score: compatibilityScore,
      compatibility_breakdown: compatibilityBreakdown ?? {},
      status,
    }
    const { data, error: upsertErr } = await supabase
      .from('matches')
      .upsert(payload, { onConflict: 'user_a,user_b' })
      .select()
      .single()
    if (upsertErr) throw upsertErr
    await fetchUserStats(userId)
    return data
  }

  function setMatches(list) {
    matches.value = list || []
  }

  return {
    matches,
    loading,
    error,
    stats,
    statsFormatted,
    fetchMatchCandidates: fetchMatchCandidates,
    fetchMatches: fetchMatchCandidates,
    fetchUserStats,
    updateMatchStatus,
    upsertMatch,
    setMatches,
  }
})
