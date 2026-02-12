/**
 * Mapping des erreurs Supabase Auth vers codes/messages utilisateur (PRD).
 * INVALID_CREDENTIALS, EMAIL_EXISTS, RATE_LIMIT, WEAK_PASSWORD, etc.
 */

/** @type {Record<string, string>} */
const CODE_BY_MESSAGE = {
  'Invalid login credentials': 'INVALID_CREDENTIALS',
  'Email not confirmed': 'EMAIL_NOT_CONFIRMED',
  'User already registered': 'EMAIL_EXISTS',
  'Signup requires a valid password': 'WEAK_PASSWORD',
  'Password should be at least 6 characters': 'WEAK_PASSWORD',
  'Unable to validate email address: invalid format': 'EMAIL_INVALID',
  'Forbidden': 'RATE_LIMIT',
  'Email rate limit exceeded': 'RATE_LIMIT',
  'Signup rate limit exceeded': 'RATE_LIMIT',
  'SMS rate limit exceeded': 'RATE_LIMIT',
  'Token has expired or is invalid': 'TOKEN_EXPIRED',
  'New password should be different from the old password': 'PASSWORD_SAME_AS_OLD',
}

/** @type {Record<string, string>} */
const CODE_BY_STATUS = {
  400: 'INVALID_CREDENTIALS',
  422: 'VALIDATION_ERROR',
  429: 'RATE_LIMIT',
}

/**
 * @param {import('@supabase/supabase-js').AuthError} error
 * @returns {{ code: string, message: string }}
 */
export function mapAuthError(error) {
  if (!error) return { code: 'UNKNOWN', message: 'Une erreur est survenue.' }

  const msg = (error.message || '').toLowerCase()
  const codeFromMsg = Object.entries(CODE_BY_MESSAGE).find(
    ([key]) => key.toLowerCase() === (error.message || '').toLowerCase()
  )?.[1]
  if (codeFromMsg) {
    return { code: codeFromMsg, message: userMessage(codeFromMsg) }
  }

  // Fallback par contenu du message
  if (msg.includes('already registered') || msg.includes('already exists')) {
    return { code: 'EMAIL_EXISTS', message: userMessage('EMAIL_EXISTS') }
  }
  if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
    return { code: 'INVALID_CREDENTIALS', message: userMessage('INVALID_CREDENTIALS') }
  }
  if (msg.includes('password') && (msg.includes('least') || msg.includes('weak'))) {
    return { code: 'WEAK_PASSWORD', message: userMessage('WEAK_PASSWORD') }
  }
  if (msg.includes('rate limit') || msg.includes('too many')) {
    return { code: 'RATE_LIMIT', message: userMessage('RATE_LIMIT') }
  }

  const codeByStatus = CODE_BY_STATUS[error.status]
  if (codeByStatus) {
    return { code: codeByStatus, message: userMessage(codeByStatus) }
  }

  return { code: 'UNKNOWN', message: error.message || 'Une erreur est survenue.' }
}

/**
 * Messages utilisateur en français
 * @param {string} code
 * @returns {string}
 */
function userMessage(code) {
  const messages = {
    INVALID_CREDENTIALS: 'Email ou mot de passe incorrect.',
    EMAIL_EXISTS: 'Un compte existe déjà avec cette adresse email.',
    EMAIL_NOT_CONFIRMED: 'Veuillez confirmer votre email avant de vous connecter.',
    WEAK_PASSWORD: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.',
    EMAIL_INVALID: 'Adresse email invalide.',
    RATE_LIMIT: 'Trop de tentatives. Réessayez dans quelques minutes.',
    TOKEN_EXPIRED: 'Lien expiré. Demandez un nouveau lien.',
    VALIDATION_ERROR: 'Vérifiez les champs du formulaire.',
    UNKNOWN: 'Une erreur est survenue. Réessayez plus tard.',
  }
  return messages[code] || messages.UNKNOWN
}
