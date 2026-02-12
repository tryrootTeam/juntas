import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DashboardView from './DashboardView.vue'
import MatchCard from '@/components/dashboard/MatchCard.vue'
import { useMatchesStore } from '@/stores/matches'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('@/services/supabase', () => ({
  supabase: {
    rpc: vi.fn().mockResolvedValue({ data: [], error: null }),
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        or: vi.fn().mockResolvedValue({ data: [] }),
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null }),
          maybeSingle: vi.fn().mockResolvedValue({ data: null }),
        }),
      }),
      update: vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({}) }) }),
      upsert: vi.fn().mockReturnValue({ select: vi.fn().mockReturnValue({ single: vi.fn().mockResolvedValue({ data: {}, error: null }) }) }),
    }),
  },
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(),
}))

vi.mock('@/stores/user', () => ({
  useUserStore: vi.fn(),
}))

const fakeMatches = [
  {
    id: 'user-ana',
    name: 'Ana',
    age: 28,
    occupation: 'Profesora',
    has_children: true,
    children_ages: [2, 5],
    preferred_zones: ['Ruzafa'],
    work_schedule: 'morning',
    cleanliness_level: 'normal',
    compatibility_score: 85,
    status: 'pending',
  },
  {
    id: 'user-berta',
    name: 'Berta',
    age: 30,
    occupation: 'Diseñadora',
    has_children: false,
    preferred_zones: ['Benimaclet'],
    work_schedule: 'afternoon',
    cleanliness_level: 'flexible',
    compatibility_score: 72,
    status: 'pending',
  },
]

describe('DashboardView', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    useAuthStore.mockReturnValue({ user: { id: 'current-user' } })
    useUserStore.mockReturnValue({
      profile: { name: 'Usuario', identity_status: 'verified' },
      fetchProfile: vi.fn().mockResolvedValue(undefined),
    })
  })

  it('muestra el grid de matches cuando hay datos', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    useAuthStore.mockReturnValue({ user: { id: 'current-user' } })
    useUserStore.mockReturnValue({
      profile: { name: 'Usuario', identity_status: 'verified' },
      fetchProfile: vi.fn().mockResolvedValue(undefined),
    })
    const wrapper = mount(DashboardView, {
      global: {
        plugins: [pinia],
        stubs: { AppHeader: true, VerificationBanner: true, StatsCards: true, EmptyState: true },
      },
    })

    await flushPromises()

    const matchesStore = useMatchesStore()
    matchesStore.matches = [...fakeMatches]
    matchesStore.loading = false
    matchesStore.error = null

    await wrapper.vm.$nextTick()

    const cards = wrapper.findAllComponents(MatchCard)
    expect(cards.length).toBe(2)
    expect(wrapper.text()).toContain('Ana')
    expect(wrapper.text()).toContain('Berta')
  })

  it('el filtro "Con hijos" filtra correctamente', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    useAuthStore.mockReturnValue({ user: { id: 'current-user' } })
    useUserStore.mockReturnValue({
      profile: { name: 'Usuario', identity_status: 'verified' },
      fetchProfile: vi.fn().mockResolvedValue(undefined),
    })

    const wrapper = mount(DashboardView, {
      global: {
        plugins: [pinia],
        stubs: { AppHeader: true, VerificationBanner: true, StatsCards: true, EmptyState: true },
      },
    })

    await flushPromises()

    const matchesStore = useMatchesStore()
    matchesStore.matches = [...fakeMatches]
    matchesStore.loading = false
    matchesStore.error = null

    await wrapper.vm.$nextTick()

    expect(wrapper.findAllComponents(MatchCard).length).toBe(2)

    const conHijosBtn = wrapper.find('[data-testid="filter-with_children"]')
    expect(conHijosBtn.exists()).toBe(true)
    await conHijosBtn.trigger('click')
    await wrapper.vm.$nextTick()

    const cardsAfterFilter = wrapper.findAllComponents(MatchCard)
    expect(cardsAfterFilter.length).toBe(1)
    expect(wrapper.text()).toContain('Ana')
    expect(wrapper.text()).not.toContain('Berta')
  })
})
