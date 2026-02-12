<template>
  <section class="bg-white rounded-xl border border-cream-400 overflow-hidden">
    <div class="px-6 py-4 border-b border-cream-400 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-deepblue">{{ title }}</h3>
      <button
        v-if="editable"
        type="button"
        class="text-sm font-medium text-terracota hover:text-terracota-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota rounded px-2 py-1"
        @click="$emit('edit')"
      >
        Editar
      </button>
    </div>
    <div class="px-6 py-4">
      <dl class="space-y-3">
        <template v-for="item in data" :key="item.label">
          <div v-if="item.value != null && item.value !== ''" class="flex flex-col sm:flex-row sm:gap-4">
            <dt class="text-sm font-medium text-deepblue-300 shrink-0 sm:w-40">{{ item.label }}</dt>
            <dd class="text-deepblue mt-0.5 sm:mt-0">
              {{ formatValue(item.value) }}
            </dd>
          </div>
        </template>
      </dl>
      <p
        v-if="!data.length || data.every((i) => i.value == null || i.value === '')"
        class="text-deepblue-300 text-sm"
      >
        Sin información
      </p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  data: { type: Array, default: () => [] },
  editable: { type: Boolean, default: true },
})

defineEmits(['edit'])

function formatValue(value) {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'
  return String(value)
}
</script>
