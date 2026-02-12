# Documentation Juntas

Bienvenue dans la documentation du projet Juntas. Ce dossier contient toute la documentation technique et fonctionnelle du projet.

## 📚 Documents disponibles

### Design System

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** ⭐ **[NOUVEAU]**  
  Guide complet du système de design : comment modifier l'identité visuelle (couleurs, typographie, espacements), utiliser les composants, et maintenir la cohérence.
  
- **[DESIGN_SYSTEM_HEALTH.md](./DESIGN_SYSTEM_HEALTH.md)**  
  État d'avancement de l'application du design system dans chaque section de l'application. Utilisez ce document pour savoir quelles pages ont été migrées et lesquelles restent à faire.

### Configuration & Infrastructure

- **[SUPABASE_AUTH_CONFIG.md](./SUPABASE_AUTH_CONFIG.md)**  
  Configuration de l'authentification Supabase, gestion des utilisateurs et flux d'authentification.

---

## 🚀 Démarrage rapide

### Pour modifier l'identité visuelle (rebranding)

1. Lisez le **[Guide de modification d'identité](./DESIGN_SYSTEM.md#guide-de-modification-didentité)** dans `DESIGN_SYSTEM.md`
2. Modifiez les tokens dans `tailwind.config.js`
3. Testez les changements sur les pages principales
4. Mettez à jour `DESIGN_SYSTEM_HEALTH.md` si nécessaire

### Pour développer un nouveau composant

1. Consultez les **[Tokens de design](./DESIGN_SYSTEM.md#tokens-de-design)** disponibles
2. Utilisez les **[Composants UI](./DESIGN_SYSTEM.md#composants-ui)** existants (`.btn-primary`, `.card-feature`, etc.)
3. Suivez la **[Checklist de migration](./DESIGN_SYSTEM.md#checklist-pour-migrer-un-composant)**

### Pour migrer une page existante

1. Consultez **[DESIGN_SYSTEM_HEALTH.md](./DESIGN_SYSTEM_HEALTH.md)** pour voir les zones déjà migrées
2. Suivez la **[Checklist de migration](./DESIGN_SYSTEM.md#checklist-pour-migrer-un-composant)**
3. Référez-vous aux **[Exemples de migration](./DESIGN_SYSTEM.md#exemple-de-migration)**
4. Mettez à jour `DESIGN_SYSTEM_HEALTH.md` après la migration

---

## 🎯 Fichiers clés du système de design

```
juntas_project/
├── tailwind.config.js          # ⚙️ Configuration Tailwind (tokens de design)
├── src/assets/main.css         # 🎨 Composants CSS réutilisables
├── index.html                  # 🔤 Chargement des polices Google Fonts
└── docs/
    ├── DESIGN_SYSTEM.md        # 📖 Guide complet du système de design
    └── DESIGN_SYSTEM_HEALTH.md # 📊 État d'avancement de la migration
```

---

## 📞 Besoin d'aide ?

- **Questions sur le design system ?** → Consultez [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) ou la section [Questions fréquentes](./DESIGN_SYSTEM.md#questions-fréquentes)
- **Problème de migration ?** → Vérifiez [DESIGN_SYSTEM_HEALTH.md](./DESIGN_SYSTEM_HEALTH.md) et les [exemples de migration](./DESIGN_SYSTEM.md#exemple-de-migration)
- **Configuration Supabase ?** → Référez-vous à [SUPABASE_AUTH_CONFIG.md](./SUPABASE_AUTH_CONFIG.md)

---

**Dernière mise à jour :** 12 février 2026
