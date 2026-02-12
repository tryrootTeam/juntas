/**
 * Algoritmo de matching - PRD Dashboard.
 * Calcula compatibilidad entre dos perfiles (0-100) y desglose por categorías.
 */

// Horarios compatibles (p.ej. mañana + tarde en casa en momentos distintos)
const SCHEDULE_COMPATIBLE_PAIRS = [
  ['morning', 'afternoon'],
  ['morning', 'evening'],
  ['afternoon', 'evening'],
  ['flexible', 'morning'],
  ['flexible', 'afternoon'],
  ['flexible', 'evening'],
  ['flexible', 'night'],
]

function pairMatch(a, b, pairs) {
  if (!a || !b) return false
  const low = (a || '').toLowerCase()
  const high = (b || '').toLowerCase()
  return pairs.some(([x, y]) => (x === low && y === high) || (x === high && y === low))
}

/**
 * Indica si dos horarios laborales son compatibles.
 */
export function areSchedulesCompatible(schedule1, schedule2) {
  if (!schedule1 || !schedule2) return false
  if (schedule1 === schedule2) return true
  return pairMatch(schedule1, schedule2, SCHEDULE_COMPATIBLE_PAIRS)
}

// Niveles de limpieza compatibles (normal con strict o flexible)
const CLEANLINESS_COMPATIBLE_PAIRS = [
  ['strict', 'normal'],
  ['normal', 'flexible'],
]

/**
 * Indica si dos niveles de limpieza son compatibles.
 */
export function isCleanlinessCompatible(level1, level2) {
  if (!level1 || !level2) return false
  if (level1 === level2) return true
  return pairMatch(level1, level2, CLEANLINESS_COMPATIBLE_PAIRS)
}

// Niveles de ruido compatibles
const NOISE_COMPATIBLE_PAIRS = [
  ['quiet', 'moderate'],
  ['moderate', 'lively'],
]

/**
 * Indica si dos niveles de ruido son compatibles.
 */
export function isNoiseLevelCompatible(noise1, noise2) {
  if (!noise1 || !noise2) return false
  if (noise1 === noise2) return true
  return pairMatch(noise1, noise2, NOISE_COMPATIBLE_PAIRS)
}

function safeArray(arr) {
  return Array.isArray(arr) ? arr : []
}

function avg(arr) {
  const a = safeArray(arr).filter((n) => typeof n === 'number')
  if (a.length === 0) return 0
  return a.reduce((s, n) => s + n, 0) / a.length
}

/**
 * Calcula el desglose de compatibilidad por categorías (family, schedule, lifestyle, budget_location, preferences).
 * Chaque valeur est entre 0 et 100.
 */
export function calculateDetailedCompatibility(user1, user2) {
  const u1 = user1 || {}
  const u2 = user2 || {}

  let family = 0
  if (u1.has_children === u2.has_children) {
    family = 100
    if (u1.has_children && u2.has_children) {
      const avg1 = avg(u1.children_ages)
      const avg2 = avg(u2.children_ages)
      if (Math.abs(avg1 - avg2) <= 3) family = 100
      else family = 70
    }
  } else {
    if (u1.children_preference === 'any' || u2.children_preference === 'any') family = 50
  }

  let schedule = 0
  if (u1.work_schedule === u2.work_schedule) schedule += 80
  else if (areSchedulesCompatible(u1.work_schedule, u2.work_schedule)) schedule += 40
  if (u1.works_from_home === u2.works_from_home) schedule += 20
  schedule = Math.min(100, schedule)

  let lifestyle = 0
  if (u1.cleanliness_level === u2.cleanliness_level) lifestyle += 40
  else if (isCleanlinessCompatible(u1.cleanliness_level, u2.cleanliness_level)) lifestyle += 20
  if (u1.noise_level === u2.noise_level) lifestyle += 40
  else if (isNoiseLevelCompatible(u1.noise_level, u2.noise_level)) lifestyle += 20
  if (u1.is_smoker === u2.is_smoker) lifestyle += 20
  else if (
    (u1.is_smoker === 'outside_only' && u2.is_smoker === 'no') ||
    (u2.is_smoker === 'outside_only' && u1.is_smoker === 'no')
  ) {
    lifestyle += 12
  }
  lifestyle = Math.min(100, lifestyle)

  let budget_location = 0
  const budget1 = Number(u1.monthly_budget) || 0
  const budget2 = Number(u2.monthly_budget) || 0
  const combinedBudget = budget1 + budget2
  if (combinedBudget >= 1000) budget_location += 70
  else if (combinedBudget >= 800) budget_location += 50
  const zones1 = safeArray(u1.preferred_zones)
  const zones2 = safeArray(u2.preferred_zones)
  const commonZones = zones1.filter((z) => zones2.includes(z))
  if (commonZones.length >= 2) budget_location += 30
  else if (commonZones.length > 0) budget_location += 15
  budget_location = Math.min(100, budget_location)

  let preferences = 0
  const age1 = Number(u1.age) || 0
  const age2 = Number(u2.age) || 0
  const ageDiff = Math.abs(age1 - age2)
  if (u1.preferred_age === 'similar' && ageDiff <= 5) preferences += 50
  else if (u1.preferred_age === 'any') preferences += 30
  else if (
    (u1.preferred_age === 'younger' && age1 > age2) ||
    (u1.preferred_age === 'older' && age1 < age2)
  ) {
    preferences += 40
  }
  if (u1.preferred_roommates_count === u2.preferred_roommates_count) preferences += 50
  preferences = Math.min(100, preferences)

  return {
    family: Math.round(family),
    schedule: Math.round(schedule),
    lifestyle: Math.round(lifestyle),
    budget_location: Math.round(budget_location),
    preferences: Math.round(preferences),
  }
}

/**
 * Calcula la puntuación global de compatibilidad (0-100) entre dos perfiles.
 * Pesos aproximados: familia 30%, horario 25%, estilo vida 25%, presupuesto/ubicación 10%, preferencias 10%.
 */
export function calculateCompatibility(user1, user2) {
  const u1 = user1 || {}
  const u2 = user2 || {}
  let score = 0

  // ===== SITUACIÓN FAMILIAR (30%) =====
  if (u1.has_children === u2.has_children) {
    score += 30
    if (u1.has_children && u2.has_children) {
      const avgAge1 = avg(u1.children_ages)
      const avgAge2 = avg(u2.children_ages)
      if (Math.abs(avgAge1 - avgAge2) <= 3) score += 5
    }
  } else {
    if (u1.children_preference === 'any' || u2.children_preference === 'any') score += 15
  }

  // ===== HORARIO LABORAL (25%) =====
  if (u1.work_schedule === u2.work_schedule) score += 20
  else if (areSchedulesCompatible(u1.work_schedule, u2.work_schedule)) score += 10
  if (u1.works_from_home === u2.works_from_home) score += 5

  // ===== ESTILO DE VIDA (25%) =====
  if (u1.cleanliness_level === u2.cleanliness_level) score += 10
  else if (isCleanlinessCompatible(u1.cleanliness_level, u2.cleanliness_level)) score += 5
  if (u1.noise_level === u2.noise_level) score += 10
  else if (isNoiseLevelCompatible(u1.noise_level, u2.noise_level)) score += 5
  if (u1.is_smoker === u2.is_smoker) score += 5
  else if (
    (u1.is_smoker === 'outside_only' && u2.is_smoker === 'no') ||
    (u2.is_smoker === 'outside_only' && u1.is_smoker === 'no')
  ) {
    score += 3
  }

  // ===== PRESUPUESTO Y UBICACIÓN (10%) =====
  const budget1 = Number(u1.monthly_budget) || 0
  const budget2 = Number(u2.monthly_budget) || 0
  const combinedBudget = budget1 + budget2
  if (combinedBudget >= 800) score += 5
  if (combinedBudget >= 1000) score += 2
  const zones1 = safeArray(u1.preferred_zones)
  const zones2 = safeArray(u2.preferred_zones)
  const commonZones = zones1.filter((z) => zones2.includes(z))
  if (commonZones.length > 0) score += 3
  if (commonZones.length >= 2) score += 2

  // ===== PREFERENCIAS (10%) =====
  const age1 = Number(u1.age) || 0
  const age2 = Number(u2.age) || 0
  const ageDiff = Math.abs(age1 - age2)
  if (u1.preferred_age === 'similar' && ageDiff <= 5) score += 5
  else if (u1.preferred_age === 'any') score += 3
  else if (
    (u1.preferred_age === 'younger' && age1 > age2) ||
    (u1.preferred_age === 'older' && age1 < age2)
  ) {
    score += 4
  }
  if (u1.preferred_roommates_count === u2.preferred_roommates_count) score += 5

  return Math.min(100, Math.max(0, Math.round(score)))
}
