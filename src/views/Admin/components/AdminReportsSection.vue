<template>
  <section class="admin-reports">
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
      <span class="text-sm font-medium text-charcoal ml-2">Contexto:</span>
      <button
        v-for="opt in contextOptions"
        :key="opt.value"
        type="button"
        :class="[
          'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
          filterContext === opt.value
            ? 'bg-deep-plum text-off-white'
            : 'bg-off-white border border-warm-sand text-charcoal hover:border-charcoal/20',
        ]"
        @click="filterContext = opt.value; load()"
      >
        {{ opt.label }}
      </button>
    </div>

    <p v-if="loading" class="text-warm-grey font-body">Cargando reportes...</p>
    <p v-else-if="reportError" class="text-soft-terracota font-medium">{{ reportError }}</p>
    <p v-else-if="reports.length === 0" class="text-warm-grey font-body">
      No hay reportes con estos filtros.
    </p>

    <ul v-else class="space-y-4">
      <li
        v-for="r in reports"
        :key="r.id"
        class="card-feature rounded-xl p-6 border border-warm-sand"
      >
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="font-semibold text-charcoal">
              Reportado: {{ r.reported?.display_name || r.reported?.name || r.reported_id }}
            </p>
            <p class="text-sm text-warm-grey mt-0.5">
              Por {{ r.reporter?.display_name || r.reporter?.email }} · {{ formatDate(r.created_at) }}
              <span v-if="r.context_type" class="ml-1">· {{ r.context_type }}</span>
            </p>
          </div>
          <span
            :class="[
              'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
              r.status === 'pending' && 'bg-amber-100 text-amber-800',
              r.status === 'in_review' && 'bg-blue-100 text-blue-800',
              (r.status === 'reviewed' || r.status === 'resolved') && 'bg-sage-green/15 text-sage-green',
            ]"
          >
            {{ r.status }}
          </span>
        </div>
        <p v-if="r.reason" class="mt-2 text-sm text-charcoal">
          <span class="font-medium text-warm-grey">Motivo:</span> {{ r.reason }}
        </p>
        <p v-if="r.comment" class="mt-1 text-sm text-charcoal">
          <span class="font-medium text-warm-grey">Comentario:</span> {{ r.comment }}
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <template v-if="r.status === 'pending' || r.status === 'in_review'">
            <button
              v-if="r.status === 'pending'"
              type="button"
              class="btn-secondary text-sm py-1.5"
              :disabled="actionLoading === r.id"
              @click="updateStatus(r.id, 'in_review')"
            >
              Marcar en revisión
            </button>
            <button
              type="button"
              class="btn-primary text-sm py-1.5"
              :disabled="actionLoading === r.id"
              @click="updateStatus(r.id, 'resolved')"
            >
              {{ actionLoading === r.id ? '…' : 'Cerrar' }}
            </button>
          </template>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { listReports, updateReportStatus } from '@/services/admin'

const statusOptions = [
  { value: '', label: 'Todos' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'in_review', label: 'En revisión' },
  { value: 'resolved', label: 'Cerrados' },
]
const contextOptions = [
  { value: '', label: 'Todos' },
  { value: 'chat', label: 'Chat' },
  { value: 'profile', label: 'Perfil' },
]

const filterStatus = ref('')
const filterContext = ref('')
const reports = ref([])
const loading = ref(false)
const reportError = ref(null)
const actionLoading = ref(null)

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
  reportError.value = null
  try {
    const filters = {}
    if (filterStatus.value) filters.status = filterStatus.value
    if (filterContext.value) filters.context_type = filterContext.value
    reports.value = await listReports(filters)
  } catch (e) {
    reportError.value = e.message || 'Error al cargar reportes'
  } finally {
    loading.value = false
  }
}

async function updateStatus(reportId, status) {
  actionLoading.value = reportId
  reportError.value = null
  try {
    await updateReportStatus(reportId, status)
    await load()
  } catch (e) {
    reportError.value = e.message || 'Error al actualizar'
  } finally {
    actionLoading.value = null
  }
}

watch([filterStatus, filterContext], () => load(), { immediate: true })
</script>
