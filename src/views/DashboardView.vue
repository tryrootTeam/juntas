<template>
  <div class="min-h-screen p-8 bg-cream">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-deepblue">Dashboard</h1>
      <p class="text-deepblue-300">Bienvenue sur Juntas</p>
    </header>
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
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function handleSignOut() {
  await authStore.signOut()
  router.push('/')
}
</script>
