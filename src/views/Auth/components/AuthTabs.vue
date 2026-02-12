<template>
  <div class="flex rounded-t-xl overflow-hidden" role="tablist" aria-label="Registro o Entrar">
    <button
      type="button"
      role="tab"
      :aria-selected="activeTab === 'register'"
      :tabindex="activeTab === 'register' ? 0 : -1"
      id="tab-register"
      aria-controls="panel-register"
      class="flex-1 py-3 px-4 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracota focus-visible:ring-offset-2"
      :class="activeTab === 'register' ? 'bg-off-white text-charcoal' : 'bg-warm-sand/50 text-warm-grey hover:bg-warm-sand'"
      @click="select('register')"
    >
      Registro
    </button>
    <button
      type="button"
      role="tab"
      :aria-selected="activeTab === 'login'"
      :tabindex="activeTab === 'login' ? 0 : -1"
      id="tab-login"
      aria-controls="panel-login"
      class="flex-1 py-3 px-4 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracota focus-visible:ring-offset-2"
      :class="activeTab === 'login' ? 'bg-off-white text-charcoal' : 'bg-warm-sand/50 text-warm-grey hover:bg-warm-sand'"
      @click="select('login')"
    >
      Entrar
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: 'register' },
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeTab = computed({
  get: () => props.modelValue,
  set: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

function select(tab) {
  activeTab.value = tab
}
</script>
