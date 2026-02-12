/**
 * Codes d'erreur et messages utilisateur - PRD Backend Onboarding
 * FILE_TOO_LARGE, INVALID_FILE_TYPE, UPLOAD_FAILED, QUOTA_EXCEEDED
 */

export const ONBOARDING_ERROR_CODES = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  PROFILE_UPDATE_FAILED: 'PROFILE_UPDATE_FAILED',
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
}

const USER_MESSAGES = {
  [ONBOARDING_ERROR_CODES.FILE_TOO_LARGE]:
    'Le fichier est trop volumineux. Taille max : 5 Mo.',
  [ONBOARDING_ERROR_CODES.INVALID_FILE_TYPE]:
    'Type de fichier non accepté. Utilisez JPG, PNG ou PDF.',
  [ONBOARDING_ERROR_CODES.UPLOAD_FAILED]:
    'L’envoi du fichier a échoué. Réessayez.',
  [ONBOARDING_ERROR_CODES.QUOTA_EXCEEDED]:
    'Nombre maximum d’envois atteint. Réessayez dans une heure.',
  [ONBOARDING_ERROR_CODES.VALIDATION_ERROR]:
    'Vérifiez les champs du formulaire.',
  [ONBOARDING_ERROR_CODES.PROFILE_UPDATE_FAILED]:
    'La mise à jour du profil a échoué. Réessayez.',
  [ONBOARDING_ERROR_CODES.NOT_AUTHENTICATED]:
    'Vous devez être connecté pour continuer.',
}

/** @param {string} code */
export function getOnboardingErrorMessage(code) {
  return USER_MESSAGES[code] ?? 'Une erreur est survenue.'
}
