import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/services/supabase'
import { mapAuthError } from '@/lib/authErrors'
import { logAuthEvent } from '@/services/authLog'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const initialized = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)

  async function initialize() {
    const { data: { session: currentSession } } = await supabase.auth.getSession()
    session.value = currentSession
    user.value = currentSession?.user ?? null

    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession
      user.value = newSession?.user ?? null
    })

    initialized.value = true
  }

  async function signInWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      const mapped = mapAuthError(error)
      throw Object.assign(new Error(mapped.message), { code: mapped.code })
    }
    logAuthEvent('login', { userId: data.user?.id, email: data.user?.email })
    return data
  }

  async function signUpWithEmail(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    })
    if (error) {
      const mapped = mapAuthError(error)
      throw Object.assign(new Error(mapped.message), { code: mapped.code })
    }
    return data
  }

  async function signInWithGoogle(redirectTo) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: redirectTo ? { redirectTo } : undefined,
    })
    if (error) {
      const mapped = mapAuthError(error)
      throw Object.assign(new Error(mapped.message), { code: mapped.code })
    }
    return data
  }

  async function resetPasswordForEmail(email, redirectTo) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectTo || undefined,
    })
    if (error) {
      const mapped = mapAuthError(error)
      throw Object.assign(new Error(mapped.message), { code: mapped.code })
    }
    return data
  }

  async function updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      const mapped = mapAuthError(error)
      throw Object.assign(new Error(mapped.message), { code: mapped.code })
    }
    return data
  }

  async function signOut() {
    const uid = user.value?.id
    const email = user.value?.email
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    logAuthEvent('logout', { userId: uid, email })
  }

  return {
    user,
    session,
    initialized,
    isAuthenticated,
    currentUser,
    initialize,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    resetPasswordForEmail,
    updatePassword,
    signOut,
  }
})
