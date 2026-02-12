<template>
  <div class="min-h-screen p-8 bg-cream">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-deepblue">Dashboard</h1>
      <p class="text-deepblue-300">Bienvenue sur Juntas</p>
    </header>

    <div
      v-if="showVerificationNotification"
      class="mb-6 p-4 rounded-xl border border-sage-200 bg-sage-50 text-deepblue flex items-start gap-3"
      role="status"
    >
      <span class="flex-shrink-0 text-2xl" aria-hidden="true">✓</span>
      <div class="flex-1 min-w-0">
        <p class="font-medium text-deepblue">Tu perfil ha sido creado correctamente.</p>
        <p class="text-sm text-deepblue-300 mt-0.5">Será verificado en las próximas 24 horas.</p>
      </div>
      <button
        type="button"
        class="flex-shrink-0 p-1.5 text-deepblue-300 hover:text-deepblue rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota"
        aria-label="Cerrar notificación"
        @click="notificationDismissed = true"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>

    <div class="bg-white rounded-xl shadow p-6 border border-cream-400">
      <p class="text-deepblue-300">Dashboard placeholder - à développer (Phase 2)</p>
      <button
        @click="handleSignOut"
        class="mt-4 px-4 py-2 text-terracota hover:bg-terracota-50 rounded transition"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

const notificationDismissed = ref(false)

const showVerificationNotification = computed(() => {
  if (notificationDismissed.value) return false
  const p = userStore.profile
  return p?.profile_completed && p?.identity_status === 'under_review'
})

onMounted(async () => {
  const uid = authStore.user?.id
  if (uid && !userStore.profile) await userStore.fetchProfile(uid)
})

async function handleSignOut() {
  await authStore.signOut()
  router.push('/')
}
</script>
