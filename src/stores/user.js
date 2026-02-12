import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/services/supabase'
import { getMyProfile, updateMyProfile as updateMyProfileRpc } from '@/services/profile'

export const useUserStore = defineStore('user', () => {
  const profile = ref(null)
  const loading = ref(false)
  const error = ref(null)

  /** Récupère un profil par id (lecture directe table). */
  async function fetchProfile(userId) {
    if (!userId) return
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (err) throw err
      profile.value = data
      return data
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  /** Récupère le profil de l'utilisateur connecté (Mi Perfil - RPC get_my_profile). */
  async function fetchMyProfile() {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await getMyProfile()
      if (err) throw err
      profile.value = data
      return data
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  /** Met à jour le profil de l'utilisateur connecté (validation serveur : age 18-99, monthly_budget >= 0). */
  async function updateProfile(data) {
    error.value = null
    const { data: updated, error: err } = await updateMyProfileRpc(data)
    if (err) {
      error.value = err.message
      throw err
    }
    if (updated) profile.value = updated
    return updated
  }

  function clearProfile() {
    profile.value = null
  }

  return {
    profile,
    loading,
    error,
    fetchProfile,
    fetchMyProfile,
    updateProfile,
    clearProfile,
  }
})
