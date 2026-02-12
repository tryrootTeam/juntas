# Référence rapide - Système de design Juntas

Guide de référence rapide pour les développeurs. Pour plus de détails, consultez [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

---

## 🎨 Couleurs principales

| Usage | Token Tailwind | Valeur |
|-------|----------------|--------|
| **Primaire** | `deep-plum` | `#4A3350` |
| **CTA / Action** | `soft-terracota` | `#C9826B` |
| **Succès / Vérifié** | `sage-green` | `#7FA99B` |
| **Fond principal** | `cream` | `#F5F0E8` |
| **Fond secondaire** | `warm-sand` | `#E8DDD0` |
| **Cartes** | `off-white` | `#FDFCFA` |
| **Texte principal** | `charcoal` | `#2C2C2C` |
| **Texte secondaire** | `warm-grey` | `#6B6B6B` |

**Exemple d'utilisation :**
```vue
<div class="bg-cream text-charcoal">
  <h1 class="text-deep-plum">Titre</h1>
  <button class="bg-soft-terracota text-off-white">Cliquer</button>
</div>
```

---

## 🔤 Typographie

| Usage | Classe | Police |
|-------|--------|--------|
| Titres (h1-h6) | `font-display` | Lora (serif) |
| Texte courant | `font-body` | Inter (sans-serif) |
| Par défaut | `font-sans` | Inter (sans-serif) |

**Exemple :**
```vue
<h1 class="font-display text-4xl">Bienvenue sur Juntas</h1>
<p class="font-body text-base">Description du service...</p>
```

**Tailles :**
- `text-sm` : 14px
- `text-base` : 16px
- `text-lg` : 18px
- `text-xl` : 20px
- `text-2xl` : 24px
- `text-3xl` : 30px
- `text-4xl` : 36px
- `text-5xl` : 48px

---

## 🔘 Boutons

### Bouton primaire (CTA)
```vue
<button class="btn-primary">
  Créer mon profil
</button>
```

### Bouton secondaire
```vue
<button class="btn-secondary">
  En savoir plus
</button>
```

### Bouton tertiaire (ghost)
```vue
<button class="btn-ghost">
  Annuler
</button>
```

---

## 🃏 Composants

### Carte (feature card)
```vue
<div class="card-feature">
  <h3 class="font-display text-xl text-charcoal">Titre</h3>
  <p class="text-warm-grey">Description...</p>
</div>
```

### Badge vérifié
```vue
<span class="badge-verified">
  <svg>...</svg> Vérifié
</span>
```

### Container principal
```vue
<div class="container-juntas">
  <!-- Contenu de la page (max-width: 1280px) -->
</div>
```

---

## 📐 Espacements

Tailwind utilise une échelle basée sur 4px (0.25rem) :

| Classe | Valeur | Pixels |
|--------|--------|--------|
| `p-1`, `m-1` | 0.25rem | 4px |
| `p-2`, `m-2` | 0.5rem | 8px |
| `p-4`, `m-4` | 1rem | 16px |
| `p-6`, `m-6` | 1.5rem | 24px |
| `p-8`, `m-8` | 2rem | 32px |
| `p-12`, `m-12` | 3rem | 48px |
| `p-16`, `m-16` | 4rem | 64px |

**Exemple :**
```vue
<div class="p-6 mt-8 mb-4">
  <!-- padding: 24px, margin-top: 32px, margin-bottom: 16px -->
</div>
```

---

## 🔲 Bordures

### Rayons
- `rounded` : 8px (défaut)
- `rounded-lg` : 12px
- `rounded-xl` : 16px
- `rounded-2xl` : 24px
- `rounded-full` : 9999px (cercle)

### Exemples
```vue
<div class="rounded-xl border-2 border-charcoal/20">
  Carte avec bordure arrondie
</div>
```

---

## 🌟 Ombres

- `shadow-soft` : Ombre légère (2px)
- `shadow-md` : Ombre moyenne (4px)
- `shadow-lg` : Ombre grande (8px)
- `shadow-hover` : Ombre au survol (8px + intensité)

**Exemple :**
```vue
<div class="shadow-md hover:shadow-hover transition-all">
  Carte avec ombre interactive
</div>
```

---

## 🎭 Transitions

### CSS Variables
```css
transition: all var(--transition-base) var(--ease-out);
```

- `--transition-fast` : 150ms
- `--transition-base` : 300ms
- `--transition-slow` : 400ms
- `--ease-out` : cubic-bezier(0.33, 1, 0.68, 1)

### Classes Tailwind
```vue
<button class="transition-all duration-300 hover:scale-105">
  Bouton avec animation
</button>
```

---

## 🔢 Z-index

CSS Variables disponibles :

```css
z-index: var(--z-modal);
```

- `--z-dropdown` : 50
- `--z-sticky` : 100
- `--z-modal` : 200
- `--z-toast` : 300
- `--z-tooltip` : 400

---

## 📱 Breakpoints

| Breakpoint | Valeur | Usage |
|------------|--------|-------|
| `sm` | 640px | Petits tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Petits laptops |
| `xl` | 1280px | Desktops |

**Exemple :**
```vue
<div class="text-sm md:text-base lg:text-lg">
  Texte responsive
</div>
```

---

## ✅ Checklist : Migrer un composant

- [ ] Remplacer `max-w-5xl` / `max-w-4xl` par `.container-juntas`
- [ ] Ajouter `font-display` sur les titres
- [ ] Remplacer `text-deepblue` par `text-charcoal` ou `text-deep-plum`
- [ ] Remplacer les anciens `cream-xxx` par les nouveaux tokens
- [ ] Utiliser `.btn-primary` au lieu de boutons custom
- [ ] Utiliser `.card-feature` pour les cartes
- [ ] Utiliser `.badge-verified` pour les badges

---

## 🔍 Où chercher quoi

| Besoin | Fichier |
|--------|---------|
| **Modifier les couleurs** | `tailwind.config.js` (ligne 9-67) |
| **Modifier les polices** | `tailwind.config.js` (ligne 69-73) + `index.html` |
| **Modifier boutons/cartes** | `src/assets/main.css` (ligne 30-53) |
| **Voir l'état de migration** | `docs/DESIGN_SYSTEM_HEALTH.md` |
| **Documentation complète** | `docs/DESIGN_SYSTEM.md` |

---

## 🧪 Tester le système

```bash
npm run test-design-system
```

Ce script applique des couleurs de test pour vérifier que les changements se propagent correctement.

---

## 📚 Patterns courants

### Page avec hero
```vue
<template>
  <div class="min-h-screen bg-cream">
    <!-- Hero -->
    <section class="container-juntas py-16">
      <h1 class="font-display text-5xl text-deep-plum mb-4">
        Bienvenue
      </h1>
      <p class="text-lg text-warm-grey mb-8">
        Description...
      </p>
      <button class="btn-primary">
        Commencer
      </button>
    </section>
  </div>
</template>
```

### Card grid
```vue
<div class="container-juntas">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="card-feature">
      <h3 class="font-display text-xl text-charcoal mb-2">Titre</h3>
      <p class="text-warm-grey">Description...</p>
    </div>
  </div>
</div>
```

### Formulaire
```vue
<form class="max-w-md mx-auto space-y-4">
  <div>
    <label class="block text-sm font-medium text-charcoal mb-1">
      Email
    </label>
    <input 
      type="email"
      class="w-full px-4 py-2 rounded-lg border-2 border-charcoal/20 
             focus:border-soft-terracota focus:outline-none transition-colors"
    />
  </div>
  
  <button type="submit" class="btn-primary w-full">
    Se connecter
  </button>
</form>
```

---

**Dernière mise à jour :** 12 février 2026  
**Pour plus de détails :** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
