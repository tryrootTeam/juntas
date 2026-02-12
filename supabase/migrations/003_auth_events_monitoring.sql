-- Table pour le monitoring des événements auth (PRD: signup, login, logout, failed_login)
CREATE TABLE IF NOT EXISTS auth_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL CHECK (event_type IN ('signup', 'login', 'logout', 'failed_login', 'oauth_error')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_auth_events_created_at ON auth_events (created_at);
CREATE INDEX IF NOT EXISTS idx_auth_events_event_type ON auth_events (event_type);
CREATE INDEX IF NOT EXISTS idx_auth_events_user_id ON auth_events (user_id);

ALTER TABLE auth_events ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut insérer (anon pour failed_login, authenticated pour les autres)
CREATE POLICY "auth_events_insert" ON auth_events FOR INSERT WITH CHECK (true);
-- Pas de politique SELECT : lecture uniquement via service_role (bypass RLS) pour dashboard / cron / alertes

COMMENT ON TABLE auth_events IS 'Log des événements auth pour monitoring et alertes (PRD)';
