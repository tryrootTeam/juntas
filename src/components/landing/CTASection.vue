<template>
  <section class="py-16 md:py-20">
    <div class="max-w-5xl mx-auto px-4">
      <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-terracota-500 via-terracota-400 to-sage-500 px-6 py-10 md:px-10 md:py-12 text-cream-50"
      >
        <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-cream-200/30"></div>
        <div class="absolute -left-12 -bottom-16 h-44 w-44 rounded-full border border-cream-200/20"></div>

        <div class="relative max-w-3xl">
          <h2 class="text-2xl md:text-3xl font-bold mb-3">
            Empezar ahora es gratis
          </h2>
          <p class="text-sm md:text-base text-cream-100 mb-6 max-w-xl">
            Crea tu perfil, verifica tu identidad y empieza a conectar con otras mujeres que también buscan compartir
            vivienda en Valencia.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
            <RouterLink
              to="/register"
              class="inline-flex items-center justify-center rounded-full bg-cream px-6 py-3 text-sm md:text-base font-semibold text-terracota-700 shadow-sm hover:bg-cream-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-terracota-500 transition"
            >
              Empezar ahora – Es gratis
            </RouterLink>
            <p class="text-xs text-cream-100/80">
              Sin coste inicial. Paga sólo cuando encuentres tu hogar.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

