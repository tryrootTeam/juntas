<template>
  <div class="min-h-screen bg-cream">
    <AppHeader :is-public="true" />

    <main class="pt-20 md:pt-24">
      <HeroSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import HowItWorksSection from '@/components/landing/HowItWorksSection.vue'
import TestimonialsSection from '@/components/landing/TestimonialsSection.vue'
import CTASection from '@/components/landing/CTASection.vue'

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.title = 'Juntas - Vivienda compartida para mujeres en Valencia'
  }
})
</script>

