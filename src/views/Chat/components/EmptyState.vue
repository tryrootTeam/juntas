<template>
  <div class="empty-state flex flex-col items-center justify-center flex-1 bg-cream-100 text-center px-4">
    <div
      class="w-20 h-20 rounded-full bg-warm-sand flex items-center justify-center mx-auto mb-4 text-warm-grey text-4xl"
      aria-hidden="true"
    >
      💬
    </div>
    <h3 class="font-display text-lg font-semibold text-charcoal mb-1">Selecciona una conversación</h3>
    <p class="text-warm-grey max-w-sm mx-auto">
      Elige una conversación en la lista o inicia una desde el dashboard para empezar a chatear.
    </p>
    <RouterLink
      to="/dashboard"
      class="btn-primary mt-6"
    >
      Ir al dashboard
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
