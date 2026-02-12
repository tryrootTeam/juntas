#!/usr/bin/env bash
# Vérifie que .env (et variantes) ne sont pas suivis par git.
# À lancer en CI pour un repo public.
tracked=$(git ls-files .env .env.local .env.development .env.production 2>/dev/null || true)
if [ -n "$tracked" ]; then
  echo "ERREUR: Ces fichiers ne doivent pas être commités: $tracked"
  exit 1
fi
exit 0
