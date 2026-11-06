# Contract: contenu des projets

Interface entre les fiches (`src/content/projects/<id>/index.ts`) et les pages. La spec 003 (métadonnées) et la spec 008 (administration) s'appuient sur ce contrat. Règles détaillées : [../data-model.md](../data-model.md).

## Écrire une fiche

```ts
// src/content/projects/kibreeze/index.ts
import type { ProjectInput } from "@/content/projects/schema";
import home from "./home.png";

export default {
  id: "kibreeze",
  title: "Kibreeze",
  summary: "…",
  context: "freelance",
  period: { start: "2026-09", end: "2026-10" },
  role: "…",
  technologies: ["Astro", "Preact", "TypeScript"],
  links: [{ type: "demo", url: "https://…" }],
  images: [{ image: home, alt: "…", format: "desktop" }],
  featured: { order: 1 },
} satisfies ProjectInput;
```

Puis une ligne dans le registre `src/content/projects/index.ts` :

```ts
import kibreeze from "./kibreeze";
export const projectEntries = [kibreeze, /* … */];
```

## Types exposés (`src/content/projects/schema.ts`)

```ts
type ProjectContext = "orange-cameroun" | "employer" | "client" | "freelance" | "personal" | "challenge";
type LinkType = "demo" | "code-frontend" | "code-backend" | "code" | "design" | "article" | "store" | "video" | "other";

interface ProjectInput {
  id: string;
  title: string;
  summary: string;                 // ≤ 160
  context: ProjectContext;
  organization?: string;
  period: { start: YearMonth; end?: YearMonth };
  role: string;
  technologies: string[];          // variantes acceptées, normalisées
  links?: { type: LinkType; url: string; label?: string; archived?: true | "hide" }[];
  images?: { image: StaticImageData; alt: string; caption?: string; format: "desktop" | "mobile" | "other"; approved?: boolean }[];
  coverIndex?: number;
  logo?: StaticImageData;
  caseStudy?: Partial<Record<"context" | "problem" | "role" | "solution" | "results" | "learnings", string | string[]>>;
  subprojects?: { name: string; summary: string }[];
  featured?: { order: number };
  hidden?: boolean;
  confidential?: boolean;
}
```

`ProjectView` (sortie) : voir [../data-model.md](../data-model.md#projectview-sortie-du-chargeur-sérialisée-par-getstaticprops).

## Fonctions de lecture (`src/content/projects/load.ts`, serveur uniquement)

| Fonction | Retour | Garantie |
|---|---|---|
| `validateProjects(entries)` | `ProjectView[]` | lève une erreur nommant la fiche et le champ |
| `getProjects()` | `ProjectView[]` | non masqués, triés (data-model, Tri) |
| `getProject(id)` | `ProjectView` | lève si absent ou masqué |
| `getFeaturedProjects()` | `ProjectView[]` | au plus 4, par `order` |
| `getProjectIds()` | `string[]` | pour `getStaticPaths` |
| `getFilterOptions(projects)` | `{ contexts: {value,label,count}[]; technologies: {slug,name,count}[] }` | options présentes dans les projets |

## Fonctions pures côté navigateur (`src/content/filters.ts`, sans Zod)

| Fonction | Rôle |
|---|---|
| `parseFilterQuery(query)` | lit `cadre` et `tech` de l'adresse ; ignore les valeurs inconnues |
| `filterProjects(projects, filter)` | applique le cadre et la technologie |
| `splitLabs(projects)` | `{ main, labs }` selon le cadre `challenge` |

## Erreurs

Format identique à la spec 001 :

```text
Contenu invalide dans src/content/projects/kibreeze/index.ts › images[2].alt : valeur vide
Contenu invalide dans src/content/projects/maxit/index.ts › links : un projet confidentiel ne publie aucun lien
Contenu invalide dans src/content/projects/koli/index.ts › technologies[3] : technologie inconnue « Nest » (à ajouter dans src/content/technologies.ts)
```
