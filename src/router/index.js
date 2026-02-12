import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
      component: () => import('@/views/OnboardingView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true },
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

  if (!authStore.initialized) {
    await authStore.initialize()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.public === false && authStore.isAuthenticated && (to.name === 'auth' || to.name === 'login' || to.name === 'register')) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
