<template>
  <section class="bg-white rounded-xl border border-cream-400 overflow-hidden">
    <div class="px-6 py-4 border-b border-cream-400">
      <h3 class="text-lg font-semibold text-deepblue">Ajustes</h3>
    </div>
    <div class="px-6 py-4 space-y-4">
      <p class="text-sm text-deepblue-300">Cambiar tu contraseña</p>
      <form class="space-y-3 max-w-sm" @submit.prevent="handleChangePassword">
        <div v-if="message" class="p-3 rounded-lg text-sm" :class="messageSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'" role="alert">
          {{ message }}
        </div>
        <div>
          <label for="profile-new-password" class="block text-sm font-medium text-deepblue mb-1">Nueva contraseña</label>
          <input
            id="profile-new-password"
            v-model="newPassword"
            type="password"
            autocomplete="new-password"
            class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
            placeholder="Mín. 6 caracteres"
          />
        </div>
        <div>
          <label for="profile-confirm-password" class="block text-sm font-medium text-deepblue mb-1">Confirmar contraseña</label>
          <input
            id="profile-confirm-password"
            v-model="confirmPassword"
            type="password"
            autocomplete="new-password"
            class="w-full px-3 py-2 border rounded-lg border-cream-400 focus:ring-2 focus:ring-terracota focus:border-terracota focus:outline-none"
            placeholder="Repite la contraseña"
          />
          <p v-if="confirmError" class="mt-1 text-sm text-red-600">{{ confirmError }}</p>
        </div>
        <button
          type="submit"
          class="px-4 py-2 rounded-lg font-medium text-white bg-terracota hover:bg-terracota-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota disabled:opacity-60"
          :disabled="loading"
        >
          {{ loading ? 'Guardando…' : 'Cambiar contraseña' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { updatePassword } from '@/services/profile'

const newPassword = ref('')
const confirmPassword = ref('')
const confirmError = ref('')
const message = ref('')
const messageSuccess = ref(false)
const loading = ref(false)

watch([newPassword, confirmPassword], () => {
  confirmError.value = ''
  message.value = ''
})

async function handleChangePassword() {
  confirmError.value = ''
  message.value = ''
  if (newPassword.value.length < 6) {
    message.value = 'La contraseña debe tener al menos 6 caracteres.'
    messageSuccess.value = false
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    confirmError.value = 'Las contraseñas no coinciden.'
    return
  }
  loading.value = true
  try {
    const { error } = await updatePassword(newPassword.value)
    if (error) throw error
    message.value = 'Contraseña actualizada correctamente.'
    messageSuccess.value = true
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (e) {
    message.value = e.message || 'Error al cambiar la contraseña.'
    messageSuccess.value = false
  } finally {
    loading.value = false
  }
}
</script>
