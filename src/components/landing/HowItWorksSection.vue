<template>
  <section
    id="como-funciona"
    class="py-16 md:py-20 bg-off-white"
  >
    <div class="container-juntas">
      <h2 class="font-display text-2xl md:text-3xl font-bold text-charcoal text-center mb-3">
        Cómo funciona Juntas
      </h2>
      <p class="text-sm md:text-base text-warm-grey text-center max-w-2xl mx-auto mb-10">
        Un proceso pensado para que encuentres compañeras con las que realmente te sientas cómoda compartiendo hogar.
      </p>

      <ol class="grid gap-6 md:grid-cols-4">
        <li
          v-for="step in steps"
          :key="step.number"
          class="card-feature flex flex-col"
        >
          <span class="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-soft-terracota text-xs font-semibold text-off-white">
            {{ step.number }}
          </span>
          <h3 class="font-display mb-2 text-sm font-semibold text-charcoal">
            {{ step.title }}
          </h3>
          <p class="text-xs text-warm-grey">
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

