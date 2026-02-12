#!/usr/bin/env node

/**
 * Script de test du système de design Juntas
 * 
 * Ce script permet de tester rapidement que les changements d'identité
 * se propagent correctement à travers l'application.
 * 
 * Usage:
 *   node scripts/test-design-system.js
 * 
 * Le script va :
 * 1. Sauvegarder la configuration actuelle
 * 2. Appliquer des couleurs de test
 * 3. Attendre que vous vérifiiez l'application
 * 4. Restaurer la configuration originale
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TAILWIND_CONFIG_PATH = path.join(__dirname, '..', 'tailwind.config.js');
const BACKUP_PATH = path.join(__dirname, '..', 'tailwind.config.backup.js');

// Couleurs de test (version "Halloween" pour être évidente)
const TEST_COLORS = {
  'deep-plum': '#FF6B00',        // Orange vif (au lieu de violet)
  'soft-terracota': '#9B59B6',   // Violet (au lieu de terracota)
  'sage-green': '#E74C3C',       // Rouge (au lieu de vert)
  'warm-sand': '#F39C12',        // Orange doré (au lieu de beige)
};

// Interface pour poser des questions à l'utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n🎨 TEST DU SYSTÈME DE DESIGN JUNTAS\n');
  console.log('Ce script va modifier temporairement les couleurs pour tester');
  console.log('que les changements se propagent correctement.\n');

  // 1. Vérifier que le fichier existe
  if (!fs.existsSync(TAILWIND_CONFIG_PATH)) {
    console.error('❌ Erreur : tailwind.config.js introuvable');
    process.exit(1);
  }

  // 2. Lire le fichier original
  const originalContent = fs.readFileSync(TAILWIND_CONFIG_PATH, 'utf-8');

  // 3. Sauvegarder
  console.log('📦 Sauvegarde de la configuration actuelle...');
  fs.writeFileSync(BACKUP_PATH, originalContent);
  console.log('✅ Sauvegarde créée : tailwind.config.backup.js\n');

  // 4. Appliquer les couleurs de test
  console.log('🔧 Application des couleurs de test...');
  let modifiedContent = originalContent;
  
  for (const [colorName, testValue] of Object.entries(TEST_COLORS)) {
    const originalPattern = new RegExp(`'${colorName}':\\s*'#[0-9A-Fa-f]{6}'`, 'g');
    modifiedContent = modifiedContent.replace(
      originalPattern,
      `'${colorName}': '${testValue}'`
    );
  }

  fs.writeFileSync(TAILWIND_CONFIG_PATH, modifiedContent);
  console.log('✅ Couleurs de test appliquées :\n');
  
  console.log('   🎨 Couleurs modifiées :');
  for (const [name, color] of Object.entries(TEST_COLORS)) {
    console.log(`      • ${name}: ${color}`);
  }

  console.log('\n📋 ÉTAPES DE VÉRIFICATION :\n');
  console.log('   1. Rechargez votre application (le dev server devrait se recharger automatiquement)');
  console.log('   2. Vérifiez les pages suivantes :');
  console.log('      - Landing page : Hero (boutons, badges)');
  console.log('      - Dashboard : MatchCard (boutons)');
  console.log('      - Header & Footer');
  console.log('   3. Les couleurs doivent être TRÈS différentes (thème "Halloween")');
  console.log('   4. Vérifiez que tous les éléments ont changé de couleur de manière cohérente\n');

  console.log('⚠️  IMPORTANT : Ne commitez pas ces changements !\n');

  // 5. Attendre la confirmation
  const answer = await question('✅ Avez-vous terminé la vérification ? (o/n) : ');

  if (answer.toLowerCase() === 'o' || answer.toLowerCase() === 'y') {
    // 6. Restaurer
    console.log('\n🔄 Restauration de la configuration originale...');
    fs.writeFileSync(TAILWIND_CONFIG_PATH, originalContent);
    fs.unlinkSync(BACKUP_PATH);
    console.log('✅ Configuration restaurée avec succès\n');

    // 7. Demander le résultat du test
    const testResult = await question('✅ Le test était-il concluant ? (o/n) : ');
    
    if (testResult.toLowerCase() === 'o' || testResult.toLowerCase() === 'y') {
      console.log('\n🎉 Parfait ! Le système de design fonctionne correctement.');
      console.log('   Les changements d\'identité se propagent bien à travers l\'application.\n');
    } else {
      console.log('\n⚠️  Des problèmes ont été détectés.');
      console.log('   Consultez DESIGN_SYSTEM_HEALTH.md pour identifier les zones non migrées.\n');
    }
  } else {
    console.log('\n⏸️  Restauration annulée.');
    console.log('   Pour restaurer manuellement : mv tailwind.config.backup.js tailwind.config.js\n');
  }

  rl.close();
}

// Gestion de Ctrl+C pour restaurer en cas d'interruption
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Interruption détectée...');
  
  if (fs.existsSync(BACKUP_PATH)) {
    console.log('🔄 Restauration automatique de la configuration...');
    const originalContent = fs.readFileSync(BACKUP_PATH, 'utf-8');
    fs.writeFileSync(TAILWIND_CONFIG_PATH, originalContent);
    fs.unlinkSync(BACKUP_PATH);
    console.log('✅ Configuration restaurée\n');
  }
  
  process.exit(0);
});

main().catch((error) => {
  console.error('\n❌ Erreur :', error.message);
  
  // Restaurer en cas d'erreur
  if (fs.existsSync(BACKUP_PATH)) {
    console.log('🔄 Restauration de la configuration...');
    const originalContent = fs.readFileSync(BACKUP_PATH, 'utf-8');
    fs.writeFileSync(TAILWIND_CONFIG_PATH, originalContent);
    fs.unlinkSync(BACKUP_PATH);
    console.log('✅ Configuration restaurée\n');
  }
  
  process.exit(1);
});
