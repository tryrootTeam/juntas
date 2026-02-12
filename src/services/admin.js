/**
 * Service Admin Dashboard - PRD
 * Verificación de usuarios (aprobar/rechazar) y gestión de reportes.
 * Requiere rol admin (RLS côté Supabase).
 */

import { supabase } from '@/services/supabase'

const BUCKET_VERIFICATION = 'verification-documents'
const SIGNED_URL_EXPIRY = 3600 // 1 hora

/**
 * Lista solicitudes de verificación (por defecto pendientes).
 * @param {{ status?: string }} filters - status: 'pending' | 'verified' | 'rejected'
 * @returns {Promise<Array>}
 */
export async function listVerificationRequests(filters = {}) {
  let query = supabase
    .from('verification_documents')
    .select(`
      id,
      user_id,
      status,
      document_url,
      selfie_url,
      rejection_reason,
      uploaded_at,
      verified_at,
      profiles!user_id(id, display_name, name, email, verification_status, identity_status)
    `)
    .order('uploaded_at', { ascending: false })

  if (filters.status) {
    query = query.eq('status', filters.status)
  } else {
    query = query.eq('status', 'pending')
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

/**
 * Obtiene URLs firmadas para documento y selfie (bucket privado).
 * @param {string} documentPath - path en storage (ej. userId/doc-xxx.jpg)
 * @param {string} selfiePath - path en storage
 * @returns {Promise<{ documentUrl: string | null, selfieUrl: string | null }>}
 */
export async function getVerificationSignedUrls(documentPath, selfiePath) {
  const result = { documentUrl: null, selfieUrl: null }
  if (!documentPath && !selfiePath) return result

  const paths = [documentPath, selfiePath].filter(Boolean)
  const { data: list, error } = await supabase.storage
    .from(BUCKET_VERIFICATION)
    .createSignedUrls(paths, SIGNED_URL_EXPIRY)

  if (error) return result
  if (list?.length && documentPath) result.documentUrl = list[0]?.signedUrl ?? null
  if (list?.length && selfiePath) result.selfieUrl = list[documentPath && selfiePath ? 1 : 0]?.signedUrl ?? null
  return result
}

/**
 * Aprueba la verificación de un usuario.
 * Actualiza verification_documents y profiles.
 */
export async function approveVerification(userId) {
  const { data: doc, error: docError } = await supabase
    .from('verification_documents')
    .update({
      status: 'verified',
      verified_at: new Date().toISOString(),
      verified_by: (await supabase.auth.getUser()).data?.user?.id,
    })
    .eq('user_id', userId)
    .eq('status', 'pending')
    .select('id')
    .single()

  if (docError) throw docError
  if (!doc) throw new Error('No hay solicitud pendiente para este usuario')

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      verification_status: 'verified',
      identity_status: 'verified',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (profileError) throw profileError
  return { success: true }
}

/**
 * Rechaza la verificación de un usuario (motivo opcional).
 */
export async function rejectVerification(userId, rejectionReason = '') {
  const { data: doc, error: docError } = await supabase
    .from('verification_documents')
    .update({
      status: 'rejected',
      rejection_reason: rejectionReason || null,
      verified_at: new Date().toISOString(),
      verified_by: (await supabase.auth.getUser()).data?.user?.id,
    })
    .eq('user_id', userId)
    .eq('status', 'pending')
    .select('id')
    .single()

  if (docError) throw docError
  if (!doc) throw new Error('No hay solicitud pendiente para este usuario')

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      verification_status: 'rejected',
      identity_status: 'rejected',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (profileError) throw profileError
  return { success: true }
}

/**
 * Lista reportes con filtros.
 * @param {{ status?: string, context_type?: string }} filters
 * @returns {Promise<Array>}
 */
export async function listReports(filters = {}) {
  let query = supabase
    .from('reports')
    .select(`
      id,
      reporter_id,
      reported_id,
      reason,
      comment,
      context_type,
      message_id,
      status,
      created_at,
      reviewed_at,
      reporter:profiles!reporter_id(id, display_name, name, email),
      reported:profiles!reported_id(id, display_name, name, email)
    `)
    .order('created_at', { ascending: false })

  if (filters.status) query = query.eq('status', filters.status)
  if (filters.context_type) query = query.eq('context_type', filters.context_type)

  const { data, error } = await query
  if (error) throw error
  return data || []
}

/**
 * Obtiene un reporte por id con mensaje si aplica.
 */
export async function getReport(reportId) {
  const { data, error } = await supabase
    .from('reports')
    .select(`
      *,
      reporter:profiles!reporter_id(id, display_name, name, email),
      reported:profiles!reported_id(id, display_name, name, email),
      message:messages!message_id(id, content, created_at)
    `)
    .eq('id', reportId)
    .single()

  if (error) throw error
  return data
}

/**
 * Actualiza el estado de un reporte (in_review, resolved).
 */
export async function updateReportStatus(reportId, status) {
  const { data, error } = await supabase
    .from('reports')
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: (await supabase.auth.getUser()).data?.user?.id,
    })
    .eq('id', reportId)
    .select('id, status')
    .single()

  if (error) throw error
  return data
}
