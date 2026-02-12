<template>
  <section
    v-if="reasons?.length"
    class="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
    aria-labelledby="why-compatible-heading"
  >
    <h2 id="why-compatible-heading" class="text-xl font-bold text-deepblue mb-4">
      Por qué sois compatibles
    </h2>
    <ul class="space-y-2">
      <li
        v-for="(reason, i) in reasons"
        :key="i"
        class="flex items-center gap-3 text-deepblue"
      >
        <span class="flex-shrink-0 w-8 h-8 rounded-full bg-sage-100 text-sage flex items-center justify-center">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </span>
        <span>{{ reason }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  reasons: {
    type: Array,
    default: () => [],
  },
})
</script>
