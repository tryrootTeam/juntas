# 🎨 Redesign Ultra-Moderne Juntas 2026

**Analyse critique du design actuel + Proposition de redesign contemporain**

---

## ❌ Problèmes du design actuel

### 1. **Couleurs archaïques**
- Utilise encore `deepblue`, `terracota-500`, `cream-200` (ancien système)
- Manque de cohérence avec la palette mood board
- Pas d'exploitation des nuances subtiles

### 2. **Navigation datée**
- Header classique sans caractère
- Logo circulaire générique (lettre "J")
- Navigation en liste horizontale basique
- Mobile menu sans transition fluide

### 3. **Cards plates et sans vie**
- MatchCard : Avatar avec initiale au lieu de photo
- Pas de depth (ombres plates)
- Manque de hiérarchie visuelle
- Boutons alignés de façon utilitaire

### 4. **Typographie fade**
- Peu d'utilisation de `font-display` (Lora)
- Poids de police uniformes (pas assez de contraste)
- Line-height serré

### 5. **Manque d'éléments modernes 2026**
- ❌ Pas de glassmorphism
- ❌ Pas de micro-animations
- ❌ Pas d'effets de depth moderne
- ❌ Pas de gradients subtils
- ❌ Pas d'éléments décoratifs botaniques
- ❌ Photos minuscules ou absentes

---

## ✨ Proposition Redesign Ultra-Moderne 2026

### 🎯 Tendances 2026 à appliquer

1. **Glassmorphism élégant** (Comme iOS / Windows 11)
2. **Soft shadows multi-layers** (Apple design)
3. **Spacing généreux** (Notion, Linear)
4. **Typographie expressive** (Variable fonts, contraste fort)
5. **Gradients mesh subtils** (Stripe, Vercel)
6. **Micro-animations fluides** (60fps smooth)
7. **Photos grandes et impactantes** (Airbnb, Behance)
8. **Bento grid asymétrique** (Apple, Figma)
9. **Rounded corners généreux** (16-24px)
10. **Color tokens avec alpha** (Transparence sophistiquée)

---

## 🎨 Nouveau système de couleurs avancé

### Tokens de couleurs avec variations alpha

```javascript
// tailwind.config.js - NOUVEAU SYSTÈME 2026
colors: {
  // === COULEURS PRIMAIRES (MOOD BOARD) ===
  plum: {
    DEFAULT: '#4A3350',
    50: '#F5F3F6',
    100: '#EBE7ED',
    200: '#D7CFE0',
    300: '#C3B7D3',
    400: '#8B7395',
    500: '#4A3350',
    600: '#3D2A42',
    700: '#302135',
    800: '#231828',
    900: '#16101A',
  },
  terracotta: {
    DEFAULT: '#C9826B',
    50: '#FBF6F4',
    100: '#F6EDE9',
    200: '#EDDBD3',
    300: '#E4C9BD',
    400: '#D6A594',
    500: '#C9826B',
    600: '#B3664F',
    700: '#8D503E',
    800: '#67382C',
    900: '#42201A',
  },
  sage: {
    DEFAULT: '#7FA99B',
    50: '#F3F8F7',
    100: '#E7F1EF',
    200: '#CFE3DF',
    300: '#B7D5CF',
    400: '#9BBFB5',
    500: '#7FA99B',
    600: '#5F8A7D',
    700: '#4A6B60',
    800: '#354D44',
    900: '#202E29',
  },
  sand: {
    DEFAULT: '#E8DDD0',
    50: '#FAF8F5',
    100: '#F5F1EB',
    200: '#EBE3D7',
    300: '#E8DDD0',
    400: '#D9C8B4',
    500: '#C9B398',
    600: '#B19B7C',
    700: '#8F7D60',
    800: '#6A5D47',
    900: '#453D2E',
  },
  
  // === COULEURS NEUTRES MODERNES ===
  neutral: {
    DEFAULT: '#2C2C2C',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#2C2C2C',
    900: '#1A1A1A',
    950: '#0F0F0F',
  },
  
  // === COULEURS SÉMANTIQUES ===
  success: {
    light: '#E7F1EF',
    DEFAULT: '#7FA99B',
    dark: '#4A6B60',
  },
  warning: {
    light: '#F6EDE9',
    DEFAULT: '#C9826B',
    dark: '#8D503E',
  },
  info: {
    light: '#EBE7ED',
    DEFAULT: '#8B7395',
    dark: '#4A3350',
  },
}
```

### Nouvelles variables CSS modernes

```css
/* src/assets/main.css - VARIABLES 2026 */
:root {
  /* === SPACING MODERNE (Notion-like) === */
  --space-xs: 0.25rem;      /* 4px */
  --space-sm: 0.5rem;       /* 8px */
  --space-md: 1rem;         /* 16px */
  --space-lg: 1.5rem;       /* 24px */
  --space-xl: 2rem;         /* 32px */
  --space-2xl: 3rem;        /* 48px */
  --space-3xl: 4rem;        /* 64px */
  --space-4xl: 6rem;        /* 96px */
  
  /* === RADIUS MODERNE (Apple-like) === */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 9999px;
  
  /* === SHADOWS MULTI-LAYER (Apple) === */
  --shadow-xs: 
    0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 
    0 1px 3px 0 rgb(0 0 0 / 0.05),
    0 1px 2px -1px rgb(0 0 0 / 0.05);
  --shadow-md: 
    0 4px 6px -1px rgb(74 51 80 / 0.06),
    0 2px 4px -2px rgb(74 51 80 / 0.06);
  --shadow-lg: 
    0 10px 15px -3px rgb(74 51 80 / 0.08),
    0 4px 6px -4px rgb(74 51 80 / 0.08);
  --shadow-xl: 
    0 20px 25px -5px rgb(74 51 80 / 0.10),
    0 8px 10px -6px rgb(74 51 80 / 0.10);
  --shadow-2xl: 
    0 25px 50px -12px rgb(74 51 80 / 0.20);
  --shadow-inner: 
    inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  
  /* === GLASSMORPHISM === */
  --glass-bg: rgba(253, 252, 250, 0.70);
  --glass-border: rgba(74, 51, 80, 0.10);
  --glass-blur: 20px;
  
  /* === TRANSITIONS FLUIDES (60fps) === */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* === GRADIENTS MESH === */
  --gradient-hero: 
    linear-gradient(135deg, 
      rgb(253, 252, 250) 0%,
      rgb(245, 240, 232) 40%,
      rgb(232, 221, 208) 100%);
  --gradient-card: 
    linear-gradient(145deg, 
      rgba(253, 252, 250, 1) 0%,
      rgba(250, 248, 245, 1) 100%);
  --gradient-glass: 
    linear-gradient(135deg, 
      rgba(253, 252, 250, 0.8) 0%,
      rgba(245, 240, 232, 0.5) 100%);
  --gradient-accent: 
    linear-gradient(135deg, 
      rgb(201, 130, 107) 0%,
      rgb(212, 165, 154) 100%);
  --gradient-sage: 
    linear-gradient(135deg, 
      rgb(127, 169, 155) 0%,
      rgb(184, 206, 199) 100%);
  
  /* === Z-INDEX === */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
}
```

---

## 🧩 Composants Ultra-Modernes 2026

### 1. ✨ Navigation moderne avec glassmorphism

**Problème actuel:** Navigation plate, logo générique, pas de caractère

**Solution moderne:**

```vue
<!-- AppHeader.vue - VERSION 2026 -->
<template>
  <header
    :class="[
      'fixed top-0 inset-x-0 z-fixed transition-all duration-300',
      isScrolled 
        ? 'bg-glass-bg backdrop-blur-[var(--glass-blur)] border-b border-glass-border shadow-md' 
        : 'bg-transparent border-b border-transparent'
    ]"
  >
    <nav class="container-juntas">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo moderne avec gradient -->
        <RouterLink to="/" class="flex items-center gap-3 group">
          <div class="relative">
            <!-- Glow effect -->
            <div class="absolute inset-0 bg-gradient-accent rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            <!-- Logo -->
            <div class="relative h-11 w-11 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              <span class="text-xl font-display font-bold text-white">J</span>
            </div>
          </div>
          <div class="flex flex-col">
            <span class="font-display text-2xl font-bold tracking-tight text-plum-500">
              Juntas
            </span>
            <span class="text-xs text-neutral-500 -mt-1">
              Find your home
            </span>
          </div>
        </RouterLink>
        
        <!-- Navigation desktop -->
        <div class="hidden lg:flex items-center gap-1">
          <NavLink to="/dashboard" icon="home">
            Dashboard
          </NavLink>
          <NavLink to="/matches" icon="users" badge="3">
            Matches
          </NavLink>
          <NavLink to="/chat" icon="message">
            Chat
          </NavLink>
          <NavLink to="/profile" icon="user">
            Perfil
          </NavLink>
          
          <!-- Divider -->
          <div class="w-px h-6 bg-neutral-200 mx-2"></div>
          
          <!-- CTA Button -->
          <button class="btn-primary-modern">
            <svg class="w-4 h-4" />
            Crear perfil
          </button>
        </div>
        
        <!-- Mobile menu button -->
        <button 
          @click="mobileOpen = !mobileOpen"
          class="lg:hidden btn-icon-modern"
        >
          <svg class="w-6 h-6" />
        </button>
        
      </div>
    </nav>
    
    <!-- Mobile menu avec animation slide -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="lg:hidden border-t border-glass-border bg-glass-bg backdrop-blur-xl">
        <div class="container-juntas py-6 space-y-2">
          <MobileNavLink to="/dashboard" icon="home">Dashboard</MobileNavLink>
          <MobileNavLink to="/matches" icon="users" badge="3">Matches</MobileNavLink>
          <MobileNavLink to="/chat" icon="message">Chat</MobileNavLink>
          <MobileNavLink to="/profile" icon="user">Perfil</MobileNavLink>
          <div class="pt-4">
            <button class="btn-primary-modern w-full">Crear perfil</button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
```

**Composant NavLink moderne:**

```vue
<!-- NavLink.vue - Lien de navigation avec indicateur actif -->
<template>
  <RouterLink
    :to="to"
    class="nav-link-modern group"
    :class="{ 'nav-link-active': isActive }"
  >
    <component :is="iconComponent" class="w-5 h-5" />
    <span>{{ slot }}</span>
    <span v-if="badge" class="badge-notification">{{ badge }}</span>
    
    <!-- Active indicator -->
    <span 
      v-if="isActive" 
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-accent rounded-full"
    />
  </RouterLink>
</template>

<style scoped>
.nav-link-modern {
  @apply relative px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600
         transition-all duration-200
         hover:text-plum-500 hover:bg-neutral-50
         flex items-center gap-2;
}
.nav-link-active {
  @apply text-plum-500 bg-neutral-50;
}
.badge-notification {
  @apply absolute -top-1 -right-1 h-5 w-5 rounded-full 
         bg-terracotta-500 text-white text-xs font-bold
         flex items-center justify-center
         shadow-md;
}
</style>
```

---

### 2. 🎴 Match Card ultra-moderne avec photo

**Problème actuel:** Avatar circulaire avec initiale, layout plat, pas de personnalité

**Solution moderne:**

```vue
<!-- MatchCard.vue - VERSION 2026 -->
<template>
  <article class="match-card-modern group">
    
    <!-- Photo avec overlay gradient -->
    <div class="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
      <img 
        :src="match.photo_url || '/placeholder-woman.jpg'"
        :alt="match.name"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      >
      
      <!-- Gradient overlay pour lisibilité -->
      <div class="absolute inset-0 bg-gradient-to-t from-plum-900/80 via-plum-900/20 to-transparent"></div>
      
      <!-- Badges flottants en haut -->
      <div class="absolute top-3 right-3 flex flex-col gap-2 items-end">
        <span class="badge-glass">
          <svg class="w-3.5 h-3.5 text-sage-500" />
          Verificada
        </span>
        <span class="badge-glass bg-terracotta-500/90 text-white font-semibold">
          {{ match.compatibility_score }}% match
        </span>
      </div>
      
      <!-- Info en bas (overlay) -->
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <h3 class="font-display text-2xl font-bold text-white mb-1 drop-shadow-lg">
          {{ match.name }}<span v-if="match.age" class="font-normal">, {{ match.age }}</span>
        </h3>
        <p class="text-white/90 text-sm drop-shadow-md flex items-center gap-1.5">
          <svg class="w-4 h-4" />
          {{ match.location || 'Valencia' }}
        </p>
      </div>
      
      <!-- Floating action button (quick view) -->
      <button 
        @click="$emit('quick-view')"
        class="absolute top-3 left-3 btn-icon-glass opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0"
      >
        <svg class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Content area -->
    <div class="px-1 space-y-3">
      
      <!-- Tags avec icônes -->
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in topTags" :key="tag.id" class="tag-modern">
          <component :is="tag.icon" class="w-3.5 h-3.5" />
          {{ tag.label }}
        </span>
      </div>
      
      <!-- Quick stats -->
      <div class="flex items-center gap-4 text-sm text-neutral-600">
        <div class="flex items-center gap-1.5">
          <svg class="w-4 h-4 text-neutral-400" />
          <span>{{ match.occupation }}</span>
        </div>
        <div v-if="match.has_children" class="flex items-center gap-1.5">
          <svg class="w-4 h-4 text-neutral-400" />
          <span>Con hijos</span>
        </div>
      </div>
      
      <!-- Compatibility breakdown -->
      <div class="space-y-2 pt-2">
        <div class="flex items-center justify-between text-xs">
          <span class="text-neutral-500">Compatibilidad</span>
          <span class="font-semibold text-sage-600">{{ match.compatibility_score }}%</span>
        </div>
        <div class="compatibility-bar-modern">
          <div 
            class="compatibility-fill-modern"
            :style="{ width: `${match.compatibility_score}%` }"
          />
        </div>
        <div class="flex items-center gap-3 text-xs text-neutral-500">
          <span class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-sage-400"></div>
            Estilo de vida
          </span>
          <span class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-terracotta-400"></div>
            Valores
          </span>
          <span class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-plum-400"></div>
            Horarios
          </span>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex gap-2 pt-2">
        <button 
          @click="$emit('view')"
          class="btn-primary-modern flex-1"
        >
          Ver perfil completo
        </button>
        <button 
          @click="$emit('pass')"
          class="btn-icon-modern"
          title="Pasar"
        >
          <svg class="w-5 h-5" />
        </button>
        <button 
          @click="$emit('favorite')"
          class="btn-icon-modern"
          :class="{ 'text-terracotta-500': isFavorite }"
          title="Guardar"
        >
          <svg class="w-5 h-5" />
        </button>
      </div>
      
    </div>
  </article>
</template>

<style scoped>
.match-card-modern {
  @apply bg-white rounded-3xl p-5 
         shadow-md hover:shadow-xl
         transition-all duration-500
         border border-neutral-100
         hover:border-neutral-200
         hover:-translate-y-1;
}

.badge-glass {
  @apply px-3 py-1.5 rounded-full
         bg-white/90 backdrop-blur-md
         text-xs font-medium text-neutral-700
         shadow-sm
         flex items-center gap-1.5;
}

.btn-icon-glass {
  @apply w-10 h-10 rounded-full
         bg-white/90 backdrop-blur-md
         flex items-center justify-center
         text-neutral-700 hover:text-plum-500
         shadow-lg hover:shadow-xl
         transition-all duration-300;
}

.tag-modern {
  @apply px-3 py-1.5 rounded-lg
         bg-neutral-50 border border-neutral-200
         text-xs font-medium text-neutral-700
         flex items-center gap-1.5
         transition-colors duration-200
         hover:bg-neutral-100 hover:border-neutral-300;
}

.compatibility-bar-modern {
  @apply h-2 bg-neutral-100 rounded-full overflow-hidden;
}

.compatibility-fill-modern {
  @apply h-full bg-gradient-sage rounded-full
         transition-all duration-1000 ease-out;
}
</style>
```

---

### 3. 🎯 Hero Section ultra-moderne

**Problème actuel:** Layout classique, petit CTA, pas d'impact visuel

**Solution moderne:**

```vue
<!-- HeroSection.vue - VERSION 2026 -->
<template>
  <section class="hero-modern relative overflow-hidden">
    
    <!-- Background avec gradient mesh -->
    <div class="absolute inset-0 bg-gradient-hero"></div>
    
    <!-- Éléments botaniques décoratifs -->
    <div class="botanical-decor-left">
      <svg viewBox="0 0 200 400" class="w-48 h-96 text-sand-300/40">
        <!-- SVG feuilles minimalistes -->
      </svg>
    </div>
    <div class="botanical-decor-right">
      <svg viewBox="0 0 200 400" class="w-64 h-128 text-sage-200/30">
        <!-- SVG feuilles minimalistes -->
      </svg>
    </div>
    
    <div class="container-juntas relative py-20 lg:py-32">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Left: Content -->
        <div class="space-y-8">
          
          <!-- Badge d'annonce -->
          <div class="inline-flex items-center gap-3 px-4 py-2.5 rounded-full
                      bg-white/80 backdrop-blur-md shadow-sm
                      border border-plum-100">
            <div class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta-500"></span>
            </div>
            <span class="text-sm font-medium text-neutral-700">
              +127 mujeres conectadas esta semana
            </span>
          </div>
          
          <!-- Titre principal -->
          <div class="space-y-4">
            <h1 class="font-display text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-plum-600">
              Encuentra tu
              <span class="relative inline-block">
                <span class="relative z-10">hogar</span>
                <span class="absolute bottom-2 left-0 right-0 h-4 bg-terracotta-200/60 -rotate-1"></span>
              </span>
              <br />
              con mujeres
              <span class="relative inline-block">
                <span class="relative z-10">increíbles</span>
                <span class="absolute bottom-2 left-0 right-0 h-4 bg-sage-200/60 rotate-1"></span>
              </span>
            </h1>
            
            <p class="text-lg lg:text-xl text-neutral-600 max-w-xl leading-relaxed">
              Conecta con compañeras verificadas que comparten tus valores, 
              estilo de vida y preferencias en Valencia.
            </p>
          </div>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink to="/register" class="btn-primary-hero group">
              <span>Comenzar gratis</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </RouterLink>
            <button @click="scrollTo('how-it-works')" class="btn-secondary-hero">
              <svg class="w-5 h-5" />
              <span>Cómo funciona</span>
            </button>
          </div>
          
          <!-- Trust indicators -->
          <div class="flex items-center gap-6 pt-4">
            <div class="flex -space-x-3">
              <img v-for="i in 4" :key="i" 
                   :src="`/avatars/woman-${i}.jpg`"
                   class="w-11 h-11 rounded-full border-2 border-white shadow-sm"
              />
              <div class="w-11 h-11 rounded-full border-2 border-white bg-gradient-sage
                          flex items-center justify-center text-sm font-bold text-white shadow-sm">
                +50
              </div>
            </div>
            <div class="text-sm text-neutral-600">
              <div class="font-semibold text-neutral-800">Todas verificadas</div>
              <div class="text-neutral-500">100% mujeres reales</div>
            </div>
          </div>
          
        </div>
        
        <!-- Right: Bento Grid de photos -->
        <div class="relative">
          <!-- Glass card floating -->
          <div class="bento-grid-hero">
            
            <!-- Large photo -->
            <div class="bento-item-large">
              <img src="/hero-1.jpg" alt="" class="bento-image" />
              <div class="bento-overlay">
                <span class="badge-glass">
                  <svg class="w-4 h-4" />
                  Compartir hogar
                </span>
              </div>
            </div>
            
            <!-- Medium photo -->
            <div class="bento-item-medium">
              <img src="/hero-2.jpg" alt="" class="bento-image" />
              <div class="bento-overlay">
                <span class="badge-glass">
                  🧘‍♀️ Yoga juntas
                </span>
              </div>
            </div>
            
            <!-- Small stat card -->
            <div class="bento-item-small stat-card-glass">
              <div class="text-4xl font-display font-bold text-plum-600">95%</div>
              <div class="text-sm text-neutral-600">Compatibilidad</div>
            </div>
            
            <!-- Medium photo 2 -->
            <div class="bento-item-medium">
              <img src="/hero-3.jpg" alt="" class="bento-image" />
              <div class="bento-overlay">
                <span class="badge-glass">
                  ☕ Café & charlas
                </span>
              </div>
            </div>
            
            <!-- Small feature card -->
            <div class="bento-item-small stat-card-glass">
              <svg class="w-8 h-8 text-sage-500 mb-2" />
              <div class="text-xs text-neutral-600 font-medium">Verificación segura</div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-modern {
  @apply min-h-screen flex items-center relative;
}

.botanical-decor-left {
  @apply absolute top-0 left-0 -translate-x-1/3 pointer-events-none;
}

.botanical-decor-right {
  @apply absolute bottom-0 right-0 translate-x-1/4 pointer-events-none;
}

.btn-primary-hero {
  @apply px-8 py-4 rounded-2xl
         bg-gradient-accent text-white font-semibold text-lg
         shadow-xl hover:shadow-2xl
         transform hover:-translate-y-1
         transition-all duration-300
         flex items-center justify-center gap-2;
}

.btn-secondary-hero {
  @apply px-8 py-4 rounded-2xl
         bg-white/80 backdrop-blur-sm border border-neutral-200
         text-neutral-700 font-semibold text-lg
         hover:bg-white hover:border-neutral-300
         transform hover:-translate-y-0.5
         transition-all duration-300
         flex items-center justify-center gap-2;
}

.bento-grid-hero {
  @apply grid grid-cols-3 gap-4 auto-rows-[140px];
}

.bento-item-large {
  @apply col-span-2 row-span-2 rounded-3xl overflow-hidden relative;
}

.bento-item-medium {
  @apply col-span-1 row-span-1 rounded-2xl overflow-hidden relative;
}

.bento-item-small {
  @apply col-span-1 row-span-1 rounded-2xl overflow-hidden relative;
}

.bento-image {
  @apply w-full h-full object-cover transform hover:scale-110 transition-transform duration-700;
}

.bento-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-plum-900/40 to-transparent
         flex items-end justify-start p-4
         opacity-0 hover:opacity-100 transition-opacity duration-300;
}

.stat-card-glass {
  @apply bg-white/80 backdrop-blur-xl border border-white/60
         flex flex-col items-center justify-center
         p-4 shadow-lg;
}
</style>
```

---

## 📚 Bibliothèque de composants modernes CSS

```css
/* src/assets/main.css - COMPOSANTS 2026 */

/* === BUTTONS MODERNES === */
.btn-primary-modern {
  @apply inline-flex items-center justify-center gap-2
         px-6 py-3 rounded-xl
         bg-gradient-accent text-white font-semibold text-sm
         shadow-md hover:shadow-xl
         transform hover:-translate-y-0.5 active:translate-y-0
         transition-all duration-300
         focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2;
}

.btn-secondary-modern {
  @apply inline-flex items-center justify-center gap-2
         px-6 py-3 rounded-xl
         bg-white border-2 border-neutral-200
         text-neutral-700 font-semibold text-sm
         hover:border-neutral-300 hover:bg-neutral-50
         transform hover:-translate-y-0.5
         transition-all duration-300
         focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2;
}

.btn-ghost-modern {
  @apply inline-flex items-center justify-center gap-2
         px-4 py-2 rounded-lg
         text-neutral-600 font-medium text-sm
         hover:bg-neutral-100 hover:text-neutral-800
         transition-all duration-200;
}

.btn-icon-modern {
  @apply inline-flex items-center justify-center
         w-10 h-10 rounded-xl
         bg-neutral-50 border border-neutral-200
         text-neutral-600 hover:text-plum-500
         hover:bg-neutral-100 hover:border-neutral-300
         transition-all duration-200;
}

/* === CARDS MODERNES === */
.card-modern {
  @apply bg-white rounded-2xl p-6
         shadow-sm hover:shadow-lg
         border border-neutral-100 hover:border-neutral-200
         transform hover:-translate-y-1
         transition-all duration-300;
}

.card-glass {
  @apply rounded-2xl p-6
         bg-white/70 backdrop-blur-xl
         border border-white/60
         shadow-lg;
}

.card-elevated {
  @apply bg-white rounded-3xl p-8
         shadow-xl hover:shadow-2xl
         border border-neutral-100
         transform hover:-translate-y-2
         transition-all duration-500;
}

/* === BADGES MODERNES === */
.badge-modern {
  @apply inline-flex items-center gap-1.5
         px-3 py-1.5 rounded-lg
         bg-neutral-100 text-neutral-700
         text-xs font-medium
         border border-neutral-200;
}

.badge-success-modern {
  @apply inline-flex items-center gap-1.5
         px-3 py-1.5 rounded-lg
         bg-sage-50 text-sage-700
         text-xs font-semibold
         border border-sage-200;
}

.badge-accent-modern {
  @apply inline-flex items-center gap-1.5
         px-3 py-1.5 rounded-lg
         bg-terracotta-50 text-terracotta-700
         text-xs font-semibold
         border border-terracotta-200;
}

/* === INPUTS MODERNES === */
.input-modern {
  @apply w-full px-4 py-3 rounded-xl
         bg-white border-2 border-neutral-200
         text-neutral-800 placeholder:text-neutral-400
         focus:border-plum-400 focus:ring-4 focus:ring-plum-100
         transition-all duration-200;
}

.input-glass {
  @apply w-full px-4 py-3 rounded-xl
         bg-white/70 backdrop-blur-sm border-2 border-white/60
         text-neutral-800 placeholder:text-neutral-400
         focus:bg-white focus:border-plum-300 focus:ring-4 focus:ring-plum-100
         transition-all duration-200;
}

/* === ANIMATIONS === */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
```

---

## 📱 Exemples d'écrans complets modernes

### Dashboard moderne

```vue
<template>
  <div class="dashboard-modern">
    
    <!-- Header spacieux -->
    <div class="dashboard-header">
      <div class="container-juntas py-12">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="font-display text-4xl font-bold text-plum-600 mb-3">
              Hola, María 👋
            </h1>
            <p class="text-lg text-neutral-600">
              Tienes 3 nuevas compañeras compatibles esperándote
            </p>
          </div>
          <button class="btn-primary-modern">
            <svg class="w-5 h-5" />
            Completar perfil
          </button>
        </div>
        
        <!-- Stats cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="stat-card-modern">
            <div class="stat-icon bg-gradient-sage">
              <svg class="w-6 h-6 text-white" />
            </div>
            <div class="stat-value">12</div>
            <div class="stat-label">Matches activos</div>
          </div>
          <div class="stat-card-modern">
            <div class="stat-icon bg-gradient-accent">
              <svg class="w-6 h-6 text-white" />
            </div>
            <div class="stat-value">95%</div>
            <div class="stat-label">Perfil completado</div>
          </div>
          <div class="stat-card-modern">
            <div class="stat-icon bg-plum-500">
              <svg class="w-6 h-6 text-white" />
            </div>
            <div class="stat-value">3</div>
            <div class="stat-label">Mensajes nuevos</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Matches grid -->
    <div class="container-juntas pb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-display text-2xl font-bold text-plum-600">
          Tus matches perfectos
        </h2>
        <div class="flex gap-2">
          <button class="btn-ghost-modern">
            <svg class="w-5 h-5" />
            Filtros
          </button>
          <button class="btn-ghost-modern">
            <svg class="w-5 h-5" />
            Ordenar
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MatchCard v-for="match in matches" :key="match.id" :match="match" />
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.dashboard-modern {
  @apply min-h-screen bg-neutral-50;
}

.dashboard-header {
  @apply bg-gradient-to-br from-cream-50 via-white to-sage-50/30
         border-b border-neutral-100;
}

.stat-card-modern {
  @apply bg-white rounded-2xl p-6
         border border-neutral-100
         hover:border-neutral-200
         hover:shadow-md
         transition-all duration-300;
}

.stat-icon {
  @apply w-14 h-14 rounded-xl
         flex items-center justify-center
         mb-4 shadow-md;
}

.stat-value {
  @apply font-display text-3xl font-bold text-plum-600 mb-1;
}

.stat-label {
  @apply text-sm text-neutral-600;
}
</style>
```

---

## ✅ Checklist de migration vers le design 2026

### Phase 1: Fondations (1-2 jours)
- [ ] Mettre à jour `tailwind.config.js` avec la nouvelle palette complète
- [ ] Ajouter les nouvelles variables CSS dans `main.css`
- [ ] Créer les composants de base modernes (buttons, cards, badges)
- [ ] Créer la bibliothèque d'icônes (Lucide ou Phosphor)

### Phase 2: Navigation et Layout (1 jour)
- [ ] Redesign `AppHeader.vue` avec glassmorphism
- [ ] Créer `NavLink.vue` avec indicateur actif
- [ ] Créer `MobileNav.vue` avec animations
- [ ] Mettre à jour `AppFooter.vue`

### Phase 3: Composants critiques (2-3 jours)
- [ ] Redesign `MatchCard.vue` avec photo grande
- [ ] Créer composant `Badge` moderne
- [ ] Créer composant `Input` moderne
- [ ] Créer composant `Modal` moderne avec backdrop blur

### Phase 4: Pages principales (3-4 jours)
- [ ] Redesign `HeroSection.vue` avec bento grid
- [ ] Redesign `DashboardView.vue` avec stats modernes
- [ ] Redesign `ProfileView.vue` avec sections élégantes
- [ ] Redesign `ChatView.vue` avec bulles modernes

### Phase 5: Polish et animations (1-2 jours)
- [ ] Ajouter micro-animations (hover, focus)
- [ ] Ajouter transitions entre pages
- [ ] Ajouter loading states modernes
- [ ] Tester sur mobile et tablette

---

## 🎨 Ressources et outils

### Inspiration design 2026
- **Linear** - Navigation et composants épurés
- **Vercel** - Gradients et glassmorphism
- **Stripe** - Spacing et typographie
- **Notion** - Cards et hiérarchie
- **Apple** - Shadows et depth

### Bibliothèques recommandées
- **Icônes:** Lucide Vue (https://lucide.dev)
- **Animations:** @vueuse/motion
- **Transitions:** Vue TransitionGroup
- **Gradients:** Mesh Gradient Generator
- **Photos:** Unsplash (recherche "women community cozy home")

### Outils de design
- **Figma** - Pour prototyper avant de coder
- **Coolors** - Pour générer des variations de couleurs
- **Shadows.brumm.af** - Pour générer des ombres multi-layer
- **Glassmorphism.com** - Pour tester des effets glass

---

**Conclusion:** Cette proposition transforme Juntas en une application **ultra-moderne 2026** avec glassmorphism, photos impactantes, micro-animations fluides et un design system cohérent qui exploite pleinement la beauté de votre mood board. Le design passe de "software 2000" à "produit premium contemporain".

**Prochaine étape:** Souhaitez-vous que je commence l'implémentation des composants modernes ?
