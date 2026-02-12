# État de santé design – Juntas (PRD v2.0)

Rapport d’audit de l’application du design system PRD sur le projet.  
Référence : carte Trello [juntas] - design (PRD Design System Juntas).

---

## 1. Synthèse

| Zone | Conforme PRD | Partiel | Non appliqué |
|------|----------------|---------|--------------|
| **Setup (Tailwind, CSS, polices)** | ✅ | — | — |
| **Landing** | Hero, HowItWorks, CTA | — | Testimonials |
| **Dashboard** | Vue, StatsCards, Filtres, EmptyState, MatchCard, VerificationBanner | — | — |
| **Match Profile** | — | — | Page entière |
| **Mi Perfil** | — | — | Page + tous composants |
| **Chat** | — | — | Vue + tous composants |
| **Onboarding** | — | — | Flow + tous steps + ProgressBar, FileUpload |
| **Auth** | — | — | Toutes vues (login, register, forgot, reset, callback) |
| **Layout** | Header, Footer | — | — |

**Verdict global :** le design system est appliqué sur **le setup**, **le layout** et **la landing** (sauf Testimonials) et **le Dashboard** (complet). Le reste du produit ( Match Profile, Mi Perfil, Chat, Onboarding, Auth) utilise encore l’ancienne palette (deepblue, cream-xxx, terracota/sage anciens) et n’utilise pas les composants PRD (container-juntas, font-display, boutons PRD, card-feature, badge-verified, couleurs PRD).

---

## 2. Détail par section PRD

### 2.1 Vision & principes (non auditable en code)

Clarté, confiance, chaleur humaine, accessibilité, moderne & professionnel — à vérifier en UX/UI, pas uniquement en classes CSS.

---

### 2.2 Design system (config)

| Élément PRD | Statut | Fichier |
|-------------|--------|---------|
| Palette (deep-plum, warm-sand, soft-terracota, sage-green, muted-rose, cream, charcoal, warm-grey, off-white) | ✅ Déclaré | `tailwind.config.js` |
| Typographie Lora (display) + Inter (body) | ✅ Déclaré + chargé | `tailwind.config.js`, `index.html` |
| Spacing 4px, radius 8/12/16/24 | ✅ | `tailwind.config.js` |
| Ombres deep-plum rgba | ✅ (soft, md, lg, hover) | `tailwind.config.js` |
| Breakpoints 640 / 768 / 1024 / 1280 | ✅ | `tailwind.config.js` |
| Container 1280px | ✅ (max-w-container) | `tailwind.config.js` |
| Variables CSS transitions / z-index | ✅ | `src/assets/main.css` |
| Composants utilitaires (.btn-primary, .btn-secondary, .btn-ghost, .card-feature, .badge-verified, .container-juntas) | ✅ Définis | `src/assets/main.css` |

**Conclusion :** la base design system est en place et utilisable partout.

---

### 2.3 Composants UI (utilisation dans les vues)

| Composant PRD | Où c’est utilisé | Où ce n’est pas utilisé |
|---------------|-------------------|---------------------------|
| **Buttons** (primary, secondary, ghost) | HeroSection, MatchCard, (définis en CSS) | Auth, Dashboard filtres, Profile, Onboarding, MatchProfile, Chat, EmptyState, modales |
| **Feature cards** (off-white, shadow-md, hover) | HowItWorksSection, MatchCard | Dashboard stats, Testimonials, EmptyState, MatchProfile, Profile, Onboarding |
| **Verified badge** (sage-green) | HeroSection, MatchCard, VerificationBanner (état verified) | MatchProfile (badge “Verificado”), partout où un badge “verificado” pourrait apparaître |
| **Container 1280px** (container-juntas) | AppHeader, AppFooter, HeroSection, HowItWorksSection, CTASection | DashboardView, MatchProfileView, ProfileView, ChatView, Onboarding, Auth, TestimonialsSection |

---

### 2.4 Pages PRD vs implémentation

#### Landing

| Section PRD | Implémentation |
|-------------|-----------------|
| Hero (JUNTAS + tagline + CTA + bento) | ✅ container-juntas, font-display, btn-primary/secondary, badge-verified, couleurs PRD |
| Features grid 3 cols | ✅ HowItWorks en card-feature, container-juntas, font-display |
| How it works 3 steps | ✅ (4 steps en fait, mais style PRD) |
| Trust indicators | — (non identifié comme composant dédié) |
| CTA final | ✅ container-juntas, gradient deep-plum → soft-terracota, font-display |
| Footer | ✅ container-juntas, warm-grey, soft-terracota |
| **Testimonios** | ❌ max-w-5xl, text-deepblue, cream-100/200/300, pas font-display, pas card-feature |

#### Dashboard

| Élément PRD | Implémentation |
|-------------|----------------|
| Header | ✅ (AppHeader commun) |
| Verification banner | ✅ + état verified (sage-green) |
| Stats cards 3 cols | ✅ card-feature, font-display/body, couleurs PRD (sage-green, soft-terracota, deep-plum) |
| Filters pills | ✅ PRD : border-warm-sand, sage-green actif, shadow-soft, hover |
| Matches grid | ✅ MatchCard en card-feature, badge-verified, btn-primary/secondary, font-display |
| **Conteneur page** | ✅ container-juntas |
| **Titre / sous-titre** | ✅ font-display, text-charcoal, text-warm-grey |
| **Fond page** | ✅ gradient from-off-white via-cream to-warm-sand/20 (aligné home) |
| EmptyState | ✅ font-display, btn-primary, warm-sand/50 |

#### Match Profile

| Élément PRD | Implémentation |
|-------------|----------------|
| Back, header (photo 200px, name, verified, tags) | ❌ max-w-4xl, text-deepblue, sage, gradient from-sage to-deepblue |
| Compatibility bars | ❌ pas vérifié (CompatibilitySection) |
| Sections (situación, horarios, estilo, preferencias) | ❌ composants en blanc / deepblue / cream |
| Sticky CTA | ❌ pas vérifié |

**Page entière :** non migrée vers le design system.

#### Chat

| Élément PRD | Implémentation |
|-------------|----------------|
| Sidebar 320px, bulles (sent terracota, received warm-sand), input fixe | ❌ Vue placeholder + composants Chat en deepblue/sage/cream |

**Page entière :** non migrée.

#### Onboarding

| Élément PRD | Implémentation |
|-------------|----------------|
| Progress bar 6 steps, Lora headers, step 6 verification upload | ❌ max-w-lg, text-deepblue, border-cream-400, pas font-display, pas couleurs PRD |

**Flow + tous steps + ProgressBar, FileUpload :** non migrés.

#### Mi Perfil

| Élément PRD | Implémentation |
|-------------|----------------|
| Photo 160px, sections accordion, toggles sage-green, danger zone | ❌ max-w-4xl, text-deepblue, composants profile en deepblue/cream/terracota |

**Page + ProfilePhotoSection, EditableSection, SettingsSection, DangerZone, modales :** non migrés.

#### Auth (login, register, forgot, reset)

- Toutes les vues : **max-w-md**, **border-cream-400**, **text-deepblue**, **bg-terracota**, pas container-juntas ni boutons PRD ni font-display.

---

## 3. Fichiers / zones à migrer (ordre suggéré)

1. **Dashboard**  
   - `DashboardView.vue` : container-juntas, font-display sur titres, charcoal/warm-grey, filtres avec tokens PRD (pilule active sage-green, inactif cream + border).  
   - `StatsCards.vue` : card-feature, couleurs PRD (sage-green, soft-terracota, charcoal).  
   - `EmptyState.vue` : card + boutons PRD.

2. **Landing**  
   - `TestimonialsSection.vue` : container-juntas, font-display, card-feature, charcoal/warm-grey.

3. **Match Profile**  
   - `MatchProfileView.vue` + `CompatibilitySection.vue`, `ProfileDetailsSection.vue`, `WhyCompatibleSection.vue` : container-juntas, Lora sur titres, palette PRD, verified badge, CTA primary.

4. **Mi Perfil**  
   - `ProfileView.vue` + `ProfilePhotoSection.vue`, `EditableSection.vue`, `SettingsSection.vue`, `DangerZone.vue` + modales d’édition : container-juntas, font-display, boutons et toggles PRD (sage-green pour toggles).

5. **Chat**  
   - `ChatView.vue` + tous les composants Chat : layout PRD, bulles sent (soft-terracota) / received (warm-sand), input et sidebar.

6. **Onboarding**  
   - `OnboardingFlow.vue` + tous les steps + `ProgressBar.vue`, `FileUpload.vue` : conteneur, font-display, couleurs et composants PRD.

7. **Auth**  
   - `AuthView.vue`, `AuthPage.vue`, `ForgotPasswordView.vue`, `ResetPasswordView.vue`, `AuthCallback.vue`, `LoginForm.vue`, `RegisterForm.vue`, `AuthTabs.vue` : container-juntas (ou max-width cohérent), boutons primary/secondary, labels/texte en charcoal/warm-grey.

8. **Divers**  
   - `NotFoundView.vue`, `OnboardingView.vue` (si utilisé) : alignement sur le même design system.

---

## 4. Checklist PRD rapide

- [x] Tailwind : couleurs, fonts, radius, shadows, breakpoints, container 1280px  
- [x] CSS variables : transitions, z-index  
- [x] Polices Lora + Inter chargées  
- [x] Composants .btn-primary, .btn-secondary, .btn-ghost, .card-feature, .badge-verified, .container-juntas  
- [x] Landing Hero, How it works, CTA, Footer  
- [ ] Landing Testimonios  
- [ ] Dashboard (contenu : titre, stats, filtres, empty state)  
- [x] Dashboard MatchCard + VerificationBanner  
- [ ] Match Profile (page complète)  
- [ ] Chat (page + composants)  
- [ ] Onboarding (flow + steps)  
- [ ] Mi Perfil (page + composants + modales)  
- [ ] Auth (toutes vues)

---

*Rapport généré pour alignement avec le PRD Design System Juntas (carte Trello [juntas] - design).*
