#!/bin/bash
# Script de test pour vérifier les variables d'environnement Trello
echo "=== Test des variables d'environnement Trello ==="
echo ""
echo "TRELLO_API_KEY: ${TRELLO_API_KEY:0:10}... (longueur: ${#TRELLO_API_KEY})"
echo "TRELLO_TOKEN: ${TRELLO_TOKEN:0:20}... (longueur: ${#TRELLO_TOKEN})"
echo "TRELLO_BOARD_ID: $TRELLO_BOARD_ID"
echo ""
if [ ${#TRELLO_API_KEY} -lt 10 ]; then
    echo "⚠️  ATTENTION: La clé API semble trop courte (${#TRELLO_API_KEY} caractères)"
    echo "   Une clé API Trello fait normalement 32 caractères"
fi
if [ -z "$TRELLO_API_KEY" ] || [ -z "$TRELLO_TOKEN" ]; then
    echo "❌ ERREUR: Variables d'environnement manquantes"
else
    echo "✅ Variables d'environnement définies"
fi
