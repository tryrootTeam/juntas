<template>
  <section
    id="hero"
    class="pt-28 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-cream-100 via-cream-200 to-cream-300"
  >
    <div class="max-w-5xl mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
      <div>
        <p class="inline-flex items-center gap-2 rounded-full bg-cream-50 border border-cream-400 px-3 py-1 text-xs font-medium text-deepblue/80 mb-4">
          <span class="h-2 w-2 rounded-full bg-terracota"></span>
          Vivienda compartida segura para mujeres en Valencia
        </p>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-deepblue mb-4">
          Encontrar hogar juntas es más fácil
        </h1>
        <p class="text-base md:text-lg text-deepblue/80 max-w-xl mb-6">
          Juntas te ayuda a encontrar compañeras de piso compatibles, verificadas y con tus mismos valores, para que
          puedas compartir hogar en Valencia con tranquilidad.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <RouterLink
            to="/register"
            class="inline-flex items-center justify-center rounded-full bg-terracota px-6 py-3 text-sm md:text-base font-semibold text-cream-50 shadow-sm hover:bg-terracota-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2 focus-visible:ring-offset-cream transition"
          >
            Crear mi perfil gratis
          </RouterLink>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full border border-deepblue/20 bg-cream px-4 py-3 text-sm md:text-base font-medium text-deepblue/80 hover:border-deepblue/40 hover:bg-cream-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deepblue focus-visible:ring-offset-2 focus-visible:ring-offset-cream transition"
            @click="scrollToSection('como-funciona')"
          >
            Ver cómo funciona
          </button>
        </div>
        <p class="mt-3 text-xs text-deepblue/60">
          Es gratis crear tu perfil. Sólo pagas cuando encuentras tu hogar.
        </p>
      </div>

      <div class="relative">
        <div class="absolute -inset-6 rounded-3xl bg-sage-100/70 blur-2xl"></div>
        <div class="relative rounded-3xl bg-cream-50 border border-cream-400 p-5 shadow-sm flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-deepblue/60">Tu match ideal</p>
              <p class="text-base font-semibold text-deepblue">Compañera compatible</p>
            </div>
            <span class="inline-flex items-center rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
              95% afinidad
            </span>
          </div>
          <ul class="space-y-1 text-xs text-deepblue/80">
            <li>• Misma zona preferida en Valencia</li>
            <li>• Hábitos similares (no fumadora, teletrabajo, etc.)</li>
            <li>• Presupuesto compatible</li>
          </ul>
          <div class="mt-2 flex items-center justify-between border-t border-cream-300 pt-3">
            <p class="text-xs text-deepblue/60">
              Verifica tu identidad y conecta con mujeres reales.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSmoothScroll } from '@/composables/useSmoothScroll'

const { scrollToSection } = useSmoothScroll()
</script>

