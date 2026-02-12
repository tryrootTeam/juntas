import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('@/views/LandingPage.vue'),
      meta: { public: true, requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/AuthPage.vue'),
      meta: { public: true, requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/AuthPage.vue'),
      meta: { public: true, requiresAuth: false },
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: () => import('@/views/Auth/AuthCallback.vue'),
      meta: { public: true, requiresAuth: false },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/Auth/ForgotPasswordView.vue'),
      meta: { public: true, requiresAuth: false },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/Auth/ResetPasswordView.vue'),
      meta: { public: true, requiresAuth: false },
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'login' },
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('@/views/Onboarding/OnboardingFlow.vue'),
      meta: { requiresAuth: true, requiresIncompleteProfile: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true, requiresCompleteProfile: true },
    },
    {
      path: '/match/:id',
      name: 'match-profile',
      component: () => import('@/views/MatchProfileView.vue'),
      meta: { requiresAuth: true, requiresCompleteProfile: true },
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/Chat/ChatPage.vue'),
      meta: { requiresAuth: true, requiresCompleteProfile: true },
    },
    {
      path: '/chat/:conversationId',
      name: 'chat-conversation',
      component: () => import('@/views/Chat/ChatPage.vue'),
      meta: { requiresAuth: true, requiresCompleteProfile: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile/ProfileView.vue'),
      meta: { requiresAuth: true, requiresCompleteProfile: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { public: true },
    },
  ],
})

// Auth guard
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  if (!authStore.initialized) {
    await authStore.initialize()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.public === false && authStore.isAuthenticated && (to.name === 'auth' || to.name === 'login' || to.name === 'register')) {
    next({ name: 'dashboard' })
    return
  }

  if (to.meta.requiresIncompleteProfile && authStore.isAuthenticated) {
    const uid = authStore.user?.id
    if (uid && !userStore.profile) await userStore.fetchProfile(uid)
    if (userStore.profile?.profile_completed) {
      next({ name: 'dashboard' })
      return
    }
  }

  if (to.meta.requiresCompleteProfile && authStore.isAuthenticated) {
    const uid = authStore.user?.id
    if (uid && !userStore.profile) await userStore.fetchProfile(uid)
    if (uid && userStore.profile && !userStore.profile.profile_completed) {
      next({ name: 'onboarding' })
      return
    }
  }

  if (to.meta.requiresAdmin && authStore.isAuthenticated) {
    const uid = authStore.user?.id
    if (uid) await userStore.fetchProfile(uid)
    if (!userStore.isAdmin) {
      next({ name: 'dashboard' })
      return
    }
  }

  next()
})

export default router
