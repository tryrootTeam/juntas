<template>
  <div class="min-h-screen flex flex-col bg-cream">
    <main class="flex-1 w-full max-w-lg mx-auto px-4 py-6 sm:py-8 sm:px-6">
      <h1 class="text-2xl font-bold text-deepblue mb-2">Completa tu perfil</h1>
      <p class="text-sm text-deepblue-300 mb-4 sm:mb-6">Paso a paso, así encontramos mejor tu compañero de piso.</p>

      <ProgressBar :current-step="store.currentStep" class="mb-6 sm:mb-8" />

      <div class="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-cream-400">
        <template v-if="store.loading && !store.formData.name">
          <p class="text-deepblue-300">Cargando…</p>
        </template>
        <template v-else>
          <Step1AboutYou
            v-if="store.currentStep === 1"
            :model-value="store.formData"
            :loading="store.loading"
            :error-message="store.error"
            @submit="onStepSubmit(1, $event)"
          />
          <Step2Family
            v-else-if="store.currentStep === 2"
            :model-value="store.formData"
            :loading="store.loading"
            :error-message="store.error"
            @submit="onStepSubmit(2, $event)"
          />
          <Step3Schedule
            v-else-if="store.currentStep === 3"
            :model-value="store.formData"
            :loading="store.loading"
            :error-message="store.error"
            @submit="onStepSubmit(3, $event)"
          />
          <Step4Lifestyle
            v-else-if="store.currentStep === 4"
            :model-value="store.formData"
            :loading="store.loading"
            :error-message="store.error"
            @submit="onStepSubmit(4, $event)"
          />
          <Step5Preferences
            v-else-if="store.currentStep === 5"
            :model-value="store.formData"
            :loading="store.loading"
            :error-message="store.error"
            @submit="onStepSubmit(5, $event)"
          />
          <Step6Verification
            v-else-if="store.currentStep === 6"
            :loading="store.loading"
            :error-message="store.error"
            @submit="onStep6Submit"
          />
        </template>
      </div>

      <div v-if="store.currentStep > 1 && store.currentStep < 6" class="mt-4 text-center">
        <button
          type="button"
          class="text-sm text-deepblue-300 hover:text-terracota focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota rounded"
          :disabled="store.loading"
          @click="goBack"
        >
          ← Atrás
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'
import ProgressBar from '@/components/onboarding/ProgressBar.vue'
import Step1AboutYou from './steps/Step1AboutYou.vue'
import Step2Family from './steps/Step2Family.vue'
import Step3Schedule from './steps/Step3Schedule.vue'
import Step4Lifestyle from './steps/Step4Lifestyle.vue'
import Step5Preferences from './steps/Step5Preferences.vue'
import Step6Verification from './steps/Step6Verification.vue'

const router = useRouter()
const store = useOnboardingStore()

onMounted(async () => {
  await store.loadProgress()
  if (store.isComplete) {
    router.replace({ name: 'dashboard' })
  }
})

async function onStepSubmit(step, data) {
  store.clearError()
  try {
    await store.saveStep(step, data)
    if (step >= 1 && step < 6) store.currentStep = step + 1
  } catch {
    // error already set in store, shown in step component
  }
}

function goBack() {
  if (store.currentStep > 1) store.currentStep = store.currentStep - 1
}

async function onStep6Submit({ documentFile, selfieFile }) {
  store.clearError()
  try {
    await store.uploadVerificationDocuments(documentFile, selfieFile)
    await store.completeOnboarding()
    router.replace({ name: 'dashboard' })
  } catch {
    // error already set in store, shown in Step6Verification
  }
}
</script>
