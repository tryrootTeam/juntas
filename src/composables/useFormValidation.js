/**
 * Composable pour validation en temps réel des formulaires Login / Registro.
 * Utilise les validateurs de @/lib/validation.
 */
import { ref, watch } from 'vue'
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateCheckboxes,
} from '@/lib/validation'

const DEFAULT_MESSAGES = {
  EMAIL_REQUIRED: 'El email es obligatorio.',
  EMAIL_INVALID: 'Introduce un email válido.',
  EMAIL_TOO_LONG: 'El email es demasiado largo.',
  PASSWORD_REQUIRED: 'La contraseña es obligatoria.',
  WEAK_PASSWORD: 'Mín. 8 caracteres, una mayúscula, una minúscula y un número.',
  PASSWORD_TOO_LONG: 'La contraseña es demasiado larga.',
  PHONE_REQUIRED: 'El teléfono es obligatorio.',
  PHONE_INVALID: 'Formato español: +34 6XX o 7XX seguido de 8 dígitos.',
  NAME_REQUIRED: 'El nombre es obligatorio.',
  NAME_TOO_SHORT: 'El nombre debe tener al menos 2 caracteres.',
  NAME_TOO_LONG: 'El nombre no puede superar 100 caracteres.',
  NAME_INVALID: 'Solo letras, espacios, guiones y apóstrofes.',
  CHECKBOXES_REQUIRED: 'Debes aceptar términos y privacidad.',
  TERMS_REQUIRED: 'Debes aceptar los términos y condiciones.',
  PRIVACY_REQUIRED: 'Debes aceptar la política de privacidad.',
}

function msg(code, messages = DEFAULT_MESSAGES) {
  return messages[code] || code
}

/**
 * @param {Record<string, string>} [customMessages]
 * @returns {{ loginErrors, registerErrors, validateLogin, validateRegister, msg }}
 */
export function useFormValidation(customMessages = {}) {
  const messages = { ...DEFAULT_MESSAGES, ...customMessages }

  const loginErrors = ref({ email: '', password: '' })
  const registerErrors = ref({
    name: '',
    email: '',
    phone: '',
    password: '',
    checkboxes: '',
  })

  function validateLoginField(field, value) {
    if (field === 'email') {
      const r = validateEmail(value)
      loginErrors.value.email = r.valid ? '' : msg(r.error, messages)
      return r.valid
    }
    if (field === 'password') {
      const r = validatePassword(value)
      loginErrors.value.password = r.valid ? '' : msg(r.error, messages)
      return r.valid
    }
    return true
  }

  function validateRegisterField(field, value, allValues = {}) {
    if (field === 'name') {
      const r = validateName(value)
      registerErrors.value.name = r.valid ? '' : msg(r.error, messages)
      return r.valid
    }
    if (field === 'email') {
      const r = validateEmail(value)
      registerErrors.value.email = r.valid ? '' : msg(r.error, messages)
      return r.valid
    }
    if (field === 'phone') {
      const r = validatePhone(value)
      registerErrors.value.phone = r.valid ? '' : msg(r.error, messages)
      return r.valid
    }
    if (field === 'password') {
      const r = validatePassword(value)
      registerErrors.value.password = r.valid ? '' : msg(r.error, messages)
      return r.valid
    }
    if (field === 'checkboxes') {
      const r = validateCheckboxes({
        terms: allValues.terms,
        privacy: allValues.privacy,
      })
      registerErrors.value.checkboxes = r.valid ? '' : msg(r.error, messages)
      return r.valid
    }
    return true
  }

  /** Validation complète login (à la soumission) */
  function validateLogin(form) {
    const emailOk = validateLoginField('email', form.email)
    const passwordOk = validateLoginField('password', form.password)
    return emailOk && passwordOk
  }

  /** Validation complète register (à la soumission) */
  function validateRegister(form) {
    const nameOk = validateRegisterField('name', form.name)
    const emailOk = validateRegisterField('email', form.email)
    const phoneOk = validateRegisterField('phone', form.phone)
    const passwordOk = validateRegisterField('password', form.password)
    const checkboxesOk = validateRegisterField('checkboxes', null, {
      terms: form.terms,
      privacy: form.privacy,
    })
    return nameOk && emailOk && phoneOk && passwordOk && checkboxesOk
  }

  return {
    loginErrors,
    registerErrors,
    validateLoginField,
    validateRegisterField,
    validateLogin,
    validateRegister,
    msg: (code) => msg(code, messages),
  }
}
