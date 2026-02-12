<template>
  <footer class="mt-16 border-t border-warm-sand bg-off-white/80">
    <div class="container-juntas py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p class="text-sm text-warm-grey">
        © {{ new Date().getFullYear() }} Juntas. Todas los derechos reservados.
      </p>
      <nav class="flex flex-wrap items-center gap-4 text-sm">
        <a href="#" class="text-warm-grey hover:text-soft-terracota underline-offset-2 hover:underline">
          Política de Privacidad
        </a>
        <a href="#" class="text-warm-grey hover:text-soft-terracota underline-offset-2 hover:underline">
          Términos y Condiciones
        </a>
        <a
          href="mailto:hola@juntas.es"
          class="text-warm-grey hover:text-soft-terracota underline-offset-2 hover:underline"
        >
          Contacto
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
</script>

