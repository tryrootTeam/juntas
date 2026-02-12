<template>
  <div class="message-input flex gap-2 p-3 bg-off-white border-t border-warm-sand shrink-0">
    <textarea
      v-model="draft"
      placeholder="Escribe un mensaje..."
      rows="1"
      maxlength="5000"
      class="flex-1 min-h-[44px] max-h-32 px-4 py-2.5 rounded-xl border border-warm-sand text-charcoal placeholder-warm-grey focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent resize-none"
      :disabled="disabled"
      @keydown.enter.exact.prevent="submit"
    />
    <button
      type="button"
      class="btn-primary shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="disabled || !draft.trim()"
      @click="submit"
    >
      Enviar
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['send'])

const draft = ref('')

function submit() {
  const text = draft.value?.trim()
  if (!text) return
  emit('send', text)
  draft.value = ''
}
</script>
