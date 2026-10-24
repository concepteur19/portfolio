---
description: "Task list for 001-content-refresh-fixes"
---

# Tasks: Contenu à jour et corrections bloquantes

**Input**: Design documents from `specs/001-content-refresh-fixes/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/), [quickstart.md](quickstart.md)

**Tests**: inclus. Le plan et le quickstart (section 1) exigent des tests Vitest du contenu et des dates ; ils sont écrits en phase 2, avant les pages qui consomment le contenu.

**Organization**: une phase par user story, dans l'ordre de priorité de la spec.

## Format: `[ID] [P?] [Story] Description`

- **[P]** : peut tourner en parallèle (fichier différent, aucune dépendance sur une tâche non terminée)
- **[Story]** : user story concernée (US1 à US4)

## Règles communes à toutes les tâches

- Source du contenu : `docs/career-timeline.md` (CV générique). Aucun numéro de téléphone dans les pages ni le contenu (il figure seulement dans le CV PDF), aucun chiffre interne Orange, aucun détail d'architecture Orange : principe VII.
- Aucun tiret long (—) dans les textes affichés.
- Les composants n'importent jamais `src/content/index.ts` ni `zod`. Seul `getStaticProps` des pages appelle les fonctions de lecture, ce qui garde Zod hors du bundle client. `Navbar` et `Footer` (rendus par `_app`, sans `getStaticProps`) importent directement les modules de données bruts `src/content/site.ts` et `src/content/profile.ts`.
- Code, identifiants et commits en anglais (Conventional Commits) ; textes du site en français.

---

## Phase 1: Setup

**Purpose**: branche, dépendance, fichier du CV

- [X] T001 Create branch `001-content-refresh-fixes` from `test/next-16` (`git checkout test/next-16 && git checkout -b 001-content-refresh-fixes`); the untracked `.specify/`, `specs/`, `docs/` and `.claude/` folders follow the working tree
- [X] T002 Install Zod 4 as a runtime dependency (`npm install zod@^4`), updating `package.json` and `package-lock.json`
- [X] T003 [P] Add the generic CV provided by Zobel at `public/cv/zobel-nguening-cv.pdf` (phone number kept, constitution 1.1.0), with neutral PDF metadata (title « CV Zobel Nguening, Ingénieur Logiciel Fullstack », author « Zobel Nguening »); confirm the properties mention no job application. Blocks T023 only.
- [X] T004 [P] Add a `@/` path alias to `vitest.config.js` (`resolve.alias: { "@": path.resolve(__dirname, "src") }`) so tests can import `@/content/...` like the app does

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: le contenu comme donnée (principe III) : schémas, données, fonctions de lecture, tests. Rien de visible ne change encore.

**⚠️ CRITICAL**: aucune user story ne commence avant la fin de cette phase.

- [X] T005 Create `src/content/schema.ts` with Zod schemas and inferred input types (`ProfileInput`, `ExperienceInput`, `EducationInput`, `SkillGroupInput`, `NavItemInput`) following [data-model.md](data-model.md):
  - `YearMonth`: string matching `/^\d{4}-(0[1-9]|1[0-2])$/`;
  - `Url`: absolute `https:` or `mailto:` URL;
  - Profile: `specialties` « 1 à 4 entrées » ; `socials` must include `github` and `linkedin`; `cv.path` « commence par `/cv/` et se termine par `.pdf` » ; schema is `.strict()` so no phone field can be added;
  - Experience: `id` kebab-case; `achievements` « 1 à 3 entrées si `section = "main"`, 0 à 3 si `section = "early"` » ; `end ≥ start` when present; `section` is `"main" | "early"`;
  - Education: `endYear ≥ startYear` when `startYear` is present;
  - SkillGroup: `items` « au moins 1, sans doublon dans le groupe » ;
  - NavItem: `href` starts with `/`;
  - export `formatContentError(file: string, error: z.ZodError): Error` producing `Contenu invalide dans src/content/<file> › <path> : <message>` (format of [contracts/content-schema.md](contracts/content-schema.md)).
- [X] T006 [P] Create `src/content/dates.ts`:
  - `formatPeriod(start, end?)` returns `MM/AAAA - MM/AAAA` or `MM/AAAA - aujourd'hui` (e.g. `09/2025 - aujourd'hui`, `07/2024 - 01/2025`);
  - `getExperienceSummary(entries, today)`: keep entries with `section === "main"`, turn each into a month interval from `start` to `end` inclusive (ongoing = current month of `today`), merge overlapping or adjacent intervals, sum the months; label is `N mois` under 12 months, `1 an` / `N ans` when the count is an exact multiple of 12, otherwise `plus de N ans` (N = floor(months / 12));
  - pure functions, no `Date.now()` inside (the caller passes `today`).
- [X] T007 [P] Create `src/content/profile.ts` exporting `profile` (`satisfies ProfileInput`, type-only import from `./schema`):
  - `displayName: "Zobel Nguening"`, `fullName: "Zobel Ulrich Nguening Tchomgui"`, `title: "Ingénieur Logiciel Fullstack"`, `specialties: ["React", "ASP.NET Core", "Laravel"]`;
  - `tagline`: « Ingénieur en informatique (ENSP Douala) avec {experience} d'expérience en développement fullstack d'applications web et mobiles. Chez Orange Cameroun, je développe et fais évoluer des services de la super app MaxIt avec React, ASP.NET Core et OpenShift, de l'analyse des besoins jusqu'au suivi en production. » ;
  - `bio` (page À propos), 3 paragraphs: current mission at INGSi (Sprint Pay) for Orange Cameroun (Digital Factory, MaxIt WebViews and mini apps); co-founder of PhiBrain Inc SARL, where he built Clickschool, and freelance work (Kibreeze, Connecteur360); taught computer science in middle and high schools from 2024 to 2025, plus his taste for design and drawing (reworded from the current About text, without typos);
  - `currentRoleId: "ingsi-orange"`, `location: "Douala, Cameroun"`, `email: "zobel.tchomgui@gmail.com"`;
  - `socials`: GitHub `https://github.com/concepteur19` (`@concepteur19`, label « GitHub de Zobel Nguening »), LinkedIn `https://linkedin.com/in/zobel-ulrich-nguening-tchomgui-825a01224/` (label « LinkedIn de Zobel Nguening »), X `https://twitter.com/nguening` (`@nguening`, label « X (Twitter) de Zobel Nguening »), email `mailto:zobel.tchomgui@gmail.com` (label « Écrire à Zobel Nguening ») ;
  - `cv: { path: "/cv/zobel-nguening-cv.pdf", downloadName: "Zobel-Nguening-CV.pdf" }`.
- [X] T008 [P] Create `src/content/experience.ts` exporting `experiences` (`satisfies ExperienceInput[]`) with these entries (location `Douala` unless stated):
  - `ingsi-orange`: « Développeur d'Applications Fullstack », organization « INGSi (Sprint Pay) », client « Orange Cameroun, Digital Factory », start `2025-09`, no end; achievements: (1) « Développement et évolution des WebViews commerciales de la super app MaxIt (Orange Bonus, BIM, Sembewoila, Homebox, Univers Premium) et du frontend des mini apps Univers Jeunes et Résultats officiels. » (2) « Migration de microservices ASP.NET Core de Kubernetes vers OpenShift : Routes, Services et ports de conteneurs. » (3) « Mises en production avec l'équipe d'exploitation (RUN) et supervision : tableaux de bord Grafana sur OpenShift, KPI d'engagement suivis sur Matomo. » ;
  - `phibrain`: « Co-fondateur et Développeur Fullstack », « PhiBrain Inc SARL », start `2023-02`, no end; achievements: « Analyse, conception (UML, Merise) et développement de Clickschool, plateforme de gestion scolaire (React, Laravel) : authentification, rôles, notes et bulletins, suivi des élèves par les parents. » and « Recueil des besoins clients, rédaction des cahiers des charges, contrats et guides utilisateurs. » ;
  - `happyness`: « Développeur Web », « Happyness SARL », `2024-07` → `2025-01`; achievement: « Développement de fonctionnalités React et Redux et intégration des API d'une application de digitalisation ; documentation utilisateur. » ;
  - `teaching`: « Enseignant d'informatique », « Collèges et lycées », `2024-02` → `2025-05`; achievement: « Enseignement de l'informatique et accompagnement des apprenants : pédagogie, vulgarisation technique et communication. » ;
  - `2si`: « Développeur Web Junior, après un stage Mobile et Web », « 2SI-Inc SA », `2023-02` → `2024-02`; achievements: « Développement du frontend Angular de 3 applications clientes : location de véhicules et de logements (Kahak Residency), gestion de loterie, suivi de patients. » and « Conception de l'architecture fonctionnelle de ces applications et maintenance des applications internes, en méthode Agile. » ;
  - `gloom`: « Développeur web (stage) », « Gloom SARL », `2022-07` → `2022-08`, section `early`, achievements `[]` ;
  - `lugar`: « Développeur web (stage) », « LUGAR SARL », `2021-07` → `2021-08`, section `early`, achievements `[]`.
- [X] T009 [P] Create `src/content/education.ts` exporting `education` (`satisfies EducationInput[]`): `ensp` « Ingénieur en Informatique (BAC+5) », « École Nationale Supérieure Polytechnique de Douala (ENSP) », 2018 → 2023; `bac` « Baccalauréat C », « Lycée Bilingue de Bonabéri », endYear 2016. No « Niveau 1 » entry.
- [X] T010 [P] Create `src/content/skills.ts` exporting `skillGroups` (`satisfies SkillGroupInput[]`), in this order:
  - Développement backend : C#, ASP.NET Core, PHP, Laravel, API REST, architecture microservices ;
  - Développement frontend : React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Angular, Taro (mini programs) ;
  - Bases de données : SQL, MySQL, MongoDB, Redis, Merise et UML ;
  - DevOps : Git, Docker, Kubernetes, OpenShift, Azure DevOps, GitHub Actions, SonarQube, Grafana, Linux ;
  - Tests et qualité : Jest, Vitest, Playwright, SonarQube, audits d'accessibilité et de performance ;
  - Sécurité : JWT, authentification 2FA, KYC, protection des données ;
  - Intelligence artificielle : DeepL (traduction automatique neuronale), Claude Code, GitHub Copilot, Spec Kit ;
  - Méthodes : Agile Scrum, Spec-Driven Development, revue de code, documentation technique.
- [X] T011 [P] Create `src/content/site.ts` exporting `navItems` (`satisfies NavItemInput[]`): `{ href: "/about", label: "À propos" }`, `{ href: "/projects", label: "Projets" }`. Add a one-line comment that « Articles » comes back with spec 007.
- [X] T012 Create `src/content/index.ts` (depends on T005 to T011):
  - `validateContent(raw)` parses every module with its schema, wraps failures with `formatContentError`, then runs the cross-checks: unique ids per collection; `profile.currentRoleId` points to an experience without `end` ;
  - reading functions from [contracts/content-schema.md](contracts/content-schema.md): `getProfile()`, `getExperiences()` (returns `{ main, early }`, each sorted « postes en cours d'abord, puis postes terminés ; à l'intérieur de chaque groupe, par `start` décroissant »), `getEducation()` (sorted by `endYear` desc), `getSkillGroups()`, `getNavItems()`, `getExperienceSummary(today)` ;
  - `fillExperience(text, label)` replaces `{experience}` ;
  - every returned object is JSON-safe for `getStaticProps`: drop keys whose value is `undefined` (Next.js refuses to serialize `undefined`).
- [X] T013 [P] Write `src/content/__tests__/dates.test.ts`:
  - `formatPeriod` with and without end ;
  - summary of a single ongoing entry ;
  - two overlapping entries (2023-02 ongoing and 2025-09 ongoing) are counted once ;
  - `early` entries are ignored ;
  - labels `11 mois`, `1 an`, `plus de 3 ans` ;
  - with the real data and `today = 2026-10-15`, the label is `plus de 3 ans`.
- [X] T014 [P] Write `src/content/__tests__/content.test.ts`:
  - `validateContent` accepts the real content ;
  - an experience fixture with `end` before `start` throws a message that contains `experience.ts` and the field path ;
  - a duplicate id throws ;
  - each `navItems.href` maps to an existing page file (`src/pages/<path>/index.tsx` or `src/pages/<path>.tsx`) ;
  - no string in the serialized content matches a phone pattern (`/\+?237|\b6\d{2}[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2}\b/`) ;
  - `public/cv/zobel-nguening-cv.pdf` exists.
- [X] T015 Run `npm test` and `npx tsc --noEmit`; both must pass before Phase 3

**Checkpoint**: le contenu est validé et testé ; les pages peuvent le consommer.

---

## Phase 3: User Story 1 - Un recruteur voit un profil à jour (Priority: P1) 🎯 MVP

**Goal**: l'accueil et la page À propos reflètent le CV générique ; durée et année calculées ; aucune faute.

**Independent Test**: comparer champ par champ l'accueil et `/about` avec `docs/career-timeline.md` (quickstart, US1).

- [X] T016 [US1] Rewrite `src/pages/index.tsx`: remove the unused `next/font/google` instances (Inter, Poppins, Barlow); add `getStaticProps` that returns `profile`, `experiences`, `education`, `skillGroups`, `experienceSummary` (computed with `new Date()`), the 3 featured projects data stays imported by `Home` for now; set `revalidate: 86400`; pass everything to `Home` as typed props
- [X] T017 [US1] Rewrite `src/components/sections/Home.tsx` to render only from props, in this order (FR-003):
  1. hero: title « Hey, je suis Zobel Nguening, Ingénieur Logiciel Fullstack », a line with the current role (« Développeur d'Applications Fullstack chez INGSi (Sprint Pay), en mission chez Orange Cameroun ») and `fillExperience(profile.tagline, experienceSummary.label)` ;
  2. « Mes projets phares » (unchanged here) ;
  3. experience card « Expérience professionnelle »: intro sentence using the computed label (no hard-coded duration), the `main` list with role, organization (plus client when present), `formatPeriod`, and the achievements as a list; then a native `<details>` element titled « Débuts » (closed by default) listing the `early` entries ;
  4. skills card « Compétences »: one block per `SkillGroup` (label + items as text tags), replacing the icon `stack` array and its Redux / Bootstrap icons ;
  5. « Formation » last: `startYear - endYear` or `endYear`, degree, school.
  Keep the existing « Télécharger mon CV » button in the experience card; T023 makes it work.
- [X] T018 [US1] Rewrite `src/pages/about/index.tsx`: add `getStaticProps` returning `profile`; title « À propos », the `profile.bio` paragraphs (replacing the Happyness text and the typos « en tant développeur », « créations », « établissment », « Je me défini ») ; social links rendered from `profile.socials` (icon chosen by `network`, visible text `handle`) ; portrait from `@/assets/images/pro.jpeg`
- [X] T019 [P] [US1] Update `src/components/Footer.tsx`: import `profile` from `@/content/profile` (raw module); render social links from `profile.socials`; replace « © 2024 Concepteur JS. All Rights Reserved » with « © {year} Zobel Nguening. Tous droits réservés. », where `year = new Date().getFullYear()` inside a `<span suppressHydrationWarning>`
- [X] T020 [US1] Delete `src/data/ExperienceData.ts` and `src/data/CertificaionsData.ts` once nothing imports them (check with `grep -rn "ExperienceData\|CertificaionsData" src`)
- [X] T021 [US1] Proofread every visible string in `src/` (FR-013): none of « trabaillé », « joeurs », « évolurion », « indiene », « tenis », « Recheche », « Je me défini », « etre », « en tant développeur », « Expériences Professionnelle », « créations », « établissment », « A Propos », « Mon parcours scolaire », « 18 mois », « Actuellement », « Concepteur JS » remains (`grep -rni` each); no « — » in `src/`. Projects texts are fixed in T025.

**Checkpoint**: l'accueil et `/about` montrent le profil du CV générique ; `npm run build` passe.

---

## Phase 4: User Story 2 - Aucun chemin ne mène à une impasse (Priority: P1)

**Goal**: chaque lien et bouton mène quelque part ; le CV se télécharge en 1 clic.

**Independent Test**: activer chaque lien et bouton à la souris et au clavier, dans les deux thèmes (quickstart, US2).

- [X] T022 [US2] Update `src/components/Navbar.tsx`: build the menu from `navItems` (raw import from `@/content/site`), so « Articles » and `/blog` disappear (FR-007); set `aria-current="page"` on the active item; remove `console.log(router.pathname)` (FR-014)
- [X] T023 [US2] Make the CV work (FR-008, depends on T003 and T016):
  - in `getStaticProps` of `src/pages/index.tsx`, check `fs.existsSync(path.join(process.cwd(), "public", profile.cv.path))` and otherwise `throw new Error("CV introuvable : public" + profile.cv.path)` ;
  - in `src/components/sections/Home.tsx`, turn the button into `<a href={profile.cv.path} download={profile.cv.downloadName}>` with the same look and the label « Télécharger mon CV ».
- [X] T024 [P] [US2] In `src/data/ProjectsData.ts`: export a `LegacyProject` type (existing fields plus `visible?: boolean`), type the array with it, and export `isPublishable(p) = p.visible !== false && p.link !== ""` ; fix the texts « joeurs » → « joueurs », « évolurion de leurs enfant » → « évolution de leurs enfants », « indiene » → « indienne », « tenis » → « tennis », « Recheche de pays » → « Recherche de pays », « pour m'amuser j'ai réalisé » → « Pour m'amuser, j'ai réalisé »
- [X] T025 [US2] Rewrite the cards of `src/pages/projects/index.tsx` (FR-009, depends on T024):
  - list only `projectsData.filter(isPublishable)` ;
  - one `<Link href={project.link} target="_blank" rel="noopener noreferrer">` per card; the domain becomes a `<span>` (no nested link) ;
  - replace the `isCardHover` / `idCard` state with a `group` / `group-hover:` style ;
  - fix the intro: « trabaillé » → « travaillé », « en tant que indépendant » → « en tant qu'indépendant ».
- [X] T026 [US2] In `src/components/sections/Home.tsx` and `src/components/base/projects/ProjectCard.tsx`: featured projects are `projectsData.filter(isPublishable).filter((p) => p.imgSrc).slice(0, 3)`; each `ProjectCard` is wrapped in a single link to `project.link` (`target="_blank"`, `rel="noopener noreferrer"`)
- [X] T027 [US2] In `src/pages/about/index.tsx`: social icons use `currentColor` instead of `color="#fff"`, so they are visible in the light theme (US2 scenario 4, FR-010)

**Checkpoint**: menu, CV, cartes et icônes fonctionnent ; un build sans `public/cv/zobel-nguening-cv.pdf` échoue avec « CV introuvable ».

---

## Phase 5: User Story 3 - Le thème choisi est respecté (Priority: P2)

**Goal**: le thème suit le système à la première visite, mémorise le choix et s'applique sans clignotement (FR-011).

**Independent Test**: première visite en système clair puis sombre, bascule, rechargement en « Slow 4G » (quickstart, US3).

- [X] T028 [US3] Update `src/styles/globals.css`:
  - add `@custom-variant dark (&:where(.dark, .dark *));` ;
  - add `--color-primary-strong: #be185d;` to `@theme` (6,04:1 on white, research R9) ;
  - add `html { color-scheme: light; } html.dark { color-scheme: dark; }` ;
  - change `.active` to `color: var(--color-primary-strong)` with `.dark .active { color: var(--color-primary); }`.
- [X] T029 [US3] Add the blocking theme script to `<Head>` in `src/pages/_document.tsx` as an inline `<script dangerouslySetInnerHTML>`: `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light"}catch(_){}})();`
- [X] T030 [US3] Rewrite `src/contexts/themeContext.jsx`:
  - expose `{ isDarkTheme, toggleTheme }` ;
  - state read with `useSyncExternalStore` from `document.documentElement.classList.contains("dark")`, subscribed through a `MutationObserver` on the `class` attribute (server snapshot `false`); avoids `setState` in an effect, rejected by the `react-hooks/set-state-in-effect` lint rule ;
  - `toggleTheme` flips the class, sets `style.colorScheme` and writes `localStorage.theme` (`"light"` or `"dark"`, inside `try`) ;
  - while no value is stored, listen to `matchMedia("(prefers-color-scheme: dark)")` changes and follow them.
- [X] T031 [P] [US3] Convert `src/pages/_app.tsx` and `src/components/Footer.tsx` from `isDarkTheme ? A : B` class strings to `dark:` variants (rule: `B dark:A` per utility) and remove the now unused `useTheme` / `ThemeContext` imports
- [X] T032 [P] [US3] Same conversion in `src/components/Navbar.tsx`; the toggle calls `toggleTheme`, renders both icons and shows them with CSS (`BsMoon` with `dark:hidden`, `BsSun` with `hidden dark:block`); hover colour via `hover:text-primary-strong dark:hover:text-primary`; remove `isDarkBottonOver` state
- [X] T033 [P] [US3] Same conversion in `src/components/sections/Home.tsx`
- [X] T034 [P] [US3] Same conversion in `src/components/base/projects/ProjectCard.tsx`
- [X] T035 [P] [US3] Same conversion in `src/pages/about/index.tsx`
- [X] T036 [P] [US3] Same conversion in `src/pages/projects/index.tsx`
- [X] T037 [US3] Check that no `isDarkTheme ?` remains outside `themeContext.jsx` and `Navbar.tsx` (`grep -rn "isDarkTheme" src`), then run `npm run build`

**Checkpoint**: aucun flash de thème ; le choix survit au rechargement et à la fermeture du navigateur.

---

## Phase 6: User Story 4 - Le site est lisible par tous et par les moteurs (Priority: P3)

**Goal**: langue française, un seul `h1` par page, textes alternatifs, liens nommés, console vide (FR-012, FR-014, US4).

**Independent Test**: Lighthouse accessibilité ≥ 90 sur chaque page et lecture au lecteur d'écran de l'accueil (quickstart, US4).

- [X] T038 [US4] Add an `as?: "h1" | "h2" | "h3"` prop to `src/components/base/Title.tsx` (default `"h2"`) and render the matching tag
- [X] T039 [P] [US4] Heading levels in `src/components/sections/Home.tsx` (hero `as="h1"`, sections `h2`) and `src/components/base/projects/ProjectCard.tsx` (card title `as="h3"`)
- [X] T040 [P] [US4] Heading levels in `src/pages/about/index.tsx` (« À propos » `as="h1"`) and `src/pages/projects/index.tsx` (page title `as="h1"`, card titles `as="h3"`)
- [X] T041 [US4] Set `<Html lang="fr">` in `src/pages/_document.tsx`
- [X] T042 [US4] Alternative texts and accessible names (research R13):
  - portrait in `Home.tsx` and `about/index.tsx`: `alt="Portrait de Zobel Nguening"` ;
  - avatar link in `Navbar.tsx`: `aria-label="Accueil"`, image `alt=""` ;
  - project logos in `ProjectCard.tsx` and `projects/index.tsx`: `alt=""` ;
  - icon-only social links in `Footer.tsx`: `aria-label={social.label}` and `rel="noopener noreferrer"` ; same `rel` on the About page links ;
  - theme toggle in `Navbar.tsx`: constant `aria-label="Thème sombre"` with `aria-pressed={isDarkTheme}` (a toggle button keeps a fixed name and exposes its state), no `aria-expanded` or `aria-controls`.
- [X] T043 [P] [US4] Add `rules: { "no-console": ["error", { allow: ["warn", "error"] }] }` to `eslint.config.mjs` and fix any hit (`npm run lint`)
- [X] T044 [US4] Contrast pass in both themes on the three pages: accent text uses `text-primary-strong dark:text-primary`; no `#fd7fa4` text on a light background; no grey text on a `gray-100` hover background below 4,5:1 (FR-010)

**Checkpoint**: chaque page déclare `fr`, a un seul `h1`, et n'émet rien dans la console.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T045 Run the full check: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`
- [X] T046 Run the build guards of [quickstart.md](quickstart.md) section 2 (missing CV, invalid date, `console.log`) and revert each temporary change
- [ ] T047 Run the manual journeys of [quickstart.md](quickstart.md) section 3 (US1 to US4), including Lighthouse on `/`, `/about`, `/projects` in both themes; note the scores for SC-004 in the PR description
- [ ] T048 Zobel proofreads every text of the site (SC-005) and validates the tagline and bio written in T007
- [ ] T049 [P] Set feature 001 to « Implémentée » in `specs/README.md` and tick the resolved items of the « Incohérences à corriger sur le site actuel » section of `docs/career-timeline.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** : immédiat. T003 dépend du PDF fourni par Zobel.
- **Foundational (Phase 2)** : après T002 et T004 ; bloque toutes les user stories.
- **US1 (Phase 3)** : après la phase 2.
- **US2 (Phase 4)** : après la phase 2. T023 dépend de T016 (même `getStaticProps`) et de T003. T026 touche `Home.tsx` après T017.
- **US3 (Phase 5)** : après US1 et US2, car elle réécrit les classes des mêmes composants (choix du plan).
- **US4 (Phase 6)** : après US3 pour les fichiers communs ; T041 et T043 peuvent passer plus tôt.
- **Polish (Phase 7)** : après toutes les stories.

### Within Each Phase

- Phase 2 : T005 puis T006 à T011 en parallèle, puis T012, puis T013 et T014 en parallèle, puis T015.
- Les tâches qui touchent `Home.tsx` s'enchaînent dans l'ordre des ID : T017, T023, T026, T033, T039, T042.

## Parallel Example: Phase 2

```text
Après T005 :
  T006 src/content/dates.ts
  T007 src/content/profile.ts
  T008 src/content/experience.ts
  T009 src/content/education.ts
  T010 src/content/skills.ts
  T011 src/content/site.ts
Après T012 :
  T013 dates.test.ts
  T014 content.test.ts
```

## Parallel Example: User Story 3

```text
Après T028, T029, T030 :
  T031 _app.tsx + Footer.tsx
  T032 Navbar.tsx
  T033 Home.tsx
  T034 ProjectCard.tsx
  T035 about/index.tsx
  T036 projects/index.tsx
```

## Implementation Strategy

### MVP (US1 + US2, avant le 30/10)

1. Phases 1 et 2.
2. Phase 3 (US1) : le contenu est juste.
3. Phase 4 (US2) : plus d'impasse, CV téléchargeable.
4. Valider les sections US1 et US2 du quickstart, puis déployer : le lien du portfolio peut repartir dans les candidatures.

### Incremental Delivery

- US3 (thème) puis US4 (accessibilité) dans des commits séparés de la même PR, ou dans une seconde PR si le MVP doit partir vite.
- Un commit par tâche ou par petit groupe, en Conventional Commits (`feat(content): …`, `fix(nav): …`).
