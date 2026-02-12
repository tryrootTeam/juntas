/**
 * Validations PRD Login/Registro
 * - Email: requis, format valide, max 255 caractères
 * - Password: min 8, 1 majuscule, 1 minuscule, 1 chiffre, max 72
 * - Phone: format espagnol +34[67]XXXXXXXX (9 chiffres)
 * - Name: min 2, max 100, lettres/espaces/tirets/apostrophes
 */

const EMAIL_MAX = 255
const PASSWORD_MIN = 8
const PASSWORD_MAX = 72
const NAME_MIN = 2
const NAME_MAX = 100
const PHONE_SPAIN_REGEX = /^\+34[67]\d{8}$/
const NAME_REGEX = /^[\p{L}\s\-']+$/u

/**
 * @param {string} email
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'EMAIL_REQUIRED' }
  }
  const trimmed = email.trim()
  if (trimmed.length === 0) return { valid: false, error: 'EMAIL_REQUIRED' }
  if (trimmed.length > EMAIL_MAX) return { valid: false, error: 'EMAIL_TOO_LONG' }
  // RFC 5322 simplifié (courant pour formulaire)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) return { valid: false, error: 'EMAIL_INVALID' }
  return { valid: true }
}

/**
 * @param {string} password
 * @returns {{ valid: boolean, error?: string }}
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'PASSWORD_REQUIRED' }
  }
  if (password.length < PASSWORD_MIN) {
    return { valid: false, error: 'WEAK_PASSWORD' }
  }
  if (password.length > PASSWORD_MAX) {
    return { valid: false, error: 'PASSWORD_TOO_LONG' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'WEAK_PASSWORD' }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'WEAK_PASSWORD' }
  }
  if (!/\d/.test(password)) {
    return { valid: false, error: 'WEAK_PASSWORD' }
  }
  return { valid: true }
}

/**
 * @param {string} phone
 * @returns {{ valid: boolean, error?: string }}
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'PHONE_REQUIRED' }
  }
  const normalized = phone.replace(/\s/g, '')
  if (!PHONE_SPAIN_REGEX.test(normalized)) {
    return { valid: false, error: 'PHONE_INVALID' }
  }
  return { valid: true }
}

/**
 * @param {string} name
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'NAME_REQUIRED' }
  }
  const trimmed = name.trim()
  if (trimmed.length < NAME_MIN) {
    return { valid: false, error: 'NAME_TOO_SHORT' }
  }
  if (trimmed.length > NAME_MAX) {
    return { valid: false, error: 'NAME_TOO_LONG' }
  }
  if (!NAME_REGEX.test(trimmed)) {
    return { valid: false, error: 'NAME_INVALID' }
  }
  return { valid: true }
}

/**
 * Vérifie que les checkboxes obligatoires sont cochées (genre, CGU, confidentialité)
 * @param {{ gender?: boolean, terms?: boolean, privacy?: boolean }} checkboxes
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateCheckboxes(checkboxes) {
  if (!checkboxes) return { valid: false, error: 'CHECKBOXES_REQUIRED' }
  if (!checkboxes.terms) return { valid: false, error: 'TERMS_REQUIRED' }
  if (!checkboxes.privacy) return { valid: false, error: 'PRIVACY_REQUIRED' }
  return { valid: true }
}

/**
 * Indicateur de force du mot de passe (weak / medium / strong)
 * @param {string} password
 * @returns {'weak'|'medium'|'strong'}
 */
export function getPasswordStrength(password) {
  if (!password || typeof password !== 'string' || password.length === 0) {
    return 'weak'
  }
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 2) return 'weak'
  if (score <= 4) return 'medium'
  return 'strong'
}
