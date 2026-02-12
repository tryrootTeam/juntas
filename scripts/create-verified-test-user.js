#!/usr/bin/env node
/**
 * Crée un utilisateur de test complet : compte Auth + profil vérifié avec droit d'envoyer des messages.
 *
 * Prérequis :
 * - Variable d'environnement SUPABASE_SERVICE_ROLE_KEY (Dashboard Supabase → Settings → API).
 * - VITE_SUPABASE_URL peut être dans .env à la racine du projet (le script tente de la charger).
 *
 * Usage :
 *   SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/create-verified-test-user.js
 *   # ou avec email/mot de passe personnalisés :
 *   TEST_USER_EMAIL=test@example.com TEST_USER_PASSWORD=secret SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/create-verified-test-user.js
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

// Charger .env à la main (pas de dépendance dotenv)
function loadEnv() {
  for (const name of ['.env', '.env.local']) {
    const path = join(rootDir, name)
    if (!existsSync(path)) continue
    try {
      const content = readFileSync(path, 'utf8')
      for (const line of content.split('\n')) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
        if (m && !process.env[m[1]]) {
          const val = m[2].replace(/^["']|["']$/g, '').trim()
          process.env[m[1]] = val
        }
      }
    } catch (_) {}
    break
  }
}
loadEnv()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const email = process.env.TEST_USER_EMAIL || 'test-verified@juntas.local'
const password = process.env.TEST_USER_PASSWORD || 'TestPassword123!'
const displayName = process.env.TEST_USER_NAME || 'Usuario Test Verificado'

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Erreur: définissez VITE_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.')
  console.error('  SUPABASE_SERVICE_ROLE_KEY se trouve dans Supabase Dashboard → Settings → API (service_role).')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function main() {
  console.log('Création de l\'utilisateur Auth:', email)

  const { data: user, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      name: displayName,
      display_name: displayName,
    },
  })

  if (authError) {
    if (authError.message.includes('already been registered')) {
      console.log('L’utilisateur existe déjà. Mise à jour du profil pour le rendre vérifié et autoriser l’envoi de messages.')
      const { data: existing } = await supabase.auth.admin.listUsers()
      const existingUser = existing?.users?.find((u) => u.email === email)
      if (!existingUser) {
        console.error('Impossible de récupérer l’utilisateur existant.')
        process.exit(1)
      }
      await updateProfile(existingUser.id)
      console.log('Profil mis à jour. Tu peux te connecter avec:', email, '/', password)
      return
    }
    console.error('Erreur Auth:', authError.message)
    process.exit(1)
  }

  if (!user?.user?.id) {
    console.error('Utilisateur créé mais id introuvable.')
    process.exit(1)
  }

  const userId = user.user.id
  console.log('Utilisateur Auth créé:', userId)

  await updateProfile(userId)

  console.log('')
  console.log('Utilisateur de test prêt:')
  console.log('  Email:', email)
  console.log('  Mot de passe:', password)
  console.log('  Vérifié: oui (identity_status + verification_status)')
  console.log('  Peut envoyer des messages: oui (can_send_messages)')
}

async function updateProfile(userId) {
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      display_name: displayName,
      identity_status: 'verified',
      verification_status: 'verified',
      can_send_messages: true,
      profile_completed: true,
      onboarding_step: 6,
      email_verified: true,
      phone_verified: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (profileError) {
    console.error('Erreur mise à jour profil:', profileError.message)
    process.exit(1)
  }
  console.log('Profil mis à jour: vérifié + can_send_messages = true')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
