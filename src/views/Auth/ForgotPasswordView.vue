<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-cream" role="main" aria-label="Recuperar contraseña">
    <div class="w-full max-w-md bg-off-white rounded-xl shadow-lg p-8 border border-warm-sand">
      <h2 class="font-display text-2xl font-bold text-charcoal mb-2">
        ¿Olvidaste tu contraseña?
      </h2>
      <p class="text-sm text-warm-grey mb-6">
        Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <div
        v-if="authError"
        class="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
        role="alert"
      >
        {{ authError }}
      </div>

      <div v-if="sent" class="p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm" role="status">
        Revisa tu correo. Te hemos enviado un enlace para restablecer tu contraseña.
      </div>

      <form v-else class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label for="forgot-email" class="block text-sm font-medium text-charcoal mb-1">Email</label>
          <input
            id="forgot-email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota"
            :class="{ 'border-red-400': error }"
            placeholder="tu@email.com"
          />
          <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
        </div>
        <button
          type="submit"
          class="btn-primary w-full"
          :disabled="loading"
        >
          {{ loading ? 'Enviando…' : 'Enviar enlace' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-warm-grey">
        <RouterLink to="/login" class="text-soft-terracota font-medium hover:underline">Volver a iniciar sesión</RouterLink>
      </p>
      <p class="mt-4 text-center">
        <RouterLink to="/" class="text-warm-grey hover:text-soft-terracota text-sm">← Volver al inicio</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { validateEmail } from '@/lib/validation'
import { getResetPasswordCallbackUrl } from '@/lib/authHelpers'

const authStore = useAuthStore()
const email = ref('')
const error = ref('')
const authError = ref('')
const loading = ref(false)
const sent = ref(false)

const messages = {
  EMAIL_REQUIRED: 'El email es obligatorio.',
  EMAIL_INVALID: 'Introduce un email válido.',
}

function msg(code) {
  return messages[code] || code
}

async function handleSubmit() {
  error.value = ''
  authError.value = ''
  const r = validateEmail(email.value)
  if (!r.valid) {
    error.value = msg(r.error)
    return
  }

  loading.value = true
  try {
    const redirectTo = getResetPasswordCallbackUrl()
    await authStore.resetPasswordForEmail(email.value.trim(), redirectTo)
    sent.value = true
  } catch (err) {
    authError.value = err.message || 'Error al enviar el enlace.'
  } finally {
    loading.value = false
  }
}
</script>
