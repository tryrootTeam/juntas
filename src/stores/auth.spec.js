import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'

const mockSignUp = vi.fn()
const mockSignInWithPassword = vi.fn()
const mockSignInWithOAuth = vi.fn()

vi.mock('@/services/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn(),
      signUp: (...args) => mockSignUp(...args),
      signInWithPassword: (...args) => mockSignInWithPassword(...args),
      signInWithOAuth: (...args) => mockSignInWithOAuth(...args),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}))

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('signUpWithEmail', () => {
    it('appelle supabase.auth.signUp avec email, password et options.data (name, phone)', async () => {
      mockSignUp.mockResolvedValue({ data: { user: {}, session: {} }, error: null })
      const store = useAuthStore()
      await store.initialize()

      await store.signUpWithEmail('user@example.com', 'SecurePass123', {
        name: 'María García',
        phone: '+34600123456',
      })

      expect(mockSignUp).toHaveBeenCalledTimes(1)
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'SecurePass123',
        options: {
          data: {
            name: 'María García',
            phone: '+34600123456',
          },
        },
      })
    })

    it('crée bien le profil côté backend via trigger (signUp envoie user_metadata)', async () => {
      mockSignUp.mockResolvedValue({
        data: {
          user: { id: 'uuid-1', email: 'u@example.com' },
          session: {},
        },
        error: null,
      })
      const store = useAuthStore()
      await store.initialize()
      await store.signUpWithEmail('u@example.com', 'Pass1234', { name: 'Test', phone: '+34600000000' })
      const call = mockSignUp.mock.calls[0][0]
      expect(call.options.data).toEqual({ name: 'Test', phone: '+34600000000' })
      expect(call.email).toBe('u@example.com')
      // Le trigger handle_new_user utilise raw_user_meta_data (name, phone) pour insérer dans profiles
    })
  })
})
