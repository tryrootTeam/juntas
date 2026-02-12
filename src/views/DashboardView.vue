<template>
  <div class="dashboard-page min-h-screen bg-gradient-to-b from-off-white via-cream to-warm-sand/20 pt-16">
    <AppHeader :is-public="false" />

    <div class="container-juntas py-8">
      <header class="mb-8">
        <h1 class="font-display text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
          ¡Hola {{ userName }}!
        </h1>
        <p class="text-warm-grey mt-1 font-body">Tus matches compatibles</p>
      </header>

      <VerificationBanner
        v-if="showVerificationBanner"
        :status="verificationStatus"
        class="mb-6"
      />

      <StatsCards :stats="matchesStore.statsFormatted" class="mb-8" />

      <div class="mb-6 flex flex-wrap gap-2">
        <button
          v-for="opt in filterOptions"
          :key="opt.value"
          type="button"
          :data-testid="`filter-${opt.value}`"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
            activeFilter === opt.value
              ? 'bg-sage-green text-off-white shadow-soft'
              : 'bg-off-white border-2 border-warm-sand text-charcoal hover:border-charcoal/20 hover:bg-warm-sand/30 hover:shadow-soft',
          ]"
          @click="activeFilter = opt.value"
        >
          {{ opt.label }}
        </button>
      </div>

      <div v-if="matchesStore.loading" class="flex justify-center py-16">
        <p class="text-warm-grey font-body">Cargando matches...</p>
      </div>

      <div v-else-if="matchesStore.error" class="card-feature rounded-xl p-6 border border-red-200">
        <p class="text-soft-terracota font-medium">{{ matchesStore.error }}</p>
      </div>

      <div v-else-if="filteredMatches.length === 0" class="card-feature rounded-xl">
        <EmptyState
          :filter="activeFilter"
          @reset-filter="activeFilter = 'all'"
        />
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <MatchCard
          v-for="match in filteredMatches"
          :key="match.id"
          :match="match"
          @view="viewMatch(match)"
          @pass="passMatch(match)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import VerificationBanner from '@/components/dashboard/VerificationBanner.vue'
import StatsCards from '@/components/dashboard/StatsCards.vue'
import MatchCard from '@/components/dashboard/MatchCard.vue'
import EmptyState from '@/components/dashboard/EmptyState.vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useMatchesStore } from '@/stores/matches'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const matchesStore = useMatchesStore()

const activeFilter = ref('all')

const filterOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'with_children', label: 'Con hijos' },
  { value: 'without_children', label: 'Sin hijos' },
  { value: 'high_compat', label: 'Alta compatibilidad 80%+' },
]

const userName = computed(() => {
  const p = userStore.profile
  return p?.name || p?.display_name || 'Usuario'
})

const verificationStatus = computed(() => {
  const s = userStore.profile?.identity_status
  if (s === 'under_review' || s === 'rejected') return s
  return 'pending'
})

const showVerificationBanner = computed(() => {
  const s = userStore.profile?.identity_status
  return s === 'pending' || s === 'under_review' || s === 'rejected'
})

const filteredMatches = computed(() => {
  let list = matchesStore.matches.filter((m) => m.status !== 'passed')
  switch (activeFilter.value) {
    case 'with_children':
      list = list.filter((m) => m.has_children === true)
      break
    case 'without_children':
      list = list.filter((m) => m.has_children !== true)
      break
    case 'high_compat':
      list = list.filter((m) => (m.compatibility_score ?? 0) >= 80)
      break
    default:
      break
  }
  return list
})

function viewMatch(match) {
  router.push({ name: 'match-profile', params: { id: match.id } })
}

async function passMatch(match) {
  const uid = authStore.user?.id
  if (!uid) return
  try {
    await matchesStore.updateMatchStatus(uid, match.id, 'passed', match)
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  const uid = authStore.user?.id
  if (uid && !userStore.profile) await userStore.fetchProfile(uid)
  if (uid && userStore.profile) {
    await matchesStore.fetchMatchCandidates(uid, userStore.profile)
  }
})
</script>
