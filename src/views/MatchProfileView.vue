<template>
  <div class="match-profile-page min-h-screen bg-cream pt-16">
    <AppHeader :is-public="false" />

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <router-link
        to="/dashboard"
        class="inline-flex items-center text-sage hover:text-deepblue mb-6 font-medium transition"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver
      </router-link>

      <!-- Loading -->
      <div v-if="store.loading" class="flex items-center justify-center py-16">
        <p class="text-deepblue-300">Cargando perfil...</p>
      </div>

      <!-- Error -->
      <div v-else-if="store.error" class="bg-white rounded-2xl p-8 shadow-lg">
        <p class="text-terracota font-medium mb-4">{{ store.error }}</p>
        <router-link to="/dashboard" class="text-sage hover:text-deepblue font-medium">
          Volver al dashboard
        </router-link>
      </div>

      <!-- Perfil no disponible -->
      <div v-else-if="!store.profile" class="bg-white rounded-2xl p-8 shadow-lg">
        <p class="text-deepblue-300 mb-4">Este perfil no está disponible (verificación o perfil incompleto).</p>
        <router-link to="/dashboard" class="text-sage hover:text-deepblue font-medium">
          Volver al dashboard
        </router-link>
      </div>

      <!-- Contenido del perfil -->
      <template v-else>
        <div class="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <div class="flex flex-col md:flex-row gap-8">
            <div class="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-sage to-deepblue flex items-center justify-center text-white text-6xl font-bold flex-shrink-0 mx-auto md:mx-0">
              {{ (store.profile.name || store.profile.display_name || '?')[0] }}
            </div>
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-3 mb-3">
                <h1 class="text-3xl md:text-4xl font-bold text-deepblue">
                  {{ store.profile.name || store.profile.display_name }}{{ store.profile.age != null ? `, ${store.profile.age}` : '' }}
                </h1>
                <span class="px-4 py-1.5 bg-sage text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Verificada
                </span>
              </div>
              <p class="text-deepblue-300 text-lg mb-4">
                {{ store.profile.occupation || '—' }}
                <span v-if="store.profile.preferred_zones?.length"> • {{ store.profile.preferred_zones[0] }}</span>
              </p>
              <div class="flex flex-wrap gap-2">
                <span v-if="store.profile.has_children" class="tag px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Con hijos<span v-if="store.profile.children_ages?.length"> ({{ store.profile.children_ages.join(', ') }} años)</span>
                </span>
                <span v-if="store.profile.work_schedule" class="tag px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {{ workScheduleLabel }}
                </span>
                <span v-if="store.profile.cleanliness_level" class="tag px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {{ cleanlinessLabel }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <CompatibilitySection
          v-if="store.compatibility"
          :score="store.compatibility.score"
          :breakdown="store.compatibility.breakdown"
          class="mb-6"
        />

        <ProfileDetailsSection :profile="store.profile" class="mb-6" />

        <WhyCompatibleSection :reasons="store.compatibilityReasons" class="mb-6" />

        <div class="sticky bottom-6 bg-white p-5 rounded-xl shadow-2xl flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            @click="pass"
            class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Pasar
          </button>
          <button
            type="button"
            @click="startConversation"
            :disabled="!canSendMessages || loadingAction"
            class="flex-1 sm:flex-2 px-8 py-3 bg-sage text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <span v-if="!loadingAction">Iniciar conversación</span>
            <span v-else>Iniciando...</span>
          </button>
        </div>

        <div v-if="!canSendMessages" class="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
          <strong>⚠️</strong> Completa tu verificación de identidad para poder enviar mensajes.
          <router-link to="/onboarding" class="underline font-medium ml-2">Completar →</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CompatibilitySection from '@/components/matchProfile/CompatibilitySection.vue'
import ProfileDetailsSection from '@/components/matchProfile/ProfileDetailsSection.vue'
import WhyCompatibleSection from '@/components/matchProfile/WhyCompatibleSection.vue'
import { useMatchProfileStore } from '@/stores/matchProfile'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const store = useMatchProfileStore()
const userStore = useUserStore()

const loadingAction = ref(false)

const canSendMessages = computed(() => userStore.profile?.can_send_messages ?? false)

const workScheduleLabel = computed(() => {
  const labels = { morning: 'Mañanas', afternoon: 'Tardes', night: 'Noches', flexible: 'Flexible' }
  return labels[store.profile?.work_schedule] ?? store.profile?.work_schedule ?? ''
})

const cleanlinessLabel = computed(() => {
  const labels = { very_organized: 'Muy ordenada', normal: 'Normal', relaxed: 'Relajada' }
  return labels[store.profile?.cleanliness_level] ?? store.profile?.cleanliness_level ?? ''
})

async function startConversation() {
  if (!canSendMessages.value) return
  loadingAction.value = true
  try {
    const conversationId = await store.startConversation(route.params.id)
    router.push(`/chat/${conversationId}`)
  } catch (err) {
    alert(err?.message || 'Error al iniciar conversación')
  } finally {
    loadingAction.value = false
  }
}

async function pass() {
  try {
    await store.passMatch(route.params.id)
    router.push('/dashboard')
  } catch (err) {
    alert(err?.message || 'Error')
  }
}

onMounted(async () => {
  await store.fetchProfile(route.params.id)
})

onUnmounted(() => {
  store.clearProfile()
})
</script>
