<template>
  <section class="py-16 md:py-20">
    <div class="container-juntas">
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-deep-plum via-deep-plum/95 to-soft-terracota px-6 py-10 md:px-10 md:py-12 text-off-white shadow-lg"
      >
        <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-off-white/20"></div>
        <div class="absolute -left-12 -bottom-16 h-44 w-44 rounded-full border border-off-white/10"></div>

        <div class="relative max-w-3xl">
          <h2 class="font-display text-2xl md:text-3xl font-bold mb-3">
            Empezar ahora es gratis
          </h2>
          <p class="text-sm md:text-base text-cream mb-6 max-w-xl">
            Crea tu perfil, verifica tu identidad y empieza a conectar con otras mujeres que también buscan compartir
            vivienda en Valencia.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
            <RouterLink
              to="/register"
              class="inline-flex items-center justify-center rounded-full bg-off-white px-6 py-3 text-sm md:text-base font-semibold text-deep-plum shadow-soft hover:bg-cream transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-off-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep-plum"
            >
              Empezar ahora – Es gratis
            </RouterLink>
            <p class="text-xs text-cream/90">
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

