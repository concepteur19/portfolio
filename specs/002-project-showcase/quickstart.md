# Quickstart: valider la feature 002

**Feature**: `002-project-showcase` | **Plan**: [plan.md](plan.md)

## Prérequis

- Node 22, npm, Chrome ou Edge (DevTools, Lighthouse).
- Un téléphone ou l'émulation tactile des DevTools pour le balayage.

## 1. Vérifications automatiques

```bash
npm ci
npm run lint
npx tsc --noEmit
npm test
npm run build
```

`npm test` couvre au minimum ([contracts/projects-content.md](contracts/projects-content.md)) :

- toutes les fiches réelles sont valides et chaque `id` égale le nom de son dossier ;
- quatre fiches de test (liens et captures, liens seuls, captures seules, ni l'un ni l'autre) produisent la bonne couverture et la bonne visibilité (US1) ;
- erreurs nommées : titre manquant, URL invalide, `alt` vide, technologie inconnue, identifiant en double, lien dans un projet confidentiel, capture confidentielle sans `approved: true`, plus de 4 projets mis en avant ;
- normalisation : « Nextjs », « Next js » et « Next.js » donnent `nextjs` ;
- tri, `filterProjects`, `splitLabs`, `parseFilterQuery` ;
- index de galerie : suivant et précédent bouclent ;
- contraste ≥ 4,5:1 entre le blanc et chaque couleur de cadre.

## 2. Garde-fous du build

| Action | Résultat attendu |
|---|---|
| Renommer une image importée par une fiche | build en échec sur l'import, qui nomme le fichier |
| Ajouter un lien à la fiche confidentielle MaxIt | échec « un projet confidentiel ne publie aucun lien » |
| Mettre `featured` sur un 5e projet | échec qui nomme le registre |

Annuler chaque modification après le test.

## 3. Parcours manuels (`npm run build && npm start`)

### US1, ajout d'un projet

Créer `src/content/projects/demo-test/` avec une fiche minimale (sans lien ni capture), l'ajouter au registre, reconstruire : la carte et la page `/projects/demo-test` apparaissent avec une couverture d'initiales et « Projet non public ». Supprimer le dossier et la ligne ensuite.

### US2, cartes

Sur `/projects`, chaque carte montre couverture, titre, résumé, cadre, période, 3 à 5 technologies et ses liens. Tab : un arrêt pour le titre, un par lien externe ; la couverture n'en prend pas. Les liens externes s'ouvrent dans un nouvel onglet.

### US3, page projet et galerie

- Sections de l'étude de cas dans l'ordre, sections vides absentes.
- Galerie : ouvrir une capture, flèches gauche et droite, Échap ; au toucher, balayage ; captures mobiles et ordinateur sans recadrage ; capture très haute défilable.
- Avec « Emulate CSS prefers-reduced-motion: reduce », plus aucune transition.
- Source de la page : `<title>`, `og:title`, `og:description`, `og:image` absolu.

### US4, mise en avant et filtres

- L'accueil montre les projets mis en avant, dans l'ordre, au plus 4.
- `/projects?tech=react` puis `?cadre=client` : résultats filtrés, nombre annoncé par le lecteur d'écran, filtre conservé au rechargement ; un filtre sans résultat propose « Réinitialiser les filtres ».
- Les challenges sont dans « Labs », après les projets principaux.

### US5, confidentiel

La page MaxIt affiche « Projet confidentiel », le cadre, le rôle, la stack, l'étude de cas et les sous-projets, sans aucun lien. Une recherche dans `.next/` des termes de la liste locale `docs/confidential-terms.txt` (non commitée) ne renvoie rien.

### Performance et accessibilité

Lighthouse (mobile) sur `/projects` et sur la page projet la plus chargée en captures : Performance et Accessibilité ≥ 90, LCP < 2,5 s.

## Critère de fin

Sections 1 à 3 vertes ; SC-001 à SC-006 de la [spec](spec.md) vérifiés et notés dans la PR.
