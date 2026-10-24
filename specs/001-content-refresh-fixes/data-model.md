# Data Model: Contenu à jour et corrections bloquantes

**Feature**: `001-content-refresh-fixes` | **Date**: 2026-10-24 | **Plan**: [plan.md](plan.md)

Le contenu est de la donnée (principe III). Chaque entité vit dans un module de `src/content/`, est décrite par un schéma Zod dans `src/content/schema.ts` et validée au build. La forme exacte des types est dans [contracts/content-schema.md](contracts/content-schema.md). Les valeurs viennent de `docs/career-timeline.md`, aligné sur le CV générique.

## Types partagés

- **YearMonth** : chaîne `YYYY-MM`, mois entre 01 et 12.
- **Url** : URL absolue `https:` ou `mailto:`.

## Profile (`profile.ts`, un seul objet)

| Champ | Type | Règle |
|---|---|---|
| `displayName` | string | « Zobel Nguening », utilisé partout sur le site |
| `fullName` | string | « Zobel Ulrich Nguening Tchomgui » |
| `title` | string | « Ingénieur Logiciel Fullstack » (FR-001) |
| `specialties` | string[] | 1 à 4 entrées : React, ASP.NET Core, Laravel |
| `tagline` | string | 1 à 3 phrases, sans tiret long ; la durée d'expérience s'écrit `{experience}`, remplacé au rendu (FR-005 : jamais de durée en dur) |
| `bio` | string[] | paragraphes de la page À propos |
| `currentRoleId` | string | identifiant d'une `Experience` en cours ; vérifié à la validation |
| `location` | string | « Douala, Cameroun » ; jamais d'adresse précise (VII) |
| `email` | string | e-mail public |
| `socials` | SocialLink[] | au moins GitHub et LinkedIn |
| `cv` | { `path`, `downloadName` } | `path` commence par `/cv/` et se termine par `.pdf` ; le fichier doit exister dans `public/` |

**Interdit par le schéma** : aucun champ téléphone (principe VII).

### SocialLink

| Champ | Type | Règle |
|---|---|---|
| `network` | `"github" \| "linkedin" \| "x" \| "email"` | sélectionne l'icône |
| `url` | Url | |
| `handle` | string | texte affiché (`@concepteur19`) |
| `label` | string | nom accessible (« GitHub de Zobel Nguening ») |

## Experience (`experience.ts`, liste)

| Champ | Type | Règle |
|---|---|---|
| `id` | string | unique, kebab-case |
| `role` | string | intitulé du CV |
| `organization` | string | structure employeuse |
| `client` | string? | structure d'accueil en mission (Orange Cameroun) |
| `location` | string | ville |
| `start` | YearMonth | |
| `end` | YearMonth? | absent = en cours, affiché « aujourd'hui » ; si présent, `end ≥ start` |
| `achievements` | string[] | 1 à 3 entrées si `section = "main"` (FR-002), 0 à 3 si `section = "early"` ; sans donnée confidentielle (VII) |
| `section` | `"main" \| "early"` | `early` = stages LUGAR et Gloom, affichés dans « Débuts » (FR-015) |

**Tri d'affichage** (FR-002, du plus récent au plus ancien) : postes en cours d'abord, puis postes terminés ; à l'intérieur de chaque groupe, par `start` décroissant. Ordre obtenu : Orange, PhiBrain, Happyness, Enseignement, 2SI ; puis Gloom, LUGAR dans « Débuts ».

**Durée d'expérience** (FR-005) : fusion des intervalles `[start, end ou mois courant]` des postes `section = "main"`, puis somme des mois. Libellé : « plus de N ans » si au moins 12 mois, sinon « N mois ». Avec les données actuelles, au 2026-10 : de 2023-02 à 2026-10, soit « plus de 3 ans ».

**Validation croisée** : identifiants uniques ; `Profile.currentRoleId` désigne une expérience sans `end`.

## Education (`education.ts`, liste)

| Champ | Type | Règle |
|---|---|---|
| `id` | string | unique |
| `degree` | string | « Ingénieur en Informatique (BAC+5) », « Baccalauréat C » |
| `school` | string | « École Nationale Supérieure Polytechnique de Douala (ENSP) », « Lycée Bilingue de Bonabéri » |
| `startYear` | number? | 2018 pour l'ENSP |
| `endYear` | number | 2023, 2016 ; `endYear ≥ startYear` |

Tri : `endYear` décroissant. Le « Niveau 1 Mathématiques-Informatique » n'est pas repris (absent du CV en vigueur).

## SkillGroup (`skills.ts`, liste ordonnée)

| Champ | Type | Règle |
|---|---|---|
| `id` | string | unique |
| `label` | string | domaine du CV |
| `items` | string[] | au moins 1, sans doublon dans le groupe |

Groupes, dans l'ordre du CV générique : Développement backend, Développement frontend, Bases de données, DevOps, Tests et qualité, Sécurité, Intelligence artificielle, Méthodes. Redux, Bootstrap, Symfony et Node / Express disparaissent (FR-004).

## NavItem (`site.ts`, liste)

| Champ | Type | Règle |
|---|---|---|
| `href` | string | chemin interne existant (`/about`, `/projects`) |
| `label` | string | « À propos », « Projets » |

Un test vérifie que chaque `href` correspond à une page de `src/pages/`.

## Project (existant, `src/data/ProjectsData.ts`)

Modèle transitoire jusqu'à la spec 002. Seuls changements : un type explicite `LegacyProject` (champs existants plus `visible?: boolean`) et une fonction `isPublishable(p)` = `p.visible !== false && p.link !== ""`. Aucune validation Zod ici (voir Complexity Tracking du plan).

## Transitions d'état

Aucune donnée ne change à l'exécution. Le seul état est le thème : `system` (aucune clé en `localStorage`) → `light` ou `dark` après un clic sur le bouton. Le choix manuel est mémorisé et prime ensuite sur la préférence système.
