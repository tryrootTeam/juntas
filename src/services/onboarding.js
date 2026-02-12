/**
 * Service Backend Onboarding - PRD
 * PATCH profiles (save step), upload storage, POST verification_documents, complete onboarding
 */

import { supabase } from '@/services/supabase'
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  validateStep5,
  validateVerificationFile,
  sanitizeFileName,
} from '@/lib/onboardingValidation'
import { ONBOARDING_ERROR_CODES, getOnboardingErrorMessage } from '@/lib/onboardingErrors'

const BUCKET = 'verification-documents'

/**
 * Sauvegarde une étape d'onboarding (1-5). Step 6 = documents + complete.
 * @param {string} userId
 * @param {number} step - 1..6
 * @param {Record<string, unknown>} payload - champs à mettre à jour
 * @returns {Promise<{ id: string, onboarding_step: number, profile_completed: boolean, updated_at: string }>}
 */
export async function saveOnboardingStep(userId, step, payload) {
  if (!userId) {
    throw Object.assign(new Error(getOnboardingErrorMessage(ONBOARDING_ERROR_CODES.NOT_AUTHENTICATED)), {
      code: ONBOARDING_ERROR_CODES.NOT_AUTHENTICATED,
    })
  }

  const validators = [null, validateStep1, validateStep2, validateStep3, validateStep4, validateStep5]
  const validate = validators[step]
  if (validate) {
    const result = validate(payload)
    if (!result.valid) {
      throw Object.assign(new Error(getOnboardingErrorMessage(result.error)), {
        code: result.error,
        field: result.field,
      })
    }
  }

  const knownColumns = [
    'name', 'age', 'occupation', 'preferred_zones', 'monthly_budget',
    'has_children', 'children_ages', 'custody_type', 'has_pets', 'pet_type',
    'work_schedule', 'works_from_home', 'time_at_home',
    'cleanliness_level', 'noise_level', 'is_smoker',
    'preferred_roommates_count', 'preferred_age', 'children_preference',
  ]
  const cleanPayload = {}
  for (const key of Object.keys(payload)) {
    if (!knownColumns.includes(key)) continue
    const v = payload[key]
    if (v === undefined) continue
    cleanPayload[key] = v
  }
  cleanPayload.onboarding_step = step
  cleanPayload.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('profiles')
    .update(cleanPayload)
    .eq('id', userId)
    .select('id, onboarding_step, profile_completed, updated_at')
    .single()

  if (error) {
    const message = error.message || getOnboardingErrorMessage(ONBOARDING_ERROR_CODES.PROFILE_UPDATE_FAILED)
    throw Object.assign(new Error(message), {
      code: ONBOARDING_ERROR_CODES.PROFILE_UPDATE_FAILED,
      details: error,
    })
  }
  return data
}

/**
 * Upload un fichier vers le bucket verification-documents. Path: userId/type-timestamp.ext
 * @param {string} userId
 * @param {File} file
 * @param {'document'|'selfie'} type
 * @returns {Promise<{ path: string, publicUrl: string }>}
 */
export async function uploadVerificationFile(userId, file, type = 'document') {
  const validation = validateVerificationFile(file)
  if (!validation.valid) {
    throw Object.assign(new Error(getOnboardingErrorMessage(validation.error)), { code: validation.error })
  }

  const fileName = sanitizeFileName(file.name, type)
  const path = `${userId}/${fileName}`

  const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  })

  if (error) {
    if (error.message?.toLowerCase().includes('size') || error.message?.toLowerCase().includes('large')) {
      throw Object.assign(new Error(getOnboardingErrorMessage(ONBOARDING_ERROR_CODES.FILE_TOO_LARGE)), {
        code: ONBOARDING_ERROR_CODES.FILE_TOO_LARGE,
      })
    }
    throw Object.assign(new Error(getOnboardingErrorMessage(ONBOARDING_ERROR_CODES.UPLOAD_FAILED)), {
      code: ONBOARDING_ERROR_CODES.UPLOAD_FAILED,
      details: error,
    })
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
  return { path: data.path, publicUrl: urlData?.publicUrl ?? '' }
}

/**
 * Crée un enregistrement verification_documents (document_url, selfie_url, status pending).
 * Expiration à 30 jours (rétention RGPD).
 * @param {string} userId
 * @param {{ document_url: string, selfie_url: string }} urls
 * @returns {Promise<{ id: string, user_id: string, status: string, uploaded_at: string, expires_at: string }>}
 */
export async function createVerificationRecord(userId, { document_url, selfie_url }) {
  if (!userId) {
    throw Object.assign(new Error(getOnboardingErrorMessage(ONBOARDING_ERROR_CODES.NOT_AUTHENTICATED)), {
      code: ONBOARDING_ERROR_CODES.NOT_AUTHENTICATED,
    })
  }

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  const { data, error } = await supabase
    .from('verification_documents')
    .insert({
      user_id: userId,
      document_type: 'identity',
      file_path: document_url || selfie_url || '',
      document_url: document_url ?? null,
      selfie_url: selfie_url ?? null,
      status: 'pending',
      uploaded_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString(),
    })
    .select('id, user_id, status, uploaded_at, expires_at')
    .single()

  if (error) {
    throw Object.assign(new Error(getOnboardingErrorMessage(ONBOARDING_ERROR_CODES.UPLOAD_FAILED)), {
      code: ONBOARDING_ERROR_CODES.UPLOAD_FAILED,
      details: error,
    })
  }
  return data
}

/**
 * Marque l'onboarding comme terminé (profile_completed, onboarding_step 6, identity_status under_review).
 * @param {string} userId
 * @returns {Promise<{ id: string, onboarding_step: number, profile_completed: boolean, identity_status: string, updated_at: string }>}
 */
export async function completeOnboarding(userId) {
  if (!userId) {
    throw Object.assign(new Error(getOnboardingErrorMessage(ONBOARDING_ERROR_CODES.NOT_AUTHENTICATED)), {
      code: ONBOARDING_ERROR_CODES.NOT_AUTHENTICATED,
    })
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      profile_completed: true,
      onboarding_step: 6,
      identity_status: 'under_review',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select('id, onboarding_step, profile_completed, identity_status, updated_at')
    .single()

  if (error) {
    throw Object.assign(new Error(getOnboardingErrorMessage(ONBOARDING_ERROR_CODES.PROFILE_UPDATE_FAILED)), {
      code: ONBOARDING_ERROR_CODES.PROFILE_UPDATE_FAILED,
      details: error,
    })
  }
  return data
}

export { ONBOARDING_ERROR_CODES, getOnboardingErrorMessage }
