import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import OnboardingFlow from './OnboardingFlow.vue'
import Step1AboutYou from './steps/Step1AboutYou.vue'
import { useOnboardingStore } from '@/stores/onboarding'
import * as onboardingService from '@/services/onboarding'

vi.mock('vue-router', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}))

vi.mock('@/services/onboarding', () => ({
  saveOnboardingStep: vi.fn().mockResolvedValue({ onboarding_step: 1 }),
  uploadVerificationFile: vi.fn().mockResolvedValue({ path: 'x', publicUrl: 'https://x' }),
  createVerificationRecord: vi.fn().mockResolvedValue({}),
  completeOnboarding: vi.fn().mockResolvedValue({}),
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({ user: { id: 'test-user-id' } }),
}))

vi.mock('@/stores/user', () => ({
  useUserStore: () => ({
    profile: { profile_completed: false, onboarding_step: 1 },
    fetchProfile: vi.fn().mockResolvedValue(undefined),
  }),
}))

describe('OnboardingFlow', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('affiche le pas 1 et la barre de progression', async () => {
    const wrapper = mount(OnboardingFlow, {
      global: { plugins: [createPinia()] },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Paso 1 de 6')
    expect(wrapper.text()).toMatch(/Completa tu perfil|Nombre|Edad|Profesión|Zonas/)
  })

  it('après soumission étape 1, currentStep passe à 2 et saveOnboardingStep est appelé', async () => {
    const pinia = createPinia()
    const wrapper = mount(OnboardingFlow, {
      global: { plugins: [pinia] },
    })
    await wrapper.vm.$nextTick()

    const store = useOnboardingStore()
    expect(store.currentStep).toBe(1)

    const step1 = wrapper.findComponent(Step1AboutYou)
    expect(step1.exists()).toBe(true)
    step1.vm.$emit('submit', {
      name: 'María',
      age: 32,
      occupation: 'Project Manager',
      preferred_zones: ['Ruzafa'],
      monthly_budget: 500,
    })
    await flushPromises()

    expect(store.currentStep).toBe(2)
    expect(onboardingService.saveOnboardingStep).toHaveBeenCalledWith(
      'test-user-id',
      1,
      expect.objectContaining({
        age: 32,
        occupation: 'Project Manager',
        preferred_zones: ['Ruzafa'],
        monthly_budget: 500,
      })
    )
  })
})
