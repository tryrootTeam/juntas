<template>
  <footer class="mt-16 border-t border-cream-400 bg-cream-300/60">
    <div class="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p class="text-sm text-deepblue/70">
        © {{ new Date().getFullYear() }} Juntas. Todas los derechos reservados.
      </p>
      <nav class="flex flex-wrap items-center gap-4 text-sm">
        <a href="#" class="text-deepblue/70 hover:text-terracota-600 underline-offset-2 hover:underline">
          Política de Privacidad
        </a>
        <a href="#" class="text-deepblue/70 hover:text-terracota-600 underline-offset-2 hover:underline">
          Términos y Condiciones
        </a>
        <a
          href="mailto:hola@juntas.es"
          class="text-deepblue/70 hover:text-terracota-600 underline-offset-2 hover:underline"
        >
          Contacto
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
</script>

