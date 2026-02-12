<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-sage-100 via-sage-50 to-deep-plum"
    role="main"
    aria-live="polite"
    aria-busy="loading"
  >
    <p v-if="loading" class="text-charcoal">Conectando…</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>
    <RouterLink v-if="error" to="/login" class="mt-4 text-soft-terracota hover:underline">Volver a iniciar sesión</RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    if (!authStore.initialized) {
      await authStore.initialize()
    }
    await new Promise((r) => setTimeout(r, 500))
    if (authStore.isAuthenticated) {
      const redirect = route.query.redirect
      if (redirect && typeof redirect === 'string' && redirect.startsWith('/')) {
        router.replace(redirect)
      } else {
        router.replace({ name: 'dashboard' })
      }
      return
    }
    error.value = 'No se pudo completar el inicio de sesión.'
  } catch (e) {
    error.value = e.message || 'Error al conectar.'
  } finally {
    loading.value = false
  }
})
</script>
