<template>
  <section class="admin-verification">
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <span class="text-sm font-medium text-charcoal">Estado:</span>
      <button
        v-for="opt in statusOptions"
        :key="opt.value"
        type="button"
        :class="[
          'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
          filterStatus === opt.value
            ? 'bg-sage-green text-off-white'
            : 'bg-off-white border border-warm-sand text-charcoal hover:border-charcoal/20',
        ]"
        @click="filterStatus = opt.value; load()"
      >
        {{ opt.label }}
      </button>
    </div>

    <p v-if="loading" class="text-warm-grey font-body">Cargando solicitudes...</p>
    <p v-else-if="error" class="text-soft-terracota font-medium">{{ error }}</p>
    <p v-else-if="requests.length === 0" class="text-warm-grey font-body">
      No hay solicitudes con este filtro.
    </p>

    <ul v-else class="space-y-4">
      <li
        v-for="req in requests"
        :key="req.id"
        class="card-feature rounded-xl p-6 border border-warm-sand"
      >
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="font-semibold text-charcoal">
              {{ req.profiles?.display_name || req.profiles?.name || req.profiles?.email || req.user_id }}
            </p>
            <p class="text-sm text-warm-grey mt-0.5">
              {{ req.profiles?.email }} · Subido {{ formatDate(req.uploaded_at) }}
            </p>
          </div>
          <span
            :class="[
              'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
              req.status === 'pending' && 'bg-amber-100 text-amber-800',
              req.status === 'verified' && 'bg-sage-green/15 text-sage-green',
              req.status === 'rejected' && 'bg-red-100 text-red-800',
            ]"
          >
            {{ req.status }}
          </span>
        </div>

        <div v-if="req.document_url || req.selfie_url" class="mt-4 flex flex-wrap gap-4">
          <div v-if="signedUrls[req.id]?.documentUrl" class="space-y-1">
            <p class="text-xs font-medium text-warm-grey">Documento</p>
            <a
              :href="signedUrls[req.id].documentUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-soft-terracota hover:underline"
            >
              Ver documento
            </a>
          </div>
          <div v-if="signedUrls[req.id]?.selfieUrl" class="space-y-1">
            <p class="text-xs font-medium text-warm-grey">Selfie</p>
            <a
              :href="signedUrls[req.id].selfieUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-soft-terracota hover:underline"
            >
              Ver selfie
            </a>
          </div>
        </div>
        <div v-else-if="req.document_url || req.selfie_url" class="mt-2 text-sm text-warm-grey">
          Cargando enlaces...
        </div>

        <div v-if="req.status === 'rejected' && req.rejection_reason" class="mt-2 text-sm text-warm-grey">
          Motivo: {{ req.rejection_reason }}
        </div>

        <div v-if="req.status === 'pending'" class="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            class="btn-primary"
            :disabled="actionLoading === req.user_id"
            @click="approve(req.user_id)"
          >
            {{ actionLoading === req.user_id ? '…' : 'Aprobar' }}
          </button>
          <button
            type="button"
            class="btn-secondary"
            :disabled="actionLoading === req.user_id"
            @click="openReject(req)"
          >
            Rechazar
          </button>
        </div>
      </li>
    </ul>

    <!-- Modal rechazo -->
    <div
      v-if="rejecting"
      class="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-charcoal/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reject-title"
    >
      <div class="bg-off-white rounded-xl shadow-lg max-w-md w-full p-6">
        <h2 id="reject-title" class="font-display text-lg font-semibold text-charcoal mb-2">
          Rechazar verificación
        </h2>
        <p class="text-sm text-warm-grey mb-4">
          Motivo opcional (visible para el usuario):
        </p>
        <textarea
          v-model="rejectReason"
          class="w-full rounded-lg border border-warm-sand px-3 py-2 text-sm text-charcoal focus:ring-2 focus:ring-soft-terracota focus:border-transparent"
          rows="3"
          placeholder="Ej: Documento no legible"
        />
        <div class="flex gap-2 mt-4">
          <button type="button" class="btn-primary flex-1" :disabled="rejectSubmitting" @click="confirmReject">
            {{ rejectSubmitting ? '…' : 'Confirmar rechazo' }}
          </button>
          <button type="button" class="btn-secondary" @click="rejecting = null">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  listVerificationRequests,
  getVerificationSignedUrls,
  approveVerification,
  rejectVerification,
} from '@/services/admin'

const statusOptions = [
  { value: 'pending', label: 'Pendientes' },
  { value: 'verified', label: 'Aprobadas' },
  { value: 'rejected', label: 'Rechazadas' },
]

const filterStatus = ref('pending')
const requests = ref([])
const loading = ref(false)
const error = ref(null)
const actionLoading = ref(null)
const signedUrls = ref({})
const rejecting = ref(null)
const rejectReason = ref('')
const rejectSubmitting = ref(false)

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

async function load() {
  loading.value = true
  error.value = null
  try {
    requests.value = await listVerificationRequests({ status: filterStatus.value })
    for (const req of requests.value) {
      if (req.document_url || req.selfie_url) {
        const urls = await getVerificationSignedUrls(req.document_url, req.selfie_url)
        signedUrls.value[req.id] = urls
      }
    }
  } catch (e) {
    error.value = e.message || 'Error al cargar'
  } finally {
    loading.value = false
  }
}

async function approve(userId) {
  actionLoading.value = userId
  error.value = null
  try {
    await approveVerification(userId)
    await load()
  } catch (e) {
    error.value = e.message || 'Error al aprobar'
  } finally {
    actionLoading.value = null
  }
}

function openReject(req) {
  rejecting.value = req
  rejectReason.value = ''
}

async function confirmReject() {
  if (!rejecting.value) return
  rejectSubmitting.value = true
  error.value = null
  try {
    await rejectVerification(rejecting.value.user_id, rejectReason.value)
    rejecting.value = null
    await load()
  } catch (e) {
    error.value = e.message || 'Error al rechazar'
  } finally {
    rejectSubmitting.value = false
  }
}

watch(filterStatus, () => load(), { immediate: true })
</script>
