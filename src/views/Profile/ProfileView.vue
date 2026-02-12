<template>
  <div class="profile-page min-h-screen bg-cream pt-16">
    <AppHeader :is-public="false" />

    <div class="container-juntas py-8">
      <h1 class="font-display text-3xl font-bold text-charcoal mb-8">Mi Perfil</h1>

      <div v-if="userStore.loading && !userStore.profile" class="flex justify-center py-16">
        <p class="text-warm-grey">Cargando perfil...</p>
      </div>

      <template v-else-if="userStore.profile">
        <div v-if="userStore.error" class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {{ userStore.error }}
        </div>

        <div class="space-y-6">
          <ProfilePhotoSection :profile="userStore.profile" @edit="editPhoto" />

          <EditableSection
            title="Información personal"
            :data="personalInfo"
            :editable="true"
            @edit="openModal('personal')"
          />

          <EditableSection
            title="Situación familiar"
            :data="familyInfo"
            :editable="true"
            @edit="openModal('family')"
          />

          <EditableSection
            title="Estilo de vida"
            :data="lifestyleInfo"
            :editable="true"
            @edit="openModal('lifestyle')"
          />

          <SettingsSection />

          <DangerZone @delete="deleteAccount" />
        </div>
      </template>

      <!-- Modales de edición -->
      <EditPersonalModal
        v-if="modalOpen === 'personal'"
        :profile="userStore.profile"
        :loading="saveLoading"
        @close="closeModal"
        @save="savePersonal"
      />
      <EditFamilyModal
        v-if="modalOpen === 'family'"
        :profile="userStore.profile"
        :loading="saveLoading"
        @close="closeModal"
        @save="saveFamily"
      />
      <EditLifestyleModal
        v-if="modalOpen === 'lifestyle'"
        :profile="userStore.profile"
        :loading="saveLoading"
        @close="closeModal"
        @save="saveLifestyle"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ProfilePhotoSection from '@/components/profile/ProfilePhotoSection.vue'
import EditableSection from '@/components/profile/EditableSection.vue'
import SettingsSection from '@/components/profile/SettingsSection.vue'
import DangerZone from '@/components/profile/DangerZone.vue'
import EditPersonalModal from './components/EditPersonalModal.vue'
import EditFamilyModal from './components/EditFamilyModal.vue'
import EditLifestyleModal from './components/EditLifestyleModal.vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

const userStore = useUserStore()
const authStore = useAuthStore()

const modalOpen = ref(null)
const saveLoading = ref(false)

const personalInfo = computed(() => {
  const p = userStore.profile
  if (!p) return []
  const zoneLabels = { Ruzafa: 'Ruzafa', Benimaclet: 'Benimaclet', 'El Carmen': 'El Carmen', 'Poblats Marítims': 'Poblats Marítims', Campanar: 'Campanar', Jesús: 'Jesús', Patraix: 'Patraix', Otros: 'Otros' }
  return [
    { label: 'Nombre', value: p.name || p.display_name },
    { label: 'Edad', value: p.age },
    { label: 'Profesión', value: p.occupation },
    { label: 'Zonas preferidas', value: Array.isArray(p.preferred_zones) ? p.preferred_zones : null },
    { label: 'Presupuesto mensual (€)', value: p.monthly_budget },
    { label: 'Bio', value: p.bio },
  ]
})

const familyInfo = computed(() => {
  const p = userStore.profile
  if (!p) return []
  const custodyLabels = { shared_50: 'Compartida 50/50', shared_other: 'Compartida (otro)', full: 'Completa', none: 'No aplica' }
  const petLabels = { dog: 'Perro', cat: 'Gato', other: 'Otro' }
  return [
    { label: '¿Tienes hijos?', value: p.has_children },
    { label: 'Edades de los hijos', value: Array.isArray(p.children_ages) && p.children_ages.length ? p.children_ages.join(', ') : null },
    { label: 'Tipo de custodia', value: custodyLabels[p.custody_type] || p.custody_type },
    { label: '¿Mascotas?', value: p.has_pets },
    { label: 'Tipo de mascota', value: petLabels[p.pet_type] || p.pet_type },
  ]
})

const lifestyleInfo = computed(() => {
  const p = userStore.profile
  if (!p) return []
  const scheduleLabels = { morning: 'Mañanas', afternoon: 'Tardes', night: 'Noches', flexible: 'Flexible' }
  const wfhLabels = { full: 'Sí, siempre', hybrid: 'Híbrido', no: 'No' }
  const timeLabels = { low: 'Poco', medium: 'Medio', high: 'Mucho' }
  const cleanlinessLabels = { minimal: 'Mínimo', normal: 'Normal', strict: 'Muy ordenado' }
  const noiseLabels = { quiet: 'Tranquilo', moderate: 'Moderado', lively: 'Animado' }
  const smokerLabels = { no: 'No', yes: 'Sí', sometimes: 'A veces' }
  const agePrefLabels = { similar: 'Similar a la mía', any: 'Cualquiera' }
  const childrenPrefLabels = { with_children: 'Con hijos', without_children: 'Sin hijos', no_preference: 'Sin preferencia' }
  return [
    { label: 'Horario de trabajo', value: scheduleLabels[p.work_schedule] || p.work_schedule },
    { label: '¿Trabajas desde casa?', value: wfhLabels[p.works_from_home] || p.works_from_home },
    { label: 'Tiempo en casa', value: timeLabels[p.time_at_home] || p.time_at_home },
    { label: 'Nivel de orden', value: cleanlinessLabels[p.cleanliness_level] || p.cleanliness_level },
    { label: 'Nivel de ruido', value: noiseLabels[p.noise_level] || p.noise_level },
    { label: '¿Fumas?', value: smokerLabels[p.is_smoker] || p.is_smoker },
    { label: 'Compañeros preferidos', value: p.preferred_roommates_count },
    { label: 'Edad preferida', value: agePrefLabels[p.preferred_age] || p.preferred_age },
    { label: 'Preferencia hijos', value: childrenPrefLabels[p.children_preference] || p.children_preference },
  ]
})

function openModal(section) {
  modalOpen.value = section
}

function closeModal() {
  modalOpen.value = null
}

function editPhoto() {
  openModal('personal')
}

async function savePersonal(payload) {
  saveLoading.value = true
  try {
    await userStore.updateProfile(payload)
    closeModal()
  } catch (e) {
    // Error shown by store / could set modal error
  } finally {
    saveLoading.value = false
  }
}

async function saveFamily(payload) {
  saveLoading.value = true
  try {
    await userStore.updateProfile(payload)
    closeModal()
  } catch (e) {
    // Error shown by store
  } finally {
    saveLoading.value = false
  }
}

async function saveLifestyle(payload) {
  saveLoading.value = true
  try {
    await userStore.updateProfile(payload)
    closeModal()
  } catch (e) {
    // Error shown by store
  } finally {
    saveLoading.value = false
  }
}

function deleteAccount() {
  const confirmed = window.confirm(
    '¿Estás segura? Se eliminarán todos tus datos de forma permanente. Para eliminar la cuenta, contacta con soporte (la eliminación desde la app estará disponible próximamente).'
  )
  if (confirmed) {
    // TODO: llamar Edge Function / backend para auth.admin.deleteUser cuando exista
    window.alert('Por ahora, contacta con soporte para solicitar la baja de tu cuenta.')
  }
}

onMounted(async () => {
  const uid = authStore.user?.id
  if (uid && !userStore.profile) await userStore.fetchMyProfile()
})
</script>
