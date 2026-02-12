<template>
  <div class="empty-state flex flex-col items-center justify-center flex-1 bg-cream-100 text-center px-4">
    <div
      class="w-20 h-20 rounded-full bg-cream-300 flex items-center justify-center mx-auto mb-4 text-deepblue-300 text-4xl"
      aria-hidden="true"
    >
      💬
    </div>
    <h3 class="text-lg font-semibold text-deepblue mb-1">Selecciona una conversación</h3>
    <p class="text-deepblue-300 max-w-sm mx-auto">
      Elige una conversación en la lista o inicia una desde el dashboard para empezar a chatear.
    </p>
    <RouterLink
      to="/dashboard"
      class="mt-6 inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-medium bg-sage text-white hover:bg-sage-600 transition"
    >
      Ir al dashboard
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
