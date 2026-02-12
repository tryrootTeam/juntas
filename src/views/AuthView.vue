<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-cream">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-cream-400">
      <h2 class="text-2xl font-bold text-deepblue mb-2">
        {{ isRegister ? 'Crear cuenta' : 'Iniciar sesión' }}
      </h2>
      <p class="text-sm text-deepblue-300 mb-6">
        {{ isRegister ? 'Regístrate para encontrar tu junta.' : 'Accede a tu cuenta.' }}
      </p>

      <!-- Erreur globale auth -->
      <div
        v-if="authError"
        class="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
        role="alert"
      >
        {{ authError }}
      </div>

      <!-- Login -->
      <form v-if="!isRegister" class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label for="login-email" class="block text-sm font-medium text-deepblue mb-1">Email</label>
          <input
            id="login-email"
            v-model="loginForm.email"
            type="email"
            autocomplete="email"
            class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota"
            :class="{ 'border-red-400': errors.loginEmail }"
            placeholder="tu@email.com"
          />
          <p v-if="errors.loginEmail" class="mt-1 text-sm text-red-600">{{ errors.loginEmail }}</p>
        </div>
        <div>
          <label for="login-password" class="block text-sm font-medium text-deepblue mb-1">Contraseña</label>
          <input
            id="login-password"
            v-model="loginForm.password"
            type="password"
            autocomplete="current-password"
            class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota"
            :class="{ 'border-red-400': errors.loginPassword }"
            placeholder="••••••••"
          />
          <p v-if="errors.loginPassword" class="mt-1 text-sm text-red-600">{{ errors.loginPassword }}</p>
        </div>
        <button
          type="submit"
          class="w-full py-2.5 rounded-lg font-medium text-white bg-terracota hover:bg-terracota-600 transition"
          :disabled="loading"
        >
          {{ loading ? 'Entrando…' : 'Entrar' }}
        </button>
      </form>

      <!-- Register -->
      <form v-else class="space-y-4" @submit.prevent="handleRegister">
        <div>
          <label for="reg-name" class="block text-sm font-medium text-deepblue mb-1">Nombre</label>
          <input
            id="reg-name"
            v-model="registerForm.name"
            type="text"
            autocomplete="name"
            class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota"
            :class="{ 'border-red-400': errors.regName }"
            placeholder="María García"
          />
          <p v-if="errors.regName" class="mt-1 text-sm text-red-600">{{ errors.regName }}</p>
        </div>
        <div>
          <label for="reg-email" class="block text-sm font-medium text-deepblue mb-1">Email</label>
          <input
            id="reg-email"
            v-model="registerForm.email"
            type="email"
            autocomplete="email"
            class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota"
            :class="{ 'border-red-400': errors.regEmail }"
            placeholder="tu@email.com"
          />
          <p v-if="errors.regEmail" class="mt-1 text-sm text-red-600">{{ errors.regEmail }}</p>
        </div>
        <div>
          <label for="reg-phone" class="block text-sm font-medium text-deepblue mb-1">Teléfono</label>
          <input
            id="reg-phone"
            v-model="registerForm.phone"
            type="tel"
            autocomplete="tel"
            class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota"
            :class="{ 'border-red-400': errors.regPhone }"
            placeholder="+34600123456"
          />
          <p v-if="errors.regPhone" class="mt-1 text-sm text-red-600">{{ errors.regPhone }}</p>
        </div>
        <div>
          <label for="reg-password" class="block text-sm font-medium text-deepblue mb-1">Contraseña</label>
          <input
            id="reg-password"
            v-model="registerForm.password"
            type="password"
            autocomplete="new-password"
            class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota"
            :class="{ 'border-red-400': errors.regPassword }"
            placeholder="Mín. 8 caracteres, mayúscula, minúscula y número"
          />
          <p v-if="errors.regPassword" class="mt-1 text-sm text-red-600">{{ errors.regPassword }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label class="flex items-start gap-2 cursor-pointer">
            <input v-model="registerForm.terms" type="checkbox" class="mt-1 rounded border-cream-400 text-terracota focus:ring-terracota" />
            <span class="text-sm text-deepblue">Acepto los <a href="#" class="text-terracota underline">términos y condiciones</a></span>
          </label>
          <label class="flex items-start gap-2 cursor-pointer">
            <input v-model="registerForm.privacy" type="checkbox" class="mt-1 rounded border-cream-400 text-terracota focus:ring-terracota" />
            <span class="text-sm text-deepblue">Acepto la <a href="#" class="text-terracota underline">política de privacidad</a></span>
          </label>
          <p v-if="errors.regCheckboxes" class="text-sm text-red-600">{{ errors.regCheckboxes }}</p>
        </div>
        <button
          type="submit"
          class="w-full py-2.5 rounded-lg font-medium text-white bg-terracota hover:bg-terracota-600 transition"
          :disabled="loading"
        >
          {{ loading ? 'Creando cuenta…' : 'Crear cuenta' }}
        </button>
      </form>

      <!-- Séparateur -->
      <div class="my-6 flex items-center gap-3">
        <span class="flex-1 h-px bg-cream-400" />
        <span class="text-sm text-deepblue-300">o</span>
        <span class="flex-1 h-px bg-cream-400" />
      </div>

      <button
        type="button"
        class="w-full py-2.5 rounded-lg font-medium border border-deepblue-200 text-deepblue hover:bg-cream-100 transition flex items-center justify-center gap-2"
        :disabled="loading"
        @click="handleGoogle"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continuar con Google
      </button>

      <p class="mt-6 text-center text-sm text-deepblue-300">
        <template v-if="isRegister">
          ¿Ya tienes cuenta?
          <RouterLink to="/login" class="text-terracota font-medium hover:underline">Iniciar sesión</RouterLink>
        </template>
        <template v-else>
          ¿Primera vez?
          <RouterLink to="/register" class="text-terracota font-medium hover:underline">Regístrate</RouterLink>
        </template>
      </p>

      <p class="mt-4 text-center">
        <RouterLink to="/" class="text-deepblue-300 hover:text-terracota text-sm">← Volver al inicio</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { logAuthEvent } from '@/services/authLog'
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateCheckboxes,
} from '@/lib/validation'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isRegister = computed(() => route.name === 'register' || route.path === '/register')

const loading = ref(false)
const authError = ref('')

const loginForm = ref({ email: '', password: '' })
const registerForm = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  terms: false,
  privacy: false,
})

const errors = ref({
  loginEmail: '',
  loginPassword: '',
  regName: '',
  regEmail: '',
  regPhone: '',
  regPassword: '',
  regCheckboxes: '',
})

const errorMessages = {
  EMAIL_REQUIRED: 'El email es obligatorio.',
  EMAIL_INVALID: 'Introduce un email válido.',
  EMAIL_TOO_LONG: 'El email es demasiado largo.',
  PASSWORD_REQUIRED: 'La contraseña es obligatoria.',
  WEAK_PASSWORD: 'Mín. 8 caracteres, una mayúscula, una minúscula y un número.',
  PASSWORD_TOO_LONG: 'La contraseña es demasiado larga.',
  PHONE_REQUIRED: 'El teléfono es obligatorio.',
  PHONE_INVALID: 'Formato español: +34 6XX o 7XX seguido de 8 dígitos.',
  NAME_REQUIRED: 'El nombre es obligatorio.',
  NAME_TOO_SHORT: 'El nombre debe tener al menos 2 caracteres.',
  NAME_TOO_LONG: 'El nombre no puede superar 100 caracteres.',
  NAME_INVALID: 'Solo letras, espacios, guiones y apóstrofes.',
  CHECKBOXES_REQUIRED: 'Debes aceptar términos y privacidad.',
  TERMS_REQUIRED: 'Debes aceptar los términos y condiciones.',
  PRIVACY_REQUIRED: 'Debes aceptar la política de privacidad.',
}

function msg(code) {
  return errorMessages[code] || code
}

watch([loginForm, registerForm], () => { authError.value = '' }, { deep: true })

function redirectAfterAuth() {
  const redirect = route.query.redirect
  if (redirect && redirect.startsWith('/')) {
    router.push(redirect)
  } else {
    router.push({ name: 'dashboard' })
  }
}

async function handleLogin() {
  authError.value = ''
  errors.value = { loginEmail: '', loginPassword: '' }

  const e = validateEmail(loginForm.value.email)
  if (!e.valid) { errors.value.loginEmail = msg(e.error); return }
  const p = validatePassword(loginForm.value.password)
  if (!p.valid) { errors.value.loginPassword = msg(p.error); return }

  loading.value = true
  try {
    await authStore.signInWithEmail(loginForm.value.email.trim(), loginForm.value.password)
    redirectAfterAuth()
  } catch (err) {
    authError.value = err.message || 'Error al iniciar sesión.'
    logAuthEvent('failed_login', { email: loginForm.value.email?.trim() || null, metadata: { code: err.code } })
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  authError.value = ''
  errors.value = { regName: '', regEmail: '', regPhone: '', regPassword: '', regCheckboxes: '' }

  const nameR = validateName(registerForm.value.name)
  if (!nameR.valid) { errors.value.regName = msg(nameR.error); return }
  const emailR = validateEmail(registerForm.value.email)
  if (!emailR.valid) { errors.value.regEmail = msg(emailR.error); return }
  const phoneR = validatePhone(registerForm.value.phone)
  if (!phoneR.valid) { errors.value.regPhone = msg(phoneR.error); return }
  const passR = validatePassword(registerForm.value.password)
  if (!passR.valid) { errors.value.regPassword = msg(passR.error); return }
  const checkR = validateCheckboxes({
    terms: registerForm.value.terms,
    privacy: registerForm.value.privacy,
  })
  if (!checkR.valid) { errors.value.regCheckboxes = msg(checkR.error); return }

  loading.value = true
  try {
    await authStore.signUpWithEmail(
      registerForm.value.email.trim(),
      registerForm.value.password,
      {
        name: registerForm.value.name.trim(),
        phone: registerForm.value.phone.replace(/\s/g, ''),
      }
    )
    redirectAfterAuth()
  } catch (err) {
    authError.value = err.message || 'Error al crear la cuenta.'
  } finally {
    loading.value = false
  }
}

async function handleGoogle() {
  authError.value = ''
  loading.value = true
  try {
    await authStore.signInWithGoogle()
  } catch (err) {
    authError.value = err.message || 'Error con Google.'
    logAuthEvent('oauth_error', { metadata: { message: err.message, code: err.code } })
  } finally {
    loading.value = false
  }
}
</script>
