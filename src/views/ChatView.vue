<template>
  <div class="min-h-screen bg-cream pt-16">
    <AppHeader :is-public="false" />
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <div class="bg-white rounded-2xl p-8 shadow-lg text-center">
        <h1 class="text-xl font-bold text-deepblue mb-2">Conversación</h1>
        <p class="text-deepblue-300 mb-6">La vista de chat estará disponible próximamente.</p>
        <RouterLink to="/dashboard" class="text-sage hover:text-deepblue font-medium">
          Volver al dashboard
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
</script>
