<template>
  <div class="admin-page min-h-screen bg-gradient-to-b from-off-white via-cream to-warm-sand/20 pt-16">
    <AppHeader :is-public="false" />

    <div class="container-juntas py-8">
      <header class="mb-8">
        <h1 class="font-display text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
          Dashboard Admin
        </h1>
        <p class="text-warm-grey mt-1 font-body">
          Verificación de usuarios y gestión de reportes
        </p>
      </header>

      <nav class="flex gap-1 p-1 rounded-xl bg-warm-sand/40 border border-warm-sand mb-8 max-w-md">
        <button
          type="button"
          :class="[
            'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
            activeTab === 'verification'
              ? 'bg-soft-terracota text-off-white shadow-soft'
              : 'text-charcoal hover:bg-warm-sand/60',
          ]"
          @click="activeTab = 'verification'"
        >
          Verificación
        </button>
        <button
          type="button"
          :class="[
            'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
            activeTab === 'reports'
              ? 'bg-soft-terracota text-off-white shadow-soft'
              : 'text-charcoal hover:bg-warm-sand/60',
          ]"
          @click="activeTab = 'reports'"
        >
          Reportes
        </button>
      </nav>

      <AdminVerificationSection v-show="activeTab === 'verification'" />
      <AdminReportsSection v-show="activeTab === 'reports'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AdminVerificationSection from '@/views/Admin/components/AdminVerificationSection.vue'
import AdminReportsSection from '@/views/Admin/components/AdminReportsSection.vue'

const activeTab = ref('verification')
</script>
