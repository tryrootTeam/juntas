import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateCheckboxes,
} from './validation'

describe('validateEmail', () => {
  it('retourne valid: false si email vide ou manquant', () => {
    expect(validateEmail('').valid).toBe(false)
    expect(validateEmail('   ').valid).toBe(false)
    expect(validateEmail(null).valid).toBe(false)
    expect(validateEmail(undefined).valid).toBe(false)
  })
  it('retourne valid: false si format invalide', () => {
    expect(validateEmail('sans-arobase').valid).toBe(false)
    expect(validateEmail('@nodomain.com').valid).toBe(false)
    expect(validateEmail('user@').valid).toBe(false)
  })
  it('retourne valid: true pour un email valide', () => {
    expect(validateEmail('user@example.com').valid).toBe(true)
    expect(validateEmail('  user@example.com  ').valid).toBe(true)
  })
  it('retourne EMAIL_TOO_LONG si > 255 caractères', () => {
    const long = 'a'.repeat(250) + '@b.com'
    const r = validateEmail(long)
    expect(r.valid).toBe(false)
    expect(r.error).toBe('EMAIL_TOO_LONG')
  })
})

describe('validatePassword', () => {
  it('retourne valid: false si vide ou manquant', () => {
    expect(validatePassword('').valid).toBe(false)
    expect(validatePassword(null).valid).toBe(false)
  })
  it('retourne WEAK_PASSWORD si < 8 caractères', () => {
    expect(validatePassword('Ab1').valid).toBe(false)
    expect(validatePassword('Abcdef1').valid).toBe(false)
  })
  it('retourne WEAK_PASSWORD sans majuscule', () => {
    expect(validatePassword('abcdef12').valid).toBe(false)
  })
  it('retourne WEAK_PASSWORD sans minuscule', () => {
    expect(validatePassword('ABCDEF12').valid).toBe(false)
  })
  it('retourne WEAK_PASSWORD sans chiffre', () => {
    expect(validatePassword('Abcdefgh').valid).toBe(false)
  })
  it('retourne valid: true pour un mot de passe conforme', () => {
    expect(validatePassword('SecurePass123').valid).toBe(true)
    expect(validatePassword('Ab1aaaaa').valid).toBe(true)
  })
  it('retourne PASSWORD_TOO_LONG si > 72 caractères', () => {
    const r = validatePassword('A' + 'a'.repeat(71) + '1')
    expect(r.valid).toBe(false)
    expect(r.error).toBe('PASSWORD_TOO_LONG')
  })
})

describe('validatePhone', () => {
  it('retourne valid: false si vide ou manquant', () => {
    expect(validatePhone('').valid).toBe(false)
    expect(validatePhone(null).valid).toBe(false)
  })
  it('retourne valid: true pour +34 6XX XXXXXXX', () => {
    expect(validatePhone('+34600123456').valid).toBe(true)
    expect(validatePhone('+34 600 12 34 56').valid).toBe(true)
  })
  it('retourne valid: true pour +34 7XX XXXXXXX', () => {
    expect(validatePhone('+34700123456').valid).toBe(true)
  })
  it('retourne PHONE_INVALID pour format non espagnol ou invalide', () => {
    expect(validatePhone('+33600123456').valid).toBe(false)
    expect(validatePhone('+34800123456').valid).toBe(false)
    expect(validatePhone('600123456').valid).toBe(false)
  })
})

describe('validateName', () => {
  it('retourne valid: false si vide ou manquant', () => {
    expect(validateName('').valid).toBe(false)
    expect(validateName('a').valid).toBe(false)
    expect(validateName(null).valid).toBe(false)
  })
  it('retourne valid: true pour un nom valide', () => {
    expect(validateName('María García').valid).toBe(true)
    expect(validateName('Jean-Pierre').valid).toBe(true)
    expect(validateName("O'Brien").valid).toBe(true)
  })
  it('retourne NAME_TOO_LONG si > 100 caractères', () => {
    const r = validateName('a'.repeat(101))
    expect(r.valid).toBe(false)
    expect(r.error).toBe('NAME_TOO_LONG')
  })
  it('retourne NAME_INVALID si caractères non autorisés', () => {
    expect(validateName('María123').valid).toBe(false)
    expect(validateName('Test@name').valid).toBe(false)
  })
})

describe('validateCheckboxes', () => {
  it('retourne valid: false si terms non coché', () => {
    expect(validateCheckboxes({ terms: false, privacy: true }).valid).toBe(false)
  })
  it('retourne valid: false si privacy non coché', () => {
    expect(validateCheckboxes({ terms: true, privacy: false }).valid).toBe(false)
  })
  it('retourne valid: true si les deux cochés', () => {
    expect(validateCheckboxes({ terms: true, privacy: true }).valid).toBe(true)
  })
})
