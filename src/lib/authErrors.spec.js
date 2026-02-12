import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mapAuthError } from './authErrors'

describe('mapAuthError', () => {
  it('retourne INVALID_CREDENTIALS pour "Invalid login credentials"', () => {
    const r = mapAuthError({ message: 'Invalid login credentials' })
    expect(r.code).toBe('INVALID_CREDENTIALS')
    expect(r.message).toBeTruthy()
  })
  it('retourne EMAIL_EXISTS pour "User already registered"', () => {
    const r = mapAuthError({ message: 'User already registered' })
    expect(r.code).toBe('EMAIL_EXISTS')
  })
  it('retourne WEAK_PASSWORD pour message contenant password/least', () => {
    const r = mapAuthError({ message: 'Password should be at least 6 characters' })
    expect(r.code).toBe('WEAK_PASSWORD')
  })
  it('retourne RATE_LIMIT pour status 429', () => {
    const r = mapAuthError({ message: 'Forbidden', status: 429 })
    expect(r.code).toBe('RATE_LIMIT')
  })
  it('retourne UNKNOWN pour erreur null ou inconnue', () => {
    expect(mapAuthError(null).code).toBe('UNKNOWN')
    expect(mapAuthError({ message: 'Something weird' }).code).toBe('UNKNOWN')
  })
})
