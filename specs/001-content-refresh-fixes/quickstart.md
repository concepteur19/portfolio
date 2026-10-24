# Quickstart: valider la feature 001

**Feature**: `001-content-refresh-fixes` | **Plan**: [plan.md](plan.md)

## Prérequis

- Node 22, npm.
- Le CV générique copié dans `public/cv/zobel-nguening-cv.pdf`, avec des métadonnées neutres.
- Chrome ou Edge, pour les DevTools et Lighthouse.

## 1. Vérifications automatiques

```bash
npm ci
npm run lint          # 0 erreur, règle no-console active
npx tsc --noEmit      # 0 erreur
npm test              # tests du contenu et des dates verts
npm run build         # build vert
```

Attendu : tout passe. `npm test` couvre au minimum :

- la validation de tout le contenu réel ([contracts/content-schema.md](contracts/content-schema.md)) ;
- la durée d'expérience avec chevauchement (PhiBrain et Orange) et poste en cours ;
- le format des périodes ;
- la correspondance entre les entrées du menu et les pages existantes.

## 2. Garde-fous du build

| Action | Résultat attendu |
|---|---|
| Renommer temporairement `public/cv/zobel-nguening-cv.pdf` puis `npm run build` | échec avec « CV introuvable » |
| Mettre `end: "2023-01"` sur une expérience qui commence en 2023-02 | échec qui nomme `experience.ts` et le champ |
| Ajouter `console.log("x")` dans un composant puis `npm run lint` | erreur `no-console` |

Annuler chaque modification après le test.

## 3. Parcours manuels (`npm run build && npm start`)

### US1, profil à jour

Comparer l'accueil et la page À propos avec `docs/career-timeline.md` :

- titre « Ingénieur Logiciel Fullstack », poste actuel chez INGSi (Sprint Pay) en mission chez Orange Cameroun ;
- expériences dans l'ordre Orange, PhiBrain, Happyness, Enseignement, 2SI ; « aujourd'hui » seulement sur Orange et PhiBrain ;
- section « Débuts » fermée par défaut, avec Gloom et LUGAR ;
- « plus de 3 ans » d'expérience ; année courante dans le pied de page ;
- Formation après les projets et l'expérience : ENSP 2018 - 2023, Baccalauréat C 2016 ;
- aucune faute de la liste FR-013, aucun tiret long.

### US2, aucune impasse

- Le menu ne propose que « À propos » et « Projets ».
- « Télécharger mon CV » télécharge `Zobel-Nguening-CV.pdf` ; ouvrir le fichier, vérifier que c'est le CV générique et que ses propriétés (titre, auteur) ne citent aucune candidature.
- Sur `/projects`, chaque carte ouvre une seule destination ; la touche Tab ne s'arrête qu'une fois par carte ; aucun projet sans lien.
- En thème clair, les icônes sociales de la page À propos sont visibles.

### US3, thème

Dans une fenêtre de navigation privée :

1. Système en clair, ouvrir `/` : thème clair. Système en sombre : thème sombre.
2. Basculer le thème, recharger avec le cache désactivé et le réseau en « Slow 4G » : aucun flash de l'autre thème.
3. Fermer, rouvrir le site : le choix est conservé.

### US4, accessibilité

- DevTools : `document.documentElement.lang === "fr"` et `document.querySelectorAll("h1").length === 1` sur chaque page.
- Lighthouse (mode navigation, mobile) sur `/`, `/about` et `/projects`, dans les deux thèmes : Accessibilité ≥ 90 (SC-004).
- Console du navigateur vide sur chaque page (FR-014).
- Lecteur d'écran (VoiceOver : Cmd + F5) : le portrait est annoncé, les logos de projet sont ignorés, les icônes sociales annoncent « GitHub de Zobel Nguening », etc.

## Critère de fin

Toutes les sections ci-dessus passent ; les critères SC-001 à SC-006 de la [spec](spec.md) sont vérifiés et notés dans la PR.
