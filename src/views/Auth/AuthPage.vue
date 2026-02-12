<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-cream" role="main" aria-label="Iniciar sesión o registrarse">
    <div class="w-full max-w-md bg-off-white rounded-xl shadow-lg p-8 border border-warm-sand ">
      <h2 class="font-display text-2xl font-bold text-charcoal mb-2">
        {{ activeTab === 'register' ? 'Crear cuenta' : 'Iniciar sesión' }}
      </h2>
      <p class="text-sm text-warm-grey mb-6">
        {{ activeTab === 'register' ? 'Regístrate para encontrar tu junta.' : 'Accede a tu cuenta.' }}
      </p>

      <RegisterForm
        v-show="activeTab === 'register'"
        ref="registerFormRef"
        @success="onAuthSuccess"
        @google="handleGoogle"
      />
      <LoginForm
        v-show="activeTab === 'login'"
        ref="loginFormRef"
        @success="onAuthSuccess"
        @google="handleGoogle"
      />

      <p class="mt-6 text-center text-sm text-warm-grey">
        <template v-if="activeTab === 'register'">
          ¿Ya tienes cuenta?
          <RouterLink to="/login" class="text-soft-terracota font-medium hover:underline">Iniciar sesión</RouterLink>
        </template>
        <template v-else>
          ¿Primera vez?
          <RouterLink to="/register" class="text-soft-terracota font-medium hover:underline">Regístrate</RouterLink>
        </template>
      </p>

      <p class="mt-4 text-center">
        <RouterLink to="/" class="text-warm-grey hover:text-soft-terracota text-sm">← Volver al inicio</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { logAuthEvent } from '@/services/authLog'
import { getAuthCallbackUrl } from '@/lib/authHelpers'
import RegisterForm from './components/RegisterForm.vue'
import LoginForm from './components/LoginForm.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref(route.name === 'register' || route.path === '/register' ? 'register' : 'login')
const registerFormRef = ref(null)
const loginFormRef = ref(null)

watch(
  () => route.path,
  (path) => {
    activeTab.value = path === '/register' ? 'register' : 'login'
  }
)

function redirectAfterAuth() {
  const redirect = route.query.redirect
  if (redirect && typeof redirect === 'string' && redirect.startsWith('/')) {
    router.push(redirect)
  } else {
    router.push({ name: 'dashboard' })
  }
}

function onAuthSuccess() {
  redirectAfterAuth()
}

async function handleGoogle() {
  try {
    const redirectTo = getAuthCallbackUrl()
    await authStore.signInWithGoogle(redirectTo)
  } catch (err) {
    const formRef = activeTab.value === 'register' ? registerFormRef.value : loginFormRef.value
    if (formRef?.setAuthError) formRef.setAuthError(err.message || 'Error con Google.')
    logAuthEvent('oauth_error', { metadata: { message: err.message, code: err.code } })
  }
}
</script>
