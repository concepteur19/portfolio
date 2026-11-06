# Implementation Plan: Vitrine de projets avec liens et captures

**Branch**: `002-project-showcase` | **Date**: 2026-11-04 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/002-project-showcase/spec.md`

## Summary

Remplacer la liste de liens par une vitrine de projets.

Approche technique :

- une fiche TypeScript par projet, dans son propre dossier avec ses images (imports statiques), validée par Zod au build. Cela referme l'écart au principe III laissé par la spec 001 ;
- un chargeur résout la couverture, les libellés de liens, les technologies canoniques et la visibilité. Il refuse tout lien et toute capture non validée dans un projet confidentiel ;
- `/projects` filtre dans le navigateur par cadre et technologie, filtres conservés dans l'adresse, challenges regroupés dans « Labs » ;
- `/projects/<id>` présente l'étude de cas et une galerie accessible (`<dialog>` natif, clavier, balayage) ;
- l'accueil affiche jusqu'à 4 projets mis en avant.

## Technical Context

**Language/Version**: TypeScript 5 (strict), Node 22 LTS

**Primary Dependencies**: Next.js 16.4.2 (Pages Router, Turbopack), React 18.3, Tailwind CSS 4.3, Zod 4, react-icons 5. **Aucune nouvelle dépendance** (pas de bibliothèque de galerie, YAML ou mesure d'image : research R1, R6).

**Storage**: fichiers du dépôt (`src/content/projects/<id>/`) ; état du filtre dans l'adresse de la page

**Testing**: Vitest 5 (schéma, chargeur, normalisation, tri, filtres, index de galerie, contrastes) ; Lighthouse, clavier, lecteur d'écran et tactile en manuel ([quickstart.md](quickstart.md))

**Target Platform**: navigateurs evergreen, mobile d'abord (360 px) ; Vercel (statique)

**Project Type**: site web statique (Next.js), un seul projet

**Performance Goals**: LCP < 2,5 s en 4G sur une page projet à 10 captures (SC-003) ; Lighthouse ≥ 90 ; images AVIF/WebP à la taille d'affichage ; seule la couverture de la page projet est préchargée

**Constraints**:
- dépôt **public** : aucune capture non validée ni URL interne ne doit y entrer (R2) ;
- aucun lien imbriqué ; une destination = un arrêt de tabulation ;
- `prefers-reduced-motion` respecté ;
- textes sans tiret long.

**Scale/Scope**:
- 8 projets migrés + 8 nouveaux (catalogue de research R13), environ 16 fiches ;
- 2 pages (`/projects`, `/projects/[id]`) et l'accueil ;
- 6 composants de projet.

**Dépendances externes (contenu, non bloquantes pour le code)**:
- **D1** : captures et textes d'étude de cas fournis par Zobel ; sans eux, la fiche sort avec sa carte, sa couverture de repli et une page minimale ;
- **D2** : décisions Q1 (passeport de mariage) et Q2 (Ma Tension, St Market) de [research.md](research.md).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Vérification | Statut |
|---|---|---|
| I. À jour ou absent | Projets repris du parcours ; liens morts marqués « archivés » (hors ligne) ou masqués ; projets sans destination présentés comme « non publics » au lieu d'un bouton vide | ✅ |
| II. Specification-first | Spec 002 validée (checklist 16/16) ; questions de contenu Q1, Q2 notées comme hypothèses, sans blocage du code | ✅ |
| III. Contenu = donnée (NON-NEGOTIABLE) | Une fiche par projet validée au build, erreurs nommant fiche et champ. Referme l'écart de la spec 001 | ✅ |
| IV. Mobile-first, accessible, rapide | Galerie au clavier et au toucher, `<dialog>` natif, `aria-live` pour les filtres, contrastes de cadre testés, images optimisées et chargées à la demande | ✅ |
| V. Visible et mesurable | Titre, description et `og:*` par page projet ; la mesure d'audience et les images de partage générées restent en spec 003 | ✅ (partiel, prévu) |
| VI. Simple d'abord | Aucune dépendance ajoutée ; filtres côté client plutôt qu'une page par combinaison ; registre d'une ligne plutôt qu'un générateur | ✅ |
| VII. Confidentialité | Projet confidentiel : aucun lien (build en échec sinon), captures `approved: true` obligatoires ; captures non validées hors du dépôt public ; étude de cas MaxIt au niveau produit, sans chiffres internes ni architecture | ✅ |
| Contraintes | Next 16 Pages Router, TS strict, Tailwind 4, Vitest, Vercel, code en anglais, contenu en français | ✅ |

**Re-check post-design**: aucun écart introduit par [research.md](research.md), [data-model.md](data-model.md) et les [contrats](contracts/). Le registre `src/content/projects/index.ts` est une liste de contenu, pas un composant : FR-001 et SC-001 sont respectés.

## Project Structure

### Documentation (this feature)

```text
specs/002-project-showcase/
├── spec.md
├── plan.md              # ce fichier
├── research.md          # décisions R1 à R13, questions Q1 et Q2
├── data-model.md        # Project, ProjectLink, ProjectImage, CaseStudy, Technology, ProjectView
├── quickstart.md
├── contracts/
│   ├── projects-content.md   # écrire une fiche, types, fonctions de lecture, erreurs
│   └── public-surface.md     # routes, paramètres d'adresse, métadonnées
├── checklists/requirements.md
└── tasks.md             # /speckit-tasks
```

### Source Code (repository root)

```text
next.config.mjs                         # images.formats avif + webp

src/content/
├── site.ts                             # + siteUrl
├── technologies.ts                     # NOUVEAU : liste canonique (slug, name, aliases, category)
├── filters.ts                          # NOUVEAU : parseFilterQuery, filterProjects, splitLabs (sans Zod)
└── projects/                           # NOUVEAU
    ├── schema.ts                       # schémas Zod, ProjectInput, contextes (libellés, couleurs)
    ├── load.ts                         # validation, normalisation, couverture, tri, lecture (serveur)
    ├── index.ts                        # registre : une ligne par projet
    ├── subscribe/        { index.ts, cover.png, logo.svg }
    ├── lottery-elmados/  { index.ts, cover.png }
    ├── africa-business-network/ …
    ├── click-school/ …
    ├── rest-countries/ …
    ├── form-steps/ …
    ├── food-animation/ …               # hidden: true
    ├── nike-product/ …
    ├── kibreeze/ …                     # nouveaux projets (research R13)
    ├── connecteur360/ …
    ├── maxit/ …                        # confidential, subprojects
    ├── koli/ …
    ├── wedding-passport/ …
    ├── whatsapp-qr/ …
    ├── kahak-residency/ …
    └── __tests__/                      # schéma, chargeur, filtres, contrastes, dossiers = id

src/components/projects/                # NOUVEAU
├── ProjectCard.tsx                     # couverture + titre → page projet ; liens externes séparés
├── ProjectCover.tsx                    # image, logo ou initiales sur la couleur du cadre
├── ProjectLinks.tsx                    # boutons de liens, état archivé
├── ProjectFilters.tsx                  # sélecteurs cadre et techno, compteur aria-live, réinitialisation
├── CaseStudy.tsx                       # sections dans l'ordre, sections vides omises
├── Gallery.tsx                         # vignettes + <dialog>, clavier, balayage
└── galleryIndex.ts                     # next / previous avec bouclage (pur, testé)

src/pages/
├── index.tsx                           # + featuredProjects dans getStaticProps
├── projects/index.tsx                  # getStaticProps, filtres, section Labs
└── projects/[id].tsx                   # NOUVEAU : getStaticPaths, étude de cas, galerie, <Head>

src/components/sections/Home.tsx        # projets mis en avant (props), jusqu'à 4
```

**Supprimés** : `src/data/ProjectsData.ts`, `src/components/base/projects/ProjectCard.tsx`, et les images de projet de `src/assets/images/`, déplacées dans les dossiers des fiches.

**Structure Decision**: un seul projet Next.js. Les projets rejoignent `src/content/` (convention de la spec 001), chaque fiche avec ses images dans son dossier ; les composants de projet sont regroupés dans `src/components/projects/`.

## Ordre de mise en œuvre

1. **Fondations** : `technologies.ts`, `projects/schema.ts`, `projects/load.ts`, `filters.ts`, tests sur fiches de test.
2. **US1** (P1) : migration des 8 projets existants dans le nouveau modèle, registre, suppression de l'ancien modèle.
3. **US2** (P1) : `ProjectCover`, `ProjectLinks`, `ProjectCard`, page `/projects` (sans filtres), accueil.
4. **US3** (P2) : `/projects/[id]`, `CaseStudy`, `Gallery`, métadonnées.
5. **US4** (P2) : mise en avant, `ProjectFilters`, section Labs.
6. **US5** (P3) : fiche confidentielle MaxIt avec sous-projets, garde-fous testés.
7. **Contenu** : nouvelles fiches (Kibreeze, Connecteur360, Koli, QR WhatsApp, Kahak Residency, passeport selon Q1), au fil des captures et textes fournis (D1).
8. **Validation** : [quickstart.md](quickstart.md).

## Complexity Tracking

Aucun écart à justifier.
