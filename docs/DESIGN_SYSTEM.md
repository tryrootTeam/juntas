# Système de design Juntas

## 📋 Table des matières

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Guide de modification d'identité](#guide-de-modification-didentité)
4. [Tokens de design](#tokens-de-design)
5. [Composants UI](#composants-ui)
6. [Migration et maintenance](#migration-et-maintenance)

---

## Introduction

Ce document décrit le système de design de Juntas et explique comment effectuer des changements d'identité visuelle (rebranding, nouvelles couleurs, typographie, etc.) de manière centralisée et cohérente.

### Objectifs

- **Centralisation** : Un seul point de vérité pour tous les tokens de design
- **Facilité de maintenance** : Changer l'identité en modifiant quelques fichiers seulement
- **Cohérence** : Garantir une expérience visuelle uniforme à travers toute l'application
- **Documentation** : Permettre à n'importe quel développeur de comprendre et modifier le design

---

## Architecture

Le système de design repose sur deux fichiers principaux :

```
📁 juntas_project/
├── 📄 tailwind.config.js      # Configuration Tailwind : couleurs, typographie, espacements
├── 📁 src/
│   └── 📁 assets/
│       └── 📄 main.css         # Classes CSS utilitaires et composants
└── 📄 index.html               # Chargement des polices Google Fonts
```

### Hiérarchie de priorité

1. **Tokens de base** (`tailwind.config.js`) → définit les valeurs brutes
2. **Composants CSS** (`main.css`) → utilise les tokens pour créer des patterns réutilisables
3. **Composants Vue** → utilisent les classes Tailwind et les composants CSS

---

## Guide de modification d'identité

### 🎨 Comment changer la palette de couleurs

**Fichier à modifier :** `tailwind.config.js`

```javascript
// Ligne 9-27 : Couleurs principales
colors: {
  'deep-plum': '#4A3350',      // Couleur primaire principale
  'warm-sand': '#E8DDD0',       // Couleur de fond secondaire
  'soft-terracota': '#C9826B',  // Couleur d'accentuation (CTA)
  'sage-green': '#7FA99B',      // Couleur de succès/vérification
  'muted-rose': '#D4A59A',      // Couleur tertiaire
  // ...
}
```

**Impact :** La modification de ces couleurs se propage automatiquement à toute l'application via les classes Tailwind (`bg-deep-plum`, `text-sage-green`, etc.).

**Test rapide :** Changer `soft-terracota` et vérifier les boutons primaires sur la landing page.

### 🔤 Comment changer la typographie

**Fichier à modifier :** `tailwind.config.js` + `index.html`

**Étape 1 : Modifier les polices dans Tailwind**

```javascript
// Ligne 69-73 : Familles de polices
fontFamily: {
  display: ['Lora', 'Georgia', 'serif'],      // Titres & headers
  body: ['Inter', 'system-ui', 'sans-serif'], // Texte courant
  sans: ['Inter', 'system-ui', 'sans-serif'], // Default
},
```

**Étape 2 : Charger les nouvelles polices Google Fonts**

Dans `index.html` (lignes 7-8) :

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Remplacer `Lora` et `Inter` par les nouvelles polices choisies, puis mettre à jour `tailwind.config.js`.

**Impact :**
- `font-display` → tous les titres (h1, h2, h3, etc.)
- `font-body` → tout le texte courant

### 📏 Comment modifier les espacements

**Fichier à modifier :** `tailwind.config.js`

```javascript
// Ligne 85-89 : Espacements personnalisés
spacing: {
  '18': '4.5rem',  // 72px
  '22': '5.5rem',  // 88px
  '30': '7.5rem',  // 120px
},
```

**Note :** Tailwind inclut déjà une échelle d'espacements basée sur 4px (0.25rem). N'ajoutez ici que des valeurs spécifiques à Juntas.

### 🔘 Comment modifier les rayons de bord

**Fichier à modifier :** `tailwind.config.js`

```javascript
// Ligne 90-96 : Border radius
borderRadius: {
  'DEFAULT': '8px',   // rounded
  'md': '8px',
  'lg': '12px',       // rounded-lg
  'xl': '16px',       // rounded-xl
  '2xl': '24px',      // rounded-2xl
},
```

### 🌟 Comment modifier les ombres

**Fichier à modifier :** `tailwind.config.js`

```javascript
// Ligne 97-102 : Ombres basées sur deep-plum
boxShadow: {
  'soft': '0 2px 8px rgba(74, 51, 80, 0.08)',
  'md': '0 4px 12px rgba(74, 51, 80, 0.1)',
  'lg': '0 8px 24px rgba(74, 51, 80, 0.12)',
  'hover': '0 8px 20px rgba(74, 51, 80, 0.15)',
},
```

**Astuce :** Les valeurs RGBA (74, 51, 80) correspondent à `deep-plum`. Si vous changez la couleur primaire, ajustez ces valeurs.

### 🖥️ Comment modifier le container principal

**Fichier à modifier :** `tailwind.config.js`

```javascript
// Ligne 106-108 : Largeur max du container
maxWidth: {
  'container': '1280px',
},
```

**Utilisation :** Classe `.container-juntas` dans `main.css`.

---

## Tokens de design

### Palette de couleurs complète

| Token | Valeur | Usage |
|-------|--------|-------|
| **Couleurs primaires** |
| `deep-plum` | `#4A3350` | Couleur principale, headers, éléments importants |
| `soft-terracota` | `#C9826B` | Boutons primaires, CTA, actions principales |
| `sage-green` | `#7FA99B` | Badges vérifiés, succès, états positifs |
| **Couleurs de fond** |
| `cream` | `#F5F0E8` | Fond principal de l'application |
| `warm-sand` | `#E8DDD0` | Fond secondaire, hover states |
| `off-white` | `#FDFCFA` | Cartes, zones élevées |
| **Couleurs de texte** |
| `charcoal` | `#2C2C2C` | Texte principal |
| `warm-grey` | `#6B6B6B` | Texte secondaire, labels |
| **Couleurs tertiaires** |
| `muted-rose` | `#D4A59A` | Accentuation douce |

### Échelles de couleurs

Les couleurs `terracota`, `sage`, `deepblue`, et `cream` ont des variantes (50-900) pour plus de flexibilité :

```css
/* Exemple : terracota */
.bg-terracota-50   /* Très clair */
.bg-terracota-400  /* Base (= soft-terracota) */
.bg-terracota-900  /* Très foncé */
```

### Variables CSS personnalisées

**Fichier :** `src/assets/main.css` (lignes 6-16)

```css
:root {
  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 300ms;
  --transition-slow: 400ms;
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  
  /* Z-index */
  --z-dropdown: 50;
  --z-sticky: 100;
  --z-modal: 200;
  --z-toast: 300;
  --z-tooltip: 400;
}
```

**Usage :**
```css
.mon-composant {
  transition: all var(--transition-base) var(--ease-out);
  z-index: var(--z-modal);
}
```

---

## Composants UI

Le fichier `src/assets/main.css` définit des composants CSS réutilisables qui utilisent les tokens de design.

### 🔘 Boutons

#### `.btn-primary`
Bouton d'action principale (CTA)

```html
<button class="btn-primary">
  Créer mon profil
</button>
```

**Couleurs utilisées :**
- Fond : `bg-soft-terracota`
- Hover : `hover:bg-terracota-600`
- Texte : `text-off-white`

**Modification :** Pour changer la couleur des boutons primaires, modifier `soft-terracota` dans `tailwind.config.js`.

#### `.btn-secondary`
Bouton d'action secondaire

```html
<button class="btn-secondary">
  En savoir plus
</button>
```

**Couleurs utilisées :**
- Fond : `bg-cream`
- Bordure : `border-charcoal/20`
- Hover : `hover:bg-off-white`

#### `.btn-ghost`
Bouton tertiaire / action légère

```html
<button class="btn-ghost">
  Annuler
</button>
```

### 🃏 Cartes

#### `.card-feature`
Carte pour afficher des fonctionnalités, matches, contenus importants

```html
<div class="card-feature">
  <h3 class="font-display text-xl">Titre</h3>
  <p>Description...</p>
</div>
```

**Propriétés :**
- Fond : `bg-off-white`
- Ombre : `shadow-md`
- Hover : `hover:shadow-hover` + translation -0.5

### 🏷️ Badges

#### `.badge-verified`
Badge de vérification (profil vérifié)

```html
<span class="badge-verified">
  <svg>...</svg> Vérifié
</span>
```

**Couleurs utilisées :**
- Fond : `bg-sage-green/15` (15% d'opacité)
- Texte : `text-sage-green`

### 📦 Container

#### `.container-juntas`
Container principal avec largeur max 1280px

```html
<div class="container-juntas">
  <!-- Contenu de la page -->
</div>
```

**Propriétés :**
- Max-width : `1280px`
- Padding responsive : `px-4 sm:px-6 lg:px-8`
- Centré : `mx-auto`

---

## Migration et maintenance

### État actuel de la migration

Consultez le fichier [`DESIGN_SYSTEM_HEALTH.md`](./DESIGN_SYSTEM_HEALTH.md) pour connaître l'état d'application du design system dans chaque section de l'application.

**Résumé :**
- ✅ **Complété** : Setup, Layout (Header/Footer), Landing (Hero, HowItWorks, CTA), Dashboard (MatchCard)
- ⏳ **À migrer** : Dashboard (contenu), Match Profile, Chat, Onboarding, Mi Perfil, Auth

### Checklist pour migrer un composant

Lorsque vous migrez un composant vers le design system :

- [ ] **Conteneur** : Utiliser `.container-juntas` au lieu de `max-w-[custom]`
- [ ] **Typographie**
  - [ ] Titres : ajouter `font-display`
  - [ ] Texte : vérifier que `font-body` est appliqué (par défaut)
- [ ] **Couleurs**
  - [ ] Remplacer les anciennes couleurs (`deepblue`, `cream-xxx`) par les nouvelles (`deep-plum`, `charcoal`, `warm-grey`)
  - [ ] Utiliser les tokens : `bg-soft-terracota`, `text-sage-green`, etc.
- [ ] **Boutons**
  - [ ] Utiliser `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- [ ] **Cartes**
  - [ ] Utiliser `.card-feature` pour les cartes principales
- [ ] **Badges**
  - [ ] Utiliser `.badge-verified` pour les badges de vérification
- [ ] **Espacements**
  - [ ] Utiliser l'échelle Tailwind standard (p-4, mt-6, etc.)
- [ ] **Bordures**
  - [ ] Utiliser `rounded-lg`, `rounded-xl`, etc.

### Exemple de migration

**Avant (ancien système) :**

```vue
<template>
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-deepblue font-bold text-2xl">
      Mon titre
    </h2>
    <button class="bg-terracota-500 text-white px-4 py-2 rounded">
      Cliquer ici
    </button>
  </div>
</template>
```

**Après (design system) :**

```vue
<template>
  <div class="container-juntas">
    <h2 class="font-display text-charcoal text-2xl">
      Mon titre
    </h2>
    <button class="btn-primary">
      Cliquer ici
    </button>
  </div>
</template>
```

### Test de changement d'identité

Pour valider que le système de design fonctionne correctement :

1. **Modifier la couleur primaire** dans `tailwind.config.js` :
   ```javascript
   'soft-terracota': '#FF6B6B', // Rouge vif au lieu de terracota
   ```

2. **Vérifier les pages principales** :
   - Landing : boutons hero, CTA
   - Dashboard : boutons dans MatchCard
   - Toute autre page migrée

3. **Résultat attendu** : Tous les boutons primaires et éléments terracota doivent changer de couleur instantanément.

4. **Rétablir** la couleur originale après le test.

---

## Questions fréquentes

### Pourquoi deux fichiers (`tailwind.config.js` et `main.css`) ?

- **`tailwind.config.js`** : Définit les tokens bruts (couleurs, tailles, espacements). C'est le point de vérité.
- **`main.css`** : Combine plusieurs tokens pour créer des composants réutilisables (boutons, cartes). C'est le niveau d'abstraction.

Cette séparation permet de changer les tokens sans toucher aux composants, et vice-versa.

### Puis-je utiliser les couleurs directement sans classes utilitaires ?

Oui, les couleurs sont disponibles en CSS via Tailwind :

```css
.mon-element {
  background-color: theme('colors.soft-terracota');
  color: theme('colors.charcoal');
}
```

Mais privilégiez les classes Tailwind ou les composants CSS définis.

### Comment ajouter une nouvelle couleur ?

1. Ajouter la couleur dans `tailwind.config.js` :
   ```javascript
   colors: {
     // ...
     'ma-nouvelle-couleur': '#123456',
   }
   ```

2. L'utiliser via les classes Tailwind :
   ```html
   <div class="bg-ma-nouvelle-couleur text-white">...</div>
   ```

### Où trouver les anciennes couleurs à migrer ?

Les anciennes couleurs à remplacer :
- `deepblue` → `charcoal` ou `deep-plum`
- `cream-100`, `cream-200`, etc. (ancienne échelle) → `cream-50`, `cream-100` (nouvelle échelle)
- `terracota-xxx` (anciens) → `soft-terracota` ou `terracota-400`
- `sage-xxx` (anciens) → `sage-green` ou `sage-300`

Consultez [`DESIGN_SYSTEM_HEALTH.md`](./DESIGN_SYSTEM_HEALTH.md) pour identifier les fichiers encore à migrer.

---

## Ressources

- **PRD Design System** : Carte Trello `[juntas] - design (PRD Design System Juntas)`
- **État de santé** : [`DESIGN_SYSTEM_HEALTH.md`](./DESIGN_SYSTEM_HEALTH.md)
- **Tailwind Documentation** : https://tailwindcss.com/docs
- **Google Fonts (Lora)** : https://fonts.google.com/specimen/Lora
- **Google Fonts (Inter)** : https://fonts.google.com/specimen/Inter

---

**Dernière mise à jour :** 12 février 2026  
**Version du design system :** v2.0  
**Maintenu par :** Équipe Juntas
