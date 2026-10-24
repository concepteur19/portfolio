# Research: Contenu à jour et corrections bloquantes

**Feature**: `001-content-refresh-fixes` | **Date**: 2026-10-24 | **Plan**: [plan.md](plan.md)

État de départ mesuré sur la branche `test/next-16` : `npm run build`, `npm run lint`, `npx tsc --noEmit` et `npm test` passent. Next 16.4.2, Pages Router, React 18.3.1, Tailwind CSS 4.3, Vitest 5, Node 22.

## R1. Version de React

- **Decision**: garder React 18.3 pour cette feature.
- **Rationale**: `next@16.4.2` déclare `react: ^18.2.0 || ^19.0.0` en peer dependency ; le Pages Router fonctionne avec React 18. La spec ne demande rien qui exige React 19. Principe VI : pas de migration sans besoin.
- **Alternatives considered**: passer à React 19 maintenant. Rejeté : risque de régression (framer-motion 11, react-icons) sans gain pour la spec. À traiter dans 004 ou 006.

## R2. Format du contenu et validation au build (principe III)

- **Decision**: le contenu vit dans des modules TypeScript sous `src/content/` (`profile.ts`, `experience.ts`, `education.ts`, `skills.ts`, `site.ts`). Chaque module exporte des données brutes ; `src/content/schema.ts` définit les schémas Zod ; `src/content/index.ts` valide tout et expose des fonctions de lecture. Les pages appellent ces fonctions dans `getStaticProps`, donc un contenu invalide fait échouer `next build`. Le message nomme le fichier et le chemin du champ (`experience.ts › [2].start`).
- **Rationale**:
  - TypeScript attrape les champs manquants dans l'éditeur ;
  - Zod vérifie ce que le typage ne voit pas : URL valide, dates `YYYY-MM` cohérentes, 1 à 3 réalisations, texte alternatif non vide ;
  - un test Vitest valide le même contenu, donc l'erreur apparaît aussi en CI (spec 006) ;
  - la spec 002 réutilisera ces schémas pour les projets.
- **Alternatives considered**:
  - JSON avec JSON Schema (ajv) : plus de configuration, pas d'import d'images ;
  - MDX ou YAML : utiles pour le blog (spec 007), excessifs ici ;
  - types TypeScript seuls : ne valident ni les URL ni les dates.
- **Dépendance ajoutée**: `zod` (version 4, épinglée par le lockfile).

## R3. Dates, durée d'expérience et année du pied de page (FR-005)

- **Decision**:
  - les dates sont stockées au format `YYYY-MM` ; `end` absent signifie « en cours » ;
  - la durée totale fusionne les intervalles des postes de la section principale (les stages « Débuts » sont exclus), compte les mois, puis s'affiche « plus de N ans » (N = mois ÷ 12, arrondi vers le bas) ou « N mois » sous un an ;
  - le calcul tourne dans `getStaticProps` avec `revalidate: 86400` : sur Vercel, la page est régénérée au plus une fois par jour (ISR), sans redéploiement ;
  - l'année du pied de page est calculée au rendu ; le `<span>` porte `suppressHydrationWarning` pour le cas d'une page servie de part et d'autre du 1er janvier.
- **Rationale**: valeur toujours juste, HTML statique (SEO), aucun saut d'affichage côté client. La fusion des intervalles règle le chevauchement PhiBrain / Orange (edge case de la spec).
- **Alternatives considered**:
  - calcul côté client (`useEffect`) : contenu qui change après affichage, absent du HTML ;
  - calcul au build sans ISR : valeur figée jusqu'au prochain déploiement.

## R4. Thème sans clignotement (FR-011)

- **Decision**:
  - le thème est porté par la classe `dark` sur `<html>` ;
  - Tailwind 4 déclare `@custom-variant dark (&:where(.dark, .dark *));` ;
  - un script inline bloquant dans `<Head>` de `_document.tsx` lit `localStorage["theme"]` (`"light"` ou `"dark"`), sinon `matchMedia("(prefers-color-scheme: dark)")`, puis pose la classe et `color-scheme` avant le premier affichage ;
  - `ThemeContext` lit la classe au montage, et le bouton met à jour la classe et `localStorage` ;
  - sans choix enregistré, un écouteur suit les changements de préférence du système ;
  - toutes les classes conditionnelles `isDarkTheme ? … : …` des composants deviennent des variantes `dark:` ;
  - l'icône du bouton (soleil / lune) est choisie en CSS (`dark:hidden`, `hidden dark:block`) pour éviter tout décalage d'hydratation.
- **Rationale**: c'est la seule approche sans clignotement avec un rendu statique ; l'état React ne peut pas connaître le thème avant l'hydratation.
- **Conséquence sur le backlog**: « thème via classes », prévu dans la spec 004, est réalisé ici, car FR-011 l'exige. `specs/README.md` est mis à jour.
- **Alternatives considered**:
  - garder l'état React avec un écran masqué jusqu'à l'hydratation : retarde l'affichage (LCP) ;
  - `next-themes` : une dépendance pour 30 lignes de code (principe VI).

## R5. Téléchargement du CV (FR-008, edge case « CV absent »)

- **Decision**:
  - fichier publié dans `public/cv/zobel-nguening-cv.pdf` (adresse stable, réutilisable par la mesure d'audience de la spec 003) ;
  - le bouton devient un lien `<a href="/cv/zobel-nguening-cv.pdf" download="Zobel-Nguening-CV.pdf">` ;
  - `getStaticProps` de l'accueil vérifie que le fichier existe et lève une erreur explicite sinon, ce qui fait échouer le build ;
  - le chemin et le nom de téléchargement viennent de `profile.ts`.
- **Source du fichier**: le CV générique sans numéro de téléphone, fourni par Zobel (dépendance D1 du plan).
- **Contrôle « pas de téléphone »**: vérification manuelle (quickstart). Le texte d'un PDF est souvent compressé ; un parseur PDF pour un seul contrôle est rejeté (principe VI).
- **Alternatives considered**: lien vers Google Drive. Rejeté : adresse instable, hors du dépôt, non mesurable.

## R6. Titres et sémantique (FR-012)

- **Decision**: `Title` reçoit une prop `as` (`"h1" | "h2" | "h3"`, défaut `"h2"`). Chaque page passe `as="h1"` à son titre principal ; sections en `h2`, cartes en `h3`. `_document.tsx` déclare `lang="fr"`.
- **Rationale**: aujourd'hui `Title` rend toujours un `h1`, donc l'accueil en contient au moins six.

## R7. Navigation (FR-007)

- **Decision**: les entrées du menu viennent de `site.ts` (`navItems`) : « À propos », « Projets ». « Articles » n'y figure pas ; la spec 007 l'ajoutera avec la page. L'entrée active porte `aria-current="page"`.

## R8. Cartes de projet (FR-009)

- **Decision**:
  - une carte = un seul `<Link>` ; le domaine affiché devient un `<span>` ;
  - un projet est publiable si `visible !== false` et si `link` est une URL non vide ; l'accueil et la page Projets n'affichent que les projets publiables ;
  - les textes fautifs des projets sont corrigés.
- **Périmètre**: le modèle complet (liens multiples, captures, études de cas) relève de la spec 002. `ProjectsData.ts` reçoit seulement un type explicite et le filtre ; voir Complexity Tracking du plan.

## R9. Contrastes (FR-010)

Mesures (WCAG, texte normal, AA = 4,5:1) :

| Couleur | Fond | Ratio | Verdict |
|---|---|---|---|
| `#fd7fa4` (primary) | blanc | 2,40 | échec |
| `#fd7fa4` | `slate-900` | 7,44 | OK |
| `#be185d` (`pink-700`) | blanc | 6,04 | OK |
| `#fff` (icônes À propos) | blanc | 1,00 | échec : icônes invisibles |
| `gray-500` | blanc | 4,83 | OK |
| `gray-400` | `slate-900` | 7,03 | OK |

- **Decision**:
  - nouveau jeton `--color-primary-strong: #be185d` pour le texte accentué en thème clair (`text-primary-strong dark:text-primary`) ; `#fd7fa4` reste pour le thème sombre et les éléments décoratifs ;
  - les icônes sociales utilisent `currentColor`.

## R10. Messages de console (FR-014)

- **Decision**: retirer le `console.log` de `Navbar.tsx` et ajouter la règle ESLint `no-console` (`error`, `warn` et `error` autorisés) pour empêcher le retour du problème.

## R11. Textes et identité (FR-006, FR-013)

- **Decision**:
  - nom affiché « Zobel Nguening » partout ; nom complet dans les données structurées (spec 003) ;
  - « Concepteur JS » retiré du pied de page ; `concepteur19` reste visible uniquement comme identifiant GitHub ;
  - accroche de l'accueil et page À propos réécrites à partir du profil du CV générique, sans tiret long ;
  - toutes les fautes de la liste FR-013 sont corrigées, ainsi que les libellés « A Propos », « Mon parcours scolaire » et « Expériences Professionnelle ».
- **Validation**: Zobel relit les textes pendant la revue de la PR.

## R12. Section « Débuts » (FR-015)

- **Decision**: les stages LUGAR (2021) et Gloom (2022) sont affichés dans un élément natif `<details>` intitulé « Débuts », fermé par défaut, sous la liste des expériences. Ils ne comptent pas dans la durée d'expérience.
- **Rationale**: accessible au clavier et au lecteur d'écran sans JavaScript.

## R13. Images et liens externes (FR-012, US4)

- **Decision**:
  - portrait : `alt="Portrait de Zobel Nguening"` ;
  - avatar du menu : lien `aria-label="Accueil"`, image `alt=""` ;
  - logos de projet dans une carte déjà titrée : `alt=""` ;
  - liens sociaux iconographiques : `aria-label` explicite (« GitHub de Zobel Nguening ») et `rel="noopener noreferrer"` ;
  - bouton de thème : `aria-label="Activer le thème sombre"` ou « clair » après montage, `aria-pressed` ; les attributs `aria-expanded` et `aria-controls`, erronés, sont retirés.

## Hors périmètre confirmé

Nettoyage du code mort (`src/components/sections/About.tsx`, `src/data/images.ts`, `src/pages/api/hello.ts`, `framer-motion` inutilisé) : spec 006. Menu mobile, hero avec appels à l'action, animations : spec 004. Nouveaux projets : spec 002.
