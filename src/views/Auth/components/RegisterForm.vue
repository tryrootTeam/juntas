<template>
  <div id="panel-register" role="tabpanel" aria-labelledby="tab-register">
    <form class="space-y-4" @submit.prevent="handleSubmit" novalidate>
      <div v-if="authError" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
        {{ authError }}
      </div>

      <div>
        <label for="reg-name" class="block text-sm font-medium text-charcoal mb-1">Nombre</label>
        <input
          id="reg-name"
          v-model="form.name"
          type="text"
          autocomplete="name"
          aria-required="true"
          aria-invalid="!!registerErrors.name"
          :aria-describedby="registerErrors.name ? 'reg-name-error' : undefined"
          class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none"
          :class="{ 'border-red-400': registerErrors.name }"
          placeholder="María García"
          @blur="validateField('name', form.name)"
          @input="validateField('name', form.name)"
        />
        <p v-if="registerErrors.name" id="reg-name-error" class="mt-1 text-sm text-red-600" role="alert">
          {{ registerErrors.name }}
        </p>
      </div>

      <div>
        <label for="reg-email" class="block text-sm font-medium text-charcoal mb-1">Email</label>
        <input
          id="reg-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          aria-required="true"
          aria-invalid="!!registerErrors.email"
          :aria-describedby="registerErrors.email ? 'reg-email-error' : undefined"
          class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none"
          :class="{ 'border-red-400': registerErrors.email }"
          placeholder="tu@email.com"
          @blur="validateField('email', form.email)"
          @input="validateField('email', form.email)"
        />
        <p v-if="registerErrors.email" id="reg-email-error" class="mt-1 text-sm text-red-600" role="alert">
          {{ registerErrors.email }}
        </p>
      </div>

      <div>
        <label for="reg-phone" class="block text-sm font-medium text-charcoal mb-1">Teléfono</label>
        <input
          id="reg-phone"
          v-model="form.phone"
          type="tel"
          autocomplete="tel"
          aria-required="true"
          aria-invalid="!!registerErrors.phone"
          :aria-describedby="registerErrors.phone ? 'reg-phone-error' : undefined"
          class="w-full px-3 py-2 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none"
          :class="{ 'border-red-400': registerErrors.phone }"
          placeholder="+34600123456"
          @blur="validateField('phone', form.phone)"
          @input="validateField('phone', form.phone)"
        />
        <p v-if="registerErrors.phone" id="reg-phone-error" class="mt-1 text-sm text-red-600" role="alert">
          {{ registerErrors.phone }}
        </p>
      </div>

      <div>
        <label for="reg-password" class="block text-sm font-medium text-charcoal mb-1">Contraseña</label>
        <div class="relative">
          <input
            id="reg-password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            aria-required="true"
            aria-invalid="!!registerErrors.password"
            :aria-describedby="passwordStrengthId"
            class="w-full px-3 py-2 pr-10 border rounded-lg border-warm-sand focus:ring-2 focus:ring-soft-terracota focus:border-soft-terracota focus:outline-none"
            :class="{ 'border-red-400': registerErrors.password }"
            placeholder="Mín. 8 caracteres, mayúscula, minúscula y número"
            @blur="validateField('password', form.password)"
            @input="validateField('password', form.password)"
          />
          <button
            type="button"
            :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-warm-grey hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracota rounded"
            @click="showPassword = !showPassword"
          >
            <span v-if="showPassword" aria-hidden="true">🙈</span>
            <span v-else aria-hidden="true">👁</span>
          </button>
        </div>
        <div :id="passwordStrengthId" class="mt-1 flex items-center gap-2" role="status" aria-live="polite">
          <span class="text-xs text-warm-grey">Fortaleza:</span>
          <span
            class="text-xs font-medium"
            :class="{
              'text-red-600': strength === 'weak',
              'text-amber-600': strength === 'medium',
              'text-green-600': strength === 'strong',
            }"
          >
            {{ strengthLabel }}
          </span>
          <span class="flex gap-0.5">
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="strengthBarClass(0)"
            />
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="strengthBarClass(1)"
            />
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="strengthBarClass(2)"
            />
          </span>
        </div>
        <p v-if="registerErrors.password" class="mt-1 text-sm text-red-600" role="alert">
          {{ registerErrors.password }}
        </p>
      </div>

      <div class="space-y-2">
        <label class="flex items-start gap-2 cursor-pointer">
          <input
            v-model="form.gender"
            type="checkbox"
            class="mt-1 rounded border-warm-sand text-soft-terracota focus:ring-soft-terracota focus:outline-none"
            aria-describedby="gender-note"
          />
          <span id="gender-note" class="text-sm text-charcoal">
            Declaro que me identifico con el género que mejor me representa (espacio inclusivo).
          </span>
        </label>
        <label class="flex items-start gap-2 cursor-pointer">
          <input
            v-model="form.terms"
            type="checkbox"
            class="mt-1 rounded border-warm-sand text-soft-terracota focus:ring-soft-terracota focus:outline-none"
            aria-required="true"
            aria-invalid="!!registerErrors.checkboxes"
          />
          <span class="text-sm text-charcoal">
            Acepto los <a href="#" class="text-soft-terracota underline">términos y condiciones</a>
          </span>
        </label>
        <label class="flex items-start gap-2 cursor-pointer">
          <input
            v-model="form.privacy"
            type="checkbox"
            class="mt-1 rounded border-warm-sand text-soft-terracota focus:ring-soft-terracota focus:outline-none"
            aria-required="true"
            aria-invalid="!!registerErrors.checkboxes"
          />
          <span class="text-sm text-charcoal">
            Acepto la <a href="#" class="text-soft-terracota underline">política de privacidad</a>
          </span>
        </label>
        <p v-if="registerErrors.checkboxes" class="text-sm text-red-600" role="alert">
          {{ registerErrors.checkboxes }}
        </p>
      </div>

      <p class="text-xs text-warm-grey">
        Juntas es un espacio seguro e inclusivo. Respetamos todas las identidades.
      </p>

      <button
        type="submit"
        class="btn-primary w-full disabled:opacity-60"
        :disabled="loading"
        :aria-busy="loading"
      >
        {{ loading ? 'Creando cuenta…' : 'Crear cuenta' }}
      </button>
    </form>

    <div class="mt-6 flex items-center gap-3">
      <span class="flex-1 h-px bg-warm-sand" />
      <span class="text-sm text-warm-grey">o</span>
      <span class="flex-1 h-px bg-warm-sand" />
    </div>

    <button
      type="button"
      class="btn-secondary w-full mt-4 disabled:opacity-60"
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
import { ref, computed, watch } from 'vue'
import { useFormValidation } from '@/composables/useFormValidation'
import { getPasswordStrength } from '@/lib/validation'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['success', 'google'])

const authStore = useAuthStore()
const { registerErrors, validateRegisterField, validateRegister } = useFormValidation()

const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  gender: false,
  terms: false,
  privacy: false,
})
const showPassword = ref(false)
const loading = ref(false)
const authError = ref('')

const passwordStrengthId = 'reg-password-strength'
const strength = computed(() => getPasswordStrength(form.value.password))
const strengthLabel = computed(() => {
  if (strength.value === 'weak') return 'Débil'
  if (strength.value === 'medium') return 'Media'
  return 'Fuerte'
})

function strengthBarClass(index) {
  const level = { weak: 0, medium: 1, strong: 2 }[strength.value] ?? 0
  if (index > level) return 'bg-warm-sand'
  if (strength.value === 'weak') return 'bg-red-500'
  if (strength.value === 'medium') return 'bg-amber-500'
  return 'bg-green-500'
}

watch([form], () => { authError.value = '' }, { deep: true })

function validateField(field, value) {
  if (field === 'checkboxes') {
    validateRegisterField('checkboxes', null, { terms: form.value.terms, privacy: form.value.privacy })
    return
  }
  validateRegisterField(field, value, { terms: form.value.terms, privacy: form.value.privacy })
}

async function handleSubmit() {
  authError.value = ''
  if (!validateRegister(form.value)) return

  loading.value = true
  try {
    await authStore.signUpWithEmail(
      form.value.email.trim(),
      form.value.password,
      {
        name: form.value.name.trim(),
        phone: form.value.phone.replace(/\s/g, ''),
      }
    )
    emit('success')
  } catch (err) {
    authError.value = err.message || 'Error al crear la cuenta.'
  } finally {
    loading.value = false
  }
}

defineExpose({ setAuthError: (msg) => { authError.value = msg } })
</script>
