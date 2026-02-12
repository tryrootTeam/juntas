<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-cream" role="main" aria-label="Nueva contraseña">
    <div class="w-full max-w-md bg-off-white rounded-xl shadow-lg p-8 border border-warm-sand">
      <h2 class="font-display text-2xl font-bold text-charcoal mb-2">
        Nueva contraseña
      </h2>
      <p class="text-sm text-warm-grey mb-6">
        Introduce tu nueva contraseña (mín. 8 caracteres, mayúscula, minúscula y número).
      </p>

      <div
        v-if="authError"
        class="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
        role="alert"
      >
        {{ authError }}
      </div>

      <form v-if="!success" class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label for="new-password" class="block text-sm font-medium text-charcoal mb-1">Nueva contraseña</label>
          <input
            id="new-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota"
            :class="{ 'border-red-400': errors.password }"
            placeholder="••••••••"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        </div>
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-charcoal mb-1">Confirmar contraseña</label>
          <input
            id="confirm-password"
            v-model="confirm"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota"
            :class="{ 'border-red-400': errors.confirm }"
            placeholder="••••••••"
          />
          <p v-if="errors.confirm" class="mt-1 text-sm text-red-600">{{ errors.confirm }}</p>
        </div>
        <label class="flex items-center gap-2 cursor-pointer">
          <input v-model="showPassword" type="checkbox" class="rounded border-warm-sand text-soft-terracota focus:ring-soft-terracota" />
          <span class="text-sm text-charcoal">Mostrar contraseña</span>
        </label>
        <button
          type="submit"
          class="btn-primary w-full"
          :disabled="loading"
        >
          {{ loading ? 'Guardando…' : 'Guardar contraseña' }}
        </button>
      </form>

      <div v-else class="p-3 rounded-lg bg-sage-green/15 border border-sage-green/30 text-sage-green text-sm" role="status">
        Contraseña actualizada. Redirigiendo…
      </div>

      <p class="mt-6 text-center text-sm text-warm-grey">
        <RouterLink to="/login" class="text-soft-terracota font-medium hover:underline">Iniciar sesión</RouterLink>
      </p>
      <p class="mt-4 text-center">
        <RouterLink to="/" class="text-warm-grey hover:text-soft-terracota text-sm">← Volver al inicio</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { validatePassword } from '@/lib/validation'

const router = useRouter()
const authStore = useAuthStore()
const password = ref('')
const confirm = ref('')
const showPassword = ref(false)
const errors = ref({ password: '', confirm: '' })
const authError = ref('')
const loading = ref(false)
const success = ref(false)
const ready = ref(false)

const messages = {
  PASSWORD_REQUIRED: 'La contraseña es obligatoria.',
  WEAK_PASSWORD: 'Mín. 8 caracteres, una mayúscula, una minúscula y un número.',
  PASSWORD_TOO_LONG: 'La contraseña es demasiado larga.',
  CONFIRM_MISMATCH: 'Las contraseñas no coinciden.',
}

function msg(code) {
  return messages[code] || code
}

onMounted(async () => {
  if (!authStore.initialized) await authStore.initialize()
  ready.value = true
})

async function handleSubmit() {
  errors.value = { password: '', confirm: '' }
  authError.value = ''

  const p = validatePassword(password.value)
  if (!p.valid) {
    errors.value.password = msg(p.error)
    return
  }
  if (password.value !== confirm.value) {
    errors.value.confirm = msg('CONFIRM_MISMATCH')
    return
  }

  loading.value = true
  try {
    await authStore.updatePassword(password.value)
    success.value = true
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1500)
  } catch (err) {
    authError.value = err.message || 'Error al actualizar la contraseña.'
  } finally {
    loading.value = false
  }
}
</script>
