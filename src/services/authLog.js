import { supabase } from '@/services/supabase'

/**
 * Enregistre un événement auth pour le monitoring (PRD).
 * Ne bloque pas l'UI : fire-and-forget, erreurs loguées en console.
 *
 * @param {string} eventType - 'signup' | 'login' | 'logout' | 'failed_login' | 'oauth_error'
 * @param {{ userId?: string, email?: string, metadata?: Record<string, unknown> }} payload
 */
export async function logAuthEvent(eventType, payload = {}) {
  const { userId = null, email = null, metadata = {} } = payload
  try {
    await supabase.from('auth_events').insert({
      event_type: eventType,
      user_id: userId || null,
      email: email || null,
      metadata: typeof metadata === 'object' ? metadata : { raw: metadata },
    })
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn('[authLog]', eventType, e)
    }
  }
}
