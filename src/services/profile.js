import { supabase } from '@/services/supabase'

/**
 * Service Mi Perfil - Backend PRD
 * GET /profiles/:userId → get_my_profile() ou .from('profiles').select().eq('id', userId)
 * PATCH /profiles/:userId → update_my_profile(data)
 * Changement de mot de passe → supabase.auth.updateUser({ password })
 * Suppression de compte → API Admin Supabase (Edge Function / backend)
 */

/**
 * Récupère le profil de l'utilisateur connecté (RPC get_my_profile).
 * @returns {Promise<import('@supabase/supabase-js').PostgrestSingleResponse<object>>}
 */
export async function getMyProfile() {
  return supabase.rpc('get_my_profile').maybeSingle()
}

/**
 * Met à jour le profil de l'utilisateur connecté avec validation côté serveur
 * (age 18-99, monthly_budget >= 0). RPC update_my_profile.
 * @param {Object} data - Champs à mettre à jour (display_name, bio, age, monthly_budget, etc.)
 * @returns {Promise<import('@supabase/supabase-js').PostgrestSingleResponse<object>>}
 */
export async function updateMyProfile(data) {
  return supabase.rpc('update_my_profile', { data })
}

/**
 * Change le mot de passe de l'utilisateur connecté (Supabase Auth).
 * @param {string} newPassword
 * @returns {Promise<import('@supabase/supabase-js').UserResponse>}
 */
export async function updatePassword(newPassword) {
  return supabase.auth.updateUser({ password: newPassword })
}
