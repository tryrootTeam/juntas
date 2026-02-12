import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getMyProfile, updateMyProfile, updatePassword } from './profile'

const mockRpc = vi.fn()
const mockAuthUpdateUser = vi.fn()

vi.mock('@/services/supabase', () => ({
  supabase: {
    rpc: (...args) => mockRpc(...args),
    auth: {
      updateUser: (...args) => mockAuthUpdateUser(...args),
    },
  },
}))

describe('profile service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getMyProfile', () => {
    it('appelle supabase.rpc("get_my_profile") et .maybeSingle()', async () => {
      mockRpc.mockReturnValue({
        maybeSingle: () => Promise.resolve({ data: { id: 'uid-1' }, error: null }),
      })
      const result = await getMyProfile()
      expect(mockRpc).toHaveBeenCalledWith('get_my_profile')
      expect(result).toEqual({ data: { id: 'uid-1' }, error: null })
    })
  })

  describe('updateMyProfile', () => {
    it('appelle supabase.rpc("update_my_profile", { data })', async () => {
      const payload = { display_name: 'Test', age: 25 }
      mockRpc.mockResolvedValue({ data: { id: 'uid-1', display_name: 'Test' }, error: null })
      const result = await updateMyProfile(payload)
      expect(mockRpc).toHaveBeenCalledWith('update_my_profile', { data: payload })
      expect(result.data.display_name).toBe('Test')
    })
  })

  describe('updatePassword', () => {
    it('appelle supabase.auth.updateUser avec le nouveau mot de passe', async () => {
      mockAuthUpdateUser.mockResolvedValue({ data: { user: {} }, error: null })
      await updatePassword('NewSecurePass123')
      expect(mockAuthUpdateUser).toHaveBeenCalledWith({ password: 'NewSecurePass123' })
    })
  })
})
