# Proposition de design Juntas - Basée sur le Mood Board

Document créé le 12 février 2026

---

## 🎯 Vision du design

D'après le mood board, Juntas se positionne comme une **plateforme chaleureuse, moderne et authentique** pour créer des connexions significatives entre femmes qui cherchent une colocation. Le design doit respirer la **confiance, la communauté et la sérénité**.

### Mots-clés du mood board
- **Chaleureux** : couleurs terreuses et douces
- **Communautaire** : focus sur les relations humaines
- **Naturel** : éléments botaniques, photos authentiques
- **Moderne** : typographie serif + sans-serif, mise en page bento box
- **Professionnel** : couleurs sophistiquées (prune, terracotta)

---

## 🎨 Système de couleurs - Validé et enrichi

### Palette principale (déjà excellente ✅)

```css
/* Couleurs mood board - ALIGNÉES */
deep-plum: #4A3350        /* Prune sophistiqué - Headers, navigation */
soft-terracota: #C9826B   /* Terracotta chaud - CTA, actions */
sage-green: #7FA99B       /* Vert sauge - Vérification, succès */
warm-sand: #E8DDD0        /* Sable chaud - Fond secondaire */
cream: #F5F0E8            /* Crème douce - Fond principal */
```

### Nouvelles nuances ajoutées 🆕

```css
soft-sage: #B8CEC7        /* Vert sauge clair - Hover, backgrounds subtils */
warm-terracota: #B57156   /* Terracotta intense - Accents, hover sur CTA */
```

### Usage recommandé par contexte

| Contexte | Couleur principale | Couleur secondaire | Fond |
|----------|-------------------|-------------------|------|
| **CTA / Actions primaires** | `soft-terracota` | `warm-terracota` (hover) | — |
| **Vérification / Succès** | `sage-green` | `soft-sage` (background) | `sage-green/10` |
| **Navigation / Headers** | `deep-plum` | `charcoal` | `off-white` |
| **Cartes / Conteneurs** | `charcoal` (texte) | `warm-grey` (secondaire) | `off-white` |
| **Backgrounds** | — | — | `cream` (principal), `warm-sand` (secondaire) |

---

## ✍️ Typographie - Style éditorial moderne

### Polices actuelles (parfaites ✅)

**Lora** (display) : Serif élégante et chaleureuse  
**Inter** (body) : Sans-serif moderne et lisible

```css
/* Titres - Lora (serif) */
font-display → h1, h2, h3, hero titles, section headers

/* Corps de texte - Inter (sans-serif) */
font-body → paragraphes, labels, boutons, navigation
```

### Hiérarchie typographique recommandée

```css
/* Page hero / Landing */
h1: text-5xl font-display (48px)  → "JUNTAS"
p (tagline): text-xl font-body    → "Find Your Home, Find the Community"

/* Sections / Dashboard */
h2: text-3xl font-display (30px)  → "Tus matches"
h3: text-2xl font-display (24px)  → Titres de cartes

/* Composants / Cartes */
h4: text-xl font-display (20px)   → Nom de profil
p: text-base font-body (16px)     → Description
small: text-sm font-body (14px)   → Labels, metadata
```

### Recommandations mood board

- **Gras avec parcimonie** : Réserver le font-medium (500) et font-semibold (600) aux éléments importants
- **Line-height généreux** : 1.5 pour le body, 1.2-1.3 pour les titres (meilleure lisibilité)
- **Contraste doux** : Utiliser `warm-grey` (#6B6B6B) pour le texte secondaire au lieu de noir pur

---

## 🧩 Composants UI - Style mood board

### 1. Boutons

#### Primary Button (CTA)
**Usage :** Actions principales (inscription, commencer, envoyer message)

```html
<button class="btn-primary">
  Comenzar ahora
</button>
```

**Style actuel :** ✅ Excellent  
**Améliorations mood board :**
- Ajouter une légère élévation au hover (`hover:-translate-y-1`)
- Transition douce et naturelle (300ms cubic-bezier)

#### Secondary Button
**Usage :** Actions secondaires (en savoir plus, filtrer)

```html
<button class="btn-secondary">
  Saber más
</button>
```

**Style actuel :** ✅ Bon  
**Note :** Border subtil avec `charcoal/20` - très en phase avec le mood board

#### Ghost Button
**Usage :** Actions tertiaires, navigation subtile

```html
<button class="btn-ghost">
  Cancelar
</button>
```

---

### 2. Cartes (Feature Cards)

**Usage :** Cartes de match, fonctionnalités, sections de contenu

```html
<div class="card-feature">
  <h3 class="font-display text-xl text-charcoal">Título</h3>
  <p class="text-warm-grey">Descripción...</p>
</div>
```

**Style actuel :** ✅ Très bon  
**Améliorations mood board :**

```css
/* Ajouter des variations de cartes */
.card-feature-highlight {
  /* Carte mise en avant avec bordure terracotta */
  @apply card-feature border-2 border-soft-terracota;
}

.card-feature-glass {
  /* Effet glassmorphism subtil */
  @apply rounded-xl bg-off-white/80 backdrop-blur-sm p-6 shadow-soft;
}
```

---

### 3. Badges

#### Badge Verified (Sage Green)
**Usage :** Profils vérifiés, états de succès

```html
<span class="badge-verified">
  <svg>...</svg> Verificada
</span>
```

**Style actuel :** ✅ Parfait

#### Nouveaux badges mood board 🆕

```css
/* Badge communauté (pour groupes, événements) */
.badge-community {
  @apply inline-flex items-center gap-1.5 rounded-full 
         bg-deep-plum/10 px-2.5 py-1 text-xs font-medium text-deep-plum;
}

/* Badge nouvelle (nouveau match, nouveau message) */
.badge-new {
  @apply inline-flex items-center gap-1.5 rounded-full 
         bg-soft-terracota/15 px-2.5 py-1 text-xs font-medium text-soft-terracota;
}

/* Badge statut (disponible, occupé, etc.) */
.badge-status {
  @apply inline-flex items-center gap-1.5 rounded-full 
         bg-warm-sand px-2.5 py-1 text-xs font-medium text-charcoal;
}
```

---

### 4. Iconographie - Style mood board

**Éléments botaniques du mood board :** Feuilles minimalistes, lignes organiques

**Recommandations :**
1. **Bibliothèque d'icônes :** Utiliser **Phosphor Icons** ou **Lucide** (style line, rond, cohérent)
2. **Taille :** 20px-24px pour les icônes dans les boutons, 32px-48px pour les icônes de features
3. **Couleur :** 
   - Icônes principales → `charcoal` ou `deep-plum`
   - Icônes secondaires → `warm-grey`
   - Icônes d'état → `sage-green`, `soft-terracota`

**Éléments décoratifs botaniques :**
- À utiliser avec parcimonie (hero, footer, pages vides)
- Style : Line art, stroke de 1-2px, couleur `warm-sand` ou `sage-green/30`
- Placement : Coins, backgrounds subtils

**Exemple SVG botanique mood board :**

```html
<!-- Élément décoratif feuille - à placer dans hero ou footer -->
<svg class="absolute -top-10 -right-10 text-warm-sand opacity-40" 
     width="200" height="200" viewBox="0 0 200 200">
  <path d="M50,100 Q100,50 150,100 Q100,150 50,100" 
        fill="none" stroke="currentColor" stroke-width="2"/>
  <!-- Feuille stylisée simple -->
</svg>
```

---

### 5. Layout - Style Bento Box (mood board)

Le mood board présente un style **bento box** : cartes de tailles variées, disposition en grille irrégulière.

#### Container principal
```css
.container-juntas {
  max-width: 1280px;  /* Déjà défini ✅ */
  padding: responsive;
}
```

#### Grilles mood board

**Grid classique (Dashboard, Matches)**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cartes de match -->
</div>
```

**Bento Grid (Landing, Features) 🆕**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
  <div class="card-feature col-span-2 row-span-2">Grande carte</div>
  <div class="card-feature">Petite carte</div>
  <div class="card-feature">Petite carte</div>
  <div class="card-feature col-span-2">Carte horizontale</div>
</div>
```

**Spacing mood board :**
- Gap entre cartes : `gap-4` (16px) à `gap-6` (24px)
- Padding sections : `py-12` (48px) à `py-16` (64px)
- Marges internes cartes : `p-6` (24px)

---

## 🖼️ Images et photos - Style mood board

### Directives photos

Le mood board montre des photos **authentiques, chaleureuses, et communautaires** :

1. **Sujets :** Groupes de femmes (2-4 personnes), moments de vie réels (cuisine, yoga, discussion)
2. **Ambiance :** Lumière naturelle, intérieurs chaleureux, espaces conviviaux
3. **Couleurs :** Tons chauds (beiges, bois, plantes vertes) qui s'harmonisent avec la palette
4. **Cadrage :** Plans moyens, focus sur les interactions humaines

### Traitement recommandé

```css
/* Style photo profil - coin arrondi */
.profile-photo {
  @apply rounded-xl object-cover; /* 12px radius - cohérent avec card-feature */
}

/* Grande photo hero/bento */
.photo-hero {
  @apply rounded-2xl object-cover; /* 24px radius - plus doux */
}

/* Filtre subtil warm (optionnel) */
.photo-warm-filter {
  filter: sepia(5%) saturate(105%) brightness(102%);
}
```

### Overlay pour texte sur image

```css
/* Overlay gradient doux pour lisibilité texte */
.photo-overlay {
  @apply relative;
}
.photo-overlay::after {
  content: '';
  @apply absolute inset-0 bg-gradient-to-t from-deep-plum/60 to-transparent rounded-2xl;
}
```

---

## 🌈 Effets et animations - Mood board moderne

### Transitions douces

```css
/* Déjà défini dans :root ✅ */
--transition-fast: 150ms;   /* Hover instantané */
--transition-base: 300ms;   /* Standard (boutons, cartes) */
--transition-slow: 400ms;   /* Modales, menus */
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);  /* Ease naturel */
```

### Micro-interactions recommandées

**Hover sur carte (déjà implémenté ✅)**
```css
.card-feature:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}
```

**Hover sur bouton primaire 🆕**
```css
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(201, 130, 107, 0.25); /* Shadow terracotta */
}
```

**Focus states accessibles**
```css
/* Déjà bien implémenté avec focus:ring ✅ */
/* Ring couleur adaptée à chaque bouton */
```

### Effet parallax subtil (optionnel)

Pour les éléments décoratifs botaniques sur la landing :

```css
/* À ajouter via JS ou CSS transform */
.botanical-decor {
  transition: transform 0.3s ease-out;
}
.botanical-decor:hover {
  transform: translateY(-4px) rotate(2deg);
}
```

---

## 📱 Responsive - Approche mobile-first

Le mood board présente des layouts adaptables. Recommandations :

### Breakpoints (déjà définis ✅)
```javascript
sm: 640px   // Mobile large / Tablette portrait
md: 768px   // Tablette
lg: 1024px  // Desktop
xl: 1280px  // Desktop large
```

### Adaptation des grilles

**Mobile (< 640px)**
```css
grid-cols-1  /* Une seule colonne */
gap-4        /* Gap réduit */
text-3xl     /* Titres plus petits (30px au lieu de 48px) */
```

**Tablette (640-1024px)**
```css
grid-cols-2  /* Deux colonnes */
gap-6        /* Gap standard */
```

**Desktop (> 1024px)**
```css
grid-cols-3 ou grid-cols-4  /* Grille complète */
gap-6 ou gap-8
```

### Images responsives

```html
<img 
  srcset="image-small.jpg 640w, image-medium.jpg 1024w, image-large.jpg 1920w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  class="profile-photo"
  alt="Descripción"
>
```

---

## 🎨 Exemples concrets - Pages mood board

### Landing Page (Hero)

**Inspiration mood board :** Grand titre Lora + tagline + bento box de photos + CTA terracotta

```html
<section class="container-juntas py-16">
  <!-- Hero header -->
  <div class="text-center mb-12">
    <h1 class="font-display text-5xl text-deep-plum mb-4">
      JUNTAS
    </h1>
    <p class="text-xl text-warm-grey font-body">
      Find Your Home, Find the Community
    </p>
  </div>
  
  <!-- Bento grid de photos + features -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] mb-8">
    <div class="col-span-2 row-span-2 rounded-2xl overflow-hidden">
      <img src="..." alt="..." class="w-full h-full object-cover">
    </div>
    <div class="card-feature">
      <span class="text-4xl mb-2">🏡</span>
      <h3 class="font-display text-lg text-charcoal">Match con mujeres increíbles</h3>
    </div>
    <div class="card-feature">
      <span class="text-4xl mb-2">🍃</span>
      <h3 class="font-display text-lg text-charcoal">Co-living en espacios bonitos</h3>
    </div>
    <!-- ... autres cartes ... -->
  </div>
  
  <!-- CTA buttons -->
  <div class="flex flex-col sm:flex-row gap-4 justify-center">
    <button class="btn-primary">
      Comenzar ahora
    </button>
    <button class="btn-secondary">
      Saber más
    </button>
  </div>
</section>
```

---

### Dashboard (Matches)

**Inspiration mood board :** Grille de cartes uniformes, badge verified sage-green

```html
<section class="container-juntas py-8">
  <div class="mb-8">
    <h2 class="font-display text-3xl text-charcoal mb-2">
      Tus matches
    </h2>
    <p class="text-warm-grey">
      Mujeres que comparten tus valores y estilo de vida
    </p>
  </div>
  
  <!-- Grille matches -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    <!-- Match Card -->
    <div class="card-feature">
      <!-- Photo -->
      <div class="relative mb-4">
        <img src="..." alt="..." class="profile-photo w-full h-48">
        <span class="badge-verified absolute top-2 right-2">
          <svg>...</svg> Verificada
        </span>
      </div>
      
      <!-- Info -->
      <h3 class="font-display text-xl text-charcoal mb-1">
        María García
      </h3>
      <p class="text-sm text-warm-grey mb-3">
        28 años • Diseñadora • No fumadora
      </p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="badge-status">🧘‍♀️ Yoga</span>
        <span class="badge-status">🌱 Vegana</span>
        <span class="badge-status">🎨 Arte</span>
      </div>
      
      <!-- Compatibilidad -->
      <div class="flex items-center gap-2 mb-4">
        <div class="flex-1 h-2 bg-warm-sand rounded-full overflow-hidden">
          <div class="h-full bg-sage-green w-[85%] rounded-full"></div>
        </div>
        <span class="text-sm font-medium text-sage-green">85%</span>
      </div>
      
      <!-- Actions -->
      <div class="flex gap-3">
        <button class="btn-primary flex-1">
          Ver perfil
        </button>
        <button class="btn-ghost">
          <svg>...</svg>
        </button>
      </div>
    </div>
    
  </div>
</section>
```

---

### Profil (Mi Perfil)

**Inspiration mood board :** Photo grande, sections accordion, toggles sage-green

```html
<section class="container-juntas py-8 max-w-4xl">
  
  <!-- Header avec photo -->
  <div class="card-feature mb-8 text-center">
    <div class="relative inline-block mb-4">
      <img src="..." alt="..." 
           class="w-40 h-40 rounded-2xl object-cover mx-auto">
      <span class="badge-verified absolute bottom-2 right-2">
        <svg>...</svg> Verificada
      </span>
    </div>
    <h1 class="font-display text-3xl text-charcoal mb-2">
      Tu nombre
    </h1>
    <p class="text-warm-grey">28 años • Madrid</p>
  </div>
  
  <!-- Sections éditables -->
  <div class="space-y-4">
    
    <!-- Section Sobre mí -->
    <div class="card-feature">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-display text-xl text-charcoal">
          Sobre mí
        </h2>
        <button class="btn-ghost text-sm">
          Editar
        </button>
      </div>
      <p class="text-warm-grey">
        Descripción...
      </p>
    </div>
    
    <!-- Section Preferencias avec toggles -->
    <div class="card-feature">
      <h2 class="font-display text-xl text-charcoal mb-4">
        Preferencias
      </h2>
      
      <!-- Toggle item -->
      <div class="flex items-center justify-between py-3 border-b border-warm-sand last:border-0">
        <div>
          <p class="text-charcoal font-medium">Acepto mascotas</p>
          <p class="text-sm text-warm-grey">Perros y gatos bienvenidos</p>
        </div>
        <button class="toggle-switch">
          <!-- Toggle switch avec sage-green quand actif -->
          <div class="w-12 h-6 bg-sage-green rounded-full relative">
            <div class="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
          </div>
        </button>
      </div>
      
    </div>
    
  </div>
  
</section>
```

---

## 🎯 Checklist d'implémentation

### Étapes prioritaires

- [x] **Palette de couleurs** : Validée et enrichie (soft-sage, warm-terracota) ✅
- [ ] **Composants cartes** : Ajouter `.card-feature-highlight` et `.card-feature-glass`
- [ ] **Badges** : Ajouter `.badge-community`, `.badge-new`, `.badge-status`
- [ ] **Icônes botaniques** : Créer 3-4 SVG décoratifs (feuilles) pour hero/footer
- [ ] **Micro-interactions** : Ajouter hover elevate sur btn-primary
- [ ] **Toggle switches** : Créer composant avec sage-green actif
- [ ] **Bento grid** : Implémenter sur landing hero
- [ ] **Photos** : Appliquer border-radius cohérent (12px/24px)

### Migration des pages (selon DESIGN_SYSTEM_HEALTH.md)

**Phase 1 - Quick wins**
- [ ] TestimonialsSection → container-juntas, font-display, card-feature
- [ ] Dashboard stats → card-feature avec couleurs PRD

**Phase 2 - Pages principales**
- [ ] Match Profile → layout complet
- [ ] Mi Perfil → sections + toggles
- [ ] Chat → bulles et sidebar

**Phase 3 - Flows**
- [ ] Onboarding → 6 steps
- [ ] Auth → toutes les vues

---

## 📚 Ressources et inspirations

### Mood board analysé

- **Typographie** : Serif (Lora) + Sans-serif (Inter) ✅
- **Palette** : Prune + Terracotta + Sage + Beige ✅
- **Style photos** : Authentiques, chaleureuses, communautaires
- **Layout** : Bento box, cartes arrondies, espaces respirants
- **Iconographie** : Botanique minimaliste (feuilles, lignes organiques)

### Sites de référence (style similaire)

- **Airbnb** : Photos chaleureuses, cartes élevées, CTA clairs
- **Kinfolk** : Typographie serif élégante, palette terreuse
- **The Everygirl** : Communauté de femmes, design chaleureux

### Bibliothèques recommandées

- **Icônes** : Phosphor Icons, Lucide
- **Animations** : Framer Motion (Vue)
- **Images** : Unsplash (recherche : "women community", "cozy home", "shared living")

---

**Conclusion :** Votre design system est déjà excellemment aligné avec le mood board. Les ajustements proposés (nouveaux badges, bento grid, éléments botaniques) enrichiront l'expérience tout en maintenant la cohérence. La priorité est maintenant de **migrer les pages restantes** vers ce système déjà très solide.

---

**Document préparé par :** Système de design Juntas  
**Référence mood board :** Fourni le 12 février 2026  
**Prochaine étape :** Implémenter les composants manquants et migrer les pages (voir DESIGN_SYSTEM_HEALTH.md)
