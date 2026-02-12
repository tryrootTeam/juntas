<template>
  <div
    :class="bannerClasses"
    class="rounded-xl border p-4 flex items-start gap-3"
    role="status"
  >
    <span class="flex-shrink-0 text-2xl" aria-hidden="true">{{ icon }}</span>
    <div class="flex-1 min-w-0">
      <p class="font-medium">{{ title }}</p>
      <p v-if="message" class="text-sm mt-0.5 opacity-90">{{ message }}</p>
      <RouterLink
        v-if="linkTo"
        :to="linkTo"
        class="inline-block mt-2 text-sm font-semibold underline hover:no-underline"
      >
        {{ linkLabel }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  status: {
    type: String,
    default: 'pending',
    validator: (v) => ['pending', 'under_review', 'rejected', 'verified'].includes(v),
  },
})

const config = {
  verified: {
    bg: 'bg-sage-green/10',
    border: 'border-sage-green/30',
    text: 'text-sage-green',
    icon: '✓',
    title: 'Verificada',
    message: 'Tu identidad está verificada. Tienes acceso a todas las funciones.',
    linkTo: null,
    linkLabel: '',
  },
  pending: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-900',
    icon: '⏳',
    title: 'Verificación pendiente',
    message: 'Completa la verificación de identidad para acceder a todas las funciones.',
    linkTo: '/onboarding',
    linkLabel: 'Ir al onboarding →',
  },
  under_review: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-900',
    icon: '📋',
    title: 'En revisión',
    message: 'Tu documentación está siendo revisada. Te avisaremos en las próximas 24 horas.',
    linkTo: null,
    linkLabel: '',
  },
  rejected: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    icon: '⚠️',
    title: 'Verificación rechazada',
    message: 'Revisa el motivo y vuelve a enviar tu documentación.',
    linkTo: '/onboarding',
    linkLabel: 'Reintentar verificación →',
  },
}

const bannerClasses = computed(() => {
  const c = config[props.status] || config.pending
  return [c.bg, c.border, c.text]
})

const icon = computed(() => (config[props.status] || config.pending).icon)
const title = computed(() => (config[props.status] || config.pending).title)
const message = computed(() => (config[props.status] || config.pending).message)
const linkTo = computed(() => (config[props.status] || config.pending).linkTo)
const linkLabel = computed(() => (config[props.status] || config.pending).linkLabel)
</script>
