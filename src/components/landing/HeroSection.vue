<template>
  <section
    id="hero"
    class="pt-28 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-off-white via-cream to-warm-sand/30"
  >
    <div class="container-juntas grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
      <div>
        <p class="inline-flex items-center gap-2 rounded-full bg-off-white border border-warm-sand px-3 py-1 text-xs font-medium text-charcoal/80 mb-4">
          <span class="h-2 w-2 rounded-full bg-soft-terracota"></span>
          Vivienda compartida segura para mujeres en Valencia
        </p>
        <h1 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal mb-4">
          Encontrar hogar juntas es más fácil
        </h1>
        <p class="text-base md:text-lg text-warm-grey max-w-xl mb-6">
          Juntas te ayuda a encontrar compañeras de piso compatibles, verificadas y con tus mismos valores, para que
          puedas compartir hogar en Valencia con tranquilidad.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <RouterLink to="/register" class="btn-primary rounded-full px-6 py-3 text-sm md:text-base font-semibold">
            Crear mi perfil gratis
          </RouterLink>
          <button
            type="button"
            class="btn-secondary rounded-full px-4 py-3 text-sm md:text-base"
            @click="scrollToSection('como-funciona')"
          >
            Ver cómo funciona
          </button>
        </div>
        <p class="mt-3 text-xs text-warm-grey">
          Es gratis crear tu perfil. Sólo pagas cuando encuentras tu hogar.
        </p>
      </div>

      <div class="relative">
        <div class="absolute -inset-6 rounded-3xl bg-sage-green/10 blur-2xl"></div>
        <div class="relative rounded-2xl bg-off-white p-5 shadow-md flex flex-col gap-3 border border-warm-sand/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-warm-grey">Tu match ideal</p>
              <p class="text-base font-semibold text-charcoal">Compañera compatible</p>
            </div>
            <span class="badge-verified">95% afinidad</span>
          </div>
          <ul class="space-y-1 text-xs text-warm-grey">
            <li>• Misma zona preferida en Valencia</li>
            <li>• Hábitos similares (no fumadora, teletrabajo, etc.)</li>
            <li>• Presupuesto compatible</li>
          </ul>
          <div class="mt-2 flex items-center justify-between border-t border-warm-sand pt-3">
            <p class="text-xs text-warm-grey">
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

