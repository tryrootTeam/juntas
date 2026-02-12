<template>
  <section
    class="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
    aria-labelledby="details-heading"
  >
    <h2 id="details-heading" class="text-xl font-bold text-deepblue mb-4">
      Detalles del perfil
    </h2>
    <dl class="grid gap-4 sm:grid-cols-2">
      <template v-if="profile?.occupation">
        <dt class="text-deepblue-300 font-medium">Ocupación</dt>
        <dd class="text-deepblue">{{ profile.occupation }}</dd>
      </template>
      <template v-if="profile?.preferred_zones?.length">
        <dt class="text-deepblue-300 font-medium">Zonas preferidas</dt>
        <dd class="text-deepblue">{{ profile.preferred_zones.join(', ') }}</dd>
      </template>
      <template v-if="profile?.monthly_budget != null">
        <dt class="text-deepblue-300 font-medium">Presupuesto mensual</dt>
        <dd class="text-deepblue">{{ profile.monthly_budget }} €</dd>
      </template>
      <template v-if="profile?.work_schedule">
        <dt class="text-deepblue-300 font-medium">Horario de trabajo</dt>
        <dd class="text-deepblue">{{ workScheduleLabel }}</dd>
      </template>
      <template v-if="profile?.works_from_home">
        <dt class="text-deepblue-300 font-medium">Teletrabajo</dt>
        <dd class="text-deepblue">{{ worksFromHomeLabel }}</dd>
      </template>
      <template v-if="profile?.time_at_home">
        <dt class="text-deepblue-300 font-medium">Tiempo en casa</dt>
        <dd class="text-deepblue">{{ timeAtHomeLabel }}</dd>
      </template>
      <template v-if="profile?.cleanliness_level">
        <dt class="text-deepblue-300 font-medium">Orden</dt>
        <dd class="text-deepblue">{{ cleanlinessLabel }}</dd>
      </template>
      <template v-if="profile?.noise_level">
        <dt class="text-deepblue-300 font-medium">Nivel de ruido</dt>
        <dd class="text-deepblue">{{ noiseLabel }}</dd>
      </template>
      <template v-if="profile?.is_smoker">
        <dt class="text-deepblue-300 font-medium">Fumadora</dt>
        <dd class="text-deepblue">{{ profile.is_smoker === 'no' ? 'No' : profile.is_smoker === 'yes' ? 'Sí' : profile.is_smoker }}</dd>
      </template>
      <template v-if="profile?.has_children">
        <dt class="text-deepblue-300 font-medium">Hijos</dt>
        <dd class="text-deepblue">
          Sí
          <span v-if="profile.children_ages?.length"> ({{ profile.children_ages.join(', ') }} años)</span>
          <span v-if="profile.custody_type"> · {{ custodyLabel }}</span>
        </dd>
      </template>
      <template v-else-if="profile?.has_children === false">
        <dt class="text-deepblue-300 font-medium">Hijos</dt>
        <dd class="text-deepblue">No</dd>
      </template>
      <template v-if="profile?.has_pets != null">
        <dt class="text-deepblue-300 font-medium">Mascotas</dt>
        <dd class="text-deepblue">{{ profile.has_pets ? (profile.pet_type || 'Sí') : 'No' }}</dd>
      </template>
      <template v-if="profile?.preferred_roommates_count != null">
        <dt class="text-deepblue-300 font-medium">Compañeras de piso</dt>
        <dd class="text-deepblue">{{ profile.preferred_roommates_count }}</dd>
      </template>
      <template v-if="profile?.preferred_age">
        <dt class="text-deepblue-300 font-medium">Edad preferida</dt>
        <dd class="text-deepblue">{{ preferredAgeLabel }}</dd>
      </template>
      <template v-if="profile?.children_preference">
        <dt class="text-deepblue-300 font-medium">Preferencia hijos</dt>
        <dd class="text-deepblue">{{ childrenPreferenceLabel }}</dd>
      </template>
    </dl>
    <p v-if="profile?.bio" class="mt-4 text-deepblue-300 border-t border-cream-400 pt-4">
      {{ profile.bio }}
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: { type: Object, default: null },
})

const labels = {
  work_schedule: { morning: 'Mañanas', afternoon: 'Tardes', night: 'Noches', flexible: 'Flexible' },
  works_from_home: { office: 'En oficina', hybrid: 'Híbrido', home: 'En casa' },
  time_at_home: { low: 'Poco', medium: 'Medio', high: 'Mucho' },
  cleanliness_level: { very_organized: 'Muy ordenada', normal: 'Normal', relaxed: 'Relajada' },
  noise_level: { quiet: 'Tranquila', moderate: 'Moderado', lively: 'Animado' },
  custody_type: { shared_50: 'Compartida 50%', full: 'Completa', other: 'Otro' },
  preferred_age: { similar: 'Similar', any: 'Cualquiera' },
  children_preference: { with_children: 'Con hijos', without: 'Sin hijos', any: 'Indiferente' },
}

const workScheduleLabel = computed(() =>
  labels.work_schedule[props.profile?.work_schedule] ?? props.profile?.work_schedule
)
const worksFromHomeLabel = computed(() =>
  labels.works_from_home[props.profile?.works_from_home] ?? props.profile?.works_from_home
)
const timeAtHomeLabel = computed(() =>
  labels.time_at_home[props.profile?.time_at_home] ?? props.profile?.time_at_home
)
const cleanlinessLabel = computed(() =>
  labels.cleanliness_level[props.profile?.cleanliness_level] ?? props.profile?.cleanliness_level
)
const noiseLabel = computed(() =>
  labels.noise_level[props.profile?.noise_level] ?? props.profile?.noise_level
)
const custodyLabel = computed(() =>
  labels.custody_type[props.profile?.custody_type] ?? props.profile?.custody_type
)
const preferredAgeLabel = computed(() =>
  labels.preferred_age[props.profile?.preferred_age] ?? props.profile?.preferred_age
)
const childrenPreferenceLabel = computed(() =>
  labels.children_preference[props.profile?.children_preference] ?? props.profile?.children_preference
)
</script>
