/**
 * Validations par étape - PRD Backend Onboarding
 * Step 1: age 18-99, occupation required, preferred_zones non-empty, monthly_budget 100-2000
 * Step 2: if has_children then children_ages and custody_type required
 * Step 6: file max 5MB, types JPG/PNG/PDF, name sanitization (côté client)
 */

const AGE_MIN = 18
const AGE_MAX = 99
const BUDGET_MIN = 100
const BUDGET_MAX = 2000
const FILE_MAX_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf']

/**
 * Step 1 - Sobre ti
 * @param {{ name?: string, age?: number, occupation?: string, preferred_zones?: string[], monthly_budget?: number }} data
 */
export function validateStep1(data) {
  if (!data) return { valid: false, error: 'VALIDATION_ERROR' }
  if (data.age != null && (data.age < AGE_MIN || data.age > AGE_MAX)) {
    return { valid: false, error: 'VALIDATION_ERROR', field: 'age' }
  }
  if (!data.occupation || String(data.occupation).trim() === '') {
    return { valid: false, error: 'VALIDATION_ERROR', field: 'occupation' }
  }
  if (!Array.isArray(data.preferred_zones) || data.preferred_zones.length === 0) {
    return { valid: false, error: 'VALIDATION_ERROR', field: 'preferred_zones' }
  }
  if (data.monthly_budget != null && (data.monthly_budget < BUDGET_MIN || data.monthly_budget > BUDGET_MAX)) {
    return { valid: false, error: 'VALIDATION_ERROR', field: 'monthly_budget' }
  }
  return { valid: true }
}

/**
 * Step 2 - Situación familiar
 * @param {{ has_children?: boolean, children_ages?: number[], custody_type?: string }} data
 */
export function validateStep2(data) {
  if (!data) return { valid: false, error: 'VALIDATION_ERROR' }
  if (data.has_children === true) {
    if (!Array.isArray(data.children_ages)) {
      return { valid: false, error: 'VALIDATION_ERROR', field: 'children_ages' }
    }
    if (!data.custody_type || String(data.custody_type).trim() === '') {
      return { valid: false, error: 'VALIDATION_ERROR', field: 'custody_type' }
    }
  }
  return { valid: true }
}

/** Steps 3, 4, 5 : pas de contraintes strictes côté backend (champs optionnels ou énumérés côté UI) */
export function validateStep3() {
  return { valid: true }
}
export function validateStep4() {
  return { valid: true }
}
export function validateStep5() {
  return { valid: true }
}

/**
 * Step 6 - Fichiers : taille et type
 * @param {File} file
 */
export function validateVerificationFile(file) {
  if (!file || !(file instanceof File)) {
    return { valid: false, error: 'INVALID_FILE_TYPE' }
  }
  if (file.size > FILE_MAX_BYTES) {
    return { valid: false, error: 'FILE_TOO_LARGE' }
  }
  const mime = (file.type || '').toLowerCase()
  const name = (file.name || '').toLowerCase()
  const extOk = ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext))
  const mimeOk = ALLOWED_MIME_TYPES.includes(mime)
  if (!mimeOk && !extOk) {
    return { valid: false, error: 'INVALID_FILE_TYPE' }
  }
  return { valid: true }
}

/**
 * Sanitize file name for storage path: userId/type-timestamp.ext
 * @param {string} fileName
 * @param {string} type - e.g. 'document' | 'selfie'
 */
export function sanitizeFileName(fileName, type) {
  const ext = fileName.includes('.') ? fileName.slice(fileName.lastIndexOf('.')) : '.bin'
  const safeExt = ALLOWED_EXTENSIONS.includes(ext.toLowerCase()) ? ext : '.jpg'
  const timestamp = Date.now()
  return `${type}-${timestamp}${safeExt}`
}

export const FILE_MAX_BYTES_EXPORT = FILE_MAX_BYTES
export const ALLOWED_MIME_TYPES_EXPORT = Object.freeze([...ALLOWED_MIME_TYPES])
