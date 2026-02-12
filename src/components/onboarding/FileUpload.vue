<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-charcoal">{{ label }}</label>
    <div
      class="border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300"
      :class="[
        isDragging ? 'border-soft-terracota bg-soft-terracota/20' : 'border-warm-sand hover:border-charcoal/30',
        disabled ? 'opacity-60 pointer-events-none' : 'cursor-pointer',
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <input
        ref="inputRef"
        type="file"
        class="sr-only"
        :accept="accept"
        :disabled="disabled"
        @change="onChange"
      />
      <template v-if="modelValue">
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <img
            v-if="isImage"
            :src="previewUrl"
            alt="Vista previa"
            class="max-h-24 rounded-lg object-cover"
          />
          <div v-else class="w-12 h-12 rounded-lg bg-warm-sand flex items-center justify-center text-warm-grey">
            <span class="text-2xl">📄</span>
          </div>
          <div class="text-left min-w-0">
            <p class="text-sm font-medium text-charcoal truncate">{{ modelValue.name }}</p>
            <p class="text-xs text-warm-grey">{{ formatSize(modelValue.size) }}</p>
          </div>
          <div v-if="uploadProgress !== null" class="w-full max-w-xs h-1.5 bg-warm-sand rounded-full overflow-hidden">
            <div class="h-full bg-soft-terracota transition-all duration-300" :style="{ width: `${uploadProgress}%` }" />
          </div>
          <button
            v-if="!disabled"
            type="button"
            class="text-sm text-red-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota rounded"
            @click.stop="clear"
          >
            Quitar
          </button>
        </div>
      </template>
      <template v-else>
        <p class="text-sm text-warm-grey mb-1">Arrastra un archivo aquí o</p>
        <button
          type="button"
          class="text-soft-terracota font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracota rounded"
          :disabled="disabled"
          @click="inputRef?.click()"
        >
          haz clic para subir
        </button>
        <p class="text-xs text-warm-grey mt-2">{{ accept }} · máx. 5 MB</p>
      </template>
    </div>
    <p v-if="errorMessage" class="text-sm text-red-600" role="alert">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: File, default: null },
  label: { type: String, default: 'Archivo' },
  accept: { type: String, default: 'image/jpeg,image/png,application/pdf' },
  disabled: { type: Boolean, default: false },
  uploadProgress: { type: Number, default: null },
  errorMessage: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'change'])

const inputRef = ref(null)
const isDragging = ref(false)
const previewUrl = ref('')

const isImage = computed(() => {
  if (!props.modelValue) return false
  const t = props.modelValue.type?.toLowerCase() ?? ''
  return t.startsWith('image/')
})

watch(
  () => props.modelValue,
  (file) => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
    if (file && (file.type || '').startsWith('image/')) previewUrl.value = URL.createObjectURL(file)
  },
  { immediate: true }
)

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function onChange(e) {
  const file = e.target.files?.[0]
  if (file) {
    emit('update:modelValue', file)
    emit('change', file)
  }
  e.target.value = ''
}

function onDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) {
    emit('update:modelValue', file)
    emit('change', file)
  }
}

function clear() {
  emit('update:modelValue', null)
  emit('change', null)
  inputRef.value?.value && (inputRef.value.value = '')
}

/** Pour les tests : simule une sélection de fichier */
function simulateUpload(file) {
  emit('update:modelValue', file)
  emit('change', file)
}

defineExpose({ simulateUpload })
</script>
