---
description: "Task list for 002-project-showcase"
---

# Tasks: Vitrine de projets avec liens et captures

**Input**: Design documents from `specs/002-project-showcase/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/), [quickstart.md](quickstart.md)

**Tests**: inclus. Le plan et le quickstart (section 1) exigent des tests Vitest du schéma, du chargeur, des filtres, de l'index de galerie et des contrastes.

**Organization**: une phase par user story, dans l'ordre de priorité de la spec, puis une phase de contenu (nouveaux projets) et les finitions.

## Format: `[ID] [P?] [Story] Description`

- **[P]** : peut tourner en parallèle (fichier différent, aucune dépendance sur une tâche non terminée)
- **[Story]** : user story concernée (US1 à US5)

## Règles communes à toutes les tâches

- Le dépôt GitHub est **public** : aucune capture non validée, aucune URL interne, aucun chiffre interne ni détail d'architecture Orange, aucun nom ou lieu lié au mariage n'entre dans un fichier commité (research R2, Q1).
- Les composants n'importent jamais `src/content/projects/load.ts` ni `zod` : seul `getStaticProps` / `getStaticPaths` appelle le chargeur. `src/content/filters.ts` et `src/components/projects/galleryIndex.ts` sont purs et sans Zod, utilisables côté navigateur.
- Erreurs de contenu au format de la spec 001 : `Contenu invalide dans src/content/projects/<id>/index.ts › <chemin> : <message>`.
- Aucun tiret long (—) dans les textes affichés. Code, identifiants et commits en anglais ; textes du site en français.
- Les périodes marquées « à confirmer » sont des estimations du parcours : Zobel les valide en T055.

---

## Phase 1: Setup

- [X] T001 [P] Enable modern image formats in `next.config.mjs`: `images: { formats: ["image/avif", "image/webp"] }` (research R7)
- [X] T002 [P] Add `export const siteUrl = "https://portfolio-phi-one-99.vercel.app";` to `src/content/site.ts` with a comment that spec 003 may replace it with a custom domain (research R12)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: modèle de projet, normalisation, chargeur et fonctions pures, testés sur des fiches de test. Aucun changement visible.

**⚠️ CRITICAL**: aucune user story ne commence avant la fin de cette phase.

- [X] T003 [P] Create `src/content/technologies.ts` exporting `technologies` (`{ slug, name, aliases, category }[]`, category in `"frontend" | "backend" | "data" | "devops" | "mobile" | "tools"`) and `normalizeTechnology(raw): Technology | undefined`, which compares lowercased values with spaces, dots and hyphens removed against `name` and `aliases`. Include at least: React, Next.js (aliases « Nextjs », « Next js »), TypeScript, JavaScript (« Javascript »), HTML, CSS, Tailwind CSS (« Tailwind », « TailwindCss »), Bootstrap, Redux, Angular, Astro, Preact, Taro, MobX, Vite, Zod, Laravel, PHP, C#, ASP.NET Core, MySQL, Redis, Supabase, Stripe, DeepL, Docker, Kubernetes, OpenShift, nginx, Grafana, GitHub Actions, Cloudflare Pages, Cloudflare Workers, Jest, Vitest, Playwright. Slugs are kebab-case (`nextjs`, `aspnet-core`, `tailwind-css`, `csharp`).
- [X] T004 Create `src/content/projects/schema.ts` (depends on T003) with the Zod schemas and types of [data-model.md](data-model.md) and [contracts/projects-content.md](contracts/projects-content.md), reusing `yearMonth` and `formatContentError` from `src/content/schema.ts` (export them there if needed):
  - `id` « kebab-case, unique » ; `title` « 1 à 80 caractères » ; `summary` « 1 à 160 caractères » ; `role` non vide ;
  - `context` enum `orange-cameroun | employer | client | freelance | personal | challenge` ; `organization` « obligatoire sauf pour `personal` et `challenge` » ;
  - `period.end ≥ period.start` when present ;
  - `technologies` « 1 à 12 entrées, chacune connue de la liste canonique » ; unknown entry → issue on `technologies[i]` with message `technologie inconnue « X » (à ajouter dans src/content/technologies.ts)` ; duplicates after normalization rejected ;
  - `links[]`: `type` in `demo | code-frontend | code-backend | code | design | article | store | video | other`, `url` « `https:` uniquement », `label?`, `archived?: true | "hide"` ;
  - `images[]`: `image` = object with `src: string`, `width: number`, `height: number` (StaticImageData shape), `alt` « obligatoire, 1 à 200 caractères », `caption?`, `format` in `desktop | mobile | other`, `approved` default `true` ;
  - `coverIndex?` « index valide dans `images` » ; `logo?` (StaticImageData shape) ; `caseStudy?` with six optional sections, each a non-empty string or a list of non-empty strings ; `subprojects?` (`name` « 1 à 80 caractères », `summary` « 1 à 160 caractères ») ; `featured?: { order: int ≥ 1 }` ; `hidden?` ; `confidential?` ;
  - confidential rules (research R2): `links` must be empty, issue message `un projet confidentiel ne publie aucun lien` ; every image must declare `approved: true` explicitly, issue message `capture d'un projet confidentiel non validée (approved: true attendu)` ;
  - `projectContexts`: label and colour per context exactly as in the data-model table (`#9a3412`, `#1e40af`, `#155e75`, `#5b21b6`, `#166534`, `#9d174d`) ;
  - `linkLabels`: default label per link type (research R9).
- [X] T005 Create `src/content/projects/load.ts` (depends on T004):
  - `validateProjects(entries: { file: string; data: unknown }[]): ProjectView[]` parses each entry, then checks across entries: unique ids ; « au plus 4 projets `featured` » ; « ordres de mise en avant uniques » ; « un projet `hidden` ne peut pas être `featured` » ;
  - builds `ProjectView` (data-model): canonical `technologies` as `{ slug, name }[]` ; visible links only (`archived: "hide"` removed) with resolved `label` and `archived: boolean` ; `contextLabel`, `contextColor` ; `cover` resolved in the order of research R8 (`coverIndex` → first image → logo → initials, 2 uppercase letters from the first two words of the title) ; `visibility` (`confidential` if flagged, else `not-public` when no link and no image, else `public`) ; `periodLabel` via `formatPeriod` from `src/content/dates.ts` ;
  - removes every `undefined` key so the result is serializable by `getStaticProps` ;
  - reading functions `getProjects()` (not hidden, sorted: featured by `order`, then `period.start` desc, challenges last with the same rule), `getProject(id)`, `getFeaturedProjects()` (max 4 by `order`), `getProjectIds()`, `getFilterOptions(projects)` per [contracts/projects-content.md](contracts/projects-content.md). They read `projectEntries` from `src/content/projects/index.ts` and cache the validated result.
- [X] T006 [P] Create the empty registry `src/content/projects/index.ts`: `export const projectEntries: { file: string; data: unknown }[] = [];` with a comment explaining how to add a project (one import + one line `{ file: "<id>/index.ts", data: <import> }`)
- [X] T007 [P] Create `src/content/filters.ts` (pure, no Zod): `parseFilterQuery(query)` reads `cadre` and `tech` (string or first array item), ignores values not in the known contexts / technology slugs passed as argument ; `filterProjects(projects, { cadre?, tech? })` ; `splitLabs(projects)` returns `{ main, labs }` where labs are `context === "challenge"`
- [X] T008 [P] Write `src/content/projects/__tests__/schema.test.ts` with fixture entries (fake StaticImageData objects `{ src: "/x.png", width: 1280, height: 800 }`):
  - the four US1 cases: links + images → cover `image`, visibility `public` ; images only → no link, cover `image` ; links only with logo → cover `logo` ; nothing → cover `initials`, visibility `not-public` ;
  - named errors (file and path in the message): missing title, `http:` URL, empty `alt`, unknown technology, duplicate id, link in a confidential project, confidential image without `approved: true`, 5 featured projects, two identical featured orders, hidden + featured, `coverIndex` out of range ;
  - normalization: « Nextjs », « Next js », « Next.js » all give slug `nextjs` ;
  - sorting of `getProjects`-like output on fixtures ; no `undefined` value in the serialized views.
- [X] T009 [P] Write `src/content/__tests__/filters.test.ts`: `parseFilterQuery` (known, unknown and array values), `filterProjects` by context, by technology and both, `splitLabs`
- [X] T010 [P] Write `src/content/projects/__tests__/contexts.test.ts`: each context colour reaches a WCAG contrast ratio ≥ 4.5 with `#ffffff` (compute relative luminance in the test)
- [X] T011 Run `npm test` and `npx tsc --noEmit`; both pass before Phase 3

**Checkpoint**: le modèle et le chargeur sont prêts et testés ; le site affiche encore l'ancien modèle.

---

## Phase 3: User Story 1 - Zobel ajoute un projet en un seul endroit (Priority: P1) 🎯 MVP

**Goal**: les 8 projets existants vivent dans des fiches ; le site les affiche depuis le nouveau modèle ; l'ancien modèle disparaît.

**Independent Test**: ajouter une fiche minimale dans un nouveau dossier et une ligne au registre, reconstruire : le projet apparaît sans modification de composant (quickstart, US1).

- [X] T012 [P] [US1] Create `src/content/projects/subscribe/index.ts`: move (`git mv`) `src/assets/images/subscribe.png` → `cover.png` and `src/assets/images/icons/logo.svg` → `logo.svg` into the folder ; context `personal`, period `2024-01` → `2024-06` (à confirmer), role « Conception et développement fullstack », technologies React, TypeScript, Tailwind CSS, Laravel ; links `demo` https://subscribe-ui.vercel.app/, `code-frontend` https://github.com/concepteur19/subscribe_UI, `code-backend` https://github.com/concepteur19/subscribe_api ; summary « Application web pour suivre ses abonnements (Netflix, Spotify, Deezer…) et leurs échéances. » ; image `alt` « Tableau de bord de Subscribe listant des abonnements », format `desktop`
- [X] T013 [P] [US1] Create `src/content/projects/lottery-elmados/index.ts`: move `loteryEC.png` → `cover.png` ; context `client`, organization « Elmados Consulting », period `2023-08` → `2024-02` (à confirmer), role « Développement de l'application », technologies Laravel, Bootstrap, JavaScript ; link `demo` https://dvloteriec.com/ ; summary « Application de gestion des joueurs de la loterie américaine inscrits par un cabinet de conseil. »
- [X] T014 [P] [US1] Create `src/content/projects/africa-business-network/index.ts`: move `abn.png` → `cover.png` and `icons/Logo Initiale ABN vert citron.png` → `logo.png` ; context `employer`, organization « Happyness SARL », period `2024-07` → `2025-01`, role « Conception et intégration des interfaces utilisateur », technologies React, Redux, Bootstrap ; link `demo` https://afri-front.vercel.app/ ; summary « Plateforme de mise en relation d'affaires africaine, dont le premier module livré est une marketplace. »
- [X] T015 [P] [US1] Create `src/content/projects/click-school/index.ts`: move `icons/clickSchool.png` → `logo.png` ; context `employer`, organization « PhiBrain Inc SARL », period `2024-01` → `2025-06` (à confirmer), role « Analyse, conception UML / Merise et développement », technologies Next.js, Tailwind CSS, Laravel ; summary « Plateforme de gestion scolaire : rôles, notes et bulletins, suivi des élèves par les parents à distance. » ; link `demo` https://lcdrv2.n0c.world only if `curl -sI` answers 2xx or 3xx at implementation time, otherwise no link
- [X] T016 [P] [US1] Create `src/content/projects/rest-countries/index.ts`: move `restcountry.png` → `cover.png` and `icons/countryico.png` → `logo.png` ; context `challenge`, period `2023-06` → `2023-07` (à confirmer), role « Développement », technologies React, Tailwind CSS ; link `demo` https://rest-coutries-api-omega.vercel.app/ ; title « Recherche de pays » ; summary « Recherche d'informations sur un pays : nom, langues parlées, superficie, etc. »
- [X] T017 [P] [US1] Create `src/content/projects/form-steps/index.ts`: move `icons/formstep.png` → `logo.png` ; context `challenge`, technologies React, Tailwind CSS ; link `demo` https://form-steps-three.vercel.app/ ; title « Formulaire en plusieurs étapes » ; summary « Formulaire animé en plusieurs étapes avant sa soumission. »
- [X] T018 [P] [US1] Create `src/content/projects/food-animation/index.ts`: move `foodanim.png` → `cover.png` and `icons/logo.png` → `logo.png` ; context `challenge`, `hidden: true`, technologies React, Tailwind CSS ; link `demo` https://food-animation-xi.vercel.app/ ; summary « Animation de plats de cuisine indienne. »
- [X] T019 [P] [US1] Create `src/content/projects/nike-product/index.ts`: move `nike.png` → `cover.png` and `icons/RedBlackWhite1.png` → `logo.png` ; context `challenge`, technologies React, CSS ; link `demo` https://nike-product.vercel.app/ ; title « Nike Product Animation » ; summary « Animation de présentation d'une chaussure de tennis Nike. »
- [X] T020 [US1] Register the 8 fiches in `src/content/projects/index.ts` (depends on T012 to T019)
- [X] T021 [P] [US1] Write `src/content/projects/__tests__/registry.test.ts`: the real registry validates ; each `data.id` equals the name of its folder (`file` prefix) ; every folder under `src/content/projects/` except `__tests__` is registered
- [X] T022 [P] [US1] Create `src/components/projects/ProjectCover.tsx`: renders `cover.kind === "image"` with `next/image` (`sizes` given by a prop, `priority` prop default `false`, `alt` from the cover), `"logo"` centred on `contextColor`, `"initials"` in white on `contextColor` ; fixed aspect box 16:10 with `object-cover` for card use and `object-contain` when `fit="contain"`
- [X] T023 [P] [US1] Create `src/components/projects/ProjectLinks.tsx`: one button per link, accessible name « {label} de {title} », `target="_blank"`, `rel="noopener noreferrer"` ; an archived link renders a non-interactive `<span>` « Démo hors ligne » ; renders nothing when there is no link (FR-009)
- [X] T024 [US1] Create `src/components/projects/ProjectCard.tsx` (depends on T022, T023): cover, `h3` title, summary, `ProjectLinks` ; no nested link ; dark variants as in spec 001 (`dark:`) ; replaces `src/components/base/projects/ProjectCard.tsx`
- [X] T025 [US1] Rewrite `src/pages/projects/index.tsx`: `getStaticProps` returns `getProjects()` ; renders the `h1`, the intro text from spec 001 and a grid of `ProjectCard`
- [X] T026 [US1] Update `src/pages/index.tsx` and `src/components/sections/Home.tsx`: `getStaticProps` adds `featuredProjects: getFeaturedProjects()` ; « Mes projets phares » renders them with `ProjectCard` (grid 1 / 2 / 4 columns) ; the section is hidden when the list is empty ; remove the `projectsData` import
- [X] T027 [US1] Delete `src/data/ProjectsData.ts` and `src/components/base/projects/ProjectCard.tsx` ; project images were moved with `git mv` into their fiche folders ; older unused icons in `src/assets/images/icons/` are left to the dead-code cleanup of spec 006 ; run `npm run build`

**Checkpoint**: le site affiche les projets depuis les fiches ; l'ancien modèle n'existe plus.

---

## Phase 4: User Story 2 - Un recruteur juge un projet en 30 secondes (Priority: P1)

**Goal**: chaque carte dit ce qu'est le projet, son cadre, sa période, sa stack et ce qu'on peut ouvrir ; titre et couverture mènent à la page du projet.

**Independent Test**: un testeur résume 3 projets (cadre, rôle, stack) en moins de 30 secondes chacun ; Tab ne s'arrête qu'une fois par destination (quickstart, US2).

- [X] T028 [US2] Create a minimal `src/pages/projects/[id].tsx` so that cards never point to a 404: `getStaticPaths` from `getProjectIds()` with `fallback: false`, `getStaticProps` with `getProject(id)` ; renders `h1` title, context badge, period, role, technologies, summary, `ProjectLinks`, cover with `priority`, and a link back to `/projects`
- [X] T029 [US2] Complete `src/components/projects/ProjectCard.tsx` (US2-1, US2-2):
  - context badge (label, white text on `contextColor`) and `periodLabel` ;
  - 3 to 5 technologies, then « +N » for the rest ;
  - title link to `/projects/<id>` ; cover wrapped in a duplicate link with `tabIndex={-1}` and `aria-hidden="true"` (research R10) ;
  - mention « Projet confidentiel » when `visibility === "confidential"`, « Projet non public » when `"not-public"` ;
  - external links stay separate buttons, opening in a new tab.

**Checkpoint**: cartes complètes ; chaque carte mène à une page projet existante.

---

## Phase 5: User Story 3 - Une page par projet, en étude de cas (Priority: P2)

**Goal**: la page projet présente l'étude de cas et une galerie accessible ; son aperçu de partage montre titre, résumé et couverture.

**Independent Test**: page d'un projet complet et d'un projet minimal ; galerie au clavier et au doigt (quickstart, US3).

- [ ] T030 [P] [US3] Create `src/components/projects/galleryIndex.ts`: pure `nextIndex(i, length)` and `previousIndex(i, length)` with wrap-around ; test it in `src/components/projects/__tests__/galleryIndex.test.ts`
- [ ] T031 [P] [US3] Create `src/components/projects/CaseStudy.tsx`: renders the sections in the order Contexte, Problème, Mon rôle, Solution, Résultats, Apprentissages as `h2` + paragraphs ; skips empty sections ; renders nothing without case study (US3-1)
- [ ] T032 [US3] Create `src/components/projects/Gallery.tsx` (depends on T030, research R6):
  - thumbnails grid; box ratio by `format` (desktop 16:10, mobile 9:19.5, other 4:3) with `object-contain` ; each thumbnail is a `<button>` named « Agrandir : {alt} » ; images lazy-loaded with `sizes` ;
  - enlarged view in a native `<dialog>` opened with `showModal()` ; buttons « Précédent », « Suivant », « Fermer » ; `ArrowLeft` / `ArrowRight` keys ; Escape closes (native) ; horizontal swipe via Pointer Events with a 50 px threshold ; caption under the image ; very tall images scroll inside the dialog (`overflow-auto`) ;
  - focus returns to the opening thumbnail on close ;
  - no transition under `motion-reduce:` ;
  - renders nothing without images.
- [ ] T033 [US3] Complete `src/pages/projects/[id].tsx`: add `CaseStudy` and `Gallery` after the summary ; add `<Head>` with `<title>{title} · Zobel Nguening</title>`, `meta description` = summary, `og:title`, `og:description`, `og:type` `article`, and `og:image` = `siteUrl` + cover image `src` only when `cover.kind === "image"` (research R12)

**Checkpoint**: une page projet complète, galerie utilisable au clavier et au toucher.

---

## Phase 6: User Story 4 - Mettre en avant et filtrer (Priority: P2)

**Goal**: au plus 4 projets choisis sur l'accueil ; filtres par cadre et technologie conservés dans l'adresse ; challenges dans « Labs ».

**Independent Test**: marquer 4 projets mis en avant et vérifier l'accueil ; filtrer par « React » puis « Client » (quickstart, US4).

- [ ] T034 [US4] Create `src/components/projects/ProjectFilters.tsx`: two native `<select>` (« Cadre », « Technologie ») built from `getFilterOptions` (passed as props), each option showing its count ; a « Réinitialiser les filtres » button when a filter is active
- [ ] T035 [US4] Wire filters in `src/pages/projects/index.tsx` (depends on T007, T034): `getStaticProps` also returns the filter options ; once `router.isReady`, read `parseFilterQuery(router.query)` ; on change, `router.replace({ pathname, query }, undefined, { shallow: true, scroll: false })` ; apply `filterProjects` then `splitLabs` ; render the main grid then a « Labs » `h2` section when labs are present ; announce « N projets » in an `aria-live="polite"` region ; when nothing matches, show « Aucun projet ne correspond à ces filtres. » with the reset button
- [X] T036 [US4] Set the initial featured selection (done during US1 so that the home page keeps its projects): `featured: { order: 1 }` on `subscribe`, `{ order: 2 }` on `africa-business-network`, `{ order: 3 }` on `lottery-elmados` until Phase 8 adds Kibreeze, Connecteur360 and MaxIt (final order in T047)

**Checkpoint**: accueil avec les projets choisis ; filtres et Labs fonctionnels.

---

## Phase 7: User Story 5 - Montrer un projet confidentiel sans rien divulguer (Priority: P3)

**Goal**: la fiche MaxIt présente le travail chez Orange Cameroun au niveau produit, sans lien ni capture non validée, avec ses sous-projets.

**Independent Test**: fiche confidentielle avec un lien ou une capture non validée : le build échoue ; la fiche réelle affiche « Projet confidentiel » et ses sous-projets (quickstart, US5).

- [ ] T037 [US5] Render `subprojects` in `src/pages/projects/[id].tsx`: `h2` « Sous-projets », list of name + summary (FR-017) ; and the mention « Projet confidentiel » under the title when `visibility === "confidential"`
- [ ] T038 [US5] Create `src/content/projects/maxit/index.ts` and register it: title « Mini apps et WebViews MaxIt », context `orange-cameroun`, organization « Orange Cameroun (mission INGSi, Sprint Pay) », period `2025-09` with no end, `confidential: true`, no `links`, no `images` until Zobel provides validated captures ; role « Développeur d'applications fullstack : frontend des mini apps, WebViews commerciales, mises en production et supervision » ; technologies Taro, React, TypeScript, MobX, Jest, ASP.NET Core, Kubernetes, OpenShift, Grafana ; summary « Mini apps et WebViews de la super app MaxIt d'Orange Cameroun : offre jeunes, résultats d'examens et offres commerciales. » ; `subprojects`: Univers Jeunes (« Offre jeunes 15-35 ans : inscription, souscription de forfaits pour soi ou en cadeau, solde de points fidélité. »), Résultats officiels (« Consultation des résultats du Baccalauréat, du Probatoire et du GCE par matricule, en français et en anglais. »), WebViews commerciales (« Orange Bonus, BIM, Sembewoila, Homebox, Univers Premium : souscription d'offres, de bonus et de forfaits. ») ; `caseStudy` drafted at product level from the CV bullets, **without** usage figures, gateway, identity provider, search engine or deployment tooling names
- [ ] T039 [US5] Extend `src/content/projects/__tests__/registry.test.ts`: the `maxit` view has `visibility === "confidential"`, no link, three subprojects ; `JSON.stringify` of all views contains none of the terms listed one per line in the local, uncommitted `docs/confidential-terms.txt` (case-insensitive ; the test is skipped when the file is absent)

**Checkpoint**: le travail chez Orange est visible sans rien divulguer.

---

## Phase 8: Contenu, nouveaux projets (FR-018, SC-006)

**Purpose**: ajouter les projets du parcours. Chaque fiche se publie dès qu'elle est valide ; les captures et études de cas arrivent ensuite sans toucher au code (dépendance D1).

- [ ] T040 [P] [US1] Create `src/content/projects/kibreeze/index.ts`: title « Kibreeze », context `freelance`, organization « Breezy Groupe », period `2026-09` → `2026-10`, role « Conception et livraison en autonomie, du recueil des besoins à la mise en production », technologies Astro, Preact, TypeScript, Tailwind CSS, Zod, Vitest, Playwright, Docker, GitHub Actions, Cloudflare Pages ; link `demo` https://tks-web-1h2.pages.dev ; summary « Site touristique bilingue de Kribi qui transforme la visite en demande de réservation, avec panier de séjour et devis par WhatsApp. » ; `caseStudy` drafted from the generic CV bullets ; captures added when Zobel provides them
- [ ] T041 [P] [US1] Create `src/content/projects/connecteur360/index.ts`: title « Connecteur360 », context `freelance`, organization « Connecteur 360 inc. », period `2025-12` → `2026-03`, role « Conception et développement de l'API REST et de l'interface », technologies Laravel, React, MySQL, Redis, Docker, Stripe, DeepL ; link `demo` https://connecteur360.com ; summary « Plateforme d'investissement participatif pour les marchés canadien et camerounais : projets, investissements, paiements Stripe. » ; `caseStudy` drafted from the generic CV bullets
- [ ] T042 [P] [US1] Create `src/content/projects/koli/index.ts`: read both READMEs first (`gh api repos/haku-studio/koli_backend/readme --jq .content | base64 -d`, same for `kolim`) to write title, summary, role, technologies and period (à confirmer) ; context `personal` ; links `code-backend` https://github.com/haku-studio/koli_backend and `code` https://github.com/haku-studio/kolim (type `code-frontend` if the README describes a front-end) ; add any missing technology to `src/content/technologies.ts`
- [ ] T043 [P] [US1] Create `src/content/projects/kahak-residency/index.ts`: context `employer`, organization « 2SI-Inc SA », period `2023-02` → `2024-02`, role « Développement du frontend Angular », technologies Angular, Laravel ; summary « Plateforme de location de véhicules et de logements. » ; link `demo` https://kahakresidency.com only if `curl -sI` answers 2xx or 3xx
- [ ] T044 [P] [US1] Create `src/content/projects/whatsapp-qr/index.ts`: title « QR Code WhatsApp », context `personal`, period `2026-07`, role « Conception et développement », technologies Next.js, Tailwind CSS, Docker, nginx, Kubernetes ; no link (no public repository) ; summary « Génération de QR codes WhatsApp avec message personnalisé par invité, import Excel et export PNG, SVG ou PDF. » ; captures only with fictitious names
- [ ] T045 [P] [US1] Create `src/content/projects/wedding-passport/index.ts` per research Q1: title « Passeport de mariage » (no first names anywhere), context `personal`, period `2026-10`, role « Conception et développement fullstack », technologies React, Vite, Tailwind CSS, Supabase, Cloudflare Workers ; summary « Livret d'invitation en forme de passeport : billet QR par invité, RSVP, plan de table et contrôle des entrées par scanner. » ; no link and no capture until a template version without real names, places or photos exists
- [ ] T046 [US1] Register T040 to T045 in `src/content/projects/index.ts` (depends on T040 to T045)

---

## Phase 9: Polish & Cross-Cutting Concerns

- [ ] T047 Set the final featured order (at most 4) in the fiches: Kibreeze 1, Connecteur360 2, MaxIt 3, Subscribe 4 ; remove `featured` from `africa-business-network`
- [ ] T048 Run the full check: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`
- [ ] T049 Check the served files: a search in `.next/` for every term of the local, uncommitted `docs/confidential-terms.txt` (internal names, the couple's first names and the venue) returns nothing ; `ls .next/static/media` holds only images imported by fiches
- [ ] T050 Run the build guards of [quickstart.md](quickstart.md) section 2 (missing image, link on MaxIt, 5th featured) and revert each change
- [ ] T051 Apply the `web-design-guidelines` skill to `src/components/projects/` and `src/pages/projects/` ; fix the findings that fall within this spec (accessibility, focus, contrast) and list the others for spec 004
- [ ] T052 Run the manual journeys of [quickstart.md](quickstart.md) section 3 (US1 to US5, keyboard, touch, reduced motion, screen reader) on the Vercel preview
- [ ] T053 Lighthouse (mobile) on `/projects` and on the project page with the most captures: Performance and Accessibility ≥ 90, LCP < 2.5 s (SC-003) ; note the scores in the PR
- [ ] T054 Remove the « Projets » and « Projets démonstration » leftovers from `docs/career-timeline.md` that the fiches now cover, and update its projects table statuses (local file, never committed)
- [ ] T055 Zobel validates the featured order, the periods marked « à confirmer », and the drafted summaries and case studies (Kibreeze, Connecteur360, MaxIt, Koli)
- [ ] T056 Zobel provides the captures (D1): Kibreeze, Connecteur360 (no real user data), QR Code WhatsApp (fictitious names), and validated MaxIt captures if any ; add them to the fiches with `alt`, `format` and, for MaxIt, `approved: true`
- [ ] T057 Zobel decides Q2 of [research.md](research.md) (Ma Tension / My Best Follow Up, St Market): add a fiche per accepted project
- [ ] T058 Set feature 002 to « Implémentée » in `specs/README.md` after the PR is merged

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** : immédiat.
- **Foundational (Phase 2)** : après la phase 1 ; bloque toutes les user stories.
- **US1 (Phase 3)** : après la phase 2. T020 après T012 à T019 ; T024 après T022 et T023 ; T027 en dernier.
- **US2 (Phase 4)** : après US1 (mêmes composants).
- **US3 (Phase 5)** : après US2 (complète `[id].tsx`).
- **US4 (Phase 6)** : après US1 ; indépendante de US3.
- **US5 (Phase 7)** : après US3 (sous-projets dans `[id].tsx`).
- **Contenu (Phase 8)** : après la phase 2 pour écrire les fiches ; T046 après US1. Les fiches peuvent être rédigées en parallèle des phases 4 à 7.
- **Polish (Phase 9)** : après tout le reste ; T055 à T057 dépendent de Zobel.

### Within Each Phase

- Fichiers différents marqués [P] : en parallèle.
- `src/pages/projects/index.tsx` : T025 puis T035. `src/pages/projects/[id].tsx` : T028, T033, T037. `ProjectCard.tsx` : T024 puis T029. `src/content/projects/index.ts` : T006, T020, T038, T046.

## Parallel Example: Phase 2

```text
Après T003 : T004
En parallèle de T004 : T006 (registre vide), T007 (filters.ts)
Après T005 : T008, T009, T010
```

## Parallel Example: User Story 1

```text
T012 à T019 (8 fiches, un dossier chacune), puis T020
En parallèle : T021, T022, T023
```

## Implementation Strategy

### MVP (US1 + US2)

1. Phases 1 et 2.
2. US1 : le site lit les fiches, l'ancien modèle disparaît.
3. US2 : cartes complètes et page projet minimale.
4. Déployer : ajouter un projet ne demande plus que son dossier et une ligne.

### Incremental Delivery

- US3 (étude de cas, galerie), puis US4 (filtres, mise en avant), puis US5 (MaxIt confidentiel) : une PR chacune, ou des commits séparés dans la même PR.
- Phase 8 au fil des contenus fournis par Zobel.
