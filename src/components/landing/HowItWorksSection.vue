<template>
  <section
    id="como-funciona"
    class="py-16 md:py-20 bg-cream-50"
  >
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-deepblue text-center mb-3">
        Cómo funciona Juntas
      </h2>
      <p class="text-sm md:text-base text-deepblue/70 text-center max-w-2xl mx-auto mb-10">
        Un proceso pensado para que encuentres compañeras con las que realmente te sientas cómoda compartiendo hogar.
      </p>

      <ol class="grid gap-6 md:grid-cols-4">
        <li
          v-for="step in steps"
          :key="step.number"
          class="flex flex-col rounded-2xl bg-white border border-cream-300 p-5 shadow-sm"
        >
          <span class="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-terracota text-xs font-semibold text-cream-50">
            {{ step.number }}
          </span>
          <h3 class="mb-2 text-sm font-semibold text-deepblue">
            {{ step.title }}
          </h3>
          <p class="text-xs text-deepblue/75">
            {{ step.description }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    number: 1,
    title: 'Crea tu perfil',
    description: 'Cuéntanos cómo eres, tu presupuesto, tus horarios y qué tipo de convivencia buscas.',
  },
  {
    number: 2,
    title: 'Verifica tu identidad',
    description: 'Validamos tu identidad para que sólo haya perfiles reales y confiables en la plataforma.',
  },
  {
    number: 3,
    title: 'Encuentra tu match',
    description: 'Te mostramos compañeras compatibles según vuestros intereses, hábitos y necesidades.',
  },
  {
    number: 4,
    title: 'Conecta y busca hogar',
    description: 'Habláis, os conocéis y empezáis a buscar piso compartido en Valencia juntas.',
  },
]
</script>

