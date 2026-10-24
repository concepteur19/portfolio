# Implementation Plan: Contenu à jour et corrections bloquantes

**Branch**: `001-content-refresh-fixes` | **Date**: 2026-10-24 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-content-refresh-fixes/spec.md`

## Summary

Remettre le site en accord avec le CV générique et supprimer les impasses relevées par l'audit.

Approche technique :

- le contenu (profil, expériences, formation, compétences, menu) sort des composants vers des modules typés de `src/content/`, validés par Zod au build ;
- la durée d'expérience est calculée par fusion d'intervalles, rafraîchie chaque jour par ISR ;
- le thème passe à une classe `dark` posée par un script inline, sans clignotement ;
- le CV est servi depuis `public/cv/` et le build échoue s'il manque ;
- le reste corrige des défauts précis : liens imbriqués, contrastes, titres, `lang`, console, fautes.

## Technical Context

**Language/Version**: TypeScript 5 (strict), Node 22 LTS

**Primary Dependencies**:
- Next.js 16.4.2 (Pages Router), React 18.3 (conservé, voir research R1) ;
- Tailwind CSS 4.3, react-icons 5 ;
- ajout : `zod` 4 (validation du contenu, R2).

**Storage**: fichiers du dépôt (`src/content/*.ts`, `public/cv/*.pdf`) ; `localStorage` du navigateur pour le thème

**Testing**: Vitest 5 (tests unitaires du contenu et des fonctions de date), ESLint 9, `tsc --noEmit` ; Lighthouse et lecteur d'écran en manuel ([quickstart.md](quickstart.md))

**Target Platform**: navigateurs evergreen, mobile d'abord (360 px) ; hébergement Vercel (rendu statique et ISR)

**Project Type**: site web statique (Next.js), un seul projet

**Performance Goals**: Lighthouse ≥ 90 sur les quatre catégories ; aucun JavaScript ajouté au chemin critique, hors script de thème (< 1 Ko, inline)

**Constraints**:
- aucun flash de thème ;
- aucun numéro de téléphone dans les pages ni dans le contenu du site ; il figure seulement dans le CV PDF (VII, constitution 1.1.0) ;
- contraste WCAG AA dans les deux thèmes ;
- aucun texte avec tiret long.

**Scale/Scope**:
- 3 pages (`/`, `/about`, `/projects`) ;
- 5 modules de contenu ;
- 7 expériences, 2 formations, 8 groupes de compétences ;
- composants modifiés : `_app`, `_document`, `Navbar`, `Footer`, `Home`, `about`, `projects`, `ProjectCard`, `Title`, `themeContext`.

**Dépendances externes**:
- **D1** : le PDF du CV générique, fourni par Zobel, métadonnées neutres, à déposer dans `public/cv/zobel-nguening-cv.pdf`. Sans lui, le build échoue, comme prévu par l'edge case de la spec.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Vérification | Statut |
|---|---|---|
| I. À jour ou absent | Contenu repris de `docs/career-timeline.md` (CV générique) ; durée et année calculées (R3) ; « Articles » retiré (R7) ; projets sans destination masqués (R8) | ✅ |
| II. Specification-first | Spec 001 validée ; les choix par défaut de FR-015 sont appliqués (R12) | ✅ |
| III. Contenu = donnée (NON-NEGOTIABLE) | Profil, expériences, formation, compétences et menu deviennent des modules validés au build (R2). Les projets restent dans le modèle existant jusqu'à la spec 002 | ⚠️ écart temporaire justifié (Complexity Tracking) |
| IV. Mobile-first, accessible, rapide | Un `h1` par page, `lang="fr"`, textes alternatifs, `aria-label`, contrastes AA mesurés (R6, R9, R13) ; aucune image ni JS lourd ajouté | ✅ |
| V. Visible et mesurable | Hors périmètre (spec 003). L'URL du CV est stable pour la mesure des téléchargements | ✅ (préparé) |
| VI. Simple d'abord | Une seule dépendance ajoutée (`zod`) ; pas de `next-themes`, pas de parseur PDF ; ISR natif plutôt qu'une tâche planifiée | ✅ |
| VII. Confidentialité | Schéma `Profile` sans champ téléphone ; téléphone seulement dans le CV PDF (amendement 1.1.0), métadonnées du PDF neutres ; réalisations Orange décrites au niveau produit, sans chiffres internes ni détail d'architecture | ✅ |
| Contraintes | Next 16 Pages Router, TS strict, Tailwind 4, Vitest, Vercel, code en anglais, contenu en français | ✅ |

**Re-check post-design**: les choix de [research.md](research.md), [data-model.md](data-model.md) et des [contrats](contracts/) ne créent pas de nouvel écart. Le seul écart reste celui du principe III pour les projets.

## Project Structure

### Documentation (this feature)

```text
specs/001-content-refresh-fixes/
├── spec.md
├── plan.md              # ce fichier
├── research.md          # décisions R1 à R13
├── data-model.md        # Profile, Experience, Education, SkillGroup, NavItem
├── quickstart.md        # validation de bout en bout
├── contracts/
│   ├── content-schema.md   # types et fonctions de lecture du contenu
│   └── public-surface.md   # routes, CV, thème, liens externes
├── checklists/
│   └── requirements.md
└── tasks.md             # /speckit-tasks (pas encore créé)
```

### Source Code (repository root)

```text
public/
└── cv/
    └── zobel-nguening-cv.pdf        # NOUVEAU, fourni par Zobel (D1)

src/
├── content/                         # NOUVEAU, le contenu comme donnée
│   ├── schema.ts                    # schémas Zod + formatage des erreurs
│   ├── index.ts                     # validation, tri, fonctions de lecture
│   ├── dates.ts                     # parse YearMonth, formatPeriod, getExperienceSummary
│   ├── profile.ts
│   ├── experience.ts
│   ├── education.ts
│   ├── skills.ts
│   └── site.ts                      # navItems
├── components/
│   ├── Navbar.tsx                   # navItems, aria-current, bouton de thème, sans console.log
│   ├── Footer.tsx                   # année calculée, nom unifié, aria-label
│   ├── base/Title.tsx               # prop `as`
│   ├── base/projects/ProjectCard.tsx# variantes dark:, alt
│   └── sections/Home.tsx            # nouvel ordre, données injectées, CV, Débuts
├── contexts/themeContext.jsx        # classe sur <html> + localStorage
├── data/ProjectsData.ts             # type LegacyProject, isPublishable, fautes corrigées
├── pages/
│   ├── _document.tsx                # lang="fr", script de thème inline
│   ├── _app.tsx                     # variantes dark:
│   ├── index.tsx                    # getStaticProps + revalidate, contrôle du CV
│   ├── about/index.tsx              # getStaticProps, textes réécrits, icônes visibles
│   └── projects/index.tsx           # une carte = un lien, filtre isPublishable
├── styles/globals.css               # @custom-variant dark, --color-primary-strong
└── content/__tests__/               # NOUVEAU
    ├── content.test.ts              # validation du contenu réel, menu ↔ pages
    └── dates.test.ts                # fusion d'intervalles, en cours, formatage

eslint.config.mjs                    # règle no-console
```

Fichiers supprimés : `src/data/ExperienceData.ts` et `src/data/CertificaionsData.ts`, remplacés par `src/content/`.

**Structure Decision**: un seul projet Next.js ; le contenu est isolé dans `src/content/`. C'est la base que la spec 002 étendra avec `projects.ts`, et que la spec 008 éditera.

## Ordre de mise en œuvre

1. **Fondations** : `zod`, `src/content/` (schémas, dates, données), tests. Rien de visible ne change encore.
2. **US1** (P1, profil) : `Home` et `about` lisent le contenu ; nouvel ordre ; textes et fautes.
3. **US2** (P1, impasses) : menu, CV et contrôle au build, cartes de projet, icônes visibles.
4. **US3** (P2, thème) : classe `dark`, script inline, migration des classes conditionnelles.
5. **US4** (P3, accessibilité) : `Title as`, `lang`, alt, `aria-label`, `no-console`, contrastes.
6. **Validation** : [quickstart.md](quickstart.md) complet.

US3 touche les mêmes composants que US1 et US2 : la faire après évite de réécrire deux fois les classes.

## Branche

Créer `001-content-refresh-fixes` depuis `test/next-16`, qui porte la migration Next 16 et Tailwind 4. La PR cible `master` après fusion de `test/next-16`, ou embarque cette migration si elle n'est pas encore fusionnée.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Principe III : les projets restent dans `src/data/ProjectsData.ts` sans validation Zod | La spec 001 ne touche les projets que pour corriger les défauts ; la spec 002 (P1, prochaine) remplace tout le modèle : liens multiples, captures, alt obligatoires, études de cas | Valider l'ancien modèle maintenant produirait un schéma jeté deux semaines plus tard. L'écart est borné : la spec 002 le referme (FR-008, FR-018 de 002) |
| Spec 004 : « thème via classes » réalisé dans 001 | FR-011 (sans clignotement) n'est pas atteignable tant que le style dépend de l'état React | Laisser le clignotement jusqu'à 004 viole FR-011 et SC-006 de cette spec |
