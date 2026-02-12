import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const envError = new Error(
  'Supabase non configuré. Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY. ' +
  'En production (Netlify) : Site settings → Environment variables → Add variable / Add from .env.'
)

function throwEnvError() {
  console.error(envError.message)
  throw envError
}

/** Client Supabase (créé uniquement si les variables d’environnement sont définies). */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : new Proxy(
        {},
        {
          get() {
            throwEnvError()
          },
        }
      )
