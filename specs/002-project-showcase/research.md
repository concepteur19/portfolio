# Research: Vitrine de projets avec liens et captures

**Feature**: `002-project-showcase` | **Date**: 2026-11-04 | **Plan**: [plan.md](plan.md)

Point de départ : `master` après la spec 001. Next 16.4.2 (Pages Router, build Turbopack), React 18.3, Tailwind 4.3, Zod 4, Vitest 5. Le contenu du profil vit déjà dans `src/content/` et est validé au build ; les projets sont encore dans `src/data/ProjectsData.ts` (modèle transitoire, écart au principe III noté dans le plan 001).

Le dépôt GitHub `concepteur19/portfolio` est **public**. Tout fichier commité est donc publié, que le site l'affiche ou non : cette contrainte pèse sur R1 et R2.

## R1. Format d'une fiche de projet

- **Decision**: un dossier par projet, `src/content/projects/<id>/`, contenant `index.ts` (la fiche, `satisfies ProjectInput`) et ses images. Les images sont importées statiquement dans la fiche. Un registre `src/content/projects/index.ts` liste les fiches, une ligne d'import par projet.
- **Rationale**:
  - un import statique donne à `next/image` la largeur, la hauteur et un flou de chargement, sans dépendance ;
  - une image introuvable fait échouer le build sur la ligne d'import, qui nomme le fichier (FR-008) ;
  - l'éditeur complète et vérifie les champs pendant la saisie ;
  - ajouter un projet = créer un dossier et ajouter une ligne au registre ; aucun composant n'est modifié (FR-001, SC-001).
- **Alternatives considered**:
  - YAML ou JSON lus par `fs`, images dans `public/` : deux dépendances (`yaml`, `image-size`), dimensions à calculer, et tout fichier de `public/` est servi, y compris une capture non validée (contraire à FR-016) ;
  - génération d'un registre au `prebuild` : un script et du code généré pour économiser une ligne ;
  - découverte automatique (`require.context`) : non prise en charge par Turbopack, le bundler par défaut de Next 16.

## R2. Captures non validées et projets confidentiels (FR-004, FR-016, US5)

- **Decision**:
  - une capture non validée n'entre jamais dans le dépôt, puisqu'il est public : elle reste sur la machine de Zobel, hors du projet ;
  - le schéma exige donc `approved: true` sur chaque capture d'un projet confidentiel (déclaration explicite de validation) ; pour les autres projets, la valeur par défaut est `true` ;
  - une fiche confidentielle ne peut contenir aucun lien : le build échoue sinon. Aucune URL interne ne peut ainsi atteindre le dépôt.
- **Rationale**: filtrer à l'affichage ne suffit pas. Une image importée est émise dans `.next/static/media` et servie, et une image commitée est lisible sur GitHub.
- **Alternatives considered**: un indicateur `approved: false` filtré au rendu. Rejeté : le fichier resterait public dans le dépôt et dans les fichiers servis.

## R3. Normalisation des technologies (FR-015)

- **Decision**: `src/content/technologies.ts` liste les technologies canoniques : `{ slug, name, aliases[], category }`, catégorie parmi front-end, backend, données, DevOps, mobile, outils. La fiche peut écrire une variante (« Nextjs », « Next js ») ; le chargeur la remplace par le nom canonique. Une technologie inconnue fait échouer le build en nommant la fiche et l'index du champ, ce qui oblige à l'ajouter une fois à la liste.
- **Rationale**: les filtres n'affichent aucun doublon, et le slug sert de valeur stable dans l'adresse (`?tech=nextjs`).

## R4. Pages et adresses (FR-010)

- **Decision**: `src/pages/projects/[id].tsx` avec `getStaticPaths` (`fallback: false`) sur les projets non masqués ; l'adresse est `/projects/<id>`, où `id` est un identifiant kebab-case unique. Un test vérifie que chaque `id` est égal au nom de son dossier.
- **Rationale**: adresse stable et lisible, générée au build, sans serveur (principe VI).

## R5. Filtres (FR-014, US4)

- **Decision**:
  - paramètres d'adresse `cadre` (valeur du cadre) et `tech` (slug canonique), combinables ;
  - le filtrage tourne dans le navigateur avec une fonction pure `filterProjects(projects, query)` (dans `src/content/filters.ts`, sans Zod) ; le choix met à jour l'adresse par `router.replace(…, { shallow: true })` ;
  - avant l'hydratation, la page statique liste tous les projets (lisible sans JavaScript et par les moteurs) ; le filtre s'applique dès que `router.isReady` ;
  - le nombre de résultats est annoncé dans une région `aria-live="polite"` ; « Aucun projet ne correspond » propose un bouton « Réinitialiser les filtres » ;
  - les projets de cadre `challenge` sont regroupés dans une section « Labs » après les projets principaux ; les filtres s'appliquent aux deux sections.
- **Alternatives considered**: une page statique par combinaison de filtres. Rejeté : explosion du nombre de pages pour un gain nul.

## R6. Galerie et vue agrandie (FR-011, US3)

- **Decision**:
  - vignettes en grille ; chaque format garde ses proportions dans une boîte adaptée (ordinateur 16:10, mobile 9:19,5, autre 4:3) avec `object-contain`, sans recadrage ;
  - vue agrandie dans un élément natif `<dialog>` ouvert par `showModal()` : focus piégé et Échap gérés par le navigateur ; boutons « Précédent », « Suivant », « Fermer » ; flèches gauche et droite ; balayage horizontal par Pointer Events (seuil 50 px) ; légende affichée sous l'image ;
  - une capture très haute défile dans la vue agrandie (`overflow-auto`) au lieu d'être réduite ;
  - `prefers-reduced-motion: reduce` supprime les transitions ;
  - la logique d'index (suivant, précédent, bouclage) est une fonction pure testée.
- **Rationale**: aucune bibliothèque de galerie (principe VI) ; `<dialog>` apporte l'accessibilité de base.

## R7. Images (FR-012, SC-003)

- **Decision**: `next.config.mjs` active `images.formats: ["image/avif", "image/webp"]` ; chaque image déclare `sizes`. Seule la couverture de la page projet a `priority` (préchargée) ; toutes les autres, y compris les couvertures des cartes, sont chargées à l'approche du défilement.
- **Rationale**: LCP < 2,5 s en 4G avec 10 captures (SC-003) ; aucune image servie au-delà de sa taille d'affichage (principe IV).

## R8. Couverture (FR-005)

- **Decision**: ordre de résolution, calculé par le chargeur :
  1. la capture désignée par `coverIndex` ;
  2. sinon la première capture ;
  3. sinon le logo du projet, sur la couleur du cadre ;
  4. sinon les initiales du titre (2 lettres), en blanc sur la couleur du cadre.
- Les couleurs de cadre sont choisies pour un contraste ≥ 4,5:1 avec le blanc ; un test le vérifie.

## R9. Liens (FR-003, FR-009, edge case « démo hors ligne »)

- **Decision**:
  - types et libellés par défaut : `demo` « Voir le site », `code-frontend` « Code front-end », `code-backend` « Code back-end », `code` « Code source », `design` « Maquette », `article` « Article », `store` « Store mobile », `video` « Vidéo », `other` « Lien » ;
  - `archived: true` affiche un libellé non cliquable « Démo hors ligne » ; `archived: "hide"` masque le lien ;
  - chaque lien externe : `target="_blank"`, `rel="noopener noreferrer"`, nom accessible qui précise le projet (« Voir le site de Kibreeze »).

## R10. Carte de projet (US2, FR-009)

- **Decision**:
  - couverture et titre mènent à la page du projet. La couverture est un lien doublon retiré de l'ordre de tabulation (`tabIndex={-1}`, `aria-hidden`) : une seule tabulation par destination ;
  - résumé, cadre, période, 3 à 5 technologies (au-delà : « +N ») ;
  - les liens externes sont des boutons distincts, jamais imbriqués dans un autre lien ;
  - mention « Projet confidentiel » si confidentiel, « Projet non public » si le projet n'a ni lien ni capture.
- **Conséquence**: la règle de la spec 001 « une carte = un seul lien » évolue vers « une destination = un seul arrêt de tabulation, aucun lien imbriqué », comme le demande US2-2.

## R11. Mise en avant (FR-013)

- **Decision**: `featured: { order: n }` ; l'accueil affiche les projets mis en avant triés par `order`. Le build échoue si plus de 4 projets sont mis en avant ou si deux ordres sont égaux : le choix reste explicite.

## R12. Aperçu de partage (US3-4)

- **Decision**: la page projet pose `<title>` « {titre} · Zobel Nguening », `meta description` = résumé, et `og:title`, `og:description`, `og:image` (URL absolue de la couverture), `og:type` « article ». L'URL du site, `https://portfolio-phi-one-99.vercel.app`, devient `siteUrl` dans `src/content/site.ts`. Une couverture de repli sans image (initiales) n'a pas d'`og:image` ; la spec 003 générera les images de partage.

## R13. Migration et catalogue (FR-018, SC-006)

- **Decision**: les 8 projets de `ProjectsData.ts` passent au nouveau modèle ; `src/data/ProjectsData.ts`, `LegacyProject`, `isPublishable` et `src/components/base/projects/ProjectCard.tsx` disparaissent ; les images de projet quittent `src/assets/images/` pour les dossiers des fiches. Nouveaux projets, à partir de `docs/career-timeline.md` :

| Projet | Cadre | Statut prévu | Ce qu'il faut de Zobel |
|---|---|---|---|
| Kibreeze | freelance | publié, mis en avant | captures, étude de cas |
| Connecteur360 | freelance | publié, mis en avant | captures (sans données réelles), étude de cas |
| Mini apps et WebViews MaxIt | orange-cameroun | confidentiel, mis en avant, sous-projets (Univers Jeunes, Résultats officiels, WebViews commerciales) | étude de cas au niveau produit ; captures seulement si validées |
| Koli | personnel | publié (dépôts publics `haku-studio/koli_backend`, `haku-studio/kolim`) | résumé, rôle, stack |
| Passeport de mariage | personnel | publié, titre sans noms, captures anonymisées | voir la question ouverte Q1 |
| QR Code WhatsApp | personnel | publié sans lien (pas de dépôt public), captures avec noms fictifs | captures |
| Kahak Residency | employer (2SI) | publié (kahakresidency.com) | vérifier que le site est en ligne |
| Click School | employer (PhiBrain) | publié si la démo `lcdrv2.n0c.world` répond, sinon sans lien | vérifier la démo |

Les projets sans texte d'étude de cas sont publiés avec leur carte et une page minimale ; Zobel complète les sections ensuite, sans toucher au code.

## Questions ouvertes (contenu, non bloquantes pour le code)

- **Q1. Passeport de mariage** : Zobel veut que le dépôt soit public, mais son dépôt (privé à ce jour) contient les photos du couple, leurs prénoms et le programme exact de l'événement (lieux, dates, horaires, décembre 2026) ; l'URL de la démo contient aussi les prénoms. Proposition : publier une version « modèle » (données et photos fictives, sans prénoms) dans un dépôt public, avec une démo déployée à part ; la fiche du portfolio pointe vers ce modèle. D'ici là, le projet est publié avec un titre neutre, des captures anonymisées et sans lien. Rendre public le dépôt actuel suppose au minimum l'accord du couple et, de préférence, d'attendre la fin de l'événement.
- **Q2. Ma Tension / My Best Follow Up** et **St Market** restent « à valider » dans le parcours : ils ne sont pas migrés tant que Zobel ne tranche pas.
