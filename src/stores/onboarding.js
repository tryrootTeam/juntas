import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import * as onboardingService from '@/services/onboarding'
import { getOnboardingErrorMessage } from '@/lib/onboardingErrors'

const defaultFormData = () => ({
  name: '',
  age: null,
  occupation: '',
  preferred_zones: [],
  monthly_budget: null,
  has_children: false,
  children_ages: [],
  custody_type: '',
  has_pets: false,
  pet_type: '',
  work_schedule: '',
  works_from_home: '',
  time_at_home: '',
  cleanliness_level: '',
  noise_level: '',
  is_smoker: '',
  preferred_roommates_count: null,
  preferred_age: '',
  children_preference: '',
})

export const useOnboardingStore = defineStore('onboarding', () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  const formData = ref(defaultFormData())
  const currentStep = ref(1)
  const loading = ref(false)
  const error = ref(null)

  const userId = computed(() => authStore.user?.id ?? null)
  const isComplete = computed(() => userStore.profile?.profile_completed ?? false)

  async function loadProgress() {
    const uid = userId.value
    if (!uid) return
    loading.value = true
    error.value = null
    try {
      await userStore.fetchProfile(uid)
      const p = userStore.profile
      if (p) {
        formData.value = {
          name: p.name ?? '',
          age: p.age ?? null,
          occupation: p.occupation ?? '',
          preferred_zones: p.preferred_zones ?? [],
          monthly_budget: p.monthly_budget ?? null,
          has_children: p.has_children ?? false,
          children_ages: p.children_ages ?? [],
          custody_type: p.custody_type ?? '',
          has_pets: p.has_pets ?? false,
          pet_type: p.pet_type ?? '',
          work_schedule: p.work_schedule ?? '',
          works_from_home: p.works_from_home ?? '',
          time_at_home: p.time_at_home ?? '',
          cleanliness_level: p.cleanliness_level ?? '',
          noise_level: p.noise_level ?? '',
          is_smoker: p.is_smoker ?? '',
          preferred_roommates_count: p.preferred_roommates_count ?? null,
          preferred_age: p.preferred_age ?? '',
          children_preference: p.children_preference ?? '',
        }
        const step = p.onboarding_step ?? 0
        currentStep.value = step >= 1 && step <= 6 ? step : 1
      }
    } catch (e) {
      error.value = e.message || 'Error al cargar el progreso.'
    } finally {
      loading.value = false
    }
  }

  async function saveStep(step, data) {
    const uid = userId.value
    if (!uid) {
      error.value = getOnboardingErrorMessage('NOT_AUTHENTICATED')
      throw new Error(error.value)
    }
    loading.value = true
    error.value = null
    try {
      await onboardingService.saveOnboardingStep(uid, step, data)
      Object.assign(formData.value, data)
      currentStep.value = step
      await userStore.fetchProfile(uid)
    } catch (e) {
      error.value = e.message || getOnboardingErrorMessage(e.code)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function uploadVerificationDocuments(documentFile, selfieFile) {
    const uid = userId.value
    if (!uid) {
      error.value = getOnboardingErrorMessage('NOT_AUTHENTICATED')
      throw new Error(error.value)
    }
    loading.value = true
    error.value = null
    try {
      let documentUrl = ''
      let selfieUrl = ''
      if (documentFile) {
        const doc = await onboardingService.uploadVerificationFile(uid, documentFile, 'document')
        documentUrl = doc.publicUrl || doc.path
      }
      if (selfieFile) {
        const selfie = await onboardingService.uploadVerificationFile(uid, selfieFile, 'selfie')
        selfieUrl = selfie.publicUrl || selfie.path
      }
      await onboardingService.createVerificationRecord(uid, { document_url: documentUrl, selfie_url: selfieUrl })
    } catch (e) {
      error.value = e.message || getOnboardingErrorMessage(e.code)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function completeOnboarding() {
    const uid = userId.value
    if (!uid) {
      error.value = getOnboardingErrorMessage('NOT_AUTHENTICATED')
      throw new Error(error.value)
    }
    loading.value = true
    error.value = null
    try {
      await onboardingService.completeOnboarding(uid)
      await userStore.fetchProfile(uid)
    } catch (e) {
      error.value = e.message || getOnboardingErrorMessage(e.code)
      throw e
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    formData,
    currentStep,
    loading,
    error,
    userId,
    isComplete,
    loadProgress,
    saveStep,
    uploadVerificationDocuments,
    completeOnboarding,
    clearError,
  }
})
