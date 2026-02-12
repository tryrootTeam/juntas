<template>
  <div class="min-h-screen bg-cream pt-16">
    <AppHeader :is-public="false" />
    <div class="container-juntas py-8">
      <div class="card-feature rounded-2xl p-8 text-center">
        <h1 class="font-display text-xl font-bold text-charcoal mb-2">Conversación</h1>
        <p class="text-warm-grey mb-6">La vista de chat estará disponible próximamente.</p>
        <RouterLink to="/dashboard" class="text-sage-green hover:text-charcoal font-medium">
          Volver al dashboard
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
</script>
