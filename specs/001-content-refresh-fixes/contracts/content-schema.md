# Contract: schéma du contenu

Interface entre les fichiers de contenu (`src/content/*.ts`) et les pages. C'est le contrat que la spec 002 (projets) et la spec 008 (administration) devront respecter. Le détail des règles est dans [../data-model.md](../data-model.md).

## Types exposés

```ts
type YearMonth = `${number}-${number}`; // validé : /^\d{4}-(0[1-9]|1[0-2])$/

interface SocialLink {
  network: "github" | "linkedin" | "x" | "email";
  url: string;    // https: ou mailto:
  handle: string;
  label: string;  // nom accessible
}

interface Profile {
  displayName: string;
  fullName: string;
  title: string;
  specialties: string[];          // 1..4
  tagline: string;                // peut contenir {experience}
  bio: string[];
  currentRoleId: string;          // Experience.id sans end
  location: string;
  email: string;
  socials: SocialLink[];
  cv: { path: `/cv/${string}.pdf`; downloadName: string };
}

interface Experience {
  id: string;
  role: string;
  organization: string;
  client?: string;
  location: string;
  start: YearMonth;
  end?: YearMonth;                // absent = en cours
  achievements: string[];         // 1..3 si main, 0..3 si early
  section: "main" | "early";
}

interface Education {
  id: string;
  degree: string;
  school: string;
  startYear?: number;
  endYear: number;
}

interface SkillGroup { id: string; label: string; items: string[] }

interface NavItem { href: `/${string}`; label: string }
```

## Fonctions de lecture (`src/content/index.ts`)

| Fonction | Retour | Garantie |
|---|---|---|
| `getProfile()` | `Profile` | validé |
| `getExperiences()` | `{ main: Experience[]; early: Experience[] }` | validé, trié (data-model) |
| `getEducation()` | `Education[]` | validé, trié par `endYear` décroissant |
| `getSkillGroups()` | `SkillGroup[]` | validé, ordre du fichier |
| `getNavItems()` | `NavItem[]` | validé |
| `getExperienceSummary(today: Date)` | `{ months: number; label: string }` | intervalles fusionnés, section `main` seulement |
| `formatPeriod(start, end?)` | `string` | « 09/2025 - aujourd'hui », « 07/2024 - 01/2025 » |

Les fonctions sont pures et sérialisables : leur résultat passe par `getStaticProps` vers les composants.

## Erreurs

Une validation qui échoue lève une `Error` dont le message suit le format :

```text
Contenu invalide dans src/content/experience.ts › [2].end : la fin (2023-01) précède le début (2023-02)
```

Le build s'arrête sur cette erreur (`getStaticProps`), et le test `content.test.ts` échoue avec le même message.
