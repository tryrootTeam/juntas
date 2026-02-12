<template>
  <section class="bg-white rounded-xl border border-red-200 overflow-hidden">
    <div class="px-6 py-4 border-b border-red-200 bg-red-50/50">
      <h3 class="text-lg font-semibold text-deepblue">Zona de peligro</h3>
    </div>
    <div class="px-6 py-4">
      <p class="text-sm text-deepblue-300 mb-4">
        Si eliminas tu cuenta, se borrarán todos tus datos de forma permanente. Esta acción no se puede deshacer.
      </p>
      <button
        type="button"
        class="px-4 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        @click="$emit('delete')"
      >
        Eliminar cuenta
      </button>
    </div>
  </section>
</template>

<script setup>
defineEmits(['delete'])
</script>
