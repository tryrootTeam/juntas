-- Juntas - Backend Chat (PRD)
-- Messages: contrainte contenu, index, trigger updated_at conversation, RLS détaillées, Real-time

-- ========== MESSAGES - contrainte contenu (1–5000 caractères) ==========
ALTER TABLE messages
  DROP CONSTRAINT IF EXISTS messages_content_length;

ALTER TABLE messages
  ADD CONSTRAINT messages_content_length
  CHECK (length(content) > 0 AND length(content) <= 5000);

COMMENT ON COLUMN messages.content IS 'Contenu du message, 1–5000 caractères.';

-- ========== INDEX pour pagination / liste des messages ==========
CREATE INDEX IF NOT EXISTS idx_messages_conversation_created
  ON messages (conversation_id, created_at DESC);

-- ========== TRIGGER : mettre à jour conversations.updated_at à chaque nouveau message ==========
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE conversations
  SET updated_at = now()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS messages_update_conversation ON messages;
CREATE TRIGGER messages_update_conversation
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_timestamp();

COMMENT ON FUNCTION update_conversation_timestamp() IS 'Met à jour conversations.updated_at à chaque insertion de message.';

-- ========== RLS MESSAGES - politiques détaillées (lecture, envoi vérifié, marquer lu) ==========
DROP POLICY IF EXISTS "Messages in conversation" ON messages;

-- Lecture : uniquement les messages des conversations dont l'utilisateur est participant
CREATE POLICY "Users can view messages in own conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
        AND (c.user_a = auth.uid() OR c.user_b = auth.uid())
    )
  );

-- Insertion : utilisatrices vérifiées (can_send_messages), participant de la conversation, sender = auth
CREATE POLICY "Verified users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
        AND (c.user_a = auth.uid() OR c.user_b = auth.uid())
    )
    AND (SELECT COALESCE(p.can_send_messages, FALSE) FROM profiles p WHERE p.id = auth.uid())
  );

-- Mise à jour : marquer comme lu (read_at) pour les participants
CREATE POLICY "Users can update messages in own conversations"
  ON messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
        AND (c.user_a = auth.uid() OR c.user_b = auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
        AND (c.user_a = auth.uid() OR c.user_b = auth.uid())
    )
  );

-- ========== REAL-TIME : activer la réplication pour le chat ==========
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE messages;
EXCEPTION
  WHEN OTHERS THEN NULL; -- déjà dans la publication ou publication absente
END $$;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;
