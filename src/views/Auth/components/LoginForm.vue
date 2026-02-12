<template>
  <div id="panel-login" role="tabpanel" aria-labelledby="tab-login">
    <form class="space-y-4" @submit.prevent="handleSubmit" novalidate>
      <div v-if="authError" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
        {{ authError }}
      </div>

      <div>
        <label for="login-email" class="block text-sm font-medium text-deepblue mb-1">Email</label>
        <input
          id="login-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          aria-required="true"
          aria-invalid="!!loginErrors.email"
          :aria-describedby="loginErrors.email ? 'login-email-error' : undefined"
          class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
          :class="{ 'border-red-400': loginErrors.email }"
          placeholder="tu@email.com"
          @blur="validateField('email', form.email)"
          @input="validateField('email', form.email)"
        />
        <p v-if="loginErrors.email" id="login-email-error" class="mt-1 text-sm text-red-600" role="alert">
          {{ loginErrors.email }}
        </p>
      </div>

      <div>
        <label for="login-password" class="block text-sm font-medium text-deepblue mb-1">Contraseña</label>
        <div class="relative">
          <input
            id="login-password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            aria-required="true"
            aria-invalid="!!loginErrors.password"
            :aria-describedby="loginErrors.password ? 'login-password-error' : undefined"
            class="w-full px-3 py-2 pr-10 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
            :class="{ 'border-red-400': loginErrors.password }"
            placeholder="••••••••"
            @blur="validateField('password', form.password)"
            @input="validateField('password', form.password)"
          />
          <button
            type="button"
            :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-deepblue-300 hover:text-deepblue focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota rounded"
            @click="showPassword = !showPassword"
          >
            <span v-if="showPassword" aria-hidden="true">🙈</span>
            <span v-else aria-hidden="true">👁</span>
          </button>
        </div>
        <p v-if="loginErrors.password" id="login-password-error" class="mt-1 text-sm text-red-600" role="alert">
          {{ loginErrors.password }}
        </p>
        <p class="mt-1 text-sm">
          <RouterLink to="/forgot-password" class="text-terracota hover:underline">¿Olvidaste tu contraseña?</RouterLink>
        </p>
      </div>

      <button
        type="submit"
        class="w-full py-2.5 rounded-lg font-medium text-white bg-terracota hover:bg-terracota-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2 disabled:opacity-60"
        :disabled="loading"
        :aria-busy="loading"
      >
        {{ loading ? 'Entrando…' : 'Entrar' }}
      </button>
    </form>

    <div class="mt-6 flex items-center gap-3">
      <span class="flex-1 h-px bg-cream-400" />
      <span class="text-sm text-deepblue-300">o</span>
      <span class="flex-1 h-px bg-cream-400" />
    </div>

    <button
      type="button"
      class="w-full mt-4 py-2.5 rounded-lg font-medium border border-deepblue-200 text-deepblue hover:bg-cream-100 transition flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2 disabled:opacity-60"
      :disabled="loading"
      aria-label="Continuar con Google"
      @click="$emit('google')"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continuar con Google
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFormValidation } from '@/composables/useFormValidation'
import { useAuthStore } from '@/stores/auth'
import { logAuthEvent } from '@/services/authLog'

const emit = defineEmits(['success', 'google'])

const authStore = useAuthStore()
const { loginErrors, validateLoginField, validateLogin } = useFormValidation()

const form = ref({ email: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)
const authError = ref('')

watch([form], () => { authError.value = '' }, { deep: true })

function validateField(field, value) {
  validateLoginField(field, value)
}

async function handleSubmit() {
  authError.value = ''
  if (!validateLogin(form.value)) return

  loading.value = true
  try {
    await authStore.signInWithEmail(form.value.email.trim(), form.value.password)
    emit('success')
  } catch (err) {
    authError.value = err.message || 'Error al iniciar sesión.'
    logAuthEvent('failed_login', { email: form.value.email?.trim() || null, metadata: { code: err.code } })
  } finally {
    loading.value = false
  }
}

defineExpose({ setAuthError: (msg) => { authError.value = msg } })
</script>
