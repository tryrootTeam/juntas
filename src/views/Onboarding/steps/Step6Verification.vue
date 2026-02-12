<template>
  <form class="space-y-6" @submit.prevent="handleSubmit" novalidate>
    <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
      {{ errorMessage }}
    </div>

    <p class="text-sm text-warm-grey">
      Sube un documento de identidad (DNI, pasaporte) y una selfie para verificar tu perfil. Formatos: JPG, PNG o PDF. Máx. 5 MB por archivo.
    </p>

    <FileUpload
      v-model="documentFile"
      label="Documento de identidad"
      accept="image/jpeg,image/png,application/pdf"
      :disabled="loading"
      :error-message="fileErrors.document"
    />

    <FileUpload
      v-model="selfieFile"
      label="Selfie"
      accept="image/jpeg,image/png"
      :disabled="loading"
      :error-message="fileErrors.selfie"
    />

    <button
      type="submit"
      class="btn-primary w-full disabled:opacity-60"
      :disabled="loading || (!documentFile && !selfieFile)"
    >
      {{ loading ? 'Enviando…' : 'Completar onboarding' }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FileUpload from '@/components/onboarding/FileUpload.vue'

defineProps({
  loading: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
})

const emit = defineEmits(['submit'])

const documentFile = ref(null)
const selfieFile = ref(null)
const fileErrors = reactive({ document: '', selfie: '' })

function handleSubmit() {
  fileErrors.document = ''
  fileErrors.selfie = ''
  if (!documentFile.value && !selfieFile.value) {
    fileErrors.document = 'Sube al menos el documento o la selfie.'
    return
  }
  emit('submit', { documentFile: documentFile.value, selfieFile: selfieFile.value })
}
</script>
