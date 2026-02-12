<template>
  <section
    id="testimonios"
    class="py-16 md:py-20 bg-cream-100"
  >
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-deepblue text-center mb-3">
        Historias de mujeres que ya viven juntas
      </h2>
      <p class="text-sm md:text-base text-deepblue/70 text-center max-w-2xl mx-auto mb-10">
        Juntas nace para que no tengas que buscar piso sola. Estas son algunas experiencias reales de la comunidad.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="flex flex-col h-full rounded-2xl bg-white border border-cream-300 p-5 shadow-sm"
        >
          <p class="text-xs text-deepblue/70 mb-4">
            “{{ testimonial.quote }}”
          </p>
          <div class="mt-auto pt-3 border-t border-cream-200">
            <p class="text-sm font-semibold text-deepblue">
              {{ testimonial.name }}
            </p>
            <p class="text-xs text-deepblue/60">
              {{ testimonial.detail }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'María, 29 años',
    detail: 'Encontró compañera para compartir piso en Ruzafa',
    quote:
      'Llegué nueva a Valencia y no conocía a nadie. Con Juntas encontré una compañera con mis mismos horarios y ahora compartimos un piso precioso en Ruzafa.',
  },
  {
    name: 'Laura, 34 años',
    detail: 'Se mudó cerca de su trabajo',
    quote:
      'Buscaba vivir con otra mujer que también teletrabajara. Gracias a los filtros de la plataforma fue mucho más fácil encontrar a alguien compatible.',
  },
  {
    name: 'Carmen, 42 años',
    detail: 'Volvió a compartir hogar tras un cambio vital',
    quote:
      'Después de separarme me daba vértigo buscar piso sola. Juntas me ayudó a encontrar compañera con mis mismos valores y ahora siento que estoy empezando una nueva etapa acompañada.',
  },
]
</script>

