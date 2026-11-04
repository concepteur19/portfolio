# Data Model: Vitrine de projets avec liens et captures

**Feature**: `002-project-showcase` | **Date**: 2026-11-04 | **Plan**: [plan.md](plan.md)

Une fiche par projet dans `src/content/projects/<id>/index.ts`, validée par Zod au build (principe III). Les types exacts et les fonctions de lecture sont dans [contracts/projects-content.md](contracts/projects-content.md). Les types partagés `YearMonth` et `Url` viennent de la spec 001.

## Project (fiche)

| Champ | Type | Règle |
|---|---|---|
| `id` | string | kebab-case, unique, égal au nom du dossier (FR-008, R4) |
| `title` | string | 1 à 80 caractères |
| `summary` | string | 1 à 160 caractères (FR-002) |
| `context` | ProjectContext | voir l'énumération plus bas |
| `organization` | string? | structure ou client ; obligatoire sauf pour `personal` et `challenge` |
| `period` | { `start`: YearMonth, `end`?: YearMonth } | `end ≥ start` ; `end` absent = en cours |
| `role` | string | rôle de Zobel, 1 phrase |
| `technologies` | string[] | 1 à 12 entrées, chacune connue de la liste canonique (R3) ; sans doublon après normalisation |
| `links` | ProjectLink[] | 0 à N ; **interdit (0 exigé) si `confidential`** (R2) |
| `images` | ProjectImage[] | 0 à N |
| `coverIndex` | number? | index valide dans `images` |
| `logo` | StaticImageData? | image importée |
| `caseStudy` | CaseStudy? | sections facultatives |
| `subprojects` | Subproject[]? | FR-017 |
| `featured` | { `order`: number }? | entier ≥ 1 |
| `hidden` | boolean? | `true` : ni carte ni page |
| `confidential` | boolean? | `true` : mention « Projet confidentiel », aucun lien |

**Validation sur l'ensemble** : identifiants uniques ; au plus 4 projets `featured` ; ordres de mise en avant uniques ; un projet `hidden` ne peut pas être `featured`.

### ProjectContext

| Valeur | Libellé | Couleur (texte blanc, ≥ 4,5:1) |
|---|---|---|
| `orange-cameroun` | Orange Cameroun | `#9a3412` |
| `employer` | Employeur | `#1e40af` |
| `client` | Client | `#155e75` |
| `freelance` | Freelance | `#5b21b6` |
| `personal` | Personnel | `#166534` |
| `challenge` | Challenge | `#9d174d` |

Les cadres `challenge` forment la section « Labs » (FR-014).

## ProjectLink

| Champ | Type | Règle |
|---|---|---|
| `type` | `"demo" \| "code-frontend" \| "code-backend" \| "code" \| "design" \| "article" \| "store" \| "video" \| "other"` | libellé par défaut selon le type (research R9) |
| `url` | Url | `https:` uniquement |
| `label` | string? | remplace le libellé par défaut |
| `archived` | `true \| "hide"`? | `true` : « Démo hors ligne » non cliquable ; `"hide"` : masqué |

## ProjectImage

| Champ | Type | Règle |
|---|---|---|
| `image` | StaticImageData | import statique ; un fichier absent fait échouer le build |
| `alt` | string | obligatoire, 1 à 200 caractères (FR-004, FR-008) |
| `caption` | string? | légende affichée dans la galerie |
| `format` | `"desktop" \| "mobile" \| "other"` | proportions de la vignette (R6) |
| `approved` | boolean | défaut `true` ; **doit valoir explicitement `true` dans un projet confidentiel** (R2) |

## CaseStudy

Six sections facultatives, chacune une chaîne ou une liste de paragraphes non vides : `context`, `problem`, `role`, `solution`, `results`, `learnings`. Affichage dans cet ordre, sections vides omises (US3-1). Titres affichés : Contexte, Problème, Mon rôle, Solution, Résultats, Apprentissages.

## Subproject

| Champ | Type | Règle |
|---|---|---|
| `name` | string | 1 à 80 caractères |
| `summary` | string | 1 à 160 caractères |

## Technology (`src/content/technologies.ts`)

| Champ | Type | Règle |
|---|---|---|
| `slug` | string | kebab-case, unique ; valeur du filtre `?tech=` |
| `name` | string | nom affiché, unique |
| `aliases` | string[] | variantes acceptées, comparées sans casse ni espaces ni points |
| `category` | `"frontend" \| "backend" \| "data" \| "devops" \| "mobile" \| "tools"` | regroupement futur |

## ProjectView (sortie du chargeur, sérialisée par `getStaticProps`)

Ce que reçoivent les composants ; aucun champ `undefined` (contrainte de sérialisation Next.js).

- les champs de la fiche, avec :
  - `technologies` : `{ slug, name }[]` canoniques ;
  - `links` : liens non masqués, avec `label` résolu et `archived: boolean` ;
  - `images` : captures publiables seulement ;
  - `contextLabel`, `contextColor` ;
  - `cover` : `{ kind: "image", image, alt }` ou `{ kind: "logo", logo }` ou `{ kind: "initials", initials }` (R8) ;
  - `visibility` : `"public"`, `"confidential"` ou `"not-public"` (ni lien ni capture) ;
  - `periodLabel` : « 09/2026 - 10/2026 », formaté avec `formatPeriod` (spec 001).

## Tri

- Page Projets : mis en avant (par `order`), puis du plus récent au plus ancien (`period.start` décroissant), puis Labs (même tri). Les projets `hidden` sont exclus partout.
- Accueil : projets `featured` par `order`, au plus 4.
