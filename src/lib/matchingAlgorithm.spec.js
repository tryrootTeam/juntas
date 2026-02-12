import { describe, it, expect } from 'vitest'
import {
  calculateCompatibility,
  calculateDetailedCompatibility,
  areSchedulesCompatible,
  isCleanlinessCompatible,
  isNoiseLevelCompatible,
} from './matchingAlgorithm'

const baseProfile = {
  age: 30,
  has_children: false,
  children_ages: [],
  children_preference: 'any',
  work_schedule: 'morning',
  works_from_home: 'office',
  cleanliness_level: 'normal',
  noise_level: 'moderate',
  is_smoker: 'no',
  monthly_budget: 500,
  preferred_zones: ['Ruzafa', 'Benimaclet'],
  preferred_age: 'similar',
  preferred_roommates_count: 1,
}

describe('matchingAlgorithm', () => {
  describe('calculateCompatibility', () => {
    it('retourne une compatibilité > 90 pour deux profils identiques', () => {
      const score = calculateCompatibility(baseProfile, { ...baseProfile })
      expect(score).toBeGreaterThan(90)
      expect(score).toBeLessThanOrEqual(100)
    })

    it('retourne une compatibilité < 50 pour des profils très incompatibles', () => {
      const user1 = {
        ...baseProfile,
        has_children: true,
        children_ages: [2, 5],
        children_preference: 'no_children',
        work_schedule: 'night',
        works_from_home: 'always',
        cleanliness_level: 'strict',
        noise_level: 'quiet',
        is_smoker: 'yes',
        monthly_budget: 200,
        preferred_zones: ['Patraix'],
        preferred_age: 'similar',
        preferred_roommates_count: 2,
      }
      const user2 = {
        ...baseProfile,
        has_children: false,
        children_preference: 'no_children',
        work_schedule: 'morning',
        works_from_home: 'never',
        cleanliness_level: 'flexible',
        noise_level: 'lively',
        is_smoker: 'no',
        monthly_budget: 300,
        preferred_zones: ['Poblats Marítims'],
        age: 35,
        preferred_roommates_count: 1,
      }
      const score = calculateCompatibility(user1, user2)
      expect(score).toBeLessThan(50)
      expect(score).toBeGreaterThanOrEqual(0)
    })

    it('retourne un score entre 0 et 100', () => {
      const empty = {}
      expect(calculateCompatibility(empty, empty)).toBeGreaterThanOrEqual(0)
      expect(calculateCompatibility(empty, empty)).toBeLessThanOrEqual(100)
      expect(calculateCompatibility(baseProfile, baseProfile)).toBeLessThanOrEqual(100)
    })

    it('gère les profils null/undefined sans erreur', () => {
      expect(() => calculateCompatibility(null, baseProfile)).not.toThrow()
      expect(() => calculateCompatibility(baseProfile, undefined)).not.toThrow()
      expect(calculateCompatibility(null, null)).toBeGreaterThanOrEqual(0)
    })
  })

  describe('calculateDetailedCompatibility', () => {
    it('retourne un objet avec family, schedule, lifestyle, budget_location, preferences', () => {
      const breakdown = calculateDetailedCompatibility(baseProfile, baseProfile)
      expect(breakdown).toHaveProperty('family')
      expect(breakdown).toHaveProperty('schedule')
      expect(breakdown).toHaveProperty('lifestyle')
      expect(breakdown).toHaveProperty('budget_location')
      expect(breakdown).toHaveProperty('preferences')
      expect(breakdown.family).toBeGreaterThanOrEqual(0)
      expect(breakdown.family).toBeLessThanOrEqual(100)
    })
  })

  describe('areSchedulesCompatible', () => {
    it('retourne true pour le même horario', () => {
      expect(areSchedulesCompatible('morning', 'morning')).toBe(true)
    })
    it('retourne true pour morning et afternoon', () => {
      expect(areSchedulesCompatible('morning', 'afternoon')).toBe(true)
    })
    it('retourne false pour des horarios non compatibles si non définis dans les paires', () => {
      expect(areSchedulesCompatible('night', 'morning')).toBe(false)
    })
  })

  describe('isCleanlinessCompatible', () => {
    it('retourne true pour le même niveau', () => {
      expect(isCleanlinessCompatible('normal', 'normal')).toBe(true)
    })
    it('retourne true pour strict et normal', () => {
      expect(isCleanlinessCompatible('strict', 'normal')).toBe(true)
    })
  })

  describe('isNoiseLevelCompatible', () => {
    it('retourne true pour le même niveau', () => {
      expect(isNoiseLevelCompatible('moderate', 'moderate')).toBe(true)
    })
    it('retourne true pour quiet et moderate', () => {
      expect(isNoiseLevelCompatible('quiet', 'moderate')).toBe(true)
    })
  })
})
