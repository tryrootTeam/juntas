/**
 * Retourne l’URL absolue de la page de callback OAuth (auth/callback).
 * Doit toujours commencer par https:// (ou http:// en local) pour que Supabase
 * redirige vers ton site et non vers son domaine (évite "requested path is invalid").
 * @returns {string} ex. https://juntasbyroot.netlify.app/auth/callback
 */
export function getAuthCallbackUrl() {
  const origin = typeof window !== 'undefined' && window.location?.origin
  if (!origin || (!origin.startsWith('http://') && !origin.startsWith('https://'))) {
    throw new Error('Impossible de déterminer l’origine de l’application (callback OAuth).')
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  return `${origin}${base}/auth/callback`
}

/**
 * Retourne l’URL absolue pour la page reset-password (mot de passe oublié).
 * @returns {string}
 */
export function getResetPasswordCallbackUrl() {
  const origin = typeof window !== 'undefined' && window.location?.origin
  if (!origin || (!origin.startsWith('http://') && !origin.startsWith('https://'))) {
    throw new Error('Impossible de déterminer l’origine de l’application (reset password).')
  }
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
  return `${origin}${base}/reset-password`
}
